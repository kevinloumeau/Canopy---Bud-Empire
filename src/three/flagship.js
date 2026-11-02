// Canopy HQ (Kevin, 2026-11-02): the late-game flagship, a tower on the corner lot behind the shop across the rear
// street (layout.flagshipLot, sunny-world.js). It goes up in four paid stages (src/flagship.js), each raised on a
// build timer: Foundations (the stone podium and its green shopfront), Frame (five storeys of steel and slabs),
// Glass (the curtain wall, lit at night) and Grand opening (the brass crown, the CANOPY blade and the leaf on top).
// Before the first stage the lot is fenced off behind a forest-green hoarding. A tower crane arrives with the first build,
// works the site while a stage builds, stands parked between stages and leaves at the grand opening.
// Every part is a box merged by colour into one mesh per stage, so the whole tower costs a handful of draws and
// about 2K triangles.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const FOREST = '#1f4a35', FOREST_DEEP = '#173a2a', BRASS = '#d0a54e', CREAM = '#efe4cf', STONE = '#d8d0bf', STONE_DARK = '#a9a08f';
const STEEL = '#3c4a44', SLAB = '#bfb8aa', AMBER = '#e8b13a', DIRT = '#8f7a5e';
// Heights in map units: the podium matches a terrace's ground floor, the storeys above are a touch taller than theirs.
// Five storeys keep the crown in view under the haze, a storey or two over the tallest neighbours.
const PODIUM = 3.4, STOREY = 2.9, STOREYS = 5;

export function buildFlagship(world, layout, { material }) {
  const lot = layout.flagshipLot;
  if (!lot) return null;
  const P = layout.plazaY;
  const root = new THREE.Group(); root.name = 'flagship'; world.add(root);
  const x0 = lot.x0 + .45, x1 = lot.x1 - .45, z0 = lot.z0 + .45, z1 = lot.z1 - .45, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
  const top = P + PODIUM + STOREYS * STOREY;
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);

  // A stage's parts, gathered by colour and merged into one mesh each when the stage is done (seal).
  function parts() {
    const byColour = new Map(), group = new THREE.Group(); root.add(group);
    return {
      group,
      add(x, y, z, w, h, d, colour) {
        const g = unit.clone(); g.scale(w, h, d); g.translate(x, y, z);
        if (!byColour.has(colour)) byColour.set(colour, []);
        byColour.get(colour).push(g);
      },
      span(xa, xb, ya, yb, za, zb, colour) { this.add((xa + xb) / 2, ya, (za + zb) / 2, xb - xa, yb - ya, zb - za, colour); },
      seal(materials = {}) {
        byColour.forEach((list, colour) => {
          const mesh = new THREE.Mesh(mergeGeometries(list), materials[colour] || material(colour));
          mesh.castShadow = mesh.receiveShadow = !(materials[colour] && materials[colour].transparent);
          group.add(mesh);
        });
        return group;
      }
    };
  }

  // Night glow: the shopfront and the curtain wall light up after dark (update raises their emissive).
  const shopGlass = material('#9fc7b6', { emissive: '#ffd896', emissiveIntensity: .05, name: 'flagshipShop' });
  const curtain = material('#7fae9c', { emissive: '#f2c675', emissiveIntensity: 0, name: 'flagshipCurtain' });
  const crownGlow = new THREE.MeshBasicMaterial({ color: BRASS });

  // Stage 0, the hoarding: a dirt lot behind a forest-green fence with a brass rail, a site office and a billboard on the side facing the junction.
  const site = parts();
  site.span(lot.x0 + .2, lot.x1 - .2, P, P + .04, lot.z0 + .2, lot.z1 - .2, DIRT);
  const fx0 = lot.x0 + .25, fx1 = lot.x1 - .25, fz0 = lot.z0 + .25, fz1 = lot.z1 - .25, fh = 1.6, ft = .1;
  [[fx0, fx1, fz1 - ft, fz1], [fx0, fx1, fz0, fz0 + ft], [fx0, fx0 + ft, fz0, fz1], [fx1 - ft, fx1, fz0, fz1]].forEach(([a, b, c, d]) => {
    site.span(a, b, P, P + fh, c, d, FOREST); site.span(a - .02, b + .02, P + fh, P + fh + .08, c - .02, d + .02, BRASS);
  });
  site.span(x0 + .4, x0 + 2.4, P, P + 1.9, z0 + .4, z0 + 1.6, CREAM); site.span(x0 + .3, x0 + 2.5, P + 1.9, P + 2.02, z0 + .3, z0 + 1.7, STEEL);
  const siteGroup = site.seal();
  // The billboard over the front fence, painted once its font has loaded.
  const boardCanvas = document.createElement('canvas'); boardCanvas.width = 512; boardCanvas.height = 192;
  const boardTex = new THREE.CanvasTexture(boardCanvas); boardTex.colorSpace = THREE.SRGBColorSpace;
  function paintBoard() {
    const c = boardCanvas.getContext('2d'), W = 512, H = 192;
    c.fillStyle = FOREST_DEEP; c.fillRect(0, 0, W, H);
    c.strokeStyle = BRASS; c.lineWidth = 4; c.strokeRect(10, 10, W - 20, H - 20);
    c.fillStyle = CREAM; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '700 64px "Bricolage Grotesque", "Helvetica Neue", sans-serif'; if ('letterSpacing' in c) c.letterSpacing = '8px';
    c.fillText('CANOPY HQ', W / 2, 82);
    c.fillStyle = BRASS; c.font = '600 28px "Bricolage Grotesque", "Helvetica Neue", sans-serif'; if ('letterSpacing' in c) c.letterSpacing = '6px';
    c.fillText('COMING SOON', W / 2, 140);
    boardTex.needsUpdate = true;
  }
  paintBoard();
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', paintBoard);
  const board = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.65), new THREE.MeshLambertMaterial({ map: boardTex }));
  // On the side fence facing the junction: the street trees screen the front one.
  board.rotation.y = Math.PI / 2; board.position.set(fx1 + .02, P + fh + 1.1, cz); siteGroup.add(board);
  const boardPosts = parts(); [-1.6, 1.6].forEach(dz => boardPosts.add(fx1 - .1, P + fh, cz + dz, .12, .4, .12, STEEL)); siteGroup.add(boardPosts.seal());

  // Stage 1, Foundations: the stone podium with a forest-green shopfront and brass band, ending in a flat slab.
  const podium = parts();
  podium.span(x0, x1, P, P + PODIUM, z0, z1, STONE);
  podium.span(x0 - .08, x1 + .08, P, P + .35, z0 - .08, z1 + .08, STONE_DARK);
  // Shopfront bays on the two street faces (front +z, side +x): green frames round glass, and a brass fascia.
  const bays = 4;
  for (let k = 0; k < bays; k++) {
    const a = x0 + .35 + k * (x1 - x0 - .7) / bays, b = a + (x1 - x0 - .7) / bays;
    podium.span(a + .08, b - .08, P + .35, P + 2.5, z1, z1 + .06, FOREST);
    const c = z0 + .35 + k * (z1 - z0 - .7) / bays, d = c + (z1 - z0 - .7) / bays;
    podium.span(x1, x1 + .06, P + .35, P + 2.5, c + .08, d - .08, FOREST);
  }
  podium.span(x0 - .05, x1 + .12, P + 2.75, P + 3.05, z1, z1 + .12, BRASS);
  podium.span(x1, x1 + .12, P + 2.75, P + 3.05, z0 - .05, z1 + .12, BRASS);
  podium.span(x0 - .12, x1 + .12, P + PODIUM - .05, P + PODIUM + .2, z0 - .12, z1 + .12, SLAB);
  const podiumGroup = podium.seal();
  // The shopfront glass, its own mesh so it can glow.
  const glassBays = parts();
  for (let k = 0; k < bays; k++) {
    const a = x0 + .35 + k * (x1 - x0 - .7) / bays, b = a + (x1 - x0 - .7) / bays, c = z0 + .35 + k * (z1 - z0 - .7) / bays, d = c + (z1 - z0 - .7) / bays;
    glassBays.span(a + .2, b - .2, P + .5, P + 2.35, z1 + .06, z1 + .08, 'shop');
    glassBays.span(x1 + .06, x1 + .08, P + .5, P + 2.35, c + .2, d - .2, 'shop');
  }
  podiumGroup.add(glassBays.seal({ shop: shopGlass }));

  // Stage 2, Frame: five storeys of slabs on corner and mid columns. Each storey is its own mesh so the build can
  // raise them one at a time.
  const floors = Array.from({ length: STOREYS }, (_, k) => {
    const f = parts(), y = P + PODIUM + k * STOREY;
    const cols = [x0 + .1, cx, x1 - .1], rows = [z0 + .1, cz, z1 - .1];
    cols.forEach(x => rows.forEach(z => { if (x === cx && z === cz) return; f.add(x, y, z, .28, STOREY, .28, STEEL); }));
    f.span(x0 - .05, x1 + .05, y + STOREY - .18, y + STOREY, z0 - .05, z1 + .05, SLAB);
    return f.seal();
  });

  // Stage 3, Glass: a green-tinted curtain wall on every storey, brass mullions on the street faces, and a slim
  // spandrel band at each slab. Grouped by storey like the frame.
  const glazing = Array.from({ length: STOREYS }, (_, k) => {
    const g = parts(), y = P + PODIUM + k * STOREY, ya = y + .02, yb = y + STOREY - .2;
    g.span(x0 + .12, x1 - .12, ya, yb, z0 + .12, z1 - .12, 'glass');
    const mull = 5;
    for (let m = 1; m < mull; m++) {
      const x = x0 + (x1 - x0) * m / mull, z = z0 + (z1 - z0) * m / mull;
      g.add(x, ya, z1 - .08, .07, yb - ya, .06, BRASS);
      g.add(x1 - .08, ya, z, .06, yb - ya, .07, BRASS);
    }
    return g.seal({ glass: curtain });
  });

  // Stage 4, Grand opening: a stepped crown with brass fins, the vertical CANOPY blade on the street corner, a
  // lit leaf on the roof and a flag. The hoarding and crane are gone by now.
  const crown = parts();
  crown.span(x0 + .6, x1 - .6, top, top + 1.6, z0 + .6, z1 - .6, FOREST);
  crown.span(x0 + .45, x1 - .45, top + 1.6, top + 1.8, z0 + .45, z1 - .45, BRASS);
  for (let m = 0; m <= 6; m++) {
    const x = x0 + .7 + (x1 - x0 - 1.4) * m / 6, z = z0 + .7 + (z1 - z0 - 1.4) * m / 6;
    crown.add(x, top, z1 - .55, .1, 1.6, .14, BRASS); crown.add(x1 - .55, top, z, .14, 1.6, .1, BRASS);
  }
  crown.span(cx - .8, cx + .8, top + 1.8, top + 2.6, cz - .8, cz + .8, FOREST_DEEP);
  crown.add(x0 + 1, top + 1.8, z0 + 1, .06, 3, .06, STEEL);
  crown.add(x0 + 1.5, top + 4.1, z0 + 1, .9, .55, .03, '#b23b3b');
  const crownGroup = crown.seal();
  // The leaf mark on the crown, three lit blades.
  const leafGeo = mergeGeometries([[0, 1.25], [-.6, .95], [.6, .95]].map(([a, len]) => {
    const g = new THREE.SphereGeometry(.5, 10, 6); g.scale(.32, len, .08); g.translate(0, len * .5, 0); g.rotateZ(a); return g;
  }));
  const leaf = new THREE.Mesh(leafGeo, crownGlow); leaf.position.set(cx, top + 2.6, cz + .2); crownGroup.add(leaf);
  // The vertical blade sign on the front corner, both faces painted.
  const bladeCanvas = document.createElement('canvas'); bladeCanvas.width = 128; bladeCanvas.height = 768;
  const bladeTex = new THREE.CanvasTexture(bladeCanvas); bladeTex.colorSpace = THREE.SRGBColorSpace;
  function paintBlade() {
    const c = bladeCanvas.getContext('2d'), W = 128, H = 768;
    c.fillStyle = FOREST; c.fillRect(0, 0, W, H); c.strokeStyle = BRASS; c.lineWidth = 6; c.strokeRect(6, 6, W - 12, H - 12);
    c.save(); c.translate(W / 2 + 4, H / 2); c.rotate(-Math.PI / 2);
    c.fillStyle = CREAM; c.font = '700 74px "Bricolage Grotesque", "Helvetica Neue", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    if ('letterSpacing' in c) c.letterSpacing = '16px';
    c.fillText('CANOPY', 0, 0); c.restore(); bladeTex.needsUpdate = true;
  }
  paintBlade();
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', paintBlade);
  const bladeMat = new THREE.MeshLambertMaterial({ map: bladeTex, emissive: '#ffffff', emissiveMap: bladeTex, emissiveIntensity: .15, side: THREE.DoubleSide });
  const blade = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 7.8), bladeMat);
  blade.rotation.y = Math.PI / 4; blade.position.set(x1 + .55, P + PODIUM + 4.6, z1 + .55); crownGroup.add(blade);
  const bladeArms = parts(); [1.2, 7.6].forEach(h => bladeArms.add(x1 + .25, P + PODIUM + h, z1 + .25, .7, .1, .1, BRASS)); crownGroup.add(bladeArms.seal());

  // The tower crane, parked on the lot's back corner; it swings and blinks while a stage is building.
  const crane = new THREE.Group(); root.add(crane);
  const mastX = x0 - .1, mastZ = z0 - .1, mastH = top + 3.5 - P;
  const mast = parts();
  mast.add(mastX, P, mastZ, 1.1, .3, 1.1, '#8d918a');
  mast.add(mastX, P + .3, mastZ, .4, mastH, .4, AMBER);
  for (let h = 1.4; h < mastH; h += 1.4) mast.add(mastX, P + .3 + h, mastZ, .46, .08, .46, '#6b5320');
  crane.add(mast.seal());
  const jib = new THREE.Group(); jib.position.set(mastX, P + .3 + mastH, mastZ); crane.add(jib);
  const arm = parts();
  arm.add(0, 0, 0, .7, .55, .6, CREAM);
  arm.add(4.2, .55, 0, 8.4, .2, .26, AMBER); arm.add(-1.5, .55, 0, 3, .2, .26, AMBER);
  arm.add(-2.6, .1, 0, .9, .6, .6, '#8d918a'); arm.add(0, .55, 0, .16, 1.3, .16, AMBER);
  arm.add(5.6, -3.4, 0, .04, 4, .04, '#2e3330');
  arm.add(5.6, -3.95, 0, 1.2, .14, .8, '#9a7a52'); arm.add(5.6, -3.8, 0, 1.1, .35, .7, '#c9a978');
  jib.add(arm.seal());
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(.15, 10, 8), new THREE.MeshBasicMaterial({ color: '#ffb52e' }));
  beacon.position.set(0, 1.95, 0); jib.add(beacon);
  // Builders' scaffold up the front face, one lift per storey, climbing with the storeys being built.
  const scaffoldLevels = Array.from({ length: STOREYS + 1 }, (_, k) => {
    const sc = parts(), y = k ? P + PODIUM + (k - 1) * STOREY : P, h = k ? STOREY : PODIUM;
    sc.span(x0 - .1, x1 + .1, y + h - .3, y + h - .24, z1 + .55, z1 + 1.05, '#c9a978');
    [x0, cx, x1].forEach(x => sc.add(x, y, z1 + .95, .06, h, .06, '#9aa39b'));
    return sc.seal();
  });

  return {
    // frame.flagship: stages open (0-4); frame.flagshipBuild: share of the running stage done, or null.
    update(frame) {
      const stage = Math.max(0, Math.min(4, frame.flagship || 0)), build = frame.flagshipBuild, building = build != null;
      const night = frame.night || 0, t = frame.time || 0;
      root.visible = true;
      siteGroup.visible = stage === 0;
      // Foundations rise out of the ground while stage 1 builds.
      podiumGroup.visible = stage >= 1 || (building && stage === 0);
      podiumGroup.scale.y = stage >= 1 ? 1 : Math.max(.02, build || 0);
      // The frame goes up a storey at a time during stage 2, then the glass follows it during stage 3.
      const framed = stage >= 2 ? STOREYS : stage === 1 && building ? Math.floor(build * (STOREYS + .999)) : 0;
      floors.forEach((f, k) => { f.visible = k < framed; });
      const glazed = stage >= 3 ? STOREYS : stage === 2 && building ? Math.floor(build * (STOREYS + .999)) : 0;
      glazing.forEach((g, k) => { g.visible = k < glazed; });
      // The crown and sign go up for the grand opening; the blade lights at the end of its build.
      const opening = stage === 3 && building;
      crownGroup.visible = stage >= 4 || opening;
      if (opening) { crownGroup.position.y = -(1 - build) * 2.6; blade.visible = build > .6; leaf.visible = build > .85; }
      else { crownGroup.position.y = 0; blade.visible = leaf.visible = true; }
      // The crane arrives with the first stage's build and stays until the grand opening; it only moves while building.
      crane.visible = stage < 4 && (stage >= 1 || building);
      jib.rotation.y = building ? Math.sin(t / 5200) * .9 + .6 : .6;
      beacon.visible = building && Math.floor(t / 500) % 2 === 0;
      // The scaffold stands only while builders work, up to the storey they are on.
      const lifts = !building ? 0 : stage === 0 ? 1 : stage === 1 ? framed + 1 : STOREYS + 1;
      scaffoldLevels.forEach((g, k) => { g.visible = k < lifts; });
      // Lights after dark.
      shopGlass.emissiveIntensity = .05 + night * .6;
      curtain.emissiveIntensity = night * .26;
      bladeMat.emissiveIntensity = .15 + night * .75;
      crownGlow.color.set(BRASS).multiplyScalar(1 + night * .4);
    },
    // The top of what stands now, for the map tag.
    height(stage) { return stage >= 4 ? top + 3 : stage >= 2 ? top + .5 : stage >= 1 ? P + PODIUM + 1 : P + fh + 2.2; },
    centre: { x: cx, z: cz }
  };
}
