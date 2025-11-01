# Research: Restaurant Hours Default Open

## Initial Requirements

- Fix the default collapsed state for restaurant hours so all hours are shown as open by default on both the home page and menu page.
- Update associated unit tests to reflect the correct default state.

## Success Criteria

- Tests for the home page and menu page verify the hours are open by default and pass.
- No regressions introduced in related components.

## Existing Patterns

- `components/restaurant/RestaurantHoursCard.tsx` renders two `HoursSection` blocks (Bar/Kitchen), each managing a `showAllDays` state that defaults to `true`, so the weekly list is expanded on first render.
- The component is reused in multiple contexts: the home page via `components/restaurant/LocationSection.tsx` passes `variant="dark"`, while the menu page (`app/menu/page.tsx`) renders the default light variant.
- The current unit test in `tests/components/restaurant/RestaurantHoursCard.test.tsx` mocks `useOpeningHours` and asserts that the weekly list starts expanded by checking for the "Show less" button text.

## External Resources

- None required; behaviour is fully defined within the repository.

## Technical Constraints

- Tests must continue to stub `useOpeningHours` to avoid network/data dependencies.
- Both variants rely on the same `HoursSection` implementation, enabling shared mock data for the new assertions.

## Findings

- Only a generic rendering test exists today; it does not distinguish between the home (dark) and menu (light) variants regarding their default expanded state.
- The toggle button text (`"Show less"` vs `"Show all hours"`) provides a reliable signal for the expanded state.

## Recommendations

- Add variant-specific test coverage to ensure both home and menu contexts assert the list is expanded by default.
- Reuse the shared mock opening-hours data while rendering the card with different `variant` props in separate test cases for clarity.

## Open Questions

- None currently
