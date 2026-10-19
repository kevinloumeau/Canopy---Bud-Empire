"""Canopy seeds bench, tier 4 (Lv 50): a propagation station.  A green lacquered cabinet with brass trim and a
cream top carries a tray of twelve seedlings under a clear humidity dome with vents, a brass misting arm fed from a
humidifier, and a small grow light on a brass stalk.  Same footprint, facing and origin as seeds_bench (tier 3).

Needs canopy_kit.py, station_parts.py and seedgrow45_parts.py in the same folder.  Run headless with
    blender -b -P seeds_bench_tier4.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import station_parts as SP
import seedgrow45_parts as T

OUT = K.begin("SeedsBenchTier4")
rnd = K.rnd
M = T.mats()
VENT = K.mat("Vent", "#8f8a7c", .6)
L, D, H = 1.7, 1.0, .74
TOP = T.cabinet(M, L, D, H, panels=3, top_over=.1)

# ---------- seedling tray: three rows of four cells ----------
TX, TY, TW, TD = -.12, .02, 1.24, .74
K.box("Tray", (TW, TD, .06), (TX, TY, TOP), K.GREEN, .02, 4)
for r in range(3):
    for c in range(4):
        x, y = TX - .45 + c * .3, TY - .23 + r * .23
        K.box(f"Cell{r}{c}", (.24, .19, .06), (x, y, TOP + .03), K.GREEN_D, .02, 3)
        K.box(f"Soil{r}{c}", (.2, .15, .01), (x, y, TOP + .085), K.SOIL, .005)
        SP.seedling(f"S{r}{c}", x + rnd.uniform(-.01, .01), y + rnd.uniform(-.01, .01), TOP + .09, rnd.uniform(1.0, 1.15))
# ---------- clear humidity dome: straight walls and a rounded lid, brass base rim and two vents ----------
DZ, WH = TOP + .06, .2
K.box("DomeRim", (TW + .03, TD + .03, .025), (TX, TY, DZ - .005), K.BRASS, .008)
K.box("DomeWalls", (TW, TD, WH), (TX, TY, DZ), M["CLEAR"], .01)
lid = K.cyl("DomeLid", TD / 2, TD / 2, TW, (0, 0, 0), M["CLEAR"], 24)
lid.rotation_euler.y = math.pi / 2; lid.location = (TX - TW / 2, TY, DZ + WH); lid.scale = (.32, 1, 1)
for k, dx in enumerate((-.3, .3)):
    K.cyl(f"DomeVent{k}", .045, .045, .015, (TX + dx, TY, DZ + WH + TD / 2 * .32 - .006), VENT, 16)
    K.cyl(f"DomeVentRing{k}", .052, .052, .006, (TX + dx, TY, DZ + WH + TD / 2 * .32 - .008), K.BRASS, 16)
# ---------- humidifier and the brass misting arm arching over the dome ----------
HX, HY = L / 2 - .1, -.28
K.box("Humidifier", (.2, .2, .3), (HX, HY, TOP), M["WHITE"], .03, 4)
K.cyl("HumidCap", .07, .07, .02, (HX, HY, TOP + .3), K.BRASS, 20)
arm = [(HX, HY, TOP + .32), (HX, HY, TOP + .52), (HX - .12, HY + .05, TOP + .6), (TX + .2, TY - .05, TOP + .58), (TX - .35, TY - .05, TOP + .55)]
K.tube("MistArm", arm, .012, K.BRASS)
for k, t in enumerate((.25, .55, .85)):
    x = TX + .2 + (TX - .35 - TX - .2) * t
    K.cyl(f"Nozzle{k}", .016, .01, .04, (x, TY - .05, TOP + .52), K.BRASS, 10)
# ---------- small grow light on a brass stalk at the back ----------
SX, SY = -L / 2 + .12, D / 2 - .12
K.cyl("LampFoot", .07, .08, .03, (SX, SY, TOP), K.BRASS, 20)
K.tube("LampStalk", [(SX, SY, TOP + .03), (SX, SY, TOP + .85), (SX + .12, SY - .12, TOP + .95)], .014, K.BRASS)
K.box("LampBar", (.62, .14, .05), (SX + .42, SY - .2, TOP + .92), M["LACQUER_D"], .015).rotation_euler.z = -.45
o = K.box("LampPanel", (.56, .1, .008), (SX + .42, SY - .2, TOP + .915), M["GROWLED"], .003); o.rotation_euler.z = -.45
o = K.box("LampEdge", (.58, .006, .02), (SX + .42 + .03, SY - .2 - .065, TOP + .93), M["GROWLED"], .002); o.rotation_euler.z = -.45

K.finish(OUT, "seeds_bench_tier4", ortho=2.7, centre=(0, 0, .65))
