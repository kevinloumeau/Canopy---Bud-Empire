// The 3D map (phase 1 of the Three.js conversion, behind ?render=3d). It draws the main shop's city block as a
// Three.js scene through an orthographic camera matched pixel for pixel to the 2D map's project() (see camera.js), so
// the game's pan, zoom, taps and DOM tags keep working unchanged. This phase is a grey-box: the plaza, sunken streets,
// terraces, trees and lamps, the shop's three floors and walls, the stations, people and cars as simple solids, lit
// by the one sun every sprite was rendered under. Blender models replace the solids station by station later.
//
// Nothing here reads or writes game state: main.js hands over the layout once and a frame description every frame.
// This module is loaded on demand and imports only Three.js, so it never pulls the game's own modules into its chunk.
import * as THREE from 'three';
import { buildShell } from './shell.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { createMapCamera, frameMapCamera, HEIGHT_SCALE } from './camera.js';

const MAX_PEOPLE = 160, MAX_CARS = 32;
const SUN_COLOUR = '#fff1d6', SKY = '#fffaf0', BOUNCE = '#b8ad94';

export function createMap3D(canvas, layout) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { return null; }
  if (!renderer.getContext()) return null;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const hazeColour = new THREE.Color().setRGB(layout.haze.colour[0] / 255, layout.haze.colour[1] / 255, layout.haze.colour[2] / 255, THREE.SRGBColorSpace);
  const scene = new THREE.Scene();
  scene.background = hazeColour.clone();
  const camera = createMapCamera();
  // Everything is placed in the 2D map's units; this group stretches heights so the camera matches project().
  const world = new THREE.Group();
  world.scale.y = HEIGHT_SCALE;
  scene.add(world);

  // One sun, high on the left behind the viewer's shoulder, so shadows fall right and a touch up the screen like the
  // renders' own (SUN and SUN_REACH in sunny-world.js: a shadow runs .42 of an object's height along SUN).
  const hemi = new THREE.HemisphereLight(SKY, BOUNCE, 1.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(SUN_COLOUR, 2.1);
  const reach = layout.sun.reach, toSun = new THREE.Vector3(-layout.sun.x * reach, 1 / HEIGHT_SCALE, -layout.sun.z * reach).normalize();
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  Object.assign(sun.shadow.camera, { left: -44, right: 44, top: 44, bottom: -44, near: 1, far: 260 });
  scene.add(sun, sun.target);

  // Haze: the town fades into the sky colour toward its edges along x and z (HAZE_RAMP in sunny-world.js), not with
  // camera distance, so every side of the block ends the same way the 2D map's does.
  const hazeUniforms = { hazeColour: { value: hazeColour }, hazeX: { value: new THREE.Vector4(...layout.haze.ramp.west, ...layout.haze.ramp.east) }, hazeZ: { value: new THREE.Vector4(...layout.haze.ramp.north, ...layout.haze.ramp.south) } };
  const materials = new Map();
  function material(colour, opts = {}) {
    const key = colour + JSON.stringify(opts);
    if (materials.has(key)) return materials.get(key);
    const m = new THREE.MeshLambertMaterial({ color: colour, ...opts });
    m.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, hazeUniforms);
      shader.vertexShader = 'varying vec3 vHazeWorld;\n' + shader.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
        vec4 hazeLocal = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeLocal = instanceMatrix * hazeLocal;
        #endif
        vHazeWorld = (modelMatrix * hazeLocal).xyz;`);
      shader.fragmentShader = 'varying vec3 vHazeWorld;\nuniform vec3 hazeColour;\nuniform vec4 hazeX;\nuniform vec4 hazeZ;\n' + shader.fragmentShader.replace('#include <dithering_fragment>', `
        float hazeAmount = max(max(clamp((vHazeWorld.x - hazeX.x) / (hazeX.y - hazeX.x), 0.0, 1.0), clamp((vHazeWorld.x - hazeX.z) / (hazeX.w - hazeX.z), 0.0, 1.0)),
          max(clamp((vHazeWorld.z - hazeZ.x) / (hazeZ.y - hazeZ.x), 0.0, 1.0), clamp((vHazeWorld.z - hazeZ.z) / (hazeZ.w - hazeZ.z), 0.0, 1.0)));
        gl_FragColor.rgb = mix(gl_FragColor.rgb, hazeColour, hazeAmount);
        #include <dithering_fragment>`);
    };
    m.customProgramCacheKey = () => 'haze';
    materials.set(key, m);
    return m;
  }

  const unitBox = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);
  // A solid from its footprint's centre: (x, z) on the ground at height y, w along x, d along z, h tall.
  function box(parent, x, y, z, w, h, d, colour, { cast = true, receive = true, opts } = {}) {
    const mesh = new THREE.Mesh(unitBox, material(colour, opts));
    mesh.position.set(x, y, z); mesh.scale.set(w, h, d);
    mesh.castShadow = cast; mesh.receiveShadow = receive;
    parent.add(mesh);
    return mesh;
  }
  function span(parent, x0, x1, y0, y1, z0, z1, colour, opts) { return box(parent, (x0 + x1) / 2, y0, (z0 + z1) / 2, Math.max(.001, x1 - x0), Math.max(.001, y1 - y0), Math.max(.001, z1 - z0), colour, opts); }

  buildTown(world, layout, { box, span, material });
  buildShop(world, layout, { box, span });
  const transport = buildTransport(scene, world, layout.transport, { box, material });
  const shell = buildShell(world, layout, { box, span, material });

  // Stations: one solid per station slot, resized and recoloured from the frame (tier, built, rising in).
  const stationMeshes = [], selectionRing = new THREE.Mesh(new THREE.RingGeometry(.86, 1, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#e2c68a', transparent: true, opacity: .85, depthWrite: false }));
  selectionRing.renderOrder = 2;
  world.add(selectionRing);
  const TIER_COLOURS = ['#d8cfbd', '#b8cdb2', '#9cc4b8', '#e2c68a'];
  function stationMesh(i) {
    if (!stationMeshes[i]) {
      const group = new THREE.Group(), body = box(group, 0, 0, 0, 1, 1, 1, TIER_COLOURS[1]), top = box(group, 0, 1, 0, 1, .08, 1, '#efe7d4');
      group.userData = { body, top, model: null };
      world.add(group);
      stationMeshes[i] = group;
    }
    return stationMeshes[i];
  }

  // Blender stations. Each model is scaled so it spans the same width on screen as the sprite it replaces (an
  // isometric footprint a by b projects (a + b) cos 45° wide), centred on its footprint, and un-stretched against the
  // world's height scale so it keeps its true proportions, which is what the sprite renders show. Until a model has
  // loaded (or if it fails), the grey box stands in.
  const models = {};
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  function prepare(source) {
    source.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = o.receiveShadow = true;
      // Glass comes in with transmission, which costs Three.js a second render of the scene every frame; plain
      // transparency reads the same at this size.
      const m = o.material;
      if (m && m.transmission > 0) { o.material = new THREE.MeshStandardMaterial({ color: m.color, roughness: .1, metalness: 0, transparent: true, opacity: .28, depthWrite: false }); o.castShadow = false; }
    });
  }
  // Fixtures (the online orders deck) are placed by their own origin at a fixed Blender-to-map scale rather than
  // fitted to a sprite, since their footprint is irregular; `key` names the frame flag that shows them.
  const fixtures = {};
  (layout.fixtures || []).forEach(f => {
    loader.load(layout.modelBase + f.file, gltf => {
      prepare(gltf.scene);
      const holder = new THREE.Group();
      holder.add(gltf.scene);
      holder.scale.set(f.scale, f.scale / HEIGHT_SCALE, f.scale);
      holder.position.set(f.x, f.y, f.z);
      holder.visible = false;
      world.add(holder);
      fixtures[f.key] = holder;
    }, undefined, e => console.warn('3D map: could not load ' + f.file, e));
  });
  Object.entries(layout.stationModels || {}).forEach(([index, file]) => {
    loader.load(layout.modelBase + file, gltf => {
      const source = gltf.scene, bounds = new THREE.Box3().setFromObject(source), size = bounds.getSize(new THREE.Vector3()), centre = bounds.getCenter(new THREE.Vector3());
      const spec = layout.stationModelSize[index] || { w: size.x + size.z, ox: 0 }, s = spec.w / ((size.x + size.z) * Math.SQRT1_2);
      source.position.set(-centre.x, -bounds.min.y, -centre.z);
      prepare(source);
      const holder = new THREE.Group();
      holder.add(source);
      holder.scale.set(s, s / HEIGHT_SCALE, s);
      // The sprite's sideways nudge, along screen right.
      holder.position.set(spec.ox * Math.SQRT1_2, 0, -spec.ox * Math.SQRT1_2);
      models[index] = holder;
    }, undefined, e => console.warn('3D map: could not load ' + file, e));
  });

  // People and cars move every frame, so they are instanced: one draw call for all of them.
  const personGeometry = new THREE.CapsuleGeometry(.24, 1.55, 4, 10).translate(0, 1.03, 0);
  const people = new THREE.InstancedMesh(personGeometry, material('#ffffff'), MAX_PEOPLE);
  people.castShadow = true; people.count = 0;
  people.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  world.add(people);
  const carBodies = new THREE.InstancedMesh(unitBox, material('#ffffff'), MAX_CARS), carCabins = new THREE.InstancedMesh(unitBox, material('#dfe8ea'), MAX_CARS);
  [carBodies, carCabins].forEach(m => { m.castShadow = true; m.count = 0; m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); world.add(m); });

  const matrix = new THREE.Matrix4(), position = new THREE.Vector3(), scale = new THREE.Vector3(), quaternion = new THREE.Quaternion(), colour = new THREE.Color();
  const dayHemi = hemi.intensity, daySun = sun.intensity, nightSky = new THREE.Color('#2b3a48'), daySky = hazeColour.clone();
  let lost = false;
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; });
  canvas.addEventListener('webglcontextrestored', () => { lost = false; });

  function render(frame) {
    if (lost) return false;
    const pixelRatio = Math.min(frame.dpr, 2);
    if (renderer.getPixelRatio() !== pixelRatio) renderer.setPixelRatio(pixelRatio);
    const size = renderer.getSize(new THREE.Vector2());
    if (size.x !== frame.width || size.y !== frame.height) renderer.setSize(frame.width, frame.height, false);
    frameMapCamera(camera, frame);

    // The sun follows the view so its shadow box always covers what is on screen.
    const look = frame.lookAt || { x: 0, z: 0 };
    sun.target.position.set(look.x, 0, look.z);
    sun.position.copy(sun.target.position).addScaledVector(toSun, 120);
    sun.target.updateMatrixWorld();

    const night = frame.night || 0;
    hemi.intensity = dayHemi * (1 - night * .72);
    sun.intensity = daySun * (1 - night * .9);
    scene.background.copy(daySky).lerp(nightSky, night);
    hazeUniforms.hazeColour.value.copy(scene.background);

    let ringShown = false;
    frame.stations.forEach((s, i) => {
      const group = stationMesh(i), { body, top } = group.userData;
      group.visible = s.visible !== false;
      if (!group.visible) return;
      // A built station with a loaded model shows the model (one copy per slot, so the order desks can share one).
      const model = s.built && s.index !== undefined && models[s.index];
      if (model && !group.userData.model) group.add(group.userData.model = model.clone());
      if (group.userData.model) group.userData.model.visible = !!model;
      body.visible = !model;
      const h = s.built ? s.h : .12, lift = s.rise ? -s.rise * s.rise * 1.1 : 0;
      group.position.set(s.x, s.y + lift, s.z);
      body.scale.set(s.w, h, s.d);
      top.visible = s.built && !model; top.position.y = h; top.scale.set(s.w + .12, .08, s.d + .12);
      body.material = material(s.built ? TIER_COLOURS[Math.min(3, s.tier)] : '#e3b04b');
      if (s.selected && !ringShown) {
        ringShown = true;
        selectionRing.position.set(s.x, s.y + .03, s.z);
        const r = Math.max(s.w, s.d) * .72;
        selectionRing.scale.set(r, 1, r);
      }
    });
    selectionRing.visible = ringShown;

    people.count = Math.min(MAX_PEOPLE, frame.people.length);
    for (let i = 0; i < people.count; i++) {
      const p = frame.people[i];
      position.set(p.x, p.y || 0, p.z); scale.set(1, 1, 1);
      matrix.compose(position, quaternion.identity(), scale);
      people.setMatrixAt(i, matrix);
      people.setColorAt(i, colour.set(p.colour));
    }
    people.instanceMatrix.needsUpdate = true;
    if (people.instanceColor) people.instanceColor.needsUpdate = true;

    carBodies.count = carCabins.count = Math.min(MAX_CARS, frame.cars.length);
    for (let i = 0; i < carBodies.count; i++) {
      const c = frame.cars[i], ax = c.along === 'x', van = c.van, length = van ? 4.6 : 4, wide = 1.8;
      position.set(c.x, layout.streetY + .25, c.z); scale.set(ax ? length : wide, van ? 1.7 : .75, ax ? wide : length);
      carBodies.setMatrixAt(i, matrix.compose(position, quaternion.identity(), scale));
      carBodies.setColorAt(i, colour.set(c.paint));
      position.y += van ? 1.7 : .75; scale.set(ax ? (van ? 1.4 : 2.1) : wide * .86, van ? .05 : .55, ax ? wide * .86 : (van ? 1.4 : 2.1));
      carCabins.setMatrixAt(i, matrix.compose(position, quaternion.identity(), scale));
    }
    [carBodies, carCabins].forEach(m => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; });

    if (transport && frame.cargo) transport.update(frame.cargo);
    if (shell) shell.update(frame);
    Object.entries(fixtures).forEach(([key, holder]) => { holder.visible = !!(frame.fixtures && frame.fixtures[key]); });

    renderer.render(scene, camera);
    return true;
  }

  return {
    render,
    get ok() { return !lost; },
    dispose() { renderer.dispose(); materials.forEach(m => m.dispose()); }
  };
}

// The town round the shop: one asphalt floor at street level, every block between the streets a paved slab up to the
// plaza level (so kerbs are the slabs' edges), the terraces as blocks of their wall colour, trees and lamps.
function buildTown(world, layout, { box, span, material }) {
  const { roads, roadWidth: rw, plazaY: P, streetY: G, extent: L } = layout;
  span(world, -L, L, G - .4, G, -L, L, layout.colours.asphalt, { cast: false });
  const edges = along => {
    const at = roads.filter(r => r.along === along).map(r => r.at).sort((a, b) => a - b), out = [];
    let from = -L;
    at.forEach(a => { out.push([from, a - rw / 2]); from = a + rw / 2; });
    out.push([from, L]);
    return out;
  };
  // Roads along x run at fixed z, so they cut the blocks' z range; roads along z cut the x range.
  const zBands = edges('x'), xBands = edges('z');
  xBands.forEach(([x0, x1]) => zBands.forEach(([z0, z1]) => span(world, x0, x1, G, P, z0, z1, layout.colours.paver, { cast: false })));
  // Lane markings: a pale dashed centre line down each street.
  roads.forEach(r => {
    for (let s = -L + 2; s < L - 2; s += 4) {
      if (r.along === 'x') span(world, s, s + 2, G, G + .015, r.at - .06, r.at + .06, '#e8e2cf', { cast: false });
      else span(world, r.at - .06, r.at + .06, G, G + .015, s, s + 2, '#e8e2cf', { cast: false });
    }
  });
  layout.buildings.forEach(b => {
    span(world, b.x0, b.x1, P, b.h, b.z0, b.z1, b.wall);
    span(world, b.x0 - .15, b.x1 + .15, b.h, b.h + .35, b.z0 - .15, b.z1 + .15, b.roof);
  });
  const crownGeometry = new THREE.IcosahedronGeometry(1.6, 1);
  layout.trees.forEach(([x, z]) => {
    box(world, x, P, z, .35, 2.2, .35, '#7a5a3e');
    const crown = new THREE.Mesh(crownGeometry, material('#7fa35a'));
    crown.position.set(x, P + 3.6, z); crown.scale.set(1, .8, 1);
    crown.castShadow = crown.receiveShadow = true;
    world.add(crown);
  });
  layout.lamps.forEach(([x, z]) => {
    box(world, x, P, z, .18, 4.4, .18, '#3b4a43');
    box(world, x, P + 4.3, z, .5, .3, .5, '#f1e3b6');
  });
}

// The shop: the timber floor on the plaza, the mezzanine and top floor as slabs on posts, the rear and short side
// walls of the cutaway, and the entrance planter line. Positions are the 2D map's own (drawTower's floors).
function buildShop(world, layout, { box, span }) {
  const shop = new THREE.Group();
  world.add(shop);
  layout.floors.forEach((f, fi) => {
    const left = -f.w / 2, right = f.w / 2, rear = f.z - f.d / 2, front = f.z + f.d / 2;
    span(shop, left, right, f.y - (fi ? .32 : .02), f.y, rear, front, fi === 2 ? '#e9e4d8' : fi ? '#e4ddcc' : '#c9965f', { cast: fi > 0 });
    // The walls themselves are the shell's (shell.js).
    // A brass rail along the open front edge of the upper floors.
    if (fi) {
      span(shop, left, right, f.y, f.y + 1.05, front - .06, front, '#c9a35a', { opts: { transparent: true, opacity: .55 } });
      // Posts under the slab's front corners and middle.
      // The mezzanine has no middle post: the 2D map leaves the menu board and counters clear.
      (fi === 1 ? [left + .3, right - .3] : [left + .3, 0, right - .3]).forEach(x => box(shop, x, layout.floors[fi - 1].y, front - .3, .3, f.y - layout.floors[fi - 1].y - .32, .3, '#33372f'));
    }
  });
  // Stairs as drawShellStairs places them: the ground flight up the right side to a landing off the mezzanine, then
  // the upper flight from the mezzanine to the top floor's rear-right corner.
  const flight = (x0, x1, zFoot, zHead, y0, y1, n) => {
    const run = (zHead - zFoot) / n;
    for (let k = 0; k < n; k++) span(shop, x0, x1, y0, y0 + (y1 - y0) * (k + 1) / n, Math.min(zFoot + run * k, zFoot + run * (k + 1)), Math.max(zFoot + run * k, zFoot + run * (k + 1)), '#c7a57c');
  };
  const [, mezz, top] = layout.floors;
  flight(9.1, 10.7, 4.2, -.8, 0, mezz.y, 12);
  span(shop, 8.93, 10.85, mezz.y - .32, mezz.y, -2.8, -.8, '#e4ddcc', { cast: true });
  flight(6.5, 8.2, -.5, -6.8, mezz.y, top.y, 12);
  // The storefront along the entrance side (MARQUEE in main.js): a green plinth, glass, the sign band and pilasters.
  const m = layout.marquee;
  span(shop, m.x - .13, m.x + .13, 0, .9, m.zRear, m.zFront, '#1f6b47');
  span(shop, m.x - .04, m.x + .04, .9, m.y0, m.zRear, m.zFront, '#cfe3dc', { cast: false, opts: { transparent: true, opacity: .35 } });
  span(shop, m.x - .16, m.x + .16, m.y0, m.y1, m.zRear, m.zFront, '#1f6b47');
  [m.zRear, m.zFront].forEach(z => box(shop, m.x, 0, z, .34, m.y1, .34, '#174f36'));
}

// The production line: the glass tubes as real pipe along the 2D map's own routes (TUBE_RUNS and PACK_STUB in main.js),
// rounded at each corner the way transferTube rounds them, with brass collars at the ends and floor rings where a tube
// passes through a slab; the two belts; and the cargo, a parcel every `gap` units at the one shop-wide speed, exactly
// as the 2D map spaces it, so the line keeps its rhythm in both maps.
function buildTransport(scene, world, transport, { box, material }) {
  if (!transport) return null;
  const K = HEIGHT_SCALE, R = transport.bore / 2;
  const glass = new THREE.MeshStandardMaterial({ color: '#cfeee2', emissive: '#2f5a4a', emissiveIntensity: .25, roughness: .08, metalness: 0, transparent: true, opacity: .46, depthWrite: false });
  const brass = new THREE.MeshStandardMaterial({ color: '#d0a54e', roughness: .3, metalness: .9 });
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  // Corners rounded with a quadratic bend, in the map's units (heights unstretched), as transferTube does.
  function rounded(points) {
    const path = [points[0]], radius = .48;
    for (let k = 1; k < points.length - 1; k++) {
      const prev = points[k - 1], corner = points[k], next = points[k + 1];
      const before = mix(corner, prev, Math.min(.4, radius / Math.hypot(...prev.map((v, i) => v - corner[i]))));
      const after = mix(corner, next, Math.min(.4, radius / Math.hypot(...next.map((v, i) => v - corner[i]))));
      path.push(before);
      for (let n = 1; n <= 8; n++) { const t = n / 8; path.push(before.map((v, i) => (1 - t) * (1 - t) * v + 2 * (1 - t) * t * corner[i] + t * t * after[i])); }
    }
    path.push(points[points.length - 1]);
    return path;
  }
  // The pipe is built in true space (heights stretched here rather than by the world group) so its bore stays round.
  const trueSpace = p => new THREE.Vector3(p[0], p[1] * K, p[2]);
  const ring = (p, dir, r, tube, mat) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 10, 32), mat);
    m.position.copy(trueSpace(p)); m.lookAt(m.position.clone().add(dir)); m.castShadow = true;
    scene.add(m);
  };
  const runs = transport.tubes.map(tube => {
    const path = rounded(tube.points), curve = new THREE.CurvePath();
    for (let i = 1; i < path.length; i++) curve.add(new THREE.LineCurve3(trueSpace(path[i - 1]), trueSpace(path[i])));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, path.length * 3), R, 18, false), glass);
    mesh.renderOrder = 3;
    scene.add(mesh);
    const ends = [[tube.points[0], tube.points[1]], [tube.points[tube.points.length - 1], tube.points[tube.points.length - 2]]];
    ends.forEach(([p, q], i) => { if (!(i === 0 && tube.noCap0)) ring(p, trueSpace(p).sub(trueSpace(q)).normalize(), R + .02, .07, brass); });
    (tube.floorRings || []).forEach(p => ring(p, new THREE.Vector3(0, 1, 0), R + .1, .08, brass));
    const segments = [];
    let total = 0;
    for (let i = 1; i < path.length; i++) { const len = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1], path[i][2] - path[i - 1][2]); segments.push({ a: path[i - 1], b: path[i], len }); total += len; }
    return { tube, segments, total };
  });
  const belts = transport.belts.map(b => {
    const length = Math.abs(b.x2 - b.x1), mid = (b.x1 + b.x2) / 2;
    [b.x1, b.x2].forEach(x => box(world, x - Math.sign(b.x2 - b.x1) * .25 * (x === b.x1 ? -1 : 1), b.floor, b.z, .12, b.height - .1, .5, '#344a40'));
    box(world, mid, b.floor + b.height - .18, b.z, length, .16, b.width, '#536c5b');
    box(world, mid, b.floor + b.height - .02, b.z, length - .1, .04, b.width - .2, '#2a4035', { cast: false });
    return b;
  });
  const STAGE_COLOURS = ['#7fae5a', '#5f9a48', '#9bbd6a', '#c99460', '#c99460', '#c99460'];
  const pods = new THREE.InstancedMesh(new THREE.SphereGeometry(.2, 12, 8), new THREE.MeshLambertMaterial({ color: '#ffffff' }), 64);
  pods.castShadow = true; pods.count = 0; pods.renderOrder = 2;
  pods.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(pods);
  const m = new THREE.Matrix4(), c = new THREE.Color();
  function place(x, y, z, stage) {
    if (pods.count >= 64) return;
    m.makeTranslation(x, y * K, z); pods.setMatrixAt(pods.count, m); pods.setColorAt(pods.count, c.set(STAGE_COLOURS[stage] || '#c99460')); pods.count++;
  }
  return {
    update({ odo, running }) {
      pods.count = 0;
      runs.forEach(({ tube, segments, total }) => {
        const span = tube.window ? tube.window.total : total, start = tube.window ? tube.window.offset : 0;
        const count = Math.max(2, Math.round(span / transport.gap)), spacing = span / count, o = running[tube.stage] ? odo : 0;
        for (let k = 0; k < count; k++) {
          let d = (o + k * spacing) % span - start;
          if (d < 0 || d >= total) continue;
          for (const part of segments) { if (d > part.len) { d -= part.len; continue; } const q = mix(part.a, part.b, d / part.len); place(q[0], q[1] - .05, q[2], tube.cargoStage); break; }
        }
      });
      belts.forEach(b => {
        const run = Math.abs(b.x2 - b.x1), count = Math.max(2, Math.round(run / transport.gap)), o = running[b.stage] ? odo : 0, forward = Math.sign(b.x2 - b.x1);
        for (let k = 0; k < count; k++) place(b.x1 + forward * ((o + k * run / count) % run), b.floor + b.height + .2, b.z, b.stage);
      });
      pods.instanceMatrix.needsUpdate = true;
      if (pods.instanceColor) pods.instanceColor.needsUpdate = true;
    }
  };
}
