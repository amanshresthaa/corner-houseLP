# Research: Slideshow Padding Adjustment

## Existing Patterns
- `components/ClientHomeContent.tsx` structures the home page layout. The `<main>` element directly wrapping the slideshow section currently has `className="pt-12 sm:pt-16"`, which introduces 48px/64px of top padding before the slideshow renders.
- The slideshow content itself is rendered via `<Showcase>` which wraps `DaisyUISlideshow`. There are no explicit section-level padding utilities applied within `<section>` wrappers around the slideshow, so the top spacing is controlled entirely by the parent `<main>`.
- Within `components/slideshow/DaisyUISlideshow.tsx`, the slide content container uses `py-[clamp(2rem,6vw,4.5rem)]` to preserve comfortable vertical breathing room inside each slide. This padding is internal to the slides and does not affect the gap above the slideshow component relative to the navbar.
- The navbar (`components/restaurant/Navbar.tsx`) is rendered before `<main>` and uses a `sticky top-0` header with a promo banner and navigation bar stacked vertically. Because the header remains in-flow (sticky, not fixed), subsequent content does not require extra offset padding to avoid overlap.

## Technical Constraints
- Tailwind/DaisyUI utility classes are the norm; spacing adjustments should reuse these utilities for consistency instead of custom CSS.
- Any spacing updates must maintain adequate separation between the navbar (with promo banner) and the slideshow on both mobile and desktop breakpoints without reintroducing overlap when the banner is present or absent.
- The slideshow minimum height is already constrained with `min-h-[clamp(22rem,60vh,42rem)]`; reducing surrounding padding should not reduce this min height or break CTA alignment.
- Accessibility requirements (focus order, skip links) rely on the semantic flow: no structural changes should compromise `<main id="main-content">` as the primary landmark.

## External Resources
- Internal documentation (docs/MOTION_SYSTEM.md, PROGRESSIVE_LOADING_GUIDE.md) emphasize using DaisyUI and Tailwind utilities; no external spacing guidelines beyond “mobile first & DaisyUI” are specified for this section.

## Recommendations & Findings
- The unwanted top padding is most likely introduced by `<main className="pt-12 sm:pt-16">`. Reducing this to a smaller, fixed spacing (≈16px on mobile, modestly higher on larger screens) should align with the request “fix that around 16”.
- Because the navbar includes a promo banner whose height may vary, retaining a small amount of padding (e.g., `pt-4 sm:pt-6`) will keep separation without recreating the large gap.
- No other components reuse the same layout wrapper, so adjusting the `<main>` padding is a localized change that will primarily affect the slideshow’s top offset while keeping downstream sections intact.

## Open Questions
- Confirm whether the user wants identical padding across all breakpoints (exact 16px) or just a visually similar reduction. Pending clarification, default to mobile-first 16px with slightly larger spacing (24px) on ≥640px to prevent crowding.
- Need to verify if any scroll-based behavior (e.g., skip links) rely on the previous padding before finalizing.
