const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({headless:true,channel:'chrome'});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(()=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('shift-save',JSON.stringify({money:100,lifetime:500000,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],gameSpeed:0,lastSeen:Date.now(),empire:{reputation:20,counters:{revenue:250000},season:{id:'harvest-2026',kind:'revenue',start:0,targets:[100000,200000,300000],claimed:0},badges:['neighbors']}}))}});
 await p.goto((process.env.GAME_URL||'http://127.0.0.1:4176'));await p.waitForFunction(()=>window.__shiftReady);
 await p.locator('[data-tray=empire]').click();await p.waitForTimeout(300);
 const chip=p.locator('.reward-chip',{hasText:'Week'});assert.equal(await chip.count(),1,'week chip in rewards strip');
 await p.screenshot({path:'artifacts/retention/'+name+'-strip.png'});
 await chip.click();await p.waitForTimeout(200);
 await p.locator('.empire-more').click();const card=p.locator('#seasonCard');await card.scrollIntoViewIfNeeded();
 assert.equal(await p.locator('#seasonName').innerText(),'Harvest Season');assert.match(await p.locator('#seasonClaim').innerText(),/^Collect/);
 assert.match(await p.locator('#seasonBadges').innerText(),/Neighborhood Week/);
 await p.waitForTimeout(200);await p.screenshot({path:'artifacts/retention/'+name+'-season.png'});
 await p.locator('#seasonClaim').click();assert.match(await p.locator('#seasonClaim').innerText(),/so far/);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);console.log(name,'season ok');await ctx.close()}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
