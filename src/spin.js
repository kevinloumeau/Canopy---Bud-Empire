// Lucky spin (Kevin, 2026-11-09, from the Food Venture study): a wheel of small prizes. One free spin every 8 hours of
// real time, banked up to 2, and up to 2 more a day for a rewarded ad (those also count against the store's 6 ads a day).
// Spins are never sold: the wheel only pays in-game items, so it is neither a paid loot box nor gambling (App Store
// 3.1.1 and 5.3). The odds still show under the wheel, and each slice is drawn as wide as its odds.
//
// Prizes are sized in the shop's own income, like every reward since the 2026-11-07 retune: "10 min of sales" is ten
// minutes of incomeRate(). Boost tokens are the store's (store.js). A spin is worth about 30 minutes of sales on average
// counting a token as 2 hours of 2×, and five spins a day hand out under one token a day, so boost packs keep their value.
//
// Pure: the state lives in the store object (store.spin), so it is kept through a reopen and Start over like purchases.
export const SPIN_EVERY=8*3600*1000,SPIN_BANK=2,AD_SPINS_PER_DAY=2;
// Each prize: its weight (percent), the label on its slice (short) and in the odds list, and what it pays.
// cash: minutes of sales. boost: seconds of the store's 2× boost. tokens: boost tokens. coffee: every trained crew bursts.
export const PRIZES=[
  {id:'cash10',odds:32,slice:'10 min',name:'10 min of sales',cash:10,icon:'goal-coin'},
  {id:'boost15',odds:20,slice:'2× 15m',name:'2× for 15 min',boost:900,icon:'research-boost'},
  {id:'coffee',odds:15,slice:'Coffee',name:'Crew coffee',coffee:true,icon:'goal-person'},
  {id:'cash30',odds:22,slice:'30 min',name:'30 min of sales',cash:30,icon:'goal-coin'},
  {id:'token1',odds:8,slice:'1 boost',name:'1 boost',tokens:1,icon:'research-boost'},
  {id:'token3',odds:2,slice:'3',name:'3 boosts',tokens:3,icon:'research-boost'},
  {id:'jackpot',odds:1,slice:'4 h',name:'4 h jackpot',cash:240,icon:'goal-trophy'},
];
export function prizeById(id){return PRIZES.find(p=>p.id===id)||null;}
const num=(v,lo,hi,d)=>Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):d;
// A new player starts with one free spin ready.
export function freshSpin(){return {free:1,nextAt:0,ad:{day:0,count:0},spins:0,last:null};}
export function migrateSpin(old){const s=freshSpin();if(!old||typeof old!=='object')return s;
  s.free=Math.floor(num(old.free,0,SPIN_BANK,1));s.nextAt=num(old.nextAt,0,8.64e15,0);
  if(old.ad&&typeof old.ad==='object')s.ad={day:Math.floor(num(old.ad.day,0,1e9,0)),count:Math.floor(num(old.ad.count,0,99,0))};
  s.spins=Math.floor(num(old.spins,0,1e9,0));s.last=prizeById(old.last)?old.last:null;return s;}
// Adds the free spins that came due. While the bank is full the clock waits; it starts again when a spin is used.
export function refill(s,now){if(s.free>=SPIN_BANK){s.nextAt=0;return s.free;}
  if(!s.nextAt)s.nextAt=now+SPIN_EVERY;
  while(s.free<SPIN_BANK&&now>=s.nextAt){s.free++;s.nextAt=s.free<SPIN_BANK?s.nextAt+SPIN_EVERY:0;}
  return s.free;}
export function freeReady(s,now){return refill(s,now)>0;}
// Milliseconds until the next free spin, or 0 when the bank is full.
export function nextFreeIn(s,now){refill(s,now);return s.free>=SPIN_BANK?0:Math.max(0,s.nextAt-now);}
export function adSpinsLeft(s,day){return s.ad.day===day?Math.max(0,AD_SPINS_PER_DAY-s.ad.count):AD_SPINS_PER_DAY;}
// Uses a free spin (way 'free') or an ad spin (way 'ad', after the ad was watched). False when there is none.
export function takeSpin(s,now,way,day){
  if(way==='free'){if(refill(s,now)<1)return false;s.free--;if(!s.nextAt)s.nextAt=now+SPIN_EVERY;s.spins++;return true;}
  if(way==='ad'){if(adSpinsLeft(s,day)<1)return false;if(s.ad.day!==day)s.ad={day,count:0};s.ad.count++;s.spins++;return true;}
  return false;}
// Picks a prize from a number in [0,1) by the odds.
export function rollPrize(r){const total=PRIZES.reduce((t,p)=>t+p.odds,0);let x=Math.max(0,Math.min(.999999,r))*total;
  for(const p of PRIZES){if(x<p.odds)return p;x-=p.odds;}return PRIZES[PRIZES.length-1];}
// Where each slice sits on the wheel, in degrees clockwise from the pointer at the top: [start,end).
export function sliceAngles(){let a=0;return PRIZES.map(p=>{const start=a;a+=p.odds*3.6;return {id:p.id,start,end:a};});}
// The wheel's turn (degrees, clockwise) that lands the pointer inside the prize's slice, `spins` whole turns first.
// `r` in [0,1) picks the spot within the slice, kept off its edges.
export function landingTurn(id,r,spins=5){const s=sliceAngles().find(x=>x.id===id);if(!s)return spins*360;
  const spot=s.start+(s.end-s.start)*(.2+.6*Math.max(0,Math.min(1,r)));return spins*360+(360-spot)%360;}
// What a prize pays at `income` per second: {cash,boost,tokens,coffee}.
export function prizePay(p,income){return {cash:p.cash?Math.max(50,Math.round(Math.max(0,income||0)*p.cash*60)):0,boost:p.boost||0,tokens:p.tokens||0,coffee:!!p.coffee};}
// The average spin, in seconds of sales, counting a token as `tokenSeconds` of extra sales (2 h of 2×) and a 15-minute
// 2× boost as 15 minutes. Coffee is left out (it depends on the crews trained).
export function expectedSeconds(tokenSeconds=7200){const total=PRIZES.reduce((t,p)=>t+p.odds,0);
  return PRIZES.reduce((t,p)=>t+p.odds/total*((p.cash||0)*60+(p.boost||0)+(p.tokens||0)*tokenSeconds),0);}
// "5h 12m" / "12m" until the next free spin.
export function spinClock(ms){const m=Math.max(1,Math.ceil(ms/60000)),h=Math.floor(m/60);return h?h+'h '+(m%60)+'m':m+'m';}
