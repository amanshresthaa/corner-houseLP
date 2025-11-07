# Research: Restaurant Schema Asset Fix

## Existing Patterns
- Image imports inside React components use TS path aliases (see `tsconfig.json` mapping `@cimages/*` → `src/assets/images/components/*`).
- The curated slideshow assets live under both `src/assets/images/components/Slideshow/` (for static imports) and `public/images/slideshow/` (for runtime `next/image` URLs); file names are intended to match exactly.
- `docs/IMAGES_README.md` defines a canonical slideshow set and stresses keeping filenames consistent because other layers (content JSON, hooks, schema components) reference those names directly.
- `src/lib/images.ts` centralizes most public image paths; the momo variants there all reference `steamed-momo-with-spicy-sauce-portrait` (singular), so other consumers expect that filename to exist.

## External Resources
- [docs/IMAGES_README.md](docs/IMAGES_README.md): outlines file naming guidance and the canonical slideshow filenames.
- `src/lib/images.ts`: serves as the internal registry that other modules consume; useful for cross-checking required assets.

## Technical Constraints & Findings
- Next.js static imports (as used in `components/seo/RestaurantSchema.tsx`) must resolve to real files at build time; mismatched filenames block `next build`.
- The filesystem currently stores the momo asset with an extra `s` (`steamed-momos-with-spicy-sauce-portrait.*`) across multiple folders (`public/images/slideshow`, `public/images/white-horse/dishes`, and `src/assets/images/components/Slideshow`).
- No code references the pluralized filename; every consumer expects `steamed-momo-with-spicy-sauce-portrait`, so the assets have effectively been broken for runtime string-based usages as well.
- There are duplicate binaries (PNG for slideshow, JPEG for dishes) plus a raw asset copy inside `Everythingyouneed/whitehorseimages/`—all share the same pluralized filename.

## Open Questions
- None identified; the issue appears to be a straightforward filename mismatch introduced during asset ingestion.

## Recommendations
- Rename every affected asset file (PNG and JPEG variants, plus the raw source copy) to the canonical `steamed-momo-with-spicy-sauce-portrait.*` naming so all existing imports/paths remain valid.
- After renaming, rerun `pnpm run build` to confirm the Restaurant Schema import resolves and to ensure there are no lingering references to the pluralized filename.
- Optional follow-up: add a lint/test or script to validate asset filenames against `src/lib/images.ts` to prevent drift.
