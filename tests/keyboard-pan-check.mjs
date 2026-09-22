// Keyboard panning: on desktop the arrow keys and WASD glide the map while held, and stop when released.
// Drives the installed Google Chrome headlessly over the DevTools protocol (no npm dependency) against a running dev
// or preview server, with a throwaway profile so nothing touches a real save.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/keyboard-pan-check.mjs http://127.0.0.1:5174/
//
// Checks: each key moves the camera the way the view should travel (right arrow reveals what is to the right, so the
// content slides left); WASD matches the arrows; the camera coasts to a stop after release; two keys pan diagonally;
// panning works while paused; the clamp holds; a held key survives a game-speed key; arrow keys leave a focused control
// inside the sheet to its native scrolling while WASD still pans; keys are ignored in text fields and behind a modal;
// Center map resets; and the hint copy names the keys.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9338;
const profile = await mkdtemp(join(tmpdir(), 'canopy-keyboard-pan-'));
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
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++nextId; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); setTimeout(() => { if (pending.delete(id)) reject(new Error(`${method} did not answer within 20s`)); }, 20000); });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result?.value;
  };
  const waitFor = async (expression, ms = 15000) => { const start = Date.now(); while (Date.now() - start < ms) { if (await evaluate(expression)) return; await sleep(100); } throw new Error(`Timed out waiting for ${expression}`); };
  const camera = async () => (await evaluate('window.factoryTool.execute()')).camera;
  const KEYS = {
    ArrowUp: { key: 'ArrowUp', code: 'ArrowUp', windowsVirtualKeyCode: 38 }, ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 },
    ArrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 }, ArrowRight: { key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 },
    KeyW: { key: 'w', code: 'KeyW', windowsVirtualKeyCode: 87 }, KeyA: { key: 'a', code: 'KeyA', windowsVirtualKeyCode: 65 },
    KeyS: { key: 's', code: 'KeyS', windowsVirtualKeyCode: 83 }, KeyD: { key: 'd', code: 'KeyD', windowsVirtualKeyCode: 68 },
    Digit2: { key: '2', code: 'Digit2', windowsVirtualKeyCode: 50, text: '2' },
  };
  const keyDown = name => send('Input.dispatchKeyEvent', { type: KEYS[name].text ? 'keyDown' : 'rawKeyDown', ...KEYS[name] });
  const keyUp = name => send('Input.dispatchKeyEvent', { type: 'keyUp', ...KEYS[name] });
  const hold = async (names, ms) => { for (const n of names) await keyDown(n); await sleep(ms); for (const n of names) await keyUp(n); };
  const center = async () => { await sleep(600); await evaluate("document.getElementById('centerView').click()"); await sleep(50); const c = await camera(); assert.equal(c.panX, 0); assert.equal(c.panY, 0); };
  const seed = save => `try{localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(save))});}catch(e){}`;

  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  // Seed on a blank page (same origin, so the game's own unload handler cannot re-save over it), then load the game.
  await send('Page.navigate', { url: new URL('/manifest.webmanifest', gameUrl).href });
  await sleep(300);
  await evaluate(seed({ money: 500, gameSpeed: 1, lastSeen: Date.now() }));
  await send('Page.addScriptToEvaluateOnNewDocument', { source: "Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});" });
  await send('Page.navigate', { url: gameUrl });
  await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool');
  await sleep(600);
  assert.equal(await evaluate("document.querySelector('.start-guide:not([hidden])')"), null, 'the intro is open');
  assert.equal(await evaluate("document.getElementById('gestureHint').textContent"), 'DRAG OR ARROWS / WASD TO PAN · SCROLL TO ZOOM · SPACE PAUSES · 1 2 4 SET SPEED');
  await center();

  // Each direction: the content slides opposite to the way the view travels, and only along that axis.
  const expect = { ArrowRight: [-1, 0], ArrowLeft: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1], KeyD: [-1, 0], KeyA: [1, 0], KeyW: [0, 1], KeyS: [0, -1] };
  const travelled = {};
  for (const [name, [sx, sy]] of Object.entries(expect)) {
    await center();
    await hold([name], 400);
    await sleep(600);
    const c = await camera(); travelled[name] = c;
    if (sx) { assert.ok(Math.sign(c.panX) === sx && Math.abs(c.panX) > 120, `${name}: panX ${c.panX}`); assert.equal(c.panY, 0, `${name}: panY ${c.panY}`); }
    if (sy) { assert.ok(Math.sign(c.panY) === sy && Math.abs(c.panY) > 120, `${name}: panY ${c.panY}`); assert.equal(c.panX, 0, `${name}: panX ${c.panX}`); }
    await sleep(150); const settled = await camera();
    assert.deepEqual([settled.panX, settled.panY], [c.panX, c.panY], `${name}: still drifting after release`);
  }
  // WASD travels the same distance as the arrows.
  assert.ok(Math.abs(Math.abs(travelled.KeyD.panX) - Math.abs(travelled.ArrowRight.panX)) < 60, 'D and right arrow disagree');

  // Two keys pan diagonally at the same overall speed; a held key survives a speed key; panning works while paused.
  await center(); await hold(['ArrowRight', 'ArrowUp'], 400); await sleep(600);
  let c = await camera(); assert.ok(c.panX < -60 && c.panY > 60, `diagonal ${c.panX},${c.panY}`);
  assert.ok(Math.abs(Math.hypot(c.panX, c.panY) - Math.abs(travelled.ArrowRight.panX)) < 80, 'diagonal is not speed-normalised');
  await center(); await keyDown('ArrowLeft'); await sleep(150); await keyDown('Digit2'); await keyUp('Digit2'); await sleep(250); await keyUp('ArrowLeft'); await sleep(600);
  c = await camera(); assert.ok(c.panX > 120, `pan lost across a speed key: ${c.panX}`); assert.equal((await evaluate('window.factoryTool.execute()')).gameSpeed, 2);
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32, text: ' ' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 }); await sleep(100);
  assert.equal((await evaluate('window.factoryTool.execute()')).paused, true, 'Space did not pause');
  await center(); await hold(['KeyS'], 400); await sleep(600);
  c = await camera(); assert.ok(c.panY < -120, `no pan while paused: ${c.panY}`);
  await evaluate("document.querySelector('[data-speed=\"1\"]').click()");
  assert.equal((await evaluate('window.factoryTool.execute()')).paused, false);

  // The clamp holds under a long hold.
  await center(); await hold(['ArrowRight'], 5000); await sleep(600);
  c = await camera(); assert.ok(Math.abs(c.panX + 1440 * 1.6) < 1, `clamp: ${c.panX}`);
  if (process.env.SHOT) {
    const { writeFile } = await import('node:fs/promises');
    await center(); await hold(['ArrowRight', 'ArrowDown'], 700); await sleep(400);
    await evaluate("document.getElementById('gestureHint').classList.remove('is-hidden')");
    await writeFile(process.env.SHOT, Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'));
  }

  // Focus inside the sheet keeps the arrows for scrolling, while WASD pans regardless. A text field takes every key.
  await center();
  await evaluate("document.querySelector('.sheet button').focus()");
  await hold(['ArrowDown'], 300); await sleep(300);
  c = await camera(); assert.equal(c.panY, 0, `arrows panned from a focused sheet control: ${c.panY}`);
  await hold(['KeyS'], 300); await sleep(300);
  c = await camera(); assert.ok(c.panY < -60, `WASD did not pan from a focused sheet control: ${c.panY}`);
  await evaluate("document.activeElement.blur()");
  await center();
  await evaluate("var f=document.createElement('input');f.id='panProbe';document.body.appendChild(f);f.focus()");
  await hold(['KeyD', 'ArrowRight'], 300); await sleep(300);
  c = await camera(); assert.equal(c.panX, 0, `keys panned from a text field: ${c.panX}`);
  await evaluate("document.getElementById('panProbe').remove()");

  // Behind a modal nothing moves, and the map lands where the mouse left it after it closes.
  await evaluate("document.getElementById('settingsButton')?.click()||document.querySelector('[aria-label=\"Settings\"]')?.click()"); await sleep(200);
  const modalOpen = await evaluate("!!document.querySelector('.modal-wrap:not([hidden])')");
  assert.equal(modalOpen, true, 'settings modal did not open');
  await hold(['ArrowRight'], 300); await sleep(300);
  c = await camera(); assert.equal(c.panX, 0, `panned behind a modal: ${c.panX}`);
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
  await sleep(200);
  assert.equal(await evaluate("!!document.querySelector('.modal-wrap:not([hidden])')"), false, 'settings modal did not close');

  assert.deepEqual(errors, [], 'page errors');
  console.log('desktop: arrows, WASD, diagonal, paused, clamp, focused sheet, text field, modal and hint copy passed');
  ws.close();
} finally {
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill(); await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
