// Capture the README's branch-scene artwork (docs/assets/{riverside,old-town,city-center,desert-oasis}.jpg,
// 800×600 @2x) and main-shop.jpg (640×480 @2x) from a running dev or preview server, through the same
// dependency-free CDP skeleton as capture-showcase.mjs. UI chrome is hidden so the frames are pure scene art.
//
//   node scripts/capture-branches.mjs docs/assets http://127.0.0.1:5199/
import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const outDir = process.argv[2] || 'docs/assets';
const gameUrl = process.argv[3] || 'http://127.0.0.1:5199/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9334;
const profile = join(outDir, '.chrome-profile');
await mkdir(outDir, { recursive: true });
await mkdir(profile, { recursive: true });

// GPU headless renders the WebGL post pass but tolerates only one navigation per process, so each capture
// gets its own Chrome. Set NO_GPU=1 to fall back to software (plain-canvas frames, no bloom).
const gpuArgs = process.env.NO_GPU ? ['--disable-gpu'] : ['--use-angle=metal', '--enable-gpu-rasterization', '--ignore-gpu-blocklist'];
async function launch() {
  const proc = spawn(chrome, [
    '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', ...gpuArgs, 'about:blank'
  ], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 50 && !targets?.length; i++) {
    try { targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).filter(t => t.type === 'page'); } catch { await sleep(200); }
  }
  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
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
  return { proc, ws, send, waitEvent, evaluate, events };
}

const showcase = (activeStore = 0) => ({
  money: 940000, lifetime: 5200000, orderCounters: 3, idStaff: 5,
  lines: [30, 30, 30, 30, 30, 30], staff: [8, 8, 8, 8, 8, 8], stock: [80, 101, 0, 11, 40],
  strains: [2, 2, 1, 1], activeStrain: 0, menuStrains: [0, 1, 2], sold: 3180, onlineCompleted: 46,
  kiosk: true, secondKiosk: true, queueLevel: 3, storageLevel: 3, webLevel: 3, comfortLevel: 2, signLevel: 2,
  seedBatchLevel: 2, growBatchLevel: 2, harvestBatchLevel: 2, packSpeedLevel: 2, serviceLevel: 2,
  gameSpeed: 1, lastSeen: Date.now(),
  empire: { activeStore, stores: [{ level: 7, projects: [true, true, false] }, { level: 7, projects: [true, false, false] }, { level: 7, projects: [true, false, false] }, { level: 7, projects: [true, false, false] }, { level: 7, projects: [true, false, false] }] }
});
const seed = save => `try{localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');}catch(e){}`;
const HIDE_UI = `(()=>{const s=document.createElement('style');s.textContent='.hud,.sheet,.tray-bar,.map-controls,.markers,.marker,.gesture-hint,.toast,.run,#branchMapMarker{display:none!important}.world{inset:0!important}';document.head.appendChild(s);window.dispatchEvent(new Event('resize'));return true})()`;

async function capture(name, activeStore, { width, height, scale }) {
  const { proc, ws, send, waitEvent, evaluate } = await launch();
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: scale, mobile: false, screenOrientation: { type: 'portraitPrimary', angle: 0 } });
  await send('Page.addScriptToEvaluateOnNewDocument', { source: seed(showcase(activeStore)) });
  await send('Page.navigate', { url: gameUrl });
  await waitEvent('Page.loadEventFired');
  await sleep(3500);
  await evaluate('document.fonts && document.fonts.ready');
  await evaluate(HIDE_UI);
  await sleep(900);
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88, fromSurface: true });
  await writeFile(join(outDir, `${name}.jpg`), Buffer.from(data, 'base64'));
  console.log('wrote', name, await evaluate('(document.querySelectorAll(".world canvas")[1]||{}).style?.display||"no-gl"'));
  ws.close();
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill();
  await exited;
}

await capture('main-shop', 0, { width: 640, height: 480, scale: 2 });
await capture('riverside', 1, { width: 800, height: 600, scale: 2 });
await capture('old-town', 2, { width: 800, height: 600, scale: 2 });
await capture('city-center', 3, { width: 800, height: 600, scale: 2 });
await capture('desert-oasis', 4, { width: 800, height: 600, scale: 2 });
await capture('alpine', 5, { width: 800, height: 600, scale: 2 });

await rm(profile, { recursive: true, force: true });
console.log('done');
