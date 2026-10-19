"""Canopy street terrace: Townhouse, sage, modelled from public/sprites/buildings/building.townhouse.sage.png.

Footprint 7.51 x 5.89 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingTownhouseSage")
B.palette()
W, D, H = 4.444, 3.485, 8.14

SAGE = K.mat("Sage", "#a7c39d", .7); GREEN = K.mat("ShopGreen", "#6f9a72", .6); BROWN = K.mat("Cornice", "#7b5642", .6)
g, b2 = 2.3, 4.85
B.walls(W, D, H, [g, b2], GREEN, SAGE, cornice=BROWN)
F = B.faces(W, D)
f = F["front"]
B.door(f, "Door", W * .48, .14, .55, 1.6)
BX, BZ = W * .72, b2 + .4
f.box("Balcony", BX, BZ, .9, .06, .3, B.M["FRAME"])
for k in range(7): f.box(f"Baluster{k}", BX - .4 + k * .133, BZ + .05, .025, .45, .025, B.M["FRAME"], .27)
f.box("BalconyRail", BX, BZ + .5, .9, .04, .3, B.M["FRAME"])
for i, u in enumerate([0.2, 0.78]): B.window(F["front"], f"FG{i}", u * F["front"].length, .65, 0.45, 0.9)
for i, u in enumerate([0.25, 0.72]): B.window(F["front"], f"F2W{i}", u * F["front"].length, g + .5, 0.48, 0.95)
for i, u in enumerate([0.25, 0.72]): B.window(F["front"], f"F3W{i}", u * F["front"].length, b2 + .45, 0.45, 0.95)
for i, u in enumerate([0.35, 0.75]): B.window(F["side"], f"S2W{i}", u * F["side"].length, g + .5, 0.48, 0.95)
for i, u in enumerate([0.35, 0.75]): B.window(F["side"], f"S3W{i}", u * F["side"].length, b2 + .45, 0.48, 0.95)

K.finish(OUT, "building_townhouse_sage", ortho=10.2, centre=(0, 0, H * .5))
