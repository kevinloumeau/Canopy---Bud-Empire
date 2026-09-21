# Project context

Reviewed all 21 turns of **Create Idle Factory Game**, through the September 15, 2026 update removing the Work button. Statements about earlier deployments below come from that conversation; they are not fresh gameplay test results.

## Current direction

A cute, visual, interactive, mobile-first dispensary idle game. The project began as SHIFT, an industrial factory game, and pivoted to GROVE. The original URL and save key remain for continuity.

## Latest requested behavior

- Six upgradeable stages: seeds → growing → picking → packing → orders → customer pickup.
- A small dispensary with separate order and pickup windows, back-stock room, and grow room.
- Customers enter from the left, queue, order first, move to pickup, collect, and exit right.
- Upgrades affect queue capacity and service speed.
- Upgradeable employees at each station, organized in a dedicated Employees tab.
- Extra online orders are optional and separate from walk-in customer sales.
- Bottom tabs: Stations, Employees, Online, Shop. Tapping the active tab collapses the panel. Tapping a map station opens its upgrades.
- No manual Work button: customer sales fund upgrades automatically.
- No visible store name or room labels on the map.
- Fixed isometric orientation with drag-to-pan and pinch/scroll-to-zoom; no rotation.
- Any overlays must track the map immediately, without delayed motion.
- Cute detailed shop graphics, smooth customer movement, working animations, and plant animation.
- Preserve saved cash and upgrade progress when changing the game.

## Important history

The original concept included production automation, contracts, upgrades, offline earnings, and automatic saves. The user repeatedly asked for a more visual, minimal interface and better graphics. A static PNG background was rejected in favor of interactive scenery.

A WebGL implementation repeatedly failed to load on iPhone. The chat then replaced it with a Canvas 2D isometric renderer and Safari-compatible classic production script. The user confirmed that version was working well before requesting further graphics improvements. Preserve this compatibility unless explicitly revisiting the rendering approach.

The industrial conveyor/robot reference predates the dispensary pivot. Do not revert the current theme to match that earlier reference.

## Reference assets

The original chat's three image attachments are retained in `references/` with their original filenames. Two accompanied iPhone loading reports; one accompanied the earlier industrial-game inspiration request. Attachment-to-message mapping was not provided by the retrieval tool.

## Import scope and next work

This is a source import and context handoff, not a redesign. No gameplay changes or live publication were requested as part of the import. Future improvements should start by inspecting the existing code and verifying the relevant behavior in a mobile-sized browser.

## Empire expansion (September 16, 2026)

The user requested deeper progression, daily rewards, multiple stores and timed events, and explicitly chose **managed branches with their own upgrades**. The Empire tray tab adds six career milestones with permanent sale bonuses, a seven-day UTC reward streak, three independently upgradeable managed branches with shared cash, and rotating hourly pickup/delivery challenges. Branches earn in parallel with the original playable shop; they do not replace its map. Progression is stored under `empire` inside the existing `shift-save`, with safe defaults for older saves. The production build and isolated desktop/mobile browser interactions were verified locally. This expansion has not been published.


## Themed store maps (September 16, 2026)

The user subsequently requested a separate map for each store, curated to its theme. Riverside now has a cedar shop and riverwalk; Old Town a historic brick boutique and botanical mezzanine; City Center a glass flagship, rooftop gardens and urban plaza. These are distinct live Canvas scenes, not palette swaps or image backgrounds. A persistent store selector and Empire **Visit store** actions switch between owned locations. Branches remain managed, with existing shared cash, independent upgrades and background income; this change does not convert them into separate six-station simulations. The original scene and production remain intact. Main-store controls return to the original map. A branch's selected location is saved safely alongside the existing empire progress.

The next refinement renamed **Visit map** to **Visit store** (active state: **Visiting store**) and enriched each branch with themed furnishings and architectural detail: Riverside canoe, reeds, café seating and pergola vines; Old Town flower boxes, botanical prints, a plant cart and atelier tools; City Center glazed lift, fountain, bicycles and balcony planting. Store-switching, upgrades, save persistence and camera interactions were rechecked at mobile and desktop sizes.

A further visual-detail pass added counter bags, payment pads, shelf tags, woven mats and hanging planters; river ripples, boardwalk fasteners, a rain chain/barrel and lifebuoy at Riverside; terracotta coping, drainpipes, ivy and parcel stacks in Old Town; and illuminated balcony edges, rooftop flower beds, fountain ripples and street bollards at City Center. New water animation uses the existing branch animation time, preserving pause and reduced-motion behavior. No economy or save format changes were made.

## Optional store projects

Branches now offer nine optional projects, three per store, with themed names defined in `STORE_PROJECTS` in `src/progression.js`. They unlock at branch levels 2, 4, and 7 and add 20%, 30%, and 50% base-income bonuses respectively to that branch, including offline earnings. Projects visibly improve vitrines, checkout fittings, and planters; native expandable controls beneath each Growth store row show locks, prices, and installed states, while store upgrades preview next-level income. Project flags migrate safely within the existing `shift-save`; existing main-store and branch levels remain unchanged, and purchases use shared cash.

## Store management progression (September 17, 2026)

The seven requested priorities now extend the current Empire systems. Riverside level 2 supplies River Mist to all branch feature menus; Old Town level 2 gains 40% income when featuring boutique products; City Center level 2 accepts 30-jar bulk deliveries using shared packing stock. Managers are unique assignments: Rowan improves exclusive-product income, Jules doubles satisfied-customer loyalty, and Alex improves hurried service and bulk rewards. Each branch retains independent levels, products, loyalty, and projects.

Regulars prefer everyday products; collectors unlock at 20 loyalty and prefer boutique/exclusive products; hurried shoppers need service within 20 seconds. The main shop evaluates preferences at actual pickup and pays satisfaction tips, with an additional VIP tip at 60 loyalty. Branch teams resolve managed customer visits every 12 simulated seconds; their loyalty adds up to 20% income. Offline income remains an estimate at 1× for up to four hours and does not fabricate customer visits or deliveries.

Branch levels 3, 5, and 7 add a display wing, staffed specialty table, and furnished terrace. Hourly events now theme the scene as a Night market, Visiting vendor, or Harvest festival, adding decorations and collectors; claimed events unlock persistent lantern, display, or planter keepsakes. Existing event deadlines and trophy rewards remain.

The Empire Today section shows three claim-to-rotate objectives, live customer needs, reputation, and the cheapest available station or branch investment. A persistent welcome-back summary lists estimated earnings for all four stores and goals ready to claim. It appears after at least a minute away and can be dismissed. Hidden tabs save on departure, suspend simulation, and collect capped offline income on return. New fields migrate in the existing `shift-save`; Sites identity and classic Canvas build remain unchanged. These changes are local and have not been published.

Validation: 14 progression tests pass. The existing gameplay suite and the new `tests/management-check.cjs` pass at 1440×1000 and 390×844 against the production preview. Screenshots in `artifacts/management/` cover before/after branch milestones, management controls, event scenes, and the return summary. The desktop Empire zoom-control overlap found during verification was corrected. The build retains the classic deferred script tag.

## Compact store controls (September 17, 2026)

Following the user's screenshot feedback that Growth had become too text-heavy, store rows now retain only level/income, a brief specialty, and loyalty. Product and manager selectors sit side by side with short benefit labels. Expansion status, served counts, specialty rules, and reassignment guidance sit under optional Store details; the general store explanation is collapsed. Redundant maximum-level copy/actions and project descriptions were removed. All purchases, settings, and mechanics remain available. Production build and desktop/mobile panel interactions, save persistence, and screenshots were verified.

The Today reputation section follows the same compact direction: loyalty count, next unlock, and a progress bar. Customer preferences and reward rules are a collapsed Customer guide; the repetitive live queue sentence is removed. Desktop/mobile rendering and disclosure controls were verified; mechanics are unchanged.

A further Growth refinement replaces repeated branch forms with three compact expandable store rows (name, level, income). Only one store expands at a time. Its upgrade/visit actions, product and manager selectors are immediately available, with projects and help below. The map's Manage action opens the matching row. Opening a row scrolls its controls into view. Desktop/mobile checks covered expansion, purchases, projects, manager assignment, store visits, and saved selections.

## Connected branch operations (September 17, 2026)

The user's fourteen deeper additions now share `empire.network`, migrated by `src/operations.js`. Existing base branch earnings and main-shop progress are preserved; stock-based product sales add revenue alongside them. Each expanded branch has Overview / Stock / People / Style subviews, keeping the collapsed three-row store list compact.

- Riverside grows finite harvest (120 storage cap). Ten-unit transfers consume source harvest on dispatch, reserve destination space, occupy a driver, and arrive after a saved simulated journey. Main-shop harvested stock can also be imported. Vans depart and arrive in branch scenes; active route progress is visible under Stock.
- Daily jars, Botanical tins and Reserve boxes trade harvest cost, production time and price. Research unlocks product lines. Players allocate finite shelf space in five-unit blocks, choose the production line, and cannot remove occupied spaces. Actual stocked items are consumed by managed product sales, requests and deliveries.
- Driver operations share a one-to-three-driver fleet with supply transfers. Deliveries send five selected products, respect a per-product walk-in reserve, consume local demand, and pay on completion. Coverage expands from local to district to citywide. Operations and story timers run only while playing; existing capped base offline earnings remain.
- Rowan, Jules and Alex retain unique store assignments, now with persistent experience and five specialty ranks. Rowan improves cultivation/production, Alex improves delivery time, and trained staff also improve base income. People shows their personality, location, XP and move action.
- Each branch has a named returning customer (Mara, Sol, Kit) with three product requests, relationship stages and a return delay. Requests consume real inventory and grant loyalty/rewards. Three grand-opening goals per branch introduce its supply role, products/delivery, and first regular.
- Counter finishes, awnings, plants, lighting and furniture layouts are free cosmetic choices with no economic multiplier. The Canvas renderer applies them directly. Successful product sales, delivery completions and relationships develop nearby storefronts, landscaping and pedestrians. A saved ten-minute day cycle changes lighting, foot traffic, arrival frequency and product preferences; it respects game pause/speed.
- Today has optional Business flow, Collection journal and Flagship status views. The journal tracks five strains, three products, three regulars, nine store milestones and three event souvenirs. Flagship requires all 23 entries, three quality stores, all opening sequences, and 60 main/branch loyalty. Cash alone cannot unlock it.
- Major branch upgrades/projects record the actual base-income gain, show temporary construction and a completion celebration, and retain the existing immediate purchase economics. Business flow identifies main-shop production/service backlogs and branch supply, shelf, production or service constraints with relevant navigation.

New files: `src/operations.js`, `src/operations-ui.js`, `src/operations.css`, `tests/operations.test.js`, and `tests/operations-check.cjs`. No publication or Sites identity change is included.

Validation: 25 economy/migration tests pass. Both the existing gameplay browser suite and the connected-operations browser suite pass at 1440×1000 and 390×844. The latter exercises product research, shelf allocation, transfers, delivery completion, staff reassignment, stories, customization, journal locks, upgrades, save/reload and fixed-orientation pan/zoom. Settled screenshots in `artifacts/operations/` were visually inspected, including the nighttime van and construction scenes. The production build retains the Safari-targeted classic deferred script.

## Visual location selector

The large shop dropdown and branch description panel are replaced by a compact icon rail: storefront, river cabin, historic arch, and city towers. Only the selected location shows a short name (icons only at narrow phone widths). Unopened branches show locks; a small settings control opens branch management. Store selection, keyboard activation, locking, saved selection, and fit were verified at 1440, 390 and 320px widths, with screenshots in `artifacts/location-rail/`. Existing browser checks now use the visible store buttons.

## Shop browser (September 16)
Shop now groups existing purchase controls into Production, Service, Customers and Products. An Affordable checkbox filters the current category; maximum upgrades move into a collapsed Completed section. Compact icon rows retain levels, benefits and prices. A recommendation opens the lowest-throughput station's upgrade view. Category ordering stays fixed as cash changes. No save schema or economy changes. Production/classic build and 25 unit tests passed; desktop, 390px and 320px browser checks exercised categories, filters, purchases, completed items, station navigation and save/reload. Screenshots are in artifacts/shop-browser.

## Core-loop and pacing pass (September 17)
Main-shop product formats now live in a compact Product line disclosure in Flowers: Flower, Pre-rolls ($2,500 unlock), and Edibles ($10,000). Featuring a format changes per-sale value, arrival demand, packing time and pickup service time; existing strain menus remain independent. A new `productMenu` field safely defaults older saves to Flower. VIPs unlock at 60 reputation, appear with gold labels, and pay double when served within 15 seconds; missed speed requirements pay the normal base sale.

Stations highlight the lowest-throughput stage and retain the existing capacity explanation. Online dispatch shows available-jar readiness; a separate world-anchored count identifies held walk-in bags. Optional sound in Shop enables lightweight sale and upgrade tones. Existing return summaries and the four-hour 1x offline cap remain; return summaries now retain actual uncapped time away.

Global boost cost growth is reduced from 4x to 2.25x and purchases cap at 12. Previously saved higher levels retain their effects. Contracts continue from $1M through further finite late-game milestones. Optional New beginnings in Empire Growth requires $1M cash initially (3x threshold each rank) and adds 20% permanent base-sale income per rank. Its separate confirmation explicitly clears run progress; prestige rank and sound carry forward. Opening the panel never resets anything. Main-shop/online base prices and base branch rates use the prestige multiplier; stock-based branch operations and fixed rewards retain their original formulas.

Timer callbacks now integrate elapsed time in fixed 50ms steps. Visible stalls over five seconds use capped offline estimates instead of dropping elapsed time. Hidden tabs suspend simulation and settle offline income once on return. This is tested with deterministic browser clocks; real-device Safari suspension remains a separate platform check.

Validation: 30 unit tests, existing desktop/mobile gameplay regression suite, new product/prestige browser checks and a deterministic eight-hour suspension test passed. Production build retains classic Safari output. Four-hour actual-simulation comparisons across all three products and two investment policies are in artifacts/economy/REPORT.md and four-hour-simulation.json. They confirm diminishing midgame service returns, not a fully balanced end-to-end economy. Screenshots in artifacts/depth were visually checked at desktop and mobile sizes. No publication.

## Auto drone upgrade
A $7,500 one-time Auto drone upgrade is available in Shop > Service and the Online tray. Purchase enables automatic dispatch of one ready online order, with a ten-game-second cooldown between launches. The Online On/Off control disables automation without removing the upgrade. Auto dispatch uses the existing online-order stock, reward, event and animated delivery path; it never consumes ready/reserved walk-in bags and suppresses repetitive dispatch toasts. It runs only during active simulation, respects pause/speed, and does not fabricate offline deliveries. Ownership, enabled state and cooldown persist under safely migrated `autoDrone` save data. Reset/prestige clears the upgrade with other run upgrades.

Validation: production/classic build and 33 unit tests pass. Desktop/mobile browser checks cover purchase price, initial automatic launch, unchanged walk-in bag stock, pause, toggle, saved cooldown and resumed dispatch. Screenshots in artifacts/auto-drone were visually checked. Not published.

Product line is now always visible at the top of Flowers, with compact flower, pre-roll and edible SVG icons. The three choices retain selection/unlock behavior; the status line is shortened, menu totals use compact copy, and detailed strain instructions move behind Strain guide. Desktop/mobile selection, purchase and saved-state checks passed; both layouts were visually inspected. No economy changes.

## Store lighting refinement
The main shop now has two warm pendant lights per floor, subtle counter-edge and display-shelf illumination, concealed mezzanine strips, cooler botanical accents in the grow area and alternating lit stair treads. Local glow pools use the existing Canvas projection and floor elevation, with layered strokes instead of full-scene blur. Night tint retains small warm highlights at actual pendant positions. Lights are steady, with no flashing or added motion, and have no gameplay or save impact. Production/classic build passed; desktop/mobile day and night renders were visually inspected, with zoom and fixed-orientation pan checked. Screenshots: artifacts/lighting. Not published.

The speed controls now include a sun/moon day-night lighting button. It switches the main shop and branch scenes immediately, including while paused, and saves the selected appearance in `lightMode`. Older saves retain the automatic visual cycle until the button is used. The underlying simulation clock, customer demand and earnings are unchanged. Production build passed; toggle, paused state, branch switching, reload persistence and HUD fit were checked at 1440, 390 and 320px. Screenshots: artifacts/light-toggle.

## Bulk automatic dispatch
Auto drone now has a second, $25,000 bulk upgrade, requiring the existing $7,500 base upgrade. Shop > Service keeps the drone row available until both tiers are owned; the upgrade is also available beside the Online controls. Bulk mode dispatches up to ten affordable-in-stock sequential orders per ten simulated seconds, including partial batches. It reuses the existing batch price/stock/event logic and grouped drone animation, preserving reserved walk-in bags. Buying bulk preserves the running cooldown and automation On/Off state, and selects bulk mode. Owners can toggle Single/Bulk independently of On/Off. Bulk ownership and mode migrate safely in `autoDrone`; older owned drones remain single mode.

Validation: classic production build and 34 unit tests passed. Desktop/mobile browser checks verified a full ten-order batch and a three-order partial batch, exact jars/rewards, untouched ready bags, saved cooldown and Single/Bulk mode. Screenshots in artifacts/bulk-drone were visually inspected. Not published.

Each branch now keeps its name, level/income and Overview/Stock/People/Style navigation together in a sticky header within the Empire scrolling pane. The header sits below the measured Empire tab bar and is bounded by its own store section. Collapsing a store hides its local tabs. Production build passed; all three branch headers, scrolling position, tab switching and collapse were checked on desktop/mobile, with screenshots in artifacts/sticky-store.

The always-expanded location rail has been reduced to a single 44px-high icon/name trigger. Tapping opens a compact two-column location chooser with existing lock indicators and Manage store; choosing a store closes it. Escape and outside taps dismiss it. The chooser is absolutely positioned so opening it does not change branch-camera framing. Selection and saved location remain unchanged. Build and desktop/390px/320px browser checks passed for compact size, selection, locks, management, dismissal and reload. Screenshots in artifacts/location-popup were visually inspected; existing branch browser checks now open the chooser before clicking its controls.

## Premium architectural lighting
Lighting now uses recessed LED channels with warm-white cores, soft edge spill and dark housings. Counter plinths, display shelving, mezzanine edges and the online bench gain continuous accents. Order/Pickup arches and Online Orders signs are softly backlit, with emissive highlights retained above the nighttime tint. Decorative planters have small visible uplight fixtures and restrained foliage washes; production crops are excluded. Canvas geometry, camera anchoring, steady reduced-motion behavior and all economy/save mechanics remain intact. Production build and desktop/mobile rendering plus fixed-orientation pan/zoom checks passed; final nighttime screenshots in artifacts/premium-lighting were visually inspected. Not published.

The Online Auto drone controls now place the Single/Bulk button directly beside On/Off in the same row, keeping status on the left. Purchase and toggle behavior are unchanged. Production build and desktop/mobile bulk-dispatch interaction checks passed; mobile layout was visually verified.

Location selector moved into the right-hand map controls below recenter. Its trigger is a 44px square showing only the current location icon; accessible names retain the location name. The chooser opens to the left, bottom-aligned with the trigger and width-limited for narrow phones. Branch camera framing remains independent of selector placement. Build and desktop/390px/320px interaction and geometry checks passed; screenshots in artifacts/location-right were visually inspected.

Removed the bottleneck station's yellow outline, inset highlight and duplicate Slow label, which competed with selected-tab styling. Only the viewed station now receives the selection highlight. The Bottleneck message, View station action and accessible tooltip remain. Production build and desktop/mobile tab-selection checks passed; mobile rendering was visually inspected.

User clarified that the in-tab bottleneck callout should remain. Restored the warm-colored “Lv N · Slow” text, while keeping the yellow border/inset highlight removed. Selected-tab styling remains independent. Build and desktop/mobile border/selection checks passed; mobile rendering was visually inspected.

## Delivery requests (September 17, 2026)

Web orders are now demand-limited. `state.onlineRequests` accrues while the order desk exists: one request per ~45 seconds at first, faster with completed orders (rate `(1 + completed/20) / 45` per second, capped at one per 5 seconds), up to a cap of 12 + completed/10 (max 40). Offline time accrues requests too, except while paused. Sending a delivery (manual, bulk, or auto drone) consumes one request per order, and dispatch is blocked with no requests waiting. The count shows as the sixth stock-strip item (labelled Delivery, drone icon) with four heat levels: 0 muted, 1–2 normal, 3–5 gold, 6+ gold-framed with a hovering icon; tapping it opens the Deliveries tab. The Online tab and its pane title are renamed Deliveries (Delivery under 400px), and the Flowers tab reads Flower. Saves without the field start at 0.

## Start guide (September 17, 2026)

A five-step first-run walkthrough (`src/start-guide.js`, `src/start-guide.css`) opens 600ms after loading when no `shift-save` existed at startup and `shift-guide-seen` is unset. Steps: welcome, station cards, cash and rate, the delivery counter, the Empire tab; each later step spotlights its target with a ring cut out of a dim overlay, and steps that point at the sheet switch the tray to Stations first. Skip or Escape closes it; finishing or skipping writes `shift-guide-seen`. The Shop tab's bottom row has a Replay the start guide button. Copy is deliberately light and cheeky.

## Security station (September 17, 2026)

Security is the first card in the Stations row and the map's Security marker opens it. It is a door station backed by the existing `idStaff` ID-checker training rather than a seventh production line: selecting it swaps the station panel to Security (level, seconds per check, +% check speed, tier names Unstaffed door / Door staff / Seasoned doorman / Head of security) and routes the Hire/Train and Max buttons to `trainIdChecker`. The Staff tab's ID-checker training remains and the two stay in sync. The station row is now seven vertical cards on every size.

## Installable web app (September 17, 2026)

`public/manifest.webmanifest` (standalone, portrait, relative start URL so it works under the GitHub Pages path), PNG icons at 192/512 plus an Apple touch icon rasterized from the leaf mark, and Apple/mobile web-app meta tags make the game installable to a phone home screen. `public/sw.js` is a small service worker: hashed `/assets/` files and icons are cache-first, the page is network-first with an offline fallback, and old caches are dropped on activate. It is registered only outside localhost so the dev server never serves stale code.

## One-time nudges

`state.hints` records three one-time toasts: the first web order request (points to Deliveries), the first full production shelf (points to Storage in the Shop), and the first full customer line (points to the order desk). Older saves get all three unseen. Desktop users also get keyboard shortcuts (Space pause, 1/2/4 speed, Escape collapses the sheet) and a pointer-aware map hint.

## Deliveries module and scoreboard

Delivery-request maths moved to `src/deliveries.js` (cap, rate, accrue, ready, consume, heat) with unit tests in `tests/deliveries.test.js`; `main.js` calls those functions. The Rewards & records screen opens with a scoreboard of lifetime revenue, customers served, deliveries completed, trophies and prestige rank, read from state through the Empire shell.

## Baskets (September 17, 2026)

Customers now buy a basket of bags: `basketSize() = 1 + floor((ordersLevel - 1) / 2)`, so the order desk governs volume as well as queue places. Ordering reserves the basket (or whatever is available, at least one), pickup hands over and charges for the whole basket, and both counter stations' throughput is measured in bags per second (service rate × basket). This ends the previous situation where Pickup was always the bottleneck by an order of magnitude and plant upgrades only filled storage; Seeds, Grow, Harvest and Pack now take turns as the constraint. `state.sold` counts bags and the scoreboard says Bags sold. No save format change.

## Economy review fixes (September 17, 2026)

A headless simulation (actual `simulate(.05)` from a fresh save with a buy-the-bottleneck policy) showed income plateauing at ~$160/s after the first hour, reputation stuck at 3–5 for hours, web orders unavailable for the first ~15 minutes, and several Shop purchases with no economic effect. The fixes, all save-compatible:

- `src/economy.js` holds the main-shop maths. Tiers (levels 10/20/30/50/75/100) now double output; the retail tier (lower of Orders/Pickup) doubles baskets, storage, ready bags, web-order size and branch income (`empire.retailBoost`, mirrored from the main shop each tick and migrated with a default of 1). Simulated income: ~$1.1K/s at 30 minutes, ~$3.3K/s at two hours, with reputation reaching the collector and VIP thresholds.
- Customers take a strain that fits their type (`preferredStrain`); the Flower tab and Customer guide say so. Hurried/VIP patience is 20s/15s stretched by Queue comfort (+15% per level). Customer traffic became **Floor flow** (walking speed), Curing equipment adds sale value, Lasting effects adds happy-customer tips. Happiness/highness meters still respond.
- Ready-bag prep leaves jars for the next waiting web order (`reservedJars`), so "Send 1" is available within the first minute.
- Daily, goal and event rewards scale with current income (`rewardScale`, minimum 1×). Prestige is gated on $10M lifetime revenue (×3 per rank) instead of $1M cash. The demand ceiling used for offline pay and reward scaling now counts whole baskets.
- Removed the one-time free kiosk grant that fired for every save on its second load. The bottleneck station is selected on load; the Shop's Recommended/Affordable row shows on phones; unopened stores hide Stock/People/Style; the Deliveries tab has one accessible name; the service-worker cache is stamped per build.

Validation: 46 unit tests and the production/classic build pass; fresh-save, mid-game and reload flows were checked in the browser at 375px and desktop. Browser check suites (Playwright) were updated for the prestige gate but not run here (Playwright is not installed). Not published.

## Experience review (September 19, 2026)

Two independent reviewers examined the current game. The resulting improvements preserve the architectural Canvas scene, fixed camera orientation, pan/zoom, economy, `shift-save` and Sites identity. The complete review is in `artifacts/review/REVIEW.md`.

- Shop story adds seven chapters inside the existing Goals dropdown, with a doorway from Empire home. Chapters connect bags sold, station upgrades, strains, branches and their regular customers. `journey.completed` safely migrates known chapter IDs, recognizes existing progress and retains earned credit; it introduces no cash rewards. Repeatable shift goals remain in a disclosure. Story actions open the relevant existing controls.
- Next-investment guidance uses the same bottleneck recommendation as Stations. Delivery goals explain the $7,500 pad prerequisite and open its funding card. Operational nudges wait until the start guide and other toasts are clear.
- Phone layouts give the map more room while keeping a consistent tray height across tabs. Large cash totals fit the HUD, staff labels avoid action buttons, station details scroll without overlapping, and bottleneck comparisons wrap. Unselected map plaques show only their names on phones.
- The user explicitly declined a lighter-animation mode. Existing animations instead gain distinct worker rhythms, moving shears, watering droplets, customer turn lean, carried-bag swing and settling, and interpolated counter-service progress. Pause, speed and the existing reduced-motion preference remain respected. Settings adds pause/resume, with no animation-quality option.
- Shared dialog focus handling contains keyboard focus, restores the opener and marks the background inert. Space retains native button activation. Shop and drone DOM updates use the existing 250ms UI cadence instead of every Canvas frame; map geometry is cached, hidden-page interface refreshes are skipped, and paused rendering is throttled while interactions invalidate immediately.

Validation: all 59 unit tests and the Safari-targeted classic production build pass. Dedicated production-preview fixtures exercised starter and established progress at 1440×1000 and 390×844, with additional 320×740 layout checks. Tests covered story actions, delivery prerequisites and reserved stock, upgrades, staff, branches, panels, pause, lighting, fixed-orientation pan/zoom and exact paused reload persistence for money, levels, staff, story, selected store and drone settings. Live customers were observed ordering before receiving bags; native Space, modal Tab/Shift+Tab and Escape were checked. Actual iPhone/Safari hardware was not tested. Not published.

## Staffed order-counter expansion (September 19, 2026)

Orders now has a separate two-step expansion: $2,500 opens a second staffed counter, and $12,500 opens a third. Purchase from the Orders station or Shop > Service > Order counters. Each purchase includes the employee; existing Orders training improves the whole team. The scene changes into separate tiled counters, each with its own employee, till, payment pad, illuminated arch and customer position. All counter surfaces open Orders upgrades when tapped.

One FIFO waiting line assigns customers to free counters; each counter runs its own service timer before the customer joins the existing pickup queue. Existing station-level service efficiency is retained, now described as efficiency instead of physical lanes. Staffed counters and self-order kiosks share a bag reservation budget that counts complete baskets, preventing parallel orders from reserving the same stock. Bag preparation, pickup limits and security still constrain throughput.

The new `orderCounters` field migrates to 1 for older saves and clamps to 1–3. It persists with the existing save; reset/prestige uses the fresh default of 1. Expansion preserves station levels and employee training. New pure helpers and regression tests live in `src/order-counters.js`, `tests/order-counters.test.js` and `tests/order-counters-check.js`.

Validation: 64 unit tests and the classic production build pass. Desktop (1440×1000) and phone (390×844) production-browser checks verified both prices, the three-counter cap, shared training, station upgrades, panel navigation, zoom/recenter and visible expansion controls. A paused reload preserved cash, station levels, staff and all three counters exactly. Live gameplay observed three simultaneous customers at distinct order counters, order-before-pickup and reservations within available stock. Day/night desktop and phone layouts were visually inspected. No publication.

## Menu layout repair (September 19, 2026)

The narrow Menu panel no longer truncates signature perks or hides traits in a horizontal strip. Strain details use a full-width row below the jar and statistics; descriptions, format benefits and help remain accessible. Format names and prices occupy separate grid rows, with a stacked icon layout and full-width statistics at the smallest phone widths. Only Menu markup and styles changed; the shared tray dimensions, game rules and saves are preserved.

Validation: the classic production build, layout scan and diff checks pass. An isolated preview exercised upgrade/unlock, format switching and reload persistence, with text bounds checked at 1055×998, 1440×1000, 390×844 and 320×640. Visual checks covered the supplied panel scale, long strain details, wrapped names and narrow format buttons. Short panels scroll vertically. No publication.

## Kiosk software prerequisite (September 19, 2026)

Kiosk software requires an installed self-order kiosk. Both the purchase handler and disabled control enforce the prerequisite, with “Install a kiosk first” on the locked card. Installation unlocks software immediately; existing software levels in older saves are retained. Hardware and software occupy the first two Service cards and stay side by side even when hardware is maxed. Other completed upgrades still sort to the end.

Validation: 64 unit tests and the classic production build pass. `tests/kiosk-software-check.js` passed against isolated production previews at 1055×998 and 390×844, covering a direct purchase-handler bypass attempt, installation, software pricing, three-kiosk adjacency and cash preservation. Reload retained purchased kiosks and software. No publication.

## Visual counter controls (September 19, 2026)

Per the user's correction, counter expansion now sits below the Orders equipment controls, statistics and funding bar. Three counter-and-staff icons replace the explanatory paragraph, showing open, next and future slots. Visible copy is limited to the counter count, next price and “Staff included.” At the three-counter cap the station expansion button is hidden and the row shows “All staffed.” This supersedes the earlier requirement to put expansion first on phones; primary equipment upgrades now appear before it and the counter row scrolls into view.

Validation: 64 unit tests and the classic build pass. Desktop and phone previews exercised expansion, visual slot changes, both purchase paths, the cap, training and station upgrades; the updated browser regression returned success at 1055×998. Phone checks at 390×844 confirmed the main upgrade appears first and the completed counter row is fully reachable without horizontal overflow. Reload preserved cash, counters, equipment and training exactly. No publication.

## Visual station upgrade layout (September 19, 2026)

The selected station now puts a larger, crisply rendered equipment illustration beside a compact current/next comparison, with Upgrade and Max beneath. Production shows units per batch; service shows handoff time; Security shows ID-check time. Adaptive decimal precision makes small service gains visible instead of repeating the same rounded value. Preview framing excludes overhead light fixtures and caches artwork until its visual state changes. The live shop renderer, economy, save format and counter-expansion placement remain intact.

Validation: classic production build and 64 unit tests passed. Isolated production checks covered all seven station selections and individual purchases at 390×844, all seven layout variants at 1055×998 and 320×640, desktop Max, disabled purchase states, tier artwork and exact cash/level/counter persistence after reload. Desktop and phone screenshots were inspected; short screens scroll to remaining controls and counter expansion. No browser errors. No publication.

## Construction-site props (September 19, 2026)

The unfinished delivery counter's cartons now rest on the dust sheet and stack directly on their lids. They draw in front of the rear sign uprights. Loose timber forms an aligned, strapped bundle on the deck instead of rising like steps; the small worktop block also rests on its actual surface. Crossed yellow-and-black construction tape spans the bottom stair entrance until the delivery pad is purchased. All details use the existing world projection and lighting, with no save or gameplay changes.

Validation: classic build passed. Isolated desktop and phone previews verified the geometry, day/night appearance, pan/zoom and the $7,500 delivery-pad transition. Purchasing clears the tape and site props, preserves station levels and leaves the expected cash balance. The player's save was not used.

## Grow-room exhaust fan (September 19, 2026)

A large metal exhaust fan is mounted on the left section of the grow room's rear wall. Four curved blades turn behind a fixed wire grille, once every 26 seconds at normal speed. Housing, mounting screws and rotor share the wall's isometric projection and existing day/night lighting. Animation follows the existing simulation clock, pause, speed and reduced-motion preference; offscreen drawing is skipped. No economy or save changes.

Validation: classic production build and diff checks passed. An isolated preview verified desktop and phone rendering, zoom, day/night appearance, moving blade pixels while running, unchanged pixels while paused and under reduced motion, and no browser errors.

## Order-counter lighting and signs (September 19, 2026)

Expanded order counters now use their actual narrow strip-light positions in both daytime and nighttime passes. Nighttime spill and shade cutouts follow each individual desk instead of the original wide counter. All overhead signs read “ORDER”; the small numbered plaques on the counter fronts are also removed. Counter capacity, staffing and customer routing are unchanged.

Validation: classic production build and diff checks passed. Isolated desktop and phone previews verified the three-counter layout, day/night alignment, unnumbered signs and zoom, with no browser errors.

## Staff-row overlap repair (September 19, 2026)

Staff names now sit above wrapping level/speed badges at every viewport. Train and Max retain separate columns, and their headings share the exact button widths. Rows retain their content height and 44px purchase targets; short panes scroll to the remaining staff. The conflicting phone-only workaround was removed, keeping the layout rules together in `sheet-height.css`. Training mechanics and save data are unchanged.

Validation: classic production build, diff check and scoped layout scan passed. Isolated previews at 1055×998, 1440×1000, 390×844 and 320×640 found no overlapping or clipped staff content and zero heading/button alignment offset. Individual training, Max, the final row on a short phone, and exact cash/security/staff persistence after reload were verified with no browser errors.

## Visual delivery-pad setup (September 19, 2026)

The unbuilt Deliveries tab now fills its available height with a large preview of the finished launch deck, packing counter and courier. It uses the existing Canvas artwork, rendered once per product/menu change without altering ownership, progress or the map camera. The courier drawing is shared with live deliveries. Three short illustrated benefits replace the paragraph: one drone included, automatic dispatch and +33% per unit. Funding and a full-width Build action anchor the bottom. On phones the artwork sits beside the benefits; short screens scroll to the purchase control. The old striped construction card is removed. Built delivery controls and purchase economics are unchanged.

Validation: classic production build, all 64 unit tests and diff checks passed. Isolated desktop and 390/320px phone previews verified layout, scroll reachability, 40% funding at $3,000, insufficient-funds protection, and the ready state. The purchase charged exactly $7,500, enabled automation, revealed dispatch controls and persisted after reload. Live parcel drones rendered correctly after sending orders; no browser errors occurred.

## Expanded-counter selection (September 19, 2026)

Selecting Orders now traces each installed compact counter at its actual dimensions, in the same depth order as the furniture. Expanded counters no longer inherit the original wide desk outline or its tier-based side extension. The single-counter outline and progression remain unchanged.

Validation: classic production build and diff checks passed. Isolated desktop and phone previews verified three- and two-counter highlights, deselection by choosing Pickup, and alignment while zoomed, with no browser errors.

## Orbiting station border (September 19, 2026)

The gold bottleneck border in the station strip now has two opposite breaks that travel along its rounded perimeter on a 16-second circuit. The gaps were subsequently halved to 3% of the perimeter each for a subtler effect, verified at desktop and phone sizes. An SVG stroke follows each card's dimensions while the existing glow and labels stay still. Motion pauses when the card is offscreen, the panel is collapsed or the page is hidden; the operating system's reduced-motion preference keeps both breaks stationary. No save or gameplay changes.

Validation: classic production build and diff checks passed. Desktop and 390px phone previews verified border fit, changing dash offset, keyboard selection, collapsed-panel pausing and reduced-motion behavior, with no browser errors.

When the bottleneck moves between stations, its border now inherits the outgoing stroke position through a matching negative animation delay. The 16-second rotation continues without restarting. Production build and desktop/phone upgrade checks passed, including Pickup → Orders at 38.75% of the circuit and Orders → Pickup at 64.375%, with both positions carried forward and no browser errors.

## Upgrade-badge wave (September 19, 2026)

Affordable upgrade badges now hop and shimmy in a traveling wave from Security through Pickup, staggered by 160ms with a quiet beat in each 3.6-second cycle. The gold bottleneck badge participates, and map badges use the same station order with smaller movement. Icons, labels and card positions remain stable; the orbiting gold border is retained. A shared visibility observer pauses offscreen motion, collapsed panes pause their badges, and reduced motion keeps the cues static. No economy or save changes.

Validation: classic production build and diff checks passed. Desktop and 390px phone previews verified distinct animation phases, all seven badge delays, matching map cues, the preserved orbiting border, collapsed-panel pausing and reduced-motion behavior, with no browser errors.

The Deliveries “Flower packed” total now displays whole ounces, rounded down, without fractions or decimals. Inventory retains its exact eighth-ounce units. The production build passed, and desktop/phone previews confirmed that 1,999 packed units display as “249 oz”.

## Empire records cleanup (September 19, 2026)

Removed Business flow, Collection journal and Flagship status from Rewards & records, including their markup, update handlers, empty group and unused presentation styles. Store management, rewards, reputation, New beginnings and saved progression remain intact. The obsolete browser-check step for those removed panels was retired.

Validation: production build, all 64 unit tests and diff checks passed. Desktop and phone previews confirmed all three sections are absent, no empty group remains, and Rewards & records / Riverside navigation still works without browser errors.

## New beginnings redesign (September 19, 2026)

New beginnings now opens into a visual current-to-next rank and sales-multiplier comparison. The permanent +20% base-sales bonus, lifetime-revenue progress and amount remaining explain the reward and its gate. Keep / Restart rows clarify carryover before a full-width “Reopen at rank N” action. The $10M initial threshold is explicitly a lifetime-revenue requirement, not a purchase price. Existing thresholds, reset mechanics and confirmation remain; the confirm action reads “Reopen from scratch.” Maximum rank shows only the earned 4.8× multiplier and a disabled completed-state action.

Validation: production build, all 64 unit tests and scoped design scan passed. Desktop and 390/320px phone checks covered 25% funding, revenue-based eligibility, confirmation cancellation with unchanged cash/rank/lifetime revenue and restored focus, maximum rank and overflow. The finish review approved the supplied layouts, then scored the maximum-rank SVG visibility and accessible-description corrections resolved. No browser errors occurred.

## Illustrated, always-open customer guide (September 19, 2026)

The Empire reputation guide is now a permanent section, following the user's request to remove its collapse control. Three illustrated customer profiles reuse the live shop's Canvas characters and Meadow Mint jar artwork. Preferences and visit limits sit below the portraits, followed by compact Match/Miss rewards, the 60-loyalty VIP unlock, and the branch-income benefit. Queue comfort updates both displayed visit limits; reaching 60 loyalty updates the base tip and unlock label. Portraits paint once and restore the shared rendering context and camera. No gameplay or save-format changes.

Validation: classic production build and 64 unit tests passed. Desktop (1280×960), phone (390×844), and narrow phone (320×640) rendering verified, with no guide horizontal overflow. The guide remains visible without a disclosure control; saved cash/reputation and upgraded patience values were checked in an isolated preview. Screenshots: `.impeccable/review/customer-guide/`. Not published.

Following feedback that the solid header backing was jarring, Empire back controls now sit outside a separate scrolling body. Their transparent background blends directly into the existing panel; content is clipped below the header instead of hidden behind a colored block. Rewards & records and store screens retain their fixed pane height, scroll reset on navigation, and pinned branch tabs. Production build, 64 tests, and desktop/phone scrolling and back-navigation checks passed. Current screenshots: `artifacts/compact-notifications/`.


Notifications now use a compact 12px treatment, tighter padding, a 14px upgrade icon, and a subtler shadow. Single-line messages are approximately 33px high; long messages wrap within the viewport (360px maximum width). Existing message content, status announcements, dismissal timing, and pointer pass-through are preserved. Production build, scoped design scans, and desktop/390px/320px checks passed, including actual upgrade feedback and a long-message fixture. No gameplay or save changes.

## Black-scene recovery (September 20, 2026)

A review found the world canvas could stay opaque black for the whole session while the simulation and HTML controls kept running. If the map measured under 40px wide when `resize()` ran (first paint before layout, a background tab, a collapsed split view), `cameraFrame()` produced a negative `unit`, every glow radius went negative, `createRadialGradient` threw `IndexSizeError`, and the thrown frame never re-armed `requestAnimationFrame`. The camera unit is now clamped to a positive minimum for both the main shop and branch maps, and the frame loop retries after a failed frame (logging once) instead of stopping. No economy, save or layout changes.

Validation: 64 unit tests and the classic production build pass. In a dev preview, forcing the map to 20px wide produced no error and the scene repainted fully once the width was restored; the same steps before the fix reproduced the black canvas. All six tabs and the desktop layout rendered normally afterwards. Not published.

## Review follow-ups (September 20, 2026)

The pickup “held” count now appears only when at least one customer is waiting for a bag, sits above-right of the PICKUP sign, clear of the Pickup station marker, and has a dark rounded backing for legibility. The map gesture hint follows the active pointer at runtime and drops the keyboard shortcuts on maps narrower than 560px; it is set after the first layout pass instead of before it. The two off-screen readback canvases for station and delivery previews are created with `willReadFrequently`.

Safari compatibility: every `ctx.roundRect` call (customer glasses, product blocks, the held pill) now goes through an `arcTo` path helper, since Safari 14–15 lacks `roundRect` and one thrown frame previously blanked the scene. Every `dvh` height declaration is preceded by an equivalent `vh` fallback across nine stylesheets, and the Menu tab’s `color-mix()` strain tints have plain-color fallbacks, so Safari before 15.4/16.2 keeps a sized app root, capped sheets and readable strain cards. Modern browsers keep the newer values.

Validation: 64 unit tests and the classic build pass; the built CSS retains all 24 `vh` fallbacks and the built JS contains no `roundRect`. Headless Chrome captures at 463×933 and 1280×900 with fresh and developed saves showed the hint copy per size, the held pill in place, Staff/Deliveries/Empire/Menu unchanged, pause preserved across tab switches, and no page errors. Not published.

## Gradient reuse and touch targets (September 20, 2026)

Profiling a developed shop at phone size showed the scene creating about 3,300 linear and 740 radial `CanvasGradient` objects per frame: `poly()` shaded every hex-filled polygon with a new vertical gradient, `ellipse()` every hex-filled ellipse with a new radial one, and `litTop()`/`softRadial()` added more. Gradients are now reused through a per-context cache keyed by colour and quarter-pixel geometry (`cachedGradient`), with the hex-colour regex memoised. Per-frame creations fell to roughly 310 linear and 10 radial; headless p90 frame time dropped from 33ms to 17ms and the rendered scene is pixel-identical. The cache clears itself past 12,000 entries so moving objects cannot leak.

On coarse pointers the HUD speed, lighting, settings and story buttons and the map station markers now expose 44px-tall hit areas through invisible pseudo-elements; drawn sizes and mouse behaviour are unchanged.

Validation: 64 unit tests and the classic build pass. CDP probes confirmed the draw-call reduction, unchanged rendering, `(pointer:coarse)` switching the hint to “PINCH TO ZOOM”, and taps 20px above or below each control still landing on it under touch emulation but not with a mouse. Not published.

## Marker badges, offline fonts and remaining gradients (September 20, 2026)

On phones the unselected station markers hide their level line, which left the upgrade badge sitting on the first letter of the name. Below 780px the badge now moves to the right of the name (positioned with `top`/`right`, leaving `transform` to the hop animation) and the plaque reserves room for it; the selected two-line plaque and desktop markers are unchanged.

`castShadow`, `shadowBand` and `shadowBandX` now reuse gradients through the same `cachedGradient` helper, bringing per-frame gradient creation in a developed shop to roughly 180 linear and 10 radial (from about 4,000).

The service worker keeps Google Fonts in a separate `canopy-fonts` cache that survives deploys: the `@import` stylesheet (an opaque no-cors response) and the woff2 files are served cache-first and refreshed in the background, so an installed shop keeps Bricolage Grotesque and DM Mono offline. The compact strain layout for narrow panes has a viewport-based fallback for browsers without container queries. `.claude/launch.json` gains a `canopy-preview` entry serving `dist/` on port 4181.

Validation: 64 unit tests and the classic build pass. Phone captures show badges beside every marker name. The production build on `canopy.localhost:4181` registered the worker, cached the stylesheet plus two font files after one revisit, and reloaded fully offline with all 11 font faces loaded and the scene drawn. Not published.

## Intro hero, menu cards and settings trim (September 20, 2026)

Per the user's feedback: the start guide's first frame is now a hero card. A stage built from the shop's own Canvas pieces (counter, three jars, plants, two customers, the courier drone) is painted once by `paintIntroArt` into the card's header under a warm glow with drifting sparkles, above a “Canopy · Day one” eyebrow, “Your shop opens today.”, three Grow / Sell / Expand beats using the tray icons, and a full-width “Open the shop” action. Motion stops under reduced motion; later steps are unchanged.

Strain cards are shorter: every name breaks onto two lines so the four cards match, the jar art is 36×45, and locked strains show their unlock price as a kraft-coloured hanging price tag with a notch and hole. The strain hero is tighter (64px art, smaller gaps and chips, single-line stat labels “eighth / THC / next lv”), and tapping a card scrolls the hero fully into view, so the busiest card fits a 390×844 pane.

The in-scene “N held” pill is gone; the count now appears in the Pickup station status chip (“Waiting · 3 held”) and its tooltip. Settings keeps Sound, Start guide and Start over only — pause and lighting already live on the HUD.

Validation: 64 unit tests and the classic build pass. Phone (390×844) and desktop (1280×900) captures checked the hero card, the four cards with price tags, the Amber Bloom hero fully in view after a tap, and no page errors. Not published.
