# Implementation Plan: Collapsible Hours Card

## Objective
Allow the Restaurant & Bar Opening Time card on the menu page to render in a compact state by default, expanding only when visitors choose to view detailed hours.

## Success Criteria
- [ ] `RestaurantHoursCard` accepts new props (`collapsible`, `defaultExpanded`) without breaking existing consumers.
- [ ] When collapsed, the card height shrinks and shows concise Kitchen/Bar summaries with open status and today’s hours.
- [ ] Toggling between collapsed and expanded states preserves accessibility (keyboard, focus, `aria-expanded`).
- [ ] Expanded view retains the existing detailed `HoursSection` layout.
- [ ] Menu page passes `collapsible` and sets `defaultExpanded={false}` to honour the new behavior.

## Architecture
- Modify `components/restaurant/RestaurantHoursCard.tsx` (client component) to manage an additional `isExpanded` piece of state.
- Use data from `useOpeningHours` to populate the collapsed summaries.
- Update `app/menu/page.tsx` to pass the new props.

## UI/UX Considerations
- Summary rows should adapt to light/dark variants (borders, text, status badges).
- Toggle button copy should switch between “Show full hours” and “Hide hours”.
- Ensure transitions remain snappy; no need for heavy animation (use Tailwind spacing).

## Testing Strategy
- Manual QA via Chrome DevTools to confirm:
  - Collapsed state renders on load.
  - Toggle works across mobile, tablet, desktop.
  - Console remains free of new errors.

## Edge Cases
- If hours data is unavailable, fall back to existing skeleton/error states.
- User toggles multiple times; state should remain consistent.

## Implementation Steps
1. Add new props and expansion state logic inside `RestaurantHoursCard`.
2. Render collapsed summary UI when `collapsible` is true and `isExpanded` is false.
3. Add toggle button to switch states; ensure button classes/focus styles respect variant.
4. Keep detailed `HoursSection` rendering inside the expanded branch.
5. Update menu page to pass `collapsible defaultExpanded={false}`.
6. Run manual QA and document findings in verification file.
