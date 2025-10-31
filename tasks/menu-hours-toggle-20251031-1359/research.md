# Research: Collapsible Hours Card

## Existing Patterns
- `components/restaurant/RestaurantHoursCard.tsx` already renders both kitchen and bar hours with internal buttons (“Show all hours”) per section but the overall card remains fully expanded, occupying significant vertical space.
- The component is a client component (`'use client'`) using `useState` for the per-section expansion state, making it feasible to add higher-level UI state (e.g., collapsing the entire card).
- `useOpeningHours` hook exposes processed data including current open status, daily hours arrays, and summary strings (`hours.summary.kitchenSummary`, `hours.summary.barSummary`) which can feed a compact collapsed view.
- Menu page currently drops the card inside the redesigned visit section (`app/menu/page.tsx:296-314`), expecting a light variant; no other props are passed, so a new optional prop won’t break existing usage.

## Constraints
- Menu page is a server component, so any interactive behavior must live inside the client-side card component itself.
- Need to maintain accessibility: toggling must update `aria-expanded`, focusable controls, and visible focus states.
- Collapsed state should still expose key information (today’s status and hours) so users can understand availability without expanding.

## Recommendations
- Extend `RestaurantHoursCard` with optional props (`collapsible`, `defaultExpanded`) to control new behavior without impacting existing call sites.
- Default collapsed view should show:
  - Headline (“Restaurant & Bar Opening Time” is provided externally; card can present subheading or status).
  - Two summary rows (Kitchen, Bar) with open/closed badge and today’s hours.
  - Compact CTA (button) to “Show full hours”.
- Expanded view reuses existing detailed sections (with internal show/hide per day) and offers a “Hide hours” toggle to return to the compact mode.
- Ensure styling adapts to light/dark variants to avoid contrast regressions.
