"""Canopy city terraces with varied storeys (2-5), commercial ground floors and parapet trims.

Each variant reuses the footprint of one of the 10 terrace renders (BUILDING_SPRITES in src/sunny-world.js, map
units / 1.69 = metres), so the game fits it to the same lot. Front is -Y (map +z), side +X (map +x).
Rooftop clutter is NOT baked in: roof_*.glb props are scattered on every roof by the game.
Run:  ~/bpyenv/bin/python city_buildings.py -- OUT_DIR
"""
import os, sys, math, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import city_kit as C
from city_kit import K, B

U = 1.69
FOOT = {"corner": (7.73, 7.25), "low.sage": (8.77, 7.95), "low.stone": (7.63, 7.94), "low.tan": (7.58, 7.52),
        "mid.stone": (8.46, 7.16), "apartment.brick": (9.47, 7.09), "rowhouse.terracotta": (8.86, 6.68),
        "shop.narrow": (8.28, 6.23), "townhouse.sage": (7.51, 5.89), "workshop.low": (7.71, 7.23)}

WALLS = {"brick": "#97573f", "brickdark": "#7d4637", "terra": "#c9805f", "stone": "#dcd5c6", "cream": "#ece3d0",
         "tan": "#d2bb98", "sage": "#a9bfa5", "mauve": "#b9a3a8", "ochre": "#d9b26c", "grey": "#b8b5ad", "blue": "#9fb3bd"}
SHOPS = {"green": "#3f6e52", "teal": "#4b8580", "navy": "#34485f", "burgundy": "#7a3440", "black": "#33312e",
         "mustard": "#c79a3a", "plum": "#6a4a63", "red": "#a8473a", "cream": "#e6dcc4"}
AWN = {"red": "#c4473b", "green": "#3f7a52", "navy": "#2f4c6e", "mustard": "#d9a73e", "terracotta": "#c46a43",
       "teal": "#3d8a85", "cream": "#efe6d2", "white": "#f4f1e8", "burgundy": "#8a2f3d", "plum": "#7b4a73"}
POSTER = ["#e2b33c", "#d0573f", "#3f7fa8", "#f1ecdf", "#6aa36f", "#c86fa0"]

# name, footprint, storeys, wall, ground colour, cornice trim, awning (or stripes pair), parapet style, extras
VARIANTS = [
    ("city_terra_4", "rowhouse.terracotta", 4, "terra", "green", "#ecdcbc", ("green",), "stepped", {"escape": False}),
    ("city_brick_5", "apartment.brick", 5, "brick", "black", "#ecdcbc", ("red", "white"), "brackets", {"escape": True}),
    ("city_corner_4", "corner", 4, "cream", "teal", "#ecdcbc", ("teal",), "plain", {"chamfer": .95}),
    ("city_stone_4", "low.stone", 4, "stone", "navy", "#ecdcbc", ("navy",), "brackets", {}),
    ("city_cream_5", "mid.stone", 5, "cream", "burgundy", "#8f6b52", ("burgundy",), "dark", {"escape": True}),
    ("city_tan_3", "low.tan", 3, "tan", "mustard", "#ecdcbc", ("mustard", "white"), "stepped", {}),
    ("city_sage_4", "townhouse.sage", 4, "sage", "red", "#f0e6cf", ("red",), "plain", {}),
    ("city_mauve_2", "low.sage", 2, "mauve", "plum", "#ecdcbc", ("plum",), "stepped", {}),
    ("city_terra_2", "rowhouse.terracotta", 2, "ochre", "navy", "#ecdcbc", ("navy", "white"), "plain", {}),
    ("city_stone_3", "low.stone", 3, "grey", "green", "#ecdcbc", ("green", "cream"), "brackets", {}),
    ("city_sage_3", "townhouse.sage", 3, "blue", "cream", "#ecdcbc", ("terracotta",), "dark", {}),
    ("city_brick_4", "workshop.low", 4, "brickdark", "black", "#d8c9a8", ("mustard",), "plain", {"escape": True}),
]

def shopfront(f, tag, u0, u1, z1, M, awn, rnd, side=False):
    """A shop across u0..u1: pilasters, a sign fascia with lettering, display windows with goods and posters, a
    recessed door between deep reveals, and an awning (solid or striped)."""
    w = u1 - u0; uc = (u0 + u1) / 2
    shop, glass, light = M["shop"], M["glass"], M["display"]
    f.box(f"{tag}Back", uc, .14, w, z1 - .14, .05, shop)
    f.box(f"{tag}Fascia", uc, z1 - .5, w + .1, .5, .12, shop)
    # Sign: a pale board with dark "letters" (blocks of random widths), centred on the fascia.
    sw = min(w * .62, 2.6)
    f.box(f"{tag}Sign", uc, z1 - .44, sw, .36, .14, M["sign"])
    x = uc - sw / 2 + .16
    while x < uc + sw / 2 - .3:
        lw = rnd.uniform(.09, .2)
        f.box(f"{tag}L{x:.2f}", x + lw / 2, z1 - .36, lw, .2, .15, M["letter"]); x += lw + .06
    for x in (u0, u1):
        f.box(f"{tag}Pil{x:.2f}", x, 0, .22, z1, .14, shop)
    door = uc + (w * .18 if side else -w * .12)
    dw = .78
    # Recessed entry: the door sits back between reveals that stand proud of the shopfront.
    f.box(f"{tag}Door", door, .1, dw, 2.0, .03, M["door"])
    f.box(f"{tag}DoorGlass", door, .9, dw - .26, .95, .04, glass)
    f.box(f"{tag}RevealL", door - dw / 2 - .07, 0, .14, 2.25, .34, shop)
    f.box(f"{tag}RevealR", door + dw / 2 + .07, 0, .14, 2.25, .34, shop)
    f.box(f"{tag}Head", door, 2.1, dw + .28, .2, .34, shop)
    f.box(f"{tag}Step", door, 0, dw + .3, .08, .4, M["step"])
    spans = [(u0 + .14, door - dw / 2 - .16), (door + dw / 2 + .16, u1 - .14)]
    for i, (a, b) in enumerate(spans):
        if b - a < .35: continue
        c = (a + b) / 2
        f.box(f"{tag}Stall{i}", c, .14, b - a, .5, .1, shop)
        f.box(f"{tag}Win{i}", c, .64, b - a - .06, z1 - 1.3, .07, M["frame"])
        f.box(f"{tag}Glass{i}", c, .68, b - a - .14, z1 - 1.38, .075, light)
        # Goods on the display ledge and a poster or two on the glass.
        n = max(1, int((b - a) / .45))
        for k in range(n):
            gx = a + (k + .5) * (b - a) / n
            f.box(f"{tag}G{i}{k}", gx, .68, .22, rnd.uniform(.25, .55), .1, M["goods"][rnd.randrange(len(M["goods"]))], .03)
        if rnd.random() < .8:
            f.box(f"{tag}Poster{i}", a + (b - a) * rnd.uniform(.3, .7), 1.25, .36, .5, .08, M["posters"][rnd.randrange(len(M["posters"]))])
    # Awning over the windows (not the door), sloping out; stripes alternate two colours.
    cols = M["awning"]
    aw = w - .3
    stripes = 1 if len(cols) == 1 else max(5, int(aw / .32)) | 1
    sw = aw / stripes
    for k in range(stripes):
        B.awning(f, f"{tag}Awn{k}", u0 + .15 + sw * (k + .5), z1 - .52, sw + .002, .55, .85, cols[k % len(cols)])
    return door

def window(f, tag, u, z, w, h, M):
    """A lean sash window (5 boxes): cream surround with its lintel, dark glass, a glazing cross and a sill."""
    f.box(f"{tag}Surround", u, z - .06, w + .24, h + .3, .045, M["trimc"])
    f.box(f"{tag}Glass", u, z + .02, w, h - .1, .065, M["wglass"])
    f.box(f"{tag}Bar", u, z + h / 2 - .06, w, .04, .075, M["frame"])
    f.box(f"{tag}Mull", u, z + .02, .04, h - .1, .075, M["frame"])
    f.box(f"{tag}Sill", u, z - .1, w + .26, .06, .1, M["trimc"])

def windows(f, tag, z, n, M, w=.6, h=1.12, keystone=False):
    L = f.length
    for i in range(n):
        u = L * (i + .5) / n
        window(f, f"{tag}{i}", u, z, w, h, M)
        if keystone: f.box(f"{tag}{i}Key", u, z + h * 1.12 + .02, .16, .22, .1, M["trim"])

def fire_escape(f, tag, bands, M):
    """Iron balconies at each upper storey on the side face with ladders between them."""
    u = f.length * .5
    for k, z in enumerate(bands):
        f.box(f"{tag}Deck{k}", u, z + .02, 1.5, .05, .6, M["iron"])
        f.box(f"{tag}Rail{k}", u, z + .8, 1.5, .04, .6, M["iron"], .0)
        for s in (-1, 1): f.box(f"{tag}Post{k}{s}", u + s * .73, z + .05, .04, .78, .04, M["iron"], .56)
        for i in range(5): f.box(f"{tag}Bal{k}{i}", u - .6 + i * .3, z + .05, .03, .75, .03, M["iron"], .58)
        if k + 1 < len(bands):
            f.box(f"{tag}Ladder{k}", u + .5, z + .05, .3, bands[k + 1] - z, .03, M["iron"], .3)

def build(spec, out):
    name, foot, n, wall, ground, trim, awn, parapet, extra = spec
    rnd = random.Random(name)
    K.begin(name); B.palette()
    W, D = FOOT[foot][0] / U, FOOT[foot][1] / U
    g, s = 2.75, 2.45
    par = .55 if parapet == "stepped" else .45
    H = g + (n - 1) * s + par + .12
    bands = [g + k * s for k in range(n - 1)]
    M = {"shop": K.mat("Shop", SHOPS[ground], .5), "glass": B.M["SHOPGLASS"], "display": K.mat("Display", "#bfae8a", .3),
         "frame": B.M["FRAME"], "door": B.M["DOOR"], "step": B.M["CREAM"], "sign": K.mat("Sign", "#efe3c4", .5),
         "letter": K.mat("Letter", "#2f3a33", .5), "iron": K.mat("Iron", "#5d6662", .6), "trim": K.mat("Trim2", trim, .6), "trimc": B.M["CREAM"], "wglass": B.M["GLASS"],
         "goods": [K.mat(f"Goods{i}", c, .6) for i, c in enumerate(["#d36b4e", "#e8c25a", "#6c9a62", "#f2ece0", "#5b7fa6"])],
         "posters": [K.mat(f"Poster{i}", c, .5) for i, c in enumerate(POSTER)],
         "awning": [K.mat(f"Awn{a}", AWN[a], .7) for a in awn]}
    wallm = K.mat("Wall", WALLS[wall], .8)
    chamfer = extra.get("chamfer", 0.)
    cornice = M["trim"] if parapet == "dark" else None
    B.walls(W, D, H, bands, M["shop"], wallm, chamfer, parapet=par, cornice=cornice)
    F = B.faces(W, D, chamfer)
    fr, sd = F["front"], F["side"]
    if chamfer:
        shopfront(fr, "ShopF", .1, fr.length - .05, g, M, awn, rnd)
        shopfront(sd, "ShopS", .05, sd.length - .1, g, M, awn, rnd, True)
        F["corner"].box("CornerDoor", F["corner"].length / 2, .1, .8, 2.0, .06, M["door"])
    else:
        shopfront(fr, "ShopF", .1, fr.length - .1, g, M, awn, rnd)
        # The side gets a second, narrower shop window half the time, else plain ground windows.
        if rnd.random() < .5: shopfront(sd, "ShopS", .1, sd.length * .62, g, M, awn, rnd, True)
        else: windows(sd, "SG", .8, max(1, int(sd.length / 1.9)), M)
    nf, ns = max(2, round(fr.length / 1.55)), max(2, round(sd.length / 1.6))
    key = parapet in ("brackets", "dark")
    for k, z in enumerate(bands):
        windows(fr, f"F{k}W", z + .55, nf, M, keystone=key)
        if extra.get("escape") and k > 0: continue
        windows(sd, f"S{k}W", z + .55, ns, M, keystone=key)
    if extra.get("escape"):
        fire_escape(sd, "Esc", bands, M)
        for k, z in enumerate(bands[1:]): windows(sd, f"SE{k}W", z + .55, 2, M)
    # Parapet trims: a raised centre panel on the front, or corbels under the cornice.
    if parapet == "stepped":
        fr.box("ParapetPeak", fr.length / 2, H - .1, fr.length * .36, .38, .3, M["trim"], -.25)
        fr.box("ParapetPeakCap", fr.length / 2, H + .26, fr.length * .36 + .14, .08, .38, M["trim"], -.3)
    if parapet == "brackets":
        for f in (fr, sd):
            for i in range(int(f.length / .55)):
                f.box(f"Corbel{f.rot:.1f}{i}", (i + .5) * f.length / int(f.length / .55), H - par - .32, .1, .24, .14, M["trim"])
    return C.export(out, name, {"storeys": n, "foot": "building." + foot, "W": round(W, 4), "D": round(D, 4), "roof": round(H - par + .21 - .012, 4)})

def measure_original(name, out):
    """Bounds and roof height of a diorama terrace (its .glb), for scattering roof props on it."""
    bpy = K.bpy
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=os.path.join(C.HERE, "..", "blender", name + ".glb"))
    objs = [o for o in bpy.data.objects if o.type == "MESH"]
    pts = [o.matrix_world @ v.co for o in objs for v in o.data.vertices]
    roof = [o for o in objs if o.name.startswith("Roof")]
    rz = max(o.matrix_world @ v.co for o in roof for v in o.data.vertices).z if False else max((o.matrix_world @ v.co).z for o in roof for v in o.data.vertices) if roof else None
    par = [o for o in objs if o.name.startswith("Parapet")]
    inner = None
    return {"x0": round(min(p.x for p in pts), 4), "x1": round(max(p.x for p in pts), 4), "z0": round(-max(p.y for p in pts), 4), "z1": round(-min(p.y for p in pts), 4),
            "top": round(max(p.z for p in pts), 4), "roof": round(rz, 4) if rz else None}

if __name__ == "__main__":
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    out = os.path.abspath(argv[0]) if argv else C.HERE
    only = argv[1:] if len(argv) > 1 else None
    meta = {}
    for v in VARIANTS:
        if only and v[0] not in only and "originals" not in only: continue
        if only and "originals" in only: break
        meta[v[0]] = build(v, out); print(v[0], meta[v[0]])
    if not only or "originals" in only:
        for f in ["building_corner", "building_low_sage", "building_low_stone", "building_low_tan", "building_mid_stone", "building_apartment_brick",
                  "building_rowhouse_terracotta", "building_shop_narrow", "building_townhouse_sage", "building_workshop_low"]:
            meta[f] = measure_original(f, out); print(f, meta[f])
    C.write_meta(out, meta)
