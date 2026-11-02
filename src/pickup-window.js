// The walk-up pickup window for online orders (Kevin, 2026-10-20): a storefront bay with a hatch on the floor's front edge,
// a clerk inside it, a line of customers along the front pavement and an A-frame sign on the kerb.
//
// It is the first online buy (Kevin picked "window first"): building it opens web orders, and until the drone port is
// built every order is collected there, as fast as the line moves. Once drones fly, one order in three still walks
// up. Orders are paid for when they are sent, like every online order; the tip jar adds a quarter on walk-ups. The
// save keeps only what was bought (migrateWindow); the walk-ups themselves are passing scenery.
//
// Walk-ups come up out of the subway (main.js passes the stairs' path), walk the pavement to the back of the line,
// shuffle up to the window, take their bag and go back down. Positions are world units, like the rest of the map.

export const PICKUP_WINDOW = { x: 10.3, z: 11.78 }; // the window bay's origin: its wall's footprint centre on the floor's edge
export const PICKUP_SIGN = { x: 13.6, z: 10.75, rot: Math.PI / 4 }; // the A-frame, turned to the corner and the subway
export const WINDOW_CLERK = { x: 10.75, z: 11.42 }; // at the open half of the hatch, clear of the inside shelf
const SPOT = { x: 10.4, z: 12.7 }; // the customer at the window
const PAVE = -.012, LINE_Z = 12.9, SPACING = 1.15, LANE_Z = 14, SPEED = 1.7, STAGGER = 2.2;
export const WINDOW_LINE_MAX = 6;

// What the window costs and how it levels (Kevin, 2026-11-02: "more upgradeable"). Building it opens web orders at Lv 1;
// from there it trains to Lv 75 like Security, its look changing at the station look levels (1, 10, 30, 50, 75).
// Every level pays walk-ups 5% more and each new look doubles that; the look levels also add to what the hatch can do:
//   Lv 10 awning and second hatch: a line of 10, 3 s hand-offs.   Lv 30 ready shelf: a line of 12, 2 s hand-offs, and
//   with drones flying 1 order in 2 walks up.   Lv 50 lit blade sign: 25% more web orders.   Lv 75 flagship window:
//   2 orders in 3 walk up.
// Saves from before the track had a second hatch ($12K) and a tip jar ($20K) as one-off buys: the hatch is Lv 10, the
// tip jar five levels on top.
export const WINDOW_COST = 40000, WINDOW_MAX_LEVEL = 75, WINDOW_PAY_STEP = .05, WINDOW_SIGN_BOOST = 1.25;
export const WINDOW_LOOK_LEVELS = [1, 10, 30, 50, 75];
export const WINDOW_LOOKS = ['Hatch', 'Awning', 'Ready shelf', 'Blade sign', 'Flagship window'];
// What each look level adds, in a few words for the unlock road.
export const WINDOW_UNLOCKS = ['', 'Line of 10 · 3s hand-off', '1 in 2 walk up · 2s', '+25% web orders', '2 in 3 walk up'];
export function migrateWindow(raw, droneOwned) {
  // Saves from before the window was its own buy got it free with the drone port, so they keep it.
  const owned = raw?.owned === true || droneOwned === true;
  let level = Number.isFinite(raw?.level) ? Math.floor(raw.level) : (raw?.hatch === true ? 10 : 1) + (raw?.tips === true ? 5 : 0);
  level = owned ? Math.max(1, Math.min(WINDOW_MAX_LEVEL, level)) : 0;
  return { owned, level };
}
export function windowLevel(w) { return w && w.owned ? Math.max(1, w.level || 1) : 0; }
export function windowLook(level) { let look = 1; for (let n = 1; n < WINDOW_LOOK_LEVELS.length; n++) if (level >= WINDOW_LOOK_LEVELS[n]) look = n + 1; return look; }
export function nextWindowLook(level) { return WINDOW_LOOK_LEVELS.find(l => l > level) || null; }
// The price of the next level from `level`: a station-like climb, gentler past the first stretch so the late looks
// stay in reach of a big shop. Lv 1 -> 2 costs about what building it did.
export function windowLevelCost(level) {
  const l = Math.max(1, level);
  return Math.floor(30000 * Math.pow(1.25, Math.min(l, 30) - 1) * Math.pow(1.15, Math.max(0, l - 30)));
}
// Levels (and their total) the cash buys from `level`, up to `limit` levels.
export function windowLevelsFor(level, money, limit = WINDOW_MAX_LEVEL) {
  let levels = 0, cost = 0;
  while (levels < limit && level + levels < WINDOW_MAX_LEVEL) { const p = windowLevelCost(level + levels); if (cost + p > money) break; cost += p; levels++; }
  return { levels, cost };
}
// What a walk-up order pays over a drone order: 5% a level from Lv 2, and half as much again at each new look (Lv 10, 30, 50, 75),
// the way a station's output doubles at its tiers, so the window keeps pace with a growing shop.
export function windowPay(level) { return level > 0 ? (1 + WINDOW_PAY_STEP * (level - 1)) * Math.pow(1.5, windowLook(level) - 1) : 1; }
export function windowLineMax(w) { const l = windowLevel(w); return l >= 30 ? 12 : l >= 10 ? 10 : WINDOW_LINE_MAX; }
export function windowServeSeconds(w) { const l = windowLevel(w); return l >= 30 ? 2 : l >= 10 ? 3 : 4.5; }
// How many web orders arrive, against the plain rate: the lit blade sign at Lv 50 brings a quarter more.
export function windowRequestBoost(w) { return windowLevel(w) >= 50 ? WINDOW_SIGN_BOOST : 1; }
// Once drones fly, the share of orders still collected at the window: 1 in 3, 1 in 2 from Lv 30, 2 in 3 from Lv 75.
export function walkupFraction(level) { return level >= 75 ? 2 / 3 : level >= 30 ? 1 / 2 : 1 / 3; }
// Places free in the line.
export function windowRoom(line, w) { return Math.max(0, windowLineMax(w) - inLine(line).length); }

// Which online orders (by their number) are walk-ups once drones fly: every third, every second from Lv 30, two in
// three from Lv 75.
export function walkupShare(sequence, level = 1) { return level >= 75 ? sequence % 3 !== 0 : level >= 30 ? sequence % 2 === 1 : sequence % 3 === 2; }
export function walkupCount(first, count, level = 1) {
  let n = 0;
  for (let k = first; k < first + count; k++) if (walkupShare(k, level)) n++;
  return n;
}
// Place i in the line: 0 at the window, the rest back along the pavement toward the shop's front left.
export function windowSlot(i) { return i === 0 ? { x: SPOT.x, z: SPOT.z } : { x: SPOT.x - i * SPACING, z: LINE_Z }; }

export function createWindowLine() { return { people: [], nextId: 0 }; }
function inLine(line) { return line.people.filter(p => p.phase !== 'leave'); }

// Adds up to n walk-ups, as many as the line (max long) has room for; returns how many came. `stairs(id)` is the path up out of
// the subway, [[x, y, z], ...], starting out of sight.
export function addWalkups(line, n, stairs, max = WINDOW_LINE_MAX) {
  const room = Math.max(0, max - inLine(line).length), count = Math.min(n, room);
  const waiting = line.people.filter(p => p.wait > 0).reduce((m, p) => Math.max(m, p.wait), -STAGGER);
  for (let k = 0; k < count; k++) {
    const id = line.nextId++, route = stairs(id).map(p => p.slice());
    line.people.push({ id, phase: 'arrive', route, x: route[0][0], y: route[0][1], z: route[0][2], wait: waiting + STAGGER * (k + 1), walked: 0, serve: 0, bag: false, heading: { x: 0, z: 1 }, moving: false });
  }
  return count;
}

// Walks p toward [x, y, z] with `budget` units of ground; returns what is left of the budget.
function walkTo(p, t, budget) {
  const dx = t[0] - p.x, dz = t[2] - p.z, d = Math.hypot(dx, dz);
  if (d > 1e-6) p.heading = { x: dx / d, z: dz / d };
  if (d <= budget) { p.walked += d; p.x = t[0]; p.y = t[1]; p.z = t[2]; return budget - d; }
  const f = budget / d; p.walked += budget; p.x += dx * f; p.y += (t[1] - p.y) * f; p.z += dz * f; return 0;
}

// Walks p along its route, dropping each point as it is reached; returns the budget left over.
function follow(p, budget) {
  while (budget > 0 && p.route.length) {
    const t = p.route[0]; budget = walkTo(p, t, budget);
    if (p.x === t[0] && p.z === t[2]) p.route.shift();
  }
  return budget;
}

// One step of the line: arrivals climb out and walk to their place, the line closes up, the one at the window is
// served (serveSeconds) and heads back down the stairs (`stairs` again, walked in reverse). Returns true while someone
// is at the window.
export function stepWindowLine(line, dt, stairs, serveSeconds = 4.5) {
  dt = Math.min(dt, .5);
  let serving = false;
  inLine(line).forEach((p, i) => {
    let budget = SPEED * dt;
    const startX = p.x, startZ = p.z;
    if (p.wait > 0) { p.wait -= dt; p.moving = false; return; }
    if (p.phase === 'arrive') {
      budget = follow(p, budget);
      if (!p.route.length) p.phase = 'approach';
    }
    const slot = windowSlot(i);
    if (p.phase === 'approach' && budget > 0) {
      // Along the outer edge of the pavement to just behind the place, then in to it.
      if (p.x > slot.x + .75) budget = walkTo(p, [slot.x + .7, PAVE, LANE_Z], budget);
      if (budget > 0) { budget = walkTo(p, [slot.x, PAVE, slot.z], budget); if (budget > 0) p.phase = 'queue'; }
    } else if (p.phase === 'queue') walkTo(p, [slot.x, PAVE, slot.z], budget);
    p.moving = Math.hypot(p.x - startX, p.z - startZ) > 1e-4;
    if (p.phase === 'queue' && i === 0 && !p.moving && p.x === slot.x && p.z === slot.z) {
      serving = true; p.serve += dt;
      if (p.serve >= serveSeconds) {
        p.bag = true; p.phase = 'leave';
        p.route = [[p.x + .7, PAVE, LANE_Z]].concat(stairs(p.id).reverse().map(q => q.slice()));
      }
    }
  });
  line.people.filter(p => p.phase === 'leave').forEach(p => {
    let budget = SPEED * dt; const startX = p.x, startZ = p.z;
    follow(p, budget);
    p.moving = Math.hypot(p.x - startX, p.z - startZ) > 1e-4;
    if (!p.route.length) p.gone = true;
  });
  line.people = line.people.filter(p => !p.gone);
  return serving;
}

// Who to draw: everyone above the stairs' hidden end (hiddenZ, the passage under the pavement), with the way they face.
// Standing in line they face the window, which is to their right on screen (+x, or -z at the window itself).
export function windowFigures(line, hiddenZ) {
  return line.people.filter(p => p.wait <= 0 && p.z > hiddenZ).map(p => ({
    id: p.id, x: p.x, y: p.y, z: p.z, bag: p.bag, moving: p.moving, walked: p.walked, heading: p.heading,
    facing: p.moving ? (Math.sign(p.heading.x - p.heading.z) || .3) : 1
  }));
}
