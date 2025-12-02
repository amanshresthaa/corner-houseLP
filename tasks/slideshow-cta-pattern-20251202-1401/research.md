# Research: slideshow CTA pattern update

## Objective
Implement deterministic CTA pattern (A: order online, B: call to book, C: book online via nabatable link) across slideshow slides with exactly 2 CTAs per slide, ordered ABCABC…

## Current state
- Data source: `config/content.json` defines slideshow slides; global `links.takeaway` is `/online-delivery`.
- Rendering: `components/slideshow/DaisyUISlideshow.tsx` computes CTAs in `getCTAConfig`, prioritising takeaway when available and otherwise branching based on available URLs, yielding 2 CTAs but with variant mix depending on slide content.
- CTA button rendering: `SlideCTAButton` supports variants `takeaway`, `call-booking`, `book`, `menu`, `call-takeaway`, `learn-more`; booking URL currently comes from `slide.ctas.bookUrl` if present.

## Constraints/assumptions
- Keep 2 CTAs per slide.
- Enforce deterministic sequence ABCABC… across slides; avoid randomization by slide data.
- Use provided external booking URL `https://www.nabatable.com/restaurants/white-horse-pub-waterbeach/book` for CTA C.
- Preserve existing fallback takeaway URL (`links.takeaway`) for CTA A.
- All current slides include `ctas.callTel`, ensuring CTA B has an href.

## Proposed adjustments
- Introduce ordered CTA assignment derived from slide index: primary variant = pattern[i mod 3], secondary variant = next pattern entry (pattern[(i+1) mod 3]) to deliver two CTAs per slide while cycling ABC.
- Map variants to hrefs:
  - A (order online): slide `takeawayUrl` or global `links.takeaway`.
  - B (call to book): slide `callTel`.
  - C (book online): new global booking URL (fallback to slide `bookUrl` if present).
- Color clarify to avoid sameness: takeaway -> accent, call -> crimson, book -> brand (navy) so each CTA type is visually distinct while retaining contrast and focus styles.
- Update CTA config logic accordingly and keep styling/ARIA intact.
- Store nabatable booking URL in config for reuse (e.g., under `global.links.bookOnline` or slideshow settings).
