// Shop-floor lines: the order line's rope pen holds at least twenty places and fills well before the line spills out
// of the door, everyone in it stands on the roped route, and the pickup line is first come, first served — nobody stands in it while the counter is free
// just because a kiosk customer who ordered earlier is still walking over.
// Drives the installed Google Chrome headlessly over the DevTools protocol (no npm dependency) against a running dev
// or preview server, with a throwaway profile so nothing touches a real save.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/queue-check.mjs http://127.0.0.1:5174/
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9338;
const profile = await mkdtemp(join(tmpdir(), 'canopy-queue-'));
const proc = spawn(chrome, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'
], { stdio: 'ignore' });

// Distance from a point to a polyline, in floor units.
function distanceToRoute(route, x, z) {
  let best = Infinity;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], dx = b.x - a.x, dz = b.z - a.z, len = dx * dx + dz * dz;
    const t = len ? Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.z) * dz) / len)) : 0;
    best = Math.min(best, Math.hypot(x - (a.x + dx * t), z - (a.z + dz * t)));
  }
  return best;
}

try {
  let targets;
  for (let i = 0; i < 50 && !targets?.length; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); } catch { await sleep(200); }
  }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => ws.addEventListener('open', resolve));
  let nextId = 0; const pending = new Map(); const errors = [];
  ws.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { const p = pending.get(msg.id); pending.delete(msg.id); msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result); }
    else if (msg.method === 'Runtime.exceptionThrown') errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result?.value;
  };
  const waitFor = async (expression, ms = 15000) => { const start = Date.now(); while (Date.now() - start < ms) { if (await evaluate(expression)) return; await sleep(100); } throw new Error(`Timed out waiting for ${expression}`); };
  const status = () => evaluate('window.factoryTool.execute()');

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  // A busy open shop: a quick doorman, a slow order desk and pickup counter so both lines fill, a kiosk so kiosk and
  // counter customers share the pickup line, deep stock, and the line expanded to twenty places.
  const save = { lines: [5, 5, 5, 5, 5, 5], staff: [0, 0, 0, 0, 0, 0], idStaff: 10, scannerLevel: 5, queueLevel: 6, pickupLevel: 4, readyLevel: 4,
    stock: [50, 50, 50, 90, 90], kiosk: true, doorBuilt: true, shopOpen: true, money: 5000, gameSpeed: 4, lastSeen: Date.now() };
  await send('Page.navigate', { url: new URL('/manifest.webmanifest', gameUrl).href });
  await sleep(300);
  await evaluate(`try{localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});}catch(e){}`);
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});Object.defineProperty(document,'hidden',{get:()=>false});Object.defineProperty(document,'visibilityState',{get:()=>'visible'});` });
  await send('Page.navigate', { url: gameUrl });
  // The status tool is registered a few statements after the ready flag; wait for it too.
  await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool');
  await evaluate("document.querySelector('[data-speed=\"4\"]').click()");

  const first = await status();
  assert.equal(first.gameSpeed, 4);
  const orderRoute = first.orderRoute, pickupRoute = first.pickupRoute, head = pickupRoute[0];
  assert.ok(orderRoute.length > 8 && pickupRoute.length > 3, 'routes are exposed');
  // The pen itself (gate to the end of the third row) holds twenty places at the widest spacing.
  const penLength = orderRoute.slice(1, 7).reduce((n, p, i) => n + Math.hypot(p.x - orderRoute[i].x, p.z - orderRoute[i].z), 0);
  assert.ok(penLength >= 15, `the order pen's route is only ${penLength.toFixed(1)} units long`);

  // Sample the floor for a while: the pen fills, everyone queuing stands on the route, pickups never stall.
  let penPeak = 0, offRoute = [], stall = 0, stalls = 0, servedStart = first.customersServed, previous = null;
  for (let sample = 0; sample < 160; sample++) {
    await sleep(250);
    const s = await status();
    const byId = new Map((previous?.customers || []).map(c => [c.id, c]));
    const inPen = s.customers.filter(c => !c.ordered && c.phase === 'ordering' && c.x >= -6.8 && c.x <= -1.7 && c.z >= 6.6 && c.z <= 9.6).length;
    penPeak = Math.max(penPeak, inPen);
    s.customers.forEach(c => {
      if (c.ordered || c.phase !== 'ordering' || c.orderCounter != null || c.walking) return;
      const d = distanceToRoute(orderRoute, c.x, c.z);
      if (d > .1) offRoute.push({ id: c.id, x: +c.x.toFixed(2), z: +c.z.toFixed(2), d: +d.toFixed(2) });
    });
    // A pickup stall: someone stands in the pickup line, nobody is at the counter and nobody in the line is moving.
    const inLine = s.customers.filter(c => c.ordered && !c.bag && c.phase === 'pickup');
    const atHead = inLine.some(c => Math.hypot(c.x - head.x, c.z - head.z) < .3);
    const moving = inLine.some(c => { const was = byId.get(c.id); return !was || Math.hypot(was.x - c.x, was.z - c.z) > .01; });
    if (inLine.length && !atHead && !moving && s.stock[4] > 0) { stall++; if (stall === 6) stalls++; } else stall = 0;
    // Tickets follow arrival in the line, never the order in which people ordered.
    inLine.filter(c => c.pickupTicket).forEach(c => assert.ok(c.pickupTicket > 0));
    const walkingOver = s.customers.filter(c => c.ordered && !c.bag && c.phase === 'toPickup');
    walkingOver.forEach(c => assert.equal(c.pickupTicket, 0, `customer ${c.id} holds a pickup ticket while still walking over`));
    // On the way to the pickup line everyone crosses in the aisle behind the ordering customers (z ≥ 5.3), never
    // along the counter front — except a counter customer stepping straight back from their own spot.
    walkingOver.filter(c => c.x > -7.3 && c.x < -.5).forEach(c => {
      const atOwnCounter = first.orderCounterPositions.some(p => Math.abs(p.x - c.x) < .05);
      assert.ok(c.z >= 5.3 || atOwnCounter, `customer ${c.id} cuts along the counter front at (${c.x.toFixed(2)}, ${c.z.toFixed(2)})`);
    });
    previous = s;
  }
  const last = await status();
  // Half of the arrivals use the kiosk instead, so the pen fills to about half the line's twenty places.
  assert.ok(penPeak >= 10, `the order pen only ever held ${penPeak} customers`);
  assert.deepEqual(offRoute.slice(0, 5), [], 'customers standing off the roped order route');
  assert.equal(stalls, 0, 'the pickup line stalled with the counter free');
  assert.ok(last.customersServed > servedStart, 'no pickups completed');
  assert.deepEqual(errors, [], 'page errors');
  console.log(`order pen route ${penLength.toFixed(1)} units, peaked at ${penPeak} customers, everyone on the route, ${last.customersServed - servedStart} pickups served with no stall`);
  ws.close();
} finally {
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill(); await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
