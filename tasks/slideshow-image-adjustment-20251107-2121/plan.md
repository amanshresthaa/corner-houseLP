# Implementation Plan: Slideshow Image Adjustment

## Objective
Promote the new shared-table food visual by bringing `table food.png` into the curated slideshow set, following the asset governance rules so both the filesystem and content layer stay consistent.

## Success Criteria
- [ ] The new slide referencing the copied asset renders inside the homepage slideshow with accurate copy, alt text, and CTAs.
- [ ] `table food.png` no longer sits at repo root; instead, the renamed asset exists under `Everythingyouneed/Slideshowimage/` (source) and `public/images/slideshow/` (runtime).
- [ ] No regressions in existing slideshow slides (required slides still appear, layout unchanged) and asset docs mention the new PNG.

## Architecture / Components
- Content is delivered via `config/content.json → getContentSmart → ClientHomeContent → DaisyUISlideshow`; updating the JSON slide definitions is the single source of truth for UI copy.
- Asset paths should continue to point at `/images/slideshow/...`; `src/lib/images.ts` remains the registry for logical imports elsewhere, so we will add a key if future reuse is desired.
- Filesystem organization requires duplicate copies of curated slideshow assets inside `Everythingyouneed/Slideshowimage/` and `public/images/slideshow/`.

## Data Flow / State
- Slides are bucketed as `required`/`optional`. Marking the new shared-table slide as `required` guarantees it appears even though `sessionSize` is 5.
- CTA URLs reuse existing anchors (`/menu#nepalese`, takeaway link, booking tel). No backend/API updates are needed.

## Implementation Steps
1. Rename `table food.png` to a descriptive slug (e.g., `shared-table-nepalese-feast-landscape.png`) and move it into `Everythingyouneed/Slideshowimage/`.
2. Copy the renamed PNG into `public/images/slideshow/` so Next/Image can serve it; remove the stray root-level original.
3. Extend `src/lib/images.ts` (and `ImageAlts`) with a logical key for the new asset in case other surfaces need it.
4. Update `config/content.json` by adding a new slide entry (id `slide-sharing-table`) referencing the new asset, alt text, eyebrow/headline/copy, badges, CTAs, and `required: true`.
5. Refresh `docs/IMAGES_README.md` (and any other doc that enumerates the curated slideshow set) to list the new PNG so the canonical set stays accurate.
6. Revalidate via local preview (if feasible) then perform Chrome DevTools QA across viewports to confirm the slide renders and animates without issues.

## Edge Cases & Error States
- Ensure Slide data remains valid JSON (trailing commas or duplicate ids would break `getContentSmart`).
- Confirm Next can resolve `/images/slideshow/shared-table-nepalese-feast-landscape.png`; missing copies would surface as 404s or broken `Image` components.
- Check that adding another `required` slide still keeps `sessionSize` satisfied (5 slides per session vs 2 required) so there’s no infinite loop.

## Testing Strategy
- Spot-check `npm run lint` if time permits (content-only change, so optional) and rely on DevTools manual QA for visual verification.
- Validate the JSON change via `jq`/`npm run lint` or TypeScript build if needed; at minimum, re-open `/` in DevTools to confirm the new slide rotates through.

## Rollout Plan
- No special rollout expected; change is visual only.
