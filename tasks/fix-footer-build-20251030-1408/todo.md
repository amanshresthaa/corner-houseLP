# Implementation Checklist

## Code Changes
- [x] Normalize footer container structure (remove duplicate wrapper, ensure balanced tags).
- [x] Reposition `<AllergenNotice>` with proper spacing within container.
- [x] Review JSX maps for separators/keys after structural edits.
- [x] Align booking page map link with `NormalizedAddress.map.google` to satisfy types.
- [x] Update Christmas menu map links to use `NormalizedAddress.map` data.
- [x] Resolve missing `phoneDisplay` reference in `app/menu-information/page.tsx`.
- [x] Update schema generator to use `identity.cuisine` instead of missing `cuisine_types`.
- [x] Type delivery info partner/coverage arrays to satisfy strict checks.
- [x] Import restaurant helpers in `libs/seo.tsx` for schema defaults.

## Validation
- [x] Run `pnpm exec eslint components/restaurant/Footer.tsx`.
- [x] Run `pnpm run build`.

## Notes / Assumptions
- Using existing Tailwind/DaisyUI classes; no new dependencies required.
- Allergen notice should appear between the grid and social/legal row as part of main container flow.
