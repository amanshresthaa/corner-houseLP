# Implementation Plan: Remove Sunday Roast Content

## Objective
Remove all Sunday roast references from user-facing copy, metadata, promos, and supporting assets so the site no longer markets a roast offering.

## Success Criteria
- [ ] No "roast"/"Sunday roast" wording remains in primary content, metadata, marketing, or component copy.
- [ ] Environment overrides (base, staging, prod) stay in sync after edits.
- [ ] Content schema validation (`npm run content:validate`) passes.
- [ ] UI renders without gaps (events/promos/testimonials still coherent) and manual QA via Chrome DevTools MCP shows updated copy.

## Architecture / Approach
- Content-first: edit centralized sources (`config/content.json`, `config/content/pages/*.json`, `config/content/core/global.json`, `config/marketing.json`, `config/restaurant.json`, `config.ts`, `src/lib/content/environment.ts`).
- Mirror critical copy changes in env overrides (`data/staging/content.json`, `data/prod/content.json`) and fallback data (`lib/restaurantData.ts`).
- Update hardcoded component copy (book-a-table hero, testimonials, CLS demo components) and asset registry (`src/lib/images.ts`).
- Adjust mocks (`test-utils/mocks/handlers.ts`) to keep tests aligned with new offering set.

## Implementation Steps
1) Content JSON updates: revise home/event/menu/about sections, global keywords, marketing promos, and restaurant description/hours to remove roast mentions; ensure wording highlights Nepalese/pub classics instead.
2) Env/fallback parity: align `data/staging/content.json`, `data/prod/content.json`, `lib/restaurantData.ts`, and `src/lib/content/environment.ts` with new messaging and Sunday display hours.
3) Component copy: update `app/book-a-table/page.tsx`, `components/restaurant/TestimonialsSection.tsx`, `components/optimization/CLSOptimizedComponents.tsx`, and `src/lib/images.ts` to eliminate roast-specific items.
4) Test/mocks: adjust `test-utils/mocks/handlers.ts` to drop roast feature/highlight.
5) Validation & QA: run `npm run content:validate`; perform manual UI spot-check via Chrome DevTools MCP (home, menu, events, booking) to confirm copy removal and layout stability.

## Edge Cases / Considerations
- Keep arrays populated (e.g., promos/events/testimonials) to avoid empty states; replace roast items with alternative Nepalese/pub offers.
- Update Sunday display hours to stay truthful without roast wording while respecting existing time ranges.
- Ensure SEO keywords/descriptions remain compelling and accurate post-removal.

## Testing Strategy
- Automated: `npm run content:validate`.
- Manual: Chrome DevTools MCP on key pages (home, events, menu, booking) with responsive checks and console watch.

## Rollout
- No feature flags; content change is safe to deploy once validation/QA pass.
