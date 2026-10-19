"""Canopy queue stanchion: brass post on a round base with a ball top and a rope hook facing +Y.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_queue_post.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("QueuePost")
K.cyl("Base", .18, .2, .04, (0, 0, 0), K.BRASS, 48)
K.cyl("BaseDome", .17, .06, .07, (0, 0, .04), K.BRASS, 48)
K.cyl("Post", .03, .03, .78, (0, 0, .1), K.BRASS, 24)
K.cyl("Collar", .045, .045, .04, (0, 0, .84), K.BRASS, 24)
K.cyl("Neck", .035, .025, .05, (0, 0, .88), K.BRASS, 24)
bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=16, radius=.06)
me = bpy.data.meshes.new("Ball"); bm.to_mesh(me); bm.free(); me.materials.append(K.BRASS)
for p in me.polygons: p.use_smooth = True
K.link(bpy.data.objects.new("Ball", me)).location = (0, 0, .98)
K.tube("Hook", [(0, .03, .84), (0, .07, .85), (0, .085, .82), (0, .07, .8)], .01, K.BRASS)

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
fit_height(.84 / 1.69 * 1.04 / .84)   # rope hook at 0.84 map units (the game draws ~1.69 map units per metre)
K.finish(OUT, "street_queue_post", ortho=.75, centre=(0, 0, .31))
