# Implementation Plan: Replace contact details with Corner House values

## Objective
Ensure all contact/address/email details across the repo use The Corner House Cambridge information (231 Newmarket Road, CB5 8JE, +44 1223 921122, cornerhouse@lapeninns.com) with matching map links and coordinates.

## Success Criteria
- No instances of the previous Waterbeach contact details remain (address, postcode, old email/phone, Gmail alias).
- Canonical config and loaders return the Corner House contact info.
- Tests/mocks updated to new values and remain passing.
- Map/SEO URLs point to the Cambridge location.

## Architecture & touchpoints
- **Config**: `config/restaurant.json` as source-of-truth.
- **Data loader**: `lib/restaurantData.ts` fallbacks.
- **Content/SEO**: hard-coded links in `libs/seo.tsx`, `components/restaurant/TestimonialsSection.tsx`, `HomepageReviewHighlights.tsx`, `components/seo/RestaurantSchema.tsx`, `libs/seo-examples.md`.
- **Tests/mocks**: `test-utils/mocks/handlers.ts`, `tests/test-utils/msw-handlers.ts`, `tests/components/sections/ContactInfoSection.test.tsx`, other tests referencing postcode/address.
- **Docs/copy**: `Everythingyouneed/*.md`, `app/christmas-menu/page.tsx`, similar reference text.

## Implementation Steps
1. Update `config/restaurant.json` with new address fields, postcode, coordinates, and map URLs; keep phone/email already set.
2. Align `lib/restaurantData.ts` fallbacks (identity/address/map links/postcode) to Corner House details.
3. Replace remaining legacy strings tied to the Waterbeach contact info across code/docs/tests; adjust Google Maps links to 231 Newmarket Road.
4. Update mocks/tests to expect the new address/postcode/coordinates.
5. Run `rg` checks to confirm no old contact tokens remain.
6. (If time) spot-check key pages in DevTools per verification checklist.

## Testing Strategy
- Rely on static checks (rg) for string replacement completeness.
- If feasible, run targeted tests later; otherwise note unrun tests and rationale.
