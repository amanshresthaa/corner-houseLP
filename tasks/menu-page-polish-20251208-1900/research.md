# Research: Menu Page Polish

## Existing Patterns
- Homepage system expects every section inside `max-w-6xl px-4 sm:px-6 lg:px-8` with `py-12/16` rhythm and alternating light/dark bands per docs/homepage-design-system.md.
- Current menu stack = hero (`MenuHero`), exploration shell (`MenuExploreSection` w/ `MenuInteractive` + `MenuSearchFilter` + `MenuSections`), visit info, QuickLinks, CTA.
- `MenuExploreSection` already follows gradient + rounded-3xl shells but left/right spacing differs from homepage containers and sticky column lacks consistent gutter.
- `MenuSections` renders each group within `max-w-6xl` but wraps lists in `max-h-[32rem] overflow-y-auto` card which introduces nested scrolling and extra padding vs homepage cards.
- `MenuSearchFilter` uses utilitarian `rounded-lg` shell + neutral palette that doesn’t match DaisyUI card aesthetic described in homepage design system.
- `MenuInteractive` exposes quick search, dietary toggles, nav pills, and `MenuSections` feed; quick navigation currently uses `-mx-2 px-2 overflow-x-auto` causing inconsistent gutters relative to rest of section.

## External Resources
- docs/homepage-design-system.md
- src/lib/menu/page-patterns.ts for hero stats, presets, and CTA feed.

## Technical Constraints
- Must honor DaisyUI button tokens already embedded (rounded-full CTAs, pill nav) and keep `menu:preset` CustomEvent handshake between `MenuExploreSection`, `MenuInteractive`, and `MenuSearchFilter`.
- Maintain server data prep from `buildMenuPageData` + `MenuInteractive` hydration logic, so any UI change must avoid breaking default selection + filter syncing.
- Keep gradient/contrast rhythm: menu hero/explore sections are light, QuickLinks/CTA already themed; need to respect mobile-first layout without introducing new dependencies.


- Align MenuExplore section with homepage blueprint: unify container padding, tighten spacing between cards, and ensure sticky column uses consistent `lg:top-8` plus `space-y-8` rhythm.
- Restyle filter + nav shells to `rounded-[2rem] border border-brand-100 bg-white/95 shadow-xl` to reduce perceived whitespace and match doc; lighten text colors per design tokens.
- Remove nested scrollbar in `MenuSections`, convert to standard list with evenly spaced cards, add subtle gradient band + `rounded-[2.5rem] border` container per doc.
- Refine visit section + QuickLinks spacing by trimming redundant `py-16` vs `py-20`, ensure CTA groups use `gap-4` and `btn` tokens to avoid clashing whitespace.
- Surface dietary/allergen notes as list-style chips with consistent typography; keep line length manageable by capping copy width.
- 
