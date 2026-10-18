"""Canopy harvest bench (tier 1), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P harvest_bench_tier1.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("HarvestBenchTier1")
rnd = K.rnd
TOPSTONE = K.mat("CreamTop", "#f0e2c4", .4)
MESH = K.mat("TrayFloor", "#c9c2b0", .8)
CAB = K.mat("CabinetGreen", "#2f5d43", .5)

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

# ---------- green cabinet: two big drawers and two small ones ----------
L, D, H = 1.55, .78, .84
K.box("Plinth", (L + .06, D + .06, .09), (0, 0, 0), K.GREEN_D, .015)
K.box("BaseBrass", (L + .02, D + .02, .025), (0, 0, .09), K.BRASS, .006)
K.box("Body", (L, D, H - .1), (0, 0, .1), CAB, .012)
for i, (cx, w, z0, h) in enumerate([(-.52, .44, .16, .58), (-.05, .44, .16, .58), (.43, .44, .16, .27), (.43, .44, .47, .27)]):
    K.box(f"Drawer{i}", (w, .02, h), (cx, -D / 2 - .008, z0), CAB, .01)
    K.box(f"Pull{i}", (.14, .035, .035), (cx, -D / 2 - .03, z0 + h - (.12 if h > .3 else .11)), K.BRASS, .012)
K.box("EndPanel", (.02, D - .1, .52), (L / 2 + .008, 0, .16), CAB, .01)
K.box("Top", (L + .12, D + .12, .07), (0, 0, H), TOPSTONE, .03, 4)
TOP = H + .07

# ---------- light bar on brass-and-green posts along the back ----------
PH = 1.62
for sx in (-1, 1):
    px = sx * (L / 2 - .02)
    K.box(f"PostFoot{sx}", (.1, .1, .05), (px, D / 2 - .06, TOP), K.GREEN, .015)
    K.cyl(f"Post{sx}", .028, .028, PH - TOP, (px, D / 2 - .06, TOP), K.BRASS, 20)
    K.box(f"PostCollar{sx}", (.08, .08, .08), (px, D / 2 - .06, TOP + .5), K.GREEN, .015)
    K.tube(f"PostBend{sx}", [(px, D / 2 - .06, PH - .06), (px, D / 2 - .06, PH), (px - sx * .06, D / 2 - .06, PH + .05)], .028, K.BRASS)
K.box("LightBar", (L - .08, .12, .1), (0, D / 2 - .06, PH), K.GREEN, .025)
K.box("LightPanel", (L - .2, .07, .01), (0, D / 2 - .06, PH - .005), K.GLOW, .004)

# ---------- potted plant at the back left ----------
K.pot("Pot", -.5, .12, TOP)
K.plant("Plant", -.5, .12, TOP + .22, .36, .75, colas=False)

# ---------- drying tray with buds, a trim box and a cup of shears ----------
TX, TY = .18, -.06
TW, TD = .8, .6
K.box("Tray", (TW, TD, .08), (TX, TY, TOP), K.GREEN, .015)
K.box("TrayFloor", (TW - .08, TD - .08, .01), (TX, TY, TOP + .075), MESH, .004)
for dx, dy, w, d in ((0, TD / 2, TW, .05), (0, -TD / 2, TW, .05), (TW / 2, 0, .05, TD), (-TW / 2, 0, .05, TD)):
    K.box(f"TrayRim{dx}{dy}", (w, d, .05), (TX + dx, TY + dy, TOP + .06), K.GREEN, .008)
for i in range(6):   # trimmed branch tips lying in the tray
    x, y = TX - .26 + rnd.uniform(0, .36), TY + rnd.uniform(-.06, .2)
    a = rnd.uniform(0, 6.3)
    K.leaf_at(f"TraySugar{i}", (x, y, TOP + .085), a, .05, .7, K.LEAF_MESHES[2])
    for j in range(3):
        nug(f"TrayTip{i}{j}", x + .035 * j * math.cos(a), y + .035 * j * math.sin(a), TOP + .09, 1.05 - .15 * j)
for i in range(8):
    nug(f"TrayNug{i}", TX - .3 + rnd.uniform(0, .4), TY + rnd.uniform(-.2, .0), TOP + .085, .8)
BX, BY = TX + .22, TY - .15
K.box("TrimBox", (.3, .24, .12), (BX, BY, TOP + .02), K.GREEN, .012)
K.box("TrimBoxIn", (.25, .19, .01), (BX, BY, TOP + .135), K.GREEN_D, .004)
for i in range(5):
    K.leaf_at(f"Trim{i}", (BX + rnd.uniform(-.05, .05), BY + rnd.uniform(-.04, .04), TOP + .14), i * 1.26, .55, .75, K.LEAF_MESHES[i % 2])
CX, CY = L / 2 - .12, .12
K.box("Cup", (.14, .14, .14), (CX, CY, TOP), K.BRASS, .01)
K.box("CupIn", (.11, .11, .01), (CX, CY, TOP + .135), K.DARK, .003)
for a in (-.25, .25):
    K.tube(f"Shear{a}", [(CX, CY, TOP + .1), (CX + .06 * math.sin(a), CY - .02, TOP + .36)], .02, K.GREEN)
    K.tube(f"Blade{a}", [(CX + .06 * math.sin(a), CY - .02, TOP + .34), (CX + .12 * math.sin(a) + .03, CY - .03, TOP + .46)], .01, K.BRASS)

K.finish(OUT, "harvest_bench_tier1", ortho=2.6, centre=(0, 0, .85))
