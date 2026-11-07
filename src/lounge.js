// The smoking lounge: a speakeasy behind the back-wall shelving, entered through a curtain at the left end and left by
// a back door on to the exit lane. Guests who go in never touch the counters: they pay a cover at the curtain, buy the
// basket they would have bought downstairs at the lounge premium, and free a seat when they leave. Each tier buys seats
// and adds 15% to the premium, and from the third tier on a bigger share of the door heads straight in. Eight tiers
// run from a quarter-million speakeasy to a half-billion members' club.
//
// The lounge used to sell one jar a guest, so every guest it took from the counters cost the shop a whole basket
// (a sim in 2026-11: closing the lounge raised shop income 80%). A guest now always pays more upstairs than down.
export const LOUNGE_TIERS=[
  {name:'Speakeasy',cost:250000,seats:4,share:4,cover:150,spend:3,session:18,
   summary:'Four seats. Every fourth guest goes up and pays 15% over a walk-in basket.'},
  {name:'Dab bar',cost:750000,seats:6,share:4,cover:220,spend:4,session:16,
   summary:'Six seats and a bar. Guests pay 30% over a basket.'},
  {name:'Vinyl nights',cost:2000000,seats:9,share:3,cover:320,spend:4.5,session:15,
   summary:'Nine seats and a DJ. Every third guest goes up, at +45%.'},
  {name:'Terrace',cost:6000000,seats:14,share:3,cover:500,spend:5.5,session:14,
   summary:'Fourteen seats on a terrace. Guests pay 60% over a basket.'},
  {name:'Private booths',cost:18000000,seats:20,share:2,cover:800,spend:7,session:13,
   summary:'Twenty booths. Every other guest goes up, at +75%.'},
  {name:'Tasting bar',cost:55000000,seats:28,share:2,cover:1200,spend:9,session:12,
   summary:'Twenty-eight seats. Guests pay 90% over a basket.'},
  {name:'Chef’s table',cost:170000000,seats:38,share:2,cover:1800,spend:12,session:11,
   summary:'Thirty-eight seats, quicker turns, at +105%.'},
  {name:'Members’ club',cost:500000000,seats:50,share:2,cover:2800,spend:16,session:10,
   summary:'Fifty seats, more than double a basket, and every VIP goes up.'}
];
export const LOUNGE_MAX=LOUNGE_TIERS.length;

export function migrateLounge(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(LOUNGE_MAX,Math.floor(value))):0;
}
export function loungeTier(level){return LOUNGE_TIERS[migrateLounge(level)-1]||null;}
export function loungeUpgradeCost(level){return LOUNGE_TIERS[migrateLounge(level)]?.cost??null;}
export function loungeSeats(level){return loungeTier(level)?.seats||0;}
// Guests linger: a session runs LOUNGE_STAY times the tier's base, and the cover is scaled up to match. The host and the
// second lift raise the take, not the pace, so guests never rush through.
export const LOUNGE_STAY=3;
export function loungeSessionSeconds(level){return (loungeTier(level)?.session||0)*LOUNGE_STAY;}
// The second elevator shaft: bought once the lounge is open, it lifts the cover and the premium by a quarter.
export const LOUNGE_LIFT_COST=500000,LOUNGE_LIFT_SPEED=1.25;
export function buyLoungeLift(state){
  if(!migrateLounge(state.lounge)||state.loungeLift===true||!Number.isFinite(state.money)||state.money<LOUNGE_LIFT_COST)return false;
  state.money-=LOUNGE_LIFT_COST;state.loungeLift=true;return true;
}
// The lounge host works the room: each training level raises the cover and the premium by 10%.
export function migrateLoungeHost(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(10000,Math.floor(value))):0;
}
export function loungeHostSpeed(host){return 1+migrateLoungeHost(host)*LOUNGE_HOST_STEP;}
export function loungeHostCost(host){return Math.floor(20*Math.pow(1.6,migrateLoungeHost(host)));}
export function buyLoungeTier(state){
  const level=migrateLounge(state.lounge),cost=loungeUpgradeCost(level);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;state.lounge=level+1;return true;
}
// Which arrivals head for the curtain: one in `share` by sequence. VIPs are twice as likely — one in half the share —
// and every VIP goes in once the members' room opens.
export function loungeShare(level,kind){
  const tier=loungeTier(level);
  if(!tier)return 0;
  if(kind!=='vip')return tier.share;
  return migrateLounge(level)>=LOUNGE_MAX?1:Math.max(1,Math.ceil(tier.share/2));
}
export function wantsLounge(level,sequence,kind){
  const share=loungeShare(level,kind);
  return share>0&&sequence%share===share-1;
}
// A guest is let in only while a seat is free and there is a spare packed jar or ready bag to sell them.
export function loungeAdmission(level,seated,spareJars){
  const seats=loungeSeats(level);
  return {seats,open:seats>0,seat:seated<seats,jar:spareJars>=1,admit:seats>0&&seated<seats&&spareJars>=1};
}
// What a lounge guest pays for each bag over a walk-in: 15% a tier, raised by the host's training (10% a level) and the
// second lift (a quarter).
export const LOUNGE_PREMIUM=.15,LOUNGE_HOST_STEP=.1;
export function loungeBoost(host=0,lift=false){return (1+migrateLoungeHost(host)*LOUNGE_HOST_STEP)*(lift?LOUNGE_LIFT_SPEED:1);}
export function loungeMarkup(level,host=0,lift=false){return loungeTier(level)?1+LOUNGE_PREMIUM*migrateLounge(level)*loungeBoost(host,lift):1;}
// The take for one guest: the cover at the curtain plus their basket (`bags` at `jarValue`, a walk-in's price) at the
// lounge markup. `bags` defaults to one for callers that only want the per-bag figure.
export function loungeTake(level,jarValue,host=0,lift=false,bags=1){
  const tier=loungeTier(level);
  if(!tier)return {cover:0,spend:0,total:0};
  const cover=Math.round(tier.cover*LOUNGE_STAY*loungeBoost(host,lift)),spend=Math.round(Math.max(0,jarValue)*Math.max(0,bags)*loungeMarkup(level,host,lift));
  return {cover,spend,total:cover+spend};
}
// Earnings rate right now: each seated guest paid the take at the curtain and holds the seat for one session, so
// every occupied seat is worth the take once per session. Capped at the seats the tier has.
export function loungeCurrentRate(level,seated,jarValue,host=0,lift=false,bags=1){
  const tier=loungeTier(level);
  if(!tier)return 0;
  const occupied=Math.max(0,Math.min(tier.seats,Math.floor(Number(seated)||0)));
  return loungeTake(level,jarValue,host,lift,bags).total*occupied/loungeSessionSeconds(level);
}
// Rough earnings rate with every seat busy, for the station card.
export function loungeRate(level,jarValue,host=0,lift=false,bags=1){
  const tier=loungeTier(level);
  return tier?loungeTake(level,jarValue,host,lift,bags).total*tier.seats/loungeSessionSeconds(level):0;
}
