// Each branch's page has two tabs (Kevin, 2026-11-03: "dont need all the old options, remove the customize options,
// focus on the station and store upgrades"): Stations, the branch's own six-station line, and Store, its level,
// store upgrades and stars (both filled by empire-stores.js). The old Stock, People and Style tabs (shelves,
// transfers, drivers, managers, regulars and looks) are gone; operations.js still runs that simulation quietly.
import {BRANCH_NAMES} from './operations.js';
const TABS=[['Stations','<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="m3 13 9 5 9-5"/>'],['Store','<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M9 20v-6h6v6"/>']];
export function mountOperations({getState}){
 const $=id=>document.getElementById(id),selected=BRANCH_NAMES.map(()=>0),owned=BRANCH_NAMES.map(()=>null);
 function showTab(i,index){if(index===0&&!getState().empire.stores[i].level)index=1;selected[i]=index;
  TABS.forEach((_,j)=>{$('opTab'+i+j).setAttribute('aria-pressed',String(j===index));$('opPane'+i+j).hidden=j!==index;});}
 BRANCH_NAMES.forEach((name,i)=>{
  const body=$('branchBody'+i),store=document.createElement('div');store.id='opPane'+i+'1';store.className='op-pane store-pane';
  while(body.firstChild)store.appendChild(body.firstChild);
  const stations=document.createElement('div');stations.id='opPane'+i+'0';stations.className='op-pane station-pane';
  body.append(stations,store);
  const nav=document.createElement('nav');nav.className='operation-tabs';nav.setAttribute('aria-label',name);
  nav.innerHTML=TABS.map(([label,path],j)=>'<button type="button" id="opTab'+i+j+'" aria-pressed="'+(j===0)+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+path+'</svg><em>'+label+'</em></button>').join('');
  const header=document.createElement('div');header.className='branch-sticky-header';const toggle=$('branchToggle'+i);toggle.before(header);header.append(toggle,nav);nav.hidden=body.hidden;
  TABS.forEach((_,j)=>$('opTab'+i+j).onclick=()=>showTab(i,j));
  showTab(i,0);
 });
 return {showTab,render(){const p=getState().empire;
  // An unopened store has no line yet: it shows only the Store tab, with its opening price.
  // The moment it opens, the page turns to its stations.
  BRANCH_NAMES.forEach((_,i)=>{const open=p.stores[i].level>0;if(open===owned[i])return;const opened=owned[i]===false&&open;owned[i]=open;
   $('opTab'+i+'0').hidden=!open;$('opTab'+i+'0').closest('nav').classList.toggle('is-single',!open);showTab(i,open&&(opened||selected[i]===0)?0:1);});
 }};
}
