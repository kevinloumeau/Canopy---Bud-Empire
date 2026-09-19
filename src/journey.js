// A narrative over the existing economy. Chapters never spend cash or grant revenue.
const stores = s => s.empire?.stores || [];
const neighbors = s => s.empire?.network?.stores || [];
export const CHAPTERS = [
  {id:'first-bags', title:'The first familiar faces', story:'The lights are on. The shelves are filling. Give the neighborhood a reason to come back.', target:10, count:s=>s.sold || 0, task:'Sell 10 bags to walk-in customers', action:'Watch the pickup counter', destination:'pickup', memory:'Your first ten bags found their way into the neighborhood.'},
  {id:'rhythm', title:'A little room to grow', story:'A busy counter is a good problem. Give the whole crew room to keep up, from the first seed to the last handoff.', target:6, count:s=>(s.lines || []).filter(n=>n>=3).length, task:'Bring all six production stations to level 3', action:'Find the next station', destination:'stations', memory:'Six stations found their rhythm. The little shop started to hum.'},
  {id:'house-menu', title:'More than the usual', story:'Some visitors know exactly what they like. Others want to try something new. Make room for both.', target:2, count:s=>(s.strains || []).filter(n=>n>0).length, task:'Unlock two strains for your menu', action:'Explore the menu', destination:'flowers', memory:'A second strain gave your regulars something new to talk about.'},
  {id:'river', title:'Roots by the river', story:'Word is traveling beyond your block. A little cedar shop on the riverwalk could be your next beginning.', target:1, count:s=>stores(s)[0]?.level>0?1:0, task:'Open Riverside · $5K revenue and $5K cash', action:'Explore Riverside', destination:'river', memory:'Riverside opened its doors, with room for a different kind of grower.'},
  {id:'mara', title:'Someone knows your name', story:'Mara runs the riverwalk gardening club. Fill her first request and turn a passing visit into a connection.', target:1, count:s=>neighbors(s)[0]?.relationship>0?1:0, task:'Fill Mara’s first request at Riverside', action:'Meet Mara', destination:'mara', memory:'Mara brought your first order back to the gardening club.'},
  {id:'city', title:'Three corners of the city', story:'Cedar by the river. Brick in Old Town. Glass above the city. Each shop has a place in the story.', target:3, count:s=>stores(s).filter(b=>b.level>0).length, task:'Open all three neighborhood stores', action:'Explore your stores', destination:'empire', memory:'Three neighborhoods, each with a shop of its own.'},
  {id:'regulars', title:'Built to belong', story:'Mara has her gardening club, Sol has a studio, and Kit has one more route to ride. Build something they can count on.', target:3, count:s=>neighbors(s).filter(b=>b.relationship>0).length, task:'Fill a first request for Mara, Sol and Kit', action:'Meet the next regular', destination:'regulars', memory:'Mara, Sol and Kit became regulars. Your empire became a neighborhood.'}
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
