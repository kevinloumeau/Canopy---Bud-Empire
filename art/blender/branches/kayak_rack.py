"""Riverside kayak rack: a low two-tier cedar rack with an orange and a teal kayak, a paddle leaning on its end.

Fits the 2D rack: posts 2.1 map units apart along X (1.24 m), tiers at .34 and .9 tall (.25 and .65 m), kayaks
2.9 long (1.7 m). Run headless:  python kayak_rack.py -- OUT_DIR
"""
import math
from branch_kit import K, ellipsoid, tris

OUT = K.begin("KayakRack")
CEDAR = K.mat("Cedar", "#a8783f", .75); DARKW = K.mat("RackDark", "#2f4237", .5)
HULL_A = K.mat("HullOrange", "#cf8a5a", .45); HULL_B = K.mat("HullTeal", "#7fa5a0", .45); COCKPIT = K.mat("Cockpit", "#2c3a34", .6)
for x in (-.62, .62):
    K.box(f"Post{x}", (.08, .08, .74), (x, .22, 0), DARKW, .01, 1)
    for z in (.2, .58):
        K.box(f"Arm{x}_{z}", (.07, .46, .04), (x, .03, z), CEDAR, .008, 1)
for z, hull in ((.25, HULL_A), (.63, HULL_B)):
    ellipsoid(f"Kayak{z}", (0, 0, z + .07), (1.72, .36, .15), hull, 14, 6)
    ellipsoid(f"Cockpit{z}", (.05, 0, z + .14), (.42, .22, .04), COCKPIT, 10, 4)
o = K.box("PaddleShaft", (.03, .03, 1.05), (.9, .1, 0), DARKW, 0); o.rotation_euler.y = .3
o = K.box("PaddleBlade", (.12, .02, .26), (.9 + math.sin(.3) * .82, .1, math.cos(.3) * .82), HULL_A, .01, 1); o.rotation_euler.y = .3
K.finish(OUT, "kayak_rack", ortho=2.6, centre=(0, 0, .4))
tris(OUT, "kayak_rack")
