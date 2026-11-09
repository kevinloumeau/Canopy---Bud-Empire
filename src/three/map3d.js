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
import { buildFlagship } from './flagship.js';
import { buildAtms } from './atm.js';
import { blueprint, breatheBlueprint } from './blueprint.js';
import { buildCityBuildings } from './city-buildings.js';
import { buildEntrance } from './entrance.js';
import { createIntro } from './intro.js';
import { createBranchLayer } from './branch3d.js';
import { buildBranchShop } from './branch-shops.js';
import { buildPopupMarket } from './popup-market.js';
import { buildKeepsakeBunting } from './keepsake-bunting.js';
import { rigStation, bindStation, moveStation } from './station-motion.js';
import { compactModel } from './compact.js';
import { screenState, paintScreen, W as SCREEN_W, H as SCREEN_H, SCALE as SCREEN_SCALE, PAID as PAID_AT, PAID_HOLD } from './kiosk-screen.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { clone as cloneRigged } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { bindStaff, poseStaff, poseCarry } from './staff-motion.js';
import { createMapCamera, frameMapCamera, HEIGHT_SCALE } from './camera.js';

// Blender models are built in metres; the map draws 1.69 units a metre (layout.fixtures use the same scale).
const BLENDER_SCALE = 1.69;
const MAX_PEOPLE = 160, MAX_CARS = 32;
// Golden-hour light, after the loading-screen render (2026-11-04): a warm honey sun, a cream sky and a warm olive
// bounce, so lit faces glow gold while the shade keeps its colour instead of going grey.
const SUN_COLOUR = '#ffe7c4', SKY = '#fff4e2', BOUNCE = '#9f9a78';
const SUN_STRENGTH = 2.5, SKY_STRENGTH = 1.32;

// The colour grade, run in every lit material's own shader as Three.js's custom tone mapping (no extra render pass, so
// it costs the phone a few instructions a pixel and no fill rate). Graded in display space: richer colour, sunlit
// highlights pushed toward gold, the darks toward deep forest green, and a gentle S curve for depth. The haze and the
// sky are mixed in after it at their own colour, so the town's edges still melt into the background exactly.
THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment.replace(
  'vec3 CustomToneMapping( vec3 color ) { return color; }', `vec3 CustomToneMapping( vec3 color ) {
  vec3 c = pow( clamp( color * toneMappingExposure, 0.0, 1.0 ), vec3( 1.0 / 2.2 ) );
  float l = dot( c, vec3( .2126, .7152, .0722 ) );
  c = mix( vec3( l ), c, 1.16 );
  c += smoothstep( .45, 1.0, l ) * vec3( .022, .01, -.018 ) + ( 1.0 - smoothstep( .0, .5, l ) ) * vec3( -.035, -.008, -.02 );
  c = clamp( c, 0.0, 1.0 );
  c = mix( c, c * c * ( 3.0 - 2.0 * c ), .2 );
  return pow( c, vec3( 2.2 ) );
}`);

export function createMap3D(canvas, layout) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.localClippingEnabled = true; // the shell's big fans are cut along the roof's far edge (shell.js)
  } catch (e) { return null; }
  if (!renderer.getContext()) return null;
  // Files still loading (models and textures), so scripts/snap3d.mjs knows when a capture shows the finished scene.
  // loadDone and loadTotal (files so far) feed the iOS app's loading bar.
  let loading = 0, loadDone = 0, loadTotal = 0;
  const loads = THREE.DefaultLoadingManager, track = (url, done, total) => { loading = total - done; loadDone = done; loadTotal = total; };
  loads.onStart = loads.onProgress = track;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.CustomToneMapping; // the colour grade above
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Battery: the sun's 2048 soft shadow map is the frame's second full pass over the scene. It is redrawn at most 30
  // times a second (every other frame at 60 fps), which keeps walking people and cars' shadows smooth while halving
  // that pass. A skipped frame reuses the last map with the light matrix it was drawn with, so shadows stay put in the
  // world while the view pans. See shadowsDue().
  renderer.shadowMap.autoUpdate = false;
  const SHADOW_EVERY = 1000 / 30;
  let shadowAt = -Infinity;
  function shadowsDue() {
    if (frameClock - shadowAt < SHADOW_EVERY - 4) return;
    shadowAt = frameClock; renderer.shadowMap.needsUpdate = true;
  }

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
  const hemi = new THREE.HemisphereLight(SKY, BOUNCE, SKY_STRENGTH);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(SUN_COLOUR, SUN_STRENGTH);
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
        // Measured at the ground point behind the fragment along the view ray (the camera looks down so that a point h
        // up covers the ground h further back on both x and z), the haze is the same for whatever stands on a pixel: a
        // tall far terrace fades up its height into the sky instead of standing as a flat haze-coloured block over a
        // clearer street, and no wall is cut off where it crosses the ramp. smoothstep eases both ends of each ramp.
        vec2 hazeGround = vHazeWorld.xz - vHazeWorld.y;
        float hazeClear = (1.0 - smoothstep(hazeX.x, hazeX.y, hazeGround.x)) * (1.0 - smoothstep(hazeX.z, hazeX.w, hazeGround.x))
          * (1.0 - smoothstep(hazeZ.x, hazeZ.y, hazeGround.y)) * (1.0 - smoothstep(hazeZ.z, hazeZ.w, hazeGround.y));
        float hazeAmount = 1.0 - hazeClear;
        // The colour is mixed in after the output conversion, so the haze is converted too: then a fully hazed wall,
        // the ground's far edge and the sky behind them are one colour and nothing shows where the geometry stops.
        gl_FragColor.rgb = mix(gl_FragColor.rgb, linearToOutputTexel(vec4(hazeColour, 1.0)).rgb, hazeAmount);
        #include <dithering_fragment>`);
    };
    m.customProgramCacheKey = () => 'haze';
    return m;
  }
  // Lit windows after dark (Kevin's visual review, 2026-11-07: the night map read as a grey overcast day). A hazed
  // material gains a warm glow on a random share of its window panes, scaled by the night, inside its own shader, so
  // the city lights up with no new draw or light. Two ways to find a pane:
  // - 'pane': a `pane` vertex attribute (paneAttribute, below): 0 off glass, (0, 1] a sash pane's own random number,
  //   2 + a random number for a shop window. Instanced copies of one terrace mix in their own position, so the same
  //   model never shows the same lit pattern twice.
  // - 'grid': a curtain wall or a glass band, one big box, cut into cells of opts.cell (map units) from opts.origin.
  const nightWindowsUniform = { value: 0 };
  function nightWindows(m, mode, { share = .4, shopShare = .85, strength = 1, cell = [1, 1, 1], origin = [0, 0, 0] } = {}) {
    const before = m.onBeforeCompile;
    m.onBeforeCompile = (shader, r) => {
      before.call(m, shader, r);
      Object.assign(shader.uniforms, {
        nightWindows: nightWindowsUniform, winShare: { value: share }, winShopShare: { value: shopShare }, winStrength: { value: strength },
        winCell: { value: new THREE.Vector3(cell[0], cell[1] * HEIGHT_SCALE, cell[2]) }, winOrigin: { value: new THREE.Vector3(origin[0], origin[1] * HEIGHT_SCALE, origin[2]) }
      });
      const pane = mode === 'pane';
      shader.vertexShader = (pane ? 'attribute float pane;\nvarying float vPane;\n' : '') + 'varying float vWinSeed;\n' + shader.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
        ${pane ? 'vPane = pane;' : ''}
        #ifdef USE_INSTANCING
          vWinSeed = fract(sin(dot(instanceMatrix[3].xz, vec2(12.9898, 78.233))) * 43758.5453);
        #else
          vWinSeed = fract(sin(dot(modelMatrix[3].xz, vec2(12.9898, 78.233))) * 43758.5453);
        #endif`);
      shader.fragmentShader = (pane ? 'varying float vPane;\n' : '') + `varying float vWinSeed;
        uniform float nightWindows, winShare, winShopShare, winStrength; uniform vec3 winCell, winOrigin;
        float winHash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      ` + shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        if (nightWindows > 0.0) {
          float winPick = -1.0, winLit = 0.0;
          ${pane ? `
          if (vPane > 1.5) { winPick = fract(vPane + vWinSeed * 3.7); winLit = step(winPick, winShopShare) * 1.4; }
          else if (vPane > 0.0) { winPick = fract(vPane + vWinSeed); winLit = step(winPick, winShare); }` : `
          winPick = winHash(floor((vHazeWorld - winOrigin) / winCell) + vWinSeed);
          winLit = step(winPick, winShare);`}
          // Most lit rooms are a warm lamp, from amber to cream; one in eight is the cool flicker of a screen.
          vec3 winTone = winPick < winShare * .125 ? vec3(.55, .7, 1.0) : mix(vec3(1.0, .62, .26), vec3(1.0, .86, .58), fract(winPick * 7.13));
          totalEmissiveRadiance += winTone * winLit * nightWindows * winStrength;
        }`);
    };
    m.customProgramCacheKey = () => 'haze-windows-' + mode;
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
      if (parent === world) shopParts.add(holder);
      if (onReady) onReady(gltf.scene, holder);
      compactModel(gltf.scene);
    }, undefined, e => console.warn('3D map: could not load ' + file, e));
  }
  const lampStandIns = [];
  const terraces = buildTown(world, layout, { box, span, material, textured, lampStandIns, nightWindows });
  // Everything that is the shop rather than the town round it, for the first-load build (intro.js).
  const shopParts = new Set(), townEnd = world.children.length;
  buildShop(world, layout, { box, span, material, textured, model });
  const sceneEnd = scene.children.length;
  const transport = buildTransport(scene, world, layout.transport, { box, material });
  scene.children.slice(sceneEnd).forEach(o => shopParts.add(o));
  const shell = buildShell(world, layout, { box, span, material, model });
  const rooftop = buildRooftop(world, layout, { box, span, material });
  const flagship = buildFlagship(world, layout, { material, nightWindows });
  const atms = layout.atm ? buildAtms(world, layout, { material }) : null;
  const cityBuildings = buildCityBuildings(world, layout, { material, nightWindows });
  buildEntrance(world, layout, { box, span, material, model });
  world.children.slice(townEnd).forEach(o => shopParts.add(o));

  // Stations: one solid per station slot, resized and recoloured from the frame (tier, built, rising in).
  let lastStep = 0;
  const stationMeshes = [], selectionRing = new THREE.Mesh(new THREE.RingGeometry(.86, 1, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#e2c68a', transparent: true, opacity: .85, depthWrite: false }));
  selectionRing.renderOrder = 2;
  world.add(selectionRing);
  const TIER_COLOURS = ['#d8cfbd', '#b8cdb2', '#9cc4b8', '#e2c68a'];
  // A boosted station (its crew burst running): warm brass light pools on the floor under it, breathing, and a thin ring
  // rises off the floor and fades on a loop. A saturated gold, so it reads against the pale wood and concrete floors by day. Pooled, one per boosted station.
  const glowTexture = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'), grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)'); grad.addColorStop(.6, 'rgba(255,255,255,.8)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  })();
  const boostGlows = [];
  function boostGlow(n) {
    if (!boostGlows[n]) {
      const glow = (geometry, extra) => { const m = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(Object.assign({ color: '#f0a010', transparent: true, depthWrite: false }, extra))); m.renderOrder = 2; world.add(m); return m; };
      boostGlows[n] = { pool: glow(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), { map: glowTexture }), ring: glow(new THREE.RingGeometry(.86, 1, 48).rotateX(-Math.PI / 2), { color: '#e8920a' }) };
    }
    return boostGlows[n];
  }
  // The squash and spring an upgraded model plays (upgrade-fx.js times it): [across, up] scale factors for s from 0 to 1.
  // A stretch up, a squash back and a small settle, so it reads as "levelled up" without wobbling. Kept here rather
  // than imported, so this chunk still pulls in none of the game's own modules.
  function springScale(s) {
    if (s === undefined || s === null || s >= 1 || s < 0) return [1, 1];
    const k = Math.sin(s * Math.PI * 2.5) * Math.pow(1 - s, 2) * .16;
    return [1 - k * .45, 1 + k];
  }
  // An upgrade (frame.upgradeRings, from upgrade-fx.js): a brass ring spreads across the floor and fades over a quick
  // warm glow; a new look adds a second, later ring. Pooled; hidden the moment nothing is playing.
  const upgradeRings = [];
  function upgradeRing(n) {
    if (!upgradeRings[n]) {
      const glow = (geometry, extra) => { const m = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(Object.assign({ color: '#f2b640', transparent: true, depthWrite: false }, extra))); m.renderOrder = 2; m.visible = false; world.add(m); return m; };
      upgradeRings[n] = { pool: glow(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), { map: glowTexture, color: '#ffd27a' }), ring: glow(new THREE.RingGeometry(.88, 1, 56).rotateX(-Math.PI / 2), { color: '#ffd978' }), echo: glow(new THREE.RingGeometry(.94, 1, 56).rotateX(-Math.PI / 2), { color: '#fff1c8' }) };
    }
    return upgradeRings[n];
  }
  function updateUpgradeRings(rings) {
    let n = 0;
    (rings || []).forEach(p => {
      const u = upgradeRing(n++), t = Math.max(0, Math.min(1, p.t)), out = 1 - Math.pow(1 - t, 3), y = p.y + .06;
      u.pool.visible = u.ring.visible = true;
      u.pool.position.set(p.x, p.y + .03, p.z); u.pool.scale.set(p.r * 3.2, 1, p.r * 3.2); u.pool.material.opacity = .55 * Math.pow(1 - t, 2);
      u.ring.position.set(p.x, y, p.z); u.ring.scale.set(p.r * (.35 + out), 1, p.r * (.35 + out)); u.ring.material.opacity = .95 * (1 - t);
      const e = (t - .22) / .78;
      u.echo.visible = !!p.big && e > 0;
      if (u.echo.visible) { const eo = 1 - Math.pow(1 - e, 3); u.echo.position.set(p.x, y + .01, p.z); u.echo.scale.set(p.r * (.3 + eo * 1.15), 1, p.r * (.3 + eo * 1.15)); u.echo.material.opacity = .85 * (1 - e); }
    });
    for (; n < upgradeRings.length; n++) { const u = upgradeRings[n]; u.pool.visible = u.ring.visible = u.echo.visible = false; }
  }
  // The manager (frame.manager, the player): a lime ring and a soft pool of light on the floor under them, so "you" reads
  // at a glance among the crew. It breathes slowly while they stand and work, and holds steady while they walk. Never
  // brass: brass is the next buy's.
  const youMarker = (() => {
    const glow = (geometry, extra) => { const m = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(Object.assign({ color: '#a8dc52', transparent: true, depthWrite: false }, extra))); m.renderOrder = 2; m.visible = false; world.add(m); return m; };
    return { pool: glow(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), { map: glowTexture, color: '#c6f07a' }), ring: glow(new THREE.RingGeometry(.84, 1, 56).rotateX(-Math.PI / 2)) };
  })();
  function updateYouMarker(m, time) {
    const on = !!m;
    youMarker.pool.visible = youMarker.ring.visible = on;
    if (!on) return;
    const breathe = m.moving ? 0 : (Math.sin((time || 0) / 1000 * 2.4) + 1) / 2, r = .95 + breathe * .08;
    youMarker.pool.position.set(m.x, m.y + .03, m.z); youMarker.pool.scale.set(3, 1, 3); youMarker.pool.material.opacity = (m.night ? .5 : .38) + breathe * .12;
    youMarker.ring.position.set(m.x, m.y + .05, m.z); youMarker.ring.scale.set(r, 1, r); youMarker.ring.material.opacity = .9;
  }
  // A big purchase's reveal (frame.revealBeams, from reveal-fx.js): a column of warm light rises out of the spot and
  // fades while brass sparkles burst up and drift out. Pooled (three at most), two draws each while one plays.
  const beamTexture = (() => {
    const c = document.createElement('canvas'); c.width = 4; c.height = 64;
    const g = c.getContext('2d'), grad = g.createLinearGradient(0, 64, 0, 0);
    grad.addColorStop(0, 'rgba(255,255,255,1)'); grad.addColorStop(.35, 'rgba(255,255,255,.55)'); grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 4, 64);
    return new THREE.CanvasTexture(c);
  })();
  const SPARKS = 28, revealBeams = [];
  function revealBeam(n) {
    if (!revealBeams[n]) {
      const column = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 28, 1, true).translate(0, .5, 0),
        new THREE.MeshBasicMaterial({ map: beamTexture, color: '#ffc457', transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
      const geometry = new THREE.BufferGeometry(), colours = new Float32Array(SPARKS * 3), tone = new THREE.Color();
      for (let i = 0; i < SPARKS; i++) tone.set(i % 3 === 0 ? '#fff4d2' : i % 3 === 1 ? '#ffd36a' : '#e9a93a').toArray(colours, i * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SPARKS * 3), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colours, 3));
      const sparks = new THREE.Points(geometry, new THREE.PointsMaterial({ map: glowTexture, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: false }));
      column.renderOrder = sparks.renderOrder = 3; column.visible = sparks.visible = false; sparks.frustumCulled = false;
      world.add(column); world.add(sparks);
      revealBeams[n] = { column, sparks };
    }
    return revealBeams[n];
  }
  // A small fixed hash, so each sparkle keeps its own path from frame to frame.
  const hash = (i, k) => { const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return v - Math.floor(v); };
  function updateRevealBeams(beams, unit) {
    let n = 0;
    (beams || []).forEach(p => {
      const b = revealBeam(n++), t = Math.max(0, Math.min(1, p.t)), grow = 1 - Math.pow(1 - Math.min(1, t / .32), 3);
      const fade = t < .12 ? t / .12 : Math.max(0, 1 - (t - .12) / .7);
      b.column.visible = fade > 0;
      b.column.position.set(p.x, p.y, p.z);
      const width = p.r * (.8 - .5 * t);
      b.column.scale.set(width, Math.max(.01, p.h * grow), width);
      b.column.material.opacity = .8 * fade;
      const pos = b.sparks.geometry.attributes.position;
      for (let i = 0; i < SPARKS; i++) {
        const a = hash(i, p.seed) * Math.PI * 2, speed = .55 + hash(i, p.seed + 7) * .65, start = hash(i, p.seed + 3) * .25;
        const k = Math.max(0, Math.min(1, (t - start) / (1 - start))), out = 1 - Math.pow(1 - k, 2), spin = a + k * 1.6;
        const reach = p.r * (.25 + 1.05 * out * speed), rise = p.h * (.1 + 1.3 * out * speed) - p.h * .55 * k * k;
        pos.setXYZ(i, p.x + Math.cos(spin) * reach, p.y + Math.max(.05, rise), p.z + Math.sin(spin) * reach);
      }
      pos.needsUpdate = true;
      b.sparks.visible = true;
      b.sparks.material.size = Math.max(5, unit * .42) * (1 - .35 * t);
      b.sparks.material.opacity = t < .08 ? t / .08 : Math.min(1, (1 - t) * 2.2) * (.75 + .25 * Math.sin(t * 40));
    });
    for (; n < revealBeams.length; n++) { const b = revealBeams[n]; b.column.visible = b.sparks.visible = false; }
  }
  // Upgrade sparkles (frame.sparkles, from sparkles.js): soft leaves, four-point glints and coins that rise off what
  // was upgraded. One instanced quad for all of them, so a burst is one draw call however many play at once. Each quad
  // faces the camera (the corner is added in view space, so the world's height stretch doesn't squash it), turns on
  // its own angle and picks its shape from a three-cell sprite sheet. Depth-tested against the scene, so a building in
  // front hides them, and blended premultiplied: the leaf and coin read as solid little shapes by day while their
  // halos and the glints add light, which carries at night.
  const SPARKLE_MAX = 240;
  const sparkleSheet = (() => {
    const S = 64, c = document.createElement('canvas'); c.width = S * 3; c.height = S;
    const g = c.getContext('2d');
    const halo = (cx, alpha) => { const h = g.createRadialGradient(cx, 32, 0, cx, 32, 31); h.addColorStop(0, `rgba(255,255,255,${alpha})`); h.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = h; g.fillRect(cx - 32, 0, 64, 64); };
    // Leaf: a pointed blade with a darker midrib and a soft rim of light.
    halo(32, .35);
    g.save(); g.translate(32, 32); g.rotate(-Math.PI / 4);
    g.beginPath(); g.moveTo(0, -24); g.bezierCurveTo(15, -12, 15, 12, 0, 24); g.bezierCurveTo(-15, 12, -15, -12, 0, -24); g.closePath();
    const leaf = g.createLinearGradient(-12, 0, 12, 0); leaf.addColorStop(0, '#ffffff'); leaf.addColorStop(1, '#c9c9c9');
    g.fillStyle = leaf; g.fill();
    g.strokeStyle = 'rgba(120,120,120,.9)'; g.lineWidth = 2; g.beginPath(); g.moveTo(0, -18); g.lineTo(0, 22); g.stroke();
    g.restore();
    // Glint: a four-point star with a hot core.
    halo(96, .6);
    g.save(); g.translate(96, 32); g.fillStyle = '#ffffff'; g.beginPath();
    for (let i = 0; i < 8; i++) { const r = i % 2 ? 4.5 : 27, a = i * Math.PI / 4 - Math.PI / 2; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    g.closePath(); g.fill(); g.restore();
    // Coin: a disc with a bright rim, a recessed face and a highlight across the top.
    halo(160, .3);
    g.save(); g.translate(160, 32);
    g.fillStyle = '#ffffff'; g.beginPath(); g.arc(0, 0, 19, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#bdbdbd'; g.beginPath(); g.arc(0, 0, 14, 0, Math.PI * 2); g.fill();
    g.fillStyle = '#e6e6e6'; g.font = 'bold 20px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('$', 0, 1);
    g.fillStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.ellipse(-6, -10, 7, 3, -.5, 0, Math.PI * 2); g.fill();
    g.restore();
    return new THREE.CanvasTexture(c);
  })();
  const sparkleGeometry = new THREE.InstancedBufferGeometry();
  sparkleGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0]), 3));
  sparkleGeometry.setIndex([0, 1, 2, 0, 2, 3]);
  const sparkleAt = new THREE.InstancedBufferAttribute(new Float32Array(SPARKLE_MAX * 3), 3).setUsage(THREE.DynamicDrawUsage);
  const sparkleLook = new THREE.InstancedBufferAttribute(new Float32Array(SPARKLE_MAX * 4), 4).setUsage(THREE.DynamicDrawUsage);
  const sparkleTint = new THREE.InstancedBufferAttribute(new Float32Array(SPARKLE_MAX * 3), 3).setUsage(THREE.DynamicDrawUsage);
  sparkleGeometry.setAttribute('at', sparkleAt); sparkleGeometry.setAttribute('look', sparkleLook); sparkleGeometry.setAttribute('tint', sparkleTint);
  sparkleGeometry.instanceCount = 0;
  const sparkles = new THREE.Mesh(sparkleGeometry, new THREE.ShaderMaterial({
    uniforms: { sheet: { value: sparkleSheet } },
    vertexShader: `attribute vec3 at; attribute vec4 look; attribute vec3 tint; varying vec2 vUv; varying vec4 vTint; varying float vGlow;
      void main() {
        float c = cos(look.y), s = sin(look.y);
        vec2 corner = vec2(c * position.x - s * position.y, s * position.x + c * position.y) * look.x;
        vec4 mv = modelViewMatrix * vec4(at, 1.0); mv.xy += corner;
        gl_Position = projectionMatrix * mv;
        vUv = vec2((position.x + .5 + look.w) / 3.0, position.y + .5);
        vTint = vec4(tint, look.z); vGlow = look.w == 1.0 ? .25 : 1.0;
      }`,
    fragmentShader: `uniform sampler2D sheet; varying vec2 vUv; varying vec4 vTint; varying float vGlow;
      void main() {
        vec4 t = texture2D(sheet, vUv);
        float a = t.a * vTint.a;
        if (a < .004) discard;
        vec3 col = t.rgb * vTint.rgb * 1.15;
        gl_FragColor = vec4(col * a, a * vGlow);
      }`,
    transparent: true, depthWrite: false, depthTest: true,
    blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor
  }));
  sparkles.frustumCulled = false; sparkles.renderOrder = 4; sparkles.visible = false;
  world.add(sparkles);
  function updateSparkles(list) {
    const n = Math.min(SPARKLE_MAX, (list || []).length);
    sparkles.visible = n > 0;
    sparkleGeometry.instanceCount = n;
    if (!n) return;
    for (let i = 0; i < n; i++) {
      const p = list[i];
      sparkleAt.setXYZ(i, p.x, p.y, p.z);
      // The quad's size is in view space, where heights are not stretched; HEIGHT_SCALE only moves its centre.
      sparkleLook.setXYZW(i, p.size, p.angle, p.alpha, p.shape);
      sparkleTint.setXYZ(i, p.r, p.g, p.b);
    }
    sparkleAt.needsUpdate = sparkleLook.needsUpdate = sparkleTint.needsUpdate = true;
  }
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
  // The sign plates (Sign, SignBorder: the order desks' and security booth's pill signs) were built with every face
  // wound inward. Cycles draws both sides so the Blender renders look right, but here the front faces are culled
  // and the plate's inside back shows instead: the brass rim covers the green face. A closed mesh with a negative
  // signed volume is inside out, so it is turned the right way round (and left alone once re-exported correctly).
  function fixInsideOut(source) {
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    source.traverse(o => {
      if (!o.isMesh || !/^Sign(Border)?$/.test(o.name)) return;
      const g = o.geometry, pos = g.attributes.position, idx = g.index;
      if (!idx) return;
      let volume = 0;
      for (let i = 0; i < idx.count; i += 3) {
        a.fromBufferAttribute(pos, idx.getX(i)); b.fromBufferAttribute(pos, idx.getX(i + 1)); c.fromBufferAttribute(pos, idx.getX(i + 2));
        volume += a.dot(b.cross(c));
      }
      if (volume >= 0) return;
      for (let i = 0; i < idx.count; i += 3) { const t = idx.getX(i + 1); idx.setX(i + 1, idx.getX(i + 2)); idx.setX(i + 2, t); }
      const n = g.attributes.normal;
      if (n) for (let i = 0; i < n.count; i++) n.setXYZ(i, -n.getX(i), -n.getY(i), -n.getZ(i));
    });
  }
  // With no environment to reflect, full metal renders near black (the order desks' brass arch and sign rim read as
  // black iron); at a lower metalness brass keeps its colour under the sun, as in the Blender renders.
  function softenMetal(source) {
    source.traverse(o => {
      const m = o.isMesh && o.material;
      if (m && m.metalness > .5) { m.metalness = .35; m.roughness = Math.max(.35, m.roughness); }
    });
  }
  if (rooftop) rooftop.loadModels(loader, layout.modelBase);
  if (transport) transport.loadModels(loader, layout.modelBase);
  // Fixtures (the online orders deck) are placed by their own origin at a fixed Blender-to-map scale rather than
  // fitted to a sprite, since their footprint is irregular; `key` names the frame flag that shows them.
  const fixtures = {}, fixtureGlows = [], fixtureScreens = [], menuScreens = {};
  (layout.fixtures || []).forEach(f => {
    loader.load(layout.modelBase + f.file, gltf => {
      prepare(gltf.scene);
      // Parts a fixture's model has that the map draws differently (f.hide, by object name).
      (f.hide || []).forEach(name => { const o = gltf.scene.getObjectByName(name); if (o) o.visible = false; });
      // Backlit panels (f.glow names the material): a soft warm light from behind, faint by day and fuller at night.
      if (f.glow) gltf.scene.traverse(o => { const m = o.isMesh && o.material; if (m && m.name === f.glow && !fixtureGlows.includes(m)) { m.emissive.set('#ffe3b0'); fixtureGlows.push(m); } });
      // Screens (f.screen names the material): the picture itself glows, brighter after dark.
      if (f.screen) gltf.scene.traverse(o => { const m = o.isMesh && o.material; if (m && m.name === f.screen && !fixtureScreens.includes(m)) { m.emissive.set('#ffffff'); m.emissiveMap = m.map; m.needsUpdate = true; fixtureScreens.push(m); } });
      // A touchscreen the customers use (f.menu, the kiosks): its own canvas picture, painted while someone orders.
      if (f.menu) gltf.scene.traverse(o => { const m = o.isMesh && o.material; if (m && m.name === f.screen && !menuScreens[f.key]) menuScreens[f.key] = menuScreen(m); });
      compactModel(gltf.scene);
      const holder = new THREE.Group();
      holder.add(gltf.scene);
      holder.scale.set(f.scale, f.scale / HEIGHT_SCALE, f.scale);
      holder.position.set(f.x, f.y, f.z);
      holder.visible = false;
      world.add(holder); shopParts.add(holder);
      fixtures[f.key] = holder;
    }, undefined, e => console.warn('3D map: could not load ' + f.file, e));
  });
  function menuScreen(material) {
    const canvas = document.createElement('canvas');
    canvas.width = SCREEN_W * SCREEN_SCALE; canvas.height = SCREEN_H * SCREEN_SCALE;
    const texture = new THREE.CanvasTexture(canvas);
    // Matches the baked menu's glTF UVs (no flip).
    texture.flipY = false; texture.colorSpace = THREE.SRGBColorSpace;
    return { material, base: material.map, texture, ctx: canvas.getContext('2d'), key: '', paidAt: null };
  }
  // p: how far the customer at this kiosk has got with their order (0..1), or null when nobody is ordering. The
  // thank-you screen starts as the order nears its end and stays up a moment after the customer walks off.
  function showMenu(screen, p, clock) {
    const m = screen.material, ordering = p != null && p >= 0;
    if (ordering && p >= PAID_AT && screen.paidAt == null) screen.paidAt = clock;
    if (ordering && p < PAID_AT) screen.paidAt = null;
    const since = screen.paidAt == null ? null : clock - screen.paidAt;
    if (!ordering && since != null && (since > PAID_HOLD || since < 0)) screen.paidAt = null;
    const shown = ordering || screen.paidAt != null;
    if (shown) {
      const state = screenState(ordering ? p : 1, clock, screen.paidAt == null ? null : since);
      if (state.key !== screen.key) { paintScreen(screen.ctx, state); screen.texture.needsUpdate = true; screen.key = state.key; }
    }
    const map = shown ? screen.texture : screen.base;
    if (m.map !== map) { m.map = m.emissiveMap = map; }
    if (shown) m.emissiveIntensity += .2;
  }
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
      fixInsideOut(source);
      softenMetal(source);
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
  // A fixture being built (frame.fixtureBuild[key], the share done from 0 to 1): the whole model rises out of a
  // scaffold cage fitted to its outline, cut off at the height reached so far. It works on the model as one piece,
  // so a new model for the fixture gets the same building site.
  const fixtureSites = {}, siteSteel = new THREE.MeshLambertMaterial({ color: '#9aa39b' }), siteBoard = new THREE.MeshLambertMaterial({ color: '#c9a978' });
  const siteBeacon = new THREE.MeshBasicMaterial({ color: '#ffb52e' });
  function fixtureSite(key, holder) {
    if (fixtureSites[key]) return fixtureSites[key];
    const materials = [];
    holder.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); materials.push(o.material); } });
    const was = holder.visible; holder.visible = true; holder.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(holder); holder.visible = was;
    const lo = bounds.min.y / HEIGHT_SCALE, hi = bounds.max.y / HEIGHT_SCALE + .35, pad = .3;
    const x0 = bounds.min.x - pad, x1 = bounds.max.x + pad, z0 = bounds.min.z - pad, z1 = bounds.max.z + pad;
    const tubes = [], boards = [], t = .05;
    const tube = (cx, cy, cz, w, h, d, list = tubes) => list.push(new THREE.BoxGeometry(w, h, d).translate(cx, cy, cz));
    const across = (a0, a1) => { const n = Math.max(1, Math.round((a1 - a0) / 1.6)); return Array.from({ length: n + 1 }, (_, k) => a0 + (a1 - a0) * k / n); };
    // Standards round the outline, ledgers every metre or so, and a board deck along the front at each lift.
    across(x0, x1).forEach(x => [z0, z1].forEach(z => tube(x, (lo + hi) / 2, z, t, hi - lo, t)));
    across(z0, z1).forEach(z => [x0, x1].forEach(x => tube(x, (lo + hi) / 2, z, t, hi - lo, t)));
    for (let y = lo + .9; y <= hi + .01; y += .9) {
      [z0, z1].forEach(z => tube((x0 + x1) / 2, y, z, x1 - x0, t, t));
      [x0, x1].forEach(x => tube(x, y, (z0 + z1) / 2, t, t, z1 - z0));
      tube((x0 + x1) / 2, y - .03, z1 - .18, x1 - x0, .05, .34, boards);
    }
    const site = new THREE.Group();
    site.add(new THREE.Mesh(mergeGeometries(tubes), siteSteel), new THREE.Mesh(mergeGeometries(boards), siteBoard));
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(.12, 10, 8), siteBeacon); beacon.position.set(x1, hi + .12, z1); site.add(beacon);
    site.traverse(o => { if (o.isMesh) o.castShadow = true; });
    world.add(site);
    return (fixtureSites[key] = { site, beacon, materials, plane: new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), lo: bounds.min.y, hi: bounds.max.y });
  }
  function updateFixtureSites(frame) {
    const building = frame.fixtureBuild || {};
    Object.entries(fixtures).forEach(([key, holder]) => {
      const done = building[key];
      if (done === undefined) {
        const s = fixtureSites[key];
        if (s && s.site.visible) { s.site.visible = false; s.materials.forEach(m => { m.clippingPlanes = null; m.needsUpdate = true; }); }
        return;
      }
      const s = fixtureSite(key, holder);
      if (!s.site.visible || !s.materials[0].clippingPlanes) { s.site.visible = true; s.materials.forEach(m => { m.clippingPlanes = [s.plane]; m.needsUpdate = true; }); }
      // Keeps what lies below the height reached; the first tenth is foundations, so a fresh site is mostly cage.
      s.plane.constant = s.lo + (s.hi - s.lo) * Math.max(0, Math.min(1, (done - .1) / .9));
      holder.visible = true;
      s.beacon.visible = Math.floor((frame.time || 0) / 500) % 2 === 0;
    });
  }
  // The next thing to buy shown where it will stand (frame.fixtureGhost[key], Kevin 2026-10-22: the next kiosk): a
  // blueprint of the fixture's model (blueprint.js), so it reads as a plan rather than a placed object.
  const fixtureGhosts = {};
  function updateFixtureGhosts(frame) {
    const wanted = frame.fixtureGhost || {};
    Object.entries(fixtures).forEach(([key, holder]) => {
      const show = !!wanted[key] && !holder.visible;
      if (!show) { if (fixtureGhosts[key]) fixtureGhosts[key].visible = false; return; }
      if (!fixtureGhosts[key]) {
        const ghost = holder.clone();
        blueprint(ghost);
        world.add(ghost); fixtureGhosts[key] = ghost;
      }
      fixtureGhosts[key].visible = true;
    });
  }
  // A fixture (the online deck) by itself, as the map shows it once built. Null until its model is in, and while it is
  // still being built (its materials are cut to the height reached).
  function fixturePicture(key) {
    if (pictures['fixture.' + key]) return pictures['fixture.' + key];
    if (!fixtures[key] || (fixtureSites[key] && fixtureSites[key].site.visible)) return null;
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
  // Blender cars (layout.carModels): one car and one van, nose along +x at the shared Blender scale, with the wheels
  // turned by the distance driven. The boxes stand in until both have loaded. Every part of a model is one instanced
  // mesh over all the cars of that kind, so ten cars cost a part's draw once rather than ten times (they were about
  // 600 draws a frame with the shadow pass). The paint takes each car's colour from its instance colour, and a wheel's
  // parts are placed through their wheel, turned about its axle.
  const CAR_SCALE = 1.69, axle = new THREE.Vector3(0, 0, 1), spin = new THREE.Quaternion();
  const carSources = {};
  Object.entries(layout.carModels || {}).forEach(([kind, file]) => loader.load(layout.modelBase + file, gltf => {
    const root = gltf.scene;
    prepare(root);
    compactModel(root);
    root.updateMatrixWorld(true);
    const toRoot = root.matrixWorld.clone().invert();
    const wheels = ['WheelFL', 'WheelFR', 'WheelBL', 'WheelBR'].map(n => root.getObjectByName(n)).filter(Boolean);
    const parts = [];
    root.traverse(o => {
      if (!o.isMesh) return;
      let wheel = null;
      for (let p = o; p && !wheel; p = p.parent) if (wheels.includes(p)) wheel = p;
      const paint = /Paint$/.test(o.material.name), material = paint ? o.material.clone() : o.material;
      if (paint) material.color.set('#ffffff');
      const mesh = new THREE.InstancedMesh(o.geometry, material, MAX_CARS);
      mesh.castShadow = o.castShadow; mesh.receiveShadow = o.receiveShadow; mesh.count = 0;
      mesh.renderOrder = o.renderOrder;
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      if (paint) mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX_CARS * 3).fill(1), 3).setUsage(THREE.DynamicDrawUsage);
      world.add(mesh);
      parts.push(wheel ? {
        mesh, paint,
        // The part in its wheel's space, and the wheel's parent in the car's space; the wheel's own turn goes between.
        local: wheel.matrixWorld.clone().invert().multiply(o.matrixWorld),
        mount: toRoot.clone().multiply(wheel.parent.matrixWorld),
        wheel: { position: wheel.position.clone(), rest: wheel.quaternion.clone(), scale: wheel.scale.clone() }
      } : { mesh, paint, local: toRoot.clone().multiply(o.matrixWorld) });
    });
    const wheel = wheels[0];
    carSources[kind] = { parts, radius: wheel ? new THREE.Box3().setFromObject(wheel).getSize(new THREE.Vector3()).y / 2 : .25 };
  }, undefined, e => console.warn('3D map: could not load ' + file, e)));
  // Street props (main.js passes frame.props: file, feet and turn, from the street's jobs and the queue posts). Each
  // file loads on first need and is baked into one geometry per material, drawn instanced over all its placements, so
  // forty props cost a few dozen draws rather than a thousand. Lamps glow through their LampGlow material after dark.
  const MAX_PROPS = 320, propSources = {}, propRequested = {}, glowMaterials = new Set();
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
      // Vertex colours stay: the city models (art/blender/city) paint every part through one material that way.
      Object.keys(g.attributes).forEach(k => { if (k !== 'position' && k !== 'normal' && k !== 'uv' && k !== 'color') g.deleteAttribute(k); });
      if (!g.attributes.normal) g.computeVertexNormals();
      if (!byMaterial.has(o.material)) byMaterial.set(o.material, []);
      byMaterial.get(o.material).push(g);
    });
    const parts = [...byMaterial].map(([mat, list]) => {
      // Parts merge only with the attributes they all share.
      ['uv', 'color'].forEach(k => { if (list.some(g => !g.attributes[k])) list.forEach(g => g.deleteAttribute(k)); });
      // A car's body paint takes each copy's own tint (p.tint, the parked cars): the material goes white and every copy
      // carries its colour, the model's own unless tinted.
      if (/Paint$/.test(mat.name)) { mat.userData.paint = mat.color.clone(); mat.color.set('#ffffff'); }
      const merged = mergeGeometries(list), lit = paneAttribute(merged, mat);
      const mesh = new THREE.InstancedMesh(merged, lit ? nightWindows(withHaze(mat), 'pane') : withHaze(mat), MAX_PROPS);
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
        gltf.scene.traverse(o => { if (o.isMesh && o.material.name === 'LampGlow') glowMaterials.add(o.material); });
        softenMetal(gltf.scene);
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
      parts.forEach(m => { if (m.material.userData.paint) m.setColorAt(m.count, p.tint ? colour.set(p.tint) : m.material.userData.paint); m.setMatrixAt(m.count++, matrix); });
    });
    // An unused prop is hidden rather than drawn zero times, which still costs its state changes.
    Object.values(propSources).forEach(parts => parts.forEach(m => { m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; m.visible = m.count > 0; }));
    glowMaterials.forEach(m => { m.emissive.set('#ffd9a0'); m.emissiveIntensity = night * 2.5; });
  }

  // Night light on the ground (Kevin's visual review, 2026-11-07): a warm pool under every street lamp, the shop's
  // light spilling out of its storefront and open front onto the pavement, and car headlight beams, as additive decals
  // in one instanced draw. No real light and no shadow: the pools are painted, so the phone pays one draw after dark.
  // shape 0 is a round pool (falls off from the middle), 1 a spill: bright along its local -z edge (the wall, or the
  // car's nose), fading outward, with soft ends.
  const MAX_POOLS = 200;
  const poolShape = new THREE.InstancedBufferAttribute(new Float32Array(MAX_POOLS), 1);
  const poolGeometry = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  poolGeometry.setAttribute('shape', poolShape);
  const poolMaterial = new THREE.ShaderMaterial({
    uniforms: { strength: { value: 0 }, ...hazeUniforms },
    vertexShader: `attribute float shape; varying float vShape; varying vec2 vUv; varying vec3 vTint; varying vec3 vWorld;
      void main() {
        vUv = uv; vShape = shape; vTint = vec3(1.0);
        #ifdef USE_INSTANCING_COLOR
          vTint = instanceColor;
        #endif
        vec4 w = modelMatrix * instanceMatrix * vec4(position, 1.0); vWorld = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: `uniform float strength; uniform vec4 hazeX, hazeZ; varying float vShape; varying vec2 vUv; varying vec3 vTint; varying vec3 vWorld;
      void main() {
        float a;
        if (vShape < .5) { float d = length(vUv * 2.0 - 1.0); a = pow(max(0.0, 1.0 - d), 1.7); }
        else a = smoothstep(0.0, .22, vUv.x) * smoothstep(1.0, .78, vUv.x) * pow(vUv.y, 1.6);
        // Fades out into the haze like the ground under it, so no pool floats at the town's edge.
        vec2 g = vWorld.xz - vWorld.y;
        float clear = (1.0 - smoothstep(hazeX.x, hazeX.y, g.x)) * (1.0 - smoothstep(hazeX.z, hazeX.w, g.x)) * (1.0 - smoothstep(hazeZ.x, hazeZ.y, g.y)) * (1.0 - smoothstep(hazeZ.z, hazeZ.w, g.y));
        gl_FragColor = vec4(vTint * a * strength * clear, 1.0);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false
  });
  const pools = new THREE.InstancedMesh(poolGeometry, poolMaterial, MAX_POOLS);
  pools.count = 0; pools.frustumCulled = false; pools.renderOrder = 1; pools.visible = false;
  pools.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  world.add(pools);
  const LAMP_POOL = new THREE.Color('#ffc46a'), SHOP_SPILL = new THREE.Color('#ffc163'), HEADLIGHT = new THREE.Color('#fff1cf'), TAIL = new THREE.Color('#ff3b2a');
  const branchGlow = [];
  const poolTurn = new THREE.Quaternion(), poolAt = new THREE.Vector3(), poolSize = new THREE.Vector3();
  const standUp = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
  // upright: the decal stands as a wall wash facing +z (toward the camera) instead of lying on the ground.
  function pool(x, y, z, w, d, turn, shape, tint, gain = 1, upright = false) {
    if (pools.count >= MAX_POOLS) return;
    poolTurn.setFromAxisAngle(yAxis, turn);
    if (upright) poolTurn.multiply(standUp);
    pools.setMatrixAt(pools.count, matrix.compose(poolAt.set(x, y + .03, z), poolTurn, poolSize.set(w, 1, d)));
    pools.setColorAt(pools.count, colour.copy(tint).multiplyScalar(gain));
    poolShape.setX(pools.count++, shape);
  }
  // The shop's own light after dark (Kevin, 2026-11-08: "improve in-store lighting at night"). The point lamps in
  // shell.js light the rooms evenly; these painted pools give them the pockets a lit room has: a task light on every
  // working station (the grow benches in their lamps' violet), a brighter pool under each hanging lamp and a soft wash
  // over the upper floors. All in the pools' one draw, so the phone pays nothing extra.
  const TASK_LIGHT = new THREE.Color('#ffc477'), GROW_LIGHT = new THREE.Color('#d98cff'), COUNTER_LIGHT = new THREE.Color('#ffd79a');
  function shopInterior(frame) {
    (frame.stations || []).forEach(s => {
      if (!s.built || s.visible === false || (s.pop !== undefined && s.pop < 1) || s.index === undefined) return;
      const r = Math.max(s.w, s.d), grow = s.index === 1, counter = s.index === 4 || s.index === 6;
      pool(s.x, s.y, s.z, r * 2.6, r * 2.6, 0, 0, grow ? GROW_LIGHT : counter ? COUNTER_LIGHT : TASK_LIGHT, grow ? .95 : s.y > 0 ? .75 : .55);
    });
    const sh = layout.shell;
    if (!sh) return;
    // Each lamp's own pool on the floor below it.
    sh.lamps.forEach(([x, y, z, power]) => {
      const floor = [...layout.floors].reverse().find(f => f.y < y);
      if (floor) pool(x, floor.y, z, 6.4, 6.4, 0, 0, TASK_LIGHT, (floor.y > 0 ? .6 : .42) * power);
    });
    // The upper floors sit out of the ground floor's lamps, so they take a soft wash of their own.
    layout.floors.forEach((f, n) => { if (n) pool(f.x || 0, f.y, f.z + f.d * .1, f.w * .95, f.d * 1.5, 0, 0, TASK_LIGHT, n === 2 ? .75 : .45); });
  }
  // The online pickup window after dark (Kevin, 2026-11-08: "add exterior lighting for the pick up"): it sits on the
  // sidewalk outside the shop's own light, so it takes its own: a warm glow inside the hatch, a pool on the counter and
  // the pavement where the line waits, and a soft one round its A-frame sign. Painted pools in the same one draw.
  const PICKUP_LIGHT = new THREE.Color('#ffc16a');
  function pickupLight(frame) {
    const shown = frame.fixtures && Object.keys(frame.fixtures).some(k => k.startsWith('pickupWindow') && frame.fixtures[k]);
    const w = shown && (layout.fixtures || []).find(f => f.key === 'pickupWindow');
    if (!w) return;
    const y = layout.plazaY;
    // Lamplight in the hatch, on the back of the opening, so the clerk and the shelf read as lit.
    pool(w.x, 1.3, w.z + 1.25, 3.2, 3.4, 0, 0, PICKUP_LIGHT, .32, true);
    // The light falling out of the hatch onto the pavement in front, where the line waits.
    pool(w.x, y, w.z + 2.4, 4.8, 4.4, 0, 1, PICKUP_LIGHT, .7);
    pool(w.x, y, w.z + 1.8, 5, 5, 0, 0, PICKUP_LIGHT, .45);
    (frame.props || []).forEach(p => { if (p.file === 'aframe_sign.glb') pool(p.x, Math.max(y, p.y || 0), p.z + .4, 3.4, 3.4, 0, 0, PICKUP_LIGHT, .8); });
  }
  function placePools(frame, night, shopLit) {
    pools.visible = night > .02;
    if (!pools.visible) return;
    pools.count = 0;
    poolMaterial.uniforms.strength.value = night;
    (frame.props || []).forEach(p => { if (p.file === 'street_lamp.glb') pool(p.x, p.y === undefined ? layout.plazaY : p.y, p.z, 7.2, 7.2, 0, 0, LAMP_POOL, 1.35); });
    if (shopLit) {
      // The storefront (MARQUEE) spills out to the left pavement, the open cutaway front toward the camera.
      const f = layout.floors[0], left = layout.entrance ? layout.entrance.x : (f.x || 0) - f.w / 2, right = (f.x || 0) + f.w / 2, front = f.z + f.d / 2, m = layout.marquee;
      if (m) pool(left - 1.9, layout.plazaY, (m.zRear + m.zFront) / 2, m.zFront - m.zRear + 1.5, 3.8, -Math.PI / 2, 1, SHOP_SPILL, .6);
      pool((left + right) / 2, layout.plazaY, front + 1.9, right - left, 3.8, 0, 1, SHOP_SPILL, .45);
      shopInterior(frame);
      pickupLight(frame);
    }
    // The branch stores on the map (placeDistricts): a warm wash over the shop floor, so the line, the counters and the
    // people read after dark, and the same spill out of the open front as the flagship's.
    branchGlow.forEach(b => {
      const cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2, w = b.x1 - b.x0, d = b.z1 - b.z0;
      pool(cx, .1, cz + d * .1, w * 1.25, d * 1.3, 0, 0, SHOP_SPILL, 1.55);
      // Lamplight on the back wall, so the stations stand against a lit room rather than a dark one.
      pool(cx, 2.4, b.z0 + .45, w * 1.1, 5.2, 0, 0, SHOP_SPILL, .7, true);
      pool(cx, .1, b.z1 + 1.9, w, 3.8, 0, 1, SHOP_SPILL, .45);
    });
    // Headlights: a long beam ahead of each car and a faint red glow behind it.
    (frame.cars || []).forEach(c => {
      const ax = c.along === 'x', dx = ax ? c.dir : 0, dz = ax ? 0 : c.dir, turn = Math.atan2(dx, dz), half = c.van ? 2.4 : 2.1;
      pool(c.x + dx * (half + 2.6), layout.streetY, c.z + dz * (half + 2.6), 2.6, 5.4, turn, 1, HEADLIGHT, .95);
      pool(c.x - dx * (half + .5), layout.streetY, c.z - dz * (half + .5), 2.2, 1.6, 0, 0, TAIL, .45);
    });
    pools.instanceMatrix.needsUpdate = true; poolShape.needsUpdate = true;
    if (pools.instanceColor) pools.instanceColor.needsUpdate = true;
  }
  // Rigged characters (Kevin's Meshy cast): every person on the map and in the branches, one skinned copy each with
  // its own mixer.
  // The walk is played by ground covered, never by the clock, so feet keep pace with the figure whatever its speed:
  // one Walking loop covers 1.1 m of ground (measured from the foot's travel). Standing, the idle plays on the clock.
  // People stand at CHARACTER_SCALE of the built 1.36 m figure. Every model is that height now (the 15 Meshy people converted
  // from FBX had stood a quarter taller, which is what read as "a little large", 2026-10-22), so the cast is back at 1.
  const CHARACTER_SCALE = 1, WALK_LOOP = 1.1 * BLENDER_SCALE * CHARACTER_SCALE, CHARACTER_LIFT = .16, CHARACTER_RIM = .9, CHARACTER_SAT = 1.2, CHARACTER_FILL = 1, CHARACTER_BRIGHT = 1.12;
  const characterRim = { value: CHARACTER_RIM };
  const ease01 = v => v * v * (3 - 2 * v);
  const characterSources = {}, characterRequested = {}, characterCopies = [], characterYaw = new Map();
  function characterReady(file) {
    if (!characterRequested[file]) {
      characterRequested[file] = true;
      loader.load(layout.modelBase + file, gltf => {
        prepare(gltf.scene);
        // Meshy exports the colour texture as the emissive map too (at full strength), with metalness 1 and doubled
        // specular: the figure glows flat and milky whatever the light. A matte material lets the sun model him, and a
        // little of the texture as glow (CHARACTER_LIFT, dimmed at night) keeps his shade side from going muddy, and a
        // warm rim on the edges turned from the camera (characterRim) lifts him off the floor the way a painted
        // figure's outline light would. Closer to Meshy's own preview (Kevin, 2026-10-22): colours a little richer
        // (CHARACTER_SAT) and a touch brighter (CHARACTER_BRIGHT) on a cleaner bake.
        const materials = [];
        gltf.scene.traverse(o => {
          if (!o.isMesh) return;
          o.frustumCulled = false;
          const map = o.material.map || o.material.emissiveMap;
          o.material = new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: '#ffffff', emissiveIntensity: CHARACTER_LIFT, roughness: .4, metalness: 0, name: o.material.name });
          o.material.onBeforeCompile = shader => {
            shader.uniforms.characterRim = characterRim;
            shader.uniforms.characterSat = { value: CHARACTER_SAT }; shader.uniforms.characterBright = { value: CHARACTER_BRIGHT }; shader.uniforms.characterFill = { value: CHARACTER_FILL };
            shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nuniform float characterRim, characterSat, characterFill, characterBright;')
              .replace('#include <map_fragment>', `#include <map_fragment>
              diffuseColor.rgb = max(mix(vec3(dot(diffuseColor.rgb, vec3(.2126, .7152, .0722))), diffuseColor.rgb, characterSat), 0.0) * characterBright;`)
              .replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
              reflectedLight.indirectDiffuse *= characterFill;`)
              .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
              float rimFacing = 1.0 - abs(dot(normal, isOrthographic ? vec3(0.0, 0.0, 1.0) : normalize(vViewPosition)));
              totalEmissiveRadiance += diffuseColor.rgb * vec3(1.0, .93, .8) * pow(rimFacing, 3.0) * characterRim;`);
          };
          materials.push(o.material);
        });
        characterSources[file] = { scene: gltf.scene, clips: gltf.animations, materials };
      }, undefined, e => console.warn('3D map: could not load ' + file, e));
    }
    return !!characterSources[file];
  }
  function characterCopy(i, file) {
    let copy = characterCopies[i];
    if (copy && copy.file === file) return copy;
    if (copy) world.remove(copy.holder);
    const source = characterSources[file], holder = new THREE.Group(), body = cloneRigged(source.scene);
    holder.add(body);
    holder.scale.set(BLENDER_SCALE * CHARACTER_SCALE, BLENDER_SCALE * CHARACTER_SCALE / HEIGHT_SCALE, BLENDER_SCALE * CHARACTER_SCALE);
    world.add(holder);
    // Each model names its idle by the Meshy preset it used (Idle_9, Idle_11, Idle_12).
    const mixer = new THREE.AnimationMixer(body), clip = test => source.clips.find(c => test.test(c.name));
    const idle = mixer.clipAction(clip(/^Idle/)), walk = mixer.clipAction(clip(/^Walking$/));
    walk.timeScale = 0;
    idle.play(); walk.play();
    const bone = name => body.getObjectByName('mixamorig' + name);
    return (characterCopies[i] = { file, holder, mixer, idle, walk, rig: bindStaff(body), hand: bone('RightHand'), fore: bone('RightForeArm'), carry: 0 });
  }
  // A shopper who has picked up their order carries it out: the shop's own kraft pickup bag (the production line's
  // cargo bag, the same model the counters hand over: kraft body, folded top, rope handles, green Canopy label) hangs
  // from the right hand, label out, until they leave the map. One instanced mesh for every carrier (184 triangles).
  const MAX_CARRIED = 64, CARRY_SCALE = 1.05;
  const carriedBags = new THREE.InstancedMesh(transport ? transport.bagGeometry() : buildCargoKinds()[4].geometry, new THREE.MeshLambertMaterial({ vertexColors: true }), MAX_CARRIED);
  carriedBags.castShadow = true; carriedBags.count = 0; carriedBags.frustumCulled = false;
  carriedBags.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(carriedBags);
  shopParts.add(ropes);
  const intro = createIntro({ parts: shopParts, characters: () => characterCopies.filter(c => c && c.holder.visible).map(c => c.holder), hideWhilePeople: [carriedBags], sign: shell && shell.introSign });
  // The bag swings from the hand like a pendulum (small-angle, damped), driven by how the grip itself speeds up and
  // slows, so it lags the arm's swing as they walk and rocks to a stop when they stop. Worked in the scene's true
  // space (the world group stretches heights), so the bag tilts without shearing.
  const SWAY_RATE = 7, SWAY_DAMP = 3.2, SWAY_MAX = .32;
  const grip = new THREE.Vector3(), elbowAt = new THREE.Vector3(), bagAt = new THREE.Vector3(), bagTurn = new THREE.Quaternion(), bagTilt = new THREE.Quaternion(), tiltAxis = new THREE.Vector3(), bagSize = new THREE.Vector3(), bagMatrix = new THREE.Matrix4(), upAxis = new THREE.Vector3(0, 1, 0);
  function hangBag(copy, yaw, dt) {
    if (!copy.hand || !copy.fore || carriedBags.count >= MAX_CARRIED) return;
    if (transport && carriedBags.geometry !== transport.bagGeometry()) carriedBags.geometry = transport.bagGeometry();
    const geometry = carriedBags.geometry;
    if (!geometry.boundingBox) geometry.computeBoundingBox();
    // The grip is a little past the wrist along the forearm (the palm).
    copy.hand.updateWorldMatrix(true, false);
    grip.setFromMatrixPosition(copy.hand.matrixWorld);
    elbowAt.setFromMatrixPosition(copy.fore.matrixWorld);
    grip.addScaledVector(elbowAt.sub(grip).negate(), .32);
    const top = geometry.boundingBox.max.y * .94 * CARRY_SCALE;
    // Sway state: the grip's last place and speed, and the bag's lean (x, z: how far its base has swung out, in
    // radians) and how fast that lean is changing. A copy that jumped (handed to another person) starts still.
    let w = copy.sway;
    if (!w || Math.hypot(grip.x - w.px, grip.z - w.pz) > .6) w = copy.sway = { px: grip.x, pz: grip.z, vx: 0, vz: 0, tx: 0, tz: 0, ox: 0, oz: 0 };
    if (dt > 0) {
      const h = Math.min(dt, 1 / 20), vx = (grip.x - w.px) / dt, vz = (grip.z - w.pz) / dt, ax = (vx - w.vx) / dt, az = (vz - w.vz) / dt;
      w.ox += (-SWAY_RATE * SWAY_RATE * w.tx - SWAY_DAMP * w.ox - ax / top * .5) * h;
      w.oz += (-SWAY_RATE * SWAY_RATE * w.tz - SWAY_DAMP * w.oz - az / top * .5) * h;
      w.tx += w.ox * h; w.tz += w.oz * h;
      const lean = Math.hypot(w.tx, w.tz);
      if (lean > SWAY_MAX) { w.tx *= SWAY_MAX / lean; w.tz *= SWAY_MAX / lean; w.ox *= .5; w.oz *= .5; }
      w.vx = vx; w.vz = vz;
    }
    w.px = grip.x; w.pz = grip.z;
    // Lean the bag about its handles: the axis turns straight down toward the swung-out direction.
    const lean = Math.hypot(w.tx, w.tz);
    if (lean > 1e-5) bagTilt.setFromAxisAngle(tiltAxis.set(-w.tz / lean, 0, w.tx / lean), lean); else bagTilt.identity();
    bagTurn.setFromAxisAngle(upAxis, yaw - Math.PI / 2).premultiply(bagTilt);
    bagAt.set(0, -top, 0).applyQuaternion(bagTilt).add(grip);
    bagSize.setScalar(CARRY_SCALE);
    carriedBags.setMatrixAt(carriedBags.count++, bagMatrix.compose(bagAt, bagTurn, bagSize));
  }
  // A figure faces the way it walks; standing, what it is doing (c.look), else the way it last walked. With neither,
  // it turns three-quarters to the camera (which looks back along (1, 0, 1); screen right is (cos 45°, 0, -sin 45°)),
  // to the side its sprite would face (facing > 0 is screen right).
  function placeCharacters(list, stepSeconds, night) {
    Object.values(characterSources).forEach(s => s.materials.forEach(m => { m.emissiveIntensity = CHARACTER_LIFT * (1 - night * .85); }));
    characterRim.value = CHARACTER_RIM * (1 - night * .7);
    const seen = new Set();
    carriedBags.count = 0;
    (list || []).forEach((c, i) => {
      if (!characterSources[c.file]) return;
      const copy = characterCopy(i, c.file), amount = c.still ? 0 : Math.max(0, Math.min(1, c.amount || 0));
      copy.holder.visible = true;
      copy.holder.position.set(c.x, c.y || 0, c.z);
      let fx, fz;
      const aim = amount > .3 ? c.heading : c.look || c.heading;
      if (aim) { fx = aim.x; fz = aim.z; }
      else { const side = (c.facing === undefined ? .3 : c.facing) >= 0 ? .75 : -.75; fx = 1 + side; fz = 1 - side; }
      const target = Math.atan2(fx, fz), last = characterYaw.has(c.id) ? characterYaw.get(c.id) : target;
      let turn = target - last; turn -= Math.round(turn / (2 * Math.PI)) * 2 * Math.PI;
      const yaw = last + turn * Math.min(1, stepSeconds * 10);
      characterYaw.set(c.id, yaw); seen.add(c.id);
      copy.holder.rotation.y = yaw;
      const loop = copy.walk.getClip().duration;
      copy.walk.time = (((c.ground || 0) / WALK_LOOP) % 1 + 1) % 1 * loop;
      copy.walk.setEffectiveWeight(amount); copy.idle.setEffectiveWeight(1 - amount);
      copy.mixer.update(c.still ? 0 : stepSeconds);
      // Staff work their post over the idle (staff-motion.js), easing in when a copy takes up a new job.
      if (copy.rig) {
        const role = c.work && c.work.role;
        if (copy.rig.role !== role) { copy.rig.role = role; copy.rig.weight = 0; }
        if (role) {
          copy.rig.weight = c.still ? 1 : Math.min(1, copy.rig.weight + stepSeconds * 2);
          poseStaff(copy.rig, role, c.work.clock, c.work.act, ease01(copy.rig.weight));
        }
      }
      // The bag arm settles in over a third of a second as the order is handed over, and swings with the stride.
      copy.carry = c.bag ? (c.still ? 1 : Math.min(1, copy.carry + stepSeconds * 3)) : 0;
      if (c.bag) {
        poseCarry(copy.rig, amount * Math.sin(copy.walk.time / loop * 2 * Math.PI), ease01(copy.carry));
        hangBag(copy, yaw, c.still ? 0 : stepSeconds);
      }
    });
    carriedBags.instanceMatrix.needsUpdate = true;
    for (let i = (list || []).length; i < characterCopies.length; i++) if (characterCopies[i]) characterCopies[i].holder.visible = false;
    characterYaw.forEach((v, id) => { if (!seen.has(id)) characterYaw.delete(id); });
  }
  const carsModelled = () => !!layout.carModels && Object.keys(layout.carModels).every(k => carSources[k]);
  const carMatrix = new THREE.Matrix4(), wheelMatrix = new THREE.Matrix4(), partMatrix = new THREE.Matrix4(), turned = new THREE.Quaternion();
  const carPaint = new THREE.Color(), carScale = new THREE.Vector3(), carTurn = new THREE.Quaternion(), carAt = new THREE.Vector3(), upright = new THREE.Vector3(0, 1, 0);
  function placeCars(cars) {
    Object.values(carSources).forEach(source => source.parts.forEach(p => { p.mesh.count = 0; }));
    cars.forEach(c => {
      const source = carSources[c.van ? 'van' : 'car'], ax = c.along === 'x';
      if (!source || source.parts[0].mesh.count >= MAX_CARS) return;
      carTurn.setFromAxisAngle(upright, ax ? (c.dir > 0 ? 0 : Math.PI) : (c.dir > 0 ? -Math.PI / 2 : Math.PI / 2));
      carMatrix.compose(carAt.set(c.x, layout.streetY, c.z), carTurn, carScale.set(CAR_SCALE, CAR_SCALE / HEIGHT_SCALE, CAR_SCALE));
      // Rolling forward along +x turns the wheels clockwise about the axle (z) as seen from +z.
      spin.setFromAxisAngle(axle, -c.roll / (source.radius * CAR_SCALE));
      carPaint.set(c.paint);
      source.parts.forEach(p => {
        const i = p.mesh.count++;
        if (p.wheel) {
          wheelMatrix.compose(p.wheel.position, turned.multiplyQuaternions(spin, p.wheel.rest), p.wheel.scale);
          partMatrix.multiplyMatrices(carMatrix, p.mount).multiply(wheelMatrix).multiply(p.local);
        } else partMatrix.multiplyMatrices(carMatrix, p.local);
        p.mesh.setMatrixAt(i, partMatrix);
        if (p.paint) p.mesh.setColorAt(i, carPaint);
      });
    });
    Object.values(carSources).forEach(source => source.parts.forEach(p => {
      p.mesh.instanceMatrix.needsUpdate = true;
      if (p.paint) p.mesh.instanceColor.needsUpdate = true;
      // Bounds round this frame's cars, so a part with every car off screen (or out of the sun's view) is skipped.
      if (p.mesh.count) p.mesh.computeBoundingSphere();
    }));
  }

  const matrix = new THREE.Matrix4(), position = new THREE.Vector3(), scale = new THREE.Vector3(), quaternion = new THREE.Quaternion(), colour = new THREE.Color();
  const dayHemi = hemi.intensity, daySun = sun.intensity, nightSky = new THREE.Color('#1d2440'), daySky = hazeColour.clone();
  // Moonlight (Kevin's visual review, 2026-11-07): after dark the sky light turns a cool blue-violet and the sun a pale
  // moon, so the night reads as night rather than a dim overcast day, while warm lamps, windows and the shop stand out.
  const daySkyLight = hemi.color.clone(), dayBounce = hemi.groundColor.clone(), daySunLight = sun.color.clone();
  const moonSky = new THREE.Color('#8f98e6'), moonBounce = new THREE.Color('#3a3456'), moon = new THREE.Color('#a9b8ff');
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
    // Low Power Mode (frame.lowPower) draws the map at 1.5x, which on a 3x phone is 44% fewer pixels than 2x.
    const pixelRatio = Math.min(frame.dpr, frame.lowPower ? 1.5 : 2);
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
    breatheBlueprint(!!frame.ghostReady, (frame.time || 0) / 1000, night);
    hemi.intensity = dayHemi * (1 - night * .66);
    hemi.color.copy(daySkyLight).lerp(moonSky, night);
    hemi.groundColor.copy(dayBounce).lerp(moonBounce, night);
    sun.intensity = daySun * (1 - night * .86);
    sun.color.copy(daySunLight).lerp(moon, night);
    nightWindowsUniform.value = night;
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
    pools.visible = false;
    placeFigures(frame.figures || [], night);
    const stepSeconds = frameStep(frame);
    placeCharacters(frame.characters, stepSeconds, night);
    shadowsDue();
    if (!frame.dry) renderer.render(scene, camera);
    return true;
  }

  // How far the map's motion moves this frame: the game's own clock (frame.step, game seconds), so people, staff and
  // stations stand still while the game is paused and keep pace with 2x and 4x; wall time only for a caller without one.
  function frameStep(frame) {
    const clockNow = performance.now(), wall = Math.min(.1, (clockNow - (lastStep || clockNow)) / 1000);
    lastStep = clockNow;
    return frame.step === undefined ? wall : Math.max(0, Math.min(.4, frame.step));
  }
  // Branches on the main map (branch-districts.js, main.js districtScenes): every district on or near the screen comes
  // in the frame with its recorded scene, drawn by a pooled branch layer moved onto its block, and its plot's own
  // ground (the theme's land and its river or creek, cut to the plot) in the hole the town leaves for it; the next
  // branch's block shows its lot for lease behind a hoarding. A plot not on show is plain paving. The east haze moves
  // out with the empire (frame.hazeEast).
  const districtLayers = [], districtGrounds = {}, PLOT_FILL = '#d2c8ab';
  function districtGround(d) {
    const key = d.index + (d.popup ? ':popup' : d.lease ? ':lease' : d.scene ? ':open' : ':plain');
    if (districtGrounds[key]) return districtGrounds[key];
    const group = new THREE.Group(), p = layout.districtPlots[d.index];
    group.userData.land = true;
    if (d.popup) {
      // The weekend market's plot under its brick square (popup-market.js lays the bricks).
      const P = layout.plazaY;
      span(group, p.x0, p.x1, P - 1, P + .02, p.z0, p.z1, '#d6c6a2', { cast: false });
    } else if (d.scene) {
      const spec = d.land, c = { x: p.x0 - spec.plot[0], z: p.z0 - spec.plot[2] };
      let ground = [[p.x0, p.x1, p.z0, p.z1]];
      const strips = (spec.strips || []).map(w => [w.x0 === undefined ? p.x0 : c.x + w.x0, w.x1 === undefined ? p.x1 : c.x + w.x1, w.z0 === undefined ? p.z0 : c.z + w.z0, w.z1 === undefined ? p.z1 : c.z + w.z1].map((v, k) => Math.max(k < 2 ? p.x0 : p.z0, Math.min(k < 2 ? p.x1 : p.z1, v))));
      strips.forEach(r => { ground = subtract(ground, r); });
      ground.forEach(([x0, x1, z0, z1]) => span(group, x0, x1, spec.y - 1.2, spec.y, z0, z1, spec.colour, { cast: false }));
      strips.forEach((r, i) => { if (r[1] > r[0] && r[3] > r[2]) span(group, r[0], r[1], spec.y - 1.2, spec.strips[i].y, r[2], r[3], spec.strips[i].colour, { cast: false }); });
    } else {
      const P = layout.plazaY;
      span(group, p.x0, p.x1, P - 1, d.lease ? P + .03 : P, p.z0, p.z1, d.lease ? '#a7b58f' : PLOT_FILL, { cast: false });
      if (d.lease) {
        // A low post-and-rail fence a unit in from the plot's edge, open at the front's middle where the tag stands.
        const x0 = p.x0 + .8, x1 = p.x1 - .8, z0 = p.z0 + .8, z1 = p.z1 - .8, mid = (x0 + x1) / 2, gap = d.lease.gap || 3, wood = '#8a6b4c';
        const runs = [[x0, z0, x1, z0], [x0, z0, x0, z1], [x1, z0, x1, z1], [x0, z1, mid - gap, z1], [mid + gap, z1, x1, z1]];
        runs.forEach(([a0, b0, a1, b1]) => {
          const along = a1 - a0 > b1 - b0, len = along ? a1 - a0 : b1 - b0, n = Math.max(1, Math.round(len / 2.4));
          for (let k = 0; k <= n; k++) { const x = along ? a0 + len * k / n : a0, z = along ? b0 : b0 + len * k / n; span(group, x - .09, x + .09, P, P + 1.05, z - .09, z + .09, wood); }
          [.45, .85].forEach(h => span(group, a0 - .05, (along ? a1 : a0) + .05, P + h, P + h + .07, b0 - .05, (along ? b0 : b1) + .05, '#a9855d'));
        });
      }
    }
    world.add(group);
    return (districtGrounds[key] = group);
  }
  // A branch being built (frame district.build, the share done; Kevin, 2026-11-05): its shop rises out of the lot
  // behind a scaffold across the front and down the sides, an amber beacon blinking on top, as the city buildings
  // build. Made once per plot when first needed and only shown while that branch builds.
  const districtSites = {}, SITE_H = 7.6;
  function districtSite(index, d) {
    if (districtSites[index]) return districtSites[index];
    const g = new THREE.Group(), p = layout.districtPlots[index], P = layout.plazaY;
    // Round the shop itself (its tall boxes), not the whole plot with its river and terrace.
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    const own = branchShop(index).userData.bounds;
    if (own) { x0 = d.x + own.x0; x1 = d.x + own.x1; z0 = d.z + own.z0; z1 = d.z + own.z1; }
    else (d.scene.boxes || []).forEach(b => { if (b.y + b.h < 2.6 || b.h < 1.6 || Math.max(b.w, b.d) < 1.8) return; x0 = Math.min(x0, d.x + b.x - b.w / 2); x1 = Math.max(x1, d.x + b.x + b.w / 2); z0 = Math.min(z0, d.z + b.z - b.d / 2); z1 = Math.max(z1, d.z + b.z + b.d / 2); });
    if (!(x1 > x0)) { x0 = p.x0 + .6; x1 = p.x1 - .6; z0 = p.z0 + .6; z1 = p.z1 - .6; }
    x0 = Math.max(p.x0 + .3, x0 - .5); x1 = Math.min(p.x1 - .3, x1 + .5); z0 = Math.max(p.z0 + .3, z0 - .5); z1 = Math.min(p.z1 - .3, z1 + .6);
    // Uprights every few units along the front and sides, ledgers at each lift, and a planked deck on the front.
    const posts = [];
    for (let k = 0, n = Math.max(2, Math.round((x1 - x0) / 3.2)); k <= n; k++) posts.push([x0 + (x1 - x0) * k / n, z1]);
    for (let k = 0, n = Math.max(1, Math.round((z1 - z0) / 3.6)); k < n; k++) { const z = z0 + (z1 - z0) * k / n; posts.push([x0, z], [x1, z]); }
    posts.forEach(([x, z]) => span(g, x - .06, x + .06, P, P + SITE_H, z - .06, z + .06, '#9aa39b'));
    for (let y = 2.2; y < SITE_H; y += 2.4) {
      span(g, x0, x1, P + y, P + y + .07, z1 - .2, z1 + .25, '#c9a978');
      span(g, x0 - .05, x0 + .05, P + y, P + y + .06, z0, z1, '#9aa39b'); span(g, x1 - .05, x1 + .05, P + y, P + y + .06, z0, z1, '#9aa39b');
    }
    // A plywood hoarding along the pavement, open in the middle for the gate, with a forest band.
    const mid = (x0 + x1) / 2;
    [[x0, mid - 2], [mid + 2, x1]].forEach(([a, b]) => { span(g, a, b, P, P + 1.5, z1 + .35, z1 + .45, '#d9c39a'); span(g, a, b, P + 1.1, P + 1.3, z1 + .44, z1 + .47, '#2f6b45'); });
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(.16, 8, 6), new THREE.MeshBasicMaterial({ color: '#ffb52e' }));
    beacon.position.set(x1, P + SITE_H + .2, z1); g.add(beacon); g.userData.beacon = beacon;
    world.add(g);
    return (districtSites[index] = g);
  }
  // An opening branch (district.opening, 0 when its build finishes and 1 a beat later) springs up with a small
  // overshoot that settles, as the shop does on first load.
  // Each branch's building in the flagship's style (branch-shops.js), made once when its district first shows.
  const branchShops = {};
  function branchShop(index) {
    if (!branchShops[index]) {
      try { branchShops[index] = buildBranchShop(world, index, { hazed, model }); } catch (e) { console.warn('3D map: branch shop failed', e); branchShops[index] = new THREE.Group(); }
    }
    return branchShops[index];
  }
  // The weekend pop-up market (popup-market.js), made the first time a market shows and moved to whichever block it is on.
  let popupMarket = null;
  function placePopup(d, night) {
    if (!d) { if (popupMarket) popupMarket.visible = false; return; }
    if (!popupMarket) { try { popupMarket = buildPopupMarket(world, { hazed }); } catch (e) { console.warn('3D map: pop-up market failed', e); popupMarket = new THREE.Group(); world.add(popupMarket); } }
    popupMarket.visible = true; popupMarket.position.set(d.x, layout.plazaY, d.z);
    if (popupMarket.userData.update) popupMarket.userData.update({ theme: d.popup.theme, open: d.popup.open, night: night > .5 });
  }
  const springUp = t => { if (t <= 0) return .02; if (t >= 1) return 1; const k = t - 1; return Math.max(.02, 1 + 2.7 * k * k * k + 1.7 * k * k); };
  // The weekend markets' keepsakes: bunting on the flagship's street, built the first time one is won.
  let bunting = null;
  function placeBunting(ids) {
    if (!ids || !ids.length) { if (bunting) bunting.visible = false; return; }
    if (!bunting) { try { bunting = buildKeepsakeBunting(world, { hazed }); } catch (e) { console.warn('3D map: keepsake bunting failed', e); bunting = new THREE.Group(); world.add(bunting); } }
    if (bunting.userData.update) bunting.userData.update(ids);
  }
  function placeDistricts(list, night) {
    const shown = new Set(), sites = new Set(), shops = new Set();
    branchGlow.length = 0;
    let used = 0;
    (list || []).forEach(d => {
      if (d.scene) {
        const layer = districtLayers[used] || (districtLayers[used] = createBranchLayer(world, { lights: 0 }));
        used++;
        layer.group.visible = true; layer.group.position.set(d.x, 0, d.z);
        const rise = d.build != null ? Math.max(.02, d.build) : d.opening != null ? springUp(d.opening) : 1;
        layer.group.scale.set(1, rise, 1);
        layer.update(d.scene, night);
        const shop = branchShop(d.index);
        shop.visible = true; shop.position.set(d.x, 0, d.z); shop.scale.set(1, rise, 1);
        if (shop.userData.night) shop.userData.night(night);
        // An open branch glows from inside after dark like the flagship (placePools); its floor is the plot's y 0.
        const own = shop.userData.bounds;
        if (own && d.build == null && d.opening == null) branchGlow.push({ x0: d.x + own.x0, x1: d.x + own.x1, z0: d.z + own.z0, z1: d.z + own.z1 });
        shops.add(d.index);
        if (d.build != null) { const site = districtSite(d.index, d); site.visible = true; site.userData.beacon.visible = Math.floor(performance.now() / 500) % 2 === 0; sites.add(d.index); }
      }
      shown.add(d.index);
      const g = districtGround(d); g.visible = true; g.userData.shownFrame = frameClock;
    });
    Object.keys(districtSites).forEach(k => { if (!sites.has(+k)) districtSites[k].visible = false; });
    Object.keys(branchShops).forEach(k => { if (!shops.has(+k)) branchShops[k].visible = false; });
    for (let n = used; n < districtLayers.length; n++) districtLayers[n].group.visible = false;
    placePopup(list && list.find(d => d.popup), night);
    Object.values(districtGrounds).forEach(g => { if (g.userData.shownFrame !== frameClock) g.visible = false; });
    // Plots not on show: plain paving, so no hole ever shows.
    (layout.districtPlots || []).forEach((p, i) => { if (!shown.has(i)) { const g = districtGround({ index: i }); g.visible = true; g.userData.shownFrame = frameClock; } });
  }

  function render(frame) {
    if (lost) return false;
    branchMode(false);
    const night = view(frame, daySky);
    if (frame.hazeEast) { hazeUniforms.hazeX.value.z = frame.hazeEast[0]; hazeUniforms.hazeX.value.w = frame.hazeEast[1]; }
    placeDistricts(frame.districts, night);
    placeBunting(frame.keepsakes);

    const stepSeconds = frameStep(frame);
    let ringShown = false;
    frame.stations.forEach((s, i) => {
      const group = stationMesh(i), { body, top } = group.userData;
      group.visible = s.visible !== false;
      if (!group.visible) return;
      // A built station with a loaded model shows the model (one copy per slot, so the order desks can share one).
      const key = s.index + '.' + Math.max(1, s.tier);
      if (s.built) { requestModel(key); requestModel(s.index + '.3'); }
      const sourceKey = models[key] ? key : s.index + '.3', modelKey = s.ghost ? sourceKey + '|ghost' : sourceKey;
      const model = s.built && s.index !== undefined && models[sourceKey];
      const clones = group.userData.clones || (group.userData.clones = {});
      const rigs = group.userData.rigs || (group.userData.rigs = {});
      // A ghost (the next order counter) is the same blueprint the next kiosk uses, standing still.
      if (model && !clones[modelKey]) {
        group.add(clones[modelKey] = model.clone());
        if (s.ghost) blueprint(clones[modelKey]);
        else rigs[modelKey] = bindStation(clones[modelKey], s.index);
      }
      if (model && rigs[modelKey]) moveStation(rigs[modelKey], s, stepSeconds);
      Object.entries(clones).forEach(([k, c]) => { c.visible = !!model && k === modelKey; });
      body.visible = !model;
      const h = s.built ? s.h : .12, lift = s.rise ? -s.rise * s.rise * 1.1 : 0;
      group.position.set(s.x, s.y + lift, s.z);
      // The first-load pop (frame pop, 0 to 1): grows out of the floor with a soft overshoot and settles.
      const pop = s.pop === undefined ? 1 : s.pop, k = pop - 1, grow = pop >= 1 ? 1 : 1 + 2.4 * k * k * k + 1.4 * k * k;
      // An upgrade's squash and spring (frame bump, 0 to 1) rides on top, from the floor up.
      const spring = springScale(s.bump), g = Math.max(.001, grow);
      group.scale.set(g * spring[0], g * spring[1], g * spring[0]);
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
    // Slots the frame no longer fills (the next counter's ghost once the last counter is bought) stay hidden.
    for (let n = frame.stations.length; n < stationMeshes.length; n++) if (stationMeshes[n]) stationMeshes[n].visible = false;
    selectionRing.visible = ringShown;
    let glowing = 0;
    const beat = (frame.time || 0) / 1000;
    frame.stations.forEach(s => {
      if (!(s.boost > 0) || s.visible === false || (s.pop !== undefined && s.pop < 1)) return;
      const { pool, ring } = boostGlow(glowing++), r = Math.max(s.w, s.d) * .75, breathe = .5 + .5 * Math.sin(beat * 3.2), rise = (beat * .7) % 1;
      pool.visible = ring.visible = true;
      pool.position.set(s.x, s.y + .025, s.z); pool.scale.set(r * 3.8, 1, r * 3.8); pool.material.opacity = .38 + .25 * breathe;
      ring.position.set(s.x, s.y + .05 + rise * 1.4, s.z); ring.scale.set(r * (.9 + rise * .35), 1, r * (.9 + rise * .35)); ring.material.opacity = .7 * (1 - rise);
    });
    for (let n = glowing; n < boostGlows.length; n++) boostGlows[n].pool.visible = boostGlows[n].ring.visible = false;
    updateUpgradeRings(frame.upgradeRings);
    updateYouMarker(frame.manager, frame.time);
    updateRevealBeams(frame.revealBeams, frame.unit || 40);
    updateSparkles(frame.sparkles);

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
    terraces.forEach(t => { t.visible = !propSources[t.userData.model] && !(t.userData.lot && frame.cityClaimed && frame.cityClaimed[t.userData.lot]); t.renderOrder = frame.backdrops ? -2 : 0; t.material.colorWrite = !frame.backdrops; });
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
    placePools(frame, night, true);
    placeCharacters(frame.characters, stepSeconds, night);
    fixtureGlows.forEach(m => { m.emissiveIntensity = .16 + night * .7; });
    fixtureScreens.forEach(m => { m.emissiveIntensity = .35 + night * .55; });
    Object.entries(menuScreens).forEach(([key, screen]) => showMenu(screen, frame.menus ? frame.menus[key] : null, frame.menuClock || 0));
    lampStandIns.forEach(m => { m.visible = !propSources['street_lamp.glb']; });
    const modelled = carsModelled();
    placeCars(modelled ? frame.cars : []);
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
    if (flagship) flagship.update(frame);
    if (atms) atms.update(frame);
    cityBuildings.update(frame);
    Object.entries(fixtures).forEach(([key, holder]) => {
      // A fixture just bought (frame.fixtureReveal[key]: [across, up], or null while the camera is still on its way)
      // pops up out of the floor; an upgraded one (frame.fixtureSprings[key], 0 to 1) springs. Both on its own origin, which sits on the floor.
      const reveal = frame.fixtureReveal ? frame.fixtureReveal[key] : undefined;
      holder.visible = !!(frame.fixtures && frame.fixtures[key]) && reveal !== null;
      const base = holder.userData.base || (holder.userData.base = holder.scale.clone()), spring = springScale(frame.fixtureSprings && frame.fixtureSprings[key]), pop = reveal || [1, 1];
      holder.scale.set(base.x * spring[0] * pop[0], base.y * spring[1] * pop[1], base.z * spring[0] * pop[0]);
    });
    updateFixtureSites(frame);
    updateFixtureGhosts(frame);

    // A dry frame (snap3d.mjs, while models load) sets the scene up and asks for its models without drawing it.
    if (!frame.dry) {
      const posed = intro.apply(frame.intro);
      shadowsDue();
      renderer.render(scene, camera);
      if (posed) intro.restore();
    }
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
    characterReady,
    hasFixture: key => !!fixtures[key],
    stationPicture,
    loungePicture,
    fixturePicture,
    stats,
    // Dev only (?snap, scripts/map-icons.mjs): the scene's parts, so a script can draw one building on its own.
    debug: { THREE, scene, world, camera, renderer, haze: hazeUniforms },
    get ok() { return !lost; },
    // Files still loading plus loaded models still waiting for their setup.
    get loading() { return loading + setups.length; },
    get loadCounts() { return { done: loadDone, total: loadTotal }; },
    dispose() { cancelAnimationFrame(setupPump); setups.length = 0; renderer.dispose(); materials.forEach(m => m.dispose()); }
  };
}

// The town round the shop: one asphalt floor at street level, every block between the streets a paved slab up to the
// plaza level (so kerbs are the slabs' edges), the terraces as blocks of their wall colour, trees and lamps.
function buildTown(world, layout, { box, span, material, textured, lampStandIns, nightWindows }) {
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
  // The streets along x run on east to the branch districts (layout.eastEnd), so the ground does too.
  const E = layout.eastEnd || L;
  slab(-L, E, G - .4, G, -L, L, layout.colours.asphalt, 'asphalt');
  const edges = along => {
    const at = roads.filter(r => r.along === along).map(r => r.at).sort((a, b) => a - b), out = [];
    let from = -L;
    at.forEach(a => { out.push([from, a - rw / 2]); from = a + rw / 2; });
    out.push([from, along === 'z' ? E : L]);
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
    // A mark with a height (m.h: kerb stones, drain grates) stands from m.y; paint is a sliver just under its m.y.
    list.forEach((m, i) => mesh.setMatrixAt(i, mm.compose(mp.set((m.x0 + m.x1) / 2, m.h ? m.y : m.y - .004, (m.z0 + m.z1) / 2), mq, ms.set(m.x1 - m.x0, m.h || .012, m.z1 - m.z0))));
    mesh.receiveShadow = true;
    world.add(mesh);
  });
  const terraces = [];
  layout.buildings.forEach(b => {
    // Each block steps aside for its Blender model once that loads (b.model).
    const wall = span(world, b.x0, b.x1, P, b.h, b.z0, b.z1, b.wall, { opts: { name: 'terrace' } });
    const roof = span(world, b.x0 - .15, b.x1 + .15, b.h, b.h + .35, b.z0 - .15, b.z1 + .15, b.roof, { opts: { name: 'terrace' } });
    wall.userData.model = roof.userData.model = b.model; wall.userData.lot = roof.userData.lot = b.lot;
    terraces.push(wall, roof);
  });
  const far = silhouettes(layout.silhouettes || [], P, material);
  nightWindows(far.material, 'pane', { share: .32 });
  world.add(far);
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

// Night windows (nightWindows in createMap3D): the city terraces (art/blender/city) paint every part through one
// material by vertex colour, so their sash glass is the WindowGlass colour and their shop windows the Display and
// ShopGlass colours; the older models give glass its own WindowGlass material. Each pane (the glass triangles joined
// by shared corners) gets one random number in a `pane` attribute: (0, 1] for a sash, 2 + it for a shop window.
// Returns whether the geometry has any glass.
const PANE_GLASS = ['#2f5552'].map(c => new THREE.Color(c)), PANE_SHOP = ['#bfae8a', '#6d6553'].map(c => new THREE.Color(c));
function paneAttribute(g, mat) {
  const pos = g.attributes.position, col = g.attributes.color, n = pos.count;
  const allGlass = mat.name === 'WindowGlass';
  if (!col && !allGlass) return false;
  const near = (list, i) => list.some(c => Math.abs(col.getX(i) - c.r) + Math.abs(col.getY(i) - c.g) + Math.abs(col.getZ(i) - c.b) < .01);
  const kind = new Uint8Array(n / 3);
  let any = false;
  for (let t = 0; t < n / 3; t++) {
    const i = t * 3;
    kind[t] = allGlass || near(PANE_GLASS, i) ? 1 : near(PANE_SHOP, i) ? 2 : 0;
    if (kind[t]) any = true;
  }
  if (!any) return false;
  // Join the glass triangles that share a corner into panes (union-find over rounded corner positions).
  const parent = new Int32Array(n / 3).map((_, i) => i), find = i => { while (parent[i] !== i) i = parent[i] = parent[parent[i]]; return i; };
  const owner = new Map(), key = i => [pos.getX(i), pos.getY(i), pos.getZ(i)].map(v => Math.round(v * 1000)).join(',') + ':' + kind[Math.floor(i / 3)];
  for (let t = 0; t < n / 3; t++) {
    if (!kind[t]) continue;
    for (let k = 0; k < 3; k++) {
      const id = key(t * 3 + k), o = owner.get(id);
      if (o === undefined) owner.set(id, t); else parent[find(t)] = find(o);
    }
  }
  const pick = new Map(), pane = new Float32Array(n);
  for (let t = 0; t < n / 3; t++) {
    if (!kind[t]) continue;
    const root = find(t);
    if (!pick.has(root)) pick.set(root, Math.max(.001, Math.random()));
    pane.fill(pick.get(root) + (kind[t] === 2 ? 2 : 0), t * 3, t * 3 + 3);
  }
  g.setAttribute('pane', new THREE.BufferAttribute(pane, 1));
  return true;
}

// The town beyond the first ring (layout.silhouettes): each lot one box in its muted colour with a pale parapet and a
// dark band of windows per storey on its two faces toward the camera, all merged into one vertex-coloured mesh (one
// draw), casting no shadow. Heights match the Blender terraces' storeys: 2.75 m ground, 2.45 m above, 1.69 units a metre.
function silhouettes(list, P, material) {
  const pos = [], nor = [], col = [], pane = [], c = new THREE.Color(), dark = new THREE.Color(), cap = new THREE.Color('#e6dcc6');
  const quad = (a, b, d, e, n, colour, lit = 0) => {
    [a, b, d, a, d, e].forEach(v => { pos.push(...v); nor.push(...n); col.push(colour.r, colour.g, colour.b); pane.push(lit); });
  };
  // A storey's band of windows, cut into panes about a window and a pier wide, each with its own pick for the night
  // (nightWindows, 'pane' mode). from/to run along the face; at(u, y) gives the corner.
  const band = (from, to, y0, y1, n, at) => {
    const count = Math.max(1, Math.round((to - from) / 1.25)), step = (to - from) / count;
    for (let k = 0; k < count; k++) {
      const a = from + k * step + .14, b = from + (k + 1) * step - .14;
      quad(at(a, y0), at(b, y0), at(b, y1), at(a, y1), n, dark, Math.max(.001, Math.random()));
    }
  };
  const box = (x0, x1, y0, y1, z0, z1, colour) => {
    quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0], colour);
    quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], colour);
    quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0], colour);
    quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], colour);
    quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0], colour);
  };
  const up = 1.69 / HEIGHT_SCALE, ground = 2.75 * up, storey = 2.45 * up;
  list.forEach(b => {
    c.set(b.colour).convertSRGBToLinear(); dark.copy(c).multiplyScalar(.62);
    const top = P + ground + (b.storeys - 1) * storey + .35 * up;
    box(b.x0, b.x1, P, top, b.z0, b.z1, c);
    box(b.x0 - .12, b.x1 + .12, top, top + .3, b.z0 - .12, b.z1 + .12, cap);
    for (let k = 0; k < b.storeys; k++) {
      const y0 = P + (k ? ground + (k - 1) * storey : 0) + (k ? .9 : .5) * up, y1 = y0 + (k ? 1.1 : 1.7) * up;
      band(b.x0 + .5, b.x1 - .5, y0, y1, [0, 0, 1], (u, y) => [u, y, b.z1 + .03]);
      band(-(b.z1 - .5), -(b.z0 + .5), y0, y1, [1, 0, 0], (u, y) => [b.x1 + .03, y, -u]);
    }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('pane', new THREE.Float32BufferAttribute(pane, 1));
  const mesh = new THREE.Mesh(g, material('#ffffff', { vertexColors: true, name: 'silhouette' }));
  mesh.receiveShadow = true; mesh.castShadow = false;
  return mesh;
}

// The floors' textures (layout.floorTextures), ground to top.
const FLOOR_FINISH = ['herringbone', 'boards', 'epoxy'];

// The shop: the timber floor on the plaza, the mezzanine and top floor as slabs on posts, the rear and short side
// walls of the cutaway, and the entrance planter line. Positions are the 2D map's own (drawTower's floors).
function buildShop(world, layout, { box, span, material, textured, model }) {
  const shop = new THREE.Group();
  world.add(shop);
  // The upper floors' edges, merged into two meshes whatever their number: every opaque piece (the slab fascias, the
  // balustrades' green shoes and brass handrails) in one vertex-coloured mesh, every glass pane in one see-through mesh.
  const trim = [], glass = [];
  const piece = (list, x0, x1, y0, y1, z0, z1, colour) => {
    const g = new THREE.BoxGeometry(Math.max(.001, x1 - x0), Math.max(.001, y1 - y0), Math.max(.001, z1 - z0)).translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    const c = new THREE.Color(colour), n = g.attributes.position.count, col = new Float32Array(n * 3);
    for (let k = 0; k < n; k++) c.toArray(col, k * 3);
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.deleteAttribute('uv');
    list.push(g);
  };
  // A slab face from (x0, z0) to (x1, z1) (one of them a line along x or z) at floor height y: a forest green band a
  // touch proud of the slab, from just under its soffit to a brass nosing level with the floor.
  const fascia = (x0, x1, z0, z1, y) => {
    const alongX = z0 === z1, t = .05, lip = .015;
    const [px0, px1, pz0, pz1] = alongX ? [x0, x1, z0, z0 + t] : [x0, x0 + t, z0, z1];
    piece(trim, px0, px1, y - .36, y - .04, pz0, pz1, '#1d4a33');
    piece(trim, px0, px1 + (alongX ? 0 : lip), y - .04, y + .02, pz0, pz1 + (alongX ? lip : 0), '#d0a54e');
  };
  // A frameless glass balustrade over (x0..x1, z0..z1) on a floor at y: a slim green shoe, a clear pane and a brass cap.
  const rail = (x0, x1, z0, z1, y) => {
    const alongX = x1 - x0 > z1 - z0, mid = alongX ? (z0 + z1) / 2 : (x0 + x1) / 2;
    const thin = (lo, hi) => alongX ? [x0, x1, lo, hi] : [lo, hi, z0, z1];
    const box3 = ([a0, a1, b0, b1], y0, y1, colour, list) => piece(list, a0, a1, y0, y1, b0, b1, colour);
    box3(thin(mid - .04, mid + .04), y, y + .1, '#1f5a3c', trim);
    box3(thin(mid - .012, mid + .012), y + .1, y + .98, '#d8ece6', glass);
    box3(thin(mid - .035, mid + .035), y + .98, y + 1.05, '#d0a54e', trim);
  };
  const finishTrim = () => {
    const opaque = new THREE.Mesh(mergeGeometries(trim), material('#ffffff', { vertexColors: true, name: 'slabTrim' }));
    opaque.castShadow = opaque.receiveShadow = true;
    const panes = new THREE.Mesh(mergeGeometries(glass), material('#ffffff', { vertexColors: true, transparent: true, opacity: .24, depthWrite: false, name: 'slabGlass' }));
    panes.renderOrder = 1;
    shop.add(opaque, panes);
  };
  layout.floors.forEach((f, fi) => {
    // The ground floor's timber stops at the storefront's outer face (Kevin, 2026-11-02: it ran out onto the sidewalk).
    const outer = !fi && layout.entrance ? layout.entrance.x : -Infinity;
    const left = Math.max(outer, (f.x || 0) - f.w / 2), right = (f.x || 0) + f.w / 2, rear = f.z - f.d / 2, front = f.z + f.d / 2;
    // Each floor its own finish (visual review, 2026-11-07): the shop's oak herringbone, honey oak boards on the
    // packing level and pale sage sealed epoxy with a tile grid and drain grates in the grow room.
    textured(span(shop, left, right, f.y - (fi ? .32 : .02), f.y, rear, front, fi === 2 ? '#e9e4d8' : fi ? '#e4ddcc' : '#c9965f', { cast: fi > 0 }), FLOOR_FINISH[fi]);
    // The walls themselves are the shell's (shell.js).
    // A glass balustrade along the open front edge of the upper floors, over a crisp fascia on the slab's face.
    if (fi) {
      fascia(left, right, front, front, f.y);
      rail(left, right, front - .07, front - .01, f.y);
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
  const up = -Math.PI / 2;
  spiral(10.2, .35, 0, mezz.y, 14, up);
  textured(span(shop, 8.93, 11.35, mezz.y - .32, mezz.y, -2.8, -.8, '#e4ddcc', { cast: true }), FLOOR_FINISH[1]);
  rail(11.29, 11.35, -2.8, -.8, mezz.y);
  fascia(8.93, 11.35, -.8, -.8, mezz.y); fascia(11.35, 11.35, -2.8, -.8, mezz.y);
  spiral(7.75, -4.4, mezz.y, top.y, 14, up);
  textured(span(shop, 6.45, 9, top.y - .32, top.y, -6.9, -5.55, '#e9e4d8', { cast: true }), FLOOR_FINISH[2]);
  rail(8.94, 9, -6.9, -5.55, top.y);
  fascia(6.45, 9, -5.55, -5.55, top.y); fascia(9, 9, -6.9, -5.55, top.y);
  // The slab ends the camera sees (it looks in from +x), from each landing to the floor's front edge.
  fascia(mezz.w / 2, mezz.w / 2, -.8, mezz.z + mezz.d / 2, mezz.y);
  fascia(top.w / 2, top.w / 2, -5.55, top.z + top.d / 2, top.y);
  // The same glass along every other open edge: both floors' sides past their short rear walls (shell.js) and the
  // landings, with a gap where each spiral arrives (the stair's top tread, at its post's x).
  const side = (x, z0, z1, y) => rail(x - .03, x + .03, z0, z1, y), across = (x0, x1, z, y) => rail(x0, x1, z - .03, z + .03, y);
  const mRear = mezz.z - mezz.d / 2, mFront = mezz.z + mezz.d / 2, tRear = top.z - top.d / 2, tFront = top.z + top.d / 2;
  side(-mezz.w / 2 + .03, mRear + 3.5, mFront - .06, mezz.y);
  side(mezz.w / 2 - .03, mRear, -2.8, mezz.y); side(mezz.w / 2 - .03, -.8, mFront - .06, mezz.y);
  across(9, 11.35, -2.77, mezz.y); across(9, 9.6, -.83, mezz.y); across(10.8, 11.35, -.83, mezz.y);
  side(-top.w / 2 + .03, tRear + 3.5, tFront - .06, top.y);
  side(top.w / 2 - .03, -5.55, tFront - .06, top.y);
  across(top.w / 2, 7.15, -5.58, top.y); across(8.35, 9, -5.58, top.y);
  finishTrim();
  // The storefront along the entrance side (MARQUEE in main.js): a green plinth, glass, the sign band and pilasters.
  // The sprite shop draws it from its own render instead (wallFaces, below).
  const m = layout.marquee;
  if (layout.wallFaces) return;
  span(shop, m.x - .13, m.x + .13, 0, .9, m.zRear, m.zFront, '#1f6b47');
  span(shop, m.x - .04, m.x + .04, .9, m.y0, m.zRear, m.zFront, '#cfe3dc', { cast: false, opts: { transparent: true, opacity: .35 } });
  span(shop, m.x - .16, m.x + .16, m.y0, m.y1, m.zRear, m.zFront, '#1f6b47');
  [m.zRear, m.zFront].forEach(z => box(shop, m.x, 0, z, .34, m.y1, .34, '#174f36'));
}

// The floor opening under a tube's brass floor ring, drawn once on a small canvas: the far half of the shaft wall
// catches a little light, the rest falls to black, and the rim darkens under the ring.
function holeTexture() {
  const size = 128, c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d'), mid = size / 2;
  g.fillStyle = '#050605'; g.fillRect(0, 0, size, size);
  const wall = g.createRadialGradient(mid, mid + size * .2, size * .2, mid, mid + size * .1, size * .55);
  wall.addColorStop(0, 'rgba(5,6,5,0)'); wall.addColorStop(.55, 'rgba(46,30,18,.0)'); wall.addColorStop(.8, 'rgba(58,38,22,.9)'); wall.addColorStop(1, 'rgba(30,20,12,1)');
  g.fillStyle = wall; g.fillRect(0, 0, size, size);
  const lip = g.createRadialGradient(mid, mid, size * .38, mid, mid, size * .5);
  lip.addColorStop(0, 'rgba(0,0,0,0)'); lip.addColorStop(1, 'rgba(0,0,0,.85)');
  g.fillStyle = lip; g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
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
  // One shared disc for every floor opening: near-black in the middle, a dark wood-brown wall showing on the far side
  // (as a shaft seen from above at the map's 30° camera would), and a soft shadow under the brass lip.
  const holeGeometry = new THREE.CircleGeometry(R + .04, 32).rotateX(-Math.PI / 2);
  const holeMaterial = new THREE.MeshBasicMaterial({ map: holeTexture(), toneMapped: false });
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
    ends.forEach(([p, q], i) => { if (!(i === 0 ? tube.noCap0 : tube.noCap1)) parts.push(ring(p, trueSpace(p).sub(trueSpace(q)).normalize(), R + .02, .07, brass)); });
    (tube.floorRings || []).forEach(p => {
      parts.push(ring(p, new THREE.Vector3(0, 1, 0), R + .1, .08, brass));
      // The opening the tube drops through: a dark disc filling the ring, just proud of the floor so it never fights it.
      const hole = new THREE.Mesh(holeGeometry, holeMaterial);
      hole.position.copy(trueSpace(p)).add(new THREE.Vector3(0, .012, 0));
      hole.renderOrder = 1;
      scene.add(hole);
      parts.push(hole);
    });
    const segments = [];
    let total = 0;
    for (let i = 1; i < path.length; i++) { const len = Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1], path[i][2] - path[i - 1][2]); segments.push({ a: path[i - 1], b: path[i], len }); total += len; }
    return { tube, segments, total, parts };
  });
  // Each belt is built in code until the diorama's conveyor_parts.glb loads (loadModels, below).
  const beltStandIns = new THREE.Group(); world.add(beltStandIns);
  const belts = transport.belts.map(b => {
    const length = Math.abs(b.x2 - b.x1), mid = (b.x1 + b.x2) / 2;
    [b.x1, b.x2].forEach(x => box(beltStandIns, x - Math.sign(b.x2 - b.x1) * .25 * (x === b.x1 ? -1 : 1), b.floor, b.z, .12, b.height - .1, .5, '#344a40'));
    box(beltStandIns, mid, b.floor + b.height - .18, b.z, length, .16, b.width, '#536c5b');
    box(beltStandIns, mid, b.floor + b.height - .02, b.z, length - .1, .04, b.width - .2, '#2a4035', { cast: false });
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
    // The pickup bag's current geometry (code-built until cargo_items.glb swaps in the Blender one), for carried bags.
    bagGeometry: () => cargoKinds[4].geometry,
    // The diorama's cargo_items.glb: one empty per kind (Cargo0..Cargo5, base centre at its origin, true metres) whose
    // meshes merge into that kind's vertex-coloured geometry, in place of the code-built stand-in.
    loadModels(loader, base) {
      // The belts: whole map-unit Sections stretched to each belt's length, an End drum at each end and a Leg pair
      // under each end (and the middle of a long belt), each piece origin as conveyor_parts.py describes.
      loader.load(base + 'conveyor_parts.glb', gltf => {
        const piece = name => { const o = gltf.scene.getObjectByName(name); if (o) o.position.set(0, 0, 0); return o; };
        const section = piece('Section'), end = piece('End'), leg = piece('Leg');
        if (!section || !end || !leg) return;
        // Every piece of every belt goes into one group, merged below into one mesh per material: the belts never move,
        // and placed one by one they were some 300 small meshes, each a draw twice over with the shadow pass.
        const pieces = new THREE.Group();
        const add = (source, x, y, z, sx, sy, turn) => {
          const holder = new THREE.Group(), copy = source.clone();
          copy.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
          holder.add(copy); holder.scale.set(1.69 * sx, 1.69 * sy / K, 1.69); holder.position.set(x, y, z);
          if (turn) holder.rotation.y = turn;
          pieces.add(holder);
        };
        belts.forEach(b => {
          const lo = Math.min(b.x1, b.x2), hi = Math.max(b.x1, b.x2), length = hi - lo, count = Math.max(1, Math.round(length));
          const top = b.floor + b.height;
          for (let i = 0; i < count; i++) add(section, lo + (i + .5) * length / count, top, b.z, length / count, 1);
          add(end, hi, top, b.z, 1, 1); add(end, lo, top, b.z, 1, 1, Math.PI);
          const legs = [lo + .25, hi - .25].concat(length > 5 ? [(lo + hi) / 2] : []);
          legs.forEach(x => add(leg, x, b.floor, b.z, 1, (b.height - .18) / .87));
        });
        world.add(pieces);
        compactModel(pieces);
        beltStandIns.visible = false;
      }, undefined, e => console.warn('3D map: could not load conveyor_parts.glb', e));
      loader.load(base + 'cargo_items.glb', gltf => {
        gltf.scene.updateMatrixWorld(true);
        cargoKinds.forEach((kind, k) => {
          const root = gltf.scene.getObjectByName('Cargo' + k);
          if (!root) return;
          const toRoot = root.matrixWorld.clone().invert().premultiply(new THREE.Matrix4().makeScale(1.69, 1.69, 1.69)), parts = [];
          root.traverse(o => {
            if (!o.isMesh) return;
            const g = o.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(toRoot, o.matrixWorld));
            const c = o.material.color, n = g.attributes.position.count, rgb = new Float32Array(n * 3);
            for (let i = 0; i < n; i++) { rgb[i * 3] = c.r; rgb[i * 3 + 1] = c.g; rgb[i * 3 + 2] = c.b; }
            g.setAttribute('color', new THREE.BufferAttribute(rgb, 3));
            Object.keys(g.attributes).forEach(a => { if (!['position', 'normal', 'color'].includes(a)) g.deleteAttribute(a); });
            parts.push(g.index ? g.toNonIndexed() : g);
          });
          if (!parts.length) return;
          const geometry = mergeGeometries(parts);
          geometry.computeBoundingBox();
          cargoMeshes[k].geometry.dispose();
          cargoMeshes[k].geometry = geometry;
          kind.geometry = geometry; kind.height = geometry.boundingBox.max.y;
        });
      }, undefined, e => console.warn('3D map: could not load cargo_items.glb', e));
    },
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
