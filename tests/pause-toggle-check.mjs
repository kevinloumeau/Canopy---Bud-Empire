// Pause toggle: the 1× speed button doubles as pause. Drives the installed Google Chrome headlessly over the DevTools
// protocol (no npm dependency) against a running dev or preview server, with a throwaway profile.
//
//   npm run dev -- --host 127.0.0.1 --port 5174
//   node tests/pause-toggle-check.mjs http://127.0.0.1:5174/
//
// Checks: a second press at normal speed pauses, keeps the button pressed and swaps its glyph to a pause bar with the
// pill marked paused; a press while paused resumes at 1×; from 2× or 4× the first press only sets normal speed; a pause
// from Space shows on the button too and 2× from paused runs at 2×; and idle UI ticks leave the glyph node alone.
// Set SHOT_DIR to save close-ups of the running and paused pill.
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
const gameUrl=process.argv[2]||process.env.GAME_URL||'http://127.0.0.1:5174/', port=9340, out=process.env.SHOT_DIR, profile=await mkdtemp(join(tmpdir(),'canopy-pause-'));
const proc=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--no-first-run','--hide-scrollbars','--disable-gpu','about:blank'],{stdio:'ignore'});
try{
  let targets;for(let i=0;i<50&&!targets?.length;i++){try{targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()}catch{await sleep(200)}}
  const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));
  let id=0;const pending=new Map(),errors=[];ws.addEventListener('message',ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m.result);pending.delete(m.id)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text)});
  const send=(method,params={})=>new Promise((r,j)=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));setTimeout(()=>{if(pending.delete(i))j(new Error(method+' stalled'))},20000)});
  const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value};
  await send('Page.enable');await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:gameUrl+'manifest.webmanifest'});await sleep(300);
  await ev("localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('shift-save',JSON.stringify({money:500,gameSpeed:1,lastSeen:Date.now()}))");
  await send('Page.addScriptToEvaluateOnNewDocument',{source:"Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});"});
  await send('Page.navigate',{url:gameUrl});let ready=false;for(let i=0;i<300&&!ready;i++){ready=await ev('window.__shiftReady===true&&!!window.factoryTool');if(!ready)await sleep(100)}assert.equal(ready,true,'game did not load: '+await ev('document.readyState+" "+location.href+" "+document.title'));await sleep(500);
  const read=()=>ev("(()=>{const b=document.querySelector('[data-speed=\"1\"]'),g=b.parentElement;return {speed:window.factoryTool.execute().gameSpeed,pressed:[...g.querySelectorAll('[data-speed]')].map(x=>x.getAttribute('aria-pressed')),glyph:b.querySelector('path').getAttribute('d').startsWith('M5 3.5h3')?'pause':'play',label:b.getAttribute('aria-label'),title:b.title,paused:g.getAttribute('data-paused'),bg:getComputedStyle(b).backgroundImage.slice(0,40)}})()");
  const click=sel=>ev(`document.querySelector('${sel}').click()`).then(()=>sleep(120));
  const shot=async name=>{if(!out)return;const r=await ev("(()=>{const b=document.querySelector('.speed-controls').getBoundingClientRect();return {x:b.left-8,y:b.top-8,width:b.width+16,height:b.height+16}})()");const s=await send('Page.captureScreenshot',{format:'png',clip:{...r,scale:3}});await writeFile(join(out,name),Buffer.from(s.data,'base64'))};
  let s=await read();assert.equal(s.speed,1);assert.deepEqual(s.pressed,['true','false','false']);assert.equal(s.glyph,'play');assert.equal(s.paused,'false');assert.equal(s.title,'Normal speed · press again to pause');
  await shot('speed-running.png');
  // Second press at 1× pauses: the same button stays pressed and turns into a pause bar.
  await click('[data-speed="1"]');s=await read();assert.equal(s.speed,0);assert.deepEqual(s.pressed,['true','false','false']);assert.equal(s.glyph,'pause');assert.equal(s.paused,'true');assert.equal(s.label,'Paused. Resume normal speed');
  const pausedBg=s.bg;await shot('speed-paused.png');
  // Pressing it while paused resumes at 1×.
  await click('[data-speed="1"]');s=await read();assert.equal(s.speed,1);assert.equal(s.glyph,'play');assert.equal(s.paused,'false');assert.notEqual(s.bg,pausedBg,'paused tint did not clear');
  // From 2× or 4×, the 1× button just sets normal speed; it does not pause.
  await click('[data-speed="2"]');assert.equal((await read()).speed,2);await click('[data-speed="1"]');s=await read();assert.equal(s.speed,1);assert.equal(s.glyph,'play');
  await click('[data-speed="4"]');s=await read();assert.deepEqual(s.pressed,['false','false','true']);await click('[data-speed="1"]');assert.equal((await read()).speed,1);
  // Pausing another way (Space) is reflected on the button too, and 2× from paused runs at 2× with the pause tint gone.
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32,text:' '});await send('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});await sleep(120);
  s=await read();assert.equal(s.speed,0);assert.equal(s.glyph,'pause');assert.deepEqual(s.pressed,['true','false','false']);
  await click('[data-speed="2"]');s=await read();assert.equal(s.speed,2);assert.equal(s.glyph,'play');assert.deepEqual(s.pressed,['false','true','false']);assert.equal(s.paused,'false');
  // Idle repaints do not rewrite the glyph: the SVG node identity survives a UI tick.
  for(const expectGlyph of ['play','pause']){await click('[data-speed="1"]');assert.equal((await read()).glyph,expectGlyph);await ev("window.__svg=document.querySelector('[data-speed=\"1\"] svg')");await sleep(700);assert.equal(await ev("window.__svg===document.querySelector('[data-speed=\"1\"] svg')"),true,expectGlyph+' glyph re-created on an idle tick')}
  assert.deepEqual(errors,[]);console.log('pause toggle: second press pauses, press resumes, 2×/4× → 1× does not pause, Space reflected, quiet repaint — passed');
  ws.close();
}finally{const exited=new Promise(r=>proc.once('exit',r));proc.kill();await exited;await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200})}
