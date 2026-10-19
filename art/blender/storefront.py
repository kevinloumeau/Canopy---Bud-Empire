"""Canopy storefront facade: four glazed bays under the FLOWER · PRE-ROLLS · EDIBLES · HOUSE GROWN sign band.

Built to the 3D map's entrance wall: 5.85 m long (9.9 map units at 1.69 units per metre) and 2.48 m tall.
The outer face lies on Blender x = 0 facing -X (the street); the wall's depth runs into +X (the shop). The length
runs along Blender Y, with the entrance end at -Y.  Origin: bottom centre of the outer face.
The sign is lettered on both faces: the street side reads right to left along Y as seen from the street, and the
shop side reads FLOWER at the entrance end, the way the 2D map's flat render is laid on the wall.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P storefront.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
from mathutils import Vector
import canopy_kit as K

OUT = K.begin("Storefront")
FRAME = K.mat("StorefrontGreen", "#1f6b47", .45)
FRAME_D = K.mat("StorefrontGreenDeep", "#185a3b", .5)
SIGN = K.mat("SignCream", "#f1e7cc", .5)
LETTER = K.mat("SignLetters", "#1f5e40", .5)

L, H, D = 9.9 / 1.69, 4.19 / 1.69, .2       # length (y), height (z), depth into the shop (+x)
Y0, Y1 = -L / 2, L / 2
WORDS = ["FLOWER", "PRE-ROLLS", "EDIBLES", "HOUSE GROWN"]
FONT = os.environ.get("CANOPY_FONT") or os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts", "Bricolage-ExtraBold.ttf")

def slab(name, x0, x1, y0, y1, z0, z1, m, bevel=.008):
    """A box by its extents (x outward-to-inward, y along the wall, z up)."""
    return K.box(name, (x1 - x0, y1 - y0, z1 - z0), ((x0 + x1) / 2, (y0 + y1) / 2, z0), m, bevel)

def text(name, body, loc, size, outside):
    cu = bpy.data.curves.new(name, "FONT"); cu.body = body
    cu.size = size; cu.extrude = .006; cu.align_x = "CENTER"; cu.align_y = "CENTER"; cu.resolution_u = 3
    if os.path.exists(FONT): cu.font = bpy.data.fonts.load(FONT)
    o = K.link(bpy.data.objects.new(name, cu), LETTER); o.location = loc
    o.rotation_euler = (math.pi / 2, 0, -math.pi / 2 if outside else math.pi / 2)
    return o

z = lambda f: H * f   # heights as fractions of the facade, measured off the flat render

# ---------- plinth, kick panels and sill ----------
slab("Plinth", -.03, D, Y0, Y1, 0, z(.045), FRAME_D, .01)
slab("KickWall", 0, D, Y0, Y1, z(.045), z(.14), FRAME)
slab("Sill", -.035, D + .02, Y0, Y1, z(.14), z(.175), FRAME, .01)
slab("SillTrim", -.04, -.03, Y0 + .05, Y1 - .02, z(.172), z(.178), K.BRASS, .002)

# ---------- bays: entrance pilaster at -y, four bays split by mullions ----------
PIL = .042 * L; POST = .04 * L
B0, B1 = Y0 + PIL, Y1 - .5 * POST
BW = (B1 - B0) / 4
slab("EntrancePilaster", -.03, D - .006, Y0, B0, z(.045), z(.93), FRAME, .012)
slab("PilasterTrim", -.036, -.03, B0 - .03, B0 - .022, z(.18), z(.74), K.BRASS, .002)
edges = [B0 + BW * i for i in range(5)]
for i, y in enumerate(edges):
    slab(f"Mullion{i}", -.02, D, y - POST / 2, y + POST / 2, z(.175), z(.745), FRAME, .01)
for i in range(4):
    a, b = edges[i] + POST / 2, edges[i + 1] - POST / 2
    g = slab(f"Glass{i}", .07, .082, a, b, z(.175), z(.745), K.GLASS, .002)
    for yy in (a + .004, b - .004):   # brass beads up the inside of each opening
        slab(f"Bead{i}{yy:.2f}", -.018, .07, yy - .006, yy + .006, z(.18), z(.74), K.BRASS, .002)
        slab(f"BeadIn{i}{yy:.2f}", .082, D + .018, yy - .006, yy + .006, z(.18), z(.74), K.BRASS, .002)
    slab(f"BeadLow{i}", -.018, .07, a, b, z(.175), z(.183), K.BRASS, .002)
    slab(f"BeadLowIn{i}", .082, D + .018, a, b, z(.175), z(.183), K.BRASS, .002)
    # kick panel under each bay, on both faces
    for side, (k0, k1, i0, i1) in (("Out", (-.012, 0, -.016, -.012)), ("In", (D, D + .012, D + .012, D + .016))):
        slab(f"Kick{side}{i}", k0, k1, a + .02, b - .02, z(.06), z(.128), FRAME, .006)
        slab(f"KickInset{side}{i}", i0, i1, a + .07, b - .07, z(.075), z(.113), FRAME_D, .004)
for y in edges:
    slab(f"KickPost{y:.2f}", -.016, D + .016, y - POST / 2, y + POST / 2, z(.045), z(.14), FRAME, .006)

# ---------- header, sign band and cap ----------
slab("Header", -.025, D + .025, Y0 + PIL * .6, Y1, z(.745), z(.775), FRAME, .008)
slab("SignBand", 0, D, Y0, Y1, z(.775), z(.93), FRAME)
for side, x0, x1 in (("Out", -.02, 0), ("In", D, D + .02)):
    slab(f"SignRailLow{side}", x0 - (.004 if side == "Out" else 0), x1 + (.004 if side == "In" else 0), Y0, Y1, z(.775), z(.785), K.BRASS, .003)
    slab(f"SignRailTop{side}", x0 - (.004 if side == "Out" else 0), x1 + (.004 if side == "In" else 0), Y0, Y1, z(.925), z(.935), K.BRASS, .003)
    for i in range(4):
        a, b = edges[i] + .012, edges[i + 1] - .012
        slab(f"SignPanel{side}{i}", x0, x1, a, b, z(.79), z(.92), SIGN, .004)
        slab(f"SignFrame{side}{i}", x0 + (.004 if side == "Out" else -.004), x1 + (.004 if side == "Out" else -.004), a - .008, b + .008, z(.787), z(.923), K.BRASS, .002)
        # shop side reads FLOWER at the entrance end (-y); street side reads left to right from +y
        word = WORDS[i] if side == "In" else WORDS[3 - i]
        text(f"Word{side}{i}", word, (x0 - .006 if side == "Out" else x1 + .006, (a + b) / 2, z(.855)), z(.09), side == "Out")
slab("Cap", -.07, D + .04, Y0 - .02, Y1 + .02, z(.93), z(1.0), FRAME, .03)
slab("CapTrim", -.076, -.07, Y0, Y1, z(.94), z(.947), K.BRASS, .002)

# ---------- extra view: straight at the street face, for comparing with the flat render ----------
def front_view(out):
    sc = bpy.context.scene
    cd = bpy.data.cameras.new("FrontCam"); cd.type = "ORTHO"; cd.ortho_scale = L * 1.04
    cam = bpy.data.objects.new("FrontCam", cd); sc.collection.objects.link(cam)
    cam.location = (-8, 0, H / 2); cam.rotation_euler = (math.pi / 2, 0, -math.pi / 2)
    sc.camera = cam; sc.render.resolution_x = 1300; sc.render.resolution_y = int(1300 * H * 1.12 / (L * 1.04))
    sc.render.filepath = os.path.join(out, "storefront-street.png"); bpy.ops.render.render(write_still=True)
    cam.location = (8, 0, H / 2); cam.rotation_euler = (math.pi / 2, 0, math.pi / 2)
    sc.render.filepath = os.path.join(out, "storefront-shop.png"); bpy.ops.render.render(write_still=True)

K.finish(OUT, "storefront", ortho=6.5, centre=(0, 0, 1.2))
if "--no-render" not in sys.argv:
    front_view(OUT)
