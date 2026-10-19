import test from 'node:test';
import assert from 'node:assert/strict';
import {nextSeason,weeklySpecial,specialFactor,WEEKLY_SPECIALS,DAY,HOUR,DAILY,CAREER,migrateProgression,dailyStatus,claimDaily,claimCareer,saleMultiplier,branchRate,buyStore,storeRate,storeCost,recordEvent,CONTRACTS,contractOffer,activeContract,contractTwist,contractFactor,startContract,skipContract,settleContract,useContractBoost,tickContractBoost,contractBoostFactor,contractTarget,seasonWindow,seasonStatus,claimSeason,SEASON_REWARDS} from '../src/progression.js';
const start=21000*DAY;
const fresh=()=>({money:1000000,lifetime:1000000,empire:migrateProgression(undefined,start)});
test('legacy and malformed progression fields migrate without unlocking rewards',()=>{
 const p=migrateProgression({career:Infinity,stores:[{level:-2},{level:Infinity},{level:99}],daily:{streak:'7'},event:null},start);
 assert.equal(p.career,0);assert.deepEqual(p.stores.map(s=>s.level),[0,0,10,0,0]);assert.equal(p.daily.streak,0);
 assert.deepEqual(migrateProgression(undefined,start).stores.map(s=>s.level),[0,0,0,0,0]);
});
test('daily claims are once per UTC day, cycle after day seven, and keep their place after a missed day',()=>{
 const s=fresh(), initial=s.money;
 for(let i=0;i<7;i++){assert.equal(claimDaily(s,start+i*DAY),DAILY[i]);assert.equal(claimDaily(s,start+i*DAY+1000),0)}
 assert.equal(s.money-initial,DAILY.reduce((a,b)=>a+b,0));assert.equal(s.lifetime,1000000);
 assert.equal(dailyStatus(s.empire,start+7*DAY).day,1);
 claimDaily(s,start+7*DAY);assert.equal(dailyStatus(s.empire,start+9*DAY).day,2);assert.equal(dailyStatus(s.empire,start+30*DAY).day,2);
 claimDaily(s,start+9*DAY);assert.equal(claimDaily(s,start+6*DAY),0);
});
test('clock rollback and save/reload cannot duplicate a daily claim',()=>{
 const s=fresh();claimDaily(s,start+DAY);s.empire=migrateProgression(JSON.parse(JSON.stringify(s.empire)),start);
 assert.equal(claimDaily(s,start),0);assert.equal(claimDaily(s,start+DAY+100),0);
 assert.equal(claimDaily(s,start+2*DAY),DAILY[1]);
});
test('career needs earned revenue, pays once, and applies permanent sale bonus',()=>{
 const s=fresh();s.lifetime=999;assert.equal(claimCareer(s),0);s.lifetime=1000;
 assert.equal(claimCareer(s),CAREER[0].reward);assert.equal(saleMultiplier(s.empire),1.05);
 assert.equal(claimCareer(s),0);assert.equal(s.lifetime,1000);
});
test('branches respect unlocks, cash and level caps; each upgrade improves income',()=>{
 const s=fresh();s.lifetime=0;assert.equal(buyStore(s,0),false);s.lifetime=5000;s.money=4999;assert.equal(buyStore(s,0),false);
 s.money=100000000;assert.equal(buyStore(s,0),true);assert.equal(branchRate(s.empire),2);
 for(let l=2;l<=10;l++){const before=storeRate(s.empire,0),cost=storeCost(s.empire,0),cash=s.money;assert.equal(buyStore(s,0),true);assert.ok(storeRate(s.empire,0)>before);assert.equal(s.money,cash-cost)}
 assert.equal(buyStore(s,0),false);assert.equal(s.empire.stores[1].level,0);
 const restored=migrateProgression(JSON.parse(JSON.stringify(s.empire)),start);assert.equal(branchRate(restored),branchRate(s.empire));
});
test('a contract counts only its own kind while its clock runs, then banks a boost, a trophy and a keepsake',()=>{
 const s=fresh(),p=s.empire,o=contractOffer(s,1);assert.equal(o.id,'night-market');assert.equal(o.target,60);
 recordEvent(p,'pickup',100,start);assert.equal(activeContract(p,start),null,'nothing counts before starting');
 assert.equal(startContract(s,start).id,'night-market');assert.equal(startContract(s,start),null,'one at a time');
 assert.equal(contractTwist(p,start),'traffic');assert.equal(contractFactor(p,'traffic',start),1.5);
 recordEvent(p,'online',100,start+1000);assert.equal(activeContract(p,start+1000).progress,0);
 recordEvent(p,'pickup',59,start+1000);assert.equal(settleContract(p,start+2000),null);
 recordEvent(p,'pickup',5,start+3000);const r=settleContract(p,start+3000);assert.equal(r.done.id,'night-market');
 assert.deepEqual([p.contracts.bank,p.contracts.done,p.trophies,p.rewards[0]],[1,1,1,true]);assert.equal(contractTwist(p,start+3000),'');
 assert.notEqual(contractOffer(s).id,'night-market','the next offer comes up');
});
test('a contract that runs out costs nothing, stops counting and moves on to the next offer',()=>{
 const s=fresh(),p=s.empire;startContract(s,start);
 recordEvent(p,'pickup',1,start+100);recordEvent(p,'pickup',100,start+30*60000);
 assert.equal(activeContract(p,start+30*60000).progress,1);assert.equal(contractTwist(p,start+30*60000),'');
 const r=settleContract(p,start+30*60000);assert.equal(r.expired.id,'night-market');assert.deepEqual([p.contracts.bank,p.trophies],[0,0]);
 assert.equal(activeContract(p,start+31*60000),null);
});
test('offers skip contracts the shop cannot work on yet, and another offer can be asked for',()=>{
 const s=fresh();s.productMenu={unlocked:[true,false,false]};s.empire.contracts.round=1;
 assert.equal(contractOffer(s).id,'vip-night','deliveries and edibles need their unlocks');
 s.autoDrone={owned:true};assert.equal(contractOffer(s).id,'delivery-blitz');
 assert.equal(skipContract(s,start),true);s.productMenu.unlocked[2]=true;assert.equal(contractOffer(s).id,'edibles-weekend');
 startContract(s,start);assert.equal(skipContract(s,start),false,'no skipping a running contract');
 assert.equal(contractTarget(CONTRACTS[4],1e9),5,'big spender counts never grow');assert.ok(contractTarget(CONTRACTS[0],64)>contractTarget(CONTRACTS[0],1));
 assert.ok(contractTarget(CONTRACTS[0],1e12)<=CONTRACTS[0].base*CONTRACTS[0].cap);
 assert.equal(contractTarget(CONTRACTS[0],1,20),360,'with a pace it asks for 60% of what the shop makes in the time');assert.equal(contractTarget(CONTRACTS[0],1,1),60,'never below the base');
 assert.equal(contractOffer(s,1,d=>d.kind==='edible'?10:0).target,360);
});
test('a banked boost doubles sales for ten minutes of play and stacks time, not size',()=>{
 const p=fresh().empire;assert.equal(useContractBoost(p),false);p.contracts.bank=2;
 assert.equal(useContractBoost(p),true);assert.equal(contractBoostFactor(p),2);useContractBoost(p);assert.equal(p.contracts.boost,1200);assert.equal(contractBoostFactor(p),2);
 tickContractBoost(p,1199);assert.equal(contractBoostFactor(p),2);tickContractBoost(p,5);assert.equal(contractBoostFactor(p),1);assert.equal(p.contracts.bank,0);
});
test('contracts survive a save, and old saves with an hourly event load clean',()=>{
 const s=fresh();startContract(s,start);recordEvent(s.empire,'pickup',7,start);s.empire.contracts.bank=3;
 const back=migrateProgression(JSON.parse(JSON.stringify(s.empire)),start);
 assert.deepEqual([activeContract(back,start).progress,back.contracts.bank],[7,3]);
 const old=migrateProgression({event:{slot:5,joined:true,progress:12,claimed:false},rewards:[true,false,true],trophies:4},start);
 assert.equal(old.event,undefined);assert.deepEqual(old.contracts,{round:0,done:0,bank:0,boost:0,active:null});assert.deepEqual([old.rewards,old.trophies],[[true,false,true],4]);
 assert.equal(migrateProgression({contracts:{active:{id:'nope'},bank:1e9,boost:-5}},start).contracts.active,null);
 assert.equal(migrateProgression({contracts:{bank:1e9}},start).contracts.bank,9);
});
test('map selection is limited to owned stores and never changes economic progress',async()=>{
 const {selectedStore,selectStore}=await import('../src/progression.js');const s=fresh();
 assert.equal(selectedStore(s.empire),0);assert.equal(selectStore(s.empire,1),false);assert.equal(selectStore(s.empire,9),false);
 buyStore(s,0);const money=s.money,rate=branchRate(s.empire),level=s.empire.stores[0].level;
 assert.equal(selectStore(s.empire,1),true);assert.equal(selectedStore(s.empire),1);
 const loaded=migrateProgression(JSON.parse(JSON.stringify(s.empire)),start);assert.equal(selectedStore(loaded),1);
 assert.equal(selectStore(s.empire,0),true);assert.equal(s.money,money);assert.equal(branchRate(s.empire),rate);assert.equal(s.empire.stores[0].level,level);
 assert.equal(selectedStore(migrateProgression({activeStore:3},start)),0);
});

test('store projects enforce level, funds and ownership, stack locally and survive saves',async()=>{
 const {buyProject,projectCost,nextStoreRate}=await import('../src/progression.js');
 const s=fresh();assert.equal(buyProject(s,0,0),false);assert.equal(buyProject(s,9,0),false);
 s.empire.stores[0].level=2;s.money=projectCost(0,0)-1;assert.equal(buyProject(s,0,0),false);
 s.money=1000000;const initial=storeRate(s.empire,0),cash=s.money;
 assert.equal(buyProject(s,0,0),true);assert.equal(s.money,cash-projectCost(0,0));
 assert.equal(storeRate(s.empire,0),initial*1.2);assert.equal(buyProject(s,0,0),false);
 assert.equal(buyProject(s,0,1),false);assert.equal(storeRate(s.empire,1),0);
 s.empire.stores[0].level=7;assert.equal(buyProject(s,0,1),true);assert.equal(buyProject(s,0,2),true);
 const restored=migrateProgression(JSON.parse(JSON.stringify(s.empire)),start);
 assert.deepEqual(restored.stores[0].projects,[true,true,true]);assert.equal(branchRate(restored),branchRate(s.empire));
 const preview=nextStoreRate(restored,0);restored.stores[0].level++;assert.equal(storeRate(restored,0),preview);
 assert.equal(s.lifetime,1000000);assert.deepEqual(migrateProgression({stores:[{level:7}]},start).stores[0].projects,[false,false,false]);
});

test('specialties, featured products and unique managers change only eligible branches',async()=>{
 const {setFeatured,assignManager,managementMultiplier}=await import('../src/progression.js');const s=fresh(),p=s.empire;
 assert.equal(setFeatured(p,0,'exclusive'),false);p.stores.forEach(b=>b.level=2);
 assert.equal(setFeatured(p,0,'exclusive'),true);const base=storeRate(p,0);assert.equal(assignManager(p,0,'grower'),true);assert.ok(storeRate(p,0)>base);
 assert.equal(assignManager(p,1,'grower'),true);assert.equal(p.stores[0].manager,'none');assert.equal(p.stores[1].manager,'grower');
 assert.equal(setFeatured(p,1,'boutique'),true);assert.equal(managementMultiplier(p,1),1.4);assert.equal(setFeatured(p,1,'fake'),false);
 const saved=migrateProgression(JSON.parse(JSON.stringify(p)));assert.equal(saved.stores[1].manager,'grower');assert.equal(saved.stores[1].featured,'boutique');
 assert.doesNotThrow(()=>migrateProgression({stores:{0:{manager:'host'}}}));
 const duplicate=migrateProgression({stores:[{manager:'host'},{manager:'host'}]});assert.equal(duplicate.stores[1].manager,'none');
});
test('customer preferences reward matches, unlock VIPs and honor service time',async()=>{
 const {customerType,satisfyCustomer,tickBranches}=await import('../src/progression.js');const p=fresh().empire;
 assert.equal(customerType(20,2),'regular');assert.equal(customerType(60,6),'vip');assert.equal(customerType(59,6),'regular');
 for(let i=0;i<20;i++)assert.equal(satisfyCustomer(p,-1,'regular','everyday',50),1.15);
 assert.equal(p.reputation,20);assert.equal(satisfyCustomer(p,-1,'regular','boutique',5),1);assert.equal(p.reputation,19);
 assert.equal(satisfyCustomer(p,-1,'hurried','boutique',21),1);assert.equal(satisfyCustomer(p,-1,'hurried','everyday',20),1.15);
 p.reputation=59;assert.ok(Math.abs(satisfyCustomer(p,-1,'regular','everyday',60)-1.35)<1e-9);
 const b=p.stores[0];b.level=7;b.manager='host';tickBranches(p,12);assert.equal(b.served,1);assert.equal(b.loyalty,2);
 const saved=migrateProgression(JSON.parse(JSON.stringify(p)));assert.equal(saved.reputation,60);assert.equal(saved.stores[0].loyalty,2);
});
test('bulk orders consume packing stock, pay once per dispatch and advance delivery goals',async()=>{
 const {dispatchBulk,bulkReward,goalStatus}=await import('../src/progression.js');const s=fresh();s.stock=[0,0,0,60,0];s.onlineCompleted=0;
 assert.equal(dispatchBulk(s,start),0);s.empire.stores[2].level=2;s.empire.stores[2].manager='dispatcher';const reward=bulkReward(s.empire),cash=s.money;
 assert.equal(dispatchBulk(s,start),reward);assert.equal(s.money,cash+reward);assert.equal(s.stock[3],30);assert.equal(s.onlineCompleted,1);
 dispatchBulk(s,start);assert.equal(s.stock[3],0);assert.equal(dispatchBulk(s,start),0);assert.equal(s.empire.counters.online,2);
});
test('goals rotate on claim, do not reuse prior progress or count rewards as revenue',async()=>{
 const {recordGoal,goalStatus,claimGoal,settleGoals}=await import('../src/progression.js');const s=fresh(),p=s.empire;
 settleGoals(s);
 assert.equal(claimGoal(s,0),0);recordGoal(p,'pickup',10);const money=s.money;assert.equal(claimGoal(s,0),150);assert.equal(s.money,money+150);assert.equal(claimGoal(s,0),0);assert.equal(goalStatus(p,0).progress,0);
 recordGoal(p,'revenue',500);claimGoal(s,2);assert.equal(goalStatus(p,2).kind,'revenue');assert.equal(goalStatus(p,2).progress,0);assert.equal(p.counters.revenue,500);
 const restored=migrateProgression(JSON.parse(JSON.stringify(p)));assert.deepEqual(restored.goals,p.goals);assert.equal(restored.goalsCompleted,2);
});
test('a new shop gets goals it can work on, and the growth slot widens as the shop does',async()=>{
 const {recordGoal,goalStatus,claimGoal,settleGoals}=await import('../src/progression.js');const s=fresh(),p=s.empire;
 // Old saves kept a delivery goal in slot two; with no pad and no progress it becomes an upgrade goal.
 assert.equal(goalStatus(p,1).kind,'online');assert.ok(settleGoals(s));assert.equal(goalStatus(p,1).kind,'upgrade');assert.equal(goalStatus(p,1).target,2);
 recordGoal(p,'upgrade',2);s.autoDrone={owned:true};p.stores[0].level=1;assert.ok(claimGoal(s,1)>0);
 assert.equal(goalStatus(p,1).kind,'online');recordGoal(p,'online',goalStatus(p,1).target);claimGoal(s,1);assert.equal(goalStatus(p,1).kind,'invest');
 buyStore(s,0);assert.equal(goalStatus(p,1).progress,1);
 // A delivery goal with progress is never swapped away, even if it could not be started today.
 const legacy=migrateProgression({goals:[{},{round:0,start:0},{}],counters:{online:1}});assert.equal(legacy.goals[1].kind,'online');
 const t={money:0,empire:legacy};assert.equal(settleGoals(t),false);assert.equal(goalStatus(legacy,1).progress,1);
 // The third slot of the pickup cycle is a big spender.
 for(let k=0;k<2;k++){recordGoal(p,'pickup',1e6);claimGoal(s,0);}assert.equal(goalStatus(p,0).kind,'spender');assert.match(goalStatus(p,0).hint,/gold tag/);
});
test('every third goal closes a shift and pays its bonus once',async()=>{
 const {recordGoal,claimGoal,shiftStatus,settleGoals}=await import('../src/progression.js');const s=fresh(),p=s.empire;settleGoals(s);
 assert.deepEqual([shiftStatus(p).number,shiftStatus(p).done],[1,0]);
 recordGoal(p,'pickup',1e6);recordGoal(p,'revenue',1e6);recordGoal(p,'upgrade',100);
 assert.equal(claimGoal(s,0),150);assert.equal(claimGoal(s,1),200);assert.equal(shiftStatus(p).done,2);
 assert.equal(claimGoal(s,2),200+shiftStatus(p).bonus);assert.deepEqual([shiftStatus(p).number,shiftStatus(p).done],[2,0]);
 recordGoal(p,'pickup',1e6);assert.equal(claimGoal(s,0),150);
});
test('multi-day events follow the calendar, climb a three-step ladder and award a lasting badge',()=>{
 assert.equal(seasonWindow(Date.UTC(2026,3,20)).name,'4/20 Week');assert.equal(seasonWindow(Date.UTC(2026,9,16)).name,'Harvest Season');assert.equal(seasonWindow(Date.UTC(2026,9,31,23)).name,'Spooky Season');
 assert.equal(seasonWindow(Date.UTC(2026,10,4)),null,'no ladder between seasons');assert.equal(seasonStatus(migrateProgression({},Date.UTC(2026,10,4)),Date.UTC(2026,10,4)),null);
 assert.equal(nextSeason(Date.UTC(2026,10,4)).name,'Holiday Rush');assert.equal(nextSeason(Date.UTC(2026,11,31,12)).name,'4/20 Week');
 const now=Date.UTC(2026,3,18),s={money:0,lifetime:0,empire:migrateProgression({counters:{pickup:500}},now)};
 let e=seasonStatus(s.empire,now);assert.equal(e.progress,0);assert.deepEqual(e.targets,[300,1200,4000]);assert.equal(claimSeason(s,now),0);
 recordEvent(s.empire,'pickup',4000,now);e=seasonStatus(s.empire,now);assert.equal(e.reached,3);
 assert.equal(claimSeason(s,now),SEASON_REWARDS[0]);assert.equal(claimSeason(s,now),SEASON_REWARDS[1]);assert.equal(claimSeason(s,now),SEASON_REWARDS[2]);assert.equal(claimSeason(s,now),0);
 assert.deepEqual(s.empire.badges,['420']);assert.equal(s.empire.trophies,3);
 const saved=migrateProgression(JSON.parse(JSON.stringify(s.empire)),now);assert.equal(saved.season.claimed,3);assert.deepEqual(saved.badges,['420']);
 assert.deepEqual(migrateProgression({badges:['ok','BAD!',7,'ok'],season:{id:'x y'}}).badges,['ok']);assert.equal(migrateProgression({season:{id:'x y'}}).season,null);
 const later=Date.UTC(2026,9,26);e=seasonStatus(s.empire,later);assert.equal(e.name,'Spooky Season');assert.equal(e.claimed,0);assert.equal(e.progress,0);
});

test('the weekly special rotates through the six iOS specials with the app\'s week formula',()=>{
 const week=d=>Math.floor((d/DAY+4)/7);const seen=new Set();for(let k=0;k<6;k++)seen.add(weeklySpecial(Date.UTC(2026,0,1)+k*7*DAY).id);assert.equal(seen.size,6);
 const t=Date.UTC(2026,9,16);assert.equal(weeklySpecial(t),WEEKLY_SPECIALS[week(t)%6]);
 const s=weeklySpecial(t);assert.equal(specialFactor(s.kind,t),s.factor);assert.equal(specialFactor('nothing',t),1);
});
import {settleStars,starStatus,starCount,branchOpenable,starMultiplier,STAR_GOALS,STAR_BONUS} from '../src/progression.js';
test('branch stars latch, credit old saves, open the next branch and add a lasting bonus',()=>{
 const s=fresh(),p=s.empire;s.lifetime=1e9;s.money=1e12;
 assert.equal(branchOpenable(p,1),false);assert.equal(buyStore(s,0),true);assert.equal(buyStore(s,1),false);
 p.stores[0].served=STAR_GOALS[0].target[0];assert.deepEqual(settleStars(p),[{store:0,goal:0}]);assert.deepEqual(settleStars(p),[]);
 p.stores[0].served=0;assert.equal(starCount(p,0),1);assert.equal(starStatus(p,0)[0].earned,true);
 while(p.stores[0].level<10)buyStore(s,0);p.network.stores[0].relationship=3;
 const before=storeRate(p,0);assert.equal(settleStars(p).length,2);assert.equal(starCount(p,0),3);
 assert.equal(starMultiplier(p),1+STAR_BONUS);assert.ok(Math.abs(storeRate(p,0)/before-(1+STAR_BONUS))<1e-9);
 assert.equal(buyStore(s,1),true);assert.equal(branchOpenable(p,2),false);
 // An old save with no stars field is credited from its stores; an open branch stays open even unfinished.
 const old=JSON.parse(JSON.stringify(p));delete old.stars;old.stores[0].served=STAR_GOALS[0].target[0];old.stores[2]={level:3};
 const restored=migrateProgression(old,start);assert.equal(starCount(restored,0),3);assert.equal(branchOpenable(restored,2),true);
 assert.deepEqual(migrateProgression({stars:[9,-1,'x']},start).stars,[0,0,0,0,0]);
});
