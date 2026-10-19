import test from 'node:test';
import assert from 'node:assert/strict';
import { createMapCamera, frameMapCamera, projectThroughCamera } from '../src/three/camera.js';

// The 2D map's project() for the sprite shop: camera turned 45°, floor flattened by tan 30°, heights at full scale.
function project2d(view, x, y, z) {
  const c = Math.cos(Math.PI / 4), s = Math.sin(Math.PI / 4);
  return { x: view.centerX + (x * c - z * s) * view.unit, y: view.centerY + (x * s + z * c) * view.unit * Math.tan(Math.PI / 6) - y * view.unit };
}

test('the 3D camera puts map points on the same pixels as the 2D map', () => {
  const camera = createMapCamera();
  for (const view of [{ width: 390, height: 844, centerX: 195, centerY: 420, unit: 14.2 }, { width: 1440, height: 1000, centerX: 610, centerY: 530, unit: 41 }]) {
    frameMapCamera(camera, view);
    for (const [x, y, z] of [[0, 0, 0], [-3, 9.4, -3], [4.8, 4.7, -.3], [-10.6, 2.8, 10], [40, 0, -23.5], [-55, 6, 30]]) {
      const a = projectThroughCamera(camera, view, x, y, z), b = project2d(view, x, y, z);
      assert.ok(Math.abs(a.x - b.x) < 1e-6 && Math.abs(a.y - b.y) < 1e-6, `point ${x},${y},${z}: ${a.x},${a.y} vs ${b.x},${b.y}`);
    }
  }
});
