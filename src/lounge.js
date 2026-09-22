// The smoking lounge: a speakeasy behind the back-wall shelving, entered through a curtain at the left end and left by
// a back door on to the exit lane. Guests who go in never touch the counters: they pay a cover at the curtain, burn one
// packed jar over a session at a premium, and free a seat when they leave. Each tier buys seats (throughput) and
// raises the take per session, and from the third tier on a bigger share of the door heads straight in. Eight tiers
// run from a quarter-million speakeasy to a half-billion members' club.
export const LOUNGE_TIERS=[
  {name:'Speakeasy',cost:250000,seats:4,share:4,cover:150,spend:3,session:18,
   summary:'Open the curtain. Four seats; every fourth guest through the door slips in for a session, VIPs twice as often.'},
  {name:'Dab bar',cost:750000,seats:6,share:4,cover:220,spend:4,session:16,
   summary:'Concentrates behind the bar: six seats and a bigger spend per session.'},
  {name:'Vinyl nights',cost:2000000,seats:9,share:3,cover:320,spend:4.5,session:15,
   summary:'A DJ booth and nine seats; every third guest comes for the music.'},
  {name:'Terrace',cost:6000000,seats:14,share:3,cover:500,spend:5.5,session:14,
   summary:'A covered terrace out back: fourteen seats and a dearer cover.'},
  {name:'Private booths',cost:18000000,seats:20,share:2,cover:800,spend:7,session:13,
   summary:'Curtained booths: twenty seats, and every other guest asks for one.'},
  {name:'Tasting bar',cost:55000000,seats:28,share:2,cover:1200,spend:9,session:12,
   summary:'A sommelier’s flight of the house strains — the spend per session climbs again.'},
  {name:'Chef’s table',cost:170000000,seats:38,share:2,cover:1800,spend:12,session:11,
   summary:'Infused courses at a chef’s table: thirty-eight seats, quicker turns.'},
  {name:'Members’ club',cost:500000000,seats:50,share:2,cover:2800,spend:16,session:10,
   summary:'Fifty seats, the biggest take in the building, and VIPs never skip it.'}
];
export const LOUNGE_MAX=LOUNGE_TIERS.length;

export function migrateLounge(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(0,Math.min(LOUNGE_MAX,Math.floor(value))):0;
}
export function loungeTier(level){return LOUNGE_TIERS[migrateLounge(level)-1]||null;}
export function loungeUpgradeCost(level){return LOUNGE_TIERS[migrateLounge(level)]?.cost??null;}
export function loungeSeats(level){return loungeTier(level)?.seats||0;}
export function loungeSessionSeconds(level){return loungeTier(level)?.session||0;}
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
// A guest is let in only while a seat is free and there is a spare packed jar to burn.
export function loungeAdmission(level,seated,spareJars){
  const seats=loungeSeats(level);
  return {seats,open:seats>0,seat:seated<seats,jar:spareJars>=1,admit:seats>0&&seated<seats&&spareJars>=1};
}
// The take for one session: the cover at the curtain plus one jar sold at the lounge premium.
export function loungeTake(level,jarValue){
  const tier=loungeTier(level);
  if(!tier)return {cover:0,spend:0,total:0};
  const spend=Math.round(Math.max(0,jarValue)*tier.spend);
  return {cover:tier.cover,spend,total:tier.cover+spend};
}
// Earnings rate right now: each seated guest paid the take at the curtain and holds the seat for one session, so
// every occupied seat is worth the take once per session. Capped at the seats the tier has.
export function loungeCurrentRate(level,seated,jarValue){
  const tier=loungeTier(level);
  if(!tier)return 0;
  const occupied=Math.max(0,Math.min(tier.seats,Math.floor(Number(seated)||0)));
  return loungeTake(level,jarValue).total*occupied/tier.session;
}
// Rough earnings rate with every seat busy, for the station card.
export function loungeRate(level,jarValue){
  const tier=loungeTier(level);
  return tier?loungeTake(level,jarValue).total*tier.seats/tier.session:0;
}
