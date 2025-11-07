# Research: Slideshow Refresh

## Initial Requirements
- Remove current slideshow images referenced by the site.
- Copy approved assets from `everythingyouneed/@slideshowimage` into the folder the slideshow code reads from.
- Clean up the intermediate `slideshowimage` folder once assets are migrated.
- Associate each asset with provided marketing copy, alt text, and keywords for future overlays or CMS updates.

## Success Criteria
- Live slideshow references only the new curated images.
- Source and destination folders have no stale or duplicate assets.
- Each image has clearly documented copy/alt text ready for integration.
- Folder structure remains consistent with what the code expects.

## Existing Patterns
- **Slideshow source**: `config/content.json` owns `components.slideshow` (slides array) and no env overrides currently replace it, so editing this file updates every environment.
- **Image storage**: Slides currently point at `/images/slideshow/...` assets beneath `public/images/slideshow/{interior,garden,exterior,...}` plus a hero `WhiteHorseWaterbeachBuilding.(png|avif)`. Registry `src/lib/images.ts` and preload hook `hooks/useSeamlessLoading.tsx` reference these paths directly.
- **Legacy data**: `components/slideshow/slides-old.ts` shows the expected data structure and demonstrates that string paths are acceptable as long as they reside under `/public`.
- **Docs**: `docs/IMAGE_MANAGEMENT_SYSTEM.md` and `docs/IMAGES_README.md` describe how slideshow assets should be categorized and emphasize using the registry.
- **Source assets**: All six replacement PNGs plus metadata currently live under `Everythingyouneed/Slideshowimage/`.

## External Resources
- AGENTS process (Phase-based workflow + DevTools QA requirement).
- User-supplied marketing brief (headline, subhead, body, alt text, keywords) for each new slide.

## Technical Constraints
- Removing legacy files without updating `src/lib/images.ts` and `hooks/useSeamlessLoading.tsx` would produce 404s during preload.
- Slide schema supports `eyebrow`, `headline`, `copy`, `badges`, and CTA URLs; there is no dedicated `subhead` or `keywords` field, so mapping must respect existing keys.
- Next.js expects assets under `/public/images/...`; copying should preserve case-sensitive names provided by the brief.

## Open Questions
- Should we keep the `/interior|garden|exterior` subfolders or flatten the structure now that only six curated PNGs remain? (Lean toward keeping the folder that best matches each scene unless future scripts require a flat folder.)
- How many of the provided `keywords` should surface as `badges` to avoid overwhelming the UI?

## Recommendations
- Back up (via git) then delete the current `public/images/slideshow` contents before copying the curated PNG set to avoid stale assets lingering.
- Use the provided filenames verbatim so marketing metadata + source files stay in sync; update registry + preload hooks to reference the new paths.
- Update `config/content.json` to describe the six new slides, mapping `Subhead` → `eyebrow`, `Headline` → `headline`, `Body` → `copy`, and use trimmed keyword lists as `badges`.
- Capture the new canonical list + metadata in documentation (or at least within commit message/task notes) for future agents.
