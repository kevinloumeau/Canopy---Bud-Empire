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
