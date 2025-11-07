# Implementation Plan: Slideshow Layout & Responsive Typography

## Objective
Center slideshow copy both vertically and horizontally and introduce stronger fluid typography so slide text auto-adjusts for short/long content without manual tweaks.

## Success Criteria
- [ ] Slide overlay content stays centered within each slide on mobile, tablet, and desktop viewports.
- [ ] Typography scales via `clamp()` values tailored to the slideshow (eyebrow, headline, body) and does not overflow or look tiny on small copy.
- [ ] Padding/margins provide balanced whitespace around the centered stack.
- [ ] CTAs and badges retain responsiveness and alignment after layout changes.
- [ ] Manual QA (DevTools) confirms centered layout + font scaling across breakpoints.

## Architecture / Components
- `components/slideshow/DaisyUISlideshow.tsx`: adjust slide wrapper to a flex container with `min-h` clamp, `items-center`, `justify-center`, and refined padding. Update typography classes and spacing clamps.
- `app/globals.css`: add scoped `.slideshow-eyebrow`, `.slideshow-headline`, `.slideshow-copy` utilities for the new fluid type ramp (using Tailwind `@apply` + raw `clamp()`).

## Data Flow
No API/content changes. Only presentation layer updates inside slideshow and CSS utilities consumed by the component.

## Implementation Steps
1. Add slideshow-specific typography utilities in `app/globals.css` under the utilities layer (fluid `clamp()` sizes, balance/pretty text, consistent letter spacing).
2. Refactor DaisyUI slideshow slide wrapper to use a centering flex layout with `min-h-[clamp(...)]`, `max-w` constraints, and balanced padding/margins.
3. Replace existing eyebrow/headline/body classes with the new utilities, ensure badges/CTAs inherit updated spacing (gap clamps) and text alignment.
4. Verify slide layout/typography across viewport sizes in Chrome DevTools (mobile/tablet/desktop) and document in `verification.md`.

## Edge Cases & Testing
- Ensure content remains readable when slides omit eyebrow/copy – container should still center remaining elements.
- Confirm CTAs stack naturally on narrow screens (already responsive but re-test).
- Use DevTools to inspect DOM, measure font sizes, and ensure no scroll clipping occurs.
