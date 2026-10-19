// The shop's shell and fittings for the 3D map: walls with the tile dado and green plaster, the lounge (its facade,
// doorways, drapes, sofas and lamps), the product wall with its menu board and shelving, the mezzanine's wall shelves
// and arch cabinet, the top floor's slim glazing and exhaust fan, the column, exit door and merch cabinet, the
// storefront's sign, the aisle planter, the hanging plants, and the warm lamps that take over after dark.
// Every position comes from the 2D map (drawTower, drawLoungeFront, drawShellProductWall and friends in main.js),
// passed in as layout.shell, so the two maps keep the same plan.
import * as THREE from 'three';

// Signs drawn here use Fredoka like the Blender station signs (art/blender/fonts); the storefront's marquee keeps
// Bricolage Grotesque like the Blender storefront. Until Fredoka has loaded the signs paint in Bricolage.
const SIGN_FONT = '"Fredoka", "Bricolage Grotesque", sans-serif';
const TILE_GROUT = '#cfdcc4', BRASS = '#d0a54e', OAK = '#b98d5c', OAK_DARK = '#6e4a2c', CREAM = '#f1ead6', VELVET = '#6b2436';

export function buildShell(world, layout, { box, span, material, model }) {
  const s = layout.shell;
  if (!s) return null;
  const shell = new THREE.Group();
  world.add(shell);
  const [ground, mezz, top] = layout.floors;
  // The fittings the diorama thread modelled in Blender (shelving, cabinets, board, door, column, fan, planter) are each
  // built in code in their own group first, and that group is hidden once its model has loaded in the same place.
  const unit = () => { const g = new THREE.Group(); shell.add(g); return g; };
  const swap = (g, file, x, y, z, onReady) => model && model(file, x, y, z, (scene, holder) => { g.visible = false; if (onReady) onReady(scene, holder); });
  const plaster = s.plaster, tile = s.tile, tileH = s.tileH;

  // The tile dado as one texture a unit wide: stack-bond joints every TILE_PITCH, one course line and the brass rail.
  const tileCanvas = document.createElement('canvas');
  tileCanvas.width = 200; tileCanvas.height = 230;
  const tc = tileCanvas.getContext('2d');
  tc.fillStyle = tile; tc.fillRect(0, 0, 200, 230);
  tc.fillStyle = TILE_GROUT;
  for (let x = 0; x < 200; x += 200 * s.tilePitch) tc.fillRect(x, 12, 2.4, 218);
  tc.fillRect(0, 230 - 230 / 2, 200, 2.4);
  tc.fillStyle = '#dcc48e'; tc.fillRect(0, 2, 200, 9);
  const tileTexture = new THREE.CanvasTexture(tileCanvas);
  tileTexture.colorSpace = THREE.SRGBColorSpace;
  tileTexture.wrapS = THREE.RepeatWrapping;
  tileTexture.anisotropy = 4;
  const plane = new THREE.PlaneGeometry(1, 1).translate(0, .5, 0);
  // A dado on a wall face: along x facing +z at `at`, or along z facing +x.
  function dado(alongZ, a0, a1, at, y0 = 0) {
    const t = tileTexture.clone(); t.needsUpdate = true; t.repeat.set(Math.abs(a1 - a0), 1);
    const mesh = new THREE.Mesh(plane, new THREE.MeshLambertMaterial({ map: t }));
    mesh.scale.set(Math.abs(a1 - a0), tileH, 1);
    if (alongZ) { mesh.rotation.y = Math.PI / 2; mesh.position.set(at + .006, y0, (a0 + a1) / 2); }
    else mesh.position.set((a0 + a1) / 2, y0, at + .006);
    mesh.receiveShadow = true;
    shell.add(mesh);
    return mesh;
  }
  // A plaster wall with its dado: along x (face toward +z) or along z (face toward +x), with optional openings
  // [from, to, height] cut out of it.
  function wall(alongZ, a0, a1, plane0, thick, y0, h, openings = []) {
    const cuts = [...openings].sort((a, b) => a[0] - b[0]);
    let from = a0;
    const piece = (p0, p1, b0, b1) => alongZ ? span(shell, plane0 - thick, plane0, y0 + b0, y0 + b1, p0, p1, plaster) : span(shell, p0, p1, y0 + b0, y0 + b1, plane0 - thick, plane0, plaster);
    cuts.forEach(([c0, c1, ch]) => {
      if (c0 > from) { piece(from, c0, 0, h); dado(alongZ, from, c0, plane0, y0); }
      piece(c0, c1, ch, h);
      from = c1;
    });
    if (a1 > from) { piece(from, a1, 0, h); dado(alongZ, from, a1, plane0, y0); }
  }

  // Ground floor: the rear wall runs the floor's width behind the lounge and beside the exit door, its doorway open.
  const gRear = ground.z - ground.d / 2;
  wall(false, (ground.x || 0) - ground.w / 2, (ground.x || 0) + ground.w / 2, gRear, .25, 0, mezz.y - .32, [[s.exitDoor.x0, s.exitDoor.x1, s.exitDoor.h]]);
  // Mezzanine: rear wall and its short left wall, both tiled to the rail and plaster above.
  const mRear = mezz.z - mezz.d / 2, mLeft = -mezz.w / 2;
  wall(false, mLeft, mezz.w / 2, mRear, .25, mezz.y, top.y - mezz.y - .32);
  wall(true, mRear, mRear + 3.5, mLeft, .25, mezz.y, top.y - mezz.y - .32);

  // Top floor: slim forest-green glazing on a low plinth, one bay per pane, with a solid two-pane bay for the fan.
  // Under the rooftop lounge the glazing runs right up to the underside of the roof slab's lip (rooftop.js).
  const tRear = top.z - top.d / 2, tLeft = -top.w / 2, glassH = layout.rooftop ? layout.rooftop.y - .34 - top.y : 3.9;
  // The fan housing's height at model scale, and the glazing's top.
  const fanBase = top.y + glassH, fanBandH = 1.44;
  const glass = new THREE.MeshStandardMaterial({ color: '#cfe6df', roughness: .1, metalness: 0, transparent: true, opacity: .26, depthWrite: false });
  function glazing(alongZ, a0, a1, at, fan) {
    const n = Math.max(2, Math.round((a1 - a0) / s.glazingBay)), step = (a1 - a0) / n, y = top.y;
    let solid = null;
    if (fan !== undefined) { const j = Math.max(0, Math.min(n - 2, Math.round((fan - a0) / step) - 1)); solid = [a0 + j * step, a0 + (j + 2) * step]; }
    const bar = (p0, p1, y0, y1, d = .09) => alongZ ? span(shell, at - d, at + d * .3, y0, y1, p0, p1, '#2c5a44') : span(shell, p0, p1, y0, y1, at - d, at + d * .3, '#2c5a44');
    bar(a0, a1, y, y + .3, .16);
    for (let k = 0; k <= n; k++) { const p = a0 + k * step; bar(p - .035, p + .035, y + .3, y + glassH); }
    bar(a0, a1, y + 2.92, y + 2.98); bar(a0, a1, y + glassH - .08, y + glassH);
    const pane = alongZ ? span(shell, at - .02, at, y + .3, y + glassH, a0, a1, '#cfe6df', { cast: false }) : span(shell, a0, a1, y + .3, y + glassH, at - .02, at, '#cfe6df', { cast: false });
    pane.material = glass; pane.receiveShadow = false;
    if (solid) span(shell, solid[0] + .035, solid[1] - .035, y + .3, y + glassH - .08, at - .06, at - .02, '#2f5d4a');
    return solid;
  }
  const fanBay = glazing(false, tLeft, s.topLanding.outer, tRear, s.fanX);
  glazing(true, tRear, tRear + 3.5, tLeft);

  // The exhaust fan in its solid bay: a green housing with a dark round throat and a four-blade rotor.
  const fan = new THREE.Group(), fanX = fanBay ? (fanBay[0] + fanBay[1]) / 2 : s.fanX;
  fan.position.set(fanX, top.y + 2.15, tRear + .02);
  shell.add(fan);
  let modelRotor = null;
  swap(fan, 'exhaust_fan.glb', fanX, top.y + 2.15, tRear + .02, scene => { modelRotor = scene.getObjectByName('Rotor'); });
  box(fan, 0, -.72, .06, 1.44, 1.44, .14, '#2f6b52');
  const throat = new THREE.Mesh(new THREE.CylinderGeometry(.56, .56, .05, 40).rotateX(Math.PI / 2), material('#1d3028'));
  throat.position.z = .14; fan.add(throat);
  const rotor = new THREE.Group(); rotor.position.z = .18; fan.add(rotor);
  for (let b = 0; b < 4; b++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(.44, .17, .02).translate(.27, 0, 0), material('#b9cbb4'));
    blade.rotation.z = b * Math.PI / 2; blade.rotation.x = .25; rotor.add(blade);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .06, 20).rotateX(Math.PI / 2), material('#d8c18b'));
  rotor.add(hub);

  // The fan row is one model load drawn instanced (one draw per part for the whole row); the rotors' instances turn
  // with the big fan's rotor every frame. FAN_W is the housing's width in map units (.86 m); its origin is its centre.
  // Kevin (2026-10-19 12:30Z, drawn on a close-up): two big fans side by side on the rear wall plane, standing on the
  // glazing's top rail and ending inside the corner post; the roof hides whatever of them its silhouette covers, and
  // they rise into the slab's space. Seen down the camera's line of sight (map x, y, z move together as 1 : .816 : 1),
  // the slab's lower right edge (x = x1, y = its underside) sweeps out the plane y - .816 x = const: everything of a fan
  // above it is behind the roof on screen, so the fans are clipped there and the roof's outline stays exact.
  // 12:39Z: housings in the frame green, flattened to the frame's depth and set back into the wall plane.
  const FAN_W = 1.46, rowCount = layout.rooftop ? 2 : 0, fanScale = 1.8, fanStep = FAN_W * fanScale, fanDepth = .5;
  const rowA1 = s.topLanding.outer - .035, rowA0 = rowA1 - rowCount * fanStep, fanY = fanBase + fanBandH * fanScale / 2, fanZ = tRear - .09;
  const roofEdge = layout.rooftop ? new THREE.Plane(new THREE.Vector3(.816, -1, 0).normalize(), (fanBase - .816 * layout.rooftop.x1) / Math.hypot(.816, 1)) : null;
  const fanClip = [];
  const clipped = m => { const c = m.clone(); c.clippingPlanes = fanClip; return c; };
  const frameGreen = new THREE.Color('#2c5a44');
  const rowSpots = Array.from({ length: rowCount }, (_, k) => new THREE.Matrix4().makeTranslation(rowA0 + fanStep * (k + .5), fanY, fanZ).scale(new THREE.Vector3(fanScale, fanScale, fanScale * fanDepth)));
  let fanRow = null;
  if (model && rowCount) model('exhaust_fan.glb', 0, 0, 0, (scene, holder) => {
    const parentInverse = new THREE.Matrix4().copy(holder.parent.matrixWorld).invert(), rel = new THREE.Matrix4();
    const rowRotor = scene.getObjectByName('Rotor'), spinning = [];
    fanClip.push(roofEdge.clone().applyMatrix4(holder.parent.matrixWorld));
    holder.updateMatrixWorld(true);
    scene.traverse(o => {
      if (!o.isMesh) return;
      let inRotor = false;
      for (let p = o; p; p = p.parent) if (p === rowRotor) inRotor = true;
      const own = /^(Housing|FrontFrame)/.test(o.name) ? Object.assign(o.material.clone(), { color: frameGreen }) : o.material;
      const mesh = new THREE.InstancedMesh(o.geometry, Array.isArray(own) ? own.map(clipped) : clipped(own), rowCount);
      rel.multiplyMatrices(parentInverse, o.matrixWorld);
      rowSpots.forEach((spot, i) => mesh.setMatrixAt(i, new THREE.Matrix4().multiplyMatrices(spot, rel)));
      // Bounds over every placement, not the part's own spot at the origin, so the row isn't culled off screen.
      mesh.computeBoundingSphere();
      mesh.castShadow = false; mesh.receiveShadow = true;
      shell.add(mesh);
      if (inRotor) spinning.push({ part: o, mesh });
    });
    // Detached, the holder's own matrix is what the parent's inverse took off above.
    holder.parent.remove(holder);
    fanRow = { rotor: rowRotor, holder, parentInverse: new THREE.Matrix4(), spinning };
  });

  // Products for the shelving: one instanced jar mesh and one instanced pouch mesh for the whole shop.
  const jarGeometry = new THREE.CylinderGeometry(.09, .09, .22, 12).translate(0, .11, 0);
  const pouchGeometry = new THREE.BoxGeometry(.18, .26, .07).translate(0, .13, 0);
  // Each fitting's goods are instanced in its own group, so they go with it when its model (which has its own) loads.
  const goodsUnits = [];
  const goodsFor = g => { const u = { g, jars: [], pouches: [] }; goodsUnits.push(u); return u; };
  // A shelf unit standing against a wall along x (its back at zBack, facing +z): oak carcass, shelves, bays and goods.
  function shelving(g, x0, x1, zBack, depth, y, h, bays, shelves) {
    const { jars: jarSpots, pouches: pouchSpots } = goodsFor(g);
    span(g, x0, x1, y, y + h, zBack, zBack + .05, OAK_DARK, { cast: false });
    span(g, x0, x1, y, y + .14, zBack, zBack + depth, OAK);
    span(g, x0 - .02, x1 + .02, y + h - .1, y + h, zBack, zBack + depth + .02, OAK);
    const bw = (x1 - x0) / bays;
    for (let b = 0; b <= bays; b++) span(g, x0 + b * bw - .035, x0 + b * bw + .035, y, y + h, zBack, zBack + depth, OAK);
    for (let r = 1; r <= shelves; r++) {
      const sy = y + .14 + (h - .24) * r / (shelves + 1);
      span(g, x0, x1, sy - .04, sy, zBack, zBack + depth, '#c79f6c', { cast: false });
      for (let b = 0; b < bays; b++) for (let k = 0; k < 4; k++) {
        const px = x0 + b * bw + bw * (k + .5) / 4, pz = zBack + depth * .55;
        ((b + r + k) % 3 ? jarSpots : pouchSpots).push([px, sy, pz, (b * 7 + r * 3 + k) % 4]);
      }
      // The bottom shelf is the plinth's top.
      if (r === 1) for (let b = 0; b < bays; b++) for (let k = 0; k < 4; k++) jarSpots.push([x0 + b * bw + bw * (k + .5) / 4, y + .14, zBack + depth * .55, (b + k) % 4]);
    }
  }

  // The lounge: facade along LOUNGE_FRONT with its doorway, left and right end walls, plum floor, rug, sofas, lamps.
  const face = s.loungeFront, zc0 = face - .81, dx = s.loungeDoor.x, rx = s.loungeRight, wallTop = mezz.y - .32;
  span(shell, -11.03, dx - .7, 0, wallTop, zc0, face, plaster);
  span(shell, dx - .7, dx + .7, s.loungeHeader, wallTop, zc0, face, plaster);
  span(shell, dx + .7, rx + .16, 0, wallTop, zc0, face, plaster);
  dado(false, -11.03, dx - .7, face); dado(false, dx + .7, s.wallLeft, face);
  // The product wall carries the tile on to the lounge's right end, as one run (drawTileWall).
  dado(false, s.wallLeft, rx + .16, face);
  span(shell, -11.5, -11.18, 0, 3.95, gRear, face, plaster);
  dado(true, gRear, face, -11.18);
  const ez = s.loungeExit.z, ew = .92, eh = 2.84;
  span(shell, rx - .16, rx + .16, 0, wallTop, gRear, ez - ew, plaster);
  span(shell, rx - .16, rx + .16, eh, wallTop, ez - ew, ez + ew, plaster);
  span(shell, rx - .16, rx + .16, 0, wallTop, ez + ew, face, plaster);
  dado(true, gRear, ez - ew - .04, rx + .16); dado(true, ez + ew + .04, face, rx + .16);
  span(shell, rx - .1, rx + .1, 0, eh, ez - ew, ez + ew, '#0d1310', { cast: false });
  // With the rooftop lounge (rooftop.js) this room is the elevator lobby, so its sofas, rug and lamps go upstairs.
  const lampShades = [];
  if (!layout.rooftop) {
    span(shell, -11.18, rx - .16, .002, .012, gRear, zc0, '#2a1b22', { cast: false });
    span(shell, -10.95, -9.25, .012, .022, -5.3, -2.9, '#5a2638', { cast: false });
    span(shell, -10.75, -9.45, .022, .03, -5.1, -3.1, '#7a3a4c', { cast: false });
    [[-6.15, -5.55, 1], [-2.65, -2.05, -1]].forEach(([z0, z1, dir]) => {
      span(shell, -10.9, -9.3, 0, .48, z0, z1, VELVET);
      const back = dir > 0 ? [z0, z0 + .16] : [z1 - .16, z1];
      span(shell, -10.9, -9.3, .48, .95, back[0], back[1], '#5c1e30');
      span(shell, -10.9, -10.72, .48, .7, z0, z1, '#5c1e30'); span(shell, -9.48, -9.3, .48, .7, z0, z1, '#5c1e30');
    });
    span(shell, -10.55, -9.65, 0, .4, -4.35, -3.85, '#3a2a1e');
    [[-10.7, -6.6], [-10.7, -1.55], [-9.6, -4.1]].forEach(([x, z]) => {
      box(shell, x, 0, z, .4, .62, .4, '#3a2a1e');
      box(shell, x, .62, z, .04, .4, .04, '#d8c18b', { cast: false });
      const shade = new THREE.Mesh(new THREE.CylinderGeometry(.13, .2, .26, 16).translate(0, .13, 0), new THREE.MeshLambertMaterial({ color: '#f3d9a6', emissive: '#ffb36a', emissiveIntensity: 0 }));
      shade.position.set(x, 1, z); shell.add(shade); lampShades.push(shade);
    });
  }

  // Velvet drapes on the entrance and the back door; their inner edges slide with the 2D map's curtain amounts.
  const drapeMat = material(VELVET);
  function drapes(exit) {
    const g = exit ? { centre: ez, plane: rx + .2, scale: 1.35, top: 2.78 } : { centre: dx, plane: face + .05, scale: 1, top: s.loungeHeader + .02 };
    const pair = [-1, 1].map(side => {
      const m = new THREE.Mesh(unitBoxGeometry, drapeMat);
      m.castShadow = true; shell.add(m);
      return { side, m };
    });
    const pelmet = exit ? span(shell, g.plane - .05, g.plane + .09, g.top - .1, g.top + .06, g.centre - ew - .02, g.centre + ew + .02, '#4a1b29') : span(shell, g.centre - .75, g.centre + .75, g.top - .1, g.top + .06, g.plane - .05, g.plane + .09, '#4a1b29');
    return {
      set(open, shown) {
        pelmet.visible = shown;
        pair.forEach(({ side, m }) => {
          m.visible = shown;
          const wide = .68 * g.scale, inner = (.07 + (.5 - .07) * open) * g.scale, w = Math.max(.08, wide - inner), mid = side * (inner + w / 2);
          if (exit) { m.position.set(g.plane, 0, g.centre + mid); m.scale.set(.08, g.top - .08, w); }
          else { m.position.set(g.centre + mid, 0, g.plane); m.scale.set(w, g.top - .08, .08); }
        });
      }
    };
  }
  const unitBoxGeometry = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);
  const frontDrapes = drapes(false), exitDrapes = drapes(true);
  // With the rooftop lounge a real door (rooftop.js) fills the doorway instead of this panel.
  const closedDoor = layout.rooftop ? null : span(shell, dx - .7, dx + .7, 0, s.loungeHeader, face, face + .08, '#2d6146');
  const boardedExit = span(shell, rx + .16, rx + .21, 0, eh - .24, ez - ew + .15, ez + ew - .15, '#3a2a1e');

  // The neon sign beside the doorway, "Rooftop" in amber script over LOUNGE in pink, lit while the lounge is open.
  const signCanvas = document.createElement('canvas'); signCanvas.width = 512; signCanvas.height = 184;
  const signTexture = new THREE.CanvasTexture(signCanvas); signTexture.colorSpace = THREE.SRGBColorSpace;
  const signMat = new THREE.MeshBasicMaterial({ map: signTexture, transparent: true });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2, .72), signMat);
  sign.position.set(dx + 2.1, 2.02, face + .03); shell.add(sign);
  let signLit = null;
  if (typeof FontFace === 'function' && document.fonts) {
    new FontFace('Fredoka', `url(${new URL('../fonts/Fredoka-SemiBold.ttf', layout.modelBase).href})`, { weight: '600' }).load()
      .then(font => { document.fonts.add(font); signLit = null; boardText = null; rolling = true; })
      .catch(() => {});
    new FontFace('Yellowtail', `url(${new URL('../fonts/Yellowtail-Regular.woff2', layout.modelBase).href})`).load()
      .then(font => { document.fonts.add(font); signLit = null; })
      .catch(() => {});
  }
  function paintSign(lit) {
    if (signLit === lit) return; signLit = lit;
    const c = signCanvas.getContext('2d'); c.clearRect(0, 0, 512, 184);
    c.fillStyle = '#1a1216'; c.beginPath(); c.roundRect(6, 8, 500, 168, 22); c.fill();
    const neon = (text, x, y, glow, tube, dim) => {
      if (lit) { c.shadowColor = glow; c.shadowBlur = 22; c.fillStyle = glow; c.fillText(text, x, y); c.shadowBlur = 0; c.fillStyle = tube; c.fillText(text, x, y); }
      else { c.fillStyle = dim; c.fillText(text, x, y); }
    };
    c.textAlign = 'center'; c.textBaseline = 'middle';
    c.save(); c.translate(256, 56); c.rotate(-.06); c.font = '400 88px "Yellowtail", cursive';
    neon('Rooftop', 0, 0, '#ffbf5a', '#fff1d6', '#5d5040'); c.restore();
    c.font = `600 72px ${SIGN_FONT}`;
    neon('LOUNGE', 256, 128, '#ff8fbf', '#fff4f8', '#5a4750');
    signTexture.needsUpdate = true;
  }

  // Product wall: the flip menu board centred between the plaster and the shelving, then the five-bay shelving.
  const board = { x: (s.wallLeft + s.shelfLeft) / 2, y: 1.8, w: 5.1, h: 1.24 }, boardUnit = unit();
  span(boardUnit, board.x - board.w / 2 - .14, board.x + board.w / 2 + .14, board.y - .12, board.y + board.h + .12, face, face + .1, OAK);
  span(boardUnit, board.x - board.w / 2 + .04, board.x + board.w / 2 - .04, board.y + .04, board.y + board.h - .04, face + .1, face + .12, BRASS, { cast: false });
  const boardCanvas = document.createElement('canvas'); boardCanvas.width = 1024; boardCanvas.height = 240;
  const boardTexture = new THREE.CanvasTexture(boardCanvas); boardTexture.colorSpace = THREE.SRGBColorSpace; boardTexture.anisotropy = 4;
  const boardFace = new THREE.Mesh(new THREE.PlaneGeometry(board.w - .14, board.h - .14), new THREE.MeshBasicMaterial({ map: boardTexture }));
  boardFace.position.set(board.x, board.y + board.h / 2, face + .125); boardUnit.add(boardFace);
  // The Blender board (origin on the floor under it, in the wall plane) shows the same live flip letters on its face.
  swap(boardUnit, 'menu_board.glb', board.x, 0, face, scene => { const f = scene.getObjectByName('BoardFace'); if (f) f.traverse(o => {
    if (!o.isMesh) return;
    // glTF UVs run top-down; the canvas texture is flipped the other way, so turn the quad's v round to match.
    const uv = o.geometry.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i)); uv.needsUpdate = true;
    o.material = boardFace.material;
  }); });
  // Split-flap letters: a cell whose letter changes rolls through the alphabet for a moment, rippling left to right
  // and row by row, each step a flap folding down over the hinge, the way a Solari board does; on load the whole board
  // flips in from blank. The canvas is repainted (and the texture marked for upload) only while something moves.
  const FLAPS = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ$0123456789.,', STEP = 55, ROLL = 9;
  let cells = null, boardText = null, rolling = false;
  function paintBoard(lines, now) {
    const rows = lines.length, cols = lines[0] ? lines[0].length : 21;
    if (!cells || cells.length !== rows || cells[0].length !== cols) cells = lines.map(l => [...l].map(() => ({ from: ' ', to: ' ', start: 0 })));
    lines.forEach((line, r) => [...line].forEach((ch, k) => {
      const cell = cells[r][k];
      if (cell.to !== ch) { cell.from = cell.to; cell.to = ch; cell.start = now + k * 35 + r * 90; rolling = true; }
    }));
    if (!rolling && boardText !== null) return;
    boardText = '';
    const c = boardCanvas.getContext('2d'), cw = 1024 / cols, rh = 240 / rows;
    c.fillStyle = '#131617'; c.fillRect(0, 0, 1024, 240);
    c.font = `600 ${Math.round(rh * .66)}px ${SIGN_FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    // One half of a flap (top or bottom) carrying a letter, folded towards the hinge by `fold` (1 flat, 0 edge-on).
    const half = (ch, x, y, top, fold) => {
      const hinge = y + rh / 2, h = (rh / 2 - 4) * fold;
      c.save(); c.beginPath(); c.rect(x + 2, top ? hinge - h : hinge, cw - 4, h); c.clip();
      c.fillStyle = top ? '#363c3e' : '#2b3133'; c.fillRect(x + 2, top ? hinge - h : hinge, cw - 4, h);
      if (ch !== ' ') { c.translate(0, hinge); c.scale(1, fold); c.fillStyle = '#efe4c8'; c.fillText(ch, x + cw / 2, 1); }
      c.restore();
    };
    rolling = false;
    cells.forEach((row, r) => row.forEach((cell, k) => {
      const x = k * cw, y = r * rh, t = now - cell.start;
      let shown = cell.to, next = cell.to, f = 1;
      if (t < 0) { shown = next = cell.from; rolling = true; }
      else if (cell.from !== cell.to && t < STEP * ROLL) {
        // Roll through ROLL letters ending on the new one, a flap every STEP ms.
        const i = Math.floor(t / STEP), base = FLAPS.indexOf(cell.to) + FLAPS.length - ROLL;
        shown = i ? FLAPS[(base + i) % FLAPS.length] : cell.from; next = FLAPS[(base + i + 1) % FLAPS.length];
        f = (t % STEP) / STEP; rolling = true;
      } else cell.from = cell.to;
      if (f >= 1) { half(shown, x, y, true, 1); half(shown, x, y, false, 1); }
      else {
        // Behind: the next letter's top and the current letter's bottom; in front, the falling flap.
        half(next, x, y, true, 1); half(shown, x, y, false, 1);
        if (f < .5) half(shown, x, y, true, 1 - f * 2); else half(next, x, y, false, f * 2 - 1);
      }
      c.fillStyle = '#0d1113'; c.fillRect(x + 2, y + rh / 2 - 1, cw - 4, 2);
    }));
    boardTexture.needsUpdate = true;
  }
  const productWall = unit();
  shelving(productWall, s.shelfLeft, s.wallRight, face, .64, 0, 3.3, 5, 4);
  swap(productWall, 'product_shelving.glb', (s.shelfLeft + s.wallRight) / 2, 0, face + .32);

  // Mezzanine: oak wall shelving on the rear wall and the arch cabinet on the left wall.
  const wallShelves = unit();
  shelving(wallShelves, -9, 9, mRear, .6, mezz.y, 2.6, 8, 3);
  swap(wallShelves, 'wall_shelving.glb', 0, mezz.y, mRear + .3);
  const archUnit = unit(), archGoods = goodsFor(archUnit);
  swap(archUnit, 'arch_shelves.glb', -8.525, mezz.y, -4.85);
  span(archUnit, -8.85, -8.2, mezz.y, mezz.y + 2.4, -5.9, -3.8, OAK);
  const arch = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, .65, 32, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), material(OAK));
  arch.position.set(-8.525, mezz.y + 2.4, -4.85); arch.castShadow = true; archUnit.add(arch);
  span(archUnit, -8.21, -8.19, mezz.y + .2, mezz.y + 2.3, -5.7, -4, '#e8dcc4', { cast: false });
  for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) archGoods.jars.push([-8.35, mezz.y + .5 + r * .7, -5.45 + k * .6, (r + k) % 4]);
  for (let r = 0; r < 3; r++) span(archUnit, -8.85, -8.2, mezz.y + .45 + r * .7, mezz.y + .5 + r * .7, -5.8, -3.9, '#ecdbc1', { cast: false });

  // Column at the foot of the stair: a green tiled base, cream cap and shaft up to the mezzanine slab.
  const col = s.column, column = unit();
  box(column, col.x, 0, col.z, .78, 1.73, .73, '#25523b');
  box(column, col.x, 1.73, col.z, .8, .12, .76, '#e1dbc0');
  box(column, col.x, 1.85, col.z, .75, wallTop - 1.85, .7, CREAM);
  const sconceMat = new THREE.MeshLambertMaterial({ color: '#fff2c8', emissive: '#ffd58a', emissiveIntensity: 0 });
  const sconce = new THREE.Mesh(new THREE.SphereGeometry(.13, 12, 8), sconceMat);
  sconce.position.set(col.x, 2.6, col.z + .42); column.add(sconce);
  // Lamps in the models glow like the drawn ones: their material takes the drawn lamp's emissive and is driven with it.
  const glowFrom = (scene, name, mat) => { const o = scene.getObjectByName(name); if (o) o.traverse(m => { if (m.isMesh) { const c = m.material.clone(); c.emissive = mat.emissive.clone(); m.material = c; glows.push([c, mat]); } }); };
  const glows = [];
  swap(column, 'shop_column.glb', col.x, 0, col.z, scene => glowFrom(scene, 'Sconce', sconceMat));

  // The exit door in the rear wall's doorway: green posts and header, the leaf standing open, the lamp above.
  const d = s.exitDoor, exitUnit = unit();
  span(exitUnit, d.x0 - .14, d.x0, 0, d.h + .14, gRear - .1, gRear + .12, '#1f4a35');
  span(exitUnit, d.x1, d.x1 + .14, 0, d.h + .14, gRear - .1, gRear + .12, '#1f4a35');
  span(exitUnit, d.x0 - .14, d.x1 + .14, d.h, d.h + .2, gRear - .1, gRear + .12, '#1f4a35');
  span(exitUnit, d.x0, d.x0 + .06, .02, d.h - .02, gRear + .1, gRear + .95, '#2d6146');
  span(exitUnit, (d.x0 + d.x1) / 2 - .4, (d.x0 + d.x1) / 2 + .4, d.h + .3, d.h + .56, gRear, gRear + .08, '#1d3028');
  const exitLamp = new THREE.Mesh(new THREE.BoxGeometry(.66, .14, .04), new THREE.MeshLambertMaterial({ color: '#d84a3a', emissive: '#ff5a3c', emissiveIntensity: .4 }));
  exitLamp.position.set((d.x0 + d.x1) / 2, d.h + .43, gRear + .1); exitUnit.add(exitLamp);
  swap(exitUnit, 'exit_door.glb', (d.x0 + d.x1) / 2, 0, gRear, scene => {
    glowFrom(scene, 'ExitLamp', exitLamp.material);
    // The model's leaf stands open into the shop; Kevin (2026-10-19) wants it to swing out, so it turns the other way
    // about the same hinge, hung from the street face of the frame.
    const leaf = scene.getObjectByName('DoorLeaf');
    if (leaf) { leaf.rotation.y = -leaf.rotation.y; leaf.position.z = -leaf.position.z; }
  });

  // The arched merch cabinet against the lounge's right wall, its glazed face toward the exit lane.
  const cab = s.merchCabinet, cabinet = unit(), cabGoods = goodsFor(cabinet);
  swap(cabinet, 'merch_cabinet.glb', (cab.back + cab.face) / 2, 0, (cab.z0 + cab.z1) / 2, scene => {
    const g = scene.getObjectByName('CabinetGlass'); if (g) g.traverse(o => { if (o.isMesh) { o.material = glass; o.castShadow = false; } });
  });
  span(cabinet, cab.back, cab.face, 0, .2, cab.z0, cab.z1, OAK_DARK);
  span(cabinet, cab.back, cab.face, .2, 2.6, cab.z0, cab.z0 + .1, OAK); span(cabinet, cab.back, cab.face, .2, 2.6, cab.z1 - .1, cab.z1, OAK);
  span(cabinet, cab.back, cab.back + .12, .2, 2.6, cab.z0, cab.z1, OAK);
  const cabArch = new THREE.Mesh(new THREE.CylinderGeometry((cab.z1 - cab.z0) / 2, (cab.z1 - cab.z0) / 2, cab.face - cab.back, 32, 1, false, 0, Math.PI).rotateZ(Math.PI / 2), material(OAK));
  cabArch.position.set((cab.face + cab.back) / 2, 2.6, (cab.z0 + cab.z1) / 2); cabArch.castShadow = true; cabinet.add(cabArch);
  for (let r = 0; r < 3; r++) {
    span(cabinet, cab.back + .12, cab.face - .05, .55 + r * .68, .6 + r * .68, cab.z0 + .1, cab.z1 - .1, '#ecdbc1', { cast: false });
    for (let k = 0; k < 4; k++) (k % 2 ? cabGoods.pouches : cabGoods.jars).push([(cab.back + cab.face) / 2, .6 + r * .68, cab.z0 + .35 + k * (cab.z1 - cab.z0 - .7) / 3, (r + k) % 4]);
  }
  const cabGlass = span(cabinet, cab.face - .03, cab.face, .2, 2.6, cab.z0 + .1, cab.z1 - .1, '#cfe6df', { cast: false });
  cabGlass.material = glass;

  // Storefront sign: two lit bars on the marquee's inner face, cream with green letters over green with cream.
  const m = layout.marquee, signLen = m.zFront - m.zRear;
  const marqueeCanvas = document.createElement('canvas'); marqueeCanvas.width = 2048; marqueeCanvas.height = 192;
  const mc = marqueeCanvas.getContext('2d');
  mc.fillStyle = '#f1e7cc'; mc.fillRect(0, 0, 2048, 96); mc.fillStyle = '#1f6b47'; mc.fillRect(0, 96, 2048, 96);
  mc.font = '800 54px "Bricolage Grotesque", sans-serif'; mc.textAlign = 'center'; mc.textBaseline = 'middle';
  m.top.forEach((w, i) => { mc.fillStyle = '#1f5e40'; mc.fillText(w, (i + .5) * 512, 50); });
  mc.font = '700 40px "Bricolage Grotesque", sans-serif';
  m.bottom.forEach((w, i) => { mc.fillStyle = '#f1e7cc'; mc.fillText(w, (i + .5) * 512, 146); });
  mc.fillStyle = '#1a1e20'; for (let i = 1; i < 4; i++) mc.fillRect(i * 512 - 3, 0, 6, 192);
  const marqueeTexture = new THREE.CanvasTexture(marqueeCanvas); marqueeTexture.colorSpace = THREE.SRGBColorSpace; marqueeTexture.anisotropy = 4;
  const marqueeMat = new THREE.MeshLambertMaterial({ map: marqueeTexture, emissive: '#ffffff', emissiveMap: marqueeTexture, emissiveIntensity: .15 });
  const marqueeFace = new THREE.Mesh(new THREE.PlaneGeometry(signLen, m.y1 - m.y0), marqueeMat);
  marqueeFace.rotation.y = Math.PI / 2;
  marqueeFace.position.set(m.x + .17, (m.y0 + m.y1) / 2, (m.zFront + m.zRear) / 2);
  // The sprite shop's storefront render carries its own sign (main.js wallFaces).
  if (!layout.wallFaces) shell.add(marqueeFace);

  // The aisle planter along the storefront, and the baseboard round the store's open edges.
  const pl = s.planter, planter = unit();
  swap(planter, 'shop_planter.glb', (pl.x0 + pl.x1) / 2, 0, (pl.z0 + pl.z1) / 2);
  span(planter, pl.x0, pl.x1, 0, .56, pl.z0, pl.z1, '#1f5e40');
  span(planter, pl.x0 - .04, pl.x1 + .04, .56, .63, pl.z0 - .04, pl.z1 + .04, '#2b302d');
  span(planter, pl.x0 + .1, pl.x1 - .1, .63, .66, pl.z0 + .1, pl.z1 - .1, '#514633', { cast: false });
  // Kevin (2026-10-19) swapped the entrance's low wall for a shin-high baseboard in its style (green tile, brass rail,
  // cream cap) along the herringbone's front edge and up the right-hand edge to the rear wall by the exit door.
  const bb = s.baseboard, bd = .14;
  [[bb.x0, bb.x1, bb.front - bd, bb.front], [bb.x1 - bd, bb.x1, bb.rear, bb.front - bd]].forEach(([x0, x1, z0, z1]) => {
    span(shell, x0, x1, 0, bb.h - .1, z0, z1, '#1f5e40');
    span(shell, x0 - .01, x1 + .01, bb.h - .1, bb.h - .07, z0 - .01, z1 + .01, BRASS, { cast: false });
    span(shell, x0 - .02, x1 + .02, bb.h - .07, bb.h, z0 - .03, z1 + .03, '#e1dbc0');
  });

  // Foliage: one instanced leaf mesh for the planter's shrubs and tree, the hanging plants and the baskets.
  const leafSpots = [];
  // The planter's shrubs and its tree are soft rounded clumps, like the town's trees.
  const clump = new THREE.IcosahedronGeometry(1, 1);
  const bush = (x, y, z, r, c) => { const b = new THREE.Mesh(clump, material(c)); b.position.set(x, y, z); b.scale.set(r, r * .8, r); b.castShadow = b.receiveShadow = true; planter.add(b); };
  [-1.2, -.5, .2, .9, 1.6].forEach((dz, n) => bush((pl.x0 + pl.x1) / 2 + (n % 2 ? .08 : -.08), .9, (pl.z0 + pl.z1) / 2 + dz, .3, n % 2 ? '#6b9250' : '#5f8648'));
  box(planter, pl.tree.x, .63, pl.tree.z, .16, 2.4, .16, '#816747');
  [[0, 3.2, 0, .75, '#769852'], [-.35, 2.9, .3, .55, '#587c4d'], [.3, 3.05, -.3, .55, '#98b96e']].forEach(([ox, y, oz, r, c]) => bush(pl.tree.x + ox, y, pl.tree.z + oz, r, c));
  // Hanging pothos under the top floor's soffit: a brass rail and short trailing strands.
  // Each hanging plant is its own unit (rail or basket, with its leaves) so its Blender model can replace it.
  const hang = s.hanging, rail = unit(), railLeaves = [];
  span(rail, hang.x0, hang.x1, hang.y - .04, hang.y, hang.z - .03, hang.z + .03, BRASS, { cast: false });
  for (let v = 0; v < 18; v++) {
    const x = hang.x0 + (hang.x1 - hang.x0) * (v + .5) / 18, len = .5 + (1 - Math.abs(v - 8.5) / 9) * .7 + (v % 3) * .12;
    for (let k = 0; k < 6; k++) { const t = k / 5; railLeaves.push([x + Math.sin(v * 1.7 + t * 3) * .06, hang.y - .05 - len * t, hang.z + (v % 2 ? .06 : -.06) + t * .08, (v + k) % 3, .8]); }
  }
  leafSpots.push([rail, railLeaves]);
  swap(rail, 'pothos_rail.glb', (hang.x0 + hang.x1) / 2, hang.y, hang.z);
  // Hanging baskets against the rear walls of the upper floors.
  [[mezz, mRear], [top, tRear]].forEach(([f, rear]) => (f === top ? [-2, 2] : [-7, 5]).forEach(x => {
    const z = rear + .9, y = f.y + Math.min(3.95, f === top ? 3.5 : 3.95);
    const basket = unit(), spots = [];
    span(basket, x - .01, x + .01, y - .7, y, z - .01, z + .01, '#343f33', { cast: false });
    box(basket, x, y - 1, z, .55, .3, .48, '#b6ac8a');
    for (let k = 0; k < 14; k++) { const a = k * 2.399; spots.push([x + Math.cos(a) * .28, y - .72 - (k % 4) * .18, z + Math.sin(a) * .22, k % 3, .9]); }
    leafSpots.push([basket, spots]);
    swap(basket, 'hanging_basket.glb', x, y, z);
  }));
  const leafColours = ['#5f8648', '#7aa257', '#9cc46e'].map(c => new THREE.Color(c));
  const leafGeometry = new THREE.IcosahedronGeometry(.13, 0), leafMaterial = material('#ffffff');
  const mtx = new THREE.Matrix4(), q = new THREE.Quaternion(), pos = new THREE.Vector3(), scl = new THREE.Vector3();
  leafSpots.forEach(([g, spots]) => {
    const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, spots.length);
    spots.forEach(([x, y, z, c, k], i) => {
      q.setFromEuler(new THREE.Euler(i * .7, i * 1.3, 0));
      leaves.setMatrixAt(i, mtx.compose(pos.set(x, y, z), q, scl.set(1.3 * k, .7 * k, 1 * k)));
      leaves.setColorAt(i, leafColours[c]);
    });
    leaves.castShadow = true; leaves.receiveShadow = true;
    g.add(leaves);
  });

  // The goods on every shelf, in the shop's product colours.
  const goodsColours = ['#527e60', '#b28b64', '#75999a', '#d5bd8c'].map(c => new THREE.Color(c));
  goodsUnits.forEach(u => [[jarGeometry, u.jars], [pouchGeometry, u.pouches]].forEach(([geometry, spots]) => {
    if (!spots.length) return;
    const mesh = new THREE.InstancedMesh(geometry, material('#ffffff'), spots.length);
    spots.forEach(([x, y, z, c], i) => { mesh.setMatrixAt(i, mtx.compose(pos.set(x, y, z), q.identity(), scl.set(1, 1, 1))); mesh.setColorAt(i, goodsColours[c]); });
    mesh.castShadow = true;
    u.g.add(mesh);
  }));

  // Warm interior lamps: faint by day, the shop's own light after dark. None casts shadows, to keep phones cool.
  const lamps = s.lamps.map(([x, y, z, power]) => {
    const light = new THREE.PointLight('#ffc98a', 0, 11, 1.2);
    light.position.set(x, y, z); light.userData.power = power;
    world.add(light);
    return light;
  });

  return {
    update(frame) {
      const night = frame.night || 0, open = !!frame.loungeOpen;
      rotor.rotation.z = -(frame.time || 0) * Math.PI * 2 / 26000;
      if (modelRotor) modelRotor.rotation.z = rotor.rotation.z;
      if (fanRow && fanRow.rotor) {
        fanRow.rotor.rotation.z = rotor.rotation.z;
        fanRow.holder.updateMatrixWorld(true);
        fanRow.spinning.forEach(({ part, mesh }) => {
          const rel = new THREE.Matrix4().multiplyMatrices(fanRow.parentInverse, part.matrixWorld), m = new THREE.Matrix4();
          rowSpots.forEach((spot, i) => mesh.setMatrixAt(i, m.multiplyMatrices(spot, rel)));
          mesh.instanceMatrix.needsUpdate = true;
        });
      }
      frontDrapes.set(frame.loungeCurtain || 0, open);
      exitDrapes.set(frame.loungeExitCurtain || 0, open);
      if (closedDoor) closedDoor.visible = !open;
      boardedExit.visible = !open;
      paintSign(open);
      signMat.color.setScalar(open ? 1 : .8);
      if (frame.menuLines) paintBoard(frame.menuLines, performance.now());
      lampShades.forEach(l => { l.material.emissiveIntensity = open ? .5 + night * 1.2 : 0; });
      sconce.material.emissiveIntensity = .3 + night * 1.4;
      exitLamp.material.emissiveIntensity = .4 + night * 1.2;
      glows.forEach(([m, from]) => { m.emissiveIntensity = from.emissiveIntensity; });
      marqueeMat.emissiveIntensity = .15 + night * .7;
      lamps.forEach(l => { l.intensity = l.userData.power * (.2 + night * 5); });
    }
  };
}
