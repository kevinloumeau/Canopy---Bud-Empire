import test from 'node:test';import assert from 'node:assert/strict';
import {barPlan,ROUND,BEAT,SECTIONS,chordFor,isBreather,BREATHER_EVERY} from '../src/music.js';
const pc=n=>((n%12)+12)%12;
const F_MAJOR=new Set([5,7,9,10,0,2,4]);
test('every bar keeps its notes inside the bar and plays its chord, day and night',()=>{
 [false,true].forEach(night=>{for(let bar=0;bar<ROUND*BREATHER_EVERY;bar++){const plan=barPlan(bar,night);
  assert.ok(plan.every(e=>e.beat>=0&&e.beat<4),'bar '+bar);
  const keys=plan.filter(e=>e.kind==='keys').map(e=>e.note);chordFor(bar,night).forEach(n=>assert.ok(keys.includes(n)));
  if(!isBreather(bar))assert.ok(plan.some(e=>e.kind==='kick'),'bar '+bar+' has a kick');}});
});
test('the two sections alternate: A for bars 0–7, B for 8–15',()=>{
 assert.deepEqual(chordFor(0,false),SECTIONS.day.A[0]);assert.deepEqual(chordFor(8,false),SECTIONS.day.B[0]);
 assert.deepEqual(chordFor(4,true),SECTIONS.night.A[0]);assert.deepEqual(chordFor(13,true),SECTIONS.night.B[1]);
});
test('the piano answer sings only in the second half of each section',()=>{
 for(let bar=0;bar<ROUND;bar++)assert.equal(barPlan(bar).some(e=>e.kind==='lead'),bar%8>=4,'bar '+bar);
});
// The day A section (the original loop's Fmaj9 · Em9 · Dm9 · Cmaj9) is lydian-coloured on purpose; the day B section and
// all of the night stay inside F major / D minor, so the effects' F-major bells always fit.
test('every pitched note is in key (F major and its relative D minor share one scale)',()=>{
 [false,true].forEach(night=>{for(let bar=0;bar<ROUND;bar++){if(!night&&bar<8)continue;barPlan(bar,night).filter(e=>e.note!==undefined).forEach(e=>assert.ok(F_MAJOR.has(pc(e.note)),'bar '+bar+' '+e.kind+' '+e.note));}});
});
test('every fourth round rests the drums, and night is quieter than day',()=>{
 const drums=(bar,night)=>barPlan(bar,night).filter(e=>/kick|rim|hat/.test(e.kind));
 for(let bar=ROUND*(BREATHER_EVERY-1);bar<ROUND*BREATHER_EVERY;bar++)assert.equal(drums(bar).length,0);
 let day=0,night=0;for(let bar=0;bar<ROUND;bar++){day+=drums(bar,false).reduce((t,e)=>t+e.gain,0);night+=drums(bar,true).reduce((t,e)=>t+e.gain,0);}
 assert.ok(night<day*.6,'night kit plays at most 60% of the day kit');
 assert.ok(barPlan(0,true).some(e=>e.kind==='pad')&&!barPlan(0,false).some(e=>e.kind==='pad'));
});
test('the loop repeats exactly, so it never drifts',()=>{assert.deepEqual(barPlan(3),barPlan(3));assert.deepEqual(barPlan(70,true),barPlan(70,true));assert.ok(BEAT>.7&&BEAT<.9);});
