"""Canopy grow bench (tier 3), modelled from the current sprite.

Run:  blender -b -P grow_bench.py -- OUT_DIR
or open Blender > Scripting, paste, Run.  Builds the bench with six potted
plants, saves grow_bench.blend, exports grow_bench.glb (Three.js) and renders
grow_bench.png at the game's 30-degree angle on a transparent background.
Leaves, buds and pots are shared meshes, so the glTF stays small.
"""
import bpy, bmesh, math, os, sys, random
from mathutils import Vector, Matrix, Euler

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = os.path.abspath(argv[0]) if argv else os.path.dirname(bpy.data.filepath or os.getcwd())
RENDER = "--no-render" not in argv
os.makedirs(OUT, exist_ok=True)
rnd = random.Random(42)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
col = bpy.data.collections.new("GrowBench"); scene.collection.children.link(col)

# ---------- materials ----------
def mat(name, hexcol, rough=.5, metal=0., emit=0., two_sided=False):
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
    m.use_backface_culling = not two_sided
    return m

WOOD = mat("Walnut", "#5b3a27", .55)
WOOD_D = mat("WalnutDark", "#3f281c", .6)
BRASS = mat("Brass", "#d0a54e", .28, 1.0)
STONE = mat("CreamStone", "#efe6d1", .38)
GREEN = mat("CanopyGreen", "#2d6a4c", .5)
GREEN_D = mat("CanopyGreenDeep", "#1e4a37", .55)
GLOW = mat("LightPanel", "#fff1cf", .4, 0, 2.5)
TERRA = mat("Terracotta", "#c8794a", .75)
TERRA_D = mat("TerracottaRim", "#b5683d", .75)
SOIL = mat("Soil", "#4a3426", 1.)
LEAF_A = mat("LeafDeep", "#3f7a34", .55, two_sided=True)
LEAF_B = mat("LeafFresh", "#5f9a3f", .55, two_sided=True)
STEM = mat("Stem", "#6f8f3e", .6)
BUD = mat("Bud", "#86ab4a", .75)
PISTIL = mat("Pistil", "#b8763c", .75)

# ---------- helpers ----------
def link(o, m=None):
    col.objects.link(o)
    if m and o.data and not o.data.materials: o.data.materials.append(m)
    return o

def box(name, size, loc, m, bevel=.012, seg=3):
    mesh = bpy.data.meshes.new(name)
    sx, sy, sz = (s / 2 for s in size)
    v = [(-sx,-sy,0),(sx,-sy,0),(sx,sy,0),(-sx,sy,0),(-sx,-sy,2*sz),(sx,-sy,2*sz),(sx,sy,2*sz),(-sx,sy,2*sz)]
    f = [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)]
    mesh.from_pydata(v, [], f)
    for p in mesh.polygons: p.use_smooth = True
    o = link(bpy.data.objects.new(name, mesh), m); o.location = loc
    if bevel:
        bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = min(bevel, min(size) / 2.2); bv.segments = seg
    o.modifiers.new("Normals", "WEIGHTED_NORMAL").keep_sharp = True
    return o

def cyl(name, r1, r2, h, loc, m, verts=32):
    mesh = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r1, radius2=r2, depth=h)
    bmesh.ops.translate(bm, verts=bm.verts, vec=(0, 0, h / 2)); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = link(bpy.data.objects.new(name, mesh), m); o.location = loc
    return o

def tube(name, pts, r, m, r_end=None):
    cu = bpy.data.curves.new(name, "CURVE"); cu.dimensions = "3D"
    cu.bevel_depth = r; cu.bevel_resolution = 3; cu.use_fill_caps = True
    sp = cu.splines.new("POLY"); sp.points.add(len(pts) - 1)
    for i, (p, q) in enumerate(zip(sp.points, pts)):
        p.co = (*q, 1)
        if r_end is not None: p.radius = 1 + (r_end / r - 1) * i / (len(pts) - 1)
    return link(bpy.data.objects.new(name, cu), m)

def inst(name, mesh, loc, rot=(0, 0, 0), scale=1.):
    o = bpy.data.objects.new(name, mesh); col.objects.link(o)
    o.location = loc; o.rotation_euler = rot; o.scale = (scale,) * 3
    return o

# ---------- shared plant meshes ----------
def fan_leaf_mesh(name, m, n=7, L=.21):
    """A cannabis fan leaf lying in XY, petiole tip at the origin, pointing +Y."""
    bm = bmesh.new()
    spread = math.radians(165)
    for k in range(n):
        a = -spread / 2 + spread * k / (n - 1)          # angle from the centre leaflet
        rel = 1 - .55 * (abs(a) / (spread / 2)) ** 1.4
        ln, wd, steps = L * rel, L * rel * .095, 8
        rot = Matrix.Rotation(-a, 3, "Z")
        mid, left, right = [], [], []
        for i in range(steps + 1):
            t = i / steps
            w = wd * math.sin(math.pi * min(1, t * 1.08)) ** .7
            if i % 2 and 0 < i < steps: w *= 1.22        # serrated edge
            y = ln * t
            droop = -.3 * ln * t * t                     # leaflets arch down
            fold = .12 * wd                               # midrib a little above the edges
            mid.append(bm.verts.new(rot @ Vector((0, y, droop + fold))))
            left.append(bm.verts.new(rot @ Vector((-w, y + w * .25, droop))))
            right.append(bm.verts.new(rot @ Vector((w, y + w * .25, droop))))
        for i in range(steps):
            for side in (left, right):
                try: bm.faces.new((mid[i], mid[i + 1], side[i + 1], side[i]) if side is right else (mid[i], side[i], side[i + 1], mid[i + 1]))
                except ValueError: pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    for p in me.polygons: p.use_smooth = True
    me.materials.append(m)
    return me

def _blob(bm, rr, c, rad, squash=1.2, mat_index=0, jitter=.12):
    """One calyx cluster: an 80-triangle icosphere, slightly squashed and jittered so it isn't a clean ball."""
    res = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=rad)
    for v in res["verts"]:
        v.co.z *= squash; v.co *= 1 + rr.uniform(-jitter, jitter)
    bmesh.ops.translate(bm, verts=res["verts"], vec=c)
    for f in {f for v in res["verts"] for f in v.link_faces}: f.material_index = mat_index; f.smooth = True

def _hairs(bm, rr, pts, mat_index, r=.003):
    """Pistils: each hair a thin three-sided strand of two segments (12 triangles), curling off its base point."""
    for base, out in pts:
        side = out.cross(Vector((0, 0, 1))); side = side.normalized() if side.length > .01 else Vector((1, 0, 0))
        up = out.cross(side).normalized()
        rings = []
        for k in range(3):
            c = base + out * (.007 * k) + side * (.003 * k * k); rad = r * (1 - .35 * k)
            rings.append([bm.verts.new(c + (side * math.cos(t) + up * math.sin(t)) * rad) for t in (0, 2.094, 4.189)])
        for k in range(2):
            for j in range(3):
                f = bm.faces.new((rings[k][j], rings[k][(j + 1) % 3], rings[k + 1][(j + 1) % 3], rings[k + 1][j])); f.material_index = mat_index

def bud_mesh(name, h=.2, r=.055):
    """A cola: six calyx clusters stacked on a taper (about 480 triangles) with a few orange pistil hairs.
    Base at z=0, h tall.  Low-poly so whole benches of plants stay light in the game."""
    bm = bmesh.new(); rr = random.Random(7); hairs = []
    n = 6
    for i in range(n):
        t = i / (n - 1); z = h * (.1 + .78 * t); rad = r * (1 - .62 * t) * .78
        a = i * 2.4; off = r * .22 * (1 - t)
        c = Vector((math.cos(a) * off, math.sin(a) * off, z))
        _blob(bm, rr, c, rad, 1.35)
        for k in range(1 if i < n - 1 else 2):
            b = rr.uniform(0, 6.3); out = Vector((math.cos(b), math.sin(b), .5)).normalized()
            hairs.append((c + Vector((out.x * rad * .9, out.y * rad * .9, rad * .3)), out))
    _hairs(bm, rr, hairs, 1, .0035)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    me.materials.append(BUD); me.materials.append(PISTIL)
    return me


LEAF_MESHES = [fan_leaf_mesh("FanLeafDeep", LEAF_A), fan_leaf_mesh("FanLeafFresh", LEAF_B), fan_leaf_mesh("FanLeafSmall", LEAF_B, 5, .12)]
BUD_MESH = bud_mesh("Cola")

def leaf_at(name, base, yaw, pitch, scale, mesh):
    """Place a fan leaf whose petiole points along yaw, tilted by pitch (+ up)."""
    o = bpy.data.objects.new(name, mesh); col.objects.link(o)
    o.location = base
    o.rotation_mode = "XYZ"   # pitch about X first, then yaw about Z
    o.rotation_euler = (pitch, 0, yaw - math.pi / 2)
    o.scale = (scale,) * 3
    return o

def plant(tag, x, y, z0, H):
    lean = Vector((rnd.uniform(-.03, .03), rnd.uniform(-.03, .03), 0))
    pts = [Vector((x, y, z0)) + lean * (t * t) + Vector((0, 0, H * t)) for t in (i / 8 for i in range(9))]
    tube(f"{tag}Stem", [tuple(p) for p in pts], .011, STEM, .006)
    top = pts[-1]
    inst(f"{tag}Cola", BUD_MESH, tuple(top - Vector((0, 0, .03))), (0, 0, rnd.uniform(0, 6)), 1.15)
    nodes = 8
    for k in range(nodes):
        t = .08 + .8 * k / (nodes - 1)
        p = pts[0].lerp(pts[-1], t)
        yaw0 = k * 2.4 + rnd.uniform(-.3, .3)
        s = 1.3 - .6 * k / (nodes - 1)
        for side in (0, math.pi):
            yaw = yaw0 + side
            pet = .05 + .05 * (1 - k / nodes)
            d = Vector((math.cos(yaw), math.sin(yaw), .25))
            tip = p + d * pet
            tube(f"{tag}Pet{k}{int(side)}", [tuple(p), tuple(tip)], .004, STEM)
            leaf_at(f"{tag}Leaf{k}{int(side)}", tuple(tip), yaw, rnd.uniform(-.35, .05) + .3 * k / nodes, s,
                    LEAF_MESHES[(k + int(side > 0)) % 2])
        # side branches with small colas on the middle nodes
        if 1 <= k <= 5:
            yaw = yaw0 + math.pi / 4
            d = Vector((math.cos(yaw), math.sin(yaw), 1.1)).normalized()
            end = p + d * (.1 + .035 * (5 - k))
            leaf_at(f"{tag}BranchLeaf{k}", tuple(p.lerp(end, .5)), yaw + 1.2, -.1, .85, LEAF_MESHES[k % 2])
            tube(f"{tag}Branch{k}", [tuple(p), tuple(end)], .007, STEM, .004)
            inst(f"{tag}SideCola{k}", BUD_MESH, tuple(end - Vector((0, 0, .02))), (0, 0, rnd.uniform(0, 6)), .62)
            for j in range(3):
                leaf_at(f"{tag}Sugar{k}{j}", tuple(end), yaw + j * 2.1, .9, .38, LEAF_MESHES[2])
    for j in range(4):   # sugar leaves around the main cola
        leaf_at(f"{tag}TopSugar{j}", tuple(top - Vector((0, 0, .02))), j * 1.57 + .4, .95, .45, LEAF_MESHES[2])

def ring(name, r_out, r_in, h, loc, m, verts=32):
    """A hollow ring (pot lip): outer and inner walls with a flat top, open in the middle."""
    mesh = bpy.data.meshes.new(name); bm = bmesh.new()
    rows = []
    for (r, z) in ((r_out, 0), (r_out, h), (r_in, h), (r_in, 0)):
        rows.append([bm.verts.new((r * math.cos(2 * math.pi * i / verts), r * math.sin(2 * math.pi * i / verts), z)) for i in range(verts)])
    for a, b in zip(rows, rows[1:] + rows[:1]):
        for i in range(verts):
            j = (i + 1) % verts
            bm.faces.new((a[i], a[j], b[j], b[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = link(bpy.data.objects.new(name, mesh), m); o.location = loc
    return o

def pot(tag, x, y, z):
    cyl(f"{tag}Pot", .12, .16, .2, (x, y, z), TERRA, 40)
    ring(f"{tag}Rim", .172, .148, .04, (x, y, z + .19), TERRA_D, 40)   # open lip so the soil shows
    cyl(f"{tag}Soil", .15, .15, .02, (x, y, z + .2), SOIL, 32)

# ---------- the bench ----------
L, D, H = 1.9, .78, .78
box("Plinth", (L + .08, D + .08, .08), (0, 0, 0), WOOD_D, .015)
box("Body", (L, D, H - .08), (0, 0, .08), WOOD, .01)
# three drawers on the front, one panel on the end, brass frames and pulls
DW = (L - .16) / 3
for i in range(3):
    cx = -L / 2 + .08 + DW * (i + .5)
    box(f"Drawer{i}", (DW - .05, .02, .5), (cx, -D / 2 - .008, .17), WOOD, .008)
    for dz in (.17, .67):
        box(f"DrawerRailH{i}{dz}", (DW - .03, .025, .022), (cx, -D / 2 - .016, dz - .011), BRASS, .006)
    for dx in (-(DW - .05) / 2, (DW - .05) / 2):
        box(f"DrawerRailV{i}{dx:.2f}", (.022, .025, .5), (cx + dx, -D / 2 - .016, .17), BRASS, .006)
    box(f"Pull{i}", (.16, .03, .03), (cx, -D / 2 - .03, .45), BRASS, .01)
box("EndPanel", (.02, D - .14, .5), (L / 2 + .008, 0, .17), WOOD, .008)
for dz in (.17, .67): box(f"EndRail{dz}", (.025, D - .12, .022), (L / 2 + .016, 0, dz - .011), BRASS, .006)
for dy in (-(D - .14) / 2, (D - .14) / 2): box(f"EndRailV{dy:.2f}", (.025, .022, .5), (L / 2 + .016, dy, .17), BRASS, .006)
# brass corner columns with capitals
for sx in (-1, 1):
    for sy in (-1, 1):
        cyl(f"Column{sx}{sy}", .032, .032, H - .14, (sx * L / 2, sy * D / 2, .1), BRASS, 24)
        cyl(f"Capital{sx}{sy}", .045, .045, .03, (sx * L / 2, sy * D / 2, H - .05), BRASS, 24)
        cyl(f"Foot{sx}{sy}", .045, .045, .03, (sx * L / 2, sy * D / 2, .08), BRASS, 24)
box("TopBand", (L + .1, D + .1, .04), (0, 0, H), BRASS, .01)
box("Top", (L + .12, D + .12, .06), (0, 0, H + .035), STONE, .028, 4)
TOP = H + .095

# light bar on brass posts at the back
PH = 1.95
for sx in (-1, 1):
    px = sx * (L / 2 - .02)
    box(f"PostBase{sx}", (.1, .1, .07), (px, D / 2 - .04, TOP), GREEN_D, .015)
    box(f"Post{sx}", (.055, .055, PH - TOP - .05), (px, D / 2 - .04, TOP + .05), BRASS, .012)
    box(f"PostCap{sx}", (.09, .12, .09), (px, D / 2 - .06, PH - .06), BRASS, .02)
box("LightBar", (L + .06, .26, .1), (0, D / 2 - .13, PH), GREEN, .025)
box("LightBarTrim", (L + .08, .27, .02), (0, D / 2 - .13, PH - .005), BRASS, .006)
box("LightPanel", (L - .12, .18, .012), (0, D / 2 - .14, PH - .012), GLOW, .004)

# six potted plants, staggered like the sprite
SPOTS = [(-.66, .1), (-.02, .12), (.6, .1), (-.4, -.25), (.26, -.24), (.8, -.27)]
for i, (x, y) in enumerate(SPOTS):
    pot(f"P{i}", x, y, TOP)
    plant(f"P{i}", x, y, TOP + .2, rnd.uniform(.44, .54))

# ---------- save + export ----------
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "grow_bench.blend"))
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, "grow_bench.glb"), export_format="GLB",
                          export_apply=True, export_yup=True)
if not RENDER:
    sys.exit(0)

# ---------- render at the game's 30-degree angle ----------
cam_d = bpy.data.cameras.new("IsoCam"); cam_d.type = "ORTHO"; cam_d.ortho_scale = 2.9
cam = bpy.data.objects.new("IsoCam", cam_d); scene.collection.objects.link(cam)
cam.rotation_euler = (math.radians(54.7356), 0, math.radians(45))
cam.location = Vector((0, 0, 1.0)) + Vector((7, -7, 7))   # looks along (-1, 1, -1): 30-degree floor edges
scene.camera = cam
sun_d = bpy.data.lights.new("Sun", "SUN"); sun_d.energy = 3.2; sun_d.angle = math.radians(6); sun_d.color = (1, .95, .86)
sun = bpy.data.objects.new("Sun", sun_d); scene.collection.objects.link(sun)
sun.rotation_euler = (math.radians(42), math.radians(-18), math.radians(-30))
fill_d = bpy.data.lights.new("Fill", "AREA"); fill_d.energy = 160; fill_d.size = 4; fill_d.color = (1, .97, .92)
fill = bpy.data.objects.new("Fill", fill_d); scene.collection.objects.link(fill)
fill.location = (4, -6, 4); fill.rotation_euler = (math.radians(60), 0, math.radians(35))
grow_d = bpy.data.lights.new("GrowLight", "AREA"); grow_d.energy = 25; grow_d.shape = "RECTANGLE"
grow_d.size = L - .1; grow_d.size_y = .15; grow_d.color = (1, .9, .7)
grow = bpy.data.objects.new("GrowLight", grow_d); scene.collection.objects.link(grow)
grow.location = (0, D / 2 - .14, PH - .03)
world = bpy.data.worlds.new("World"); scene.world = world; world.use_nodes = True
bg = world.node_tree.nodes["Background"]; bg.inputs["Color"].default_value = (.92, .9, .85, 1); bg.inputs["Strength"].default_value = .55
scene.render.engine = "CYCLES"; scene.cycles.device = "CPU"
scene.cycles.samples = int(os.environ.get("SAMPLES", "96")); scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = int(os.environ.get("RES", "900"))
scene.view_settings.view_transform = "AgX"; scene.view_settings.look = "AgX - Medium High Contrast"
scene.render.filepath = os.path.join(OUT, "grow_bench.png")
bpy.ops.render.render(write_still=True)
