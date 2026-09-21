// Telemetry: a handful of funnel events (first session, guide, first upgrade, delivery pad, chapters, stores, prestige,
// return days) sent through whichever provider is present. Nothing here identifies a player: there is no user id, no
// cookie, and every property is a small enum or number. With no provider loaded the events are queued in
// window.plausible.q (the official Plausible stub) so uncommenting the snippet in index.html later loses nothing that
// happened after the script arrived, and nothing at all is sent until then.
//
// Switches, all in localStorage: `canopy-telemetry=off` silences everything on this device; `=debug` logs each event.
const STORAGE={first:'canopy-first-seen',returnDay:'canopy-return-day',once:'canopy-tracked'};
const MINUTE=60000,DAY=86400000;
export function createTelemetry(options){
 const o=options||{},win=o.window||(typeof window!=='undefined'?window:null),now=o.now||(()=>Date.now());
 const storage=o.storage||(()=>{try{return win&&win.localStorage}catch(e){return null}})();
 const read=key=>{try{return storage?storage.getItem(key):null}catch(e){return null}};
 const write=(key,value)=>{try{if(storage)storage.setItem(key,value)}catch(e){}};
 const mode=read('canopy-telemetry');
 const enabled=mode!=='off'&&!!win;
 const tracked=new Set((read(STORAGE.once)||'').split(',').filter(Boolean));
 // Plausible's documented stub: calls before the script loads queue in .q and are flushed once it arrives.
 if(enabled&&win&&!win.plausible)win.plausible=function(){(win.plausible.q=win.plausible.q||[]).push(arguments)};
 function send(name,props){
  if(!enabled)return false;
  const clean={};Object.keys(props||{}).forEach(k=>{const v=props[k];if(v===undefined||v===null)return;clean[k]=typeof v==='number'?Math.round(v*100)/100:String(v)});
  if(mode==='debug'&&win.console)win.console.info('[telemetry]',name,clean);
  try{if(typeof win.canopyTrack==='function')win.canopyTrack(name,clean)}catch(e){}
  try{if(typeof win.plausible==='function')win.plausible(name,{props:clean})}catch(e){}
  return true;
 }
 // Fire once per device: funnel steps such as the first upgrade or building the delivery pad.
 function once(name,props){
  if(tracked.has(name))return false;
  tracked.add(name);write(STORAGE.once,Array.from(tracked).join(','));
  return send(name,props);
 }
 // Session start also produces the retention signal: `return_day` with the number of days since the first visit,
 // sent at most once per calendar day, so D1/D7 read as unique devices with return_day 1 or 7 over first sessions.
 function session(props){
  const t=now();let first=Number(read(STORAGE.first));
  if(!first){first=t;write(STORAGE.first,String(first));}
  const day=Math.floor((t-first)/DAY);
  send('session_start',Object.assign({returning:day>0||!!(props&&props.returning),day},props||{}));
  if(day>0&&read(STORAGE.returnDay)!==String(day)){write(STORAGE.returnDay,String(day));send('return_day',{day});}
  return day;
 }
 // Session length as a distribution: one event as each mark is passed, without relying on unload delivery.
 function heartbeat(marks){
  if(!enabled||!win||!win.setTimeout)return;
  (marks||[1,5,15,30]).forEach(minutes=>win.setTimeout(()=>{if(!win.document||!win.document.hidden)send('session_alive',{minutes})},minutes*MINUTE));
 }
 // Events recorded before this module loaded (the inline age gate) arrive through window.canopyEvents.
 function drain(){
  if(!win)return;const queue=win.canopyEvents;
  if(Array.isArray(queue))queue.splice(0).forEach(item=>{if(item&&item[0])send(item[0],item[1])});
  win.canopyEvents={push:item=>{if(item&&item[0])send(item[0],item[1])}};
 }
 return {enabled,send,once,session,heartbeat,drain,tracked};
}
