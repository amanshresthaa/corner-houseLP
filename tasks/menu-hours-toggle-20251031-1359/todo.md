# Implementation Checklist

## Component Updates
- [x] Add `collapsible` + `defaultExpanded` props and expansion state to `RestaurantHoursCard`.
- [x] Build compact summary view (kitchen & bar) with status badges for collapsed mode.
- [x] Wire toggle button to switch between compact and full layouts.
- [x] Preserve existing detailed hours view when expanded.

## Integration
- [x] Pass `collapsible` and `defaultExpanded={false}` from `app/menu/page.tsx`.

## Verification
- [x] Run Chrome DevTools QA (mobile, tablet, desktop) and log in `verification.md`.

## Notes / Blockers
- None.
