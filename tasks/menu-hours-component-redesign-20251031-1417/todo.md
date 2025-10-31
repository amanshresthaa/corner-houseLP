# Implementation Checklist

## Component Rebuild
- [x] Refactor `RestaurantHoursCard` layout (status header, tabs, today view, weekly table).
- [x] Leverage `useOpeningHours` to compute status + next change text.
- [x] Implement tab switch between Kitchen and Bar schedules.
- [x] Build weekly view table with today highlighted.
- [x] Add CTA footer (Book table, Call) respecting variant styles.
- [x] Retain `collapsible` support (summary when collapsed).

## Integration
- [x] Ensure menu page usage works with new props / adjust CTA duplication if needed.

## Verification
- [x] Run Chrome DevTools QA (mobile, tablet, desktop) and log in `verification.md`.
