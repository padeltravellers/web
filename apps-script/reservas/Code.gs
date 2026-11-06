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
  if (action === 'baja') return baja_(e.parameter);
  if (action === 'campana_prueba') return campanaPrueba_(e.parameter);
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
  if (p.acepta !== 'si') return { ok: false, error: 'contrato' };
  const hab = String(p.habitacion || '').toLowerCase();
  if (hab !== 'compartida' && hab !== 'individual') return { ok: false, error: 'habitacion' };
  const pax = hab === 'compartida' ? 2 : 1;

  let viajeros;
  try {
    viajeros = JSON.parse(p.viajeros || '[]');
  } catch (err) {
    return { ok: false, error: 'faltan_datos' };
  }
  if (!Array.isArray(viajeros) || viajeros.length !== pax) return { ok: false, error: 'viajeros' };

  const required = ['nombre', 'apellidos', 'email', 'telefono', 'nacimiento', 'nacionalidad', 'docTipo', 'docNumero', 'ciudad', 'nivel', 'emergenciaNombre', 'emergenciaTelefono'];
  for (let i = 0; i < viajeros.length; i++) {
    const v = viajeros[i];
    const missing = required.filter((k) => !String(v[k] || '').trim());
    if (missing.length) return { ok: false, error: 'faltan_datos', viajero: i + 1, campos: missing };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v.email).trim())) return { ok: false, error: 'email', viajero: i + 1 };
    if (edad_(v.nacimiento) < 18) return { ok: false, error: 'menor', viajero: i + 1 };
  }

  const cfg = config_();
  const salida = salidas_().find((s) => s.codigo === String(p.salida));
  if (!salida) return { ok: false, error: 'salida' };
  if (salida.libres < pax) return { ok: false, error: 'completo', libres: salida.libres };

  const precio = hab === 'compartida' ? num_(cfg.precio_compartida) : num_(cfg.precio_individual);
  const honorarios = num_(cfg.honorarios);
  const presupuesto = precio - honorarios;
  const ahora = new Date();

  const sh = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Viajeros');
  const header = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  const ids = sh.getRange(2, 1, Math.max(sh.getMaxRows() - 1, 1), 1).getValues().map((r) => r[0]);
  let last = 0;
  ids.forEach((v, i) => { if (v !== '' && v !== null) last = i + 1; });

  const nombres = viajeros.map((v) => clean_(v.nombre) + ' ' + clean_(v.apellidos));
  const creados = [];

  viajeros.forEach((v, i) => {
    const rowIndex = last + 2 + i;
    const id = 'PT27-' + ('000' + (last + 1 + i)).slice(-3);
    const nombreCompleto = nombres[i];
    const acompanante = pax === 2 ? nombres[1 - i] : '';
    const habTexto = pax === 2 ? 'Compartida con ' + acompanante : 'Individual';
    const doc = clean_(v.docNumero).toUpperCase();

    // Todo lo que depende del régimen de habitación va resuelto: el contrato es único para cada viajero.
    const regimen = pax === 2 ? 'Habitación doble compartida con ' + acompanante : 'Habitación individual, de uso exclusivo del Viajero';
    const alojamiento = pax === 2
      ? 'Alojamiento durante 13 noches en hotel con desayuno, en habitación doble compartida únicamente con ' + acompanante + ', con quien el Viajero ha hecho la reserva conjunta. Nunca se comparte habitación con otros viajeros.'
      : 'Alojamiento durante 13 noches en hotel con desayuno, en habitación individual de uso exclusivo del Viajero.';
    const precioTexto = 'El precio total del Viaje para el Viajero (el «Precio») es de ' + eur_(precio) + ', impuestos incluidos, en régimen de ' +
      (pax === 2 ? 'habitación doble compartida con ' + acompanante : 'habitación individual') + '. ' +
      'El Precio se compone de ' + eur_(honorarios) + ' de Honorarios de Padel Travellers y ' + eur_(presupuesto) + ' de Presupuesto del Viaje, tal como se detalla en el Anexo I.';
    const pagoReserva = num_(cfg.pago_reserva);
    const segundoPago = num_(cfg.segundo_pago);
    const pagoFinal = precio - pagoReserva - segundoPago;
    const fechaFinal = new Date(salida.inicio.getTime());
    fechaFinal.setDate(fechaFinal.getDate() - num_(cfg.dias_pago_final));
    const finalVencido = fechaFinal.getTime() <= ahora.getTime();
    const finalCuando = finalVencido ? 'Al confirmarse el grupo, junto con el segundo pago.' : 'Antes del ' + fechaLarga_(fechaFinal) + ' (' + num_(cfg.dias_pago_final) + ' días antes del inicio del Viaje).';
    const finalCorto = finalVencido ? 'al confirmarse el grupo' : 'antes del ' + fechaLarga_(fechaFinal);

    const pdf = generarContrato_(cfg, {
      VIAJE: String(salida.viaje),
      INICIO: fechaLarga_(salida.inicio),
      FIN: fechaLarga_(salida.fin),
      FECHA_RESERVA: fechaLarga_(ahora),
      NOMBRE: nombreCompleto,
      NACIONALIDAD: clean_(v.nacionalidad),
      DOC_TIPO: clean_(v.docTipo),
      DOC_NUM: doc,
      DOCUMENTO: clean_(v.docTipo) + ' ' + doc,
      EMAIL: clean_(v.email),
      TELEFONO: clean_(v.telefono),
      NACIMIENTO: fechaCorta_(v.nacimiento),
      CIUDAD: clean_(v.ciudad),
      REGIMEN: regimen,
      ALOJAMIENTO: alojamiento,
      PRECIO_TEXTO: precioTexto,
      PRECIO: eur_(precio),
      HONORARIOS: eur_(honorarios),
      PRESUPUESTO: eur_(presupuesto),
      PAGO_RESERVA: eur_(pagoReserva),
      PAGO_RESERVA_ESTADO: 'pendiente de pago',
      SEGUNDO_PAGO: eur_(segundoPago),
      PAGO_FINAL: eur_(pagoFinal),
      PAGO_FINAL_CUANDO: finalCuando,
      PAGO_FINAL_CUANDO_CORTO: finalCorto,
      NIVEL: clean_(v.nivel),
      SALUD: clean_(v.salud) || 'Nada que destacar',
      EMERGENCIA: clean_(v.emergenciaNombre) + ' · ' + clean_(v.emergenciaTelefono),
      IBAN: cfg.iban || 'Se indica en el email de confirmación',
      BIC: cfg.bic || 'Se indica en el email de confirmación',
      CONCEPTO: id + ' · ' + nombreCompleto + ' · Bali 2027 Viaje ' + salida.viaje,
      ACEPTACION: Utilities.formatDate(ahora, 'Europe/Madrid', 'dd/MM/yyyy HH:mm') + ' (hora de España), en padeltravellers.com' + (pax === 2 && i === 1 ? ', reserva hecha junto a ' + nombres[0] : ''),
    }, id + ' · ' + salida.codigo + ' · ' + nombreCompleto);

    const values = {
      'ID': id,
      'Fecha reserva': ahora,
      'Estado': 'Pre-reserva',
      'Destino': salida.destino,
      'Salida': salida.codigo,
      'Fechas': salida.etiqueta,
      'Habitación': pax === 2 ? 'Compartida' : 'Individual',
      'Acompañante': acompanante,
      'Nombre': clean_(v.nombre),
      'Apellidos': clean_(v.apellidos),
      'Email': clean_(v.email),
      'Teléfono': clean_(v.telefono),
      'Fecha nacimiento': fechaDate_(v.nacimiento),
      'Nacionalidad': clean_(v.nacionalidad),
      'Tipo doc.': clean_(v.docTipo),
      'Nº documento': doc,
      'Ciudad': clean_(v.ciudad),
      'Nivel pádel': clean_(v.nivel),
      'Salud / alergias': clean_(v.salud),
      'Emergencia: nombre': clean_(v.emergenciaNombre),
      'Emergencia: teléfono': clean_(v.emergenciaTelefono),
      'Precio': precio,
      'Honorarios': honorarios,
      'Presupuesto': presupuesto,
      'Seguro': false,
      'Visado': false,
      'RC': false,
      'Vídeos': false,
      'Contrato PDF': pdf.getUrl(),
      'Aceptación contrato': ahora,
      'Origen': 'Web',
      'Comentarios': pax === 2 ? 'Reserva conjunta con ' + acompanante : '',
    };
    escribirFila_(sh, header, rowIndex, values);
    creados.push({ id: id, email: clean_(v.email), nombre: clean_(v.nombre), habTexto: habTexto, pdf: pdf });
  });

  creados.forEach((c) => enviarEmail_(cfg, Object.assign({ salida: salida, precio: precio }, c)));

  return { ok: true, ids: creados.map((c) => c.id), libres: salida.libres - pax };
}

/** Escribe la fila sin tocar la columna "Pendiente" (ARRAYFORMULA de la cabecera). */
function escribirFila_(sh, header, rowIndex, values) {
  // Las cabeceras del Sheet pueden venir con los acentos descompuestos (NFD): se comparan normalizadas.
  const norm = (s) => String(s).normalize('NFC').trim();
  const byKey = {};
  Object.keys(values).forEach((k) => { byKey[norm(k)] = values[k]; });
  const row = header.map((h) => (byKey.hasOwnProperty(norm(h)) ? byKey[norm(h)] : ''));
  const pIdx = header.map(norm).indexOf('Pendiente');
  if (pIdx < 0) {
    sh.getRange(rowIndex, 1, 1, row.length).setValues([row]);
    return;
  }
  if (pIdx > 0) sh.getRange(rowIndex, 1, 1, pIdx).setValues([row.slice(0, pIdx)]);
  if (pIdx < row.length - 1) sh.getRange(rowIndex, pIdx + 2, 1, row.length - pIdx - 1).setValues([row.slice(pIdx + 1)]);
}

function edad_(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  if (!m) return -1;
  const hoy = new Date();
  let a = hoy.getFullYear() - Number(m[1]);
  const mm = hoy.getMonth() + 1 - Number(m[2]);
  if (mm < 0 || (mm === 0 && hoy.getDate() < Number(m[3]))) a--;
  return a;
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
  const sinRellenar = body.getText().match(/\{\{[A-Z_]+\}\}/g);
  if (sinRellenar) console.warn('Campos sin rellenar en el contrato ' + nombre + ': ' + sinRellenar.join(', '));
  doc.saveAndClose();
  const pdf = carpeta.createFile(copia.getAs(MimeType.PDF)).setName('Reserva ' + nombre + '.pdf');
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
    '<div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;opacity:.8">Padel Travellers · ' + esc_(r.salida.destino) + ' 2027</div>' +
    '<div style="font-size:26px;font-weight:bold;margin-top:6px">¡Tu plaza está reservada, ' + esc_(r.nombre) + '!</div></div>' +
    '<div style="border:1px solid #E3E8E5;border-top:0;border-radius:0 0 18px 18px;padding:24px 28px">' +
    '<p style="margin:0 0 16px">Gracias por reservar. Te dejamos aquí el resumen y, adjunta, la confirmación de tu reserva con todas las condiciones del viaje.</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px;margin:0 0 18px">' +
    fila_('Reserva', r.id) + fila_('Viaje', r.salida.destino + ' 2027 · Viaje ' + r.salida.viaje + ' · ' + r.salida.etiqueta) +
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
    '<p style="margin:18px 0 0;font-size:14px">Nos vemos en ' + esc_(r.salida.destino) + ',<br><b>Equipo Padel Travellers</b></p>' +
    '<p style="margin:18px 0 0;font-size:11px;color:#6B7570">Al reservar en padeltravellers.com has aceptado las condiciones del viaje. Las tienes adjuntas en PDF.</p>' +
    '</div></div>';

  const texto =
    '¡Tu plaza está reservada, ' + r.nombre + '!\n\n' +
    'Reserva ' + r.id + ' · ' + r.salida.destino + ' 2027 · Viaje ' + r.salida.viaje + ' · ' + r.salida.etiqueta + '\n' +
    'Habitación: ' + r.habTexto + ' · Precio: ' + eur_(r.precio) + '\n\n' +
    'Pagos: ' + eur_(reserva) + ' ahora, ' + eur_(segundo) + ' al confirmarse el grupo y ' + eur_(resto) + ' antes del ' + fechaLarga_(finalFecha) + '.\n' +
    (cfg.iban ? 'IBAN: ' + cfg.iban + ' (concepto: ' + r.id + ' ' + r.nombre + ')\n' : (cfg.instrucciones_pago || '') + '\n') +
    '\nTe adjuntamos la confirmación de tu reserva con las condiciones del viaje. Cualquier duda, responde a este email.\n\nEquipo Padel Travellers';

  const opts = {
    htmlBody: html,
    attachments: [r.pdf.getAs(MimeType.PDF)],
    name: 'Padel Travellers',
    replyTo: cfg.remitente || undefined,
    bcc: cfg.copia_a || undefined,
  };
  const asunto = 'Reserva confirmada · ' + r.salida.destino + ' 2027 · Viaje ' + r.salida.viaje + ' (' + r.id + ')';
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
  // Solo salidas con fechas (p. ej. IND-1 sin fechas todavía no se puede reservar).
  return v.filter((r) => r[0] && r[3] instanceof Date && r[4] instanceof Date).map((r) => ({
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
  return { codigo: s.codigo, destino: s.destino, viaje: s.viaje, libres: s.libres, estado: s.estado };
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
function fechaDate_(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : clean_(iso);
}
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
