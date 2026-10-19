"""Canopy street tree (street.tree.02): a tall clustered crown of soft clay-like masses on a slim trunk, standing in a
square iron grate with a stone kerb.  Origin at the trunk's base on the pavement.

Needs canopy_kit.py and tree_parts.py in the same folder.  Run headless with
    blender -b -P street_tree.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import tree_parts as T

OUT = K.begin("StreetTree")
rnd = random.Random(7)
BARK = K.mat("Bark", "#7a4a2c", .8)
DEEP = K.mat("CrownDeep", "#33602a", .8); MID = K.mat("CrownMid", "#427232", .78); LIGHT = K.mat("CrownLight", "#57873b", .75)
IRON = K.mat("GrateIron", "#2f2c2a", .55, .3); KERB = K.mat("PitKerb", "#c9ab6e", .6); PITSOIL = K.mat("PitSoil", "#3a2c22", 1.)

T.grate("Pit", 1.3, .07, IRON, IRON, PITSOIL, slots=4, kerb=.1, kerb_m=KERB, hole=.13)
T.trunk("Trunk", (0, 0, 0), (0, 0, 1.45), .13, .08, BARK, forks=[(.32, -.14, 1.8), (-.3, .2, 1.75)], rf=.055)
for i, (nump, z, rad, r, m) in enumerate(((5, 1.8, .58, .58, DEEP), (4, 2.35, .45, .54, MID), (3, 2.85, .32, .48, MID), (1, 3.3, 0, .46, LIGHT))):
    a0 = rnd.uniform(0, 6.3)
    for j in range(nump):
        a = a0 + j * 2 * math.pi / nump
        T.lump(f"Crown{i}{j}", (rad * math.cos(a), rad * math.sin(a), z + rnd.uniform(-.06, .06)), r * rnd.uniform(.92, 1.08),
               m if (j % 2 or i == 3) else (LIGHT if i else MID), .8, k=i + j, yaw=rnd.uniform(0, 6.3))
K.finish(OUT, "street_tree", ortho=4.6, centre=(0, 0, 1.75))
