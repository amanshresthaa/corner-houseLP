Image Organization and Usage

Overview
- All image paths are centralized via a single registry: `src/lib/images.ts`.
- Code should import image paths from this registry rather than hardcoding strings.
- This keeps references consistent and makes future moves/optimizations trivial.

Structure (physical folders)
- Public brand assets
  - `public/images/brand/corner-house-logo.png` (primary)
  - `public/images/slideshow/whitehorsebuilding.png`
- Venue photos (slideshow set)
  - `public/images/slideshow/*.png` (seven curated hero assets sourced from `Everythingyouneed/Slideshowimage/`)
  - Referenced via the registry, content JSON, or static imports
- Dish photos
  - `public/images/food/*.jpeg`

Registry (logical groups)
- File: `src/lib/images.ts`
  - `brand`: logo/building
  - `venue`: interior/exterior/garden images
  - `dishes`: curated dish images used across home and menu highlights
  - `blog`: canonical images for each blog post hero

How to use
- Import and reference a logical image, e.g.:
  - `import { Images } from '@/src/lib/images'`
  - `<Image src={Images.venue.exterior} ... />`

Adding new images
1) Place the image under the appropriate public folder:
   - Venue/slideshow: `public/images/slideshow/` (keep descriptive filenames; re-introduce subfolders only if necessary and update docs)
   - Dish: `public/images/food/`
   - Brand: `public/images/brand/`
2) Add a stable mapping in `src/lib/images.ts`.
3) Use the new key in the UI.

Required slideshow photos (current canonical set)
- Current curated PNG set (all at `public/images/slideshow/`):
  - `whitehorsebuilding.png`
  - `bar-counter-cozy-lighting-taps-and-shelves-landscape.png`
  - `beer-garden-picnic-benches-and-sky-portrait.png`
  - `fresh-mixed-salad-cherry-tomatoes-portrait.png`
  - `steamed-momo-with-spicy-sauce-portrait.png`
  - `warm-chicken-salad-with-cherry-tomatoes-portrait.png`
  - `shared-table-nepalese-feast-landscape.png`

Notes
- Legacy placeholder slideshow images were removed to prevent accidental reuse.

Removed placeholders
- Deleted: `public/hero-restaurant.jpg`
- Deleted: `public/restaurant/bar-area.jpg`, `public/restaurant/dining-room.jpg`
- Updated schema images to only use real venue photos.

URL conventions
- Dishes keep a stable virtual path (legacy compatible):
  - `/images/dishes/:path*` → `/images/food/:path*`
- Slideshow images are served directly from `/images/slideshow/<filename>` (flat structure for the curated set).

Future (optional) physical re‑org
- If/when you want, we can physically move binaries into the virtualized structure; no code changes required thanks to the registry and rewrites.
