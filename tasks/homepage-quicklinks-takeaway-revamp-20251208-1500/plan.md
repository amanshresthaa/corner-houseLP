# Implementation Plan: Quick Links & Takeaway CTA Revamp

## Objective
- Transform the “plan your visit” (quick links) and closing takeaway CTA sections into visually rich, alternating-light modules that highlight booking, events, and takeaway flows while staying fully data-driven via `home.json`.

## Success Criteria
- [ ] Quick links section includes eyebrow/title/description plus cards with icon badges, taglines, and CTA chips sourced from content JSON.
- [ ] Layout alternates backgrounds (light for reviews, dark for quick links, light for CTA) while matching updated homepage style.
- [ ] CTA supports hero copy, optional background image/gradient, supporting bullet list, and two button styles (primary + secondary) without breaking other uses.
- [ ] Tests + content validation cover new schema fields; build remains green.

## Architecture
- Extend `home.json` quickLinks data structure with section metadata (eyebrow/title/description) and per-link fields (`eyebrow`, `ctaText`, `icon`, `accent`). Update `NormalizedHomeSections` + `buildHomeSections` to normalize new fields.
- Replace `QuickLinksSection` layout with hero header + DaisyUI “steps” or stacked cards, including icon circle and CTA chip. Possibly rename to `HomepageQuickLinks` but reuse existing component file to avoid extra wiring.
- Enhance `CallToActionSection` or build a new `HomepageClosingCta` component that supports hero, background image (via data), features list, contact text, and button group. Update `home.json -> cta` with new metadata fields (eyebrow, badge, features, image, contact). Normalize accordingly.

## UI/UX
- Quick Links: gradient background (brand midnight) with glass cards, each card includes icon glyph (SVG inline), short descriptor, CTA arrow pill. Provide mobile horizontal scroll for cards if >3.
- CTA: light background hero with image mosaic (maybe background pattern), highlight takeaway ordering vs booking, include contact snippet (phone/time). Buttons remain pill style but align with new theme.

## Data Updates
- `config/content/pages/home.json`: add new `quickLinks.heading`, `quickLinks.eyebrow`, `quickLinks.description`, and extend each link entries with new fields.
- Update `cta` block with new hero metadata (eyebrow, badge, image, features, contact text) and adjust button text/variants.

## Testing
- Update `tests/data/homepage/sections.test.ts` to assert new quick links metadata and CTA fields normalized.
- Run `npm run test -- --selectProjects=server --testPathPattern=tests/data/homepage/sections.test.ts` and `npm run content:validate`.
- Post-change, run `pnpm run build` (already part of earlier steps) if necessary.

## Rollout
- No feature flags; rely on optional fields for backwards compatibility.
- Document pending DevTools QA in verification doc; request access for manual QA.
