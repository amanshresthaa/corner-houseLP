# Implementation Plan: Takeaway Ready Section Revamp

## Objective
Replace the current closing CTA with a bespoke "Takeaway Ready" hero that better spotlights hotline ordering, service guarantees, and dual CTA actions while remaining data-driven through `sections.cta` content.

## Success Criteria
- [ ] Redesigned section delivers modern, mobile-first layout with layered background, hero image, highlights, and hotline card.
- [ ] Supports existing schema fields (eyebrow, badge, description, features, contact, image, buttons) without breaking API normalization/tests.
- [ ] Buttons remain accessible, with icons/text describing the action; contact info must be prominent on desktop & mobile.
- [ ] Updated Jest tests cover new structure, ensuring key elements (pill, hotline, highlights, buttons) render.
- [ ] Content validation + targeted tests pass; manual QA via DevTools scheduled after build.

## Architecture & Components
- **CallToActionSection.tsx** (reuse file/export, but rebuild JSX):
  - Outer `<section>` retains optional background control; add gradient overlay + patterned background class.
  - Layout: grid that stacks on mobile and splits on lg screens. Left column contains copy + features; right column houses media + hotline card.
  - Introduce `HighlightCard` subcomponent for each entry in `features` array, rendering icon + text chips (icon derived via small mapping or emoji fallback).
  - Create `HotlineCard` derived from `badge` + `contact` data; display label/value + detail, and optionally include an action hint (tap to call) when `contact.value` is tel.
  - Buttons adopt DaisyUI `btn` classes layered with variant-specific colors; optionally include small inline icons based on button `key` or text (menu/book/takeaway).
  - Add fallback illustration (SVG/pattern) if `image` missing; otherwise wrap `next/image` inside gradient frame with floating chips.

- **HomeSectionsRenderer.tsx**: likely unchanged besides prop names; ensure new CTA component props align.

- **config/content/pages/home.json**: rewrite CTA copy to align with new storytelling (eyebrow, badge, features list tuned to highlight readiness). Consider updating button text to match new icons.

- **Styling Approach**: rely on Tailwind utilities already configured; incorporate DaisyUI tokens (btn, badge). Use `prefers-reduced-motion` friendly transitions (subtle translate/scale). Keep all textual content accessible (contrast, semantic headings, lists).

## Data Flow & API
- Content JSON feeds into normalization `normalizeClosingCta` (already supports used fields). No schema changes anticipated; if highlight icons desired, infer from `features` string (prefix with emoji or use heuristics) to avoid new fields.
- Buttons keep variant field; this component will map variant => DaisyUI style classes.

## Testing Strategy
- Update `tests/components/restaurant/sections/CallToActionSection.test.tsx`:
  - Validate hotline badge/contact card renders when contact data present.
  - Ensure highlight chips count matches `features` array.
  - Confirm external link detection + aria labels still function with new button markup.
  - Snapshot-like expectations for hero structure (presence of `data-testid` anchors for highlight grid, hotline card, hero image wrapper).
- Re-run `tests/data/homepage/sections.test.ts` if copy/data changes affect expectations.
- Run `npm run content:validate` to ensure JSON still conforms.

## Edge Cases
- Missing `image`: render fallback gradient block with icon.
- Missing `contact`: hide hotline card but keep layout balanced (image full height).
- Buttons array empty: component returns `null` per guard; tests confirm.
- Long descriptions/features: use responsive gap + wrap to prevent overflow.

## Rollout & Verification
- After implementation + tests, run manual QA via Chrome DevTools MCP: verify responsiveness (mobile/tablet/desktop), keyboard focus, console cleanliness.
- Document verification steps/results in `verification.md` once QA complete.
