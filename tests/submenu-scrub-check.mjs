// Submenu strips share the native tab bar's hold-and-slide selection gesture.
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as sleep} from 'node:timers/promises';

const gameUrl=process.argv[2]||'http://127.0.0.1:4173/';
const chrome=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9342,profile=await mkdtemp(join(tmpdir(),'canopy-submenu-scrub-'));
const proc=spawn(chrome,['--headless=new',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--no-first-run','--no-default-browser-check','--disable-gpu','about:blank'],{stdio:'ignore'});

try{
 let targets;
 for(let i=0;i<50&&!targets?.length;i++){try{targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()}catch{await sleep(200)}}
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise(resolve=>ws.addEventListener('open',resolve));
 let nextId=0;const pending=new Map(),errors=[];
 ws.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id&&pending.has(message.id)){const call=pending.get(message.id);pending.delete(message.id);message.error?call.reject(new Error(message.error.message)):call.resolve(message.result)}else if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text)});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++nextId;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result?.value};
 const waitFor=async(expression,ms=15000)=>{const start=Date.now();while(Date.now()-start<ms){if(await evaluate(expression))return;await sleep(100)}throw new Error(`Timed out waiting for ${expression}`)};
 const centers=selector=>evaluate(`Array.from(document.querySelectorAll(${JSON.stringify(selector)})).map(function(el){var r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})`);
 const scrub=async(from,to)=>{
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:from.x,y:from.y});
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:from.x,y:from.y,button:'left',buttons:1,clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:to.x,y:to.y,button:'left',buttons:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:to.x,y:to.y,button:'left',buttons:0,clickCount:1});
  await sleep(80);
 };
 await send('Page.enable');await send('Runtime.enable');
 await send('Page.navigate',{url:new URL('/manifest.webmanifest',gameUrl).href});await sleep(250);
 await evaluate(`localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-save',JSON.stringify({money:100000,lifetime:100000,doorBuilt:true,shopOpen:true,lines:[5,5,5,5,5,5],staff:[1,1,1,1,1,1],stock:[20,20,20,20,20],strains:[5,5,5,5],menuStrains:[0,1,2,3],gameSpeed:0,lastSeen:Date.now()}))`);

 for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
  await send('Page.navigate',{url:new URL('/manifest.webmanifest',gameUrl).href});await sleep(100);
  await evaluate(`localStorage.setItem('shift-save',JSON.stringify({money:100000,lifetime:100000,doorBuilt:true,shopOpen:true,lines:[5,5,5,5,5,5],staff:[1,1,1,1,1,1],stock:[20,20,20,20,20],strains:[5,5,5,5],menuStrains:[0,1,2,3],gameSpeed:0,lastSeen:Date.now()}))`);
  await send('Page.navigate',{url:gameUrl});await waitFor('window.__shiftReady===true');

  let points=await centers('.machine-nav button');
  await scrub(points[0],points[2]);
  assert.equal(await evaluate(`document.querySelectorAll('.machine-nav button')[2].getAttribute('aria-pressed')`),'true',`${name}: station strip did not scrub-select`);

  await evaluate(`document.querySelector('[data-tray="boosts"]').click()`);await sleep(80);
  points=await centers('.shop-categories button');
  await scrub(points[0],points[3]);
  assert.equal(await evaluate(`document.querySelector('[data-shop-category="3"]').getAttribute('aria-pressed')`),'true',`${name}: shop category strip did not scrub-select`);

  await evaluate(`document.querySelector('[data-tray="flowers"]').click()`);await sleep(80);
  points=await centers('.strain-nav button');
  await scrub(points[0],points[2]);
  assert.equal(await evaluate(`document.querySelectorAll('.strain-nav button')[2].getAttribute('aria-selected')`),'true',`${name}: strain strip did not scrub-select`);
  assert.equal(await evaluate(`document.querySelector('#flowerBuy b').textContent`),'$84.8K',`${name}: level 6 strain milestone price is wrong`);
  await evaluate(`document.getElementById('flowerBuy').click()`);
  assert.deepEqual(await evaluate(`(function(){var s=JSON.parse(localStorage.getItem('shift-save'));return{level:s.strains[2],money:s.money}})()`),{level:6,money:15227},`${name}: strain upgrade did not charge and save correctly`);
  await send('Page.navigate',{url:gameUrl});await waitFor('window.__shiftReady===true');
  assert.equal(await evaluate(`JSON.parse(localStorage.getItem('shift-save')).strains[2]`),6,`${name}: strain upgrade did not survive reload`);
  assert.deepEqual(errors,[],`${name}: page errors`);
  console.log(`${name}: submenu scrubbing and the harder strain upgrade persist correctly`);
 }
 ws.close();
}finally{
 const exited=new Promise(resolve=>proc.once('exit',resolve));proc.kill();await exited;
 await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
