// Live panes for the launch page: the game's own Stations, Deliveries and Empire sheets, captured as markup,
// mounted inside shadow roots with the game's stylesheets, and driven by the page's scroll.
import gameCss from './game-ui.css?url';
import stations0 from './live/stations-0.html?raw';
import stations1 from './live/stations-1.html?raw';
import stations2 from './live/stations-2.html?raw';
import stations3 from './live/stations-3.html?raw';
import stations4 from './live/stations-4.html?raw';
import stations5 from './live/stations-5.html?raw';
import stations6 from './live/stations-6.html?raw';
import deliveriesHtml from './live/deliveries.html?raw';
import empireHtml from './live/empire.html?raw';
import art0 from './media/station-0.png';
import art1 from './media/station-1.png';
import art2 from './media/station-2.png';
import art3 from './media/station-3.png';
import art4 from './media/station-4.png';
import art5 from './media/station-5.png';
import art6 from './media/station-6.png';

const STATIONS = [stations0, stations1, stations2, stations3, stations4, stations5, stations6];
const ART = [art0, art1, art2, art3, art4, art5, art6];
const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tour = () => window.canopyTour || { show() {}, isActive() { return false; } };

function mount(host, html) {
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<link rel="stylesheet" href="${gameCss}"><div class="sheet live-sheet">${html}</div>`;
  host.classList.add('is-loading');
  const link = root.querySelector('link');
  link.addEventListener('load', () => host.classList.remove('is-loading'));
  link.addEventListener('error', () => host.classList.remove('is-loading'));
  return root;
}

// A pinned block whose scroll spacer drives a value: either an index across `count` stops or a continuous 0..1.
function drive(pinId, scrollId, onChange, count) {
  const pinEl = document.getElementById(pinId), sc = document.getElementById(scrollId);
  if (!pinEl || !sc) return null;
  let current = -1, ticking = false;
  const fit = () => {
    const vh = window.innerHeight || 1, h = pinEl.offsetHeight, want = window.innerWidth > 900 ? 84 : 72;
    pinEl.style.top = Math.min(want, vh - h - 12) + 'px';
  };
  const tick = () => {
    ticking = false; fit();
    const r = sc.getBoundingClientRect(), vh = window.innerHeight || 1;
    let t = (vh * .82 - r.top) / r.height; t = t < 0 ? 0 : t > .999 ? .999 : t;
    if (!count) { onChange(t); return; }
    const i = Math.floor(t * count);
    if (i !== current) { current = i; onChange(i); }
  };
  const on = () => { if (!ticking) { ticking = true; requestAnimationFrame(tick); } };
  window.addEventListener('scroll', on, { passive: true });
  window.addEventListener('resize', on);
  tick();
  return { set(i) { if (i !== current) { current = i; onChange(i); } } };
}

function setScreen(step, name) {
  step.setAttribute('data-screen', name);
  if (tour().isActive(step)) tour().show(name);
}

// Stations: one pane per station, the scroll (or a tap on the strip) selects the next one.
const stationsHost = document.getElementById('liveStations');
if (stationsHost) {
  const root = mount(stationsHost, STATIONS.map((html, k) =>
    `<div data-pane="factory" data-station="${k}"${k ? ' hidden' : ''}>${html.replace(`__STATION_ART_${k}__`, ART[k])}</div>`).join(''));
  const panes = Array.from(root.querySelectorAll('[data-pane="factory"]'));
  const step = document.getElementById('how');
  let controller = null;
  const select = k => {
    panes.forEach((p, i) => { p.hidden = i !== k; });
    setScreen(step, 'stations-' + k);
  };
  controller = drive('howPin', 'howScroll', select, STATIONS.length);
  panes.forEach(pane => {
    Array.from(pane.querySelectorAll('.machine-nav button')).forEach((btn, k) => {
      btn.addEventListener('click', () => controller && controller.set(k));
    });
  });
}

// Deliveries: the drone leaves the pad and crosses the sheet; near the end the order goes out.
const deliveriesHost = document.getElementById('liveDeliveries');
if (deliveriesHost) {
  const root = mount(deliveriesHost, `<div data-pane="orders">${deliveriesHtml}</div>`);
  const drone = document.getElementById('drone');
  const waiting = root.getElementById('deliveryWaiting'), shippable = root.getElementById('deliveryShippable');
  const title = root.getElementById('onlineTitle'), sendBtn = root.getElementById('fulfillOnlineMax');
  const baseWaiting = parseInt(waiting && waiting.textContent, 10) || 0;
  const baseTitle = title ? title.textContent : '';
  const baseNumber = parseInt(baseTitle.replace(/\D/g, ''), 10);
  drive('sendPin', 'sendScroll', t => {
    const s = t < .12 ? 0 : (t - .12) / .8, u = s > 1 ? 1 : s;
    const x = (1 - u) * (1 - u) * 14 + 2 * (1 - u) * u * 48 + u * u * 94;
    const y = (1 - u) * (1 - u) * 64 + 2 * (1 - u) * u * 10 + u * u * 6;
    if (drone) {
      drone.style.left = x + '%'; drone.style.top = y + '%';
      drone.style.transform = 'translate(-50%, -50%) rotate(' + (u > 0 && u < 1 ? 5 : 0) + 'deg)';
      drone.classList.toggle('is-flying', !reduce && u > 0 && u < 1);
    }
    const sent = u > .6;
    if (waiting) waiting.textContent = String(Math.max(0, baseWaiting - (sent ? 1 : 0)));
    if (shippable) shippable.textContent = sent ? '0' : '1';
    if (title && baseNumber) title.textContent = '#' + String(baseNumber + (sent ? 1 : 0)).padStart(3, '0');
    if (sendBtn) sendBtn.classList.toggle('is-sent', sent);
  });
}

// Empire: the scroll walks the three store cards, and the phone opens each store's screen.
const empireHost = document.getElementById('liveEmpire');
if (empireHost) {
  const root = mount(empireHost, `<div data-pane="empire">${empireHtml}</div>`);
  const cards = Array.from(root.querySelectorAll('.store-card'));
  const step = document.getElementById('empireStep');
  let controller = null;
  const select = i => {
    cards.forEach((c, k) => c.classList.toggle('is-live-focus', k === i));
    setScreen(step, i < 0 ? 'empire' : 'store-' + i);
  };
  // Four stops: the home list first, then each store.
  controller = drive('empirePin', 'empireScroll', i => select(i - 1), cards.length + 1);
  cards.forEach((card, k) => card.addEventListener('click', e => { e.preventDefault(); controller && controller.set(k + 1); }));
}

// Night: the crop fades from day to night as the step scrolls, and the phone follows at the midpoint.
const nightImg = document.getElementById('nightImg');
if (nightImg) {
  const step = document.getElementById('nightStep');
  drive('nightPin', 'nightScroll', t => {
    const u = t < .1 ? 0 : t > .9 ? 1 : (t - .1) / .8;
    nightImg.style.opacity = String(u);
    setScreen(step, u > .5 ? 'night' : 'stations');
  });
}
