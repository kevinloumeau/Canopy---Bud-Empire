// The self-order kiosk's touchscreen while a customer orders: they tap the three menu items in turn, each one lights
// up as it goes in the basket, then the pay button glows brass until the order goes through. Painted into a small
// canvas (the same layout as the menu kiosk.py bakes into kiosk.glb) and only repainted when the picture changes.

export const W = 96, H = 160;
const CREAM = '#ffe6a8', MID = '#5c9e4d', DARK = '#144d29', CARD = '#edcc8f', PICKED = '#d6ecc0', BRASS = '#d9a441', TAP = '#ffffff';
// Canvas rows (top down) of the three cards and the pay button; kiosk.py counts them bottom up.
const ROWS = [34, 62, 90], PAY = { x: 16, y: 130, w: 64, h: 16 };

// p: how far the order has gone (0..1), clock: seconds, for the pay button's pulse. Each row: 0 untouched, 1 being
// tapped, 2 picked. Pay: 0 idle, 1 lit, 2 lit bright.
export function screenState(p, clock) {
  const rows = ROWS.map((_, i) => { const at = .1 + i * .2; return p < at ? 0 : p < at + .08 ? 1 : 2; });
  const pay = p < .72 ? 0 : 1 + (Math.floor(clock * 4) % 2);
  return { rows, pay, key: rows.join('') + pay };
}

export function paintScreen(ctx, state) {
  ctx.fillStyle = CREAM; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = DARK; ctx.fillRect(0, 0, W, 20);
  ROWS.forEach((y, i) => {
    const s = state ? state.rows[i] : 0;
    ctx.fillStyle = MID; ctx.fillRect(8, y, 22, 22);
    ctx.fillStyle = s === 2 ? PICKED : s === 1 ? TAP : CARD; ctx.fillRect(30, y, 58, 22);
    if (s) { ctx.strokeStyle = BRASS; ctx.lineWidth = 2; ctx.strokeRect(9, y + 1, 78, 20); }
    if (s === 2) { ctx.strokeStyle = DARK; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(72, y + 11); ctx.lineTo(77, y + 16); ctx.lineTo(84, y + 6); ctx.stroke(); }
  });
  const pay = state ? state.pay : 0;
  ctx.fillStyle = pay === 2 ? '#f0c766' : pay ? BRASS : DARK; ctx.fillRect(PAY.x, PAY.y, PAY.w, PAY.h);
}
