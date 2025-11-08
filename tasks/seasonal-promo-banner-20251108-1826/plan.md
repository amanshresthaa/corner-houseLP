# Implementation Plan: Seasonal Promo Banner

## Objective
Surface the seasonal delivery/menu promotion (Christmas 2025) across the site via a reusable DaisyUI-styled banner fed by a standalone JSON spec. Success means:
- Banner renders on homepage and every page using `RestaurantLayout`/`SeamlessLayout`.
- Copy, badge, emoji, CTA, and analytics attributes match the provided brief.
- Styling uses the existing brand palette and respects mobile-first behaviour + accessibility requirements.

## Architecture & Components
- **Data source**: New `config/banners/seasonalPromoBanner.json` storing the raw specification (meta, layout classes, copy, CTA metadata).
- **UI component**: `components/marketing/SeasonalPromoBanner.tsx` (client) hydrates from the JSON and outputs a DaisyUI `alert` container with badge, emoji, message, and CTA. Component exposes dataset/meta attributes (`data-seasonal-banner`, `data-season`, `data-banner-id`, etc.) and a polite `aria-label`.
- **Integrations**:
  - `ClientHomeContent` → inject banner at top of `<main>` before showcase.
  - `components/restaurant/Layout` & `components/restaurant/SeamlessLayout` → render banner at top of `main` so every interior page inherits it without touching individual routes.

## Data Flow
```
JSON spec → imported into SeasonPromoBanner → props derived (badge/icon/copy/cta) → rendered markup
```
CTA anchors use `/christmas-menu` and push analytics id via `data-analytics-id`. Dataset flag becomes `data-seasonal-banner="true"` on the wrapper.

## UI/UX Considerations
- Mobile-first stacking (flex-col) using provided classes; `md:flex-row` to align CTA and message side-by-side on larger screens.
- Badge + emoji each include SR labels so screen readers understand the decoration.
- CTA styled as text-link group with underline offset + arrow icon; retains focus-visible outlines per instructions.
- Banner inherits brand colors (`brand-50..900`) so palette stays consistent with theme tokens.
- Provide `aria-live="polite"`? Not needed; use `role="region"` with descriptive `aria-label` for discoverability without causing announcements.

## Testing Strategy
- **Unit**: Jest + React Testing Library test verifying the banner renders message, badge text, CTA href/label, dataset attributes, and analytics id.
- **Manual QA**: Use Chrome DevTools (mobile/tablet/desktop, accessibility, console) on at least homepage + one inner page to ensure layout, focus, and color usage are correct. Document in `verification.md`.

## Implementation Steps
1. Add JSON spec under `config/banners/seasonalPromoBanner.json`.
2. Build `SeasonalPromoBanner` component reading the JSON and rendering markup with DaisyUI classes + Emoji/Icon + CTA arrow.
3. Wire component into `ClientHomeContent`, `RestaurantLayout`, and `SeamlessLayout` (ensure spacing + conditional render).
4. Create Jest test covering rendering + attributes.
5. Update `todo.md` checklist; execute testing + DevTools verification, document results in `verification.md`.

## Edge Cases & Rollout
- If JSON `status !== 'live'` in future we can short-circuit render—leave TODO comment for potential gating.
- Ensure banner degrades gracefully if CTA URL missing (bail early). For now, data is complete so render unconditionally.
- Banner should not duplicate if imported twice—keep single injection per layout/homepage.

## Change Request – 2025-11-08 18:45
- Relocate the promo banner so it sits above the navigation bar inside a sticky header stack (single render via `Navbar`).
- Update banner copy/CTA to promote the delivery service offer (10% off collection, £20 delivery minimum, free up to 3 miles, then £2/mile).
- Remove legacy injections in `ClientHomeContent`, `RestaurantLayout`, and `SeamlessLayout`; rely solely on the header placement.
