// Style prototype ("?look=sunny"): instead of a diorama floating in a dark studio, the main shop sits on a sunlit
// city block that runs to the screen edges: asphalt streets with crossings, sidewalks, street trees, lamps, parked
// cars and neighbouring shopfronts, in the warm, saturated palette of mobile idle games. Off by default; nothing
// here touches saves or rules. The back pass paints under the shop (ground and everything behind it); the front
// pass paints only low street furniture and cars, so nothing tall ever covers a station.
export const SUNNY = typeof location !== 'undefined' && /[?&]look=sunny\b/.test(location.search);

const G = -.335; // ground level, just under the shop's slab
// Neighbouring buildings behind the shop: [x, z, w, d, h, wall, awning]. Rows sit across the rear streets.
const BACK_BUILDINGS = [
  [-36, -36, 14, 14, 15, ['#d9cdb8', '#a8987f', '#c4b59c'], '#3e6e5c'],
  [-10, -30, 10, 10, 5, ['#c9744f', '#8c4a31', '#ad5f40'], '#f2c14e'],
  [2, -30, 10, 10, 5, ['#efe3c8', '#bfae8c', '#dccca9'], '#e0564a'],
  [14, -30, 10, 10, 6, ['#7fb3b0', '#4f7d7a', '#669996'], '#f39ab4'],
  [26, -30, 10, 10, 12, ['#b9b4c9', '#7f7a95', '#9d98b2'], '#6ea845'],
  [-32, -11, 10, 9, 8, ['#e8b04a', '#ad7d2a', '#cf983a'], '#3e6e5c'],
  [-32, 1, 10, 9, 11, ['#d48f73', '#9b5c45', '#ba765c'], '#f4f1e4'],
  [-32, 13, 10, 9, 5, ['#9fc0d8', '#6a8aa3', '#85a6be'], '#e0564a']
];
const BACK_TREES = [[-8, -19.5], [0, -19.5], [8, -19.5], [16, -19.5], [-23.5, -6], [-23.5, 2], [-23.5, 10]];
const CARS = [[-6, -16.2, 'x', '#e0564a'], [10, -17.8, 'x', '#f2c14e'], [-20.4, -3, 'z', '#4f8fd0'], [5, 19.2, 'x', '#f4f1e4'], [-8, 20.8, 'x', '#6ea845'], [20.4, 4, 'z', '#e8913c']];

export function drawSunnyWorld(api, front, alpha) {
  if (!(alpha > 0)) return;
  const ctx = api.ctx, p = api.project;
  ctx.save(); ctx.globalAlpha = alpha;
  const quad = (x0, z0, x1, z1, y, fill) => api.poly([p(x0, y, z0), p(x1, y, z0), p(x1, y, z1), p(x0, y, z1)], fill);
  const byDepth = list => list.slice().sort((a, b) => api.depth({ x: a[0], z: a[1] }) - api.depth({ x: b[0], z: b[1] }));
  if (!front) {
    // Pale sidewalk concrete everywhere, then the street grid laid over it.
    ctx.fillStyle = '#e6e0cf'; ctx.fillRect(0, 0, api.width, api.height);
    for (let k = -30; k < 30; k++) api.line([[k * 2, G, -90], [k * 2, G, 90]], 'rgba(150,140,115,.25)', .025);
    for (let k = -30; k < 30; k++) api.line([[-90, G, k * 2], [90, G, k * 2]], 'rgba(150,140,115,.25)', .025);
    road(api, quad, 'x', -18.5, 6); road(api, quad, 'x', 19.5, 6);
    road(api, quad, 'z', -21.5, 6); road(api, quad, 'z', 21.5, 6);
    // The shop's own forecourt: warm pavers and a planter strip edge.
    quad(-16.5, -12.5, 16.5, 15.5, G + .002, '#efe2c2');
    api.line([[-16.5, G, -12.5], [16.5, G, -12.5], [16.5, G, 15.5], [-16.5, G, 15.5], [-16.5, G, -12.5]], '#c9b88e', .07);
    byDepth(BACK_BUILDINGS).forEach(b => building(api, b));
    byDepth(BACK_TREES).forEach(([x, z]) => streetTree(api, x, z));
    CARS.filter(c => c[1] < -12 || c[0] < -18).forEach(c => car(api, ...c));
    [[-16, -14.5], [16, -14.5], [-18.5, 13]].forEach(([x, z]) => lamp(api, x, z));
  } else {
    byDepth(CARS.filter(c => !(c[1] < -12 || c[0] < -18))).forEach(c => car(api, ...c));
    [[17.5, -9], [17.5, 13], [-12, 16.8], [12, 16.8]].forEach(([x, z]) => planter(api, x, z));
  }
  ctx.restore();
}

// A two-lane street of width w centred on `at`, running along x (or z): asphalt, a gutter on each kerb, a dashed
// centre line, and zebra crossings where it meets the cross streets.
function road(api, quad, along, at, w) {
  const a0 = at - w / 2, a1 = at + w / 2, L = 90;
  if (along === 'x') {
    quad(-L, a0, L, a1, G + .004, '#5d6168');
    quad(-L, a0, L, a0 + .25, G + .005, '#c9c3b2'); quad(-L, a1 - .25, L, a1, G + .005, '#c9c3b2');
    for (let x = -L; x < L; x += 3) api.line([[x, G + .006, at], [x + 1.6, G + .006, at]], '#f2d16b', .07);
    [-21.5, 21.5].forEach(cx => { for (let k = 0; k < 6; k++) quad(cx - 2.4, a0 + .6 + k * .85, cx + 2.4, a0 + 1.05 + k * .85, G + .007, '#f4f1e8'); });
  } else {
    quad(a0, -L, a1, L, G + .004, '#5d6168');
    quad(a0, -L, a0 + .25, L, G + .005, '#c9c3b2'); quad(a1 - .25, -L, a1, L, G + .005, '#c9c3b2');
    for (let z = -L; z < L; z += 3) api.line([[at, G + .006, z], [at, G + .006, z + 1.6]], '#f2d16b', .07);
  }
}

// A low-rise shopfront block: walls, a parapet, a grid of lit glass on both visible faces, and a coloured awning
// over a glazed ground floor.
function building(api, [x, z, w, d, h, wall, awning]) {
  const p = api.project, x1 = x + w / 2, z1 = z + d / 2;
  const sh = p(x - w / 2, G, z1); api.poly([sh, p(x - w / 2 - h * .35, G, z1 + h * .2), p(x1 - h * .35, G, z1 + h * .2), p(x1, G, z1)], 'rgba(40,40,30,.16)');
  api.box(x, z, G, w, d, h, wall);
  api.box(x, z, G + h, w + .2, d + .2, .35, [api.shade(wall[0], .92), api.shade(wall[1], .9), api.shade(wall[2], .9)]);
  const glass = ['#bfe3ef', '#9cc9dc'];
  for (let y = 2.6; y < h - .8; y += 1.7) {
    for (let k = x - w / 2 + .8; k < x1 - .8; k += 1.6) api.poly([p(k, y, z1 + .01), p(k + .9, y, z1 + .01), p(k + .9, y + 1, z1 + .01), p(k, y + 1, z1 + .01)], glass[(Math.round(k + y)) & 1]);
    for (let k = z - d / 2 + .8; k < z1 - .8; k += 1.6) api.poly([p(x1 + .01, y, k), p(x1 + .01, y, k + .9), p(x1 + .01, y + 1, k + .9), p(x1 + .01, y + 1, k)], glass[(Math.round(k + y) + 1) & 1]);
  }
  // Ground floor: shop glass and a striped awning on the street faces.
  api.poly([p(x - w / 2 + .5, G + .2, z1 + .01), p(x1 - .5, G + .2, z1 + .01), p(x1 - .5, G + 1.7, z1 + .01), p(x - w / 2 + .5, G + 1.7, z1 + .01)], '#8fb9c9');
  api.poly([p(x1 + .01, G + .2, z - d / 2 + .5), p(x1 + .01, G + .2, z1 - .5), p(x1 + .01, G + 1.7, z1 - .5), p(x1 + .01, G + 1.7, z - d / 2 + .5)], '#a3cad8');
  for (let k = 0; k < Math.floor((w - 1) / .8); k++) { const a = x - w / 2 + .5 + k * .8; api.poly([p(a, G + 2.2, z1), p(a + .8, G + 2.2, z1), p(a + .8, G + 1.8, z1 + .8), p(a, G + 1.8, z1 + .8)], k & 1 ? '#f8f3e6' : awning); }
  for (let k = 0; k < Math.floor((d - 1) / .8); k++) { const a = z - d / 2 + .5 + k * .8; api.poly([p(x1, G + 2.2, a), p(x1, G + 2.2, a + .8), p(x1 + .8, G + 1.8, a + .8), p(x1 + .8, G + 1.8, a)], k & 1 ? '#f8f3e6' : awning); }
}

function streetTree(api, x, z) {
  const p = api.project, u = api.unit;
  const sh = p(x, G, z); api.ellipse(sh.x - u * .8, sh.y + u * .2, u * 1.8, u * .7, 'rgba(40,50,30,.2)');
  api.box(x, z, G, 1.2, 1.2, .25, ['#7d6a52', '#5a4a38', '#6b5a45']);
  api.line([[x, G, z], [x, 2.4, z]], '#7a5232', .2);
  [[-.6, 2.6, .3, 1, '#3f7432'], [0, 3, 0, 1.25, '#4f8a38'], [.6, 2.7, -.3, .95, '#5f9a3e'], [.1, 3.7, .1, .9, '#7cb648']].forEach(([dx, y, dz, r, c], k) => { const q = p(x + dx, y, z + dz); api.blob(q.x, q.y, u * r, u * r * .9, c, x * 5 + z + k, .1); });
  const hi = p(x + .3, 3.9, z - .2); api.ellipse(hi.x, hi.y, u * .4, u * .26, 'rgba(255,255,210,.3)');
}

function lamp(api, x, z) {
  api.line([[x, G, z], [x, 4.2, z]], '#2f3a36', .1);
  api.box(x, z, 4.1, .55, .55, .35, ['#f6e7b6', '#2f3a36', '#3a4641']);
}

function planter(api, x, z) {
  const p = api.project, u = api.unit;
  api.box(x, z, G, 1.8, 1.1, .6, ['#cfc6b0', '#9b917a', '#b5ab93']);
  for (let k = 0; k < 3; k++) { const q = p(x - .5 + k * .5, .6, z); api.blob(q.x, q.y, u * .45, u * .36, ['#4f8a38', '#6ea845', '#8fc257'][k], x + k, .14); }
  [['#e8524a', -.4], ['#f4c542', .1], ['#f39ab4', .45]].forEach(([c, dx]) => { const q = p(x + dx, .9, z + .1); api.ellipse(q.x, q.y, u * .1, u * .1, c); });
}

// A rounded compact car parked along the kerb, nose along x or z.
function car(api, x, z, along, color) {
  const p = api.project, u = api.unit, ax = along === 'x';
  const L = 2.6, W = 1.3, sh = p(x, G, z);
  api.ellipse(sh.x - u * .4, sh.y + u * .2, u * 1.8, u * .7, 'rgba(30,30,30,.22)');
  [[-.85, 1], [.85, 1], [-.85, -1], [.85, -1]].forEach(([a, s]) => { const q = ax ? p(x + a, G + .25, z + s * W / 2) : p(x + s * W / 2, G + .25, z + a); api.ellipse(q.x, q.y, u * .24, u * .24, '#25282b'); });
  const dark = api.shade(color, .72), mid = api.shade(color, .86);
  api.box(x, z, G + .25, ax ? L : W, ax ? W : L, .6, [color, ax ? dark : mid, ax ? mid : dark]);
  api.box(x - (ax ? .15 : 0), z - (ax ? 0 : .15), G + .85, ax ? 1.5 : W * .86, ax ? W * .86 : 1.5, .5, ['#e9eef0', '#7f98a6', '#9fb6c2']);
}
