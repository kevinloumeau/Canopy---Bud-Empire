"""Canopy street terrace: Apartment, brick, modelled from public/sprites/buildings/building.apartment.brick.png.

Footprint 9.47 x 7.09 map units (x by z, from BUILDING_SPRITES in src/sunny-world.js) at 1.69 map units per metre;
the height is measured off the render.  Front (-Y, map +z, screen lower-left) is the street face with the door.
Origin at the footprint centre on the floor.  Needs canopy_kit.py and building_parts.py next to it.
"""
import os, sys
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import building_parts as B

OUT = K.begin("BuildingApartmentBrick")
B.palette()
W, D, H = 5.604, 4.195, 7.58

BRICK = K.mat("Brick", "#97573f", .85); GREEN = K.mat("ShopGreen", "#4f7c5c", .55)
g, b2 = 2.3, 4.75
B.walls(W, D, H, [g, b2], BRICK, BRICK)
F = B.faces(W, D)
B.shopfront(F["front"], "Shop", .12, W - .12, g, GREEN, door_at=W * .5)
B.prism("GreenBase", W, D, 0, .3, GREEN, 0, .035)
for i, u in enumerate([0.18, 0.5, 0.82]): B.window(F["front"], f"F2W{i}", u * F["front"].length, g + .55, 0.55, 1.0)
for i, u in enumerate([0.18, 0.5, 0.82]): B.window(F["front"], f"F3W{i}", u * F["front"].length, b2 + .45, 0.55, 1.0)
for i, u in enumerate([0.3, 0.72]): B.window(F["side"], f"S2W{i}", u * F["side"].length, g + .55, 0.55, 1.0)
for i, u in enumerate([0.3, 0.72]): B.window(F["side"], f"S3W{i}", u * F["side"].length, b2 + .45, 0.55, 1.0)
for i, u in enumerate([0.3, 0.72]): B.window(F["side"], f"S1W{i}", u * F["side"].length, .75, 0.55, 1.0)

K.finish(OUT, "building_apartment_brick", ortho=10.3, centre=(0, 0, H * .5))
