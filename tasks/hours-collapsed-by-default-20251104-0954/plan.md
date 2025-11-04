# Implementation Plan: Collapse Hours by Default

## Objective
Default the weekly hours list to collapsed on render.

## Success Criteria
- [ ] Bar and Kitchen sections start collapsed.
- [ ] Button reads "Show all hours" on load.
- [ ] Toggling reveals and hides day rows correctly.
- [ ] Updated tests pass.

## Architecture
- Small state change in HoursSection (local useState default).
- No API or data shape changes.

## Implementation Steps
1. Set `showAllDays` default to `false`.
2. Update unit test expectations.
3. Quick smoke check in pages using the card.

## Edge Cases
- Today highlighting remains correct after expanding.
- Works in both variants (light/dark).

## Testing
- Unit test update for default collapsed.

## Rollout
- No flags; direct change.
