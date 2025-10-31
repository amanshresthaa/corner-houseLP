# Implementation Plan: Restaurant & Bar Opening Time Component

## Objective
Rebuild `RestaurantHoursCard` to present real-time status, kitchen vs bar schedules, and supporting actions in a concise, engaging format that aligns with the updated visit section.

## Success Criteria
- [ ] Live status banner shows current open/closed state, current service, and next change.
- [ ] Tabbed or segmented layout allows switching between Kitchen and Bar hours without scrolling.
- [ ] Today’s schedule shown prominently; users can expand to full week.
- [ ] Notes and call-to-action area included (call/book) within the component.
- [ ] Supports light/dark variants and optional collapsible embedding (retain prop compatibility).

## Architecture
- Rebuild `RestaurantHoursCard` as a stateful client component using:
  - `useOpeningHours` for data.
  - Local state for active tab (`kitchen` / `bar`).
  - Local state for expanded weekly view.
- Keep prop signature `variant`, `collapsible`, `defaultExpanded`, `className` to avoid breaking usage.

## UI/UX Design
- Primary sections:
  1. Status header with icon/chip, time until next change.
  2. Tab switcher (Kitchen | Bar).
  3. Today details (list of time ranges, open/closed note).
  4. Expandable weekly table.
  5. Notes + CTA row (Book table, Call).
- Mobile-first: tabs stack or become segmented control.
- Accessibility:
  - Use `role="tablist"` & `aria-selected`.
  - Buttons with focus rings.
  - `aria-live` for status maybe? Optional.

## Implementation Steps
1. Update `todo.md` checklist.
2. Redesign component structure:
   - Extract summary/state (status, next change) from `useOpeningHours`.
   - Create tab switch UI.
   - Render today schedule from active tab data.
   - Expandable weekly grid.
3. Integrate CTA footer (call/book) with variant-aware styling.
4. Ensure compatibility with `collapsible` prop (wrap new layout accordingly).
5. Update `app/menu/page.tsx` if necessary (maybe remove external CTA duplication).
6. Manual QA via DevTools; document results.
