"""Canopy grow bench (tier 2), modelled from the current sprite.

A green cabinet with a cream top, eight budding plants on drip lines, purple grow lights on a green frame and a
reservoir tank at the +x end.  Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P grow_bench_tier2.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("GrowBenchTier2")
rnd = K.rnd
TOPSTONE = K.mat("CreamTop", "#efe0bd", .4)
PURPLE = K.mat("GrowLightPurple", "#b45cf0", .3, 0, 1.4)
HOSE = K.mat("DripLine", "#2f5a3a", .5)

# ---------- green cabinet with four drawers ----------
CL, D, H = 1.7, .86, .76
TW = .44                                  # reservoir tank width at the +x end
L = CL + TW
X0 = -TW / 2                              # cabinet centre, so the whole footprint is centred on the origin
TX = X0 + CL / 2 + TW / 2 + .01
K.box("Plinth", (CL + .08, D + .08, .08), (X0, 0, 0), K.GREEN_D, .02)
K.box("PlinthBrass", (CL + .09, D + .09, .02), (X0, 0, .08), K.BRASS, .006)
K.box("Body", (CL, D, H - .1), (X0, 0, .1), K.GREEN, .012)
DW = (CL - .08) / 4
for i in range(4):
    cx = X0 - CL / 2 + .04 + DW * (i + .5)
    K.box(f"Drawer{i}", (DW - .05, .025, .5), (cx, -D / 2 - .008, .14), K.GREEN, .01)
    K.box(f"DrawerInset{i}", (DW - .14, .01, .4), (cx, -D / 2 - .024, .19), K.GREEN_D, .006)
    K.box(f"Pull{i}", (.14, .035, .035), (cx, -D / 2 - .035, .5), K.BRASS, .014)
    for dz in (.2, .5):
        K.box(f"Hinge{i}{dz}", (.016, .03, .05), (cx + (DW - .05) / 2 + .01, -D / 2 - .02, dz), K.BRASS, .004)
K.box("Top", (CL + .1, D + .1, .07), (X0, 0, H - .02), TOPSTONE, .03, 4)
TOP = H + .05

# ---------- reservoir tank ----------
K.box("TankPlinth", (TW + .04, D + .04, .08), (TX, 0, 0), K.GREEN_D, .02)
K.box("Tank", (TW, D - .02, .7), (TX, 0, .08), K.GREEN, .04, 4)
K.box("TankBand", (TW + .02, D, .025), (TX, 0, .7), K.BRASS, .006)
K.box("TankDoor", (.02, D - .26, .44), (TX + TW / 2 + .006, 0, .16), K.GREEN, .01)
for dy in (-(D - .26) / 2, (D - .26) / 2):
    K.box(f"TankDoorRail{dy:.2f}", (.024, .018, .44), (TX + TW / 2 + .012, dy, .16), K.BRASS, .005)
for dz in (.16, .6):
    K.box(f"TankDoorRailH{dz}", (.024, D - .26, .018), (TX + TW / 2 + .012, 0, dz - .009), K.BRASS, .005)
K.box("TankHandle", (.03, .03, .16), (TX + TW / 2 + .03, 0, .3), K.BRASS, .012)
K.box("TankFront", (TW - .1, .02, .5), (TX, -D / 2 + .005, .16), K.GREEN, .01)
K.cyl("TankCap", .07, .07, .05, (TX, -.1, .78), K.BRASS, 32)
K.cyl("TankCapTop", .05, .05, .03, (TX, -.1, .83), K.GREEN, 32)

# ---------- green frame with two purple light bars on arms ----------
PH = 1.95
PXS = (X0 - CL / 2 + .03, X0 + CL / 2 - .03)
for px in PXS:
    K.box(f"Post{px:.2f}", (.07, .07, PH - TOP), (px, D / 2 - .04, TOP), K.GREEN, .012)
    K.box(f"PostCap{px:.2f}", (.1, .1, .08), (px, D / 2 - .04, PH - .04), K.BRASS, .015)
    K.box(f"Arm{px:.2f}", (.07, .62, .07), (px, D / 2 - .35, PH - .04), K.GREEN, .012)
    K.box(f"LightBar{px:.2f}", (.12, .62, .09), (px, D / 2 - .39, PH - .15), K.GREEN, .02)
    K.box(f"LightCap{px:.2f}", (.13, .05, .1), (px, D / 2 - .71, PH - .15), K.BRASS, .01)
    K.box(f"LightStrip{px:.2f}", (.09, .56, .012), (px, D / 2 - .39, PH - .148), PURPLE, .003)
    K.box(f"LightSide{px:.2f}", (.012, .54, .035), (px + .062, D / 2 - .39, PH - .12), PURPLE, .003)
K.box("Beam", (CL + .02, .07, .08), (X0, D / 2 - .04, PH - .04), K.GREEN, .015)

# ---------- eight budding plants in pots with saucers, on drip lines ----------
SPOTS = [(-.66, .2), (-.22, .22), (.22, .2), (.66, .2), (-.5, -.2), (-.06, -.21), (.38, -.2), (.7, -.24)]
for i, (x, y) in enumerate(SPOTS):
    x += X0
    K.cyl(f"P{i}Saucer", .175, .16, .025, (x, y, TOP), K.TERRA_D, 40)
    K.pot(f"P{i}", x, y, TOP + .02)
    K.plant(f"P{i}", x, y, TOP + .22, rnd.uniform(.28, .32), .8, spread=1.4)
    # a drip line from the pot rim down to the manifold between the rows
    side = -1 if y > 0 else 1
    K.cyl(f"P{i}Fitting", .022, .022, .04, (x + .1, y + side * .1, TOP + .17), K.BRASS, 12)
    K.tube(f"P{i}Drip", [(x + .1, y + side * .12, TOP + .18), (x + .12, y + side * .16, TOP + .05), (x + .14, 0, TOP + .025)], .012, HOSE)
K.tube("Manifold", [(X0 - CL / 2 + .2, 0, TOP + .025), (X0 + CL / 2 - .05, 0, TOP + .025), (TX - .12, 0, .86), (TX - .12, 0, .78)], .016, HOSE)
K.cyl("ManifoldCoupling", .025, .025, .04, (TX - .12, 0, .77), K.BRASS, 12)

K.finish(OUT, "grow_bench_tier2", ortho=3.1, centre=(0, 0, 1.0))
