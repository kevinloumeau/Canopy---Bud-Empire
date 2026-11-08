// Speed controls: three plain buttons, pause · 1× · 2×. Drives Chrome headlessly over the DevTools protocol (no npm
// dependency) against a running dev or preview server, with a throwaway profile.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/pause-toggle-check.mjs http://127.0.0.1:5174/
//
// Checks: exactly three speed buttons; each press sets its own speed and only that button reads pressed; the pill is
// marked paused only at 0; Space toggles pause and resumes at 1×; a save from the old 4× tier loads at 2×.
// Set CHROME to the browser binary (defaults to macOS Chrome) and SHOT_DIR to save close-ups of the pill.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
const gameUrl=process.argv[2]||process.env.GAME_URL||'http://127.0.0.1:5174/', port=9340, out=process.env.SHOT_DIR, profile=await mkdtemp(join(tmpdir(),'canopy-pause-'));
const proc=spawn(process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--no-sandbox',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--no-first-run','--hide-scrollbars','--disable-gpu','about:blank'],{stdio:'ignore'});
try{
  let targets;for(let i=0;i<50&&!targets?.length;i++){try{targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()}catch{await sleep(200)}}
  const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));
  let id=0;const pending=new Map(),errors=[];ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m.result);pending.delete(m.id)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)});
  const send=(method,params={})=>new Promise((r,j)=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(pending.delete(i))j(new Error(method+' stalled'))},20000)});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});"});
  const load=async speed=>{await send('Page.navigate',{url:gameUrl+'manifest.webmanifest'});await sleep(300);
    await ev(`localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('shift-save',JSON.stringify({money:500,gameSpeed:${speed},lastSeen:Date.now()}))`);
    await send('Page.navigate',{url:gameUrl});let ready=false;for(let i=0;i<300&&!ready;i++){ready=await ev('window.__shiftReady===true&&!!window.factoryTool');if(!ready)await sleep(100)}assert.equal(ready,true,'game did not load');await sleep(500)};
  const read=()=>ev("(()=>{const g=document.querySelector('.speed-controls');return {speed:window.factoryTool.execute().gameSpeed,values:[...g.querySelectorAll('[data-speed]')].map(x=>x.dataset.speed),pressed:[...g.querySelectorAll('[data-speed]')].map(x=>x.getAttribute('aria-pressed')),paused:g.getAttribute('data-paused')}})()");
  const click=sel=>ev(`document.querySelector('${sel}').click()`).then(()=>sleep(120));
  const shot=async name=>{if(!out)return;const r=await ev("(()=>{const b=document.querySelector('.speed-controls').getBoundingClientRect();return {x:b.left-8,y:b.top-8,width:b.width+16,height:b.height+16}})()");const s=await send('Page.captureScreenshot',{format:'png',clip:{...r,scale:3}});await writeFile(join(out,name),Buffer.from(s.data,'base64'))};
  await load(1);let s=await read();assert.deepEqual(s.values,['0','1','2']);assert.equal(s.speed,1);assert.deepEqual(s.pressed,['false','true','false']);assert.equal(s.paused,'false');await shot('speed-1x.png');
  await click('[data-speed="0"]');s=await read();assert.equal(s.speed,0);assert.deepEqual(s.pressed,['true','false','false']);assert.equal(s.paused,'true');await shot('speed-paused.png');
  await click('[data-speed="2"]');s=await read();assert.equal(s.speed,2);assert.deepEqual(s.pressed,['false','false','true']);assert.equal(s.paused,'false');await shot('speed-2x.png');
  await click('[data-speed="1"]');s=await read();assert.equal(s.speed,1);await click('[data-speed="1"]');assert.equal((await read()).speed,1,'1× pressed twice must stay at 1×');
  const space=async()=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32,text:' '});await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});await sleep(120)};
  await space();s=await read();assert.equal(s.speed,0);assert.deepEqual(s.pressed,['true','false','false']);await space();assert.equal((await read()).speed,1);
  await load(4);s=await read();assert.equal(s.speed,2,'old 4× save loads at 2×');assert.deepEqual(s.pressed,['false','false','true']);
  assert.deepEqual(errors,[]);console.log('speed controls: pause · 1× · 2×, one pressed at a time, Space toggles, 4× saves load at 2× — passed');
  ws.close();
}finally{const exited=new Promise(r=>proc.once('exit',r));proc.kill();await exited;await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200})}
