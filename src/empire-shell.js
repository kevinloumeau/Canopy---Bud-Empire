import {abbr} from './progression.js';
import {mountGoalsPane} from './goals-pane.js';
// Empire and Goals shells. Reparents the existing controls (main.js and operations-ui.js keep rendering them by id).
// Empire has four screens: Home (the map's places, then Perks and Records doors), Store (one branch: Stations and Store tabs), Perks (reopen card, rank, founder perks), Records.
// Goals (goals-pane.js) gets the contract, shift goals, story and reward controls as hidden sources.
import {mountEmpireStores} from './empire-stores.js';
import {mountEmpireMap} from './empire-map.js';
import {manageDialog} from './dialog-focus.js';
export function mountEmpireShell({fit,getState,format,rate,fly,buyStation}){
 const pane=document.querySelector('[data-pane=empire]'),$=id=>document.getElementById(id);
 const section=name=>pane.querySelector('[data-empire-section="'+name+'"]');
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
 const screens={home:el('div','empire-screen empire-content'),store:el('div','empire-screen empire-content'),details:el('div','empire-screen empire-content'),perks:el('div','empire-screen empire-content')};
 Object.keys(screens).forEach(name=>{screens[name].dataset.screen=name;screens[name].hidden=name!=='home';});
 const backBar=(label,title)=>{const bar=el('div','empire-back');const button=el('button','empire-back-button','<span class="empire-back-icon">'+chevron+'</span><span>'+label+'</span>');button.type='button';const heading=el('b','empire-back-title',title||'');bar.append(button,heading);button.onclick=()=>show('home');return {bar,heading};};
 const group=(title,nodes)=>{const g=el('section','empire-group');if(title)g.append(el('h2','empire-group-title',title));nodes.forEach(n=>n&&g.append(n));return g;};

 // Home: store list, one door to everything else.
 const today=section('today'),growth=section('growth');
 const storesHead=growth.querySelector('.empire-section-heading'),storesSummary=$('branchSummary'),storesHelp=growth.querySelector('.branch-help');
 const list=el('div','store-list');
 const toggles=[],articles=[];
 growth.querySelectorAll('.empire-branch').forEach((article,i)=>{const toggle=article.querySelector('.branch-toggle');toggles[i]=toggle;articles[i]=article;list.append(toggle);});
 // Two doors side by side under the map, so the whole home fits the half-open sheet on an iPhone SE: Perks (reopening
 // and founder perks, brass with the shares on offer once reopening pays) and Records.
 const ahead='<svg class="empire-link-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>';
 const link=(cls,icon,title,sub)=>{const b=el('button','empire-link '+cls,'<span class="empire-link-icon">'+icon+'</span><span class="empire-link-copy"><b>'+title+'</b><small>'+sub+'</small></span>'+ahead);b.type='button';return b;};
 const perksLink=link('empire-perks','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V11M12 14C3 14 3 7 3 7s9-1 9 7ZM12 11c0-8 9-9 9-9s0 9-9 9Z"/></svg>','Perks','');
 const more=link('empire-records','<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10m6 10V4m6 16v-7m4 7H2"/></svg>','Records','Lifetime figures');more.querySelector('small').classList.add('is-words');
 more.onclick=()=>show('details');perksLink.onclick=()=>show('perks');
 const links=el('div','empire-links');links.append(perksLink,more);
 // Empire home: the map's places as tiles (empire-map.js), then the Perks and Records doors. The old store rows stay
 // in the page, hidden, as each branch page's toggle.
 const reopen=$('reopenCard');
 const map=mountEmpireMap({getState,format,summary:storesSummary,fly:(kind,id)=>{if(fly)fly(kind,id);if(kind==='shop'&&id>0)openStore(id-1);}});
 const rows=el('div','store-rows');rows.hidden=true;rows.append(storesHead,list);
 screens.home.append(map.root,links,rows);
 // Perks: the reopen card leads (when reopening pays), then the rank, funding and founder perks, always open.
 const perksBar=backBar('Empire','Reopen & perks');screens.perks.append(perksBar.bar);
 const depth=growth.querySelector('.depth-panel');if(depth){depth.open=true;depth.addEventListener('toggle',()=>{if(!depth.open)depth.open=true;});}
 screens.perks.append(reopen||'',group(null,[depth]));
 // The welcome-back report is a moment over the map, not a row in a tab.
 const summary=$('returnSummary');if(summary){const overlay=el('div','return-overlay');overlay.hidden=true;const card=el('div','return-card');card.append(summary);overlay.append(card);document.body.append(overlay);
  const reflect=()=>{overlay.hidden=summary.hidden;if(!summary.hidden){const b=$('dismissReturn');if(b)b.focus({preventScroll:true});}};
  if(window.MutationObserver)new MutationObserver(reflect).observe(summary,{attributes:true,attributeFilter:['hidden']});reflect();
  card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Welcome back');
  manageDialog(overlay,()=>{const b=$('dismissReturn');if(b)b.click();});}

 // Store: one bar with the back button, the store's name and its two tabs (Stations, Store), then its body.
 const storeBar=backBar('Stores');storeBar.bar.classList.add('is-store');screens.store.append(storeBar.bar);
 const navs=articles.map(article=>{const nav=article.querySelector('.operation-tabs');if(nav)storeBar.bar.append(nav);return nav;});
 articles.forEach(article=>screens.store.append(article));

 // Details: records and long-cycle rewards, each under its own heading.
 const detailsBar=backBar('Empire','Records');screens.details.append(detailsBar.bar);
 // Scoreboard: the lifetime figures that left the HUD, at the top of the records.
 const board=el('section','scoreboard');board.setAttribute('aria-label','Lifetime figures');
 const stats=[['Lifetime revenue','revenue'],['Bags sold','served'],['Deliveries','deliveries'],['Trophies','trophies'],['Shares','prestige']];
 board.innerHTML=stats.map(([label,key])=>'<div class="score"><small>'+label+'</small><b data-score="'+key+'">—</b></div>').join('');
 screens.details.append(board);
 let boardSig='';
 function syncBoard(){if(!getState)return;const s=getState();const values={revenue:format?format(s.lifetime||0):String(Math.round(s.lifetime||0)),served:abbr(s.sold||0),deliveries:abbr(s.onlineCompleted||0),trophies:String((s.empire&&s.empire.trophies)||0),prestige:String((s.empire&&s.empire.shares)||0)};const sig=Object.values(values).join('|');if(sig===boardSig)return;boardSig=sig;stats.forEach(([,key])=>{board.querySelector('[data-score="'+key+'"]').textContent=values[key];});}
 setInterval(()=>{if(!document.hidden&&current==='details')syncBoard();},500);
 screens.details.append(group(null,[today.querySelector('.reputation')]),storesHelp);
 const goalsPane=document.querySelector('[data-pane=goals]');
 if(goalsPane)mountGoalsPane({pane:goalsPane,getState,format,rate,sources:[$('contractCard'),document.querySelector('.goals-body'),
  group(null,[$('careerName'),$('careerDetail'),$('careerProgress'),$('careerBonus'),$('careerClaim')]),
  document.querySelector('.shop-milestone'),group(null,Array.from(section('daily').children)),group(null,Array.from(section('events').children))]});
 // Keep the back controls outside the scrolling content so their background can be the panel itself.
 const scrollers={};
 ['store','details','perks'].forEach(name=>{const screen=screens[name],body=el('div','empire-screen-body');while(screen.children.length>1)body.append(screen.children[1]);screen.append(body);scrollers[name]=body;});
 pane.append(screens.home,screens.store,screens.details,screens.perks);
 // A locked store's page sends the player to the store before it, on the tab where its star goals are worked.
 const goStore=(i,tab)=>{if(fly)fly('shop',i+1);openStore(i);const t=$('opTab'+i+tab);if(t&&!t.hidden)t.click();};
 const storesUI=mountEmpireStores({getState,format,buyStation,goStore});

 // Navigation.
 let current='home';
 function show(name){current=name;if(name==='details')syncBoard();Object.keys(screens).forEach(k=>screens[k].hidden=k!==name);pane.dataset.empireScreen=name;pane.scrollTop=0;if(scrollers[name])scrollers[name].scrollTop=0;if(name!=='store')closeBranches();if(fit)fit();}
 function closeBranches(){articles.forEach((article,i)=>{const body=$('branchBody'+i),nav=navs[i];if(body)body.hidden=true;if(nav)nav.hidden=true;toggles[i].setAttribute('aria-expanded','false');});}
 function openStore(i){articles.forEach((article,j)=>{const body=$('branchBody'+j),nav=navs[j];if(body)body.hidden=j!==i;if(nav)nav.hidden=j!==i;toggles[j].setAttribute('aria-expanded',String(j===i));});storeBar.heading.textContent=toggles[i].querySelector('.branch-name').textContent;show('store');}
 toggles.forEach((toggle,i)=>{toggle.onclick=()=>openStore(i);toggle.removeAttribute('aria-expanded');toggle.setAttribute('aria-haspopup','false');});
 // main.js still opens a branch body directly (Manage on the map, bottleneck shortcuts); follow it.
 if(window.MutationObserver){const watcher=new MutationObserver(()=>{const open=articles.findIndex((_,i)=>$('branchBody'+i)&&!$('branchBody'+i).hidden);if(open>=0&&(current!=='store'||storeBar.heading.textContent!==toggles[open].querySelector('.branch-name').textContent)){openStore(open);}});articles.forEach((_,i)=>{const body=$('branchBody'+i);if(body)watcher.observe(body,{attributes:true,attributeFilter:['hidden']});});}
 const todayView=pane.querySelector('[data-empire-view=today]');if(todayView)todayView.addEventListener('click',()=>{if(current!=='home')show('home');});
 // The Perks door mirrors the reopen card: brass with the shares on offer, otherwise the rank's sales bonus.
 let perksSig='';
 function syncPerks(){const ready=reopen&&!reopen.hidden,gain=ready&&$('reopenGain')?$('reopenGain').textContent:'',status=$('prestigeStatus')?$('prestigeStatus').textContent:'';
  const title=ready?'Reopen':'Perks',sub=ready?gain:status==='Ready'?'Can reopen':status,sig=title+'|'+sub;if(sig===perksSig)return;perksSig=sig;
  perksLink.classList.toggle('is-ready',!!ready);perksLink.querySelector('b').textContent=title;perksLink.querySelector('small').textContent=sub;
  perksLink.setAttribute('aria-label',ready?'Reopen for '+gain+'. Open reopening and founder perks':'Reopening and founder perks'+(sub?', '+sub:''));}
 function sync(){if(!document.hidden){storesUI.sync();map.sync();syncPerks();}}
 if(window.MutationObserver){const watch=new MutationObserver(syncPerks);[reopen,$('prestigeStatus'),$('reopenGain')].forEach(n=>{if(n)watch.observe(n,{attributes:true,attributeFilter:['hidden'],childList:true,characterData:true,subtree:true});});}
 pane.addEventListener('click',()=>requestAnimationFrame(sync));setInterval(sync,250);sync();
 return {show,openStore,sync};
}
