"""Canopy street terrace: Rowhouse, terracotta, modelled from public/sprites/buildings/building.rowhouse.terracotta.png.

Footprint 8.86 x 6.68 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingRowhouseTerracotta")
B.palette()
W, D, H = 5.243, 3.953, 7.18

TERRA = K.mat("Terracotta", "#c8754f", .8)
g = 3.2
B.walls(W, D, H, [g], TERRA, TERRA)
F = B.faces(W, D)
f = F["front"]
B.door(f, "Door", W * .25, .14, .62, 1.75)
B.awning(f, "AwnD", W * .25, g - .25, 1.1, .4, .6)
# bay window: a shallow three-sided box out of the wall
f.box("Bay", W * .62, .14, 1.6, 2.1, .45, TERRA)
f.box("BayWin", W * .62, .7, 1.4, 1.3, .03, B.M["FRAME"], .45)
f.box("BayGlass", W * .62, .76, 1.28, 1.18, .035, B.M["SHOPGLASS"], .45)
f.box("BayTop", W * .62, 2.24, 1.7, .1, .5, B.M["CREAM"])
B.awning(f, "AwnB", W * .62, g - .25, 1.7, .4, .55)
for i, u in enumerate([0.22, 0.62]): B.window(F["front"], f"FW{i}", u * F["front"].length, g + .65, 0.6, 1.05)
for i, u in enumerate([0.3, 0.72]): B.window(F["side"], f"SW{i}", u * F["side"].length, g + .65, 0.6, 1.05)
for i, u in enumerate([0.72]): B.window(F["side"], f"SG{i}", u * F["side"].length, .85, 0.6, 1.05)

K.finish(OUT, "building_rowhouse_terracotta", ortho=9.7, centre=(0, 0, H * .5))
