"""Canopy mezzanine wall shelving (the long unit on the mezzanine's rear wall), modelled from shell.shelf.wall.left.

Eight oak bays on a green plinth between green end panels, three oak shelves and a thick cream top cap, stocked with
jars and white boxes.  The goods hang under the empty "Goods", so code can hide them and stock the shelves itself.
The open face is toward -Y; the origin is the centre of the footprint on the floor.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P wall_shelving.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("WallShelving")
rnd = K.rnd
TOPCAP = K.mat("CreamTop", "#efe4c6", .45)
BACK = K.mat("ShelfBack", "#e9dcc0", .6)
SHELF = K.mat("ShelfOak", "#d2a46c", .55)
JARS = [K.mat("JarAmber", "#b07a52", .35), K.mat("JarSage", "#6f8f62", .35), K.mat("JarClay", "#c79470", .35)]
LID = K.mat("JarLid", "#f1e6cc", .5)
BOXW = K.mat("BoxWhite", "#f3eee2", .55)
SAGE = K.mat("ShelfSage", "#6f9a68", .55)
SAGE_D = K.mat("ShelfSageDeep", "#5a8556", .6)

def jar_mesh(name, body, r=.055, h=.17):
    """A jar: a body and a cream lid in one mesh with two materials."""
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    a = bmesh.ops.create_cone(bm, cap_ends=True, segments=14, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=a["verts"], vec=(0, 0, h / 2))
    b = bmesh.ops.create_cone(bm, cap_ends=True, segments=14, radius1=r * .82, radius2=r * .82, depth=.03)
    bmesh.ops.translate(bm, verts=b["verts"], vec=(0, 0, h + .015))
    lid = set(b["verts"])
    for f in bm.faces:
        f.material_index = 1 if all(v in lid for v in f.verts) else 0
        f.smooth = True
    bm.to_mesh(me); bm.free()
    me.materials.append(body); me.materials.append(LID)
    return me

def box_mesh(name, w=.085, d=.07, h=.2):
    me = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=(w, d, h), verts=bm.verts); bmesh.ops.translate(bm, vec=(0, 0, h / 2), verts=bm.verts)
    bm.to_mesh(me); bm.free(); me.materials.append(BOXW)
    return me

JAR_MESHES = [jar_mesh(f"Jar{i}", m) for i, m in enumerate(JARS)]
BOX_MESH = box_mesh("Carton")
goods = bpy.data.objects.new("Goods", None); K.link(goods)

def stock(tag, x0, x1, y, z, kind):
    """A row of jars or a row of boxes on a shelf from x0 to x1, at depth y."""
    n = max(3, int((x1 - x0) / (.13 if kind == "jar" else .1)))
    step = (x1 - x0) / n
    for k in range(n):
        x = x0 + step * (k + .5)
        if kind == "jar":
            o = K.inst(f"{tag}J{k}", JAR_MESHES[rnd.randrange(3)], (x, y + rnd.uniform(-.01, .01), z), (0, 0, rnd.uniform(0, 6.3)))
        else:
            o = K.inst(f"{tag}B{k}", BOX_MESH, (x, y, z), (0, 0, rnd.uniform(-.06, .06)))
        o.parent = goods

# ---------- carcass ----------
L, D, H = 10.65, .355, 1.884
PL = .17                                   # green plinth height
K.box("Back", (L, .02, H - .06), (0, D / 2 - .01, 0), BACK, .004)
K.box("Plinth", (L + .02, D + .02, PL), (0, .01, 0), SAGE, .012)
K.box("PlinthLip", (L + .03, .03, .025), (0, -D / 2 + .005, PL - .03), SAGE, .008)
K.box("PlinthToe", (L + .03, .03, .05), (0, -D / 2 + .005, 0), SAGE_D, .01)
for sx in (-1, 1):
    K.box(f"EndPanel{sx}", (.05, D + .03, H - .07), (sx * (L / 2 + .02), .005, 0), SAGE, .01)
    K.box(f"EndTrim{sx}", (.056, .02, H - .2), (sx * (L / 2 + .02), -D / 2 - .008, .1), SAGE_D, .006)
K.box("TopCap", (L + .16, D + .07, .11), (0, -.035, H - .11), TOPCAP, .035, 4)
K.box("TopCapBand", (L + .1, D + .04, .02), (0, -.02, H - .125), SHELF, .006)

BAYS, SHELVES = 8, 3
bw = L / BAYS
for b in range(BAYS + 1):
    x = -L / 2 + b * bw
    K.box(f"Divider{b}", (.04, D - .02, H - PL - .11), (x, 0, PL), SHELF, .01)
    K.box(f"DividerFoot{b}", (.09, .06, PL + .02), (x, -D / 2 + .01, 0), SAGE, .015)   # sage feet under each post
rows = [PL] + [PL + (H - .11 - PL) * r / (SHELVES + 1) for r in range(1, SHELVES + 1)]
for r, z in enumerate(rows[1:], 1):
    K.box(f"Shelf{r}", (L, D - .03, .025), (0, -.005, z - .025), SHELF, .006)
    K.box(f"ShelfLip{r}", (L, .014, .03), (0, -D / 2 + .02, z - .028), SHELF, .004)

for z in rows:   # a brass guard rod across each shelf, a little above it, as in the sprite
    K.cyl(f"Rod{z:.2f}", .007, .007, L - .02, (-L / 2 + .01, -D / 2 + .03, z + .07), K.BRASS, 8).rotation_euler.y = math.pi / 2

# ---------- goods: jars in the outer bays, white boxes in the middle, mixed rows ----------
for b in range(BAYS):
    x0, x1 = -L / 2 + b * bw + .03, -L / 2 + (b + 1) * bw - .03
    for r, z in enumerate(rows):
        kind = "box" if (b in (3, 4) and r % 2 == 0) or (b + r) % 5 == 2 else "jar"
        stock(f"B{b}R{r}", x0, x1, .02, z, kind)

K.finish(OUT, "wall_shelving", ortho=10.5, centre=(0, 0, .9))
