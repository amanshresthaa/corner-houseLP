# Implementation Plan: Fit Components to Grid

## Objective

Ensure all booking page cards fill their grid areas and align to equal heights per row across breakpoints.

## Steps

- Remove `items-start` so grid items stretch
- Wrap each card with `div.h-full` as needed
- Add `h-full` to BookByPhoneCard root
- Make card bodies flex columns where helpful
- Pass `className=\"h-full\"` to RestaurantHoursCard

## Success Criteria

- Cards in same row have equal heights
- No overflow or layout shifts across breakpoints
- Light/dark visuals preserved

