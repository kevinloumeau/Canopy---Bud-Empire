// The weekend markets' keepsakes (popup-event.js, second prize): bunting on the flagship's own street, kept for good.
// Three strings: one along the storefront under its sign band, and one from each end of it out to the street lamps
// on the pavement. Each market won adds its theme's colours to the run of pennants, so a player who has won all four
// weekends flies all four. Built once per change of the keepsake list, one merged mesh for the pennants and one for
// the cord: two draw calls and a few hundred triangles.
import * as THREE from 'three';
import { POPUP_THEMES } from '../popup-event.js';

// Main.js MARQUEE (the storefront's face and sign band) and sunny-world.js LAMPS (the two lamps on that pavement).
const FACE_X = -12.25, FRONT_Z = 11.07, REAR_Z = 2.59, BAND_Y = 3.05;
const LAMP_FRONT = [-18.5, 17.5], LAMP_REAR = [-18.5, 1], LAMP_Y = 4.05;
export const BUNTING_STRINGS = [
  { a: [FACE_X, BAND_Y, REAR_Z + .15], b: [FACE_X, BAND_Y, FRONT_Z - .15], sag: .42, n: 14 },
  { a: [FACE_X, BAND_Y + .05, FRONT_Z], b: [LAMP_FRONT[0], LAMP_Y, LAMP_FRONT[1]], sag: .75, n: 16 },
  { a: [FACE_X, BAND_Y + .05, REAR_Z], b: [LAMP_REAR[0], LAMP_Y, LAMP_REAR[1]], sag: .7, n: 13 }
];
const CORD = '#3a3226';

export function buildKeepsakeBunting(world, { hazed }) {
  const group = new THREE.Group();
  group.visible = false;
  world.add(group);
  const flagMat = hazed('#ffffff', { vertexColors: true, side: THREE.DoubleSide });
  const cordMat = hazed(CORD);
  let sig = '', meshes = [];
  const col = new THREE.Color(), up = new THREE.Vector3(0, 1, 0);

  function build(ids) {
    meshes.forEach(m => { group.remove(m); m.geometry.dispose(); });
    meshes = [];
    const themes = ids.map(id => POPUP_THEMES.find(t => t.id === id)).filter(Boolean);
    if (!themes.length) return;
    // The pennants take turns through the themes won, and through each theme's three colours.
    const colours = [];
    for (let k = 0; k < 3; k++) themes.forEach(t => colours.push([t.stripes[0], t.trim, t.stripes[1]][k]));
    const pos = [], rgb = [], cords = [];
    let flag = 0;
    BUNTING_STRINGS.forEach(({ a, b, sag, n }) => {
      const at = t => new THREE.Vector3(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t - Math.sin(t * Math.PI) * sag, a[2] + (b[2] - a[2]) * t);
      for (let k = 0; k < n; k++) {
        const p = at(k / n), q = at((k + 1) / n), d = q.clone().sub(p), len = d.length();
        // The cord: a thin box along each step.
        const g = new THREE.BoxGeometry(.035, .035, len).toNonIndexed();
        g.applyMatrix4(new THREE.Matrix4().compose(p.clone().add(q).multiplyScalar(.5), new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), d.clone().normalize()), new THREE.Vector3(1, 1, 1)));
        cords.push(g);
        // A pennant hangs from the middle of each step but the ends: two top corners on the cord and a point below.
        if (k === 0 || k === n - 1) continue;
        const dir = d.clone().normalize(), half = Math.min(.3, len * .4), mid = p.clone().add(q).multiplyScalar(.5);
        const l = mid.clone().addScaledVector(dir, -half), r = mid.clone().addScaledVector(dir, half), tip = mid.clone().addScaledVector(up, -.56);
        pos.push(l.x, l.y, l.z, r.x, r.y, r.z, tip.x, tip.y, tip.z);
        col.set(colours[flag++ % colours.length]);
        for (let v = 0; v < 3; v++) rgb.push(col.r, col.g, col.b);
      }
    });
    const flags = new THREE.BufferGeometry();
    flags.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    flags.setAttribute('color', new THREE.Float32BufferAttribute(rgb, 3));
    flags.computeVertexNormals();
    const cordGeo = mergeAll(cords);
    cords.forEach(g => g.dispose());
    [[flags, flagMat], [cordGeo, cordMat]].forEach(([geo, mat]) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = false; group.add(m); meshes.push(m); });
  }
  group.userData.update = ids => {
    const list = Array.isArray(ids) ? ids : [], next = list.join(',');
    if (next !== sig) { sig = next; build(list); }
    group.visible = meshes.length > 0;
  };
  return group;
}

function mergeAll(list) {
  const total = list.reduce((s, g) => s + g.attributes.position.count, 0), pos = new Float32Array(total * 3), nor = new Float32Array(total * 3);
  let o = 0;
  list.forEach(g => { pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); o += g.attributes.position.count; });
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  return out;
}
