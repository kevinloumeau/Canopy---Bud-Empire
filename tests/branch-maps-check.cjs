const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});fs.mkdirSync('artifacts/branch-maps',{recursive:true});
 for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await context.addInitScript(()=>{
   Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});
   if(!localStorage.getItem('test-seeded')){localStorage.setItem('shift-save',JSON.stringify({money:50000000,lifetime:5000000,lines:[10,11,12,13,14,15],staff:[1,2,3,4,5,6],stock:[80,80,80,80,80],gameSpeed:0,sold:77,onlineCompleted:4,lastSeen:Date.now(),empire:{stores:[{level:2},{level:4},{level:6}],career:2}}));localStorage.setItem('shift-kiosk-preview-granted','1');localStorage.setItem('test-seeded','1')}
  });
  await page.goto(process.env.GAME_URL||'http://127.0.0.1:4173');await page.waitForFunction(()=>window.__shiftReady);
  const status=()=>page.evaluate(()=>window.factoryTool.execute());const original=await status();
  for(let i=1;i<=3;i++){
   if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#storeButton'+i).click();await page.waitForTimeout(300);
   assert.equal((await status()).viewedStore,i);assert.deepEqual((await status()).lineLevels,original.lineLevels);
   assert.equal(await page.locator('#markers').isVisible(),false);assert.equal(await page.locator('#branchMapMarker').isVisible(),true);
   assert.equal(await page.locator('#storeButton'+i).getAttribute('aria-pressed'),'true');
   const box=await page.locator('#branchMapMarker').boundingBox();assert.ok(box.x>=0&&box.y>=0&&box.x+box.width<=viewport.width);
   await page.screenshot({path:'artifacts/branch-maps/'+name+'-'+i+'.png'});
   const camera=(await status()).camera;await page.locator('#zoomIn').click();assert.ok((await status()).camera.zoom>camera.zoom);
   const after=await page.locator('#branchMapMarker').boundingBox();assert.notEqual(after.y,box.y);
   const canvas=page.locator('#world>canvas'),bounds=await canvas.boundingBox();const x=viewport.width*.38,y=viewport.height*.55;
   await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+25,y+25,{steps:5});await page.mouse.up();assert.notEqual((await status()).camera.panX,0);
   await page.locator('#centerView').click();assert.equal((await status()).camera.panX,0);
   const levels=(await status()).branchLevels;const cash=(await status()).cash;
   if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#manageViewedStore').click();await page.locator('#branchBuy'+(i-1)).click();
   const expected=levels.slice();expected[i-1]++;assert.deepEqual((await status()).branchLevels,expected);assert.ok((await status()).cash<cash);
   await page.locator('#branchVisit'+(i-1)).click();await page.reload();await page.waitForFunction(()=>window.__shiftReady);assert.equal((await status()).viewedStore,i);assert.deepEqual((await status()).branchLevels,expected);
  }
  const before=(await status()).cash;await page.locator('[data-speed="4"]').click();await page.waitForTimeout(1000);assert.ok((await status()).cash>before);await page.locator('[data-speed="0"]').click();
  await page.locator('[data-tray="factory"]').click();assert.equal((await status()).viewedStore,0);assert.equal(await page.locator('#markers').isVisible(),true);assert.deepEqual((await status()).lineLevels,original.lineLevels);
  await page.waitForTimeout(1800);await page.screenshot({path:'artifacts/branch-maps/'+name+'-main.png'});
  await page.locator('[data-tray="empire"]').click();await page.locator('#branchVisit0').click();assert.equal((await status()).viewedStore,1);
  assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  console.log(name+': three themed maps, independent upgrades, save/reload selection, income, anchored markers, pan/zoom and original-shop return passed');
  await context.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
