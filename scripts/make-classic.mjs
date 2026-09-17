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
