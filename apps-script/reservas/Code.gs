/**
 * Padel Travellers — reservas online 2027.
 *
 * Web app de Google Apps Script que se ejecuta con la cuenta oriol@padeltravellers.com:
 *  - GET  ?action=plazas  → plazas libres por salida (la web las muestra).
 *  - POST (formulario)    → guarda la reserva en el Sheet "Reservas PT 2027",
 *                           genera el contrato en PDF y lo envía desde reservas@.
 *
 * Todo lo configurable (precios, remitente, IBAN, IDs) está en la pestaña Config del Sheet.
 * Copia de este archivo versionada en el repo padeltravellers/web (apps-script/reservas).
 */

const SHEET_ID = '166Ba6Ap41pUus7wp102qZgBVVqVFehXLrtshSIL1ijE';
const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

// ---------- entrada ----------

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || '';
  if (action === 'plazas') return json_({ ok: true, salidas: salidas_().map(publicSalida_) });
  return json_({ ok: true, service: 'pt-reservas' });
}

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return json_({ ok: true }); // honeypot anti-bots

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return json_({ ok: false, error: 'ocupado' });
  }
  try {
    return json_(crearReserva_(p));
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    notificarError_(err, p);
    return json_({ ok: false, error: 'interno' });
  } finally {
    lock.releaseLock();
  }
}

// ---------- reserva ----------

function crearReserva_(p) {
  const required = ['salida', 'habitacion', 'nombre', 'apellidos', 'email', 'telefono', 'nacimiento', 'nacionalidad', 'docTipo', 'docNumero', 'ciudad', 'nivel', 'emergenciaNombre', 'emergenciaTelefono'];
  const missing = required.filter((k) => !String(p[k] || '').trim());
  if (missing.length) return { ok: false, error: 'faltan_datos', campos: missing };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return { ok: false, error: 'email' };
  if (p.acepta !== 'si') return { ok: false, error: 'contrato' };
  const hab = String(p.habitacion).toLowerCase();
  if (hab !== 'compartida' && hab !== 'individual') return { ok: false, error: 'habitacion' };
  if (hab === 'compartida' && !String(p.acompanante || '').trim()) return { ok: false, error: 'acompanante' };

  const cfg = config_();
  const salida = salidas_().find((s) => s.codigo === String(p.salida));
  if (!salida) return { ok: false, error: 'salida' };
  if (salida.libres <= 0) return { ok: false, error: 'completo' };

  const precio = hab === 'compartida' ? num_(cfg.precio_compartida) : num_(cfg.precio_individual);
  const honorarios = num_(cfg.honorarios);
  const presupuesto = precio - honorarios;
  const ahora = new Date();

  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Reservas');
  const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const ids = sh.getRange(2, 1, Math.max(sh.getMaxRows() - 1, 1), 1).getValues().map((r) => r[0]);
  let last = 0;
  ids.forEach((v, i) => { if (v !== '' && v !== null) last = i + 1; });
  const rowIndex = last + 2;
  const id = 'PT27-' + ('000' + (last + 1)).slice(-3);

  const nombreCompleto = clean_(p.nombre) + ' ' + clean_(p.apellidos);
  const habTexto = hab === 'compartida' ? 'Compartida con ' + clean_(p.acompanante) : 'Individual';

  const pdf = generarContrato_(cfg, {
    VIAJE: String(salida.viaje),
    INICIO: fechaLarga_(salida.inicio),
    FIN: fechaLarga_(salida.fin),
    FECHA_RESERVA: fechaLarga_(ahora),
    NOMBRE: nombreCompleto,
    NACIONALIDAD: clean_(p.nacionalidad),
    DOC_TIPO: clean_(p.docTipo),
    DOC_NUM: clean_(p.docNumero).toUpperCase(),
    DOCUMENTO: clean_(p.docTipo) + ' ' + clean_(p.docNumero).toUpperCase(),
    EMAIL: clean_(p.email),
    TELEFONO: clean_(p.telefono),
    NACIMIENTO: fechaCorta_(p.nacimiento),
    CIUDAD: clean_(p.ciudad),
    HABITACION: habTexto,
    PRECIO: eur_(precio),
    HONORARIOS: eur_(honorarios),
    PRESUPUESTO: eur_(presupuesto),
    NIVEL: clean_(p.nivel),
    SALUD: clean_(p.salud) || 'Nada que destacar',
    EMERGENCIA: clean_(p.emergenciaNombre) + ' · ' + clean_(p.emergenciaTelefono),
    PAGO_RESERVA_FECHA: 'pendiente de pago',
    PAGO_RESERVA_METODO: 'transferencia',
    IBAN: cfg.iban || 'Se indica en el email de confirmación',
    BIC: cfg.bic || 'Se indica en el email de confirmación',
    ACEPTACION: Utilities.formatDate(ahora, 'Europe/Madrid', 'dd/MM/yyyy HH:mm') + ' (hora de España), en padeltravellers.com',
  }, id + ' · ' + salida.codigo + ' · ' + nombreCompleto);

  const values = {
    'ID': id,
    'Fecha reserva': ahora,
    'Estado': 'Pre-reserva',
    'Salida': salida.codigo,
    'Fechas': salida.etiqueta,
    'Habitación': hab === 'compartida' ? 'Compartida' : 'Individual',
    'Acompañante': clean_(p.acompanante),
    'Nombre': clean_(p.nombre),
    'Apellidos': clean_(p.apellidos),
    'Email': clean_(p.email),
    'Teléfono': clean_(p.telefono),
    'Fecha nacimiento': fechaCorta_(p.nacimiento),
    'Nacionalidad': clean_(p.nacionalidad),
    'Tipo doc.': clean_(p.docTipo),
    'Nº documento': clean_(p.docNumero).toUpperCase(),
    'Ciudad': clean_(p.ciudad),
    'Nivel pádel': clean_(p.nivel),
    'Salud / alergias': clean_(p.salud),
    'Emergencia: nombre': clean_(p.emergenciaNombre),
    'Emergencia: teléfono': clean_(p.emergenciaTelefono),
    'Precio': precio,
    'Honorarios': honorarios,
    'Presupuesto': presupuesto,
    'Seguro recibido': false,
    'Vuelos recibidos': false,
    'Contrato PDF': pdf.getUrl(),
    'Aceptación contrato': ahora,
    'Origen': 'Web',
  };
  // Nunca escribimos en "Pendiente": la calcula una ARRAYFORMULA de la cabecera
  // y cualquier valor en esa columna la rompería. Escribimos a ambos lados.
  const row = header.map((h) => (values.hasOwnProperty(h) ? values[h] : ''));
  const pIdx = header.indexOf('Pendiente');
  if (pIdx < 0) {
    sh.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    if (pIdx > 0) sh.getRange(rowIndex, 1, 1, pIdx).setValues([row.slice(0, pIdx)]);
    if (pIdx < row.length - 1) sh.getRange(rowIndex, pIdx + 2, 1, row.length - pIdx - 1).setValues([row.slice(pIdx + 1)]);
  }

  enviarEmail_(cfg, {
    id: id,
    email: clean_(p.email),
    nombre: clean_(p.nombre),
    salida: salida,
    habTexto: habTexto,
    precio: precio,
    pdf: pdf,
  });

  return { ok: true, id: id, libres: salida.libres - 1 };
}

// ---------- contrato ----------

function generarContrato_(cfg, campos, nombre) {
  const carpeta = DriveApp.getFolderById(cfg.carpeta_contratos);
  const copia = DriveApp.getFileById(cfg.plantilla_contrato).makeCopy('Contrato ' + nombre, carpeta);
  const doc = DocumentApp.openById(copia.getId());
  const body = doc.getBody();
  Object.keys(campos).forEach((k) => {
    body.replaceText('\\{\\{' + k + '\\}\\}', String(campos[k]).replace(/\$/g, ''));
  });
  doc.saveAndClose();
  const pdf = carpeta.createFile(copia.getAs(MimeType.PDF)).setName('Contrato ' + nombre + '.pdf');
  copia.setTrashed(true);
  return pdf;
}

// ---------- email ----------

function enviarEmail_(cfg, r) {
  const segundo = num_(cfg.segundo_pago);
  const reserva = num_(cfg.pago_reserva);
  const resto = r.precio - reserva - segundo;
  const finalFecha = new Date(r.salida.inicio.getTime());
  finalFecha.setDate(finalFecha.getDate() - num_(cfg.dias_pago_final));

  const pago = cfg.iban
    ? '<p style="margin:0 0 8px">Puedes pagar los <b>' + eur_(reserva) + '</b> de la reserva por transferencia:</p>' +
      '<table style="border-collapse:collapse;font-size:14px;margin:0 0 8px">' +
      fila_('Titular', 'PADEL WORLD EXPERIENCE LLC') + fila_('IBAN', cfg.iban) + (cfg.bic ? fila_('BIC', cfg.bic) : '') +
      fila_('Concepto', r.id + ' ' + r.nombre) + '</table>'
    : '<p style="margin:0 0 8px">' + esc_(cfg.instrucciones_pago || '') + '</p>';

  const html =
    '<div style="font-family:Helvetica,Arial,sans-serif;color:#0B1F19;max-width:560px;margin:0 auto;line-height:1.55">' +
    '<div style="background:#0E3B2D;color:#FEFAE0;padding:28px 28px 22px;border-radius:18px 18px 0 0">' +
    '<div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.8">Padel Travellers · Bali 2027</div>' +
    '<div style="font-size:26px;font-weight:bold;margin-top:6px">¡Tu plaza está reservada, ' + esc_(r.nombre) + '!</div></div>' +
    '<div style="border:1px solid #E3E8E5;border-top:0;border-radius:0 0 18px 18px;padding:24px 28px">' +
    '<p style="margin:0 0 16px">Gracias por reservar. Te dejamos aquí el resumen y, adjunto, tu contrato con todos los datos.</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px;margin:0 0 18px">' +
    fila_('Reserva', r.id) + fila_('Viaje', 'Bali 2027 · Viaje ' + r.salida.viaje + ' · ' + r.salida.etiqueta) +
    fila_('Habitación', r.habTexto) + fila_('Precio', eur_(r.precio)) + '</table>' +
    '<div style="font-weight:bold;color:#0E3B2D;margin:0 0 6px">Cómo pagas</div>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px;margin:0 0 14px">' +
    fila_('Ahora, para reservar', eur_(reserva) + ' (reembolsable hasta que se confirme el grupo)') +
    fila_('Al confirmarse el grupo', eur_(segundo)) +
    fila_('Antes del ' + fechaLarga_(finalFecha), eur_(resto)) + '</table>' +
    pago +
    '<div style="font-weight:bold;color:#0E3B2D;margin:18px 0 6px">Próximos pasos</div>' +
    '<ol style="padding-left:18px;margin:0 0 14px;font-size:14px">' +
    '<li>Paga la reserva para asegurar tu plaza.</li>' +
    '<li>Te avisamos en cuanto el grupo llegue a 8 viajeros. Entonces podrás comprar tus vuelos.</li>' +
    '<li>Contrata tu seguro de viaje (obligatorio, que cubra la práctica de pádel) y envíanos una copia al menos 15 días antes de salir. Nuestros viajeros suelen ir con <a href="https://www.iatiseguros.com/" style="color:#0E3B2D">IATI</a> o <a href="https://heymondo.es/" style="color:#0E3B2D">Heymondo</a>.</li>' +
    '</ol>' +
    '<p style="margin:0 0 4px;font-size:14px">Cualquier duda, responde a este email o escríbenos por WhatsApp al +34 686 17 63 86.</p>' +
    '<p style="margin:18px 0 0;font-size:14px">Nos vemos en Bali,<br><b>Equipo Padel Travellers</b></p>' +
    '<p style="margin:18px 0 0;font-size:11px;color:#6B7570">Has aceptado el contrato de organización y coordinación de viaje en grupo al reservar en padeltravellers.com. Lo tienes adjunto en PDF.</p>' +
    '</div></div>';

  const texto =
    '¡Tu plaza está reservada, ' + r.nombre + '!\n\n' +
    'Reserva ' + r.id + ' · Bali 2027 · Viaje ' + r.salida.viaje + ' · ' + r.salida.etiqueta + '\n' +
    'Habitación: ' + r.habTexto + ' · Precio: ' + eur_(r.precio) + '\n\n' +
    'Pagos: ' + eur_(reserva) + ' ahora, ' + eur_(segundo) + ' al confirmarse el grupo y ' + eur_(resto) + ' antes del ' + fechaLarga_(finalFecha) + '.\n' +
    (cfg.iban ? 'IBAN: ' + cfg.iban + ' (concepto: ' + r.id + ' ' + r.nombre + ')\n' : (cfg.instrucciones_pago || '') + '\n') +
    '\nTe adjuntamos tu contrato. Cualquier duda, responde a este email.\n\nEquipo Padel Travellers';

  const opts = {
    htmlBody: html,
    attachments: [r.pdf.getAs(MimeType.PDF)],
    name: 'Padel Travellers',
    replyTo: cfg.remitente || undefined,
    bcc: cfg.copia_a || undefined,
  };
  const asunto = 'Reserva confirmada · Bali 2027 · Viaje ' + r.salida.viaje + ' (' + r.id + ')';
  try {
    GmailApp.sendEmail(r.email, asunto, texto, Object.assign({ from: cfg.remitente }, opts));
  } catch (err) {
    // Si el alias no está disponible como "Enviar como", se envía desde la cuenta principal.
    console.warn('Envío desde alias falló, uso la cuenta principal: ' + err);
    GmailApp.sendEmail(r.email, asunto, texto, opts);
  }
}

// ---------- datos ----------

function salidas_() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Salidas');
  const v = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 11).getValues();
  return v.filter((r) => r[0]).map((r) => ({
    codigo: String(r[0]),
    destino: String(r[1]),
    viaje: r[2],
    inicio: new Date(r[3]),
    fin: new Date(r[4]),
    plazas: num_(r[5]),
    libres: num_(r[7]),
    estado: String(r[10]),
    etiqueta: rango_(new Date(r[3]), new Date(r[4])),
  }));
}

function publicSalida_(s) {
  return { codigo: s.codigo, viaje: s.viaje, libres: s.libres, estado: s.estado };
}

function config_() {
  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Config');
  const v = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 2).getValues();
  const c = {};
  v.forEach((r) => { if (r[0]) c[String(r[0]).trim()] = typeof r[1] === 'string' ? r[1].trim() : r[1]; });
  return c;
}

function notificarError_(err, p) {
  try {
    const cfg = config_();
    MailApp.sendEmail(cfg.copia_a || Session.getEffectiveUser().getEmail(), '⚠️ Error en reserva web',
      'Error: ' + err + '\n\nDatos recibidos:\n' + JSON.stringify(p, null, 2));
  } catch (e) {
    console.error('No se pudo notificar el error: ' + e);
  }
}

// ---------- utilidades ----------

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function num_(v) { const n = Number(String(v).replace(/[^\d.-]/g, '')); return isNaN(n) ? 0 : n; }
function clean_(v) { return String(v || '').replace(/\s+/g, ' ').trim().slice(0, 300); }
function esc_(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function eur_(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' €'; }
function fechaLarga_(d) { return d.getDate() + ' de ' + MONTHS[d.getMonth()] + ' de ' + d.getFullYear(); }
function fechaCorta_(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  return m ? m[3] + '/' + m[2] + '/' + m[1] : clean_(iso);
}
function rango_(a, b) {
  return a.getMonth() === b.getMonth()
    ? a.getDate() + ' – ' + b.getDate() + ' ' + MONTHS[b.getMonth()]
    : a.getDate() + ' ' + MONTHS[a.getMonth()] + ' – ' + b.getDate() + ' ' + MONTHS[b.getMonth()];
}
function fila_(k, v) {
  return '<tr><td style="padding:6px 10px 6px 0;color:#6B7570;border-bottom:1px solid #EEF1EF;white-space:nowrap">' + esc_(k) +
    '</td><td style="padding:6px 0;border-bottom:1px solid #EEF1EF"><b>' + esc_(v) + '</b></td></tr>';
}

/** Ejecútalo una vez desde el editor para conceder permisos y probar sin enviar nada. */
function probarConfiguracion() {
  const cfg = config_();
  console.log('Config:', JSON.stringify(cfg));
  console.log('Salidas:', JSON.stringify(salidas_().map(publicSalida_)));
  console.log('Plantilla:', DriveApp.getFileById(cfg.plantilla_contrato).getName());
  console.log('Carpeta contratos:', DriveApp.getFolderById(cfg.carpeta_contratos).getName());
  console.log('Alias disponibles:', JSON.stringify(GmailApp.getAliases()));
}
