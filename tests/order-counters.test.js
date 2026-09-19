import test from 'node:test';
import assert from 'node:assert/strict';
import {migrateOrderCounters,orderCounterCost,buyOrderCounter,orderCounterPositions,assignOrderCounter,atOrderCounter,orderAvailability,ORDER_QUEUE_GATE} from '../src/order-counters.js';

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
  head.x=-4;head.z=4.9;assert.equal(atOrderCounter(head,3),true);
  head.walking=true;assert.equal(atOrderCounter(head,3),false);
});
test('parallel counters and kiosks reserve whole baskets without overbooking bags or pickup places',()=>{
  const queue=[customer(1,{ordered:true,bags:4}),customer(2,{ordered:true,bags:3}),customer(3,{ordered:true,bag:true,bags:9})];
  assert.deepEqual(orderAvailability(queue,10,3),{bags:3,places:1});
  queue.push(customer(4,{ordered:true,bags:3}));assert.deepEqual(orderAvailability(queue,10,3),{bags:0,places:0});
  assert.deepEqual(orderAvailability(queue,2,1),{bags:0,places:0});
});
