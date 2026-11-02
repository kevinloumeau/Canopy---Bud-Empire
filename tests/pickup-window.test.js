import test from 'node:test';
import assert from 'node:assert/strict';
import {walkupShare,walkupCount,windowSlot,createWindowLine,addWalkups,stepWindowLine,windowFigures,WINDOW_LINE_MAX, migrateWindow, windowLineMax, windowServeSeconds, windowRoom, WINDOW_COST, WINDOW_MAX_LEVEL, windowLevelCost, windowLevelsFor, windowPay, windowLook, nextWindowLook, walkupFraction, windowRequestBoost} from '../src/pickup-window.js';

const stairs=()=>[[18,-2.2,7],[18,-2.2,8.2],[18,0,12.1],[17.8,0,13.1]];
const HIDDEN=7.9;

test('one online order in three is a walk-up, counted by order number',()=>{
  assert.deepEqual([0,1,2,3,4,5].map(walkupShare),[false,false,true,false,false,true]);
  assert.equal(walkupCount(0,3),1);assert.equal(walkupCount(46,10),3);assert.equal(walkupCount(5,0),0);
});
test('the line holds a fixed number and turns the rest back to the drones',()=>{
  const line=createWindowLine();
  assert.equal(addWalkups(line,4,stairs),4);assert.equal(addWalkups(line,10,stairs),WINDOW_LINE_MAX-4);assert.equal(addWalkups(line,1,stairs),0);
});
test('walk-ups climb out, queue in place, are served one at a time and go back down with a bag',()=>{
  const line=createWindowLine();addWalkups(line,3,stairs);
  assert.equal(windowFigures(line,HIDDEN).length,0,'everyone starts out of sight');
  const served=new Set();let sawServing=false;
  for(let t=0;t<120;t+=.1){
    sawServing=stepWindowLine(line,.1,stairs)||sawServing;
    line.people.forEach(p=>{if(p.bag)served.add(p.id)});
    assert.ok(line.people.filter(p=>p.phase==='queue'&&p.serve>0&&!p.bag).length<=1,'one at the hatch at a time');
    if(t>14&&t<15){const q=line.people.filter(p=>p.phase==='queue');if(q.length)assert.deepEqual({x:q[0].x,z:q[0].z},windowSlot(0))}
  }
  assert.ok(sawServing);assert.equal(line.people.length,0,'all three went back down');
  assert.equal(served.size,3);
});
test('places run back along the pavement from the hatch',()=>{
  const a=windowSlot(0),b=windowSlot(1),c=windowSlot(2);
  assert.ok(b.x<a.x&&c.x<b.x);assert.equal(b.z,c.z);
});
test('figures face the hatch while standing and never show below the stairs',()=>{
  const line=createWindowLine();addWalkups(line,2,stairs);
  for(let t=0;t<30;t+=.1){stepWindowLine(line,.1,stairs);windowFigures(line,HIDDEN).forEach(f=>{assert.ok(f.z>HIDDEN);if(!f.moving)assert.equal(f.facing,1)})}
});

test('the window is its own buy; saves from before keep it, their hatch and tip jar as levels', () => {
  assert.deepEqual(migrateWindow(undefined, false), { owned: false, level: 0 });
  assert.deepEqual(migrateWindow(undefined, true), { owned: true, level: 1 });
  assert.deepEqual(migrateWindow({ owned: true, hatch: true, tips: 'yes' }, false), { owned: true, level: 10 });
  assert.deepEqual(migrateWindow({ owned: true, hatch: true, tips: true }, false), { owned: true, level: 15 });
  assert.deepEqual(migrateWindow({ owned: true, hatch: false, tips: true }, false), { owned: true, level: 6 });
  assert.deepEqual(migrateWindow({ owned: false, hatch: true, tips: true }, false), { owned: false, level: 0 });
  assert.deepEqual(migrateWindow({ owned: true, level: 40 }, false), { owned: true, level: 40 });
  assert.deepEqual(migrateWindow({ owned: true, level: 900 }, false), { owned: true, level: WINDOW_MAX_LEVEL });
});

test('levels cost more each time, and the cash buys as many as it covers', () => {
  for (let l = 1; l < WINDOW_MAX_LEVEL; l++) assert.ok(windowLevelCost(l + 1) > windowLevelCost(l));
  assert.ok(windowLevelCost(1) >= WINDOW_COST * .5);
  const q = windowLevelsFor(1, windowLevelCost(1) + windowLevelCost(2) + 1);
  assert.deepEqual(q, { levels: 2, cost: windowLevelCost(1) + windowLevelCost(2) });
  assert.equal(windowLevelsFor(WINDOW_MAX_LEVEL, 1e30).levels, 0);
});

test('looks change at the station look levels, and each one adds something', () => {
  assert.deepEqual([1, 9, 10, 29, 30, 50, 75].map(windowLook), [1, 1, 2, 2, 3, 4, 5]);
  assert.equal(nextWindowLook(1), 10); assert.equal(nextWindowLook(75), null);
  const at = level => ({ owned: true, level });
  assert.deepEqual([1, 10, 30].map(l => windowLineMax(at(l))), [6, 10, 12]);
  assert.deepEqual([1, 10, 30].map(l => windowServeSeconds(at(l))), [4.5, 3, 2]);
  assert.equal(windowRequestBoost(at(49)), 1); assert.equal(windowRequestBoost(at(50)), 1.25);
  assert.deepEqual([1, 30, 75].map(walkupFraction), [1 / 3, 1 / 2, 2 / 3]);
  assert.equal(windowPay(1), 1); assert.ok(Math.abs(windowPay(9) - 1.4) < 1e-9 && Math.abs(windowPay(10) - 1.45 * 1.5) < 1e-9);
  assert.ok(Math.abs(windowPay(75) - 4.7 * 1.5 ** 4) < 1e-9, 'Lv 75 pays 4.7 x 1.5^4');
});

test('the walk-up share follows the level, counted by order number', () => {
  for (const level of [1, 30, 75]) assert.equal(walkupCount(0, 600, level), Math.round(600 * walkupFraction(level)));
});

test('the second hatch (Lv 10) lengthens the line and quickens the hand-off', () => {
  const plain = { owned: true, level: 1 }, hatch = { owned: true, level: 10 };
  assert.equal(windowLineMax(plain), 6); assert.equal(windowLineMax(hatch), 10);
  assert.ok(windowServeSeconds(hatch) < windowServeSeconds(plain));
  const line = createWindowLine(), stairs = () => [[18, 0, 10], [18, 0, 13]];
  assert.equal(addWalkups(line, 12, stairs, windowLineMax(hatch)), 10);
  assert.equal(windowRoom(line, hatch), 0); assert.equal(windowRoom(line, plain), 0);
  // Served faster with the hatch: run both lines the same time and compare who has gone.
  const slow = createWindowLine(), fast = createWindowLine();
  addWalkups(slow, 4, stairs); addWalkups(fast, 4, stairs);
  for (let t = 0; t < 20; t += .1) { stepWindowLine(slow, .1, stairs, windowServeSeconds(plain)); stepWindowLine(fast, .1, stairs, windowServeSeconds(hatch)); }
  assert.ok(windowRoom(fast, plain) > windowRoom(slow, plain));
});
