# The upper floors' seamless floor tiles for the 3D map (public/sprites/shell/tex.floor.<name>.png):
#   epoxy  - the grow room: pale sage sealed epoxy in a 4x4 tile grid with one steel drain grate per repeat (6 map units)
#   boards - the packing level: honey oak planks with staggered joints (4 map units)
# Everything wraps at the edges, so the tiles repeat without a seam. Run: python3 scripts/floor-textures.py
import numpy as np
from PIL import Image

N = 512
rng = np.random.default_rng(7)
yy, xx = np.mgrid[0:N, 0:N] / N


def periodic_noise(octaves):
    """Smooth noise that wraps: a sum of sinusoids with whole-number frequencies."""
    out = np.zeros((N, N))
    for freq, amp in octaves:
        for _ in range(6):
            fx, fy = rng.integers(-freq, freq + 1, 2)
            if fx == 0 and fy == 0:
                continue
            out += amp * np.sin(2 * np.pi * (fx * xx + fy * yy) + rng.uniform(0, 2 * np.pi))
    return out / max(1e-6, np.abs(out).max())


def save(rgb, name):
    Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), 'RGB').save(f'public/sprites/shell/tex.floor.{name}.png', optimize=True)


def epoxy():
    base = np.array([202, 219, 203], float)  # pale sage
    mottle = periodic_noise([(2, 1), (5, .5), (11, .25)])
    rgb = base[None, None, :] * (1 + .028 * mottle[..., None])
    rgb += rng.normal(0, 1.6, (N, N, 1))  # a fine sealed-aggregate speckle
    tile = N // 4
    for k in range(4):
        a = k * tile
        # A grout line with a light lip under it, so the grid reads as cut tiles from the 30 degree camera.
        for off, f in ((-1, .86), (0, .82), (1, .86), (2, 1.04)):
            rgb[(a + off) % N, :, :] *= f
            rgb[:, (a + off) % N, :] *= f
    # Two drain grates a repeat, each centred on a tile corner: a brushed steel rim round dark slots.
    for cx, cy in ((tile, tile), (3 * tile, 3 * tile)):
        grate(rgb, cx, cy)
    save(rgb, 'epoxy')


def grate(rgb, cx, cy):
    r, rim = 22, 4
    steel, slot, bar = np.array([150, 158, 152]), np.array([46, 52, 50]), np.array([112, 120, 115])
    for y in range(cy - r, cy + r):
        for x in range(cx - r, cx + r):
            inner = abs(y - cy) < r - rim and abs(x - cx) < r - rim
            if not inner:
                rgb[y, x] = steel * (1.08 if y < cy else .94)
            else:
                rgb[y, x] = bar if (x - cx + r) % 6 < 2 else slot
    # A soft shadow ring just outside the rim.
    for d in (1, 2):
        for y in range(cy - r - d, cy + r + d):
            for x in (cx - r - d, cx + r + d - 1):
                rgb[y, x] *= .93
        for x in range(cx - r - d, cx + r + d):
            for y in (cy - r - d, cy + r + d - 1):
                rgb[y, x] *= .93


def boards():
    base = np.array([205, 150, 96], float)  # honey oak
    rows = 16
    h = N // rows
    rgb = np.zeros((N, N, 3))
    grain = periodic_noise([(1, .3)])
    for r in range(rows):
        y0 = r * h
        # Joints at staggered places along the plank, wrapping round the tile.
        cuts, x = [], int(rng.integers(0, N))
        while True:
            cuts.append(x % N)
            x += int(rng.integers(150, 270))
            if x - cuts[0] > N - 120:
                break
        cuts = sorted(cuts)
        for i, c in enumerate(cuts):
            c1 = cuts[(i + 1) % len(cuts)] + (N if i + 1 == len(cuts) else 0)
            tone = 1 + rng.uniform(-.075, .075)
            warm = rng.uniform(-6, 6)
            cols = np.arange(c, c1) % N
            for yy_ in range(y0, y0 + h):
                # Long grain streaks along the plank.
                streak = .035 * np.sin(2 * np.pi * (cols / N * rng.integers(1, 3) + (yy_ - y0) / h * 1.7) + i) \
                    + .02 * np.sin(2 * np.pi * (yy_ / h) * 3 + cols / 37.0)
                rgb[yy_, cols] = (base * tone + np.array([warm, warm * .5, 0]))[None, :] * (1 + streak[:, None])
            for off, f in ((0, .62), (1, .82)):
                rgb[y0:y0 + h, (c + off) % N] *= f
        # The gap between planks, and a lit bevel on the next plank's edge.
        rgb[y0, :] *= .6
        rgb[(y0 + 1) % N, :] *= .86
        rgb[(y0 + 2) % N, :] *= 1.05
    rgb *= (1 + .03 * grain[..., None])
    rgb += rng.normal(0, 1.2, (N, N, 1))
    save(rgb, 'boards')


epoxy()
boards()
