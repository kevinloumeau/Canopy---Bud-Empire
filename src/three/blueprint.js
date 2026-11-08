// The "next buy" ghost look (game review 2026-11-08: the flat 30% cream copies read as white glass slabs by the door).
// A blueprint instead: a faint cool fill that only hints at the volume, and pale outlines on the model's creases and
// silhouette so it reads as a plan drawn where the thing will stand. The fill writes depth (pushed back a touch), so the
// outlines behind it are hidden and only the front edges show, like a drawing rather than a wireframe.
import * as THREE from 'three';

export const BLUEPRINT_FILL = new THREE.MeshBasicMaterial({
  color: '#a9d3ea', transparent: true, opacity: .14, depthWrite: true,
  polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1
});
export const BLUEPRINT_EDGE = new THREE.LineBasicMaterial({ color: '#f2f9ff', transparent: true, opacity: .9, depthWrite: false });

// One edge set per geometry, shared by every ghost that uses it. Creases under 35 degrees (bevels, rounded tops) are
// left out so the outline stays clean.
const edgeCache = new WeakMap();
function edgesOf(geometry) {
  let edges = edgeCache.get(geometry);
  if (!edges) edgeCache.set(geometry, edges = new THREE.EdgesGeometry(geometry, 35));
  return edges;
}

// Turns every mesh under root into the blueprint: the fill material, no shadows, and an outline child drawn after it.
export function blueprint(root) {
  const meshes = [];
  root.traverse(o => { if (o.isMesh) meshes.push(o); });
  meshes.forEach(mesh => {
    mesh.material = BLUEPRINT_FILL; mesh.castShadow = false; mesh.receiveShadow = false; mesh.renderOrder = 2;
    const lines = new THREE.LineSegments(edgesOf(mesh.geometry), BLUEPRINT_EDGE);
    lines.renderOrder = 3; lines.raycast = () => {};
    mesh.add(lines);
  });
  return root;
}
