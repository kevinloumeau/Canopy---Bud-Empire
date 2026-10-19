"""Canopy seeds bench (tier 1): light oak frame with two drawers, cream top, seedling tray and humidifier.

Needs canopy_kit.py and station_parts.py in the same folder.  Run headless with
    blender -b -P seeds_bench_tier1.py -- OUT_DIR
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as P

OUT = K.begin("SeedsBenchTier1")
M = P.mats()
LIGHT = K.mat("LightOak", "#dba86a", .6)
SLOT = K.mat("PullSlot", "#5a3d26", .7)

L, D, H = 1.7, 1.0, .74
for sx in (-1, 1):
    for sy in (-1, 1):
        K.box(f"Leg{sx}{sy}", (.09, .09, H - .08), (sx * (L / 2 - .045), sy * (D / 2 - .045), 0), LIGHT, .012)
K.box("Carcass", (L - .06, D - .06, .5), (0, 0, .14), LIGHT, .01)
K.box("Stretcher", (L - .1, D - .1, .05), (0, 0, .06), LIGHT, .01)
DW = (L - .2) / 2
for i in range(2):
    cx = -L / 2 + .1 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .04, .025, .42), (cx, -D / 2 + .02, .18), LIGHT, .012)
    K.box(f"DrawerInset{i}", (DW - .14, .01, .32), (cx, -D / 2 + .005, .23), K.OAK, .006)
    K.box(f"Slot{i}", (.14, .012, .035), (cx, -D / 2, .5), SLOT, .015)
K.box("EndPanel", (.02, D - .2, .42), (L / 2 - .02, 0, .18), K.OAK, .008)
K.box("Top", (L + .08, D + .08, .1), (0, 0, H - .08), M["TOPSTONE"], .045, 5)
TOP = H + .02
P.seed_tray(M, -.06, 0, TOP)
K.finish(OUT, "seeds_bench_tier1", ortho=2.6, centre=(0, 0, .55))
