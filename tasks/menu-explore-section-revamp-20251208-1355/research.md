# Research: Menu Explore Section Revamp

## Existing Patterns
- `app/menu/_components/MenuExploreSection.tsx` already defines a two-column hero-style layout with stat cards, quick presets, CTA buttons, and embeds the `MenuInteractive` shell; it relies on DaisyUI button tokens and custom gradients.
- `MenuInteractive` (app/menu/_components/MenuInteractive.tsx) owns the live filtering UI: it listens for `menu:preset` `CustomEvent`s, exposes quick search + dietary toggles, and renders `MenuSections`; any preset UI must keep emitting those events.
- `components/menu/MenuSearchFilter.tsx` handles deep filtering + URL syncing and also reacts to the same `menu:preset` events.
- `src/lib/menu/page-patterns.ts` now provides helper builders (stats, dietary highlights, presets, quick links) used server-side in `app/menu/page.tsx`; front-end sections should consume those typed structures rather than re-deriving metrics.
- Tests live beside new code: `tests/components/menu/MenuExploreSection.test.tsx` and `tests/data/menu/page-patterns.test.ts` validate rendering and preset dispatching.

## External Resources
- None required beyond internal DaisyUI/Tailwind design tokens referenced via utility classes (btn, gradients, brand/accent palettes).

## Technical Constraints
- Must follow the AGENTS workflow (research → plan → todo → verify) and keep work scoped to the Explore section of the menu page.
- UI needs to stay mobile-first with DaisyUI primitives, hit targets ≥44px, and accessible focus management; preserve semantic headings and `aria` labelling already present (`aria-labelledby="menu-explore-heading"`, etc.).
- Filtering architecture hinges on broadcasting `menu:preset` events; quick filters must continue to dispatch `CustomEvent`s so `MenuSearchFilter` stays in sync.
- Data flows through `buildMenuPageData`; rely on `statHighlights`, `dietaryHighlights`, and `presets` props rather than hitting data loaders directly inside the component.
- Tests currently mock `MenuInteractive`, so new layout changes should keep deterministic text + test ids for assertion updates.

## Observations & Opportunities
- Left column mixes hero copy, stats, presets, and CTAs in a single vertical stack; we can better organize content into clear cards (hero intro, highlights grid, quick filter chips, contact CTAs).
- Dietary highlights currently live in stats grid; separating them into a scrollable pill list or accordion could improve readability on mobile.
- Presets slice to 3 items; we can surface optional info (badge text, description) to make quick filters more descriptive.
- Right column contains onboarding (`How it works`) plus `MenuInteractive`; there is room to add a sticky wrapper, device chrome, or top summary to explain filter state.
- The gradient background spans the entire section; we may introduce layered shapes or borders to visually separate interactive area from informational area.

## Recommended Approach
1. Redesign the left column into three DaisyUI cards: intro (eyebrow + title + copy), highlight grid (stats + dietary notes grouped), and preset stack (buttons with badges/descriptions + clear action). Keep CTAs grouped at the bottom with consistent pill buttons.
2. Enrich preset buttons to show descriptions/badges, optional count chips, and maintain `aria-pressed` semantics; clicking should still dispatch `menu:preset` and set active state.
3. Move "How it works" into a sticky helper panel atop the `MenuInteractive` card, possibly with numbered steps and icon bullets; ensure `MenuInteractive` remains full-width on mobile.
4. Add optional status text (e.g., `statHighlights`) above the interactive card for extra context; consider using `MenuHeroHighlight` data to render minimal tiles.
5. Ensure layout collapses to single column on small screens with proper spacing and retains existing `data-testid`s or updates tests accordingly.
6. Update unit tests to cover new rendering expectations (preset descriptions, dietary highlight block, CTA labels) and maintain preset dispatch coverage.

## Open Questions
- None at this time; assuming scope excludes other menu page sections per user request. If future copy/asset updates are needed they should come from content configs rather than hardcoded strings.
