# Research: Booking Grid Fit and Equal Heights

## Existing Layout

- Grid container: `grid grid-cols-1 md:grid-cols-12` with gaps; previously had `items-start` which prevents stretch.
- Components:
  - RestaurantHoursCard: custom container, supports `className` prop.
  - BookByPhoneCard: DaisyUI card without `h-full` originally.
  - FindUsCard, LargeGroupsCard: DaisyUI cards with `h-full`.

## Issues

- Uneven card heights per row because shorter items didn’t stretch to match tallest item.
- Some cards lacked `h-full` so even with grid stretch they didn’t fill the track.

## Recommendations

- Use grid default `items-stretch` (remove `items-start`).
- Ensure each card can fill the grid track via `h-full`.
- For components without internal `h-full`, add it or wrap with an `h-full` div.
- For Hours card, pass `className="h-full"` to fill height.

