# Research: Slideshow Height Adjustment

## Current State
- `components/slideshow/DaisyUISlideshow.tsx` sets the overlay wrapper to `min-h-[clamp(32rem,85vh,60rem)]`, equating to ~512px minimum, 85% viewport height typical, and max ~960px.
- Requirement: shrink overall height ~30% so slides don't dominate viewport while keeping centered layout from prior task.
- Height is controlled entirely via Tailwind arbitrary values; images behind still fill via `Image` with `object-cover`.

## Considerations
- Need to keep CTA/badge spacing intact after shrinking height.
- Must ensure smaller devices still have enough vertical space (avoid cutting off content) — use balanced clamp values.
- Could also adjust padding/margins slightly if necessary, but primary change is `min-h` + possibly `py` clamps.

## Constraints
- Avoid touching other files; change should remain scoped to slideshow component.
- Must re-run DevTools QA (per AGENTS) after reducing height to confirm layout.
