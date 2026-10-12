// Style prototype ("?look=sunny"): instead of a diorama floating in a dark studio, the main shop sits in a sunlit
// park that runs to the screen edges — mown lawn, a paved plaza, tulip beds, hedges and round trees — in the warm,
// saturated, soft-toy palette of mobile farm/factory idle games. Off by default; nothing here touches saves or rules.
// The back pass paints under the shop (everything behind or beside it); the front pass paints low planting only, so
// nothing tall ever covers a station.
export const SUNNY = typeof location !== 'undefined' && /[?&]look=sunny\b/.test(location.search);

const TULIPS = ['#e8524a', '#f4c542', '#f39ab4', '#f6f1e4', '#8a6fd1', '#f08a3c'];
const LEAF = ['#4f8a38', '#6ea845', '#8fc257'];

// Beds are [x0, z0, x1, z1, colour index]; rows run along x. Back beds sit behind the shop's two rear edges, front
// beds below its right and left corners.
const BACK_BEDS = [[-6, -24, 4, -15, 0], [6, -24, 16, -15, 1], [18, -22, 26, -13, 2], [-31, -12, -19, -4, 3], [-31, -1, -19, 7, 4]];
const FRONT_BEDS = [[18, -6, 25, 2, 5], [18, 4, 25, 11, 1], [-6, 19, 3, 25, 2], [-18, 19, -9, 25, 0]];
const BACK_TREES = [[-24, -24, 1.2], [-16, -27, 1.05], [-35, -16, 1.15], [-9, -31, 1.25], [28, -27, 1.1], [33, -18, 1.2], [-38, 4, 1.1], [-36, 13, 1], [20, -32, 1]];
const FRONT_BUSHES = [[16.5, -9], [16.5, 13.5], [-15.5, 13.5], [4, 15.5], [10, 15.5], [-16.5, -11]];

export function drawSunnyWorld(api, front, alpha) {
  if (!(alpha > 0)) return;
  const ctx = api.ctx, u = api.unit, p = api.project;
  ctx.save(); ctx.globalAlpha = alpha;
  const quad = (x0, z0, x1, z1, y, fill) => api.poly([p(x0, y, z0), p(x1, y, z0), p(x1, y, z1), p(x0, y, z1)], fill);
  if (!front) {
    // Lawn to every edge: a warm vertical wash, then world-anchored mowing stripes so it pans with the shop.
    const g = ctx.createLinearGradient(0, 0, 0, api.height);
    g.addColorStop(0, '#9fc96c'); g.addColorStop(.5, '#88ba5a'); g.addColorStop(1, '#70a44a');
    ctx.fillStyle = g; ctx.fillRect(0, 0, api.width, api.height);
    for (let k = -24; k < 24; k++) if (k % 2 === 0) quad(-80, k * 3, 80, k * 3 + 3, -.34, 'rgba(255,255,190,.07)');
    // Grass tufts: tiny seeded dashes give the lawn texture without per-frame noise.
    if (u >= 7) for (let i = 0; i < 260; i++) {
      const x = (api.noise(i, 1) - .5) * 90, z = (api.noise(i, 2) - .5) * 80;
      if (x > -17 && x < 17 && z > -13 && z < 16) continue;
      const q = p(x, -.33, z); ctx.fillStyle = i % 3 ? 'rgba(60,110,40,.35)' : 'rgba(230,245,170,.45)';
      ctx.fillRect(q.x, q.y - u * .18, Math.max(1, u * .05), u * .18);
    }
    // Paved plaza around the slab, with a soft kerb and a sandy path out of the entrance corner.
    quad(-16.5, -12.5, 16.5, 15.5, -.335, '#e4d6ad');
    quad(-40, 9, -16.5, 14, -.336, '#e4d6ad');
    api.line([[-16.5, -.33, -12.5], [16.5, -.33, -12.5], [16.5, -.33, 15.5], [-16.5, -.33, 15.5], [-16.5, -.33, -12.5]], '#c2b07f', .08);
    BACK_BEDS.forEach(bed => drawBed(api, bed));
    // A low clipped hedge along the back of the plaza.
    for (let x = -15.5; x <= 15.5; x += 1.15) { const q = p(x, .35, -13.4); api.blob(q.x, q.y, u * .78, u * .55, LEAF[(Math.round(x * 3) % 3 + 3) % 3], x * 7, .12); }
    for (let z = -12; z <= 6; z += 1.15) { const q = p(-17.4, .35, z); api.blob(q.x, q.y, u * .78, u * .55, LEAF[(Math.round(z * 3) % 3 + 3) % 3], z * 9, .12); }
    BACK_TREES.slice().sort((a, b) => api.depth({ x: a[0], z: a[1] }) - api.depth({ x: b[0], z: b[1] })).forEach(t => tree(api, t[0], t[1], t[2]));
  } else {
    FRONT_BEDS.forEach(bed => drawBed(api, bed));
    FRONT_BUSHES.forEach(([x, z], i) => bush(api, x, z, i));
  }
  ctx.restore();
}

function drawBed(api, [x0, z0, x1, z1, c]) {
  const p = api.project, u = api.unit;
  api.poly([p(x0, -.3, z0), p(x1, -.3, z0), p(x1, -.3, z1), p(x0, -.3, z1)], '#8a5a3a');
  api.poly([p(x0 + .3, -.28, z0 + .3), p(x1 - .3, -.28, z0 + .3), p(x1 - .3, -.28, z1 - .3), p(x0 + .3, -.28, z1 - .3)], '#6e4630');
  // Rows of tulips, colour banded per row like the reference flower fields; painted back to front.
  for (let z = z0 + .8, row = 0; z < z1 - .4; z += .95, row++) {
    const col = TULIPS[(c + Math.floor(row / 2)) % TULIPS.length];
    for (let x = x0 + .6; x < x1 - .4; x += .55) {
      const s = p(x, .1, z);
      api.ellipse(s.x, s.y, u * .3, u * .14, '#4f8a32');
      api.ctx.fillStyle = '#3f7a2a'; api.ctx.fillRect(s.x - u * .025, s.y - u * .38, Math.max(1, u * .05), u * .38);
      const q = p(x, .55, z);
      api.ellipse(q.x, q.y, u * .17, u * .21, col);
      if (u >= 9) { api.ellipse(q.x + u * .05, q.y + u * .03, u * .1, u * .15, 'rgba(70,20,30,.18)'); api.ellipse(q.x - u * .05, q.y - u * .08, u * .055, u * .07, 'rgba(255,255,255,.5)'); }
    }
  }
}

function bush(api, x, z, i) {
  const p = api.project, u = api.unit;
  const sh = p(x, -.3, z); api.ellipse(sh.x - u * .3, sh.y + u * .1, u * 1.1, u * .42, 'rgba(30,60,20,.22)');
  for (let k = 0; k < 4; k++) { const q = p(x + (k - 1.5) * .35, .55 + (k % 2) * .25, z); api.blob(q.x, q.y, u * .62, u * .5, LEAF[(i + k) % 3], x * 3 + k, .14); }
  const top = p(x, 1.05, z); api.ellipse(top.x - u * .15, top.y - u * .12, u * .25, u * .16, 'rgba(255,255,220,.35)');
}

// A plump, rounded tree with a cast shadow, a bright rim on the sun side and a highlight cap, for the soft-rendered look.
function tree(api, x, z, s) {
  const p = api.project, u = api.unit;
  const sh = p(x, -.3, z); api.ellipse(sh.x - u * 1.1 * s, sh.y + u * .25, u * 2.4 * s, u * .9 * s, 'rgba(30,60,20,.25)');
  api.line([[x, -.3, z], [x, 2.6 * s, z]], '#7a5232', .28 * s);
  const lobes = [[-.9, 2.9, .5, 1.15], [0, 3.4, 0, 1.55], [.9, 3, -.4, 1.2], [.2, 4.3, .1, 1.15], [-.5, 3.9, -.6, .95], [.7, 3.8, .7, .95]];
  // Lobes go darkest first (low, shaded side) to brightest last (top, sun side), so the canopy reads as a lit volume.
  lobes.forEach(([dx, y, dz, r], k) => { const q = p(x + dx * s, y * s, z + dz * s); api.blob(q.x, q.y, u * r * s, u * r * .9 * s, ['#3f7432', '#4f8a38', '#5f9a3e', '#7cb648', '#6ea845', '#8fc257'][k], x * 5 + z + k, .1); });
  const hi = p(x + .4 * s, 4.5 * s, z - .2 * s); api.ellipse(hi.x, hi.y, u * .55 * s, u * .35 * s, 'rgba(255,255,210,.32)');
}
