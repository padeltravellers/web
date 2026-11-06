/**
 * Campaña de email "Abrimos Bali 2027" y bajas de publicidad.
 *
 * - GET ?action=campana_prueba&k=CLAVE  → envía UNA prueba a oriol@ (no toca el CRM).
 * - GET ?action=baja&e=EMAIL&t=TOKEN    → marca ese email como "No publicidad" en el CRM y lo registra.
 *
 * La CLAVE (CAMPANA_KEY) está en Secreto.gs, que NO se sube al repo (el repo es público).
 * El envío masivo NO está implementado aquí a propósito: solo se activará con el OK de Oriol.
 */

const CRM_ID = '1IxTWD5RNc9m3LitTtkBKbKm72a-jR7yFNmrMop40vy4'; // Sheet "Clientes" · pestaña "PT Sin vuelos"
const CRM_TAB = 'PT Sin vuelos';
const CRM_COL_MAIL = 11; // K
const CRM_COL_PUBLICIDAD_HEADER = 'Publicidad';
const PDF_BALI_2027 = '136Kp7cAN5UKorxIvVkYfSmQ7bernEYv1'; // "Viaje Padel y Bali 2027.pdf" (copia en Reservas 2027)
const ASUNTO_BALI_2027 = 'Abrimos Bali 2027: 8 salidas de junio a octubre';
const PRUEBA_PARA = 'oriol@padeltravellers.com';

function tokenBaja_(email) {
  const sig = Utilities.computeHmacSha256Signature(String(email).trim().toLowerCase(), CAMPANA_KEY);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 22);
}

function urlBaja_(email) {
  return ScriptApp.getService().getUrl() + '?action=baja&e=' + encodeURIComponent(email) + '&t=' + tokenBaja_(email);
}

function htmlCampana_(nombre, email) {
  const html = HtmlService.createHtmlOutputFromFile('email_bali_2027').getContent();
  return html.split('{{NOMBRE}}').join(esc_(nombre || '')).split('{{BAJA_URL}}').join(urlBaja_(email));
}

function campanaPrueba_(p) {
  if (!p.k || p.k !== CAMPANA_KEY) return json_({ ok: false, error: 'clave' });
  const html = htmlCampana_('Oriol', PRUEBA_PARA);
  const opts = {
    htmlBody: html,
    name: 'Padel Travellers',
    attachments: [DriveApp.getFileById(PDF_BALI_2027).getAs(MimeType.PDF).setName('Viaje Padel y Bali 2027.pdf')],
  };
  const texto = 'Abrimos Bali 2027: 8 salidas de junio a octubre, 14 días de pádel, cultura y aventura. Mira el viaje y reserva en https://padeltravellers.com/bali/';
  GmailApp.sendEmail(PRUEBA_PARA, '[PRUEBA] ' + ASUNTO_BALI_2027, texto, opts);
  return json_({ ok: true, enviado_a: PRUEBA_PARA });
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
