"""Canopy production-line conveyor (map3d.js buildTransport belts): the pieces code tiles along each belt.
  Section  one map unit of belt, along X: dark rubber belt with cross cleats between two forest-green side channels
           with a brass top lip, a return tray underneath.  Origin at the belt's top centre (code stretches a whole
           number of sections to the belt's length).
  End      the drum at one end: a roller across the belt and two end plates, origin at the belt's top centre where the
           belt ends, the drum toward +X (turned for the other end).
  Leg      a pair of square posts with a cross brace and feet, under the side channels.  Origin on the floor; its top
           meets the channels' underside at world .87 (belt height 1.05 less the .18 frame), code stretches it to fit.
Belt .8 map units wide.  Map units / 1.69 across, world heights x .7247 up, map x -> Blender X.  Each piece sits under
an empty of its name; nothing is driven.

Needs canopy_kit.py in the same folder.  Run headless with
    blender -b -P conveyor_parts.py -- OUT_DIR
"""
import os, sys, math
try: sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
except NameError: pass
import bpy
from mathutils import Matrix
import canopy_kit as K

OUT = K.begin("ConveyorParts")
M, V = 1 / 1.69, .7247
RUBBER = K.mat("BeltRubber", "#2a3330", .9); CLEAT = K.mat("BeltCleat", "#38443f", .85)
FRAME = K.mat("BeltFrame", "#2f5a45", .5); FRAME_D = K.mat("BeltFrameDeep", "#22463a", .55)
LIP = K.mat("BeltLip", "#c9a24f", .35); DRUM = K.mat("BeltDrum", "#9aa39d", .4); FOOT = K.mat("BeltFoot", "#1f2a26", .6)
W = .8 * M                                   # belt width
FRAME_H = .18 * V                            # side channel depth below the belt top

def group(name, x):
    e = bpy.data.objects.new(name, None); K.col.objects.link(e); e.location = (x, 0, 0); return e

def own(e, objs):
    for o in objs: o.parent = e; o.matrix_parent_inverse = Matrix.Translation(e.location).inverted()

# ---------- Section: one map unit long, top at z 0 ----------
L = 1 * M; x = 0
e = group("Section", x); parts = []
parts.append(K.box("SecBelt", (L, W - .1, .022), (x, 0, -.022), RUBBER, 0, 1))
for k in range(4):                          # cleats across the belt, a quarter unit apart
    parts.append(K.box(f"SecCleat{k}", (.012, W - .12, .006), (x - L / 2 + (k + .5) * L / 4, 0, 0), CLEAT, 0, 1))
for s in (-1, 1):
    y = s * (W / 2 - .02)
    parts.append(K.box(f"SecChannel{s}", (L, .04, FRAME_H), (x, y, -FRAME_H + .012), FRAME, 0, 1))
    parts.append(K.box(f"SecLip{s}", (L, .044, .008), (x, y, .012), LIP, 0, 1))
    parts.append(K.box(f"SecChannelIn{s}", (L, .01, FRAME_H * .6), (x, s * (W / 2 - .045), -FRAME_H * .7), FRAME_D, 0, 1))
parts.append(K.box("SecTray", (L, W - .08, .012), (x, 0, -FRAME_H + .02), FRAME_D, 0, 1))
own(e, parts)

# ---------- End: drum roller and end plates, toward +X ----------
x = 1.0; e = group("End", x); parts = []
d = K.cyl("EndDrum", .045, .045, W - .1, (0, 0, 0), DRUM, 12)
d.rotation_euler = (math.pi / 2, 0, 0); d.location = (x, (W - .1) / 2, -.045)
parts.append(d)
for s in (-1, 1):
    parts.append(K.box(f"EndPlate{s}", (.13, .04, FRAME_H + .02), (x - .01, s * (W / 2 - .02), -FRAME_H + .002), FRAME, 0, 1))
    parts.append(K.box(f"EndLip{s}", (.13, .044, .008), (x - .01, s * (W / 2 - .02), .012), LIP, 0, 1))
    hub = K.cyl(f"EndHub{s}", .022, .022, .012, (0, 0, 0), LIP, 10); hub.rotation_euler = (math.pi / 2, 0, 0)
    hub.location = (x, s * (W / 2 + .006) + (.006 if s > 0 else 0), -.045); parts.append(hub)
own(e, parts)

# ---------- Leg: two posts, a brace and feet; top at world .87 ----------
x = 2.0; e = group("Leg", x); parts = []
LH = (1.05 - .18) * V
for s in (-1, 1):
    y = s * (W / 2 - .02)
    parts.append(K.box(f"LegPost{s}", (.035, .035, LH - .02), (x, y, .02), FRAME, 0, 1))
    parts.append(K.box(f"LegFoot{s}", (.07, .06, .02), (x, y, 0), FOOT, 0, 1))
parts.append(K.box("LegBrace", (.03, W - .04, .03), (x, 0, LH * .28), FRAME_D, 0, 1))
parts.append(K.box("LegCap", (.05, W, .02), (x, 0, LH - .02), FRAME_D, 0, 1))
own(e, parts)

K.finish(OUT, "conveyor_parts", ortho=2.2, centre=(1.0, 0, .3))
