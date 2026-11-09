// Breeding in Menu › Breed (iOS rules) and the weekly special line in Events, at desktop and phone sizes.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert');
const URL=process.env.GAME_URL||'http://127.0.0.1:4176';
(async()=>{require('node:fs').mkdirSync('artifacts/retention',{recursive:true});const browser=await chromium.launch({headless:true,...(process.env.PW_CHANNEL===''?{}:{channel:process.env.PW_CHANNEL||'chrome'})});
for(const [name,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const run=async(save,fn)=>{const ctx=await browser.newContext({viewport,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
    await p.addInitScript(s=>{Object.defineProperty(document,'modelContext',{value:{registerTool:t=>window.factoryTool=t}});localStorage.setItem('shift-guide-seen','1');localStorage.setItem('canopy-age-ok','1');localStorage.setItem('canopy-telemetry','off');if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');localStorage.setItem('shift-save',JSON.stringify(s))}},save);
    await p.goto(URL);await p.waitForFunction(()=>window.__shiftReady,null,{timeout:60000});
    const status=()=>p.evaluate(()=>window.factoryTool.execute());await fn(p,status);
    assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'no horizontal scroll');assert.deepEqual(errors,[]);await ctx.close()};
  const base={money:1e6,lifetime:5e6,lines:[10,10,10,10,10,10],staff:[3,3,3,3,3,3],stock:[80,80,80,80,80],empire:{reputation:20},gameSpeed:1,lastSeen:Date.now()};
  const openBreed=async p=>{await p.locator('[data-tray=flowers]').click();await p.locator('[data-menu-view=breed]').click();await p.locator('#breedView').waitFor({state:'visible'})};
  // 1. A web-library save keeps its discoveries; a cross near its end finishes on game time.
  await run({...base,strains:[5,5,5,5],breedingLevel:1,library:['honey-mint','mint-select'],breed:{id:'velvet-midnight',ready:Date.now()+12000,minutes:120}},async(p,status)=>{
    let s=await status();assert.deepEqual(s.crosses.done.slice(0,2),['0-1','0-2']);
    await openBreed(p);assert.match(await p.locator('#breedSummary').innerText(),/^[23] \/ 6 found$/);assert.match(await p.locator('#breedBonus').innerText(),/^\+[46]% every sale$/);
    await p.waitForFunction(()=>window.factoryTool.execute().crosses.done.length===3,null,{timeout:60000});
    await p.locator('.breed-pick[data-state=open]').first().click();assert.equal(await p.locator('#breedBench').getAttribute('data-state'),'open');assert.match(await p.locator('#breedGo').innerText(),/Breed\s+\$405K/);
    await p.locator('#breedGo').click();s=await status();assert.equal(s.crosses.active.remaining>295,true,JSON.stringify(s.crosses));assert.equal(s.cash<1e6,true);
    assert.equal(await p.locator('#breedBench').getAttribute('data-state'),'growing');assert.match(await p.locator('#breedGo').innerText(),/Finish now\s+\$/);
    // Finish now pays and finds it at once.
    await p.locator('#breedGo').click();s=await status();assert.equal(s.crosses.done.length,4);assert.equal(s.crosses.active,null);assert.equal(await p.locator('#breedBench').getAttribute('data-state'),'known');
    await p.screenshot({path:'artifacts/retention/'+name+'-breed.png'});
    await p.reload();await p.waitForFunction(()=>window.__shiftReady);s=await status();assert.equal(s.crosses.done.length,4);
  });
  // 2. Without the bench the cards point to the Shop; a parent below level 5 sends you to that strain.
  await run({...base,strains:[5,3,0,0],breedingLevel:0},async(p,status)=>{
    await openBreed(p);assert.equal(await p.locator('#breedBench').getAttribute('data-state'),'bench');assert.match(await p.locator('#breedGo').innerText(),/^Get Breeding bench/);
    await p.locator('#breedGo').click();assert.equal(await p.evaluate(()=>document.body.dataset.activeTray),'boosts');
  });
  await run({...base,strains:[5,3,0,0],breedingLevel:1},async(p,status)=>{
    await openBreed(p);await p.locator('.breed-pick[data-cultivar="0-1"]').click();assert.equal(await p.locator('#breedBench').getAttribute('data-state'),'prepare');
    assert.match(await p.locator('.breed-cross').innerText(),/Meadow Mint\s+Lv 5[\s\S]*Amber Bloom\s+Lv 3 \/ 5/);
    assert.match(await p.locator('#breedGo').innerText(),/^Upgrade Amber Bloom/);await p.locator('#breedGo').click();
    assert.equal(await p.locator('#breedView').isVisible(),false);assert.equal(await p.locator('#strainTab1').getAttribute('aria-selected'),'true');
    // Weekly special line in Events.
    await p.locator('[data-tray=empire]').click();const line=p.locator('#weeklySpecial');await line.scrollIntoViewIfNeeded();
    assert.match(await line.innerText(),/^This week: .+ · .+/);assert.ok((await status()).weeklySpecial);
    await p.screenshot({path:'artifacts/retention/'+name+'-weekly.png'});
  });
  console.log(name,'breeding ok')}
await browser.close()})().catch(e=>{console.error(e);process.exit(1)});
