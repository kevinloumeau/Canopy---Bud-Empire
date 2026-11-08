import {BOOST_MAX} from './depth.js';
import {FORKS,sideStatus,levelsToGate,forkOf,MASTERY_FROM} from './research.js';
import {tieLast} from './no-lone-words.js';
import {roomy} from './sheet-room.js';
// Reuse the original purchase nodes so prices, handlers and saves remain authoritative. Order counters, kiosks and the
// customer line live on the Orders station instead (see order-extras.js); Start over lives in Settings.
export function mountShopBrowser({getState,components,kiosks,queueLimit,recommend,recommendInfo,openDeliveries,deliveryDesk}) {
  const pane=document.querySelector('[data-pane="boosts"]');
  pane.classList.add('shop-browser');
  // Research runs down three branches. A fork's two sides sit next to each other in the order below; a run takes one.
  const categories=['Grow','Retail','Delivery'];
  const byKey=key=>'componentBuy'+components.findIndex(c=>c.key===key);
  const definitions=[['upgradeStorage',0],['boost',0],[byKey('growBatchLevel'),0],[byKey('curingLevel'),0],[byKey('trendLevel'),0],[byKey('breedingLevel'),0],[byKey('offlineLevel'),0],
    [byKey('basketLevel'),1],[byKey('trafficLevel'),1],[byKey('displayLevel'),1],[byKey('loyaltyLevel'),1],[byKey('serviceLevel'),1],
    [byKey('webLevel'),2],[byKey('onlineBonusLevel'),2],[byKey('fleetLevel'),2],[byKey('cargoLevel'),2]];
  // One label over each undecided fork and an "or" between its sides.
  // An undecided fork sits at the end of its branch as one card: both sides side by side with an "or" between them.
  const forkMarks=FORKS.map(f=>{const box=document.createElement('div');box.className='shop-fork';box.setAttribute('role','group');box.setAttribute('aria-label','Pick one: '+f.name);const head=document.createElement('p');head.className='shop-fork-head';head.innerHTML='<b>Pick one</b><span>The other closes until you reopen</span>';const or=document.createElement('p');or.className='shop-fork-or';or.setAttribute('aria-hidden','true');or.innerHTML='<span>or</span>';const end=document.createElement('i');end.className='shop-fork-end';end.setAttribute('aria-hidden','true');return {fork:f,box,head,or,end,ids:f.sides.map(byKey)}});
  // 3D icons rendered in Blender at the map's angle (public/icons/3d/research-*.png, art/blender/research_icons.py),
  // like the Goals tab. They replace each card's line drawing inside its level ring.
  const ICONS_3D={upgradeStorage:'storage',boost:'boost',growBatchLevel:'grow',curingLevel:'curing',trendLevel:'trend',breedingLevel:'breeding',offlineLevel:'offline',
    basketLevel:'basket',trafficLevel:'traffic',displayLevel:'display',loyaltyLevel:'loyalty',serviceLevel:'service',
    webLevel:'web',onlineBonusLevel:'premium',fleetLevel:'fleet',cargoLevel:'cargo'};
  // Phones show a 4-across grid (src/research-fit.css), so each tile carries a one-line name; the full name stays in
  // the aria label and tooltip, and on desktop.
  const SHORT={boost:'Store boost',curingLevel:'Curing',breedingLevel:'Breeding',offlineLevel:'Safe',basketLevel:'Baskets',displayLevel:'Displays',loyaltyLevel:'Loyalty',serviceLevel:'Express',webLevel:'Web ads',onlineBonusLevel:'Premium',fleetLevel:'Drones',cargoLevel:'Cargo',trendLevel:'Trends',trafficLevel:'Floor flow',growBatchLevel:'Grow lights',upgradeStorage:'Storage'};
  const phoneTiles=window.matchMedia('(max-width:779px)');
  // The complete card's chips have room for the figure alone ("+180%"), and big plain numbers shorten ("134.4K/stage").
  const shortNumber=t=>String(t).trim().replace(/^(\d{4,})(\.\d+)?/,n=>{const v=Number(n);return v>=1e6?(v/1e6).toFixed(1).replace(/\.0$/,'')+'M':(v/1e3).toFixed(1).replace(/\.0$/,'')+'K'});
  const shortFigure=t=>shortNumber(String(t).trim().split(' ')[0]);
  const img3d=src=>'<img class="research-3d" src="icons/3d/'+src+'.png" alt="" draggable="false" decoding="async">';
  const rows=definitions.map(([id,category])=>{
    const button=document.getElementById(id),node=button.parentElement;
    node.classList.add('shop-item');
    const copy=node.querySelector('.shop-copy,.storage-copy'),badge=document.createElement('span');
    badge.className='shop-level';copy.append(badge);
    button.setAttribute('aria-label',copy.querySelector('h2,b').textContent+' upgrade');
    const effect=document.createElement('small');effect.className='shop-effect';node.append(effect);
    const symbol=node.querySelector('.shop-symbol'),key=id.startsWith('componentBuy')?components[Number(id.replace('componentBuy',''))].key:id;
    // On phones the whole tile buys (a 26px price pill alone is too small to hit).
    node.addEventListener('click',e=>{if(e.target.closest('button')||!phoneTiles.matches||button.disabled)return;button.click()});
    const short=document.createElement('span');short.className='shop-short';short.setAttribute('aria-hidden','true');short.textContent=SHORT[key]||copy.querySelector('h2,b').textContent;copy.append(short);
    if(symbol&&ICONS_3D[key]){symbol.innerHTML=img3d('research-'+ICONS_3D[key]);symbol.classList.add('has-3d')}
    return {id,category,node,button,badge,effect,symbol};
  });
  const header=document.createElement('div');header.className='shop-browser-header';
  const icons={Grow:'<path d="M12 21c-4.5-2.5-7-6-7-10a7 7 0 0 1 14 0c0 4-2.5 7.5-7 10ZM12 21V9"/>',Retail:'<path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 8v3M10 8h4"/>',Delivery:'<path d="M9 10h6v4H9zM4 6h3M17 6h3M5.5 6v4h3.5M18.5 6v4H15M9 14l-3 5M15 14l3 5M12 14v6"/>'};
  // The branch tabs get 3D icons too: the potted plant, the shopping bag and the drone.
  const tabs3d={Grow:'goal-leaf',Retail:'goal-bag',Delivery:'research-fleet'};
  header.innerHTML='<nav class="shop-categories" aria-label="Upgrade categories">'+categories.map((name,i)=>'<button type="button" data-shop-category="'+i+'" aria-pressed="'+(i===0)+'">'+(tabs3d[name]?'<span class="shop-category-icon is-3d" aria-hidden="true">'+img3d(tabs3d[name])+'</span>':'<svg class="shop-category-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||'')+'</svg>')+'<em>'+name+'</em></button>').join('')+'</nav>';
  const list=document.createElement('div');list.className='shop-items';
  const empty=document.createElement('p');empty.className='shop-empty';empty.textContent='Nothing affordable here yet. Turn off the filter to see what’s next.';
  const milestone=pane.querySelector('.shop-milestone'),reset=pane.querySelector('.shop-reset');
  // Online opens with the delivery desk itself, so Deliveries needs no tab of its own.
  const desk=document.createElement('button');desk.type='button';desk.className='shop-desk';desk.hidden=true;
  desk.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 10h7l1.5 3.5h-10zM8.5 10 5 7m10.5 3L19 7M8.5 13.5 5 17m10.5-3.5L19 17M2 7h6m8 0h6M2 17h6m8 0h6"/></svg><span class="shop-desk-copy"><em>Delivery desk</em><b>Delivery desk</b><small></small></span><i class="shop-desk-count" hidden></i><span class="shop-desk-price" hidden><b></b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></span><i class="shop-desk-meter" hidden><i></i></i><svg class="shop-desk-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
  desk.onclick=()=>{if(openDeliveries)openDeliveries()};
  list.prepend(desk);
  // Below the list: one line for research that opens later, and a fold for what is maxed or closed this run.
  const later=document.createElement('p');later.className='shop-later';later.hidden=true;
  const doneToggle=document.createElement('button');doneToggle.type='button';doneToggle.className='shop-done-toggle';doneToggle.hidden=true;doneToggle.setAttribute('aria-expanded','false');
  let showDone=false;doneToggle.onclick=()=>{showDone=!showDone;render();};
  // A branch with nothing left to buy this run: one card that celebrates it, every pick's final bonus in a brass ring.
  const complete=document.createElement('section');complete.className='shop-complete';complete.hidden=true;
  pane.prepend(header,list,complete,later,doneToggle,empty);
  // Full open (src/full-open.css) has room for every row, so the maxed and closed ones show under the rest, no fold.
  pane.addEventListener('sheetroom',()=>{render.key=null;render()});
  pane.append(milestone,reset);reset.hidden=true;
  // Building the delivery pad and its drones live on the Online card in Stations (the deliveries panel).
  const droneNode=document.getElementById('buyAutoDrone');if(droneNode&&droneNode.parentElement&&pane.contains(droneNode))droneNode.parentElement.hidden=true;
  let category=0;
  header.querySelectorAll('[data-shop-category]').forEach(button=>button.onclick=()=>{category=Number(button.dataset.shopCategory);showDone=false;render()});
  function render(){
    const state=getState(),affordable=false,roomFull=roomy(pane);
    let count=0,done=0;const order=[],gates={};
    header.querySelectorAll('[data-shop-category]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.shopCategory)===category)));
    rows.forEach(row=>{
      let level,max;
      if(row.id.startsWith('componentBuy')){const c=components[Number(row.id.replace('componentBuy',''))];level=state[c.key];max=c.max}
      else if(row.id==='buyAutoDrone'){level=state.autoDrone.bulk?2:state.autoDrone.owned?1:0;max=2}
      else if(row.id==='upgradeStorage'){level=state.storageLevel;max=20}
      else {level=state.globalLevel;max=BOOST_MAX}
      const key=row.id.startsWith('componentBuy')?components[Number(row.id.replace('componentBuy',''))].key:null,side=key?sideStatus(state,key):'open';
      const isDone=level>=max||side==='closed',gated=side==='gated'&&!isDone;row.node.classList.toggle('is-maxed',isDone);order.push({row,isDone,closed:side==='closed',level});
      // Maxed reads as an achievement (brass), a closed fork side stays quiet; levels past 20 are the brass Mastery tier.
      const mastery=!!key&&max>MASTERY_FROM&&level>=MASTERY_FROM;
      row.node.classList.toggle('is-mastered',level>=max&&side!=='closed');row.node.classList.toggle('is-closed',side==='closed');row.node.classList.toggle('is-mastery',mastery&&level<max);
      // Rows keep one short figure; the long states fold into the lines under the list.
      row.badge.textContent=side==='closed'?'Closed':isDone?'Max':'Lv '+level;
      row.badge.setAttribute('aria-label',side==='closed'?'Closed this run'+(level?', level '+level+' kept':''):'Level '+level);
      row.node.classList.toggle('shows-verb',side==='pick');
      // The ring around the icon fills with the level; the effect line is the tile's tooltip.
      // Mastery picks fill the green ring by Lv 20, then sweep it brass from 21 to 30.
      const base=key&&max>MASTERY_FROM?MASTERY_FROM:max;
      if(row.symbol){row.symbol.style.setProperty('--lv',Math.min(1,Number.isFinite(base)&&base?level/base:0).toFixed(3));row.symbol.style.setProperty('--mv',max>base?Math.max(0,Math.min(1,(level-base)/(max-base))).toFixed(3):'0')}
      // Under the name: what the next level gives ("+0% → +6% seed batch" shows "+6% seed batch"), the full line as tooltip.
      const effect=row.node.querySelector('strong'),full=effect?effect.textContent.trim():'',next=full.split('→').pop().split(' · ')[0].trim();
      const tight=shortNumber(next).replace(/^(\d{2,})\.\d /,'$1 ').replace(/ per (stage|drone|run)$/,'/$1').replace(' production',' output');
      if(row.effect.textContent!==tight)row.effect.textContent=tight;row.node.title=full?row.node.querySelector('h2,b').textContent+' · '+full:'';
      const here=row.category===category;
      if(here&&gated){const gate=forkOf(key).gate+' '+categories[row.category]+' levels · '+levelsToGate(state,key)+' to go';(gates[gate]=gates[gate]||[]).push(row.node.querySelector('h2,b').textContent);}
      row.node.hidden=!here||gated||(isDone&&!showDone&&!roomFull);
      if(here){if(isDone)done++;else if(!gated)count++}
    });
    const sequence=order.filter(o=>!o.isDone).concat(order.filter(o=>o.isDone)).map(o=>o.row);
    // Undecided forks get their label above the first side and the "or" between the two.
    const open=forkMarks.filter(m=>m.ids.every(id=>{const r=rows.find(x=>x.id===id);return r&&r.category===category&&sideStatus(state,components[Number(id.replace('componentBuy',''))].key)==='pick'}));
    const key=sequence.map(r=>r.id).join(',')+'|'+category+'|'+open.map(m=>m.fork.id).join(',');
    if(key!==render.key){render.key=key;forkMarks.forEach(m=>m.box.remove());
      const forked=id=>open.some(m=>m.ids.indexOf(id)>=0);
      sequence.forEach(r=>{if(!forked(r.id))list.appendChild(r.node)});
      open.forEach(m=>{const [a,b]=m.ids.map(id=>rows.find(x=>x.id===id).node);m.box.replaceChildren(m.head,a,m.or,b);list.appendChild(m.box)})}
    desk.hidden=true;
    if(!desk.hidden){const d=deliveryDesk(),note=desk.querySelector('small'),title=desk.querySelector('b'),count=desk.querySelector('.shop-desk-count'),price=desk.querySelector('.shop-desk-price'),meter=desk.querySelector('.shop-desk-meter');
      // Unbuilt, the desk is the shelf's next step: a brass card above the list with its price and savings so far.
      const unbuilt=!d.built;desk.classList.toggle('is-unbuilt',unbuilt);desk.classList.toggle('is-short',unbuilt&&!d.ready);
      if(unbuilt&&desk.parentElement===list)list.before(desk);else if(!unbuilt&&desk.parentElement!==list)list.prepend(desk);
      title.textContent=unbuilt?(d.building?'Building the pickup window':'Build the pickup window'):'Delivery desk';
      note.textContent=unbuilt?(d.building?'Opens in '+d.clock:d.ready?'Opens web orders':'Opens web orders · '+d.toGo+' to go'):d.waiting?d.waiting+' waiting to send':'No orders waiting';
      price.hidden=meter.hidden=!unbuilt;price.firstChild.textContent=(d.building?d.clock:d.price)||'';meter.firstChild.style.width=Math.round((d.progress||0)*100)+'%';
      count.hidden=!d.built||!d.waiting;count.textContent=d.waiting;desk.setAttribute('aria-label',unbuilt?'Build the pickup window, '+d.price+', '+note.textContent:'Delivery desk, '+note.textContent)}
    const gateLines=Object.keys(gates);later.hidden=!gateLines.length;
    // Everything in the branch maxed or closed: the card replaces the rows and the fold.
    const finished=count===0&&done>0&&!gateLines.length;
    pane.classList.toggle('is-branch-done',finished);complete.hidden=!finished;
    if(finished){
      const here=order.filter(o=>o.row.category===category),mastered=here.filter(o=>!o.closed).length;
      const ckey=category+'|'+here.map(o=>o.row.id+':'+o.closed+':'+o.row.effect.textContent).join(',');
      if(complete.dataset.key!==ckey){complete.dataset.key=ckey;const name=categories[category];
        complete.setAttribute('aria-label',name+' research complete for this run');
        complete.innerHTML='<header class="shop-complete-head"><span class="shop-complete-badge" aria-hidden="true">'+img3d(tabs3d[name])+'<i><svg viewBox="0 0 16 16"><path d="M4 8.5l2.5 2.5L12 5.5"/></svg></i></span><span class="shop-complete-copy"><b>'+name+' complete</b><small>'+tieLast(here.length>mastered?mastered+' maxed · '+(here.length-mastered)+' closed this run':'All '+mastered+' maxed this run')+'</small></span></header>'+
          '<ul class="shop-complete-list">'+here.map(o=>{const r=o.row,k=r.id.startsWith('componentBuy')?components[Number(r.id.replace('componentBuy',''))].key:r.id,nm=r.node.querySelector('h2,b').textContent;
            return '<li class="'+(o.closed?'is-closed':'is-mastered')+'" title="'+nm+'"><span class="shop-complete-ring">'+(ICONS_3D[k]?img3d('research-'+ICONS_3D[k]):'')+'</span><b>'+(SHORT[k]||nm)+'</b><small><span class="shop-complete-num">'+(o.closed?'Closed':shortFigure(r.effect.textContent))+'</span><span class="shop-complete-full">'+(o.closed?'Closed':shortNumber(r.effect.textContent))+'</span></small></li>'}).join('')+'</ul>'}
    }
    header.querySelectorAll('[data-shop-category]').forEach(b=>{const c=Number(b.dataset.shopCategory),all=rows.filter(r=>r.category===c);b.classList.toggle('is-done',all.length>0&&all.every(r=>r.node.classList.contains('is-maxed')))});
    later.innerHTML=gateLines.map(g=>'<span><b>Opens at '+g.replace(' · ','</b> · ')+'<small>'+gates[g].join(' or ')+'</small></span>').join('');
    doneToggle.hidden=!done||roomFull||finished;if(doneToggle.parentElement!==list||list.lastElementChild!==doneToggle)list.appendChild(doneToggle);doneToggle.setAttribute('aria-expanded',String(showDone));
    doneToggle.innerHTML='<span>'+(showDone?'Hide maxed and closed':'Maxed and closed')+'</span><b>'+done+'</b><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(showDone?'m6 15 6-6 6 6':'m6 9 6 6 6-6')+'"/></svg>';
    // Phones size the grid to fill the sheet (src/research-fit.css): a few tiles go two across and grow, a full branch
    // goes four across. A fork takes two cells. Rows come from laying the cells out in order, as the grid does.
    if(finished)rows.forEach(r=>{if(r.category===category)r.node.hidden=true});
    const cells=[...list.children].filter(n=>!n.hidden&&n!==desk).map(n=>n.classList.contains('shop-fork')?2:1),total=cells.reduce((a,b)=>a+b,0);
    const cols=total<=4?2:total<=6?3:4;let rowsUsed=total?1:0,at=0;cells.forEach(w=>{if(at+w>cols){rowsUsed++;at=0}at+=w});
    list.style.setProperty('--cols',cols);list.dataset.cols=cols;list.style.setProperty('--rows',Math.max(1,rowsUsed));list.dataset.rows=rowsUsed>2?'many':String(rowsUsed);
    empty.hidden=count>0||done>0||gateLines.length>0;
    empty.textContent='Nothing here yet.';
    // The best buy, when it is research, gets the brass price; its tab gets a brass dot. Station advice stays on the map.
    const info=recommendInfo&&recommendInfo(),forkIds=info&&info.fork?(forkMarks.find(m=>m.fork.id===info.fork)||{ids:[]}).ids:[];
    const picked=row=>!!info&&(info.fork?forkIds.indexOf(row.id)>=0:row.id===info.id);
    rows.forEach(row=>row.node.classList.toggle('is-pick',picked(row)));
    const pickTab=rows.filter(picked).map(r=>r.category)[0];
    header.querySelectorAll('[data-shop-category]').forEach(b=>b.classList.toggle('has-pick',Number(b.dataset.shopCategory)===pickTab));
  }
  function show(index){category=index;header.querySelectorAll('[data-shop-category]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.shopCategory)===index)));render();}
  function categoryOf(id){const row=rows.find(r=>r.id===id);return row?row.category:0;}
  return {render,show,categoryOf,categories};
}
