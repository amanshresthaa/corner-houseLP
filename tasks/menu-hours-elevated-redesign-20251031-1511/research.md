# Research: Elevated Hours Card UX/UI

## Current Baseline
- The latest compact card (tasks/menu-hours-compact-redesign-20251031-1439) displays:
  - Status badge + detail sentence.
  - Small “Kitchen today / Bar today” grid with open badge.
  - Inline CTAs (`Book online`, `Call`).
  - Collapsible weekly table.
- Stakeholder feedback: redesign rejected—needs stronger UX/UI principles while staying efficient in space.

## Prior Versions
- Earlier rich layout (tasks/menu-hours-component-redesign-20251031-1417) introduced tabs, notes, CTAs, but felt heavy.
- Need a middle ground: polished, informative, still minimal.

## Reference Patterns
- Hospitality dashboards typically use two-column blocks with iconography and clear labels.
- Adaptive cards often feature:
  - Hero status row with icon + key times.
  - Stacked cards for services (Kitchen/Bar) including upcoming change.
  - Compact weekly “pill” timeline or mini calendar.

## UX Objectives
- Convey: current state, today’s hours, next change, weekly overview.
- Provide actionable links clearly separated.
- Maintain glanceable structure; avoid deep nesting or long paragraphs.
- Ensure keyboard & screen-reader friendliness.

## Technical Notes
- Keep `variant`, `collapsible`, `defaultExpanded` props.
- Reuse existing data from `useOpeningHours`.
- Consider using icons (emoji fallback) and borderline tokens for both light/dark.
- Weekly overview could use horizontal chips (Mon–Sun) to save vertical space.

## Proposed Approach
- **Header**: icon + status + next event.
- **Service Blocks**: side-by-side cards with:
  - Icon (chef hat / pint).
  - Today’s hours.
  - Secondary text (open/closed + “next change” fallback).
- **Weekly Overview**: horizontal scrollable chip list (monosized) instead of table to reduce height.
  - Each chip shows “Mon 12-22 / 12-23”; highlight today.
- **Actions**: button group with primary (Book table) + tertiary text link (Call).
- Collapsed state shows header + service blocks + actions; expanding reveals weekly chips.
