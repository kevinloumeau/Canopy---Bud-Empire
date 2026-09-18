import test from 'node:test';
import assert from 'node:assert/strict';
import {requestCap,requestRate,accrueRequests,requestsReady,consumeRequests,requestHeat,REQUEST_MAX_RATE} from '../src/deliveries.js';
test('cap starts at 12 and grows one per ten completed orders up to 40',()=>{assert.equal(requestCap(0),12);assert.equal(requestCap(9),12);assert.equal(requestCap(10),13);assert.equal(requestCap(1000),40);assert.equal(requestCap(undefined),12)});
test('rate needs an order desk, starts at one per 45s and caps at one per 5s',()=>{assert.equal(requestRate(0,0),0);assert.equal(requestRate(0,1),1/45);assert.ok(requestRate(100,1)>requestRate(0,1));assert.equal(requestRate(100000,1),REQUEST_MAX_RATE)});
test('accrual respects the cap, ignores negative time and rounds down when read',()=>{const s={onlineCompleted:0,onlineRequests:0,lines:[1,1,1,1,1,1]};accrueRequests(s,45);assert.ok(Math.abs(s.onlineRequests-1)<1e-9);assert.equal(requestsReady(s),1);accrueRequests(s,-5);assert.ok(s.onlineRequests>=1);accrueRequests(s,1e6);assert.equal(s.onlineRequests,12);assert.equal(requestsReady({onlineRequests:2.9}),2)});
test('dispatch consumes whole requests and never goes negative',()=>{const s={onlineRequests:2.5};consumeRequests(s,1);assert.equal(s.onlineRequests,1.5);consumeRequests(s,10);assert.equal(s.onlineRequests,0)});
test('heat steps at one, three and six waiting requests',()=>{assert.deepEqual([0,1,2,3,5,6,40].map(requestHeat),[0,1,1,2,2,3,3])});

test('web marketing raises the request rate, its ceiling and the waiting cap',()=>{assert.ok(Math.abs(requestRate(0,1,4)-(1/45)*2)<1e-12);assert.ok(Math.abs(requestRate(100000,1,8)-REQUEST_MAX_RATE*3)<1e-12);assert.equal(requestCap(0,3),24);assert.equal(requestCap(0,undefined),12);const s={onlineCompleted:0,onlineRequests:0,lines:[1,1,1,1,1,1],webLevel:4};accrueRequests(s,45);assert.ok(Math.abs(s.onlineRequests-2)<1e-9)});
