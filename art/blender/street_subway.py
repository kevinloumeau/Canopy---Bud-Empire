"""Canopy subway entrance: a stair well sunk into the pavement, green railings on cream stone coping, two brass
globe lamps at the mouth and a green sign over the far rail.

Origin is the well's footprint centre at pavement level; the mouth opens toward -Y (the camera / +z in three) and
the stairs run down toward +Y.  The game cuts a hole in the pavement slab the size of WELL_OUTER (in metres) for it.

Needs canopy_kit.py beside it (or in ../blender).  Run headless with  python street_subway.py -- OUT_DIR
"""
import os, sys, math
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [HERE, os.path.join(HERE, "..", "blender")]   # canopy_kit.py beside this file (repo) or in ../blender (diorama)
import bpy, bmesh
import canopy_kit as K

OUT = K.begin("StreetSubway")
IRON = K.mat("RailGreen", "#1f5a3c", .45, .15)
TILE = K.mat("SubwayTile", "#f1e8d2", .3)
STEP = K.mat("StepStone", "#d9ccb0", .6)
WELLD = K.mat("WellShade", "#b9ac90", .7)
PASS = K.mat("PassageDark", "#22302a", .9)
GLOWM = K.mat("LampGlow", "#fbefc2", .4, 0, 1.6)

HW, HL = .6, 1.35            # inner half width (x) and half length (y)
T = .1                       # wall thickness
N, TREAD, RISE = 8, .29, .2  # stairs
D = N * RISE                 # landing depth
BOT = D + .3                 # walls run below the landing so no gap shows


def blk(name, x0, x1, y0, y1, z0, z1, m, bevel=0):
    return K.box(name, (x1 - x0, y1 - y0, z1 - z0), ((x0 + x1) / 2, (y0 + y1) / 2, z0), m, bevel)


# Well walls: tiled inside, a green band at eye height, a darker dado near the bottom.
for s, nm in ((-1, "L"), (1, "R")):
    x0, x1 = (-HW - T, -HW) if s < 0 else (HW, HW + T)
    blk(f"Wall{nm}", x0, x1, -HL - T, HL + T, -BOT, 0, TILE)
    xi = -HW + .004 if s < 0 else HW - .004
    blk(f"Band{nm}", min(xi, xi - s * .006), max(xi, xi - s * .006), -HL, HL, -.42, -.32, K.GREEN)
blk("WallFar", -HW - T, HW + T, HL, HL + T, -BOT, 0, TILE)
blk("WallMouth", -HW - T, HW + T, -HL - T, -HL, -BOT, 0, WELLD)
blk("BandFar", -HW, HW, HL - .006, HL, -.42, -.32, K.GREEN)
# The passage at the foot of the stairs: a dark doorway with an arched head in the far wall.
blk("Passage", -.42, .42, HL - .008, HL, -D, -D + .78, PASS)
arch = K.cyl("PassageArch", .42, .42, .008, (0, HL, -D + .78), PASS, 16)
arch.rotation_euler.x = math.pi / 2
blk("PassageLintel", -.5, .5, HL - .014, HL, -D + .8 + .42, -D + .9 + .42, K.GREEN)

# Steps: solid blocks with a brass nosing, then the landing.
for k in range(N):
    y0 = -HL + k * TREAD
    top = -(k + 1) * RISE
    blk(f"Step{k}", -HW, HW, y0, HL if k == N - 1 else y0 + TREAD, -BOT, top, STEP)
    blk(f"Nosing{k}", -HW, HW, y0, y0 + .035, top, top + .012, K.BRASS)
# Brass handrails along both walls, following the pitch.
for s in (-1, 1):
    x = s * (HW - .05)
    K.tube(f"Handrail{'LR'[s > 0]}", [(x, -HL, .1), (x, -HL + N * TREAD, -D + .85), (x, HL - .05, -D + .85)], .022, K.BRASS)

# Cream stone coping round three sides; a flush sill across the mouth.
C, CH = .14, .08
blk("CopingL", -HW - C, -HW, -HL - .02, HL + C, 0, CH, K.STONE)
blk("CopingR", HW, HW + C, -HL - .02, HL + C, 0, CH, K.STONE)
blk("CopingFar", -HW, HW, HL, HL + C, 0, CH, K.STONE)
blk("Sill", -HW - C, HW + C, -HL - .04, -HL, -.01, .006, K.STONE)

# Railings on the coping: posts, top and bottom rails and balusters.
RH, RB = .95, .2
def rail(tag, a, b):
    (xa, ya), (xb, yb) = a, b
    L = math.hypot(xb - xa, yb - ya); ux, uy = (xb - xa) / L, (yb - ya) / L
    along_x = abs(ux) > .5
    for nm, z, h in (("Top", RH - .05, .05), ("Bottom", RB, .035)):
        if along_x: blk(f"{tag}{nm}", min(xa, xb), max(xa, xb), ya - .025, ya + .025, CH + z, CH + z + h, IRON)
        else: blk(f"{tag}{nm}", xa - .025, xa + .025, min(ya, yb), max(ya, yb), CH + z, CH + z + h, IRON)
    n = int(L / .13)
    for i in range(1, n):
        x, y = xa + ux * L * i / n, ya + uy * L * i / n
        blk(f"{tag}Bar{i}", x - .009, x + .009, y - .009, y + .009, CH + RB, CH + RH - .05, IRON)
    for i in range(0, 4):
        x, y = xa + ux * L * i / 3, ya + uy * L * i / 3
        blk(f"{tag}Post{i}", x - .03, x + .03, y - .03, y + .03, CH, CH + RH + .03, IRON)
        blk(f"{tag}Cap{i}", x - .038, x + .038, y - .038, y + .038, CH + RH + .03, CH + RH + .06, K.BRASS)

XR, YF, YM = HW + C / 2, HL + C / 2, -HL + .02
rail("RailL", (-XR, YM), (-XR, YF))
rail("RailR", (XR, YM), (XR, YF))
rail("RailFar", (-XR, YF), (XR, YF))

# Brass globe lamps on tall green posts at the mouth.
def globe(name, r, loc, m):
    mesh = bpy.data.meshes.new(name); bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=14, v_segments=8, radius=r); bm.to_mesh(mesh); bm.free()
    for p in mesh.polygons: p.use_smooth = True
    o = K.link(bpy.data.objects.new(name, mesh), m); o.location = loc
    return o
for s in (-1, 1):
    x, tag = s * XR, "LR"[s > 0]
    K.cyl(f"LampFoot{tag}", .07, .06, .14, (x, YM, CH), IRON, 12)
    K.cyl(f"LampPost{tag}", .035, .035, 1.55, (x, YM, CH + .14), IRON, 10)
    K.cyl(f"LampCollar{tag}", .055, .055, .05, (x, YM, CH + .9), K.BRASS, 12)
    K.cyl(f"LampCup{tag}", .04, .085, .08, (x, YM, CH + 1.69), K.BRASS, 14)
    globe(f"LampGlobe{tag}", .13, (x, YM, CH + 1.88), GLOWM)
    K.cyl(f"LampCap{tag}", .05, .02, .06, (x, YM, CH + 2.0), K.BRASS, 12)

# The sign over the far rail, facing the mouth: brass frame, green field, a cream roundel and a cream bar.
SZ, SY = CH + RH + .1, HL + C / 2
for s in (-1, 1):
    blk(f"SignStrut{'LR'[s > 0]}", s * .46 - .015, s * .46 + .015, SY - .015, SY + .015, CH + RH + .06, SZ + .04, IRON)
blk("SignFrame", -.56, .56, SY - .02, SY + .02, SZ, SZ + .38, K.BRASS)
blk("SignFace", -.53, .53, SY - .03, SY - .02, SZ + .03, SZ + .35, K.GREEN)
ring = K.cyl("SignRing", .13, .13, .012, (-.33, SY - .03, SZ + .19), K.BRASS, 20); ring.rotation_euler.x = math.pi / 2
dot = K.cyl("SignRoundel", .105, .105, .016, (-.33, SY - .034, SZ + .19), K.CREAM, 20); dot.rotation_euler.x = math.pi / 2
blk("SignBar", -.15, .43, SY - .036, SY - .03, SZ + .17, SZ + .23, K.CREAM)
blk("SignBarSmall", -.15, .22, SY - .036, SY - .03, SZ + .09, SZ + .12, K.BRASS)

K.finish(OUT, "street_subway", ortho=4.6, centre=(0, 0, -.1))
