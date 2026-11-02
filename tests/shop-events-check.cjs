// Shop events: each of the four kinds walks in with its tag, and a tap pays what its toast says.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
(async()=>{require('node:fs').mkdirSync('artifacts/shop-events',{recursive:true});const browser=await chromium.launch({headless:true});
for(const [kind,index] of [['spender',0],['rush',1],['inspection',2],['vip',4]]){
 const ctx=await browser.newContext({viewport:{width:390,height:844}}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(i=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('shift-save',JSON.stringify({money:100,lifetime:500000,doorBuilt:true,shopOpen:true,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],empire:{reputation:20},spenderClock:0,shopEvents:i,gameSpeed:1,lastSeen:Date.now()}))}},index);
 await p.goto((process.env.GAME_URL||'http://127.0.0.1:4176'));await p.waitForFunction(()=>window.__shiftReady);
 // Headless frames are slow, so the walking tag jumps between frames; a dispatched click tests the tap itself.
 const tag=p.locator('#spenderTag');await tag.waitFor({state:'visible',timeout:30000});await p.waitForTimeout(2500);
 assert.equal(await tag.getAttribute('data-event'),kind);await p.screenshot({path:'artifacts/shop-events/'+kind+'.png'});
 const before=await p.evaluate(()=>window.factoryTool.execute());assert.equal(before.shopEvent,kind);
 await tag.dispatchEvent('click');const after=await p.evaluate(()=>window.factoryTool.execute());
 assert.ok(kind==='rush'?after.rushTime>50:after.cash>before.cash+40,'tap pays: '+JSON.stringify([before.cash,after.cash,after.rushTime]));
 assert.ok(after.spenderClock>=60,'next event scheduled');assert.equal(after.shopEvents,index+1);
 await p.waitForTimeout(400);assert.equal(await tag.isVisible(),false);
 if(kind==='rush')assert.ok(await p.locator('#rushPill').isVisible());
 assert.deepEqual(errors,[]);console.log(kind,'ok');await ctx.close()}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
