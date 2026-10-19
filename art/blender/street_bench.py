"""Canopy street bench: oak slats on black cast-iron ends.  Long along Y, the sitter faces +X.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_bench.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("StreetBench")
IRON = K.mat("CastIron", "#26282a", .45, .4)
SLAT = K.mat("BenchOak", "#c99158", .6)
L = 1.6
for y in (-L / 2 + .14, L / 2 - .14):
    # cast-iron end frame: a scrolled front leg, a back leg that rises into the back support, and a seat rail
    K.tube(f"Leg{y:.2f}", [(.3, y, .02), (.26, y, .08), (.2, y, .2), (.19, y, .32), (.23, y, .42)], .034, IRON)
    K.tube(f"BackLeg{y:.2f}", [(-.3, y, .02), (-.25, y, .1), (-.2, y, .3), (-.19, y, .42), (-.24, y, .62), (-.29, y, .8)], .034, IRON)
    K.tube(f"Rail{y:.2f}", [(-.24, y, .41), (.25, y, .41)], .03, IRON)
    K.tube(f"Brace{y:.2f}", [(-.2, y, .25), (0, y, .33), (.2, y, .25)], .02, IRON)
    K.box(f"FootF{y:.2f}", (.12, .07, .03), (.3, y, 0), IRON, .01)
    K.box(f"FootB{y:.2f}", (.12, .07, .03), (-.3, y, 0), IRON, .01)
for i in range(5):                                   # seat slats
    K.box(f"Seat{i}", (.08, L, .035), (-.19 + i * .095, 0, .43), SLAT, .012)
for i in range(3):                                   # back slats, leaning back
    o = K.box(f"Back{i}", (.035, L, .1), (-.19 - i * .03, 0, .5 + i * .12), SLAT, .012)
    o.rotation_euler.y = -.25
K.finish(OUT, "street_bench", ortho=2.0, centre=(0, 0, .45))
