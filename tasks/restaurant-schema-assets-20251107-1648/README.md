# Task Overview

## Initial Requirements
- Fix the Next.js build failure caused by a missing asset import in `components/seo/RestaurantSchema.tsx`.
- Ensure the `@cimages/Slideshow/steamed-momo-with-spicy-sauce-portrait.png` reference resolves correctly (either by adding the asset or updating the import path).

## Success Criteria
- `pnpm run build` completes without the module-not-found error.
- Restaurant schema image references resolve to existing files.
- No regressions introduced in SEO schema generation.
