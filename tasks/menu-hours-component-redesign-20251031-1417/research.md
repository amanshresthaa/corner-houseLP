# Research: Restaurant & Bar Opening Time Component

## Current Implementation
- `components/restaurant/RestaurantHoursCard.tsx` renders:
  - Summary chips (newly added).
  - Optional collapsible behavior with `Show full hours` toggle.
  - Two detailed `HoursSection` accordions (Bar/Kitchen) with per-day lists.
- Styling relies on Tailwind utilities with variant toggles (`light` / `dark`).
- Data fetched via `useOpeningHours`, providing:
  - `hours.kitchen` / `hours.bar` arrays (with `isToday`, `isOpen`).
  - `summary` strings.
  - `currentStatus` (open/closed, service, next change) not currently used.

## Pain Points / Requests
- User wants a full redesign “from scratch” with “great logic”:
  - Likely implies more informative layout, better hierarchy, advanced status cues.
  - Reduce reliance on stacked cards? Maybe timeline-style view or combined schedule.
  - Possibly integrate `currentStatus` and `nextChange` for real-time context.
  - Provide clearer CTA (call, book) within component.

## Inspiration / References
- Consider timeline or segmented view:
  - Left column: Live status (open/closed, next change countdown).
  - Right column: Tabbed toggle (Kitchen vs Bar).
  - Use DaisyUI tabs or custom segmented control.
- Provide quick filters: Today, Full week, Notes.
  - Could use collapsible for notes and call-to-action section.

## Technical Constraints
- Component is client-side; we can add hooks/state.
- Must preserve compatibility with existing imports (still exported default).
- Should accept `variant` (light/dark) for styling parity.
- Avoid hydration mismatch: keep data derived from hook inside `useEffect` if necessary.
- Keep accessibility: headings, buttons, focus states, semantics.

## Opportunities
- Use `currentStatus` to show “Open now · Kitchen closes at 22:00”.
- Provide tabbed interface to switch between Kitchen/Bar schedules.
- Summaries for the next 3 days vs full week using accordion.
- Integrate CTAs: `Book a table`, `Call` within card footer.
- Provide `collapsible` behavior optional but default open? Evaluate with user scope.
