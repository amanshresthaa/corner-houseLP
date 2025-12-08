# Implementation Checklist

## Setup & Research
- [x] Create timestamped task folder under `tasks/`
- [x] Document research insights from `/press` + homepage design system
- [x] Write implementation plan covering UI rhythm, data flow, and testing

## Build
- [x] Rebuild press hero with breadcrumb, CTA pair, and highlight badges
- [x] Add light credibility stats grid referencing awards/ratings/hygiene
- [x] Refresh media coverage section with dark glass cards + fallback state
- [x] Introduce media resources band with asset list, quote card, and integrated hygiene summary
- [x] Recompose press contact + quick facts section with CTA buttons and response checklist

## Verification
- [x] Lint `app/press/page.tsx` directly (`npx next lint --file app/press/page.tsx`)
- [ ] Run full `npm run lint` (fails due to pre-existing repo-wide lint errors; see task log)
- [ ] Run `npm run test` (fails due to existing MenuSmartLoader and BookingForm test issues; see task log)
- [ ] Manual Chrome DevTools QA (pending; requires MCP tooling)

## Notes
- Project-wide lint/test suites currently fail before reaching new `/press` code; captured logs in task summary for visibility.
