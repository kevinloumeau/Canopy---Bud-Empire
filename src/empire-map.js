// Empire home as the map (Kevin, 2026-11-02: "update the empire menu to better reflect the new game layout"). Every
// place on the one scrollable map gets a tile, in map order: the flagship and its five branches along the street, then
// Canopy HQ and the four city buildings round the block. Each tile is the place's own 3D look (the branches' Blender
// storefronts; the rest rendered from the map by scripts/map-icons.mjs) inside a ring that fills with its progress,
// a short name and one figure. A tap flies the camera there (main.js `fly`); a branch also opens its page, and a
// city lot opens its buy box on the map. Only the single best buy wears the brass.
import {STORES,storeCost,storeRate,branchOpenable,STARS_TO_OPEN,starCount} from './progression.js';
import {CITY_BUILDINGS,cityUnlocked,cityCost,CITY_MAX} from './city-buildings.js';
import {FLAGSHIP_MAX,FLAGSHIP_STEP,FLAGSHIP_UNLOCK_LIFETIME,flagshipCost,flagshipUnlocked} from './flagship.js';
import {isBuilding,buildClock,buildLeft,buildShareLeft} from './builds.js';

const icon=(file,cls)=>'<img class="map-tile-icon'+(cls?' '+cls:'')+'" src="icons/3d/'+file+'.png" alt="" draggable="false" decoding="async">';
const RING='<svg class="map-ring-track" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="25"/><circle class="map-ring-fill" cx="28" cy="28" r="25" pathLength="100"/></svg>';
const LOCK='<svg class="map-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
const SHORT=['Riverside','Old Town','City','Desert','Alpine'];
// What a finished building gives, in a few words, for its tile once nothing is left to buy.
const DONE={flagship:'+'+Math.round(FLAGSHIP_MAX*FLAGSHIP_STEP*100)+'% sales',warehouse:'+12h away',growhouse:'+60% output',billboard:'+60% walk-ins',terplab:'+105% trend'};
// A rate with a small '/s', so six figures fit across a phone.
const perSecond=text=>text+'<span class="map-per">/s</span>';
const clamp=v=>Math.max(0,Math.min(1,Number.isFinite(v)?v:0));

export function mountEmpireMap({getState,format,fly,summary}){
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const root=el('section','empire-map');root.setAttribute('aria-label','Your map');
 const head=(title,meta)=>{const h=el('h2','empire-map-head','<span>'+title+'</span>');if(meta)h.append(meta);return h;};
 const cityMeta=el('b','empire-map-meta');
 if(summary)summary.classList.add('empire-map-meta');
 const tile=(key,name,art,go)=>{const b=el('button','map-tile');b.type='button';b.dataset.place=key;
  b.innerHTML='<span class="map-ring">'+RING+art+'</span><b class="map-tile-name">'+name+'</b><small class="map-tile-figure"></small>';
  b.onclick=go;return {b,ring:b.querySelector('.map-ring'),figure:b.querySelector('.map-tile-figure'),sig:''};};
 // Shops: the flagship, then the branches east along the street.
 const shops=[tile('shop0','Flagship',icon('landmark-shop','is-wide'),()=>fly('shop',0))].concat(STORES.map((s,i)=>tile('shop'+(i+1),SHORT[i],icon('store-'+i),()=>fly('shop',i+1))));
 // City: Canopy HQ, then the four buildings round the block.
 const city=[tile('flagship','HQ',icon('landmark-hq'),()=>fly('city','flagship'))].concat(CITY_BUILDINGS.map(b=>tile(b.id,b.name,icon('landmark-'+b.id),()=>fly('city',b.id))));
 const row=(list,cls)=>{const r=el('div','map-tiles '+cls);list.forEach(t=>r.append(t.b));return r;};
 root.append(head('Shops',summary),row(shops,'is-shops'),head('City',cityMeta),row(city,'is-city'));

 // Each place as {share, figure, tone, label, cost}: tone is '', 'ready', 'locked', 'building' or 'max'; cost (when
 // something can be bought there now) lets one best buy take the brass.
 function shopInfo(s,i){const p=s.empire,speed=s.gameSpeed;
  if(!i){const lines=s.lines||[],avg=lines.length?lines.reduce((a,b)=>a+b,0)/lines.length:0;
   return {share:avg/100,figure:perSecond(format((p.flagship||0)*speed)),tone:'',label:'Flagship, stations average level '+Math.round(avg)+', earning '+format((p.flagship||0)*speed)+' a second'};}
  const k=i-1,store=p.stores[k],def=STORES[k],lvl=store.level,cost=storeCost(p,k);
  if(!branchOpenable(p,k)){const prev=k?starCount(p,k-1):0;return {share:prev/STARS_TO_OPEN,figure:LOCK+prev+'/'+STARS_TO_OPEN+' ★',tone:'locked',label:def.name+', locked. Earn '+STARS_TO_OPEN+' stars at '+STORES[k-1].name};}
  if(s.lifetime<def.goal){const share=clamp(s.lifetime/def.goal);return {share,figure:LOCK+Math.floor(share*100)+'%',tone:'locked',label:def.name+', opens at '+format(def.goal)+' earned, '+Math.floor(share*100)+'% there'};}
  // Being built: a brass clock and the ring filling as the build runs.
  if(!lvl&&isBuilding(s.builds,'branch'+k)){const left=buildLeft(s.builds,'branch'+k);return {share:1-buildShareLeft(s.builds,'branch'+k),figure:buildClock(left),tone:'building',label:def.name+', being built, opens in '+buildClock(left)};}
  if(!lvl)return {share:0,figure:format(cost),tone:s.money>=cost?'ready':'',cost:s.money>=cost?cost:null,label:def.name+', ready to open for '+format(cost)};
  // A pill is something to buy; plain figures are what the place earns.
  const rate=storeRate(p,k)*speed,max=lvl>=10,afford=!max&&s.money>=cost,label=def.name+', level '+lvl+' of 10, earning '+format(rate)+' a second'+(max?'':', next level '+format(cost));
  return afford?{share:lvl/10,figure:format(cost),tone:'ready',cost,label}:{share:lvl/10,figure:perSecond(format(rate)),tone:max?'max':'',label};}
 function cityInfo(s,id){const hq=id==='flagship',def=hq?null:CITY_BUILDINGS.find(b=>b.id===id),name=hq?'Canopy HQ':def.name;
  const stage=hq?s.flagship|0:(s.city&&s.city[id])|0,max=hq?FLAGSHIP_MAX:CITY_MAX,unlock=hq?FLAGSHIP_UNLOCK_LIFETIME:def.unlock;
  if(isBuilding(s.builds,id)){const left=buildLeft(s.builds,id);return {share:(stage+1-buildShareLeft(s.builds,id))/max,figure:buildClock(left),tone:'building',label:name+', stage '+(stage+1)+' of '+max+' going up, done in '+buildClock(left)};}
  if(!(hq?flagshipUnlocked(s.lifetime,s.flagship,s.run&&s.run.time):cityUnlocked(id,s.lifetime,s.city&&s.city[id],s.run&&s.run.time))){const share=clamp(s.lifetime/unlock);return {share,figure:LOCK+format(unlock),tone:'locked',label:name+', opens at '+format(unlock)+' earned, '+Math.floor(share*100)+'% there'};}
  if(stage>=max)return {share:1,figure:DONE[id],tone:'max',label:name+', finished, '+DONE[id]};
  const cost=hq?flagshipCost(stage,s):cityCost(id,stage,s),afford=s.money>=cost;
  return {share:stage/max,figure:format(cost),tone:afford?'ready':'',cost:afford?cost:null,label:name+', stage '+stage+' of '+max+', next '+format(cost)};}

 function paint(t,info,best,here){
  const sig=[info.figure,info.tone,info.share.toFixed(3),best,here].join('|');if(sig===t.sig)return;t.sig=sig;
  t.ring.style.setProperty('--share',clamp(info.share).toFixed(3));
  if(t.figure.innerHTML!==info.figure)t.figure.innerHTML=info.figure;
  t.b.className='map-tile'+(info.tone?' is-'+info.tone:'')+(best?' is-best':'')+(here?' is-here':'');
  t.b.setAttribute('aria-label',info.label+(best?'. Best buy':'')+'. Show it on the map');t.b.title=info.label;
 }
 function sync(){const s=getState();if(!s)return;
  const shopRows=shops.map((t,i)=>shopInfo(s,i)),cityRows=city.map((t,i)=>cityInfo(s,i?CITY_BUILDINGS[i-1].id:'flagship'));
  // One brass next action: the cheapest thing that can be bought right now.
  const all=shopRows.concat(cityRows);let best=-1;all.forEach((r,i)=>{if(r.cost!=null&&(best<0||r.cost<all[best].cost))best=i;});
  const here=s.empire.activeStore|0;
  shops.forEach((t,i)=>paint(t,shopRows[i],best===i,here===i));
  city.forEach((t,i)=>paint(t,cityRows[i],best===shops.length+i,false));
  const stages=(s.flagship|0)+CITY_BUILDINGS.reduce((n,b)=>n+((s.city&&s.city[b.id])|0),0),total=FLAGSHIP_MAX+CITY_BUILDINGS.length*CITY_MAX,text=stages+'/'+total+' built';
  if(cityMeta.textContent!==text)cityMeta.textContent=text;
 }
 sync();
 return {root,sync};
}
