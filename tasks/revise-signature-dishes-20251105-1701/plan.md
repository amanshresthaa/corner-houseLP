# Implementation Plan: Signature Dishes

## Objective
Deliver a name-only, DaisyUI-based carousel (mobile) and grid (desktop) for signature dishes.

## Steps
1. Filter items to require `name`; remove slice limitation
2. Implement DaisyUI `carousel` for mobile with `card image-full`
3. Implement responsive grid for desktop
4. Remove description/badges and suppress section subtitle
5. Verify with DevTools (DOM, accessibility, responsiveness)

## Success Criteria
- [ ] Only dish names are visible on cards
- [ ] Carousel scrolls horizontally on mobile
- [ ] Grid renders cleanly on larger screens
- [ ] No console errors; images have alt text
