import {abbr} from './progression.js';
// Empire navigation shell: one list, then one screen at a time.
// Reparents the existing Empire controls (main.js and operations-ui.js keep rendering them by id)
// into three screens: Home (store list), Store (one branch), Details (records).
import {mountEmpireStores} from './empire-stores.js';
import {manageDialog} from './dialog-focus.js';
export function mountEmpireShell({fit,getState,format}){
 const pane=document.querySelector('[data-pane=empire]'),$=id=>document.getElementById(id);
 const section=name=>pane.querySelector('[data-empire-section="'+name+'"]');
 const el=(tag,cls,html)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(html!=null)n.innerHTML=html;return n;};
 const chevron='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
 const screens={home:el('div','empire-screen empire-content'),store:el('div','empire-screen empire-content'),details:el('div','empire-screen empire-content')};
 Object.keys(screens).forEach(name=>{screens[name].dataset.screen=name;screens[name].hidden=name!=='home';});
 const backBar=(label,title)=>{const bar=el('div','empire-back');const button=el('button','empire-back-button','<span class="empire-back-icon">'+chevron+'</span><span>'+label+'</span>');button.type='button';const heading=el('b','empire-back-title',title||'');bar.append(button,heading);button.onclick=()=>show('home');return {bar,heading};};
 const group=(title,nodes)=>{const g=el('section','empire-group');if(title)g.append(el('h2','empire-group-title',title));nodes.forEach(n=>n&&g.append(n));return g;};

 // Home: stores and a link to records.
 const today=section('today'),growth=section('growth');
 const storesHead=growth.querySelector('.empire-section-heading'),storesSummary=$('branchSummary'),storesHelp=growth.querySelector('.branch-help');
 const list=el('div','store-list');
 const toggles=[],articles=[];
 growth.querySelectorAll('.empire-branch').forEach((article,i)=>{const toggle=article.querySelector('.branch-toggle');toggles[i]=toggle;articles[i]=article;list.append(toggle);});
 const more=el('button','empire-more','<span>Records</span><span class="empire-more-hint" id="empireMoreHint"></span>'+chevron);more.type='button';more.onclick=()=>show('details');
 const homeHead=el('div','empire-home-head');homeHead.append(storesHead,more);
 screens.home.append(homeHead,storesSummary,list,storesHelp);
 // The welcome-back report is a moment over the map, not a row in a tab.
 const summary=$('returnSummary');if(summary){const overlay=el('div','return-overlay');overlay.hidden=true;const card=el('div','return-card');card.append(summary);overlay.append(card);document.body.append(overlay);
  const reflect=()=>{overlay.hidden=summary.hidden;if(!summary.hidden){const b=$('dismissReturn');if(b)b.focus({preventScroll:true});}};
  if(window.MutationObserver)new MutationObserver(reflect).observe(summary,{attributes:true,attributeFilter:['hidden']});reflect();
  card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Welcome back');
  manageDialog(overlay,()=>{const b=$('dismissReturn');if(b)b.click();});}

 // Store: back bar, then the branch's own sticky tabs and body.
 const storeBar=backBar('Stores');screens.store.append(storeBar.bar);
 articles.forEach(article=>screens.store.append(article));

 // Details: lifetime records, reputation and New beginnings.
 const detailsBar=backBar('Empire','Records');screens.details.append(detailsBar.bar);
 // Scoreboard: the lifetime figures that left the HUD, at the top of the records.
 const board=el('section','scoreboard');board.setAttribute('aria-label','Lifetime figures');
 const stats=[['Lifetime revenue','revenue'],['Bags sold','served'],['Deliveries','deliveries'],['Trophies','trophies'],['Prestige rank','prestige']];
 board.innerHTML=stats.map(([label,key])=>'<div class="score"><small>'+label+'</small><b data-score="'+key+'">—</b></div>').join('');
 screens.details.append(board);
 let boardSig='';
 function syncBoard(){if(!getState)return;const s=getState();const values={revenue:format?format(s.lifetime||0):String(Math.round(s.lifetime||0)),served:abbr(s.sold||0),deliveries:abbr(s.onlineCompleted||0),trophies:String((s.empire&&s.empire.trophies)||0),prestige:String((s.empire&&s.empire.prestige)||0)};const sig=Object.values(values).join('|');if(sig===boardSig)return;boardSig=sig;stats.forEach(([,key])=>{board.querySelector('[data-score="'+key+'"]').textContent=values[key];});}
 setInterval(()=>{if(!document.hidden&&current==='details')syncBoard();},500);
 screens.details.append(
  group(null,[today.querySelector('.reputation')]),
  group(null,[growth.querySelector('.depth-panel')])
 );
 // Keep the back controls outside the scrolling content so their background can be the panel itself.
 const scrollers={};
 ['store','details'].forEach(name=>{const screen=screens[name],body=el('div','empire-screen-body');while(screen.children.length>1)body.append(screen.children[1]);screen.append(body);scrollers[name]=body;});
 pane.append(screens.home,screens.store,screens.details);
 const storesUI=mountEmpireStores({getState,format});


 // Navigation.
 let current='home';
 function show(name){current=name;if(name==='details')syncBoard();Object.keys(screens).forEach(k=>screens[k].hidden=k!==name);pane.dataset.empireScreen=name;pane.scrollTop=0;if(scrollers[name])scrollers[name].scrollTop=0;if(name!=='store')closeBranches();if(fit)fit();}
 function closeBranches(){articles.forEach((article,i)=>{const body=$('branchBody'+i),nav=article.querySelector('.operation-tabs');if(body)body.hidden=true;if(nav)nav.hidden=true;toggles[i].setAttribute('aria-expanded','false');});}
 function openStore(i){articles.forEach((article,j)=>{const body=$('branchBody'+j),nav=article.querySelector('.operation-tabs');if(body)body.hidden=j!==i;if(nav)nav.hidden=j!==i;toggles[j].setAttribute('aria-expanded',String(j===i));});storeBar.heading.textContent=toggles[i].querySelector('.branch-name').textContent;show('store');}
 toggles.forEach((toggle,i)=>{toggle.onclick=()=>{
  const store=getState().empire.stores[i];
  // Unopened locations deliberately have no management view. Their card only performs
  // the paid opening action; after purchase it becomes the route into that store.
  if(!store.level){const buy=$('branchBuy'+i);if(buy&&!buy.disabled)buy.click();return;}
  openStore(i);
 };toggle.removeAttribute('aria-expanded');toggle.setAttribute('aria-haspopup','false');});
 // main.js still opens a branch body directly (Manage on the map, bottleneck shortcuts); follow it.
 if(window.MutationObserver){const watcher=new MutationObserver(()=>{const open=articles.findIndex((_,i)=>$('branchBody'+i)&&!$('branchBody'+i).hidden);if(open>=0&&(current!=='store'||storeBar.heading.textContent!==toggles[open].querySelector('.branch-name').textContent)){openStore(open);}});articles.forEach((_,i)=>{const body=$('branchBody'+i);if(body)watcher.observe(body,{attributes:true,attributeFilter:['hidden']});});}
 const todayView=pane.querySelector('[data-empire-view=today]');if(todayView)todayView.addEventListener('click',()=>{if(current!=='home')show('home');});
 function sync(){if(!document.hidden)storesUI.sync();}
 setInterval(sync,250);sync();
 return {show,openStore,sync};
}
