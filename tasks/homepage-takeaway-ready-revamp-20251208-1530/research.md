# Research: Takeaway Ready Section Revamp

## Existing Patterns
- `components/restaurant/sections/CallToActionSection.tsx` renders the current closing CTA with a pill eyebrow, badge, feature list, hotline card, and image split layout; it already supports eyebrow/badge/contact/image props but the visual structure still mirrors earlier designs.
- `components/homepage/HomeSectionsRenderer.tsx` wires normalized `closingCta` data into the CTA component and applies outer padding (`className="pt-6 pb-8 sm:pt-8 sm:pb-10"`). Any API change must remain compatible with this renderer.
- `src/lib/homepage/sections.ts` (`normalizeClosingCta`) sanitizes CTA fields (buttons, badge, contact, features, image) and ensures at least one CTA button exists. Keeping the same data contract avoids touching normalization/tests unnecessarily.
- Content source lives in `config/content/pages/home.json` under `sections.cta`; updates should remain JSON-driven so marketing can tweak copy.
- Tests: `tests/components/restaurant/sections/CallToActionSection.test.tsx` verify rendering of headline, buttons, link handling, badges, and layout semantics; additional features require corresponding test updates.

## Technical Constraints
- Must adhere to AGENTS guidelines: DaisyUI-first, mobile-first responsive layout, accessibility (focus-visible, semantic HTML), and manual QA requirement later.
- Schema for CTA already expanded (badge/contact/image/features) and used by other parts of site; backwards compatibility is important.
- Asset loading should use `next/image` with responsive sizing to avoid CLS; fallback state needed when no image provided.
- Buttons currently support three variants with bespoke classnames defined inside the component; if introducing new styles, either reuse DaisyUI button tokens or extend existing helper.

## Observations & Opportunities
- Present layout is symmetrical but still reads like generic card. Opportunity to create more dramatic “Takeaway Ready” hero with textured background, stacked badges, stat chips, and contact card resembling hotline.
- Buttons currently plain; could introduce inline iconography (e.g., phone/menu icons) or apply DaisyUI `btn` tokens for consistency.
- Contact block always full-width; we can re-imagine as detachable “Hotline card” anchored over hero imagery for better emphasis.
- Section lacks explicit testimonials/assurances—adding mini feature bullets (prep time, delivery radius, dietary options) could reassure visitors.
- Need to ensure design gracefully collapses on mobile (single column, cards stack, buttons full-width) and scales up on desktop (split hero plus imagery/perimeter gradient).

## External References
- DaisyUI “hero” and “stats” components for building pill badges and metric cards.
- Past homepage revamp tasks (e.g., `homepage-quicklinks-takeaway-revamp-20251208-1500`) illustrate expected polish level (glassmorphism, layered gradients).

## Recommended Direction
- Build a brand-new `TakeawayReadySection` (or refactor existing CTA component) featuring:
  - Gradient glass hero background with textured noise overlay for depth.
  - Left column: eyebrow/badge, large display headline (with emphasized words), description, and DaisyUI-inspired feature list (icons + text) describing readiness.
  - Inline status chips for “Collection in 20 min”, “City-wide delivery”, etc., derived from `features` array.
  - CTA button group with stacked primary/secondary buttons; include icons to communicate action type.
  - Right column: hero image with floating hotline card (badge label/value + contact detail) and optional highlight stats (prep time, phone number) if contact provided.
- Keep API contract intact but allow additional optional props (e.g., `highlights` or `serviceWindow`). If new fields needed, update schema + normalization accordingly.
- Update tests to reflect new DOM, verifying icons, contact card, and responsive wrappers render.
- After implementation, extend `config/content/pages/home.json` copy/metadata to align with new structure.
