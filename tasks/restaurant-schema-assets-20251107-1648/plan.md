# Implementation Plan: Restaurant Schema Asset Fix

## Objective
Align the physical momo slideshow/dish asset filenames with the canonical `steamed-momo-with-spicy-sauce-portrait` identifier so that all static imports and string-based references resolve without breaking the Next.js production build.

## Success Criteria
- [ ] `pnpm run build` completes without the `Module not found` error.
- [ ] Static imports in `components/seo/RestaurantSchema.tsx` bundle successfully.
- [ ] Public asset URLs referenced via `src/lib/images.ts`, `config/content.json`, and hooks serve the correct image (no 404s).

## Architecture
Primarily a filesystem alignment task: ensure each curated asset (PNG slideshow image, JPEG dish image, and source binary) shares the same canonical filename. No code changes are required beyond verifying imports remain pointing to the canonical string.

### Components/Assets Impacted
- `src/assets/images/components/Slideshow/steamed-momos-with-spicy-sauce-portrait.png`
- `public/images/slideshow/steamed-momos-with-spicy-sauce-portrait.png`
- `public/images/white-horse/dishes/steamed-momos-with-spicy-sauce-portrait.jpeg`
- `Everythingyouneed/whitehorseimages/steamed-momos-with-spicy-sauce-portrait.jpeg` (raw source copy)
- `components/seo/RestaurantSchema.tsx` (verification only; import already points to canonical name)

### Data Flow
- Build step pulls the PNG via static import; renaming the file keeps the import path unchanged, allowing webpack to bundle the binary.
- Runtime requests for `/images/slideshow/steamed-momo-with-spicy-sauce-portrait.png` and `/images/white-horse/dishes/steamed-momo-with-spicy-sauce-portrait.jpeg` will now succeed because the filesystem paths match the URL strings defined in `src/lib/images.ts` and configuration data.

### Testing Strategy
1. Run `pnpm run build` after renaming to ensure Next.js compiles successfully.
2. Optionally hit the affected asset URLs via `next dev` or static server to confirm they render (manual spot-check during verification phase, aided by Chrome DevTools once UI QA is required).

## Edge Cases & Considerations
- Ensure Git tracks renames properly (important for case-insensitive filesystems); use `mv` with the final filename to avoid duplicate copies.
- Confirm there are no lingering references to the pluralized filename by running `rg 'steamed-momos'` after renaming.

## Rollout Plan
- Rename binaries locally, re-run build, and once validated, the change is ready for commit/deploy with no feature flags required.
