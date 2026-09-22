// Capture real gameplay screenshots for the launch page and listings from a running dev or preview server.
// It drives the installed Google Chrome headlessly over the DevTools protocol (no npm dependency), seeds a
// developed showcase save into localStorage, accepts the age gate and skips the start guide, then captures
// phone-size (390×844 @2x) and desktop (1440×900) frames. Nothing touches your own save: the profile is a
// throwaway directory under the output folder.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node scripts/capture-showcase.mjs welcome/media http://127.0.0.1:5174/
//
// Requires Node 22+ (global WebSocket and fetch) and Google Chrome at the default macOS path, or set CHROME.
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const outDir = process.argv[2] || 'welcome/media';
const gameUrl = process.argv[3] || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9333;
const profile = join(outDir, '.chrome-profile');
await mkdir(outDir, { recursive: true });
await mkdir(profile, { recursive: true });

const proc = spawn(chrome, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'
], { stdio: 'ignore' });

let targets;
for (let i = 0; i < 50 && !targets?.length; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await sleep(200); }
}
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve));
let nextId = 0; const pending = new Map(); const events = [];
ws.addEventListener('message', ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); }
  else if (msg.method) events.push(msg);
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
const waitEvent = async (method, ms = 15000) => { const start = Date.now(); while (Date.now() - start < ms) { const i = events.findIndex(e => e.method === method); if (i >= 0) return events.splice(i, 1)[0]; await sleep(50); } throw new Error(`Timed out waiting for ${method}`); };
const evaluate = async expression => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

// A developed shop: every station at level 30, three counters, three strains on the menu, all branches open.
const showcase = (extra = {}) => ({
  money: 940000, lifetime: 5200000, orderCounters: 3, idStaff: 5,
  lines: [30, 30, 30, 30, 30, 30], staff: [8, 8, 8, 8, 8, 8], stock: [80, 101, 0, 11, 40],
  strains: [2, 2, 1, 1], activeStrain: 0, menuStrains: [0, 1, 2], sold: 3180, onlineCompleted: 46,
  kiosk: true, secondKiosk: true, queueLevel: 3, storageLevel: 3, webLevel: 3, comfortLevel: 2, signLevel: 2,
  seedBatchLevel: 2, growBatchLevel: 2, harvestBatchLevel: 2, packSpeedLevel: 2, serviceLevel: 2,
  gameSpeed: 1, lastSeen: Date.now(),
  empire: { stores: [{ level: 7, projects: [true, true, false] }, { level: 7, projects: [true, false, false] }, { level: 7, projects: [true, false, false] }] },
  ...extra
});
const seed = save => `try{localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');}catch(e){}`;

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

async function load(save, { width, height, mobile, scale }) {
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile, screenOrientation: { type: 'portraitPrimary', angle: 0 } });
  const { identifier } = await send('Page.addScriptToEvaluateOnNewDocument', { source: seed(save) });
  events.length = 0;
  await send('Page.navigate', { url: gameUrl });
  await waitEvent('Page.loadEventFired');
  await send('Page.removeScriptToEvaluateOnNewDocument', { identifier });
  await sleep(3500);
  await evaluate('document.fonts && document.fonts.ready');
}
async function shot(name, quality = 86) {
  await sleep(600);
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality, fromSurface: true });
  await writeFile(join(outDir, `${name}.jpg`), Buffer.from(data, 'base64'));
  console.log('wrote', name);
}
const tab = async pane => { await evaluate(`(()=>{const b=document.querySelector('.tray-tabs button[data-tray="${pane}"]');if(b)b.click();return !!b})()`); await sleep(900); };

const phone = { width: 390, height: 844, mobile: true, scale: 2 };
const desktop = { width: 1440, height: 900, mobile: false, scale: 1 };
const withPad = { autoDrone: { owned: true, enabled: true, bulk: true, mode: 'bulk' }, onlineRequests: 7, queueLevel: 6 };

await load(showcase(), phone);
await shot('phone-stations');
await tab('flowers'); await shot('phone-menu');
await tab('boosts'); await shot('phone-shop');
await tab('employees'); await shot('phone-staff');
await load(showcase(withPad), phone);
await tab('empire'); await shot('phone-empire');
await tab('orders'); await sleep(1200); await shot('phone-deliveries');
await load(showcase({ lightMode: 'night' }), phone);
await shot('phone-night');
await load(showcase({ lightMode: 'night' }), desktop);
await shot('desktop-night', 84);
await load(showcase(), desktop);
await shot('desktop-day', 84);

ws.close();
const exited = new Promise(resolve => proc.once('exit', resolve));
proc.kill();
await exited;
await rm(profile, { recursive: true, force: true });
console.log('done');
