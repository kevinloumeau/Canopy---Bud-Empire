// The manager on the floor (Kevin, 2026-11-09: "I kinda want canopy to be played as you are the manager pov"). The
// player is the manager: one more rigged figure in the flagship who walks to whichever station the player taps,
// taking the spiral stairs between floors, and works it hands-on while standing there: that station runs
// HANDS_ON times faster. Only live play counts (the away pay leaves the manager out), so the economy sims still hold.
//
// Pure: positions in map units (x, z on each floor, y the floor's height), a route as a list of points, and a step
// function that walks it. main.js owns the state, draws the figure and applies the factor.
export const HANDS_ON=1.5,WALK_SPEED=4.4,STAIR_SPEED=2.8;
export const FLOOR_Y=[0,4.7,9.4];
// Which floor each station stands on: Seeds and Grow on top, Harvest and Pack on the mezzanine, Orders and Pickup down.
export const STATION_FLOOR=[2,2,1,1,0,0];
// The corridor each floor's walks run along, behind the stations' fronts and clear of the staff at their posts.
export const CORRIDOR_Z=[.15,-2.6,-5.2];
// The two spiral stairs (map3d.js spiral()): ground to mezzanine, mezzanine to top. Each is climbed round its post at
// WALK_RADIUS, from the foot (off the floor below) to the arrival (facing the landing), then off onto the landing.
const STAIRS=[
  {cx:10.2,cz:.35,landing:{x:10.15,z:-1.75},off:{x:8.4,z:-2.3}},
  {cx:7.75,cz:-4.4,landing:{x:7.7,z:-6.15},off:{x:6,z:-5.6}},
];
const WALK_RADIUS=.72,FOOT_RADIUS=1.6,ARRIVE=-Math.PI/2,TREADS=14,TREAD=Math.PI*24/180;
// The climb: from the bottom tread round to the arrival, with the treads stepping back 24° each (map3d.js spiral).
function helix(stair,y0,y1){const pts=[],a0=ARRIVE+(TREADS-1)*TREAD,n=16;
  for(let k=0;k<=n;k++){const t=k/n,a=a0+(ARRIVE-a0)*t;pts.push({x:stair.cx+Math.cos(a)*WALK_RADIUS,y:y0+(y1-y0)*t,z:stair.cz+Math.sin(a)*WALK_RADIUS,stair:true});}
  return pts;}
function foot(stair,y){const a=ARRIVE+(TREADS+.5)*TREAD;return {x:stair.cx+Math.cos(a)*FOOT_RADIUS,y,z:stair.cz+Math.sin(a)*FOOT_RADIUS};}
// Up stair k (from floor k to k+1): the foot, the climb, the landing and the step off it.
function upStair(k){const s=STAIRS[k],y0=FLOOR_Y[k],y1=FLOOR_Y[k+1];
  return [foot(s,y0)].concat(helix(s,y0,y1),[{x:s.landing.x,y:y1,z:s.landing.z},{x:s.off.x,y:y1,z:s.off.z}]);}
// Where the manager stands to work each station, given the stations' centres (main.js machinePos, and for Orders the
// counter nearest the middle): beside the station on the corridor side, next to the crew, facing the work.
export function workSpots(machinePos,orderCounter){
  return machinePos.map((p,i)=>{const f=STATION_FLOOR[i],y=FLOOR_Y[f];
    if(i===4){const q=orderCounter||p;return {x:q.x+1.25,y,z:1.05,look:{x:-1,z:.6}};}
    if(i===5)return {x:p.x-1.3,y,z:1.05,look:{x:1,z:.6}};
    if(i===0)return {x:p.x+1.85,y,z:p.z-1.05,look:{x:-1,z:.5}};
    if(i===1)return {x:p.x+2.05,y,z:p.z-.7,look:{x:-1,z:.3}};
    return {x:p.x+1.7,y,z:p.z-1.3,look:{x:-1,z:.6}};});}
const floorOf=y=>FLOOR_Y.reduce((best,fy,k)=>Math.abs(fy-y)<Math.abs(FLOOR_Y[best]-y)?k:best,0);
// A walk on one floor, from a to b: out to the corridor, along it, then in to b.
function onFloor(a,b,f){const z=CORRIDOR_Z[f],y=FLOOR_Y[f],pts=[];
  if(Math.abs(a.z-z)>.05)pts.push({x:a.x,y,z});
  if(Math.abs(a.x-b.x)>.05)pts.push({x:b.x,y,z});
  pts.push({x:b.x,y,z:b.z});return pts;}
// The route from a point (with its y) to the spot: points to walk through in order, the spot last.
export function route(from,spot){let f=floorOf(from.y);const g=floorOf(spot.y);let at=from;const out=[];
  while(f!==g){const up=g>f,k=up?f:f-1,climb=upStair(k),leg=up?climb:climb.slice().reverse();
    out.push(...onFloor(at,leg[0],f));out.push(...leg.slice(1));at=leg[leg.length-1];f+=up?1:-1;}
  out.push(...onFloor(at,spot,f));
  return out.filter((p,i)=>i===0?Math.hypot(p.x-from.x,p.z-from.z)+Math.abs(p.y-from.y)>.01:true);}
// Where a tap on the screen lands for the manager: `ground(y)` turns the tap into the floor point at height y (or
// null), and `floors` are the shop's slabs ({y,x,z,w,d}). Upper floors are tried first, since they sit in front of the
// floors below from the camera. The spot is kept `margin` inside the slab's edges. Null when the tap misses the shop.
export function floorSpot(ground,floors,margin=.6){
  const order=floors.map((f,k)=>k).sort((a,b)=>floors[b].y-floors[a].y);
  for(const k of order){const f=floors[k],p=ground(f.y);if(!p)continue;const cx=f.x||0,hw=f.w/2-margin,hd=f.d/2-margin;
    if(Math.abs(p.x-cx)<=f.w/2&&Math.abs(p.z-f.z)<=f.d/2)return {x:Math.max(cx-hw,Math.min(cx+hw,p.x)),y:f.y,z:Math.max(f.z-hd,Math.min(f.z+hd,p.z)),floor:k};}
  return null;}
// Sends the walker to a free spot on the floor (no station: nothing works faster while they stand there).
export function sendToSpot(w,spot){w.target=-1;w.path=route(w,spot);w.look=null;w.moving=w.path.length>0;return w.moving;}
// A fresh manager: standing at their home station (`at`, -1 for none) on the given spot.
// `met`: the player has been shown who the manager is (the one-time "This is you" tip).
// The looks the player can pick for their manager (the start guide's first card, and the manager card later): Meshy
// people from the shoppers' cast, by model id (public/models/people/<id>.glb, portrait public/guide/avatars/<id>.webp,
// rendered by scripts/render-avatars.mjs). The first is the default. A shopper who would walk in as the manager's own
// model is recast (main.js), so the manager never meets their double.
export const AVATARS=[{id:'blazer-woman',name:'Blazer'},{id:'bomber-jacket-man',name:'Bomber'},{id:'office-woman',name:'Office'},{id:'green-sweater-man',name:'Sweater'},{id:'cream-outfit',name:'Cream'},{id:'gray-blazer',name:'Gray blazer'},{id:'trench-coat',name:'Trench'},{id:'pattern-shirt-man',name:'Pattern shirt'}];
export function avatarId(raw){return AVATARS.some(a=>a.id===raw)?raw:AVATARS[0].id;}
// `avatar`: the look picked. `xp`: floor calls handled (the manager's level comes from it, and a reopen keeps it). `called`: the first call's tip was shown.
export function migrateManager(raw){const at=raw&&Number.isInteger(raw.at)&&raw.at>=0&&raw.at<6?raw.at:-1,xp=raw&&Number.isFinite(raw.xp)?Math.max(0,Math.min(1e6,Math.floor(raw.xp))):0;
  return {at,met:!!(raw&&raw.met===true),xp,called:!!(raw&&raw.called===true),avatar:avatarId(raw&&raw.avatar)};}
// The live walker (not saved): where the figure is, the route left, the ground covered (drives the walk cycle).
export function createWalker(spot){return {x:spot.x,y:spot.y,z:spot.z,path:[],heading:spot.look||{x:-1,z:1},look:spot.look||null,ground:0,moving:false,target:-1};}
// Sends the walker to station i's spot. Returns false when already there (or on the way).
export function sendTo(w,i,spot){if(w.target===i&&(w.moving||Math.hypot(w.x-spot.x,w.z-spot.z)<.05&&Math.abs(w.y-spot.y)<.05))return false;
  w.target=i;w.path=route(w,spot);w.look=spot.look||null;w.moving=w.path.length>0;return true;}
// Walks dt seconds along the route. Stairs are climbed a little slower.
export function stepWalker(w,dt){if(!w.moving||!(dt>0))return w;let left=dt;
  while(left>0&&w.path.length){const p=w.path[0],speed=p.stair?STAIR_SPEED:WALK_SPEED,dx=p.x-w.x,dz=p.z-w.z,dy=p.y-w.y,d=Math.hypot(dx,dz),reach=speed*left;
    if(d>.001)w.heading={x:dx/d,z:dz/d};
    const span=Math.max(d,Math.abs(dy)*.6);
    if(span<=reach){w.x=p.x;w.y=p.y;w.z=p.z;w.ground+=d;left-=span/speed;w.path.shift();}
    else{const t=reach/span;w.x+=dx*t;w.z+=dz*t;w.y+=dy*t;w.ground+=d*t;left=0;}}
  if(!w.path.length)w.moving=false;
  return w;}
// The hands-on factor for station i: HANDS_ON while the manager stands at it (arrived, not walking), else 1.
// At manager level `level` (managerLevel below) the factor is handsOnAt(level).
export function handsOn(w,i,level=1){return w&&!w.moving&&w.target===i?handsOnAt(level):1;}

// Floor calls (2026-11-10, "play as the manager"): the manager's job loop. Every so often one station calls for the
// manager, with a lime tag on the map. Walk over (tap the tag or the station) and the manager handles it in CALL_WORK
// seconds: cash worth a few seconds of the shop's income, and one step toward the next manager level. Levels raise the
// hands-on speed and what a call pays. A call left alone closes after CALL_LASTS with nothing lost. Live play only, like
// the hands-on speed, so the away pay and the economy sims leave it out.
// name: the call's tag. doing: the manager's own tag while they handle it.
export const CALLS=[
  {name:'Sort seeds',doing:'Sorting seeds'},{name:'Check plants',doing:'Checking plants'},{name:'Check trim',doing:'Checking trim'},
  {name:'Check labels',doing:'Checking labels'},{name:'Greet guests',doing:'Greeting guests'},{name:'Restock bags',doing:'Restocking bags'}];
// Seconds: to the first call of a visit, between calls, to the next after one is missed, how long a call stays open
// (the clock stops while the manager is on the way) and how long handling it takes.
export const CALL_FIRST=25,CALL_EVERY=70,CALL_AFTER_MISS=40,CALL_LASTS=45,CALL_WORK=3;
// Calls handled to reach each level (Lv 1 at 0). Lv 10 is about four hours of answering every call.
export const LEVEL_CALLS=[0,3,8,15,25,40,60,90,130,180];
export const MANAGER_MAX=LEVEL_CALLS.length;
export function managerLevel(xp){let level=1;while(level<MANAGER_MAX&&xp>=LEVEL_CALLS[level])level++;return level;}
// Where the manager is inside their level: `share` of the way to the next (1 at the top), and the calls `left` to it.
export function levelProgress(xp){const level=managerLevel(xp);if(level>=MANAGER_MAX)return {level,share:1,left:0,max:true};
  const from=LEVEL_CALLS[level-1],to=LEVEL_CALLS[level];return {level,share:(xp-from)/(to-from),left:to-xp,max:false};}
// Hands-on speed: 1.5× at Lv 1, +0.1 a level (2.4× at Lv 10).
export function handsOnAt(level){return Math.round((HANDS_ON+.1*(Math.max(1,Math.min(MANAGER_MAX,level))-1))*10)/10;}
// A call pays this many seconds of the shop's income: 10 s at Lv 1, +2 s a level (28 s at Lv 10), never under $25.
// One call every 80 s or so adds about 12% to a played minute at Lv 1 and about a third at Lv 10, the size of a crew burst.
export function callSeconds(level){return 10+2*(Math.max(1,Math.min(MANAGER_MAX,level))-1);}
export function callPay(income,level){return Math.max(25,Math.round(Math.max(0,Number.isFinite(income)?income:0)*callSeconds(level)));}
// The live call clock (not saved: each visit starts CALL_FIRST from a call).
export function createCalls(){return {wait:CALL_FIRST,call:null};}
// Steps the calls by dt seconds for walker w. `built[i]`: station i exists. `roll` (0..1) picks the calling station,
// never the one the manager is at or heading to. Returns what just happened, or null:
// {type:'open'|'done'|'missed',station}.
export function tickCalls(c,dt,w,built,roll=Math.random()){
  if(!(dt>0)||!w)return null;
  if(!c.call){c.wait-=dt;if(c.wait>0)return null;
    const open=built.map((b,i)=>b&&i!==w.target?i:-1).filter(i=>i>=0);
    if(!open.length){c.wait=5;return null;}
    const station=open[Math.min(open.length-1,Math.floor(Math.max(0,roll)*open.length))];
    c.call={station,left:CALL_LASTS,work:0};return {type:'open',station};}
  const call=c.call,here=w.target===call.station;
  if(here&&!w.moving){call.work+=dt;if(call.work<CALL_WORK)return null;c.call=null;c.wait=CALL_EVERY;return {type:'done',station:call.station};}
  if(here)return null;
  call.work=0;call.left-=dt;if(call.left>0)return null;
  c.call=null;c.wait=CALL_AFTER_MISS;return {type:'missed',station:call.station};}
