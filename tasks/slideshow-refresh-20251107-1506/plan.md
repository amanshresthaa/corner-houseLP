# Implementation Plan: Slideshow Refresh

## Objective
Replace the slideshow’s legacy asset set with the six curated PNGs from `Everythingyouneed/Slideshowimage`, keeping metadata, alt text, and marketing copy in sync so the homepage carousel reflects the new creative direction.

## Success Criteria
- [ ] `public/images/slideshow/` contains only the six curated PNGs (no stale files/subfolders remain).
- [ ] `config/content.json` defines six slides whose copy/alt text mirror the provided brief.
- [ ] `src/lib/images.ts` + `hooks/useSeamlessLoading.tsx` reference the new filenames so preload + brand usage do not 404.
- [ ] Documentation/task notes capture the new canonical asset list for future reference.

## Architecture
### Components
- `Slideshow` (components/slideshow/Slideshow.tsx) remains unchanged; it consumes slide data passed from `ClientHomeContent`.
- Supporting utilities (`src/lib/images.ts`, `hooks/useSeamlessLoading.tsx`) must point at the updated paths for preloading + brand hero usage.

### State Management / Data Flow
- `config/content.json` → `src/lib/data/server-loader.ts` (`getContentSmart`) → `app/page.tsx` → `ClientHomeContent` → `Slideshow`.
- Slide updates therefore only require editing the JSON plus any hard-coded preload paths.

### API / Content Contracts
- Slide schema allows `id`, `image`, `alt`, `eyebrow`, `headline`, `copy`, `badges`, `ctas`.
- Provided marketing copy will map to `eyebrow` (subhead), `headline`, `copy` (body). Keywords will be distilled into ≤3 `badges`.

## Implementation Steps
1. Snapshot current `public/images/slideshow` contents (for safety via git status) then remove the directory to guarantee a clean slate.
2. Copy the six PNGs from `Everythingyouneed/Slideshowimage` into `public/images/slideshow/`, preserving filenames; no subfolders needed.
3. Update `src/lib/images.ts` (`brand.building`) + `hooks/useSeamlessLoading.tsx` (preload list) to reference `/images/slideshow/<new-name>.png`.
4. Rewrite `config/content.json`’s `components.slideshow.slides` array with six entries reflecting the provided copy/alt/keywords + new asset paths and sensible CTA choices.
5. Document the final asset list + metadata references in `docs/IMAGES_README.md` (or inline comments) so future contributors know the canonical set.

## Edge Cases
- Ensure alt text is applied exactly as provided to maintain accessibility quality.
- Confirm CTA URLs remain relevant (e.g., keep `tel:` and `/menu` links where appropriate).
- Keywords → `badges` should avoid duplicates and maintain short length to prevent layout overflow.

## Testing Strategy
- Manual QA: run through the homepage in dev mode (or via Storybook if available) once assets + content update, verifying each slide renders and transitions correctly.
- File integrity: check `git status` to confirm only the six PNGs exist; optional `rg` for `/images/slideshow/` to ensure references updated.
- Later verification phase: Chrome DevTools inspection per AGENTS requirements.

## Rollout Plan
- Changes land via code commit; no feature flag required.
- After deploy, assets served immediately because they are static files under `/public`; CDNs will update on next build.
