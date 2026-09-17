import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
const compatible = html
  .replace(/<script type="module" crossorigin src="(\.?\/assets\/shift-[^"]+\.js)"><\/script>/, '<script defer src="$1"></script>')
  .replace(/<link rel="stylesheet" crossorigin href="(\.?\/assets\/shift-[^"]+\.css)">/, '<link rel="stylesheet" href="$1">');

if (compatible === html) {
  throw new Error('Expected Vite asset tags were not found.');
}

await writeFile(file, compatible);

// Stamp the service worker cache with this build's script hash so each deploy activates a fresh cache and drops the old one.
const hash = (compatible.match(/assets\/shift-([^".]+)\.js/) || [])[1];
if (hash) {
  const swFile = new URL('../dist/sw.js', import.meta.url);
  const sw = await readFile(swFile, 'utf8');
  await writeFile(swFile, sw.replace("const CACHE = 'canopy-v1';", `const CACHE = 'canopy-${hash}';`));
}
