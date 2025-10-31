# Implementation Checklist

## Prep
- [x] Confirm no other in-flight menu spacing work to avoid conflicts.
- [x] Snapshot current menu visuals (mental notes) for before/after comparison.

## Code Updates
- [x] Refactor `app/menu/page.tsx` to define four post-hero sections with alternating dark/light backgrounds and internal `py-*` spacing.
- [x] Feed FAQ/button/hour data into new section components; wire dynamic `RestaurantHoursCard` with dark variant.
- [x] Remove `space-y-12` (and similar) from `components/menu/MenuSections.tsx`, shifting spacing into section-level `py-*` and ensuring typography adapts for dark wrappers if applied.
- [x] Audit for lingering `mb-*`/`space-y-*` between sections inside menu scope and replace with padding or gaps as needed.

## Styling & Accessibility
- [x] Apply light-text classes inside dark sections; double-check link/button contrast, focus rings, and badge readability.
- [ ] Validate sticky nav + scroll targets after spacing adjustments.

## Testing & QA
- [x] Run relevant automated checks (lint/tests) if feasible. *(Lint run blocked by pre-existing repo errors; see notes.)*
- [ ] Perform Chrome DevTools manual QA (mobile/tablet/desktop) documenting results in `verification.md`.

## Documentation
- [ ] Update `verification.md` with findings, including any outstanding issues.
