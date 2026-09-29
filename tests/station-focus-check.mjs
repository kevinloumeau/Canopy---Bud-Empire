// A zoomed main-shop map follows station selections from both the station menu and the world marker.
// The fitted overview remains still, and every selection preserves the player's zoom level.
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as sleep} from 'node:timers/promises';

const gameUrl=process.argv[2]||'http://127.0.0.1:4173/';
const chrome=process.env.CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port=9341,profile=await mkdtemp(join(tmpdir(),'canopy-station-focus-'));
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
 await send('Page.enable');await send('Runtime.enable');
 await send('Page.navigate',{url:new URL('/manifest.webmanifest',gameUrl).href});await sleep(250);
 await evaluate(`localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-save',JSON.stringify({money:10000,lifetime:10000,doorBuilt:true,shopOpen:true,lines:[5,5,5,5,5,5],staff:[1,1,1,1,1,1],stock:[20,20,20,20,20],gameSpeed:0,lastSeen:Date.now()}))`);
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true})`});

 for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});
  await send('Page.navigate',{url:gameUrl});await waitFor('window.__shiftReady===true&&!!window.factoryTool');
  const camera=()=>evaluate('window.factoryTool.execute().camera');
  let fitted=await camera();
  await evaluate(`document.querySelector('[data-machine="5"]').click()`);let still=await camera();
  assert.deepEqual([still.panX,still.panY],[fitted.panX,fitted.panY],`${name}: fitted overview moved on selection`);
  await evaluate(`document.getElementById('zoomIn').click()`);let zoomed=await camera();assert.ok(zoomed.zoom>1,`${name}: map did not zoom`);
  await evaluate(`document.querySelector('[data-machine="0"]').click()`);let menuFocus=await camera();
  assert.equal(menuFocus.zoom,zoomed.zoom,`${name}: menu selection changed zoom`);
  assert.notDeepEqual([menuFocus.panX,menuFocus.panY],[zoomed.panX,zoomed.panY],`${name}: menu selection did not move to Seeds`);
  await evaluate(`document.querySelector('[data-marker="5"]').click()`);let mapFocus=await camera();
  assert.equal(mapFocus.zoom,zoomed.zoom,`${name}: map selection changed zoom`);
  assert.notDeepEqual([mapFocus.panX,mapFocus.panY],[menuFocus.panX,menuFocus.panY],`${name}: map selection did not move to Pickup`);
  assert.deepEqual(errors,[],`${name}: page errors`);
  console.log(`${name}: fitted view stayed still; zoomed menu and map selections focused their stations`);
 }
 ws.close();
}finally{
 const exited=new Promise(resolve=>proc.once('exit',resolve));proc.kill();await exited;
 await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200});
}
