export const ORDER_COUNTER_COSTS=[2500,12500];
// The head of the order line waits here, at the right-hand end of the rope pen, until a counter is free.
// The whole order and pickup counter line sits this far right of its original layout, so the floor in front of the
// lounge door stays clear (Kevin, 2026-10-13). Everything tied to the line (pickup spot, rope pen, menu board) adds it.
export const COUNTER_SHIFT=1.2;
export const PICKUP_X=4+COUNTER_SHIFT;
export const ORDER_QUEUE_GATE={x:-2+COUNTER_SHIFT,z:6.1};
// Customers order standing this close to the desk front (Kevin, 2026-10-17: they stood a step too far back).
export const ORDER_SPOT_Z=4.55;
const POSITIONS=[{x:-4+COUNTER_SHIFT,z:2.5},{x:-6.6+COUNTER_SHIFT,z:2.5},{x:-1.4+COUNTER_SHIFT,z:2.5}];

export function migrateOrderCounters(value){
  return typeof value==='number'&&Number.isFinite(value)?Math.max(1,Math.min(3,Math.floor(value))):1;
}
export function orderCounterPositions(count){return POSITIONS.slice(0,migrateOrderCounters(count));}
export function orderCounterCost(count){return ORDER_COUNTER_COSTS[migrateOrderCounters(count)-1]??null;}
export function buyOrderCounter(state){
  const count=migrateOrderCounters(state.orderCounters),cost=orderCounterCost(count);
  if(cost===null||!Number.isFinite(state.money)||state.money<cost)return false;
  state.money-=cost;state.orderCounters=count+1;return true;
}
// Lounge guests never order at a counter; counting one as the head of the line froze every counter for as long as
// they were on the rope or inside.
export function waitingForCounter(c){return c.idChecked!==false&&!c.kiosk&&!c.ordered&&c.phase!=='leaving'&&c.phase!=='toLounge'&&c.phase!=='lounge'&&c.orderCounter==null;}
// One shared FIFO line feeds independently staffed counters. A customer keeps
// their assignment until ordering ends, including while approaching the desk.
export function assignOrderCounter(customers,count){
  const head=customers.find(waitingForCounter);
  if(!head||head.walking||Math.hypot(head.x-ORDER_QUEUE_GATE.x,head.z-ORDER_QUEUE_GATE.z)>.01)return null;
  const positions=orderCounterPositions(count);
  const index=positions.findIndex((_,i)=>!customers.some(c=>!c.ordered&&c.phase!=='leaving'&&c.orderCounter===i));
  if(index<0)return null;
  head.orderCounter=index;head.laneDistance=null;
  head.waypoints=[{x:positions[index].x,z:5.65},{x:positions[index].x,z:ORDER_SPOT_Z}];
  return head;
}
// The kiosk line is one FIFO line too: a kiosk customer queues on the shared walkway with no kiosk of their own, and the
// head of that line takes the first free kiosk once they are standing in it (never a kiosk picked at the door, which
// left one kiosk idle while its would-be user waited behind another and walked through the people ahead to reach it).
// Every other shopper who is not a lounge guest is offered a kiosk; `turn` counts only those shoppers, so the lounge,
// which takes guests by their arrival number, never takes the kiosks' share too.
export function takesKiosk(turn){return turn%2===0;}
export function waitingForKiosk(c){return c.kiosk&&c.idChecked===true&&!c.ordered&&c.kioskIndex==null&&c.phase==='kiosk';}
// Free kiosks are handed out in turn, starting after the one handed out last (`last`), so every installed kiosk gets
// customers; always taking the nearest free one left the far kiosks idle whenever the first could keep up.
export function assignKiosk(customers,count,last=-1){
  const head=customers.find(waitingForKiosk);
  if(!head||head.laneDistance==null||(head.waypoints&&head.waypoints.length))return null;
  for(let step=1;step<=count;step++){
    const index=((last+step)%count+count)%count;
    if(customers.some(c=>c.kiosk&&!c.ordered&&c.phase!=='leaving'&&c.kioskIndex===index))continue;
    head.kioskIndex=index;return head;
  }
  return null;
}
export function atOrderCounter(c,count){
  const position=orderCounterPositions(count)[c.orderCounter];
  return !!position&&!c.kiosk&&!c.ordered&&c.phase==='ordering'&&!c.walking&&Math.hypot(c.x-position.x,c.z-ORDER_SPOT_Z)<.01;
}
// Places in the pickup line: one per queue gap along its route, the head at the counter. The waiting-area upgrade
// can never promise more places than the roped route holds, so once it is full the order desks and kiosks hold the
// next order until someone collects and a spot opens (Kevin, 2026-10-19).
export function pickupLineSpots(routeLength,gap){
  return gap>0&&Number.isFinite(routeLength)&&routeLength>=0?Math.floor(routeLength/gap+1e-6)+1:1;
}
export function pickupPlaces(upgradeLimit,routeLength,gap){return Math.max(1,Math.min(upgradeLimit,pickupLineSpots(routeLength,gap)));}
// All staffed counters and kiosks share this reservation budget. Counting bags
// (rather than customers) prevents simultaneous baskets promising the same stock.
export function orderAvailability(customers,readyStock,pickupLimit){
  const waiting=customers.filter(c=>c.ordered&&!c.bag);
  return {bags:Math.max(0,readyStock-waiting.reduce((sum,c)=>sum+(c.bags||1),0)),places:Math.max(0,pickupLimit-waiting.length)};
}
