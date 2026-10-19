import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Draw-call compaction for the Blender models. A model comes in as hundreds of small meshes (a station tier 5 is
// several hundred parts, each its own draw, twice over with the shadow pass), so once a model has loaded and been
// rigged, every part that never moves on its own is merged into one mesh per material, in the model's own space.
// Nothing changes on screen: each merged part keeps its material, its shadow flags and its place.
//
// Left as they are: parts code moves, shows or hides by name (`keep`, and anything station-motion.js tagged with
// userData.motion), hidden parts, see-through parts (they are sorted back to front one by one), skinned or morphing
// meshes and multi-material meshes. A kept part is itself compacted the same way, so the stems and leaves inside a
// grow bench's plant pivot still merge into one mesh that scales with the plant.

// Names the map's code drives after load: the exhaust fan's rotor, the rooftop fire, the lounge door and its plaque,
// and the car wheels.
export const DRIVEN = /^(Rotor|Flame|DoorLeaf|StaffPlaque|Wheel(FL|FR|BL|BR)$)/

const local = new THREE.Matrix4(), rootInverse = new THREE.Matrix4();

const kept = (o, keep) => !!o.userData.motion || DRIVEN.test(o.name) || (keep && keep(o));

function mergeable(o) {
  return o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh && o.visible && !Array.isArray(o.material) && !o.material.transparent &&
    !Object.keys(o.geometry.morphAttributes).length && !o.geometry.groups.length && o.children.length === 0;
}

// Every attribute goes to plain floats before merging, so the signature is names and sizes only.
function signature(g) {
  return Object.keys(g.attributes).sort().map(k => k + g.attributes[k].itemSize).join() + (g.index ? '|i' : '');
}

// A copy with float attributes: the exports are quantized (meshopt, normalized 16-bit positions scaled back by their
// node), and a position moved into the model's space would clamp at the integer type's range.
function floatCopy(source) {
  const g = new THREE.BufferGeometry();
  Object.entries(source.attributes).forEach(([k, a]) => {
    const out = new Float32Array(a.count * a.itemSize);
    for (let i = 0; i < a.count; i++) for (let c = 0; c < a.itemSize; c++) out[i * a.itemSize + c] = a.getComponent(i, c);
    g.setAttribute(k, new THREE.BufferAttribute(out, a.itemSize));
  });
  if (source.index) g.setIndex(new THREE.BufferAttribute(source.index.array.slice(), 1));
  return g;
}

// Flips each triangle's winding, for a part mirrored by a negative scale: drawn on its own, three.js turns the facing
// round for it; baked into the model's space it would face inside out.
function rewind(g) {
  if (g.index) {
    const ix = g.index;
    for (let t = 0; t < ix.count; t += 3) { const v = ix.getX(t + 1); ix.setX(t + 1, ix.getX(t + 2)); ix.setX(t + 2, v); }
    return;
  }
  Object.values(g.attributes).forEach(a => {
    for (let t = 0; t < a.count; t += 3) for (let k = 0; k < a.itemSize; k++) {
      const v = a.getComponent(t + 1, k); a.setComponent(t + 1, k, a.getComponent(t + 2, k)); a.setComponent(t + 2, k, v);
    }
  });
}

// Merges root's static parts; returns how many meshes it removed.
export function compactModel(root, keep) {
  root.updateMatrixWorld(true);
  rootInverse.copy(root.matrixWorld).invert();
  const groups = new Map(), inner = [];
  const walk = node => node.children.forEach(c => {
    // A hidden part stays as it is, children and all: merged, they would show.
    if (!c.visible) return;
    if (kept(c, keep)) { inner.push(c); return; }
    if (mergeable(c)) {
      const key = c.material.uuid + (c.castShadow ? 'c' : '') + (c.receiveShadow ? 'r' : '') + signature(c.geometry);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(c);
    }
    walk(c);
  });
  walk(root);
  let removed = 0;
  groups.forEach(list => {
    if (list.length < 2) return;
    const parts = list.map(o => {
      const g = floatCopy(o.geometry);
      local.multiplyMatrices(rootInverse, o.matrixWorld);
      g.applyMatrix4(local);
      if (local.determinant() < 0) rewind(g);
      return g;
    });
    const geometry = mergeGeometries(parts);
    if (!geometry) return;
    const first = list[0], mesh = new THREE.Mesh(geometry, first.material);
    mesh.name = 'Merged' + (first.material.name || '');
    mesh.castShadow = first.castShadow; mesh.receiveShadow = first.receiveShadow;
    root.add(mesh);
    list.forEach(o => o.removeFromParent());
    removed += list.length - 1;
  });
  // Groups left empty by the merge cost a matrix update every frame for nothing.
  const prune = node => [...node.children].forEach(c => {
    if (kept(c, keep) || !c.visible) return;
    prune(c);
    if ((c.type === 'Group' || c.type === 'Object3D') && !c.children.length) c.removeFromParent();
  });
  prune(root);
  inner.forEach(o => { if (o.children.length) removed += compactModel(o, keep); });
  return removed;
}
