// Settings: one gear in the HUD opens a modal over a dimmed, blurred map. Sound, music, haptics and reminders are
// iOS-style switches (brass on, forest off) that drive the game's own hidden toggles; the start guide has a small
// Replay button and the reset is one coral "Reset game" button that opens the existing confirm. Pause and lighting
// stay on the HUD only.
import {manageDialog} from './dialog-focus.js';
const SWITCHES=[
 ['soundToggle','Sound',el=>el.textContent.replace('Sound ','')==='on'],
 ['musicToggle','Music',el=>el.textContent==='Music on'],
 ['hapticsToggle','Haptics',el=>el.textContent==='Haptics on'],
 ['remindersToggle','Reminders',el=>el.textContent==='Reminders on'],
];
// Each row leads with a small glass icon tile, as in iOS Settings, so the list scans by picture (icon audit, 2026-11-08).
const line=paths=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
const ROW_ICONS={
 soundToggle:line('<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>'),
 musicToggle:line('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),
 hapticsToggle:line('<rect x="8" y="3.5" width="8" height="17" rx="2"/><path d="M4.5 9v6M19.5 9v6"/>'),
 remindersToggle:line('<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 1.5H5z"/><path d="M10 20.5h4"/>'),
 guide:line('<path d="M12 21v-8"/><path d="M12 13c-4.5 0-7-2.5-7-7 4.5 0 7 2.5 7 7Z"/><path d="M12 15c0-4 2.3-6.5 7-6.5 0 4.2-2.5 6.5-7 6.5Z"/>'),
};
const rowIcon=key=>'<i class="settings-icon">'+ROW_ICONS[key]+'</i>';
const closeIcon=line('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>');
const replayIcon='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 10a5.5 5.5 0 1 0 1.7-4"/><path d="M5.5 2.8v3.6h3.6"/></svg>';
export function mountSettings({haptic}={}){
 const $=id=>document.getElementById(id);
 const gear=document.createElement('button');gear.type='button';gear.id='settingsOpen';gear.setAttribute('aria-label','Settings');gear.setAttribute('aria-haspopup','dialog');gear.title='Settings';
 gear.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h9m4 0h3M4 12h3m4 0h9M4 17h11m4 0h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
 document.querySelector('.speed-controls').appendChild(gear);
 const wrap=document.createElement('div');wrap.className='modal-wrap settings-wrap';wrap.id='settingsModal';wrap.hidden=true;
 const switchRow=([id,label])=>'<div class="settings-row" data-row="'+id+'"'+(id==='soundToggle'||id==='musicToggle'?'':' hidden')+'><span class="settings-label">'+rowIcon(id)+'<span id="'+id+'Label">'+label+'</span></span>'+
  '<button type="button" class="settings-switch" role="switch" aria-checked="false" aria-labelledby="'+id+'Label" data-proxy="'+id+'"><i></i></button></div>';
 wrap.innerHTML='<div class="modal settings" role="dialog" aria-modal="true" aria-labelledby="settingsTitle"><div class="settings-head"><h2 id="settingsTitle">Settings</h2><button type="button" class="settings-close" aria-label="Close settings">'+closeIcon+'</button></div>'+
  '<div class="settings-list">'+SWITCHES.map(switchRow).join('')+
  '<div class="settings-row"><span class="settings-label">'+rowIcon('guide')+'<span id="guideLabel">Start guide</span></span><button type="button" class="settings-chip" data-proxy="guide" aria-label="Replay the start guide">'+replayIcon+'Replay</button></div>'+
  '</div><div class="settings-foot"><button type="button" class="settings-reset" data-proxy="resetOpen" aria-haspopup="dialog">Reset game</button><div class="settings-logo" role="img" aria-label="Canopy: Bud Empire"></div><p class="settings-note">Your shop saves on this device.</p></div></div>';
 document.body.append(wrap);
 const closeButton=wrap.querySelector('.settings-close');
 let opener=null;
 function sync(){
  for(const [id,,isOn] of SWITCHES){
   const source=$(id),row=wrap.querySelector('[data-row='+id+']');
   // Haptics only appear where the device can buzz, and reminders only in the iOS app: the game creates those toggles there.
   row.hidden=!source;if(source)row.querySelector('[role=switch]').setAttribute('aria-checked',String(isOn(source)));
  }
 }
 function open(){opener=document.activeElement;sync();wrap.hidden=false;closeButton.focus();}
 function close(){wrap.hidden=true;if(opener&&opener.focus)opener.focus();}
 gear.onclick=open;closeButton.onclick=close;
 wrap.addEventListener('click',e=>{if(e.target===wrap)close();});
 wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close();}});
 // Tapping anywhere on a switch row flips its switch, as on iOS.
 wrap.querySelectorAll('.settings-row[data-row]').forEach(row=>row.addEventListener('click',e=>{if(!e.target.closest('button'))row.querySelector('[role=switch]').click();}));
 wrap.querySelectorAll('[data-proxy]').forEach(button=>button.onclick=()=>{
  const key=button.dataset.proxy;
  if(key==='guide'){close();const replay=document.querySelector('.guide-replay');if(replay)replay.click();return;}
  if(key==='resetOpen'){close();const reset=$('resetOpen');if(reset)reset.click();return;}
  const target=$(key);if(!target)return;
  // Flip at once so the knob slides under the finger, then read the game's own state back.
  button.setAttribute('aria-checked',String(button.getAttribute('aria-checked')!=='true'));
  target.click();
  // The haptics toggle buzzes on its own when it turns on.
  if(key!=='hapticsToggle'&&haptic)haptic('light');
  setTimeout(sync,0);
 });
 manageDialog(wrap,close);
 setInterval(()=>{if(!document.hidden&&!wrap.hidden)sync();},500);
 return {open,close};
}
