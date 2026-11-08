// The weekend pop-up market on the 3D map (popup-event.js has the rules, popup-market-layout.js the plan). Four
// striped tents with scalloped valances and lettered boards, counters stocked with jars, a lettered arch over the way
// in and festoon lights down the aisle, all in the theme's colours; the Blender props round it (tables, cart,
// planters, trees) come in the frame's props like the rest of the street. A stall not open yet stands as its bare
// frame with crates under it, and opening it puts its canopy and counter up.
//
// Draw calls: the frames and counters of every tent merge into one vertex-coloured mesh, the canopies into one textured
// mesh per theme, the valances, boards and the arch banner a mesh each, the bulbs one. Rebuilt only when the theme or
// the set of open stalls changes. A few thousand triangles in all.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { STALL_X, STALL_Z, STALL_W, STALL_D, ARCH, FESTOON_POSTS } from '../popup-market-layout.js';
import { POPUP_PLOT as PLOT } from '../branch-districts.js';

const FONT = '"Fredoka", "Bricolage Grotesque", sans-serif';
const POLE = '#efe7d6', WOOD = '#b98a5a', WOOD_DARK = '#8a6240', CRATE = '#c9a26c', CREAM = '#f4ecd8', IRON = '#3b3a34';
const SIGNS = ['FLOWER', 'PRE-ROLLS', 'EDIBLES', 'MERCH'];
const JARS = ['#7bb36a', '#e8b04b', '#d9766a', '#8fb7c9', '#c58fd0'];
const POLE_H = 2.5, RIDGE = 3.35;

function canvas(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
// Awning stripes across the canopy, a fine weave line at each seam.
function stripes(a, b) {
  return canvas(256, 64, (g, w, h) => {
    const n = 8;
    for (let i = 0; i < n; i++) { g.fillStyle = i % 2 ? b : a; g.fillRect(i * w / n, 0, w / n, h); }
    g.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 1; i < n; i++) g.fillRect(i * w / n - 1, 0, 2, h);
  });
}
// The valance: the stripes ending in a row of scallops, transparent between them.
function valance(a, b) {
  return canvas(256, 64, (g, w, h) => {
    const n = 8, r = w / n / 2;
    for (let i = 0; i < n; i++) {
      g.fillStyle = i % 2 ? b : a;
      g.fillRect(i * w / n, 0, w / n, h - r);
      g.beginPath(); g.arc(i * w / n + r, h - r, r, 0, Math.PI); g.fill();
    }
    g.fillStyle = 'rgba(0,0,0,.12)'; g.fillRect(0, 0, w, 4);
  });
}
// A lettered board: cream with a coloured rule, or the theme colour with cream letters (the arch banner).
function board(text, bg, fg, rule, w = 512, h = 112) {
  return canvas(w, h, (g) => {
    g.fillStyle = bg; g.beginPath(); g.roundRect(4, 4, w - 8, h - 8, 18); g.fill();
    g.strokeStyle = rule; g.lineWidth = 6; g.beginPath(); g.roundRect(12, 12, w - 24, h - 24, 12); g.stroke();
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    let size = h * .5; g.font = '600 ' + size + 'px ' + FONT;
    while (g.measureText(text).width > w - 64 && size > 10) { size -= 2; g.font = '600 ' + size + 'px ' + FONT; }
    g.fillText(text, w / 2, h / 2 + 3);
  });
}

// Basket-weave brick, a tile 2.4 units square (two pairs of bricks each way).
function bricks() {
  const t = canvas(256, 256, (g, w) => {
    g.fillStyle = '#b9a07a'; g.fillRect(0, 0, w, w);
    const c = w / 2, tones = ['#dccaa6', '#d4bf98', '#e1d1b0', '#cfb991'];
    let n = 0;
    for (let y = 0; y < 2; y++) for (let x = 0; x < 2; x++) {
      const along = (x + y) % 2 === 0;
      for (let k = 0; k < 2; k++) {
        g.fillStyle = tones[n++ % tones.length];
        if (along) g.fillRect(x * c + 3, y * c + 3 + k * c / 2, c - 6, c / 2 - 6);
        else g.fillRect(x * c + 3 + k * c / 2, y * c + 3, c / 2 - 6, c - 6);
      }
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function buildPopupMarket(world, { hazed }) {
  const group = new THREE.Group();
  group.visible = false;
  world.add(group);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);
  const unitBox = new THREE.BoxGeometry(1, 1, 1).toNonIndexed(), cyl = new THREE.CylinderGeometry(.5, .5, 1, 8, 1).toNonIndexed(), ball = new THREE.IcosahedronGeometry(.5, 1).toNonIndexed();
  const solidMat = hazed('#ffffff', { vertexColors: true });
  const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffffff', vertexColors: true });
  let built = null, sig = '';

  function coloured(geometry, colour, matrix) {
    const g = geometry.clone().applyMatrix4(matrix);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    col.set(colour);
    const n = g.attributes.position.count, c = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; }
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    return g;
  }
  function build(theme, open) {
    if (built) { built.forEach(m => { group.remove(m); m.geometry.dispose(); if (m.material !== solidMat && m.material !== bulbMat) { if (m.material.map) m.material.map.dispose(); m.material.dispose(); } }); }
    built = [];
    const solids = [], bulbs = [], canopies = [], valances = [], boards = [];
    const span = (x0, x1, y0, y1, z0, z1, colour, list = solids) => list.push(coloured(unitBox, colour, m4.compose(v.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2), q.identity(), s.set(Math.max(.01, x1 - x0), Math.max(.01, y1 - y0), Math.max(.01, z1 - z0)))));
    const post = (x, z, y0, y1, r, colour) => solids.push(coloured(cyl, colour, m4.compose(v.set(x, (y0 + y1) / 2, z), q.identity(), s.set(r * 2, y1 - y0, r * 2))));
    const rod = (a, b, r, colour, list = solids) => { const d = b.clone().sub(a), len = d.length(); list.push(coloured(cyl, colour, m4.compose(a.clone().add(b).multiplyScalar(.5), q.setFromUnitVectors(up, d.normalize()), s.set(r * 2, len, r * 2)))); };
    const bulb = (x, y, z, colour = '#ffe7b4') => bulbs.push(coloured(ball, colour, m4.compose(v.set(x, y, z), q.identity(), s.set(.13, .16, .13))));
    // A festoon from a to b, sagging, a bulb at every step.
    const festoon = (a, b, sag, n) => {
      const at = t => new THREE.Vector3(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag, a[2] + (b[2] - a[2]) * t);
      for (let k = 0; k <= n; k++) { const p = at(k / n); if (k < n) rod(p, at((k + 1) / n), .018, IRON); if (k > 0 && k < n) bulb(p.x, p.y - .1, p.z, k % 3 === 1 ? theme.trim : '#ffe7b4'); }
    };

    STALL_X.forEach((cx, j) => {
      const x0 = cx - STALL_W / 2, x1 = cx + STALL_W / 2, z0 = STALL_Z - STALL_D / 2, z1 = STALL_Z + STALL_D / 2;
      // The frame: four poles, a ridge pole and the eaves.
      [[x0 + .12, z0 + .12], [x1 - .12, z0 + .12], [x0 + .12, z1 - .12], [x1 - .12, z1 - .12]].forEach(([x, z]) => post(x, z, 0, POLE_H, .07, POLE));
      if (j >= open) {
        // Not open yet: the bare frame and the stall's crates waiting under it.
        rod(new THREE.Vector3(x0 + .12, POLE_H, z1 - .12), new THREE.Vector3(x1 - .12, POLE_H, z1 - .12), .05, POLE);
        rod(new THREE.Vector3(x0 + .12, POLE_H, z0 + .12), new THREE.Vector3(x1 - .12, POLE_H, z0 + .12), .05, POLE);
        [[-1.1, 0, .7], [-.2, .2, .6], [.9, -.3, .65]].forEach(([dx, dz, h], k) => span(cx + dx - .4, cx + dx + .4, 0, h, STALL_Z + dz - .35, STALL_Z + dz + .35, k % 2 ? CRATE : WOOD));
        return;
      }
      // The canopy: two striped slopes meeting at a ridge along x, overhanging the poles.
      const over = .35, run = STALL_D / 2 + over, rise = RIDGE - POLE_H, len = Math.hypot(run, rise), ang = Math.atan2(rise, run);
      [1, -1].forEach(sg => {
        const g = new THREE.PlaneGeometry(STALL_W + over * 2, len).rotateX(-Math.PI / 2);
        g.applyMatrix4(m4.compose(v.set(cx, RIDGE - rise / 2 + .02, STALL_Z + sg * run / 2), q.setFromEuler(new THREE.Euler(sg * ang, 0, 0)), s.set(1, 1, 1)));
        canopies.push(g);
      });
      span(x0 - over, x1 + over, RIDGE - .04, RIDGE + .1, STALL_Z - .08, STALL_Z + .08, theme.trim);
      // The scalloped valance down the front eave, and a short one at the back.
      const vf = new THREE.PlaneGeometry(STALL_W + over * 2, .55);
      vf.translate(cx, POLE_H - .07 - over * rise / (STALL_D / 2) * 0 - .2, z1 + over + .01);
      valances.push(vf);
      // The counter across the front: a wooden top on a cloth-fronted base in the theme's colour, jars on top.
      span(x0 + .35, x1 - .35, 0, .9, z1 - .95, z1 - .25, theme.stripes[0]);
      span(x0 + .3, x1 - .3, .9, 1, z1 - 1.0, z1 - .2, WOOD);
      span(x0 + .35, x1 - .35, .82, .86, z1 - .24, z1 - .22, theme.trim);
      for (let k = 0; k < 5; k++) { const jx = x0 + .9 + k * (STALL_W - 1.8) / 4; post(jx, z1 - .62, 1, 1.32 + (k % 2) * .06, .13, JARS[(k + j) % JARS.length]); post(jx, z1 - .62, 1.32 + (k % 2) * .06, 1.4 + (k % 2) * .06, .1, CREAM); }
      // A display out front of each stall: buckets of blooms, little barrels, gift crates, a rail of shirts.
      const dx = j % 2 ? x1 - .7 : x0 + .7, dz = z1 + .55;
      if (j === 0) for (let k = 0; k < 3; k++) { post(dx + (k - 1) * .55 * (j % 2 ? -1 : 1), dz + (k % 2) * .3, 0, .45, .2, '#7d8a8c'); for (let f = 0; f < 3; f++) solids.push(coloured(ball, ['#e86f8a', '#f2c14e', '#f4f1e4'][(k + f) % 3], m4.compose(v.set(dx + (k - 1) * .55 * (j % 2 ? -1 : 1) + (f - 1) * .12, .6 + (f % 2) * .08, dz + (k % 2) * .3), q.identity(), s.set(.2, .2, .2)))); }
      if (j === 1) [0, 1].forEach(k => { post(dx - k * .7, dz, 0, .75, .3, WOOD_DARK); post(dx - k * .7, dz, .76, .8, .32, IRON); });
      if (j === 2) [[0, 0, .5, theme.stripes[0]], [.6, .1, .4, theme.trim], [.25, .05, .85, CREAM]].forEach(([ox, oz, h, c]) => span(dx + ox - .25, dx + ox + .25, h - .4 < 0 ? 0 : h - .4, h, dz + oz - .25, dz + oz + .25, c));
      if (j === 3) { post(dx - .7, dz, 0, 1.5, .04, IRON); post(dx + .1, dz, 0, 1.5, .04, IRON); span(dx - .75, dx + .15, 1.45, 1.5, dz - .03, dz + .03, IRON); for (let k = 0; k < 4; k++) span(dx - .62 + k * .2, dx - .5 + k * .2, .7, 1.42, dz - .22, dz + .22, JARS[(k + 1) % JARS.length]); }
      // A back shelf of stock behind the counter.
      span(x0 + .5, x1 - .5, 0, 1.25, z0 + .25, z0 + .75, WOOD_DARK);
      for (let k = 0; k < 6; k++) span(x0 + .7 + k * (STALL_W - 1.4) / 6, x0 + .7 + k * (STALL_W - 1.4) / 6 + .45, 1.25, 1.55, z0 + .35, z0 + .7, JARS[(k + j * 2) % JARS.length]);
      // The board over the front, lettered with the stall's name.
      const b = new THREE.PlaneGeometry(3.3, .72);
      b.translate(cx, POLE_H + .42, z1 + over + .05);
      boards.push({ g: b, j });
      // A string of bulbs along the front eave.
      festoon([x0 - .1, POLE_H - .05, z1 + .05], [x1 + .1, POLE_H - .05, z1 + .05], .18, 7);
    });
    // The aisle: posts down the front with festoon strings back to the tents' front corners and across between them.
    FESTOON_POSTS.forEach(([x, z]) => { post(x, z, 0, 3.5, .07, IRON); post(x, z, 3.5, 3.62, .12, theme.trim); });
    const front = STALL_Z + STALL_D / 2;
    FESTOON_POSTS.forEach(([x, z], k) => {
      const tent = STALL_X[k];
      festoon([x, 3.45, z], [tent, POLE_H + .1, front], .35, 8);
      if (k + 1 < FESTOON_POSTS.length) { const n = FESTOON_POSTS[k + 1]; festoon([x, 3.45, z], [n[0], 3.45, n[1]], .55, 9); }
    });
    // The arch over the way in: two posts and a beam carrying the lettered banner, a bulb at each top.
    const ax0 = ARCH.x - ARCH.w / 2, ax1 = ARCH.x + ARCH.w / 2;
    [ax0, ax1].forEach(x => { post(x, ARCH.z, 0, ARCH.h, .13, theme.trim); span(x - .2, x + .2, 0, .25, ARCH.z - .2, ARCH.z + .2, WOOD_DARK); bulb(x, ARCH.h + .12, ARCH.z, '#ffe7b4'); });
    span(ax0 - .25, ax1 + .25, ARCH.h - .9, ARCH.h - .78, ARCH.z - .1, ARCH.z + .1, theme.trim);
    span(ax0 - .25, ax1 + .25, ARCH.h - .08, ARCH.h + .04, ARCH.z - .1, ARCH.z + .1, theme.trim);
    const banner = new THREE.PlaneGeometry(ARCH.w - .3, .78);
    banner.translate(ARCH.x, ARCH.h - .43, ARCH.z + .12);

    const add = (geoms, mat, cast) => {
      if (!geoms.length) return;
      const mesh = new THREE.Mesh(mergeGeometries(geoms, false), mat);
      geoms.forEach(g => g.dispose());
      mesh.castShadow = cast; mesh.receiveShadow = true;
      group.add(mesh); built.push(mesh);
      return mesh;
    };
    // The square's paving: warm brick in a basket weave, over the plot's plain fill.
    const paving = new THREE.PlaneGeometry(PLOT[1] - PLOT[0], PLOT[3] - PLOT[2]).rotateX(-Math.PI / 2);
    paving.translate((PLOT[0] + PLOT[1]) / 2, .03, (PLOT[2] + PLOT[3]) / 2);
    const tex = bricks(); tex.repeat.set((PLOT[1] - PLOT[0]) / 2.4, (PLOT[3] - PLOT[2]) / 2.4);
    const ground = add([paving], hazed('#ffffff', { map: tex }), false); if (ground) ground.castShadow = false;
    add(solids, solidMat, true);
    add(bulbs, bulbMat, false);
    add(canopies, hazed('#ffffff', { map: stripes(theme.stripes[0], theme.stripes[1]), side: THREE.DoubleSide }), true);
    if (valances.length) add(valances, hazed('#ffffff', { map: valance(theme.stripes[0], theme.stripes[1]), transparent: true, alphaTest: .5, side: THREE.DoubleSide }), false);
    boards.forEach(({ g, j }) => add([g], hazed('#ffffff', { map: board(SIGNS[j], CREAM, '#23432f', theme.stripes[0]) }), false));
    add([banner], hazed('#ffffff', { map: board(theme.name.toUpperCase(), theme.stripes[0], CREAM, theme.trim, 768, 112) }), false);
  }
  let lastNight = null;
  group.userData.update = ({ theme, open, night }) => {
    const next = theme.id + '|' + open;
    if (next !== sig) { sig = next; build(theme, open); lastNight = null; }
    if (night !== lastNight) {
      lastNight = night;
      // Bulbs glow warm after dark and sit quietly in the daylight.
      bulbMat.color.set(night ? '#ffffff' : '#d9cfbf');
    }
  };
  return group;
}
