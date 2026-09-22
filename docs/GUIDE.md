# Gameplay and developer guide

[← Back to Canopy](../README.md)

## Playing the game

The six tray tabs are **Stations**, **Staff**, **Menu**, **Deliveries**, **Shop** and **Empire**. Tap the active tab or the panel handle to collapse the tray and see more of the shop.

- **Stations:** upgrade Seeds → Grow → Harvest → Pack → Orders → Pickup. Larger equipment illustrations sit beside current/next level and output or handoff comparisons, with Upgrade and Max underneath. Security uses the same layout for ID-check training.
- **Staff:** train employees to improve production and service. Orders training applies to every staffed order counter.
- **Menu:** unlock and improve strains, choose featured strains and develop flower, pre-roll and edible product lines.
- **Deliveries:** build the delivery pad, send available web orders and control the drone fleet.
- **Shop:** browse Production, Service, Customers, Products and Online upgrades.
- **Empire:** manage branches, meet regulars and collect rewards. Home leads to each store or **Rewards & records**; store screens contain Overview, Stock, People and Style.

Drag to pan, scroll or pinch to zoom, and use the center-map button to reset the view. The location button switches between owned stores. Tap a station in the scene to open its upgrades.

The HUD offers 1×, 2× and 4× speeds, day/night lighting and Settings. Pressing 1× while already at normal speed pauses the game and turns that button into a pause bar; pressing it again resumes. Settings contains sound, guide replay and reset. Sound effects are synthesised in the browser (no audio files): a soft low tap on each sale, a door chime as customers arrive, taps on tabs and speed changes, arpeggios for upgrades and construction, a whoosh when a courier drone leaves, a sparkle for rewards and a bonk when you cannot afford something. New games start with sound on; existing saves keep their setting. On desktop, **Space** pauses or resumes, **1 / 2 / 4** set speed, and **Escape** dismisses an overlay or collapses the tray. Focused buttons retain native keyboard activation.

## Staffed order counters

The Orders station and **Shop → Service → Order counters** offer two expansion purchases:

| Purchase | Price | Result |
| --- | ---: | --- |
| Open counter 2 | $2,500 | Two individual staffed counters |
| Open counter 3 | $12,500 | Three individual staffed counters |

Each purchase includes an employee. The scene expands into separate tiled counters with individual registers, payment pads, illuminated arches and customer positions. Existing Orders training improves the whole team.

One FIFO waiting line feeds free counters. Customers walk to their assigned position, order independently, then join the pickup queue. Staffed counters and self-order kiosks reserve complete baskets from the same stock budget, so simultaneous orders cannot promise the same bags. Security, bag preparation and pickup capacity still affect overall throughput.

The saved `orderCounters` field defaults to one for older saves and is limited to three. Expansion preserves existing station and staff levels. Reset and prestige start with one counter again.

## Production and progression

Station levels increase batch output; reaching levels 10, 20, 30, 50, 75 and 100 doubles the station's output again. The **retail tier**, determined by the lower of Orders and Pickup, scales customer baskets, storage, web-order size and branch income.

Orders and Pickup also gain service efficiency every five levels. This existing speed bonus is separate from purchasing additional physical order counters. The bottleneck guidance and next-investment shortcut point to the same production constraint.

Customers pass Security, order, collect their reserved bags and leave. Their preferences, patience and satisfaction affect sales and tips. Shop upgrades improve walking speed, queue comfort, storage, product value and other parts of the business. Prestige becomes available at $10 million lifetime revenue for the current run; the requirement triples per rank, with a permanent base-sale bonus for reopening.

### Shop story and goals

The Goals button opens seven story chapters connecting the first ten bags, station growth, a broader menu, Riverside, Mara's first request, all three stores and relationships with Mara, Sol and Kit. Chapter actions open the relevant existing controls. Existing saves receive credit for milestones already reached; chapters add no new currency or cash rewards.

Repeatable Shift goals remain available in the same dropdown. Empire home also links to the story. A new shop starts as seven construction sites: the first-run guide walks the door and the six stations in line order, each raised for free by tapping its site on the map (or the card's Build button), and ends by opening the shop, at which point customers begin to arrive. Skipping the guide finishes the build; a half-built shop resumes at its next site after a reload. The guide can be replayed from Settings once everything is standing.

### Deliveries

Building the **$7,500 delivery pad** also installs the base auto drone. Web requests then accrue over time; completed deliveries and Web marketing improve demand. Dispatch requires both a waiting request and sufficient packed stock, while walk-in reservations remain protected.

Automatic dispatch checks for a ready order every ten simulated seconds. The **$25,000 bulk upgrade** permits up to ten orders per launch, limited by demand and stock. Owners can switch Single/Bulk and turn automation on or off. Manual dispatch remains available. Pause stops dispatch, and offline earnings do not fabricate delivery completions.

### Managed branches

- **Riverside:** a cedar shop with a timber loft on a riverwalk, a footbridge to the far bank's promenade and boathouse, with cultivation and supply operations.
- **Old Town:** a three-storey brick boutique on a market square with a clock tower and fountain, botanical displays and specialty products.
- **City Center:** a glass flagship beneath its own tower on a downtown plaza, with a planted atrium and city delivery operations.

Each branch has its own map, ten upgrade levels, optional projects, stock, products, staff assignments, regular-customer requests and cosmetic choices. Transfers and deliveries share a limited driver fleet. Store growth changes the visible buildings, furnishings and neighborhood activity.

Branches share cash with the main shop while retaining independent management. Their base income contributes to offline earnings, capped at four hours at the normal rate; pause prevents offline earnings. Detailed operations do not invent offline customer visits or completed delivery journeys. A welcome-back report summarizes the return.

Career milestones, a seven-day UTC reward track, rotating shift goals and hourly events live under Rewards & records. Cash rewards scale with current income. Event deadlines follow real time, including while the game is paused. These are local systems based on the device clock, not server-validated accounts.

## Saves and installation

Progress is stored in browser local storage under `shift-save`, with `shift-save-backup` as a fallback. New fields migrate in place: saves without `shopOpen` load as open shops with every station standing. The start guide uses `shift-guide-seen`.

Storage is specific to the browser and origin: `localhost`, `127.0.0.1`, different ports and the hosted game have separate saves. Copying the repository does not transfer a player's progress. Use an isolated browser profile or test origin when seeding fixtures.

The web manifest, home-screen icons and production service worker support installation and an offline page fallback. Service-worker registration is disabled on `localhost` and `127.0.0.1`; production cache names are stamped with each build's script hash.

## Testing

```sh
npm test
npm run build
```

Unit tests use Node's built-in test runner. They cover migration, economy, progression, operations, strains, deliveries, drones, story chapters and staffed-counter assignment and reservations.

Browser checks should run against isolated saves at desktop and phone sizes. The latest helpers are:

- `tests/experience-check.js`: exports `runExperienceChecks('starter' | 'established')` for paused starter or established fixtures.
- `tests/order-counters-check.js`: exports `runOrderCounterChecks()` for a paused $20,000 legacy fixture with Orders level 1 and Orders staff level 0. It exercises both expansion purchases, the three-counter cap, training, station upgrades and layout bounds.

These are browser modules, not Node CLI scripts. Serve them through Vite and import them into the test page; they do not create their own fixtures. Production-preview checks can import the helpers from the separate development server.

`tests/construction-check.mjs` drives installed Chrome over the DevTools protocol with no npm dependency (`node tests/construction-check.mjs http://127.0.0.1:5174/`) and covers the construction intro at phone and desktop sizes: fresh sites, the seven taps, opening, reload, resume, skip and legacy saves.

`tests/lounge-check.mjs` uses the same harness on a shop with the lounge's first level bought: a share of the door heads for the curtain, no more guests sit than there are seats, the order line still fills to its twenty places while guests are inside, sessions burn packed jars, and leavers come out on the exit lane rather than through the shop.

`tests/keyboard-pan-check.mjs` uses the same harness (`node tests/keyboard-pan-check.mjs http://127.0.0.1:5174/`) at desktop size: each arrow and W A S D key moves the camera the way the view should travel and only along that axis, the camera coasts to a stop after release, two keys pan diagonally at the same overall speed, panning works while paused and across a speed key, the clamp holds under a long hold, arrows leave a focused control inside the sheet alone while WASD still pans, nothing moves from a text field or behind a modal, and the hint copy names the keys.

`tests/pause-toggle-check.mjs` uses the same harness (`node tests/pause-toggle-check.mjs http://127.0.0.1:5174/`): a second press of 1× at normal speed pauses and turns the button into a pressed pause bar, a press while paused resumes, 1× from 2× or 4× only sets normal speed, a Space pause shows on the button, and idle UI ticks leave the glyph node alone.

`tests/queue-check.mjs` uses the same harness (`node tests/queue-check.mjs http://127.0.0.1:5174/`) on a seeded busy shop: the order line's rope pen holds at least twenty places and fills (at least ten inside, half the arrivals use the kiosk) before spilling out of the door, everyone queuing stands on the roped route, no customer holds a pickup ticket before reaching the pickup line, and the pickup line never stalls with the counter free.

The older `tests/*-check.cjs` suites use Playwright and installed Chrome. Playwright is not included in `package.json`; provide it separately or set `PLAYWRIGHT_MODULE` to an existing installation. `GAME_URL` selects the target preview. Some older selectors predate the current Settings and Empire navigation, so review those suites before relying on them for current UI coverage.

**Latest recorded validation — September 19, 2026:** 64 unit tests and the classic production build passed. Counter expansion was exercised at 1440×1000 and 390×844, including both purchase paths, training, save/reload, simultaneous service, kiosk coexistence and reserved-stock safety. Day/night rendering was visually checked. This does not constitute testing on actual iPhone/Safari hardware. See [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md) for validation history and the [experience review](../artifacts/review/REVIEW.md) for the broader review.

## Project structure

| Path | Responsibility |
| --- | --- |
| `index.html` | Game interface and control panels |
| `src/main.js` | Main-shop simulation, Canvas rendering, customer routing, input and save integration |
| `src/economy.js` | Pure throughput, tier, basket and reward calculations |
| `src/order-counters.js` | Expansion prices, migration, FIFO assignment and shared reservations |
| `src/lounge.js` | Smoking-lounge levels (seats, cover, session premium, share of the door), admission and the take per session |
| `src/journey.js`, `src/journey-ui.js` | Story chapters, saved completion and journal interface |
| `src/progression.js` | Career, branches, daily rewards, goals and timed events |
| `src/operations.js`, `src/operations-ui.js` | Branch stock, products, staff, transfers, regulars and customization |
| `src/branch-maps.js` | Themed Canvas scenes for managed branches |
| `src/empire-shell.js`, `src/empire-stores.js` | Empire navigation and store presentation |
| `src/strains.js`, `src/depth.js` | Strain effects, product formats, prestige and related systems |
| `src/deliveries.js`, `src/auto-drone.js` | Delivery demand and automatic dispatch |
| `src/start-guide.js`, `src/settings.js`, `src/dialog-focus.js` | Onboarding, settings and accessible dialog behavior |
| `src/experience.css` | Recent story, mobile-layout and counter-control refinements |
| `scripts/make-classic.mjs`, `vite.config.js` | Safari-targeted classic build and relative assets |
| `public/` | Manifest, icons and production service worker |
| `tests/` | Unit tests and browser regression helpers |
| `dist/` | Generated production output |
| `AGENTS.md`, `PROJECT_CONTEXT.md`, `DESIGN.md` | Working rules, product history and visual conventions |
| `.openai/hosting.json` | Existing Sites identity and `dist/` hosting configuration |

## Origin and hosting

This project was imported from [Create Idle Factory Game](https://chatgpt.com/c/6aa999cd-b2ac-83ea-b9fb-ae1c53590c6d) on September 15, 2026. Earlier names were SHIFT and GROVE; the package name, `shift-save` key and hosting identity remain for compatibility.

The [existing hosted game](https://kevinloumeau.github.io/Canopy---Bud-Empire/) may differ from this checkout. Local changes are not automatically published. Preserve the existing Site in `.openai/hosting.json`; do not create a replacement Site when deploying updates.

For future work, open this folder as the Codex project and read `PROJECT_CONTEXT.md` first. Preserve Canvas 2D, the classic Safari build, fixed orientation, pan/zoom and existing saves. Keep the main shop playable while extending its systems.

## Launch page

`welcome/index.html` is the promotional landing page, served beside the game at `/welcome/` (the game stays at the site root so the canonical URL, manifest scope and service worker are unchanged). Vite builds it as a second page through `rollupOptions.input`; its stylesheet and images are hashed into `dist/assets/` with relative URLs, and `scripts/make-classic.mjs` still only rewrites the game's own entry. The page has no bundle of its own: a short classic inline script drives the pinned phone, the day/night switch and the share button.

Its Menu, Stations, Deliveries and Empire steps embed the game's real sheets as captured markup (`welcome/live/`), styled by the game's own stylesheets inside shadow roots (`welcome/game-ui.css`, generated) and driven by `welcome/live.js`. `node scripts/capture-live-panes.mjs http://127.0.0.1:5174/` regenerates those fragments, the station illustrations and the per-state phone frames; the Menu board is inlined in the page from `welcome/live/menu.json`.

Its other screenshots are actual gameplay. `node scripts/capture-showcase.mjs welcome/media http://127.0.0.1:5174/` drives the installed Google Chrome headlessly against a running dev or preview server, seeds a developed showcase save into a throwaway profile, accepts the age gate, and writes the phone (390×844 at 2×) and desktop (1440×900) frames. Your own save is not touched. Re-run it after visual changes so the page keeps matching the game.

## Telemetry

`src/telemetry.js` records a short funnel — `session_start` (with `day` since first visit and `returning`), `return_day` (once per calendar day, the D1/D7 signal), `session_alive` at 1/5/15/30 minutes, `age_gate`, `guide_step` / `guide_complete` / `guide_skip`, `first_upgrade`, `station_level_10/25/50/100`, `delivery_pad_built`, `chapter_complete`, `store_opened` and `prestige`. Properties are small enums or numbers; there is no user id or cookie. Events go to `window.plausible` (queued in its stub until the snippet in `index.html` is uncommented) and to `window.canopyTrack` if a page defines one. `localStorage['canopy-telemetry']='off'` silences a device; `'debug'` logs each event to the console. Per-device markers live in `canopy-first-seen`, `canopy-return-day` and `canopy-tracked`.
