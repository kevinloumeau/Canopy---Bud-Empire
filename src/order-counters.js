export const ORDER_COUNTER_COSTS=[2500,12500];
export const ORDER_QUEUE_GATE={x:-4,z:6.1};
const POSITIONS=[{x:-4,z:2.5},{x:-6.6,z:2.5},{x:-1.4,z:2.5}];

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
export function waitingForCounter(c){return c.idChecked!==false&&!c.kiosk&&!c.ordered&&c.phase!=='leaving'&&c.orderCounter==null;}
// One shared FIFO line feeds independently staffed counters. A customer keeps
// their assignment until ordering ends, including while approaching the desk.
export function assignOrderCounter(customers,count){
  const head=customers.find(waitingForCounter);
  if(!head||head.walking||Math.hypot(head.x-ORDER_QUEUE_GATE.x,head.z-ORDER_QUEUE_GATE.z)>.01)return null;
  const positions=orderCounterPositions(count);
  const index=positions.findIndex((_,i)=>!customers.some(c=>!c.ordered&&c.phase!=='leaving'&&c.orderCounter===i));
  if(index<0)return null;
  head.orderCounter=index;head.laneDistance=null;
  head.waypoints=[{x:positions[index].x,z:5.65},{x:positions[index].x,z:4.9}];
  return head;
}
export function atOrderCounter(c,count){
  const position=orderCounterPositions(count)[c.orderCounter];
  return !!position&&!c.kiosk&&!c.ordered&&c.phase==='ordering'&&!c.walking&&Math.hypot(c.x-position.x,c.z-4.9)<.01;
}
// All staffed counters and kiosks share this reservation budget. Counting bags
// (rather than customers) prevents simultaneous baskets promising the same stock.
export function orderAvailability(customers,readyStock,pickupLimit){
  const waiting=customers.filter(c=>c.ordered&&!c.bag);
  return {bags:Math.max(0,readyStock-waiting.reduce((sum,c)=>sum+(c.bags||1),0)),places:Math.max(0,pickupLimit-waiting.length)};
}
