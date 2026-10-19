"""Canopy cafe set: scalloped terracotta parasol on a green base between two brass bistro tables, each with two rattan chairs.

Needs canopy_kit.py in the same folder.  Run headless with  blender -b -P street_cafe_awning.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))   # find canopy_kit.py next to this file
except NameError: pass
import bpy, bmesh
from mathutils import Vector
import canopy_kit as K
OUT = K.begin("StreetCafeAwning")
TC = K.mat("ParasolRed", "#d25f4a", .6); CRM = K.mat("ParasolCream", "#f2e6c8", .55)
RATTAN = K.mat("Rattan", "#c99256", .55); SEATG = K.mat("SeatWeave", "#2f6648", .7); TOPC = K.mat("TableCream", "#f0e6cf", .5)
WOODP = K.mat("PoleWood", "#c48a55", .5)
K.cyl("Base", .26, .3, .08, (0, 0, 0), K.GREEN, 40)
K.cyl("BaseTop", .12, .2, .06, (0, 0, .08), K.GREEN, 32)
K.cyl("Pole", .028, .028, 2.35, (0, 0, .14), WOODP, 16)
K.cyl("PoleCollar", .04, .04, .06, (0, 0, 1.0), K.BRASS, 16)
n = 64; R = .85; verts = [(0, 0, 2.5)]
for i in range(n):
    a = i / n * 6.283
    verts.append((R * math.cos(a), R * math.sin(a), 1.95))
faces = [(0, 1 + i, 1 + (i + 1) % n) for i in range(n)]
me = bpy.data.meshes.new("Parasol"); me.from_pydata(verts, [], faces)
po = K.link(bpy.data.objects.new("Parasol", me), TC)
po.modifiers.new("Thick", "SOLIDIFY").thickness = .04
# scalloped valance: a short skirt below the rim whose lower edge dips in twelve half-round scallops, trimmed in cream
m_ = 240; top = []; bot = []
for i in range(m_):
    a = i / m_ * 6.283; ph = (a * 12 / 6.283) % 1
    top.append((R * math.cos(a), R * math.sin(a), 1.955))
    bot.append((R * 1.01 * math.cos(a), R * 1.01 * math.sin(a), 1.955 - .17 * math.sqrt(max(0., math.sin(math.pi * ph)))))
vm = bpy.data.meshes.new("Valance"); vm.from_pydata(top + bot, [], [(i, (i + 1) % m_, m_ + (i + 1) % m_, m_ + i) for i in range(m_)])
vo = K.link(bpy.data.objects.new("Valance", vm), TC); vo.modifiers.new("Thick", "SOLIDIFY").thickness = .02
K.tube("ValanceTrim", [tuple(v) for v in bot] + [tuple(bot[0])], .016, CRM)
for i in range(8):
    a = i / 8 * 6.283
    K.tube(f"Rib{i}", [(0, 0, 2.49), (R * .98 * math.cos(a), R * .98 * math.sin(a), 1.97)], .006, CRM)
K.cyl("Top", .08, .06, .06, (0, 0, 2.49), CRM, 16)
K.cyl("Finial", .04, .04, .08, (0, 0, 2.54), K.BRASS, 16)
def table(tag, x, y):
    K.cyl(tag + "Foot", .16, .18, .04, (x, y, 0), K.GREEN, 24)
    for k in range(3):
        a = k * 2.094
        K.tube(f"{tag}FootArm{k}", [(x, y, .04), (x + .16 * math.cos(a), y + .16 * math.sin(a), .01)], .02, K.GREEN)
    K.cyl(tag + "Stem", .025, .025, .66, (x, y, .04), K.GREEN, 16)
    K.cyl(tag + "Ring", .04, .04, .04, (x, y, .4), K.BRASS, 16)
    K.cyl(tag + "Rim", .33, .33, .04, (x, y, .7), K.BRASS, 40)
    K.cyl(tag + "Top", .31, .31, .045, (x, y, .715), TOPC, 40)
def chair(tag, x, y, yaw):
    c, s = math.cos(yaw), math.sin(yaw)
    def at(dx, dy): return (x + dx * c - dy * s, y + dx * s + dy * c)
    for dx in (-.14, .14):
        for dy in (-.14, .14):
            K.tube(f"{tag}Leg{dx}{dy}", [at(dx, dy) + (0,), at(dx * .9, dy * .9) + (.44,)], .016, RATTAN)
    K.cyl(tag + "Seat", .2, .2, .05, at(0, 0) + (.44,), SEATG, 24)
    K.cyl(tag + "SeatRim", .21, .21, .025, at(0, 0) + (.44,), RATTAN, 24)
    pts = [at(-.17 * math.cos(t), .17 * math.sin(t)) + (.5 + .32 * (1 - abs(math.sin(t)) * .2),) for t in [math.radians(d) for d in range(-80, 81, 10)]]
    K.tube(tag + "BackTop", pts, .018, RATTAN)
    for t in (-70, -25, 25, 70):
        a = math.radians(t)
        K.tube(f"{tag}BackPost{t}", [at(-.17 * math.cos(a), .17 * math.sin(a)) + (.47,), at(-.17 * math.cos(a), .17 * math.sin(a)) + (.8,)], .014, RATTAN)
    o = K.box(tag + "BackWeave", (.03, .26, .2), at(-.165, 0) + (.55,), SEATG, .01); o.rotation_euler.z = yaw
for tag, (x, y) in (("TableL", (-.62, -.62)), ("TableR", (.62, .62))):
    table(tag, x, y)
    chair(tag + "ChairA", x - .48, y + .1, 0)
    chair(tag + "ChairB", x + .1, y - .48, math.pi / 2)
K.finish(OUT, "street_cafe_awning", ortho=3.1, centre=(0, 0, 1.1))
