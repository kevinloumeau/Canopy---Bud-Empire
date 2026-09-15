# Project guidance

Read `PROJECT_CONTEXT.md` before working on the game.

- Continue the current dispensary direction and the user's latest decisions.
- Preserve the existing Canvas 2D renderer, Safari-compatible build, fixed orientation, and pan/zoom behavior.
- Preserve `shift-save` compatibility and existing progress; migrate new fields safely.
- Preserve the existing Sites identity in `.openai/hosting.json`. Do not create a replacement Site for this game.
- Keep changes within the requested scope. This import does not authorize redesign or publication.
- For game changes, validate the production build and exercise affected interactions at mobile and desktop sizes. In particular, check customer order-before-pickup behavior, upgrade effects, panel interactions, and saved progress when relevant.
- Do not reintroduce the removed Work button, map store name, or room labels without an explicit request.
