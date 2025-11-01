# Implementation Plan: Restaurant Hours Default Open Tests

## Objective

Ensure the RestaurantHoursCard renders its weekly schedule expanded by default in both home (dark variant) and menu (light variant) contexts, reflected through updated unit tests.

## Success Criteria

- [ ] Unit tests explicitly cover the default expanded state for both card variants.
- [ ] Assertions verify button labels and visible day rows without brittle implementation checks.
- [ ] Jest test suite passes locally.

## Architecture

### Components

- `components/restaurant/RestaurantHoursCard.tsx` (behaviour under test).

### State Management

- No changes; rely on existing `showAllDays` local state.

### Test Updates

- Extend `tests/components/restaurant/RestaurantHoursCard.test.tsx` with discrete scenarios for menu (light) and home (dark) variants, reusing existing mocks.

## Data Flow

- `useOpeningHours` mock provides data to the component in each variant test case.
- Tests assert UI output (button text, rendered day rows) driven by `showAllDays` default state.

## API Contracts

- No API changes required; mocks remain consistent with current shape.

## UI/UX Considerations

- Validate that the "Show less" label appears immediately, signalling an already-expanded list with visible day rows.

## Testing Strategy

- Jest unit tests: update existing suite and run `npm test -- RestaurantHoursCard` (or equivalent) to confirm passing state.

## Edge Cases

- Ensure tests account for both variants without duplicating redundant expectations.
- Confirm that toggling still works after initial state assertions (already covered by existing test flow).

## Rollout Plan

- Update tests only; no deployment considerations.
