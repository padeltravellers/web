/**
 * Campaña de email "Fechas Bali 2027" y bajas de publicidad.
 *
 * - GET ?action=campana_prueba&k=CLAVE  → envía UNA prueba a oriol@ (no toca el CRM).
 * - GET ?action=baja&e=EMAIL&t=TOKEN    → marca ese email como "No publicidad" en el CRM y lo registra.
 *
 * La CLAVE (CAMPANA_KEY) está en Secreto.gs, que NO se sube al repo (el repo es público).
 * - GET ?action=campana_envio&k=CLAVE&n=50 → envía la siguiente tanda (OK de Oriol 2026-11-15).
 *   Lee la pestaña ENVIO_TAB del Sheet de Reservas (Email, Nombre, Fila CRM, Estado) y solo
 *   envía a las filas con Estado vacío. Marca "enviando" ANTES de enviar (nunca dos veces).
 */

const CRM_ID = '1IxTWD5RNc9m3LitTtkBKbKm72a-jR7yFNmrMop40vy4'; // Sheet "Clientes" · pestaña "PT Sin vuelos"
const CRM_TAB = 'PT Sin vuelos';
const CRM_COL_MAIL = 11; // K
const CRM_COL_PUBLICIDAD_HEADER = 'Publicidad';
const PDF_BALI_2027 = '136Kp7cAN5UKorxIvVkYfSmQ7bernEYv1'; // "Viaje Padel y Bali 2027.pdf" (copia en Reservas 2027)
const ASUNTO_BALI_2027 = 'Fechas Bali 2027: 8 salidas de junio a octubre';
const PRUEBA_PARA = 'oriol@padeltravellers.com';
// Oriol (2026-11-15): la campaña SALE SIEMPRE de info@. Si el alias no está, no se envía nada.
const CAMPANA_FROM = 'info@padeltravellers.com';

function aliasCampanaOk_() {
  return GmailApp.getAliases().map((a) => String(a).toLowerCase()).indexOf(CAMPANA_FROM) >= 0;
}

function optsCampana_(html, pdf) {
  return { from: CAMPANA_FROM, replyTo: CAMPANA_FROM, name: 'Padel Travellers', htmlBody: html, attachments: [pdf] };
}
const PRUEBA_PERMITIDOS = ['oriol@padeltravellers.com', 'padeltravellers@gmail.com', 'miriam.padeltravellers@gmail.com'];

function tokenBaja_(email) {
  const sig = Utilities.computeHmacSha256Signature(String(email).trim().toLowerCase(), CAMPANA_KEY);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 22);
}

function urlBaja_(email) {
  return ScriptApp.getService().getUrl() + '?action=baja&e=' + encodeURIComponent(email) + '&t=' + tokenBaja_(email);
}

/**
 * Seguimiento de aperturas y clicks.
 * - Cada destinatario tiene un ID opaco (HMAC del email), sin el email en las URLs.
 * - Apertura: imagen de 1x1 que llama a ?action=px&i=ID (Gmail la carga al abrir el email).
 * - Click: los enlaces pasan por padeltravellers.com/go/, que avisa a ?action=clk y redirige.
 * - Todo se apunta en la pestaña TRACK_TAB del Sheet de Reservas, una fila por destinatario.
 */
const TRACK_TAB = 'Campaña Bali 2027';
const TRACK_HEAD = ['Email', 'Nombre', 'ID', 'Enviado', 'Primera apertura', 'Aperturas', 'Primer click', 'Clicks', 'Último enlace', 'Última actividad'];

function idSeguimiento_(email) {
  const sig = Utilities.computeHmacSha256Signature('trk:' + String(email).trim().toLowerCase(), CAMPANA_KEY);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 16);
}

function hojaTracking_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(TRACK_TAB);
  if (!sh) {
    sh = ss.insertSheet(TRACK_TAB);
    sh.appendRow(TRACK_HEAD);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, TRACK_HEAD.length).setFontWeight('bold');
  }
  return sh;
}

function filaTracking_(sh, id) {
  const f = sh.getRange('C:C').createTextFinder(id).matchEntireCell(true).findNext();
  return f ? f.getRow() : 0;
}

function registrarEnvio_(email, nombre) {
  const id = idSeguimiento_(email);
  const sh = hojaTracking_();
  const r = filaTracking_(sh, id);
  if (r) sh.getRange(r, 4).setValue(new Date());
  else sh.appendRow([String(email).trim().toLowerCase(), nombre || '', id, new Date(), '', 0, '', 0, '', '']);
  return id;
}

const EVENTOS_TAB = 'Campaña eventos';
function crearHojaEventos_() {
  const sh = SpreadsheetApp.openById(SHEET_ID).insertSheet(EVENTOS_TAB);
  sh.appendRow(['Fecha', 'Email', 'Nombre', 'Tipo', 'Destino']);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, 5).setFontWeight('bold');
  return sh;
}

function registrarEvento_(id, tipo, url) {
  if (!/^[A-Za-z0-9_-]{16}$/.test(String(id || ''))) return;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
  } catch (err) {
    return;
  }
  try {
    const sh = hojaTracking_();
    const r = filaTracking_(sh, id);
    if (!r) return;
    const ahora = new Date();
    const fila = sh.getRange(r, 1, 1, TRACK_HEAD.length).getValues()[0];
    if (!fila[4]) sh.getRange(r, 5).setValue(ahora); // un click también cuenta como apertura
    if (tipo === 'open') {
      sh.getRange(r, 6).setValue(Number(fila[5] || 0) + 1);
    } else {
      if (!fila[6]) sh.getRange(r, 7).setValue(ahora);
      sh.getRange(r, 8).setValue(Number(fila[7] || 0) + 1);
      sh.getRange(r, 9).setValue(String(url || '').slice(0, 200));
    }
    sh.getRange(r, 10).setValue(ahora);
    // Registro de cada evento (para el informe): fecha, email, nombre, tipo, destino.
    const ev = SpreadsheetApp.openById(SHEET_ID).getSheetByName(EVENTOS_TAB) || crearHojaEventos_();
    ev.appendRow([ahora, fila[0], fila[1], tipo === 'open' ? 'apertura' : 'click', tipo === 'open' ? '' : String(url || '').slice(0, 200)]);
  } finally {
    lock.releaseLock();
  }
}

function htmlCampana_(nombre, email, id) {
  let html = HtmlService.createHtmlOutputFromFile('email_bali_2027').getContent();
  if (!String(nombre || '').trim()) html = html.split('Hola {{NOMBRE}},').join('Hola,');
  if (id) {
    // Enlaces a la web, Instagram y WhatsApp → pasan por /go/ para contar el click.
    html = html.replace(/href="(https:\/\/(?:padeltravellers\.com|instagram\.com|wa\.me)[^"]*)"/g, (m, u) =>
      'href="https://padeltravellers.com/go/?i=' + id + '&amp;u=' + encodeURIComponent(u) + '"');
    html = html.split('{{PIXEL_URL}}').join(ScriptApp.getService().getUrl() + '?action=px&amp;i=' + id);
  } else {
    html = html.replace(/<img[^>]*\{\{PIXEL_URL\}\}[^>]*>/g, '');
  }
  return html.split('{{NOMBRE}}').join(esc_(nombre || '')).split('{{BAJA_URL}}').join(urlBaja_(email));
}

function campanaPrueba_(p) {
  if (!p.k || p.k !== CAMPANA_KEY) return json_({ ok: false, error: 'clave' });
  if (!aliasCampanaOk_()) return json_({ ok: false, error: 'alias ' + CAMPANA_FROM + ' no disponible', alias: GmailApp.getAliases() });
  // Solo a direcciones del equipo (pruebas internas).
  const para = String(p.para || PRUEBA_PARA).trim().toLowerCase();
  if (PRUEBA_PERMITIDOS.indexOf(para) < 0) return json_({ ok: false, error: 'destinatario' });
  const nombre = String(p.nombre || 'Oriol');
  const html = htmlCampana_(nombre, para, registrarEnvio_(para, nombre + ' (prueba)'));
  const pdf = DriveApp.getFileById(PDF_BALI_2027).getAs(MimeType.PDF).setName('Viaje Padel y Bali 2027.pdf');
  const texto = 'Fechas Bali 2027: 8 salidas de junio a octubre, 14 días de pádel, cultura y aventura. Mira el viaje y reserva en https://padeltravellers.com/bali/';
  GmailApp.sendEmail(para, '[PRUEBA] ' + ASUNTO_BALI_2027, texto, optsCampana_(html, pdf));
  return json_({ ok: true, enviado_a: para, desde: CAMPANA_FROM });
}

/**
 * Envío real por tandas. Idempotente: cada fila pasa a "enviando" antes de enviar y a
 * "enviado dd/mm/aaaa hh:mm" (o "error: …") después. Si una fila se queda en "enviando"
 * (p. ej. timeout), NO se reintenta sola: se revisa a mano.
 */
const ENVIO_TAB = 'Envío Bali 2027';
const ENVIO_MAX_MS = 4.5 * 60 * 1000; // margen bajo el límite de 6 min de Apps Script

function campanaEnvio_(p) {
  if (!p.k || p.k !== CAMPANA_KEY) return json_({ ok: false, error: 'clave' });
  const n = Math.min(Math.max(parseInt(p.n, 10) || 0, 0), 100);
  if (!n) return json_({ ok: false, error: 'n' });
  if (!aliasCampanaOk_()) return json_({ ok: false, error: 'alias ' + CAMPANA_FROM + ' no disponible: no se envía nada' });
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return json_({ ok: false, error: 'ya hay un envío en marcha' });
  const t0 = Date.now();
  const res = { ok: true, enviados: 0, errores: 0, saltados_baja: 0, pendientes: 0 };
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sh = ss.getSheetByName(ENVIO_TAB);
    if (!sh) return json_({ ok: false, error: 'falta la pestaña ' + ENVIO_TAB });
    const bajasSh = ss.getSheetByName('Bajas publicidad');
    const bajas = new Set(bajasSh && bajasSh.getLastRow() > 1
      ? bajasSh.getRange(2, 2, bajasSh.getLastRow() - 1, 1).getValues().map((r) => String(r[0]).trim().toLowerCase())
      : []);
    const filas = sh.getLastRow() > 1 ? sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues() : [];
    const pdf = DriveApp.getFileById(PDF_BALI_2027).getAs(MimeType.PDF).setName('Viaje Padel y Bali 2027.pdf');
    const texto = 'Fechas Bali 2027: 8 salidas de junio a octubre, 14 días de pádel, cultura y aventura. Mira el viaje y reserva en https://padeltravellers.com/bali/';
    for (let i = 0; i < filas.length; i++) {
      if (String(filas[i][3]).trim()) continue;
      if (res.enviados + res.errores >= n || Date.now() - t0 > ENVIO_MAX_MS) { res.pendientes++; continue; }
      const email = String(filas[i][0]).trim().toLowerCase();
      const nombre = String(filas[i][1] || '').trim();
      const celda = sh.getRange(i + 2, 4);
      if (bajas.has(email)) { celda.setValue('baja: no se envía'); res.saltados_baja++; continue; }
      celda.setValue('enviando'); SpreadsheetApp.flush(); // marcar ANTES de enviar
      try {
        const html = htmlCampana_(nombre, email, registrarEnvio_(email, nombre));
        GmailApp.sendEmail(email, ASUNTO_BALI_2027, texto, optsCampana_(html, pdf)); // sin fallback: solo info@
        celda.setValue('enviado ' + Utilities.formatDate(new Date(), 'Europe/Madrid', 'dd/MM/yyyy HH:mm'));
        res.enviados++;
      } catch (err) {
        celda.setValue('error: ' + String(err).slice(0, 150));
        res.errores++;
      }
      SpreadsheetApp.flush();
    }
    res.cuota_restante = MailApp.getRemainingDailyQuota();
  } finally {
    lock.releaseLock();
  }
  return json_(res);
}

function baja_(p) {
  const email = String(p.e || '').trim().toLowerCase();
  if (!email || p.t !== tokenBaja_(email)) return paginaBaja_('Este enlace no es válido. Si quieres darte de baja, responde al email con la palabra BAJA.');
  const fecha = Utilities.formatDate(new Date(), 'Europe/Madrid', 'dd/MM/yyyy');
  let marcadas = 0;
  try {
    const sh = SpreadsheetApp.openById(CRM_ID).getSheetByName(CRM_TAB);
    const lastCol = sh.getLastColumn();
    const header = sh.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
    let col = header.indexOf(CRM_COL_PUBLICIDAD_HEADER) + 1;
    if (!col) {
      col = lastCol + 1;
      sh.getRange(1, col).setValue(CRM_COL_PUBLICIDAD_HEADER);
    }
    const mails = sh.getRange(2, CRM_COL_MAIL, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
    mails.forEach((r, i) => {
      if (String(r[0]).trim().toLowerCase() === email) {
        sh.getRange(i + 2, col).setValue('No publicidad · baja ' + fecha);
        marcadas++;
      }
    });
  } catch (err) {
    console.error('Baja: no se pudo marcar en el CRM: ' + err);
  }
  // Registro propio (por si el CRM no está accesible o el email no estaba en él).
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const log = ss.getSheetByName('Bajas publicidad') || ss.insertSheet('Bajas publicidad');
    if (log.getLastRow() === 0) log.appendRow(['Fecha', 'Email', 'Filas marcadas en el CRM']);
    log.appendRow([new Date(), email, marcadas]);
  } catch (err) {
    console.error('Baja: no se pudo registrar: ' + err);
  }
  return paginaBaja_('Hecho. No te enviaremos más emails de publicidad. Si algún día quieres volver a saber de nuestros viajes, escríbenos.');
}

function paginaBaja_(msg) {
  const html =
    '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Padel Travellers</title></head>' +
    '<body style="margin:0;background:#F3F1EA;font-family:Helvetica,Arial,sans-serif;color:#0B1F19;">' +
    '<div style="max-width:520px;margin:60px auto;background:#fff;border-radius:20px;padding:36px 32px;text-align:center;">' +
    '<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#AA785A;font-weight:bold;margin-bottom:10px;">Padel Travellers</div>' +
    '<p style="font-size:17px;line-height:1.6;margin:0 0 24px;">' + esc_(msg) + '</p>' +
    '<a href="https://padeltravellers.com" style="color:#0E3B2D;font-weight:bold;">padeltravellers.com</a></div></body></html>';
  return HtmlService.createHtmlOutput(html).setTitle('Padel Travellers').addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Aperturas del PDF del viaje desde padeltravellers.com/folleto/?src=ORIGEN
 * (Linktree, bio, historias...). Una fila por apertura, sin datos personales.
 */
const FOLLETO_TAB = 'Folleto aperturas';
const FOLLETO_HEAD = ['Fecha', 'Origen', 'Dispositivo', 'App', 'Llega desde', 'Idioma'];

function registrarFolleto_(p) {
  const limpio = (v, n) => String(v || '').replace(/[^\p{L}\p{N} ._-]/gu, '').slice(0, n);
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(FOLLETO_TAB);
  if (!sh) {
    sh = ss.insertSheet(FOLLETO_TAB);
    sh.appendRow(FOLLETO_HEAD);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, FOLLETO_HEAD.length).setFontWeight('bold');
  }
  sh.appendRow([new Date(), limpio(p.src, 30) || 'directo', limpio(p.dev, 20), limpio(p.app, 20), limpio(p.ref, 60), limpio(p.lang, 5)]);
}
