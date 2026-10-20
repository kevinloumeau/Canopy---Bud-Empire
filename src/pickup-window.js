// The walk-up pickup window for online orders (Kevin, 2026-10-20): an open counter set into the floor's front edge with
// a clerk behind it, a line of customers along the front pavement and an A-frame sign on the kerb. One online order
// in three is collected there instead of flying out by drone; it is paid for when it is sent, like every online
// order, so the window only changes who carries it. The walk-ups are passing scenery: nothing here is saved.
//
// Walk-ups come up out of the subway (main.js passes the stairs' path), walk the pavement to the back of the line,
// shuffle up to the counter, take their bag and go back down. Positions are world units, like the rest of the map.

export const PICKUP_WINDOW = { x: 10.3, z: 11.44 }; // the counter's origin: its footprint centre, its front on the floor's edge
export const PICKUP_SIGN = { x: 12.45, z: 12.75, rot: Math.PI / 4 }; // the A-frame, turned to the corner and the subway
export const WINDOW_CLERK = { x: 9.95, z: 10.3 }; // behind the counter
const SPOT = { x: 10.4, z: 12.7 }; // the customer at the counter
const PAVE = -.012, LINE_Z = 12.9, SPACING = 1.15, LANE_Z = 14, SPEED = 1.7, SERVE = 4.5, STAGGER = 2.2;
export const WINDOW_LINE_MAX = 6;

// Every third online order (by its number) is a walk-up.
export function walkupShare(sequence) { return sequence % 3 === 2; }
export function walkupCount(first, count) {
  let n = 0;
  for (let k = first; k < first + count; k++) if (walkupShare(k)) n++;
  return n;
}
// Place i in the line: 0 at the counter, the rest back along the pavement toward the shop's front left.
export function windowSlot(i) { return i === 0 ? { x: SPOT.x, z: SPOT.z } : { x: SPOT.x - i * SPACING, z: LINE_Z }; }

export function createWindowLine() { return { people: [], nextId: 0 }; }
function inLine(line) { return line.people.filter(p => p.phase !== 'leave'); }

// Adds up to n walk-ups, as many as the line has room for; returns how many came. `stairs(id)` is the path up out of
// the subway, [[x, y, z], ...], starting out of sight.
export function addWalkups(line, n, stairs) {
  const room = Math.max(0, WINDOW_LINE_MAX - inLine(line).length), count = Math.min(n, room);
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

// One step of the line: arrivals climb out and walk to their place, the line closes up, the one at the counter is
// served and heads back down the stairs (`stairs` again, walked in reverse). Returns true while someone is at the counter.
export function stepWindowLine(line, dt, stairs) {
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
      if (p.serve >= SERVE) {
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
// Standing in line they face the counter, which is to their right on screen (+x, or -z at the counter itself).
export function windowFigures(line, hiddenZ) {
  return line.people.filter(p => p.wait <= 0 && p.z > hiddenZ).map(p => ({
    id: p.id, x: p.x, y: p.y, z: p.z, bag: p.bag, moving: p.moving, walked: p.walked, heading: p.heading,
    facing: p.moving ? (Math.sign(p.heading.x - p.heading.z) || .3) : 1
  }));
}
