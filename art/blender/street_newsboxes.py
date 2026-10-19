"""Canopy news boxes: red, blue and cream vending boxes on short legs, in a row; fronts look -Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_newsboxes.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetNewsboxes")
COLS = [K.mat("BoxRed", "#c8463b", .45), K.mat("BoxBlue", "#3b6fb6", .45), K.mat("BoxCream", "#efe4c8", .5)]
PAPER = K.mat("Paper", "#ece7da", .7); INK = K.mat("Ink", "#6d6a63", .7); WIN = K.mat("Window", "#3a3d3f", .2)
for i, m in enumerate(COLS):
    x, h = -.5 + i * .5, (1.05, .95, .9)[i]
    for sx in (-1, 1):
        K.box(f"Leg{i}{sx}", (.06, .3, .12), (x + sx * .15, 0, 0), K.DARK, .01)
    K.box(f"Body{i}", (.44, .4, h), (x, 0, .1), m, .03)
    K.box(f"Head{i}", (.26, .22, .22), (x, .03, .1 + h), m, .03)
    K.box(f"CoinSlot{i}", (.08, .02, .03), (x, -.08, .22 + h), K.DARK, .006)
    K.box(f"Window{i}", (.32, .02, .38), (x, -.2, .1 + h * .5), WIN, .01)
    K.box(f"Paper{i}", (.24, .022, .3), (x, -.205, .14 + h * .5), PAPER, .004)
    for k in range(4):
        K.box(f"Line{i}{k}", (.16 if k else .2, .024, .015), (x, -.207, .38 + h * .5 - k * .05), INK, .002)
    K.box(f"Handle{i}", (.04, .03, .1), (x + .18, -.21, .1 + h * .55), K.DARK, .01)

def fit_height(h):
    """Scale the whole prop about its floor origin so it stands h metres tall (the game's map size / 1.69)."""
    dg = bpy.context.evaluated_depsgraph_get(); top = 0
    for o in bpy.data.objects:
        if o.type in ("MESH", "FONT"):
            ev = o.evaluated_get(dg); top = max(top, max((ev.matrix_world @ Vector(c)).z for c in ev.bound_box))
    f = h / top
    for o in bpy.data.objects:
        if not o.parent and o.type in ("MESH", "FONT", "CURVE"):
            o.location *= f; o.scale *= f
    return f
fit_height(1.66)
K.finish(OUT, "street_newsboxes", ortho=2.2, centre=(0, 0, .8))
