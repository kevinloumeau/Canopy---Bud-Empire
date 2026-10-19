"""Canopy fingerpost: green pole with two brass-edged arms, one along X and one along Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_signpost.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetSignpost")
POST = K.mat("SignGreen", "#2f6b48", .45, .1)
K.cyl("Foot", .1, .12, .06, (0, 0, 0), K.BRASS, 32)
K.cyl("FootRing", .07, .08, .05, (0, 0, .06), POST, 24)
K.cyl("Pole", .035, .035, 2.05, (0, 0, .1), POST, 24)
K.cyl("Collar", .05, .05, .05, (0, 0, 1.92), K.BRASS, 24)
K.cyl("Ball", .045, .045, .07, (0, 0, 2.15), K.BRASS, 24)
for name, (sx, sy, z) in {"ArmX": (1, 0, 2.0), "ArmY": (0, 1, 1.88)}.items():
    w, h = .62, .12
    size = (w, .025, h) if sx else (.025, w, h)
    K.box(name, size, (sx * w * .1, sy * w * .1, z), POST, .01)
    edge = (w + .02, .03, .012) if sx else (.03, w + .02, .012)
    K.box(name + "TopEdge", edge, (sx * w * .1, sy * w * .1, z + h), K.BRASS, .004)
    K.box(name + "BotEdge", edge, (sx * w * .1, sy * w * .1, z - .006), K.BRASS, .004)

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
fit_height(2.25)
K.finish(OUT, "street_signpost", ortho=2.6, centre=(0, 0, 1.15))
