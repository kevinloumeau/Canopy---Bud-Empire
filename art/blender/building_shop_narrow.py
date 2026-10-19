"""Canopy street terrace: Narrow shop, modelled from public/sprites/buildings/building.shop.narrow.png.

Footprint 8.28 x 6.23 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingShopNarrow")
B.palette()
W, D, H = 4.899, 3.686, 7.02

CREAMW = K.mat("CreamWall", "#ece3d0", .7); MAUVE = K.mat("Mauve", "#7b4b60", .6)
g = 3.15
B.walls(W, D, H, [g], MAUVE, CREAMW)
F = B.faces(W, D)
B.shopfront(F["front"], "Shop", .1, W - .1, g, MAUVE, door_at=W * .72)
B.awning(F["front"], "Awn", W * .38, g - .05, W * .62, .55, .75)
for i, u in enumerate([0.25, 0.66]): B.window(F["front"], f"FW{i}", u * F["front"].length, g + .7, 0.6, 1.05)
for i, u in enumerate([0.55]): B.window(F["side"], f"SW{i}", u * F["side"].length, g + .7, 0.6, 1.05)
for i, u in enumerate([0.55]): B.window(F["side"], f"SG{i}", u * F["side"].length, .9, 0.6, 1.05)

K.finish(OUT, "building_shop_narrow", ortho=9.0, centre=(0, 0, H * .5))
