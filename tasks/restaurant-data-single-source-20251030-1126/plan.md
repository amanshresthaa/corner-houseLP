# Implementation Plan: Restaurant Data Single Source of Truth

## Objective
Deliver a single canonical restaurant metadata source (`config/restaurant.json` + typed accessors) and refactor consumers so UI, API, and content strings all derive dynamic details (name, phones, emails, address, geo, hours, socials) from that source.

## Success Criteria
- [ ] Extended `config/restaurant.json` captures all required restaurant identity, contact, geo, hours, and social data.
- [ ] `RestaurantSchema` / loaders / API return the richer structure without breaking existing consumers.
- [ ] Core UI surfaces (Hero CTA, footer, sticky call button, contact sections, map, hours cards, page CTAs) render values pulled from the canonical accessors—no inline literals remain.
- [ ] Content rendering injects canonical phone/email/address into copy where necessary.
- [ ] Tests/mocks updated to rely on canonical data (no hard-coded duplicates).
- [ ] Manual QA via Chrome DevTools passes with no regressions or console errors.

## Architecture

### Data Model
- Expand `config/restaurant.json` to include:
  - `identity`: name, displayName, tagline, description, established year, cuisine tags.
  - `contact`: phone variants (primary, display, telHref, whatsapp), emails by channel, booking URLs, messaging copy.
  - `address`: structured fields, locality, `geo` (lat/lng), `map` (google/apple URLs), plus region metadata.
  - `hours`: nested `kitchen`/`bar`, optional `display` overrides, metadata for notes.
  - `social`: facebook/instagram/twitter, website, reservation links.
  - `branding`: optional logos/assets for future use.
- Update `RestaurantSchema` and `Restaurant` type to reflect new structure with backwards-compatible defaults (optional fields).
- Keep schema in `src/lib/data/schemas.ts`; adjust validators/tests accordingly.

### Access Layer
- Replace ad-hoc JSON imports with a typed helper module (e.g. `lib/restaurant/index.ts`) exporting selectors:
  - `getRestaurantIdentity`, `getRestaurantContact`, `getRestaurantAddress`, `getRestaurantGeo`, `getRestaurantHours`, `getRestaurantSocial`.
  - Provide both sync (JSON import) for build-time use and async (loader-based) functions for server routes if needed.
- Update `lib/restaurantData.ts` to read from the expanded JSON rather than fallback defaults; deprecate redundant logic where possible.
- Consider a lightweight hook for client components that need only static values (e.g. `useRestaurantStatic()` reading serialized JSON via `next/dynamic`).

## Component/Module Breakdown
- API/Data:
  - `config/restaurant.json` (authoritative data).
  - `src/lib/data/schemas.ts`, `src/lib/data/loaders/RestaurantSmartLoader.ts`, `src/lib/data/loader.ts`, `app/api/restaurant/route.ts` (schema + loader updates).
  - MSW mocks & jest fixtures (`test-utils/mocks/handlers.ts`, `tests/data/*.test.ts`).
- Utilities:
  - `lib/restaurantData.ts` (refactor to use canonical structure).
  - New helper module if needed for client consumption without bundling extras.
- UI components/pages to refactor:
  - `components/restaurant/Hero.tsx`, `Footer.tsx`, `LocationSection.tsx`, `TakeawayBanner.tsx`, `RestaurantHoursCard.tsx`, `InteractiveMap.tsx`, `StickyCallButton.tsx`, `Restaurant/sections` (ContactInfo, SocialMedia, EventsContact, etc.).
  - Pages: `app/contact/page.tsx`, `app/book-a-table/page.tsx`, `app/menu/page.tsx`, `app/menu-information/page.tsx`, `app/privacy-policy/page.tsx`, `app/tos/page.tsx`, `app/christmas-menu/page.tsx`, `app/curry-and-carols-menu/page.tsx`, `app/wakes-menu/page.tsx`, and any others where phone/email/address/hours are embedded.
  - CTA/CTA data in `app/menu/_content/menu-content.json`, `config/content.json`, etc.—ensure values are injected from canonical data before render or replaced with parameterized tokens.
- Tests: update snapshots/expectations referencing contact details.

## Data Flow
1. Build time: Next.js bundles `config/restaurant.json` (tree-shake safe). Helper module exposes typed selectors for synchronous use.
2. Server runtime: API `/api/restaurant` uses smart loader + schema to serve JSON; caches remain functional.
3. Client runtime: SWR hooks fetch `/api/restaurant`; components requiring static contact data import helper (to avoid waiting for SWR).
4. Content composition: server components combine CMS content (`config/content.json`) with canonical data before passing to client components to avoid hard-coded copies.

## API Contracts
- `/api/restaurant` response extends current object with new nested fields:
  ```json
  {
    "identity": { "name": "...", "tagline": "...", ... },
    "contact": { "phone": { "primary": "+441...", "display": "01223 277217", "tel": "tel:+441223277217" }, "email": { ... } },
    "address": { "street": "...", "city": "...", "postcode": "...", "geo": { "lat": 52.24, "lng": 0.08 }, "map": { "google": "...", "apple": "..." } },
    "hours": { "kitchen": { ... }, "bar": { ... }, "notes": [...] },
    "social": { "facebook": "...", "instagram": "...", "website": "..." }
  }
  ```
- Preserve legacy top-level `name`, `phone`, `email`, `address`, `hours` for backward compatibility (mirroring new structure).
- Update TypeScript types to match; ensure clients treat new fields as optional initially.

## UI / UX Considerations
- Maintain accessible labels/aria text when swapping to dynamic data (e.g. screen reader text referencing phone/email).
- Ensure telephone links continue to sanitize display vs tel format.
- Map component must read coordinates + URLs from canonical data while maintaining keyboard activation.
- Avoid layout shifts when injecting dynamic data—server components should resolve canonical data before render.
- Confirm DaisyUI class usage remains intact after refactors.

## Testing Strategy
- Unit tests: update data loader tests, schema validation tests, component tests referencing contact info.
- Integration: exercise `/api/restaurant` route to ensure new fields validated/sanitized.
- UI tests: adjust component tests to assert values come from canonical data (can stub helper).
- Manual QA: run through primary flows (home hero CTA, contact page, book table, sticky call button) verifying data & interactions.
- DevTools audit: verify no console errors, accessible focus states, responsive layout with dynamic data.

## Edge Cases
- Missing optional fields: helpers should provide sensible fallbacks (e.g. hide whatsapp if not provided).
- Hours fallback: ensure components still handle absence of `display` or `notes`.
- API clients running older code: keep legacy fields until migration complete.
- Ensure dynamic injection into copy handles formatting (e.g. phone numbers embedded in sentences).

## Rollout Plan
1. Implement schema & data file expansion; update helpers/utilities/tests.
2. Refactor API + server loaders; verify tests pass.
3. Incrementally refactor UI components/pages—prefer grouping by surface (core layout → marketing pages).
4. Update content composition/injection logic to remove duplicates.
5. Refresh MSW mocks & fixtures; rerun test suite.
6. Manual QA with Chrome DevTools (mobile/tablet/desktop, accessibility, performance).
7. Document usage pattern in README/AGENTS notes if necessary and handoff.
