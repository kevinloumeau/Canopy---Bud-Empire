import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../dist/index.html', import.meta.url);
const html = await readFile(file, 'utf8');
const compatible = html
  .replace(/<script type="module" crossorigin src="(\.?\/assets\/shift-[^"]+\.js)"><\/script>/, '<script defer src="$1"></script>')
  .replace(/<link rel="stylesheet" crossorigin href="(\.?\/assets\/shift-[^"]+\.css)">/, '<link rel="stylesheet" href="$1">');

if (compatible === html) {
  throw new Error('Expected Vite asset tags were not found.');
}

// A classic script cannot import or export, so a split-off shared chunk would stop the game at start-up.
const entry = compatible.match(/<script defer src="\.?\/(assets\/shift-[^"]+\.js)">/)[1];
const entryCode = await readFile(new URL(`../dist/${entry}`, import.meta.url), 'utf8');
if (/^import[\s{*"']|\bexport\s*\{/m.test(entryCode)) {
  throw new Error(`${entry} has a module import or export, so it cannot run as a classic script.`);
}

// The 3D map's entry is loaded on demand by main.js, which finds its hashed name in this meta tag.
const { readdir } = await import('node:fs/promises');
const map3d = (await readdir(new URL('../dist/assets/', import.meta.url))).find(name => /^map3d-[\w-]+\.js$/.test(name));
if (!map3d) throw new Error('The 3D map entry was not built.');
const withMap3d = compatible.replace('</head>', `<meta name="canopy-map3d" content="./assets/${map3d}">\n</head>`);

await writeFile(file, withMap3d);

// Stamp the service worker cache with this build's script hash so each deploy activates a fresh cache and drops the old one.
const hash = (compatible.match(/assets\/shift-([^".]+)\.js/) || [])[1];
if (hash) {
  const swFile = new URL('../dist/sw.js', import.meta.url);
  const sw = await readFile(swFile, 'utf8');
  await writeFile(swFile, sw.replace("const CACHE = 'canopy-v1';", `const CACHE = 'canopy-${hash}';`));
}
