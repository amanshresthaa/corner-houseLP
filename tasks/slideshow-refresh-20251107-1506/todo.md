# Implementation Checklist

## Setup
- [x] Confirm backup via git status + note existing `public/images/slideshow` footprint.

## Core Functionality
- [x] Remove legacy `public/images/slideshow` contents.
- [x] Copy six curated PNGs from `Everythingyouneed/Slideshowimage` into `public/images/slideshow`.
- [x] Update `src/lib/images.ts` references to new filenames.
- [x] Update `hooks/useSeamlessLoading.tsx` preload list to new filenames.

## Content Updates
- [x] Rewrite `config/content.json` slideshow slides with new copy/alt/badges/paths.
- [x] Update `docs/IMAGES_README.md` (or similar) to document the new canonical set.

## Testing
- [x] Verify file existence + git status (ensuring only intended assets present).
- [ ] (Later) Run UI smoke test / DevTools QA per verification phase.

## Questions/Blockers
- None currently; will document if folder restructuring reveals surprises.
