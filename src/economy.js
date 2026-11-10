// Main-shop throughput maths. Pure functions over plain numbers so they can be unit-tested and simulated in Node.
export const STATION_TIERS=['Starter','Established','Advanced','Premium','Signature','Elite','Flagship'];
export const TIER_LEVELS=[1,10,20,30,50,75,100];
export const TIER_COLORS=['#b4c5a0','#92d5a4','#8ad6d9','#efd18c','#afbfdb','#c5a7cd','#f2e6bf'];
export function stationTier(level){let tier=0;for(let n=1;n<TIER_LEVELS.length;n++)if(level>=TIER_LEVELS[n])tier=n;return tier;}
// Each tier doubles a station's output, so upgrades keep mattering after the linear per-level gain fades.
// A station's look (its Blender model, 1 to 5) changes at fewer, wider-spaced levels than its output tiers, so a new
// look keeps arriving for hours instead of the last one landing in the first half hour.
export const STATION_LOOK_LEVELS=[1,10,30,50,75];
export function stationLook(level){let look=1;for(let n=1;n<STATION_LOOK_LEVELS.length;n++)if(level>=STATION_LOOK_LEVELS[n])look=n+1;return look;}
export function nextLookLevel(level){return STATION_LOOK_LEVELS.find(l=>l>level)||null;}
// The unlock road: the next level that changes a station, whether its output doubles and whether it gets a new look.
// Every output tier from Lv 10 on doubles; the look changes on the tiers that are also look levels (10, 30, 50, 75).
export function nextUnlock(level){const at=TIER_LEVELS.find(l=>l>Math.max(1,level));return at?{level:at,double:true,look:STATION_LOOK_LEVELS.includes(at)}:null;}
export function tierBoost(level){return Math.pow(2,stationTier(level));}
// The retail tier is the lower of the two counters; both must tier up to grow baskets, storage and web orders.
export function retailTier(lines){return Math.min(stationTier(lines[4]),stationTier(lines[5]));}
export function retailBoost(lines){return Math.pow(2,retailTier(lines));}
export function batchSize(level){return (1+(level-1)*.4)*tierBoost(level);}
export function capacity(level,staff,multiplier){return level>0?batchSize(level)*(1+staff*.3)*multiplier:0;}
export function stationCost(base,level){return Math.floor(base*Math.pow(1.16,level));}
export function staffCost(level){return Math.floor(20*Math.pow(1.6,level));}
// Customers buy a basket that grows by a bag with every order desk level and doubles with each retail tier. (It grew a
// bag every second level until 2026-11-08; walk-ins cap at about 0.74 a second, so the basket is what lets sales grow.)
export function basketSize(lines){return Math.max(1,lines[4]|0)*retailBoost(lines);}
export function storageCapacity(level,lines){return (100+level*100)*retailBoost(lines);}
export function readyCapacity(level,lines){return (100+level*50)*retailBoost(lines);}
export function onlineSize(completed,lines){return (4+(completed%5)*3)*retailBoost(lines);}
// Legacy service-efficiency multiplier: every five levels speeds up each handoff.
// Physical staffed order counters are purchased separately in order-counters.js.
export function counterLanes(level){return 1+Math.floor(Math.max(0,(level||0)-1)/5);}
// Both equipment and training shorten the handoff, with gentler gains at high levels; 1.4s is the physical floor per lane.
export function counterServiceDuration(station,rate,serviceFactor=1){return (1.4+Math.max(1.2/Math.pow(rate,.15),[2,3][station-4]/rate))*(station===5?serviceFactor:1);}
// The line a new shop starts with holds LINE_START shoppers (it was six until 2026-11-10; Kevin: "have the store a bit
// busier by default"). Every second order desk level or desk employee adds a place, up to LINE_GROWTH more, then each
// Customer line upgrade adds two, up to LINE_MAX. Arrivals were never the limit (someone new walks up the moment the
// line has room), so a busier floor means a longer line, and a longer line is a longer wait at the same counters:
// LINE_PATIENCE stretches the hurried and VIP patience to match, which keeps tips and reputation where they were (a
// seeded 10-minute sim at five shop sizes sold the same bags and earned the same reputation as the six-place line).
export const LINE_START=8,LINE_GROWTH=6,LINE_MAX=30,LINE_PATIENCE=1.4;
// Hurried shoppers and VIPs judge their whole visit (28 and 21 seconds standing); Queue comfort stretches how long
// they stay cheerful. patienceScale is the same stretch as a factor on progression.js's base 20 and 15 seconds.
export function patience(type,comfortLevel){return (type==='vip'?15:20)*patienceScale(comfortLevel);}
export function patienceScale(comfortLevel){return LINE_PATIENCE*(1+Math.max(0,comfortLevel||0)*.15);}
export function lineLimit(deskLevel,deskStaff,lineLevel){return Math.min(LINE_MAX,Math.min(LINE_START+LINE_GROWTH,LINE_START+Math.floor(Math.max(0,(deskLevel||0)-1)/2)+Math.floor((deskStaff||0)/2))+(lineLevel||0)*2);}
// Customers walk a little faster with each Floor flow level, with diminishing returns that top out at about 1.25× the
// base pace (Kevin, 2026-11-07: shoppers looked too fast; it was 2.2×). Floor flow earns its keep through arrivals; a sim of
// a busy shop at Lv 20 sold within 0.3% of the old pace, because counters, not the walk, set the rate.
export function walkSpeed(trafficLevel){return 2.8*(1+.25*(1-Math.exp(-Math.max(0,trafficLevel||0)/7)));}
// However many lanes a counter runs, one customer's handoff never drops below this: a second at the order desk, most
// of one at pickup. Past that point the shop grows through more counters, kiosks, baskets and prices, not faster hands.
export const HANDOFF_FLOOR={4:1,5:.7};
export function customerHandoff(station,level,duration){return Math.max(HANDOFF_FLOOR[station]||0,duration/counterLanes(level));}
// How many more levels an upgrade needs before it pays: some only move every few levels (a retail tier doubles
// baskets at Lv 10, 20, 30...), so looking one level ahead can miss them. gainAfter(k) is the income gained by k more
// levels; returns the first k whose gain beats the threshold, or null if none does within the limit.
export function stepsToGain(gainAfter,limit,threshold=0){for(let k=1;k<=limit;k++){const gain=gainAfter(k);if(gain>threshold)return{steps:k,gain};}return null;}
// Stations a few percent apart act as one bottleneck: raising one alone shows next to nothing. raiseTogether prices
// raising every member by k levels (k = 1..limit), then leaves out members already faster than the slowest raised one
// and prices the rest again. gainAt(levels) and rateAt(i,levels) read a whole trial level array; price(i,level) is
// one level's cost. Returns one option a k: {steps, used, spend, gain, first} (first: the cheapest member to buy now).
export function raiseTogether(members,start,{gainAt,rateAt,price},limit,threshold=0){
  const out=[];if(members.length<2)return out;
  for(let k=1;k<=limit;k++){
    const all=start.slice();members.forEach(i=>{all[i]=start[i]+k});let gain=gainAt(all);if(!(gain>threshold))continue;
    const line=Math.min(...members.map(i=>rateAt(i,all))),used=members.filter(i=>rateAt(i,start)<line*(1+1e-6));
    if(used.length<2)continue;
    if(used.length<members.length){const some=start.slice();used.forEach(i=>{some[i]=start[i]+k});gain=gainAt(some);if(!(gain>threshold))continue}
    let spend=0;used.forEach(i=>{for(let l=start[i];l<start[i]+k;l++)spend+=price(i,l)});
    const first=used.reduce((a,b)=>price(b,start[b])<price(a,start[a])?b:a);
    out.push({steps:k,used,spend,gain,first});
  }
  return out;
}
// The doorman's floor: no ID check takes less than a quarter of a second.
export const ID_CHECK_FLOOR=.25;
// How long a full ID check takes on the map when the door has time to spare (the guard reads the ID, then waves the
// guest in). It never slows the door: a busy line falls back to the trained securityDuration.
export const ID_CHECK_SHOW=2.2;
// Security trains to level 75, its booth changing at the station look levels (1, 10, 30, 50, 75). The first nine
// levels keep their old prices and speeds (they used to be the whole track); past them each level costs 20% more and
// the floor itself comes down, from a quarter of a second to a tenth at level 75, so every level still shortens the
// check however far the ID scanner has gone.
export const SECURITY_MAX_LEVEL=75;
export const SECURITY_TIERS=['Door podium','ID desk','ID check booth','Monitored booth','Flagship booth'];
export function securityCost(level){return Math.floor(level<9?20*Math.pow(1.6,level):20*Math.pow(1.6,9)*Math.pow(1.2,level-9));}
export function securityFloor(level){return ID_CHECK_FLOOR*Math.pow(.4,Math.min(SECURITY_MAX_LEVEL,Math.max(0,level))/SECURITY_MAX_LEVEL);}
// Kevin (2026-11-05): Security should be slow at first. A new door (Lv 1) takes the full read-and-wave, ID_CHECK_SHOW
// seconds, and every level after checks 30% faster, so the door reaches the quick checks it used to start near only
// around Lv 30 instead of Lv 9.
export function securityDuration(level,scannerLevel){return Math.max(securityFloor(level),ID_CHECK_SHOW/((1+Math.max(0,level-1)*.3)*(1+(scannerLevel||0)*.12)));}
// Regulars want the everyday strain; VIPs reach for the priciest boutique strain on the menu.
export function preferredStrain(type,menu,levels){
  const boutique=menu.filter(i=>i>0&&levels[i]>0);
  if(type==='vip'){if(boutique.length)return boutique[boutique.length-1];}
  else if(menu.indexOf(0)>=0&&levels[0]>0)return 0;
  return null;
}
// Fixed cash rewards (daily, goals, events) scale with current income so they stay worth claiming after the first hour.
export function rewardScale(incomePerSecond){return Math.max(1,(Number.isFinite(incomePerSecond)?incomePerSecond:0)/4);}
