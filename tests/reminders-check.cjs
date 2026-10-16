const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({channel:'chrome'});
for(const [name,viewport,ios] of [['mobile-ios',{width:390,height:844},true],['desktop-web',{width:1440,height:1000},false]]){
 const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.addInitScript(ios=>{localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');
  if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('shift-save',JSON.stringify({money:100,lifetime:500000,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],gameSpeed:0,lastSeen:Date.now(),strains:[1,1,0,0],breed:{id:'honey-mint',ready:Date.now()+600000,minutes:15},empire:{reputation:20}}))}
  window.__calls=[];if(ios)window.Capacitor={Plugins:{LocalNotifications:{requestPermissions:async()=>({display:'granted'}),cancel:async a=>window.__calls.push(['cancel']),schedule:async a=>window.__calls.push(['schedule',a.notifications.map(n=>n.title)])}}}},ios);
 await p.goto('http://127.0.0.1:4176');await p.waitForFunction(()=>window.__shiftReady);
 await p.locator('#settingsOpen').click();const row=p.locator('[data-proxy=remindersToggle]');
 if(!ios){assert.equal(await row.isVisible(),false);console.log(name,'reminders hidden on web');assert.deepEqual(errors,[]);await ctx.close();continue}
 assert.ok(await row.isVisible());assert.equal(await row.locator('b').innerText(),'Off');await row.click();await p.waitForTimeout(300);assert.equal(await row.locator('b').innerText(),'On');
 await p.screenshot({path:'artifacts/retention/'+name+'-settings.png'});
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});await p.waitForTimeout(300);
 const calls=await p.evaluate(()=>window.__calls);const sched=calls.find(c=>c[0]==='schedule');assert.ok(sched,'scheduled on hide: '+JSON.stringify(calls));assert.ok(sched[1].includes('Honey Mint is ready'));assert.ok(sched[1].includes('Your back-room safe is full'));
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'))});await p.waitForTimeout(200);
 assert.equal((await p.evaluate(()=>window.__calls)).at(-1)[0],'cancel');
 await p.reload();await p.waitForFunction(()=>window.__shiftReady);await p.locator('#settingsOpen').click();assert.equal(await p.locator('[data-proxy=remindersToggle] b').innerText(),'On');
 assert.deepEqual(errors,[]);console.log(name,'reminders ok',JSON.stringify(sched[1]));await ctx.close()}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
