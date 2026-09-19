// First-run walkthrough: five short coach marks over the live game. Seen once, replayable from the Shop tab.
import {manageDialog} from './dialog-focus.js';
const SEEN_KEY='shift-guide-seen';
const STEPS=[
 {title:'A little shop. A big beginning.',text:'The lights are on and your first customers are on their way. Your crew grows, packs and sells automatically. Start small; give the neighborhood a reason to come back.',cta:'Show me'},
 {title:'Stations are your crew',text:'Security, then Seeds → Grow → Harvest → Pack → Orders → Pickup. The slowest one is your bottleneck and it’s already selected. Feed that first; the rest can wait.',target:'.machine-nav',tray:'factory'},
 {title:'Let the first sales come in',text:'Cash arrives when customers collect their bags. The rate beside it estimates your sales capacity; a new shop needs a moment to fill its shelves. Save toward the recommended upgrade.',target:'.hud > .stat'},
 {title:'A rooftop route, when you’re ready',text:'Build the $7,500 delivery pad in Deliveries to unlock web requests and an automatic courier drone. Orders pay a third more per unit. Until then, focus on your walk-in customers.',target:'.stock-online',tray:'factory'},
 {title:'Every shop has a story',text:'Follow your next chapter from the flag beside the queue or from Empire. Meet your regulars, open new neighborhoods, and collect rewards along the way.',target:'[data-tray=empire]',cta:'Let’s grow'}
];
export function mountStartGuide({showTray,collapse,fit}){
 const root=document.createElement('div');root.className='start-guide';root.hidden=true;
 root.innerHTML='<div class="guide-dim"></div><div class="guide-ring" hidden></div>'+
  '<section class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guideTitle"><div class="guide-dots" aria-hidden="true"></div><h2 id="guideTitle"></h2><p id="guideText"></p>'+
  '<div class="guide-actions"><button type="button" class="guide-skip">Skip</button><button type="button" class="guide-next">Next</button></div></section>';
 document.body.append(root);
 const $=s=>root.querySelector(s),ring=$('.guide-ring'),dots=$('.guide-dots');
 dots.innerHTML=STEPS.map(()=>'<i></i>').join('');
 let step=-1,raf=0,lastTarget=null;
 function place(){
  const target=lastTarget&&document.querySelector(lastTarget);
  if(!target){ring.hidden=true;return;}
  const r=target.getBoundingClientRect(),pad=6;
  if(r.width===0||r.height===0){ring.hidden=true;return;}
  ring.hidden=false;ring.style.left=(r.left-pad)+'px';ring.style.top=(r.top-pad)+'px';ring.style.width=(r.width+pad*2)+'px';ring.style.height=(r.height+pad*2)+'px';
 }
 function track(){place();raf=requestAnimationFrame(track);}
 function show(i){
  step=i;const s=STEPS[i];
  if(s.tray&&showTray)showTray(s.tray);
  $('#guideTitle').textContent=s.title;$('#guideText').textContent=s.text;
  $('.guide-next').textContent=s.cta||(i===STEPS.length-1?'Done':'Next');
  Array.from(dots.children).forEach((d,j)=>d.classList.toggle('is-on',j<=i));
  lastTarget=s.target||null;root.dataset.step=String(i);root.classList.toggle('is-spotlight',!!s.target);
  if(fit)fit();requestAnimationFrame(place);$('.guide-next').focus({preventScroll:true});
 }
 function open(){root.hidden=false;document.body.classList.add('guide-open');cancelAnimationFrame(raf);track();show(0);}
 function close(){root.hidden=true;document.body.classList.remove('guide-open');cancelAnimationFrame(raf);try{localStorage.setItem(SEEN_KEY,'1');}catch(e){}if(collapse)collapse();}
 $('.guide-next').onclick=()=>step<STEPS.length-1?show(step+1):close();
 $('.guide-skip').onclick=close;
 root.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
 manageDialog(root,close);
 return {open,close,seen(){try{return !!localStorage.getItem(SEEN_KEY);}catch(e){return true;}}};
}
