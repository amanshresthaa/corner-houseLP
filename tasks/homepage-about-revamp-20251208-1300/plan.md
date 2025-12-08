# Implementation Plan: Homepage About Section Revamp

## Objective
- Elevate the homepage “About” slice to better communicate the story, amenities, and trust signals using a modular layout with hero copy, stat tiles, curated highlights, and micro-CTAs—all while keeping data-driven and configurable from `home.json`.

## Success Criteria
- [ ] Section showcases title, tagline, long-form copy plus at least 2 supporting elements (stats, badges, CTA chips) on both mobile + desktop.
- [ ] Layout remains accessible (proper headings, focus states, alt text) and uses DaisyUI-friendly components.
- [ ] Content structure derives from JSON (no hard-coded copy) with optional new fields gracefully handled.
- [ ] Tests + DevTools QA confirm no regressions.

## Architecture & Components
- Extend `sections.about` schema further to include:
  - `stats`: existing metrics (keep).
  - `ctaLinks`: existing micro-CTAs (keep).
  - `milestones`: timeline entries `{ year, title, copy }`.
  - `gallery`: list of `{ src, alt, label }` hero/lifestyle images for cards.
- Update `buildHomeSections` normalization to map the new arrays so `HomepageAboutSection` receives fully typed data.
- Rebuild `HomepageAboutSection` into stacked regions:
  1. Editorial hero (badge, heading, paragraphs, CTA pills).
  2. Horizontal timeline scroller (milestones) using DaisyUI timeline/tabs pattern.
  3. Mosaic gallery (two-up grid/polaroid cards) pulling from `gallery` or fallback image.
  4. Highlight cards (features) and stat chips integrated as overlays.

## UI/UX Strategy
- Mobile-first: hero copy first, then horizontally-scrollable timeline, followed by stacked gallery cards. Stats/CTAs collapse into pill rows.
- Desktop: split hero + stats on left, vertical timeline column in middle, mosaic gallery on right/bottom to create editorial magazine feel.
- Use DaisyUI timeline + card components; keep backgrounds layered with gradient washes + subtle drop shadows.
- Include mild motion (fade/slide) respecting prefers-reduced-motion.

## Data & Content Updates
- Populate new `sections.about.milestones` and `sections.about.gallery` arrays in `home.json` with meaningful data (timeline of refurbishments, Nepalese kitchen, heated cabins, etc.).
- Ensure `stats`/`ctaLinks` still work; restructure descriptions to align with editorial copy.
- Update normalization helper + tests to cover the new arrays.

## Testing
- Unit: extend `tests/data/homepage/sections.test.ts` to cover new fields (stats + ctaLinks) in normalization.
- Run targeted Jest suite + `npm run content:validate` (already part of workflow), plus manual Next dev smoke if needed.
- Manual QA via Chrome DevTools MCP: responsive layouts, focus, console.

## Rollout Considerations
- No feature flag needed; ensure config fallback handles installations without new fields (component should degrade gracefully).
- Document new config fields implicitly via JSON file changes + tests.
