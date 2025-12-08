# Implementation Plan: Homepage “Find Us” Section

## Objective
Deliver a richer “Find us” experience on the homepage that highlights address, travel modes, parking, and quick actions (call/directions) using DaisyUI-styled cards and responsive layout while keeping data driven by `restaurantData` utilities.

## Architecture & Component Updates
- **LocationSection.tsx** (main target):
  - Maintain `getContactInfo()` / `getRestaurantIdentity()` usage but reorganize UI into a two-column hero: left column = text + action cards; right column = immersive map with overlay chips.
  - Introduce small subcomponents/helpers:
    - `InfoCard` for address/contact/hours, each with lucide icons and DaisyUI `card` styling.
    - `TravelChip` list (static copy) highlighting parking, Abbey Stadium distance, bus routes, etc.
    - `ActionButtons` for Google/Apple map links + `tel:` call CTA.
  - Keep `RestaurantHoursCard` (variant="dark") but integrate with new styling (glass card) to match design.
  - Add `aria-label` to `<section>` referencing location heading for better accessibility.
  - Use lucide icons (MapPin, PhoneCall, Bus, ParkingCircle, Bike, Navigation etc.) to replace emoji usage; keep EmojiIcon optionally for accent.
  - Provide `data-testid`s (e.g., `find-us-map`, `find-us-actions`) for future tests.
- **InteractiveMap** remains but wrap with gradient frame and overlay card containing CTA chips.
- Consider moving static copy (travel tips) into array defined inside component for clarity.

## Data Flow
- Continue deriving `contact.address` and `contact.phone` from `restaurantData`. Use `contact.address.map` for Google/Apple URLs.
- Build fallback tel link using helper (similar to CTA). No API changes needed.
- Travel tips may reference `contact.address` fields or brand strings for dynamic labeling.

## Testing Strategy
- Unit tests: extend `tests/components/restaurant/sections/CallToActionSection.test.tsx`? (No, need new tests in `tests/components/restaurant/sections/LocationSection.test.tsx` if not existing). Check tests directory for location section. If missing, create new test file verifying key DOM pieces (heading, map/testids, action links). Use jest/react-testing-library.
- Because data uses `restaurantData`, tests may need to mock `getContactInfo`/`getRestaurantIdentity` (jest.mock). Validate direction buttons have correct href.
- Run targeted Jest suite + `content:validate` not needed if no content change.

## Edge Cases
- Missing `contact.address` fields: fallback ensures data; still guard when constructing travel chip text.
- `contact.address.map.google` may be undefined; only render button when available.
- Ensure tel link gracefully handles undefined numbers (skip call CTA if missing).

## Rollout / QA
- After coding + tests, run `npm run test -- --testPathPattern=LocationSection` (new file). Build not required but optional `npm run content:validate` if new copy touches JSON (not expected).
- Manual QA via Chrome DevTools MCP once implemented: verify layout on 375/768/1280 widths, check focus states, map mask, and CTA interactions.
