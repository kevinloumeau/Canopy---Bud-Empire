"""Canopy arch shelves (the round-topped oak cabinet on the mezzanine's left wall), modelled from shell.arch.shelves.

An oak surround with a half-round head, a cream ribbed back, three oak shelves stocked with jars, and green lower
panels with brass trim.  The open face is toward +X; the jars hang under the empty "Goods".  The origin is the centre
of the footprint on the floor.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P arch_shelves.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("ArchShelves")
rnd = K.rnd
BACK = K.mat("RibbedBack", "#efe6d2", .6)
SHELF = K.mat("ShelfOak", "#dcb47c", .55)
SURROUND = K.mat("ArchOak", "#dcb47c", .5)
JARS = [K.mat("JarAmber", "#b07a52", .35), K.mat("JarSage", "#6f8f62", .35), K.mat("JarClay", "#c79470", .35)]
LID = K.mat("JarLid", "#f1e6cc", .5)

D, W, HS = .385, 1.243, 1.739        # depth (x), width (y), height of the straight sides
R = W / 2                            # the head is a half circle across the full width
T = .085                             # surround thickness
X0, X1 = -D / 2, D / 2               # back and open face

def arch_solid(name, r_out, r_in, x0, x1, z, m, n=32):
    """A half ring in the Y-Z plane (centre at y=0, height z), extruded from x0 to x1."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    rings = []
    for x in (x0, x1):
        outer = [bm.verts.new((x, r_out * math.cos(math.pi * i / n), z + r_out * math.sin(math.pi * i / n))) for i in range(n + 1)]
        inner = [bm.verts.new((x, r_in * math.cos(math.pi * i / n), z + r_in * math.sin(math.pi * i / n))) for i in range(n + 1)]
        rings.append((outer, inner))
    (o0, i0), (o1, i1) = rings
    for k in range(n):
        bm.faces.new((o0[k], o0[k + 1], i0[k + 1], i0[k]))           # back face
        bm.faces.new((o1[k], i1[k], i1[k + 1], o1[k + 1]))           # front face
        bm.faces.new((o0[k], o1[k], o1[k + 1], o0[k + 1]))           # outer skin
        bm.faces.new((i0[k], i0[k + 1], i1[k + 1], i1[k]))           # inner skin
    for a, b in ((0, 0), (n, n)):                                     # flat ends where the head meets the sides
        bm.faces.new((o0[a], i0[a], i1[a], o1[a]) if a == 0 else (o0[a], o1[a], i1[a], i0[a]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    for f in bm.faces: f.smooth = True
    bm.to_mesh(me); bm.free()
    o = K.link(bpy.data.objects.new(name, me), m)
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = .008; bv.segments = 2; bv.limit_method = "ANGLE"
    return o

def arch_panel(name, r, x, z, thick, m, n=32):
    """A flat panel with a round head: a rectangle up to z and a half disc above it, thick along x."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    prof = [(-r, 0), (-r, z)] + [(r * math.cos(math.pi - math.pi * i / n), z + r * math.sin(math.pi - math.pi * i / n)) for i in range(1, n)] + [(r, z), (r, 0)]
    a = [bm.verts.new((x - thick / 2, y, zz)) for y, zz in prof]
    b = [bm.verts.new((x + thick / 2, y, zz)) for y, zz in prof]
    bm.faces.new(a); bm.faces.new(b[::-1])
    k = len(prof)
    for i in range(k): bm.faces.new((a[i], a[(i + 1) % k], b[(i + 1) % k], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me); bm.free()
    return K.link(bpy.data.objects.new(name, me), m)

# ---------- green base, plinth and the oak surround ----------
BASE = .42
K.box("Plinth", (D + .04, W + .04, .07), (0, 0, 0), K.BRASS, .01)
K.box("Base", (D, W, BASE - .07), (0, 0, .07), K.GREEN, .012)
K.box("BaseCap", (D + .03, W + .03, .035), (0, 0, BASE - .02), SURROUND, .01)
for sy in (-1, 1):   # green side panels with brass frames, lower half of each side
    K.box(f"SidePanel{sy}", (D - .02, .012, 1.0), (0, sy * (W / 2 + .004), .1), K.GREEN, .004)
    for dz in (.14, 1.06):
        K.box(f"SideTrimH{sy}{dz}", (D - .1, .014, .014), (0, sy * (W / 2 + .01), dz), K.BRASS, .004)
    for dx in (-(D - .1) / 2, (D - .1) / 2):
        K.box(f"SideTrimV{sy}{dx:.2f}", (.014, .014, .934), (dx, sy * (W / 2 + .01), .14), K.BRASS, .004)
for sy in (-1, 1):   # brass band capping each green side panel
    K.box(f"SideBand{sy}", (D + .02, .03, .03), (0, sy * (W / 2 + .006), 1.1), K.BRASS, .008)
K.box("FrontPanel", (.012, W - .1, BASE - .18), (X1 + .004, 0, .12), K.GREEN_D, .004)
for dz in (.14, BASE - .06):
    K.box(f"FrontTrimH{dz}", (.014, W - .18, .014), (X1 + .01, 0, dz), K.BRASS, .004)
for dy in (-(W - .18) / 2, (W - .18) / 2):
    K.box(f"FrontTrimV{dy:.2f}", (.014, .014, BASE - .2 + .014), (X1 + .01, dy, .14), K.BRASS, .004)
for sy in (-1, 1):
    K.box(f"Side{sy}", (D, T, HS - BASE), (0, sy * (W / 2 - T / 2), BASE), SURROUND, .012)
arch_solid("ArchHead", R, R - T, X0, X1, HS, SURROUND)
arch_solid("ArchBead", R + .012, R - .005, X1 - .02, X1 + .012, HS, SURROUND)   # a raised bead round the opening

# ---------- cream ribbed back and the shelves ----------
arch_panel("BackPanel", R - T + .002, X0 + .03, HS, .03, BACK)
for k in range(9):
    y = -(R - T) + (W - 2 * T) * (k + .5) / 9
    top = HS + math.sqrt(max(0, (R - T) ** 2 - y * y)) - .03
    K.box(f"Rib{k}", (.012, .03, top - BASE), (X0 + .05, y, BASE), BACK, .006)
SHELVES = [BASE, .78, 1.15, 1.52]
for r, z in enumerate(SHELVES[1:], 1):
    K.box(f"Shelf{r}", (D - .06, W - 2 * T, .03), (.01, 0, z - .03), SHELF, .008)

# ---------- jars ----------
def jar_mesh(name, body, r=.05, h=.15):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    a = bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=a["verts"], vec=(0, 0, h / 2))
    b = bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=r * .82, radius2=r * .82, depth=.03)
    bmesh.ops.translate(bm, verts=b["verts"], vec=(0, 0, h + .015))
    lid = set(b["verts"])
    for f in bm.faces:
        f.material_index = 1 if all(v in lid for v in f.verts) else 0; f.smooth = True
    bm.to_mesh(me); bm.free(); me.materials.append(body); me.materials.append(LID)
    return me
JAR_MESHES = [jar_mesh(f"Jar{i}", m) for i, m in enumerate(JARS)]
goods = bpy.data.objects.new("Goods", None); K.link(goods)
for r, z in enumerate(SHELVES):
    n = 4
    for k in range(n):
        y = -(W / 2 - T - .07) + (W - 2 * T - .14) * k / (n - 1)
        o = K.inst(f"Jar{r}{k}", JAR_MESHES[(r + k) % 3], (.03 + rnd.uniform(-.015, .015), y, z), (0, 0, rnd.uniform(0, 6.3)))
        o.parent = goods

K.finish(OUT, "arch_shelves", ortho=3.0, centre=(0, 0, 1.2))
