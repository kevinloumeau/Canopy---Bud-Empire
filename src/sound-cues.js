// Which sound a toast plays. main.js's notify() routes every message through cueFor(), so a moment gets one sound
// that matches what happened: a coin cascade for cash, a chord for an achievement, a climbing note for a station level.
// Construction starts are a mallet knock; finishes ring. Passive warnings (storage full, line full) stay silent.
// Big moments (an opening or a reopen) are the only cues loud enough to duck the music.
export const BIG_MOMENT=/ IS OPEN|^LOUNGE OPEN|^PICKUP WINDOW OPEN| DONE · | FINISHED · |^Reopened/;
const ACHIEVEMENT=/^ACHIEVEMENT|^CHAPTER COMPLETE|^DISCOVERED|LADDER COMPLETE/;
const CASH=/REWARD|GOAL COMPLETE|SHIFT COMPLETE|EVENT STEP|ORDER BONUS|CAREER MILESTONE|WHILE AWAY|BULK DELIVERY|CONTRACT DONE/;
const DENIED=/^Need |previous stage first/;
const STARTED=/UNDER CONSTRUCTION|UNDER WAY|^BREEDING /;
const FINISHED=/BUILT|OPEN|EXPANDED|INSTALLED|NEW LOOK|FOUNDER/;
const LEVEL=/LEVEL \d|LV \d|\+\d+ LEVEL/;
const BOUGHT=/UNLOCKED|ADDED TO MENU|NOW SELLS AS|^BOOST|UPGRADED|ALL STAGES/i;
export function cueFor(message,kind){
 const m=String(message||'');
 if(BIG_MOMENT.test(m))return /^Reopened/.test(m)?'reopen':'fanfare';
 if(ACHIEVEMENT.test(m))return 'achievement';
 if(CASH.test(m))return 'cash';
 if(DENIED.test(m))return 'denied';
 if(kind!=='upgrade')return null;
 if(STARTED.test(m))return 'start';
 if(FINISHED.test(m))return 'build';
 if(LEVEL.test(m))return 'levelup';
 if(BOUGHT.test(m))return 'buy';
 return 'upgrade';
}
// The haptic a cue brings with it when the code that raised it has none of its own (achievements and away pay arrive
// from the simulation, not a tap). Taps already buzz where they happen, and haptics.js folds a second buzz into the first.
export const PASSIVE_HAPTIC={achievement:'firm',cash:'light'};
