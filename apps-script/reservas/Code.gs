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
  if (action === 'campana_envio') return campanaEnvio_(e.parameter);
  if (action === 'informe') return informe_(e.parameter);
  if (action === 'informe_json') return informeJson_(e.parameter);
  if (action === 'programacion') {
    if (e.parameter.k !== CAMPANA_KEY) return json_({ ok: false });
    return json_({ ok: true, cuota: MailApp.getRemainingDailyQuota(), activadores: ScriptApp.getProjectTriggers().map((t) => ({ funcion: t.getHandlerFunction(), tipo: String(t.getEventType()) })) });
  }
  if (action === 'rebotes') {
    if (e.parameter.k !== CAMPANA_KEY) return json_({ ok: false });
    return json_(Object.assign({ ok: true }, revisarRebotes()));
  }
  if (action === 'folleto') {
    try {
      registrarFolleto_(e.parameter);
    } catch (err) {
      console.error('Folleto: ' + err);
    }
    return json_({ ok: true });
  }
  if (action === 'px' || action === 'clk') {
    try {
      registrarEvento_(e.parameter.i, action === 'px' ? 'open' : 'click', e.parameter.u);
    } catch (err) {
      console.error('Seguimiento: ' + err);
    }
    return action === 'px' ? ContentService.createTextOutput('') : json_({ ok: true });
  }
  return json_({ ok: true, service: 'pt-reservas' });
}

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'log') { registrarWeb_(String(p.evento || 'log').slice(0, 40), p.detalle || '', p); return json_({ ok: true }); }
  if (p.website) return json_({ ok: true }); // honeypot anti-bots

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    registrarRechazo_({ ok: false, error: 'ocupado' }, p);
    return json_({ ok: false, error: 'ocupado' });
  }
  try {
    const r = crearReserva_(p);
    if (!r.ok) registrarRechazo_(r, p);
    else registrarWeb_('reserva_ok', JSON.stringify({ ids: r.ids || r.id || '' }), p);
    return json_(r);
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    registrarWeb_('error_interno', String(err && err.stack ? err.stack : err).slice(0, 1500), p);
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
      'Teléfono': texto_(v.telefono),
      'Fecha nacimiento': fechaDate_(v.nacimiento),
      'Nacionalidad': clean_(v.nacionalidad),
      'Tipo doc.': clean_(v.docTipo),
      'Nº documento': doc,
      'Ciudad': clean_(v.ciudad),
      'Nivel pádel': clean_(v.nivel),
      'Salud / alergias': clean_(v.salud),
      'Emergencia: nombre': clean_(v.emergenciaNombre),
      'Emergencia: teléfono': texto_(v.emergenciaTelefono),
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
    creados.push({ id: id, email: clean_(v.email), nombre: clean_(v.nombre), habTexto: habTexto, pdf: pdf,
      completo: nombreCompleto, telefono: clean_(v.telefono), nivel: clean_(v.nivel), ciudad: clean_(v.ciudad), salud: clean_(v.salud) });
  });

  creados.forEach((c) => enviarEmail_(cfg, Object.assign({ salida: salida, precio: precio }, c)));
  // Aviso interno opcional: solo si Config «aviso_reserva_a» tiene un email (Oriol prefiere la copia oculta).
  if (cfg.aviso_reserva_a) try {
    avisarReserva_(cfg, salida, creados, precio, salida.libres - pax);
  } catch (err) {
    console.error('Aviso de reserva a Oriol falló: ' + err);
  }

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
  const m = datosEmail_(cfg, r);
  const opts = {
    htmlBody: emailHtml_(cfg, r, m),
    attachments: [r.pdf.getAs(MimeType.PDF)],
    name: 'Padel Travellers',
    replyTo: cfg.remitente || undefined,
    bcc: cfg.copia_a || undefined,
  };
  const asunto = 'Reserva confirmada · ' + r.salida.destino + ' 2027 · Viaje ' + r.salida.viaje + ' (' + r.id + ')';
  const texto = emailTexto_(cfg, r, m);
  try {
    GmailApp.sendEmail(r.email, asunto, texto, Object.assign({ from: cfg.remitente }, opts));
  } catch (err) {
    // Si el alias no está disponible como "Enviar como", se envía desde la cuenta principal.
    console.warn('Envío desde alias falló, uso la cuenta principal: ' + err);
    GmailApp.sendEmail(r.email, asunto, texto, opts);
  }
}

/** Importes y fechas de los pagos de una reserva. */
function datosEmail_(cfg, r) {
  const reserva = num_(cfg.pago_reserva);
  const segundo = num_(cfg.segundo_pago);
  const finalFecha = new Date(r.salida.inicio.getTime());
  finalFecha.setDate(finalFecha.getDate() - num_(cfg.dias_pago_final));
  return {
    reserva: reserva,
    segundo: segundo,
    resto: r.precio - reserva - segundo,
    finalFecha: finalFecha,
    concepto: r.id + ' ' + r.nombre,
    viaje: r.salida.destino + ' 2027 · Viaje ' + r.salida.viaje,
  };
}

// Colores de marca
const C_ = { verde: '#0E3B2D', crema: '#F5EFE6', arcilla: '#B8543A', tinta: '#0B1F19', gris: '#6B7570', linea: '#E7E1D6', palido: '#EEF3EF' };

function emailHtml_(cfg, r, m) {
  const logo = cfg.logo_email || 'https://padeltravellers.com/logos/logo-white.png';
  const wa = 'https://wa.me/34686176386';
  const h2 = (t) => '<div style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:' + C_.arcilla + ';font-weight:bold;margin:30px 0 10px">' + t + '</div>';
  const filaPago = (k, v, nota) =>
    '<tr><td style="padding:9px 0;border-bottom:1px solid ' + C_.linea + ';font-size:14px;color:' + C_.tinta + '">' + esc_(k) +
    (nota ? '<div style="font-size:12px;color:' + C_.gris + '">' + esc_(nota) + '</div>' : '') +
    '</td><td style="padding:9px 0;border-bottom:1px solid ' + C_.linea + ';font-size:15px;font-weight:bold;text-align:right;white-space:nowrap;color:' + C_.verde + '">' + esc_(v) + '</td></tr>';
  const dato = (k, v, copiar) =>
    '<tr><td style="padding:5px 12px 5px 0;font-size:13px;color:' + C_.gris + ';white-space:nowrap;vertical-align:top">' + esc_(k) +
    '</td><td style="padding:5px 0;font-size:14px;color:' + C_.tinta + ';font-weight:bold;word-break:break-word' + (copiar ? ';font-family:Menlo,Consolas,monospace;letter-spacing:.02em' : '') + '">' + esc_(v) + '</td></tr>';

  const tieneBanco = cfg.banco_cuenta && cfg.banco_swift;
  const pagoRevolut = cfg.revolut_revtag
    ? '<div style="border:1px solid ' + C_.linea + ';border-radius:14px;padding:16px 18px;margin:0 0 12px">' +
      '<div style="font-size:15px;font-weight:bold;color:' + C_.verde + '">Opción 1 · Con Revolut <span style="font-weight:normal;color:' + C_.gris + ';font-size:13px">(la más rápida)</span></div>' +
      '<ol style="margin:10px 0 0;padding-left:20px;font-size:14px;line-height:1.6;color:' + C_.tinta + '">' +
      '<li>Abre la app de Revolut y toca <b>Enviar</b>.</li>' +
      '<li>Busca nuestra Revtag: <b style="font-family:Menlo,Consolas,monospace;color:' + C_.verde + '">' + esc_(cfg.revolut_revtag) + '</b> (Padel World Experience LLC).</li>' +
      '<li>Envía <b>' + eur_(m.reserva) + '</b> y en la nota escribe <b>' + esc_(m.concepto) + '</b>.</li>' +
      '</ol>' +
      '<p style="margin:10px 0 0;font-size:13px;line-height:1.5;color:' + C_.gris + '">¿Aún no tienes Revolut? Puedes <a href="' + (cfg.revolut_referral || 'https://www.revolut.com/referral/?referral-code=josepojqv%21JUN2-24-AR') + '" style="color:' + C_.verde + ';font-weight:bold">crear tu cuenta aquí</a> en unos minutos desde el móvil.</p>' +
      '</div>'
    : '';
  const pagoBanco = tieneBanco
    ? '<div style="border:1px solid ' + C_.linea + ';border-radius:14px;padding:16px 18px;margin:0 0 12px">' +
      '<div style="font-size:15px;font-weight:bold;color:' + C_.verde + '">' + (cfg.revolut_revtag ? 'Opción 2 · ' : '') + 'Transferencia desde tu banco</div>' +
      '<p style="margin:8px 0 10px;font-size:13px;line-height:1.55;color:' + C_.gris + '">Es una <b style="color:' + C_.tinta + '">transferencia internacional en euros</b> (SWIFT) a nuestra cuenta de Estados Unidos. En tu banco elige «transferencia internacional» o «al extranjero», moneda EUR, y copia estos datos:</p>' +
      '<table role="presentation" style="border-collapse:collapse;width:100%">' +
      dato('Beneficiario', cfg.banco_titular || 'PADEL WORLD EXPERIENCE LLC') +
      (cfg.banco_direccion ? dato('Dirección', cfg.banco_direccion) : '') +
      dato('Nº de cuenta', cfg.banco_cuenta, true) +
      (cfg.banco_ruta ? dato('Nº de ruta', cfg.banco_ruta, true) : '') +
      dato('SWIFT / BIC', cfg.banco_swift, true) +
      (cfg.banco_intermediario ? dato('BIC intermediario', cfg.banco_intermediario, true) : '') +
      dato('Importe', eur_(m.reserva)) +
      dato('Concepto', m.concepto) +
      '</table>' +
      '<p style="margin:10px 0 0;font-size:12px;line-height:1.5;color:' + C_.gris + '">Algunos bancos cobran una comisión por las transferencias internacionales. Si tienes Revolut, mejor usa la opción 1.</p>' +
      '</div>'
    : '';
  const pagoIban = !tieneBanco && cfg.iban
    ? '<table role="presentation" style="border-collapse:collapse;width:100%">' + dato('Titular', 'PADEL WORLD EXPERIENCE LLC') + dato('IBAN', cfg.iban, true) + (cfg.bic ? dato('BIC', cfg.bic, true) : '') + dato('Concepto', m.concepto) + '</table>'
    : '';
  const pago = pagoRevolut || pagoBanco || pagoIban
    ? pagoRevolut + pagoBanco + pagoIban +
      '<p style="margin:4px 0 0;font-size:14px;line-height:1.55;color:' + C_.tinta + '">Pon siempre el concepto <b>' + esc_(m.concepto) + '</b> para que sepamos de quién es el pago. Cuando lo recibamos, te lo confirmamos.</p>'
    : '<p style="margin:0;font-size:14px;color:' + C_.tinta + '">' + esc_(cfg.instrucciones_pago || '') + '</p>';

  return '' +
    '<div style="background:' + C_.crema + ';padding:28px 12px;font-family:Helvetica,Arial,sans-serif;color:' + C_.tinta + '">' +
    '<div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:22px;overflow:hidden">' +
    // Cabecera con logo
    '<div style="background:' + C_.verde + ';padding:30px 28px 26px;text-align:center">' +
    '<img src="' + esc_(logo) + '" alt="Padel Travellers" width="190" style="display:block;margin:0 auto;width:190px;max-width:70%;height:auto;border:0">' +
    '<div style="margin-top:18px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#FEFAE0;opacity:.75">' + esc_(m.viaje) + ' · ' + esc_(r.salida.etiqueta) + '</div>' +
    '</div>' +
    // Cuerpo
    '<div style="padding:30px 28px 8px">' +
    '<div style="font-size:26px;line-height:1.25;font-weight:bold;color:' + C_.verde + '">¡Tu plaza está reservada, ' + esc_(r.nombre) + '!</div>' +
    '<p style="margin:12px 0 0;font-size:15px;line-height:1.6">Gracias por confiar en nosotros. Aquí tienes el resumen de tu reserva y cómo pagarla. Adjunta va la confirmación con todas las condiciones del viaje.</p>' +
    // Resumen
    '<div style="background:' + C_.palido + ';border-radius:16px;padding:16px 18px;margin:22px 0 0">' +
    '<table role="presentation" style="border-collapse:collapse;width:100%">' +
    dato('Código de reserva', r.id) + dato('Viaje', m.viaje) + dato('Fechas', r.salida.etiqueta) + dato('Habitación', r.habTexto) + dato('Precio total', eur_(r.precio)) +
    '</table></div>' +
    // Pago de la reserva
    h2('El pago de la reserva') +
    '<p style="margin:0 0 14px;font-size:15px;line-height:1.6">Para dejar tu plaza confirmada solo falta el pago de la reserva, de <b style="color:' + C_.arcilla + '">' + eur_(m.reserva) + '</b>. Es reembolsable hasta que se confirme el grupo. Puedes hacerlo de dos formas, la que te vaya mejor:</p>' +
    pago +
    // Calendario
    h2('Calendario de pagos') +
    '<table role="presentation" style="border-collapse:collapse;width:100%">' +
    filaPago('Ahora, para reservar', eur_(m.reserva), 'Reembolsable hasta que se confirme el grupo') +
    filaPago('Al confirmarse el grupo', eur_(m.segundo), 'Te avisamos cuando lleguemos a 8 viajeros') +
    filaPago('Antes del ' + fechaLarga_(m.finalFecha), eur_(m.resto), 'Pago final') +
    '</table>' +
    // Próximos pasos
    h2('Próximos pasos') +
    '<ol style="padding-left:20px;margin:0;font-size:14px;line-height:1.65">' +
    '<li>Realizar el pago de la reserva. Cuando lo recibamos, te lo confirmamos.</li>' +
    '<li>Te avisamos en cuanto el grupo llegue a 8 viajeros. Entonces ya puedes comprar tus vuelos.</li>' +
    '<li>Contrata tu seguro de viaje (obligatorio, que cubra la práctica de pádel) y envíanos una copia al menos 15 días antes de salir. Nuestros viajeros suelen ir con el <a href="' + (cfg.iati_url || 'https://www.iatiseguros.com/seguros-viaje/21841/seguro-de-viaje-mochilero/?r=09220966471371') + '" style="color:' + C_.verde + '">seguro Mochilero de IATI</a>.</li>' +
    '</ol>' +
    // Contacto
    '<div style="text-align:center;margin:30px 0 6px">' +
    '<a href="' + wa + '" style="display:inline-block;background:' + C_.verde + ';color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:13px 26px;border-radius:999px">¿Dudas? Escríbenos por WhatsApp</a>' +
    '<div style="font-size:13px;color:' + C_.gris + ';margin-top:10px">o responde a este email</div></div>' +
    '<p style="margin:26px 0 0;font-size:15px;line-height:1.5">Nos vemos en ' + esc_(r.salida.destino) + ',<br><b style="color:' + C_.verde + '">Equipo Padel Travellers</b></p>' +
    '</div>' +
    // Pie
    '<div style="padding:20px 28px 24px;margin-top:22px;border-top:1px solid ' + C_.linea + ';font-size:11px;line-height:1.6;color:' + C_.gris + '">' +
    'Al reservar en padeltravellers.com has aceptado las condiciones del viaje (las tienes adjuntas en PDF).<br>' +
    'Padel Travellers · Padel World Experience LLC · <a href="https://padeltravellers.com" style="color:' + C_.gris + '">padeltravellers.com</a>' +
    '</div>' +
    '</div></div>';
}

function emailTexto_(cfg, r, m) {
  const banco = cfg.banco_cuenta && cfg.banco_swift
    ? 'Transferencia internacional en EUR (SWIFT) desde tu banco:\n' +
      '  Beneficiario: ' + (cfg.banco_titular || 'PADEL WORLD EXPERIENCE LLC') + '\n' +
      (cfg.banco_direccion ? '  Dirección: ' + cfg.banco_direccion + '\n' : '') +
      '  Nº de cuenta: ' + cfg.banco_cuenta + '\n' +
      (cfg.banco_ruta ? '  Nº de ruta: ' + cfg.banco_ruta + '\n' : '') +
      '  SWIFT/BIC: ' + cfg.banco_swift + '\n' +
      (cfg.banco_intermediario ? '  BIC intermediario: ' + cfg.banco_intermediario + '\n' : '')
    : (cfg.iban ? 'IBAN: ' + cfg.iban + '\n' : '');
  const revolut = cfg.revolut_revtag ? 'Con Revolut: envía ' + eur_(m.reserva) + ' a la Revtag ' + cfg.revolut_revtag + '. ¿No tienes Revolut? Crea tu cuenta aquí: ' + (cfg.revolut_referral || 'https://www.revolut.com/referral/?referral-code=josepojqv%21JUN2-24-AR') + '\n' : '';
  return '¡Tu plaza está reservada, ' + r.nombre + '!\n\n' +
    'Reserva ' + r.id + ' · ' + m.viaje + ' · ' + r.salida.etiqueta + '\n' +
    'Habitación: ' + r.habTexto + ' · Precio total: ' + eur_(r.precio) + '\n\n' +
    'PAGO DE LA RESERVA (' + eur_(m.reserva) + ', reembolsable hasta que se confirme el grupo)\n' +
    (revolut || banco ? revolut + banco + 'Concepto: ' + m.concepto + '\n' : (cfg.instrucciones_pago || '') + '\n') +
    '\nCalendario de pagos: ' + eur_(m.reserva) + ' ahora, ' + eur_(m.segundo) + ' al confirmarse el grupo y ' + eur_(m.resto) + ' antes del ' + fechaLarga_(m.finalFecha) + '.\n' +
    '\nTe adjuntamos la confirmación de tu reserva con las condiciones del viaje. Cualquier duda, responde a este email o escríbenos por WhatsApp al +34 686 17 63 86.\n\nEquipo Padel Travellers';
}

/** Aviso interno opcional de cada reserva nueva. Desactivado por defecto: Oriol prefiere la copia oculta (bcc a copia_a). Se activa poniendo un email en Config «aviso_reserva_a». */
function avisarReserva_(cfg, salida, creados, precio, libres) {
  const para = cfg.aviso_reserva_a;
  const nombres = creados.map((c) => c.completo).join(' y ');
  const asunto = '🎉 Nueva reserva · ' + salida.destino + ' Viaje ' + salida.viaje + ' (' + salida.etiqueta + ') · ' + nombres;
  const viajero = (c) =>
    '<tr><td colspan="2" style="padding:14px 0 4px;font-size:16px;font-weight:bold;color:#0E3B2D">' + esc_(c.completo) + ' · ' + esc_(c.id) + '</td></tr>' +
    fila_('Habitación', c.habTexto) + fila_('Teléfono', c.telefono) + fila_('Email', c.email) +
    fila_('Ciudad', c.ciudad) + fila_('Nivel de pádel', c.nivel) + (c.salud ? fila_('Salud / alergias', c.salud) : '') +
    '<tr><td style="padding:6px 10px 6px 0;color:#6B7570">Contrato</td><td style="padding:6px 0"><a href="' + esc_(c.pdf.getUrl()) + '" style="color:#0E3B2D">Ver PDF</a></td></tr>';
  const html =
    '<div style="font-family:Helvetica,Arial,sans-serif;color:#0B1F19;max-width:560px;line-height:1.5">' +
    '<div style="font-size:20px;font-weight:bold;color:#0E3B2D;margin:0 0 6px">Nueva reserva en la web</div>' +
    '<div style="font-size:14px;color:#6B7570;margin:0 0 12px">' + esc_(salida.destino) + ' 2027 · Viaje ' + esc_(salida.viaje) + ' · ' + esc_(salida.etiqueta) +
    ' · ' + eur_(precio) + ' por persona · quedan ' + libres + ' plazas libres en esta salida</div>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px">' + creados.map(viajero).join('') + '</table>' +
    '<p style="margin:16px 0 0;font-size:14px">Estado: pre-reserva, pendiente del pago de ' + eur_(num_(cfg.pago_reserva)) + ' por persona. ' +
    '<a href="https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit" style="color:#0E3B2D">Abrir el Sheet de reservas</a></p>' +
    '</div>';
  const texto = 'Nueva reserva: ' + nombres + ' · ' + salida.destino + ' Viaje ' + salida.viaje + ' (' + salida.etiqueta + ')\n' +
    creados.map((c) => c.id + ' · ' + c.completo + ' · ' + c.habTexto + ' · ' + c.telefono + ' · ' + c.email).join('\n') +
    '\nQuedan ' + libres + ' plazas libres.';
  MailApp.sendEmail({ to: para, subject: asunto, htmlBody: html, body: texto, name: 'Reservas Padel Travellers' });
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

/** 2026-11-17 (Oriol: «si los clientes se quejan, poder identificarlo rápido»): pestaña «Registro web»
 * del Sheet de reservas con cada intento (reserva_ok, rechazada, error_interno, ocupado) y las incidencias
 * que manda el navegador del cliente (validacion, fallo_envio, error_js). Busca por email, nombre o «Sesión».
 * Nunca se guarda el número de documento. */
function registrarWeb_(evento, detalle, p) {
  try {
    let v1 = {};
    try { v1 = (JSON.parse(p.viajeros || '[]')[0]) || {}; } catch (e) {}
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sh = ss.getSheetByName('Registro web');
    if (!sh) {
      sh = ss.insertSheet('Registro web');
      sh.appendRow(['Fecha', 'Evento', 'Detalle', 'Sesión', 'Salida', 'Habitación', 'Nombre', 'Email', 'Teléfono', 'Nacionalidad', 'Página', 'Navegador']);
      sh.setFrozenRows(1);
    }
    if (sh.getLastRow() > 20000) return; // tope de seguridad
    sh.appendRow([new Date(), evento, String(detalle || '').slice(0, 1500), clean_(p.sid), clean_(p.salida), clean_(p.habitacion),
      clean_((v1.nombre || '') + ' ' + (v1.apellidos || '')), clean_(v1.email), clean_(v1.telefono), clean_(v1.nacionalidad),
      clean_(p.pagina), clean_(p.ua)]);
  } catch (e) {
    console.error('No se pudo escribir en Registro web: ' + e);
  }
}

/** Reserva rechazada por validación: al registro y email a Oriol con el motivo. */
function registrarRechazo_(r, p) {
  const motivo = (r.error || 'motivo desconocido') + (r.viajero ? ' (viajero ' + r.viajero + ')' : '') + (r.campos ? ' · campos: ' + r.campos.join(', ') : '') + (r.libres !== undefined ? ' · libres: ' + r.libres : '');
  registrarWeb_('rechazada', motivo, p);
  try {
    let v1 = {};
    try { v1 = (JSON.parse(p.viajeros || '[]')[0]) || {}; } catch (e) {}
    const cfg = config_();
    MailApp.sendEmail(cfg.copia_a || Session.getEffectiveUser().getEmail(), '⚠️ Reserva web rechazada: ' + (r.error || 'motivo desconocido'),
      'La web no ha podido registrar una reserva.\n\nMotivo: ' + motivo + '\nSalida: ' + (p.salida || '') + ' · habitación: ' + (p.habitacion || '') +
      '\n\nViajero 1: ' + clean_((v1.nombre || '') + ' ' + (v1.apellidos || '')) + ' · ' + clean_(v1.email) + ' · ' + clean_(v1.telefono) + ' · ' + clean_(v1.nacionalidad) +
      '\n\nTodo el historial de ese intento está en la pestaña «Registro web» del Sheet de reservas (sesión ' + clean_(p.sid) + ').');
  } catch (e) {
    console.error('No se pudo avisar del rechazo: ' + e);
  }
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
/** Para el Sheet: un "+34 600…" se interpretaría como fórmula (#ERROR!). El apóstrofo lo fuerza a texto y no se ve. */
function texto_(v) { const t = clean_(v); return t ? "'" + t : ''; }
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
