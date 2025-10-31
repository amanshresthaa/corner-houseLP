# Implementation Plan: Compact Restaurant Hours Card

## Objective
Create a streamlined version of `RestaurantHoursCard` that surfaces the most important information (current status, today’s hours, quick actions) in a minimal footprint, with an optional expansion for weekly details.

## Success Criteria
- [ ] Default (collapsed) view fits within a small card: status badge + today’s kitchen/bar hours + action links.
- [ ] Expanded view reveals a concise weekly schedule (no tabs) for both kitchen and bar.
- [ ] Component retains compatibility with `variant`, `collapsible`, and `defaultExpanded` props.
- [ ] Light/dark styling remains legible with clear focus states.
- [ ] No hook-order warnings or server/client errors.

## Architecture
- Refactor `RestaurantHoursCard.tsx`:
  - Replace tabbed layout with a compact two-column weekly table.
  - Summaries merged into a single row showing today’s hours for kitchen/bar.
  - Inline action links (book, call) to reduce button footprint.
- Retain data fetching via `useOpeningHours`.

## UI/UX Outline
1. **Header row**: “Restaurant & Bar Opening Time” with live status chip.
2. **Today summary**: Small grid listing `Kitchen` and `Bar` with today’s hours + open indicator.
3. **Actions**: Inline links (Book table, Call us) separated by subtle divider.
4. **Toggle** (if collapsible): “Show weekly hours” / “Hide weekly hours”.
5. **Weekly table** (expanded): Table with days as rows, two columns (Kitchen, Bar). Today highlighted.

## Implementation Steps
1. Update `todo.md` checklist.
2. Refactor component structure/state to the compact layout.
3. Ensure weekly table renders both schedules side-by-side with today highlight.
4. Adjust CTA presentation to compact inline links.
5. Verify `collapsible` behaviour and variant styling.
6. Re-run DevTools QA (mobile/tablet/desktop) and document findings in `verification.md`.