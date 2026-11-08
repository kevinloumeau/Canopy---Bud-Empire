// The in-game store: boost tokens, a 2× boost on real (wall-clock) time, and the in-app purchase packs. Pure rules on
// a small save object, so they can be tested without a browser; the screen is store-ui.js and the App Store bridge is
// purchases.js.
//
// A boost token gives 2× every dollar earned for 2 hours of real time, and the boost keeps running while the game is
// closed (the away pay counts the part of the break it covered). Using another token while one runs adds 2 hours, up
// to 12 hours banked. "2× sales forever" doubles every dollar earned on top of that, for good.
// Purchases are never lost: the store object survives a reopen and Start over (see resetRun in main.js).
export const BOOST_SECONDS=7200,AD_BOOST_SECONDS=1800,BOOST_CAP_SECONDS=12*3600,ADS_PER_DAY=6,GIFT_TOKENS=1;
const ID='com.kevinloumeau.canopy.';
// What Kevin creates in App Store Connect: the id, the type and the price. `price` is only the fallback label shown
// before the App Store answers (and on the web build); the App Store's own localised price replaces it.
export const PRODUCTS=[
  {key:'starter',id:ID+'starter',type:'nonconsumable',price:'$2.99',tokens:3,cashHours:2,name:'Starter pack'},
  {key:'double',id:ID+'double',type:'nonconsumable',price:'$9.99',name:'2× sales forever'},
  {key:'boosts5',id:ID+'boosts5',type:'consumable',price:'$1.99',tokens:5,name:'5 boosts'},
  {key:'boosts20',id:ID+'boosts20',type:'consumable',price:'$5.99',tokens:20,name:'20 boosts'},
];
export function productByKey(key){return PRODUCTS.find(p=>p.key===key)||null;}
export function productById(id){return PRODUCTS.find(p=>p.id===id)||null;}
const DAY=86400000;
const num=(v,lo,hi)=>Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):lo;
export function freshStore(){return {tokens:0,boostEnds:0,owned:{},txns:[],gift:false,ads:{day:0,count:0},spent:0};}
export function migrateStore(old){
  const s=freshStore();if(!old||typeof old!=='object')return s;
  s.tokens=Math.floor(num(old.tokens,0,1e6));s.boostEnds=num(old.boostEnds,0,8.64e15);
  if(old.owned&&typeof old.owned==='object')PRODUCTS.forEach(p=>{if(p.type==='nonconsumable'&&old.owned[p.key]===true)s.owned[p.key]=true;});
  if(Array.isArray(old.txns))s.txns=old.txns.filter(t=>typeof t==='string'&&t).slice(-60);
  s.gift=old.gift===true;
  if(old.ads&&typeof old.ads==='object')s.ads={day:Math.floor(num(old.ads.day,0,1e9)),count:Math.floor(num(old.ads.count,0,99))};
  s.spent=Math.floor(num(old.spent,0,1e9));
  return s;
}
// Seconds of boost left at `now` (ms).
export function boostLeft(s,now){return Math.max(0,(s.boostEnds-now)/1000);}
export function boostRoom(s,now){return BOOST_CAP_SECONDS-boostLeft(s,now);}
// Starts or extends the boost; refuses (false) past the 12-hour bank so a token is never wasted.
export function addBoost(s,now,seconds){if(seconds<=0||boostRoom(s,now)<seconds-1)return false;s.boostEnds=Math.max(now,s.boostEnds)+seconds*1000;return true;}
export function useToken(s,now){if(s.tokens<1||!addBoost(s,now,BOOST_SECONDS))return false;s.tokens--;s.spent++;return true;}
// The factor on every dollar earned right now: 2× while boosted, 2× again with "2× sales forever".
export function earnFactor(s,now){return (s.owned.double?2:1)*(boostLeft(s,now)>0?2:1);}
// Seconds of boost inside [from,to] (ms): what part of a break the boost covered.
export function boostOverlap(s,from,to){const end=Math.min(to,s.boostEnds);return Math.max(0,(end-from)/1000);}
// The away pay's factor for `paid` seconds paid from `from` (ms): the break's first `paid` seconds are the ones paid,
// and the boosted part of them pays double.
export function awayFactor(s,from,paid){if(!(paid>0))return s.owned.double?2:1;const covered=Math.min(paid,boostOverlap(s,from,from+paid*1000));return (s.owned.double?2:1)*(paid+covered)/paid;}
// The one free boost everyone gets once.
export function giftReady(s){return !s.gift;}
export function claimGift(s){if(s.gift)return false;s.gift=true;s.tokens+=GIFT_TOKENS;return true;}
// Rewarded ads: a few a day, counted on the local calendar day number passed in.
export function adsLeft(s,day){return s.ads.day===day?Math.max(0,ADS_PER_DAY-s.ads.count):ADS_PER_DAY;}
export function countAd(s,day){if(s.ads.day!==day)s.ads={day,count:0};if(s.ads.count>=ADS_PER_DAY)return false;s.ads.count++;return true;}
export function dayNumber(now){const d=new Date(now);return Math.floor((now-d.getTimezoneOffset()*60000)/DAY);}
// Is this pack still for sale? One-time packs disappear once owned.
export function forSale(s,key){const p=productByKey(key);return !!p&&!(p.type==='nonconsumable'&&s.owned[key]);}
// Hands over what a purchase pays, once per App Store transaction. `cashFor(hours)` turns the starter pack's hours of
// sales into dollars at today's rate. Returns {tokens,cash,double} or null when there is nothing (new) to give.
export function grantPurchase(s,productId,txn,cashFor){
  const p=productById(productId);if(!p)return null;
  if(txn&&s.txns.indexOf(String(txn))>=0)return null;
  if(p.type==='nonconsumable'&&s.owned[p.key])return null;
  if(txn){s.txns.push(String(txn));if(s.txns.length>60)s.txns.splice(0,s.txns.length-60);}
  const got={key:p.key,tokens:p.tokens||0,cash:p.cashHours&&cashFor?Math.max(0,Math.round(cashFor(p.cashHours))):0,double:p.key==='double'};
  if(p.type==='nonconsumable')s.owned[p.key]=true;
  s.tokens+=got.tokens;
  return got;
}
// How the welcome back card can double the away pay: a token first, then an ad, else the store (when it can sell).
export function doubleRoute(s,{adReady,canBuy}){return s.tokens>0?'token':adReady?'ad':canBuy?'store':null;}
// Store button badge: the free boost waiting, else nothing (a running boost shows in the top lane instead).
export function storeBadge(s){return giftReady(s)?'1':'';}
// "1:59:30" / "45:10": the boost clock.
export function boostClock(seconds){const t=Math.max(0,Math.ceil(seconds)),h=Math.floor(t/3600),m=Math.floor(t%3600/60),sec=t%60;const pad=n=>String(n).padStart(2,'0');return h?h+':'+pad(m)+':'+pad(sec):m+':'+pad(sec);}
