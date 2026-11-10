// Renders the manager avatars' portraits for the start guide's picker (public/guide/avatars/<id>.webp, 300×400, shown
// at 150×200) from scripts/guide-hero.html?solo=. The dev server must be running: npm run dev.
//   node scripts/render-avatars.mjs [id ...]        # default: every avatar in src/manager.js
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright'); // Playwright is not a project dependency: install it globally
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { AVATARS } from '../src/manager.js';
const ids = process.argv.slice(2).length ? process.argv.slice(2) : AVATARS.map(a => a.id);
await mkdir('public/guide/avatars', { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const id of ids) {
  const page = await browser.newPage();
  page.on('pageerror', e => console.error(e.message));
  await page.goto('http://127.0.0.1:4173/scripts/guide-hero.html?solo=' + id + '.glb');
  await page.waitForFunction(() => window.heroDone, null, { timeout: 120000 });
  const data = await page.evaluate(() => document.getElementById('c').toDataURL('image/png'));
  await page.close();
  // The page frames every avatar alike, so the centre 3:4 of the frame is cut out as is, with no per-figure trim.
  const png = Buffer.from(data.split(',')[1], 'base64'), meta = await sharp(png).metadata(), w = Math.round(meta.height * .75);
  await sharp(png).extract({ left: Math.round((meta.width - w) / 2), top: 0, width: w, height: meta.height }).resize(300, 400, { kernel: 'lanczos3' })
    .webp({ quality: 84, alphaQuality: 92, effort: 6 }).toFile('public/guide/avatars/' + id + '.webp');
  console.log('wrote', id);
}
await browser.close();
