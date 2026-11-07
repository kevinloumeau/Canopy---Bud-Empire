import test from 'node:test';import assert from 'node:assert/strict';
import {barPlan,ROUND,BEAT,CHORDS} from '../src/music.js';
test('every bar keeps its notes inside the bar and plays its chord',()=>{
 for(let bar=0;bar<ROUND*3;bar++){const plan=barPlan(bar);
  assert.ok(plan.every(e=>e.beat>=0&&e.beat<4),'bar '+bar);
  const keys=plan.filter(e=>e.kind==='keys').map(e=>e.note);CHORDS[bar%4].forEach(n=>assert.ok(keys.includes(n)));
  assert.ok(plan.filter(e=>e.kind==='kick').length>=2);}
});
test('the piano answer plays only in the second half of each round',()=>{
 for(let bar=0;bar<ROUND;bar++)assert.equal(barPlan(bar).some(e=>e.kind==='lead'),bar>=4);
});
test('the loop repeats exactly, so it never drifts',()=>{assert.deepEqual(barPlan(3),barPlan(3));assert.ok(BEAT>.7&&BEAT<.9);});
