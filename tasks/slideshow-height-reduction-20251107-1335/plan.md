# Implementation Plan: Slideshow Height Reduction

## Objective
Reduce slideshow height by roughly 30% while keeping centered layout, responsive typography, and CTA spacing intact.

## Success Criteria
- [ ] `min-h` clamp decreased so slides visibly shorter (~30% reduction) on desktop and large screens.
- [ ] No clipping of text/CTAs on small screens (mobile/tablet).
- [ ] Manual QA confirms new height visually balanced.

## Approach
1. Update `components/slideshow/DaisyUISlideshow.tsx` overlay wrapper `min-h` from `clamp(32rem,85vh,60rem)` to a lower set (e.g., `clamp(22rem,60vh,42rem)` which is roughly 30% smaller at each bound). Adjust padding if necessary.
2. Verify spacing still comfortable; tweak `py` clamp if needed.
3. Run DevTools QA on `/` slideshow for key breakpoints.
