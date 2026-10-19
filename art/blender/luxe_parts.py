"""Shared pieces for the tier 4 (Lv 50) and tier 5 (Lv 75) station looks: glowing leaf logos, glass jars of buds,
fluted fronts, light strips and marble tops.  Needs canopy_kit.py (call K.begin first) in the same folder."""
import math, bmesh, bpy
from mathutils import Vector
import canopy_kit as K

_MATS = {}
def mats():
    """The extra materials the luxe tiers share, made once per scene."""
    if not _MATS:
        _MATS.update(
            MARBLE=K.mat("Marble", "#f4eee2", .22),
            VEIN=K.mat("MarbleVein", "#cfc4ae", .3),
            LEAFGLOW=K.mat("LeafGlow", "#bfe6a0", .4, 0, 3.5),
            BACKLIGHT=K.mat("Backlight", "#ffe2a8", .4, 0, 2.2),
            LED=K.mat("LedStrip", "#ffd79a", .4, 0, 4.),
            FLUTE=K.mat("FlutedOak", "#c99862", .5),
            TILE=K.mat("GreenTile", "#2f7350", .2),
            GROUT=K.mat("Grout", "#d9d2bf", .7),
            POLISH=K.mat("PolishedBrass", "#e2b75a", .16, 1.),
            JARGLASS=K.mat("JarGlass", "#e8f1ec", .08),
        )
        b = _MATS["JARGLASS"].node_tree.nodes["Principled BSDF"]
        b.inputs["Alpha"].default_value = .22
        b.inputs["Coat Weight"].default_value = 1.
        _MATS["JARGLASS"].surface_render_method = "BLENDED"
    return _MATS

_LEAF = {}
def leaf_logo(name, loc, size, m, facing="-Y"):
    """A flat seven-point leaf (one shared mesh, about 200 triangles) standing upright, its face toward -Y or +X."""
    if m.name not in _LEAF:
        me = _LEAF[m.name] = K.fan_leaf_mesh("LeafLogo" + m.name, m, 7, .5)
        for v in me.vertices: v.co.z = 0.          # flatten the droop into a clean logo
        ys = [v.co.y for v in me.vertices]; cy = (min(ys) + max(ys)) / 2
        for v in me.vertices: v.co.y -= cy         # centre it, so loc is the logo's middle
    rot = (math.pi / 2, 0, 0) if facing == "-Y" else (math.pi / 2, 0, math.pi / 2)
    return K.inst(name, _LEAF[m.name], loc, rot, size)

def roundel(name, loc, r, back, ring, facing="-Y"):
    """A disc plate with a ring, face toward -Y (or +X): the setting for a glowing leaf."""
    d = K.cyl(name, r, r, .03, (0, 0, 0), back, 32)
    d2 = K.cyl(name + "Ring", r + .02, r + .02, .022, (0, 0, 0), ring, 32)
    for o in (d, d2):
        o.location = loc
        o.rotation_euler = (math.pi / 2, 0, 0) if facing == "-Y" else (0, math.pi / 2, 0)
    return d

def jar(tag, x, y, z, r=.06, h=.15, n=3, lid=None):
    """A clear jar with a brass lid and a few low-poly nugs inside."""
    M = mats()
    K.cyl(f"{tag}Glass", r, r, h, (x, y, z), M["JARGLASS"], 20)
    K.cyl(f"{tag}Lid", r + .006, r + .006, .03, (x, y, z + h), lid or K.BRASS, 20)
    K.cyl(f"{tag}Knob", r * .35, r * .35, .02, (x, y, z + h + .03), lid or K.BRASS, 12)
    for i in range(n):
        a = i * 2.1 + x * 7
        K.inst(f"{tag}Nug{i}", K.NUG_MESH, (x + math.cos(a) * r * .35, y + math.sin(a) * r * .35, z + .01 + (i // 3) * .045),
               (0, 0, a), r / .06 * .9)

def fluted(tag, x0, x1, y, z0, h, step=.06, r=.024, m=None, facing="-Y"):
    """A run of vertical half-round flutes on a face toward -Y (along x from x0 to x1) or +X (along y)."""
    m = m or mats()["FLUTE"]
    n = max(2, int(round((x1 - x0) / step)))
    for i in range(n):
        p = x0 + (x1 - x0) * (i + .5) / n
        c = K.cyl(f"{tag}{i}", r, r, h, (0, 0, 0), m, 10)
        c.location = (p, y, z0) if facing == "-Y" else (y, p, z0)

def tile_band(tag, x0, x1, y, z0, h, rows=2, w=.1, facing="-Y"):
    """Green glazed tiles with cream grout on a face toward -Y (along x) or +X (along y): a backing slab and
    thin grout bars, so it stays a handful of triangles."""
    M = mats(); L = x1 - x0; c = (x0 + x1) / 2
    if facing == "-Y":
        K.box(f"{tag}", (L, .02, h), (c, y, z0), M["TILE"], .004)
        for k in range(1, rows): K.box(f"{tag}H{k}", (L, .024, .008), (c, y - .002, z0 + h * k / rows - .004), M["GROUT"], 0)
        n = int(L / w)
        for k in range(1, n): K.box(f"{tag}V{k}", (.008, .024, h), (x0 + L * k / n, y - .002, z0), M["GROUT"], 0)
    else:
        K.box(f"{tag}", (.02, L, h), (y, c, z0), M["TILE"], .004)
        for k in range(1, rows): K.box(f"{tag}H{k}", (.024, L, .008), (y + .002, c, z0 + h * k / rows - .004), M["GROUT"], 0)
        n = int(L / w)
        for k in range(1, n): K.box(f"{tag}V{k}", (.024, .008, h), (y + .002, x0 + L * k / n, z0), M["GROUT"], 0)

def marble_top(tag, size, loc, bevel=.03):
    """A cream marble top with a couple of soft grey veins laid on it."""
    M = mats()
    o = K.box(tag, size, loc, M["MARBLE"], bevel, 4)
    x, y, z = loc; sx, sy, sz = size
    for i, (dx, dy, a, l) in enumerate(((-.2, .05, .5, .5), (.25, -.08, -.35, .4))):
        v = K.box(f"{tag}Vein{i}", (sx * l, .008, .002), (x + sx * dx, y + sy * dy, z + sz), M["VEIN"], 0)
        v.rotation_euler.z = a
    return o
