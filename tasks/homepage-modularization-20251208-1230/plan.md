# Implementation Plan: Homepage Modularization

## Objective
- Break the homepage into clearly defined, composable sections so each slice has a single responsibility, is easier to extend, and keeps data normalization separate from rendering.

## Success Criteria
- [ ] `ClientHomeContent` no longer performs inline normalization/filtering for every section.
- [ ] New registry/utilities make it trivial to add/remove sections by editing configuration rather than core layout code.
- [ ] Existing homepage UI/UX remains visually identical (including DaisyUI usage and responsive behaviour).
- [ ] Automated tests cover section-normalization rules so regressions are caught without relying on manual QA.

## Architecture
- Create `src/lib/homepage/sections.ts` that exports:
  - Strongly typed `HomeSectionKey` union + props interfaces per section.
  - `HomeSectionDefinition` registry describing how to detect data + which React component renders it.
  - `buildHomeSections(content)` helper that applies normalization, filters invalid data, and returns a serializable payload for the client.
- Implement a `HomeSectionsRenderer` (client component) that receives the normalized sections array and iterates in a defined order, injecting layout wrappers when needed (Showcase, QuickLinks, CTA, etc.).
- Update `ClientHomeContent` to consume the renderer, focusing only on layout scaffolding + cross-cutting sections (navbar/footer, static banners).
- Update `app/page.tsx` to delegate all section prep to `buildHomeSections` and pass down only the normalized data.

## Components
- `src/lib/homepage/sections.ts`: registry, helper types, normalization functions, exportable test utilities.
- `components/homepage/HomeSectionsRenderer.tsx`: receives normalized sections map/array + shared props (aria labels, links) and renders the correct section component.
- Touch existing section components only if minor prop tweaks are needed to align with typed interfaces (keep UI intact).

## Data Flow
1. Server `app/page.tsx` fetches content JSON → passes to `buildHomeSections`.
2. Helper returns { showcase, sections, quickLinks, closingCta } (or similar) object comprised only of display-ready data.
3. `ClientHomeContent` receives normalized object → passes `sections` to renderer, plus slideshow + shared links.
4. Renderer iterates registry order and mounts each section component with its props.

## API Contracts
- New helper accepts `content.pages.home.sections` + `content.global` fragments and outputs typed data consumed by React components.
- Section definitions expose `isEnabled(data)`, `normalize(data)`, `component`, and optional `beforeRender/afterRender` hooks for wrappers (Open/Closed for extension).

## UI/UX Considerations
- Maintain current section order: Showcase → Press ticker → About → Signature dishes → Reviews → Quick links → Static banners → CTA.
- Ensure sections still announce accessible headings/aria labels and continue to respect prefers-reduced-motion classes.
- Avoid visual regressions by treating normalization as data-level change only.

## Testing Strategy
- Add unit tests under `tests/homepage/sections.test.ts` covering `buildHomeSections`: valid data, missing sections, filtering invalid entries (e.g., quick links missing href), handling unused config keys.
- Run existing Jest + any targeted component tests; rely on manual DevTools QA for interactive behaviour.

## Edge Cases
- Missing or malformed section arrays should not crash the homepage; registry should skip disabled sections gracefully.
- Buttons lacking `text` or `href` should be filtered (current behaviour) and ensure CTA hides entirely when no valid buttons remain.
- Support brand-tokenized strings without double replacement; helper should treat input as plain strings (assuming brand tokens already resolved upstream) or ensure no mutation occurs.

## Rollout Plan
- Refactor incrementally within a feature branch: introduce helper + tests, update server/client components, then run Jest + manual QA before merging. No feature flag required since behaviour is a 1:1 refactor.
