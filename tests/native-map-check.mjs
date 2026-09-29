// Native bridge contract tests in an isolated browser, not a substitute for iOS device testing.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const gameUrl = process.argv[2] || process.env.GAME_URL || 'http://127.0.0.1:5174/';
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9349;
const profile = await mkdtemp(join(tmpdir(), 'canopy-metal-'));
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

  await send('Page.enable');await send('Runtime.enable');
  await mkdir('artifacts/native-map',{recursive:true});
  const bridge=`window.canopyNativeMapAvailable=true;window.canopyNativeCharacterAvailable=true;window.canopyNativeCaramelAvailable=true;window.nativePacket=null;
    window.webkit={messageHandlers:{canopyMap:{postMessage:p=>{window.nativePacket=p;setTimeout(()=>window.canopyNativeMapAck(p.id),5)}}}};`;
  for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
    await send('Emulation.setTouchEmulationEnabled',{enabled:false});
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
    await boot({money:5000000,lines:[15,15,15,15,15,15],staff:[2,2,2,2,2,2],stock:[40,40,40,40,40],gameSpeed:0,lounge:2,doorBuilt:true,shopOpen:true,lastSeen:Date.now()},bridge);
    await waitFor('nativePacket&&document.documentElement.classList.contains("native-map-ready")');
    await waitFor("Math.abs(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hud-height'))-document.querySelector('.hud').getBoundingClientRect().height)<1");
    let packet=await evaluate('nativePacket');assert.ok(Buffer.from(packet.data,'base64').length>10000);
    await writeFile(`artifacts/native-map/${name}-packet.json`,JSON.stringify(packet));
    const frame=await evaluate('nativePacket');
    await evaluate('document.getElementById("zoomIn").click()');await waitFor('nativePacket.unit>'+frame.unit);
    let camera=(await status()).camera;assert.ok(camera.zoom>1);
    await evaluate("document.querySelector('[data-marker=\"5\"]').click()");
    const focused=(await status()).camera;assert.equal(focused.zoom,camera.zoom);
    await evaluate('document.getElementById("centerView").click()');
    const panBefore=(await status()).camera;
    const dragPoint=await evaluate(`(()=>{for(let y=150;y<300;y+=30)for(let x=30;x<innerWidth/2;x+=40)if(document.elementFromPoint(x,y)?.tagName==='CANVAS'&&document.elementFromPoint(x+40,y+40)?.tagName==='CANVAS')return {x,y};throw new Error('No unobstructed map target')})()`);
    await send('Input.dispatchMouseEvent',{type:'mousePressed',x:dragPoint.x,y:dragPoint.y,button:'left',clickCount:1});
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:dragPoint.x+40,y:dragPoint.y+40,button:'left',buttons:1});
    await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:dragPoint.x+40,y:dragPoint.y+40,button:'left',clickCount:1});
    const panAfter=(await status()).camera;assert.notEqual(panAfter.panX,panBefore.panX);assert.equal(panAfter.angle,panBefore.angle);
    await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
    const touch=(type,points)=>send('Input.dispatchTouchEvent',{type,touchPoints:points.map(([x,y,id])=>({x,y,id,radiusX:2,radiusY:2}))});
    await touch('touchStart',[[120,190,1],[240,190,2]]);
    await touch('touchMove',[[95,185,1],[265,195,2]]);
    await touch('touchEnd',[]);
    assert.ok((await status()).camera.zoom>panAfter.zoom,'pinch must zoom native geometry');
    await send('Emulation.setTouchEmulationEnabled',{enabled:false});
    await evaluate(`if(!document.getElementById('sheet').classList.contains('collapsed'))document.getElementById('panelToggle').click()`);
    await sleep(600);
    await evaluate(`for(let i=0;i<16;i++)document.getElementById('zoomIn').click()`);
    for(const [axis,sign] of [['X',-1],['X',1],['Y',-1],['Y',1]]){
      await evaluate(`document.getElementById('zoomIn').click()`);
      const start=(await status()).camera;
      const dx=axis==='X'?sign*width*.2:0,dy=axis==='Y'?sign*height*.15:0;
      const point=await evaluate(`(()=>{for(let y=150;y<innerHeight*.65;y+=30)for(let x=30;x<innerWidth*.75;x+=40)if(x+${dx}>5&&x+${dx}<innerWidth-5&&y+${dy}>100&&y+${dy}<innerHeight-20&&document.elementFromPoint(x,y)?.tagName==='CANVAS')return {x,y};throw new Error('No maximum-zoom drag target')})()`);
      for(let i=0;i<80;i++){
        await send('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
        await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x+dx,y:point.y+dy,button:'left',buttons:1});
        await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x+dx,y:point.y+dy,button:'left',clickCount:1});
      }
      const end=(await status()).camera;
      assert.equal(end.zoom,8);assert.equal(end.angle,start.angle);
      assert.ok(sign*(end['pan'+axis]-start['pan'+axis])>(axis==='X'?width:height)*1.6,`${name}: ${axis} ${sign} must reach beyond the old pan limit`);
    }
    await evaluate('document.getElementById("centerView").click()');
    const before=await status();await evaluate('document.querySelector("#buyMachine").click()');const after=await status();assert.ok(after.lineLevels.some((n,i)=>n>before.lineLevels[i]));
    await evaluate('document.querySelector("[data-tray=employees]").click()');await evaluate('document.querySelector("[data-tray=factory]").click()');
    const saved=await save();await send('Page.reload');await sleep(500);await waitFor('window.__shiftReady&&window.nativePacket');assert.deepEqual((await save()).lines,saved.lines);assert.equal((await save()).money,saved.money);
    const labelsBeforeFallback=await evaluate(`Array.from(document.querySelectorAll('.world .marker')).map(el=>el.style.transform)`);
    await evaluate('window.canopyNativeMapFailed()');await sleep(400);assert.equal(await evaluate('document.documentElement.classList.contains("native-map-ready")'),false);
    assert.deepEqual(await evaluate(`Array.from(document.querySelectorAll('.world .marker')).map(el=>el.style.transform)`),labelsBeforeFallback,'renderer fallback must not move station labels away from the shop');
    assert.deepEqual(errors,[]);console.log(name+': native geometry packets, maximum zoom panning in all four directions, upgrades, panel interactions, reload and renderer fallback passed');
  }
  ws.close();
} finally {
  const exited=new Promise(resolve=>proc.once('exit',resolve));proc.kill();await exited;
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
