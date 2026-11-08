// Franchise tiers: a second, slower layer above reopen shares (like Egg, Inc.'s farm tiers). Once every branch is
// finished (all bronze stars, kept for good), all-time revenue opens the next tier; signing it costs a tenth of that
// revenue in cash and multiplies sales in every shop by FRANCHISE_GAIN for good, through every reopen.
import {STORES,finishedBranches,FRANCHISE_GAIN} from './progression.js';
export {FRANCHISE_GAIN};
export const FRANCHISE_TIERS=[
  {name:'Regional chain',revenue:1e12},
  {name:'National brand',revenue:1e14},
  {name:'Coast to coast',revenue:1e16},
  {name:'Global franchise',revenue:1e18},
  {name:'Household name',revenue:1e20},
  {name:'Canopy worldwide',revenue:1e22}
];
export const FRANCHISE_PRICE=.1;
export function franchiseTier(p){const t=p?.franchise;return Number.isInteger(t)&&t>0?Math.min(t,FRANCHISE_TIERS.length):0;}
// What the next tier asks for. `need` is 'branches', 'revenue', 'cash' or null (ready); `next` is null once all are signed.
export function franchiseOffer(state){
  const p=state.empire,tier=franchiseTier(p),next=FRANCHISE_TIERS[tier]||null,allTime=(p.lifetimeAll||0)+Math.max(0,state.lifetime||0);
  const finished=finishedBranches(p),current=FRANCHISE_GAIN**tier;
  if(!next)return {tier,next:null,current,finished,allTime,need:null};
  const cost=Math.round(next.revenue*FRANCHISE_PRICE);
  const need=finished<STORES.length?'branches':allTime<next.revenue?'revenue':state.money<cost?'cash':null;
  return {tier,next,current,after:current*FRANCHISE_GAIN,finished,allTime,cost,need};
}
export function signFranchise(state){const o=franchiseOffer(state);if(!o.next||o.need)return false;state.money-=o.cost;state.empire.franchise=o.tier+1;return true;}
