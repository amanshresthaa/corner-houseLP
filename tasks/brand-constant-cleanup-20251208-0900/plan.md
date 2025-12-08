# Implementation Plan: Brand Constant Cleanup

## Objective
Ensure every runtime/string reference to the venue name/domain/email routes through a single brand configuration so future rebrands only require editing `config/brand.json`. Any previously hardcoded "Corner House" literals must instead be derived from the `BRAND` object or from brand tokens resolved at load-time, while legacy "White Horse" content stays purged.

## Success Criteria
- [ ] `grep -R "White Horse" app components config lib src tests data public` returns no matches.
- [ ] `grep -R "Corner House"` only reports `config/brand.json`, CornerHouse*.md docs, or other intentional references documented in tasks/docs—not runtime code/config.
- [ ] All TypeScript/TSX modules fetch venue labels via `BRAND` (or helpers) rather than inline strings.
- [ ] Serialized content (config/content*.json, marketing, restaurant JSON, mocks) supports brand tokens that are resolved by loaders so literals disappear from source files.

## Architecture & Strategy
1. **Brand Token System**
   - Extend `config/brand.json` with any missing variants (e.g., `definiteName`, `shortNameNoArticle` if helpful).
   - Update `src/lib/constants/brand.ts` to expose these variants.
   - Enhance `src/lib/utils/brand.ts` to support:
     * Replacement patterns for both legacy "White Horse" and any literal "Corner House" variants.
     * Placeholder tokens like `{{brand.fullName}}`, `{{brand.shortName}}`, `{{brand.domain}}` so JSON/fixtures can reference tokens rather than actual names.
2. **Data/Content Loaders**
   - After parsing JSON (content, marketing, restaurant, config, menu) run `replaceBrandTokensInObject` so tokens/legacy strings produce the configured brand at runtime.
   - Ensure API loaders / fetchers (ContentLoader, server loaders, mocks) call the helper to keep responses normalized.
3. **Source Content Migration**
   - Replace literal "The Corner House" (and Cambridge variants) in JSON with the appropriate tokens.
   - For TS/TSX modules currently using literal strings (per `grep` list), import `BRAND` (and/or `replaceBrandTokens`) and swap inline text for template strings referencing the brand values or tokens. Maintain readability by interpolating brand names only where semantically needed.
   - Update Jest/MSW fixtures to pull from `BRAND` or tokens to avoid duplication.

## Component Breakdown & Key Files
- **Utilities**: `src/lib/constants/brand.ts`, `src/lib/utils/brand.ts`.
- **Server/Data loaders**: `src/lib/data/server-loader.ts`, `src/lib/content/loader.ts`, `lib/restaurantData.ts`, `src/lib/matches.ts`, `src/lib/images.ts` (if they embed descriptive strings).
- **Runtime components/pages**: All `app/**` pages referencing the brand (about, menu, blog, tos, etc.), `components/restaurant/*`, `components/ui/InstallPrompt.tsx`, `components/slides/SportsSlide.tsx`, etc.
- **Config/content JSON**: `config/content*.json`, `config/marketing.json`, `config/restaurant.json`, environment overrides, data configs.
- **Tests/mocks**: `tests/test-utils/msw-handlers.ts`, `test/setupServerTests.ts`, schema tests, component tests referencing brand strings.

## Data Flow Changes
- JSON → Server Loader → `replaceBrandTokensInObject` → sanitized Content object → consumed by pages via `getContentSmart`.
- REST/ContentLoader path: `fetchModule` result `.data` passes through token replacer before caching.
- Tests/mocks referencing config should import `BRAND` to ensure parity.

## Testing Strategy
- Run `npm run lint` (expect existing hook warnings, but ensure no new violations).
- Run targeted Jest suites touching updated mocks (e.g., `npm run test -- --runTestsByPath tests/components/book-a-table/BookByPhoneCard.test.tsx`?).
- Manual verification via `grep` to confirm zero unintended literals.
- (Later) QA per verification plan (Chrome DevTools) once runtime copy untouched.

## Edge Cases / Risks
- Token replacement must avoid double substitution (e.g., `Corner House` inside longer words). Use word-boundary regex.
- Need to ensure brand tokens inside Markdown/JSON remain valid after parsing.
- Avoid breaking SEO copy where case sensitivity matters (normalize replacements accordingly).
- Some strings legitimately mention `Corner House` as part of a URL/slug; confirm tokens produce identical values (e.g., slug, domain) to preserve functional links.
