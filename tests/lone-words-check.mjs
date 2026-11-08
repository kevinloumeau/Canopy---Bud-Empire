// Lone words: no menu text may end with a single word alone on its last line (Kevin's rule for every label and line
// of copy). Drives Chrome or Chromium over the DevTools protocol, with no npm dependency, against a running dev or
// preview server, in a throwaway profile.
//
//   npm run dev
//   node tests/lone-words-check.mjs                       # http://127.0.0.1:4173/
//   node tests/lone-words-check.mjs http://127.0.0.1:5174/
//
// For each save (a fresh start, the showcase shop and a maxed empire), each phone width (390×844 and 375×667) and each
// menu tab (Stations, Menu, Research, Goals, every Empire section and the Perks, Records and pop-up market screens), it walks every visible text node, measures each
// word's Range rect, groups the words of one block by line and fails on any block of two or more lines whose last line
// holds one word (two-word labels may stack as a pair). The top lane's toasts are scanned too. Station card chips belong to the station card fit work, so .station-card is skipped for now.
// Chrome comes from CHROME, Playwright's Chromium (/opt/pw-browsers) or the default macOS path.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = new URL(process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:4173/');
gameUrl.searchParams.set('snap', '');
// ?popup opens the next weekend market now, so its Empire door and page are scanned too.
gameUrl.searchParams.set('popup', '');
const SKIP = '.station-card';

const showcase = {
  money: 940000, lifetime: 5200000, orderCounters: 3, idStaff: 5, doorBuilt: true, shopOpen: true,
  lines: [30, 30, 30, 30, 30, 30], staff: [8, 8, 8, 8, 8, 8], stock: [80, 101, 0, 11, 40],
  strains: [2, 2, 1, 1], activeStrain: 0, menuStrains: [0, 1, 2], sold: 3180, onlineCompleted: 46,
  kiosk: true, secondKiosk: true, queueLevel: 3, storageLevel: 3, webLevel: 3, comfortLevel: 2, signLevel: 2,
  seedBatchLevel: 2, growBatchLevel: 2, harvestBatchLevel: 2, packSpeedLevel: 2, serviceLevel: 2, gameSpeed: 1
};
const store = { level: 10, projects: [true, true, true] };
const max = {
  money: 9e12, lifetime: 5e13, orderCounters: 3, idStaff: 100, doorBuilt: true, shopOpen: true,
  lines: [100, 100, 100, 100, 100, 100], staff: [60, 60, 60, 60, 60, 60], stock: [200, 200, 100, 80, 60],
  strains: [3, 3, 3, 3], activeStrain: 0, menuStrains: [0, 1, 2, 3], sold: 90000, onlineCompleted: 4000,
  kiosk: true, secondKiosk: true, thirdKiosk: true, lounge: 5, loungeStaff: 40, loungeLift: true,
  queueLevel: 5, storageLevel: 5, webLevel: 5, comfortLevel: 5, signLevel: 5, pickupWindow: { owned: true, level: 100 },
  atm: { level: 100, machines: 3 }, autoDrone: { owned: true, level: 100, bulk: true }, flagship: 1,
  city: { warehouse: 3, growhouse: 3, billboard: 3, terplab: 3 }, empire: { stores: [store, store, store, store, store] }, gameSpeed: 1
};
const saves = { fresh: { money: 500, gameSpeed: 1 }, showcase, max };
const sizes = [[390, 844], [375, 667]];
// "While away" is shown a minute after the last visit, so the top lane toast is on screen while the tabs are scanned.
const tabs = ['factory', 'flowers', 'boosts', 'goals', 'goals:deals', 'empire:today', 'empire:growth', 'empire:daily', 'empire:events', 'empire:perks', 'empire:records', 'empire:popup'];

// Runs in the page: every block's text grouped into lines, reporting blocks whose last line is one word.
const scan = `(() => {
  const SKIP = ${JSON.stringify(SKIP)};
  const inline = el => { const d = getComputedStyle(el).display; return d === 'inline' || d === 'contents'; };
  const owner = node => { let el = node.parentElement; while (el && inline(el) && el.parentElement) el = el.parentElement; return el; };
  const visible = el => { for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0 || e.hidden) return false; } return true; };
  const blocks = new Map();
  for (const root of ['sheet', 'topLane'].map(id => document.getElementById(id)).filter(Boolean)) {
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = walk.nextNode());) {
    if (!n.data.trim() || n.parentElement.closest(SKIP + ',script,style,svg,[aria-hidden=true]')) continue;
    const block = owner(n);
    if (!blocks.has(block)) blocks.set(block, []);
    const re = /\\S+/g;
    for (let m; (m = re.exec(n.data));) {
      const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
      const rects = [...r.getClientRects()].filter(x => x.width > 0 && x.height > 0);
      if (!rects.length) continue;
      const box = rects[rects.length - 1];
      blocks.get(block).push({ word: m[0], top: box.top, bottom: box.bottom });
    }
  }
  }
  const found = [];
  for (const [block, words] of blocks) {
    // A two-word label stacked one over the other (Meadow / Mint) is a balanced pair, not a lone word.
    if (words.length < 3 || !visible(block)) continue;
    const lines = [];
    for (const w of words) {
      const mid = (w.top + w.bottom) / 2;
      const line = lines.find(l => mid > l.top && mid < l.bottom);
      if (line) line.words.push(w.word); else lines.push({ top: w.top, bottom: w.bottom, words: [w.word] });
    }
    if (lines.length < 2) continue;
    lines.sort((a, b) => a.top - b.top);
    const last = lines[lines.length - 1];
    if (last.words.length === 1 && !/^[·•|–—-]$/.test(last.words[0])) {
      const cls = block.className && typeof block.className === 'string' ? '.' + block.className.trim().split(/\\s+/).join('.') : '';
      found.push({ where: block.tagName.toLowerCase() + (block.id ? '#' + block.id : '') + cls, text: words.map(w => w.word).join(' '), lone: last.words[0] });
    }
  }
  return found;
})()`;

const chrome = process.env.CHROME || ['/opt/pw-browsers/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
const profile = await mkdtemp(join(tmpdir(), 'lone-words-'));
const port = 9300 + Math.floor(Math.random() * 600);
const gl = process.platform === 'darwin' ? [] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', '--no-sandbox', ...gl, 'about:blank'], { stdio: 'ignore' });
let code = 0;
try {
  let targets;
  for (let i = 0; i < 100 && !targets?.length; i++) {
    try { targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).filter(t => t.type === 'page'); } catch { await sleep(100); }
  }
  if (!targets?.length) throw new Error('Chrome did not start: ' + chrome);
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve));
  let nextId = 0; const pending = new Map(), errors = [];
  ws.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); }
    else if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result?.value;
  };
  const until = async (expression, what, ms = 90000) => {
    const start = Date.now();
    while (Date.now() - start < ms) { if (await evaluate(expression).catch(() => false)) return; await sleep(100); }
    throw new Error(`Timed out waiting for ${what}`);
  };
  await send('Page.enable');
  await send('Runtime.enable');
  const failures = [];
  for (const [saveName, save] of Object.entries(saves)) {
    for (const [width, height] of sizes) {
      await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: true });
      await send('Page.navigate', { url: new URL('manifest.webmanifest', gameUrl).href }); await sleep(200);
      await evaluate(`localStorage.clear();localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify({ ...save, lastSeen: Date.now() - 60000 }))});localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off')`);
      await send('Page.navigate', { url: gameUrl.href });
      await until('window.__shiftReady===true', 'the game to start');
      await evaluate('document.fonts.ready'); await sleep(600);
      // Clear any welcome or tutorial cover so the tabs answer taps.
      await evaluate(`document.querySelectorAll('.welcome-back button, .intro-card button, [data-dismiss]').forEach(b=>{try{b.click()}catch{}})`);
      for (const tab of tabs) {
        const [tray, view] = tab.split(':');
        await evaluate(`(()=>{document.querySelector('[data-tray="${tray}"]').click();${view ? `const v=document.querySelector('[data-empire-view="${view}"]')||document.querySelector('.empire-${view}')||document.querySelector('.goal-switch [data-group="${view}"]');if(v&&!v.hidden)v.click();` : ''}})()`);
        await sleep(450);
        for (const f of await evaluate(scan)) failures.push(`${saveName} ${width}×${height} ${tab}: "${f.text}" leaves "${f.lone}" alone (${f.where})`);
      }
    }
  }
  const unique = [...new Set(failures)];
  if (errors.length) console.error('page errors:\n  ' + [...new Set(errors)].join('\n  '));
  if (unique.length) { console.error(`${unique.length} lone word(s):\n  ` + unique.join('\n  ')); code = 1; }
  else console.log(`lone words: none across ${Object.keys(saves).length} saves × ${sizes.length} widths × ${tabs.length} tabs — passed`);
  ws.close();
} catch (e) { console.error(e.message); code = 1; }
finally { proc.kill(); await sleep(100); await rm(profile, { recursive: true, force: true }).catch(() => {}); }
process.exit(code);
