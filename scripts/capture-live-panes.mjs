// Capture the game's live panes for the launch page: the Stations, Deliveries and Empire sheets as markup
// (welcome/live/*.html), each station's Canvas equipment illustration (welcome/media/station-N.png), and the
// per-state phone frames the pinned phone crossfades through (welcome/media/phone-*.jpg). It drives the installed
// Google Chrome headlessly over the DevTools protocol against a running dev or preview server, with a seeded
// showcase save in a throwaway profile; your own save is untouched.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node scripts/capture-live-panes.mjs http://127.0.0.1:5174/
//
// The transient toast (welcome-back, rewards) is hidden for the captures so frames do not depend on timing.
// Run scripts/capture-showcase.mjs as well for the map, night and desktop frames. Requires Node 22+ and Chrome.
// After a run, re-embed each file's origin note (the Impeccable embed-prompt tool) so shipped rasters keep their provenance.
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
const gameUrl = process.argv[2] || 'http://127.0.0.1:5174/';
const outDir = 'welcome/media', liveDir = 'welcome/live';
const port = 9336; const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const profile = join(outDir, '.chrome-profile');
await mkdir(outDir, { recursive: true }); await mkdir(liveDir, { recursive: true }); await mkdir(profile, { recursive: true });
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run', '--hide-scrollbars', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
let list; for (let i = 0; i < 50; i++) { try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (list.length) break; } catch {} await sleep(200); }
const ws = new WebSocket(list.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); } else if (m.method) events.push(m); });
const send = (method, params = {}) => new Promise((resolve, reject) => { const n = ++id; pending.set(n, { resolve, reject }); ws.send(JSON.stringify({ id: n, method, params })); });
const waitEvent = async (method, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { const i = events.findIndex(e => e.method === method); if (i >= 0) return events.splice(i, 1)[0]; await sleep(50); } throw new Error('timeout ' + method); };
const evaluate = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' ' + JSON.stringify(r.exceptionDetails.exception?.description)); return r.result?.value; };
const save = { money: 940000, lifetime: 5200000, orderCounters: 3, idStaff: 5, lines: [30,30,30,30,30,30], staff: [8,8,8,8,8,8], stock: [80,101,0,11,40], strains: [4,3,2,1], activeStrain: 0, menuStrains: [0,1,2], sold: 3180, onlineCompleted: 46, kiosk: true, secondKiosk: true, queueLevel: 6, storageLevel: 3, webLevel: 3, comfortLevel: 2, signLevel: 2, seedBatchLevel: 2, growBatchLevel: 2, harvestBatchLevel: 2, packSpeedLevel: 2, serviceLevel: 2, gameSpeed: 1, lastSeen: Date.now() + 60000, strainTrend: { index: 1, remaining: 475 }, autoDrone: { owned: true, enabled: true, bulk: true, mode: 'bulk', remaining: 9.5 }, onlineRequests: 7, empire: { stores: [{ level: 7, projects: [true, true, false] }, { level: 7, projects: [true, false, false] }, { level: 7, projects: [true, false, false] }] } };
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send('Page.addScriptToEvaluateOnNewDocument', { source: `try{localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');}catch(e){}document.addEventListener('DOMContentLoaded',function(){var st=document.createElement('style');st.textContent='.toast{display:none!important}';document.head.appendChild(st)});` });
events.length = 0; await send('Page.navigate', { url: gameUrl }); await waitEvent('Page.loadEventFired'); await sleep(3500);
const shot = async name => { await sleep(500); const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80, fromSurface: true }); await writeFile(`${outDir}/${name}.jpg`, Buffer.from(data, 'base64')); console.log('wrote', name); };
const tab = async pane => { await evaluate(`(()=>{const b=document.querySelector('.tray-tabs button[data-tray="${pane}"]');b&&b.click();return 1})()`); await sleep(900); };
const paneHtml = pane => evaluate(`document.querySelector('[data-pane="${pane}"]').innerHTML`);
const out = { menu: { detail: [] }, stations: [], deliveries: null, empire: null, storeCards: null };

// Deliveries first, before the auto drone's first check clears the queue.
await tab('orders'); await sleep(700);
await shot('phone-deliveries');
out.deliveries = await paneHtml('orders');

// Menu, unpaused this time.
await tab('flowers');
for (let i = 0; i < 4; i++) {
  await evaluate(`document.getElementById('strainTab${i}').click()`); await sleep(700);
  await shot(`phone-menu-${i}`);
  out.menu.detail.push(await evaluate(`document.getElementById('strainDetail').innerHTML`));
  if (i === 0) { out.menu.nav = await evaluate(`document.getElementById('strainNav').outerHTML`); out.menu.buyers = await evaluate(`document.getElementById('flowerBuyers').innerHTML`); out.menu.summary = await evaluate(`document.getElementById('flowerSummary').textContent`); }
}

// Stations: security first, then the six production stations.
await tab('factory');
const stationButtons = ['[data-security]', '[data-machine="0"]', '[data-machine="1"]', '[data-machine="2"]', '[data-machine="3"]', '[data-machine="4"]', '[data-machine="5"]'];
for (let k = 0; k < stationButtons.length; k++) {
  await evaluate(`document.querySelector('.machine-nav button${stationButtons[k]}').click()`); await sleep(800);
  await shot(`phone-stations-${k}`);
  out.stations.push({ html: await paneHtml('factory'), name: await evaluate(`document.getElementById('machineName').textContent`) });
  const png = await evaluate(`document.getElementById('upgradePreview').toDataURL('image/png')`);
  await writeFile(`${outDir}/station-${k}.png`, Buffer.from(png.split(',')[1], 'base64'));
}

// Empire home, then each store screen.
await tab('empire'); await sleep(600);
await shot('phone-empire');
out.empire = await paneHtml('empire');
for (let s = 0; s < 3; s++) {
  const name = ['Riverside', 'Old Town', 'City Center'][s];
  const ok = await evaluate(`(()=>{const els=[...document.querySelectorAll('[data-pane="empire"] button, [data-pane="empire"] [role="button"], [data-pane="empire"] article, [data-pane="empire"] li')];const el=els.find(e=>e.textContent.trim().startsWith('${name}'));if(!el)return 'none';el.click();return el.tagName+'.'+el.className})()`);
  console.log('store', s, ok); await sleep(900);
  await shot(`phone-store-${s}`);
  await evaluate(`(()=>{const b=document.querySelector('[data-pane="empire"] .empire-back-button');b&&b.click();return !!b})()`); await sleep(700);
}
// Fragments: strip the hidden thumbnails and the unbuilt-pad panel, swap the preview canvas for its captured PNG.
const clean = h => h.replace(/<canvas class="machine-thumb"[^>]*><\/canvas>/g, '').trim();
for (let k = 0; k < out.stations.length; k++) {
  const html = clean(out.stations[k].html).replace(/<canvas id="upgradePreview"[^>]*><\/canvas>/, `<img id="upgradePreview" src="__STATION_ART_${k}__" width="360" height="300" alt="">`);
  await writeFile(join(liveDir, `stations-${k}.html`), html);
}
await writeFile(join(liveDir, 'deliveries.html'), clean(out.deliveries.replace(/<div class="delivery-site" id="deliverySite"[\s\S]*?<\/div><\/div>\s*(?=<div class="dispatch-stats">)/, '')));
const home = out.empire.slice(out.empire.indexOf('<div class="empire-screen empire-content" data-screen="home"'));
await writeFile(join(liveDir, 'empire.html'), clean(home.slice(0, home.indexOf('<div class="empire-screen', 10)).replace(/ data-html="[^"]*"/g, '')));
// The menu board is inlined in welcome/index.html; keep its source beside the other fragments for reference.
await writeFile(join(liveDir, 'menu.json'), JSON.stringify(out.menu));
ws.close();
const exited = new Promise(resolve => proc.once('exit', resolve));
proc.kill();
await exited;
await rm(profile, { recursive: true, force: true });
console.log('done');
