const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('fs');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});fs.mkdirSync('.impeccable/review',{recursive:true});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
 const context=await browser.newContext({viewport,reducedMotion:'reduce'}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await context.addInitScript(()=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});if(!localStorage.getItem('seed-project')){localStorage.setItem('shift-save',JSON.stringify({money:50000000,lifetime:5000000,lines:[10,11,12,13,14,15],staff:[1,2,3,4,5,6],stock:[80,80,80,80,80],gameSpeed:0,lastSeen:Date.now(),empire:{activeStore:2,stores:[{level:7},{level:7},{level:7}]}}));localStorage.setItem('shift-kiosk-preview-granted','1');localStorage.setItem('seed-project','1')}});
 await page.goto(process.env.GAME_URL||'http://127.0.0.1:4173');await page.waitForFunction(()=>window.__shiftReady);
 for(let i=0;i<3;i++){
 if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#storeButton'+(i+1)).click();if(await page.locator('#locationToggle').getAttribute('aria-expanded')!=='true')await page.locator('#locationToggle').click();await page.locator('#manageViewedStore').click();await page.locator('#projectSummary'+i).click();
 for(let j=0;j<3;j++){await page.locator('#projectBuy'+i+j).click();assert.equal(await page.locator('#projectBuy'+i+j).innerText(),'Installed');assert.ok(await page.locator('#projectBuy'+i+j).isDisabled())}
 if(i===1){await page.locator('#projectSummary'+i).scrollIntoViewIfNeeded();await page.screenshot({path:'.impeccable/review/'+name+'.png'})}
 await page.locator('#branchVisit'+i).click();await page.waitForTimeout(300);await page.screenshot({path:'.impeccable/review/'+name+'-store'+i+'.png'});
 }
 await page.reload();await page.waitForFunction(()=>window.__shiftReady);const s=await page.evaluate(()=>window.factoryTool.execute());assert.deepEqual(s.branchProjects,[[true,true,true],[true,true,true],[true,true,true]]);assert.deepEqual(s.branchLevels,[7,7,7]);assert.deepEqual(s.lineLevels,[10,11,12,13,14,15]);assert.ok(s.cash<50000000);assert.deepEqual(errors,[]);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);console.log(name+': all 9 projects, purchase caps, map renders, saved progress and main levels passed');await context.close();}
 await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
