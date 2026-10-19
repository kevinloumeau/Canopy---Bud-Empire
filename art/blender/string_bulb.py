"""Canopy rooftop string lights (rooftop.js stringLights): one festoon bulb, instanced at every bulb on the wires.
  Bulb    a round frosted globe with a little teat at its tip, lit warm by code after dark.
  Socket  the black rubber festoon socket above it, with the clip that holds it to the wire.
Origin at the globe's centre, where code places each bulb (.07 under the wire); the clip's top meets the wire.
Map units / 1.69 across, world heights x .7247 up.  Code merges each node into one instanced mesh.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P string_bulb.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
from mathutils import Matrix
import canopy_kit as K

OUT = K.begin("StringBulb")
M, V = 1 / 1.69, .7247
GLASS = K.mat("BulbGlass", "#fff1cf", .3, emit=.4)
RUBBER = K.mat("SocketRubber", "#22262a", .7)

def group(name):
    e = bpy.data.objects.new(name, None); K.col.objects.link(e); return e

R = .042 * M                                                   # globe radius
e = group("Bulb")
me = bpy.data.meshes.new("BulbGlobe"); bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=7, radius=R)
for v in bm.verts: v.co.z *= 1.08                            # a touch taller than round
bm.to_mesh(me); bm.free(); me.materials.append(GLASS)
for p in me.polygons: p.use_smooth = True
g = K.link(bpy.data.objects.new("BulbGlobe", me)); g.parent = e
t = K.cyl("BulbTip", R * .18, R * .05, R * .3, (0, 0, -R * 1.08 - R * .25), GLASS, 6); t.parent = e

e = group("Socket")
top = .07 * V
parts = [K.cyl("SocketNeck", R * .42, R * .5, R * .5, (0, 0, R * .9), RUBBER, 8),
         K.cyl("SocketBody", R * .52, R * .52, top - R * 1.3 - .006, (0, 0, R * 1.3), RUBBER, 8),
         K.box("SocketClip", (R * .5, R * 1.1, .008), (0, 0, top - .008), RUBBER, 0, 1)]
for o in parts: o.parent = e

K.finish(OUT, "string_bulb", ortho=.12, centre=(0, 0, .01))
