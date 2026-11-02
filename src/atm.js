// The street ATM (Kevin, 2026-11-02: "there should be an ATM, with upgrades"). Plenty of dispensaries are cash only,
// so a share of the customers on their way to the door step out of the line to a cash machine on the pavement by the
// entrance, take out cash and step back into their place. Every withdrawal pays the shop a fee.
//
// The machines stand on the wide left pavement just short of the front corner, facing the shop (and the camera), clear
// of the security booth, the kiosks and the lines inside. The customer stands on the shop side, facing the screen.
//
// What can be bought: the first machine, then levels (a bigger fee, more customers using it, quicker withdrawals) and
// a second and third machine (more withdrawals at once). The machine's look changes at the station look levels
// (Lv 1, 10, 30, 50, 75) and takes the founder's finish at Lv 100. The save keeps only {level, machines}.
//
// Positions are world units, like the rest of the map.
import { stationCost, STATION_LOOK_LEVELS } from './economy.js';

export const ATM_BUILD = 8000;
export const ATM_MACHINE_COSTS = [40000, 250000]; // the second and the third machine
export const ATM_MAX_LEVEL = 100, ATM_MAX_MACHINES = 3;
const LEVEL_BASE = 400;
// The machines, in the order they are bought: the first stands nearest the corner, the next two either side of it.
// Each faces +x (the shop); the customer stands at STAND_X in front of it.
export const ATM_SPOTS = [{ x: -14.2, z: 11.4 }, { x: -14.2, z: 10.25 }, { x: -14.2, z: 12.55 }];
export const ATM_STAND_X = -13.45;
// A customer steps out to a machine only while their place in the ID line is along this stretch of it (route
// distance from the ID check), so they are never far from the machine and never at the head of the line.
export const ATM_WINDOW = { from: 1.6, to: 8 };
// Seconds walking to the machine and back, on top of the withdrawal itself, for the capacity estimate.
const ATM_WALK_SECONDS = 1.1;

export function migrateAtm(raw) {
  const level = Math.max(0, Math.min(ATM_MAX_LEVEL, Math.floor(Number(raw?.level) || 0)));
  const machines = level ? Math.max(1, Math.min(ATM_MAX_MACHINES, Math.floor(Number(raw?.machines) || 1))) : 0;
  return { level, machines };
}

// The machine's look, 1 to 5 at the station look levels, 6 (the founder's finish) at Lv 100.
export function atmLook(level) {
  if (level >= ATM_MAX_LEVEL) return 6;
  let look = 1;
  for (let n = 1; n < STATION_LOOK_LEVELS.length; n++) if (level >= STATION_LOOK_LEVELS[n]) look = n + 1;
  return look;
}
// What a withdrawal pays, as a share of a basket's value: a little more each level and a quarter step more at each new look.
export function atmFeeShare(level) {
  if (!level) return 0;
  const look = Math.min(5, atmLook(level));
  return .12 * (1 + .015 * (level - 1)) * Math.pow(1.15, look - 1);
}
// The share of customers who stop for cash: 30% at Lv 1, 40% at Lv 100.
export function atmUseShare(level) { return level ? .3 + .1 * (level - 1) / (ATM_MAX_LEVEL - 1) : 0; }
// Seconds at the machine: 3.5 at Lv 1, 1.5 at Lv 100.
export function atmUseSeconds(level) { return 3.5 / (1 + .0135 * (Math.max(1, level) - 1)); }
// Whether customer number `id` is one of the cash users: spread evenly through the arrivals, like the kiosk turns.
export function wantsCash(id, level) {
  const share = atmUseShare(level);
  return share > 0 && Math.floor((id + 1) * share) > Math.floor(id * share);
}
// Withdrawals a second the machines can take, walking there and back included.
export function atmCapacity(atm) { return atm.level ? atm.machines / (atmUseSeconds(atm.level) + ATM_WALK_SECONDS) : 0; }
// Fees a second, for the income rate and the best-buy maths: customers a second, the share who stop (as many as the
// machines can take), times the fee on a basket of the given value.
export function atmIncome(atm, customersPerSecond, basketValue) {
  if (!atm.level || !(customersPerSecond > 0) || !(basketValue > 0)) return 0;
  const uses = Math.min(customersPerSecond * atmUseShare(atm.level), atmCapacity(atm));
  return uses * atmFeeShare(atm.level) * basketValue;
}

// Prices: the next level, and the next machine (null when there is none to buy).
export function atmLevelCost(level) { return level >= ATM_MAX_LEVEL ? null : stationCost(LEVEL_BASE, level); }
export function atmMachineCost(atm) { return atm.level && atm.machines < ATM_MAX_MACHINES ? ATM_MACHINE_COSTS[atm.machines - 1] : null; }

export function buyAtm(state) {
  const atm = state.atm;
  if (atm.level || !(state.money >= ATM_BUILD)) return false;
  state.money -= ATM_BUILD; atm.level = 1; atm.machines = 1; return true;
}
export function buyAtmLevel(state) {
  const atm = state.atm, price = atm.level ? atmLevelCost(atm.level) : null;
  if (price === null || !(state.money >= price)) return false;
  state.money -= price; atm.level++; return true;
}
// As many levels as the cash buys (at most `limit`); returns how many were bought.
export function buyAtmLevels(state, limit = ATM_MAX_LEVEL) {
  let n = 0;
  while (n < limit && buyAtmLevel(state)) n++;
  return n;
}
export function atmMaxQuote(atm, money) {
  let level = atm.level, spend = 0, levels = 0;
  if (!level) return { levels, cost: 0 };
  while (level < ATM_MAX_LEVEL) { const p = atmLevelCost(level); if (spend + p > money) break; spend += p; level++; levels++; }
  return { levels, cost: spend };
}
export function buyAtmMachine(state) {
  const atm = state.atm, price = atmMachineCost(atm);
  if (price === null || !(state.money >= price)) return false;
  state.money -= price; atm.machines++; return true;
}

// A free machine for a customer to use: the first whose stand nobody holds.
export function freeAtm(customers, machines) {
  for (let i = 0; i < machines; i++) if (!customers.some(c => c.cash && c.cash.machine === i)) return i;
  return -1;
}
