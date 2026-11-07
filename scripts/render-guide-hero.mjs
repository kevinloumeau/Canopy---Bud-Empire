// Renders the start guide's hero picture from scripts/guide-hero.html (the dev server must be running: npm run dev)
// and writes it as a WebP at twice the card's 380×190 size. Query options pass through, e.g. `--q dx=1.2&staff=staff-gray.glb`.
//   node scripts/render-guide-hero.mjs [out.webp] [--png out.png] [--q 'key=value&...']
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // Playwright is not a project dependency: install it globally

import sharp from 'sharp';
const args = process.argv.slice(2), flag = k => { const i = args.indexOf('--' + k); return i < 0 ? null : args.splice(i, 2)[1]; };
const png = flag('png'), query = flag('q') || '', out = args[0] || 'public/guide/hero.webp';
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage();
page.on('console', m => m.type() === 'error' && console.error(m.text()));
page.on('pageerror', e => console.error(e.message));
await page.goto('http://127.0.0.1:4173/scripts/guide-hero.html?' + query);
await page.waitForFunction(() => window.heroDone, null, { timeout: 120000 });
const data = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
await browser.close();
const buffer = Buffer.from(data.split(',')[1], 'base64');
// Trim to the solid pixels, then fit them into 760×380 standing on the bottom edge, with room on top for the card's
// 180px crop (the picture is 190px tall) and its 5px float.
const trimmed = await sharp(buffer).trim({ threshold: 1 }).toBuffer();
const fitted = await sharp(trimmed).resize(760 - 24, 380 - 44, { fit: 'inside', kernel: 'lanczos3' }).toBuffer();
const { width, height } = await sharp(fitted).metadata();
const final = sharp({ create: { width: 760, height: 380, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: fitted, left: Math.round((760 - width) / 2), top: 380 - 4 - height }]);
const flat = await final.png().toBuffer();
if (png) await sharp(flat).toFile(png);
await sharp(flat).webp({ quality: 82, alphaQuality: 90, effort: 6 }).toFile(out);
console.log('wrote', out);
