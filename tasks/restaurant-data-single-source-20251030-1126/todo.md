# Implementation Checklist

## Data Model & Schema
- [x] Extend `config/restaurant.json` with full canonical structure (identity, contact, address/geo, hours, social).
- [x] Update `RestaurantSchema`, types, and loaders to support the richer structure while preserving legacy fields.
- [x] Refresh MSW mocks and loader tests to align with the new schema.

## Access Layer
- [x] Refactor `lib/restaurantData.ts` (and/or create helper module) to consume canonical data without hard-coded fallbacks.
- [x] Ensure sync + async access patterns (API, helpers, hooks) expose consistent shape.

## UI Refactors
- [x] Replace hard-coded contact data across core components (Hero, Footer, TakeawayBanner, StickyCallButton, RestaurantHoursCard, InteractiveMap, Location/Contact sections).
- [x] Update pages embedding literals (book-a-table, menu, contact, menu-information, privacy, tos, seasonal menus, events).
- [ ] Inject canonical phone/email/address into content-driven copy where needed.

## Testing & QA
- [x] Update unit/component tests & snapshots to reference canonical data.
- [ ] Verify `/api/restaurant` integration and caching behaviour.
- [ ] Run manual QA via Chrome DevTools (mobile/tablet/desktop, accessibility, performance) and document in `verification.md`.

## Documentation & Cleanup
- [ ] Document data contract / usage notes if new helpers introduced.
- [ ] Double-check for remaining literals via targeted `rg` searches (phone, email, coordinates).
