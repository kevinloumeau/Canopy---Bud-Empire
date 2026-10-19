import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateOrderCounters,orderCounterCost,buyOrderCounter,orderCounterPositions,assignOrderCounter,assignKiosk,takesKiosk,atOrderCounter,orderAvailability,pickupLineSpots,pickupPlaces,ORDER_QUEUE_GATE,ORDER_SPOT_Z} from '../src/order-counters.js';

test('old saves retain one counter and malformed expansion levels cannot add counters',()=>{
  for(const value of [undefined,null,NaN,Infinity,'3',{},-2,0])assert.equal(migrateOrderCounters(value),1);
  assert.equal(migrateOrderCounters(2.9),2);assert.equal(migrateOrderCounters(99),3);
});
test('expansion charges each tier once, caps at three, and survives JSON reload',()=>{
  const state={money:2499};assert.equal(buyOrderCounter(state),false);assert.equal(state.money,2499);
  state.money=15000;assert.equal(buyOrderCounter(state),true);assert.equal(state.orderCounters,2);assert.equal(state.money,12500);
  const loaded=JSON.parse(JSON.stringify(state));assert.equal(buyOrderCounter(loaded),true);assert.equal(loaded.orderCounters,3);assert.equal(loaded.money,0);
  assert.equal(buyOrderCounter(loaded),false);assert.equal(orderCounterCost(3),null);
});
function customer(id,extra={}){return {id,idChecked:true,kiosk:false,ordered:false,bag:false,phase:'ordering',walking:false,...ORDER_QUEUE_GATE,...extra};}
test('the shared queue assigns separate desks in FIFO order and retains occupied desks',()=>{
  const queue=[customer(1),customer(2),customer(3),customer(4)];
  assert.equal(assignOrderCounter(queue,1),queue[0]);assert.equal(assignOrderCounter(queue,1),null);
  assert.equal(assignOrderCounter(queue,2),queue[1]);assert.equal(assignOrderCounter(queue,3),queue[2]);
  assert.deepEqual(queue.slice(0,3).map(c=>c.orderCounter),[0,1,2]);assert.equal(assignOrderCounter(queue,3),null);
  queue[1].ordered=true;assert.equal(assignOrderCounter(queue,3),queue[3]);assert.equal(queue[3].orderCounter,1);
  const positions=orderCounterPositions(3);assert.equal(new Set(positions.map(p=>p.x)).size,3);
});
test('customers must pass security, reach the queue head, and walk to their own desk before service',()=>{
  const unchecked=customer(0,{idChecked:false}),kiosk=customer(1,{kiosk:true}),head=customer(2,{z:7}),later=customer(3);
  assert.equal(assignOrderCounter([unchecked,kiosk,head,later],3),null);
  head.z=ORDER_QUEUE_GATE.z;head.walking=true;assert.equal(assignOrderCounter([head],3),null);
  head.walking=false;assignOrderCounter([head],3);assert.equal(atOrderCounter(head,3),false);
  head.x=orderCounterPositions(3)[0].x;head.z=ORDER_SPOT_Z;assert.equal(atOrderCounter(head,3),true);
  head.walking=true;assert.equal(atOrderCounter(head,3),false);
});
test('parallel counters and kiosks reserve whole baskets without overbooking bags or pickup places',()=>{
  const queue=[customer(1,{ordered:true,bags:4}),customer(2,{ordered:true,bags:3}),customer(3,{ordered:true,bag:true,bags:9})];
  assert.deepEqual(orderAvailability(queue,10,3),{bags:3,places:1});
  queue.push(customer(4,{ordered:true,bags:3}));assert.deepEqual(orderAvailability(queue,10,3),{bags:0,places:0});
  assert.deepEqual(orderAvailability(queue,2,1),{bags:0,places:0});
});
test('a full pickup line holds the next order at the desks and kiosks until someone collects',()=>{
  // Today's pickup route is 9.5 long with people 0.8 apart: twelve spots, so the waiting-area upgrade stops there.
  assert.equal(pickupLineSpots(9.5,.8),12);assert.equal(pickupLineSpots(8,.8),11);
  assert.equal(pickupPlaces(4,9.5,.8),4);assert.equal(pickupPlaces(28,9.5,.8),12);
  assert.equal(pickupPlaces(28,NaN,.8),1);assert.equal(pickupPlaces(0,9.5,.8),1);
  const limit=pickupPlaces(28,9.5,.8),line=[];
  for(let i=0;i<limit;i++)line.push(customer(i,{ordered:true,bags:1,kiosk:i%2===0}));
  // Counter and kiosk orders share one check, so neither can push a thirteenth customer into the line.
  assert.equal(orderAvailability(line,100,limit).places,0);
  // The head collects and walks off: exactly one spot opens for the next checked-out customer.
  line[0].bag=true;assert.equal(orderAvailability(line,100,limit).places,1);
});
function kioskCustomer(id,extra={}){return {id,idChecked:true,kiosk:true,ordered:false,bag:false,phase:'kiosk',walking:false,kioskIndex:null,laneDistance:1.3,waypoints:[],...extra};}
test('the kiosk line sends its head to the first free kiosk, in line order, and nobody else',()=>{
  const line=[kioskCustomer(1,{kioskIndex:0,laneDistance:0}),kioskCustomer(2,{kioskIndex:2,laneDistance:0}),kioskCustomer(3),kioskCustomer(4,{laneDistance:1.95})];
  // Kiosk 1 is free: the customer at the front of the waiting line takes it, not the one behind.
  assert.equal(assignKiosk(line,3),line[2]);assert.equal(line[2].kioskIndex,1);assert.equal(line[3].kioskIndex,null);
  // Every kiosk is busy now, so the next customer keeps waiting.
  assert.equal(assignKiosk(line,3),null);
  // A kiosk frees when its customer orders; the next in line takes that one.
  line[1].ordered=true;assert.equal(assignKiosk(line,3),line[3]);assert.equal(line[3].kioskIndex,2);
  // Only kiosks that are installed are handed out.
  const one=[kioskCustomer(5,{kioskIndex:0,laneDistance:0}),kioskCustomer(6)];assert.equal(assignKiosk(one,1),null);
});
test('a kiosk customer still walking in from the ID desk is not handed a kiosk yet',()=>{
  const walking=[kioskCustomer(1,{phase:'entering',laneDistance:2.7,waypoints:[{x:-9.7,z:8.15}]})];
  assert.equal(assignKiosk(walking,3),null);assert.equal(walking[0].kioskIndex,null);
  walking[0].phase='kiosk';walking[0].waypoints=[];assert.equal(assignKiosk(walking,3),walking[0]);assert.equal(walking[0].kioskIndex,0);
});
test('free kiosks are handed out in turn, so a quiet shop still uses every kiosk',()=>{
  const used=[];let last=-1;
  for(let id=1;id<=6;id++){
    // One customer at a time, each ordering before the next arrives: the nearest kiosk is always free.
    const line=[kioskCustomer(id)],head=assignKiosk(line,3,last);used.push(head.kioskIndex);last=head.kioskIndex;
  }
  assert.deepEqual(used,[0,1,2,0,1,2]);
  // A busy kiosk is skipped and the turn moves on to the next free one.
  const busy=[kioskCustomer(1,{kioskIndex:1,laneDistance:0}),kioskCustomer(2)];
  assert.equal(assignKiosk(busy,3,0).kioskIndex,2);
  // Two kiosks installed: the turn wraps within them.
  assert.equal(assignKiosk([kioskCustomer(3)],2,1).kioskIndex,0);
});
test('with the lounge open, half of the other shoppers still use a kiosk at every lounge level',async()=>{
  const {wantsLounge}=await import('../src/lounge.js');
  for(let level=0;level<=8;level++){
    let turn=0,shoppers=0,kiosk=0;
    for(let id=0;id<400;id++){
      if(wantsLounge(level,id,'regular'))continue;
      shoppers++;if(takesKiosk(turn++))kiosk++;
    }
    assert.ok(shoppers>0&&Math.abs(kiosk-shoppers/2)<=1,`lounge level ${level}: ${kiosk} of ${shoppers} shoppers used a kiosk`);
  }
});
