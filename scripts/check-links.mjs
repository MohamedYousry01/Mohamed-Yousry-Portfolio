import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, extname } from 'node:path';
const root = resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir,e.name)) : join(dir,e.name)));
  return files.flat();
}
const html = (await walk(root)).filter(p=>p.endsWith('.html'));
const failures = [];
let checked=0;
for (const file of html) {
  const content=await readFile(file,'utf8');
  for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value=match[1].replaceAll('&amp;','&');
    if (/^(https?:|mailto:|data:|javascript:)/.test(value)) continue;
    const url=new URL(value,`https://local.test${base}/${file.slice(root.length+1).replaceAll('\\','/')}`);
    if (url.origin!=='https://local.test') continue;
    let path=decodeURIComponent(url.pathname);
    if(base) {
      if(!path.startsWith(`${base}/`)) {failures.push(`${file}: misses base path: ${value}`);continue;}
      path=path.slice(base.length);
    }
    let target=resolve(root,`.${path}`);
    if(!target.startsWith(root)) { failures.push(`Outside dist: ${value}`); continue; }
    if(!extname(target)) target=join(target,'index.html');
    else {const s=await stat(target).catch(()=>null);if(s?.isDirectory())target=join(target,'index.html');}
    const exists=await stat(target).catch(()=>null);
    if(!exists) {failures.push(`${file}: missing ${value}`);continue;}
    if(url.hash&&target.endsWith('.html')) {
      const targetContent=target===file?content:await readFile(target,'utf8');
      const id=decodeURIComponent(url.hash.slice(1));
      if(!targetContent.includes(`id="${id}"`))failures.push(`${file}: missing anchor ${value}`);
    }
    checked++;
  }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`Validated ${checked} internal links/assets and anchors across ${html.length} HTML pages (base: ${base||'/'}).`);
