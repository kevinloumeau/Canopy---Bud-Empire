// Settings sheet: one gear in the HUD gathers sound, the start guide and reset. Pause and lighting stay on the HUD only.
import {manageDialog} from './dialog-focus.js';
export function mountSettings(options){
 const opts=options||{};
 const $=id=>document.getElementById(id);
 const native=(()=>{try{const c=window.Capacitor;return !!(c&&c.isNativePlatform&&c.isNativePlatform())}catch(e){return false}})();
 const gear=document.createElement('button');gear.type='button';gear.id='settingsOpen';gear.setAttribute('aria-label','Settings');gear.setAttribute('aria-haspopup','dialog');gear.title='Settings';
 gear.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h9m4 0h3M4 12h3m4 0h9M4 17h11m4 0h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/></svg>';
 document.querySelector('.speed-controls').appendChild(gear);
 const wrap=document.createElement('div');wrap.className='modal-wrap settings-wrap';wrap.id='settingsModal';wrap.hidden=true;
 wrap.innerHTML='<div class="modal settings" role="dialog" aria-modal="true" aria-labelledby="settingsTitle"><div class="settings-head"><h2 id="settingsTitle">Settings</h2><button type="button" class="settings-close" aria-label="Close settings">×</button></div>'+
  '<div class="settings-list">'+
  '<button type="button" class="settings-row" data-proxy="soundToggle"><span>Sound</span><b data-mirror="soundToggle"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="ambienceToggle"><span>Ambience</span><b data-mirror="ambienceToggle"></b></button>'+
  // Motion belongs beside sound: both are things a player may want quiet without changing their whole phone.
  '<button type="button" class="settings-row" data-still><span>Reduce motion<small>Holds the shop still</small></span><b data-mirror="still"></b></button>'+
  '<button type="button" class="settings-row" data-proxy="guide"><span>Start guide</span><b>Replay</b></button>'+
  // Backing up by hand is a web concern. Installed as an app the save is already held on the device twice — the
  // web view's storage and a native mirror beneath it — and iOS carries app data to a new phone in its own backup,
  // so offering a manual export there would be ceremony for something already handled.
  (native?'':
   '<button type="button" class="settings-row" data-proxy="exportSave"><span>Back up save<small>Downloads a file you keep</small></span><b>Export</b></button>'+
   '<button type="button" class="settings-row" data-proxy="importSave"><span>Restore save<small>Replaces the shop in this browser</small></span><b>Import</b></button>')+
  '</div><div class="settings-foot"><button type="button" class="settings-row settings-danger" data-proxy="resetOpen"><span>Start over</span><b>Reset everything</b></button><p class="settings-note">Canopy: Bud Empire · saves '+(native?'on this device':'in this browser')+'</p></div></div>';
 document.body.append(wrap);
 const modal=wrap.querySelector('.modal'),closeButton=wrap.querySelector('.settings-close');
 let opener=null;
 function sync(){
  const sound=$('soundToggle'),bed=$('ambienceToggle');
  wrap.querySelector('[data-mirror=soundToggle]').textContent=sound?(sound.textContent.replace('Sound ','')==='on'?'On':'Off'):'';
  wrap.querySelector('[data-mirror=ambienceToggle]').textContent=bed?(bed.textContent.replace('Ambience ','')==='on'?'On':'Off'):'';
  // When the phone itself asks for reduced motion the game follows it and the row says so rather than pretending
  // to be a switch that would not do anything.
  const stillRow=wrap.querySelector('[data-still]'),fromSystem=opts.systemStill?opts.systemStill():false;
  const still=fromSystem||(opts.stillMotion?opts.stillMotion():false);
  stillRow.querySelector('[data-mirror=still]').textContent=fromSystem?'On · System':(still?'On':'Off');
  stillRow.disabled=fromSystem;
  stillRow.setAttribute('aria-pressed',String(still));
 }
 function open(){opener=document.activeElement;sync();wrap.hidden=false;closeButton.focus();}
 function close(){wrap.hidden=true;if(opener&&opener.focus)opener.focus();}
 gear.onclick=open;closeButton.onclick=close;
 wrap.addEventListener('click',e=>{if(e.target===wrap)close();});
 wrap.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close();}});
 wrap.querySelector('[data-still]').onclick=()=>{
  if(!opts.stillMotion)return;
  opts.stillMotion(!opts.stillMotion());
  sync();
 };
 wrap.querySelectorAll('[data-proxy]').forEach(button=>button.onclick=()=>{
  const key=button.dataset.proxy;
  if(key==='guide'){close();const replay=document.querySelector('.guide-replay');if(replay)replay.click();return;}
  if(key==='resetOpen'){close();const reset=$('resetOpen');if(reset)reset.click();return;}
  // Backup actions open a file dialog or a download, so the sheet gets out of the way first.
  if(key==='exportSave'||key==='importSave'){close();const action=$(key);if(action)action.click();return;}
  const target=$(key);if(target)target.click();setTimeout(sync,0);
 });
 manageDialog(wrap,close);
 setInterval(()=>{if(!document.hidden&&!wrap.hidden)sync();},500);
 return {open,close};
}
