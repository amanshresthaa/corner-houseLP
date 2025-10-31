# Research: Compact Restaurant Hours Card

## Current State
- `components/restaurant/RestaurantHoursCard.tsx` (latest iteration) renders a rich layout:
  - Summary chips, live status banner, tabbed kitchen/bar schedules, weekly list, notes panel, CTA row.
  - Default collapsed view still shows two summary chips and toggle.
  - Expanded view takes substantial vertical space and introduces extra interactions (tabs + notes).
- Page embeds the card with `collapsible` in the visit section (`app/menu/page.tsx:299-304`).

## Requirements From User
- “Rebuild … consuming less space, neat and tidy. Like before, but little changes to the layouts.”
  - Preference for a minimal footprint closer to earlier design (single column, concise info).
  - Keep useful enhancements (maybe status indicator) but limit extra UI (remove tab controls, bulky cards).
  - Still honour light/dark variants and collapsible usage on menu page.

## Data Sources
- `useOpeningHours` provides:
  - `hours.kitchen`, `hours.bar` arrays with `isToday` & `isOpen`.
  - `summary` strings.
  - `currentStatus` (isOpen, currentService, nextChange).
  - Potential future `notes` are static (not in hook yet); external notes handled in parent section.

## Constraints & Considerations
- Component is client-side; must maintain `collapsible`/`defaultExpanded` props for compatibility.
- Should gracefully degrade if data missing (`error` path).
- Keep focus styles and accessible semantics (e.g., `aria-expanded`, headings).
- Avoid hooking order regressions — track state hooks consistently.
- Keep CTAs minimal (maybe inline links instead of big buttons to reduce height).

## Opportunities
- Compact summary:
  - Single header row with status chip + “Kitchen / Bar today”.
  - Toggle to reveal combined weekly table (no tabs; present both services in one view or stacked).
  - Provide quick actions via text links (Call, Book) inside footer row.
- Collapsed mode might show only status + CTA links; expanded reveals table.
- Consider two-column table (Kitchen / Bar) for weekly schedule to stay concise.
