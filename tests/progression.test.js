import test from 'node:test';
import assert from 'node:assert/strict';
import {DAY,HOUR,DAILY,CAREER,migrateProgression,dailyStatus,claimDaily,claimCareer,saleMultiplier,branchRate,buyStore,storeRate,storeCost,eventStatus,joinEvent,recordEvent,claimEvent} from '../src/progression.js';
const start=21000*DAY;
const fresh=()=>({money:1000000,lifetime:1000000,empire:migrateProgression(undefined,start)});
test('legacy and malformed progression fields migrate without unlocking rewards',()=>{
 const p=migrateProgression({career:Infinity,stores:[{level:-2},{level:Infinity},{level:99}],daily:{streak:'7'},event:null},start);
 assert.equal(p.career,0);assert.deepEqual(p.stores.map(s=>s.level),[0,0,10,0,0]);assert.equal(p.daily.streak,0);
 assert.deepEqual(migrateProgression(undefined,start).stores.map(s=>s.level),[0,0,0,0,0]);
});
test('daily claims are once per UTC day, cycle after day seven, and hold their place through a missed day',()=>{
 const s=fresh(), initial=s.money;
 for(let i=0;i<7;i++){assert.equal(claimDaily(s,start+i*DAY),DAILY[i]);assert.equal(claimDaily(s,start+i*DAY+1000),0)}
 assert.equal(s.money-initial,DAILY.reduce((a,b)=>a+b,0));assert.equal(s.lifetime,1000000);
 assert.equal(dailyStatus(s.empire,start+7*DAY).day,1,'the track cycles back to day one after day seven');
 // Being away is not a mistake: the day after a gap is the next day on the track, not day one again.
 claimDaily(s,start+7*DAY);assert.equal(dailyStatus(s.empire,start+9*DAY).day,2,'a missed day costs that day, not the streak');
 claimDaily(s,start+9*DAY);assert.equal(claimDaily(s,start+6*DAY),0,'a clock rollback still cannot claim again');
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
test('events count only matching actions after joining, and completed rewards survive expiry until rollover',()=>{
 const s=fresh(),p=s.empire,e=eventStatus(p,start);
 recordEvent(p,e.kind,100,start);assert.equal(p.event.progress,0);assert.equal(joinEvent(p,start),true);
 recordEvent(p,e.kind==='pickup'?'online':'pickup',100,start);assert.equal(p.event.progress,0);
 recordEvent(p,e.kind,e.goal,start+1000);assert.equal(eventStatus(p,start+21*60000).progress,e.goal);
 const cash=s.money;assert.equal(claimEvent(s,start+21*60000),e.reward);assert.equal(s.money,cash+e.reward);assert.equal(claimEvent(s,start+22*60000),0);
 assert.equal(p.trophies,1);assert.equal(eventStatus(p,start+HOUR).joined,false);
});
test('events take progress for their whole hour, cannot be rejoined in that hour, and reset on the next',()=>{
 const s=fresh(),p=s.empire,e=eventStatus(p,start);joinEvent(p,start);
 recordEvent(p,e.kind,1,start+100);assert.equal(p.event.progress,1);
 // Turning up late costs the attempt, not the chance: the window is the hour, not its first twenty minutes.
 recordEvent(p,e.kind,e.goal+50,start+45*60000);assert.equal(p.event.progress,e.goal,'progress stops at the goal');
 assert.equal(joinEvent(p,start+45*60000),false,'already joined this hour');
 assert.ok(claimEvent(s,start+50*60000)>0,'a finished event pays out within its hour');
 assert.equal(claimEvent(s,start+55*60000),0,'and pays only once');
 assert.equal(joinEvent(p,start+HOUR),true);assert.equal(p.event.progress,0);
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
 dispatchBulk(s,start);assert.equal(s.stock[3],0);assert.equal(dispatchBulk(s,start),0);assert.equal(goalStatus(s.empire,1).progress,2);
});
test('goals rotate on claim, do not reuse prior progress or count rewards as revenue',async()=>{
 const {recordGoal,goalStatus,claimGoal}=await import('../src/progression.js');const s=fresh(),p=s.empire;
 assert.equal(claimGoal(s,0),0);recordGoal(p,'pickup',10);const money=s.money;assert.equal(claimGoal(s,0),150);assert.equal(s.money,money+150);assert.equal(claimGoal(s,0),0);assert.equal(goalStatus(p,0).progress,0);
 p.stores[0].level=1;recordGoal(p,'revenue',500);claimGoal(s,2);assert.equal(goalStatus(p,2).kind,'invest');assert.equal(p.counters.revenue,500);
 buyStore(s,0);assert.equal(goalStatus(p,2).progress,1);claimGoal(s,2);assert.equal(goalStatus(p,2).kind,'revenue');assert.equal(goalStatus(p,2).progress,0);
 const restored=migrateProgression(JSON.parse(JSON.stringify(p)));assert.deepEqual(restored.goals,p.goals);assert.equal(restored.goalsCompleted,3);
});
test('event scene rewards persist without duplicate cash claims',()=>{
 const s=fresh(),e=eventStatus(s.empire,start);joinEvent(s.empire,start);recordEvent(s.empire,e.kind,e.goal,start);claimEvent(s,start);
 assert.equal(s.empire.rewards[e.slot%3],true);assert.equal(claimEvent(s,start),0);assert.equal(migrateProgression(s.empire,start).rewards[e.slot%3],true);
});
