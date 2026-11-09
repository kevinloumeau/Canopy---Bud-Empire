import test from 'node:test';import assert from 'node:assert/strict';
import {PRIZES,SPIN_EVERY,SPIN_BANK,AD_SPINS_PER_DAY,freshSpin,migrateSpin,refill,freeReady,nextFreeIn,takeSpin,adSpinsLeft,rollPrize,sliceAngles,landingTurn,prizePay,expectedSeconds,spinClock} from '../src/spin.js';
import {freshStore,migrateStore,grantPurchase,forSale,fillJar,rewardWay,JAR_MAX,JAR_MIN,productByKey} from '../src/store.js';
const T=1e12;
test('the odds add up to 100 and the slices fill the wheel by their odds',()=>{
  assert.equal(PRIZES.reduce((t,p)=>t+p.odds,0),100);
  const s=sliceAngles();assert.equal(s[0].start,0);assert.ok(Math.abs(s[s.length-1].end-360)<1e-9);
  s.forEach((x,i)=>assert.ok(Math.abs((x.end-x.start)-PRIZES[i].odds*3.6)<1e-9));});
test('a roll lands on each prize as often as its odds say',()=>{const n={};for(let i=0;i<10000;i++){const p=rollPrize(i/10000);n[p.id]=(n[p.id]||0)+1;}
  PRIZES.forEach(p=>assert.equal(n[p.id],p.odds*100,p.id));assert.equal(rollPrize(1).id,PRIZES[PRIZES.length-1].id);});
test('the wheel stops with the pointer inside the prize slice',()=>{
  for(const sl of sliceAngles())for(const r of [0,.5,1]){const turn=landingTurn(sl.id,r,6);assert.ok(turn>=6*360);
    const under=((360-turn%360)%360);assert.ok(under>=sl.start&&under<sl.end,sl.id+' '+r+' '+under);}});
test('one free spin to start, one more every 8 hours, banked up to 2',()=>{const s=freshSpin();
  assert.ok(freeReady(s,T));assert.equal(takeSpin(s,T,'free'),true);assert.equal(freeReady(s,T),false);
  assert.equal(nextFreeIn(s,T),SPIN_EVERY);assert.equal(freeReady(s,T+SPIN_EVERY-1),false);assert.equal(freeReady(s,T+SPIN_EVERY),true);
  assert.equal(refill(s,T+SPIN_EVERY*5),SPIN_BANK,'the bank holds 2');assert.equal(nextFreeIn(s,T+SPIN_EVERY*5),0);
  takeSpin(s,T+SPIN_EVERY*5,'free');assert.equal(s.free,1);assert.equal(nextFreeIn(s,T+SPIN_EVERY*5),SPIN_EVERY,'the clock starts again from the spin');});
test('two ad spins a day',()=>{const s=freshSpin();
  for(let i=0;i<AD_SPINS_PER_DAY;i++)assert.equal(takeSpin(s,T,'ad',100),true);assert.equal(takeSpin(s,T,'ad',100),false);
  assert.equal(adSpinsLeft(s,100),0);assert.equal(adSpinsLeft(s,101),AD_SPINS_PER_DAY);assert.equal(takeSpin(s,T,'buy',100),false,'spins cannot be bought');});
test('prizes are sized in the shop income and a spin is worth about half an hour',()=>{
  assert.equal(prizePay(PRIZES.find(p=>p.id==='cash10'),100).cash,60000);assert.equal(prizePay(PRIZES.find(p=>p.id==='jackpot'),0).cash,50);
  const e=expectedSeconds();assert.ok(e>1500&&e<2100,'about 30 min: '+e);
  const tokensPerSpin=PRIZES.reduce((t,p)=>t+p.odds/100*(p.tokens||0),0);assert.ok(tokensPerSpin*5<1,'five spins a day give under one token');});
test('spin state survives a bad save and lives in the store',()=>{assert.deepEqual(migrateSpin(null),freshSpin());
  const m=migrateSpin({free:9,nextAt:-4,ad:{day:3,count:1},last:'nope'});assert.equal(m.free,SPIN_BANK);assert.equal(m.nextAt,0);assert.equal(m.last,null);
  const st=migrateStore({tokens:2});assert.deepEqual(st.spin,freshSpin());assert.equal(st.jar,0);
  assert.equal(spinClock(5*3600000+12*60000),'5h 12m');assert.equal(spinClock(30000),'1m');});
test('the tip jar fills with play, opens at 3 boosts and pays what it holds',()=>{const s=freshStore();
  assert.equal(forSale(s,'tipjar'),false);fillJar(s,3600*2.5);assert.equal(forSale(s,'tipjar'),false);
  fillJar(s,3600);assert.equal(forSale(s,'tipjar'),true);fillJar(s,3600*99);assert.equal(s.jar,JAR_MAX);
  const got=grantPurchase(s,productByKey('tipjar').id,'t1');assert.equal(got.tokens,JAR_MAX);assert.equal(s.tokens,JAR_MAX);assert.equal(s.jar,0);
  assert.equal(grantPurchase(s,productByKey('tipjar').id,'t1'),null,'one transaction pays once');assert.ok(JAR_MIN<JAR_MAX);});
test('ad-free rewards pays every ad button without an ad',()=>{const s=freshStore();
  assert.equal(rewardWay(s,false),null);assert.equal(rewardWay(s,true),'ad');
  grantPurchase(s,productByKey('adfree').id,'a1');assert.equal(s.owned.adfree,true);assert.equal(rewardWay(s,false),'free');assert.equal(forSale(s,'adfree'),false);
  assert.equal(migrateStore(JSON.parse(JSON.stringify(s))).owned.adfree,true);});
