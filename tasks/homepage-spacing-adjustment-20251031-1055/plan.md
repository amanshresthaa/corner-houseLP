# Implementation Plan: Home Page Section Spacing

## Objective
Eliminate the inter-section margin gaps on the home page (press ticker, about, takeaway, etc.) by removing the shared `space-y-*` margins while keeping existing layout elements (navbar, slideshow) untouched.

## Success Criteria
- [ ] No visual `margin-top` gaps between successive home sections in DevTools inspection at mobile/tablet/desktop breakpoints.
- [ ] Slideshow and navbar remain unchanged.
- [ ] Alternating section background colors remain intact.

## Architecture
- Adjust layout spacing at the aggregation layer (`components/ClientHomeContent.tsx`).
- Prefer using section-specific padding (`py-*`) already present rather than shared margin utilities.

## Component Breakdown
- `components/ClientHomeContent.tsx`: Update `<main>` container classes to remove `space-y-*` gap utilities; ensure overall padding remains sensible.
- No other components require changes unless gaps persist after removing `space-y`.

## Data Flow
- Pure presentational changes; no data flow adjustments.

## UI/UX Considerations
- Maintain readability by relying on existing internal padding inside sections.
- Confirm that removal of spacing doesn't cause sections to visually collide (edges should still feel distinct thanks to padding/backgrounds).

## Testing Strategy
- Manual visual regression via Chrome DevTools across responsive breakpoints.
- Spot-check DOM for absence of `space-y-*` generated margins between sections.

## Edge Cases
- Ensure optional sections (e.g., press ticker not present) do not introduce unintended spacing.
- Verify first section after slideshow still aligns properly without extra gap.

## Rollout Plan
- Local change only; no feature flag. After verification, ready for inclusion in next deploy.
