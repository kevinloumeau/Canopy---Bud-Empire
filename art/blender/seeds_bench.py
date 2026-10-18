"""Canopy seeds bench (tier 3), modelled from the current sprite.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P seeds_bench.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import canopy_kit as K

OUT = K.begin("SeedsBench")
rnd = K.rnd
WHITE = K.mat("Humidifier", "#ece6d6", .45)
VENT = K.mat("Vent", "#8f8a7c", .6)
TOPSTONE = K.mat("CreamTop", "#f0d9a8", .4)

def seedling(tag, x, y, z, s=1.):
    """A young plant: short stem, two rounded seed leaves and a crown of small fan leaves."""
    h = .07 * s
    K.tube(f"{tag}Stem", [(x, y, z), (x, y, z + h)], .006, K.STEM, .004)
    yaw0 = rnd.uniform(0, 6.3)
    for i in range(4):
        K.leaf_at(f"{tag}Leaf{i}", (x, y, z + h), yaw0 + i * 1.571, rnd.uniform(.15, .35), .78 * s, K.LEAF_MESHES[i % 2])
    for i in range(3):
        K.leaf_at(f"{tag}Top{i}", (x, y, z + h + .01), yaw0 + .6 + i * 2.09, .55, .38 * s, K.LEAF_MESHES[2])

# ---------- walnut cabinet with brass-framed panels ----------
L, D, H = 1.7, 1.0, .74
K.box("Plinth", (L + .12, D + .12, .13), (0, 0, 0), K.WOOD_D, .025)
K.box("PlinthBrass", (L + .1, D + .1, .025), (0, 0, .13), K.BRASS, .008)
K.box("Body", (L, D, H - .125), (0, 0, .125), K.WOOD, .012)
PW = (L - .1) / 3
for i in range(3):
    cx = -L / 2 + .05 + PW * (i + .5)
    K.box(f"Panel{i}", (PW - .04, .02, .5), (cx, -D / 2 - .008, .17), K.WOOD, .008)
    for dz in (.21, .61):
        K.box(f"FrameH{i}{dz}", (PW - .16, .022, .016), (cx, -D / 2 - .016, dz - .008), K.BRASS, .005)
    for dx in (-(PW - .16) / 2, (PW - .16) / 2):
        K.box(f"FrameV{i}{dx:.2f}", (.016, .022, .4), (cx + dx, -D / 2 - .016, .21), K.BRASS, .005)
K.box("EndPanel", (.02, D - .08, .5), (L / 2 + .008, 0, .17), K.WOOD, .008)
for dz in (.21, .61): K.box(f"EndFrameH{dz}", (.022, D - .26, .016), (L / 2 + .016, 0, dz - .008), K.BRASS, .005)
for dy in (-(D - .26) / 2, (D - .26) / 2): K.box(f"EndFrameV{dy:.2f}", (.022, .016, .4), (L / 2 + .016, dy, .21), K.BRASS, .005)
K.box("TopBand", (L + .04, D + .04, .025), (0, 0, H - .03), K.BRASS, .008)
K.box("Top", (L + .2, D + .2, .1), (0, 0, H - .01), TOPSTONE, .045, 5)
TOP = H + .09

# ---------- green seedling tray: two rows of three cells and a humidifier ----------
TX, TY = -.08, .05
K.box("Tray", (1.3, .64, .06), (TX, TY, TOP), K.GREEN, .02, 4)
for n, (dx, dy, w, d) in enumerate(((0, .31, 1.3, .03), (0, -.31, 1.3, .03), (.635, 0, .03, .64), (-.635, 0, .03, .64))):
    K.box(f"TrayRim{n}", (w, d, .05), (TX + dx, TY + dy, TOP + .05), K.GREEN, .012)
for r, y in enumerate((TY - .15, TY + .15)):
    for c in range(3):
        x = TX - .48 + c * .3
        K.box(f"Cell{r}{c}", (.25, .25, .06), (x, y, TOP + .03), K.GREEN_D, .02, 3)
        K.box(f"Soil{r}{c}", (.21, .21, .01), (x, y, TOP + .085), K.SOIL, .005)
        seedling(f"S{r}{c}", x + rnd.uniform(-.015, .015), y + rnd.uniform(-.015, .015), TOP + .09, rnd.uniform(.95, 1.1))
HX, HY = TX + .44, TY - .1
K.box("Humidifier", (.22, .22, .24), (HX, HY, TOP + .055), WHITE, .03, 4)
K.cyl("HumidVent", .055, .055, .004, (HX, HY, TOP + .295), VENT, 24)
for i in range(8):
    a = i * math.pi / 4
    K.box(f"VentSlot{i}", (.03, .006, .003), (HX + .025 * math.cos(a), HY + .025 * math.sin(a), TOP + .297), WHITE, .001, 1).rotation_euler.z = a
K.box("HumidSlot", (.012, .006, .1), (HX - .07, HY - .111, TOP + .1), VENT, .004)
K.box("HumidSlotSide", (.006, .012, .1), (HX + .111, HY + .05, TOP + .1), VENT, .004)

K.finish(OUT, "seeds_bench", ortho=2.6, centre=(0, 0, .55))
