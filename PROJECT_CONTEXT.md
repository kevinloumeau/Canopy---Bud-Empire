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
