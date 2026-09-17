const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});fs.mkdirSync('artifacts/empire',{recursive:true});
 for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'}), page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   const fixed=Math.floor(Date.now()/3600000)*3600000+60000;Date.now=()=>fixed;
   Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});
   if(!localStorage.getItem('test-seeded')){localStorage.setItem('shift-save',JSON.stringify({money:900000,lifetime:1000000,lines:[10,11,12,13,14,15],staff:[1,2,3,4,5,6],stock:[80,80,80,80,80],strains:[2,1,0,0],menuStrains:[0,1],gameSpeed:0,sold:77,onlineCompleted:4,lastSeen:fixed}));localStorage.setItem('shift-kiosk-preview-granted','1');localStorage.setItem('test-seeded','1')}
  });
  await page.goto(process.env.GAME_URL||'http://127.0.0.1:4173');await page.waitForFunction(()=>window.__shiftReady);
  const status=()=>page.evaluate(()=>window.factoryTool.execute());
  let before=await status();assert.equal(before.cash,900000);assert.deepEqual(before.lineLevels,[10,11,12,13,14,15]);assert.equal(before.customersServed,77);
  await page.locator('[data-tray="empire"]').click();await page.locator('#careerClaim').click();
  await page.locator('#branchToggle0').click();await page.locator('#branchBuy0').click();await page.locator('#branchBuy0').click();await page.locator('#branchToggle1').click();await page.locator('#branchBuy1').click();
  let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('shift-save')));assert.equal(saved.empire.career,1);assert.deepEqual(saved.empire.stores.map(s=>s.level),[2,1,0]);
  await page.locator('[data-empire-view="daily"]').click();await page.locator('#dailyClaim').click();assert.equal(await page.locator('#dailyClaim').isDisabled(),true);
  await page.locator('[data-pane=empire]').evaluate(el=>el.scrollTop=0);await page.waitForTimeout(1700);await page.screenshot({path:'artifacts/empire/'+name+'-daily.png'});
  const claimed=(await status()).cash;await page.reload();await page.waitForFunction(()=>window.__shiftReady);assert.equal((await status()).cash,claimed);
  await page.locator('[data-tray="empire"]').click();await page.locator('[data-empire-view="daily"]').click();assert.equal(await page.locator('#dailyClaim').isDisabled(),true);
  await page.locator('[data-empire-view="events"]').click();await page.locator('#eventAction').click();assert.equal(await page.locator('#eventAction').isDisabled(),true);
  await page.locator('[data-pane=empire]').evaluate(el=>el.scrollTop=0);await page.waitForTimeout(1700);await page.screenshot({path:'artifacts/empire/'+name+'-events.png'});
  await page.locator('[data-empire-view="growth"]').click();assert.equal(await page.locator('[data-pane=empire]').evaluate(el=>el.scrollTop),0);await page.screenshot({path:'artifacts/empire/'+name+'.png'});await page.locator('#branchToggle2').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/empire/'+name+'-stores.png'});
  await page.locator('[data-tray="empire"]').click();assert.ok(await page.locator('#sheet').evaluate(el=>el.classList.contains('collapsed')));await page.locator('[data-tray="empire"]').click();
  await page.locator('[data-tray="factory"]').click();const levels=(await status()).lineLevels;await page.locator('#buyMachine').click();assert.equal((await status()).lineLevels[0],levels[0]+1);
  await page.locator('[data-tray="employees"]').click();await page.locator('[data-staff="0"]').click();assert.equal((await status()).employeeLevels[0],2);
  await page.locator('[data-tray="orders"]').click();const online=(await status()).onlineCompleted;await page.locator('#fulfillOnline').click();assert.equal((await status()).onlineCompleted,online+1);
  const paused=(await status()).cash;await page.waitForTimeout(600);assert.equal((await status()).cash,paused);
  await page.locator('[data-speed="4"]').click();let served=false;
  for(let i=0;i<16;i++){await page.waitForTimeout(500);const current=await status();assert.ok(current.customers.every(c=>!c.bag||c.ordered),'pickup requires completed order');if(current.customersServed>77){served=true;break}}
  assert.ok(served,'customers complete order then pickup');assert.ok((await status()).cash>paused,'branches and shop generate income');
  await page.locator('[data-speed="0"]').click();
  const cameraBefore=(await status()).camera;await page.locator('#zoomIn').click();assert.ok((await status()).camera.zoom>cameraBefore.zoom);await page.locator('#centerView').click();assert.equal((await status()).camera.zoom,1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no page overflow');assert.deepEqual(errors,[]);
  const offlineSetup=await page.evaluate(()=>JSON.parse(localStorage.getItem('shift-save')));
  await page.close();
  const away=await context.newPage();await away.addInitScript(s=>{s.gameSpeed=1;s.lastSeen=Date.now()-60000;localStorage.setItem('shift-save',JSON.stringify(s));},offlineSetup);
  await away.goto(process.env.GAME_URL||'http://127.0.0.1:4173');await away.waitForFunction(()=>window.__shiftReady);
  const offlineSave=await away.evaluate(()=>JSON.parse(localStorage.getItem('shift-save')));
  assert.ok(offlineSave.money>=offlineSetup.money+60*14,'offline branch income: '+JSON.stringify({before:offlineSetup.money,after:offlineSave.money,stores:offlineSave.empire.stores}));await away.close();
  console.log(name+': migration, daily persistence, branch upgrades, career, events, tabs, station/staff upgrades, online, pause, ordered pickup and zoom passed');await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
