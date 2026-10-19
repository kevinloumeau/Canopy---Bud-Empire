// The self-order kiosk's touchscreen while a customer orders, as a small ordering app: they scroll a menu of products,
// tap three (each tap ripples brass and the basket count in the header ticks up), check out on a basket page where the
// pay button presses in, then the screen turns forest green with a brass tick while a receipt slides out. Painted into
// a canvas (one per kiosk) and only repainted when the picture changes, a few times a second at most.

// The picture is laid out in a 96 x 160 grid (the baked menu's size) and painted at SCALE for crisp edges.
export const W = 96, H = 160, SCALE = 2;
const FOREST = '#144d29', LEAF = '#5c9e4d', CREAM = '#ffe6a8', CARD = '#f6dca2', SHADE = '#e3c27f', BRASS = '#d9a441', BRIGHT = '#f0c766', WHITE = '#fffaf0';
// The menu: a product's picture and its tile colour.
const PRODUCTS = ['bud', 'roll', 'gummy', 'vape', 'bud', 'gummy', 'roll', 'bud', 'vape', 'gummy'];
// Which tiles the customer taps, and when (share of the order).
const PICKS = [{ tile: 2, at: .14 }, { tile: 4, at: .3 }, { tile: 7, at: .46 }];
const TAP = .08, CHECKOUT = .62, PRESS = .76;
// The thank-you screen: from this share of the order, and how long it stays up after (seconds).
export const PAID = .9, PAID_HOLD = 1.6;
// Tiles: two columns from y 26, 34 tall with a 6 gap; the list scrolls up as the customer browses.
const TILE = { x: [6, 50], w: 40, h: 34, top: 26, gap: 6 };
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const ease = v => { v = clamp01(v); return v * v * (3 - 2 * v); };

// p: how far the order has gone (0..1); clock: seconds, for small idle motion; paid: seconds since the order went
// through (the thank-you screen), or null.
export function screenState(p, clock, paid = null) {
  if (paid != null || p >= PAID) {
    const q = Math.min(1, (paid || 0) / 1.2);
    return { mode: 'paid', q, key: 'paid' + Math.round(q * 12) };
  }
  if (p >= CHECKOUT) {
    const press = p >= PRESS ? ease((p - PRESS) / .06) : 0, wait = p >= PRESS + .06 ? Math.floor(clock * 6) % 3 : -1;
    const slide = ease((p - CHECKOUT) / .06);
    return { mode: 'pay', slide, press, wait, key: 'pay' + Math.round(slide * 6) + Math.round(press * 4) + wait };
  }
  const picked = PICKS.filter(k => p >= k.at + TAP).length;
  const tapping = PICKS.find(k => p >= k.at && p < k.at + TAP);
  const ripple = tapping ? (p - tapping.at) / TAP : -1;
  // Scrolls a row and a half over the browse, easing between the taps so each tap lands on a still tile.
  const scroll = Math.round(ease(p / .55) * 60);
  return { mode: 'browse', scroll, picked, tapping: tapping ? tapping.tile : -1, ripple,
    key: 'browse' + scroll + picked + (tapping ? tapping.tile + ':' + Math.round(ripple * 5) : '') };
}

function round(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function product(ctx, kind, cx, cy, s) {
  if (kind === 'bud') {
    ctx.fillStyle = LEAF; [[-4, 2], [4, 2], [0, -3], [0, 4]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(cx + dx * s, cy + dy * s, 5 * s, 0, 7); ctx.fill(); });
    ctx.fillStyle = '#8cc46f'; ctx.beginPath(); ctx.arc(cx - 1 * s, cy - 2 * s, 2.5 * s, 0, 7); ctx.fill();
  } else if (kind === 'roll') {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.6);
    ctx.fillStyle = WHITE; ctx.fillRect(-10 * s, -2.5 * s, 16 * s, 5 * s); ctx.fillStyle = BRASS; ctx.fillRect(6 * s, -2.5 * s, 5 * s, 5 * s);
    ctx.restore();
  } else if (kind === 'gummy') {
    ctx.fillStyle = '#e07a5f'; round(ctx, cx - 9 * s, cy - 4 * s, 8 * s, 8 * s, 2.5 * s); ctx.fill();
    ctx.fillStyle = '#f2b134'; round(ctx, cx + 1 * s, cy - 6 * s, 8 * s, 8 * s, 2.5 * s); ctx.fill();
  } else {
    ctx.fillStyle = FOREST; round(ctx, cx - 3 * s, cy - 9 * s, 6 * s, 18 * s, 2 * s); ctx.fill();
    ctx.fillStyle = BRASS; ctx.fillRect(cx - 3 * s, cy - 9 * s, 6 * s, 4 * s);
  }
}

function tick(ctx, cx, cy, s, colour) {
  ctx.strokeStyle = colour; ctx.lineWidth = 2.6 * s; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(cx - 5 * s, cy); ctx.lineTo(cx - 1.5 * s, cy + 4 * s); ctx.lineTo(cx + 5.5 * s, cy - 4 * s); ctx.stroke();
}

function header(ctx, count) {
  ctx.fillStyle = FOREST; ctx.fillRect(0, 0, W, 20);
  ctx.fillStyle = LEAF; ctx.beginPath(); ctx.ellipse(11, 10, 4, 6, .5, 0, 7); ctx.fill();
  ctx.fillStyle = CREAM; ctx.fillRect(20, 8, 30, 4);
  // The basket, with a brass badge once something is in it.
  ctx.strokeStyle = CREAM; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(70, 6); ctx.lineTo(73, 6); ctx.lineTo(76, 14); ctx.lineTo(84, 14); ctx.lineTo(86, 8); ctx.lineTo(74, 8); ctx.stroke();
  if (count) {
    ctx.fillStyle = BRASS; ctx.beginPath(); ctx.arc(87, 6, 5, 0, 7); ctx.fill();
    ctx.fillStyle = FOREST; for (let i = 0; i < count; i++) ctx.fillRect(84.5 + i * 2, 5, 1.2, 2.5);
  }
}

function browse(ctx, s) {
  ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
  const picked = new Set(PICKS.slice(0, s.picked).map(k => k.tile));
  ctx.save(); ctx.beginPath(); ctx.rect(0, 20, W, 116); ctx.clip();
  PRODUCTS.forEach((kind, i) => {
    const x = TILE.x[i % 2], y = TILE.top + Math.floor(i / 2) * (TILE.h + TILE.gap) - s.scroll;
    if (y > 136 || y + TILE.h < 20) return;
    const on = i === s.tapping;
    ctx.fillStyle = on ? WHITE : CARD; round(ctx, x, y, TILE.w, TILE.h, 4); ctx.fill();
    product(ctx, kind, x + TILE.w / 2, y + 13, .9);
    ctx.fillStyle = SHADE; ctx.fillRect(x + 6, y + 25, 18, 3); ctx.fillStyle = BRASS; ctx.fillRect(x + 27, y + 25, 8, 3);
    if (on) {
      // The tap: a brass ring that spreads from the finger and fades.
      ctx.strokeStyle = BRASS; ctx.lineWidth = 2; round(ctx, x + 1, y + 1, TILE.w - 2, TILE.h - 2, 4); ctx.stroke();
      ctx.globalAlpha = 1 - s.ripple; ctx.beginPath(); ctx.arc(x + TILE.w / 2, y + 14, 4 + s.ripple * 16, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
    }
    if (picked.has(i)) { ctx.fillStyle = FOREST; ctx.beginPath(); ctx.arc(x + TILE.w - 6, y + 6, 5, 0, 7); ctx.fill(); tick(ctx, x + TILE.w - 6, y + 6, .55, BRIGHT); }
  });
  ctx.restore();
  header(ctx, s.picked);
  // The basket bar along the bottom: a dot per item, brass once the order is ready to pay.
  ctx.fillStyle = s.picked === PICKS.length ? BRASS : FOREST; round(ctx, 8, 140, 80, 15, 5); ctx.fill();
  ctx.fillStyle = s.picked === PICKS.length ? FOREST : CREAM;
  for (let i = 0; i < PICKS.length; i++) { ctx.globalAlpha = i < s.picked ? 1 : .3; ctx.beginPath(); ctx.arc(20 + i * 8, 147.5, 2.5, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1; ctx.fillRect(56, 146, 24, 3);
}

function pay(ctx, s) {
  ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
  header(ctx, PICKS.length);
  // The basket page slides in from the right.
  ctx.save(); ctx.translate((1 - s.slide) * W, 0);
  PICKS.forEach((k, i) => {
    const y = 28 + i * 24;
    ctx.fillStyle = CARD; round(ctx, 6, y, 84, 20, 4); ctx.fill();
    product(ctx, PRODUCTS[k.tile], 18, y + 10, .6);
    ctx.fillStyle = SHADE; ctx.fillRect(32, y + 8, 28, 4); ctx.fillStyle = BRASS; ctx.fillRect(70, y + 8, 12, 4);
  });
  ctx.fillStyle = FOREST; ctx.fillRect(8, 104, 80, 2); ctx.fillRect(10, 110, 26, 5); ctx.fillStyle = BRASS; ctx.fillRect(62, 110, 22, 5);
  // Pay: a raised brass button that presses in, then three dots while the card goes through.
  const sink = s.press * 2;
  ctx.fillStyle = '#a87a24'; round(ctx, 10, 126, 76, 24, 6); ctx.fill();
  ctx.fillStyle = s.press ? BRASS : BRIGHT; round(ctx, 10, 124 + sink, 76, 22 - sink, 6); ctx.fill();
  ctx.fillStyle = FOREST;
  if (s.wait < 0) { ctx.fillRect(34, 133 + sink, 28, 4); } else for (let i = 0; i < 3; i++) { ctx.globalAlpha = i === s.wait ? 1 : .35; ctx.beginPath(); ctx.arc(40 + i * 8, 135 + sink, 3, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1; ctx.restore();
}

function paid(ctx, s) {
  ctx.fillStyle = FOREST; ctx.fillRect(0, 0, W, H);
  // A brass disc pops in with a cream tick, then the receipt slides up from the bottom edge.
  const pop = ease(s.q / .35), r = 22 * (.35 + .65 * pop);
  ctx.fillStyle = BRASS; ctx.beginPath(); ctx.arc(48, 52, r, 0, 7); ctx.fill();
  if (pop > .5) tick(ctx, 48, 52, 1.6, WHITE);
  const up = ease((s.q - .3) / .6), top = H - up * 62;
  ctx.fillStyle = WHITE; ctx.fillRect(22, top, 52, 70);
  ctx.fillStyle = SHADE; for (let i = 0; i < 4; i++) ctx.fillRect(28, top + 8 + i * 9, i === 3 ? 18 : 40, 3);
  ctx.fillStyle = BRASS; ctx.fillRect(52, top + 35, 16, 3);
}

export function paintScreen(ctx, state) {
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  if (state.mode === 'paid') paid(ctx, state); else if (state.mode === 'pay') pay(ctx, state); else browse(ctx, state);
}
