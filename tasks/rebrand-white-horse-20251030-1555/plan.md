# Implementation Plan: Rebrand To The White Horse

## Objective
Rebrand the application from "The White Horse Waterbeach" to "The White Horse" using the authoritative data in `Everythingyouneed/whitehorseinformation.md`, ensuring all content, configuration, and metadata reflect the Waterbeach venue.

## Success Criteria
- [ ] Core config (`config/restaurant.json`, `lib/restaurantData.ts`, `config.ts`) use White Horse identity, contact, address, and hours.
- [ ] All user-facing copy references "The White Horse" and Waterbeach context; no stale "The White Horse" strings remain in production code or tests.
- [ ] Structured data helpers, alt text, and metadata emit accurate White Horse details.
- [ ] Automated tests and `pnpm run build` pass locally.

## Architecture
- Central data source remains `config/restaurant.json`, normalized via `lib/restaurantData.ts` and consumed across Next.js app routes and components.
- `config.ts` and `src/lib/data/schemas.ts` mirror branding for environment defaults and validation.
- Asset registry (`src/lib/images.ts`) controls image paths/alt text; service worker and manifests rely on constants there.

## Component Breakdown
- Data/config: `config/restaurant.json`, `lib/restaurantData.ts`, `src/lib/data/schemas.ts`, `config.ts`, `src/lib/content/environment.ts`.
- Shared UI: `components/restaurant/Hero.tsx`, `Footer.tsx`, `AboutSection.tsx`, menu components, CTA modules consuming brand strings.
- Pages: events (`app/events/*`), blog posts (`app/blog/*`), menu/legal (`app/menu-information`, `app/privacy-policy`, `app/tos`, `app/offline`, `app/not-found`), press page, etc.
- Utilities/tests: `__tests__/`, `tests/`, `test/setupServerTests.ts`, `public/sw.js`, marketing copy fixtures.

## Data Flow
Restaurant config → `normalizeRestaurant` → `content` context/hooks → pages/components/metadata. Updating source data ensures downstream renders adopt new values while keeping structured schemas consistent.

## API Contracts
- No external API changes; ensure schema defaults (`RestaurantSchema`) include new slug `the-white-horse` and contact details for generating JSON-LD, metadata, and sitemaps.

## UI/UX Considerations
- Replace "Waterbeach" narrative with Waterbeach story while preserving layout structure.
- Maintain CTA clarity (booking now phone/email) and ensure links/aria labels use updated labels.
- Keep mobile-first styles intact; ensure copy length fits existing breakpoints.

## Testing Strategy
- Unit/integration: run targeted Jest suites if failures arise (`pnpm run test -- --watch` subsets as needed).
- End-to-end: manually smoke test via Chrome DevTools MCP during verification (QA instructions required).
- Build validation: `pnpm run build`.

## Edge Cases
- Legacy references (e.g., historic copy quoting The White Horse) may remain intentionally—flag and confirm before removal.
- Ensure telephone URIs and Google Maps embed use Waterbeach coordinates.
- Validate fallback paths (if config missing) also point to White Horse.

## Rollout Plan
- Local verification → manual QA per AGENTS.md (DevTools) → handoff for stakeholder review prior to deployment.
