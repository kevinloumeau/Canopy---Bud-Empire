// Founder perks: buy three perks with saved points, reopen, and check the new shop starts with them.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
const URL=process.env.GAME_URL||'http://127.0.0.1:4176';
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({headless:true,channel:'chrome'});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(s=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');localStorage.setItem('shift-save',JSON.stringify(s))}},
    {money:1e6,lifetime:2e7,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],gameSpeed:0,lastSeen:Date.now(),empire:{reputation:80},perks:{points:10,levels:{}}});
  await p.goto(URL);await p.waitForFunction(()=>window.__shiftReady,null,{timeout:60000});
  const status=()=>p.evaluate(()=>window.factoryTool.execute());
  await p.locator('[data-tray=empire]').click();await p.locator('.empire-more').click();
  const sum=p.locator('#prestigeStart').locator('xpath=ancestor::details/summary');await sum.scrollIntoViewIfNeeded();await sum.click();
  assert.equal(await p.locator('#perkPoints').innerText(),'10 points');
  for(const id of ['seed','crew','vault']){const b=p.locator(`[data-perk=${id}] button`);await b.scrollIntoViewIfNeeded();await b.click()}
  assert.equal(await p.locator('#perkPoints').innerText(),'3 points');assert.equal(await p.locator('[data-perk=crew] button').isDisabled(),true,'crew level 2 costs 6');
  assert.equal(await p.locator('[data-perk=seed] small').innerText(),'Reopen with $10K cash');
  let s=await status();assert.equal(s.offlineLevel,1,'kept vault applies at once');
  await p.locator('#perkGrid').scrollIntoViewIfNeeded();await p.screenshot({path:'artifacts/retention/'+name+'-perks.png'});
  await p.locator('#prestigeStart').scrollIntoViewIfNeeded();await p.locator('#prestigeStart').click();await p.locator('#prestigeConfirm').click();
  s=await status();assert.equal(s.shares,14);assert.equal(s.perks.points,17);assert.deepEqual(s.lineLevels,[6,6,6,6,6,6]);assert.equal(s.offlineLevel,1);assert.ok(s.cash>=1030&&s.cash<1500,'seed money '+s.cash);
  await p.reload();await p.waitForFunction(()=>window.__shiftReady,null,{timeout:60000});s=await status();assert.deepEqual(s.perks.levels,{seed:1,crew:1,vault:1});assert.equal(s.perks.points,17);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal scroll');assert.deepEqual(errors,[]);console.log(name,'perks ok');await ctx.close()}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
