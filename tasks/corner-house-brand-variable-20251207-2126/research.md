# Research: Brand Name Variable Migration

## Goal Context
- The repository still contains numerous instances of the former venue name “The White Horse” (and variations such as “White Horse Waterbeach” or the slug `white-horse`).
- These strings appear across multiple layers: runtime configuration (`config.ts`, `config/config.json`, `data/*/config.json`), layout/manifest metadata (`app/layout.tsx`, `app/manifest.ts`, `public/sw.js`), UI components (`components/restaurant/*`, homepage sections), SEO helpers, tests, and legacy documentation/tasks.
- Replacing each string manually risks introducing inconsistencies; defining a single source-of-truth variable for the brand name enables one-time updates (to “Corner House”) and safer future migrations.

## Key Code Locations with Hardcoded “White Horse”
1. **Configuration Layer**
   - `config.ts` exports `appName`, mail sender names, and domain metadata using “The White Horse”.
   - `config/config.json` plus `data/{dev,staging,prod}/config.json` set `metadata.appName` to “The White Horse …”.
   - `src/lib/content/environment.ts` defines environment overrides referencing White Horse names.
   - `src/lib/data/schemas.ts` default values for `appName` and domain fields contain “The White Horse”.
2. **App Shell / Metadata**
   - `app/layout.tsx` fallback metadata title uses “The White Horse Waterbeach”.
   - `app/manifest.ts` `name`, `short_name`, and description strings mention The White Horse.
   - `public/sw.js`, `next-sitemap.config.js`, and `app/api/blog/content/route.ts` include White Horse text in descriptions/domains.
3. **Shared Components & Utilities**
   - `components/restaurant/NavbarParts.tsx`, `ClientFooter`, `TestimonialsSection`, `TakeawayBanner`, and others embed “The White Horse Waterbeach” within copy or alt text.
   - `components/menu/MenuItemCard.tsx` (and optimized equivalents) build image alt strings referencing White Horse.
   - `components/seo/RestaurantSchema.tsx` outputs Schema.org data with the legacy name.
   - `src/lib/images.ts`, `src/lib/matches.ts`, `lib/restaurantData.ts` include arrays/objects describing White Horse imagery.
4. **Tests and Mocks**
   - `test-utils/mocks/handlers.ts`, `tests/components/...`, and `__tests__/hooks/useContent.client.test.tsx` assert on “The White Horse” strings.
   - `types/blog.ts` publishes blog meta using “The White Horse Waterbeach” and “The White Horse Team”.

> Many Markdown files inside `tasks/` and `docs/` also contain the old branding for historical reference. Those can remain as archival material unless requested otherwise.

## Existing Content System
- Runtime content already centralized under `config/content.json` (migrated homepage). However, this file still contains White Horse references in other pages and components modules.
- Adding a brand variable at the code level won’t automatically adjust static JSON without a processing step; consider providing helper utilities to inject brand constants when rendering content.

## Constraints & Considerations
- We must avoid introducing circular imports when using the new constant file (e.g., `config.ts` can import from `/src/lib/constants/brand` because it already references `@/src/...`).
- Some contexts require different forms of the name (full “The Corner House Cambridge”, short “The Corner House”, slug “corner-house”, or noun “Corner House”). The constants file should expose these variants to prevent ad-hoc string concatenation.
- Tests asserting exact strings will need updates to consume the same brand constants to ensure stability.
