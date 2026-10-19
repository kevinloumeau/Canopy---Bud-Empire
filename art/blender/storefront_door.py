"""Canopy storefront entrance: the open door frame with its near post, header, OPEN plaque, canopy and lamp.

Built to the 3D map's door section: 1.92 m long (3.25 map units at 1.69 units per metre) and 2.49 m tall.
Same frame as storefront.py: the outer face lies on Blender x = 0 facing -X (the street), the depth runs into +X,
the length runs along Blender Y with the street end of the entrance at -Y.  The far side (+Y) has no post: the
storefront's first mullion closes it.  Origin: bottom centre of the outer face.  Placed next to the facade, this
origin sits 3.805 m along -Y from the facade's origin (map z 10.425 against 3.995).

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P storefront_door.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("StorefrontDoor")
FRAME = K.mat("StorefrontGreen", "#1f6b47", .45)
LETTER = K.mat("PlaqueLetters", "#1f5e40", .5)
LAMPGLOW = K.mat("LampGlow", "#fff0c8", .3, 0, 2.)

W, H, D = 3.25 / 1.69, 4.2 / 1.69, .2
Y0, Y1 = -W / 2, W / 2
FONT = os.environ.get("CANOPY_FONT") or "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

def slab(name, x0, x1, y0, y1, z0, z1, m, bevel=.008):
    return K.box(name, (x1 - x0, y1 - y0, z1 - z0), ((x0 + x1) / 2, (y0 + y1) / 2, z0), m, bevel)

# ---------- near post with brass beads, measured off the flat render (post at 19-34% of the width) ----------
P0, P1 = Y0 + .19 * W, Y0 + .34 * W
HZ = H - .41                                   # underside of the header
slab("Post", .004, D - .004, P0, P1, 0, HZ, FRAME, .015)
slab("PostBase", -.02, D + .02, P0 - .02, P1 + .02, 0, .12, FRAME, .01)
for x0, x1 in ((-.008, 0), (D, D + .008)):
    slab(f"PostBead{x0}", x0, x1, P1 - .045, P1 - .03, .15, HZ - .05, K.BRASS, .002)

CY0, CY1, CX = P0 - .3, P1 + .15, -.65     # canopy extents
# ---------- header across the opening with the OPEN plaque on both faces ----------
slab("Header", 0, D, P0, Y1, HZ, H - .09, FRAME, .015)
slab("HeaderCap", -.04, D + .04, CY1 - .02, Y1, H - .09, H - .006, FRAME, .02)
for x0, x1 in ((-.045, -.04), (D + .04, D + .045)):
    slab(f"CapTrim{x0}", x0, x1, P0 + .14, Y1, H - .085, H - .078, K.BRASS, .002)
for x0, x1 in ((-.006, 0), (D, D + .006)):
    slab(f"HeaderTrim{x0}", x0, x1, P1, Y1, HZ + .04, HZ + .052, K.BRASS, .002)
PY = (P0 + Y1) / 2 + .2
for side, x0, x1, rz in (("Out", -.02, 0, -math.pi / 2), ("In", D, D + .02, math.pi / 2)):
    slab(f"Plaque{side}", x0, x1, PY - .28, PY + .28, HZ + .12, HZ + .29, K.BRASS, .01)
    cu = bpy.data.curves.new(f"Open{side}", "FONT"); cu.body = "OPEN"
    cu.resolution_u = 3; cu.size = .11; cu.extrude = .004; cu.align_x = "CENTER"; cu.align_y = "CENTER"
    if os.path.exists(FONT): cu.font = bpy.data.fonts.load(FONT)
    o = K.link(bpy.data.objects.new(f"Open{side}", cu), LETTER)
    o.location = (x0 - .005 if side == "Out" else x1 + .005, PY, HZ + .205); o.rotation_euler = (math.pi / 2, 0, rz)
    for dy in (-.24, .24):
        K.cyl(f"PlaqueScrew{side}{dy}", .012, .012, .008, (x0 - .004 if side == "Out" else x1 - .004, PY + dy, HZ + .205), K.BRASS, 12).rotation_euler.y = math.pi / 2

# ---------- canopy over the near post, reaching out over the pavement, with a brass lamp under it ----------
slab("Canopy", CX, D + .04, CY0, CY1, H - .12, H, FRAME, .025)
slab("CanopyEdge", CX - .006, CX, CY0 + .03, CY1 - .03, H - .1, H - .088, K.BRASS, .002)
slab("CanopyEdgeSide", CX + .02, D, CY0 - .006, CY0, H - .1, H - .088, K.BRASS, .002)
LX, LY = CX + .18, (P0 + P1) / 2
K.cyl("LampStem", .012, .012, .08, (LX, LY, H - .2), K.BRASS, 12)
K.cyl("LampShade", .09, .03, .07, (LX, LY, H - .25), K.BRASS, 32)
K.cyl("LampBulb", .055, .055, .02, (LX, LY, H - .262), LAMPGLOW, 24)

K.finish(OUT, "storefront_door", ortho=3.4, centre=(0, 0, 1.2))

def side_views(out):
    sc = bpy.context.scene
    cd = bpy.data.cameras.new("FrontCam"); cd.type = "ORTHO"; cd.ortho_scale = W * 1.5
    cam = bpy.data.objects.new("FrontCam", cd); sc.collection.objects.link(cam); sc.camera = cam
    sc.render.resolution_x = 700; sc.render.resolution_y = int(700 * H * 1.1 / (W * 1.5))
    for name, x, rz in (("storefront_door-shop", 8, math.pi / 2), ("storefront_door-street", -8, -math.pi / 2)):
        cam.location = (x, 0, H / 2); cam.rotation_euler = (math.pi / 2, 0, rz)
        sc.render.filepath = os.path.join(out, name + ".png"); bpy.ops.render.render(write_still=True)

if "--no-render" not in sys.argv:
    side_views(OUT)
