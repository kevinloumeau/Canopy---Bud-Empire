"""Canopy parking meter: green post and head with a cream dial window; the face looks -Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_meter.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetMeter")
POST = K.mat("MeterGreen", "#2f6b48", .45, .1); FACE = K.mat("MeterFace", "#f1e7cc", .4); DIAL = K.mat("DialRed", "#c4473c", .5)
K.cyl("Foot", .14, .16, .05, (0, 0, 0), POST, 32)
for a in range(4):
    K.cyl(f"FootBolt{a}", .012, .012, .015, (.11 * math.cos(a * 1.57 + .78), .11 * math.sin(a * 1.57 + .78), .05), K.BRASS, 8)
K.cyl("Post", .04, .045, .58, (0, 0, .05), POST, 24)
K.cyl("Collar", .07, .07, .05, (0, 0, .6), POST, 24)
HZ = .64
K.box("Head", (.34, .28, .36), (0, 0, HZ), POST, .1, 5)
K.cyl("Dome", .17, .17, .28, (0, .14, HZ + .36), POST, 40).rotation_euler.x = math.pi / 2
K.box("Window", (.25, .02, .17), (0, -.16, HZ + .3), FACE, .05)
K.box("Dial", (.07, .022, .05), (.07, -.168, HZ + .38), DIAL, .015)
K.box("Needle", (.008, .024, .1), (-.02, -.17, HZ + .32), K.DARK, .003).rotation_euler.y = .6
K.box("CoinPlate", (.16, .02, .14), (0, -.14, HZ + .08), FACE, .03)
K.box("CoinSlot", (.03, .024, .08), (0, -.146, HZ + .11), K.BRASS, .008)
K.cyl("Knob", .035, .035, .025, (0, -.14, HZ + .05), K.BRASS, 16).rotation_euler.x = math.pi / 2

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
fit_height(1.12)
K.finish(OUT, "street_meter", ortho=1.5, centre=(0, 0, .6))
