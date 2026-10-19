import { OrthographicCamera, Vector3 } from 'three';

// The 2D map projects a world point (x, height y, z) as
//   screen x = centerX + (x cos a - z sin a) * unit
//   screen y = centerY + (x sin a + z cos a) * unit * tan 30° - y * unit
// with the camera turned a = 45°. That is a true isometric view (floor edges at 30°) except that heights are drawn at
// full scale instead of cos 35.26° of it. So the 3D world keeps the map's x and z as they are and stretches every
// height by HEIGHT_SCALE (1 / cos 35.26°); an orthographic camera looking down 35.26° then lands every point on the
// same pixel as project(), and the DOM tags, badges and taps that use project() stay where they are.
export const ELEVATION = Math.asin(Math.tan(Math.PI / 6));
export const HEIGHT_SCALE = 1 / Math.cos(ELEVATION);
const DISTANCE = 240;

export function createMapCamera() {
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1, DISTANCE * 2.5);
  const s = Math.SQRT1_2, c = Math.SQRT1_2, se = Math.sin(ELEVATION), ce = Math.cos(ELEVATION);
  // Screen right is (cos a, 0, -sin a) and screen up (-sin a sin e, cos e, -cos a sin e); the camera sits on their cross product.
  camera.up.set(-s * se, ce, -c * se);
  camera.position.set(s * ce, se, c * ce).multiplyScalar(DISTANCE);
  camera.lookAt(0, 0, 0);
  return camera;
}

// Frame the camera so world (0, 0, 0) lands on (centerX, centerY) at `unit` pixels per world unit, as the 2D map does.
export function frameMapCamera(camera, { width, height, centerX, centerY, unit }) {
  camera.left = -centerX / unit; camera.right = (width - centerX) / unit;
  camera.top = centerY / unit; camera.bottom = -(height - centerY) / unit;
  camera.updateProjectionMatrix(); camera.updateMatrixWorld();
}

// Where a map point (in the 2D map's units) lands on screen through the 3D camera; tests compare it with project().
export function projectThroughCamera(camera, view, x, y, z) {
  const v = new Vector3(x, y * HEIGHT_SCALE, z).project(camera);
  return { x: (v.x + 1) / 2 * view.width, y: (1 - v.y) / 2 * view.height };
}
