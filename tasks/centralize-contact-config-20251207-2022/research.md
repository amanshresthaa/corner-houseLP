# Research: Centralize contact & address usage

## Current sources of truth
- `config/restaurant.json` and `lib/restaurantData.ts` expose contact/address/coords via helpers (`getContactInfo`, `getAddress`, `getRestaurantIdentity`, `getRestaurantData`).
- `config/content.json` mirrors some values for static content/SEO but should remain derived where possible.

## Where values are still hardcoded
- Components: `components/homepage/HomepageReviewHighlights.tsx` (map URL, TripAdvisor URL), `components/restaurant/TestimonialsSection.tsx` (map URL, TripAdvisor URL), `components/restaurant/InteractiveMap.tsx` (likely embeds URL prop), `components/restaurant/NavbarParts.tsx` alt text/logo copy, `components/restaurant/DishCard.tsx` alt text, `components/seo/RestaurantSchema.tsx`, `libs/seo.tsx`, `libs/seo-examples.md` (doc), `components/slideshow/*` copy, `app/manifest.ts`, `app/about/page.tsx` hero copy still static.
- Tests/mocks: numerous tests embed brand/address/TripAdvisor URLs; would benefit from fixtures derived from restaurantData fixtures.

## Constraints
- Keep DaisyUI components; no order-online CTAs; seasonal banner already removed.
- Approval policy: never; no external commands needing escalation.
- Must keep content copy that’s intentionally brand/story; only centralize contact/address/phone/email/map/TripAdvisor/Google map URLs.

## Proposed approach
- Introduce small utility in `lib/restaurantData.ts` (or new `lib/contact.ts`) to supply preformatted links: `getMapLinks()`, `getTripadvisorLink()` and maybe `getBranding()` for names/alt text.
- Refactor components and SEO helpers to consume these instead of hardcoded strings.
- Align tests/mocks to use shared fixtures from `lib/restaurantData` or a new `tests/fixtures/restaurant.ts` that imports config to avoid coupling to prod data.
