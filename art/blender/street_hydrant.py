"""Canopy fire hydrant: red barrel with brass caps; the green-capped pumper nozzle faces -Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_hydrant.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetHydrant")
RED = K.mat("HydrantRed", "#cf5a48", .45); RED_D = K.mat("HydrantRedDeep", "#b44a3a", .5)
K.cyl("Foot", .2, .2, .06, (0, 0, 0), K.GREEN, 32)
K.cyl("BaseFlange", .17, .17, .06, (0, 0, .06), RED_D, 32)
K.cyl("Barrel", .14, .14, .5, (0, 0, .1), RED, 32)
K.cyl("TopFlange", .17, .17, .06, (0, 0, .58), RED_D, 32)
K.cyl("Bonnet", .15, .09, .14, (0, 0, .63), RED, 32)
K.cyl("Nut", .035, .03, .06, (0, 0, .76), K.BRASS, 6)
for a in range(8):
    an = a * math.pi / 4
    for z in (.085, .6):
        K.cyl(f"Bolt{a}{z}", .012, .012, .015, (math.cos(an) * .155, math.sin(an) * .155, z + .02), K.BRASS, 8)
o = K.cyl("Pumper", .07, .07, .08, (0, -.13, .38), RED, 24); o.rotation_euler.x = math.pi / 2
o = K.cyl("PumperCap", .08, .08, .04, (0, -.2, .38), K.GREEN, 24); o.rotation_euler.x = math.pi / 2
o = K.cyl("PumperBoss", .045, .045, .025, (0, -.235, .38), K.BRASS, 24); o.rotation_euler.x = math.pi / 2
for sx in (1, -1):
    o = K.cyl(f"Side{sx}", .05, .05, .06, (sx * .13, 0, .42), RED, 24); o.rotation_euler.y = sx * math.pi / 2
    o = K.cyl(f"SideCap{sx}", .055, .055, .03, (sx * .19, 0, .42), K.BRASS, 6); o.rotation_euler.y = sx * math.pi / 2
K.finish(OUT, "street_hydrant", ortho=1.1, centre=(0, 0, .42))
