import {CHARACTER_CLIPS,CHARACTER_HANDS} from './character-clips.js';
import {CHARACTER_CLIPS as CARAMEL_CLIPS,CHARACTER_HANDS as CARAMEL_HANDS} from './caramel-clips.js';
import {CHARACTER_CLIPS as BEANIE_CLIPS,CHARACTER_HANDS as BEANIE_HANDS} from './beanie-clips.js';
import {CHARACTER_CLIPS as CREAM_CLIPS,CHARACTER_HANDS as CREAM_HANDS} from './cream-clips.js';
import {CHARACTER_CLIPS as BEARDED_CLIPS,CHARACTER_HANDS as BEARDED_HANDS} from './bearded-clips.js';
import {CHARACTER_CLIPS as CHEF_CLIPS,CHARACTER_HANDS as CHEF_HANDS} from './chef-clips.js';
import {CHARACTER_CLIPS as COLORFUL_CLIPS,CHARACTER_HANDS as COLORFUL_HANDS} from './colorful-clips.js';
import {CHARACTER_CLIPS as BLAZER_CLIPS,CHARACTER_HANDS as BLAZER_HANDS} from './blazer-clips.js';
import {CHARACTER_CLIPS as OFFICE_CLIPS,CHARACTER_HANDS as OFFICE_HANDS} from './office-clips.js';
import {CHARACTER_CLIPS as PLAID_CLIPS,CHARACTER_HANDS as PLAID_HANDS} from './plaid-clips.js';
import {CHARACTER_CLIPS as UTILITY_CLIPS,CHARACTER_HANDS as UTILITY_HANDS} from './utility-clips.js';
import {CHARACTER_CLIPS as SECURITY_CLIPS,CHARACTER_HANDS as SECURITY_HANDS} from './security-clips.js';
import {CHARACTER_CLIPS as GREEN_MAN_CLIPS,CHARACTER_HANDS as GREEN_MAN_HANDS} from './green-man-clips.js';
import {CHARACTER_CLIPS as GREEN_WOMAN_CLIPS,CHARACTER_HANDS as GREEN_WOMAN_HANDS} from './green-woman-clips.js';
import {CHARACTER_CLIPS as GRAY_EMPLOYEE_CLIPS,CHARACTER_HANDS as GRAY_EMPLOYEE_HANDS} from './gray-employee-clips.js';
import {CHARACTER_CLIPS as DARK_HAIRED_EMPLOYEE_CLIPS,CHARACTER_HANDS as DARK_HAIRED_EMPLOYEE_HANDS} from './dark-haired-employee-clips.js';
import {CHARACTER_CLIPS as YOUNG_EMPLOYEE_CLIPS,CHARACTER_HANDS as YOUNG_EMPLOYEE_HANDS} from './young-employee-clips.js';
const ASSETS={TieDye:[CHARACTER_CLIPS,CHARACTER_HANDS],Caramel:[CARAMEL_CLIPS,CARAMEL_HANDS],Beanie:[BEANIE_CLIPS,BEANIE_HANDS],Cream:[CREAM_CLIPS,CREAM_HANDS],Bearded:[BEARDED_CLIPS,BEARDED_HANDS],Chef:[CHEF_CLIPS,CHEF_HANDS],Colorful:[COLORFUL_CLIPS,COLORFUL_HANDS],Blazer:[BLAZER_CLIPS,BLAZER_HANDS],Office:[OFFICE_CLIPS,OFFICE_HANDS],Plaid:[PLAID_CLIPS,PLAID_HANDS],Utility:[UTILITY_CLIPS,UTILITY_HANDS],Security:[SECURITY_CLIPS,SECURITY_HANDS],GreenMan:[GREEN_MAN_CLIPS,GREEN_MAN_HANDS],GreenWoman:[GREEN_WOMAN_CLIPS,GREEN_WOMAN_HANDS]};
Object.assign(ASSETS,{GrayEmployee:[GRAY_EMPLOYEE_CLIPS,GRAY_EMPLOYEE_HANDS],DarkHairedEmployee:[DARK_HAIRED_EMPLOYEE_CLIPS,DARK_HAIRED_EMPLOYEE_HANDS],YoungEmployee:[YOUNG_EMPLOYEE_CLIPS,YOUNG_EMPLOYEE_HANDS]});
const assets=character=>ASSETS[character]||ASSETS.TieDye;
const loop=(value,length)=>((value%length)+length)%length;
export function characterPose(gait,time,id=0,character='TieDye'){
  const clips=assets(character)[0];
  const idle=clips.idle,walk=clips.walking;
  const idleFrame=idle.offset+(gait?.still?0:loop(time/1000+id*.37,idle.duration)/idle.duration*idle.frames);
  const walkFrame=walk.offset+(gait?.still?0:loop((gait?.phase??0)/(Math.PI*2),1)*walk.frames);
  const amount=gait?.still?0:Math.min(1,Math.max(0,gait?.amount??0));
  return {idle:idleFrame,walk:walkFrame,blend:amount*amount*(3-2*amount)};
}
export function characterHand(pose,character='TieDye'){
  const hands=assets(character)[1];
  const sample=frame=>{const base=Math.floor(frame),f=frame-base;return hands[base].map((v,i)=>v+(hands[base+1][i]-v)*f)};
  const idle=sample(pose.idle),walk=sample(pose.walk);return idle.map((v,i)=>v+(walk[i]-v)*pose.blend);
}
