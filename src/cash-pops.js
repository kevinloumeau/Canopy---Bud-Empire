// Cash pops: the small "+$1.2K" that rises where money lands (the pickup counter, the walk-up window, the drone deck).
// A busy shop lands a sale several times a second, so every credit goes into its site's pot and one pot is shown at a
// time, about once a second (GAP): the pot that has waited longest goes first, so no site is starved. A pot that waits
// a little (HOLD) gathers a few sales into one number rather than flashing the first one alone.
// The cash counter in the HUD rolls toward the till rather than jumping (rollCash), and snaps down on a spend.
export const POP_GAP=.95,POP_HOLD=.35,POP_LIFE=1.35;
export function createCashPops(){
 const pots=new Map();let clock=0,lastPop=-Infinity;
 return {
  // Adds `amount` to the pot at `site` ({x,y,z} in world units). Zero, negative or non-finite amounts are ignored.
  credit(key,site,amount){
   if(!(amount>0)||!Number.isFinite(amount))return;
   const pot=pots.get(key);if(pot){pot.amount+=amount;pot.site=site;}else pots.set(key,{amount,site,since:clock});
  },
  // Advances the clock by dt seconds and returns the pop to show now ({key,amount,x,y,z}), or null.
  tick(dt){
   clock+=Math.max(0,dt||0);
   if(!pots.size||clock-lastPop<POP_GAP)return null;
   let pick=null,key=null;
   pots.forEach((pot,k)=>{if(clock-pot.since>=POP_HOLD&&(!pick||pot.since<pick.since)){pick=pot;key=k;}});
   if(!pick)return null;
   pots.delete(key);lastPop=clock;
   return {key,amount:pick.amount,x:pick.site.x,y:pick.site.y||0,z:pick.site.z};
  },
  clear(){pots.clear();},
  pending(){let total=0;pots.forEach(p=>total+=p.amount);return total;}
 };
}
// One frame of the HUD cash roll: eases `shown` toward `target` over about a third of a second, never overshoots, and
// jumps straight down when cash is spent (a purchase should read at once). `still` (reduced motion) snaps.
export function rollCash(shown,target,dt,still){
 if(still||!Number.isFinite(shown)||target<=shown)return target;
 const gap=target-shown,next=shown+gap*Math.min(1,(dt||0)*9);
 return gap<.5||next>=target?target:next;
}
// A pop's look over its life (t: 0 → 1): rise in world units, opacity and scale, eased so it springs up then drifts.
export function popFrame(t){
 const k=Math.max(0,Math.min(1,t)),ease=1-Math.pow(1-k,3);
 return {rise:ease*.95,alpha:k<.12?k/.12:k>.62?Math.max(0,1-(k-.62)/.38):1,scale:k<.18?.72+.36*(k/.18):k<.3?1.08-.08*((k-.18)/.12):1};
}
