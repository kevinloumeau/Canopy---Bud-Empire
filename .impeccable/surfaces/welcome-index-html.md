---
version: 1
slug: "welcome-index-html"
primary_target: "welcome/index.html"
related_targets: []
---

# Welcome page (welcome/index.html)

Scope: the launch landing page for Canopy: Bud Empire, served beside the game at `/welcome/` on the same origin (GitHub Pages under `/Canopy---Bud-Empire/`). Mode: Persuade. The game itself stays at the site root; this page only has to send people there.

Audience: adults (21+) who play cozy idle and management games on their phone; sharers who received the link. Job: understand what the game is in one viewport, believe it is charming and real, tap Play. Action: one primary link to the game (`../`). Proof: the game's own rendered screenshots (docs/assets, public/social-card.jpg), the six-step loop, the three neighborhood stores, the story chapters and regulars, and the honest platform facts (free, browser, no account, saves locally, installable, works offline).

Constraints: inherits the game's world (forest-green glass, cream type, restrained gold, Bricolage Grotesque + DM Mono). No invented claims, prices, ratings or store badges. Carry the 21+ notice and the fiction disclaimer. No age gate on the page itself; the game gates. Static HTML + CSS + a little inline JS; built by Vite as a second page; relative asset URLs.

## Direction contract

THESIS: The phone in hand. A mobile-first game is shown the way it is played: a real phone screenshot pinned in the visitor's view while the story of a run scrolls past it. Refuses the category default of hero-plus-feature-card-grid.

OWN-WORLD: The game's evening glass. Deep forest ground (#1a2e24 to #20372b), cream type (#f0f5e8), mint hairlines, a single gold (#e9c96a) reserved for the claimable moment, primary green (#55733e/#608149) buttons with an inner highlight, 24px glass radii, DM Mono for every figure and for the loop labels, Bricolage display headings tracked to -0.025em. Real screenshots in phone and desktop frames; no illustration.

STORY: In one viewport the visitor sees the actual game on a phone, reads "A little shop. Room to grow.", learns it is free in the browser with no account, and taps Play. Scrolling, the phone's screen pans through the shop and its sheet while the copy explains the loop, the stores, the story, the install path and the honest facts. They leave to play, or copy the link for a friend.

FIRST VIEWPORT: Desktop: a two-column stage. Left 55%: the headline at ~5rem, one paragraph, Play (primary green, gold-free) and a quiet "How it plays" anchor, then three mono facts (Free · Browser · No account). Right 45%: a phone frame ~380px wide showing the real stations screenshot, cropped to the map, standing on a soft dark-teal shadow, tilted slightly toward the copy. Nav is one thin row: leaf mark and wordmark, three anchors, Play. Mobile: headline, paragraph, Play, then the phone frame full width below the fold's edge.

FORM: The phone in hand, position 6 on the ordered list, dealt as lead by seed key c67943e7 (surface scope, persuade). Signature interaction: the pinned phone's screen crossfades to the real capture for the step in view (stations, menu, deliveries, empire, night), frozen on the active step under reduced motion; under each step's copy a zoomed crop of that capture points at the part being described (on phones the crop replaces the repeated device), and in the Deliveries step the crop is the shop map with a drone that leaves the pad as the section scrolls. The store scenes live in their own section, not in the phone.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

Unresolved: none blocking. A store listing (itch, Play) may be added when those pages exist; artifacts/launch holds the graphics.
