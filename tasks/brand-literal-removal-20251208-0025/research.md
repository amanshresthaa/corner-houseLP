# Research: Brand Literal Removal

## Existing Patterns
- Brand data already centralized in `config/brand.json`, mirrored by `src/lib/constants/brand.ts` and helper utilities in `src/lib/utils/brand.ts`.
- JSON-driven content (`config/content/**/*.json`, `config/marketing.json`, `config/restaurant.json`, etc.) feeds runtime loaders that can run transformations before hydration.
- React pages/components generally import `BRAND` when needed, but many legacy sections still hardcode "Corner House" literals.

## Technical Constraints
- JSON/token replacement must stay compatible with the content build pipeline (`npm run content:build:min`).
- Public/Next static assets (e.g., service worker) cannot import TS modules, so branding there must be generalized.
- Lint currently fails due to pre-existing hook/unescaped entity warnings; scope limited to branding work.

## Recommended Approach
1. Extend brand constants with nickname/encoded variants for flexible substitution.
2. Enhance `replaceBrandTokens` so JSON/config data can safely use `{{brand.*}}` placeholders (plain + URL-encoded).
3. Run brand token replacement inside all data/content loaders so runtime never sees raw tokens.
4. Tokenize every JSON/config entry containing the literal brand name, then regenerate `content.min.json`.
5. Update all TS/TSX components/tests still referencing "Corner House" to import `BRAND` (or use brand tokens processed via helper).
6. Verify via `grep` that only `config/brand.json` retains literal brand strings; rerun lint to confirm no new regressions.
