// The rooftop lounge's elevators (3D map). Each cab carries up to LIFT_SEATS guests between the old lounge room
// (floor 0) and the roof (floor 1), and it stays at a floor until everyone has got off and everyone it is taking has
// got on: riders step in one after another (`boardT` runs 0 → 1 over LIFT_STEP seconds, each a beat behind the one
// before), the cab sets off only once the last is aboard, and on arrival it waits until every rider is clear of the
// door, on the roof (`roofWalk` past LIFT_CLEAR) or down below (`exitT` reaching 1, when they head for the back door).
// Either way it then holds a beat (LIFT_HOLD) with everyone clear before it moves on.
//
// Guest lift states: 'waitUp' / 'waitDown' (asked for a cab), 'boarding', 'up' / 'down' (riding), 'roof' (walking
// to and holding a spot; roofWalk is driven by main.js), 'back' (walking back to the landing), 'exit' (stepping out
// below).
export const LIFT_TRIP=3,LIFT_SEATS=5,LIFT_STEP=.6,LIFT_STAGGER=.3,LIFT_CLEAR=.3,LIFT_HOLD=.4;
// Where each rider stands in the cab, as x, z offsets from its centre line: one in the middle, then the four corners.
export const CAB_SLOTS=[[0,0],[.3,-.24],[-.3,-.24],[.3,.24],[-.3,.24]];
export function makeLifts(){return[{y:0,trip:null,boarding:null,unloading:null,hold:0},{y:0,trip:null,boarding:null,unloading:null,hold:0}]}
const smooth=t=>t*t*t*(t*(t*6-15)+10);
// A guest waiting to go down only takes the cab they came up in.
export function liftWaiting(q,i){return q.phase==='lounge'&&q.liftShaft===null&&(q.lift==='waitUp'||(q.lift==='waitDown'&&(q.shaft||0)===i))}
// The cab takes its guest and up to four more waiting on the same floor; they step in one by one.
export function board(s,i,c,customers){
  const wait=c.lift,up=wait==='waitUp',riders=[c];
  customers.filter(q=>q!==c&&q.lift===wait&&liftWaiting(q,i)).sort((a,b)=>a.liftAsk-b.liftAsk).slice(0,LIFT_SEATS-1).forEach(q=>riders.push(q));
  riders.forEach((q,k)=>{q.liftShaft=i;q.lift='boarding';q.cabSlot=k;q.boardT=-k*LIFT_STAGGER;q.boardFrom=!up&&q.queueX!==undefined?{x:q.queueX,z:q.queueZ}:null;if(up)q.shaft=i});
  s.boarding={riders,up};
}
// Each idle cab takes the guest who has waited longest, travelling empty to their floor first if it has to.
// `second` says whether the second shaft is built; `leave(c)` sends a guest who has stepped out below to the back door.
export function tickLifts(lifts,customers,dt,{second=false,leave=()=>{}}={}){
  const live=c=>c.phase==='lounge'&&customers.indexOf(c)>=0;
  lifts.forEach((s,i)=>{
    if(i>0&&!second)return;
    if(s.hold>0){s.hold=Math.max(0,s.hold-dt);return}
    if(s.boarding){
      const riders=s.boarding.riders.filter(live),up=s.boarding.up;
      riders.forEach(c=>{c.boardT=Math.min(1,c.boardT+dt/LIFT_STEP)});
      if(riders.some(c=>c.boardT<1))return;
      s.boarding=null;
      riders.forEach(c=>{c.lift=up?'up':'down'});
      if(riders.length){s.trip={from:up?0:1,to:up?1:0,t:0,riders,empty:false};s.hold=LIFT_HOLD}
      return;
    }
    if(s.unloading){
      s.unloading.filter(live).forEach(c=>{if(c.lift!=='exit')return;c.exitT=Math.min(1,c.exitT+dt/LIFT_STEP);if(c.exitT>=1){c.lift=null;leave(c)}});
      if(s.unloading.some(c=>live(c)&&(c.lift==='exit'||(c.lift==='roof'&&c.roofWalk<LIFT_CLEAR))))return;
      s.unloading=null;s.hold=LIFT_HOLD;return;
    }
    if(s.trip){
      const trip=s.trip;trip.t=Math.min(1,trip.t+dt/LIFT_TRIP);s.y=trip.from+(trip.to-trip.from)*smooth(trip.t);
      if(trip.t<1)return;
      s.y=trip.to;s.trip=null;
      if(trip.empty){if(live(trip.c))board(s,i,trip.c,customers);else trip.c.liftShaft=null;return}
      // Riders step out one after another from where they stood in the cab (each a beat behind the one before).
      trip.riders.forEach(c=>{if(!live(c))return;const k=c.cabSlot||0;if(c.lift==='up'){c.lift='roof';c.roofWalk=-k*.3}else{c.lift='exit';c.exitT=-k*LIFT_STAGGER}});
      s.unloading=trip.riders;
      return;
    }
    let next=null;
    customers.forEach(q=>{if(liftWaiting(q,i)&&(!next||q.liftAsk<next.liftAsk))next=q});
    if(!next)return;
    next.liftShaft=i;const floor=next.lift==='waitUp'?0:1;
    if(Math.abs(s.y-floor)<.001)board(s,i,next,customers);else s.trip={from:s.y,to:floor,t:0,c:next,empty:true};
  });
}
