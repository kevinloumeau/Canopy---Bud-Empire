"""Canopy rooftop before the lounge is bought (rooftop.js "Before opening"): the building-site props on the bare slab.
A pallet stacked with strapped lumber, a stack of crates under a sage tarp tied down with rope, and a loose pallet with
two cement sacks.  They replace the three plain boxes in code.

All three in one model, laid out where rooftop.js puts them, so the origin is map (0, ROOFTOP.y, 0): map x -> Blender
+X, map z -> Blender -Y, horizontal map units / 1.69, world heights x 0.7247.  Nothing is driven by code.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_site.py -- OUT_DIR
"""
import os, sys, math, random
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy, bmesh
from mathutils import Vector, noise
import canopy_kit as K

OUT = K.begin("RooftopSite")
H, V = 1 / 1.69, .7247
rnd = random.Random(5)
PALLET = K.mat("PalletWood", "#9a7a52", .8); PALLET_D = K.mat("PalletWoodDark", "#7e6141", .85)
LUMBER = K.mat("Lumber", "#d4b583", .75); LUMBER_END = K.mat("LumberEnd", "#e3c99a", .8)
STRAP = K.mat("Strap", "#2f3a46", .5)
TARP = K.mat("Tarp", "#8e9a86", .9); ROPE = K.mat("Rope", "#c9b48a", .9)
SACK = K.mat("Sack", "#d9d0bd", .95); SACK_PRINT = K.mat("SackPrint", "#7a8a6e", .9)

def pallet(tag, cx, cy, w, d, h):
    """A pallet w (X) x d (Y) x h tall at (cx, cy) on the deck: three runners, top and bottom boards. Returns its top."""
    b = h * .22
    for k in range(3):
        K.box(f"{tag}Runner{k}", (w, .07, h - 2 * b), (cx, cy - d / 2 + .035 + k * (d - .07) / 2, b), PALLET_D, .004, 1)
    for k in range(3):
        K.box(f"{tag}Base{k}", (.08, d, b), (cx - w / 2 + .04 + k * (w - .08) / 2, cy, 0), PALLET, .003, 1)
    n = max(4, int(w / .13))
    for k in range(n):
        K.box(f"{tag}Deck{k}", (w / n * .78, d, b), (cx - w / 2 + (k + .5) * w / n, cy, h - b), PALLET, .003, 1)
    return h

# ---------- A: pallet of strapped lumber, map (-2.2, -4.6), 1.6 x 1.1 ----------
ax, ay = -2.2 * H, 4.6 * H
top = pallet("LumberPallet", ax, ay, 1.6 * H, 1.1 * H, .18 * V)
L, rows, layers = 1.5 * H, 6, 4
pw, ph = 1.0 * H / rows, .5 * V / layers
for lay in range(layers):
    z = top + lay * ph
    for r in range(rows):
        if lay == layers - 1 and r in (0, 5): continue          # the top layer is a little short at the sides
        y = ay - 1.0 * H / 2 + (r + .5) * pw
        ln = L * rnd.uniform(.94, 1.)
        K.box(f"Plank{lay}{r}", (ln, pw * .94, ph * .9), (ax + rnd.uniform(-.02, .02), y, z), LUMBER, .004, 1)
for sx in (-.32, .32):                                          # two blue-black straps round the stack
    K.box(f"Strap{sx:+.0f}", (.02, 1.0 * H + .01, .5 * V - ph * .1 + .008), (ax + sx * L, ay, top - .002), STRAP, 0, 1)
    K.box(f"StrapTop{sx:+.0f}", (.02, 1.0 * H * .7, .006), (ax + sx * L, ay, top + (layers) * ph - ph * .1 + .001), STRAP, 0, 1)

# ---------- B: crates under a tied-down tarp, map (1.8, -5.4), 1.2 x 1.2 x .9 ----------
bx, by, bw, bh = 1.8 * H, 5.4 * H, 1.2 * H, .9 * V
me = bpy.data.meshes.new("TarpMesh"); bm = bmesh.new()
bmesh.ops.create_cube(bm, size=1.)
bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=3, use_grid_fill=True)
for v in bm.verts:
    x, y, z = v.co.x * bw, v.co.y * bw, (v.co.z + .5) * bh
    side = max(abs(v.co.x), abs(v.co.y))
    if v.co.z > .49:                                            # the top sags between the crate corners
        z -= .035 * (1 - (2 * abs(v.co.x)) ** 2) * (1 - (2 * abs(v.co.y)) ** 2)
    if v.co.z < -.49 and side > .49:                            # the skirt flares out on the deck
        x *= 1.06; y *= 1.06
    n = noise.noise(Vector((x * 9, y * 9, z * 9)))
    v.co = Vector((x + n * .012, y + n * .012, z + n * .01 * (z > .02)))
bm.to_mesh(me); bm.free(); me.materials.append(TARP)
for p in me.polygons: p.use_smooth = False
K.link(bpy.data.objects.new("Tarp", me)).location = (bx, by, 0)
for k, t in enumerate((-.22, .22)):                             # two ropes over the top and down the sides
    K.box(f"RopeX{k}", (bw + .024, .014, .012), (bx, by + t * bw, bh - .03), ROPE, 0, 1)
    K.box(f"RopeY{k}", (.014, bw + .024, .012), (bx + t * bw, by, bh - .03), ROPE, 0, 1)
    for s in (-1, 1):
        K.box(f"RopeXS{k}{s}", (.012, .014, bh - .03), (bx + s * (bw / 2 + .006), by + t * bw, 0), ROPE, 0, 1)
        K.box(f"RopeYS{k}{s}", (.014, .012, bh - .03), (bx + t * bw, by + s * (bw / 2 + .006), 0), ROPE, 0, 1)
# A corner of the tarp turned back shows a crate under it.
K.box("CrateCorner", (.16, .16, .16), (bx + bw / 2 - .07, by - bw / 2 + .07, 0), PALLET, .004, 1)

# ---------- C: a loose pallet with two cement sacks, map (3.6, -2.8), .9 x 1.4 ----------
cx, cy = 3.6 * H, 2.8 * H
top = pallet("LoosePallet", cx, cy, .9 * H, 1.4 * H, .14 * V)
sk = bpy.data.meshes.new("SackMesh"); bm = bmesh.new()
bmesh.ops.create_cube(bm, size=1.)
bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=1, use_grid_fill=True)
for v in bm.verts:                                              # a pillow: corners pinched, middle plump
    v.co.z *= (1 - .55 * (abs(v.co.x) > .4) * (abs(v.co.y) > .4))
    v.co = Vector((v.co.x * .3, v.co.y * .46, (v.co.z + .5) * .085))
bm.to_mesh(sk); bm.free(); sk.materials.append(SACK)
for p in sk.polygons: p.use_smooth = True
for k, (dy, z, yaw) in enumerate(((-.12, top, .05), (.13, top, -.08), (0, top + .075, .5))):
    o = K.link(bpy.data.objects.new(f"Sack{k}", sk)); o.location = (cx + rnd.uniform(-.02, .02), cy + dy, z); o.rotation_euler = (0, 0, yaw)
    K.box(f"SackBand{k}", (.2, .006, .002), (cx, cy + dy, z + .087), SACK_PRINT, 0, 1).rotation_euler = (0, 0, yaw)

K.finish(OUT, "rooftop_site", ortho=3.6, centre=(.4, 2.5, .25))
