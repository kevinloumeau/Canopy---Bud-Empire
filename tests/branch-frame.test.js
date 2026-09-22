import test from 'node:test';
import assert from 'node:assert/strict';
import {BRANCH_THEMES, drawBranchMap} from '../src/branch-maps.js';

// The camera fits each branch scene to the viewport from BRANCH_THEMES[].frame, its projected bounding box at unit
// scale. Draw every scene through a recording projection and check the stored box still matches what is drawn.
const angle=.57,cos=Math.cos(angle),sin=Math.sin(angle);
function measure(index){
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  const project=(x,y,z)=>{const rx=x*cos-z*sin,rz=x*sin+z*cos;return {x:rx,y:rz*.5-y,depth:rz};};
  const track=q=>{minX=Math.min(minX,q.x);maxX=Math.max(maxX,q.x);minY=Math.min(minY,q.y);maxY=Math.max(maxY,q.y);};
  const box=(x,z,y,w,d,h)=>{for(const dx of [-w/2,w/2])for(const dz of [-d/2,d/2])for(const dy of [0,h])track(project(x+dx,y+dy,z+dz));};
  const gradient={addColorStop(){}};
  const ctx=new Proxy({createRadialGradient:()=>gradient,createLinearGradient:()=>gradient},{get:(t,k)=>k in t?t[k]:()=>{},set:()=>true});
  drawBranchMap({ctx,width:1000,height:800,unit:1,project,box,line:pts=>pts.forEach(q=>track(project(q[0],q[1],q[2]))),poly:pts=>pts.forEach(track),
    ellipse:(x,y,rx,ry)=>{track({x:x-rx,y:y-ry});track({x:x+rx,y:y+ry});},plant:(x,z,y,size=1)=>box(x,z,y,size,size,size*1.6),jar:(x,z,y)=>box(x,z,y,.3,.3,.4),
    carton:(x,z,y,size=.5)=>box(x,z,y,size,size,size),person:(x,z)=>box(x,z,0,.5,.5,1.7),depth:pos=>pos.x*sin+pos.z*cos,backdrop(){},night:null},index,5,1000,[1,1,1],{});
  return {w:maxX-minX,h:maxY-minY,cx:(minX+maxX)/2,cy:(minY+maxY)/2};
}

BRANCH_THEMES.forEach((theme,index)=>{
  test(theme.name+' frame matches the drawn scene',()=>{
    const drawn=measure(index),frame=theme.frame;
    for(const key of ['w','h','cx','cy'])assert.ok(Math.abs(drawn[key]-frame[key])<=.6,key+': frame '+frame[key]+' vs drawn '+drawn[key].toFixed(2));
    assert.ok(frame.w>=drawn.w-.05&&frame.h>=drawn.h-.05,'the frame must not be smaller than the scene');
  });
});
