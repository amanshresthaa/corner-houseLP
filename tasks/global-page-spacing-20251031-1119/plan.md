# Implementation Plan: Sitewide Section Spacing Refresh

## Objective
Apply the tightened section spacing and background/contrast rules (previously completed for the home page) to the rest of the marketing site: eliminate inter-section margins, rely on internal padding, and ensure background alternation + readable typography across About, Menu, Contact, Press, Events, and other static pages.

## Success Criteria
- [ ] No top-level page (`app/**/*.tsx` marketing routes) uses `space-y-*` or `mb-*` to separate stacked sections; spacing is controlled via section-specific padding.
- [ ] Each page reads with deliberate background cadence (dark/light transitions where appropriate) with matching text colours.
- [ ] No regressions in hero/slideshow/navbar behaviour; shared components remain reusable.
- [ ] Manual QA (DevTools) across representative pages: desktop/tablet/mobile with no unwanted white gaps.

## Architecture
- Keep `RestaurantLayout` untouched structurally; manage spacing within individual pages or via small, reusable helpers.
- Introduce (if necessary) a lightweight utility (e.g., `SectionStack`) to wrap stacked sections and apply consistent padding defaults without using Tailwind `space-y`. Favor explicit per-section `py` when background or content already defined.
- Extend existing shared components to support dark backgrounds (already started with `RestaurantHoursCard`); reuse these variants where needed.

## Page Breakdown & Planned Changes
1. **Menu (`app/menu/page.tsx`)**
   - Remove `space-y-16` from `<main>`; add `py-*` to each child section (Interactive menu, dietary CTA, gradient CTA) and ensure alternating backgrounds (e.g., keep interactive on neutral, CTA on brand).
   - Check nested containers for extra `pt`/`pb` to maintain rhythm.

2. **Contact (`app/contact/page.tsx`)**
   - Drop `space-y-16`; rely on hero `section` + main sections with `py`.
   - Ensure support cards / CTA backgrounds alternate (white vs brand-50 vs dark) with matching text colours.
   - Confirm embedded `RestaurantHoursCard` remains light variant.

3. **Press (`app/press/page.tsx`)**
   - Remove `space-y-16` and use per-section padding.
   - Revisit CTA and cards to alternate backgrounds (e.g., press grid on light neutral, CTA on dark brand) and update text colours as needed.

4. **Events (`app/events/page.tsx`)**
   - Replace repeated `mb-16` with section `py-*`.
   - Sequence sections with alternating brand backgrounds; ensure highlight cards remain legible.

5. **About (`app/about/page.tsx`) & Blog (`app/blog/page.tsx`)**
   - Verify spacing already compliant; adjust only if residual margins exist or additional padding needed post global changes.

6. **Other key pages** (`app/book-a-table`, `app/menu-information`, `app/takeaway-menu`, seasonal menus, etc.)
   - Audit for `mb-*`/`space-y-*` at top-level stacks; convert to padding-based rhythm.
   - Ensure background cadence and contrast remain consistent.

7. **Utility / Shared Improvements**
   - Consider adding a small helper class (e.g., `.section-block`) or component to codify default padding (`py-14 sm:py-16`) to reduce repetition.
   - Update documentation/comments if new conventions introduced.

## Data Flow / Dependencies
- Purely presentational; no data or API changes required.
- Maintain dynamic imports and SSR behaviour.

## Testing Strategy
- Manual DevTools QA on each modified page (desktop, tablet, mobile) verifying spacing + console cleanliness.
- Spot-check Lighthouse/Performance in DevTools for any layout shifts after removing margins.
- Optional: run existing Jest/Playwright suites if spacing changes risk regressions (not expected but available).

## Edge Cases & Risks
- Sections without inherent padding may collapse visually; must add `py` to avoid cramped layouts.
- Some sections rely on overlapping elements (e.g., gradient backgrounds). Removing margins might cause overlaps; will adjust with targeted padding.
- Alternating backgrounds must remain tasteful—avoid changing brand-critical designs (e.g., hero gradients) without confirmation.

## Rollout
- Batch updates per page, committing logically grouped changes.
- After manual QA, prepare summary for user; no feature flags required.
