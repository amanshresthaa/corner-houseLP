# Implementation Checklist

## Setup
- [ ] Capture baseline component snapshot and identify data from `restaurantData` used inside `LocationSection`.

## Build
- [ ] Redesign layout of `LocationSection.tsx` with new hero background, info cards, travel chips, and CTA button group using DaisyUI styles + lucide icons.
- [ ] Integrate map frame overlay + "Get directions" actions (Google/Apple/tel) with proper accessibility labels.
- [ ] Update `RestaurantHoursCard` placement/styling within new design.

## Tests
- [ ] Add/Update Jest tests (e.g., `tests/components/restaurant/sections/LocationSection.test.tsx`) covering headline rendering, action links, chips, and map/testids.

## Verification
- [ ] Run targeted Jest tests + any impacted suites.
- [ ] Perform manual QA via Chrome DevTools MCP (mobile/tablet/desktop) once access available.
