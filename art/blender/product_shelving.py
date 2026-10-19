"""Canopy product shelving: the ground floor's five-bay oak product wall, modelled from the current sprite.

Five oak cabinets side by side, each with a cupboard or drawers below and open shelves above on a deep green back:
jars of buds, pouches, an arched lit niche with one big jar on a round plinth, boxed goods, and tinctures with tubs.
The long face looks toward Blender -Y (map +z); the back sits against the wall at +Y.  Origin is the centre of the
footprint on the floor.  Every jar, pouch, box and bottle hangs under the empty "Goods" so code can hide them.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P product_shelving.py -- OUT_DIR
or open it in Blender's Scripting tab and press Run.
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy
import canopy_kit as K

OUT = K.begin("ProductShelving")
rnd = K.rnd
BACK = K.mat("BayBack", "#24513c", .6)
OAK_L = K.mat("OakHoney", "#d29d5e", .5)
CARCASS = K.mat("OakCarcass", "#c38a4c", .55)
SHELF = K.mat("ShelfOak", "#cf9f66", .55)
NICHE = K.mat("NicheGlow", "#ffd88f", .3, 0, 9.)
NICHE_WASH = K.mat("NicheWash", "#c9b36a", .5, 0, .9)
POUCH_W = K.mat("PouchCream", "#f1ead8", .55)
POUCH_G = K.mat("PouchGreen", "#2f6a4a", .5)
LID = K.mat("JarLid", "#d4a94f", .3, 1.)
AMBER = K.mat("Amber", "#6e3416", .25)
DROPPER = K.mat("Dropper", "#2b2826", .4)
LABEL = K.mat("Label", "#f3ead6", .6)
LOGO = K.mat("LogoGold", "#c9a14a", .35, .8, two_sided=True)

W, D, H = 8.5 / 1.69, .64 / 1.69, 3.3 * 1.2247 / 1.69      # 5.030 x 0.379 x 2.392 m, from shell.js shelving()
BAYS = 5; BW = W / BAYS
Y0, Y1 = -D / 2, D / 2                                     # front and back faces
POST = .05; BASE_H = .78; CROWN = .09
goods = bpy.data.objects.new("Goods", None); K.link(goods)

def good(o):
    o.parent = goods; return o

# ---------- shared meshes for the goods (linked, so the glb stays small) ----------
nug = K.NUG_MESH
logo_me = K.fan_leaf_mesh("Logo", LOGO, 7, .5)
LEAF_CREAM = K.mat("LogoCream", "#f3ead6", .5, two_sided=True); LEAF_GREEN = K.mat("LogoGreen", "#2a6446", .5, two_sided=True)
logo_cream = K.fan_leaf_mesh("LogoCream", LEAF_CREAM, 7, .5); logo_green = K.fan_leaf_mesh("LogoGreen", LEAF_GREEN, 7, .5)
# brighter buds and a pale, reflective, partly see-through jar glass so the jars read light like the sprite
for name, hexcol in (("DriedBud", "#a3bd5a"), ("DriedBudDeep", "#759443"), ("Trichomes", "#d6dc9f")):
    m = bpy.data.materials[name]; h = hexcol.lstrip("#")
    m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*[((int(h[i:i+2], 16) / 255 + .055) / 1.055) ** 2.4 for i in (0, 2, 4)], 1)
JARGLASS = K.mat("JarGlass", "#eef4ee", .08)
_b = JARGLASS.node_tree.nodes["Principled BSDF"]; _b.inputs["Alpha"].default_value = .14; _b.inputs["Coat Weight"].default_value = .6
if hasattr(JARGLASS, "blend_method"): JARGLASS.blend_method = "BLEND"
FRAME = K.mat("OakFaceFrame", "#b27a40", .5)

def jar(tag, x, y, z, r, h):
    """A glass jar with a gold lid, packed with buds."""
    b = good(K.cyl(f"{tag}Glass", r, r, h, (x, y, z), JARGLASS, 20))
    good(K.cyl(f"{tag}Lid", r * 1.04, r * 1.04, h * .17, (x, y, z + h), LID, 20))
    n = 3 if r < .045 else 6
    for i in range(n):
        a = i * 2.1 + rnd.uniform(0, .5); rr = r * (.0 if i == 0 else .38)
        lvl = (i // 3) * h * .38
        good(K.inst(f"{tag}Nug{i}", nug, (x + rr * math.cos(a), y + rr * math.sin(a), z + .005 + lvl), (0, 0, rnd.uniform(0, 6)), r / .042 * .58))
    return b

def pouch(tag, x, y, z, w, h, m):
    o = good(K.box(f"{tag}", (w, .05, h), (x, y, z), m, .012))
    lg = good(K.inst(f"{tag}Logo", logo_cream if m is POUCH_G else logo_green, (x, y - .029, z + h * .3), (math.pi / 2, 0, 0), w * .8))
    lg.scale.z *= .08                                       # flatten the leaf's droop so it lies on the pouch face
    return o

def boxed(tag, x, y, z, w, d, h, m):
    good(K.box(tag, (w, d, h), (x, y, z), m, .006))
    lg = good(K.inst(f"{tag}Logo", logo_cream if m is POUCH_G else logo_green, (x, y - d / 2 - .004, z + h * .3), (math.pi / 2, 0, 0), w * .55))
    lg.scale.z *= .08

def tincture(tag, x, y, z, k=1.6):
    good(K.cyl(f"{tag}Bottle", .018 * k, .018 * k, .07 * k, (x, y, z), AMBER, 12))
    good(K.cyl(f"{tag}Label", .0185 * k, .0185 * k, .03 * k, (x, y, z + .015 * k), LABEL, 12))
    good(K.cyl(f"{tag}Neck", .01 * k, .01 * k, .015 * k, (x, y, z + .07 * k), AMBER, 10))
    good(K.cyl(f"{tag}Cap", .011 * k, .008 * k, .045 * k, (x, y, z + .085 * k), DROPPER, 10))

def tub(tag, x, y, z, k=1.7):
    good(K.cyl(f"{tag}Tub", .032 * k, .032 * k, .1 * k, (x, y, z), POUCH_W, 20))
    good(K.cyl(f"{tag}Lid", .033 * k, .033 * k, .022 * k, (x, y, z + .1 * k), LID, 20))

# ---------- the five oak cabinets ----------
def shelf(tag, x0, x1, z):
    K.box(tag, (x1 - x0, D - .03, .028), ((x0 + x1) / 2, .0, z - .028), SHELF, .006)
    K.box(tag + "Lip", (x1 - x0, .02, .036), ((x0 + x1) / 2, Y0 + .025, z - .034), OAK_L, .006)

def pull(tag, x, z, horizontal=False):
    if horizontal:
        K.tube(tag, [(x - .1, Y0 - .02, z), (x + .1, Y0 - .02, z)], .007, K.BRASS)
        for dx in (-.1, .1): K.cyl(f"{tag}F{dx}", .008, .008, .018, (x + dx, Y0 - .02, z), K.BRASS, 10).rotation_euler.x = -math.pi / 2
    else:
        o = K.cyl(tag, .017, .014, .022, (x, Y0 - .002, z), K.BRASS, 16); o.rotation_euler.x = math.pi / 2

def doors(tag, x0, x1):
    w = (x1 - x0 - .02) / 2
    for i in range(2):
        cx = x0 + .01 + w * (i + .5)
        K.box(f"{tag}Door{i}", (w - .012, .022, BASE_H - .14), (cx, Y0 - .004, .08), OAK_L, .008)
        K.box(f"{tag}DoorInset{i}", (w - .09, .012, BASE_H - .26), (cx, Y0 - .016, .14), K.OAK, .006)
        pull(f"{tag}Knob{i}", cx + (w / 2 - .06) * (1 if i == 0 else -1), BASE_H - .2)

def drawers(tag, x0, x1):
    h = (BASE_H - .14) / 2
    for i in range(2):
        z = .08 + h * i
        K.box(f"{tag}Drawer{i}", (x1 - x0 - .02, .022, h - .014), ((x0 + x1) / 2, Y0 - .004, z + .007), OAK_L, .008)
        pull(f"{tag}Pull{i}", (x0 + x1) / 2, z + h / 2, True)

for b in range(BAYS):
    x0 = -W / 2 + b * BW; x1 = x0 + BW; cx = (x0 + x1) / 2
    ix0, ix1 = x0 + POST, x1 - POST                       # inside faces of the side panels
    for sx in (x0, x1 - POST):                            # side panels, full depth, slightly proud at the front
        K.box(f"Side{b}{sx:.2f}", (POST, D - .02, H - CROWN), (sx + POST / 2, .01, 0), CARCASS, .01)
        K.box(f"FaceFrame{b}{sx:.2f}", (POST + .004, .022, H - CROWN), (sx + POST / 2, Y0 + .009, 0), FRAME, .008)
    K.box(f"Plinth{b}", (BW - .01, D - .01, .06), (cx, .005, 0), CARCASS, .01)
    K.box(f"Back{b}", (BW - 2 * POST, .02, H - CROWN - BASE_H), (cx, Y1 - .012, BASE_H), BACK, .004)
    K.box(f"BaseBody{b}", (BW - 2 * POST, D - .03, BASE_H - .1), (cx, .015, .06), K.OAK, .006)
    K.box(f"Crown{b}", (BW - .004, D + .03, CROWN), (cx, -.015, H - CROWN), OAK_L, .015)
    K.box(f"CrownBand{b}", (BW - .02, D + .005, .02), (cx, -.005, H - CROWN - .02), K.OAK, .006)
    K.box(f"Counter{b}", (BW - 2 * POST + .004, D - .01, .035), (cx, .0, BASE_H - .035), OAK_L, .008)
    (drawers if b in (1, 3) else doors)(f"Bay{b}", ix0, ix1)
    top = BASE_H; ceil = H - CROWN; yb = .03                # goods sit a touch back of centre
    if b == 0:      # jars of buds, three shelves
        zs = [top + (ceil - top) * k / 3 for k in range(3)]
        for k, z in enumerate(zs):
            if k: shelf(f"Shelf{b}{k}", ix0, ix1, z)
            xs = ix0 + .03
            for j, (r, h) in enumerate(((.095, .26), (.08, .22), (.06, .17), (.066, .19))):
                jar(f"Jar{b}{k}{j}", xs + r, yb - (.05 if j % 2 else 0), z, r, h); xs += 2 * r + .03
    elif b == 1:    # pouches, three shelves
        zs = [top + (ceil - top) * k / 3 for k in range(3)]
        for k, z in enumerate(zs):
            if k: shelf(f"Shelf{b}{k}", ix0, ix1, z)
            xs = ix0 + .07
            for j in range(3):
                w = .27 if (j + k) % 3 == 0 else .2; h = .44 if w > .22 else .36
                pouch(f"Pouch{b}{k}{j}", xs + w / 2, yb - (.05 if j % 2 else 0), z, w, h, POUCH_W if (j + k) % 2 == 0 else POUCH_G)
                xs += w + .05
    elif b == 2:    # the arched, lit niche with one big jar on a round plinth
        nz0, nz1 = top + .05, ceil - .18; nw = BW - 2 * POST - .12; r = nw / 2
        K.box("NicheBack", (nw, .02, nz1 - nz0 - r), (cx, Y1 - .03, nz0), BACK, .004)
        # oak surround: two jambs and a frame with an arched opening, built as a mesh
        fw = BW - 2 * POST
        verts, faces = [], []
        prof = [(cx - r, nz0)] + [(cx - r * math.cos(t * math.pi / 16), nz1 - r + r * math.sin(t * math.pi / 16)) for t in range(17)] + [(cx + r, nz0)]
        outer = [(cx - fw / 2, nz0)] + [(cx - fw / 2 + fw * (1 - math.cos(t * math.pi / 16)) / 2, ceil) if 0 < t < 16 else ((cx - fw / 2, ceil) if t == 0 else (cx + fw / 2, ceil)) for t in range(17)] + [(cx + fw / 2, nz0)]
        n = len(prof)
        for yy in (Y0 + .005, Y0 + .06):
            verts += [(px, yy, pz) for px, pz in prof] + [(px, yy, pz) for px, pz in outer]
        for i in range(n - 1):
            a, bq, c, d = i, i + 1, n + i + 1, n + i
            faces.append((a, bq, c, d)); faces.append(tuple(v + 2 * n for v in (d, c, bq, a)))
            faces.append((a + 2 * n, bq + 2 * n, bq, a))  # inner reveal
        me = bpy.data.meshes.new("NicheFrame"); me.from_pydata(verts, [], faces)
        o = K.link(bpy.data.objects.new("NicheFrame", me), OAK_L)
        # rounded back of the niche: a half cylinder of glow
        ar = K.cyl("NicheVault", r, r, .02, (cx, Y1 - .03, nz1 - r), BACK, 32); ar.rotation_euler.x = -math.pi / 2
        for sx in (-1, 1):
            K.box(f"NicheReveal{sx}", (.02, D - .1, nz1 - r - nz0), (cx + sx * (r + .01), .02, nz0), K.OAK, .004)
        K.box("NicheLight", (r * 1.4, .05, .015), (cx, Y1 - .1, nz1 - .04), NICHE, .004)
        K.box("NicheWash", (nw - .04, .006, .6), (cx, Y1 - .042, nz1 - r - .55), NICHE_WASH, .002)
        wv = K.cyl("NicheWashVault", r - .02, r - .02, .006, (cx, Y1 - .042, nz1 - r), NICHE_WASH, 32); wv.rotation_euler.x = -math.pi / 2
        K.cyl("Plinth", .18, .18, .3, (cx, .0, top), OAK_L, 40)
        K.cyl("PlinthTop", .186, .186, .02, (cx, .0, top + .3), CARCASS, 40)
        jar("HeroJar", cx, .0, top + .32, .13, .34)
    elif b == 3:    # boxed goods in a split bay
        zs = [top + (ceil - top) * k / 3 for k in range(3)]
        K.box("Divider3", (.03, D - .04, ceil - top), (cx + .03, .02, top), K.OAK, .006)
        for k, z in enumerate(zs):
            if k: shelf(f"Shelf{b}{k}L", ix0, cx + .015, z); shelf(f"Shelf{b}{k}R", cx + .045, ix1, z)
            boxed(f"BoxA{b}{k}", ix0 + .1, yb, z, .15, .15, .2 if k % 2 else .15, POUCH_W)
            boxed(f"BoxB{b}{k}", ix0 + .27, yb - .04, z, .15, .14, .14, POUCH_G)
            if k != 1:
                boxed(f"BoxC{b}{k}", cx + .22, yb, z, .2, .14, .24, POUCH_W)
            else:
                for j in range(4): boxed(f"BoxS{b}{k}{j}", cx + .12 + j * .065, yb, z, .058, .14, .26, POUCH_W if j % 2 else POUCH_G)
    else:           # tinctures and tubs, two shelves
        zs = [top + (ceil - top) * k / 2 for k in range(2)]
        for k, z in enumerate(zs):
            if k: shelf(f"Shelf{b}{k}", ix0, ix1, z)
            z = z + (.04 if k == 0 else 0)
            K.box(f"Tray{b}{k}", (.44, .24, .02), (ix0 + .25, yb - .03, z), OAK_L, .006)
            for j in range(8):
                tincture(f"T{b}{k}{j}", ix0 + .1 + (j % 4) * .1, yb - .08 + (j // 4) * .1, z + .02)
            for j in range(2): tub(f"Tub{b}{k}{j}", ix1 - .3 + j * .14, yb - (.05 if j else 0), z)
        K.box(f"Shelf{b}Low", (ix1 - ix0, D - .03, .028), (cx, 0, top + .012), SHELF, .006)

K.finish(OUT, "product_shelving", ortho=5.2, centre=(0, 0, 1.2))
