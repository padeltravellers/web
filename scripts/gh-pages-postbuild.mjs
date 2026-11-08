// Prepara la exportación estática (out/) para GitHub Pages.
//
// GitHub Pages no entiende public/_redirects (formato de Cloudflare Pages), así que:
//  - cada redirección exacta se convierte en una página /origen/index.html que lleva al destino
//    (meta refresh 0 + canonical + JS que conserva ?query y #hash; Google lo trata como 301);
//  - las redirecciones con comodín (/producto/*) se resuelven en 404.html con un script.
// Además añade .nojekyll y CNAME, y quita _redirects de la salida.
//
// Uso: node scripts/gh-pages-postbuild.mjs <carpeta>   (por defecto out-gh)

import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve(process.argv[2] || 'out-gh');
const DOMINIO = 'padeltravellers.com';
const reglas = fs
  .readFileSync('public/_redirects', 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => {
    const [from, to, code] = l.split(/\s+/);
    return { from, to, code: code || '301' };
  });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const destino = (to) => (to.endsWith('/') || /\.[a-z0-9]+$/i.test(to) ? to : to + '/');

function paginaRedireccion(to) {
  const d = destino(to);
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Padel Travellers</title>
<link rel="canonical" href="https://${DOMINIO}${esc(d)}">
<meta http-equiv="refresh" content="0; url=${esc(d)}">
<script>location.replace(${JSON.stringify(d)} + location.search + location.hash);</script>
</head>
<body><p><a href="${esc(d)}">Continuar a Padel Travellers</a></p></body>
</html>
`;
}

let exactas = 0;
const comodines = [];
const vistos = new Set();
for (const { from, to } of reglas) {
  if (from.includes('*')) {
    comodines.push({ prefijo: from.replace(/\*.*$/, ''), to: destino(to) });
    continue;
  }
  const carpeta = from.replace(/^\/+|\/+$/g, '');
  if (!carpeta) throw new Error('Regla sobre la raíz no soportada: ' + from);
  if (vistos.has(carpeta)) continue; // /x y /x/ van a la misma página
  vistos.add(carpeta);
  const fichero = path.join(DIR, carpeta, 'index.html');
  if (fs.existsSync(fichero)) {
    // En Cloudflare Pages la redirección manda sobre la página; mantenemos lo mismo, pero avisamos.
    console.warn('Aviso: se sustituye una página existente por la redirección ' + from + ' → ' + to);
  }
  fs.mkdirSync(path.dirname(fichero), { recursive: true });
  fs.writeFileSync(fichero, paginaRedireccion(to));
  exactas++;
}

// Comodines → script al principio del <head> de las páginas 404.
if (comodines.length) {
  const js =
    '<script>(function(){var p=location.pathname,r=' +
    JSON.stringify(comodines) +
    ';for(var i=0;i<r.length;i++){if(p.indexOf(r[i].prefijo)===0){location.replace(r[i].to+location.search+location.hash);return;}}})();</script>';
  for (const f of ['404.html', '404/index.html']) {
    const ruta = path.join(DIR, f);
    if (!fs.existsSync(ruta)) continue;
    const html = fs.readFileSync(ruta, 'utf8');
    if (!/<head[^>]*>/.test(html)) throw new Error('No encuentro <head> en ' + f);
    fs.writeFileSync(ruta, html.replace(/<head[^>]*>/, (m) => m + js));
  }
}

fs.rmSync(path.join(DIR, '_redirects'), { force: true });
fs.writeFileSync(path.join(DIR, '.nojekyll'), '');
fs.writeFileSync(path.join(DIR, 'CNAME'), DOMINIO + '\n');

console.log(`GitHub Pages: ${exactas} páginas de redirección, ${comodines.length} comodines en 404, .nojekyll y CNAME listos.`);
