// A narrative over the existing economy. Chapters never spend cash or grant revenue.
const stores = s => s.empire?.stores || [];
export const CHAPTERS = [
  {id:'first-bags', title:'The first familiar faces', story:'The lights are on. The shelves are filling. Give the neighborhood a reason to come back.', target:10, count:s=>s.sold || 0, task:'Sell 10 bags to walk-in customers', action:'Watch the pickup counter', destination:'pickup', memory:'Your first ten bags found their way into the neighborhood.'},
  {id:'rhythm', title:'A little room to grow', story:'A busy counter is a good problem. Give the whole crew room to keep up, from the first seed to the last handoff.', target:6, count:s=>(s.lines || []).filter(n=>n>=3).length, task:'Bring all six production stations to level 3', action:'Find the next station', destination:'stations', memory:'Six stations found their rhythm. The little shop started to hum.'},
  {id:'house-menu', title:'More than the usual', story:'Some visitors know exactly what they like. Others want to try something new. Make room for both.', target:2, count:s=>(s.strains || []).filter(n=>n>0).length, task:'Unlock two strains for your menu', action:'Explore the menu', destination:'flowers', memory:'A second strain gave your regulars something new to talk about.'},
  {id:'river', title:'Roots by the river', story:'Word is traveling beyond your block. A little cedar shop on the riverwalk could be your next beginning.', target:1, count:s=>stores(s)[0]?.level>0?1:0, task:'Open Riverside · $5K revenue and $5K cash', action:'Explore Riverside', destination:'river', memory:'Riverside opened its doors, with room for a different kind of grower.'},
  {id:'river-line', title:'A line by the river', story:'Riverside runs six stations of its own, from seeds to pickup. Bring each one up and the riverwalk shop starts to carry its weight.', target:6, count:s=>(stores(s)[0]?.lines || []).filter(n=>n>=3).length, task:'Bring every Riverside station to Lv 3', action:'Open Riverside', destination:'riverside', memory:'Riverside found its rhythm, one station at a time.'},
  {id:'city', title:'Three corners of the city', story:'Cedar by the river. Brick in Old Town. Glass above the city. Each shop has a place in the story.', target:3, count:s=>stores(s).filter(b=>b.level>0).length, task:'Open all three neighborhood stores', action:'Explore your stores', destination:'empire', memory:'Three neighborhoods, each with a shop of its own.'},
  {id:'stars', title:'Built to belong', story:'Every store earns its stars: a crowd, a full fit-out and a line that never stalls. Show the city what your shops can do.', target:3, count:s=>(s.empire?.stars || []).reduce((sum,bits)=>sum+[0,1,2].filter(k=>bits&1<<k).length,0), task:'Earn three stars across your stores', action:'See your stores', destination:'empire', memory:'Three stars, and a name the whole city knows.'}
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
