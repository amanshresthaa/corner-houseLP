# Implementation Plan: Centralize contact/address usage

## Objective
Ensure all phone/email/address/map/TripAdvisor references come from a single source of truth (restaurant data helpers), eliminating scattered literals across components, SEO, and tests.

## Success Criteria
- No hardcoded contact/address/map URLs in components/SEO/tests; all use helper data.
- Map/directions/TripAdvisor links derive from the same central values.
- Tests use shared fixtures rather than duplicated literals.

## Steps
1) Add helper exports in `lib/restaurantData.ts` (or small utility) for map links, TripAdvisor link, and preformatted address/brand strings.
2) Refactor UI/SEO components to consume helpers (`HomepageReviewHighlights`, `TestimonialsSection`, `RestaurantSchema`, `seo.tsx`, `InteractiveMap`, `NavbarParts` alt texts, etc.).
3) Update tests/mocks to import shared fixtures/constants instead of embedding strings.
4) Run `rg` to confirm no remaining literal contact/address/map strings.
5) Manual QA: check contact-related UI still renders correctly.

## Testing
- Rely on existing tests where practical; note unrun tests if time-constrained.
