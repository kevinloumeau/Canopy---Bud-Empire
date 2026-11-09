import * as THREE from 'three';

// Soft gradient textures written straight into a pixel array instead of painted on a 2D canvas. iOS fingerprinting
// protection sprinkles random coloured noise into any canvas WebGL reads back, which on a big, faint, magnified puff
// (the lounge smoke) showed as rainbow speckle. A DataTexture never goes through a canvas, so it stays perfectly smooth.
// pixel(u, v) returns [r, g, b, a] in 0..1 for the texel centre at u, v (texture UVs: 0..1 across, 0 at the bottom to 1 at the top).
export function softTexture(width, height, pixel, { srgb = false } = {}) {
  const data = new Uint8Array(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const p = pixel((x + .5) / width, (y + .5) / height), i = (y * width + x) * 4;
    for (let k = 0; k < 4; k++) data[i + k] = Math.round(Math.max(0, Math.min(1, p[k])) * 255);
  }
  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.magFilter = THREE.LinearFilter; texture.minFilter = THREE.LinearMipmapLinearFilter; texture.generateMipmaps = true;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// A white disc whose alpha falls off smoothly to nothing at the rim. falloff(d) maps distance 0..1 from the centre to alpha.
export function softDot(size, falloff) {
  return softTexture(size, size, (u, v) => {
    const d = Math.min(1, Math.hypot(u - .5, v - .5) * 2);
    return [1, 1, 1, falloff(d)];
  });
}

// Piecewise-linear stops [[t, value], ...] sorted by t, like a canvas gradient's colour stops.
export function ramp(stops, t) {
  if (t <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) if (t <= stops[i][0]) {
    const [t0, a] = stops[i - 1], [t1, b] = stops[i], s = (t - t0) / (t1 - t0);
    return Array.isArray(a) ? a.map((x, k) => x + (b[k] - x) * s) : a + (b - a) * s;
  }
  return stops[stops.length - 1][1];
}
