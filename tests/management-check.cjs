const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});fs.mkdirSync('artifacts/management',{recursive:true});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(()=>{
  const fixed=Math.floor(Date.now()/10800000)*10800000+60000;Date.now=()=>fixed;
  Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});
  if(!localStorage.getItem('management-seed')){localStorage.setItem('shift-save',JSON.stringify({money:50000000,lifetime:5000000,lines:[10,11,12,13,14,15],staff:[1,2,3,4,5,6],stock:[80,80,80,80,80],gameSpeed:0,lastSeen:fixed,empire:{stores:[{level:2},{level:2},{level:2}],counters:{pickup:10,online:2,revenue:500}}}));localStorage.setItem('shift-kiosk-preview-granted','1');localStorage.setItem('management-seed','1');}
 });
 await page.goto(process.env.GAME_URL||'http://127.0.0.1:4174');await page.waitForFunction(()=>window.__shiftReady);
 const status=()=>page.evaluate(()=>window.factoryTool.execute());
 await page.locator('[data-tray=empire]').click();await page.locator('[data-empire-view=today]').click();
 await page.locator('#goalClaim0').click();assert.ok(await page.locator('#goalClaim0').isDisabled());assert.equal((await status()).goalsCompleted,1);
 await page.screenshot({path:'artifacts/management/'+name+'-today.png'});
 await page.locator('[data-empire-view=growth]').click();
 for(let i=0;i<3;i++){
  if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#storeButton'+(i+1)).click();await page.waitForTimeout(150);await page.screenshot({path:'artifacts/management/'+name+'-before'+i+'.png'});
  if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#manageViewedStore').click();
  await page.locator('#featured'+i).selectOption(['exclusive','boutique','express'][i]);await page.locator('#manager'+i).selectOption(['grower','host','dispatcher'][i]);
  if(i===2){const before=await status();await page.locator('#bulkDispatch').click();const after=await status();assert.equal(after.stock[3],before.stock[3]-30);assert.equal(after.onlineCompleted,before.onlineCompleted+1);assert.ok(after.cash>before.cash);}
  for(let l=0;l<5;l++)await page.locator('#branchBuy'+i).click();
  if(i===0){await page.locator('#featured0').scrollIntoViewIfNeeded();await page.screenshot({path:'artifacts/management/'+name+'-management.png'});}
  await page.locator('#branchVisit'+i).click();await page.waitForTimeout(150);await page.screenshot({path:'artifacts/management/'+name+'-after'+i+'.png'});
 }
 await page.locator('[data-tray=empire]').click();await page.locator('[data-empire-view=events]').click();await page.locator('#eventAction').click();
 await page.locator('[data-tray=empire]').click();await page.waitForTimeout(150);await page.screenshot({path:'artifacts/management/'+name+'-event.png'});
 if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#storeButton0').click();await page.waitForTimeout(150);await page.screenshot({path:'artifacts/management/'+name+'-main-event.png'});
 await page.reload();await page.waitForFunction(()=>window.__shiftReady);const s=await status();assert.deepEqual(s.branchLevels,[7,7,7]);assert.deepEqual(s.management.map(s=>s.manager),['grower','host','dispatcher']);assert.deepEqual(s.management.map(s=>s.featured),['exclusive','boutique','express']);assert.deepEqual(s.lineLevels,[10,11,12,13,14,15]);
 await page.locator('[data-tray=empire]').click();await page.locator('#branchToggle0').click();await page.locator('#manager0').selectOption('dispatcher');assert.equal((await status()).management[2].manager,'none');
 await page.locator('[data-speed="4"]').click();let served=false;for(let n=0;n<20;n++){await page.waitForTimeout(500);const q=await status();assert.ok(q.customers.every(c=>!c.bag||c.ordered));if(q.customersServed>0){served=true;break}}assert.ok(served);await page.locator('[data-speed="0"]').click();
 const camera=(await status()).camera;await page.locator('#zoomIn').click();assert.ok((await status()).camera.zoom>camera.zoom);await page.locator('#centerView').click();assert.equal((await status()).camera.zoom,1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.deepEqual(errors,[]);
 // A reload with a real absence credits each store exactly once and opens the summary.
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('shift-save')));await page.close();const away=await context.newPage();await away.addInitScript(s=>{if(!sessionStorage.getItem('offline-seeded')){s.gameSpeed=1;s.lastSeen=Date.now()-120000;localStorage.setItem('shift-save',JSON.stringify(s));sessionStorage.setItem('offline-seeded','1')}},saved);
 await away.goto(process.env.GAME_URL||'http://127.0.0.1:4174');await away.waitForFunction(()=>window.__shiftReady);assert.ok(await away.locator('#returnSummary').isVisible());const report=await away.evaluate(()=>JSON.parse(localStorage.getItem('shift-save')).empire.returnReport);assert.equal(report.earnings.length,4);assert.ok(report.earnings.every(n=>n>0));await away.locator('[data-speed="0"]').click();await away.screenshot({path:'artifacts/management/'+name+'-return.png'});const cash=await away.evaluate(()=>window.factoryTool.execute().cash);await away.reload();await away.waitForFunction(()=>window.__shiftReady);assert.equal(await away.evaluate(()=>window.factoryTool.execute().cash),cash);await away.locator('#dismissReturn').click();assert.equal(await away.locator('#returnSummary').isVisible(),false);
 console.log(name+': specialties, manager reassignment, goals, bulk stock, milestone maps, event scenes, order-before-pickup, save migration and offline summary passed');await context.close();
}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
