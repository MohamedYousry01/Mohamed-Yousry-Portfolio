// Local browser audit without a test-runner subprocess. Rebuild to remove these files.
import { readFile, writeFile } from 'node:fs/promises';
const axe = await readFile(new URL('../node_modules/axe-core/axe.min.js', import.meta.url));
await writeFile('dist/__audit-axe.js', axe);
const html = await readFile('tests/browser-audit.html');
await writeFile('dist/__audit.html', html);
console.log('Open /__audit.html on the local production preview. Rebuild before deployment to remove audit-only assets.');
