"""Canopy round tree (sprites/tree.png): a full round crown of soft scalloped masses on a short forked trunk, standing
in a small dark iron grate.  Origin at the trunk's base on the pavement.

Needs canopy_kit.py and tree_parts.py in the same folder.  Run headless with
    blender -b -P tree.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import canopy_kit as K
import tree_parts as T

OUT = K.begin("Tree")
rnd = random.Random(11)
BARK = K.mat("Bark", "#6e4a33", .8)
DEEP = K.mat("CrownDeep", "#285428", .8); MID = K.mat("CrownMid", "#356a30", .78); LIGHT = K.mat("CrownLight", "#4c8034", .76)
TOP = K.mat("CrownSun", "#679438", .74)
IRON = K.mat("GrateIron", "#3a2c2a", .55, .25); PITSOIL = K.mat("PitSoil", "#2e241e", 1.)

T.grate("Pit", .92, .06, IRON, IRON, PITSOIL, slots=3, hole=.1)
T.trunk("Trunk", (0, 0, 0), (0, 0, 1.1), .085, .06, BARK, forks=[(.26, -.1, 1.55), (-.22, .16, 1.5)], rf=.045)
# The crown: an outer ring of masses low down, a second ring, and a cap; each mass carries scallops round its lower edge.
C = 2.2
for i, (n, z, rad, r, ms) in enumerate(((6, C - .35, .62, .5, (DEEP, MID)), (5, C + .15, .48, .5, (MID, LIGHT)), (3, C + .58, .3, .46, (LIGHT, TOP)), (1, C + .85, 0, .38, (TOP, TOP)))):
    a0 = rnd.uniform(0, 6.3)
    for j in range(n):
        a = a0 + j * 2 * math.pi / n
        m = ms[j % 2]
        T.lump(f"Crown{i}{j}", (rad * math.cos(a), rad * math.sin(a), z + rnd.uniform(-.07, .07)), r * rnd.uniform(.92, 1.08), m, .82,
               k=i + j, yaw=a, bumps=5 if i < 3 else 0, rnd=rnd)
T.lump("CrownCore", (0, 0, C), .85, DEEP, .8, k=1)
K.finish(OUT, "tree", ortho=4.6, centre=(0, 0, 1.75))
