# Open architectural dispensary

Mode: Experience. The user’s latest reference is a warmly lit, multi-floor office cutaway, superseding the closed miniature-city building.

- Three stepped, open interior floors retain all six stations at their existing elevations.
- Remove the front facade, awning, solid building cores, exterior garden island, and greenhouse roof frame. Keep rear forest-green walls and short side returns.
- Stone ground and grow floors, a timber processing mezzanine, dark metal posts and balustrades, black-framed glass, wood shelving, retail displays, lounge seating, and potted plants.
- Two open stair flights with warm illuminated treads and landing connections link the floors.
- Warm wall strips, contact shading, subtle material gradients, and a muted dark green backdrop create the evening architectural mood.
- Light stone interface panels preserve clear contrast. Queue, compact speed controls, upgrade progress, saves, selection, and pan/zoom remain functional.
- Responsive fit includes the complete base island. Station elevation remains shared by render, markers, hit testing, selection, and rewards.
- This is live Canvas 2D geometry, not a pre-rendered image. No reference slogans or logos are copied.

## Retail inspiration refinement

The user’s subsequent shop references add fluted oak and pale marble service counters, glass product vitrines, brass trim, illuminated oak cubby shelves, warm globe pendants, and planted wall panels. Keep the open multi-floor architecture and green palette.

## Production connections

Roller conveyors join Seed → Grow, Pick → Pack, and Order → Pickup. Mint transfer tubes with moving gold parcels bridge Grow → Pick and Pack → Order between floors. A rear processing conveyor and nursery perimeter pipe extend the visible logistics around the rooms. Transport animation uses the existing game clock, respecting pause, speed, and reduced motion.

### Transfer refinement

Rounded glass tubes use sampled curved paths shared by transport animation. Brass couplings and dark inset floor collars clarify the grow-to-pick and pack-to-order penetrations. Cargo evolves along the production chain: seedlings, plants, flowers, jars, bags. Both belts and tubes use the same stage-specific item renderer.

### Routing clarification

Only three direct same-floor belts remain: Seed to Grow, Pick to Pack, and Order to Pickup. Only two tubes remain: Grow to Pick and Pack to Order, passing through floors. Removed the nursery tube loop and unrelated rear processing belt.

### Store detail pass

Added labeled jar display islands with glass covers and fluted oak bases, stocked illuminated merchandise bays on all floors, hanging planters with trailing vines, and a small indoor tree beside an oak bench. Decorative props avoid the production belts, floor tube openings, and customer queue.

### Playful retail accents

Peach-backed arched shelving on the processing side wall, staggered circular illuminated product niches upstairs, a textured moss panel behind the lounge, and a terracotta botanical plinth add variety without changing production routes.

Online Packing sits on a left-side landing at elevation 7.05, halfway between processing (4.7) and grow (9.4), with a dedicated rising jar tube and matching click target.

Bottom-floor retail finish follows the latest references: forest-green grouted tile counters and column bases, pale oak flooring, a cream tiled service zone, brass foot rails and sconces, cream plaster, and terracotta stools. Upper-floor finishes and logistics remain unchanged.

## Empire progression controls

Empire is the sixth bottom-tray tab, with a readiness dot for available rewards. Its sticky Growth / Daily / Events subnavigation shows one section at a time and resets the pane scroll when switching. It inherits the forest-green tray, cream text, pale-green primary actions and progress bars, muted separators, gently rounded corners, and brass focus outlines. Buttons retain a minimum 44px height; the six tab labels compact on mobile.

- **Growth:** Show lifetime-revenue milestone progress, cash rewards, and the cumulative permanent sale bonus above the store list. Riverside, Old Town, and City Center are managed branches with independent levels, shared cash, automatic earnings, visible unlock requirements, and contextual Open / Upgrade / Maximum actions. Each branch row pairs its name, level, and income with its action.
- **Daily:** Present the seven-day reward track in a four-column grid, highlight the current day, and mark collected days with checks. A full-width claim button and countdown to midnight UTC explain availability; the track repeats after Day 7 and restarts after a missed day.
- **Events:** Pair the challenge description with a prominent countdown, progress bar, completion count, contextual join or claim action, and trophy total. Explain the hourly schedule, first-20-minute play window, reward deadline, and timers continuing while paused or away.

These controls extend the existing tray. The original shop remains intact alongside the branch scenes, preserving its live Canvas 2D rendering, fixed orientation, pan/zoom, production routes, and station interactions.

### Branch maps

Each owned branch has a distinct live Canvas scene: Riverside combines a planted riverwalk, cedar shop, pergola, and waterside seating; Old Town uses historic brick, arched windows, brass displays, and an upstairs botanical atelier; City Center pairs a glass atrium with rooftop gardens and a city plaza. All scenes share the original map's projection and pan/zoom gestures.

A persistent forest-green location selector below the HUD shows available stores; unopened branches remain disabled. Growth rows add a Visit store action, while both the selector's Manage button and a world-anchored Manage control open the viewed branch's upgrades. The map control tracks projection immediately as the camera moves. Selecting any main-store tray tab other than Empire returns to the original shop. Branches retain independent upgrade levels and the shared economy; their animated visitors are visual, while managed earnings remain automatic.

Scene detail refinement adds a moored canoe, reeds, café seating, pergola vines, and nursery irrigation at Riverside; flower boxes, botanical prints, a plant cart, workbench tools, and café seating at Old Town; and a glazed lift shaft, reflecting fountain, bicycles, balcony vines, and rooftop benches at City Center. The active branch action reads Visiting store.

A further detail pass adds counter bags, payment pads, receipt trays, shelf tags, and mats across the branches. Riverside gains sconces, hanging plants, board fasteners, water ripples, a rain barrel and chain, a lifebuoy, and path lighting; Old Town gains terracotta coping, a drainpipe, ivy, sconces, and parcel stacks; City Center gains balcony and bridge lighting, rooftop flower beds, fountain ripples, and street bollards. Existing layouts and economics remain intact, and animated effects use the shared animation time, respecting pause and reduced motion.

Old Town's entrance layers each canopy tile, lintel segment, and post with its cap by depth alongside branch objects and customers, preserving correct occlusion without changing the awning's geometry or colors.

City Center draws rear shelves and the lower lift before columns and upper floors, wraps the right balcony around a lift opening with a separately drawn upper shaft, and uses low planter-rim lights in place of tall bare poles to keep display cases visible.

Old Town's revised furniture layout places service counters and staff deeper inside the shop and brings glass display cases forward near the entrance. Guest approach, order, pickup, and exit paths, together with the world-anchored Manage control, follow the rearranged layout.

### Store projects

Each Growth store row includes a native expandable Store projects section with an installed count, level locks, prices, income gains, and Installed states; the main upgrade row previews next-level income. Three optional projects per branch unlock at levels 2, 4, and 7: Riverside offers Riverwalk showcases, Cedar checkout, and Pollinator planters; Old Town offers Brass vitrines, Boutique checkout, and Heritage flower boxes; City Center offers Flagship showcases, Concierge checkout, and Atrium planting. Their visible changes are brass vitrine trim with a warm display strip, a larger brass-framed checkout screen and rail, and flowering planters. The respective 20%, 30%, and 50% base-income bonuses add together for that store, including offline earnings, while existing branch levels remain independent.

## Top bar

One row on every size: the leaf mark (with wordmark on desktop), cash as the hero in DM Mono with the income rate as a small +$/s suffix, the customer queue as one figure with a people icon, and a single glass speed pill (pause, 1×, 2×, 4×, day/night). Cash and rate labels exist for screen readers only; picking-up and served totals are hidden; the stock row left the header. Map overlays hang off the measured `--hud-height`.

## Bottom bar

The tray's six tabs are icon-led: a 22px line icon in the HUD's 1.6 stroke above a short label, six equal columns, the pressed tab keeping the glass pill. Attention dots sit on the icon's shoulder, never inside the label. Below 400px the Employees tab reads Staff; its pane title stays Employees. Above the tabs sits the stock strip, Seeds through Ready with icon, label and mono count, each item opening its station; the happiness and highness meters are hidden. Collapsed, the header shrinks to a sheet handle, so the collapsed sheet is handle, stock strip, and tabs.

## Empire pane

One list, then one screen at a time. The Today / Growth / Daily / Events switcher is gone. **Home** shows a rewards strip only when something is claimable (daily, milestone, event, goals, as gold chips that collect on tap, plus Collect all), otherwise one quiet line with the next daily and event timers; then the store list (name, level and rate in DM Mono, chevron); then a single Rewards & records door. Tapping a store opens a **Store** screen with a sticky Back bar, the branch's Overview / Stock / People / Style tabs beneath it, and its body. **Rewards & records** holds the career milestone, daily track, event, goals, reputation guide, business flow, journal, flagship checklist and prestige, each in its own group. Map Manage and bottleneck shortcuts still open the store screen directly. On phones the pane may use 48dvh (44dvh on short screens). All game controls keep their ids; `src/empire-shell.js` only reparents them.

## Legibility floor

Functional text is 11px or larger and paragraphs 12px or larger everywhere in the sheet and HUD; the stock strip drops its labels on phones under 480px rather than shrinking them (labels stay for assistive tech). Primary action green is #55733e so cream labels clear 4.5:1. Faint lime and gold glows are part of the game's light (tab badges, the hot delivery counter, the claimable milestone, live upgrade buttons, the selected marker); keep them at low alpha on dark glass. The sheet, HUD and toast carry a soft dark-teal elevation shadow. Sticky bands inside the sheet (Empire back bar, branch tabs, shop header) use the sheet's own glass at 90% with blur, never an opaque box. The daily track abbreviates the two largest rewards ($1.3K, $2.5K) so all seven days fit one row.
