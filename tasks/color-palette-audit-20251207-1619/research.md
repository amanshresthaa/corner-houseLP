# Research: Color palette audit

## Task Setup
- **Initial requirements**: Determine the color palette currently used in the codebase and where each color is defined/applied.
- **Success criteria**: Provide a concise list of the primary/secondary/neutral colors with hex values (or CSS variables) and cite source files/locations.

## Existing Patterns
- Single source of truth in `theme/colors.js` defining palette scales, semantic tokens, overlays, gradients, and accessibility colors.
- Generated CSS variables in `styles/generated/colors.css` (imported by `app/globals.css`) expose all `--color-*` tokens and semantic aliases for light/dark modes.
- Tailwind maps the CSS variables to utility colors in `tailwind.config.js` (e.g., `brand`, `accent`, `secondary`, `neutral`, `success`, `warning`, `error`) so utilities use the same tokens.
- Build scripts `scripts/generate-color-css.js` with npm scripts (`colors:generate`, `colors:check`) keep generated CSS in sync.

## External Resources
- Not needed yet.

## Technical Constraints
- Palette changes should be made in `theme/colors.js` and regenerated with `npm run colors:generate` to keep Tailwind + CSS variables aligned.
- Prefer semantic tokens (`--color-primary`, `text-brand-600`, etc.) instead of hardcoded hex values to maintain consistency and support theming.
- Light/dark semantic tokens are auto-swapped via `html.dark` selectors; avoid overriding them with fixed colors unless necessary.

## Findings
- Core palette families (50–950 scales) from `theme/colors.js` and `styles/generated/colors.css`:
  - **Primary/Brand (Midnight Navy)**: 500 `#1E3A5F` (range `#F0F4F8` → `#040D18`).
  - **Accent/Gold/Marigold (Golden Hour)**: 500 `#F59E0B` (range `#FFFBEB` → `#4E2208`).
  - **Secondary/Crimson/Rose (Rhododendron)**: 500 `#DB2777` (range `#FDF2F8` → `#4F102F`).
  - **Neutral (Twilight Neutral)**: 500 `#64748B` (range `#F7FAFC` → `#0A1120`).
  - **Stout (Obsidian Slate neutrals)**: 500 `#616E7C` (range `#F5F7FA` → `#111827`).
  - **Indiagreen (Evergreen)**: 500 `#12B76A` (range `#ECFDF3` → `#043321`).
  - **Cardamom (Herbal Green)**: 500 `#5CA660` (range `#F4F9F5` → `#152819`).
  - Status aliases: `success` uses Indiagreen scale, `warning` uses Golden Hour, `info` uses Midnight Navy, `error` uses Rhododendron.
- Semantic aliases (light mode) set `--color-primary` = brand 500, `--color-secondary` = accent 500, `--color-accent` = secondary 500, plus text/border/surface tokens for both light and dark variants.
- Tailwind utilities expose these via color keys `brand`, `accent`, `secondary`, `crimson`, `indiagreen`, `marigold`, `stout`, `cardamom`, `gold`, `rose`, `neutral`, and status colors (`success`, `warning`, `error`).

## Recommendations
- When referencing colors in components, use Tailwind utilities (e.g., `bg-brand-500`, `text-accent-600`) or CSS variables (`var(--color-primary-500)`) instead of literals.
- If the palette needs updates, edit `theme/colors.js` and run `npm run colors:generate` to refresh `styles/generated/colors.css` before committing.
- Avoid introducing new hardcoded hex values; map any new semantic need to existing families or extend `theme/colors.js` first.

## Open Questions
- None yet.
