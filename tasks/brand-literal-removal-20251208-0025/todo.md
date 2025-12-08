# Implementation Checklist

## Setup & Utilities
- [x] Extend `config/brand.json` + `src/lib/constants/brand.ts` with nickname/encoded variants
- [x] Enhance `src/lib/utils/brand.ts` to map brand tokens (plain + encoded) and add literal-matching fallbacks
- [x] Apply `replaceBrandTokensInObject` within JSON/content loaders so tokens hydrate automatically

## Content & Config Tokenization
- [x] Swap literal brand strings/domains/emails/slugs across `config/**`, `data/**`, and related JSON fixtures with `{{brand.*}}` tokens
- [x] Regenerate `config/content.min.json` via `npm run content:build:min`
- [x] Generalize `public/sw.js` header to avoid static brand references

## Runtime & Tests
- [x] Update every TS/TSX component/page/test flagged by `grep -R "Corner House"` to import `BRAND` (or use brand tokens) for copy, alt text, and metadata
- [x] Adjust server/test fixtures (`tests/test-utils/msw-handlers.ts`, etc.) to source brand info from constants

## Verification
- [x] Run `grep -R "Corner House"` (excluding `config/brand.json`) to confirm literals are removed
- [x] Execute `npm run content:build:min`
- [x] Execute `npm run lint` (fails on pre-existing hook/unescaped-entity warnings)
