/**
 * Campaña Bali 2027 — envío automático diario (Oriol, 2026-11-15).
 *
 * - Dos tandas al día (10:00 y 16:00, hora de Madrid) con activadores de tiempo.
 * - Antes de cada tanda: detecta rebotes ("email no existe") y amplía la lista con todo el CRM.
 * - A quién SÍ: todos los del CRM con email válido, MENOS:
 *     · estado actual (el más a la derecha de Estado 1/2/3) = Comprado… / No cumple / Spam web
 *     · columna "Publicidad" con algo (baja o rebote)
 * - Se vuelve a comprobar el CRM justo antes de enviar cada email (por si ha cambiado).
 * - Cuota de la cuenta: 100 emails/día. Se reservan RESERVA_CUOTA para los emails de reservas.
 *
 * Para activarlo: ejecutar UNA vez instalarProgramacion() desde el editor de Apps Script.
 */
const TANDA_MAX = 45;
const RESERVA_CUOTA = 6;
const CRM_COL_ESTADOS = [13, 14, 15]; // M, N, O
const CRM_COL_NOMBRE = 9; // I

function instalarProgramacion() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'tandaProgramada')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  [10, 16].forEach((h) =>
    ScriptApp.newTrigger('tandaProgramada').timeBased().everyDays(1).atHour(h).nearMinute(0).inTimezone('Europe/Madrid').create());
  console.log('Programado: tandas diarias a las 10:00 y a las 16:00 (Madrid).');
}

function pararProgramacion() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'tandaProgramada')
    .forEach((t) => ScriptApp.deleteTrigger(t));
  console.log('Programación parada.');
}

function tandaProgramada() {
  const log = { rebotes: 0, nuevos_en_lista: 0 };
  try { log.rebotes = procesarRebotes_(); } catch (err) { console.error('Rebotes: ' + err); }
  try { log.nuevos_en_lista = ampliarLista_(); } catch (err) { console.error('Ampliar lista: ' + err); }
  const cuota = MailApp.getRemainingDailyQuota();
  const n = Math.min(TANDA_MAX, cuota - RESERVA_CUOTA);
  log.cuota = cuota;
  if (n > 0) {
    const out = JSON.parse(campanaEnvio_({ k: CAMPANA_KEY, n: n }).getContent());
    Object.assign(log, out);
  } else {
    log.aviso = 'sin cuota suficiente: no se envía en esta tanda';
  }
  registrarTanda_(log);
  return log;
}

function registrarTanda_(log) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName('Campaña tandas') || (function () {
    const s = ss.insertSheet('Campaña tandas');
    s.appendRow(['Fecha', 'Enviados', 'Errores', 'Excluidos', 'Rebotes detectados', 'Nuevos en lista', 'Pendientes', 'Cuota antes', 'Aviso']);
    s.setFrozenRows(1);
    return s;
  })();
  sh.appendRow([new Date(), log.enviados || 0, log.errores || 0, log.excluidos || 0, log.rebotes || 0, log.nuevos_en_lista || 0,
    log.pendientes || 0, log.cuota || '', log.aviso || log.error || '']);
}

/** Estado actual de una fila del CRM: el valor más a la derecha de Estado 1/2/3. */
function estadoActual_(fila) {
  let e = '';
  CRM_COL_ESTADOS.forEach((c) => { const v = String(fila[c - 1] || '').trim(); if (v) e = v; });
  return e;
}

function estadoExcluido_(estado) {
  const e = String(estado || '').trim().toLowerCase();
  return e.indexOf('comprado') === 0 || e === 'no cumple' || e === 'spam web';
}

function emailValido_(e) {
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(e)) return false;
  if (/\.(con|coma|esm)$|hotmaol|gmaiil|@gmil\.|@ail\.|@hmail\.|\.com\.com$/.test(e)) return false; // dominios mal escritos
  if ((e.split('@')[0].match(/\./g) || []).length >= 4) return false; // bots tipo a.k.er.e.xa@
  return true;
}

function nombrePila_(n) {
  n = String(n || '').normalize('NFKC').trim();
  const toks = n.split(/\s+/);
  if (toks.length > 1 && toks.every((t) => t.length === 1)) n = n.split(/\s{3,}/)[0].replace(/\s/g, '');
  let t = (n.split(/\s+/)[0] || '').replace(/[^A-Za-zÀ-ÿñÑçÇ'-]/g, '');
  if (t.length < 3 || /[A-Z].*[A-Z].*[A-Z]/.test(t.slice(1)) || /^na$/i.test(t)) return '';
  if (t === t.toUpperCase() || t === t.toLowerCase()) t = t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  return t;
}

/** Añade a "Envío Bali 2027" a todos los del CRM que faltan y se les puede enviar. Devuelve cuántos añade. */
function ampliarLista_() {
  const crm = SpreadsheetApp.openById(CRM_ID).getSheetByName(CRM_TAB);
  const head = crm.getRange(1, 1, 1, crm.getLastColumn()).getValues()[0].map(String);
  const colPub = head.indexOf(CRM_COL_PUBLICIDAD_HEADER) + 1;
  const datos = crm.getRange(2, 1, crm.getLastRow() - 1, crm.getLastColumn()).getValues();
  const env = SpreadsheetApp.openById(SHEET_ID).getSheetByName(ENVIO_TAB);
  const ya = new Set(env.getLastRow() > 1 ? env.getRange(2, 1, env.getLastRow() - 1, 1).getValues().map((r) => String(r[0]).trim().toLowerCase()) : []);
  // Si un email aparece en alguna fila excluida o con "Publicidad", se excluye entero.
  const fuera = new Set();
  datos.forEach((r) => {
    const e = String(r[CRM_COL_MAIL - 1]).trim().toLowerCase();
    if (estadoExcluido_(estadoActual_(r)) || (colPub && String(r[colPub - 1]).trim())) fuera.add(e);
  });
  const nuevos = [];
  for (let i = datos.length - 1; i >= 0; i--) { // los más recientes primero
    const r = datos[i];
    const e = String(r[CRM_COL_MAIL - 1]).trim().toLowerCase();
    if (!emailValido_(e) || ya.has(e) || fuera.has(e)) continue;
    ya.add(e);
    nuevos.push([e, nombrePila_(r[CRM_COL_NOMBRE - 1]), i + 2, '']);
  }
  if (nuevos.length) env.getRange(env.getLastRow() + 1, 1, nuevos.length, 4).setValues(nuevos);
  return nuevos.length;
}

/** Busca rebotes de "dirección no existe" y los marca en el CRM (Publicidad) y en la lista. Devuelve cuántos nuevos. */
function procesarRebotes_() {
  const env = SpreadsheetApp.openById(SHEET_ID).getSheetByName(ENVIO_TAB);
  if (!env || env.getLastRow() < 2) return 0;
  const filas = env.getRange(2, 1, env.getLastRow() - 1, 4).getValues();
  const idx = {};
  filas.forEach((r, i) => { idx[String(r[0]).trim().toLowerCase()] = i; });
  const rebotados = new Set();
  GmailApp.search('from:mailer-daemon newer_than:4d', 0, 100).forEach((th) => {
    th.getMessages().forEach((m) => {
      const body = m.getPlainBody() || '';
      if (!/address not found|couldn't be found|no se ha encontrado|no existe|550 5\.1\.1|user unknown|does not exist/i.test(body)) return;
      const re = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
      let x;
      while ((x = re.exec(body))) { const e = x[0].toLowerCase(); if (idx[e] !== undefined) rebotados.add(e); }
    });
  });
  const fecha = Utilities.formatDate(new Date(), 'Europe/Madrid', 'dd/MM/yyyy');
  let nuevos = 0;
  let crm = null, colPub = 0, mails = [];
  rebotados.forEach((e) => {
    const i = idx[e];
    const estado = String(filas[i][3] || '');
    if (/rebotado/.test(estado)) return;
    env.getRange(i + 2, 4).setValue('rebotado · email no existe (' + estado + ')');
    nuevos++;
    if (!crm) {
      crm = SpreadsheetApp.openById(CRM_ID).getSheetByName(CRM_TAB);
      const head = crm.getRange(1, 1, 1, crm.getLastColumn()).getValues()[0].map(String);
      colPub = head.indexOf(CRM_COL_PUBLICIDAD_HEADER) + 1;
      mails = crm.getRange(2, CRM_COL_MAIL, crm.getLastRow() - 1, 1).getValues();
    }
    if (colPub) mails.forEach((m, j) => {
      if (String(m[0]).trim().toLowerCase() === e) crm.getRange(j + 2, colPub).setValue('Rebotado · email no existe ' + fecha);
    });
  });
  return nuevos;
}

/** Comprobación de última hora en el CRM antes de enviar. Devuelve '' si se puede enviar o el motivo si no. */
function motivoNoEnviar_(crm, fila, email) {
  if (!crm || !fila) return '';
  const r = crm.sh.getRange(fila, 1, 1, crm.sh.getLastColumn()).getValues()[0];
  if (String(r[CRM_COL_MAIL - 1]).trim().toLowerCase() !== email) return '';
  const estado = estadoActual_(r);
  if (estadoExcluido_(estado)) return 'excluido: estado ' + estado;
  if (crm.colPub && String(r[crm.colPub - 1]).trim()) return 'excluido: ' + String(r[crm.colPub - 1]).trim();
  return '';
}
