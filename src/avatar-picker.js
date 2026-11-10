// The manager avatar picker (Kevin, 2026-11-10: "have the ability to swipe and select your manager avatar there"): a
// row of the manager's looks that swipes sideways and snaps, the one in the middle large and lit, its neighbours small
// and dim either side. Whichever look rests in the middle is the pick; a tap on a neighbour or on a chevron brings it
// there, and the arrow keys do the same. Used on the start guide's first card and on the manager card.
// `get()` returns the saved avatar id and `set(id)` saves a new one (main.js, state.manager.avatar).
import {AVATARS} from './manager.js';
const CHEVRON=d=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+d+'"/></svg>';
export function mountAvatarPicker(host,{get,set}){
 host.classList.add('avatar-picker');
 host.innerHTML='<div class="avatar-track" role="listbox" aria-label="Your manager" aria-orientation="horizontal" tabindex="0">'+
  AVATARS.map(a=>'<button type="button" role="option" tabindex="-1" class="avatar-item" data-id="'+a.id+'" aria-label="'+a.name+'"><img src="guide/avatars/'+a.id+'.webp" width="150" height="200" alt="" draggable="false" decoding="async"></button>').join('')+'</div>'+
  '<button type="button" class="avatar-step is-prev" aria-label="Previous look">'+CHEVRON('m14.5 6-6 6 6 6')+'</button><button type="button" class="avatar-step is-next" aria-label="Next look">'+CHEVRON('m9.5 6 6 6-6 6')+'</button>'+
  '<div class="avatar-dots" aria-hidden="true">'+AVATARS.map(()=>'<i></i>').join('')+'</div>';
 const track=host.querySelector('.avatar-track'),items=Array.from(track.children),dots=Array.from(host.querySelector('.avatar-dots').children),steps=host.querySelectorAll('.avatar-step');
 let current=-1;
 function mark(i,commit){
  if(i===current)return;current=i;
  items.forEach((el,j)=>{el.classList.toggle('is-on',j===i);el.setAttribute('aria-selected',String(j===i));});
  dots.forEach((d,j)=>d.classList.toggle('is-on',j===i));
  steps[0].disabled=i===0;steps[1].disabled=i===items.length-1;
  if(commit&&get()!==AVATARS[i].id)set(AVATARS[i].id);
 }
 const centre=el=>el.offsetLeft+el.offsetWidth/2;
 function nearest(){const c=track.scrollLeft+track.clientWidth/2;let best=0,gap=Infinity;items.forEach((el,j)=>{const d=Math.abs(centre(el)-c);if(d<gap){gap=d;best=j;}});return best;}
 function go(i,smooth){
  i=Math.max(0,Math.min(items.length-1,i));
  const still=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  track.scrollTo({left:centre(items[i])-track.clientWidth/2,behavior:smooth&&!still?'smooth':'auto'});mark(i,true);
 }
 // While a swipe or a glide is under way the middle look follows the scroll; it becomes the pick as it passes.
 track.addEventListener('scroll',()=>{if(track.clientWidth)mark(nearest(),true);},{passive:true});
 items.forEach((el,j)=>{el.onclick=()=>go(j,true);});
 steps[0].onclick=()=>go(current-1,true);steps[1].onclick=()=>go(current+1,true);
 track.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();go(current-1,true);}else if(e.key==='ArrowRight'){e.preventDefault();go(current+1,true);}});
 // Call once the picker is on screen (it cannot scroll while hidden): shows the saved look in the middle.
 return {sync(){const i=Math.max(0,AVATARS.findIndex(a=>a.id===get()));current=-1;mark(i,false);track.scrollTo({left:centre(items[i])-track.clientWidth/2,behavior:'auto'});}};
}
