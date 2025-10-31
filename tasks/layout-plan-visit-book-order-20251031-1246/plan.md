# Implementation Plan: Menu Section Layout Merge

## Objective
Unify the "Plan your visit" and "🍽️ Book or Order in Moments" areas into one cohesive section and adjust the "Explore the menu" block to follow the light→dark rhythm requested for the menu page.

## Success Criteria
- [ ] Only one section wrapper remains for visit planning + booking CTA content.
- [ ] "Explore the menu" renders on a light background with accessible contrast.
- [ ] Alternating light/dark sequence resumes without duplicate dark sections.
- [ ] Page compiles without type errors and linting complaints.

## Architecture
### Components
- Extend `MenuCTASection` to support inline usage (no standalone section wrapper) so it can sit inside the merged layout without duplicating markup.
- Recompose the visit planning area in `app/menu/page.tsx` into a two-column grid with hours info on one side and the CTA card on the other.

### State Management
No new state; reuse existing props (`ctaButtons`, `extendedAllergenNotice`).

### Data Flow
- Continue passing CTA button data from `MenuPage` to the merged layout.
- Keep `RestaurantHoursCard` dynamic import usage unchanged but update styling props to match new background tone.

### API Contracts
No network/API changes.

## UI/UX Considerations
- Ensure color tokens (`bg-neutral-50`, `text-stout-700`, etc.) meet contrast requirements on light backgrounds.
- Maintain responsive stacking: merged section should collapse to vertical order (CTA card below hours) on small screens.
- Retain motion animations but avoid nested sections with conflicting padding.

## Testing Strategy
- Visual/manual smoke test in browser after build (DevTools QA to be documented in verification).
- Run targeted component test suite (`MenuCTASection`) if updated.

## Edge Cases
- CTA buttons array empty: `MenuCTASection` already short-circuits; ensure inline usage respects that guard.
- Tel link availability: preserve existing `telHref`/`phoneDisplay` usage.

## Rollout Plan
- Update page + component, run format if needed, verify visually, and document QA in `verification.md`.

## Implementation Steps
1. Update `MenuCTASection` to accept an `asChild` flag (switch root element + default classes).
2. Adjust `app/menu/page.tsx` "Explore the menu" block to light theme (colors, borders, text).
3. Rebuild visit planning area into merged section embedding `MenuCTASection` in inline mode with updated layout classes.
4. Spot-check on small + large viewports via DevTools; capture findings in verification doc.
