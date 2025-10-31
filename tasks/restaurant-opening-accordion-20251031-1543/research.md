# Research: Restaurant & Bar Opening Time Accordion

## Initial Requirements (Phase 0)

- Introduce an accordion interaction for the weekly opening and closing times shown within the Restaurant &amp; Bar Opening Time section on the home page.
- Ensure the home page hours card (rendered via `RestaurantHoursCard` inside `LocationSection`) uses the new accordion behaviour while retaining existing status indicators and actions.

## Success Criteria (Phase 0)

- Home page visitors can expand/collapse day-by-day opening hours via an accessible accordion control.
- Kitchen and bar hours remain accurate, legible, and consistent with data returned by `useOpeningHours`.
- No regressions for other consumers of `RestaurantHoursCard` (menu page, contact page, etc.).

## Existing Patterns (Phase 1)

- `components/restaurant/RestaurantHoursCard.tsx` already centralises the opening-hours UI, exposes optional `collapsible` and `defaultExpanded` props, and renders weekly hours as a flex grid (`weeklyRows`).
- `components/menu/MenuInfoCollapse.tsx` implements a home-grown accordion using button toggles and animated height.
- `components/restaurant/Accordion.tsx` wraps framer-motion powered accordion behaviour with similar semantics; not currently reused elsewhere.
- DaisyUI’s `collapse` utility is available (Tailwind configured with the DaisyUI plugin) but not yet applied to hours UI – opportunity to align styling with design system.

## Technical Constraints

- `RestaurantHoursCard` is consumed on the home page (`LocationSection`), contact page (`app/contact/page.tsx`), and menu page (`app/menu/page.tsx`). Any structural changes must remain backwards compatible or be opt-in via props.
- The card uses `useOpeningHours` to derive `weeklyRows` with both kitchen and bar data; both need to be represented inside the accordion.
- Existing motion/animation dependencies include `framer-motion` for some accordion implementations (`components/restaurant/Accordion.tsx`); ensuring consistency with current bundle size/performance expectations is important.
- The card is rendered within a dark-themed container on the home page (`variant="dark"`) – accordion styling must respect dark mode contrast requirements.

## External Resources & References

- [DaisyUI Collapse Docs](https://daisyui.com/components/collapse/) – canonical structure and class names for accessible accordion/collapse patterns.
- Internal `MenuInfoCollapse` tests (`tests/components/MenuInfoCollapse.test.tsx`) validate height-based toggle logic; useful reference for testing patterns if we introduce new interactions.

## Open Questions

- Should kitchen and bar hours appear within a single accordion item per day, or split into nested sections (one per service)? → Leaning single item per day with both service lines to avoid deep nesting.
- Should the accordion default to collapsing all days or keep today expanded? → Proposal: auto-expand today for quick glance, collapse others.

## Recommendations (superseded)

- Original concept: introduce an `weeklyView="accordion"` prop on `RestaurantHoursCard` so the home page could display a DaisyUI-styled accordion without affecting other screens.
- Revised direction (2025-10-31 16:32): stakeholder opted to keep the default card everywhere and rely solely on the existing dark/light variant styling. Accordion exploration is on hold.
