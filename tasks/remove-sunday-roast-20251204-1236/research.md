# Research: Remove Sunday Roast Content

## Initial Requirements (Phase 0)
- Remove all references and content related to "Sunday roast" across the site.
- Ensure related navigation, CTAs, and assets do not promote Sunday roast offerings.

## Success Criteria (Phase 0)
- No visible "Sunday roast" content remains on any page or navigation.
- No dead links or layout gaps appear after removal.
- Build/test commands succeed without new warnings or errors.

## Existing Patterns
- Content is centralized in `config/content.json` with environment overrides in `data/<env>/content.json`; page-level JSON under `config/content/pages/*.json` feeds individual routes such as home and events.
- Global metadata and keywords live in `config/content/core/global.json`; marketing promos are defined in `config/marketing.json`.
- Restaurant identity/description and display hours come from `config/restaurant.json`, with fallback copies in `lib/restaurantData.ts` and `src/lib/content/environment.ts`.
- Component-level copy includes Sunday-roast mentions in `app/book-a-table/page.tsx`, `components/restaurant/TestimonialsSection.tsx`, and showcase components like `components/optimization/CLSOptimizedComponents.tsx`.
- Image registry `src/lib/images.ts` defines Sunday roast assets/alt text; mock API data in `test-utils/mocks/handlers.ts` lists Sunday Roast as a feature/menu highlight; staging/prod content mirrors testimonials in `data/staging/content.json` and `data/prod/content.json`.

## External Resources
- None required; all Sunday roast references reside within repository content/config files.

## Technical Constraints
- Content JSON is validated via `scripts/validate-content.js` (`npm run content:validate`); updates must keep schema shape intact.
- Multiple environment files (config plus data overrides) should stay in sync to avoid stale copy between staging/prod and base config.
- Next.js app imports these JSON sources directly, so textual edits must preserve keys/arrays expected by components.

## Recommendations
- Remove or rewrite Sunday roast references across primary content sources (`config/content.json`, `config/content/pages/*`, `config/marketing.json`, `config/restaurant.json`, `config.ts`, `src/lib/content/environment.ts`).
- Update hardcoded component copy (testimonials, menu showcase, booking hero) to highlight Nepalese/pub offers without roast mentions; adjust image registry entries accordingly.
- Align env override files (`data/staging/content.json`, `data/prod/content.json`) and test/mocks to prevent mismatched copy.
- Run `npm run content:validate` after edits and perform manual UI QA via Chrome DevTools MCP once content is updated.

## Open Questions
- None identified yet.
