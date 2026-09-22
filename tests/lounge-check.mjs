// The smoking lounge: with the first tier bought, a share of the door heads for the curtain, is seated only while a
// seat and a jar are free, pays on the way in, never holds a place in the order line, and leaves by the back door on
// to the exit lane.
// Drives the installed Google Chrome headlessly over the DevTools protocol (no npm dependency) against a running dev
// or preview server, with a throwaway profile so nothing touches a real save.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/lounge-check.mjs http://127.0.0.1:5174/
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9339;
const profile = await mkdtemp(join(tmpdir(), 'canopy-lounge-'));
const proc = spawn(chrome, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--disable-gpu', 'about:blank'
], { stdio: 'ignore' });

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
  // An open shop with the speakeasy tier bought, three staffed order counters, heavy foot traffic, a quick doorman, a slow
  // pickup counter and deep jar stock.
  const save = { lines: [5, 5, 5, 5, 5, 5], staff: [0, 0, 0, 0, 0, 0], idStaff: 10, scannerLevel: 5, queueLevel: 6, pickupLevel: 4, readyLevel: 4,
    stock: [50, 50, 50, 90, 90], kiosk: true, lounge: 1, orderCounters: 3, trafficLevel: 12, doorBuilt: true, shopOpen: true, money: 5000, gameSpeed: 4, lastSeen: Date.now() };
  await send('Page.navigate', { url: new URL('/manifest.webmanifest', gameUrl).href });
  await sleep(300);
  await evaluate(`try{localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});}catch(e){}`);
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});Object.defineProperty(document,'hidden',{get:()=>false});Object.defineProperty(document,'visibilityState',{get:()=>'visible'});` });
  await send('Page.navigate', { url: gameUrl });
  // The status tool is registered a few statements after the ready flag; wait for it too.
  await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool');
  await evaluate("document.querySelector('[data-speed=\"4\"]').click()");

  const first = await status();
  assert.equal(first.lounge.level, 1); assert.equal(first.lounge.seats, 4); assert.equal(first.lounge.nextCost, 750000);
  assert.equal(await evaluate("document.querySelector('[data-marker=lounge]').classList.contains('is-lot')"), false);
  assert.equal(await evaluate("document.querySelector('[data-lounge] em').textContent"), 'Lv 1');

  let seatedPeak = 0, ropePeak = 0, leaversSeen = 0, overSeated = [], flowPeak = 0, pilePeak = 0, countersPeak = 0;
  for (let sample = 0; sample < 160; sample++) {
    await sleep(250);
    const s = await status();
    // Nobody piles up beside the ID desk: lounge guests hold no place in the order line, so the customers behind
    // them never wait at the lane join for a guest who is on the rope or inside.
    const joined = s.customers.filter(c => c.phase === 'ordering' && !c.walking && Math.hypot(c.x + 9.7, c.z - 8.15) < .2).length;
    pilePeak = Math.max(pilePeak, joined);
    // All three counters take customers while guests are in the lounge: a guest is never mistaken for the head of the line.
    countersPeak = Math.max(countersPeak, new Set(s.customers.filter(c => c.orderCounter != null && !c.ordered && c.phase === 'ordering').map(c => c.orderCounter)).size);
    seatedPeak = Math.max(seatedPeak, s.lounge.seated); ropePeak = Math.max(ropePeak, s.lounge.waiting);
    if (s.lounge.seated > s.lounge.seats) overSeated.push(s.lounge.seated);
    // Nobody inside the lounge, or walking to it, holds one of the line's twenty places: the line still fills while
    // the seats are taken.
    const inside = s.customers.filter(c => c.phase === 'lounge' || c.phase === 'toLounge').length;
    const queued = s.customers.filter(c => !c.ordered && c.phase !== 'leaving' && c.phase !== 'lounge' && c.phase !== 'toLounge').length;
    flowPeak = Math.max(flowPeak, queued + inside);
    // Guests leaving the lounge carry no bag and come out on the exit lane past the cabinet, never through the shop.
    s.customers.filter(c => c.lounge && c.phase === 'leaving' && !c.bag).forEach(c => {
      leaversSeen++;
      assert.ok(c.x >= 8.5 || c.z <= -7.5, `lounge guest ${c.id} left through the shop at (${c.x.toFixed(2)}, ${c.z.toFixed(2)})`);
    });
  }
  const last = await status();
  assert.ok(seatedPeak >= 2 && seatedPeak <= 4, `seats used peaked at ${seatedPeak}`);
  assert.deepEqual(overSeated, [], 'more guests seated than seats');
  assert.ok(flowPeak > 20, `the line never filled past its twenty places while guests were inside (peak ${flowPeak})`);
  assert.ok(last.lounge.sessions >= 3, `only ${last.lounge.sessions} sessions ran`);
  assert.ok(leaversSeen > 0, 'no guest was seen leaving the lounge');
  assert.ok(pilePeak <= 1, `${pilePeak} customers stood on top of each other at the lane join beside the ID desk`);
  assert.equal(countersPeak, 3, `only ${countersPeak} of the three order counters were ever in use at once`);
  assert.ok(last.stock[3] < 90, 'sessions burned no jars');
  assert.deepEqual(errors, [], 'page errors');
  console.log(`lounge: ${last.lounge.sessions} sessions, up to ${seatedPeak} of 4 seated, up to ${ropePeak} on the rope, ${leaversSeen} leaver samples on the exit lane, all ${countersPeak} counters busy at once`);
  ws.close();
} finally {
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill(); await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
