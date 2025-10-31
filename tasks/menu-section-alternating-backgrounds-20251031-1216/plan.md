# Implementation Plan: Menu Section Alternating Backgrounds

## Objective
- Ensure the menu page alternates section backgrounds dark → light → dark → light immediately after the hero, while keeping hero/footer/stats untouched.
- Update all dark sections so nested content, typography, and interactive elements adopt light-on-dark styling.

## Success Criteria
- [ ] `MenuInteractive` block (post-hero) renders with dark surface and light typography throughout, including sticky nav, filters, and item cards.
- [ ] Section ordering remains dark → light → dark → light without affecting hero/footer.
- [ ] Components within dark sections use appropriate `variant="dark"` or tone props; icons/borders maintain accessible contrast.
- [ ] Automated tests covering modified components pass (existing `MenuItemCard` tests, etc.).

## Architecture
- Extend existing component tone/variant patterns to avoid duplicating logic.
- Reuse Tailwind tokens (`brand-*`, `neutral-*`) for colors; prefer opacity overlays instead of hard-coded hex values.

### Components
- `app/menu/page.tsx`: pass tone/variant props to dark sections; confirm section order.
- `app/menu/_components/MenuInteractive.tsx`: add `tone` prop; adjust sticky nav, filter container, and variant wiring.
- `components/menu/MenuSearchFilter.tsx`: accept `tone` prop; conditionally render dark-mode classes.
- `components/menu/MenuSections.tsx`: already supports `tone`; ensure new prop is used; propagate to `MenuItemCard`.
- `components/menu/MenuItemCard.tsx`: introduce `tone` prop for dark-mode card styling (background, text, badges/borders).

## Data Flow
- Props cascade: `MenuPage` → `MenuInteractive` (tone) → `MenuSearchFilter` & `MenuSections` → `MenuItemCard`.
- No backend/data changes required.

## UI/UX Considerations
- Maintain touch target sizes and keyboard focus styles; ensure focus rings remain visible on dark surfaces.
- Use translucent overlays (`bg-white/10`, `border-white/20`) for dark-mode surfaces to preserve hierarchy.
- Ensure filter chips, toggles, and cards remain legible with high contrast under dark tone.

## Testing Strategy
- Run existing Jest tests for menu components (`MenuItemCard` tests) to confirm updates.
- Manual QA via Chrome DevTools MCP per project requirement: verify alternating backgrounds, responsive behavior, focus states, and contrast.

## Edge Cases
- Empty/search-no-results state should display with light text on dark background when tone is dark.
- Ensure price range slider tracks/buttons remain visible and accessible in both tones.
- Verify sticky nav readability on scroll (backdrop blur + dark palette).

## Rollout Plan
- No feature flags; deploy as incremental UI enhancement once validated.
- Document changes in task verification report.
