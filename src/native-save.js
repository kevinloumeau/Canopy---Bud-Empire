// A second copy of the save in the iOS app's own storage (Capacitor Preferences, which is UserDefaults), because WebKit
// can clear a web view's localStorage: low storage, an iOS update, or "Offload App". Every save is mirrored there; on
// launch, if the web copy is missing or behind the native copy, the native copy is written back and the page reloads.
// "Behind" is decided by saveSeq, a counter that only goes up (it survives Start over and prestige), never by clock
// time, so a wound-back device clock can't make an old save win. In a browser there is no plugin and this does nothing.
export const NATIVE_KEY='shift-save';
const GUARD='canopy-save-restored';

export function parseSave(raw){
  if(typeof raw!=='string'||!raw)return null;
  try{const value=JSON.parse(raw);return value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length?value:null;}catch(e){return null;}
}
export function saveSeq(save){const n=Number(save&&save.saveSeq);return Number.isFinite(n)&&n>0?Math.floor(n):0;}
// True only when the native copy is a real save and the web copy is gone, broken, or strictly behind it.
export function shouldRestore(localRaw,nativeRaw){
  const native=parseSave(nativeRaw);if(!native)return false;
  const local=parseSave(localRaw);if(!local)return true;
  return saveSeq(native)>saveSeq(local);
}

// plugin: Preferences (or null). getLocal() returns the web save text, setLocal(raw) writes it back and returns true
// when it stuck, reload() restarts the page, session is sessionStorage (guards against a reload loop).
export function createNativeSave({plugin,getLocal,setLocal,reload,session}){
  let ready=!plugin,restoring=false,frozen=false,pending=null;
  const put=raw=>{try{const p=plugin.set({key:NATIVE_KEY,value:raw});if(p&&p.catch)p.catch(()=>{});}catch(e){}};
  return {
    get available(){return !!plugin;},
    // While a restore is under way the game must not save: its fresh state would overwrite the copy just put back.
    get blocked(){return restoring;},
    async start(){
      if(!plugin)return 'none';
      let nativeRaw=null;
      try{const got=await plugin.get({key:NATIVE_KEY});nativeRaw=got&&got.value;}catch(e){frozen=true;return 'unreadable';}
      if(shouldRestore(getLocal(),nativeRaw)){
        let again=false;try{again=!!(session&&session.getItem(GUARD));}catch(e){}
        // A second restore in one session means the web copy won't stick: stop mirroring so the native copy is kept.
        if(again){frozen=true;return 'stuck';}
        try{session&&session.setItem(GUARD,'1');}catch(e){}
        restoring=true;
        if(setLocal(nativeRaw)){reload();return 'restored';}
        restoring=false;frozen=true;return 'stuck';
      }
      let recovered=false;try{recovered=!!(session&&session.getItem(GUARD));session&&session.removeItem(GUARD);}catch(e){}
      ready=true;
      if(pending!==null){put(pending);pending=null;}
      return recovered?'recovered':'kept';
    },
    // Called with the exact text just written to localStorage. Held until start() has compared the two copies.
    write(raw){
      if(!plugin||restoring||frozen||typeof raw!=='string')return;
      if(!ready){pending=raw;return;}
      put(raw);
    }
  };
}
