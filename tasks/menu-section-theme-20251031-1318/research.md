# Research: Menu Section Theme

## Initial Requirements
- Adjust the “Need Dietary Information?” section on `app/menu/page.tsx` so the page follows the intended light → dark → light background rhythm.
- Preserve readability, focus states, and interactive affordances after switching the section to a dark treatment.

## Success Criteria
- Section wrapper uses a dark background token from the existing palette and contrasts with the adjacent light sections.
- Headline, body copy, badges, and CTA button remain AAA/AA compliant on the dark surface.
- No regression to motion wrappers or server data flow; FadeIn animation and layout spacing stay intact.
- Styles rely on existing Tailwind/DaisyUI utility tokens—no bespoke CSS.

## Existing Patterns
- `app/menu/page.tsx:178-249` already alternates `bg-neutral-50` (interactive menu) and `bg-brand-800` (hours/CTA). The dietary section in between is still `bg-white`, breaking the cadence.
- The hours block (`app/menu/page.tsx:243-310`) demonstrates how dark sections pair `bg-brand-800` with `text-neutral-100`, translucent pills, and bordered cards while keeping focus rings visible.
- Reusable CTAs (`components/restaurant/sections/MenuCTASection.tsx`) showcase gradient dark cards with light text and adjusted button variants—useful reference for contrast ratios and ring offsets.
- Tailwind config (`tailwind.config.js`) exposes brand color scales (`brand-800`, `brand-900`, `stout-900`) suited for dark backgrounds.

## Technical Constraints
- Next.js 13 app router page; section runs inside a `FadeIn` motion wrapper—class changes must not affect animation props.
- Buttons use Link from `@/lib/debugLink`; modifying classes should keep existing hover, focus-visible, and touch targets intact.
- DaisyUI compatibility is expected—stick to Tailwind utilities already in use instead of introducing custom CSS rules.

## Open Questions
- Should the dietary CTA mimic the gradient treatment from `MenuCTASection`, or is a flat brand background sufficient? (Assume flat unless design says otherwise.)
- Do we need to display alternative iconography or backgrounds for the info pills on dark surfaces? (Likely just swap to semi-transparent light chips.)

## Recommendations
- Switch wrapper to a dark brand tone (`bg-brand-900` or similar) and add matching light text classes on heading, paragraph, and badges.
- Update CTA button focus ring offsets to use the new dark background (`focus-visible:ring-offset-brand-900`) for consistent accessibility.
- Replace pill backgrounds with translucent light overlays (`bg-white/10` + `text-white/80`) and add borders if necessary for legibility.
- Re-run menu page visual QA across breakpoints using Chrome DevTools to ensure the dark section flows with the established alternating rhythm.
