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
      source=source.replace('function drawFadedCustomer(c,now){','function drawFadedCustomer(c,now){if(window.exitDraws)window.exitDraws.push({id:c.id,x:c.x,z:c.z});');
      source=source.replace('function renderFrame(wallNow){',`
        window.exitCheck=function(spec){
          state.gameSpeed=1;customers=[Object.assign({id:900,kind:'everyday',phase:'leaving',idChecked:true,ordered:true,bag:true,walking:true,t:0,waypoints:[]},spec)];
          window.exitDraws=[];var raf=window.requestAnimationFrame;window.requestAnimationFrame=function(){};
          try{render.invalidated=true;render.last=performance.now()-50;renderFrame(performance.now());}
          finally{window.requestAnimationFrame=raf;state.gameSpeed=0;}
          return {draws:window.exitDraws,customer:customers[0],behind:customerBehindBuilding(customers[0]),column:leaverBehindColumn(customers[0])};
        };
        function renderFrame(wallNow){`);
      await send('Fetch.fulfillRequest',{requestId:id,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:Buffer.from(source).toString('base64')});
    }catch(e){console.error(e);await send('Fetch.continueRequest',{requestId:id});}
  });
  await send('Fetch.enable',{patterns:[{urlPattern:'*/src/main.js*',requestStage:'Response'}]});
  await mkdir('artifacts/customer-exit',{recursive:true});
  for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
    await boot({money:44000000,lifetime:50000000,sold:1000,strains:[2,2,0,0],lines:[54,54,34,35,53,53],lounge:3,shopOpen:true,doorBuilt:true,gameSpeed:0,lastSeen:Date.now()});
    await waitFor('!!window.exitCheck');
    const fixtures=[
      ['rear-enter',{x:8.8,z:-8.1,renderX:9.1,renderZ:-8.1}],
      ['rear-clear',{x:9.2,z:-8.1,renderX:8.9,renderZ:-8.1}],
      ['column-exit',{x:9.7,z:-4.3,renderX:9.3,renderZ:-4.1,lounge:true,loungeFadeIn:1}],
      ['column-behind',{x:9.55,z:-4.2,renderX:9.2,renderZ:-4.1,lounge:true,loungeFadeIn:1}],
      ['entrance-clear',{x:-12.4,z:7.7,renderX:-12.4,renderZ:7.4,phase:'idCheck',bag:false,ordered:false}]
    ];
    for(const [label,spec] of fixtures){
      const result=await evaluate(`window.exitCheck(${JSON.stringify(spec)})`);
      assert.equal(result.draws.length,1,`${name} ${label}: ${JSON.stringify(result)}`);
      assert.equal(result.draws[0].x,result.customer.renderX);assert.equal(result.draws[0].z,result.customer.renderZ);
      const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/customer-exit/${name}-${label}.png`,Buffer.from(shot.data,'base64'));
    }
    assert.deepEqual(errors,[]);console.log(name+': every boundary crossing painted exactly once at its current visual position');
  }
  ws.close();
} finally {
  const exited=new Promise(resolve=>proc.once('exit',resolve));proc.kill();await exited;
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
