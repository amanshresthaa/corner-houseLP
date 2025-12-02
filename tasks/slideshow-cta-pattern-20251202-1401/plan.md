# Implementation Plan: slideshow CTA pattern update

## Objective
Render slideshow CTAs in a strict repeating order (A: order online, B: call to book, C: book online @ nabatable link) with exactly two CTAs per slide.

## Steps
1) Add global config entry for the nabatable booking URL to keep content-driven links.
2) Update `DaisyUISlideshow.getCTAConfig` to:
   - Use ordered pattern [A, B, C] cycling by slide index.
   - Assign secondary CTA as the next item in the cycle so each slide shows two CTAs.
   - Map variants to hrefs (A -> takeaway per-slide or global; B -> callTel; C -> new global booking URL, fallback to slide bookUrl).
   - Give each variant a distinct brand color: takeaway -> accent-500, call -> crimson-600, book -> brand-600, with darker hover states.
   - Preserve styling, accessibility, and 2-CTA guarantee; ensure graceful fallback if any href missing.
3) Keep existing session/slide selection untouched.
4) Run light checks (type check/unit if quick) and outline manual QA plan (DevTools) though UI unchanged structurally.

## Edge Cases
- If takeaway or call URLs are missing (not expected), CTA should still render only when href exists; maintain 2-CTA goal where possible with fallbacks.
- External booking link should open in new tab (handled by SlideCTAButton for http links).

## Verification
- Static review of rendered CTA mapping for the first few slides to confirm sequence AB, CA, BC repeats.
- (If time) run unit/lint that touches slideshow; otherwise manual reasoning acceptable since small change.
