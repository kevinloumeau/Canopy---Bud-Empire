"""Canopy lounge doorway drapes (shell.js drapes()): the velvet curtains on the lounge entrance and the back door.
  Drape   one pleated velvet panel, hemmed at the floor with a gathered heading under a darker band.
  Pelmet  the valance over the doorway: three velvet swags with a brass trim along their hem, under a brass rod
          with ball finials.
Both are modelled in a unit box (x -.5..5, height 0..1, depth -.5..5, the front toward Blender -Y = map +z) because
code stretches them to its own sizes: each panel's width follows the curtain's open amount (so the pleats bunch as it
draws back), its height the doorway and its depth .08; the pelmet fills the code's pelmet box.  Code bakes the
material colours into one vertex-coloured mesh per node.  Nothing is driven by name except the two nodes.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P lounge_drapes.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
from mathutils import Matrix
import canopy_kit as K

OUT = K.begin("LoungeDrapes")
VELVET = K.mat("Velvet", "#6b2436", .85)
VELVET_D = K.mat("VelvetDeep", "#4a1b29", .85)
TRIM = K.mat("DrapeBrass", "#d0a54e", .4)

def group(name, x):
    e = bpy.data.objects.new(name, None); K.col.objects.link(e); e.location = (x, 0, 0); return e

def own(e, objs):
    for o in objs: o.parent = e; o.matrix_parent_inverse = Matrix.Translation(e.location).inverted()

def sheet(name, rows, cols, at, m, thick):
    """A grid sheet from at(u, v) -> (x, y, z) over u, v in 0..1, solidified (closed, so its normals are right)."""
    verts, faces = [], []
    for r in range(rows + 1):
        for c in range(cols + 1): verts.append(at(c / cols, r / rows))
    for r in range(rows):
        for c in range(cols):
            a = r * (cols + 1) + c; faces.append((a, a + cols + 1, a + cols + 2, a + 1))
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], faces)
    for p in me.polygons: p.use_smooth = True
    o = K.link(bpy.data.objects.new(name, me), m)
    s = o.modifiers.new("Solid", "SOLIDIFY"); s.thickness = thick; s.offset = 0
    return o

# ---------- Drape: five deep pleats, a little fuller at the hem, gathered tight under the heading ----------
PLEATS, HEAD = 5, .93
def drape_at(u, v):
    z = v * HEAD
    amp = .3 + .08 * (1 - v)                                    # the folds fall a touch deeper toward the floor
    y = amp * math.sin(u * math.pi * 2 * PLEATS)
    x = -.5 + u
    if v == 0: z = .012 * (1 - math.cos(u * math.pi * 2 * PLEATS))   # the hem lifts a little at each fold
    return (x, y, z)
x = 0; e = group("Drape", x)
panel = sheet("DrapePanel", 6, PLEATS * 6, drape_at, VELVET, .14)
heading = sheet("DrapeHeading", 1, PLEATS * 6, lambda u, v: (-.5 + u, .22 * math.sin(u * math.pi * 2 * PLEATS), HEAD - .005 + v * (1 - HEAD + .005)), VELVET_D, .5)
for f in heading.data.polygons: f.use_smooth = False
own(e, [panel, heading])

# ---------- Pelmet: three swags with brass trim, a brass rod and finials ----------
x = 2.0; e = group("Pelmet", x); parts = []
SW = 3
def hem(u):                                                     # the swags' scalloped lower edge, 0 at each low point
    return .32 * (1 - abs(math.sin(u * math.pi * SW)))
def swag_at(u, v):
    z0 = hem(u) + .02; z = z0 + v * (.86 - z0)
    belly = (1 - v) * .18 * math.sin(u * math.pi * SW) ** 2      # the swags belly out toward the front as they fall
    return (x - .46 + u * .92, -.05 - belly, z)
parts.append(sheet("PelmetSwags", 5, SW * 10, swag_at, VELVET, .16))
parts.append(K.box("PelmetBack", (.92, .2, .5), (x, .3, .46), VELVET_D, 0, 1))
trim = sheet("PelmetTrim", 1, SW * 10, lambda u, v: (x - .46 + u * .92, -.05 - .18 * math.sin(u * math.pi * SW) ** 2 - .02, hem(u) + v * .06), TRIM, .06)
parts.append(trim)
rod = K.cyl("PelmetRod", .07, .07, .96, (0, 0, 0), TRIM, 10); rod.rotation_euler = (0, math.pi / 2, 0); rod.location = (x - .48, -.36, .9)
parts.append(rod)
for s in (-1, 1):
    f = K.cyl(f"PelmetFinialBall{s}", .1, .1, .2, (x + s * .44, -.36, .8), TRIM, 10); parts.append(f)
own(e, parts)

K.finish(OUT, "lounge_drapes", ortho=2.4, centre=(1.0, 0, .5))
