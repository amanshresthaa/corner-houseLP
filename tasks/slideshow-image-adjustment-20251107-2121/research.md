# Research: Slideshow Image Adjustment

## Initial Requirements
- Move `table food.png` within the slideshow so it appears in the desired position instead of its current placement.
- Ensure the image is still referenced properly (copy/move as needed) so other assets remain intact.

## Success Criteria
- `table food.png` can be seen in the correct slideshow location without layout issues.
- No broken image references or regressions in other slides.
- Asset organization remains clear (copied/moved file lives in an appropriate directory).

## Existing Patterns
- Slides live in `config/content.json` under `components.slideshow.slides`; each entry defines ids, textual copy, CTA urls, and `image.primary` paths that point to `/images/slideshow/*.png`.
- The UI consumes those slides via `getContentSmart()` → `ClientHomeContent` → `components/slideshow/DaisyUISlideshow`, so updating `config/content.json` (and optionally the centralized registry) is enough for content changes.
- Canonical slideshow assets live under `public/images/slideshow/` with descriptive kebab-case filenames and matching source copies in `Everythingyouneed/Slideshowimage/` (per `docs/IMAGES_README.md`).
- `src/lib/images.ts` exposes logical references (brand/home/dishes/etc.) and can be extended when we add another curated asset so other surfaces reuse it consistently.

## External Resources
- `docs/IMAGES_README.md` and `docs/IMAGE_MANAGEMENT_SYSTEM.md` spell out the required slideshow images, naming conventions, and expectation to keep curated PNGs flat under `/public/images/slideshow/`.
- `components/slideshow/DaisyUISlideshow.tsx` shows how slides are bucketed (`required` vs `optional`), picked per session, and rendered with DaisyUI carousel markup, so any new slide should follow the same data shape.

## Technical Constraints
- Slideshow expects landscape-ish hero assets (PNG) that look good across breakpoints; current `sessionSize` is 5 while six slides exist, so the `required` flag guarantees key slides always render.
- Images are referenced by string paths; they must exist under `public/images/slideshow/` for Next Image optimization and be included in git.
- Accessibility requires meaningful `alt`, `eyebrow`, `headline`, and CTA metadata like the other slides.
- Asset docs emphasize copying binaries into both `Everythingyouneed/Slideshowimage/` (source) and `public/images/slideshow/` (runtime) so sources remain in sync.

## Recommendations
- Move (or better, copy) `table food.png` into `Everythingyouneed/Slideshowimage/` with a descriptive filename (e.g., `table-sharing-feast-landscape.png`) and mirror the same file under `public/images/slideshow/`.
- Update `config/content.json` to either add or replace a slide so `image.primary` uses the new PNG plus fresh copy that highlights the shared table experience; mark it `required` if it must always appear.
- Extend `src/lib/images.ts` with a logical key for the new asset so future sections (menu, blog, etc.) can reuse it without duplicating paths.
- Verify via Chrome DevTools (mobile/tablet/desktop) that the slideshow presents the new slide without CLS, and ensure alt text accurately reflects the scene.

## Open Questions
1. Do we want this new slide in addition to the existing six (increasing rotation) or replacing one of the optional food-focused slides?
2. What final filename best describes the scene (once confirmed) so it aligns with naming conventions?
3. Should the new slide be flagged as `required` to guarantee visibility or added as optional content?
