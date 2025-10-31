# Implementation Checklist

## Preparation
- [x] Update `MenuInteractive` to accept a `tone` prop and wire through to child components.
- [x] Add dark-tone styling to `MenuInteractive` sticky nav and surrounding wrappers.

## Component Updates
- [x] Enhance `MenuSearchFilter` with tone-aware styling for dark background usage.
- [x] Update `MenuSections` invocation to pass tone; propagate tone to `MenuItemCard`.
- [x] Add tone support to `MenuItemCard` (background, text, accents) while keeping light tone unchanged.

## Page Integration
- [x] Pass `tone="dark"` to `MenuInteractive` within `app/menu/page.tsx`; confirm section ordering/variants.

## Validation
- [x] Run relevant automated tests (`MenuItemCard` Jest suite or equivalent).
- [ ] Perform manual QA via Chrome DevTools MCP (contrast, responsive behavior, focus states).

## Notes / Assumptions
- Menu hero/footer remain untouched; alternating pattern applies to post-hero sections only.
