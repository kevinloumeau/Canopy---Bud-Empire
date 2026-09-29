// Test-only accelerated simulation is injected into the dev response, never the shipped game.
import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import {mkdtemp,rm,mkdir,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as sleep} from 'node:timers/promises';
const url=process.argv[2]||'http://127.0.0.1:4173/',port=9353,profile=await mkdtemp(join(tmpdir(),'canopy-shop-play-'));
const proc=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new',`--remote-debugging-port=${port}`,`--user-data-dir=${profile}`,'--no-first-run','--no-default-browser-check','--disable-gpu','about:blank'],{stdio:'ignore'});
try{
 let targets;for(let i=0;i<50&&!targets?.length;i++){try{targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json()}catch{await sleep(200)}}
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));let id=0;const pending=new Map(),errors=[];
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result)}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);else if(m.method==='Fetch.requestPaused')void intercept(m.params);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}))});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
 async function intercept(p){if(!p.responseStatusCode)return send('Fetch.continueRequest',{requestId:p.requestId});const r=await send('Fetch.getResponseBody',{requestId:p.requestId});let source=r.base64Encoded?Buffer.from(r.body,'base64').toString():r.body;
 source=source.replace('var firstRun=false;',`window.shopPlayTest=function(spec={}){if(spec.cooldown!==undefined)state.shopPlay.cooldown=spec.cooldown;if(spec.shift!==undefined)state.shopPlay.shift.seconds=spec.shift;state.gameSpeed=1;var violations=0;for(var i=0;i<(spec.steps||0);i++){simulate(.05);if(customers.some(c=>c.bag&&!c.ordered&&!c.lounge))violations++;}state.gameSpeed=0;renderUI();save();return violations;};var firstRun=false;`);
 await send('Fetch.fulfillRequest',{requestId:p.requestId,responseCode:200,responseHeaders:(p.responseHeaders||[]).filter(h=>!['content-length','content-encoding'].includes(h.name.toLowerCase())),body:Buffer.from(source).toString('base64')});}
 const wait=async e=>{for(let i=0;i<150;i++){if(await evaluate(e))return;await sleep(100)}throw new Error('Timed out: '+e);};
 const status=()=>evaluate('factoryTool.execute()');
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Network.setCacheDisabled',{cacheDisabled:true});await send('Network.setBypassServiceWorker',{bypass:true});await send('Fetch.enable',{patterns:[{urlPattern:'*/src/main.js*',requestStage:'Response'}]});
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t},configurable:true});`});
 await mkdir('artifacts/shop-play',{recursive:true});await mkdir('.impeccable/review',{recursive:true});
 for(const [name,width,height] of [['phone',390,844],['desktop',1440,900]]){
  await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<780});await send('Page.navigate',{url:new URL('/manifest.webmanifest',url).href});await sleep(250);
  const fixture={money:2000000,lifetime:2000000,lines:[5,5,5,5,5,5],staff:[1,1,1,1,1,1],stock:[80,80,80,80,80],strains:[1,1,1,1],doorBuilt:true,shopOpen:true,gameSpeed:0,lastSeen:Date.now(),empire:{stores:[{level:2},{level:1}],network:{stores:[{raw:60,stock:[12,0,0],shelves:[20,0,0]},{raw:0,stock:[0,0,0]}]}}};
  await evaluate(`localStorage.clear();localStorage.setItem('canopy-age-ok','1');localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-save',${JSON.stringify(JSON.stringify(fixture))})`);
  await send('Page.navigate',{url});await wait('window.__shiftReady&&window.shopPlayTest&&window.factoryTool');await sleep(400);
  assert.equal(await evaluate('shopPlayTest({cooldown:0,steps:100})'),0);let s=await status();for(let n=0;n<50&&!s.budtenderMoment;n++){assert.equal(await evaluate('shopPlayTest({steps:20})'),0);s=await status();}assert.ok(s.budtenderMoment);
  const m=s.budtenderMoment,correct=m.choices.findIndex(o=>m.formatRequest?o.format===m.target:o.type===m.target);
  await evaluate('document.getElementById("shopActivity").click()');assert.equal(await evaluate('document.getElementById("shopActivityPanel").hidden'),false);
  await sleep(650);const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/shop-play/${name}-moment.png`,Buffer.from(shot.data,'base64'));await writeFile(`.impeccable/review/${name==='phone'?'mobile':'desktop'}.png`,Buffer.from(shot.data,'base64'));
  await evaluate(`document.querySelector('[data-choice="${correct}"]').click()`);assert.equal((await status()).budtenderMoment,null);
  assert.equal(await evaluate('shopPlayTest({steps:2500})'),0);s=await status();assert.ok(s.shopPlay.matches>=1);assert.ok(s.shopPlay.tips>0);assert.ok(s.shopPlay.shift.served>0);
  await evaluate('shopPlayTest({shift:299.95,steps:2})');s=await status();assert.ok(s.shopPlay.recap);assert.equal(s.shopPlay.recap.seconds,300);
  await evaluate('document.getElementById("shopActivityClose").click();document.getElementById("shopActivity").click()');assert.ok(await evaluate('document.getElementById("shiftRecap").textContent.includes("served")'));
  const recapShot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`artifacts/shop-play/${name}-recap.png`,Buffer.from(recapShot.data,'base64'));
  const alert=(await status()).operationsAlerts.find(a=>a.store===0&&a.tab===2)||((await status()).operationsAlerts[0]);assert.ok(alert);
  await evaluate(`document.querySelector('[data-alert="${alert.id}"]').focus();shopPlayTest({steps:220})`);assert.equal(await evaluate('document.activeElement.dataset.alert'),alert.id);
  await evaluate(`document.querySelector('[data-alert="${alert.id}"]').click()`);await sleep(150);assert.equal(await evaluate(`document.getElementById('opPane${alert.store}${alert.tab}').hidden`),false);assert.equal(await evaluate(`document.getElementById('${alert.control}').closest('.empire-screen').hidden`),false);
  const stockAlert=(await status()).operationsAlerts.find(a=>a.details);if(stockAlert){await evaluate('document.getElementById("shopActivity").click()');await evaluate(`document.querySelector('[data-alert="${stockAlert.id}"]').click()`);assert.equal(await evaluate(`document.getElementById('${stockAlert.control}').closest('details').open`),true);}
  await evaluate('document.querySelector("[data-tray=factory]").click()');const before=(await status()).lineLevels[0];await evaluate(`document.querySelector('[data-machine="0"]').click();document.getElementById('buyMachine').click()`);assert.ok((await status()).lineLevels[0]>before);
  const saved=await evaluate('JSON.parse(localStorage.getItem("shift-save"))');await send('Page.reload');await sleep(300);await wait('window.__shiftReady&&window.factoryTool');const reloaded=await status();assert.deepEqual(reloaded.shopPlay,saved.shopPlay);assert.equal(reloaded.cash,Math.floor(saved.money));assert.equal(reloaded.budtenderMoment,null);
  const paused=reloaded.shopPlay.shift.seconds;await sleep(300);assert.equal((await status()).shopPlay.shift.seconds,paused);
  console.log(name+': match/tip, FIFO pickup, recap, alert links, upgrades, paused save/reload passed');
 }
 assert.deepEqual(errors,[]);ws.close();
}finally{proc.kill();await sleep(200);await rm(profile,{recursive:true,force:true});}
