// A narrative over the existing economy. Chapters never spend cash or grant revenue.
const stores = s => s.empire?.stores || [];
export const CHAPTERS = [
  {id:'first-bags', title:'The first familiar faces', story:'The lights are on. The shelves are filling. Give the neighborhood a reason to come back.', target:10, count:s=>s.sold || 0, task:'Sell 10 walk-in bags', action:'Watch the pickup counter', destination:'pickup', memory:'Your first ten bags found their way into the neighborhood.'},
  {id:'rhythm', title:'A little room to grow', story:'A busy counter is a good problem. Give the whole crew room to keep up, from the first seed to the last handoff.', target:6, count:s=>(s.lines || []).filter(n=>n>=3).length, task:'All six stations to Lv 3', action:'Find the next station', destination:'stations', memory:'Six stations found their rhythm. The little shop started to hum.'},
  {id:'house-menu', title:'More than the usual', story:'Some visitors know exactly what they like. Others want to try something new. Make room for both.', target:2, count:s=>(s.strains || []).filter(n=>n>0).length, task:'Unlock two strains for your menu', action:'Explore the menu', destination:'flowers', memory:'A second strain gave your regulars something new to talk about.'},
  {id:'river', title:'Roots by the river', story:'Word is traveling beyond your block. A little cedar shop on the riverwalk could be your next beginning.', target:1, count:s=>stores(s)[0]?.level>0?1:0, task:'Open Riverside · $5K revenue and $5K cash', action:'Explore Riverside', destination:'river', memory:'Riverside opened its doors, with room for a different kind of grower.'},
  {id:'river-line', title:'A line by the river', story:'Riverside runs six stations of its own, from seeds to pickup. Bring each one up and the riverwalk shop starts to carry its weight.', target:6, count:s=>(stores(s)[0]?.lines || []).filter(n=>n>=3).length, task:'Bring every Riverside station to Lv 3', action:'Open Riverside', destination:'riverside', memory:'Riverside found its rhythm, one station at a time.'},
  {id:'city', title:'Three corners of the city', story:'Cedar by the river. Brick in Old Town. Glass above the city. Each shop has a place in the story.', target:3, count:s=>stores(s).filter(b=>b.level>0).length, task:'Open all three neighborhood stores', action:'Explore your stores', destination:'empire', memory:'Three neighborhoods, each with a shop of its own.'},
  {id:'stars', title:'Built to belong', story:'Every store earns its stars: a crowd, a full fit-out and a line that never stalls. Show the city what your shops can do.', target:3, count:s=>(s.empire?.stars || []).reduce((sum,bits)=>sum+[0,1,2].filter(k=>bits&1<<k).length,0), task:'Earn three stars across your stores', action:'See your stores', destination:'empire', memory:'Three stars, and a name the whole city knows.'},
  // The long road (2026-11-07 review): the first seven chapters were all done by about minute 24, so the story now
  // follows the empire through the far branches, Canopy HQ, the four city buildings and the first reopening.
  {id:'full-house', title:'A full house', story:'One shop with all three stars is a shop people talk about. Finish one branch completely.', target:1, count:s=>stores(s).filter((_,i)=>[0,1,2].every(k=>(s.empire?.stars?.[i]||0)&1<<k)).length, task:'Earn all three stars at one store', action:'See your stores', destination:'empire', memory:'One store with every star. The rest of the street took note.'},
  {id:'oasis', title:'Out on the highway', story:'Past the city limits, a courtyard shop waits on the desert highway for travellers who need a rest.', target:1, count:s=>stores(s)[3]?.level>0?1:0, task:'Open Desert Oasis', action:'Explore Desert Oasis', destination:'store3', memory:'Desert Oasis opened its gates to the highway.'},
  {id:'alpine', title:'Up among the pines', story:'High in the mountains, a timber lodge could be the quietest shop you ever run.', target:1, count:s=>stores(s)[4]?.level>0?1:0, task:'Open Alpine', action:'Explore Alpine', destination:'store4', memory:'Alpine lit its fire, and the empire reached the mountains.'},
  {id:'warehouse', title:'Room for the overflow', story:'Big days need somewhere to keep the extra. A warehouse round the block keeps sales coming while you are away.', target:1, count:s=>s.city?.warehouse>0?1:0, task:'Build the Warehouse on the map', action:'Find it on the map', destination:'map', memory:'The Warehouse opened its loading dock.'},
  {id:'growhouse', title:'Glass and green', story:'A glasshouse of your own means every station has more to work with.', target:1, count:s=>s.city?.growhouse>0?1:0, task:'Build the Grow house on the map', action:'Find it on the map', destination:'map', memory:'The Grow house filled with light and leaves.'},
  {id:'hq', title:'A home for the empire', story:'Every empire needs a headquarters. Break ground on Canopy HQ and every shop sells more.', target:1, count:s=>(s.flagship||0)>0?1:0, task:'Break ground on Canopy HQ', action:'Find it on the map', destination:'map', memory:'Canopy HQ rose over the block.'},
  {id:'billboard', title:'Your name in lights', story:'People cannot visit a shop they have never heard of. Put Canopy on the skyline.', target:1, count:s=>s.city?.billboard>0?1:0, task:'Build the Billboard on the map', action:'Find it on the map', destination:'map', memory:'The Billboard went up, and the walk-ins followed.'},
  {id:'terplab', title:'The flavour of the month', story:'The best growers chase flavour. A terp lab makes your trending strains the talk of the city.', target:1, count:s=>s.city?.terplab>0?1:0, task:'Build the Terp lab on the map', action:'Find it on the map', destination:'map', memory:'The Terp lab opened its first flavour library.'},
  {id:'reopen', title:'Doors open again', story:'Every empire can start over stronger. Reopen for shares and run it all again, faster.', target:1, count:s=>(s.empire?.prestige||0)>0?1:0, task:'Reopen your empire for shares', action:'See reopening', destination:'empire', memory:'You reopened, and the city welcomed you back.'}
];
export function migrateJourney(raw) {
  const ids = Array.isArray(raw?.completed) ? raw.completed : [];
  return {completed:CHAPTERS.filter(c=>ids.includes(c.id)).map(c=>c.id)};
}
export function advanceJourney(state) {
  const journal=state.journey, added=[];
  for(const c of CHAPTERS) if(!journal.completed.includes(c.id) && c.count(state)>=c.target) {
    journal.completed.push(c.id); added.push(c.id);
  }
  return added;
}
export function currentChapter(state) {
  const index=CHAPTERS.findIndex(c=>!state.journey.completed.includes(c.id));
  if(index<0)return null;
  const chapter=CHAPTERS[index];
  return {...chapter,index,progress:Math.max(0,Math.min(chapter.target,chapter.count(state)))};
}
