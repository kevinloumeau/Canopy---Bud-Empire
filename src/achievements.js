// Achievements: lasting goals across the whole game. Each one earned adds +1% to every sale for good, survives
// reopening, and is checked against the save itself, so an old save is credited on load with everything it already
// meets. Save shape: state.achievements = ['sold-100', …] (ids, in the order they were earned).
export const ACHIEVEMENT_BONUS=.01;
const sum=a=>a.reduce((t,v)=>t+v,0);
const minLine=s=>Math.min(...(s.lines||[0]));
const openStores=s=>(s.empire?.stores||[]).filter(b=>b&&b.level>0).length;
const kiosks=s=>(s.kiosk?1:0)+(s.secondKiosk?1:0)+(s.thirdKiosk?1:0);
// [id, name, goal, value(state), target]
const ROWS=[
 ['sold-100','First hundred','Sell 100 bags',s=>s.sold,100],
 ['sold-1k','Regular trade','Sell 1,000 bags',s=>s.sold,1e3],
 ['sold-10k','Busy counter','Sell 10,000 bags',s=>s.sold,1e4],
 ['sold-100k','Local institution','Sell 100,000 bags',s=>s.sold,1e5],
 ['rev-10k','Five figures','Earn $10K in one run',s=>s.lifetime,1e4],
 ['rev-1m','Millionaire','Earn $1M in one run',s=>s.lifetime,1e6],
 ['rev-100m','Big business','Earn $100M in one run',s=>s.lifetime,1e8],
 ['rev-10b','Bud baron','Earn $10B in one run',s=>s.lifetime,1e10],
 ['line-10','Established','Every station to Lv 10',minLine,10],
 ['line-30','Advanced line','Every station to Lv 30',minLine,30],
 ['line-50','Premium line','Every station to Lv 50',minLine,50],
 ['line-75','Flagship line','Every station to Lv 75',minLine,75],
 ['door-30','Tight door','Security to Lv 30',s=>s.idStaff,30],
 ['web-10','First routes','Deliver 10 online orders',s=>s.onlineCompleted,10],
 ['web-100','Drone regular','Deliver 100 online orders',s=>s.onlineCompleted,100],
 ['web-1k','Sky fleet','Deliver 1,000 online orders',s=>s.onlineCompleted,1e3],
 ['menu-4','Full menu','Unlock all four strains',s=>(s.strains||[]).filter(l=>l>0).length,4],
 ['strain-10','Top shelf','A strain to Lv 10',s=>Math.max(0,...(s.strains||[0])),10],
 ['cross-1','First cross','Breed a cultivar',s=>s.crosses?.done?.length||0,1],
 ['cross-6','Master breeder','Breed all six cultivars',s=>s.crosses?.done?.length||0,6],
 ['kiosk-3','Self-serve','Install three kiosks',kiosks,3],
 ['counter-3','Full counter','Staff three order counters',s=>s.orderCounters||0,3],
 ['lounge','Rooftop open','Open the lounge',s=>s.lounge||0,1],
 ['branch-1','Second shop','Open a branch',openStores,1],
 ['branch-all','Citywide','Open every branch',openStores,s=>(s.empire?.stores||[]).length||Infinity],
 ['reopen','Fresh start','Reopen for shares',s=>s.empire?.shares||0,1]
];
export const ACHIEVEMENTS=ROWS.map(([id,name,goal,value,target])=>({id,name,goal,value,target}));
const ids=ACHIEVEMENTS.map(a=>a.id);
export function migrateAchievements(raw){return (Array.isArray(raw)?raw:[]).filter((id,i,a)=>ids.includes(id)&&a.indexOf(id)===i);}
export const achievementBonus=state=>(state?.achievements?.length||0)*ACHIEVEMENT_BONUS;
function measure(state,a){const v=Number(a.value(state)),t=typeof a.target==='function'?a.target(state):a.target;return {value:Number.isFinite(v)?v:0,target:t};}
// Adds every achievement the state now meets and returns the new ones (empty when nothing changed).
export function checkAchievements(state){
 if(!Array.isArray(state.achievements))state.achievements=[];
 const earned=[];
 ACHIEVEMENTS.forEach(a=>{if(state.achievements.includes(a.id))return;const m=measure(state,a);if(m.value>=m.target){state.achievements.push(a.id);earned.push(a);}});
 return earned;
}
// The list as shown: earned ones first in the order earned, then the rest, closest to done first.
export function achievementRows(state){
 const done=state.achievements||[];
 const rows=ACHIEVEMENTS.map(a=>{const m=measure(state,a);return {...a,done:done.includes(a.id),value:Math.min(m.value,m.target),target:m.target,share:m.target>0?Math.min(1,m.value/m.target):0};});
 return [...rows.filter(r=>!r.done).sort((x,y)=>y.share-x.share),...rows.filter(r=>r.done).sort((x,y)=>done.indexOf(x.id)-done.indexOf(y.id))];
}
