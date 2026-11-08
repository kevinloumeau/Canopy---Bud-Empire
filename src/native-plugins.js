// Native Capacitor plugins for the iOS app. The web build never imported @capacitor/core, so on the iPhone nothing
// called registerPlugin and window.Capacitor.Plugins stayed empty: every plugin looked missing. This asks core for a
// plugin only when the native side really has it (its header is in Capacitor.PluginHeaders); in a browser, or for a
// plugin the app was built without, it returns null and callers fall back quietly.
import {Capacitor,registerPlugin} from '@capacitor/core';

const made=new Map();
export function nativePlugin(name){
  if(made.has(name))return made.get(name);
  let plugin=null;
  try{if(Capacitor.isNativePlatform()&&Capacitor.isPluginAvailable(name))plugin=registerPlugin(name);}catch(e){plugin=null;}
  made.set(name,plugin);
  return plugin;
}
