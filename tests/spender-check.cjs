const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({headless:true,channel:'chrome'});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const ctx=await browser.newContext({viewport}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('shift-save',JSON.stringify({money:100,lifetime:500000,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],empire:{reputation:20},spenderClock:0,gameSpeed:1,lastSeen:Date.now()}))}});
 await p.goto((process.env.GAME_URL||'http://127.0.0.1:4176'));await p.waitForFunction(()=>window.__shiftReady);
 const tag=p.locator('#spenderTag');await tag.waitFor({state:'visible',timeout:20000});await p.waitForTimeout(2500);
 await p.screenshot({path:'artifacts/retention/'+name+'-spender.png'});
 const before=await p.evaluate(()=>window.factoryTool.execute());await tag.click({force:true});const after=await p.evaluate(()=>window.factoryTool.execute());
 assert.ok(after.rushTime>50||after.cash>before.cash+40,'tap pays: '+JSON.stringify([before.cash,after.cash,after.rushTime]));assert.ok(after.spenderClock>=110,'next spender scheduled');
 await p.waitForTimeout(400);assert.equal(await tag.isVisible(),false);
 if(after.rushTime>0){assert.ok(await p.locator('#rushPill').isVisible());await p.screenshot({path:'artifacts/retention/'+name+'-rush.png'})}
 assert.deepEqual(errors,[]);console.log(name,'spender ok',after.rushTime>0?'rush':'tip');await ctx.close()}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
