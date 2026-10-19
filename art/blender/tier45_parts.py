"""Shared parts for the harvest and pack benches' tier 4 and tier 5 looks (Lv 50 and Lv 75).

The cabinets keep tier 3's footprints (harvest 1.9 x 0.86 m, pack 1.8 x 0.92 m) so every tier sits in the same spot,
facing -Y like the rest.  Import after canopy_kit's begin(): these helpers use its palette and low-poly buds.
"""
import math, bpy
import canopy_kit as K

rnd = K.rnd

def nug(name, x, y, z, s=1.0):
    return K.inst(name, K.NUG_MESH, (x, y, z), (rnd.uniform(-.4, .4), rnd.uniform(-.4, .4), rnd.uniform(0, 6.3)), s * rnd.uniform(.85, 1.15))

def jar(tag, x, y, z, r=.07, h=.16, lid=None, band=None, n=7):
    """A glass curing jar of buds with a lid (brass by default) and an optional coloured band."""
    K.cyl(tag + "Glass", r, r, h, (x, y, z), K.GLASS, 24)
    for i in range(n):
        a = i * 2.4; rr = r * .45 * (i % 3) / 2
        nug(f"{tag}Nug{i}", x + math.cos(a) * rr, y + math.sin(a) * rr, z + .01 + (i // 3) * h * .34, r / .08 * .9)
    if band: K.cyl(tag + "Band", r + .002, r + .002, .025, (x, y, z + h - .04), band, 24)
    K.cyl(tag + "Lid", r + .004, r + .004, .035, (x, y, z + h), lid or K.BRASS, 24)

def tray(tag, x, y, z, w=.3, d=.26, n=7, m=None):
    K.box(tag, (w, d, .05), (x, y, z), m or K.GREEN_D, .01)
    for dx, dy, ww, dd in ((0, d / 2 + .005, w + .02, .014), (0, -d / 2 - .005, w + .02, .014), (w / 2 + .005, 0, .014, d), (-w / 2 - .005, 0, .014, d)):
        K.box(f"{tag}Rim{dx:.2f}{dy:.2f}", (ww, dd, .014), (x + dx, y + dy, z + .045), K.BRASS, .004)
    for i in range(n):
        nug(f"{tag}Nug{i}", x + rnd.uniform(-w * .32, w * .32), y + rnd.uniform(-d * .3, d * .3), z + .045)

def branch(tag, x, y, ztop, length=.42, colas=3):
    """A harvested branch hung upside down from a hook: stem, colas pointing down, a few drying leaves."""
    K.tube(tag + "Hook", [(x, y, ztop + .03), (x, y + .02, ztop - .01), (x, y, ztop - .03)], .006, K.BRASS)
    bot = ztop - length
    K.tube(tag + "Stem", [(x, y, ztop - .03), (x + rnd.uniform(-.02, .02), y, bot)], .008, K.STEM, .005)
    for i in range(colas):
        t = .3 + .7 * i / max(1, colas - 1); z = ztop - .03 - (length - .03) * t
        side = (1 if i % 2 else -1) * (.03 if i < colas - 1 else 0)
        K.inst(f"{tag}Cola{i}", K.BUD_MESH, (x + side, y + rnd.uniform(-.015, .015), z + .17 * .62), (math.pi + rnd.uniform(-.25, .25), rnd.uniform(-.2, .2), rnd.uniform(0, 6)), .62 + .1 * (i == colas - 1))
    for i in range(3):
        z = ztop - .06 - length * .22 * i
        K.leaf_at(f"{tag}Leaf{i}", (x, y, z), rnd.uniform(0, 6.3), -.55 - rnd.uniform(0, .25), .7, K.LEAF_MESHES[2])

def brass_leaf_mesh(name="BrassLeaf"):
    """The fan leaf in brass, for logos."""
    me = K.LEAF_MESHES[2].copy(); me.name = name; me.materials[0] = K.BRASS
    return me

def logo_plate(tag, x, y, z, w=.24, h=.16, face="-y"):
    """A forest-green plaque with a brass frame and a brass leaf, on the -Y face (front) of a cabinet."""
    K.box(tag, (w, .02, h), (x, y - .01, z), K.GREEN_D, .006)
    K.box(tag + "Frame", (w + .02, .012, h + .02), (x, y - .002, z - .01), K.BRASS, .004)
    o = bpy.data.objects.new(tag + "Leaf", brass_leaf_mesh(tag + "LeafMesh")); K.col.objects.link(o)
    o.location = (x, y - .024, z + .02); o.rotation_euler = (math.pi / 2, 0, 0); o.scale = (h / .2,) * 3
    return o

# ---------- the two cabinets (tier 3 footprints) ----------

def harvest_cabinet(walnut=False):
    """Tier 3's harvest cabinet: green (or walnut, tier 5) body with brass-railed drawers and brass corner posts.
    Returns the worktop height."""
    L, D, H = 1.9, .86, .78
    body = K.WOOD if walnut else K.GREEN
    K.box("Plinth", (L + .08, D + .08, .08), (0, 0, 0), K.WOOD_D, .015)
    K.box("Body", (L, D, H - .08), (0, 0, .08), body, .012)
    K.box("BaseBrass", (L + .02, D + .02, .03), (0, 0, .08), K.BRASS, .008)
    DW = (L - .12) / 3
    for i in range(3):
        cx = -L / 2 + .06 + DW * (i + .5)
        K.box(f"Drawer{i}", (DW - .06, .02, .48), (cx, -D / 2 - .008, .17), body, .008)
        if walnut: K.box(f"DrawerInset{i}", (DW - .16, .01, .38), (cx, -D / 2 - .016, .22), K.WOOD_D, .006)
        for dz in (.17, .65):
            K.box(f"RailH{i}{dz}", (DW - .04, .024, .02), (cx, -D / 2 - .016, dz - .01), K.BRASS, .006)
        for dx in (-(DW - .06) / 2, (DW - .06) / 2):
            K.box(f"RailV{i}{dx:.2f}", (.02, .024, .48), (cx + dx, -D / 2 - .016, .17), K.BRASS, .006)
        K.box(f"Pull{i}", (.11, .04, .045), (cx, -D / 2 - .03, .5), K.BRASS, .02)
    K.box("EndDrawer", (.02, D - .14, .48), (L / 2 + .008, 0, .17), body, .008)
    for dz in (.17, .65): K.box(f"EndRailH{dz}", (.024, D - .12, .02), (L / 2 + .016, 0, dz - .01), K.BRASS, .006)
    for dy in (-(D - .14) / 2, (D - .14) / 2): K.box(f"EndRailV{dy:.2f}", (.024, .02, .48), (L / 2 + .016, dy, .17), K.BRASS, .006)
    K.box("EndPull", (.04, .11, .045), (L / 2 + .03, 0, .5), K.BRASS, .02)
    for sx in (-1, 1):
        for sy in (-1, 1):
            K.cyl(f"Column{sx}{sy}", .028, .028, H - .12, (sx * L / 2, sy * D / 2, .1), K.BRASS, 16)
    K.box("TopBand", (L + .1, D + .1, .04), (0, 0, H), K.BRASS, .01)
    K.box("Top", (L + .12, D + .12, .06), (0, 0, H + .035), K.STONE, .028, 4)
    return H + .095, L, D

def pack_cabinet(green_panels=False):
    """Tier 3's pack cabinet: walnut with brass columns and drawers (green drawer insets for tier 5).
    Returns the worktop height."""
    L, D, H = 1.8, .92, .78
    K.box("Plinth", (L + .1, D + .1, .1), (0, 0, 0), K.WOOD_D, .02)
    K.box("PlinthBrass", (L + .11, D + .11, .02), (0, 0, .1), K.BRASS, .006)
    K.box("Body", (L, D, H - .12), (0, 0, .12), K.WOOD, .01)
    DW = (L - .16) / 3
    for i in range(3):
        cx = -L / 2 + .08 + DW * (i + .5)
        K.box(f"Drawer{i}", (DW - .05, .02, .46), (cx, -D / 2 - .008, .2), K.WOOD, .008)
        K.box(f"DrawerInset{i}", (DW - .14, .01, .36), (cx, -D / 2 - .016, .25), K.GREEN_D if green_panels else K.WOOD_D, .006)
        K.box(f"Pull{i}", (.18, .035, .035), (cx, -D / 2 - .04, .44), K.BRASS, .016)
    K.box("EndPanel", (.02, D - .16, .46), (L / 2 + .008, 0, .2), K.WOOD, .008)
    K.box("EndInset", (.01, D - .26, .36), (L / 2 + .016, 0, .25), K.GREEN_D if green_panels else K.WOOD_D, .006)
    for sx in (-1, 1):
        for sy in (-1, 1):
            K.cyl(f"Column{sx}{sy}", .03, .03, H - .16, (sx * L / 2, sy * D / 2, .12), K.BRASS, 16)
    for x in (-L / 2 + .08 + DW, -L / 2 + .08 + 2 * DW):
        K.cyl(f"Divider{x:.2f}", .022, .022, H - .16, (x, -D / 2, .12), K.BRASS, 16)
    K.box("TopBand", (L + .08, D + .08, .03), (0, 0, H - .04), K.BRASS, .008)
    K.box("Top", (L + .14, D + .14, .08), (0, 0, H - .01), K.STONE, .035, 4)
    return H + .07, L, D

def pouch(tag, x, y, z, m, w=.11, d=.045, h=.16, label=None):
    """A stand-up pouch: a slim box with a brass zip strip and a label band."""
    K.box(tag, (w, d, h), (x, y, z), m, .01)
    K.box(tag + "Zip", (w + .004, d * .6, .012), (x, y, z + h - .03), K.BRASS, .003)
    K.box(tag + "Label", (w * .7, .004, h * .32), (x, y - d / 2 - .001, z + h * .3), label or K.CREAM, .002)

def tin(tag, x, y, z, r=.05, h=.06, lid=None):
    K.cyl(tag, r, r, h, (x, y, z), K.BRASS, 20)
    K.cyl(tag + "Lid", r + .003, r + .003, .02, (x, y, z + h), lid or K.GREEN, 20)
