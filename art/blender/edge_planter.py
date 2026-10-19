"""Canopy front-edge planter (main.js FRONT_FIXTURES, PR #42): the aisle planter's box with its five rounded shrubs
and no tree, so it never hides the queue behind it.  Same footprint as shop_planter: 0.95 x 3.6 map units, long along
map z (Blender Y); code lays it along the front with `rot`.  Origin at the footprint centre on the floor.
About 2K triangles: each shrub is a small dark core under fourteen soft leaf rosettes.

Needs canopy_kit.py, planter_parts.py and vine_parts.py in the same folder.  Run headless with
    blender -b -P edge_planter.py -- OUT_DIR
"""
import os, sys, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import planter_parts as P
import vine_parts as VP

OUT = K.begin("EdgePlanter")
rnd = random.Random(42); M, V = P.M, P.V
BOX = K.mat("PlanterGreen", "#1f5e40", .55); RIM = K.mat("PlanterRim", "#2b302d", .5)
EARTH = K.mat("PlanterSoil", "#514633", 1.); INLAY = K.mat("PlanterInlay", "#e1dbc0", .5)
SHRUBS = [K.mat("ShrubA", "#5a8644", .85, two_sided=True), K.mat("ShrubB", "#63904a", .85, two_sided=True), K.mat("ShrubC", "#6e9a52", .85, two_sided=True)]
CORE = K.mat("ShrubCore", "#4a7539", .9)

TOP = P.planter_box("Planter", .95 * M, 3.6 * M, .56 * V, (.63 - .56) * V, (BOX, RIM, EARTH, INLAY))
# Five shrubs down the box at shell.js's offsets (x +-.08, z centre + [-1.2 .. 1.6], centre .9 high, radius .3).
for n, dz in enumerate((-1.2, -.5, .2, .9, 1.6)):
    x, y = (.08 if n % 2 else -.08) * M, -dz * M
    VP.soft_shrub(f"Shrub{n}", (x, y, .9 * V - .01), .3 * M * 1.3 * rnd.uniform(1.0, 1.1), SHRUBS[n % 2:] + SHRUBS[:n % 2], CORE, rnd, n=14)
K.finish(OUT, "edge_planter", ortho=2.6, centre=(0, 0, .35))
