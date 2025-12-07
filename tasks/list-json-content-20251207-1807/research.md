# Research: List content JSON sources

## Existing Patterns
- Central CMS-like content lives in `config/content.json` and is deep-merged with environment overrides from `data/<env>/content.json` via `getContentSmart()`/`loadContentFromFilesystem` in `src/lib/data/loader.ts`.
- Modular content is organized under `config/content/**` with a manifest (`config/content/manifest.json`) that lists modules: `core` (`core/global.json`, `core/ui.json`, `core/accessibility.json`), `pages/*`, `components/*`, `forms` (`core/forms.json`), and `api` (`api/messages.json`, `api/errors.json`). Environment-specific overrides live under `config/content/environments/*/overrides/` plus `dev/debug.json`.
- Menu data is file-based: each category JSON in `/menu/*.json` is transformed by `getMenuData()` inside `src/lib/data/loader.ts`.
- Marketing and restaurant metadata are JSON (`config/marketing.json`, `config/restaurant.json`) loaded by `getMarketingContent()` and `getRestaurantInfo()`.
- Client-side data hooks (`useParsedData`) fetch JSON from `public/data` (`home.json`, `nav.json`, `marketing.json`, `footer.json`) using `fetchJSON` (default base `/data`). These feed components like `Hero`, `NavbarParts`, `StickyCallButton`, and `Footer`.
- A seasonal promo banner is fully data-driven via `config/banners/seasonalPromoBanner.json`, consumed by `components/seasonal/SeasonalPromoBanner.tsx`.

## Technical Constraints / Dependencies
- Content JSON must satisfy the Zod `ContentSchema` in `src/lib/data/schemas.ts`; invalid fields will throw during load.
- Menu category files are expected to exist; missing files only log warnings but an entirely empty set throws an error.
- Public data JSON must match schemas in `lib/schemas.ts` (`NavDataSchema`, `HomeDataSchema`, etc.).

## Recommended Approach
- Enumerate JSON files that are actually read for site content, grouped by purpose (central content, modular modules, environment overrides, public client data, marketing/restaurant, menu, banner/spec fixtures).
- Exclude package metadata/test fixtures unless they feed UI content.
