"""Canopy harvest bench, tier 4 (Lv 50): the tier 3 cabinet with a drying rack over the back, branches hung upside
down to dry, a row of brass-lidded glass curing jars under them, and a brass trimming set on the worktop.

Same footprint, origin and facing as harvest_bench (tier 3).  Needs canopy_kit.py and tier45_parts.py alongside.
Run headless with  blender -b -P harvest_bench_tier4.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K

OUT = K.begin("HarvestBenchTier4")
import tier45_parts as P
rnd = K.rnd

TOP, L, D = P.harvest_cabinet()

# ---------- drying rack: green posts, a brass rail, branches hung upside down ----------
RY, RZ = D / 2 - .1, 1.62
for sx in (-1, 1):
    px = sx * (L / 2 - .04)
    K.box(f"RackPost{sx}", (.06, .06, RZ - TOP + .04), (px, RY, TOP), K.GREEN, .015)
    K.box(f"RackFoot{sx}", (.11, .11, .03), (px, RY, TOP), K.BRASS, .006)
    K.cyl(f"RackFinial{sx}", .035, .035, .05, (px, RY, RZ + .04), K.BRASS, 16)
K.box("RackBeam", (L - .02, .07, .06), (0, RY, RZ - .02), K.GREEN, .015)
K.tube("RackRail", [(-L / 2 + .06, RY - .07, RZ - .04), (L / 2 - .06, RY - .07, RZ - .04)], .014, K.BRASS)
for sx in (-1, 1):
    K.tube(f"RackBracket{sx}", [(sx * (L / 2 - .1), RY - .02, RZ - .02), (sx * (L / 2 - .1), RY - .07, RZ - .04)], .01, K.BRASS)
for i in range(8):
    x = -L / 2 + .2 + (L - .4) * i / 7 + rnd.uniform(-.02, .02)
    P.branch(f"Branch{i}", x, RY - .07, RZ - .04, rnd.uniform(.36, .46), 3)

# ---------- curing jars along the back, under the branches ----------
for i in range(5):
    P.jar(f"Cure{i}", -.62 + i * .27, .2, TOP, .085, .22, K.BRASS, K.GREEN, 9)

# ---------- trimming: board, brass shears, a brass trim bowl, trays of buds ----------
K.box("Board", (.56, .34, .03), (-.5, -.2, TOP), K.OAK, .012)
for i, (x, y) in enumerate([(-.66, -.14), (-.52, -.1), (-.38, -.16), (-.6, -.28), (-.44, -.27)]):
    P.nug(f"BoardNug{i}", x, y, TOP + .05)
for i, (x, y) in enumerate([(-.7, -.24), (-.34, -.08)]):
    K.leaf_at(f"Trim{i}", (x, y, TOP + .035), rnd.uniform(0, 6), -.05, .9, K.LEAF_MESHES[2])
sx0, sy0 = -.3, -.3
for a in (.2, -.2):
    K.tube(f"Blade{a}", [(sx0, sy0, TOP + .036), (sx0 + .13 * math.cos(a), sy0 + .13 * math.sin(a), TOP + .036)], .006, K.BRASS)
    cx, cy = sx0 - .05 * math.cos(a), sy0 - .05 * math.sin(a) + (.02 if a > 0 else -.02)
    K.tube(f"Ring{a}", [(cx + .028 * math.cos(t / 10 * 6.283), cy + .028 * math.sin(t / 10 * 6.283), TOP + .036) for t in range(11)], .008, K.BRASS)
K.cyl("TrimBowl", .1, .13, .07, (-.05, -.22, TOP), K.BRASS, 24)
K.cyl("TrimBowlIn", .115, .115, .004, (-.05, -.22, TOP + .066), K.DARK, 24)
for i in range(4):
    P.nug(f"Tray3Nug{i}", -.05 + rnd.uniform(-.05, .05), -.22 + rnd.uniform(-.05, .05), TOP + .045, .9)
P.tray("Tray1", .3, -.22, TOP)
P.tray("Tray2", .64, -.14, TOP)
P.tin("Tin", .82, -.33, TOP)

K.finish(OUT, "harvest_bench_tier4", ortho=2.7, centre=(0, 0, .95))
