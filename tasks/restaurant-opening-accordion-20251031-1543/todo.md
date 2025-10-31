# Implementation Checklist (Revised)

## Prep

- [x] Remove accordion-specific props and state from `RestaurantHoursCard`.
- [x] Restore default card layout and colour handling for light/dark variants.

## Integration

- [x] Update `LocationSection` to use the card with default props only.
- [x] Confirm other call sites (menu, contact) continue using the base component.

## Testing

- [x] Refresh Jest coverage to match the default behaviour.

## Questions/Blockers

- None currently.
