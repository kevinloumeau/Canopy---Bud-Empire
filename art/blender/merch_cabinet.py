"""Canopy arched merch cabinet (shell.merchCabinet), modelled from shell.merch.cabinet.png.

A tall oak cabinet with a round-arched glazed opening, a warm-lit ribbed cream back, glass shelves of merch (totes,
caps, folded tees, gift boxes, brass grinders) and a cream plinth with a brass plate.  The glazed face looks toward
+X (map +x, the exit lane); the origin is the centre of the footprint on the floor.  The merch hangs under the empty
"Goods" and the front pane is "CabinetGlass".

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P merch_cabinet.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("MerchCabinet")
rnd = K.rnd
OAKL = K.mat("CabinetOak", "#ddb57d", .55)
FRAME = K.mat("FaceFrameOak", "#cc9f66", .55)
MOULD = K.mat("ArchMouldOak", "#b98a55", .5)
RIB = K.mat("RibbedBack", "#f1e2c0", .6, 0, .25)
PLINTH = K.mat("CreamPlinth", "#efe6d3", .45)
SHELFGLASS = K.glass("ShelfGlass", "#e3f0e8"); SHELFGLASS.node_tree.nodes["Principled BSDF"].inputs["IOR"].default_value = 1.15
FRONTGLASS = K.glass("FrontGlass", "#f4f8f6"); FRONTGLASS.node_tree.nodes["Principled BSDF"].inputs["IOR"].default_value = 1.05
LED = K.mat("LedStrip", "#ffd9a0", .5, 0, 1.6)
TEE_G = K.mat("TeeGreen", "#24573f", .8); TEE_C = K.mat("TeeCream", "#efe7d4", .8)
CAP_G = K.mat("CapGreen", "#2a6247", .7)

# ---------- dimensions (metres): footprint 0.509 deep (X) x 1.207 wide (Y) ----------
DX, DY = .509, 1.207
FX, BX = DX / 2, -DX / 2           # glazed face and back
H = 2.49                           # top of the cornice
SIDE = .07                         # carcass side thickness
OW = DY - 2 * .09                  # arched opening width
OR = OW / 2
O0, O1 = .3, 2.32                  # opening sill and crown
OSPRING = O1 - OR                  # where the arch springs

def arch_contour(w, z0, z1, n=24):
    """The arched opening as a (y, z) loop: up the left jamb, over the half-round crown, down the right jamb."""
    r = w / 2; zs = z1 - r
    pts = [(-r, z0)] + [(-r * math.cos(math.pi * i / n), zs + r * math.sin(math.pi * i / n)) for i in range(n + 1)] + [(r, z0)]
    return pts

def slab(tag, loop, x0, x1, m):
    """A flat plate whose outline is `loop` in the YZ plane, running from x0 to x1."""
    k = len(loop)
    verts = [(x0, y, z) for y, z in loop] + [(x1, y, z) for y, z in loop]
    faces = [tuple(range(k)), tuple(range(k, 2 * k))[::-1]] + [(i, k + i, k + (i + 1) % k, (i + 1) % k) for i in range(k)]
    me = bpy.data.meshes.new(tag); me.from_pydata(verts, [], faces); me.validate()
    for p in me.polygons: p.use_smooth = False
    o = K.link(bpy.data.objects.new(tag, me), m)
    return o

def cut(target, cutter):
    """Boolean the cutter out of the target and drop the cutter."""
    md = target.modifiers.new("Cut", "BOOLEAN"); md.object = cutter; md.operation = "DIFFERENCE"; md.solver = "EXACT"
    bpy.context.view_layer.objects.active = target
    for o in bpy.context.view_layer.objects: o.select_set(o == target)
    bpy.ops.object.modifier_apply(modifier="Cut")
    bpy.data.objects.remove(cutter)

# ---------- carcass: cream plinth, oak sides, back, top and cornice ----------
K.box("Plinth", (DX, DY, .1), (0, 0, 0), PLINTH, .012)
K.box("PlinthLip", (DX + .02, DY + .02, .018), (0, 0, .1), PLINTH, .006)
for sy in (-1, 1):
    K.box(f"Side{sy}", (DX - .02, SIDE, H - .2 - .118), (-.01, sy * (DY / 2 - SIDE / 2), .118), OAKL, .01)
K.box("Back", (.05, DY - .02, H - .2 - .118), (BX + .025, 0, .118), OAKL, .008)
K.box("Top", (DX, DY, .1), (0, 0, H - .2), OAKL, .012)
K.box("Cornice", (DX + .05, DY + .05, .1), (.012, 0, H - .1), OAKL, .02)
K.box("CorniceBand", (DX + .03, DY + .03, .02), (.008, 0, H - .118), K.mat("CorniceShadow", "#b98a55", .6), .006)

# the face frame: an oak plate with the arched opening cut through it, and a slim moulding round the arch
face = K.box("FaceFrame", (.045, DY, H - .2 - .118), (FX - .0225, 0, .118), FRAME, 0)
cutter = slab("ArchCutter", arch_contour(OW, O0, O1), FX - .2, FX + .1, OAKL)
cut(face, cutter)
bv = face.modifiers.new("Bevel", "BEVEL"); bv.width = .006; bv.segments = 2; bv.limit_method = "ANGLE"
mould = slab("ArchMould", [(y, z) for y, z in arch_contour(OW + .05, O0, O1 + .025)], FX, FX + .016, MOULD)
cut(mould, slab("MouldCutter", arch_contour(OW - .005, O0 - .01, O1 - .0025), FX - .1, FX + .1, OAKL))

# ---------- inside: ribbed cream back, warm LED round the arch, glass shelves ----------
IX0, IX1 = BX + .05, FX - .045    # inner depth
IY = DY / 2 - SIDE
K.box("RibBack", (.012, IY * 2, O1 - .14), (IX0 + .006, 0, .14), RIB, .003)
for i in range(int(IY * 2 / .045)):
    y = -IY + .0225 + i * .045
    K.cyl(f"Rib{i}", .015, .015, O1 - .16, (IX0 + .012, y, .15), RIB, 10)
pts = [(FX - .06, y, z) for y, z in arch_contour(OW - .03, O0 + .02, O1 - .015)]
K.tube("ArchLed", pts, .009, LED)
K.box("Floor", (IX1 - IX0, IY * 2, .04), ((IX0 + IX1) / 2, 0, O0 - .04), OAKL, .006)
K.box("BottomRail", (.03, IY * 2 + .02, .016), (FX - .01, 0, .112), K.BRASS, .005)
K.box("NamePlate", (.008, .17, .06), (FX + .004, 0, .16), K.BRASS, .004)
K.box("NamePlateInset", (.004, .14, .04), (FX + .008, 0, .17), K.mat("PlateInset", "#a87d34", .35, 1.), .002)
SHELVES = [.7, 1.1, 1.5, 1.88]
for n, z in enumerate(SHELVES):
    K.box(f"Shelf{n}", (IX1 - IX0 - .02, IY * 2 - .01, .018), ((IX0 + IX1) / 2, 0, z), SHELFGLASS, .004)
    K.box(f"ShelfGlow{n}", (.012, IY * 2 - .06, .01), (IX0 + .03, 0, z - .012), LED, .003)

# ---------- the merch ----------
goods = bpy.data.objects.new("Goods", None); K.link(goods)
def own(o):
    o.parent = goods; return o

def tees(tag, x, y, z, n, mats):
    for k in range(n):
        m = mats[k % len(mats)]
        own(K.box(f"{tag}{k}", (.24, .3, .034), (x + rnd.uniform(-.006, .006), y + rnd.uniform(-.008, .008), z + k * .036), m, .014))
        own(K.box(f"{tag}{k}Fold", (.004, .27, .007), (x + .12, y, z + k * .036 + .022), m, .002))
    return z + n * .036

def tote(tag, x, y, z, body, trim):
    own(K.box(tag, (.12, .3, .27), (x, y, z), body, .018))
    own(K.box(tag + "Band", (.124, .304, .055), (x, y, z + .025), trim, .01))
    arc = [(x + .061, y + .09 * math.cos(math.pi * i / 10), z + .26 + .12 * math.sin(math.pi * i / 10)) for i in range(11)]
    own(K.tube(tag + "Handle", arc, .011, trim))

def gift(tag, x, y, z, s=.17):
    own(K.box(tag, (s, s, s * .9), (x, y, z), K.KRAFT, .01))
    o = own(K.cyl(tag + "Seal", .02, .02, .006, (x + s / 2, y, z + s * .45), K.BRASS, 20)); o.rotation_euler.y = math.pi / 2
    own(K.box(tag + "Lid", (s + .006, s + .006, .02), (x, y, z + s * .9 - .02), K.KRAFT, .006))

def cap(tag, x, y, z, crown, brim, yaw=0.):
    me = bpy.data.meshes.new(tag)
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=24, v_segments=12, radius=.11)
    bmesh.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -1e-4], context="VERTS"); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    o = own(K.link(bpy.data.objects.new(tag, me), crown)); o.location = (x, y, z); o.scale = (1, 1.05, .82); o.rotation_euler.z = yaw
    b = own(K.cyl(tag + "Brim", .095, .09, .014, (x + .11 * math.cos(yaw), y + .11 * math.sin(yaw), z), brim, 24))
    b.scale = (1.2, .95, 1); b.rotation_euler.z = yaw
    own(K.cyl(tag + "Button", .012, .01, .012, (x, y, z + .088), crown, 12))

def grinder(tag, x, y, z, h=.12):
    own(K.cyl(tag, .045, .045, h, (x, y, z), K.BRASS, 24))
    own(K.cyl(tag + "Ring", .048, .048, .014, (x, y, z + h * .45), K.mat("BrassDeep", "#a07a30", .3, 1.), 24))
    own(K.cyl(tag + "Knob", .012, .014, .02, (x, y, z + h), K.BRASS, 12))
    s = bpy.data.meshes.new(tag + "BallM")
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=12, v_segments=8, radius=.018); bm.to_mesh(s); bm.free()
    for p in s.polygons: p.use_smooth = True
    own(K.link(bpy.data.objects.new(tag + "Ball", s), CAP_G)).location = (x, y, z + h + .036)

GX = (IX0 + IX1) / 2 + .06
# bottom: folded tees and a green tote
tees("TeeA", GX, -.28, O0, 5, [TEE_G, TEE_G, TEE_C, TEE_C])
tote("ToteA", GX - .02, .1, O0, TEE_G, TEE_C)
# shelf 1: tees and a gift box
tees("TeeB", GX, -.26, SHELVES[0] + .018, 4, [TEE_G, TEE_G, TEE_C])
gift("GiftA", GX, .24, SHELVES[0] + .018)
# shelf 2: two caps
cap("CapA", GX - .03, -.22, SHELVES[1] + .018, TEE_C, CAP_G, .5)
cap("CapB", GX - .03, .2, SHELVES[1] + .018, CAP_G, CAP_G, .3)
# shelf 3: a cream tray of brass grinders
own(K.box("Tray", (.26, .4, .035), (GX, .08, SHELVES[2] + .018), TEE_C, .008))
grinder("GrindA", GX - .02, .0, SHELVES[2] + .053)
grinder("GrindB", GX + .03, .17, SHELVES[2] + .053, .07)
gift("GiftB", GX, -.28, SHELVES[2] + .018, .14)
# top shelf: tote, gift box, tees
tote("ToteB", GX - .02, -.27, SHELVES[3] + .018, TEE_C, TEE_G)
tees("TeeC", GX, .06, SHELVES[3] + .018, 3, [TEE_C, TEE_C, TEE_G])
gift("GiftC", GX, .32, SHELVES[3] + .018, .12)

# ---------- the arched front pane ----------
glass_pane = slab("CabinetGlass", arch_contour(OW, O0, O1), FX - .03, FX - .024, FRONTGLASS)

K.finish(OUT, "merch_cabinet", ortho=2.9, centre=(0, 0, 1.25))
