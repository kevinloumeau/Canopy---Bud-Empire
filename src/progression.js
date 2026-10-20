import {migrateOperations,staffLevel,REGULARS} from './operations.js';
const REGULAR_NAMES=REGULARS.map(r=>r.name);
// Persistent empire systems. Rewards never count as earned revenue.
// Counts and money alike are abbreviated past a thousand — 15.1K, 2.4M — everywhere the app shows a number.
export function abbr(n){
  n=Math.max(0,Number.isFinite(n)?n:0);if(n<1000)return String(Math.floor(n));
  for(const [suffix,size] of [['T',1e12],['B',1e9],['M',1e6],['K',1e3]])if(n>=size){const v=n/size;return v.toFixed(v>=100?0:v>=10?1:2)+suffix;}
  return String(Math.floor(n));
}
export const DAY = 86400000;
export const HOUR = 3600000;
export const DAILY = [150, 250, 400, 600, 900, 1300, 2500];
export const STORES = [
  {name:'Riverside', price:5000, goal:5000, rate:2, detail:'A neighborhood shop with a steady local following.'},
  {name:'Old Town', price:30000, goal:50000, rate:9, detail:'A boutique destination for the historic district.'},
  {name:'City Center', price:150000, goal:250000, rate:35, detail:'Your flagship in the heart of the city.'},
  {name:'Desert Oasis', price:750000, goal:1200000, rate:120, detail:'A destination courtyard shop on the desert highway.'},
  {name:'Alpine', price:4000000, goal:6000000, rate:400, detail:'A mountain lodge retreat among the pines.'}
];
// Optional investments keep branch levels and special projects independent.
export const STORE_PROJECTS = [
  ['Riverwalk showcases', 'Cedar checkout', 'Pollinator planters'],
  ['Brass vitrines', 'Boutique checkout', 'Heritage flower boxes'],
  ['Flagship showcases', 'Concierge checkout', 'Atrium planting'],
  ['Courtyard showcases', 'Adobe checkout', 'Cactus garden'],
  ['Timber showcases', 'Lodge checkout', 'Waterfall garden']
];
export const PROJECT_LEVELS = [2,4,7];
export const PROJECT_BONUSES = [.2,.3,.5];
export function projectCost(i,j) {return Math.round(STORES[i].price*[1.5,4,12][j]);}
export function projectBonus(p,i) {return (p.stores[i].projects||[]).reduce((sum,owned,j)=>sum+(owned?PROJECT_BONUSES[j]:0),0);}
export function buyProject(state,i,j) {
  if(!STORES[i]||!Number.isInteger(j)||j<0||j>2)return false;
  const store=state.empire.stores[i],cost=projectCost(i,j);
  if(store.level<PROJECT_LEVELS[j]||store.projects[j]||state.money<cost)return false;
  const before=storeRate(state.empire,i);state.money-=cost;store.projects[j]=true;state.empire.network.stores[i].construction=6;state.empire.network.stores[i].incomeGain=storeRate(state.empire,i)-before;recordGoal(state.empire,'invest',1);return true;
}
// Branch stars: three goals per branch. Earned stars are kept for good (they survive reopening, like badges). All three
// add a permanent sales bonus everywhere and open the next branch. Targets live in this table so they are easy to retune.
export const STAR_GOALS=[
  {kind:'served',target:[250,350,500,650,800]},
  {kind:'level',target:[10,10,10,10,10]},
  {kind:'story',target:[3,3,3,3,3]}
];
export const STAR_BONUS=.1;
function starValue(p,i,kind){
  if(kind==='served')return p.stores[i].served;
  if(kind==='level')return p.stores[i].level;
  return p.network?.stores?.[i]?.relationship||0;
}
export const starCount=(p,i)=>[0,1,2].filter(k=>(p.stars?.[i]||0)&1<<k).length;
export const branchFinished=(p,i)=>starCount(p,i)===3;
export const finishedBranches=p=>STORES.filter((_,i)=>branchFinished(p,i)).length;
export function starMultiplier(p){return 1+finishedBranches(p)*STAR_BONUS;}
// A branch opens once the one before it is finished. A branch already open stays open (older saves keep their stores).
export function branchOpenable(p,i){return i===0||p.stores[i].level>0||branchFinished(p,i-1);}
export function starStatus(p,i){
  const name=REGULAR_NAMES[i];
  return STAR_GOALS.map((g,k)=>{const target=g.target[i],earned=!!((p.stars?.[i]||0)&1<<k),value=Math.min(target,starValue(p,i,g.kind));
    const title=g.kind==='served'?'Serve '+abbr(target)+' customers':g.kind==='level'?'Reach level '+target:'Finish '+name+'’s story';
    return {kind:g.kind,target,progress:earned?target:value,earned,title};});
}
// Latches every goal met right now; returns [{store,goal}] for stars earned by this call so the UI can celebrate them.
export function settleStars(p){
  const earned=[];
  STORES.forEach((_,i)=>{if(!p.stores[i].level&&!p.stars[i])return;STAR_GOALS.forEach((g,k)=>{if(p.stars[i]&1<<k)return;if(starValue(p,i,g.kind)>=g.target[i]){p.stars[i]|=1<<k;earned.push({store:i,goal:k});}});});
  return earned;
}
export function nextStoreRate(p,i) {
  if(p.stores[i].level>=10)return storeRate(p,i);
  const copy={...p,stores:p.stores.map((s,j)=>j===i?{...s,level:s.level+1}:s)};
  return storeRate(copy,i);
}
export const CAREER = [
  {name:'Local favorite', goal:1000, reward:300},
  {name:'Growing roots', goal:10000, reward:1500},
  {name:'Neighborhood name', goal:50000, reward:5000},
  {name:'Across the city', goal:250000, reward:20000},
  {name:'Regional favorite', goal:1000000, reward:75000},
  {name:'Bud empire', goal:5000000, reward:300000}
];
const num = (v, fallback=0, max=Number.MAX_SAFE_INTEGER) => Number.isFinite(v) ? Math.min(max, Math.max(0, Math.floor(v))) : fallback;
export function migrateProgression(raw, now=Date.now()) {
  const r=raw && typeof raw==='object' ? raw : {};
  const clock=num(r.clock, now);
  const p={network:migrateOperations(r.network),version:4, retailBoost:Math.max(1,num(r.retailBoost,1,64)), prestige:num(r.prestige,0,999), ...prestigeShares(r), clock, activeStore:num(r.activeStore,0,STORES.length), career:num(r.career,0,CAREER.length), daily:{
    day:num(r.daily?.day,0), streak:num(r.daily?.streak,0,7)
  }, stores:STORES.map((_,i)=>({level:num(r.stores?.[i]?.level,0,10),projects:[0,1,2].map(j=>r.stores?.[i]?.projects?.[j]===true), manager:MANAGERS.some(m=>m.id===r.stores?.[i]?.manager)&&!(Array.isArray(r.stores)?r.stores:[]).slice(0,i).some(s=>s?.manager===r.stores?.[i]?.manager)?r.stores[i].manager:'none', featured:PRODUCTS.includes(r.stores?.[i]?.featured)?r.stores[i].featured:'everyday', loyalty:num(r.stores?.[i]?.loyalty,0,1000), served:num(r.stores?.[i]?.served), serviceClock:num(r.stores?.[i]?.serviceClock,0,11)})),
  contracts:migrateContracts(r.contracts), season:migrateSeason(r.season), badges:(Array.isArray(r.badges)?r.badges:[]).filter(b=>typeof b==='string'&&BADGE_ID.test(b)).filter((b,i,a)=>a.indexOf(b)===i).slice(0,200),
  trophies:num(r.trophies), rewards:[0,1,2].map(i=>r.rewards?.[i]===true), reputation:num(r.reputation,0,1000), counters:Object.fromEntries(GOAL_KINDS.map(k=>[k,num(r.counters?.[k])])), goals:[0,1,2].map(i=>({round:num(r.goals?.[i]?.round),start:num(r.goals?.[i]?.start),kind:GOAL_KINDS.includes(r.goals?.[i]?.kind)?r.goals[i].kind:legacyGoalKind(i,num(r.goals?.[i]?.round))})), goalsCompleted:num(r.goalsCompleted), returnReport:r.returnReport&&Array.isArray(r.returnReport.earnings)?{seconds:num(r.returnReport.seconds),earnings:[...Array(STORES.length+1)].map((_,i)=>num(r.returnReport.earnings[i])),goals:num(r.returnReport.goals,0,3)}:null,
  stars:STORES.map((_,i)=>{const v=r.stars?.[i];return Number.isInteger(v)&&v>=0&&v<=7?v:0;})};
  // Saves from before stars are credited with every goal they already meet.
  settleStars(p);return p;
}
export function selectedStore(p) {const i=p.activeStore;return Number.isInteger(i)&&i>0&&i<=STORES.length&&p.stores[i-1].level>0?i:0;}
export function selectStore(p,i) {if(!Number.isInteger(i)||i<0||i>STORES.length||(i>0&&!p.stores[i-1].level))return false;p.activeStore=i;return true;}
export function time(p, now=Date.now()) {p.clock=Math.max(p.clock,now);return p.clock;}
// Fixed rewards scale with current income (scale >= 1) so they stay meaningful after the first hour.
export function scaledReward(base,scale=1){return Math.round(base*Math.max(1,Number.isFinite(scale)?scale:1));}
export function dailyStatus(p, now=Date.now(), scale=1) {
  const today=Math.floor(time(p,now)/DAY), available=today>p.daily.day;
  // A missed day keeps the player's place on the track instead of sending them back to Day 1.
  const next=p.daily.streak%7+1;
  const day=available?next:Math.max(1,p.daily.streak);
  return {available,day,reward:scaledReward(DAILY[day-1],scale),remaining:(today+1)*DAY-p.clock};
}
export function claimDaily(state, now=Date.now(), scale=1) {
  const p=state.empire, d=dailyStatus(p,now,scale);if(!d.available)return 0;
  p.daily={day:Math.floor(p.clock/DAY),streak:d.day};state.money+=d.reward;return d.reward;
}
export function saleMultiplier(p) {return (1+p.career*.05)*(1+(p.shares||0)*SHARE_BONUS)*starMultiplier(p);}
// Reopening pays in shares: each is worth +5% base sales, and the all-time total grows with the square root of
// all-time revenue, so a longer run earns more of them. Saves from the flat +20%-per-rank system convert at four
// shares per rank (the same bonus) and are credited with the revenue those ranks required.
export const SHARE_BONUS=.05, SHARE_BASE=10000000;
export function sharesFor(revenue){return revenue>=SHARE_BASE?Math.floor(10*Math.sqrt(revenue/SHARE_BASE)+1e-9):0;}
function prestigeShares(r){
  const rank=num(r.prestige,0,999);
  if(Number.isFinite(r.shares))return {shares:num(r.shares,0,1e6),lifetimeAll:num(r.lifetimeAll)};
  let past=0;for(let k=0;k<Math.min(rank,19);k++)past+=SHARE_BASE*3**k;
  return {shares:Math.min(rank,19)*4,lifetimeAll:past};
}
export function claimCareer(state) {
  const m=CAREER[state.empire.career];if(!m || state.lifetime<m.goal)return 0;
  state.empire.career++;state.money+=m.reward;return m.reward;
}
export function storeCost(p,i) {return Math.round(STORES[i].price*Math.pow(1.75,p.stores[i].level));}
// p.retailBoost mirrors the main shop's retail tier (set by main.js) so branches keep pace with tiered baskets; it defaults to 1.
export function storeRate(p,i) {const l=p.stores[i].level;return l?STORES[i].rate*l*(1+(l-1)*.15)*saleMultiplier(p)*(1+projectBonus(p,i))*managementMultiplier(p,i)*Math.max(1,p.retailBoost||1):0;}
export function branchRate(p) {return STORES.reduce((sum,_,i)=>sum+storeRate(p,i),0);}
export function buyStore(state,i) {
  if(!STORES[i])return false;
  const p=state.empire, cost=storeCost(p,i);
  if(p.stores[i].level>=10 || state.lifetime<STORES[i].goal || !branchOpenable(p,i) || state.money<cost)return false;
  const before=storeRate(p,i);state.money-=cost;p.stores[i].level++;p.network.stores[i].construction=6;p.network.stores[i].incomeGain=storeRate(p,i)-before;recordGoal(p,'invest',1);return true;
}
// Contracts replace the old hourly events: a 30 to 60 minute goal with a twist rule that changes how the shop plays while
// it runs (faster walk-ins, a door full of VIPs, half the line asking for edibles). The player starts one when they
// like; the clock is real time, so it keeps running while paused or away, and offline earnings never count. Finishing
// banks a boost (2x sales for 10 minutes) that the player fires whenever they want, plus a trophy; the first three also
// leave a keepsake on every branch. Running out of time costs nothing and the next offer comes up.
export const CONTRACTS=[
  {id:'night-market',name:'Night market',kind:'pickup',base:60,cap:12,minutes:30,twist:'traffic',twistCopy:'Walk-ins arrive 50% faster',goalCopy:n=>'Serve '+abbr(n)+' customers',keepsake:0},
  {id:'delivery-blitz',name:'Delivery blitz',kind:'online',base:8,cap:8,minutes:45,twist:'online',twistCopy:'Deliveries pay double, walk-ins come 30% slower',goalCopy:n=>'Send '+abbr(n)+' deliveries',keepsake:1,needs:'online'},
  {id:'edibles-weekend',name:'Edibles weekend',kind:'edible',base:60,cap:10,minutes:60,twist:'edibles',twistCopy:'Half the door wants edibles',goalCopy:n=>'Sell '+abbr(n)+' edibles',keepsake:2,needs:'edibles'},
  {id:'vip-night',name:'VIP night',kind:'vip',base:10,cap:6,minutes:45,twist:'vip',twistCopy:'Every third guest is a VIP',goalCopy:n=>'Serve '+abbr(n)+' VIPs within 15 s'},
  {id:'high-rollers',name:'High rollers',kind:'spender',base:5,cap:1,minutes:30,twist:'spender',twistCopy:'A big spender walks in every minute',goalCopy:n=>'Welcome '+n+' big spenders'},
  {id:'preroll-happy-hour',name:'Pre-roll happy hour',kind:'preroll',base:80,cap:10,minutes:30,twist:'prerolls',twistCopy:'Half the door wants pre-rolls, at 20% off',goalCopy:n=>'Sell '+abbr(n)+' pre-rolls',needs:'prerolls'}
];
export const CONTRACT_BOOST_SECONDS=600, CONTRACT_BANK_MAX=9;
const CONTRACT_ID=new Map(CONTRACTS.map((c,i)=>[c.id,i]));
function migrateContracts(r){
  const c=r&&typeof r==='object'?r:{},a=c.active&&typeof c.active==='object'&&CONTRACT_ID.has(c.active.id)?c.active:null;
  return {round:num(c.round),done:num(c.done),bank:num(c.bank,0,CONTRACT_BANK_MAX),boost:Math.min(CONTRACT_BOOST_SECONDS*CONTRACT_BANK_MAX,Math.max(0,Number.isFinite(c.boost)?c.boost:0)),
    active:a?{id:a.id,start:num(a.start),end:num(a.end),target:Math.max(1,num(a.target,1)),progress:num(a.progress)}:null};
}
// What the shop can work on: deliveries need the drone or Old Town's bulk desk, the type contracts need that type stocked.
function contractReady(def,state){
  if(def.needs==='online')return !!(state.pickupWindow?.owned||state.autoDrone?.owned||state.empire.stores[2].level>=2);
  if(def.needs==='edibles')return state.productMenu?.unlocked?.[2]===true;
  if(def.needs==='prerolls')return state.productMenu?.unlocked?.[1]===true;
  return true;
}
// With the shop's current pace for the contract's kind (per minute, from main.js), the target is 60% of what that pace
// makes in the time, so the twist has to be played into; without one (deliveries, big spenders) it grows with the log of
// income as shift goals do, capped. Never below the base.
export const CONTRACT_PACE_SHARE=.6;
export function contractTarget(def,scale=1,pace=0){
  if(Number.isFinite(pace)&&pace>0)return Math.max(def.base,Math.round(pace*def.minutes*CONTRACT_PACE_SHARE));
  const growth=1+Math.log2(Math.max(1,Number.isFinite(scale)?scale:1));return Math.max(1,Math.round(def.base*Math.min(def.cap,growth)));
}
export function contractOffer(state,scale=1,pace){
  const round=state.empire.contracts.round;
  for(let k=0;k<CONTRACTS.length;k++){const i=(round+k)%CONTRACTS.length,def=CONTRACTS[i];if(contractReady(def,state)){const target=contractTarget(def,scale,pace?pace(def):0);return {...def,index:i,target,goal:def.goalCopy(target)};}}
  return null;
}
export function activeContract(p,now=Date.now()){
  const a=p.contracts.active;if(!a)return null;const i=CONTRACT_ID.get(a.id),def=CONTRACTS[i];
  return {...def,index:i,target:a.target,progress:Math.min(a.target,a.progress),goal:def.goalCopy(a.target),remaining:Math.max(0,a.end-time(p,now)),open:time(p,now)<a.end};
}
// The rule in force right now, for main.js to bend the shop with ('traffic', 'vip', 'edibles', ...), or ''.
export function contractTwist(p,now=Date.now()){const c=activeContract(p,now);return c&&c.open?c.twist:'';}
export function contractFactor(p,kind,now=Date.now()){
  const t=contractTwist(p,now);
  if(kind==='traffic')return t==='traffic'?1.5:t==='online'?.7:1;
  if(kind==='online')return t==='online'?2:1;
  return 1;
}
export function startContract(state,now=Date.now(),scale=1,pace){
  const p=state.empire;if(activeContract(p,now))return null;const o=contractOffer(state,scale,pace);if(!o)return null;
  const t=time(p,now);p.contracts.active={id:o.id,start:t,end:t+o.minutes*60000,target:o.target,progress:0};return activeContract(p,now);
}
// Passes on the offered contract for the next one, only while none is running.
export function skipContract(state,now=Date.now(),scale=1){
  const p=state.empire;if(activeContract(p,now))return false;const o=contractOffer(state,scale);if(!o)return false;
  p.contracts.round=o.index+1;return true;
}
// Finishes or expires the running contract. Returns {done:contract} or {expired:contract}, or null when nothing changed.
export function settleContract(p,now=Date.now()){
  const c=activeContract(p,now);if(!c)return null;
  if(c.progress>=c.target){const k=p.contracts;k.active=null;k.done++;k.round=c.index+1;k.bank=Math.min(CONTRACT_BANK_MAX,k.bank+1);p.trophies++;if(c.keepsake!==undefined)p.rewards[c.keepsake]=true;return {done:c};}
  if(!c.open){p.contracts.active=null;p.contracts.round=c.index+1;return {expired:c};}
  return null;
}
export function useContractBoost(p){const k=p.contracts;if(k.bank<1)return false;k.bank--;k.boost+=CONTRACT_BOOST_SECONDS;return true;}
export function tickContractBoost(p,seconds){if(p.contracts.boost>0)p.contracts.boost=Math.max(0,p.contracts.boost-Math.max(0,seconds||0));}
export function contractBoostFactor(p){return p.contracts.boost>0?2:1;}
// Every counted action goes through here: shift goals count it, and the running contract counts it while its clock runs.
export function recordEvent(p,kind,count,now=Date.now()){
  recordGoal(p,kind,count);
  const c=activeContract(p,now);
  if(c&&c.open&&c.kind===kind&&Number.isFinite(count)&&count>0)p.contracts.active.progress=Math.min(c.target,p.contracts.active.progress+count);
}


// Branch roles and customer needs share one economy with the original shop.
export const PRODUCTS = ['everyday','exclusive','boutique','express'];
export const MANAGERS = [
  {id:'none',name:'Local team',detail:'No specialist assigned'},
  {id:'grower',name:'Rowan · grower',detail:'+30% income when featuring exclusive strains'},
  {id:'host',name:'Jules · host',detail:'Double loyalty from satisfied customers'},
  {id:'dispatcher',name:'Alex · dispatcher',detail:'Hurried shoppers served sooner; +25% bulk reward'}
];
export const SPECIALTIES = [
  'River Mist exclusive strain · level 2 supplies every branch',
  'Boutique products · +40% branch income when featured from level 2',
  'Bulk delivery desk · dispatch 30 packed jars from level 2',
  'Rooftop lounge · desert visitors travel for the view',
  'Fireside terrace · lodge guests linger through the snow'
];
export function exclusiveAvailable(p){return p.stores[0].level>=2;}
export function featureAvailable(p,product){return PRODUCTS.includes(product)&&(product!=='exclusive'||exclusiveAvailable(p));}
export function setFeatured(p,i,product){if(!p.stores[i]?.level||!featureAvailable(p,product))return false;p.stores[i].featured=product;return true;}
export function assignManager(p,i,id){
  if(!p.stores[i]?.level||!MANAGERS.some(m=>m.id===id))return false;
  if(id!=='none')p.stores.forEach(s=>{if(s.manager===id)s.manager='none';});
  p.stores[i].manager=id;return true;
}
export function managementMultiplier(p,i){
  const s=p.stores[i],f=s.featured;
  return (1+(i===1&&s.level>=2&&f==='boutique'?.4:0)+(f==='exclusive'&&exclusiveAvailable(p)?.15:0)+(s.manager==='grower'&&f==='exclusive'&&exclusiveAvailable(p)?.3:0))*(1+Math.min(100,s.loyalty||0)*.002)*(1+(p.network?staffLevel(p.network,s.manager):0)*.02);
}
export function customerType(reputation,sequence){return reputation>=60&&sequence%7===6?'vip':sequence%2?'hurried':'regular';}
export function customerNeed(type){return type==='vip'?'Service within 15 seconds':type==='hurried'?'Service within 20 seconds':'Everyday product';}
// patienceScale stretches the 15s/20s speed thresholds (the main shop passes its Queue comfort bonus).
export function satisfyCustomer(p,i,type,product,seconds,patienceScale=1){
  const store=i>=0?p.stores[i]:null;
  const satisfied=type==='regular'?product==='everyday':seconds<=(type==='vip'?15:20)*Math.max(1,patienceScale);
  const key=store?'loyalty':'reputation',owner=store||p;
  owner[key]=Math.max(0,Math.min(1000,(owner[key]||0)+(satisfied?(store?.manager==='host'?2:1):-1)));
  return satisfied&&type==='vip'?2:satisfied?(1.15+(owner[key]>=60?.2:0)):1;
}
export function tickBranches(p,seconds){
  p.stores.forEach((s,i)=>{if(!s.level)return;s.serviceClock+=seconds;
    while(s.serviceClock>=12){s.serviceClock-=12;const type=contractTwist(p)==='vip'&&s.served%3===2?'vip':customerType(s.loyalty,s.served);s.served++;satisfyCustomer(p,i,type,s.featured,Math.max(8,30-s.level*2-(s.manager==='dispatcher'?10:0)-(s.featured==='express'?8:0)));}
  });
}
export function bulkReward(p){return Math.round(30*32*(1+p.stores[2].level*.1)*(p.stores[2].manager==='dispatcher'?1.25:1));}
export function dispatchBulk(state,now=Date.now()){
  if(state.empire.stores[2].level<2||state.stock[3]<30)return 0;
  const reward=bulkReward(state.empire);state.stock[3]-=30;state.money+=reward;state.lifetime+=reward;state.onlineCompleted++;
  recordEvent(state.empire,'online',1,now);recordGoal(state.empire,'revenue',reward);return reward;
}
export function recordGoal(p,kind,count){if(Object.prototype.hasOwnProperty.call(p.counters,kind)&&Number.isFinite(count)&&count>0)p.counters[kind]=Math.min(Number.MAX_SAFE_INTEGER,p.counters[kind]+count);}
// Shift goals: three slots, one per kind of work. The floor (customers and big spenders), the shop's growth (upgrades,
// then deliveries and branches once they exist) and the till. A goal's kind is fixed when its round starts, chosen from
// what the shop can do right now, so a new shop never waits on a delivery pad it has not built. Every three goals
// collected close a shift and pay a shift bonus on top.
export const GOAL_KINDS=['pickup','spender','upgrade','online','invest','revenue'];
const GOAL_REWARDS={pickup:150,spender:200,upgrade:200,online:250,invest:300,revenue:200};
export const SHIFT_LENGTH=3;
// Older saves stored no kind; their slots ran pickup, deliveries, then revenue alternating with branch work.
function legacyGoalKind(i,round){return i===0?'pickup':i===1?'online':round%2===0?'revenue':'invest';}
function goalOptions(state,i){
  const p=state.empire;
  if(i===0)return ['pickup','pickup','spender'];
  if(i===2)return ['revenue'];
  const options=['upgrade'];
  if(state.pickupWindow?.owned||state.autoDrone?.owned||p.stores[2].level>=2)options.push('online');
  if(p.stores.some(s=>s.level)&&!p.stores.every(s=>s.level===10&&s.projects.every(Boolean)))options.push('invest');
  return options;
}
function startGoal(state,i){const p=state.empire,g=p.goals[i],options=goalOptions(state,i);g.kind=options[g.round%options.length];g.start=p.counters[g.kind];}
// A goal the shop cannot work on (an old save's delivery goal before the pad is built) is swapped while it has no progress.
export function settleGoals(state){
  let changed=false;
  [0,1,2].forEach(i=>{const p=state.empire,g=p.goals[i];if(!goalOptions(state,i).includes(g.kind)&&p.counters[g.kind]<=g.start){startGoal(state,i);changed=true;}});
  return changed;
}
export function goalStatus(p,i,scale=1){
  const g=p.goals[i],kind=g.kind||legacyGoalKind(i,g.round);
  // Targets cycle for variety but grow with income (scale) so goals keep demanding more as the empire grows, not just
  // cycling forever at starter size. Counts grow with the log of income; the revenue target grows with income itself
  // (scale is income per second over four, so the target is 2–4 minutes of takings) and pays back a fraction of it,
  // otherwise a late-game shop earns the target in seconds and collects more than it earned. Upgrades get dearer on
  // their own and big spenders arrive at their own pace, so those counts stay small.
  const linear=Math.max(1,Number.isFinite(scale)?scale:1),growth=1+Math.log2(linear);
  const base={pickup:10+(g.round%3)*5,spender:1+g.round%2,upgrade:2+g.round%3,online:2,invest:1,revenue:500+(g.round%3)*250}[kind];
  const target=Math.max(1,Math.round(kind==='revenue'?base*linear:kind==='spender'||kind==='upgrade'?base:base*growth));
  const title={pickup:'Serve '+abbr(target)+' customers',spender:target>1?'Welcome '+target+' big spenders':'Welcome a big spender',upgrade:'Make '+target+' upgrades',
    online:'Complete '+abbr(target)+' deliveries',invest:target>1?'Improve '+target+' branches or projects':'Improve a branch or build a project',revenue:'Earn $'+abbr(target)}[kind];
  return {kind,target,reward:scaledReward(GOAL_REWARDS[kind],scale),progress:Math.min(target,Math.max(0,p.counters[kind]-g.start)),title,hint:kind==='spender'?'Tap the gold tag when one walks in':''};
}
export function shiftStatus(p,scale=1){return {number:Math.floor(p.goalsCompleted/SHIFT_LENGTH)+1,done:p.goalsCompleted%SHIFT_LENGTH,bonus:scaledReward(450,scale)};}
// Pays the goal and, when it is the shift's last, the shift bonus; returns everything paid.
export function claimGoal(state,i,scale=1){
  if(!Number.isInteger(i)||i<0||i>2)return 0;
  const p=state.empire,g=goalStatus(p,i,scale);if(g.progress<g.target)return 0;
  const bonus=p.goalsCompleted%SHIFT_LENGTH===SHIFT_LENGTH-1?shiftStatus(p,scale).bonus:0;
  state.money+=g.reward+bonus;p.goalsCompleted++;p.goals[i].round++;startGoal(state,i);return g.reward+bonus;
}
export function affordableImprovement(state,additional=[]){
  const p=state.empire,options=additional.filter(o=>Number.isFinite(o.cost)&&o.cost>=0);
  STORES.forEach((s,i)=>{
    if(p.stores[i].level<10&&state.lifetime>=s.goal&&branchOpenable(p,i))options.push({name:s.name+' '+(p.stores[i].level?'level '+(p.stores[i].level+1):'opening'),cost:storeCost(p,i)});
    PROJECT_LEVELS.forEach((level,j)=>{if(p.stores[i].level>=level&&!p.stores[i].projects[j])options.push({name:STORE_PROJECTS[i][j],cost:projectCost(i,j)});});
  });
  options.sort((a,b)=>a.cost-b.cost);return options.find(o=>o.cost<=state.money)||options[0]||null;
}

// Multi-day events. Calendar seasons (4/20 week, Harvest, Spooky, Holiday, Solstice) take over their dates. Each has a
// three-step ladder with income-scaled rewards and a trophy per step; the last step adds the event's badge to a
// collection that survives reopening. Progress counts from the moment the player first opens the game during the event,
// so it never starts half-missed. Between seasons there is no ladder; the weekly special below runs every week.
const BADGE_ID=/^[a-z0-9-]{1,24}$/;
export const SEASONS=[
  {id:'420',name:'4/20 Week',kind:'pickup',from:[4,17],to:[4,23],copy:'The biggest week of the year. Serve walk-in customers to climb the ladder.'},
  {id:'solstice',name:'Summer Solstice',kind:'revenue',from:[6,18],to:[6,24],copy:'Long days, long lines. Earn revenue to climb the ladder.'},
  {id:'harvest',name:'Harvest Season',kind:'revenue',from:[10,1],to:[10,24],copy:'The outdoor harvest is in. Earn revenue to climb the ladder.'},
  {id:'spooky',name:'Spooky Season',kind:'pickup',from:[10,25],to:[10,31],copy:'Costumed customers all week. Serve walk-ins to climb the ladder.'},
  {id:'holiday',name:'Holiday Rush',kind:'online',from:[12,15],to:[12,31],copy:'Gift orders pile up. Send online orders to climb the ladder.'}
];
// Weekly ladder themes from before the iOS weekly special; kept so badges earned from them still show their names.
export const RETIRED_WEEKLY=[
  {id:'neighbors',name:'Neighborhood Week',kind:'pickup',copy:'Regulars bring friends. Serve walk-in customers to climb the ladder.'},
  {id:'delivery',name:'Delivery Week',kind:'online',copy:'The web shop is busy. Send online orders to climb the ladder.'},
  {id:'bigsales',name:'Big Sales Week',kind:'revenue',copy:'Everyone is shopping. Earn revenue to climb the ladder.'}
];
export const SEASON_REWARDS=[1000,4000,12000];
const FIXED_TARGETS={pickup:[300,1200,4000],online:[15,60,200]};
const REVENUE_HOURS=[.5,2,6];
function migrateSeason(r){
  if(!r||typeof r!=='object'||typeof r.id!=='string'||!BADGE_ID.test(r.id))return null;
  const kind=['pickup','online','revenue'].includes(r.kind)?r.kind:'pickup',targets=[0,1,2].map(i=>Math.max(1,num(r.targets?.[i],1)));
  return {id:r.id,kind,start:num(r.start,0),targets,claimed:num(r.claimed,0,3)};
}
export function seasonWindow(now=Date.now()){
  const d=new Date(now),y=d.getUTCFullYear(),day=Date.UTC(y,d.getUTCMonth(),d.getUTCDate());
  for(const s of SEASONS){const from=Date.UTC(y,s.from[0]-1,s.from[1]),to=Date.UTC(y,s.to[0]-1,s.to[1])+DAY;if(day>=from&&day<to)return {...s,id:s.id+'-'+y,badge:s.id,start:from,end:to};}
  return null;
}
// The next calendar season after now, for the card shown between seasons.
export function nextSeason(now=Date.now()){
  const y=new Date(now).getUTCFullYear();
  for(const yy of [y,y+1])for(const s of SEASONS){const start=Date.UTC(yy,s.from[0]-1,s.from[1]);if(start>now)return {...s,start};}
  return null;
}
export function seasonStatus(p,now=Date.now(),scale=1){
  const w=seasonWindow(time(p,now));if(!w)return null;
  if(!p.season||p.season.id!==w.id){
    const income=Math.max(4,scale*4),targets=w.kind==='revenue'?REVENUE_HOURS.map(h=>Math.max(1000,Math.round(income*h*3600))):FIXED_TARGETS[w.kind].slice();
    p.season={id:w.id,kind:w.kind,start:p.counters[w.kind],targets,claimed:0};
  }
  const r=p.season,progress=Math.max(0,p.counters[r.kind]-r.start),reached=r.targets.filter(t=>progress>=t).length;
  const next=r.claimed<reached?r.claimed:-1;
  return {...w,targets:r.targets,progress,claimed:r.claimed,reached,next,remaining:w.end-p.clock,
    reward:next>=0?scaledReward(SEASON_REWARDS[next],scale):scaledReward(SEASON_REWARDS[Math.min(2,r.claimed)],scale),hasBadge:p.badges.includes(w.badge)};
}
export function claimSeason(state,now=Date.now(),scale=1){
  const p=state.empire,s=seasonStatus(p,now,scale);if(!s||s.next<0)return 0;
  p.season.claimed++;p.trophies++;state.money+=s.reward;if(p.season.claimed===3&&!p.badges.includes(s.badge))p.badges.push(s.badge);return s.reward;
}

// Weekly special, as in the iOS app: a free bonus that rotates every week, with nothing to join or collect.
// The week index uses the app's own formula so the web game and the app always show the same special.
export const WEEKLY_SPECIALS=[
  {id:'green-thumb',name:'Green Thumb Week',detail:'Grow room output +15%',kind:'grow',factor:1.15},
  {id:'terpene-fair',name:'Terpene Fair',detail:'Boutique strains pay +15%',kind:'boutique',factor:1.15},
  {id:'street-fair',name:'Street Fair',detail:'Walk-ins arrive 12% faster',kind:'traffic',factor:1.12},
  {id:'courier-rally',name:'Courier Rally',detail:'Online orders pay +20%',kind:'online',factor:1.2},
  {id:'neighborhood-days',name:'Neighborhood Days',detail:'Branch income +15%',kind:'branch',factor:1.15},
  {id:'high-tea',name:'High Tea Week',detail:'Lounge sessions pay +25%',kind:'lounge',factor:1.25}
];
export function weeklySpecial(now=Date.now()){const week=Math.floor((now/DAY+4)/7),n=WEEKLY_SPECIALS.length;return WEEKLY_SPECIALS[((week%n)+n)%n];}
export const specialFactor=(kind,now=Date.now())=>{const s=weeklySpecial(now);return s.kind===kind?s.factor:1;};
