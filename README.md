# GROVE — Dispensary Idle

Local Codex project imported from **Create Idle Factory Game** on September 15, 2026.

- Original chat: https://chatgpt.com/c/6aa999cd-b2ac-83ea-b9fb-ae1c53590c6d
- Existing game: https://shift-idle-factory.loumeau-kevin.chatgpt.site
- Imported source: `f058b7c` — Replace manual work with idle startup and contextual bottom navigation.
- The repository and existing Sites identity are preserved. This import does not publish changes.

## Open in Codex

Add this folder as a local project using the project picker. Start future game tasks in this folder; `AGENTS.md` and `PROJECT_CONTEXT.md` carry forward the design decisions.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:4173. To build the Safari-compatible production output, run `npm run build`. To view that output, run `npm run preview`.

The app uses Vite, plain JavaScript, CSS, and an isometric Canvas 2D renderer. Node 22.12+ is a suitable runtime for the pinned Vite version.

## Key files

- `index.html`: game interface and panels.
- `src/main.js`: simulation, economy, rendering, customers, input, and saved progress.
- `scripts/make-classic.mjs`: converts the production entry to a classic script for mobile compatibility.
- `.openai/hosting.json`: existing Sites project identity.
- `dist/`: imported production output.
- `PROJECT_CONTEXT.md`: source-chat decisions and history.

Progress is stored under `shift-save` in browser local storage. Localhost and the hosted game have separate browser storage; downloading this project does not transfer a player's save.

## Empire progression

The **Empire** tab contains Growth, Daily and Events. Existing saves migrate in place; cash, stations, employees, flowers and customers served remain intact.

- **Career:** six lifetime-revenue milestones, from $1,000 to $5 million. Collect each for cash and an additive 5% permanent sale-value bonus (30% total). Reward cash does not count as revenue.
- **Managed stores:** Riverside ($5,000), Old Town ($30,000), and City Center ($150,000) open after $5,000 / $50,000 / $250,000 lifetime revenue respectively. Each has ten independent levels. Branch income shares the main cash balance, follows game speed and pause, and contributes to the existing four-hour offline earnings cap. Each branch has its own themed Canvas map, accessible from the location selector or **Visit store**. The original shop retains its production stations.
- **Daily:** seven consecutive UTC days pay $150, $250, $400, $600, $900, $1,300 and $2,500. The track repeats after day seven and restarts after a missed day. Claims persist across reloads.
- **Events:** three challenges rotate hourly. Join during the first 20 minutes, then complete matching pickups or online orders before that window closes. Completed rewards remain claimable until the next hour. Event timers use real time, including during pause, and offline earnings do not count. Every completion awards cash and a trophy.

These are local single-player systems using the device clock and existing local storage, with no account or server dependency. A persisted clock high-water mark prevents repeated claims from ordinary clock rollback; manual save edits or clock advancement are not server-validated.

Run `npm test` for migration, rewards, timing, branch economy and duplicate-claim checks. `tests/browser-check.cjs` exercises the production preview in isolated desktop/mobile browser contexts using Playwright and installed Chrome. Install/provide Playwright, start `npm run preview`, then run `node tests/browser-check.cjs` (or set `PLAYWRIGHT_MODULE` to an existing installation). Test screenshots are written to `artifacts/empire/`; tests do not use a personal browser profile.

## Store maps

- **Riverside:** cedar retail pavilion, riverwalk and pier, planted terrace, pergola lighting and waterside benches.
- **Old Town:** historic brick walls, stone arches, striped frontage, brass display cases and a botanical mezzanine.
- **City Center:** glazed flagship, planted atrium, rooftop gardens and bridge, city crossing and bicycle stands.

Open a branch before visiting it. The location selector or **Visit store** opens its map; **Manage** on the map or beside the selector opens that branch’s upgrade row. More stocked shelving, customer activity and extra displays/landscaping appear as its level increases. All branches remain managed stores with shared cash and independent levels; their customer figures visualize activity and do not separately generate income or timed-event progress. Opening Stations, Employees, Flowers, Online or Shop returns to the original store. Selecting **Original shop** also returns directly. Camera orientation and pan/zoom controls are shared; each visit recenters the map, and the chosen location is saved.

`tests/branch-maps-check.cjs` verifies every branch at desktop and mobile sizes, including location persistence, independent upgrades, income, immediate marker anchoring, pan/zoom and returning to the original shop. Run it against the production preview with the same Playwright setup as the gameplay test above.
