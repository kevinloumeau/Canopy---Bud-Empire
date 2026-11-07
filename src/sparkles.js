// Upgrade sparkles: the little shower that comes off a station when it levels up, trains staff or changes look, and off
// the other spots that call burst() in main.js. They used to be flat coloured squares drawn on the 2D overlay, which
// read as left over from the 2D game next to the 3D rings and characters. Now each burst throws a handful of soft
// world-space sprites in the 3D scene: leaves in leaf green, four-point glints and coins in brass. They rise on an
// ease-out, spread a little, spin and fade, and the buildings hide them like anything else in the scene. map3d.js
// draws them all as one instanced mesh (one draw call); this module only times them, so it is easy to test.
// Reduced motion skips them entirely.
export const SPARKLE_SECONDS = 1.15, SPARKLE_COUNT = 12, MAX_SPARKLES = 240;
// Shape slots in map3d.js's sprite sheet.
export const LEAF = 0, GLINT = 1, COIN = 2;
const LEAF_GREEN = '#8fd468', BRASS = '#f0c451', WARM_WHITE = '#fff1c4';
// Each burst's mix: mostly glints, then leaves, then a few coins, so it reads as sparkle first and money second.
const MIX = [GLINT, LEAF, GLINT, COIN, LEAF, GLINT, LEAF, COIN, GLINT, LEAF, GLINT, COIN];

// '#rrggbb' to [r, g, b] in 0..1; anything else falls back to brass.
export function rgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || ''));
  const v = parseInt(m ? m[1] : BRASS.slice(1), 16);
  return [(v >> 16 & 255) / 255, (v >> 8 & 255) / 255, (v & 255) / 255];
}
const mixRgb = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);

// A sparkle's look at t (0 → 1 through its life): how far it has risen and spread (0..1, eased out), its size
// (springs in, then shrinks a little) and its opacity (quick fade in, long fade out).
export function sparkleFrame(t) {
  const k = Math.max(0, Math.min(1, t)), out = 1 - Math.pow(1 - k, 3);
  return {
    out,
    scale: k < .16 ? .4 + .75 * (k / .16) : 1.15 - .45 * ((k - .16) / .84),
    alpha: k < .08 ? k / .08 : k < .45 ? 1 : Math.max(0, 1 - (k - .45) / .55)
  };
}

export function createSparkles(reducedMotion, now = () => performance.now(), random = Math.random) {
  const reduced = () => !!(reducedMotion && reducedMotion.matches);
  let live = [];
  // at: a map point {x, y (floor height), z}; colour: the burst's own tint, which the glints pick up.
  function burst(at, colour) {
    if (reduced() || !at) return;
    const t = now(), tint = rgb(colour), floor = at.y || 0;
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const shape = MIX[i % MIX.length], a = (i / SPARKLE_COUNT) * Math.PI * 2 + random() * .5, reach = .55 + random() * .75;
      const colourOf = shape === LEAF ? rgb(LEAF_GREEN) : shape === COIN ? rgb(BRASS) : mixRgb(tint, rgb(WARM_WHITE), .45);
      live.push({
        x: at.x + Math.cos(a) * .18, z: at.z + Math.sin(a) * .18, y: floor + 1.1 + random() * .4,
        dx: Math.cos(a) * reach, dz: Math.sin(a) * reach, rise: 1 + random() * 1,
        size: (shape === GLINT ? .62 : shape === COIN ? .42 : .48) * (.85 + random() * .3),
        turn: random() * Math.PI * 2, spin: (random() < .5 ? -1 : 1) * (1.5 + random() * 2.5),
        shape, colour: colourOf, at: t + i * 14, life: SPARKLE_SECONDS * (.85 + random() * .3)
      });
    }
    if (live.length > MAX_SPARKLES) live = live.slice(live.length - MAX_SPARKLES);
  }
  // The sparkles to draw now, as flat instance data for map3d.js: {x, y, z, size, angle, alpha, shape, r, g, b}.
  // Finished ones are dropped.
  function frame() {
    if (!live.length) return [];
    const t = now(), shown = [];
    live = live.filter(p => (t - p.at) / 1000 < p.life);
    live.forEach(p => {
      const age = (t - p.at) / 1000;
      if (age < 0) return;
      const k = age / p.life, f = sparkleFrame(k);
      // Leaves flutter side to side as they drift; glints and coins turn steadily.
      const sway = p.shape === LEAF ? Math.sin(age * 6 + p.turn) * .5 : 0;
      shown.push({
        x: p.x + p.dx * f.out, y: p.y + p.rise * f.out, z: p.z + p.dz * f.out,
        size: p.size * f.scale, angle: p.turn + p.spin * age * (p.shape === GLINT ? .45 : 1) + sway, alpha: f.alpha,
        shape: p.shape, r: p.colour[0], g: p.colour[1], b: p.colour[2]
      });
    });
    return shown;
  }
  return { burst, frame, clear() { live = []; }, get count() { return live.length; } };
}
