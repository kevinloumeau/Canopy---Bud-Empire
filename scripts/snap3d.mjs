// Quick 3D map screenshot for checking a change without a GPU. A cloud browser draws WebGL on the CPU at about a frame
// a second, so this opens the game with ?snap (the frame loop and clock stand still, see __canopySnap in main.js),
// seeds a save, waits for every model and texture, draws one frame of the view asked for and saves it as a PNG.
// It drives Chrome or Chromium over the DevTools protocol, with no npm dependency, in a throwaway profile.
//
//   npm run dev                                   # or npm run preview after a build
//   node scripts/snap3d.mjs out.png                               # the showcase shop at rest, 900×600
//   node scripts/snap3d.mjs out.png --at 10,8.7 --zoom 2.5        # centre a map point (x,z or x,z,y) closer in
//   node scripts/snap3d.mjs out.png --phone --light night --advance 20 --save my-save.json --no-ui
//
// Options: --url (default http://127.0.0.1:4173/), --size WxH, --dpr, --phone (390×844), --save fresh|showcase|file,
// --light day|night, --advance seconds of play before the shot, --no-ui (map only), --live (no ?snap, for timing),
// --away seconds since the last visit (shows the welcome back report from 900), --eval 'js' run in the page before the capture, printing what it returns (--wait ms after it, default 400).
// Chrome comes from CHROME, Playwright's Chromium (/opt/pw-browsers) or the default macOS path.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const started = Date.now();
const args = process.argv.slice(2), flags = {};
let out = 'snap3d.png';
for (let i = 0; i < args.length; i++) {
  if (!args[i].startsWith('--')) { out = args[i]; continue; }
  const key = args[i].slice(2), next = args[i + 1];
  flags[key] = next === undefined || next.startsWith('--') ? true : (i++, next);
}
const url = new URL(flags.url || 'http://127.0.0.1:4173/');
if (!flags.live) url.searchParams.set('snap', '');
const [width, height] = flags.phone ? [390, 844] : (flags.size || '900x600').split('x').map(Number);
const dpr = Number(flags.dpr || 1);
const view = {};
if (flags.zoom) view.zoom = Number(flags.zoom);
if (flags.at) { const [x, z, y] = String(flags.at).split(',').map(Number); Object.assign(view, { x, z, y: y || 0 }); }
if (flags.light) view.light = flags.light;
if (flags.advance) view.advance = Number(flags.advance);

// A developed shop (as scripts/capture-showcase.mjs seeds it): every station at level 30, three counters, three strains.
const showcase = {
  money: 940000, lifetime: 5200000, orderCounters: 3, idStaff: 5, doorBuilt: true, shopOpen: true,
  lines: [30, 30, 30, 30, 30, 30], staff: [8, 8, 8, 8, 8, 8], stock: [80, 101, 0, 11, 40],
  strains: [2, 2, 1, 1], activeStrain: 0, menuStrains: [0, 1, 2], sold: 3180, onlineCompleted: 46,
  kiosk: true, secondKiosk: true, queueLevel: 3, storageLevel: 3, webLevel: 3, comfortLevel: 2, signLevel: 2,
  seedBatchLevel: 2, growBatchLevel: 2, harvestBatchLevel: 2, packSpeedLevel: 2, serviceLevel: 2, gameSpeed: 1, lastSeen: Date.now()
};
const saveName = flags.save || 'showcase';
const save = saveName === 'fresh' ? null : saveName === 'showcase' ? showcase : JSON.parse(await readFile(saveName, 'utf8'));
const seed = `try{${save ? `localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify({ ...save, lastSeen: Date.now() - Number(flags.away || 0) * 1000 }))});` : ''}localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');}catch(e){}`;

const chrome = process.env.CHROME || ['/opt/pw-browsers/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
const profile = await mkdtemp(join(tmpdir(), 'snap3d-'));
const port = 9300 + Math.floor(Math.random() * 600);
// SwiftShader through ANGLE is Chromium's CPU WebGL; on a Mac with a GPU the flags are dropped and Chrome uses the GPU.
const gl = process.platform === 'darwin' ? [] : ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--no-first-run',
  '--no-default-browser-check', '--hide-scrollbars', '--mute-audio', '--no-sandbox', ...gl, 'about:blank'], { stdio: 'ignore' });
const finish = async code => { proc.kill(); await sleep(100); await rm(profile, { recursive: true, force: true }).catch(() => {}); process.exit(code); };

let targets;
for (let i = 0; i < 100 && !targets?.length; i++) {
  try { targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).filter(t => t.type === 'page'); } catch { await sleep(100); }
}
if (!targets?.length) { console.error('Chrome did not start:', chrome); await finish(1); }
const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve));
let nextId = 0; const pending = new Map(), events = [];
ws.addEventListener('message', ev => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); }
  else if (msg.method === 'Runtime.exceptionThrown') console.error('page error:', msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text);
  else if (msg.method) events.push(msg);
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result?.value;
};
const until = async (expression, what, ms = 60000) => {
  const start = Date.now();
  while (Date.now() - start < ms) { if (await evaluate(expression).catch(() => false)) return; await sleep(100); }
  throw new Error(`Timed out waiting for ${what}`);
};

try {
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dpr, mobile: !!flags.phone });
  if (flags.phone) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: seed });
  await send('Page.navigate', { url: url.href });
  await until('window.__shiftReady===true', 'the game to start');
  const map = flags.live ? '(window.__canopyFrameMs>0)' : 'window.__canopySnap&&window.__canopySnap.status().map3d';
  await until(map, 'the 3D map');
  // Map only: hide everything but the map's canvases (the HUD, panels, dock, map buttons and station tags).
  if (flags['no-ui']) await evaluate(`(()=>{const w=document.getElementById('world');for(const c of w.children)if(c.tagName!=='CANVAS')c.style.visibility='hidden';for(let e=w;e&&e!==document.body;e=e.parentElement)for(const s of e.parentElement.children)if(s!==e&&s.tagName!=='SCRIPT')s.style.visibility='hidden'})()`);
  const loaded = Date.now();
  if (flags.live) {
    // The game's own loop keeps drawing; wait for the files the 3D map asks for (it asks as stations come into view).
    await sleep(1500);
    await evaluate('document.fonts.ready');
  } else {
    // A frame can ask for more models (a station's tier, a prop coming into view), so set frames up without drawing
    // them until one asks for nothing new, then draw the one frame that is captured.
    let status = await evaluate(`window.__canopySnap(${JSON.stringify({ ...view, draw: false })})`);
    for (let round = 0; round < 8 && status.loading !== 0; round++) {
      await until('window.__canopySnap.status().loading===0', 'models to load');
      status = await evaluate(`window.__canopySnap({draw:false})`);
    }
    await evaluate('document.fonts.ready');
    await evaluate('window.__canopySnap()');
  }
  // --eval runs a script in the page just before the capture, e.g. to open a panel or show a toast.
  if (flags.eval) { const r = await evaluate(flags.eval); if (r !== undefined) console.log(JSON.stringify(r)); await sleep(Number(flags.wait || 400)); }
  const drawn = Date.now();
  const { data } = await send('Page.captureScreenshot', { format: 'png', fromSurface: true });
  await writeFile(out, Buffer.from(data, 'base64'));
  const s = ms => (ms / 1000).toFixed(1) + 's';
  console.log(`wrote ${out} (${width}×${height} @${dpr}x) in ${s(Date.now() - started)}: start ${s(loaded - started)}, draw ${s(drawn - loaded)}, capture ${s(Date.now() - drawn)}`);
  await finish(0);
} catch (e) {
  console.error(e.message);
  await finish(1);
}
