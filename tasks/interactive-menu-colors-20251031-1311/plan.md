# Implementation Plan: Interactive Menu Colors

## Objective
Apply the light-tone styling to the interactive menu section on the dedicated menu page so it matches the homepage palette (light background, dark text) while preserving existing functionality.

## Success Criteria
- [ ] Interactive menu wrapper uses light backgrounds with dark text, matching homepage aesthetics.
- [ ] Search/filter sticky bar, section pills, and item cards render with light-tone styles.
- [ ] No regressions in menu navigation, filtering, or default selection behaviors.

## Architecture
- Update the `MenuInteractive` invocation within `app/menu/page.tsx` to use the component's default light tone rather than the forced `'dark'` tone.
- Rely on existing light-tone class logic already baked into `MenuInteractive`, `MenuSections`, and `MenuItemCard`.

### Components
- `app/menu/page.tsx`: adjust props passed to `MenuInteractive`.
- Downstream components inherit the tone automatically; no direct edits required if prop is removed/switch to light.

### Data Flow
- No changes to data flow: menu data still loads via `getMenuSmart` and is passed unchanged to `MenuInteractive`.

### UI/UX Considerations
- Ensure contrast remains AA compliant for text/buttons in the light variant.
- Maintain consistent spacing, borders, and shadows; verify sticky nav remains legible against the light backdrop.

### Testing Strategy
- Visual/manual check of the menu page in the browser (Chrome DevTools) to confirm palette change and inspect accessibility contrast.
- Optional smoke run of existing tests is not required since change is purely stylistic, but ensure no TypeScript errors.

### Edge Cases
- Confirm filtered state and sticky search panel still present clear separation borders in the light variant.
- Verify disabled section buttons remain visibly disabled on light background.

### Rollout Plan
- Standard deployment; no feature flags or incremental rollout needed.
