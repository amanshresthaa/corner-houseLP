# Research: Color palette migration

## Initial requirements
- Replace current Midnight Majesty palette with new design-first palette (forest, sand, ocean, mint, clay, warm neutrals) across all components and surfaces.
- Map semantic tokens (primary/accent/info/status) to new colors; maintain dark mode support.

## Sources in codebase
- `theme/colors.js` — defines palette scales, semantic tokens, gradients, overlays, generator helper.
- `scripts/generate-color-css.js` — emits CSS vars to `styles/generated/colors.css` using `colorFamilies`.
- `styles/generated/colors.css` — imported by `app/globals.css`.
- `tailwind.config.js` — maps CSS vars to Tailwind color utilities (`brand`, `accent`, `secondary`, etc.).
- Extensive usage of Tailwind color utilities (e.g., `text-brand-700`, `bg-accent-500`) across app pages/components.

## Current palette (old)
- Brand/Primary: Midnight Navy (#1E3A5F anchor)
- Accent/Gold: Golden Hour (#F59E0B anchor)
- Secondary/Error: Rhododendron (#DB2777 anchor)
- Success: Indiagreen (#12B76A anchor)
- Neutral: Twilight/Obsidian scales
- Additional: Cardamom, Marigold, Crimson/Rose, Stout

## Target palette (new)
- Forest (brand/primary): anchor #1B4332
- Sand (accent/CTA + warning): anchor #D4A574
- Ocean (info/links): anchor #2C5F8D
- Mint (success): anchor #52A67D
- Clay (error/destructive): anchor #B85C3E
- Warm Neutral: anchor #6B7280 (adjusted scale)
- Remove/alias: cardamom, marigold, crimson/rose, stout → map/alias to new families; info gains dedicated ocean scale.

## Findings (post-change)
- Updated `theme/colors.js` to define new scales (forest, sand, ocean, mint, clay, warm neutral) and map legacy aliases (`brand`, `accent`, `secondary`, `crimson`, `marigold`, `stout`, `indiagreen`, `cardamom`) to the new values.
- Semantic tokens (light/dark) now point to forest/sand/mint/clay/ocean with warm neutral surfaces; gradients updated to forest+sand/clay mixes.
- Generator list `colorFamilies` expanded to emit new variables; CSS regenerated (`styles/generated/colors.css`).
- Tailwind now exposes new keys (`forest`, `sand`, `ocean`, `mint`, `clay`) while keeping legacy keys mapped to the new palette; fixed background gradient to `--grad-royal-midnight`.
- Design doc refreshed to reflect the new palette.

## Technical constraints
- Maintain module format (CommonJS) for `theme/colors.js` and generator script.
- Regenerate CSS via `npm run colors:generate` after palette change.
- Tailwind utilities rely on `var(--color-*)` values; updating variables updates all usages without renaming classes, but expose new keys for future use.

## Open questions
- None (user confirmed: apply across all components; recolor assets to new forest/sand scheme; keep `html.dark` model; no exclusions).
