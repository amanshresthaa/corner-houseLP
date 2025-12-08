# Implementation Checklist

## Prep
- [x] Review current /book-a-table JSX and note sections to remove.
- [x] Identify reuse of BookingForm/RestaurantHoursCard/InteractiveMap.

## Build
- [x] Replace multi-section layout with streamlined hero + two-column main grid.
- [x] Integrate booking CTA card (no form) with call/email panel.
- [x] Build essentials column (hours card, location/map CTA, quick contact chips).
- [x] Ensure booking button helper handles external/internal link paths and aria labels.
- [x] Clean up unused arrays/components from previous layout.

## Polish
- [x] Verify mobile-first spacing, focus-visible rings, and touch targets.
- [x] Keep reduce-motion support and semantic heading order.

## Testing
- [x] Run lint or relevant checks if feasible. (fails on pre-existing warnings/errors in unrelated files)
- [x] Manual QA with Chrome DevTools MCP: responsive, console, accessibility quick pass.
