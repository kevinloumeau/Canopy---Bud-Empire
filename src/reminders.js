// Return reminders for the iOS app: local notifications scheduled on the device when the game goes to the background
// and cleared when it comes back. No server and no account. They need Capacitor's LocalNotifications plugin; in a
// browser (or before the plugin is installed) every call is a quiet no-op and Settings hides the option.
// 103 was the strain-cross reminder; crosses now run on game time, but the id stays so clearing removes old ones.
const IDS={safe:101,daily:102,cross:103};
const MINUTE=60000,DAY=86400000;
// What to remind about, from plain numbers so it can be tested: when the offline safe fills, when tomorrow's daily
// reward unlocks (only if today's is collected). Anything under a minute away is skipped.
export function planReminders({now,offlineCapMs,dailyAvailable,dailyClock}){
  const list=[];
  if(offlineCapMs>0)list.push({id:IDS.safe,at:now+offlineCapMs,title:'Your back-room safe is full',body:'The shop banked '+Math.round(offlineCapMs/3600000)+' hours of sales. Come collect them.'});
  if(!dailyAvailable&&Number.isFinite(dailyClock))list.push({id:IDS.daily,at:(Math.floor(dailyClock/DAY)+1)*DAY,title:'Daily reward ready',body:'A new day on the reward track is waiting.'});
  return list.filter(r=>r.at>now+MINUTE).sort((a,b)=>a.at-b.at);
}
export function createReminders(win=typeof window!=='undefined'?window:null){
  const plugin=win&&win.Capacitor&&win.Capacitor.Plugins&&win.Capacitor.Plugins.LocalNotifications;
  const cancelAll=()=>plugin?plugin.cancel({notifications:Object.values(IDS).map(id=>({id}))}).catch(()=>{}):Promise.resolve();
  return {
    available:!!plugin,
    // Asks iOS for permission; resolves true only when the player allowed notifications.
    async enable(){if(!plugin)return false;try{const r=await plugin.requestPermissions();return r&&r.display==='granted';}catch(e){return false;}},
    async schedule(list){if(!plugin)return;await cancelAll();if(!list.length)return;try{await plugin.schedule({notifications:list.map(r=>({id:r.id,title:r.title,body:r.body,schedule:{at:new Date(r.at)}}))});}catch(e){}},
    clear:cancelAll
  };
}
