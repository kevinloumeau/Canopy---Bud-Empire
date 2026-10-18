"""Canopy pickup desk (tier 3), modelled from the current sprite.

Run inside Blender:  blender -b -P pickup_desk.py -- OUT_DIR
or open Blender, Scripting tab, paste, Run.  It builds the desk, saves
pickup_desk.blend, exports pickup_desk.glb (for Three.js) and renders
pickup_desk.png at the game's 30-degree angle with a transparent background.
"""
import bpy, math, os, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = os.path.abspath(argv[0]) if argv else os.path.dirname(bpy.data.filepath or os.getcwd())
RENDER = "--no-render" not in argv
os.makedirs(OUT, exist_ok=True)

# ---------- clean scene ----------
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
col = bpy.data.collections.new("PickupDesk"); scene.collection.children.link(col)

# ---------- materials ----------
def mat(name, hexcol, rough=.5, metal=0., emit=0.):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    h = hexcol.lstrip("#"); c = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in c]
    b.inputs["Base Color"].default_value = (*lin, 1)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metal
    if emit:
        b.inputs["Emission Color"].default_value = (*lin, 1)
        b.inputs["Emission Strength"].default_value = emit
    return m

WOOD = mat("Walnut", "#5b3a27", .55)
WOOD_D = mat("WalnutDark", "#3f281c", .6)
OAK = mat("Oak", "#c38d5a", .6)
BRASS = mat("Brass", "#d0a54e", .28, 1.0)
STONE = mat("CreamStone", "#efe6d1", .38)
GREEN = mat("CanopyGreen", "#2d6a4c", .5)
GREEN_D = mat("CanopyGreenDeep", "#1e4a37", .55)
KRAFT = mat("Kraft", "#c99460", .82)
KRAFT_D = mat("KraftFold", "#b47f4c", .85)
CREAM = mat("Cream", "#f3ead6", .6)

# ---------- helpers ----------
def obj_add(o, m=None):
    col.objects.link(o)
    if m: o.data.materials.append(m)
    return o

def box(name, size, loc, m, bevel=.012, seg=3):
    """size (x,y,z), loc = bottom-centre."""
    mesh = bpy.data.meshes.new(name)
    sx, sy, sz = (s / 2 for s in size)
    v = [(-sx,-sy,0),(sx,-sy,0),(sx,sy,0),(-sx,sy,0),(-sx,-sy,2*sz),(sx,-sy,2*sz),(sx,sy,2*sz),(-sx,sy,2*sz)]
    f = [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
    mesh.from_pydata(v, [], f)
    o = obj_add(bpy.data.objects.new(name, mesh), m)
    o.location = loc
    if bevel:
        bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = min(bevel, min(size) / 2.2); bv.segments = seg
        bv.limit_method = "ANGLE"
    o.modifiers.new("Normals", "WEIGHTED_NORMAL").keep_sharp = True
    return o

def cyl(name, r, h, loc, m, verts=32, rot=(0, 0, 0)):
    mesh = bpy.data.meshes.new(name)
    import bmesh
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2)); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = obj_add(bpy.data.objects.new(name, mesh), m); o.location = loc; o.rotation_euler = rot
    return o

def tube(name, pts, r, m):
    cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"
    cu.bevel_depth = r; cu.bevel_resolution = 6; cu.use_fill_caps = True
    sp = cu.splines.new("POLY"); sp.points.add(len(pts) - 1)
    for p, q in zip(sp.points, pts): p.co = (*q, 1)
    o = obj_add(bpy.data.objects.new(name, cu), m)
    return o

def arc_pts(c, r, a0, a1, n=12, y=0.):
    return [(c[0] + r * math.cos(a0 + (a1 - a0) * i / n), y, c[1] + r * math.sin(a0 + (a1 - a0) * i / n)) for i in range(n + 1)]

# ---------- the desk ----------
L, D = 1.3, .8            # counter body length (x) and depth (y)
X0 = -.2                    # body centre, leaves room for the side cabinet at +x
# plinth: green base with a brass kick strip
box("Plinth", (L + .1, D + .1, .1), (X0, 0, 0), GREEN_D, .015)
box("KickBrass", (L + .12, .02, .035), (X0, -(D + .1) / 2 - .005, .035), BRASS, .006)
box("KickBrassSide", (.02, D + .12, .035), (X0 - (L + .1) / 2 - .005, 0, .035), BRASS, .006)
# walnut body
box("Body", (L, D, .74), (X0, 0, .1), WOOD, .01)
# brass band under the top
box("Band", (L + .02, D + .02, .035), (X0, 0, .8), BRASS, .008)
# cream stone top
box("Top", (L + .1, D + .1, .07), (X0, 0, .835), STONE, .025, 4)
# front vent grille (green panel with slats) and a brass rail
box("VentPanel", (.32, .015, .2), (X0 - .48, -D / 2 - .006, .4), GREEN, .006)
for i in range(4):
    box(f"VentSlat{i}", (.26, .02, .018), (X0 - .48, -D / 2 - .012, .43 + i * .042), GREEN_D, .004)
box("FrontRail", (L - .1, .025, .03), (X0, -D / 2 - .012, .2), BRASS, .008)
box("LipBrass", (L + .1, .02, .03), (X0, -D / 2 - .05, .77), BRASS, .008)
# top details: green mat, round button
box("Mat", (.34, .22, .012), (X0 - .3, -.12, .905), GREEN, .004)
cyl("Button", .045, .02, (X0 + .45, -.22, .905), GREEN)
cyl("ButtonRim", .055, .008, (X0 + .45, -.22, .903), BRASS)
# back shelf on the top, holding bags
box("BackShelf", (L - .1, .26, .1), (X0 + .05, D / 2 - .16, .905), OAK, .012)

def bag(name, x, y, z, tick=True):
    w, d, h = .17, .1, .26
    box(name, (w, d, h), (x, y, z), KRAFT, .008)
    box(name + "Fold", (w + .006, d + .006, .022), (x, y, z + h - .07), KRAFT_D, .005)
    for s in (-.035, .035):    # twisted paper handles
        tube(name + f"Handle{s}", [(x + s, y, z + h - .01), (x + s, y, z + h + .07)], .007, KRAFT)
        cyl(name + f"Knot{s}", .011, .02, (x + s, y, z + h + .06), KRAFT, 12)
    if tick:
        box(name + "Label", (.085, .006, .085), (x, y - d / 2 - .002, z + .09), GREEN, .004)
        # little cream tick
        tube(name + "Tick", [(x - .025, y - d / 2 - .007, z + .135), (x - .005, y - d / 2 - .007, z + .115), (x + .028, y - d / 2 - .007, z + .158)], .006, CREAM)

bx = X0 - .42
for i in range(4):
    bag(f"Bag{i}", bx + .08 + i * .27, D / 2 - .16, 1.005, tick=i in (0, 1, 3))

# side cabinet (green) with brass plaque, three bags on top
CX, CW, CD, CH = X0 + L / 2 + .3, .5, .62, .82
box("Cabinet", (CW, CD, CH), (CX, .02, 0), GREEN, .015)
box("CabinetTop", (CW + .04, CD + .04, .04), (CX, .02, CH), GREEN_D, .012)
box("CabinetKick", (CW + .02, CD + .02, .05), (CX, .02, 0), GREEN_D, .01)
box("Plaque", (.012, .26, .1), (CX + CW / 2 + .004, .02, .42), BRASS, .006)
box("PlaqueFront", (.26, .012, .1), (CX, .02 - CD / 2 - .004, .42), BRASS, .006)
for i, (dx, dy) in enumerate([(-.12, .12), (.1, .14), (0, -.1)]):
    bag(f"CabBag{i}", CX + dx, .02 + dy, CH + .04, tick=i == 2)

# brass arch over the front edge with the PICKUP sign
AY = -D / 2 - .1
ax0, ax1 = X0 - L / 2 - .02, X0 + L / 2 + .02
H, R = 1.75, .22
pts = [(ax0, AY, .06), (ax0, AY, H - R)]
pts += arc_pts((ax0 + R, H - R), R, math.pi, math.pi / 2, 10, AY)[1:]
pts += arc_pts((ax1 - R, H - R), R, math.pi / 2, 0, 10, AY)
pts += [(ax1, AY, .06)]
tube("Arch", pts, .032, BRASS)
for x in (ax0, ax1):
    box(f"ArchFoot{x:.2f}", (.11, .11, .07), (x, AY, 0), WOOD_D, .012)
    cyl(f"ArchCollar{x:.2f}", .045, .03, (x, AY, .07), BRASS)
SX = (ax0 + ax1) / 2
box("Sign", (.98, .05, .24), (SX, AY, H - .27), GREEN, .02)
box("SignTrim", (1.0, .045, .015), (SX, AY, H - .285), BRASS, .005)
for dx in (-.32, .32):
    tube(f"SignHanger{dx}", [(SX + dx, AY, H - .03), (SX + dx, AY, H + .02)], .01, BRASS)
txt = bpy.data.curves.new("SignText", "FONT"); txt.body = "PICKUP"
txt.size = .15; txt.extrude = .006; txt.align_x = "CENTER"; txt.align_y = "CENTER"; txt.space_character = 1.08
to = obj_add(bpy.data.objects.new("SignText", txt), CREAM)
to.location = (SX, AY - .03, H - .15); to.rotation_euler = (math.pi / 2, 0, 0)
fb = os.environ.get("CANOPY_FONT")
if fb and os.path.exists(fb): txt.font = bpy.data.fonts.load(fb)

# ---------- smooth shading for bevelled boxes ----------
for o in col.objects:
    if o.type == "MESH":
        for p in o.data.polygons: p.use_smooth = True

# ---------- save + export glTF for Three.js ----------
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "pickup_desk.blend"))
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, "pickup_desk.glb"), export_format="GLB",
                          export_apply=True, export_yup=True, use_selection=False)

if not RENDER:
    sys.exit(0)

# ---------- render at the game's 30-degree angle ----------
cam_d = bpy.data.cameras.new("IsoCam"); cam_d.type = "ORTHO"; cam_d.ortho_scale = 2.75
cam = bpy.data.objects.new("IsoCam", cam_d); scene.collection.objects.link(cam)
cam.rotation_euler = (math.radians(54.7356), 0, math.radians(45))
centre = Vector((-.02, 0, .85))
cam.location = centre + Vector((7, -7, 7))   # looks along (-1, 1, -1): true isometric, 30-degree floor edges
scene.camera = cam

sun_d = bpy.data.lights.new("Sun", "SUN"); sun_d.energy = 3.2; sun_d.angle = math.radians(6)
sun_d.color = (1.0, .95, .86)
sun = bpy.data.objects.new("Sun", sun_d); scene.collection.objects.link(sun)
sun.rotation_euler = (math.radians(42), math.radians(-18), math.radians(-30))
fill_d = bpy.data.lights.new("Fill", "AREA"); fill_d.energy = 160; fill_d.size = 4; fill_d.color = (1, .97, .92)
fill = bpy.data.objects.new("Fill", fill_d); scene.collection.objects.link(fill)
fill.location = (4, -6, 4); fill.rotation_euler = (math.radians(60), 0, math.radians(35))

world = bpy.data.worlds.new("World"); scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]; bg.inputs["Color"].default_value = (.92, .9, .85, 1); bg.inputs["Strength"].default_value = .55

scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = int(os.environ.get("SAMPLES", "96"))
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = int(os.environ.get("RES", "900"))
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.render.filepath = os.path.join(OUT, "pickup_desk.png")
bpy.ops.render.render(write_still=True)
