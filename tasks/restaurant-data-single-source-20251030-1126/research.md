# Research: Restaurant Data Single Source of Truth

## Initial Requirements
- Consolidate core restaurant/business metadata (name, slug, location, type, contact, website, coordinates, opening hours, ratings, etc.) into one canonical data source.
- Ensure all pages and components consume that shared source rather than embedding literals.

## Success Criteria
- One authoritative data file or service provides the required fields.
- Key UI surfaces (contact info, metadata, CTAs, cards) read from the shared source.
- No hard-coded duplicates remain for fields covered by the new source.

## Existing Patterns
- `config/restaurant.json` is currently the only structured data file but only contains `name`, single `phone`/`email`, shallow `address`, and `hours`. Validation is enforced via `RestaurantSchema` in `src/lib/data/schemas.ts`, and both `getRestaurantInfo` and `/api/restaurant` rely on this schema.
- `lib/restaurantData.ts` expects a much richer `RestaurantTemplate` (identity, contact, social, gallery, etc.) yet falls back to hard-coded defaults because `config/restaurant.json` does not provide those fields.
- Hooks/components (`useRestaurant`, `useOpeningHours`, `SimpleFooterHours`, `SimpleOpeningHours`) call `/api/restaurant` and therefore consume the schema-defined shape.
- Many UI surfaces embed literals: e.g. `components/restaurant/Hero.tsx`, `Footer.tsx`, `RestaurantHoursCard.tsx`, `StickyCallButton.tsx`, `InteractiveMap.tsx`, `TakeawayBanner.tsx`, multiple page routes (`app/book-a-table`, `app/menu`, `app/contact`, etc.) all hard-code phone, email, address, coordinates.
- Content JSON also duplicates metadata (e.g. `config/content.json` contact section, CTA phone strings, hero copy). These values are rendered directly, so we must inject canonical data at rendering time rather than rely on literals in JSON.
- Tests and mocks (MSW handlers, unit tests in `tests/data`, `tests/components/sections`) assert against hard-coded phone/email/address values that will need to follow the canonical source.

## Technical Constraints & Dependencies
- Updating `RestaurantSchema` affects server loaders, API responses, SWR hooks, and tests. All dependents must be refactored in lock-step.
- The smart loader (`RestaurantSmartLoader`) reads from the same JSON file; changes must preserve backward compatibility or provide migration logic.
- Several client components import JSON directly at build time (e.g. `StickyCallButton` imports `config/restaurant.json`). We need a consistent consumption pattern that works on both server and client without bundling unnecessary data.
- DaisyUI/stateful components must remain mobile-first and accessible; refactors should not regress existing UX.
- Verification must include DevTools manual QA; any UI refactor must be visually regression-tested.

## Recommendations
- Expand `config/restaurant.json` into a comprehensive canonical document (identity, contact, phones with callable/display variants, emails by channel, address with geo coordinates & map links, social profiles, hours separated into kitchen/bar, metadata for CTA labels).
- Update `RestaurantSchema` (and inferred `Restaurant` type) to match the richer shape while ensuring optional fields for incremental adoption. Provide derived helpers in `lib/restaurantData.ts` that read the new schema instead of fallback defaults.
- Standardize access via a dedicated utility (`getRestaurantConfig` or similar) to avoid importing JSON directly in client components; expose lightweight selectors for phone, address, social, geo, etc.
- Refactor key components/pages to consume data from the canonical helper rather than literals (Hero CTA, footer contact, contact sections, map coordinates, sticky FAB, modal CTAs, API fallbacks).
- Adjust content hydration pipeline so dynamic values (phone, email, address) are injected at render-time (e.g. by composing CMS copy with canonical data) rather than living as static strings in JSON.
- Update tests/mocks to derive expectations from the canonical data to prevent drift; prefer seeding from the same JSON fixture.
- Document the data contract and usage patterns in `tasks/…/plan.md` and possibly project docs to guide future contributors.

## Open Questions
- Do we need environment-specific overrides for restaurant metadata similar to `data/<env>/content.json`? If so, design strategy for selective overrides.
- Should canonical data also drive SEO metadata (OpenGraph, structured data) currently defined elsewhere?
