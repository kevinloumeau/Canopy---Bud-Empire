import test from 'node:test';
import assert from 'node:assert/strict';
import {freshStore,migrateStore,useToken,addBoost,boostLeft,earnFactor,awayFactor,claimGift,giftReady,grantPurchase,forSale,countAd,adsLeft,doubleRoute,boostClock,PRODUCTS,BOOST_SECONDS,BOOST_CAP_SECONDS,ADS_PER_DAY,productByKey} from '../src/store.js';
import {createPurchases} from '../src/purchases.js';
import {createAds} from '../src/rewarded-ads.js';

const H=3600000;
test('a token gives 2× for two hours of real time and stacks up to 12 hours',()=>{
  const s=freshStore();s.tokens=10;const t=1e12;
  assert.equal(earnFactor(s,t),1);
  assert.ok(useToken(s,t));assert.equal(s.tokens,9);assert.equal(boostLeft(s,t),BOOST_SECONDS);
  assert.equal(earnFactor(s,t+H),2);assert.equal(earnFactor(s,t+2*H),1);
  for(let i=0;i<5;i++)assert.ok(useToken(s,t));
  assert.equal(boostLeft(s,t),BOOST_CAP_SECONDS);
  assert.equal(useToken(s,t),false,'a full bank refuses, keeping the token');assert.equal(s.tokens,4);
  assert.equal(useToken(freshStore(),t),false);
});
test('2× sales forever doubles on top of the boost',()=>{
  const s=freshStore();s.owned.double=true;assert.equal(earnFactor(s,0),2);addBoost(s,0,60);assert.equal(earnFactor(s,1000),4);
});
test('the away pay doubles only the part of the break the boost covered',()=>{
  const s=freshStore(),from=1e12;s.boostEnds=from+H;
  assert.equal(awayFactor(s,from,2*3600),1.5);
  assert.equal(awayFactor(s,from,1800),2);
  assert.equal(awayFactor(s,from+2*H,3600),1);
  s.owned.double=true;assert.equal(awayFactor(s,from,2*3600),3);
});
test('the free boost is given once',()=>{
  const s=freshStore();assert.ok(giftReady(s));assert.ok(claimGift(s));assert.equal(s.tokens,1);assert.equal(claimGift(s),false);assert.equal(s.tokens,1);
});
test('purchases grant once per transaction and one-time packs once',()=>{
  const s=freshStore(),id=k=>productByKey(k).id;
  const got=grantPurchase(s,id('boosts5'),'t1');assert.equal(got.tokens,5);assert.equal(s.tokens,5);
  assert.equal(grantPurchase(s,id('boosts5'),'t1'),null);assert.equal(s.tokens,5);
  assert.equal(grantPurchase(s,id('boosts20'),'t2').tokens,20);
  const starter=grantPurchase(s,id('starter'),'t3',h=>h*1000);assert.deepEqual([starter.tokens,starter.cash],[3,2000]);
  assert.equal(forSale(s,'starter'),false);assert.equal(grantPurchase(s,id('starter'),'t4',()=>1),null,'a restore never pays the starter twice');
  assert.ok(grantPurchase(s,id('double'),'t5').double);assert.equal(s.owned.double,true);
  assert.equal(grantPurchase(s,'com.example.other','t6'),null);
  assert.equal(s.tokens,28);
});
test('ads are capped per day',()=>{
  const s=freshStore();for(let i=0;i<ADS_PER_DAY;i++)assert.ok(countAd(s,5));assert.equal(countAd(s,5),false);assert.equal(adsLeft(s,5),0);assert.equal(adsLeft(s,6),ADS_PER_DAY);assert.ok(countAd(s,6));
});
test('double it uses a token first, then an ad, then the store',()=>{
  const s=freshStore();assert.equal(doubleRoute(s,{adReady:true,canBuy:true}),'ad');assert.equal(doubleRoute(s,{adReady:false,canBuy:true}),'store');assert.equal(doubleRoute(s,{adReady:false,canBuy:false}),null);s.tokens=1;assert.equal(doubleRoute(s,{adReady:true,canBuy:true}),'token');
});
test('old saves and junk migrate to a clean store',()=>{
  assert.deepEqual(migrateStore(undefined),freshStore());
  const m=migrateStore({tokens:-3,boostEnds:'x',owned:{double:true,boosts5:true,starter:'yes'},txns:[1,'a'],gift:true,ads:{day:3,count:500}});
  assert.equal(m.tokens,0);assert.equal(m.boostEnds,0);assert.deepEqual(m.owned,{double:true});assert.deepEqual(m.txns,['a']);assert.equal(m.gift,true);assert.equal(m.ads.count,99);
  assert.equal(migrateStore(JSON.parse(JSON.stringify(m))).owned.double,true);
});
test('the boost clock reads in hours or minutes',()=>{assert.equal(boostClock(7199.2),'2:00:00');assert.equal(boostClock(125),'2:05');});
test('every product has an App Store id under the app bundle id',()=>{
  assert.equal(new Set(PRODUCTS.map(p=>p.id)).size,PRODUCTS.length);
  PRODUCTS.forEach(p=>{assert.match(p.id,/^com\.kevinloumeau\.canopy\.[a-z0-9]+$/);assert.ok(['consumable','nonconsumable'].includes(p.type));});
});
test('the web build has no purchases or ads unless test mode is on',async()=>{
  const plain={location:{search:''},localStorage:{getItem:()=>null}};
  const p=createPurchases(plain);assert.equal(p.available,false);assert.deepEqual(await p.buy('x'),{error:'unavailable'});assert.deepEqual(await p.restore(),[]);
  assert.equal(createAds(plain).available,false);assert.equal(await createAds(plain).show(),false);
  const t=createPurchases({location:{search:'?store=test'}});assert.ok(t.available&&t.test);assert.equal(t.price(PRODUCTS[0].id),PRODUCTS[0].price);
  const r=await t.buy(PRODUCTS[2].id);assert.equal(r.productId,PRODUCTS[2].id);assert.match(r.txn,/^test-/);
});
test('the native bridge reads App Store prices and treats a cancel as no purchase',async()=>{
  const calls=[];
  const plugin={getProducts:async o=>{calls.push(o);return {products:[{identifier:PRODUCTS[0].id,priceString:'2,99 €'}]};},purchaseProduct:async o=>{if(o.productIdentifier===PRODUCTS[1].id)throw new Error('User cancelled');return {transactionId:'99',productIdentifier:o.productIdentifier};},
    restorePurchases:async()=>{},getPurchases:async()=>({purchases:[{productIdentifier:PRODUCTS[1].id,transactionId:'7'},{productIdentifier:PRODUCTS[2].id,transactionId:'8'}]}),addListener(){}};
  const p=createPurchases({Capacitor:{isNativePlatform:()=>true,Plugins:{NativePurchases:plugin}}});
  assert.ok(p.available);assert.equal(p.ready(PRODUCTS[0].id),false);await p.load();assert.ok(p.ready(PRODUCTS[0].id));assert.equal(p.ready(PRODUCTS[1].id),false);
  assert.equal(p.price(PRODUCTS[0].id),'2,99 €');assert.deepEqual(calls[0].productIdentifiers,PRODUCTS.map(x=>x.id));
  assert.deepEqual(await p.buy(PRODUCTS[0].id),{productId:PRODUCTS[0].id,txn:'99'});assert.equal(await p.buy(PRODUCTS[1].id),null);
  assert.deepEqual(await p.restore(),[{productId:PRODUCTS[1].id,txn:'7'}],'only one-time packs restore');
});
