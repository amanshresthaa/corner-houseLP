# Research: Collapse Hours by Default

## Existing Patterns
- RestaurantHoursCard renders two HoursSection instances (bar, kitchen).
- HoursSection uses internal state `showAllDays` initialized to `true` to expand the weekly list.
- Tests assert expanded-by-default behavior.

## External Resources
- N/A (internal component behavior).

## Technical Constraints
- Update must apply to both light and dark variants.
- Keep styles and semantics unchanged except default state.
- Update unit test to reflect collapsed default.

## Recommendations
- Initialize `showAllDays` to `false`.
- Adjust tests to expect "Show all hours" initially and no day rows visible until expanded.
