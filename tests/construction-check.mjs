// Construction intro: a new shop starts as seven sites, the guide raises them one tap at a time, points out the lounge
// lot for later, then opens the shop.
// Drives the installed Google Chrome headlessly over the DevTools protocol (no npm dependency) against a running dev
// or preview server, with a throwaway profile so nothing touches a real save.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/construction-check.mjs http://127.0.0.1:5174/
//
// Checks, at phone and desktop sizes: a fresh profile opens the hero with every site unbuilt and no customers; each
// site is built by a tap inside its spotlight ring (the ring never sits under the card); the shop opens only from the
// final card and customers then arrive; a half-built save resumes at its next site and Skip finishes the job; a save
// from before the intro loads as an open shop with every station standing.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9337;
const profile = await mkdtemp(join(tmpdir(), 'canopy-construction-'));
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
  const save = () => evaluate("JSON.parse(localStorage.getItem('shift-save'))");
  const guide = () => evaluate(`(()=>{const g=document.querySelector('.start-guide');return {open:!g.hidden,eyebrow:g.querySelector('.guide-eyebrow').textContent,cta:g.querySelector('.guide-next').textContent,build:g.classList.contains('is-build')}})()`);
  const rects = () => evaluate(`(()=>{const r=e=>{const b=e.getBoundingClientRect();return {left:b.left,top:b.top,right:b.right,bottom:b.bottom,width:b.width,height:b.height}};return {ring:r(document.querySelector('.guide-ring')),card:r(document.querySelector('.guide-card'))}})()`);
  const click = async (x, y) => {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
  };
  const seed = save => `try{localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');${save ? `localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});` : ''}}catch(e){}`;
  const boot = async (saveData, extra = '') => {
    // Seed on a blank page (same origin, so the game's own unload handler cannot re-save over it), then load the game.
    await send('Page.navigate', { url: new URL('/manifest.webmanifest', gameUrl).href });
    await sleep(300);
    await evaluate(seed(saveData));
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});${extra}` });
    await send('Page.navigate', { url: gameUrl });
    await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool');
  };

  await send('Page.enable'); await send('Runtime.enable');
  const SITES = ['Security', 'Seeds', 'Grow', 'Harvest', 'Pack', 'Orders', 'Pickup'];

  for (const [name, width, height] of [['phone', 390, 844], ['desktop', 1440, 900]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 780 });
    await boot(null);

    // A fresh shop: nothing built, nothing open, the hero card up, and nobody walking in while the sign is off.
    await waitFor("!document.querySelector('.start-guide').hidden");
    let s = await status();
    assert.deepEqual(s.lineLevels, [0, 0, 0, 0, 0, 0]); assert.equal(s.shopOpen, false); assert.equal(s.doorBuilt, false);
    assert.equal((await guide()).cta, 'Start building');
    await evaluate("document.querySelector('[data-speed=\"4\"]').click()"); await sleep(2500);
    assert.equal((await status()).customers.length, 0, 'customers arrived before the shop opened');
    assert.equal(await evaluate("document.querySelector('#machineCost').textContent"), 'FREE');
    assert.equal(await evaluate("[...document.querySelectorAll('.marker.is-site')].length"), 7);
    await evaluate("document.querySelector('.guide-next').click()"); await sleep(400);

    // Seven sites, each raised by a tap inside its ring; the card must never cover the ring.
    for (let i = 0; i < SITES.length; i++) {
      const g = await guide();
      assert.equal(g.eyebrow, `Site ${i + 1} of 7 · ${SITES[i]}`); assert.equal(g.build, true); assert.equal(g.cta, 'Build');
      const { ring, card } = await rects();
      assert.ok(ring.width > 0 && ring.height > 0, `${name}: ring for ${SITES[i]} is not on screen`);
      const overlap = ring.left < card.right && ring.right > card.left && ring.top < card.bottom && ring.bottom > card.top;
      assert.equal(overlap, false, `${name}: the card covers the ${SITES[i]} site`);
      await click(ring.left + ring.width / 2, ring.top + ring.height / 2);
      await sleep(250);
      s = await status();
      assert.equal(i === 0 ? s.doorBuilt : s.lineLevels[i - 1] === 1, true, `${SITES[i]} did not build on tap`);
      assert.equal((await guide()).cta, 'Built');
      await sleep(1000);
    }
    // The lounge lot is pointed out for later: spotlit and selected on the Stations card, but there is nothing to build.
    const lounge = await guide();
    assert.equal(lounge.eyebrow, 'Later · The back room'); assert.equal(lounge.build, false); assert.equal(lounge.cta, 'Next');
    assert.equal(await evaluate("document.getElementById('machineName').textContent"), 'SMOKING LOUNGE');
    assert.equal(await evaluate("document.querySelector('[data-marker=lounge]').classList.contains('is-lot')"), true);
    {
      const { ring, card } = await rects();
      assert.ok(ring.width > 0 && ring.height > 0, `${name}: ring for the lounge lot is not on screen`);
      const overlap = ring.left < card.right && ring.right > card.left && ring.top < card.bottom && ring.bottom > card.top;
      assert.equal(overlap, false, `${name}: the card covers the lounge lot`);
    }
    await evaluate("document.querySelector('.guide-next').click()"); await sleep(400);
    assert.equal((await status()).lounge.level, 0, 'the intro bought the lounge');
    const final = await guide();
    assert.equal(final.eyebrow, 'Canopy · Grand opening'); assert.equal(final.cta, 'Open the shop');
    s = await status(); assert.deepEqual(s.lineLevels, [1, 1, 1, 1, 1, 1]); assert.equal(s.shopOpen, false);
    assert.equal(await evaluate("document.querySelector('.marker.is-site')"), null);

    // Flip the sign: the guide closes, the tray comes back, the save marks the shop open and customers arrive.
    await evaluate("document.querySelector('.guide-next').click()");
    await waitFor("document.querySelector('.start-guide').hidden");
    assert.equal(await evaluate("localStorage.getItem('shift-guide-seen')"), '1');
    assert.equal((await save()).shopOpen, true);
    assert.equal(await evaluate("document.getElementById('sheet').classList.contains('collapsed')"), false);
    await waitFor('window.factoryTool.execute().customers.length>0', 8000);
    // A reload keeps the open shop and does not reopen the intro.
    await send('Page.reload'); await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool'); await sleep(900);
    assert.equal((await guide()).open, false);
    assert.deepEqual((await status()).lineLevels, [1, 1, 1, 1, 1, 1]);

    // A half-built shop resumes at its next site, and Skip raises the rest and opens up.
    await boot({ lines: [1, 1, 0, 0, 0, 0], doorBuilt: true, shopOpen: false, money: 30, gameSpeed: 0, lastSeen: Date.now() });
    await waitFor("!document.querySelector('.start-guide').hidden");
    assert.equal((await guide()).eyebrow, 'Site 4 of 7 · Harvest');
    assert.deepEqual((await status()).lineLevels, [1, 1, 0, 0, 0, 0]);
    await evaluate("document.querySelector('.guide-skip').click()"); await sleep(400);
    s = await status(); assert.deepEqual(s.lineLevels, [1, 1, 1, 1, 1, 1]); assert.equal(s.shopOpen, true);
    assert.equal((await guide()).open, false);

    // A save from before the intro is an open shop with every station standing; the intro stays closed.
    await boot({ money: 500, gameSpeed: 0, lastSeen: Date.now() }, "localStorage.setItem('shift-guide-seen','1')");
    await sleep(900);
    s = await status(); assert.deepEqual(s.lineLevels, [1, 1, 1, 1, 1, 1]); assert.equal(s.shopOpen, true); assert.equal(s.doorBuilt, true);
    assert.equal((await guide()).open, false);
    assert.equal(await evaluate("document.querySelector('.marker.is-site')"), null);

    assert.deepEqual(errors, [], `${name}: page errors`);
    console.log(`${name}: fresh sites, seven taps with clear rings, the lounge lot pointed out, opening, reload, resume, skip and legacy save passed`);
  }
  ws.close();
} finally {
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill(); await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
