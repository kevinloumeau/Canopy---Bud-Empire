import test from 'node:test';
import assert from 'node:assert/strict';
import {BRANCH_THEMES, drawBranchMap} from '../src/branch-maps.js';

// The 3D map draws a branch through the same code with api.model placing Blender props (main.js recordBranch). Draw a
// scene with every model ready and record what it places and which boxes it still draws.
function record(index){
  const models=[],boxes=[],project=(x,y,z)=>({x:x-z,y:(x+z)*.5-y});
  const gradient={addColorStop(){}};
  const ctx=new Proxy({createRadialGradient:()=>gradient,createLinearGradient:()=>gradient},{get:(t,k)=>k in t?t[k]:()=>{},set:()=>true});
  drawBranchMap({ctx,width:1000,height:800,unit:1,project,box:(x,z,y,w,d,h)=>boxes.push({x,z,y,w,d,h}),line(){},poly(){},ellipse(){},plant(){},jar(){},carton(){},person(){},
    depth:pos=>pos.x+pos.z,backdrop(){},night:null,realDepth:true,model:(file,x,z,y,rot,scale)=>{models.push({file,x,z,y,rot,scale});return true;}},index,5,1000,[1,1,1],{});
  return {models,boxes};
}

test('Riverside places its Blender boathouse, kayak rack and footbridge instead of drawing them', () => {
  const {models,boxes}=record(0),files=models.map(m=>m.file);
  for(const file of ['boathouse.glb','kayak_rack.glb','footbridge.glb'])assert.ok(files.includes(file),file+' placed');
  assert.ok(!boxes.some(b=>b.x===-18.7&&b.z===-3.3),'the drawn boathouse walls are left out');
  const bridge=models.find(m=>m.file==='footbridge.glb');
  assert.deepEqual(bridge.scale.map(v=>+v.toFixed(3)),[1,1,1],'Riverside\'s footbridge is the model at its own size');
});

test('trees, benches and lamps come from the Blender props in every branch', () => {
  BRANCH_THEMES.forEach((theme,index)=>{
    const files=new Set(record(index).models.map(m=>m.file.split('#')[0]));
    assert.ok(['tree.glb','street_tree.glb','street_lamp.glb','street_bench.glb'].some(f=>files.has(f)),theme.name+' uses props');
  });
});

test('every branch sits in land that covers its plot edges', () => {
  BRANCH_THEMES.forEach(theme=>{
    const {land}=theme;
    assert.ok(land&&/^#[0-9a-f]{6}$/i.test(land.colour),theme.name+' has a land colour');
    const [x0,x1,z0,z1]=land.plot;
    assert.ok(x0<x1&&z0<z1&&x1-x0>25&&z1-z0>20,theme.name+' plot is a real rectangle');
    (land.strips||[]).forEach(s=>assert.ok(typeof s.y==='number'&&/^#/.test(s.colour),theme.name+' strip has a level and colour'));
  });
});
