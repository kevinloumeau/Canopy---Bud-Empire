"""Canopy rooftop lounge: the Dab bar (lounge tier 2), laid out like rooftop.js on main.

A green-tiled bar with a cream top and brass foot rail, three velvet stools, a dark oak back bar whose two shelves
hold glass bongs and dab rigs, apothecary bud jars and a brass torch, two dab rigs on cream mats, a bud jar and a
brass ashtray on the counter, and three pendant globes (BarLamp0..2, material "BarLamp", glow driven by code) on a dark rail.
The origin is the centre of the bar counter's footprint on the deck; the customer side faces Blender -Y (map +z).
The back bar stands behind it, toward Blender +Y.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_bar.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
import canopy_kit as K

M, V = 1 / 1.69, 0.7247             # map units to metres across, world height to metres up
OUT = K.begin("RooftopBar")
TILE = K.mat("BarTile", "#25523b", .45)
GROUT = K.mat("BarGrout", "#cfdcc4", .7)
TOP = K.mat("BarTop", "#ece4d2", .35)
OAKD = K.mat("DarkOak", "#6e4a2c", .55)
OAK = K.mat("BarOak", "#b98d5c", .55)
VELVET = K.mat("Velvet", "#6b2436", .8)
RAIL = K.mat("LampRail", "#343f33", .5, .3)
LAMP = K.mat("BarLamp", "#f3d9a6", .35, 0, 1.2)
def tinted(name, hexcol, alpha):
    m = K.mat(name, hexcol, .08); b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Alpha"].default_value = alpha; b.inputs["Coat Weight"].default_value = 1.
    m.surface_render_method = "BLENDED"; return m
CLEAR = tinted("GlassClear", "#e4efe8", .35)
GLASSES = [CLEAR, tinted("GlassGreen", "#5f9a6a", .55), tinted("GlassAmber", "#c88a3a", .55)]
ACCENT = [K.mat("AccentGreen", "#3f8f55", .3), K.mat("AccentAmber", "#d08a2a", .3)]
MAT_CREAM = K.mat("DabMat", "#efe4cf", .8)
BUDS = K.mat("JarBuds", "#7f9a44", .8)
rnd = K.rnd

def my(dz):                          # a map z offset from the counter centre to Blender y
    return -dz * M

def bong(tag, x, y, z, glass, accent, h):
    """A beaker bong: flared base, straight tube, mouth lip, angled downstem and a brass bowl. Returns its width."""
    r = h * .2
    K.cyl(tag + "Base", r, r * .38, h * .38, (x, y, z), glass, 24)
    K.cyl(tag + "Tube", r * .38, r * .38, h * .55, (x, y, z + h * .38), glass, 20)
    K.cyl(tag + "Lip", r * .45, r * .42, h * .07, (x, y, z + h * .93), accent, 20)
    K.cyl(tag + "Ring", r * .44, r * .44, .008, (x, y, z + h * .5), accent, 20)
    K.tube(tag + "Stem", [(x + r * .35, y - r * .3, z + h * .2), (x + r * .9, y - r * .75, z + h * .38)], .006, glass)
    K.cyl(tag + "Bowl", .012, .007, .016, (x + r * .9, y - r * .75, z + h * .38), K.BRASS, 12)
    return 2 * r + .035

def rig(tag, x, y, z, glass, accent, s):
    """A small dab rig: round body, short neck with a coloured mouthpiece, and a side arm ending in a quartz banger."""
    r = .035 * s
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, radius=r, location=(x, y, z + r * .9))
    b = bpy.context.active_object; b.name = tag + "Body"; b.scale.z = .9
    for c in b.users_collection: c.objects.unlink(b)
    K.link(b, glass); bpy.ops.object.shade_smooth()
    K.cyl(tag + "Foot", r * .7, r * .75, .006, (x, y, z), glass, 20)
    K.cyl(tag + "Neck", r * .32, r * .32, .07 * s, (x, y, z + r * 1.6), glass, 16)
    K.cyl(tag + "Mouth", r * .4, r * .36, .015 * s, (x, y, z + r * 1.6 + .07 * s), accent, 16)
    K.tube(tag + "Arm", [(x + r * .8, y - r * .4, z + r), (x + r * 1.6, y - r * .8, z + r * 1.25)], .005 * s, glass)
    K.cyl(tag + "Banger", .009 * s, .009 * s, .022 * s, (x + r * 1.6, y - r * .8, z + r * 1.25), CLEAR, 12)
    return 2 * r + .06

def budjar(tag, x, y, z, h):
    """An apothecary jar of buds with a brass lid and knob."""
    r = h * .38
    K.cyl(tag, r, r, h * .78, (x, y, z), CLEAR, 24)
    K.cyl(tag + "Buds", r * .85, r * .85, h * .55, (x, y, z + .006), BUDS, 20)
    K.cyl(tag + "Lid", r * 1.06, r * .9, h * .12, (x, y, z + h * .78), K.BRASS, 24)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=h * .07, location=(x, y, z + h * .95))
    k = bpy.context.active_object; k.name = tag + "Knob"
    for c in k.users_collection: c.objects.unlink(k)
    K.link(k, K.BRASS)
    return 2 * r + .045

def torch(tag, x, y, z):
    """A brass butane torch with a dark nozzle."""
    K.cyl(tag + "Tank", .022, .022, .09, (x, y, z), K.BRASS, 20)
    K.box(tag + "Head", (.05, .03, .03), (x + .012, y, z + .09), K.BRASS, .006)
    o = K.cyl(tag + "Nozzle", .007, .006, .03, (x + .035, y, z + .105), K.DARK, 12); o.rotation_euler.y = math.pi / 2

def ashtray(tag, x, y, z):
    """A round brass ashtray with three rests."""
    K.cyl(tag, .045, .04, .015, (x, y, z), K.BRASS, 28)
    K.cyl(tag + "Well", .033, .033, .004, (x, y, z + .013), K.DARK, 24)
    for i in range(3):
        a = i * 2 * math.pi / 3
        K.box(f"{tag}Rest{i}", (.014, .01, .006), (x + .041 * math.cos(a), y + .041 * math.sin(a), z + .013), K.DARK, .002).rotation_euler.z = a

L, D, H = 3.2 * M, .45 * M, 1.05 * V
# ---------- the counter: tiled front and ends, cream top, brass foot rail ----------
K.box("BarPlinth", (L + .02, D + .02, .08), (0, 0, 0), OAKD, .01)
K.box("BarBody", (L, D, H - .08), (0, 0, .07), TILE, .008)
NT = 14                               # tile joints on the customer face and the ends
for i in range(1, NT):
    K.box(f"JointV{i}", (.006, .004, H - .2), (-L / 2 + L * i / NT, -D / 2 - .001, .1), GROUT, 0)
for z in (.33, .55):
    K.box(f"JointH{z}", (L, .004, .006), (0, -D / 2 - .001, z), GROUT, 0)
    for sx in (-1, 1): K.box(f"JointE{sx}{z}", (.004, D, .006), (sx * (L / 2 + .001), 0, z), GROUT, 0)
K.box("BarBand", (L + .01, D + .01, .025), (0, 0, H - .1), K.BRASS, .006)
ty0, ty1 = my(.325), my(-.325)        # top from b.z-.55 to b.z+.1 (centre at b.z-.225)
K.box("BarTop", ((3.2 + .12) * M, ty1 - ty0, .07 * V + .01), (0, (ty0 + ty1) / 2, H - .01), TOP, .02, 4)
ry = my(.405)
for x in (-L / 2 + .1, 0, L / 2 - .1):
    K.tube(f"RailBracket{x:.2f}", [(x, -D / 2, .145), (x, ry, .145)], .012, K.BRASS)
K.tube("FootRail", [(-L / 2 + .04, ry, .145), (L / 2 - .04, ry, .145)], .018, K.BRASS)

# ---------- three velvet stools on brass poles ----------
sy = my(.775)
for i, sx in enumerate((-3.2 / 2 + .6, 0, 3.2 / 2 - .6)):
    x = sx * M
    K.cyl(f"StoolFoot{i}", .13, .14, .02, (x, sy, 0), K.BRASS, 24)
    K.cyl(f"StoolPole{i}", .018, .018, .72 * V - .02, (x, sy, .02), K.BRASS, 16)
    K.cyl(f"StoolRing{i}", .1, .1, .012, (x, sy, .22), K.BRASS, 24)
    K.cyl(f"StoolSeat{i}", .2 * M, .2 * M, .08 * V, (x, sy, .72 * V - .01), VELVET, 28)
    K.cyl(f"StoolPiping{i}", .2 * M + .004, .2 * M + .004, .008, (x, sy, .72 * V + .05), K.BRASS, 28)

# ---------- the back bar: dark oak cabinet, two oak shelves of bottles and jars ----------
by0, by1 = my(-1.075), my(-.725)     # z0+.2 .. z0+.55
bd, bh = by0 - by1, 1.9 * V
byc = (by0 + by1) / 2
LC = .5 * V                          # the lower cupboard; above it the back bar is open shelving on a tiled back
K.box("BackBar", (L, bd, LC), (0, byc, 0), OAKD, .012)
for i in range(4):                    # cupboard doors toward the bar
    K.box(f"CupDoor{i}", (L / 4 - .03, .012, LC - .1), (-L / 2 + L / 4 * (i + .5), by1 - .004, .06), OAK, .004)
    K.cyl(f"CupKnob{i}", .012, .012, .015, (-L / 2 + L / 4 * (i + .5) + (.08 if i % 2 else -.08), by1 - .012, LC / 2 + .02), K.BRASS, 12).rotation_euler.x = math.pi / 2
K.box("BackWall", (L, .04, bh - LC), (0, by0 - .02, LC), OAKD, .008)
for sx in (-1, 1): K.box(f"BackSide{sx}", (.04, bd, bh - LC), (sx * (L / 2 - .02), byc, LC), OAKD, .008)
K.box("BackBarCap", (L + .04, bd + .03, .03), (0, byc, bh), OAK, .008)
K.box("BackBarCounter", (L - .04, bd + .05, .03), (0, byc - .02, .5 * V), OAK, .008)
K.box("BackPanel", (L - .08, .006, bh - LC - .06), (0, by0 - .043, LC + .03), TILE, 0)
for k, h in enumerate((.8, 1.35)):
    zs = h * V
    sh_y0, sh_y1 = by0 - .04, my(-.575)   # shelves reach z0+.7, out past the cupboard toward the bar
    K.box(f"Shelf{k}", (L - .12, sh_y0 - sh_y1 + .02, .05 * V), (0, (sh_y0 + sh_y1) / 2 - .01, zs), OAK, .006)
    x, n = -L / 2 + .11, 0
    yy = (sh_y0 + sh_y1) / 2 - .01; z0 = zs + .05 * V
    while x < L / 2 - .1:
        kind = (n + 2 * k) % 5
        if kind in (0, 3): x += bong(f"Bong{k}_{n}", x, yy, z0, GLASSES[(n + k) % 3], ACCENT[n % 2], .26 if kind == 0 else .21)
        elif kind in (1, 4): x += rig(f"Rig{k}_{n}", x, yy, z0, GLASSES[(n + k + 1) % 3], ACCENT[(n + 1) % 2], .9 if kind == 1 else .75)
        else: x += budjar(f"Jar{k}_{n}", x, yy, z0, .11)
        n += 1
torch("Torch", L / 2 - .2, byc - .03, .5 * V + .03)
# ---------- on the bar top: two dab rigs on cream mats, a bud jar, a brass ashtray ----------
TZ = H + .07 * V
for i, x in enumerate((-.55, .35)):
    K.cyl(f"CounterMat{i}", .1, .1, .006, (x, -.04, TZ), MAT_CREAM, 32)
    rig(f"CounterRig{i}", x, -.04, TZ + .006, GLASSES[i + 1], ACCENT[i], 1.5)
budjar("CounterJar", -.15, .02, TZ, .12)
ashtray("Ashtray", .72, -.02, TZ)

# ---------- pendant globes on a dark rail, hung from posts on the back bar ----------
rz = 2.55 * V
ry0, ry1 = my(-1.075), my(-.425)
for sx in (-1, 1):
    x = sx * (L / 2 + .1 * M)
    K.box(f"RailPost{sx}", (.03, .03, rz - bh), (x, byc, bh), RAIL, .006)
    K.box(f"RailArm{sx}", (.03, ry0 - ry1, .035), (x, (ry0 + ry1) / 2, rz), RAIL, .006)
ly = my(-.025)
K.box("LampRail", ((3.2 + .2) * M, .035, .035), (0, ly, rz), RAIL, .006)
for sx in (-1, 1): K.box(f"RailTie{sx}", (.03, ry0 - ly, .03), (sx * (L / 2 + .1 * M), (ry0 + ly) / 2, rz), RAIL, .006)
for i, lx in enumerate((-3.2 / 2 + .7, 0, 3.2 / 2 - .7)):
    x = lx * M; zg = 1.9 * V
    K.cyl(f"LampCord{i}", .004, .004, rz - zg - .05, (x, ly, zg + .06), RAIL, 8)
    K.cyl(f"LampCap{i}", .022, .03, .04, (x, ly, zg + .06), K.BRASS, 16)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=14, radius=.13 * M, location=(x, ly, zg))
    g = bpy.context.active_object; g.name = f"BarLamp{i}"
    for c in g.users_collection: c.objects.unlink(g)
    K.link(g, LAMP); bpy.ops.object.shade_smooth()

print("back bar centre offset (m, Blender y):", round(byc, 3), "depth", round(bd, 3), "height", round(bh, 3))
K.finish(OUT, "rooftop_bar", ortho=3.4, centre=(0, .2, .9), lights=(("BarGlow", (0, -.2, 1.5), .9, .3, 8),))
