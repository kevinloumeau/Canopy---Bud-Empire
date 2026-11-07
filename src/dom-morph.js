// Updates a panel in place instead of swapping its innerHTML (Kevin, 2026-11-07: "the flower upgrade button glitches
// after clicking and scrolls up"). Rebuilding the strain card threw away the button just tapped (so its upgrade spring
// never showed and iOS dropped focus mid-tap), re-decoded the 3D icon (a blank frame) and, with no scroll anchoring in
// WebKit, let the sheet jump. Morphing keeps every node whose markup is unchanged, and only rewrites what differs.
export function morph(target, html) {
  const next = target.ownerDocument.createElement(target.tagName);
  next.innerHTML = html;
  patchChildren(target, next);
}

function patchChildren(from, to) {
  const a = Array.from(from.childNodes), b = Array.from(to.childNodes);
  for (let k = 0; k < b.length; k++) {
    const old = a[k], fresh = b[k];
    if (!old) { from.appendChild(fresh); continue; }
    patchNode(from, old, fresh);
  }
  for (let k = a.length - 1; k >= b.length; k--) from.removeChild(a[k]);
}

function patchNode(parent, old, fresh) {
  if (old.nodeType !== fresh.nodeType || old.nodeName !== fresh.nodeName) { parent.replaceChild(fresh, old); return; }
  if (old.nodeType !== 1) { if (old.nodeValue !== fresh.nodeValue) old.nodeValue = fresh.nodeValue; return; }
  if (old.outerHTML === fresh.outerHTML) return;
  // An image whose source changes is swapped whole; anything else keeps its node and gets the new attributes.
  if (old.nodeName === 'IMG' && old.getAttribute('src') !== fresh.getAttribute('src')) { parent.replaceChild(fresh, old); return; }
  syncAttributes(old, fresh);
  patchChildren(old, fresh);
}

// Classes added from script (the upgrade spring, a pressed state) are kept when the new markup has the same base class.
const LIVE_CLASSES = ['upgrade-pop'];
function syncAttributes(old, fresh) {
  Array.from(old.attributes).forEach(attr => { if (!fresh.hasAttribute(attr.name)) old.removeAttribute(attr.name); });
  Array.from(fresh.attributes).forEach(attr => {
    let value = attr.value;
    if (attr.name === 'class') LIVE_CLASSES.forEach(c => { if (old.classList.contains(c) && !fresh.classList.contains(c)) value += ' ' + c; });
    if (old.getAttribute(attr.name) !== value) old.setAttribute(attr.name, value);
  });
  if ('disabled' in old) old.disabled = fresh.hasAttribute('disabled');
}
