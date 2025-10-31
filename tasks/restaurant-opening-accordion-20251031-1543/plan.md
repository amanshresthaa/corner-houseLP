# Implementation Plan: Restaurant Hours Card (Default Styling Only)

## Objective

Revert the Restaurant & Bar Opening Time experience to the core card implementation and restrict the home page usage to the default layout, relying solely on the existing light/dark styling logic.

## Success Criteria

- [ ] `RestaurantHoursCard` exposes only the standard props (`variant`, `className`) and presents its original layout (Bar/Kitchen sections with optional "Show all hours" toggles).
- [ ] Home page, menu page, and contact page all use the same default component without accordion-specific props.
- [ ] Dark background contexts continue to display light text, while light backgrounds retain the darker palette.
- [ ] Updated Jest coverage reflects the default behaviour.

## Architecture

- `components/restaurant/RestaurantHoursCard.tsx`
  - Ensure interface only covers variant + className.
  - Maintain the existing light/dark styling branches.
  - Remove accordion-specific rendering logic.
- `components/restaurant/LocationSection.tsx`
  - Render the card with `variant="dark"` only; no extra props.
- `tests/components/RestaurantHoursCard.test.tsx`
  - Update tests to validate the default view (Bar/Kitchen sections + "Show all hours" toggle).

## Testing Strategy

- Jest: simulate expanding/collapsing "Show all hours" to ensure content visibility.
- Manual QA (later in verification phase): confirm colour contrast on dark background wrapper.

## Edge Cases

- Loading + error states remain unchanged from the shared component.

## Rollout

- No feature flags required; shared component already in use across the site.
