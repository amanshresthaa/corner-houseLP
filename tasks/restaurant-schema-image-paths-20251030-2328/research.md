# Research: Restaurant Schema Image Paths

## Existing Patterns
- `tsconfig.json` defines `@cimages/*` to resolve to `src/assets/images/components/*`, and other components (e.g. `components/slides/SportsSlide.tsx`, `components/restaurant/Hero.tsx`) successfully import images using this alias when the filenames match the on-disk assets.
- Asset directories such as `src/assets/images/components/Slideshow/exterior` and `.../interior` contain files with the `the-old-crown-...` naming convention. Runtime content JSON (`config/content.json`) uses the corresponding `/images/slideshow/...` paths that align with those filenames.

## External Resources
- [Next.js Path Aliases Documentation](https://nextjs.org/docs/app/building-your-application/configuring/path-aliases) — confirms the `tsconfig` `paths` mapping used in this project.

## Technical Constraints
- Build currently fails because webpack cannot resolve three image imports in `components/seo/RestaurantSchema.tsx`. The filenames referenced in these imports do not exist in the mapped directory.
- Any fix should keep existing asset optimization scripts (`scripts/critical-image-optimizer.js`) and other imports intact.

## Observations
- The non-existent filenames follow a `the-the-white-horse-...` pattern, whereas the actual assets on disk retain `the-old-crown-...` names (likely legacy naming).
- Other modules (e.g. `hooks/useSeamlessLoading.tsx`) reference the missing filenames as strings. Those paths are only used at runtime (not as imports) and therefore do not currently break the build, but they may benefit from alignment later.

## Recommendations
- Update `RestaurantSchema.tsx` image imports to reference the existing filenames under `src/assets/images/components/Slideshow/...` so that the build can resolve them.
- Optionally document the naming mismatch (White Horse vs Old Crown) for future asset housekeeping.

## Open Questions
- Should the asset files be renamed to the White Horse naming convention, or is referencing the legacy filenames acceptable for launch? (Assuming the latter for now.)
