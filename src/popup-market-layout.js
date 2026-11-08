// Where the weekend market's pieces stand on its block (popup-event.js has the rules, three/popup-market.js builds the
// tents). Units are the main map's, relative to the block's centre (branch-districts.js districtCentre), +z toward the
// camera and the front street. The plot runs x -16..16, z -11.5..12 (POPUP_PLOT): four striped tents across the back
// facing the street, an aisle of festoon lights in front of them, café seating either side, and a lettered arch on the
// front edge where shoppers come in off the pavement.
export const STALL_X=[-10.5,-3.5,3.5,10.5], STALL_Z=-4.6, STALL_W=5.4, STALL_D=3.8;
// Where a shopper stands to buy at stall j, just in front of its counter.
export const stallFront=j=>({x:STALL_X[j]+(j%2?.6:-.6),z:STALL_Z+STALL_D/2+1.1});
export const ARCH={x:0,z:11.2,w:5.6,h:3.7};
// The lamp posts the festoon strings hang from, down the front of the aisle.
export const FESTOON_POSTS=[[-13.4,3.4],[-4.6,4.2],[4.6,4.2],[13.4,3.4]];
// The map tag stands over the arch.
export const POPUP_TAG={x:0,y:4.9,z:11.4};
// Blender props from the town's own set, as {file, x, z, rot, scale}.
export const POPUP_PROPS=[
  {file:'rooftop_parasol_table.glb',x:-11.8,z:4.2,rot:.3},{file:'rooftop_parasol_table.glb',x:-7.4,z:6.6,rot:-.2},
  {file:'street_cafe_table.glb',x:8,z:4.6,rot:.4},{file:'street_cafe_table.glb',x:11.6,z:6.9,rot:-.3},
  {file:'street_coffeecart.glb',x:14.2,z:1.2,rot:-Math.PI/2},
  {file:'street_planter_round.glb',x:-3.5,z:11.4,rot:0},{file:'street_planter_round.glb',x:3.5,z:11.4,rot:0},
  {file:'aframe_sign.glb',x:5.6,z:12.6,rot:-.35},
  {file:'street_bench.glb',x:-14.6,z:-.4,rot:0},{file:'street_bin.glb',x:-14.6,z:9.6,rot:0},
  {file:'street_shrub_planter.glb',x:-7,z:-9.6,rot:0},{file:'street_shrub_planter.glb',x:0,z:-9.6,rot:0},{file:'street_shrub_planter.glb',x:7,z:-9.6,rot:0},
  {file:'street_tree.glb',x:-14.6,z:-9.4,rot:1.1,scale:.95},{file:'street_tree.glb',x:14.6,z:-9.4,rot:2.4,scale:1},
  {file:'tree.glb#lawn',x:-14.4,z:11,rot:.7,scale:.85},{file:'tree.glb#lawn',x:14.4,z:11,rot:2,scale:.9},
  {file:'street_queue_post.glb',x:-1.3,z:10.2,rot:0},{file:'street_queue_post.glb',x:1.3,z:10.2,rot:0},
  // A shade tree in an iron grate in the middle of the square, benches either side of it.
  {file:'street_tree_grate.glb',x:0,z:4.4,rot:0},{file:'tree.glb#lawn',x:0,z:4.4,rot:.9,scale:1.05},
  {file:'street_bench.glb',x:-2.3,z:4.4,rot:0},{file:'street_bench.glb',x:2.3,z:4.4,rot:Math.PI},
  // Stock waiting behind the tents.
  {file:'street_deliveryboxes.glb',x:-12.6,z:-9.4,rot:.2},{file:'street_deliveryboxes.glb',x:11.6,z:-9.6,rot:-.3}
];

// Shoppers: each walks in under the arch, up the aisle to a stall, stops to buy, wanders to a table or the cart,
// and leaves back through the arch along the pavement. Pure: a walker's place at time t (seconds) along its own loop.
// `open` is how many stalls are open, so nobody queues at a stall still in its crates.
const SPEED=.95;
function route(k,open){
  const n=Math.max(1,open),j=(k*3+1)%n,f=stallFront(j),side=k%2?1:-1;
  const sit=side<0?{x:-9.4+(k%3)*.9,z:5.2+(k%2)*.8}:{x:9.6-(k%3)*.9,z:5.8+(k%2)*.6};
  const street={x:side*(10+k%4*2.5),z:14.6+(k%2)*.7};
  const lane=f.x<0?-3.3:3.3;
  return [{p:street,wait:0},{p:{x:side*.8,z:12.8},wait:0},{p:{x:lane,z:7.2},wait:0},{p:{x:lane,z:6.2},wait:0},{p:f,wait:3.5+k%3},{p:sit,wait:2.5+(k*7)%5},{p:{x:-side*.8,z:9.2},wait:0},{p:{x:-side*.8,z:12.8},wait:0},{p:{x:-side*(9+k%3*3),z:14.6+((k+1)%2)*.7},wait:0}];
}
// {x, z, heading:{x,z}, walked (distance so far, for the stride), moving, cast}
export function popupWalker(k,t,open){
  const pts=route(k,open),legs=[];let total=0;
  for(let i=0;i<pts.length;i++){const a=pts[i].p,b=pts[(i+1)%pts.length].p,len=Math.hypot(b.x-a.x,b.z-a.z);legs.push({a,b,len,wait:pts[i].wait});total+=pts[i].wait+len/SPEED;}
  let u=((t+k*11.3)%total+total)%total,walked=0;
  for(const leg of legs){
    if(u<leg.wait){const h=headingOf(leg.a,leg.b);return {x:leg.a.x,z:leg.a.z,heading:h,walked,moving:false};}
    u-=leg.wait;const dur=leg.len/SPEED;
    if(u<dur){const s=u/dur;walked+=leg.len*s;return {x:leg.a.x+(leg.b.x-leg.a.x)*s,z:leg.a.z+(leg.b.z-leg.a.z)*s,heading:headingOf(leg.a,leg.b),walked,moving:true};}
    u-=dur;walked+=leg.len;
  }
  const a=legs[0].a;return {x:a.x,z:a.z,heading:{x:0,z:1},walked,moving:false};
}
function headingOf(a,b){const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;return {x:dx/l,z:dz/l};}
// More stalls open, more shoppers: three with one stall, up to nine with all four.
export const popupCrowd=open=>Math.min(9,1+open*2);
