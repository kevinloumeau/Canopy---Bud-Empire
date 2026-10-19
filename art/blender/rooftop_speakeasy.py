"""Canopy rooftop lounge, Speakeasy tier: the pergola, the L of cream sofas with velvet cushions and the fire table.

Laid out exactly as src/three/rooftop.js builds it, converted to metres (horizontal map units / 1.69, world heights
x 0.7247).  The origin is the centre of the pergola's post rectangle on the deck, i.e. map
(ROOFTOP.x0 + 3.8, ROOFTOP.y, ROOFTOP.z0 + 1.825).  Map +x is Blender +X and map +z is Blender -Y, so the street
side (the pergola's front beam and its LOUNGE sign) faces -Y and the sofa backs stand at +Y.
Named for code: "Flame" (material "Flame") and "SignFace" (material "SignFace", UVs 0..1, faces -Y) for the neon canvas.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P rooftop_speakeasy.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("RooftopSpeakeasy")
H, V = 1 / 1.69, .7247                 # map units -> metres across, world heights -> metres up
STEEL = K.mat("PergolaSteel", "#1f4a35", .45, .2)
OAK = K.mat("PergolaOak", "#b98d5c", .55)
OAKD = K.mat("SofaBase", "#6e4a2c", .5)
CREAM = K.mat("Upholstery", "#efe4cf", .8)
VELVET = K.mat("Velvet", "#6b2436", .85)
STONE = K.mat("FireStone", "#3a3f3a", .7)
RIM = K.mat("FireRim", "#d8d2c2", .45)
FLAME = K.mat("Flame", "#ffb35a", .4, 0, 6.)
SIGN = K.mat("SignFace", "#1a1216", .6)
BACKING = K.mat("SignBacking", "#1a1216", .5)

# pergola in map units, relative to its centre
PX, PZ = 2.4, 1.575                    # half spans of the post rectangle (4.8 x 3.15)
PH = 2.75

def sp(name, x0, x1, y0, y1, z0, z1, m, bevel=.012, seg=3):
    """A box over map extents (local to the pergola centre): x along Blender X, z along -Y, y up."""
    return K.box(name, ((x1 - x0) * H, (z1 - z0) * H, (y1 - y0) * V), ((x0 + x1) / 2 * H, -(z0 + z1) / 2 * H, y0 * V), m, bevel, seg)

# ---------- pergola: green steel posts and beams, oak slats ----------
for sx in (-1, 1):
    for sz in (-1, 1):
        x, z = sx * PX, sz * PZ
        sp(f"Post{sx}{sz}", x - .07, x + .07, 0, PH, z - .07, z + .07, STEEL, .01)
        sp(f"PostFoot{sx}{sz}", x - .12, x + .12, 0, .05, z - .12, z + .12, K.BRASS, .008)
        sp(f"PostCollar{sx}{sz}", x - .095, x + .095, PH - .12, PH - .08, z - .095, z + .095, K.BRASS, .006)
for sz, tag in ((-1, "Back"), (1, "Front")):
    z = sz * PZ
    sp(f"Beam{tag}", -PX - .1, PX + .1, PH, PH + .16, z - .07, z + .07, STEEL, .012)
x = -PX + .1; n = 0
while x < PX:
    sp(f"Slat{n}", x - .04, x + .04, PH + .16, PH + .26, -PZ - .3, PZ + .3, OAK, .01)
    x += .38; n += 1

# ---------- LOUNGE sign above the front beam (code paints the neon onto SignFace) ----------
SZF = PZ                                # front beam line (map z1)
sp("SignBar", -1.1, 1.1, PH + .16, PH + .22, SZF - .02, SZF + .06, BACKING, .006)
for bx in (-.8, .8):
    sp(f"SignBracket{bx:+.1f}", bx - .03, bx + .03, PH + .2, PH + .3, SZF + .02, SZF + .06, K.BRASS, .005)
sp("SignBacking", -1.14, 1.14, PH + .2, PH + .8, SZF + .03, SZF + .07, BACKING, .01)
for nm, a in (("SignTrimTop", (-1.16, 1.16, PH + .78, PH + .81)), ("SignTrimBottom", (-1.16, 1.16, PH + .19, PH + .22))):
    sp(nm, a[0], a[1], a[2], a[3], SZF + .025, SZF + .075, K.BRASS, .004)
for ex in (-1.16, 1.13):
    sp(f"SignTrimSide{ex:+.2f}", ex, ex + .03, PH + .19, PH + .81, SZF + .025, SZF + .075, K.BRASS, .004)
SW, SHt, SY = 2.2 * H, .55 * V, (PH + .5) * V
me = bpy.data.meshes.new("SignFace")
me.from_pydata([(-SW / 2, 0, -SHt / 2), (SW / 2, 0, -SHt / 2), (SW / 2, 0, SHt / 2), (-SW / 2, 0, SHt / 2)], [], [(0, 1, 2, 3)])
uv = me.uv_layers.new(name="UVMap")
for li, (u, v) in zip(range(4), ((0, 0), (1, 0), (1, 1), (0, 1))): uv.data[li].uv = (u, v)
sf = K.link(bpy.data.objects.new("SignFace", me), SIGN)
sf.location = (0, -(SZF + .075) * H, SY)       # just in front of the backing, normal toward -Y

# ---------- the L of cream sofas ----------
X0, Z0 = -PX, -PZ                       # p.x0, p.z0 in local terms
def sofa(tag, ax0, ax1, az0, az1, back):
    sp(f"{tag}Base", ax0, ax1, .05, .22, az0, az1, OAKD, .02)
    for fx in (ax0 + .08, ax1 - .08):
        for fz in (az0 + .08, az1 - .08):
            K.cyl(f"{tag}Foot{fx:.2f}{fz:.2f}", .025, .02, .05 * V, (fx * H, -fz * H, 0), K.BRASS, 12)
    # seat cushions, split along the run
    if back == "z0":
        bz0 = az0 + .22; n = max(1, round((ax1 - ax0) / .9)); w = (ax1 - ax0 - .06) / n
        for i in range(n):
            sp(f"{tag}Seat{i}", ax0 + .03 + i * w + .01, ax0 + .03 + (i + 1) * w - .01, .22, .48, bz0, az1 - .03, CREAM, .05, 4)
        sp(f"{tag}Back", ax0, ax1, .22, .92, az0, az0 + .22, CREAM, .07, 4)
        for ex in (ax0, ax1 - .16):     # arms at the open end only
            if ex == ax1 - .16: sp(f"{tag}Arm", ex, ex + .16, .22, .7, az0, az1, CREAM, .06, 4)
    else:
        bx0 = ax0 + .22; n = max(1, round((az1 - az0) / .9)); w = (az1 - az0 - .03) / n
        for i in range(n):
            sp(f"{tag}Seat{i}", bx0, ax1 - .03, .22, .48, az0 + i * w + .01, az0 + (i + 1) * w - .01, CREAM, .05, 4)
        sp(f"{tag}Back", ax0, ax0 + .22, .22, .92, az0, az1, CREAM, .07, 4)
        sp(f"{tag}Arm", ax0, ax1, .22, .7, az1 - .16, az1, CREAM, .06, 4)
sofa("SofaLong", X0 + .25, X0 + 4.3, Z0 + .15, Z0 + .95, "z0")     # p.x1 - .5 = X0 + 4.3
sofa("SofaSide", X0 + .25, X0 + 1.05, Z0 + .95, Z0 + 2.85, "x0")    # p.z1 - .3 = Z0 + 2.85
# velvet cushions, leaning on the backs (code centres: x p.x0+1, 2.6, 3.6 on the long sofa; z p.z0+1.7 on the side)
for i, cx in enumerate((X0 + 1, X0 + 2.6, X0 + 3.6)):
    o = sp(f"Cushion{i}", cx - .16, cx + .16, .46, .8, Z0 + .38, Z0 + .52, VELVET, .05, 4)
    o.rotation_euler.x = -.22
cz = Z0 + 1.7
o = sp("Cushion3", X0 + .48, X0 + .62, .46, .8, cz - .16, cz + .16, VELVET, .05, 4)
o.rotation_euler.y = .22

# ---------- the fire table ----------
FX, FZ = X0 + 2.5, Z0 + 2.05
sp("FireBody", FX - .9, FX + .9, 0, .38, FZ - .45, FZ + .45, STONE, .03)
sp("FirePlinth", FX - .86, FX + .86, 0, .05, FZ - .41, FZ + .41, K.BRASS, .01)
sp("FireRim", FX - .92, FX + .92, .38, .44, FZ - .47, FZ + .47, RIM, .02)
sp("FireBurner", FX - .6, FX + .6, .44, .47, FZ - .15, FZ + .15, K.BRASS, .008)
sp("FireGlass", FX - .52, FX + .52, .47, .49, FZ - .08, FZ + .08, K.DARK, .004)
fl = sp("Flame", FX - .55, FX + .55, .47, .59, FZ - .05, FZ + .05, FLAME, .02, 3)

# ---------- smokers' lounge dressing ----------
GLASS = K.glass("BongGlass", "#eef5f1")
ACCENT = K.mat("BongAccent", "#2f8a4e", .25)
ASH = K.mat("Ash", "#8a8580", .9)
PAPER = K.mat("Papers", "#f4efe2", .7)
TIP = K.mat("PreRollTip", "#d9c7a0", .7)
GRIND = K.mat("Grinder", "#2f6b52", .35, .5)
NUG = K.nug_mesh("LoungeNug")
def at(x, z, y): return (x * H, -z * H, y * V)

def ashtray(tag, x, z, y):
    K.cyl(f"{tag}", .062, .056, .028, at(x, z, y), K.BRASS, 24)
    K.cyl(f"{tag}Well", .045, .045, .004, (x * H, -z * H, y * V + .026), K.DARK, 24)
    K.cyl(f"{tag}AshPile", .02, .008, .006, (x * H + .01, -z * H, y * V + .029), ASH, 12)
    b = K.cyl(f"{tag}Butt", .0045, .0045, .035, (x * H - .03, -z * H - .01, y * V + .032), TIP, 10)
    b.rotation_euler = (0, math.pi / 2, .5)

def preroll(tag, loc, yaw):
    o = K.cyl(tag, .005, .009, .085, loc, PAPER, 12); o.rotation_euler = (0, math.pi / 2, yaw)
    t = K.cyl(tag + "Filter", .005, .005, .015, loc, TIP, 12); t.rotation_euler = (0, -math.pi / 2, yaw)

# on the fire table's cream rim: a brass ashtray at the right end, a rolling tray on the street-side strip
RIMY = .44
ashtray("RimAshtray", FX + .76, FZ - .05, RIMY)
TX, TZ = FX - .3, FZ + .31
sp("RollTray", TX - .22, TX + .22, RIMY, RIMY + .025, TZ - .13, TZ + .13, OAK, .006)
for nm, a in (("RollTrayLipF", (TX - .22, TX + .22, TZ + .11, TZ + .13)), ("RollTrayLipB", (TX - .22, TX + .22, TZ - .13, TZ - .11)),
              ("RollTrayLipL", (TX - .22, TX - .2, TZ - .13, TZ + .13)), ("RollTrayLipR", (TX + .2, TX + .22, TZ - .13, TZ + .13))):
    sp(nm, a[0], a[1], RIMY + .02, RIMY + .05, a[2], a[3], OAK, .003)
sp("Papers", TX - .17, TX - .05, RIMY + .025, RIMY + .04, TZ - .07, TZ - .01, PAPER, .002)
K.cyl("GrinderBody", .028, .028, .022, at(TX + .12, TZ - .03, RIMY + .025), GRIND, 20)
K.cyl("GrinderLid", .029, .029, .008, ((TX + .12) * H, -(TZ - .03) * H, (RIMY + .025) * V + .022), K.BRASS, 20)
preroll("PreRoll0", ((TX - .05) * H, -(TZ + .05) * H, (RIMY + .025) * V + .005), .2)
preroll("PreRoll1", ((TX + .02) * H, -(TZ + .02) * H, (RIMY + .025) * V + .005), -.25)
K.inst("RollTrayNug", NUG, at(TX - .12, TZ + .06, RIMY + .025), (0, 0, .7), .8)

# low oak side tables at the open end of each sofa run
def side_table(tag, x, z):
    sp(f"{tag}Top", x - .25, x + .25, .4, .46, z - .25, z + .25, OAK, .015)
    sp(f"{tag}Shelf", x - .2, x + .2, .1, .13, z - .2, z + .2, OAKD, .008)
    for dx in (-.2, .2):
        for dz in (-.2, .2):
            sp(f"{tag}Leg{dx:+.1f}{dz:+.1f}", x + dx - .025, x + dx + .025, 0, .4, z + dz - .025, z + dz + .025, OAKD, .006)
    return .46
LX, LZ = X0 + 4.6, Z0 + .55            # beyond the long sofa's arm
SX, SZ = X0 + .65, Z0 + 3.12           # beyond the side sofa's arm
top = side_table("SideTableLong", LX, LZ)
# glass bong: beaker base, straight neck, green accent rings and mouthpiece, downstem and brass bowl
bx, by, bz = LX * H, -LZ * H, top * V
K.cyl("BongBase", .048, .022, .09, (bx, by, bz), GLASS, 24)
K.cyl("BongNeck", .019, .019, .2, (bx, by, bz + .09), GLASS, 20)
K.cyl("BongRing", .023, .023, .012, (bx, by, bz + .17), ACCENT, 20)
K.cyl("BongMouth", .021, .025, .03, (bx, by, bz + .29), ACCENT, 20)
K.cyl("BongFoot", .05, .05, .006, (bx, by, bz), ACCENT, 24)
ds = K.cyl("BongDownstem", .007, .007, .07, (bx - .012, by - .012, bz + .03), GLASS, 10); ds.rotation_euler = (.6, -.6, 0)
K.cyl("BongBowl", .009, .017, .02, (bx - .045, by - .045, bz + .075), K.BRASS, 14)
top = side_table("SideTableSide", SX, SZ)
ashtray("SideAshtray", SX - .1, SZ + .08, top)
jx, jy, jz = (SX + .1) * H, -(SZ - .08) * H, top * V
K.cyl("BudJar", .04, .04, .085, (jx, jy, jz), GLASS, 24)
K.cyl("BudJarLid", .042, .042, .018, (jx, jy, jz + .085), K.BRASS, 24)
for i, (dx, dy) in enumerate(((0, 0), (.016, .012), (-.014, .01), (.004, -.016))):
    K.inst(f"BudJarNug{i}", NUG, (jx + dx, jy + dy, jz + .004 + (.03 if i == 0 else 0)), (0, 0, i * 1.3), .55)

K.finish(OUT, "rooftop_speakeasy", ortho=4.4, centre=(0, 0, 1.0))
