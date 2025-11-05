# Research: Add Takeaway CTA in Slideshow

## Existing Patterns
- Slideshow implementation uses DaisyUI styles via `components/slideshow/DaisyUISlideshow.tsx`.
- Buttons are rendered through `components/slideshow/SlideCTAButton.tsx` with variants: `book`, `menu`, `call-takeaway`, `call-booking`, `learn-more`.
- Slide data is driven from `config/content.json` under `components.slideshow.slides[]` with `ctas` object: `{ bookUrl?, callTel?, menuUrl?, secondaryUrl? }`.
- Types live in `components/slideshow/types.ts` and Zod schema in `src/lib/data/schemas.ts`.

## Reuse Opportunities
- Reuse existing `menuUrl` CTA channel for external links; keep code changes minimal.
- Extend `SlideCTAButton` labeling when `menuUrl` points to Touchtakeaway to display "Order Takeaway" instead of "View Menu".

## External Resources
- Takeaway link provided: https://whitehorsecb25.touchtakeaway.net/menu

## Technical Constraints
- Keep within established DaisyUI component patterns.
- Avoid schema changes if possible to minimize blast radius.
- Maintain accessibility: labels, focus, keyboard.

## Open Questions
- Should we add the CTA to all slides or only the most relevant? Assumption: add to the slide that mentions takeaway (Community Calendar), keeping others unchanged.

## Recommendation
- Minimal, safe change: 
  - Add `menuUrl` with the Touchtakeaway link to the "Community Calendar" slide in `config/content.json`.
  - Update `SlideCTAButton` to automatically rename the `menu` variant label to "Order Takeaway" (emoji 🥡) when the href matches `touchtakeaway.net`.
  - This avoids schema churn while yielding an accurate CTA label.
