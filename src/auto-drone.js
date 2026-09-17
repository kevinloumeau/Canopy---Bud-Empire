export const AUTO_DRONE_COST=7500;
export const AUTO_DRONE_INTERVAL=10;
export const BULK_DRONE_COST=25000;
export function migrateAutoDrone(raw){const owned=raw?.owned===true;return {bulk:owned&&raw?.bulk===true,mode:owned&&raw?.bulk===true&&raw?.mode==='bulk'?'bulk':'single',owned,enabled:owned&&raw.enabled===true,remaining:owned&&Number.isFinite(raw.remaining)?Math.max(0,Math.min(AUTO_DRONE_INTERVAL,raw.remaining)):0};}
export function buyAutoDrone(state){if(state.autoDrone.owned||state.money<AUTO_DRONE_COST)return false;state.money-=AUTO_DRONE_COST;state.autoDrone={owned:true,enabled:true,remaining:0,bulk:false,mode:'single'};return true;}
// Uses simulated seconds: pause and hidden-tab suspension stop departures.
export function autoDroneReady(drone,seconds,ready){if(!drone.owned||!drone.enabled)return false;drone.remaining=Math.max(0,drone.remaining-Math.max(0,seconds));if(drone.remaining>1e-8||!ready)return false;drone.remaining=AUTO_DRONE_INTERVAL;return true;}

export function buyBulkDrone(state){if(!state.autoDrone.owned||state.autoDrone.bulk||state.money<BULK_DRONE_COST)return false;state.money-=BULK_DRONE_COST;state.autoDrone.bulk=true;state.autoDrone.mode='bulk';return true;}
export function autoDroneLimit(drone){return drone.owned&&drone.bulk&&drone.mode==='bulk'?10:1;}
