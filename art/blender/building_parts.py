"""Shared parts for Canopy's street terrace buildings (building_<name>.py).

A building is a box (or a box with its near corner cut off) standing on the floor, with cream string courses between
storeys, a cream parapet round a flat grey roof, and windows, doors, shopfronts and awnings placed on its two lit faces:
'front' is the -Y face (screen lower-left, map +z, the street front with the door) and 'side' the +X face (screen
lower-right, map +x).  u is metres along the face from its left end as you look at it; z is metres above the floor.
Needs canopy_kit.py next to it.
"""
import math
import bpy
from mathutils import Vector
import canopy_kit as K

M = {}

def palette():
    M.update(
        CREAM=K.mat("Trim", "#ecdcbc", .6), ROOF=K.mat("Roof", "#b9b4a8", .9), GLASS=K.mat("WindowGlass", "#2f5552", .2),
        FRAME=K.mat("WindowFrame", "#c99a55", .5), SHOPGLASS=K.mat("ShopGlass", "#6d6553", .2, 0, .45),
        DOOR=K.mat("Door", "#d5a24f", .55), AWN=K.mat("Awning", "#ece3cf", .7), BRASS=K.BRASS)

class Face:
    def __init__(self, p0, p1, n):
        self.p0, self.p1 = Vector(p0), Vector(p1); self.t = (self.p1 - self.p0).normalized()
        self.n = Vector(n).normalized(); self.length = (self.p1 - self.p0).length
        self.rot = math.atan2(self.t.y, self.t.x)

    def at(self, u, out=0.):
        return self.p0 + self.t * u + self.n * out

    def box(self, name, u, z, w, h, depth, m, out=0., bevel=0.):
        """A box on the face: centred at u, bottom at z, w wide, h tall, standing `depth` proud of the wall (+ out)."""
        c = self.at(u, out + depth / 2)
        o = K.box(name, (w, depth, h), (c.x, c.y, z), m, bevel, 1)
        o.rotation_euler.z = self.rot
        return o

def faces(W, D, chamfer=0.):
    x0, x1, y0, y1 = -W / 2, W / 2, -D / 2, D / 2
    if not chamfer:
        return {"front": Face((x0, y0), (x1, y0), (0, -1)), "side": Face((x1, y0), (x1, y1), (1, 0))}
    c = chamfer
    return {"front": Face((x0, y0), (x1 - c, y0), (0, -1)), "corner": Face((x1 - c, y0), (x1, y0 + c), (1, -1)),
            "side": Face((x1, y0 + c), (x1, y1), (1, 0))}

def outline(W, D, chamfer, grow):
    x0, x1, y0, y1 = -W / 2 - grow, W / 2 + grow, -D / 2 - grow, D / 2 + grow
    c = chamfer + grow * .414 if chamfer else 0
    return [(x0, y0), (x1 - c, y0), (x1, y0 + c), (x1, y1), (x0, y1)] if c else [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]

def ring(name, W, D, z0, h, m, chamfer=0., grow=0., thick=.3):
    """A parapet: a wall `thick` deep running round the outline, open in the middle so the roof shows."""
    out, inn = outline(W, D, chamfer, grow), outline(W, D, chamfer, grow - thick)
    k = len(out)
    verts = [(x, y, z0) for x, y in out] + [(x, y, z0 + h) for x, y in out] + [(x, y, z0) for x, y in inn] + [(x, y, z0 + h) for x, y in inn]
    fcs = []
    for i in range(k):
        j = (i + 1) % k
        fcs += [(i, j, k + j, k + i), (2 * k + j, 2 * k + i, 3 * k + i, 3 * k + j), (k + i, k + j, 3 * k + j, 3 * k + i)]
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], fcs)
    return K.link(bpy.data.objects.new(name, me), m)

def prism(name, W, D, z0, h, m, chamfer=0., grow=0.):
    """The building's body (or a band round it): a box grown by `grow` on every side, near corner cut by `chamfer`."""
    x0, x1, y0, y1 = -W / 2 - grow, W / 2 + grow, -D / 2 - grow, D / 2 + grow
    c = chamfer + grow * .414 if chamfer else 0
    pts = [(x0, y0), (x1 - c, y0), (x1, y0 + c), (x1, y1), (x0, y1)] if c else [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
    k = len(pts)
    verts = [(x, y, z0) for x, y in pts] + [(x, y, z0 + h) for x, y in pts]
    fcs = [tuple(range(k))[::-1], tuple(range(k, 2 * k))] + [(i, (i + 1) % k, k + (i + 1) % k, k + i) for i in range(k)]
    me = bpy.data.meshes.new(name); me.from_pydata(verts, [], fcs)
    o = K.link(bpy.data.objects.new(name, me), m)
    return o

def walls(W, D, H, bands, ground, upper, chamfer=0., side_upper=None, side_ground=None, parapet=.45, cornice=None):
    """Body split at the first band into ground and upper wall colours (the side may differ), cream bands at each
    height in `bands`, a cornice and parapet round a grey roof."""
    g = bands[0] if bands else H - parapet
    prism("WallGround", W, D, 0, g, ground, chamfer)
    if H - parapet - g > .01: prism("WallUpper", W, D, g, H - parapet - g, upper, chamfer)
    if side_upper or side_ground:   # a thin skin on the side face in its own colour
        f = faces(W, D, chamfer)["side"]
        if side_ground: f.box("SideGround", f.length / 2, 0, f.length, g, .01, side_ground)
        if side_upper: f.box("SideUpper", f.length / 2, g, f.length, H - parapet - g, .01, side_upper)
    prism("Plinth", W, D, 0, .14, ground, chamfer, .03)
    for i, z in enumerate(bands):
        prism(f"Band{i}", W, D, z - .12, .26, M["CREAM"], chamfer, .07)
    prism("Cornice", W, D, H - parapet - .1, .14, cornice or M["CREAM"], chamfer, .1)
    ring("Parapet", W, D, H - parapet, parapet, cornice or M["CREAM"], chamfer, .06, .32)
    ring("ParapetCap", W, D, H - .07, .09, cornice or M["CREAM"], chamfer, .1, .38)
    prism("Roof", W, D, H - parapet - .002, parapet - .24, M["ROOF"], chamfer, -.2)

def window(f, tag, u, z, w=.5, h=.8, arch=False, panes=2):
    """A sash window: cream surround, brass-oak frame, dark glass, a glazing bar and a sill."""
    w, h = w * 1.15, h * 1.12
    f.box(f"{tag}Surround", u, z - .06, w + .22, h + .2, .045, M["CREAM"])
    f.box(f"{tag}Lintel", u, z + h + .08, w + .34, .14, .07, M["CREAM"])
    f.box(f"{tag}Frame", u, z, w, h, .06, M["FRAME"])
    f.box(f"{tag}Glass", u, z + .04, w - .08, h - .08, .065, M["GLASS"])
    f.box(f"{tag}Bar", u, z + h / 2 - .015, w - .08, .03, .075, M["FRAME"])
    if panes > 1: f.box(f"{tag}Mullion", u, z + .04, .03, h - .08, .075, M["FRAME"])
    f.box(f"{tag}Sill", u, z - .09, w + .24, .06, .1, M["CREAM"])
    if arch:   # a round head: discs in the wall plane centred on the top of the opening
        for k, (r, d, m) in enumerate((((w + .22) / 2, .043, M["CREAM"]), (w / 2, .058, M["FRAME"]), (w / 2 - .04, .063, M["GLASS"]))):
            o = K.cyl(f"{tag}Arch{k}", r, r, d, tuple(f.at(u, 0))[:2] + (z + h - .02,), m, 28)
            o.rotation_euler = (math.pi / 2, 0, f.rot)

def door(f, tag, u, z=0., w=.62, h=1.5, colour=None):
    f.box(f"{tag}Surround", u, z, w + .2, h + .14, .04, M["CREAM"])
    f.box(f"{tag}Leaf", u, z, w, h, .06, colour or M["DOOR"])
    for k in range(2):
        f.box(f"{tag}Panel{k}", u, z + .12 + k * h * .48, w - .2, h * .38, .075, colour or M["DOOR"], 0, .01)
    f.box(f"{tag}Fan", u, z + h - .02, w, .2, .065, M["GLASS"])
    f.box(f"{tag}Knob", u + w / 2 - .1, z + h * .45, .05, .05, .1, M["BRASS"])
    f.box(f"{tag}Step", u, z, w + .3, .1, .22, M["CREAM"])

def shopfront(f, tag, u0, u1, z1, colour, door_at=None, door_w=.62, panes=(.0,)):
    """A painted shopfront from u0 to u1 up to height z1: pilasters, a fascia, big windows and an optional door."""
    w = u1 - u0; uc = (u0 + u1) / 2
    f.box(f"{tag}Back", uc, .14, w, z1 - .14, .05, colour)
    f.box(f"{tag}Fascia", uc, z1 - .32, w + .1, .32, .12, colour)
    f.box(f"{tag}FasciaTrim", uc, z1 - .34, w + .12, .04, .14, M["FRAME"])
    for x in (u0, u1):
        f.box(f"{tag}Pilaster{x:.2f}", x, 0, .22, z1, .14, colour)
        f.box(f"{tag}PilCap{x:.2f}", x, z1 - .42, .26, .08, .16, M["CREAM"])
    spans = [(u0 + .14, u1 - .14)]
    if door_at is not None:
        spans = [(u0 + .14, door_at - door_w / 2 - .06), (door_at + door_w / 2 + .06, u1 - .14)]
        f.box(f"{tag}Door", door_at, .14, door_w, z1 - .6, .07, M["DOOR"])
        f.box(f"{tag}DoorGlass", door_at, .9, door_w - .2, z1 - 1.5, .08, M["SHOPGLASS"])
        f.box(f"{tag}DoorKnob", door_at + door_w / 2 - .1, .85, .05, .05, .1, M["BRASS"])
    for i, (a, b) in enumerate(spans):
        if b - a < .2: continue
        c = (a + b) / 2
        f.box(f"{tag}Stall{i}", c, .14, b - a, .42, .1, colour)
        f.box(f"{tag}Win{i}", c, .56, b - a - .08, z1 - 1.04, .07, M["FRAME"])
        f.box(f"{tag}WinGlass{i}", c, .6, b - a - .16, z1 - 1.12, .075, M["SHOPGLASS"])

def awning(f, tag, u, z, w, drop=.5, reach=.6, colour=None):
    """A canvas awning sloping out from the wall over a shopfront, with brass arms."""
    o = f.box(f"{tag}", u, 0, w, .03, reach, colour or M["AWN"])
    c = f.at(u, reach / 2)
    o.location = (c.x, c.y, z - drop / 2)
    o.rotation_euler = (math.atan2(drop, reach), 0, f.rot)
    o.scale.y = math.hypot(drop, reach) / reach
    f.box(f"{tag}Valance", u, z - drop - .14, w, .16, .02, colour or M["AWN"], reach)
    for s in (-1, 1):
        f.box(f"{tag}Arm{s}", u + s * (w / 2 - .05), z - drop - .05, .03, .03, reach, M["BRASS"])
