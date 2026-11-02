"""Canopy online-orders pickup window: one storefront bay on the shop floor's front edge, with a walk-up hatch.

Kevin (2026-10-20) found the first booth a heavy, enclosed green box, then asked for the sign to be part of the
building's exterior and for an actual window in a wall.  So this is a single bay of the storefront (storefront.py):
the same green frame, brass beads, cream sign band lettered in Bricolage and capped cornice, 2.48 m tall, but only
0.2 m deep, with a service hatch where the glazing would be: a tiled kick wall to counter height, an oak ledge out
over the pavement (a bell and a bag waiting), a sliding pane pushed to one side, and an oak shelf inside under the left half,
where the glass feed tube (drawn by the map) brings the bags down.

The street face looks along Blender -Y (map +z, the front pavement).  Origin at the wall's footprint centre on the
floor; the inside shelf reaches 0.5 m behind it (+Y) and the ledge 0.22 m in front.  1.8 m wide.

Five looks grow with the window's level (Kevin, 2026-11-02: "more upgradeable"), at the station look levels:
    1  Lv 1   the hatch: the bay as above
    2  Lv 10  awning: a striped forest-and-cream awning over the hatch, a chalk menu card and a second bag waiting
    3  Lv 30  ready shelf: an oak cubby rack on the ledge's left half, numbered, with bags waiting in it
    4  Lv 50  blade sign: a lit PICKUP blade sign off the right pilaster and a brass lantern on each pilaster
    5  Lv 75  flagship window: a brass-framed glass canopy in place of the awning, a marble ledge, a walnut rack and
       gold lettering
and founder_finish.py turns tier 5 into the ebony, emerald and gold founder look.  Each look stays under ~3K triangles.

Needs canopy_kit.py one folder up (or next to this file).  Run headless with
    python pickup_window.py -- OUT_DIR [TIER]
TIER 1 writes pickup_window.glb, 2 to 5 write pickup_window_tierN.glb.
"""
import os, sys, math
try:
    here = os.path.dirname(os.path.abspath(__file__))
    sys.path.insert(0, here); sys.path.insert(0, os.path.dirname(here))
except NameError: pass
import bpy, bmesh
import canopy_kit as K

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
TIER = int(argv[1]) if len(argv) > 1 else 1
OUT = K.begin("PickupWindow")
FRAME = K.mat("StorefrontGreen", "#1f6b47", .45)
FRAME_D = K.mat("StorefrontGreenDeep", "#185a3b", .5)
SIGN = K.mat("SignCream", "#f1e7cc", .5)
LETTER = K.mat("SignLetters", "#1f5e40", .5)
KRAFT_D = K.mat("KraftFold", "#a97a4c", .85)
FONT = os.environ.get("CANOPY_FONT") or next((p for p in (os.path.join(d, "fonts", "Bricolage-ExtraBold.ttf") for d in (os.path.dirname(os.path.abspath(__file__)), os.path.dirname(os.path.dirname(os.path.abspath(__file__))))) if os.path.exists(p)), None)

W, H, D = 1.8, 2.48, .2
X0, X1, Y0, Y1 = -W / 2, W / 2, -D / 2, D / 2
z = lambda f: H * f
SILL, HEAD = 1.0, z(.8)          # the hatch: counter height up to the header
PIL = .14                          # pilaster width at each end

def slab(name, x0, x1, y0, y1, z0, z1, m, bevel=.008):
    return K.box(name, (x1 - x0, y1 - y0, z1 - z0), ((x0 + x1) / 2, (y0 + y1) / 2, z0), m, bevel, 1)

# ---------- plinth, kick wall to counter height with inset panels, pilasters ----------
slab("Plinth", X0, X1, Y0 - .03, Y1, 0, z(.045), FRAME_D, .01)
slab("KickWall", X0, X1, Y0, Y1, z(.045), SILL, FRAME)
slab("KickPanel", X0 + PIL + .05, X1 - PIL - .05, Y0 - .012, Y0, z(.08), SILL - .1, FRAME, .006)
slab("KickInset", X0 + PIL + .1, X1 - PIL - .1, Y0 - .016, Y0 - .012, z(.11), SILL - .13, FRAME_D, .004)
slab("KickTrim", X0 + PIL, X1 - PIL, Y0 - .02, Y0 - .01, z(.06), z(.068), K.BRASS, .002)
for s, (a, b) in ((-1, (X0, X0 + PIL)), (1, (X1 - PIL, X1))):
    slab(f"Pilaster{s}", a, b, Y0 - .03, Y1 - .006, z(.045), z(.95), FRAME, .012)
    slab(f"PilasterTrim{s}", (b - .03 if s < 0 else a + .022), (b - .022 if s < 0 else a + .03), Y0 - .036, Y0 - .03, SILL + .05, HEAD - .05, K.BRASS, .002)

# ---------- the hatch: oak ledge through the wall, brass beads, a sliding pane pushed to the left ----------
MARBLE = K.mat("Marble", "#f1ece1", .22)
slab("Ledge", X0 + PIL - .02, X1 - PIL + .02, Y0 - .22, Y1, SILL - .045, SILL, MARBLE if TIER >= 5 else K.OAK, .01)
slab("LedgeEdge", X0 + PIL - .02, X1 - PIL + .02, Y0 - .23, Y0 - .22, SILL - .04, SILL - .02, K.BRASS, .002)
for s in (-1, 1):
    o = slab(f"Bracket{s}", s * (W / 2 - PIL - .12) - .015, s * (W / 2 - PIL - .12) + .015, Y0 - .2, Y0, SILL - .2, SILL - .17, K.BRASS, .004)
    o.rotation_euler.x = -.7
a, b = X0 + PIL, X1 - PIL
for x in (a + .006, b - .006):
    slab(f"Bead{x:.2f}", x - .006, x + .006, Y0 - .018, Y1, SILL, HEAD, K.BRASS, .002)
slab("BeadTop", a, b, Y0 - .018, Y1, HEAD - .012, HEAD, K.BRASS, .002)
PW = (b - a) / 2
slab("Pane", a + .012, a + PW, -.02, -.008, SILL + .02, HEAD - .03, K.GLASS, 0)
slab("PaneStile", a + PW - .02, a + PW, -.024, -.004, SILL + .02, HEAD - .03, K.BRASS, .003)
for zz in (SILL + .02, HEAD - .05):
    slab(f"PaneRail{zz:.2f}", a + .012, a + PW, -.024, -.004, zz, zz + .025, K.BRASS, .003)

# ---------- header, sign band, cap: the storefront's ----------
slab("Header", X0, X1, Y0 - .025, Y1 + .025, HEAD, z(.815), FRAME, .008)
slab("SignBand", X0, X1, Y0, Y1, z(.815), z(.95), FRAME)
slab("SignRailLow", X0, X1, Y0 - .024, Y0, z(.815), z(.825), K.BRASS, .003)
slab("SignRailTop", X0, X1, Y0 - .024, Y0, z(.945), z(.955), K.BRASS, .003)
slab("SignFrame", X0 + .04, X1 - .04, Y0 - .016, Y0 - .004, z(.827), z(.943), K.BRASS, .002)
slab("SignPanel", X0 + .048, X1 - .048, Y0 - .02, Y0, z(.83), z(.94), SIGN, .004)
cu = bpy.data.curves.new("SignText", "FONT"); cu.body = "ONLINE PICKUP"
cu.size = z(.074); cu.extrude = 0; cu.align_x = "CENTER"; cu.align_y = "CENTER"; cu.resolution_u = 2   # flat letters: the sides cost 800 triangles
if FONT: cu.font = bpy.data.fonts.load(FONT)
o = K.link(bpy.data.objects.new("SignText", cu), K.mat("PolishedBrass", "#e2bc62", .25, .6) if TIER >= 5 else LETTER); o.location = (0, Y0 - .026, z(.885)); o.rotation_euler = (math.pi / 2, 0, 0)
slab("Cap", X0 - .02, X1 + .02, Y0 - .07, Y1 + .04, z(.95), z(1.0), FRAME, .03)
slab("CapTrim", X0, X1, Y0 - .076, Y0 - .07, z(.96), z(.967), K.BRASS, .002)

# ---------- on the ledge: a brass bell and a bag waiting ----------
K.cyl("BellBase", .045, .045, .012, (.42, Y0 - .1, SILL), K.WOOD, 12)
K.cyl("Bell", .035, .008, .04, (.42, Y0 - .1, SILL + .012), K.BRASS, 12)

def bag(name, x, y, zz, s=1.):
    w, d, h = .17 * s, .1 * s, .26 * s
    slab(name, x - w / 2, x + w / 2, y - d / 2, y + d / 2, zz, zz + h, K.KRAFT, .006)
    slab(name + "Fold", x - w / 2 - .003, x + w / 2 + .003, y - d / 2 - .003, y + d / 2 + .003, zz + h - .07 * s, zz + h - .048 * s, KRAFT_D, .004)
    slab(name + "Label", x - .04 * s, x + .04 * s, y - d / 2 - .005, y - d / 2 - .001, zz + .09 * s, zz + .17 * s, K.GREEN, .002)
    slab(name + "Handle", x - w / 4, x + w / 4, y - .005, y + .005, zz + h, zz + h + .06 * s, KRAFT_D, 0)
if TIER < 3: bag("LedgeBag", -.25, Y0 - .1, SILL)
if TIER == 2: bag("LedgeBag2", .02, Y0 - .1, SILL, .85)

# ---------- inside: an oak shelf under the left half only, where the feed tube comes down; the clerk stands at the
# open right half with nothing in front of them but the ledge ----------
slab("InnerShelf", a, -.12, Y1, Y1 + .5, SILL - .045, SILL, K.OAK, .008)
for x in (a + .08, -.2):
    slab(f"ShelfLeg{x:.2f}", x - .03, x + .03, Y1 + .38, Y1 + .44, 0, SILL - .045, K.OAK, .006)


# ---------- the looks the window grows into ----------
def tri_panel(name, pts, m):
    """A flat triangle (the awning's cheeks), both faces."""
    mesh = bpy.data.meshes.new(name); mesh.from_pydata(pts, [], [(0, 1, 2), (0, 2, 1)])
    return K.link(bpy.data.objects.new(name, mesh), m)

def tilted(name, x0, x1, top, low, t, m, bevel=.004):
    """A plate from (wall side) top=(y, z) down to low=(y, z), x0..x1 wide and t thick."""
    (ya, za), (yb, zb) = top, low
    L = math.hypot(ya - yb, za - zb)
    o = K.box(name, (x1 - x0, L, t), ((x0 + x1) / 2, (ya + yb) / 2, (za + zb) / 2 - t / 2), m, bevel, 1)
    o.rotation_euler.x = math.atan2(za - zb, ya - yb)
    return o

AW_TOP, AW_LOW = (Y0 - .02, 2.01), (Y0 - .56, 1.84)   # short, so the hatch and its shelf stay in sight
if 2 <= TIER <= 4:
    # Striped awning: eight stripes, forest and cream, a scalloped valance and two cheeks.
    AWG = K.mat("AwningGreen", "#1f6b47", .8, two_sided=True); AWC = K.mat("AwningCream", "#efe4c6", .8, two_sided=True)
    n = 8; sw = (W + .04) / n
    for i in range(n):
        x0 = -W / 2 - .02 + i * sw
        m = AWG if i % 2 == 0 else AWC
        tilted(f"AwningStripe{i}", x0, x0 + sw, AW_TOP, AW_LOW, .014, m, 0)
        flap = slab(f"AwningFlap{i}", x0 + .004, x0 + sw - .004, AW_LOW[0] - .012, AW_LOW[0], AW_LOW[1] - .11, AW_LOW[1] + .004, m, .03)
    for s in (-1, 1):
        x = s * (W / 2 + .02)
        tri_panel(f"AwningCheek{s}", [(x, AW_TOP[0], AW_TOP[1]), (x, AW_LOW[0], AW_LOW[1]), (x, AW_TOP[0], AW_LOW[1] - .02)], AWG)
    slab("AwningRail", -W / 2 - .03, W / 2 + .03, Y0 - .05, Y0, AW_TOP[1] - .02, AW_TOP[1] + .02, K.BRASS, .004)
    # A chalk menu card on the left pilaster's face, below the hatch.
    slab("MenuCard", X0 + .2, X0 + .52, Y0 - .03, Y0 - .016, .38, .82, K.mat("Chalk", "#26302b", .9), .006)
    slab("MenuCardFrame", X0 + .19, X0 + .53, Y0 - .028, Y0 - .02, .37, .83, K.OAK, .004)
    for k, zz in enumerate((.72, .64, .56, .48)):
        slab(f"MenuLine{k}", X0 + .24, X0 + (.48 if k % 2 == 0 else .42), Y0 - .033, Y0 - .03, zz, zz + .018, K.CREAM, 0)

if TIER >= 3:
    # Ready shelf: a cubby rack on the ledge's left half, two rows of three, numbered, bags waiting in four of them.
    RACK = K.WOOD if TIER >= 5 else K.OAK
    rx0, rx1, ry0, ry1, rz0, rz1 = a + .03, -.08, Y0 - .2, Y0 - .03, SILL, SILL + .56
    slab("RackBack", rx0, rx1, ry1 - .015, ry1, rz0, rz1, RACK, .004)
    for k, zz in enumerate((rz0, rz0 + .27, rz1 - .02)):
        slab(f"RackShelf{k}", rx0, rx1, ry0, ry1, zz, zz + .02, RACK, .004)
    cw = (rx1 - rx0) / 3
    for k in range(4):
        x = min(rx1 - .01, max(rx0 + .01, rx0 + k * cw))
        slab(f"RackSide{k}", x - .01, x + .01, ry0, ry1, rz0, rz1, RACK, .004)
    for r, zz in enumerate((rz0 + .02, rz0 + .29)):
        for c in range(3):
            x = rx0 + cw * (c + .5)
            slab(f"RackTag{r}{c}", x - .03, x + .03, ry0 - .006, ry0, zz - .002, zz + .018, K.BRASS, 0)
            if (r, c) in ((0, 0), (0, 2), (1, 1)):   # plain bags (no label or handle) to keep the rack light
                slab(f"RackBag{r}{c}", x - .06, x + .06, ry0 + .03, ry1 - .03, zz + .02, zz + .21, K.KRAFT, 0)
                slab(f"RackBagFold{r}{c}", x - .062, x + .062, ry0 + .028, ry1 - .028, zz + .16, zz + .175, KRAFT_D, 0)

if TIER >= 4:
    # A lit blade sign off the right pilaster, above the awning, and a brass lantern on each pilaster.
    bx, by0, by1, bz0, bz1 = X1 - .07, Y0 - .16, Y0 - .62, 2.06, 2.42
    slab("BladeArm", bx - .012, bx + .012, by1 - .03, Y0, bz1 + .02, bz1 + .045, K.BRASS, .004)
    for yy in (by0 + .04, by1 + .04):
        slab(f"BladeHanger{yy:.2f}", bx - .006, bx + .006, yy - .006, yy + .006, bz1, bz1 + .025, K.BRASS, 0)
    slab("BladeFrame", bx - .03, bx + .03, by1, by0, bz0, bz1, FRAME, .01)
    slab("BladePanel", bx - .034, bx + .034, by1 + .025, by0 - .025, bz0 + .025, bz1 - .025, SIGN, .004)
    for s in (1,):   # the side the map's camera sees
        bc = bpy.data.curves.new(f"BladeText{s}", "FONT"); bc.body = "PICKUP"
        bc.size = .085; bc.extrude = 0; bc.align_x = "CENTER"; bc.align_y = "CENTER"; bc.resolution_u = 1
        if FONT: bc.font = bpy.data.fonts.load(FONT)
        o = K.link(bpy.data.objects.new(f"BladeText{s}", bc), LETTER)
        o.location = (bx + s * .038, (by0 + by1) / 2, (bz0 + bz1) / 2); o.rotation_euler = (math.pi / 2, 0, s * math.pi / 2)
    LAMP = K.mat("LanternGlow", "#fff1cf", .4, 0, 2.5)
    for s in (-1, 1):
        x = s * (W / 2 - PIL / 2)
        slab(f"LanternArm{s}", x - .012, x + .012, Y0 - .14, Y0 - .03, 1.6, 1.625, K.BRASS, .003)
        K.cyl(f"LanternCap{s}", .045, .02, .04, (x, Y0 - .14, 1.6), K.BRASS, 8)
        K.cyl(f"LanternGlass{s}", .035, .045, .12, (x, Y0 - .14, 1.48), LAMP, 8)
        K.cyl(f"LanternBase{s}", .04, .04, .015, (x, Y0 - .14, 1.465), K.BRASS, 8)

if TIER >= 5:
    # The flagship canopy: glass on a brass frame, held by two tie rods from the sign band.
    tilted("CanopyGlass", -W / 2 - .02, W / 2 + .02, AW_TOP, AW_LOW, .012, K.GLASS, 0)
    for s in (-1, 1):
        x = s * (W / 2 + .01)
        tilted(f"CanopyEdge{s}", x - .018, x + .018, AW_TOP, AW_LOW, .03, K.BRASS, .004)
        K.tube(f"TieRod{s}", [(s * (W / 2 - .1), Y0 - .01, 2.32), (s * (W / 2 - .1), AW_LOW[0] + .04, AW_LOW[1] + .03)], .008, K.BRASS)
    slab("CanopyFront", -W / 2 - .03, W / 2 + .03, AW_LOW[0] - .03, AW_LOW[0], AW_LOW[1] - .05, AW_LOW[1] + .01, K.BRASS, .006)
    slab("CanopyBack", -W / 2 - .03, W / 2 + .03, Y0 - .05, Y0, AW_TOP[1] - .03, AW_TOP[1] + .02, K.BRASS, .004)

K.finish(OUT, "pickup_window" if TIER == 1 else f"pickup_window_tier{TIER}", ortho=3.0, centre=(0, -.3, 1.3))
