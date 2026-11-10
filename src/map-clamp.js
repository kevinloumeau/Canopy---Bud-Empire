// Where the camera may look on the sunny town map (main.js clampSunnyPan hands the screen's numbers here). Pure maths,
// so tests can run it.
//
// The town ends in haze, and `view` (SUNNY_VIEW) says how far the camera may look: the point under the frame's anchor
// (where the shop's origin sits at rest) stays inside the shop block and its first ring of streets, and the visible map
// (the top bar's bottom to the bottom of the map, less the sheet on a phone) stays inside the hazed reach, measured
// along the camera's turned axes, so no edge of the town shows. When the visible map is wider than the reach, the view
// sits centred on it.
//
// A view is (rx, rz): the ground point under the frame's anchor along the camera's turned axes, across and down the
// screen. The same point on the map is x (east along the street) and z (south across it):
//   x = rx*c + rz*s,  z = rz*c - rx*s.
// o: c, s (the camera turn's cosine and sine), u (px per map unit), sq (the floor's squash), zoom, width, frameX,
// frameY (the anchor on screen), top, bottom (the visible map), view (SUNNY_VIEW), reach (how far the town runs on east
// of the flagship), east (the east haze's start).
export const TALL_HEADROOM = 8;

// The limits for a view whose street window has slid `slide` east: across the screen, and the north and south reach.
function limits(o, slide) {
  const { c, s, u, sq, view } = o;
  // The rooftop lounge and Canopy HQ stand storeys above the ground the reach is measured on, so a view stopped at
  // the north limit cut their tops off under the top bar (Kevin, 2026-11-02). Closer in, where a whole building no
  // longer fits, the north limit gives TALL_HEADROOM map units of height more room; zoomed right out it adds none,
  // so the far edge of the town still never shows.
  const headroom = TALL_HEADROOM * Math.max(0, Math.min(1, (o.zoom - .65) / .5)) / sq;
  const below = Math.max(0, o.bottom - o.frameY) / (u * sq);
  return {
    below,
    rxLo: view.reach.rx[0] + slide * c + o.frameX / u, rxHi: view.reach.rx[1] + slide * c - (o.width - o.frameX) / u,
    rzLo: view.reach.rz[0] - headroom + slide * s + Math.max(0, o.frameY - o.top) / (u * sq), rzHi: view.reach.rz[1] + slide * s - below
  };
}
const fit = (v, lo, hi) => lo > hi ? (lo + hi) / 2 : Math.max(lo, Math.min(hi, v));
const slideAt = (o, x) => Math.max(0, Math.min(o.reach, x - STREET_FROM));

// Zoomed out, the visible map is taller than the town: the top of the view cannot stay inside the north reach while
// its bottom stays out of the south haze. The view used to be moved down the screen to split the difference and then
// back across the south line, and the two moves together carried it east along the street, off the shop and onto the
// next lot (Kevin, 2026-11-10: "dont like the camera auto moving to the empty plot when zoomed out"). Now the bottom
// wins there too and the view keeps its place across the screen: it sits as far down as the bottom rules allow (the
// bottom-left corner on the south ground line, or the bottom edge on the south reach, whichever comes first) and the
// haze takes the top of the screen, where the sky is. Only the street's ends and the side reach still move it across.
// This is that resting view for a place across the screen, worked out from rx alone: how far up or down the view was
// pushed must not move it sideways, or an up or down swipe would carry the camera along the street. `slide` is 0 at
// the flagship's end of the street and the whole reach at the far end, where the window stands still. Null where the
// top limit can be met there (the ordinary rules below) or the view it gives is on the street between the two ends.
function tallView(rx, o, slide) {
  const { c, s, view } = o, lim = limits(o, slide);
  let px = fit(rx, lim.rxLo, lim.rxHi);
  let floor = Math.min(lim.rzHi, (southLine(o, lim) + px * s) / c, (view.centre.z[1] + px * s) / c);
  // The street's ends: a view past one runs back along the street.
  const x = px * c + floor * s, xc = Math.max(view.centre.x[0], Math.min(view.centre.x[1] + o.reach, x));
  px += (xc - x) * c; floor += (xc - x) * s;
  if (slide ? xc < STREET_FROM + o.reach : o.reach > 0 && xc > STREET_FROM) return null;
  return lim.rzLo > floor ? { rx: px, rz: floor } : null;
}
// Where the street's window starts to slide east with the view (map x).
const STREET_FROM = 5;
// The furthest south the frame's anchor may sit (map z) with the view's bottom-left corner on the south ground line.
const southLine = (o, lim) => o.view.ground.south - (o.s * o.frameX / o.u + o.c * lim.below);

function pass(rx, rz, o) {
  const { c, s, u, view } = o;
  let lim = limits(o, 0), below = lim.below;
  // The bottom corners of the view, where the sheet meets the map, look at flat paving with nothing tall to lift it out
  // of the haze, so they stay out of the thick of it (SUNNY_VIEW.ground): the bottom-left corner is the view's furthest
  // point south, the bottom-right its furthest east. A corner past its line moves the view straight back across it
  // (up and across the screen together, so a view at the west or east limit still slides), and the bottom wins over
  // the top: up there the terraces stand tall enough to rise out of the haze, down here bare ground would show it.
  const corner = (edge, limit, gx, gz) => {
    let e = gx * (rx + edge) + gz * (rz + below) - limit; if (e <= 0) return;
    const mx = lim.rxLo > lim.rxHi ? rx : Math.max(lim.rxLo, Math.min(lim.rxHi, rx - e * gx)); e -= gx * (rx - mx); rx = mx; if (e > 0) rz -= e / gz;
  };
  const eastCorner = () => { corner((o.width - o.frameX) / u, o.east + view.ground.east, c, s); return { rx, rz }; };
  for (const slide of o.reach > 0 ? [0, o.reach] : [0]) {
    const tall = tallView(rx, o, slide);
    if (tall) { rx = tall.rx; rz = tall.rz; lim = limits(o, slide); return eastCorner(); }
  }
  // The town runs on east to the open branches and the next lot (branch-districts.js): the east limit moves out with
  // the east haze, and past the flagship the allowed window slides east with the view, so the north and south
  // limits stay where they are and the far edge stays inside the haze wherever the view is along the street.
  const x = Math.max(view.centre.x[0], Math.min(view.centre.x[1] + o.reach, rx * c + rz * s));
  let z = rz * c - rx * s;
  if (x > STREET_FROM && x < STREET_FROM + o.reach) {
    // On the street between its ends the window travels with the view, so every limit comes to the same thing wherever
    // the view is along it: a band the anchor may sit in across the street. A view outside it moves straight across the
    // street and keeps its place along it. (Each limit used to push its own way, up, down or across the screen, and where
    // two of them disagreed the pushes added up to a step east on every call, so the camera crept along the street.)
    // Where the band is empty, zoomed out, the bottom wins as it does at the flagship.
    let zEast = (STREET_FROM * c - lim.rxHi) / s, zWest = (STREET_FROM * c - lim.rxLo) / s;
    if (zEast > zWest) zEast = zWest = (zEast + zWest) / 2;
    const hi = Math.min(view.centre.z[1], southLine(o, lim), (lim.rzHi - STREET_FROM * s) / c, zWest);
    const lo = Math.max(view.centre.z[0], (lim.rzLo - STREET_FROM * s) / c, zEast);
    z = lo > hi ? hi : Math.max(lo, Math.min(hi, z));
    rx = x * c - z * s; rz = x * s + z * c; lim = limits(o, slideAt(o, x));
    return eastCorner();
  }
  // At the flagship's end of the street, and past its far end, the window stands still.
  z = Math.max(view.centre.z[0], Math.min(view.centre.z[1], z));
  lim = limits(o, slideAt(o, x));
  rx = fit(x * c - z * s, lim.rxLo, lim.rxHi); rz = fit(x * s + z * c, lim.rzLo, lim.rzHi);
  const ax = rx, az = rz;
  corner(-o.frameX / u, view.ground.south, -s, c);
  // Where the room between the north limit and the south line is thin, straight back across the line lands above the
  // north limit, and the two would pass the view east between them. There it comes straight up the screen instead.
  if (rz < lim.rzLo - 1e-9) { rx = ax; rz = Math.min(az, (southLine(o, lim) + ax * s) / c); }
  return eastCorner();
}

// The nearest allowed view to (rx, rz). One pass settles a view the rules agree on; where two of them pull against each
// other (a window that slides with the view, a corner line against a limit) a pass lands a little short, so it runs
// until the view stops moving. A view that is allowed comes back as it went in, so asking again never moves the
// camera: it used to creep a few pixels on every call when zoomed out.
export function clampTownView(rx, rz, o) {
  let v = { rx, rz };
  for (let i = 0; i < 24; i++) {
    const n = pass(v.rx, v.rz, o), moved = Math.abs(n.rx - v.rx) + Math.abs(n.rz - v.rz);
    v = n; if (moved < 1e-4) break;
  }
  return v;
}
