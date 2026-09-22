import test from 'node:test';import assert from 'node:assert/strict';
import {migrateProgression,storeRate,buyStore,buyProject} from '../src/progression.js';
import {migrateOperations,allocateShelf,chooseRecipe,developProduct,customize,sendTransfer,transferReason,tickOperations,dispatchDelivery,upgradeFleet,expandArea,openingStatus,claimOpening,storyStatus,fulfillStory,staffLevel,journal,flagshipStatus,claimFlagship,atmosphere,neighborhood,importHarvest} from '../src/operations.js';
const state=()=>({money:10000000,lifetime:5000000,stock:[0,0,40,80,0],strains:[1,1,1,1],onlineCompleted:0,empire:migrateProgression({stores:[{level:7},{level:7},{level:7},{level:7},{level:7}]})});
const advance=(s,seconds)=>{let revenue=0,deliveries=0;for(let t=0;t<seconds;t++){const result=tickOperations(s,1);revenue+=result.revenue;deliveries+=result.deliveries;}return {revenue,deliveries};};
test('operation migration preserves valid saves and rejects malformed jobs and settings',()=>{
 const n=migrateOperations({fleet:Infinity,time:-1,recipes:[false,true],staff:{grower:{xp:Infinity}},jobs:[{kind:'transfer',from:99,to:1}],stores:[{raw:Infinity,stock:[-1,NaN,4],shelves:[500,500,500],cosmetics:{plants:90}}]});
 assert.equal(n.fleet,1);assert.equal(n.time,0);assert.equal(n.jobs.length,0);assert.deepEqual(n.recipes,[true,true,false]);assert.equal(n.stores[0].raw,0);assert.ok(n.stores[0].shelves.reduce((a,b)=>a+b,0)<=60);assert.equal(n.stores[0].cosmetics.plants,2);
 const p=state().empire;p.network.stores[1].relationship=2;p.network.stores[1].raw=32;p.network.staff.host.xp=150;const restored=migrateProgression(JSON.parse(JSON.stringify(p)));assert.equal(restored.network.stores[1].relationship,2);assert.equal(restored.network.stores[1].raw,32);assert.equal(staffLevel(restored.network,'host'),1);
});
test('Riverside grows capped harvest and imports consume main harvested stock',()=>{const s=state();advance(s,50);assert.ok(s.empire.network.stores[0].harvested>10);assert.ok(s.empire.network.stores[0].crafted>0);assert.equal(importHarvest(s),true);assert.equal(s.stock[2],30);s.empire.network.stores[0].raw=119;assert.equal(importHarvest(s),false);});
test('transfers reserve source goods, destination capacity, drivers and survive reload once',()=>{
 const s=state(),n=s.empire.network;n.stores[0].raw=30;assert.equal(sendTransfer(s.empire,1),true);assert.equal(n.stores[0].raw,20);assert.equal(sendTransfer(s.empire,2),false);assert.equal(n.stores[1].raw,0);
 s.empire=migrateProgression(JSON.parse(JSON.stringify(s.empire)));advance(s,32);assert.equal(s.empire.network.jobs.length,0);assert.equal(s.empire.network.stores[1].received,10);assert.equal(s.empire.network.stores[0].sent,1);advance(s,20);assert.equal(s.empire.network.stores[1].received,10);
 s.empire.network.stores[2].raw=115;assert.equal(transferReason(s.empire,2),'Destination full');
});
test('product development and shelf allocation enforce finite capacity and protect inventory',()=>{
 const s=state(),p=s.empire,n=p.network;assert.equal(chooseRecipe(p,0,1),false);const cash=s.money;assert.equal(developProduct(s,1),true);assert.equal(s.money,cash-2500);assert.equal(developProduct(s,1),false);assert.equal(chooseRecipe(p,0,1),true);assert.equal(allocateShelf(p,0,1,5),true);
 n.stores[0].stock[1]=3;assert.equal(allocateShelf(p,0,1,-5),false);assert.equal(allocateShelf(p,0,2,5),false);while(allocateShelf(p,0,0,5)){}assert.equal(allocateShelf(p,0,1,5),false);n.stores[0].raw=20;advance(s,30);assert.equal(n.discoveries[1],1);assert.ok(n.stores[0].stock[1]<=n.stores[0].shelves[1]);
});
test('delivery operations protect walk-in reserves and pay only when driver returns',()=>{
 const s=state(),p=s.empire,n=p.network;n.stores[2].stock[0]=9;assert.equal(dispatchDelivery(p,2,0),false);n.stores[2].stock[0]=10;assert.equal(dispatchDelivery(p,2,0),true);assert.equal(n.stores[2].stock[0],5);const reward=n.jobs[0].reward;assert.equal(tickOperations(s,0).revenue,0);n.stores[2].stock[0]=0;
 const result=advance(s,24);assert.equal(result.deliveries,1);assert.ok(result.revenue>=reward);assert.equal(n.jobs.length,0);assert.equal(advance(s,30).deliveries,0);assert.equal(n.stores[2].deliveries,1);assert.ok(upgradeFleet(s));assert.ok(expandArea(s));assert.equal(n.area,1);
});
test('employee XP follows the person and improves their specialty',()=>{
 const s=state(),p=s.empire,n=p.network;p.stores[0].manager='grower';n.staff.grower.xp=99;n.stores[0].raw=20;advance(s,6);assert.ok(n.staff.grower.xp>=100);assert.equal(staffLevel(n,'grower'),1);p.stores[0].manager='none';p.stores[1].manager='grower';assert.equal(staffLevel(n,p.stores[1].manager),1);
});
test('cosmetic choices alter no stock, cash or income multipliers',()=>{
 const s=state(),p=s.empire,rate=storeRate(p,0),cash=s.money;for(const key of ['counter','awning','plants','lighting','layout'])assert.equal(customize(p,0,key,1),true);assert.equal(customize(p,0,'layout',9),false);assert.equal(storeRate(p,0),rate);assert.equal(s.money,cash);
});
test('stories use actual products, remember relationships and have a return delay',()=>{
 const s=state(),p=s.empire,n=p.network;assert.equal(fulfillStory(s,0),false);n.stores[0].stock[0]=3;assert.equal(fulfillStory(s,0),true);assert.equal(n.stores[0].stock[0],0);assert.equal(n.stores[0].relationship,1);n.stores[0].stock[1]=2;assert.equal(storyStatus(p,0).ready,false);advance(s,45);n.stores[0].stock[1]=2;assert.equal(fulfillStory(s,0),true);assert.equal(n.stores[0].relationship,2);assert.ok(neighborhood(p,0)>=1);
});
test('grand opening tasks sequence specialty actions and cannot double claim',()=>{
 const s=state(),p=s.empire,n=p.network;assert.equal(claimOpening(s,0),false);n.stores[0].harvested=10;assert.equal(openingStatus(p,0).ready,true);const cash=s.money;claimOpening(s,0);assert.equal(s.money,cash+250);assert.equal(claimOpening(s,0),false);n.stores[0].sent=1;claimOpening(s,0);n.stores[0].relationship=1;claimOpening(s,0);assert.equal(n.stores[0].opening,3);assert.equal(claimOpening(s,0),false);
});
test('flagship requires quality, the complete journal, openings and reputation instead of cash',()=>{
 const s=state(),p=s.empire,n=p.network;assert.equal(claimFlagship(s),false);p.reputation=60;p.rewards=[true,true,true];p.stores.forEach((b,i)=>{b.projects=[true,true,false];b.loyalty=60;n.stores[i].opening=3;n.stores[i].relationship=1;});n.discoveries=[1,1,1];assert.equal(journal(s).length,31);assert.equal(flagshipStatus(s).ready,true);assert.equal(claimFlagship(s),true);assert.equal(claimFlagship(s),false);assert.equal(migrateProgression(p).network.flagship,true);
});
test('day/night changes with simulated time and major purchases record real income gains',()=>{
 const s=state(),p=s.empire;assert.equal(atmosphere(p.network).name,'Day');p.network.time=400;assert.equal(atmosphere(p.network).night,true);assert.equal(tickOperations(s,0).revenue,0);assert.equal(p.network.time,400);
 const before=storeRate(p,0);buyStore(s,0);assert.equal(p.network.stores[0].construction,6);assert.equal(p.network.stores[0].incomeGain,storeRate(p,0)-before);const upgraded=storeRate(p,0);buyProject(s,0,0);assert.equal(p.network.stores[0].incomeGain,storeRate(p,0)-upgraded);
});
