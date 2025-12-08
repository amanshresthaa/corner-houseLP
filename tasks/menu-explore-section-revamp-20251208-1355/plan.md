# Implementation Plan: Menu Explore Section Revamp

## Objective
Elevate the "Explore the menu" block on `/menu` with a clearer card-based layout, richer preset controls, and better onboarding while preserving the existing filtering event flow.

## Success Criteria
- [ ] Section retains full keyboard accessibility (tab order, `aria` labels, focus-visible states).
- [ ] Quick preset buttons continue dispatching `menu:preset` events and expose descriptive badges.
- [ ] Layout is mobile-first with a clean single-column stack and upgrades to a two-column grid ≥1024px.
- [ ] Tests cover rendering of highlight cards, dietary info, and preset dispatch behavior.

## Architecture
### Components
- **MenuExploreSection**: reorganize into sub-blocks (IntroCard, HighlightsGrid, PresetPanel, CTAGroup, GuidancePanel, InteractiveShell) within the same file to avoid fragmenting the Next.js component tree.
- **MenuInteractive**: reused as-is inside a refreshed container; optionally add wrapper elements for sticky behavior but without modifying its internals.

### Layout Structure
- Mobile: stacked cards with consistent `rounded-3xl` surfaces, `gap-6`, and `px-4` padding.
- Desktop: `lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]` to give the interactive column more width; left column becomes sticky on large screens for easier scanning.

## Data Flow
- Props `statHighlights`, `dietaryHighlights`, and `presets` flow from `buildMenuPageData`. We'll map `statHighlights` into feature cards, show up to 3 `dietaryHighlights`, and derive `lightweightPresets` (first 4) enriched with optional `badge`/description copy from `MenuExplorePreset`.
- Event dispatching remains via `window.dispatchEvent(new CustomEvent('menu:preset', { detail }))`; the PresetPanel will call `dispatchPreset` on actions.
- CTA buttons continue to use `telHref`, `menuInformationHref`, and `contactDisplayPhone` props.

## UI / UX Considerations
- Introduce a split highlight grid: first row for stats (icon + label), second row for dietary notes rendered as scrollable pills to avoid tall cards.
- Add descriptive text under preset buttons and show a `badge` as a tiny uppercase label when available.
- Provide live `aria-live="polite"` status summarizing how many quick filters are active.
- Make "How it works" guidance collapsible on mobile (details/summary) but always expanded on desktop.
- Keep CTA buttons consistent DaisyUI `btn` styles with `touch-action: manipulation` to meet mobile tap targets.

## Testing Strategy
- Update `tests/components/menu/MenuExploreSection.test.tsx` to:
  - Assert new text nodes (e.g., "Quick filters" copy, preset descriptions, dietary highlight list).
  - Confirm `data-testid="menu-explore-section"` still wraps the component.
  - Keep preset dispatch check intact (spy on `window.dispatchEvent`).
- Extend `tests/data/menu/page-patterns.test.ts` if needed to cover `badge` usage (only if new derived behavior introduced—otherwise existing tests suffice).

## Edge Cases
- **No stats/dietary data**: component should skip highlight/dietary blocks gracefully.
- **No presets**: hide preset card entirely, ensure CTA group still renders.
- **Missing `telHref`**: hide call button but keep `menuInformationHref` link.
- **Server/client mismatch**: guard `window` usage inside `useCallback` with SSR checks (already implemented, ensure new code follows same pattern).

## Implementation Steps
1. Refactor `MenuExploreSection.tsx` layout: reorganize markup into semantic sections, add new utility components, and restructure CSS classes for cards/sticky behavior.
2. Enhance preset rendering: include badges/descriptions, update quick filter header, wire up `aria-live` status, keep `dispatchPreset` logic.
3. Rework highlights/dietary block into a responsive grid and ensure `statHighlights` and `dietaryHighlights` limit logic is handled.
4. Update CTA arrangement with consistent button styles and fallbacks for missing links.
5. Adjust tests in `tests/components/menu/MenuExploreSection.test.tsx` to match new DOM shape and keep interaction checks.
6. (If data builders change) update `tests/data/menu/page-patterns.test.ts`; otherwise verify existing fixtures cover usage.
7. Document todos + verification steps (`todo.md`, `verification.md`) and run relevant test suites.

## Rollout Plan
- Feature ships behind no flag; once verified via unit tests + Chrome DevTools manual QA, merge to `main`.
- Monitor for layout regressions in responsive viewports; future iterative tweaks can build on the structured cards.
