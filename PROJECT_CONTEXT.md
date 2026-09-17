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
