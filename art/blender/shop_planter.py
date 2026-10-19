"""Canopy aisle planter (shell.js planter): the long forest-green box along the storefront with a dark rim, soil, five
rounded shrubs and a small tree near one end.  Laid out from shell.js's numbers (planter x -11.7..-10.75,
z 2..5.6, tree at x -11.45, z 2.35), converted to metres; map z runs toward Blender -Y.
Origin at the planter's footprint centre on the floor (map x -11.225, z 3.8).

Needs canopy_kit.py, tree_parts.py and vine_parts.py in the same folder.  Run headless with
    blender -b -P shop_planter.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import tree_parts as T
import vine_parts as VP
T.LITE = True          # phone budget: lighter crown lumps, as tree.py and street_tree.py

OUT = K.begin("ShopPlanter")
rnd = random.Random(5)
M, V = 1 / 1.69, .7247                     # map units -> metres across, world heights -> metres up
BOX = K.mat("PlanterGreen", "#1f5e40", .55); BOX_D = K.mat("PlanterGreenDeep", "#184b33", .6)
RIM = K.mat("PlanterRim", "#2b302d", .5); EARTH = K.mat("PlanterSoil", "#514633", 1.)
INLAY = K.mat("PlanterInlay", "#e1dbc0", .5)
BARK = K.mat("Bark", "#7a5a3c", .8)
SHRUBS = [K.mat("ShrubA", "#5c8f35", .8, two_sided=True), K.mat("ShrubB", "#6c9e3d", .8, two_sided=True), K.mat("ShrubC", "#78a744", .8, two_sided=True), K.mat("ShrubD", "#4e7f2f", .8, two_sided=True)]
SHRUBS.append(SHRUBS[0])          # weight the mid green
SHRUB_CORE = K.mat("ShrubCore", "#467328", .9)
FLOWERS = [K.mat("FlowerOrange", "#ef8a3a", .6), K.mat("FlowerPink", "#e58bb0", .6)]
CROWN = [K.mat("CrownMid", "#447a36", .78), K.mat("CrownDeep", "#33622c", .8), K.mat("CrownLight", "#5f9142", .75)]

W, D, H = .95 * M, 3.6 * M, .56 * V
K.box("Feet", (W - .05, D - .05, .03), (0, 0, 0), RIM, .008)
K.box("Box", (W, D, H - .03), (0, 0, .03), BOX, .012)
# Cream inlay frames on the long faces and the ends, like the sprite's panelled box.
for sx, face in ((1, "Side"), (-1, "Wall")):
    K.box(f"Inlay{face}Top", (.008, D - .12, .014), (sx * (W / 2 + .002), 0, H - .075), INLAY, .003, 1)
    K.box(f"Inlay{face}Bot", (.008, D - .12, .014), (sx * (W / 2 + .002), 0, .09), INLAY, .003, 1)
    for sy in (-1, 1):
        K.box(f"Inlay{face}End{sy}", (.008, .014, H - .175), (sx * (W / 2 + .002), sy * (D / 2 - .067), .09), INLAY, .003, 1)
for sy in (-1, 1):
    K.box(f"InlayEnd{sy}Top", (W - .12, .008, .014), (0, sy * (D / 2 + .002), H - .075), INLAY, .003, 1)
    K.box(f"InlayEnd{sy}Bot", (W - .12, .008, .014), (0, sy * (D / 2 + .002), .09), INLAY, .003, 1)
K.box("Rim", ((.95 + .08) * M, (3.6 + .08) * M, (.63 - .56) * V), (0, 0, H), RIM, .01)
K.box("Soil", ((.95 - .2) * M, (3.6 - .2) * M, .02), (0, 0, .63 * V - .002), EARTH, .006)
TOP = .63 * V

# Five round bushes down the box (shell.js: x +-.08, z centre + [-1.2 .. 1.6], .9 high, radius .3), shingled with
# small leaves and dotted with flowers like the edge and deck planters (vine_parts.scale_shrub).
for n, dz in enumerate((-1.2, -.5, .2, .9, 1.6)):
    x, y = (.08 if n % 2 else -.08) * M, -dz * M
    VP.scale_shrub(f"Shrub{n}", (x, y, .9 * V - .01), .3 * M * 1.3 * rnd.uniform(1.0, 1.1), SHRUBS, SHRUB_CORE, FLOWERS, rnd, n=100, flowers=5)

# The tree near the planter's end at map z 2.35: a short forked trunk and a full scalloped crown, lower and fuller
# than shell.js's (trunk to 3.03 world, three clumps .55-.75 at 2.9-3.2 world) so it reads like the sprite.
tx, ty = (-11.45 + 11.225) * M, -(2.35 - 3.8) * M
T.trunk("Trunk", (tx, ty, TOP), (tx, ty, 1.45), .075, .05, BARK, forks=[(tx + .2, ty - .12, 1.75), (tx - .2, ty - .16, 1.7), (tx + .05, ty + .2, 1.8)], rf=.035)
# Crown in rings like the round street tree: a low ring of scalloped masses, a second ring, a cap.
C = 2.0
for i, (n, z, rad, r) in enumerate(((5, C - .22, .36, .3), (4, C + .08, .26, .29), (1, C + .32, 0, .26))):
    a0 = rnd.uniform(0, 6.3)
    for j in range(n):
        a = a0 + j * 2 * math.pi / n
        T.lump(f"Crown{i}{j}", (tx + rad * math.cos(a), ty + rad * math.sin(a), z + rnd.uniform(-.04, .04)), r * rnd.uniform(.92, 1.08),
               CROWN[(i + j) % 3] if i < 2 else CROWN[2], .82, k=i + j, yaw=a, bumps=5, rnd=rnd)
T.lump("CrownCore", (tx, ty, C), .42, CROWN[1], .8, k=1)
K.finish(OUT, "shop_planter", ortho=3.5, centre=(0, 0, 1.0))
