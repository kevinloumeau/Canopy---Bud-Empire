// Shop research forks in the real game: old saves keep their picks and levels, an undecided fork shows both sides with
// "Choose", the first tap arms and the second takes it, and the partner closes. Desktop and phone.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
const URL=process.env.GAME_URL||'http://127.0.0.1:4176';
(async()=>{require('node:fs').mkdirSync('artifacts/research',{recursive:true});const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM||undefined});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  // A save from before research: curing and baskets bought, trend scout and floor flow too (the smaller side of each).
  const save={money:5e6,lifetime:5e6,gameSpeed:0,lastSeen:Date.now(),lines:[20,20,20,20,20,20],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],curingLevel:9,trendLevel:4,basketLevel:6,trafficLevel:2,kiosk:true};
  await p.addInitScript(s=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');localStorage.setItem('shift-save',JSON.stringify(s))}},save);
  await p.goto(URL+'/?age=21');await p.waitForFunction(()=>window.__shiftReady,null,{timeout:60000});
  const saved=()=>p.evaluate(()=>{window.dispatchEvent(new Event('pagehide'));return JSON.parse(localStorage.getItem('shift-save'))});
  await p.locator('[data-tray=boosts]').click({noWaitAfter:true});await p.locator('[data-shop-category="0"]').click({noWaitAfter:true});await p.waitForTimeout(300);
  const id=key=>p.evaluate(k=>{const names={curingLevel:'Curing equipment',trendLevel:'Trend scout',fleetLevel:'Drone fleet',cargoLevel:'Cargo bays'};return [...document.querySelectorAll('.shop-item h2')].find(h=>h.textContent===names[k]).closest('.shop-item').querySelector('button').id},key);
  const trend=await id('trendLevel');
  assert.equal(await p.locator('#'+trend+' span').textContent(),'Closed');assert.ok(await p.locator('#'+trend).isDisabled());
  assert.match(await p.locator('#'+trend).locator('xpath=..').locator('.shop-level').textContent(),/Closed/);
  await p.screenshot({path:'artifacts/research/'+name+'-grow.png'});
  // Delivery: the drone fork is still open.
  await p.locator('[data-shop-category="2"]').click({noWaitAfter:true});await p.waitForTimeout(200);
  const fleet=await id('fleetLevel'),cargo=await id('cargoLevel');
  assert.equal(await p.locator('.shop-fork-head:visible').count(),1);assert.equal(await p.locator('#'+fleet+' span').textContent(),'Choose');
  await p.screenshot({path:'artifacts/research/'+name+'-delivery-fork.png'});
  await p.locator('#'+cargo).click({noWaitAfter:true});assert.equal(await p.locator('#'+cargo+' span').textContent(),'Confirm');
  // The arm lasts six seconds; software WebGL in CI is slow enough to let a real second click miss it, so confirm in-page.
  await p.evaluate(c=>document.getElementById(c).click(),cargo);await p.waitForTimeout(200);
  assert.equal(await p.locator('#'+fleet+' span').textContent(),'Closed');assert.equal(await p.locator('.shop-fork-head:visible').count(),0);
  await p.screenshot({path:'artifacts/research/'+name+'-delivery-taken.png'});
  const s=await saved();assert.equal(s.forks.drones,'cargoLevel');assert.equal(s.cargoLevel,1);assert.equal(s.forks.yield,'curingLevel');assert.equal(s.trendLevel,4);assert.equal(s.curingLevel,9);
  assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal scroll');
  assert.deepEqual(errors,[]);await ctx.close();console.log(name,'ok');
}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
