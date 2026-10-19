"""Canopy street car: the little rounded two-door with the cream roof, one model for every colour.

The nose points toward +X.  The body paint is the material "CarPaint" so the game can recolour it; the four
wheels are separate objects WheelFL / WheelFR / WheelBL / WheelBR with their origins at the hubs and their axles
along Y, so the game can spin them about local Z (Blender) as the car drives.  Sized to the game: 2.5 m long,
1.12 m wide (4.2 x 1.9 map units).  Origin at the footprint centre on the floor.

Writes car.blend / car.glb / car.png (blue) plus car_<colour>.glb for each street colour.
Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P car.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Matrix
import canopy_kit as K

COLOURS = {"blue": "#5da7ce", "green": "#7f9e78", "orange": "#f08a3c", "purple": "#b49ae0",
           "red": "#d63228", "white": "#ebe2d5", "yellow": "#e4b22a"}
SHOW = "blue"

OUT = K.begin("Car")
PAINT = K.mat("CarPaint", COLOURS[SHOW], .38)
ROOF = K.mat("CarRoof", "#efe3c8", .5)
CHROME = K.mat("CarChrome", "#d9d9d4", .18, 1.0)
GLASSD = K.mat("CarGlass", "#3a434b", .08)
RUBBER = K.mat("Tyre", "#2c2a29", .8)
HUB = K.mat("HubCap", "#d8d3c8", .35, .4)
LAMP = K.mat("HeadLamp", "#fff4d6", .2, 0, .8)
TAIL = K.mat("TailLamp", "#e8742c", .35, 0, .3)
SEAM = K.mat("Seam", "#3a2b26", .6)
WELL = K.mat("WheelWell", "#1e1c1b", .9)

def hull(name, bottom, top, z0, z1, m, bevel=.03):
    """A tapered block: bottom rect (x0, x1, half-width) at z0, top rect at z1."""
    (bx0, bx1, bw), (tx0, tx1, tw) = bottom, top
    v = [(bx0, -bw, z0), (bx1, -bw, z0), (bx1, bw, z0), (bx0, bw, z0), (tx0, -tw, z1), (tx1, -tw, z1), (tx1, tw, z1), (tx0, tw, z1)]
    f = [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    me = bpy.data.meshes.new(name); me.from_pydata(v, [], f)
    o = K.link(bpy.data.objects.new(name, me), m)
    bv = o.modifiers.new("Bevel", "BEVEL"); bv.width = bevel; bv.segments = 3
    for p in me.polygons: p.use_smooth = True
    o.modifiers.new("Normals", "WEIGHTED_NORMAL").keep_sharp = True
    return o

def wheel(name, x, y, z, r=.25, w=.17):
    """A tyre with a cream hub cap; the object's origin is the hub, its axle along Y."""
    side = 1 if y > 0 else -1
    t = K.cyl(name, r, r, w, (0, 0, 0), RUBBER, 40)
    t.data.transform(Matrix.Translation((0, 0, -w / 2)))        # centre the tyre on its origin
    t.location = (x, y, z); t.rotation_euler.x = -side * math.pi / 2   # local +Z points out of the car
    bv = t.modifiers.new("Bevel", "BEVEL"); bv.width = .04; bv.segments = 3
    for nm, rr, d, m in (("Cap", r * .62, .02, HUB), ("Boss", r * .2, .035, CHROME)):
        c = K.cyl(f"{name}{nm}", rr, rr * .92, d, (0, 0, w / 2 - .01), m, 32)
        c.parent = t
    for i in range(4):                                           # lug nuts so a spinning wheel reads as spinning
        a = i * math.pi / 2
        n = K.cyl(f"{name}Lug{i}", .014, .014, .03, (math.cos(a) * r * .38, math.sin(a) * r * .38, w / 2 + .005), CHROME, 10)
        n.parent = t
    return t

# ---------- body ----------
L, W = 2.5, 1.12
HW = W / 2 - .02
K.box("BodyRear", (1.72, 2 * HW, .7), (-.38, 0, .17), PAINT, .3, 6)
K.box("BodyNose", (1.05, 2 * HW - .03, .64), (.7, 0, .17), PAINT, .28, 6)

# greenhouse: dark glass with paint pillars, cream roof on top
hull("Glasshouse", (-.98, .42, HW - .06), (-.84, .06, HW - .13), .84, 1.38, GLASSD, .04)
corners_b = [(-.98, -(HW - .06)), (.42, -(HW - .06)), (.42, HW - .06), (-.98, HW - .06)]
corners_t = [(-.84, -(HW - .13)), (.06, -(HW - .13)), (.06, HW - .13), (-.84, HW - .13)]
for i, ((bx, by), (tx, ty)) in enumerate(zip(corners_b, corners_t)):
    K.tube(f"Pillar{i}", [(bx, by * 1.01, .85), (tx, ty * 1.01, 1.38)], .04, PAINT)
for s in (-1, 1):
    K.tube(f"BPillar{s}", [(-.24, s * (HW - .06) * 1.01, .85), (-.36, s * (HW - .13) * 1.01, 1.38)], .036, PAINT)
K.box("Roof", (1.1, 2 * (HW - .06), .16), (-.39, 0, 1.33), ROOF, .075, 5)
K.tube("Wiper", [(.46, -.25, .86), (.3, .02, .96)], .007, SEAM)

# ---------- doors, handles, mirrors ----------
for s in (-1, 1):
    y = s * (HW + .002)
    K.box(f"Handle{s}", (.09, .02, .02), (-.14, y + s * .006, .68), CHROME, .006)
    K.box(f"Mirror{s}", (.06, .08, .06), (.36, s * (HW + .05), .86), CHROME, .025)
    K.tube(f"MirrorStalk{s}", [(.38, s * (HW - .02), .82), (.36, s * (HW + .03), .87)], .01, CHROME)

# ---------- lamps, bumpers, badge ----------
for s in (-1, 1):
    o = K.cyl(f"HeadRing{s}", .09, .09, .03, (1.19, s * .33, .5), CHROME, 32); o.rotation_euler.y = math.pi / 2
    o = K.cyl(f"Head{s}", .075, .07, .035, (1.21, s * .33, .5), LAMP, 32); o.rotation_euler.y = math.pi / 2
    o = K.cyl(f"Indicator{s}", .03, .03, .02, (1.2, s * .43, .34), TAIL, 16); o.rotation_euler.y = math.pi / 2
    K.box(f"Tail{s}", (.03, .08, .12), (-1.21, s * .4, .45), TAIL, .015)
o = K.cyl("Badge", .035, .035, .02, (1.235, 0, .42), CHROME, 24); o.rotation_euler.y = math.pi / 2
for x, nm in ((1.25, "Front"), (-1.26, "Rear")):
    K.box(f"Bumper{nm}", (.07, 2 * HW - .12, .08), (x, 0, .19), CHROME, .03)
    for s in (-1, 1):
        K.box(f"Bumper{nm}Wrap{s}", (.16, .06, .08), (x - (.07 if x > 0 else -.07), s * (HW - .07), .19), CHROME, .03)
K.box("Plate", (.02, .26, .07), (-1.3, 0, .32), K.CREAM, .006)

# ---------- wheels: hub origins, axles along Y ----------
R, WX, WY = .23, .82, HW - .07
for nm, x, y in (("WheelFL", WX, WY), ("WheelFR", WX, -WY), ("WheelBL", -WX, WY), ("WheelBR", -WX, -WY)):
    wheel(nm, x, y, R)
for nm, x in (("Front", WX), ("Rear", -WX)):                 # dark wheel wells behind the tyres
    K.box(f"Well{nm}", (.52, 2 * HW + .01, .2), (x, 0, .17), WELL, .06)

K.finish(OUT, "car", ortho=3.1, centre=(0, 0, .65))

# one glb per street colour: only the paint changes
b = PAINT.node_tree.nodes["Principled BSDF"]
for cname, hexcol in COLOURS.items():
    h = hexcol.lstrip("#"); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    b.inputs["Base Color"].default_value = (*[x / 12.92 if x <= .04045 else ((x + .055) / 1.055) ** 2.4 for x in c], 1)
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, f"car_{cname}.glb"), export_format="GLB", export_apply=True, export_yup=True,
                              use_selection=False)
