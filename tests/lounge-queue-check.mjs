import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9361;
const profile = await mkdtemp(join(tmpdir(), 'canopy-upgrade-feedback-'));
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



  // Only the browser response is instrumented; no fixture hooks enter the build.
  ws.addEventListener('message',async ev=>{
    const m=JSON.parse(ev.data);if(m.method!=='Fetch.requestPaused')return;
    const id=m.params.requestId;
    try{
      const r=await send('Fetch.getResponseBody',{requestId:id});let source=r.base64Encoded?Buffer.from(r.body,'base64').toString():r.body;
      source=source.replace('function renderFrame(wallNow){',`
        window.loungeCheck=function(){
          state.gameSpeed=0;state.stock[3]=0;state.lounge=3;
          customers=Array.from({length:7},function(_,i){var p=loungeWaitSpot(i);return {id:900+i,kind:'everyday',phase:'toLounge',idChecked:true,lounge:true,ordered:false,bag:false,walking:false,t:0,waypoints:[],loungeDistance:i*1.7,x:p.x,z:p.z};});
          render.invalidated=true;return customers.map(c=>({x:c.x,z:c.z,d:c.loungeDistance}));
        };
        window.loungeAdvance=function(){
          var first=customers[0],old=state.loungeSessions;
          state.stock[3]=1;tickLounge(.05);
          for(var i=0;i<300;i++)customers.forEach(c=>moveQueuedCustomer(c,.05));
          render.invalidated=true;
          return {sessions:state.loungeSessions-old,head:customers[1],first:first.phase};
        };
        function renderFrame(wallNow){`);
      await send('Fetch.fulfillRequest',{requestId:id,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(source).toString('base64')});
    }catch(e){console.error(e);await send('Fetch.continueRequest',{requestId:id});}
  });
  await send('Fetch.enable',{patterns:[{urlPattern:'*/src/main.js*',requestStage:'Response'}]});
  await mkdir('artifacts/lounge-queue',{recursive:true});
  for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
    await boot({money:44000000,lifetime:50000000,sold:1000,strains:[2,2,0,0],lines:[54,54,34,35,53,53],lounge:3,kiosk:true,secondKiosk:true,thirdKiosk:true,shopOpen:true,doorBuilt:true,gameSpeed:0,lastSeen:Date.now()});
    await waitFor('!!window.loungeCheck');
    const queue=await evaluate('window.loungeCheck()');
    assert.equal(queue.length,7);assert.ok(queue.every(p=>p.x<=-7.65));assert.ok(queue[6].z>7);
    assert.ok(queue.slice(4).every(p=>p.x===-7.65));
    await evaluate("document.querySelector('#panelToggle').click()");await sleep(600);
    const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/lounge-queue/${name}.png`,Buffer.from(shot.data,'base64'));
    const moved=await evaluate('window.loungeAdvance()');assert.equal(moved.sessions,1);assert.equal(moved.first,'lounge');
    assert.ok(Math.hypot(moved.head.x+9.85,moved.head.z+.45)<.01);
    assert.deepEqual(errors,[]);console.log(name+': seven guests along side aisle; head admitted and next guest follows the bend to the door');
  }
  ws.close();
} finally {
  const exited=new Promise(resolve=>proc.once('exit',resolve));proc.kill();await exited;
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
