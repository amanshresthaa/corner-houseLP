# Research: Brand Constant Cleanup

## Existing Patterns & Utilities
- `config/brand.json` plus `src/lib/constants/brand.ts` expose the canonical `BRAND` object (`shortName`, `fullName`, `slug`, `domain`, etc.). Components can already import this constant.
- `src/lib/utils/brand.ts` implements `replaceBrandTokens` / `replaceBrandTokensInObject` to swap legacy "White Horse" substrings with `BRAND` values. Right now this helper is only consumed inside `components/restaurant/TestimonialsSection.tsx`.
- Large JSON payloads under `config/content*.json` and `config/content/pages/*.json` still embed literal "The Corner House" text. The content loader currently does not run through `replaceBrandTokensInObject`, so changing `config/brand.json` would not cascade into those files.
- Tests/mocks (e.g., `tests/test-utils/msw-handlers.ts`, `test/setupServerTests.ts`) now describe the Cambridge venue but keep literals instead of reading from the shared config or helper.

## Hardcoded Brand Usage Snapshot
- `grep -R "Corner House"` spans every tier: page components (`app/about`, `app/blog`, `app/tos`, etc.), UI modules (`components/restaurant/*`, `components/slides/SportsSlide.tsx`, `components/ui/InstallPrompt.tsx`), data config (`config/content.json`, marketing/config JSONs, environment overrides), lib data (`lib/restaurantData.ts`, `src/lib/images.ts`), and Jest/MSW fixtures.
- Content JSON includes dozens of references (SEO titles, descriptions, hero copy, CTA text, alt strings). Each would require manual edits unless we inject a tokenization/replacement pass when loading content.
- Docs/tasks still mention White Horse intentionally, but runtime directories (`app`, `components`, `config`, `lib`, `src`, `tests`, `data`, `public`) no longer contain "White Horse" after earlier sweeps (verified via `grep -R "White Horse"` scoped to those folders).

## Technical Constraints / Considerations
- JSON-based content cannot import TS constants; any variable substitution must happen at load-time (e.g., by running `replaceBrandTokensInObject` on the parsed content tree inside loaders such as `getContentSmart`).
- We must avoid reintroducing "White Horse" while also preventing future literal "The Corner House" spread. Ideally, we standardize on `BRAND` references in TS/TSX files and run automatic replacement for serialized content/mocks.
- Many config/data files (e.g., `config/restaurant.json`, `data/*/config.json`) legitimately need persisted brand info for static exports; these can source values from a single JSON (brand/config) to stay DRY.

## Recommendations / Next Steps
1. Extend the brand utility to normalize both legacy ("White Horse") and current ("Corner House") tokens into the configured `BRAND` values so content JSON can stay descriptive but future renames only touch `config/brand.json`.
2. Update core loaders (content loader, marketing loader, restaurant data hydrator, tests/mocks) to call `replaceBrandTokensInObject` so they automatically substitute brand tokens.
3. In TS/TSX modules, replace inline strings that simply restate the venue name/URL/email with `BRAND` references (or derived strings). Keep bespoke prose (stories, descriptions) but inject `BRAND` pieces via template literals where the brand mention is semantically necessary.
4. Re-run repo-wide searches for "White Horse" and "Corner House" after refactor to ensure only allowed tokens remain (docs/tasks may still mention historical names, but runtime/test code should lean on the shared helpers/constants).
