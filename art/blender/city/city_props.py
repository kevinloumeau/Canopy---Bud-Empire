"""Rooftop clutter and extra street dressing for the city round Canopy's shop. Low-poly, one vertex-coloured
material each (see city_kit). Origin on the floor at the footprint centre; front is -Y (map +z).
Run:  ~/bpyenv/bin/python city_props.py -- OUT_DIR [names...]
"""
import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import city_kit as C
from city_kit import K, B
import bpy, bmesh

def m(name, hexcol, r=.7): return K.mat(name, hexcol, r)
def box(n, size, loc, mat): return K.box(n, size, loc, mat, 0)
def cyl(n, r1, r2, h, loc, mat, v=10): return K.cyl(n, r1, r2, h, loc, mat, v)

def hvac():
    body, dark, duct = m("Unit", "#c9c8c1"), m("Grille", "#4a4f50"), m("Duct", "#a9adab")
    box("Base", (1.5, 1.0, .12), (0, 0, 0), dark)
    box("Body", (1.4, .9, .72), (0, 0, .12), body)
    cyl("FanRing", .3, .3, .06, (.3, 0, .84), dark, 12); cyl("FanRing2", .3, .3, .06, (-.3, 0, .84), dark, 12)
    for i in range(4): box(f"Louvre{i}", (1.2, .02, .06), (0, -.46, .25 + i * .12), dark)
    box("DuctUp", (.3, .3, .5), (.55, .55, 0), duct); box("DuctOver", (.3, .6, .3), (.55, .3, .5), duct)

def water_tower():
    wood, hoop, iron, roof = m("Staves", "#8a5a3c", .85), m("Hoop", "#3b3a37"), m("Legs", "#4a4c4a"), m("Cap", "#6b4a35", .8)
    for x in (-.55, .55):
        for y in (-.55, .55): box(f"Leg{x}{y}", (.1, .1, 1.7), (x, y, 0), iron)
    box("BraceX", (1.2, .05, .05), (0, -.55, .85), iron); box("BraceY", (.05, 1.2, .05), (.55, 0, .85), iron)
    box("Deck", (1.6, 1.6, .1), (0, 0, 1.7), iron)
    cyl("Tank", .8, .76, 1.7, (0, 0, 1.8), wood, 14)
    for z in (2.1, 2.7, 3.3): cyl(f"Hoop{z}", .82, .82, .06, (0, 0, z), hoop, 14)
    cyl("Roof", .86, .05, .7, (0, 0, 3.5), roof, 14)
    box("Ladder", (.3, .04, 2.6), (0, -.82, .9), iron)

def skylight():
    curb, glass, frame = m("Curb", "#b8b2a4"), m("SkyGlass", "#7fa7b4", .2), m("SkyFrame", "#55605e")
    box("Curb", (1.3, .9, .22), (0, 0, 0), curb)
    me = bpy.data.meshes.new("Ridge"); bm = bmesh.new()
    v = [bm.verts.new(p) for p in [(-.6, -.4, .22), (.6, -.4, .22), (.6, .4, .22), (-.6, .4, .22), (-.6, 0, .55), (.6, 0, .55)]]
    for f in [(0, 1, 5, 4), (2, 3, 4, 5), (1, 2, 5), (3, 0, 4)]: bm.faces.new([v[i] for i in f])
    bm.to_mesh(me); bm.free(); K.link(bpy.data.objects.new("Ridge", me), glass)
    box("RidgeBar", (1.24, .05, .05), (0, 0, .53), frame)

def access():
    wall, cap, door = m("Bulkhead", "#cfc6b2"), m("BulkCap", "#8d8778"), m("RoofDoor", "#5d6b62")
    box("Box", (1.5, 1.3, 2.05), (0, 0, 0), wall)
    box("Cap", (1.7, 1.5, .14), (0, 0, 2.05), cap)
    box("Door", (.75, .06, 1.75), (.2, -.66, .05), door)
    box("Knob", (.06, .06, .06), (.45, -.7, .9), m("Brass", "#c9a24f", .3))
    box("Vent", (.3, .3, .3), (-.4, .3, 2.19), cap)

def dish():
    grey, white = m("Mount", "#6f7472"), m("DishWhite", "#e9e7e0", .5)
    box("Foot", (.6, .6, .08), (0, 0, 0), grey)
    cyl("Post", .04, .04, .7, (0, 0, .08), grey, 6)
    d = cyl("Dish", .02, .42, .16, (0, 0, .78), white, 12); d.rotation_euler = (math.radians(55), 0, math.radians(-30))
    a = box("Arm", (.03, .03, .45), (0, 0, .78), grey); a.rotation_euler = (math.radians(55), 0, math.radians(-30))

def vents():
    pipe, cap = m("Pipe", "#9b9e9a"), m("PipeCap", "#5d615f")
    for i, (x, y, h) in enumerate([(-.3, 0, .6), (.1, .2, .9), (.35, -.15, .45)]):
        cyl(f"P{i}", .08, .08, h, (x, y, 0), pipe, 8); cyl(f"C{i}", .13, .13, .06, (x, y, h), cap, 8)

def scooter(colour):
    def make():
        paint, dark, seat, chrome = m("ScootPaint", colour, .4), m("Tyre", "#2a2a2a", .9), m("Seat", "#4a3a2e", .7), m("Chrome", "#c7c9c6", .3)
        for y in (-.48, .5):
            w = cyl(f"Wheel{y}", .2, .2, .1, (0, y, .2), dark, 12); w.rotation_euler = (0, math.radians(90), 0); w.location.x = -.05
        box("Floor", (.3, .6, .1), (0, 0, .22), paint)
        box("Rear", (.34, .5, .32), (0, .4, .3), paint)
        box("Seat", (.26, .5, .1), (0, .38, .62), seat)
        box("Shield", (.32, .1, .62), (0, -.38, .25), paint)
        box("Column", (.06, .06, .4), (0, -.42, .82), chrome)
        box("Bar", (.6, .05, .05), (0, -.42, 1.2), chrome)
        box("Lamp", (.12, .06, .1), (0, -.47, 1.08), chrome)
    return make

def shrub_planter():
    wood, soil, leaf, leaf2 = m("Planter", "#7a5a40", .8), m("Soil", "#4a3426", 1.), m("Shrub", "#5d8c45", .8), m("Shrub2", "#72a352", .8)
    box("Box", (2.4, .7, .5), (0, 0, 0), wood); box("Rim", (2.5, .8, .06), (0, 0, .5), wood); box("Soil", (2.3, .6, .02), (0, 0, .5), soil)
    for i, x in enumerate((-.85, -.3, .25, .8)):
        bm = bmesh.new(); bmesh.ops.create_icosphere(bm, subdivisions=1, radius=.32 + .04 * (i % 2))
        me = bpy.data.meshes.new(f"Bush{i}"); bm.to_mesh(me); bm.free()
        o = K.link(bpy.data.objects.new(f"Bush{i}", me), leaf if i % 2 else leaf2); o.location = (x, 0, .72); o.scale = (1, .9, .8)

def recycling():
    blue, green, lid, grey = m("BinBlue", "#3e6f9c", .6), m("BinGreen", "#4c8a55", .6), m("BinLid", "#2f3436", .6), m("BinLabel", "#eeeae0", .5)
    for x, c in ((-.33, blue), (.33, green)):
        box(f"Bin{x}", (.56, .6, .95), (x, 0, 0), c)
        box(f"Lid{x}", (.6, .64, .07), (x, 0, .95), lid)
        box(f"Label{x}", (.3, .02, .22), (x, -.31, .55), grey)
        for y in (-.2, .2):
            w = cyl(f"W{x}{y}", .06, .06, .05, (x, .3, .06), lid, 8); w.rotation_euler = (0, math.radians(90), 0)

def tree_grate():
    iron, gap = m("Grate", "#3e403e", .7), m("GrateGap", "#2a2622", 1.)
    box("Pit", (1.5, 1.5, .02), (0, 0, 0), gap)
    for i in range(6):
        o = (i - 2.5) * .24
        box(f"BarX{i}", (1.5, .06, .04), (0, o, .01), iron); box(f"BarY{i}", (.06, 1.5, .04), (o, 0, .01), iron)
    box("Ring", (.62, .62, .05), (0, 0, .015), gap)

def drain():
    iron = m("Drain", "#3c3f40", .6)
    box("Frame", (.9, .45, .02), (0, 0, 0), iron)
    for i in range(6): box(f"Slot{i}", (.06, .35, .03), (-.3 + i * .12, 0, .005), m("Gap", "#1f2122", 1.))

PROPS = {"roof_hvac": hvac, "roof_watertower": water_tower, "roof_skylight": skylight, "roof_access": access, "roof_dish": dish, "roof_vents": vents,
         "street_scooter_mint": scooter("#8fc8b4"), "street_scooter_red": scooter("#c4473b"), "street_shrub_planter": shrub_planter,
         "street_recycling": recycling, "street_tree_grate": tree_grate}

# Low-poly street furniture for the dressing round the first ring of blocks (dozens of copies, so a few dozen
# triangles each rather than the detailed hand-placed set by the shop).
def lp_meter():
    grey, head, glass = m("MeterPost", "#4a524e"), m("MeterHead", "#6d7a74", .5), m("MeterGlass", "#c9d6d2", .3)
    box("Post", (.08, .08, 1.05), (0, 0, 0), grey); box("Head", (.24, .18, .32), (0, 0, 1.05), head)
    box("Dial", (.16, .02, .14), (0, -.1, 1.17), glass); box("Cap", (.26, .2, .05), (0, 0, 1.37), grey)

def lp_bin():
    green, rim = m("BinBody", "#355c45", .6), m("BinRim", "#26302b", .6)
    cyl("Body", .27, .3, .85, (0, 0, 0), green, 8); cyl("Rim", .31, .31, .08, (0, 0, .85), rim, 8); cyl("Lid", .22, .12, .1, (0, 0, .93), rim, 8)

def lp_hydrant():
    red, cap = m("Hydrant", "#c8452f", .5), m("HydrantCap", "#e2d9c4", .5)
    cyl("Base", .2, .2, .08, (0, 0, 0), red, 8); cyl("Barrel", .14, .14, .55, (0, 0, .08), red, 8); cyl("Top", .17, .08, .14, (0, 0, .63), cap, 8)
    for s in (-1, 1): box(f"Nozzle{s}", (.14, .12, .12), (s * .17, 0, .38), red)

def lp_bollard():
    iron, band = m("Bollard", "#2f3a35", .6), m("BollardBand", "#d9c58c", .4)
    cyl("Post", .1, .1, .8, (0, 0, 0), iron, 6); cyl("Band", .105, .105, .08, (0, 0, .62), band, 6); cyl("Cap", .12, .05, .1, (0, 0, .8), iron, 6)

def lp_newsboxes():
    for i, (x, c) in enumerate(((-.36, "#c8452f"), (.0, "#3e6f9c"), (.36, "#e8e1cf"))):
        b, dark = m(f"News{i}", c, .5), m("NewsLeg", "#2a2a2a")
        box(f"Leg{i}", (.26, .26, .35), (x, 0, 0), dark); box(f"Box{i}", (.32, .34, .6), (x, 0, .35), b)
        box(f"Window{i}", (.24, .02, .22), (x, -.17, .62), m("NewsGlass", "#2f3d44", .2))

def lp_bikerack():
    steel = m("Rack", "#7c8580", .4)
    for i in range(4):
        x = -.75 + i * .5
        for s in (-1, 1): box(f"Leg{i}{s}", (.05, .05, .75), (x, s * .25, 0), steel)
        box(f"Top{i}", (.05, .55, .05), (x, 0, .73), steel)
    box("Rail", (1.6, .05, .05), (0, 0, .2), steel)

def lp_car():
    """A parked car in ~200 triangles: body, a cabin with sloped screens, roof, bumpers, lamps and four wheels. Nose
    along +X like the street cars (car.glb), so the game turns both the same way; paint is tinted per copy."""
    paint, glass, tyre, chrome, dark = m("BodyPaint", "#4f8fd0", .4), m("CarWin", "#26343c", .2), m("Tyre", "#232323", .9), m("Bumper", "#c8c9c4", .3), m("Under", "#2b2b2b", .8)
    lamp, tail = m("Lamp", "#fff1cf", .3), m("Tail", "#b03a2e", .4)
    L, W = 2.5, 1.12
    box("Under", (L - .25, W - .1, .2), (0, 0, .1), dark)
    box("Body", (L, W, .4), (0, 0, .26), paint)
    # Cabin: a frustum, wider at the belt line, glass all round, with a painted roof on top.
    me = bpy.data.meshes.new("Cabin"); bm = bmesh.new()
    lo, hi, cx = (-.62, .5), (-.38, .25), -.08
    v = [bm.verts.new(p) for p in [(cx + lo[0], -W / 2 + .05, .66), (cx + lo[1], -W / 2 + .05, .66), (cx + lo[1], W / 2 - .05, .66), (cx + lo[0], W / 2 - .05, .66),
                                     (cx + hi[0], -W / 2 + .14, 1.0), (cx + hi[1], -W / 2 + .14, 1.0), (cx + hi[1], W / 2 - .14, 1.0), (cx + hi[0], W / 2 - .14, 1.0)]]
    for f in [(0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]: bm.faces.new([v[i] for i in f])
    bm.to_mesh(me); bm.free(); K.link(bpy.data.objects.new("Cabin", me), glass)
    box("Roof", (.66, W - .26, .05), (cx - .065, 0, 1.0), paint)
    for x in (-L / 2 - .02, L / 2 + .02): box(f"Bumper{x}", (.08, W + .02, .14), (x, 0, .22), chrome)
    for y in (-.38, .38):
        box(f"Head{y}", (.04, .2, .1), (L / 2 + .005, y, .42), lamp); box(f"Tail{y}", (.04, .2, .1), (-L / 2 - .005, y, .42), tail)
    for x in (-L * .31, L * .31):
        for y in (-W / 2 + .14, W / 2 + .02):   # a cylinder turned up on X runs from its origin toward -Y
            w = cyl(f"T{x}{y}", .22, .22, .16, (0, 0, 0), tyre, 10); w.rotation_euler = (math.radians(90), 0, 0); w.location = (x, y, .22)

PROPS.update({"street_lp_meter": lp_meter, "street_lp_bin": lp_bin, "street_lp_hydrant": lp_hydrant, "street_lp_bollard": lp_bollard,
              "street_lp_newsboxes": lp_newsboxes, "street_lp_bikerack": lp_bikerack, "street_lp_car": lp_car})

if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    out = os.path.abspath(argv[0]) if argv else C.HERE
    meta = {}
    for name, make in PROPS.items():
        if len(argv) > 1 and name not in argv[1:]: continue
        K.begin(name); make(); meta[name] = C.export(out, name); print(name, meta[name])
    C.write_meta(out, meta)
