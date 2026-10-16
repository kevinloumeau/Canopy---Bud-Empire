const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
const URL=process.env.GAME_URL||'http://127.0.0.1:4176';
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({headless:true,channel:'chrome'});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const run=async(save,fn)=>{const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.addInitScript(s=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');localStorage.setItem('shift-kiosk-preview-granted','1');if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');localStorage.setItem('shift-save',JSON.stringify(s))}},save);
    await p.goto(URL);await p.waitForFunction(()=>window.__shiftReady,null,{timeout:60000});
    const status=()=>p.evaluate(()=>window.factoryTool.execute());await fn(p,status);
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal scroll');assert.deepEqual(errors,[]);await ctx.close()};
  const base={money:100,lifetime:500000,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],empire:{reputation:80}};
  // 1. Paused save, away 10 hours, safe level 1 (8h cap): earns 8 hours.
  let pausedCash,unpausedCash;
  await run({...base,gameSpeed:0,offlineLevel:1,lastSeen:Date.now()-10*3600e3},async(p,status)=>{const s=await status();pausedCash=s.cash;assert.ok(s.cash>1000,'paused save still earns offline: '+s.cash);assert.equal(s.offlineLevel,1);await p.waitForTimeout(600);await p.screenshot({path:'artifacts/retention/'+name+'-welcome.png'})});
  await run({...base,gameSpeed:1,offlineLevel:0,lastSeen:Date.now()-10*3600e3},async(p,status)=>{unpausedCash=(await status()).cash});
  const ratio=(pausedCash-100)/(unpausedCash-100);assert.ok(Math.abs(ratio-2)<.05,'8h cap pays twice the 4h cap: '+ratio);
  // 2. Back-room safe card in Shop > Production.
  await run({...base,money:1e6,gameSpeed:0,lastSeen:Date.now()},async(p,status)=>{await p.locator('[data-tray=boosts]').click();await p.locator('[data-shop-category="0"]').click();const card=p.locator('#componentBuy25');await card.scrollIntoViewIfNeeded();assert.ok(await card.isVisible());assert.match(await p.locator('#componentBenefit25').innerText(),/4h|8h/);await p.screenshot({path:'artifacts/retention/'+name+'-safe.png'});await card.click();assert.equal((await status()).offlineLevel,1);assert.ok(Math.abs((await status()).cash-(1e6-5000))<5000,'safe costs $5,000');
    // 3. Recommendation button points at something that raises income and opens it.
    const text=await p.locator('#flowAction').innerText();assert.ok(text.length>0);await p.screenshot({path:'artifacts/retention/'+name+'-flow.png'})});
  // 4. Prestige with $20M lifetime: 14 shares, 1.7x; legacy rank 2 keeps 1.4x.
  await run({...base,money:1e6,lifetime:2e7,gameSpeed:0,lastSeen:Date.now()},async(p,status)=>{await p.locator('[data-tray=empire]').click();await p.locator('.empire-more').click();const sum=p.locator('#prestigeStart').locator('xpath=ancestor::details/summary');await sum.scrollIntoViewIfNeeded();await sum.click();assert.match(await p.locator('#prestigeStart').innerText(),/\+14 shares/);assert.equal(await p.locator('#prestigeNextRate').innerText(),'1.7×');await p.locator('#prestigeStart').scrollIntoViewIfNeeded();await p.screenshot({path:'artifacts/retention/'+name+'-prestige.png'});await p.locator('#prestigeStart').click();await p.locator('#prestigeConfirm').click();let s=await status();assert.equal(s.prestige,1);assert.equal(s.shares,14);assert.equal(s.cash,30);await p.reload();await p.waitForFunction(()=>window.__shiftReady);s=await status();assert.equal(s.shares,14)});
  await run({...base,gameSpeed:0,lastSeen:Date.now(),empire:{prestige:2,reputation:80}},async(p,status)=>{const s=await status();assert.equal(s.shares,8);assert.equal(s.prestige,2)});
  console.log(name+': paused offline, safe cap, safe card, recommendation, prestige shares and legacy migration passed');
}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
