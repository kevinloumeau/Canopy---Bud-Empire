// Native bridge contract tests in an isolated browser, not a substitute for iOS device testing.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9347;
const profile = await mkdtemp(join(tmpdir(), 'canopy-native-'));
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
  let startupScript;
  const boot = async (saveData, extra = '') => {
    // Seed on a blank page (same origin, so the game's own unload handler cannot re-save over it), then load the game.
    await send('Page.navigate', { url: new URL('/manifest.webmanifest', gameUrl).href });
    await sleep(300);
    await evaluate(seed(saveData));
    if(startupScript)await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:startupScript});
    startupScript=(await send('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});${extra}` })).identifier;
    await send('Page.navigate', { url: gameUrl });
    await waitFor('window.__shiftReady===true'); await waitFor('!!window.factoryTool');
  };

  await send('Page.enable'); await send('Runtime.enable');
  await mkdir('artifacts/ios-review',{recursive:true});
  const bridge=`window.nativeReports=[];window.nativeWrites=[];
    window.Capacitor={isNativePlatform:()=>true,Plugins:{Preferences:{set:args=>{nativeWrites.push(args);return Promise.resolve()},get:()=>Promise.resolve({value:null})}}};
    window.webkit={messageHandlers:{canopyTray:{postMessage:p=>nativeReports.push(p)},canopyHaptic:{postMessage:()=>{}}}};
    window.testHidden=false;Object.defineProperty(document,'hidden',{get:()=>testHidden,configurable:true});
    window.testNow=Date.now();Date.now=()=>testNow;`;
  for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await boot({money:50000,lines:[5,5,5,5,5,5],staff:[1,1,1,1,1,1],gameSpeed:0,lastSeen:Date.now()},bridge);
    await waitFor('!!window.canopyNativeTray');
    await evaluate("window.canopyNativeTray.select('factory')");
    await waitFor("document.querySelector('#sheet').classList.contains('collapsed')");
    await evaluate("window.canopyNativeTray.select('factory')");
    await waitFor("!document.querySelector('#sheet').classList.contains('collapsed')");
    await evaluate("document.querySelector('#settingsOpen').click()");
    await waitFor('nativeReports.at(-1).hidden');
    await evaluate("window.canopyNativeTray.select('flowers')");
    assert.equal(await evaluate('nativeReports.at(-1).active'),'factory','modal must block native navigation');
    await evaluate("document.querySelector('.settings-close').click()");
    await waitFor('!nativeReports.at(-1).hidden');
    for(const tab of ['employees','flowers','orders','boosts','empire','factory']){
      await evaluate(`window.canopyNativeTray.select('${tab}')`);
      await waitFor(`nativeReports.at(-1).active==='${tab}'`);
    }
    const before=await status();
    await evaluate("document.querySelector('#buyMachine').click()");
    const purchased=await status();
    assert.ok(purchased.lineLevels.some((n,i)=>n===before.lineLevels[i]+1));
    await waitFor('JSON.parse(nativeWrites.at(-1).value).money===JSON.parse(localStorage.getItem("shift-save")).money');
    await evaluate("document.querySelector('[data-speed=\"1\"]').click()");
    const result=await evaluate(`(()=>{
      const signal=active=>window.dispatchEvent(new CustomEvent('canopyAppState',{detail:active}));
      signal(false);const departure=JSON.parse(localStorage.getItem('shift-save')).lastSeen;
      testNow+=1200000;testHidden=true;document.dispatchEvent(new Event('visibilitychange'));
      const unchanged=JSON.parse(localStorage.getItem('shift-save')).lastSeen;
      signal(true);testHidden=false;document.dispatchEvent(new Event('visibilitychange'));
      const once=window.factoryTool.execute().cash;
      signal(true);document.dispatchEvent(new Event('visibilitychange'));
      return {departure,unchanged,once,twice:window.factoryTool.execute().cash,report:JSON.parse(localStorage.getItem('shift-save')).empire.returnReport};
    })()`);
    assert.equal(result.departure,result.unchanged,'second suspension signal must not reset away timestamp');
    assert.equal(result.once,result.twice,'duplicate resume cannot pay twice');assert.equal(result.report.seconds,1200);
    await evaluate("document.querySelector('[data-speed=\"1\"]').click()");
    const saved=await save();await send('Page.reload');await waitFor('window.__shiftReady===true');
    assert.equal((await save()).money,saved.money);assert.deepEqual((await save()).lines,saved.lines);
    assert.equal(await evaluate('document.documentElement.scrollWidth>innerWidth'),false);
    const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/ios-review/${name}.png`,Buffer.from(shot.data,'base64'));
    assert.deepEqual(errors,[]);console.log(name+': native tabs, modal exclusion, immediate backup, upgrades, suspension deduplication and reload passed');
  }
  // Recovery must not race boot's fresh save, including when both local copies contain corrupt JSON.
  const recovered={money:777,lines:[3,4,5,6,7,8],gameSpeed:0,lastSeen:Date.now()};
  const recoverBridge=bridge.replace('get:()=>Promise.resolve({value:null})',
    `get:()=>new Promise(resolve=>setTimeout(()=>resolve({value:${JSON.stringify(JSON.stringify(recovered))}}),150))`);
  await boot(null,recoverBridge+`if(!sessionStorage.getItem('recovery-seeded')){
    sessionStorage.setItem('recovery-seeded','1');localStorage.setItem('shift-save','broken');localStorage.setItem('shift-save-backup','broken');}`);
  await waitFor('window.factoryTool&&window.factoryTool.execute().cash===777');
  assert.deepEqual((await status()).lineLevels,recovered.lines);
  await waitFor('nativeWrites.length>0');assert.equal(await evaluate('JSON.parse(nativeWrites.at(-1).value).money'),777);
  await boot(null,bridge.replace('get:()=>Promise.resolve({value:null})','get:()=>Promise.reject(new Error("unavailable"))'));
  await sleep(300);
  assert.equal(await evaluate("localStorage.getItem('shift-save')"),null,'failed recovery must leave local storage empty for retry');
  assert.equal(await evaluate('nativeWrites.length'),0,'failed recovery must protect native backup');
  assert.deepEqual(errors,[]);console.log('Recovery: delayed native restore, corrupt local copies and failed reads passed');
  ws.close();
} finally {
  const exited = new Promise(resolve => proc.once('exit', resolve));
  proc.kill(); await exited;
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
