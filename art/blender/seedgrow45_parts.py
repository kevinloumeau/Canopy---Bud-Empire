"""Pieces shared by the tier 4 / tier 5 seeds and grow benches: a forest-green lacquered cabinet with brass-framed
panels and a cream stone top, brass trim, and a brass leaf logo.  Keep next to canopy_kit.py; call after K.begin()."""
import math
import bpy
import canopy_kit as K

def mats():
    m = dict(
        LACQUER=K.mat("GreenLacquer", "#235c42", .32), LACQUER_D=K.mat("GreenLacquerDeep", "#183f2e", .4),
        TOPSTONE=K.mat("CreamTop", "#f0d9a8", .4), LED=K.mat("LedPanel", "#fff4dc", .3, 0, 4.), GROWLED=K.mat("GrowLed", "#ffd6f0", .3, 0, 3.),
        WHITE=K.mat("Humidifier", "#ece6d6", .45), DRIP=K.mat("DripLine", "#20272a", .5))
    g = K.mat("ClearPanel", "#eef6f1", .06)
    b = g.node_tree.nodes["Principled BSDF"]; b.inputs["Alpha"].default_value = .16; b.inputs["Coat Weight"].default_value = .7
    if hasattr(g, "blend_method"): g.blend_method = "BLEND"
    m["CLEAR"] = g
    return m

def cabinet(M, L, D, H, panels=3, top_over=.1):
    """Green lacquer cabinet on a walnut plinth: brass-framed raised panels on the front (-Y) and end (+X), brass
    corner posts, a brass band and a thick cream top.  Returns the height of the top surface."""
    K.box("Plinth", (L + .1, D + .1, .1), (0, 0, 0), K.WOOD_D, .02)
    K.box("PlinthBrass", (L + .1, D + .1, .02), (0, 0, .1), K.BRASS, .006)
    K.box("Body", (L, D, H - .14), (0, 0, .12), M["LACQUER"], .012)
    pw = (L - .1) / panels
    for i in range(panels):
        cx = -L / 2 + .05 + pw * (i + .5)
        K.box(f"Panel{i}", (pw - .06, .02, H - .36), (cx, -D / 2 - .008, .18), M["LACQUER_D"], .008)
        for dz in (.2, H - .2):
            K.box(f"PanelH{i}{dz:.2f}", (pw - .1, .022, .014), (cx, -D / 2 - .018, dz - .007), K.BRASS, .004)
        for dx in (-(pw - .1) / 2, (pw - .1) / 2):
            K.box(f"PanelV{i}{dx:.2f}", (.014, .022, H - .4), (cx + dx, -D / 2 - .018, .2), K.BRASS, .004)
        K.cyl(f"Knob{i}", .018, .018, .02, (cx, -D / 2 - .03, H * .55), K.BRASS, 12).rotation_euler.x = math.pi / 2
    K.box("EndPanel", (.02, D - .14, H - .36), (L / 2 + .008, 0, .18), M["LACQUER_D"], .008)
    for sx in (-1, 1):
        for sy in (-1, 1):
            K.box(f"Corner{sx}{sy}", (.05, .05, H - .16), (sx * L / 2, sy * D / 2, .12), K.BRASS, .01)
    K.box("TopBand", (L + .06, D + .06, .03), (0, 0, H - .04), K.BRASS, .008)
    K.box("Top", (L + top_over * 2, D + top_over * 2, .08), (0, 0, H - .02), M["TOPSTONE"], .035, 4)
    return H + .06

def leaf_logo(name, loc, size=.14):
    """A flat brass fan leaf standing up on a -Y face."""
    me = K.fan_leaf_mesh(name + "Mesh", K.BRASS, 7, size)
    o = bpy.data.objects.new(name, me); K.link(o)
    o.location = loc; o.rotation_euler = (math.pi / 2, 0, 0)
    return o
