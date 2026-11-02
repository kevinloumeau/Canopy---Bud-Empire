// The street ATM (src/atm.js) on the 3D map: up to three cash machines on the left pavement by the entrance, facing the
// shop. Each is a free-standing street kiosk: a stone plinth, a tall body, a lit ATM header, a screen over a keypad
// shelf with card and cash slots, and a cap. Its look follows the machine's level like a station's: Lv 1 plain steel,
// Lv 10 forest green and brass, Lv 30 a little canopy and lit edges, Lv 50 walnut and brass, Lv 75 black glass with a lit
// leaf, and the founder's ebony, emerald and gold at Lv 100.
//
// Every look is built once from boxes, merged by colour, and drawn as instanced meshes (one instance per machine), so
// all three machines of a look cost one draw per colour and about 300 triangles each. The screens are their own
// instanced mesh so each brightens while someone takes out cash. Before the first is bought, and while a machine is
// left to buy, a pale ghost of the plain machine stands where the next one will go.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ATM_SPOTS } from '../atm.js';

const LOOKS = [
  null,
  { body: '#6f7d76', trim: '#c9cdc6', cap: '#56635c', header: '#efe4cf', plinth: '#c8c0b0', shelf: '#3c4641' },
  { body: '#1f4a35', trim: '#d0a54e', cap: '#173a2a', header: '#f3e6c4', plinth: '#cfc6b3', shelf: '#22302a' },
  { body: '#1f4a35', trim: '#d0a54e', cap: '#173a2a', header: '#f6e3b4', plinth: '#cfc6b3', shelf: '#22302a', canopy: true, edges: '#9fe3b8' },
  { body: '#5a3a24', trim: '#d8b062', cap: '#3e2817', header: '#f6e3b4', plinth: '#d8d0bf', shelf: '#2b1d13', canopy: true, edges: '#ffd38a' },
  { body: '#1b2421', trim: '#d8b062', cap: '#101614', header: '#f6e3b4', plinth: '#d8d0bf', shelf: '#0d1210', canopy: true, edges: '#ffd38a', leaf: true },
  { body: '#16120f', trim: '#e0b846', cap: '#0b0907', header: '#f8e7b0', plinth: '#2a2420', shelf: '#0f5a3f', canopy: true, edges: '#3fd49a', leaf: true, emerald: '#0f5a3f' }
];
const SCREEN_IDLE = new THREE.Color('#2f6f73'), SCREEN_BUSY = new THREE.Color('#8ff0dc');

export function buildAtms(world, layout, { material }) {
  const P = layout.plazaY || 0;
  const root = new THREE.Group(); root.name = 'atms'; world.add(root);
  const unit = new THREE.BoxGeometry(1, 1, 1).translate(0, .5, 0);
  const count = ATM_SPOTS.length;
  // One machine in its own frame: x is depth (+x the face, toward the shop), z is width, y up from the pavement.
  function machineParts(look) {
    const byColour = new Map();
    const add = (x, y, z, w, h, d, colour) => {
      const g = unit.clone(); g.scale(w, h, d); g.translate(x, y, z);
      if (!byColour.has(colour)) byColour.set(colour, []);
      byColour.get(colour).push(g);
    };
    add(0, P, 0, .78, .12, 1.02, look.plinth);
    add(-.02, P + .12, 0, .6, 2.1, .88, look.body);
    // Side trims running up both edges of the face, and a kick plate.
    [-.43, .43].forEach(z => add(.27, P + .12, z, .08, 2.1, .06, look.trim));
    add(.29, P + .12, 0, .04, .16, .8, look.trim);
    // The keypad shelf, the card slot and the cash slot.
    add(.34, P + 1.02, 0, .22, .1, .66, look.shelf);
    add(.4, P + 1.1, .18, .1, .05, .22, look.trim);
    add(.3, P + .78, 0, .04, .07, .4, '#0d1210');
    add(.3, P + 1.62, -.24, .03, .06, .12, '#0d1210');
    // The lit header and its frame.
    add(.29, P + 1.86, 0, .04, .3, .72, look.header);
    add(.3, P + 1.84, 0, .02, .02, .76, look.trim); add(.3, P + 2.16, 0, .02, .02, .76, look.trim);
    // The cap, a touch proud of the body.
    add(.02, P + 2.22, 0, .7, .1, .98, look.cap);
    add(.02, P + 2.32, 0, .62, .04, .9, look.trim);
    if (look.emerald) [-.3, .3].forEach(z => add(.28, P + .3, z, .03, .6, .18, look.emerald));
    if (look.canopy) {
      // A little hood over the screen, and lit strips down the face's edges.
      add(.42, P + 1.76, 0, .3, .05, .84, look.cap);
      [-.39, .39].forEach(z => add(.31, P + .3, z, .02, 1.42, .03, look.edges));
    }
    if (look.leaf) {
      // A lit leaf on the cap's front: three small blades.
      add(.38, P + 2.42, 0, .03, .26, .08, look.edges);
      add(.38, P + 2.44, -.09, .03, .16, .08, look.edges);
      add(.38, P + 2.44, .09, .03, .16, .08, look.edges);
    }
    return byColour;
  }
  // Glowing parts take an emissive copy of their colour so they light up after dark.
  const glowing = new Set();
  LOOKS.forEach(l => { if (l) { glowing.add(l.header); if (l.edges) glowing.add(l.edges); } });
  const glowMaterials = [];
  function partMaterial(colour) {
    if (!glowing.has(colour)) return material(colour);
    const m = material(colour, { emissive: colour, emissiveIntensity: .15, name: 'atmGlow' + colour });
    if (!glowMaterials.includes(m)) glowMaterials.push(m);
    return m;
  }
  const matrix = new THREE.Matrix4(), quarter = new THREE.Quaternion(), place = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1);
  const machineMatrix = i => matrix.compose(place.set(ATM_SPOTS[i].x, 0, ATM_SPOTS[i].z), quarter, one);
  const looks = LOOKS.map(look => {
    if (!look) return null;
    const group = new THREE.Group(); group.visible = false; root.add(group);
    const meshes = [];
    machineParts(look).forEach((list, colour) => {
      const mesh = new THREE.InstancedMesh(mergeGeometries(list), partMaterial(colour), count);
      mesh.castShadow = mesh.receiveShadow = true; mesh.frustumCulled = false;
      for (let i = 0; i < count; i++) mesh.setMatrixAt(i, machineMatrix(i));
      mesh.count = 0; group.add(mesh); meshes.push(mesh);
    });
    return { group, meshes };
  });
  // The screens, one instance per machine, tinted per machine (brighter while in use).
  const screenGeometry = unit.clone(); screenGeometry.scale(.03, .38, .54); screenGeometry.translate(.3, P + 1.24, 0);
  const screens = new THREE.InstancedMesh(screenGeometry, new THREE.MeshBasicMaterial({ color: '#ffffff' }), count);
  for (let i = 0; i < count; i++) { screens.setMatrixAt(i, machineMatrix(i)); screens.setColorAt(i, SCREEN_IDLE); }
  screens.count = 0; screens.frustumCulled = false; root.add(screens);
  // "ATM" lettered on the lit header: a transparent decal just in front of it, one instance per machine.
  const label = document.createElement('canvas'); label.width = 256; label.height = 96;
  const lc = label.getContext('2d');
  lc.fillStyle = '#1f2a20'; lc.font = '800 74px system-ui, -apple-system, Helvetica, Arial, sans-serif';
  lc.textAlign = 'center'; lc.textBaseline = 'middle'; lc.fillText('ATM', 128, 52);
  const labelTexture = new THREE.CanvasTexture(label); labelTexture.colorSpace = THREE.SRGBColorSpace; labelTexture.anisotropy = 4;
  const labelGeometry = new THREE.PlaneGeometry(.6, .225).rotateY(Math.PI / 2).translate(.313, P + 2.01, 0);
  const labels = new THREE.InstancedMesh(labelGeometry, new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, depthWrite: false }), count);
  for (let i = 0; i < count; i++) labels.setMatrixAt(i, machineMatrix(i));
  labels.count = 0; labels.frustumCulled = false; root.add(labels);
  // The ghost: the plain machine merged into one see-through mesh, moved to the next slot.
  const ghostGeometry = mergeGeometries([...machineParts(LOOKS[1]).values()].flat().concat([screenGeometry.clone()]));
  const ghost = new THREE.Mesh(ghostGeometry, new THREE.MeshBasicMaterial({ color: '#f1e6c6', transparent: true, opacity: .3, depthWrite: false }));
  ghost.visible = false; root.add(ghost);
  const tint = new THREE.Color();
  let shownLook = 0;
  return {
    // frame.atm: {machines, look, ghost (slot index or null), busy: [bool per machine]}.
    update(frame) {
      const a = frame.atm || { machines: 0, look: 0, ghost: null, busy: [] };
      const machines = Math.max(0, Math.min(count, a.machines || 0)), look = machines ? Math.max(1, Math.min(6, a.look || 1)) : 0;
      if (look !== shownLook) { looks.forEach((l, k) => { if (l) l.group.visible = k === look; }); shownLook = look; }
      if (look) looks[look].meshes.forEach(m => { m.count = machines; });
      screens.count = machines; labels.count = machines;
      const night = frame.night || 0;
      for (let i = 0; i < machines; i++) {
        tint.copy(a.busy && a.busy[i] ? SCREEN_BUSY : SCREEN_IDLE).multiplyScalar(.85 + .35 * night);
        screens.setColorAt(i, tint);
      }
      if (screens.instanceColor) screens.instanceColor.needsUpdate = true;
      glowMaterials.forEach(m => { m.emissiveIntensity = .12 + .75 * night; });
      const g = a.ghost;
      ghost.visible = g != null && g >= 0 && g < count;
      if (ghost.visible) ghost.position.set(ATM_SPOTS[g].x, 0, ATM_SPOTS[g].z);
    }
  };
}
