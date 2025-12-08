# Implementation Plan: Brand Literal Removal

## Objective
Ensure Corner House branding is sourced exclusively from `config/brand.json` (via `BRAND`/tokens) across runtime code, configs, and tests so future rebrands require touching a single source.

## Architecture & Data Flow
- **Brand Constants**: Extend `BRAND` with nickname + encoded variants; expose them through `replaceBrandTokens` so both plain text and URL-encoded placeholders resolve consistently.
- **Token Hydration**: Run `replaceBrandTokensInObject` inside JSON/content loaders (`server-loader`, `content/loader`) so any `{{brand.*}}` strings in config are expanded before React consumes them.
- **Config Tokenization**: Replace literal brand strings/domains/emails/slugs in JSON configs (`config/**`, `data/**`) with the new tokens; regenerate minified content via existing script.
- **Runtime Components**: Audit `app/**`, `components/**`, `lib/**`, and tests for lingering literals, swapping them for `BRAND` references (or helper functions) to preserve copy fidelity while centralizing branding.

## Component/Module Breakdown
1. `config/brand.json`, `src/lib/constants/brand.ts`, `src/lib/utils/brand.ts` for new fields + token patterns.
2. JSON loaders (`src/lib/data/server-loader.ts`, `src/lib/content/loader.ts`) for automatic token hydration.
3. All JSON config/content files plus `public/sw.js` comment for literal removal/token usage.
4. React components/pages/tests enumerated via `grep -R "Corner House"` for `BRAND` adoption.

## Testing Strategy
- `npm run content:build:min` to rebuild minified content with tokens.
- `npm run lint` to ensure no new lint regressions (acknowledge pre-existing warnings).
- Manual `grep -R "Corner House"` (excluding `config/brand.json`) to confirm literals are purged.

## Edge Cases
- URL-encoded occurrences (maps/social links) require encoded tokens.
- Possessive copy (e.g., `Corner House's`) should use HTML entities or template adjustments.
- Static assets (`public/sw.js`) can't import TS; need generic wording there.

## Steps
1. Update brand constants/utilities + loaders to support new tokens.
2. Tokenize JSON/config/data files via scripted replacements; regenerate `content.min.json`.
3. Refactor all TS/TSX/test files identified by `grep` to import `BRAND` or token helpers.
4. Sanity-check via `grep`, rebuild content, then run lint/tests per constraints.
