// Full open shows more, not bigger (Kevin, 2026-11-08: "these need to be redone at full open ... think through
// hierarchy, scale, and what's important"). Each phone sheet pane gets data-room="full" once it is tall enough for its
// full-open layout (src/full-open.css), and loses it again at half open. Panes that build their own content (Research
// shows its maxed rows, Empire its whole city) listen for the 'sheetroom' event to re-render.
export const FULL_ROOM=440;
export function installSheetRoom(){
 if(typeof ResizeObserver==='undefined')return;
 const phone=window.matchMedia('(max-width:779px)');
 const check=pane=>{const full=phone.matches&&pane.clientHeight>=FULL_ROOM,was=pane.dataset.room==='full';
  if(full===was)return;if(full)pane.dataset.room='full';else delete pane.dataset.room;pane.dispatchEvent(new CustomEvent('sheetroom',{detail:{full}}))};
 const observer=new ResizeObserver(entries=>entries.forEach(e=>check(e.target)));
 document.querySelectorAll('.sheet>[data-pane]').forEach(pane=>observer.observe(pane));
 phone.addEventListener&&phone.addEventListener('change',()=>document.querySelectorAll('.sheet>[data-pane]').forEach(check));
}
export const roomy=pane=>!!pane&&pane.dataset.room==='full';
