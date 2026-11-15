/**
 * Informe en directo de la campaña de email "Fechas Bali 2027".
 * GET ?action=informe&k=CLAVE → página HTML con los datos del momento (solo con la clave: tiene emails).
 *
 * Fuentes (todas en el Sheet de Reservas):
 * - "Envío Bali 2027": a quién se envía y estado.
 * - "Campaña Bali 2027": una fila por destinatario (aperturas, clicks).
 * - "Campaña eventos": cada apertura y cada click, con destino.
 * - "Bajas publicidad": quién se ha dado de baja.
 * - "Viajeros": reservas (se cruza por email).
 */

function informe_(p) {
  if (!p.k || p.k !== CAMPANA_KEY) return HtmlService.createHtmlOutput('Enlace no válido.');
  const d = datosInforme_();
  return HtmlService.createHtmlOutput(htmlInforme_(d))
    .setTitle('Informe campaña Bali 2027')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Lo mismo en JSON, para la página padeltravellers.com/informe/ (que pide la clave). */
function informeJson_(p) {
  if (!p.k || p.k !== CAMPANA_KEY) return json_({ ok: false, error: 'clave' });
  return json_({ ok: true, html: htmlInforme_(datosInforme_()) });
}

function filas_(ss, nombre) {
  const sh = ss.getSheetByName(nombre);
  if (!sh || sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
}

function tipoDestino_(url) {
  const u = String(url || '');
  if (/\/folleto/.test(u)) return 'pdf';
  if (/wa\.me/.test(u)) return 'whatsapp';
  if (/instagram\.com/.test(u)) return 'instagram';
  if (/\/bali/.test(u)) return 'web';
  if (/padeltravellers\.com/.test(u)) return 'web';
  return 'otro';
}

function datosInforme_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const tz = 'Europe/Madrid';
  const esPrueba = (email) => PRUEBA_PERMITIDOS.indexOf(String(email).toLowerCase()) >= 0;

  const envio = filas_(ss, ENVIO_TAB);
  const track = filas_(ss, TRACK_TAB);
  const eventos = filas_(ss, EVENTOS_TAB);
  const bajas = new Set(filas_(ss, 'Bajas publicidad').map((r) => String(r[1]).trim().toLowerCase()));

  // Reservas: busca la columna de email en "Viajeros".
  const reservas = new Set();
  const vsh = ss.getSheetByName('Viajeros');
  if (vsh && vsh.getLastRow() > 1) {
    const head = vsh.getRange(1, 1, 1, vsh.getLastColumn()).getValues()[0].map((h) => String(h).toLowerCase());
    const col = head.findIndex((h) => /e-?mail|correo/.test(h));
    if (col >= 0) vsh.getRange(2, col + 1, vsh.getLastRow() - 1, 1).getValues().forEach((r) => { if (r[0]) reservas.add(String(r[0]).trim().toLowerCase()); });
  }

  // Personas: parte de la lista de envío.
  const personas = {};
  envio.forEach((r) => {
    const email = String(r[0]).trim().toLowerCase();
    if (!email) return;
    personas[email] = {
      email, nombre: String(r[1] || ''), fila: r[2], estado: String(r[3] || ''),
      enviado: /enviado/.test(String(r[3] || '')) && !/^rebotado/.test(String(r[3] || '')), aperturas: 0, primeraApertura: null, ultima: null,
      clicks: 0, pdf: 0, web: 0, whatsapp: 0, instagram: 0, baja: bajas.has(email), reserva: reservas.has(email),
    };
  });
  track.forEach((r) => {
    const email = String(r[0]).trim().toLowerCase();
    const x = personas[email];
    if (!x) return;
    x.aperturas = Number(r[5] || 0);
    x.primeraApertura = r[4] instanceof Date ? r[4] : null;
    x.ultima = r[9] instanceof Date ? r[9] : null;
  });

  // Eventos: clicks por destino y actividad por día.
  const porDia = {};
  eventos.forEach((r) => {
    const email = String(r[1]).trim().toLowerCase();
    if (esPrueba(email) || !personas[email]) return;
    const x = personas[email];
    const dia = r[0] instanceof Date ? Utilities.formatDate(r[0], tz, 'yyyy-MM-dd') : '';
    porDia[dia] = porDia[dia] || { aperturas: 0, clicks: 0 };
    if (r[3] === 'click') {
      x.clicks++;
      x[tipoDestino_(r[4])] = (x[tipoDestino_(r[4])] || 0) + 1;
      porDia[dia].clicks++;
    } else {
      porDia[dia].aperturas++;
    }
  });

  const lista = Object.keys(personas).map((k) => personas[k]);
  const enviados = lista.filter((x) => x.enviado);
  const cuenta = (f) => enviados.filter(f).length;
  const kpi = {
    lista: lista.length,
    enviados: enviados.length,
    errores: lista.filter((x) => /^error/.test(x.estado)).length,
    rebotes: lista.filter((x) => /^rebotado/.test(x.estado)).length,
    excluidos: lista.filter((x) => /^excluido/.test(x.estado)).length,
    pendientes: lista.filter((x) => !x.estado).length,
    abrieron: cuenta((x) => x.aperturas > 0 || x.clicks > 0),
    clicaron: cuenta((x) => x.clicks > 0),
    pdf: cuenta((x) => x.pdf > 0),
    web: cuenta((x) => x.web > 0),
    whatsapp: cuenta((x) => x.whatsapp > 0),
    instagram: cuenta((x) => x.instagram > 0),
    bajas: cuenta((x) => x.baja),
    reservas: cuenta((x) => x.reserva),
  };
  const fmt = (dt) => (dt ? Utilities.formatDate(dt, tz, 'dd/MM HH:mm') : '');
  const filas = enviados
    .map((x) => Object.assign({}, x, {
      puntos: x.reserva * 100 + x.whatsapp * 10 + x.web * 5 + x.pdf * 5 + x.instagram * 2 + Math.min(x.aperturas, 5) - x.baja * 50,
      primeraTxt: fmt(x.primeraApertura), ultimaTxt: fmt(x.ultima),
    }))
    .sort((a, b) => b.puntos - a.puntos || (b.ultima || 0) - (a.ultima || 0));
  const dias = Object.keys(porDia).filter(Boolean).sort().map((k) => ({ dia: k, aperturas: porDia[k].aperturas, clicks: porDia[k].clicks }));
  return { kpi, filas, dias, actualizado: Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm') };
}

function htmlInforme_(d) {
  const k = d.kpi;
  const pct = (n, t) => (t ? Math.round((n / t) * 100) + '%' : '–');
  const tarjeta = (titulo, n, base, nota) =>
    '<div class="card"><div class="lbl">' + titulo + '</div><div class="num">' + n + '</div><div class="sub">' +
    (base !== null ? pct(n, base) + ' de los enviados' : '') + (nota ? nota : '') + '</div></div>';
  const embudo = [
    ['Enviados', k.enviados], ['Abrieron', k.abrieron], ['Clicaron algo', k.clicaron],
    ['Vieron la web', k.web], ['Abrieron el PDF', k.pdf], ['WhatsApp', k.whatsapp], ['Reservaron', k.reservas],
  ];
  const max = Math.max(k.enviados, 1);
  const barras = embudo.map((e) =>
    '<div class="frow"><span class="fl">' + e[0] + '</span><span class="fbar"><i style="width:' + Math.max((e[1] / max) * 100, e[1] ? 1.5 : 0) +
    '%"></i></span><span class="fn">' + e[1] + ' <small>' + pct(e[1], k.enviados) + '</small></span></div>').join('');
  const maxDia = Math.max.apply(null, d.dias.map((x) => x.aperturas + x.clicks).concat([1]));
  const dias = d.dias.length
    ? d.dias.map((x) =>
      '<div class="drow"><span class="fl">' + x.dia.slice(8, 10) + '/' + x.dia.slice(5, 7) + '</span><span class="fbar"><i style="width:' +
      (x.aperturas / maxDia) * 100 + '%"></i><b style="width:' + (x.clicks / maxDia) * 100 + '%"></b></span><span class="fn">' +
      x.aperturas + ' aperturas · ' + x.clicks + ' clicks</span></div>').join('')
    : '<p class="vacio">Todavía no hay actividad.</p>';
  const si = (n, txt) => (n ? '<span class="tag on">' + txt + (n > 1 ? ' ×' + n : '') + '</span>' : '');
  const tabla = d.filas.map((x) => {
    const estado = x.reserva ? 'reserva' : x.baja ? 'baja' : x.clicks ? 'clic' : x.aperturas ? 'abrio' : 'no';
    return '<tr data-e="' + estado + '"><td><b>' + esc_(x.nombre || '—') + '</b><div class="mail">' + esc_(x.email) + '</div></td>' +
      '<td class="c">' + (x.aperturas || '') + '</td><td>' + x.primeraTxt + '</td><td>' +
      si(x.web, 'Web') + si(x.pdf, 'PDF') + si(x.whatsapp, 'WhatsApp') + si(x.instagram, 'Instagram') +
      (x.reserva ? '<span class="tag res">Reservó</span>' : '') + (x.baja ? '<span class="tag baja">Baja</span>' : '') +
      '</td><td>' + x.ultimaTxt + '</td></tr>';
  }).join('');

  return '<!doctype html><html lang="es"><head><meta charset="utf-8">' +
    '<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500;600&family=Inter:wght@400;600&display=swap" rel="stylesheet">' +
    '<style>' +
    ':root{--verde:#0E3B2D;--crema:#F5EFE6;--clay:#B8543A;--tinta:#16241F;--gris:#6B7470;--linea:#E4DDD1;--blanco:#fff}' +
    '*{box-sizing:border-box}body{margin:0;background:var(--crema);color:var(--tinta);font:15px/1.45 Inter,Helvetica,Arial,sans-serif}' +
    'header{background:var(--verde);color:#fff;padding:28px 16px 24px}.wrap{max-width:1080px;margin:0 auto;padding:0 16px}' +
    'header .wrap{padding:0}h1{font:600 28px/1.15 Jost,sans-serif;margin:4px 0 6px}.kick{letter-spacing:.14em;font-size:12px;text-transform:uppercase;opacity:.75}' +
    'header p{margin:0;opacity:.85;font-size:14px}main.wrap{padding:24px 16px 48px}' +
    '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin-bottom:20px}' +
    '.card{background:var(--blanco);border:1px solid var(--linea);border-radius:14px;padding:14px 16px}.lbl{font-size:12px;color:var(--gris);text-transform:uppercase;letter-spacing:.06em}' +
    '.num{font:600 30px/1.1 Jost,sans-serif;color:var(--verde);margin:6px 0 2px}.sub{font-size:12px;color:var(--gris)}' +
    'section{background:var(--blanco);border:1px solid var(--linea);border-radius:14px;padding:18px;margin-bottom:20px}h2{font:600 18px Jost,sans-serif;margin:0 0 14px;color:var(--verde)}' +
    '.frow,.drow{display:grid;grid-template-columns:130px 1fr 150px;gap:10px;align-items:center;margin:7px 0;font-size:14px}' +
    '.fbar{height:14px;background:#F1ECE3;border-radius:7px;overflow:hidden;display:flex}.fbar i{display:block;height:100%;background:var(--verde)}.fbar b{display:block;height:100%;background:var(--clay)}' +
    '.fn{font-variant-numeric:tabular-nums}.fn small{color:var(--gris)}.ley{font-size:12px;color:var(--gris);margin-top:8px}.ley i,.ley b{display:inline-block;width:10px;height:10px;border-radius:2px;vertical-align:-1px;margin:0 4px 0 10px}' +
    '.filtros{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}.filtros button{font:inherit;font-size:13px;border:1px solid var(--linea);background:#fff;border-radius:999px;padding:6px 12px;cursor:pointer;color:var(--tinta)}' +
    '.filtros button.act{background:var(--verde);color:#fff;border-color:var(--verde)}' +
    '.tw{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px;min-width:640px}th{text-align:left;font-size:12px;color:var(--gris);font-weight:600;text-transform:uppercase;letter-spacing:.05em;padding:8px;border-bottom:1px solid var(--linea)}' +
    'td{padding:9px 8px;border-bottom:1px solid #F0EBE2;vertical-align:top}td.c{text-align:center}.mail{font-size:12px;color:var(--gris)}' +
    '.tag{display:inline-block;font-size:12px;border-radius:999px;padding:2px 9px;margin:0 4px 4px 0;background:#E7F0EC;color:var(--verde)}.tag.res{background:var(--verde);color:#fff}.tag.baja{background:#F6E3DD;color:var(--clay)}' +
    '.nota{font-size:13px;color:var(--gris)}.vacio{color:var(--gris);font-size:14px;margin:0}' +
    '@media(max-width:600px){.frow,.drow{grid-template-columns:96px 1fr;}.fn{grid-column:2}h1{font-size:23px}}' +
    '</style></head><body>' +
    '<header><div class="wrap"><div class="kick">Padel Travellers · Informe de campaña</div><h1>Email «Fechas Bali 2027»</h1>' +
    '<p>Datos en directo · actualizado ' + d.actualizado + ' · recarga la página para ver lo último</p></div></header>' +
    '<main class="wrap">' +
    '<div class="grid">' +
    tarjeta('Enviados', k.enviados, null, k.pendientes + ' pendientes de ' + k.lista + (k.errores ? ' · ' + k.errores + ' errores' : '') + (k.excluidos ? ' · ' + k.excluidos + ' excluidos' : '')) +
    tarjeta('Abrieron el email', k.abrieron, k.enviados) +
    tarjeta('Clicaron algo', k.clicaron, k.enviados) +
    tarjeta('Vieron la web', k.web, k.enviados) +
    tarjeta('Abrieron el PDF', k.pdf, k.enviados, ' (enlace)') +
    tarjeta('Fueron a WhatsApp', k.whatsapp, k.enviados) +
    tarjeta('Instagram', k.instagram, k.enviados) +
    tarjeta('Reservaron', k.reservas, k.enviados) +
    tarjeta('Bajas', k.bajas, k.enviados) +
    tarjeta('Rebotados', k.rebotes, null, 'email no existe · no se les vuelve a enviar') +
    '</div>' +
    '<section><h2>Embudo</h2>' + barras + '</section>' +
    '<section><h2>Actividad por día</h2>' + dias + '<div class="ley"><i style="background:var(--verde)"></i>aperturas<b style="background:var(--clay)"></b>clicks</div></section>' +
    '<section><h2>Persona a persona</h2>' +
    '<div class="filtros"><button class="act" data-f="todos">Todos</button><button data-f="clic">Clicaron</button><button data-f="abrio">Solo abrieron</button>' +
    '<button data-f="no">No abrieron</button><button data-f="reserva">Reservaron</button><button data-f="baja">Bajas</button></div>' +
    '<div class="tw"><table><thead><tr><th>Persona</th><th>Aperturas</th><th>Primera apertura</th><th>Qué hizo</th><th>Última actividad</th></tr></thead><tbody>' +
    (tabla || '<tr><td colspan="5" class="vacio">Aún no se ha enviado ningún email.</td></tr>') + '</tbody></table></div>' +
    '<p class="nota">Ordenado de más a menos interesado: reserva, WhatsApp, web, PDF, Instagram y aperturas.</p></section>' +
    '<p class="nota"><b>Cómo leerlo.</b> «Abrir el PDF» cuenta a quien pulsa el enlace al programa dentro del email: el PDF adjunto, si se abre desde el correo, no se puede medir. ' +
    'Las aperturas son aproximadas: Apple Mail las puede contar aunque no se lea el email y algunos correos bloquean las imágenes y no las cuentan. Los clicks sí son fiables.</p>' +
    '</main><script>' +
    'document.querySelectorAll(".filtros button").forEach(function(b){b.onclick=function(){' +
    'document.querySelectorAll(".filtros button").forEach(function(x){x.classList.remove("act")});b.classList.add("act");var f=b.dataset.f;' +
    'document.querySelectorAll("tbody tr[data-e]").forEach(function(tr){var e=tr.dataset.e;tr.style.display=(f==="todos"||e===f||(f==="clic"&&e==="reserva"))?"":"none"})}});' +
    '</script></body></html>';
}
