# Native map visual regression fixes

- Restored staff working hands and carried tools using the existing station activity.
- Preserved employee identity when reduced motion is enabled.
- Restored herringbone oak with clipped diagonal boards; no boards extend outside the floor.
- Restored the pointed shapes and source angles of foliage and flower details.
- Replaced the Canvas fan overlay with native housing, rotating blades, fixed guard and screws.
- Moved branch leaf emblems onto their sign planes so they obey scene depth.

Verification: 101 unit tests; production/classic build and iOS sync; Debug simulator build; phone/desktop bridge interaction and fallback checks; native gameplay with 300 pickups and zero order violations. Reviewed main day/night and five branch scenes on iPhone, plus main day/night and Riverside on iPad. No physical-device performance claim.
