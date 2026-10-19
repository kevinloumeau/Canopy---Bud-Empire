"""Canopy street terrace: Corner shop, modelled from public/sprites/buildings/building.corner.png.

Footprint 7.73 x 7.25 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingCorner")
B.palette()
W, D, H = 4.574, 4.290, 5.63

CREAMW = K.mat("CreamWall", "#ece3d0", .7); TEAL = K.mat("ShopTeal", "#4b8580", .55)
g, C = 2.8, .95
B.walls(W, D, H, [g], TEAL, CREAMW, chamfer=C)
F = B.faces(W, D, C)
B.shopfront(F["front"], "ShopF", .1, F["front"].length - .05, g, TEAL)
B.shopfront(F["side"], "ShopS", .05, F["side"].length - .1, g, TEAL)
B.shopfront(F["corner"], "ShopC", .0, F["corner"].length, g, TEAL, door_at=F["corner"].length / 2, door_w=.6)
B.awning(F["front"], "AwnF", F["front"].length * .55, g - .05, F["front"].length * .7, .45, .7)
B.awning(F["side"], "AwnS", F["side"].length * .42, g - .05, F["side"].length * .7, .45, .7)
F["corner"].box("Step", F["corner"].length / 2, 0, .8, .1, .3, B.M["CREAM"])
for i, u in enumerate([0.3, 0.72]): B.window(F["front"], f"FW{i}", u * F["front"].length, g + .65, 0.55, 0.95)
for i, u in enumerate([0.3, 0.72]): B.window(F["side"], f"SW{i}", u * F["side"].length, g + .65, 0.55, 0.95)

K.finish(OUT, "building_corner", ortho=9.3, centre=(0, 0, H * .5))
