"""Canopy cafe table: round cream table on a terracotta pedestal under a terracotta parasol, with two green chairs (at -X and +Y).

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_cafe_table.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetCafeTable")
TC = K.mat("Terracotta2", "#cf6e4c", .6); CHAIR = K.mat("ChairGreen", "#3c7a4c", .55); TOPC = K.mat("TableCream", "#f0e6cf", .5)
WOODP = K.mat("PoleWood", "#c48a55", .5)
K.cyl("Foot", .22, .26, .06, (0, 0, 0), TC, 40)
K.cyl("Pedestal", .05, .07, .62, (0, 0, .06), TC, 24)
K.cyl("Top", .42, .42, .05, (0, 0, .68), TOPC, 48)
K.cyl("Pole", .022, .022, 1.35, (0, 0, .73), WOODP, 16)
# parasol: eight soft panels as a shallow cone with a scalloped rim
n = 48; R = .82; verts = [(0, 0, 2.15)]
for i in range(n):
    a = i / n * 6.283; r = R * (1 - .05 * abs(math.sin(a * 4)))
    verts.append((r * math.cos(a), r * math.sin(a), 1.86 + .03 * abs(math.sin(a * 4))))
faces = [(0, 1 + i, 1 + (i + 1) % n) for i in range(n)]
me = bpy.data.meshes.new("Parasol"); me.from_pydata(verts, [], faces)
po = K.link(bpy.data.objects.new("Parasol", me), TC)
po.modifiers.new("Thick", "SOLIDIFY").thickness = .05
po.modifiers.new("Sub", "SUBSURF").levels = 2
for p in me.polygons: p.use_smooth = True
K.cyl("ParasolCap", .1, .06, .06, (0, 0, 2.12), TC, 24)
K.cyl("Finial", .03, .03, .06, (0, 0, 2.17), WOODP, 12)
def chair(tag, x, y, yaw):
    """A rounded green bistro chair whose seat faces the table (yaw points from chair to table)."""
    c, s = math.cos(yaw), math.sin(yaw)
    def at(dx, dy): return (x + dx * c - dy * s, y + dx * s + dy * c)
    for dx in (-.16, .16):
        for dy in (-.16, .16):
            K.cyl(f"{tag}Leg{dx}{dy}", .03, .025, .44, at(dx, dy) + (0,), CHAIR, 12)
    o = K.box(tag + "Seat", (.42, .42, .08), at(0, 0) + (.42,), CHAIR, .04, 4); o.rotation_euler.z = yaw
    o = K.box(tag + "Back", (.09, .42, .42), at(-.19, 0) + (.48,), CHAIR, .045, 4); o.rotation_euler.z = yaw
chair("ChairA", -.68, -.05, 0)
chair("ChairB", -.05, .68, -math.pi / 2)
K.finish(OUT, "street_cafe_table", ortho=2.6, centre=(0, 0, 1.05))
