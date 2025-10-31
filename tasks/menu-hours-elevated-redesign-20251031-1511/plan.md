# Implementation Plan: Elevated Hours Card UX

## Objective
Deliver a polished, compact Restaurant Hours card balancing rich information with tidy layout while honoring UX best practices and stakeholder expectations.

## Success Criteria
- [ ] Collapsed view includes: hero status row, two service tiles (Kitchen/Bar), and action group with clear hierarchy.
- [ ] Optional expansion reveals a horizontal “weekly chips” overview rather than a tall table.
- [ ] Component works for light/dark variants and respects `collapsible`/`defaultExpanded`.
- [ ] Keyboard and screen-reader friendly (aria attributes, focus order).
- [ ] No React hook order warnings or layout regressions.

## Architecture
- Refactor `RestaurantHoursCard.tsx`:
  - Compose small helper components for ServiceTile and WeeklyChip to keep JSX readable.
  - Use `useMemo` only where necessary to avoid hook order issues.
- Keep integration in `app/menu/page.tsx` unchanged except for styling adjustments if needed.

## UI Outline
1. **Hero Row**
   - Emoji/icon + “Open now”/“Closed” chip.
   - Secondary text: current service vs next change.
2. **Service Tiles (Kitchen / Bar)**
   - Icon, label, today’s hours, open/closed badge.
   - Optional subtext for next change.
3. **Action Group**
   - Primary button `Book a table`.
   - Secondary quiet link `Call …`.
4. **Weekly Overview (Expanded)**
   - Row of day chips (Mon–Sun), each showing `K: hours / B: hours`.
   - Today highlighted; chips are wrap/scroll-friendly.
   - Provide accessible labels (aria-label per chip).

## Implementation Steps
1. Update `todo.md`.
2. Refactor component:
   - Establish hero status row logic.
   - Build service tiles with icons & badges.
   - Create weekly chip data structure and render with `aria-pressed` or `aria-current`.
3. Implement collapsible weekly row (hidden by default when `collapsible` true and card collapsed).
4. Style action group using Tailwind classes and ensure focus rings.
5. Run DevTools QA (mobile/tablet/desktop), noting console state in verification.
