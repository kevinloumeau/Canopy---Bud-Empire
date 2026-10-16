// Shrinks the built sprite PNGs in dist/sprites without changing their names or pixel sizes. Each file is re-encoded
// as a palette PNG (libimagequant through sharp) and kept only when smaller, so the game code, the pinned-render
// measurements and the service worker see the same files they always did, just lighter to download. The sources in
// public/sprites stay untouched. If sharp is not installed (an old node_modules), the build continues uncompressed.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { availableParallelism } from 'node:os';

let sharp;
try { sharp = (await import('sharp')).default; } catch {
  console.warn('compress-sprites: sharp is not installed, sprites ship uncompressed (run npm install)');
  process.exit(0);
}

const root = new URL('../dist/sprites/', import.meta.url).pathname;
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(path));
    else if (entry.name.endsWith('.png')) out.push(path);
  }
  return out;
}

let files;
try { files = await walk(root); } catch { console.warn('compress-sprites: no dist/sprites, nothing to do'); process.exit(0); }

let before = 0, after = 0, next = 0;
async function worker() {
  while (next < files.length) {
    const file = files[next++];
    const src = await readFile(file);
    const small = await sharp(src).png({ palette: true, quality: 90, effort: 7, compressionLevel: 9 }).toBuffer();
    before += src.length;
    if (small.length < src.length) { await writeFile(file, small); after += small.length; } else after += src.length;
  }
}
await Promise.all(Array.from({ length: Math.max(1, availableParallelism()) }, worker));
console.log(`compress-sprites: ${files.length} sprites, ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
