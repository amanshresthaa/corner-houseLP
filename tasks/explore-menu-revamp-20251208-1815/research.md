# Research: Explore Menu Revamp

## Existing Patterns & Components
- `app/menu/page.tsx` currently renders the "Explore the menu" section as a dark gradient hero that pairs stats/dietary info with a single `MenuInteractive` card; layout is a two-column grid with white card + glassmorphic stat tiles.
- `MenuInteractive` (`app/menu/_components/MenuInteractive.tsx`) already provides sticky category nav, toggleable `MenuSearchFilter`, and summary bar; props allow `tone="dark"`, `preloadedData`, and respond to filters via `MenuSearchFilter` callbacks.
- Data helpers in `src/lib/menu/page-patterns.ts` expose `buildMenuPageData` (stats, highlights, quick links, dietary notes) and are already consumed higher up for hero + CTA chips; we can extend or re-use these structures for new UI modules.
- Current dietary card duplicates info in `MenuSearchFilter`, while stat grid mirrors homepage hero; opportunity to replace with richer onboarding/walkthrough cues, e.g., multi-step explore cards, preview thumbnails, or quick filters.
- Reusable homepage sections (QuickLinksSection, CallToActionSection, etc.) provide gradient rhythms, DaisyUI buttons, and uppercase eyebrow chips defined in `docs/homepage-design-system.md`.

## User Goals & Pain Points
- User explicitly wants smoother, more engaging access to the interactive menu—"revamp it all the way from scratch" implies redesigning the dedicated explore section rather than incremental tweaks.
- The current section exposes dense text + stats before the interactive component, so emotional/visual cues are limited; we likely need progressive discovery (featured dishes preview, guided filters, or tabbed flows) plus more inviting entry points for mobile visitors.
- Need to prioritize immediate interaction (jump to sections, curated presets) over static stats; menu filtering/search should feel contextual and accessible without scrolling past large cards.

## Technical Constraints & Opportunities
- Keep layout within `max-w-6xl px-4 sm:px-6 lg:px-8` containers and maintain alternating light/dark sections per design system doc.
- `MenuInteractive` expects full menu `sections` array plus `defaultSelected`; we can wrap it with additional UI (eg. overview carousel, filter presets) but should avoid mutating the component internals unless necessary.
- Stats + highlights are already computed on the server, so we can feed them into new UI (e.g., highlight chips, featured dish list) without additional fetches.
- Tests live in `tests/data/menu` and `tests/components/menu`; new section markup should get coverage (RTL snapshot/behavior) to satisfy project standards.

## Assumptions & Open Questions
- No new backend data requested; assume existing menu JSON is sufficient to surface featured dishes or price groupings.
- Explore section will stay within `/menu` page rather than split into separate routes.
- Manual QA via Chrome DevTools MCP will be required after implementation per AGENTS.md.
