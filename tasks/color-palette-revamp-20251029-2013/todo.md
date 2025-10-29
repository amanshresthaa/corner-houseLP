# Implementation Checklist

## Setup
- [x] Backup references to old palette names for search/replace sanity

## Palette Refactor
- [x] Update `theme/colors.js` base families to new palette
- [x] Refresh semantic/light-dark theme mappings and supporting tokens (gradients, shadows)
- [x] Adjust `colorFamilies` export to match new family keys

## Tailwind Integration
- [x] Update `tailwind.config.js` color extensions to new family names

## Documentation
- [x] Rewrite `design-system/docs/COLORS.md` to describe the new palette

## Build Artifacts
- [x] Run `npm run colors:generate` to regenerate CSS variables

## Verification
- [x] Inspect key files/diffs for obsolete `--color-brand` references
- [x] Prepare verification notes (DevTools QA to follow later)
