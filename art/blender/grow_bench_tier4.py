"""Canopy grow bench, tier 4 (Lv 50): a green lacquered bench with brass trim, six bigger plants in square green
planters with brass bands, drip irrigation from a brass header, and two LED bars on a brass gantry.
Same footprint, facing and origin as grow_bench (tier 3).

Needs canopy_kit.py and seedgrow45_parts.py in the same folder.  Run headless with
    blender -b -P grow_bench_tier4.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import seedgrow45_parts as T

OUT = K.begin("GrowBenchTier4")
rnd = K.rnd
M = T.mats()
L, D, H = 1.9, .78, .78
TOP = T.cabinet(M, L, D, H, panels=3, top_over=.06)

def planter(tag, x, y, z):
    """A square green planter with a brass band and dark soil."""
    K.box(f"{tag}Pot", (.3, .3, .22), (x, y, z), M["LACQUER"], .03, 3)
    K.box(f"{tag}Rim", (.31, .31, .03), (x, y, z + .15), K.BRASS, .008)
    K.box(f"{tag}Soil", (.25, .25, .02), (x, y, z + .205), K.SOIL, .006)

# brass gantry: two posts at the back, a cross beam, two LED bars hung over the plants
PH = 2.15
for sx in (-1, 1):
    px = sx * (L / 2 - .02)
    K.box(f"PostBase{sx}", (.12, .12, .06), (px, D / 2 - .05, TOP), M["LACQUER_D"], .015)
    K.box(f"Post{sx}", (.06, .06, PH - TOP), (px, D / 2 - .05, TOP + .04), K.BRASS, .012)
    K.box(f"Arm{sx}", (.06, D - .02, .06), (px, 0, PH - .02), K.BRASS, .012)
K.box("BackBeam", (L + .06, .06, .06), (0, D / 2 - .05, PH - .02), K.BRASS, .012)
for i, y in enumerate((-.2, .16)):
    K.box(f"LedBar{i}", (L - .1, .16, .07), (0, y, PH - .09), M["LACQUER_D"], .02)
    K.box(f"LedTrim{i}", (L - .08, .17, .015), (0, y, PH - .095), K.BRASS, .005)
    K.box(f"LedPanel{i}", (L - .2, .11, .01), (0, y, PH - .1), M["GROWLED"], .003)
    K.box(f"LedEdge{i}", (L - .14, .006, .022), (0, y - .083, PH - .085), M["GROWLED"], .002)
    for sx in (-1, 1):
        K.tube(f"Hanger{i}{sx}", [(sx * (L / 2 - .25), y, PH - .02), (sx * (L / 2 - .25), y, PH - .09)], .006, K.BRASS)

# six bigger plants in planters, staggered like tier 3
SPOTS = [(-.66, .1), (-.02, .12), (.6, .1), (-.4, -.25), (.26, -.24), (.8, -.27)]
for i, (x, y) in enumerate(SPOTS):
    planter(f"P{i}", x, y, TOP)
    K.plant(f"P{i}", x, y, TOP + .22, rnd.uniform(.56, .64), sc=1.15, spread=1.15)

# drip irrigation: a brass header along the back of the top, a black line and emitter to each planter
HZ = TOP + .05
K.tube("DripHeader", [(-L / 2 + .05, D / 2 - .12, HZ), (L / 2 - .05, D / 2 - .12, HZ)], .014, K.BRASS)
K.cyl("DripValve", .03, .03, .06, (L / 2 - .1, D / 2 - .12, HZ - .03), K.BRASS, 12)
for i, (x, y) in enumerate(SPOTS):
    K.tube(f"Drip{i}", [(x, D / 2 - .12, HZ), (x, (y + D / 2 - .12) / 2, HZ + .2), (x + .09, y + .09, TOP + .24)], .005, M["DRIP"])

K.finish(OUT, "grow_bench_tier4", ortho=3.1, centre=(0, 0, 1.05))
