// The 3D map (the only map since the 2D one was removed on 2026-10-19). It draws the main shop's city block as a
// Three.js scene through an orthographic camera matched pixel for pixel to the 2D map's project() (see camera.js), so
// the game's pan, zoom, taps and DOM tags keep working unchanged. This phase is a grey-box: the plaza, sunken streets,
// terraces, trees and lamps, the shop's three floors and walls, the stations, people and cars as simple solids, lit
// by the one sun every sprite was rendered under. Blender models replace the solids station by station later.
//
// Nothing here reads or writes game state: main.js hands over the layout once and a frame description every frame.
// This module is loaded on demand and imports only Three.js, so it never pulls the game's own modules into its chunk.
import * as THREE from 'three';
import { buildShell } from './shell.js';
import { buildRooftop } from './rooftop.js';
import { buildEntrance } from './entrance.js';
import { createBranchLayer } from './branch3d.js';
import { rigStation, bindStation, moveStation } from './station-motion.js';
import { compactModel } from './compact.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { createMapCamera, frameMapCamera, HEIGHT_SCALE } from './camera.js';

// Blender models are built in metres; the map draws 1.69 units a metre (layout.fixtures use the same scale).
const BLENDER_SCALE = 1.69;
const MAX_PEOPLE = 160, MAX_CARS = 32;
const SUN_COLOUR = '#fff1d6', SKY = '#fffaf0', BOUNCE = '#b8ad94';

export function createMap3D(canvas, layout) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.localClippingEnabled = true; // the shell's big fans are cut along the roof's far edge (shell.js)
  } catch (e) { return null; }
  if (!renderer.getContext()) return null;
  // Files still loading (models and textures), so scripts/snap3d.mjs knows when a capture shows the finished scene.
  let loading = 0;
  const loads = THREE.DefaultLoadingManager, track = (url, done, total) => { loading = total - done; };
  loads.onStart = loads.onProgress = track;
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
    const m = hazed(colour, opts);
    materials.set(key, m);
    return m;
  }
  function hazed(colour, opts = {}) {
    return withHaze(new THREE.MeshLambertMaterial({ color: colour, ...opts }));
  }
  function withHaze(m) {
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
    return m;
  }
  // Floor textures (the 2D map's own tiles), laid in world units so neighbouring slabs line up: a box's top face runs
  // u along x and v against z.
  const floorImages = {}, textureLoader = new THREE.TextureLoader();
  function floorTexture(name) {
    const spec = (layout.floorTextures || {})[name];
    if (!spec) return null;
    if (!floorImages[name]) {
      floorImages[name] = textureLoader.load(new URL(spec.url, document.baseURI).href);
      floorImages[name].colorSpace = THREE.SRGBColorSpace;
      floorImages[name].wrapS = floorImages[name].wrapT = THREE.RepeatWrapping;
      floorImages[name].anisotropy = 8;
    }
    return { base: floorImages[name], size: spec.size };
  }
  function textured(mesh, name) {
    const t = floorTexture(name);
    if (!t) return mesh;
    const map = t.base.clone(), w = mesh.scale.x, d = mesh.scale.z;
    map.repeat.set(w / t.size, d / t.size);
    map.offset.set((mesh.position.x - w / 2) / t.size, -(mesh.position.z + d / 2) / t.size);
    // A clone shares its source with the loading texture, so it uploads when the image arrives.
    mesh.material = hazed('#ffffff', { map });
    return mesh;
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

  // Blender models placed by their own origin at the fixtures' Blender-to-map scale (1.69 map units a metre, heights
  // un-stretched against the world's height scale). onReady gets the scene once it is in the world, so the code-built
  // stand-in it replaces can be hidden; until then (or if it fails) the stand-in shows.
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  // Each loaded model remembers its file, for the per-model numbers in stats(). Its own setup (rigging, compactModel's
  // merge) waits in a queue that runs a few milliseconds a frame, so models that arrive together are set up over
  // several frames instead of stalling one.
  const loadFile = loader.load.bind(loader), setups = [];
  let setupPump = 0;
  function runSetups() {
    setupPump = 0;
    const until = performance.now() + 6;
    do {
      const job = setups.shift();
      try { job(); } catch (e) { console.warn('3D map: model setup failed', e); }
    } while (setups.length && performance.now() < until);
    if (setups.length) setupPump = requestAnimationFrame(runSetups);
  }
  loader.load = (url, onLoad, onProgress, onError) => loadFile(url, gltf => {
    gltf.scene.userData.file = url.split('/').pop();
    setups.push(() => onLoad(gltf));
    if (!setupPump) setupPump = requestAnimationFrame(runSetups);
  }, onProgress, onError);
  function model(file, x, y, z, onReady, parent = world) {
    loader.load(layout.modelBase + file, gltf => {
      prepare(gltf.scene);
      const holder = new THREE.Group();
      holder.add(gltf.scene);
      holder.scale.set(BLENDER_SCALE, BLENDER_SCALE / HEIGHT_SCALE, BLENDER_SCALE);
      holder.position.set(x, y, z);
      parent.add(holder);
      if (onReady) onReady(gltf.scene, holder);
      compactModel(gltf.scene);
    }, undefined, e => console.warn('3D map: could not load ' + file, e));
  }
  const lampStandIns = [];
  const terraces = buildTown(world, layout, { box, span, material, textured, lampStandIns });
  buildShop(world, layout, { box, span, material, textured, model });
  const transport = buildTransport(scene, world, layout.transport, { box, material });
  const shell = buildShell(world, layout, { box, span, material, model });
  const rooftop = buildRooftop(world, layout, { box, span, material });
  buildEntrance(world, layout, { box, span, material, model });

  // Stations: one solid per station slot, resized and recoloured from the frame (tier, built, rising in).
  let lastStep = 0;
  const stationMeshes = [], selectionRing = new THREE.Mesh(new THREE.RingGeometry(.86, 1, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#e2c68a', transparent: true, opacity: .85, depthWrite: false }));
  selectionRing.renderOrder = 2;
  world.add(selectionRing);
  const TIER_COLOURS = ['#d8cfbd', '#b8cdb2', '#9cc4b8', '#e2c68a'];
  function stationMesh(i) {
    if (!stationMeshes[i]) {
      const group = new THREE.Group(), body = box(group, 0, 0, 0, 1, 1, 1, TIER_COLOURS[1]), top = box(group, 0, 1, 0, 1, .08, 1, '#efe7d4');
      group.userData = { body, top };
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
  if (rooftop) rooftop.loadModels(loader, layout.modelBase);
  // Fixtures (the online orders deck) are placed by their own origin at a fixed Blender-to-map scale rather than
  // fitted to a sprite, since their footprint is irregular; `key` names the frame flag that shows them.
  const fixtures = {}, fixtureGlows = [], fixtureScreens = [];
  (layout.fixtures || []).forEach(f => {
    loader.load(layout.modelBase + f.file, gltf => {
      prepare(gltf.scene);
      // Parts a fixture's model has that the map draws differently (f.hide, by object name).
      (f.hide || []).forEach(name => { const o = gltf.scene.getObjectByName(name); if (o) o.visible = false; });
      // Backlit panels (f.glow names the material): a soft warm light from behind, faint by day and fuller at night.
      if (f.glow) gltf.scene.traverse(o => { const m = o.isMesh && o.material; if (m && m.name === f.glow && !fixtureGlows.includes(m)) { m.emissive.set('#ffe3b0'); fixtureGlows.push(m); } });
      // Screens (f.screen names the material): the picture itself glows, brighter after dark.
      if (f.screen) gltf.scene.traverse(o => { const m = o.isMesh && o.material; if (m && m.name === f.screen && !fixtureScreens.includes(m)) { m.emissive.set('#ffffff'); m.emissiveMap = m.map; m.needsUpdate = true; fixtureScreens.push(m); } });
      compactModel(gltf.scene);
      const holder = new THREE.Group();
      holder.add(gltf.scene);
      holder.scale.set(f.scale, f.scale / HEIGHT_SCALE, f.scale);
      holder.position.set(f.x, f.y, f.z);
      holder.visible = false;
      world.add(holder);
      fixtures[f.key] = holder;
    }, undefined, e => console.warn('3D map: could not load ' + f.file, e));
  });
  // Loaded on first need, so a shop only fetches the tiers it shows.
  const requested = {};
  function requestModel(index) {
    const file = (layout.stationModels || {})[index];
    if (!file || requested[index]) return;
    requested[index] = true;
    loader.load(layout.modelBase + file, gltf => {
      const source = gltf.scene, bounds = new THREE.Box3().setFromObject(source), size = bounds.getSize(new THREE.Vector3()), centre = bounds.getCenter(new THREE.Vector3());
      const spec = layout.stationModelSize[index] || { w: size.x + size.z, ox: 0 }, s = spec.w / ((size.x + size.z) * Math.SQRT1_2);
      source.position.set(-centre.x, -bounds.min.y, -centre.z);
      prepare(source);
      rigStation(source, +index.split('.')[0]);
      compactModel(source);
      const holder = new THREE.Group();
      holder.add(source);
      holder.scale.set(s, s / HEIGHT_SCALE, s);
      // The sprite's sideways nudge, along screen right.
      holder.position.set(spec.ox * Math.SQRT1_2, 0, -spec.ox * Math.SQRT1_2);
      // A model built facing another way is turned about its centre (spec.turn, radians about the vertical).
      if (spec.turn) holder.rotation.y = spec.turn;
      models[index] = holder;
    }, undefined, e => console.warn('3D map: could not load ' + file, e));
  }

  // Station pictures for the menus (the station tabs and the upgrade panel): the station's Blender model seen from the
  // map's own camera angle in a small sunlit scene, rendered off screen once per model and kept as a 2D canvas, so the
  // menus show what the map shows. Returns null (and starts the load) until the model is in.
  const pictures = {}, pictureCamera = createMapCamera(), pictureScene = new THREE.Scene();
  pictureScene.add(new THREE.HemisphereLight(SKY, BOUNCE, 1.7));
  const pictureSun = new THREE.DirectionalLight(SUN_COLOUR, 2.1); pictureSun.position.copy(toSun).multiplyScalar(50); pictureScene.add(pictureSun);
  function stationPicture(key) {
    if (pictures[key]) return pictures[key];
    if (!models[key]) { requestModel(key); return null; }
    return (pictures[key] = renderPicture(models[key].clone(), 480, 600));
  }
  // The rooftop lounge as the map shows it at that tier (rooftop.js poses and trims a copy), wider than a station.
  // Null until the tier's Blender furniture is in.
  function loungePicture(tier, lifts) {
    tier = Math.min(8, Math.max(1, tier || 1));
    const key = 'lounge.' + tier + '.' + (lifts ? 2 : 1);
    if (pictures[key]) return pictures[key];
    const copy = rooftop && rooftop.pictureCopy(tier, lifts);
    return copy ? (pictures[key] = renderPicture(copy, 600, 480)) : null;
  }
  // A fixture (the online deck) by itself, as the map shows it once built. Null until its model is in.
  function fixturePicture(key) {
    if (pictures['fixture.' + key]) return pictures['fixture.' + key];
    if (!fixtures[key]) return null;
    const copy = fixtures[key].clone(); copy.visible = true;
    return (pictures['fixture.' + key] = renderPicture(copy, 600, 480));
  }
  // Renders an object (in map units, before the world's height stretch) from the map's camera into a W×H canvas,
  // framing its projected outline with a small margin.
  function renderPicture(object, W, H) {
    const stretch = new THREE.Group();
    stretch.scale.y = HEIGHT_SCALE; stretch.add(object); pictureScene.add(stretch);
    stretch.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(stretch), corners = [];
    for (let k = 0; k < 8; k++) corners.push(new THREE.Vector3(k & 1 ? box.max.x : box.min.x, k & 2 ? box.max.y : box.min.y, k & 4 ? box.max.z : box.min.z));
    pictureCamera.updateMatrixWorld(true);
    const inv = pictureCamera.matrixWorldInverse, xs = [], ys = [];
    corners.forEach(c => { c.applyMatrix4(inv); xs.push(c.x); ys.push(c.y); });
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const half = Math.max((Math.max(...xs) - Math.min(...xs)) / 2 / W * H, (Math.max(...ys) - Math.min(...ys)) / 2) * 1.04;
    pictureCamera.left = cx - half * W / H; pictureCamera.right = cx + half * W / H; pictureCamera.top = cy + half; pictureCamera.bottom = cy - half;
    pictureCamera.updateProjectionMatrix();
    const target = new THREE.WebGLRenderTarget(W, H, { samples: 4 });
    target.texture.colorSpace = THREE.SRGBColorSpace;
    const clear = renderer.getClearColor(new THREE.Color()), alpha = renderer.getClearAlpha(), shadows = renderer.shadowMap.enabled;
    renderer.shadowMap.enabled = false;
    renderer.setRenderTarget(target); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(pictureScene, pictureCamera);
    const pixels = new Uint8Array(W * H * 4);
    renderer.readRenderTargetPixels(target, 0, 0, W, H, pixels);
    renderer.setRenderTarget(null); renderer.setClearColor(clear, alpha); renderer.shadowMap.enabled = shadows;
    target.dispose(); pictureScene.remove(stretch);
    // GL rows run bottom-up.
    const picture = document.createElement('canvas'); picture.width = W; picture.height = H;
    const pc = picture.getContext('2d'), image = pc.createImageData(W, H);
    for (let y = 0; y < H; y++) image.data.set(pixels.subarray((H - 1 - y) * W * 4, (H - y) * W * 4), y * W * 4);
    pc.putImageData(image, 0, 0);
    return picture;
  }

  // People and cars move every frame, so they are instanced: one draw call for all of them.
  const personGeometry = new THREE.CapsuleGeometry(.24, 1.55, 4, 10).translate(0, 1.03, 0);
  const people = new THREE.InstancedMesh(personGeometry, material('#ffffff', { name: 'people' }), MAX_PEOPLE);
  people.castShadow = true; people.count = 0;
  // Figures: the people sprites as upright cards (main.js records where the 2D map would draw each one). They carry
  // their own painted light, so they are unlit; the capsules underneath only cast the shadows.
  const textures = new Map(), cards = [];
  const cardIndex = new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 0, 2, 3]), 1);
  // Every walk frame of every person is its own picture, so a long session would upload hundreds of them and keep them
  // all on the GPU: a picture not drawn for a while gives its GPU copy back (and uploads again if it comes back).
  const TEXTURE_IDLE = 8000;
  let textureSweep = 0, frameClock = 0;
  function texture(img) {
    let t = textures.get(img);
    if (!t) { t = new THREE.Texture(img); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true; textures.set(img, t); }
    t.userData.used = frameClock;
    return t;
  }
  function sweepTextures() {
    if (frameClock - textureSweep < 2000) return;
    textureSweep = frameClock;
    textures.forEach((t, img) => { if (frameClock - t.userData.used > TEXTURE_IDLE) { t.dispose(); textures.delete(img); } });
  }
  // Terraces: their renders are drawn first as backdrops (no depth test) and their solids only write depth, so the
  // render shows wherever nothing nearer stands, and anything behind a terrace stays hidden by it.
  const backdrops = [];
  function backdrop(i) {
    if (!backdrops[i]) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(8), 2));
      g.setIndex(cardIndex);
      const mesh = new THREE.Mesh(g, withHaze(new THREE.MeshBasicMaterial({ alphaTest: .5, side: THREE.DoubleSide, depthTest: false, depthWrite: false })));
      mesh.frustumCulled = false; mesh.renderOrder = -1;
      world.add(mesh);
      backdrops[i] = mesh;
    }
    return backdrops[i];
  }
  function card(i) {
    if (!cards[i]) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(8), 2));
      g.setIndex(cardIndex);
      const mesh = new THREE.Mesh(g, withHaze(new THREE.MeshBasicMaterial({ alphaTest: .5, side: THREE.DoubleSide })));
      mesh.frustumCulled = false;
      world.add(mesh);
      cards[i] = mesh;
    }
    return cards[i];
  }
  // Flat renders from the 2D map: the storefront's elevations on the entrance wall's plane, and the mats on the floor,
  // pinned by three image points to three floor points as the 2D map pins them. The elevations carry their own
  // painted light like the figures; the mats are lit like the floor they lie on.
  const flatMeshes = [], decals = [];
  function flatMesh(url, lit, build) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(8), 2));
    g.setIndex(cardIndex);
    const opts = { alphaTest: .5, side: THREE.DoubleSide };
    const mat = withHaze(lit ? new THREE.MeshLambertMaterial({ ...opts, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }) : new THREE.MeshBasicMaterial(opts));
    const mesh = new THREE.Mesh(g, mat);
    mesh.visible = false; mesh.frustumCulled = false; mesh.receiveShadow = lit;
    world.add(mesh);
    textureLoader.load(new URL(url, document.baseURI).href, t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
      const [points, uvs] = build(t.image);
      g.attributes.position.array.set(points); g.attributes.position.needsUpdate = true;
      g.attributes.uv.array.set(uvs); g.attributes.uv.needsUpdate = true;
      g.computeVertexNormals();
      mat.map = t; mat.needsUpdate = true; mesh.userData.ready = true;
    }, undefined, () => console.warn('3D map: could not load ' + url));
    return mesh;
  }
  (layout.wallFaces || []).forEach(w => {
    const mesh = flatMesh(w.url, false, () => [
      [w.x0, w.y0, w.z0, w.x1, w.y0, w.z1, w.x1, w.y0 + w.h, w.z1, w.x0, w.y0 + w.h, w.z0], [0, 0, 1, 0, 1, 1, 0, 1]]);
    mesh.userData.model = w.model;
    flatMeshes.push(mesh);
  });
  (layout.decals || []).forEach(d => {
    const mesh = flatMesh(d.url, true, img => {
      // Image points (v down) to floor points: an affine map fixed by the three pins, applied to the image's corners.
      const n = d.pixels ? d.image.map(([u, v]) => [u / img.naturalWidth, v / img.naturalHeight]) : d.image;
      const [p0, p1, p2] = n, [w0, w1, w2] = d.world;
      const a = p1[0] - p0[0], b = p2[0] - p0[0], c = p1[1] - p0[1], e = p2[1] - p0[1], det = a * e - b * c;
      const at = (u, v) => {
        const du = u - p0[0], dv = v - p0[1], s = (e * du - b * dv) / det, t = (a * dv - c * du) / det;
        return [w0[0] + (w1[0] - w0[0]) * s + (w2[0] - w0[0]) * t, .012, w0[1] + (w1[1] - w0[1]) * s + (w2[1] - w0[1]) * t];
      };
      return [[...at(0, 1), ...at(1, 1), ...at(1, 0), ...at(0, 0)], [0, 0, 1, 0, 1, 1, 0, 1]];
    });
    mesh.userData.show = d.show;
    decals.push(mesh);
  });
  // Solids that only cast the shadows of renders standing over them (the display case).
  (layout.casters || []).forEach(c => box(world, c.x, 0, c.z, c.w, c.h, c.d, '#ffffff', { receive: false, opts: { name: 'street' } }));
  // Queue ropes: sagging cords between the posts, rebuilt only when the pens change; thin hidden posts cast shadows.
  const ropes = new THREE.Group();
  world.add(ropes);
  let ropeKey = '';
  function buildRopes(list) {
    ropes.children.forEach(c => c.geometry.dispose());
    ropes.clear();
    const posts = new Set();
    list.forEach(r => {
      const curve = new THREE.CatmullRomCurve3(r.points.map(p => new THREE.Vector3(p[0], p[1], p[2])));
      const cord = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, .045, 8, false), material(r.colour));
      cord.castShadow = true; ropes.add(cord);
      [r.points[0], r.points[r.points.length - 1]].forEach(p => {
        const key = p[0].toFixed(2) + ',' + p[2].toFixed(2);
        if (posts.has(key)) return;
        posts.add(key);
        const post = new THREE.Mesh(unitBox.clone(), material('#ffffff', { name: 'street' }));
        post.position.set(p[0], 0, p[2]); post.scale.set(.07, 1, .07); post.castShadow = true;
        ropes.add(post);
      });
    });
  }

  people.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  world.add(people);
  const carBodies = new THREE.InstancedMesh(unitBox, material('#ffffff', { name: 'street' }), MAX_CARS), carCabins = new THREE.InstancedMesh(unitBox, material('#dfe8ea', { name: 'street' }), MAX_CARS);
  [carBodies, carCabins].forEach(m => { m.castShadow = true; m.count = 0; m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); world.add(m); });
  // Blender cars (layout.carModels): one car and one van, copied per car with its own paint, nose along +x at the
  // shared Blender scale, and the wheels turned by the distance driven. The boxes stand in until both have loaded.
  const CAR_SCALE = 1.69, axle = new THREE.Vector3(0, 0, 1), spin = new THREE.Quaternion();
  const carSources = {}, carCopies = [];
  Object.entries(layout.carModels || {}).forEach(([kind, file]) => loader.load(layout.modelBase + file, gltf => {
    prepare(gltf.scene);
    compactModel(gltf.scene);
    const wheel = gltf.scene.getObjectByName('WheelFL');
    carSources[kind] = { scene: gltf.scene, radius: wheel ? new THREE.Box3().setFromObject(wheel).getSize(new THREE.Vector3()).y / 2 : .25 };
  }, undefined, e => console.warn('3D map: could not load ' + file, e)));
  // Street props (main.js passes frame.props: file, feet and turn, from the street's jobs and the queue posts). Each
  // file loads on first need and is baked into one geometry per material, drawn instanced over all its placements, so
  // forty props cost a few dozen draws rather than a thousand. Lamps glow through their LampGlow material after dark.
  const MAX_PROPS = 64, propSources = {}, propRequested = {}, glowMaterials = new Set();
  function bake(root) {
    root.updateMatrixWorld(true);
    const byMaterial = new Map();
    root.traverse(o => {
      if (!o.isMesh) return;
      let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      // A mirrored part (negative scale) turns its triangles inside out once baked: three.js flips the facing for a
      // mirrored object it draws, but not for one merged into a plain geometry, so wind those back.
      if (o.matrixWorld.determinant() < 0) Object.values(g.attributes).forEach(a => {
        for (let t = 0; t < a.count; t += 3) for (let k = 0; k < a.itemSize; k++) {
          const v = a.getComponent(t + 1, k); a.setComponent(t + 1, k, a.getComponent(t + 2, k)); a.setComponent(t + 2, k, v);
        }
      });
      Object.keys(g.attributes).forEach(k => { if (k !== 'position' && k !== 'normal' && k !== 'uv') g.deleteAttribute(k); });
      if (!g.attributes.normal) g.computeVertexNormals();
      if (!byMaterial.has(o.material)) byMaterial.set(o.material, []);
      byMaterial.get(o.material).push(g);
    });
    const parts = [...byMaterial].map(([mat, list]) => {
      // Parts merge only with the attributes they all share.
      if (list.some(g => !g.attributes.uv)) list.forEach(g => g.deleteAttribute('uv'));
      const mesh = new THREE.InstancedMesh(mergeGeometries(list), withHaze(mat), MAX_PROPS);
      mesh.count = 0; mesh.castShadow = mesh.receiveShadow = true; mesh.frustumCulled = false; mesh.userData.file = root.userData.file;
      // Props stay in the scene on a branch visit: the branch scenes place them too.
      mesh.userData.prop = true;
      world.add(mesh);
      return mesh;
    });
    // The model's own footprint, for props fitted to a slot (p.fit).
    parts.box = new THREE.Box3().setFromObject(root);
    return parts;
  }
  function propReady(file) {
    if (!propRequested[file]) {
      propRequested[file] = true;
      // `file#low` is the model without its tree (Crown*, Trunk* parts): the shop planters along the floor's front
      // edges keep only their shrubs so they never hide the queue behind them.
      const [url, variant] = file.split('#');
      loader.load(layout.modelBase + url, gltf => {
        prepare(gltf.scene);
        // `file#lawn` is a tree without its paved pit (Pit* parts), for trees standing in grass.
        if (variant === 'low' || variant === 'lawn') {
          const drop = [], parts = variant === 'low' ? /^(Crown|Trunk)/ : /^Pit/;
          gltf.scene.traverse(o => { if (parts.test(o.name)) drop.push(o); });
          drop.forEach(o => o.parent && o.parent.remove(o));
        }
        gltf.scene.traverse(o => {
          if (!o.isMesh) return;
          if (o.material.name === 'LampGlow') glowMaterials.add(o.material);
          // With no environment to reflect, full metal renders near black; the posts' brass and the lamps' iron keep
          // their colour under the sun at a lower metalness.
          if (o.material.metalness > .5) { o.material.metalness = .35; o.material.roughness = Math.max(.35, o.material.roughness); }
        });
        propSources[file] = bake(gltf.scene);
      }, undefined, e => console.warn('3D map: could not load ' + file, e));
    }
    return !!propSources[file];
  }
  const propScale = new THREE.Vector3(CAR_SCALE, CAR_SCALE / HEIGHT_SCALE, CAR_SCALE), propTurn = new THREE.Quaternion(), yAxis = new THREE.Vector3(0, 1, 0);
  const fitScale = new THREE.Vector3();
  function placeProps(props, night) {
    Object.values(propSources).forEach(parts => parts.forEach(m => { m.count = 0; }));
    (props || []).forEach(p => {
      const parts = propSources[p.file];
      if (!parts || parts[0].count >= MAX_PROPS) return;
      propTurn.setFromAxisAngle(yAxis, p.rot || 0);
      position.set(p.x, p.y === undefined ? layout.plazaY : p.y, p.z);
      // p.scale: one factor, or [x, y, z] factors in the model's own axes (a footbridge stretched to its span).
      if (Array.isArray(p.scale)) matrix.compose(position, propTurn, fitScale.set(propScale.x * p.scale[0], propScale.y * p.scale[1], propScale.z * p.scale[2]));
      else if (p.scale) matrix.compose(position, propTurn, fitScale.copy(propScale).multiplyScalar(p.scale));
      else if (p.fit) {
        // A terrace fills its render's footprint exactly (cornices, stoops and awnings included), so neighbours butt
        // the way the 2D renders do instead of running into each other; it keeps its front's proportions.
        const b = parts.box, sx = p.fit.w / (b.max.x - b.min.x), sz = p.fit.d / (b.max.z - b.min.z);
        position.x -= (b.min.x + b.max.x) / 2 * sx; position.z -= (b.min.z + b.max.z) / 2 * sz;
        matrix.compose(position, propTurn, fitScale.set(sx, sx / HEIGHT_SCALE, sz));
      } else matrix.compose(position, propTurn, propScale);
      parts.forEach(m => m.setMatrixAt(m.count++, matrix));
    });
    // An unused prop is hidden rather than drawn zero times, which still costs its state changes.
    Object.values(propSources).forEach(parts => parts.forEach(m => { m.instanceMatrix.needsUpdate = true; m.visible = m.count > 0; }));
    glowMaterials.forEach(m => { m.emissive.set('#ffd9a0'); m.emissiveIntensity = night * 2.5; });
  }
  const carsModelled = () => !!layout.carModels && Object.keys(layout.carModels).every(k => carSources[k]);
  function carCopy(i, c) {
    const kind = c.van ? 'van' : 'car', source = carSources[kind];
    let copy = carCopies[i];
    if (copy && copy.kind === kind && copy.paint === c.paint) return copy;
    if (copy) world.remove(copy.holder);
    const holder = new THREE.Group(), body = source.scene.clone(true);
    body.traverse(o => { if (o.isMesh && /Paint$/.test(o.material.name)) { o.material = o.material.clone(); o.material.color.set(c.paint); } });
    holder.add(body);
    holder.scale.set(CAR_SCALE, CAR_SCALE / HEIGHT_SCALE, CAR_SCALE);
    world.add(holder);
    const wheels = ['WheelFL', 'WheelFR', 'WheelBL', 'WheelBR'].map(n => body.getObjectByName(n)).filter(Boolean).map(w => ({ w, rest: w.quaternion.clone() }));
    return (carCopies[i] = { kind, paint: c.paint, holder, wheels, radius: source.radius });
  }

  const matrix = new THREE.Matrix4(), position = new THREE.Vector3(), scale = new THREE.Vector3(), quaternion = new THREE.Quaternion(), colour = new THREE.Color();
  const dayHemi = hemi.intensity, daySun = sun.intensity, nightSky = new THREE.Color('#2b3a48'), daySky = hazeColour.clone();
  let lost = false;
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); lost = true; });
  canvas.addEventListener('webglcontextrestored', () => { lost = false; });

  // The figures (people and street renders recorded from the 2D map) as cards, darkened with the night.
  let shade = 1;
  const place = (f, mesh) => {
    const g = mesh.geometry, pos = g.attributes.position, uv = g.attributes.uv, [u0, v0, u1, v1] = f.uv;
    pos.array.set(f.points); pos.needsUpdate = true;
    uv.array.set([u0, v0, u1, v0, u1, v1, u0, v1]); uv.needsUpdate = true;
    const mat = mesh.material, map = texture(f.img), fade = f.alpha < 1;
    // Swapping one picture for another needs no new shader; only gaining a map does.
    if (mat.map !== map) { if (!mat.map) mat.needsUpdate = true; mat.map = map; }
    if (mat.transparent !== fade) { mat.transparent = fade; mat.needsUpdate = true; }
    mat.opacity = f.alpha; mat.color.setScalar(shade);
    mesh.visible = true;
  };
  function placeFigures(figures, night) {
    shade = 1 - night * .55;
    figures.forEach((f, i) => place(f, card(i)));
    for (let i = figures.length; i < cards.length; i++) cards[i].visible = false;
  }

  // Size, camera, sun and the day-night light, shared by the main map and the branch scenes.
  function view(frame, background) {
    frameClock = performance.now();
    sweepTextures();
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
    scene.background.copy(background).lerp(nightSky, night);
    hazeUniforms.hazeColour.value.copy(scene.background);
    return night;
  }

  // A branch visit hides the main block (every object but the lights, the figures, the props and the branch layer)
  // and shows the branch's own scene, recorded from its 2D drawing each frame (branch3d.js). The plot sits in open
  // land of its own ground colour (frame.land, BRANCH_THEMES in branch-maps.js) that fades into the same sunny haze as
  // the main block's edges, with its river or creek running on out of the plot, instead of floating on a dark ground.
  const branch = createBranchLayer(world), hiddenForBranch = [], branchBackground = new THREE.Color(), lands = {}, mainHaze = [hazeUniforms.hazeX.value.clone(), hazeUniforms.hazeZ.value.clone()];
  let inBranch = false, land = null;
  function branchMode(on) {
    if (on === inBranch) return;
    inBranch = on;
    if (on) {
      const keep = new Set([world, hemi, sun, sun.target, branch.group, ...cards]);
      [...scene.children, ...world.children].forEach(o => { if (!keep.has(o) && !o.userData.prop && !o.userData.land && o.visible) { o.visible = false; hiddenForBranch.push(o); } });
      backdrops.forEach(b => { b.visible = false; });
    } else {
      hiddenForBranch.forEach(o => { o.visible = true; });
      hiddenForBranch.length = 0;
      if (land) land.visible = false;
      land = null;
      hazeUniforms.hazeX.value.copy(mainHaze[0]); hazeUniforms.hazeZ.value.copy(mainHaze[1]);
    }
    branch.group.visible = on;
  }
  const LAND_REACH = 90, HAZE_FROM = 2, HAZE_TO = 13;
  // Axis-aligned rectangles [x0, x1, z0, z1] less one rectangle: up to four pieces round the hole.
  function subtract(rects, [hx0, hx1, hz0, hz1]) {
    const out = [];
    rects.forEach(([x0, x1, z0, z1]) => {
      if (hx0 >= x1 || hx1 <= x0 || hz0 >= z1 || hz1 <= z0) { out.push([x0, x1, z0, z1]); return; }
      if (hz0 > z0) out.push([x0, x1, z0, hz0]);
      if (hz1 < z1) out.push([x0, x1, hz1, z1]);
      const a = Math.max(z0, hz0), b = Math.min(z1, hz1);
      if (hx0 > x0) out.push([x0, hx0, a, b]);
      if (hx1 < x1) out.push([hx1, x1, a, b]);
    });
    return out;
  }
  function buildLand(spec) {
    const group = new THREE.Group(), [px0, px1, pz0, pz1] = spec.plot, cx = (px0 + px1) / 2, cz = (pz0 + pz1) / 2, R = LAND_REACH;
    group.userData.land = true;
    let ground = subtract([[cx - R, cx + R, cz - R, cz + R]], spec.plot);
    // Strips (a river, a creek, a street) run on out of the plot to the haze; an end left open runs all the way.
    const strips = spec.strips || [], rivers = strips.map(w => [w.x0 === undefined ? cx - R : w.x0, w.x1 === undefined ? cx + R : w.x1, w.z0 === undefined ? cz - R : w.z0, w.z1 === undefined ? cz + R : w.z1]);
    rivers.forEach(r => { ground = subtract(ground, r); });
    ground.forEach(([x0, x1, z0, z1]) => span(group, x0, x1, spec.y - 1.2, spec.y, z0, z1, spec.colour, { cast: false }));
    strips.forEach((w, i) => subtract([rivers[i]], spec.plot).forEach(([x0, x1, z0, z1]) => span(group, x0, x1, spec.y - 1.2, w.y, z0, z1, w.colour, { cast: false })));
    // A loose belt of trees round the plot, thinning into the haze, so the land reads as countryside. The camera looks
    // in from the +x, +z corner, so the near sides keep their trees far out where they cannot hide the plot.
    const props = [];
    if (spec.trees) {
      let seed = 7;
      const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      for (let i = 0; i < 64; i++) {
        const side = i % 4, near = side === 1 || side === 3, t = rand(), out = near ? 7.5 + rand() * 4 : 2 + rand() * 8;
        const x = side === 0 ? px0 - out : side === 1 ? px1 + out : px0 - 8 + t * (px1 - px0 + 16);
        const z = side === 2 ? pz0 - out : side === 3 ? pz1 + out : pz0 - 8 + t * (pz1 - pz0 + 16);
        if (x > px0 - 1.5 && x < px1 + 1.5 && z > pz0 - 1.5 && z < pz1 + 1.5) continue;
        if ((x > px1 && z > pz1 - 4) || (z > pz1 && x > px1 - 4)) continue;
        if (rivers.some(([x0, x1, z0, z1]) => x > x0 - 1.6 && x < x1 + 1.6 && z > z0 - 1.6 && z < z1 + 1.6)) continue;
        props.push({ file: i % 3 ? 'tree.glb#lawn' : 'street_tree.glb#lawn', x, y: spec.y, z, rot: rand() * 6.28, scale: (near ? .6 : .75) + rand() * .35 });
      }
    }
    // A town plot gets neighbours: the main block's Blender terraces in a row behind it and a column to its left,
    // facing it, fading into the haze (the camera looks in from the other two sides, so they never hide the plot).
    if (spec.town) {
      const kinds = ['building_rowhouse_terracotta', 'building_townhouse_sage', 'building_low_stone', 'building_mid_stone', 'building_apartment_brick', 'building_shop_narrow', 'building_low_tan', 'building_corner'];
      let k = 0;
      for (let x = px0 + 4; x < px1 + 4; x += 10.5) props.push({ file: kinds[k++ % kinds.length] + '.glb', x, y: spec.y, z: pz0 - 6.5, rot: 0 });
      for (let z = pz0 + 2; z < pz1 + 2; z += 10.5) props.push({ file: kinds[k++ % kinds.length] + '.glb', x: px0 - 6.5, y: spec.y, z, rot: Math.PI / 2 });
      props.push({ file: 'building_corner.glb', x: px0 - 6.5, y: spec.y, z: pz0 - 6.5, rot: Math.PI / 4 });
    }
    group.userData.props = props;
    group.userData.haze = [new THREE.Vector4(px0 - HAZE_FROM, px0 - HAZE_TO, px1 + HAZE_FROM, px1 + HAZE_TO), new THREE.Vector4(pz0 - HAZE_FROM, pz0 - HAZE_TO, pz1 + HAZE_FROM, pz1 + HAZE_TO)];
    world.add(group);
    return group;
  }
  function renderBranch(frame) {
    if (lost) return false;
    branchMode(true);
    const next = frame.land ? (lands[frame.landKey] || (lands[frame.landKey] = buildLand(frame.land))) : null;
    if (next !== land) {
      if (land) land.visible = false;
      land = next;
      if (land) { land.visible = true; hazeUniforms.hazeX.value.copy(land.userData.haze[0]); hazeUniforms.hazeZ.value.copy(land.userData.haze[1]); }
    }
    const night = view(frame, land ? daySky : branchBackground.set(frame.background));
    branch.update(frame.branch, night);
    const props = (frame.branch.props || []).concat(land ? land.userData.props : []);
    props.forEach(p => propReady(p.file));
    placeProps(props, night);
    placeFigures(frame.figures || [], night);
    if (!frame.dry) renderer.render(scene, camera);
    return true;
  }

  function render(frame) {
    if (lost) return false;
    branchMode(false);
    const night = view(frame, daySky);

    const clockNow = performance.now(), stepSeconds = Math.min(.1, (clockNow - (lastStep || clockNow)) / 1000);
    lastStep = clockNow;
    let ringShown = false;
    frame.stations.forEach((s, i) => {
      const group = stationMesh(i), { body, top } = group.userData;
      group.visible = s.visible !== false;
      if (!group.visible) return;
      // A built station with a loaded model shows the model (one copy per slot, so the order desks can share one).
      const key = s.index + '.' + Math.max(1, s.tier);
      if (s.built) { requestModel(key); requestModel(s.index + '.3'); }
      const modelKey = models[key] ? key : s.index + '.3';
      const model = s.built && s.index !== undefined && models[modelKey];
      const clones = group.userData.clones || (group.userData.clones = {});
      const rigs = group.userData.rigs || (group.userData.rigs = {});
      if (model && !clones[modelKey]) { group.add(clones[modelKey] = model.clone()); rigs[modelKey] = bindStation(clones[modelKey], s.index); }
      if (model && rigs[modelKey]) moveStation(rigs[modelKey], s, stepSeconds);
      Object.entries(clones).forEach(([k, c]) => { c.visible = !!model && k === modelKey; });
      body.visible = !model;
      const h = s.built ? s.h : .12, lift = s.rise ? -s.rise * s.rise * 1.1 : 0;
      group.position.set(s.x, s.y + lift, s.z);
      // The first-load pop (frame pop, 0 to 1): grows out of the floor with a soft overshoot and settles.
      const pop = s.pop === undefined ? 1 : s.pop, k = pop - 1, grow = pop >= 1 ? 1 : 1 + 2.4 * k * k * k + 1.4 * k * k;
      group.scale.setScalar(Math.max(.001, grow));
      if (pop <= 0) group.visible = false;
      body.scale.set(s.w, h, s.d);
      top.visible = s.built && !model; top.position.y = h; top.scale.set(s.w + .12, .08, s.d + .12);
      body.material = material(s.built ? TIER_COLOURS[Math.min(3, s.tier)] : '#e3b04b');
      if (s.selected && !ringShown && pop >= 1) {
        ringShown = true;
        selectionRing.position.set(s.x, s.y + .03, s.z);
        const r = Math.max(s.w, s.d) * .72;
        selectionRing.scale.set(r, 1, r);
      }
    });
    selectionRing.visible = ringShown;

    const figures = frame.figures || [], shade = 1 - night * .55;
    placeFigures(figures, night);
    // An elevation gives way to its Blender model once that has loaded.
    flatMeshes.forEach(f => { f.visible = !!f.userData.ready && !(f.userData.model && fixtures[f.userData.model]); f.material.color.setScalar(shade); });
    decals.forEach(d => { d.visible = d.userData.ready && (d.userData.show !== 'loungeOpen' || !!frame.loungeOpen); });
    const key = JSON.stringify(frame.ropes || []);
    if (key !== ropeKey) { ropeKey = key; buildRopes(frame.ropes || []); }
    const behind = frame.backdrops || [];
    behind.forEach((f, i) => place(f, backdrop(i)));
    for (let i = behind.length; i < backdrops.length; i++) backdrops[i].visible = false;
    terraces.forEach(t => { t.visible = !propSources[t.userData.model]; t.renderOrder = frame.backdrops ? -2 : 0; t.material.colorWrite = !frame.backdrops; });
    // With figures standing in, the capsules only cast shadows.
    people.material.colorWrite = people.material.depthWrite = !frame.figures;
    materials.forEach((m, key) => { if (key.endsWith('{"name":"street"}')) m.colorWrite = m.depthWrite = !frame.figures; });

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

    placeProps(frame.props, night);
    fixtureGlows.forEach(m => { m.emissiveIntensity = .16 + night * .7; });
    fixtureScreens.forEach(m => { m.emissiveIntensity = .35 + night * .55; });
    lampStandIns.forEach(m => { m.visible = !propSources['street_lamp.glb']; });
    const modelled = carsModelled();
    frame.cars.forEach((c, i) => {
      if (!modelled) return;
      const copy = carCopy(i, c), ax = c.along === 'x';
      copy.holder.visible = true;
      copy.holder.position.set(c.x, layout.streetY, c.z);
      copy.holder.rotation.y = ax ? (c.dir > 0 ? 0 : Math.PI) : (c.dir > 0 ? -Math.PI / 2 : Math.PI / 2);
      // Rolling forward along +x turns the wheels clockwise about the axle (z) as seen from +z.
      spin.setFromAxisAngle(axle, -c.roll / (copy.radius * CAR_SCALE));
      copy.wheels.forEach(({ w, rest }) => w.quaternion.multiplyQuaternions(spin, rest));
    });
    for (let i = modelled ? frame.cars.length : 0; i < carCopies.length; i++) if (carCopies[i]) carCopies[i].holder.visible = false;
    carBodies.count = carCabins.count = modelled ? 0 : Math.min(MAX_CARS, frame.cars.length);
    for (let i = 0; i < carBodies.count; i++) {
      const c = frame.cars[i], ax = c.along === 'x', van = c.van, length = van ? 4.6 : 4, wide = 1.8;
      position.set(c.x, layout.streetY + .25, c.z); scale.set(ax ? length : wide, van ? 1.7 : .75, ax ? wide : length);
      carBodies.setMatrixAt(i, matrix.compose(position, quaternion.identity(), scale));
      carBodies.setColorAt(i, colour.set(c.paint));
      position.y += van ? 1.7 : .75; scale.set(ax ? (van ? 1.4 : 2.1) : wide * .86, van ? .05 : .55, ax ? wide * .86 : (van ? 1.4 : 2.1));
      carCabins.setMatrixAt(i, matrix.compose(position, quaternion.identity(), scale));
    }
    [carBodies, carCabins].forEach(m => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; });

    if (transport && frame.cargo) transport.update(frame.cargo, frame.fixtures);
    if (shell) shell.update(frame);
    if (rooftop) rooftop.update(frame);
    Object.entries(fixtures).forEach(([key, holder]) => { holder.visible = !!(frame.fixtures && frame.fixtures[key]); });

    // A dry frame (snap3d.mjs, while models load) sets the scene up and asks for its models without drawing it.
    if (!frame.dry) renderer.render(scene, camera);
    return true;
  }

  // Dev numbers for the ?stats readout (main.js) and scripts: the last frame's draw calls and triangles (shadow pass
  // included), what is on the GPU, and an estimate of its memory: every geometry and texture still in the scene, the
  // shadow map and the drawing buffer.
  function stats(perModel) {
    const info = renderer.info, geometries = new Set(), textures = new Set(), models = {};
    let meshes = 0, visible = 0;
    scene.traverse(o => {
      if (!o.isMesh) return;
      meshes++;
      let shown = true, file = null;
      for (let p = o; p; p = p.parent) { if (!p.visible) shown = false; if (!file && p.userData.file) file = p.userData.file; }
      if (shown) {
        visible++;
        // perModel: meshes and triangles on screen by model file (copies summed).
        if (perModel) {
          const m = models[file || '(code)'] = models[file || '(code)'] || { meshes: 0, triangles: 0 }, g = o.geometry;
          m.meshes++; m.triangles += (g.index ? g.index.count : g.attributes.position.count) / 3 * (o.isInstancedMesh ? o.count : 1);
        }
      }
      geometries.add(o.geometry);
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { for (const k in m) if (m[k] && m[k].isTexture) textures.add(m[k].source); });
    });
    let geometryBytes = 0, textureBytes = 0;
    geometries.forEach(g => {
      Object.values(g.attributes).forEach(a => { geometryBytes += a.array.byteLength; });
      if (g.index) geometryBytes += g.index.array.byteLength;
    });
    scene.traverse(o => { if (o.isInstancedMesh) geometryBytes += o.instanceMatrix.array.byteLength + (o.instanceColor ? o.instanceColor.array.byteLength : 0); });
    textures.forEach(src => { const d = src.data; if (d && d.width) textureBytes += d.width * d.height * 4 * 4 / 3; });
    const buffer = renderer.getDrawingBufferSize(new THREE.Vector2()), shadow = sun.shadow.mapSize;
    // Colour + depth, four samples each with antialias, plus the resolved colour.
    const bufferBytes = buffer.x * buffer.y * 4 * (renderer.getContext().getContextAttributes().antialias ? 9 : 2);
    const shadowBytes = renderer.shadowMap.enabled ? shadow.x * shadow.y * 8 : 0;
    const mb = n => Math.round(n / 1048576 * 10) / 10;
    return {
      calls: info.render.calls, triangles: info.render.triangles, meshes, visible, programs: info.programs ? info.programs.length : 0,
      geometries: info.memory.geometries, textures: info.memory.textures, pixelRatio: renderer.getPixelRatio(), buffer: buffer.x + 'x' + buffer.y,
      mb: { geometry: mb(geometryBytes), texture: mb(textureBytes), buffer: mb(bufferBytes), shadow: mb(shadowBytes), total: mb(geometryBytes + textureBytes + bufferBytes + shadowBytes) },
      ...(perModel ? { models } : {})
    };
  }

  return {
    render,
    renderBranch,
    carsModelled,
    propReady,
    hasFixture: key => !!fixtures[key],
    stationPicture,
    loungePicture,
    fixturePicture,
    stats,
    get ok() { return !lost; },
    // Files still loading plus loaded models still waiting for their setup.
    get loading() { return loading + setups.length; },
    dispose() { cancelAnimationFrame(setupPump); setups.length = 0; renderer.dispose(); materials.forEach(m => m.dispose()); }
  };
}

// The town round the shop: one asphalt floor at street level, every block between the streets a paved slab up to the
// plaza level (so kerbs are the slabs' edges), the terraces as blocks of their wall colour, trees and lamps.
function buildTown(world, layout, { box, span, material, textured, lampStandIns }) {
  const { roads, roadWidth: rw, plazaY: P, streetY: G, extent: L } = layout;
  // Sunken models (the subway well) need openings through both floors: each slab is laid as the strips round them.
  const holes = layout.holes || [];
  const slab = (x0, x1, y0, y1, z0, z1, colour, name) => {
    let rects = [[x0, x1, z0, z1]];
    holes.forEach(h => {
      rects = rects.flatMap(([a0, a1, b0, b1]) => {
        if (h.x0 >= a1 || h.x1 <= a0 || h.z0 >= b1 || h.z1 <= b0) return [[a0, a1, b0, b1]];
        const hx0 = Math.max(a0, h.x0), hx1 = Math.min(a1, h.x1);
        return [[a0, hx0, b0, b1], [hx1, a1, b0, b1], [hx0, hx1, b0, Math.max(b0, h.z0)], [hx0, hx1, Math.min(b1, h.z1), b1]]
          .filter(([c0, c1, d0, d1]) => c1 - c0 > 1e-6 && d1 - d0 > 1e-6);
      });
    });
    rects.forEach(([a0, a1, b0, b1]) => textured(span(world, a0, a1, y0, y1, b0, b1, colour, { cast: false }), name));
  };
  slab(-L, L, G - .4, G, -L, L, layout.colours.asphalt, 'asphalt');
  const edges = along => {
    const at = roads.filter(r => r.along === along).map(r => r.at).sort((a, b) => a - b), out = [];
    let from = -L;
    at.forEach(a => { out.push([from, a - rw / 2]); from = a + rw / 2; });
    out.push([from, L]);
    return out;
  };
  // Roads along x run at fixed z, so they cut the blocks' z range; roads along z cut the x range.
  const zBands = edges('x'), xBands = edges('z');
  xBands.forEach(([x0, x1]) => zBands.forEach(([z0, z1]) => slab(x0, x1, G, P, z0, z1, layout.colours.paver, 'sidewalk')));
  // Road paint and tactile paving from the 2D ground pass, one instanced mesh per colour.
  const byColour = {};
  (layout.marks || []).forEach(m => (byColour[m.colour] = byColour[m.colour] || []).push(m));
  const mm = new THREE.Matrix4(), mp = new THREE.Vector3(), ms = new THREE.Vector3(), mq = new THREE.Quaternion();
  Object.entries(byColour).forEach(([c, list]) => {
    // rgba paint (the tactile strips) keeps its see-through share.
    const rgba = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(c);
    const paint = rgba ? material('#' + [1, 2, 3].map(k => (+rgba[k]).toString(16).padStart(2, '0')).join(''), { transparent: true, opacity: +rgba[4], depthWrite: false }) : material(c);
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0), paint, list.length);
    list.forEach((m, i) => mesh.setMatrixAt(i, mm.compose(mp.set((m.x0 + m.x1) / 2, m.y - .004, (m.z0 + m.z1) / 2), mq, ms.set(m.x1 - m.x0, .012, m.z1 - m.z0))));
    mesh.receiveShadow = true;
    world.add(mesh);
  });
  const terraces = [];
  layout.buildings.forEach(b => {
    // Each block steps aside for its Blender model once that loads (b.model).
    const wall = span(world, b.x0, b.x1, P, b.h, b.z0, b.z1, b.wall, { opts: { name: 'terrace' } });
    const roof = span(world, b.x0 - .15, b.x1 + .15, b.h, b.h + .35, b.z0 - .15, b.z1 + .15, b.roof, { opts: { name: 'terrace' } });
    wall.userData.model = roof.userData.model = b.model;
    terraces.push(wall, roof);
  });
  const crownGeometry = new THREE.IcosahedronGeometry(1.6, 1);
  layout.trees.forEach(([x, z]) => {
    box(world, x, P, z, .35, 2.2, .35, '#7a5a3e', { opts: { name: 'street' } });
    const crown = new THREE.Mesh(crownGeometry, material('#7fa35a', { name: 'street' }));
    crown.position.set(x, P + 3.6, z); crown.scale.set(1, .8, 1);
    crown.castShadow = crown.receiveShadow = true;
    world.add(crown);
  });
  // The lamps' shadow stand-ins, until the Blender lamp loads.
  layout.lamps.forEach(([x, z]) => {
    lampStandIns.push(box(world, x, P, z, .18, 4.4, .18, '#3b4a43', { opts: { name: 'street' } }));
    lampStandIns.push(box(world, x, P + 4.3, z, .5, .3, .5, '#f1e3b6', { opts: { name: 'street' } }));
  });
  return terraces;
}

// The shop: the timber floor on the plaza, the mezzanine and top floor as slabs on posts, the rear and short side
// walls of the cutaway, and the entrance planter line. Positions are the 2D map's own (drawTower's floors).
function buildShop(world, layout, { box, span, material, textured, model }) {
  const shop = new THREE.Group();
  world.add(shop);
  layout.floors.forEach((f, fi) => {
    const left = (f.x || 0) - f.w / 2, right = (f.x || 0) + f.w / 2, rear = f.z - f.d / 2, front = f.z + f.d / 2;
    textured(span(shop, left, right, f.y - (fi ? .32 : .02), f.y, rear, front, fi === 2 ? '#e9e4d8' : fi ? '#e4ddcc' : '#c9965f', { cast: fi > 0 }), ['herringbone', 'timber', 'concrete'][fi]);
    // The walls themselves are the shell's (shell.js).
    // A brass rail along the open front edge of the upper floors.
    if (fi) {
      span(shop, left, right, f.y, f.y + 1.05, front - .06, front, '#c9a35a', { opts: { transparent: true, opacity: .55 } });
      // Posts under the slab's front corners and middle.
      // The mezzanine has no middle post: the 2D map leaves the menu board and counters clear.
      (fi === 1 ? [left + .3, right - .3] : [left + .3, 0, right - .3]).forEach(x => box(shop, x, layout.floors[fi - 1].y, front - .3, .3, f.y - layout.floors[fi - 1].y - .32, .3, '#33372f'));
    }
  });
  // Two spiral stairs on the right-hand side, where the 2D map's straight flights run: one from the ground floor up to
  // the landing off the mezzanine, one from the mezzanine to a landing at the top floor's rear-right corner. Each is
  // oak wedge treads round a forest-green post, green balusters and a brass handrail, arriving facing the landing.
  // Rails are built in true space (heights stretched here, not by the world group) so their section stays round.
  // Each stair is its own group, hidden once the Blender spiral (spiral_stair.glb, origin at the post on the floor, the
  // same treads) has loaded in its place.
  const helix = (trueSpace, cx, cz, r, a0, a1, y0, y1, thick, colour) => {
    const pts = [];
    for (let k = 0; k <= 48; k++) { const t = k / 48, a = a0 + (a1 - a0) * t; pts.push(new THREE.Vector3(cx + Math.cos(a) * r, (y0 + (y1 - y0) * t) * HEIGHT_SCALE, cz + Math.sin(a) * r)); }
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 96, thick, 8, false), material(colour));
    m.castShadow = true; trueSpace.add(m);
  };
  const spiral = (cx, cz, y0, y1, n, arrive) => {
    const g = new THREE.Group(), trueSpace = new THREE.Group();
    trueSpace.scale.y = 1 / HEIGHT_SCALE; g.add(trueSpace); shop.add(g);
    model('spiral_stair.glb', cx, y0, cz, () => { g.visible = false; });
    // n risers; the last one is the floor itself. Treads step 24° apart, from the back round the front to the landing.
    const r = 1.15, step = Math.PI * 24 / 180, rise = (y1 - y0) / n, angle = k => arrive + (n - 1 - k) * step;
    box(g, cx, y0, cz, .26, y1 - y0 + 1, .26, '#1f5a3c');
    box(g, cx, y0, cz, .56, .06, .56, '#d0a54e', { cast: false });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(.13, 16, 10), material('#d0a54e'));
    cap.position.set(cx, y1 + 1.05, cz); cap.castShadow = true; g.add(cap);
    for (let k = 0; k < n - 1; k++) {
      const a = angle(k), top = y0 + rise * (k + 1), w = step * 1.04;
      // Three's cylinder sweeps from +z towards +x, so a map angle a (cos a, sin a) is theta π/2 - a.
      const tread = new THREE.Mesh(new THREE.CylinderGeometry(r, r, .08, 6, 1, false, Math.PI / 2 - a - w / 2, w), material('#d9a768'));
      tread.position.set(cx, top - .04, cz); tread.castShadow = tread.receiveShadow = true; g.add(tread);
      // A green baluster at each tread's outer corner.
      const b = a - step / 2;
      box(g, cx + Math.cos(b) * (r - .06), top, cz + Math.sin(b) * (r - .06), .05, .95, .05, '#1f5a3c', { cast: false });
    }
    const a0 = angle(0) + step / 2, a1 = angle(n - 2) - step / 2;
    helix(trueSpace, cx, cz, r - .06, a0, a1, y0 + 1, y1 - rise + 1, .05, '#d0a54e');
    helix(trueSpace, cx, cz, r - .02, a0, a1, y0 + rise - .14, y1 - .14, .09, '#1f5a3c');
  };
  const [, mezz, top] = layout.floors;
  const up = -Math.PI / 2, rail = (x0, x1, z0, z1, y) => span(shop, x0, x1, y, y + 1.05, z0, z1, '#c9a35a', { opts: { transparent: true, opacity: .55 } });
  spiral(10.2, .35, 0, mezz.y, 14, up);
  textured(span(shop, 8.93, 11.35, mezz.y - .32, mezz.y, -2.8, -.8, '#e4ddcc', { cast: true }), 'timber');
  rail(11.29, 11.35, -2.8, -.8, mezz.y);
  spiral(7.75, -4.4, mezz.y, top.y, 14, up);
  textured(span(shop, 6.45, 9, top.y - .32, top.y, -6.9, -5.55, '#e9e4d8', { cast: true }), 'concrete');
  rail(8.94, 9, -6.9, -5.55, top.y);
  // The storefront along the entrance side (MARQUEE in main.js): a green plinth, glass, the sign band and pilasters.
  // The sprite shop draws it from its own render instead (wallFaces, below).
  const m = layout.marquee;
  if (layout.wallFaces) return;
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
    return m;
  };
  const runs = transport.tubes.map(tube => {
    const path = rounded(tube.points), curve = new THREE.CurvePath();
    for (let i = 1; i < path.length; i++) curve.add(new THREE.LineCurve3(trueSpace(path[i - 1]), trueSpace(path[i])));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(24, path.length * 3), R, 18, false), glass);
    mesh.renderOrder = 3;
    scene.add(mesh);
    const parts = [mesh];
    const ends = [[tube.points[0], tube.points[1]], [tube.points[tube.points.length - 1], tube.points[tube.points.length - 2]]];
    ends.forEach(([p, q], i) => { if (!(i === 0 && tube.noCap0)) parts.push(ring(p, trueSpace(p).sub(trueSpace(q)).normalize(), R + .02, .07, brass)); });
    (tube.floorRings || []).forEach(p => parts.push(ring(p, new THREE.Vector3(0, 1, 0), R + .1, .08, brass)));
    const segments = [];
    let total = 0;
    for (let i = 1; i < path.length; i++) { const len = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1], path[i][2] - path[i - 1][2]); segments.push({ a: path[i - 1], b: path[i], len }); total += len; }
    return { tube, segments, total, parts };
  });
  const belts = transport.belts.map(b => {
    const length = Math.abs(b.x2 - b.x1), mid = (b.x1 + b.x2) / 2;
    [b.x1, b.x2].forEach(x => box(world, x - Math.sign(b.x2 - b.x1) * .25 * (x === b.x1 ? -1 : 1), b.floor, b.z, .12, b.height - .1, .5, '#344a40'));
    box(world, mid, b.floor + b.height - .18, b.z, length, .16, b.width, '#536c5b');
    box(world, mid, b.floor + b.height - .02, b.z, length - .1, .04, b.width - .2, '#2a4035', { cast: false });
    return b;
  });
  // The cargo is the item actually passing between the two stations a run joins (its `cargoStage`, a belt's `stage`):
  // seedlings in pots from the seeds bench to grow, grown plants down to harvest, trimmed buds on to pack, sealed pickup
  // bags down to the counters and shipping boxes up to the online deck. Each is a few primitives merged into one
  // vertex-coloured mesh, instanced, built in true space with its base at y 0 and small enough to ride inside the bore.
  const cargoKinds = buildCargoKinds();
  const cargoMeshes = cargoKinds.map(kind => {
    const mesh = new THREE.InstancedMesh(kind.geometry, new THREE.MeshLambertMaterial({ vertexColors: true }), 32);
    mesh.castShadow = true; mesh.count = 0; mesh.renderOrder = 2; mesh.frustumCulled = false;
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);
    return mesh;
  });
  const m = new THREE.Matrix4(), turn = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), at = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
  // (x, z) and the item's base height in world units; yaw turns it about its own upright so a run's items don't all
  // face the same way.
  function place(x, base, z, stage, yaw) {
    const kind = Math.min(stage, cargoKinds.length - 1), mesh = cargoMeshes[kind];
    if (mesh.count >= 32) return;
    turn.setFromAxisAngle(up, yaw);
    mesh.setMatrixAt(mesh.count++, m.compose(at.set(x, base * K, z), turn, one));
  }
  return {
    // A run that belongs to a fixture (the online deck's feed) shows only while that fixture is built.
    update({ odo, running }, fixtures = {}) {
      cargoMeshes.forEach(mesh => { mesh.count = 0; });
      runs.forEach(({ tube, segments, total, parts }) => {
        const shown = !tube.fixture || !!fixtures[tube.fixture];
        parts.forEach(part => { part.visible = shown; });
        if (!shown) return;
        const span = tube.window ? tube.window.total : total, start = tube.window ? tube.window.offset : 0;
        const count = Math.max(2, Math.round(span / transport.gap)), spacing = span / count, o = running[tube.stage] ? odo : 0;
        for (let k = 0; k < count; k++) {
          let d = (o + k * spacing) % span - start;
          if (d < 0 || d >= total) continue;
          for (const part of segments) { if (d > part.len) { d -= part.len; continue; } const q = mix(part.a, part.b, d / part.len); place(q[0], q[1] - cargoKinds[tube.cargoStage].height / 2 / K, q[2], tube.cargoStage, k * 2.1); break; }
        }
      });
      belts.forEach(b => {
        const run = Math.abs(b.x2 - b.x1), count = Math.max(2, Math.round(run / transport.gap)), o = running[b.stage] ? odo : 0, forward = Math.sign(b.x2 - b.x1);
        for (let k = 0; k < count; k++) place(b.x1 + forward * ((o + k * run / count) % run), b.floor + b.height + .02, b.z, b.stage, k * 2.1);
      });
      cargoMeshes.forEach(mesh => { mesh.instanceMatrix.needsUpdate = true; });
    }
  };
}

// The cargo models, indexed by production stage: 0 seedling, 1 grown plant, 2 trimmed buds, 3 sealed jar, 4 pickup bag,
// 5 shipping box. Sizes are true map units; the tube bore is .68 across, so nothing is taller or wider than about .55.
function buildCargoKinds() {
  const parts = [];
  const add = (geometry, colour, x = 0, y = 0, z = 0, { sx = 1, sy = 1, sz = 1, rx = 0, ry = 0, rz = 0 } = {}) => {
    const g = geometry.index ? geometry.toNonIndexed() : geometry;
    g.deleteAttribute('uv');
    g.scale(sx, sy, sz); g.rotateX(rx); g.rotateZ(rz); g.rotateY(ry); g.translate(x, y, z);
    const c = new THREE.Color(colour), n = g.attributes.position.count, rgb = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { rgb[i * 3] = c.r; rgb[i * 3 + 1] = c.g; rgb[i * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
    parts.push(g);
  };
  const finish = () => { const geometry = mergeGeometries(parts.splice(0)); geometry.computeBoundingBox(); return { geometry, height: geometry.boundingBox.max.y }; };
  // A leaf points out from the stem along `yaw`, its centre `d` out, its tip tilted up by `tilt`.
  const leaf = (colour, yaw, d, y, size, tilt = .5) => add(new THREE.SphereGeometry(1, 7, 4), colour, Math.cos(yaw) * d, y, -Math.sin(yaw) * d, { sx: size, sy: size * .16, sz: size * .38, rz: tilt, ry: yaw });
  const pot = (r, h) => {
    add(new THREE.CylinderGeometry(r, r * .78, h, 12), '#b8673f', 0, h / 2);
    add(new THREE.CylinderGeometry(r * 1.08, r * 1.08, h * .18, 12), '#c97a50', 0, h * .91);
    add(new THREE.CylinderGeometry(r * .92, r * .92, .012, 12), '#4a3424', 0, h * .97);
  };
  const kinds = [];

  // Seedling: a small terracotta pot with a stem and two pairs of young leaves.
  pot(.1, .13);
  add(new THREE.CylinderGeometry(.012, .014, .14, 5), '#5b8a3c', 0, .2);
  [[0, .22], [Math.PI, .23], [Math.PI / 2, .28], [-Math.PI / 2, .29]].forEach(([yaw, y], i) => leaf(i < 2 ? '#7fb552' : '#a6d073', yaw, .06, y, .065));
  kinds.push(finish());

  // Grown plant: a bigger pot, fan leaves in three tiers and three frosted colas, ready for harvest.
  pot(.12, .15);
  add(new THREE.CylinderGeometry(.016, .02, .34, 6), '#4f7a35', 0, .32);
  [.24, .32, .4].forEach((y, tier) => {
    for (let a = 0; a < 5; a++) {
      const yaw = a * 1.257 + tier * .6, r = .1 - tier * .02;
      leaf(tier % 2 ? '#4f8a3a' : '#3f7a33', yaw, r, y, .1 - tier * .015, .35);
    }
  });
  [[0, .47, 0, .07], [.07, .4, .03, .05], [-.06, .41, -.04, .05]].forEach(([x, y, z, r]) => {
    add(new THREE.IcosahedronGeometry(r, 1), '#9fc06c', x, y, z, { sy: 1.7 });
    add(new THREE.IcosahedronGeometry(r * .45, 0), '#d99a55', x + r * .4, y + r * .5, z + r * .3);
  });
  kinds.push(finish());

  // Trimmed buds: three dense nugs with orange pistils on a little kraft tray.
  add(new THREE.BoxGeometry(.42, .03, .3), '#c9a46a', 0, .015);
  [[-.1, .04, '#86a85c'], [.1, -.03, '#7a9c52'], [0, .02, '#93b465']].forEach(([x, z, colour], i) => {
    const r = i === 2 ? .095 : .085, y = .03 + r * 1.1 + (i === 2 ? .04 : 0);
    add(new THREE.IcosahedronGeometry(r, 1), colour, x, y, z, { sy: 1.25, ry: i });
    add(new THREE.IcosahedronGeometry(r * .3, 0), '#d68f4a', x + r * .55, y + r * .4, z + r * .4);
    add(new THREE.IcosahedronGeometry(r * .25, 0), '#e0a560', x - r * .4, y + r * .7, z - r * .5);
  });
  kinds.push(finish());

  // Sealed jar: clear green glass, flower showing through, a gold lid and a cream label.
  add(new THREE.CylinderGeometry(.13, .13, .3, 14), '#a9cdb3', 0, .15);
  add(new THREE.CylinderGeometry(.14, .14, .07, 14), '#d2b25e', 0, .335);
  add(new THREE.BoxGeometry(.14, .12, .02), '#f3efda', 0, .14, .125);
  kinds.push(finish());

  // Pickup bag: kraft paper with a folded top, rope handles and the shop's green label.
  add(new THREE.BoxGeometry(.32, .38, .2), '#d9bd88', 0, .19);
  add(new THREE.BoxGeometry(.33, .05, .21), '#bf9f68', 0, .36);
  [-.06, .06].forEach(z => add(new THREE.TorusGeometry(.07, .01, 5, 10, Math.PI), '#8a6e44', 0, .385, z));
  add(new THREE.BoxGeometry(.16, .14, .01), '#496f50', 0, .2, .101);
  add(new THREE.BoxGeometry(.06, .06, .01), '#e7dcbc', 0, .2, .106);
  kinds.push(finish());

  // Shipping box: a taped kraft carton with a green address label, for the online orders deck.
  add(new THREE.BoxGeometry(.38, .26, .3), '#c49a5e', 0, .13);
  add(new THREE.BoxGeometry(.08, .012, .31), '#e6d6ad', 0, .262);
  [-1, 1].forEach(side => add(new THREE.BoxGeometry(.08, .12, .01), '#e6d6ad', 0, .2, side * .151));
  add(new THREE.BoxGeometry(.12, .09, .01), '#496f50', .1, .13, .152);
  kinds.push(finish());
  return kinds;
}
