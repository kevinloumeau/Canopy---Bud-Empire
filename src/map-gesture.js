// Map drag physics (Kevin, 2026-11-03: "take a look again at the map scrolling make it smoother less glitchy").
// main.js reads the fingers once per frame and hands the numbers here, so the map moves the way an iPhone scroll
// view does: a drag past the edge of the town stretches with resistance instead of stopping dead, a flick keeps
// gliding and slows down, and a view left past the edge springs back. Pure functions, so tests can run them.

// How far the map goes for a pull of `over` pixels past the edge, for a view `size` pixels across. UIScrollView's
// rubber band: the first pixels follow the finger at about half speed, and no pull takes it past `size`.
export function rubberBand(over, size) {
  if (!over || !(size > 0)) return 0;
  const a = Math.abs(over);
  return Math.sign(over) * (1 - 1 / (a * 0.55 / size + 1)) * size;
}

// The finger's last positions, kept for VELOCITY_WINDOW ms, give the speed it lets go at.
export const VELOCITY_WINDOW = 100;
export function addSample(samples, t, x, y) {
  samples.push({ t, x, y });
  while (samples.length > 2 && t - samples[0].t > VELOCITY_WINDOW) samples.shift();
  return samples;
}

// Speed in px/s at release. A finger that stopped before lifting (no move in the last STILL_MS) throws nothing.
export const STILL_MS = 60, MAX_FLING = 4200;
export function releaseVelocity(samples, now) {
  if (samples.length < 2) return { x: 0, y: 0 };
  const last = samples[samples.length - 1];
  if (now - last.t > STILL_MS) return { x: 0, y: 0 };
  let first = samples[0];
  for (const s of samples) if (last.t - s.t <= VELOCITY_WINDOW) { first = s; break; }
  const dt = (last.t - first.t) / 1000;
  if (dt < 0.012) return { x: 0, y: 0 };
  let x = (last.x - first.x) / dt, y = (last.y - first.y) / dt;
  const speed = Math.hypot(x, y);
  if (speed > MAX_FLING) { x *= MAX_FLING / speed; y *= MAX_FLING / speed; }
  return { x, y };
}

// A glide slows by FRICTION per second (about UIScrollView's normal deceleration: a quarter-second flick at
// 1,500 px/s travels about 500 px). Past the edge a critically damped spring pulls the map back, so a flick into
// the edge overshoots a little and settles without wobbling.
export const FRICTION = 3.2, SPRING = 15, STOP_SPEED = 10;

// One axis of a coasting map for dt seconds. `over` is how far the view sits past the edge (0 inside it).
export function coastAxis(pos, v, over, dt) {
  if (over) {
    // Semi-implicit Euler in short steps keeps the spring stable at any frame time.
    let t = dt;
    while (t > 0) {
      const h = Math.min(t, 1 / 120);
      v += (-SPRING * SPRING * over - 2 * SPRING * v) * h;
      const was = over;
      pos += v * h; over += v * h; t -= h;
      if (Math.sign(over) !== Math.sign(was)) { pos -= over; over = 0; break; }
      if (Math.abs(over) < 0.25 && Math.abs(v) < STOP_SPEED * 4) { pos -= over; over = 0; v = 0; break; }
    }
    return { pos, v };
  }
  v *= Math.exp(-FRICTION * dt);
  if (Math.abs(v) < STOP_SPEED) v = 0;
  return { pos: pos + v * dt, v };
}

// Past the flagship the town is one long street, and on screen it runs on a slant (the camera's turn), so the pan clamp
// lets the view travel along it but hardly up or down. A sideways drag pushed the view off the street; the clamp held it
// back, the push stretched the map and it sprang back on every release, so each swipe went about half as far as the
// finger and the map seemed to pull itself back (Kevin, 2026-11-08: "moving along the map is hard, auto moves").
// Now a push against the street's edge slides along the street instead, like a finger running along a wall: the push,
// squared onto the street, moves the view down it, and the part across the street is dropped rather than stretched.
// `clamp(x, y)` is where the pan clamp would put a view. On screen the street (the map's x axis) runs along t and its
// edges hold the view back along w (the map's z axis); the slant means the two are not at right angles. A hold-back
// along anything else, or a slide that hardly travels (the lot at the end of the street, the flagship's own sides),
// is a true edge and keeps its stretch. Returns the new pan, whether it slid, and the street's screen direction.
export function slideAlong(x, y, clamp, angle, squash) {
  const edge = clamp(x, y), ox = x - edge.x, oy = y - edge.y, out = { x, y, slid: false, tx: 0, ty: 0 };
  if (Math.abs(ox) < 0.01 && Math.abs(oy) < 0.01) return out;
  const c = Math.cos(angle), s = Math.sin(angle), tl = Math.hypot(c, s * squash), wl = Math.hypot(s, c * squash);
  const tx = c / tl, ty = s * squash / tl, wx = s / wl, wy = -c * squash / wl;
  out.tx = tx; out.ty = ty;
  if (Math.abs(ox * wx + oy * wy) < Math.hypot(ox, oy) * 0.95) return out;
  const along = ox * tx + oy * ty;
  // Clamping again after each step finds how far the street lets the view go (the clamp is not a straight projection).
  let px = edge.x, py = edge.y, left = along;
  for (let i = 0; i < 3 && Math.abs(left) > 0.01; i++) {
    const to = clamp(px + left * tx, py + left * ty), moved = (to.x - px) * tx + (to.y - py) * ty;
    px = to.x; py = to.y; left -= moved;
  }
  if (Math.abs(along - left) < Math.abs(along) * 0.5) return out;
  out.x = px + left * tx; out.y = py + left * ty; out.slid = true;
  return out;
}
