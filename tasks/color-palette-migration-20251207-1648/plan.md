# Implementation Plan: Color palette migration

## Objective
Apply the new design-first palette (forest, sand, ocean, mint, clay, warm neutral) across the codebase, updating the single source of truth, generated CSS vars, Tailwind mappings, and semantic aliases (light/dark), so all components use the new colors.

## Success Criteria
- `theme/colors.js` replaced with new palette scales plus semantic mappings (light/dark) and legacy aliases pointing to new values.
- `styles/generated/colors.css` regenerated with new values and new families (forest, sand, ocean, mint, clay) while preserving required aliases.
- `tailwind.config.js` exposes new color keys and maps existing keys to new values.
- Global CSS semantic vars updated to new palette; `DEFAULT_THEME_COLOR` uses new surface token.
- No lingering references to deprecated hex values or missing variables.

## Architecture / Approach
1) Update palette source (`theme/colors.js`) with new scales, alias mappings, gradients/shadows adjusted if needed; keep CommonJS exports.
2) Update colorFamilies list for generator to include new families; keep legacy names aliased to new scales to avoid breakage.
3) Regenerate `styles/generated/colors.css` via `npm run colors:generate`.
4) Update `tailwind.config.js` to add new keys (forest, sand, ocean, mint, clay) and ensure semantic keys point to new vars.
5) Update global semantic CSS tokens (in `app/globals.css` + semantic outputs) to align with new palette.
6) Spot-check representative components (buttons/nav/links/alerts) for explicit color utilities; rely on updated variables for rest.

## Components / Files
- `theme/colors.js`
- `scripts/generate-color-css.js` (indirectly, via colorFamilies)
- `styles/generated/colors.css`
- `tailwind.config.js`
- `app/globals.css`
- `app/layout.tsx` (theme-color)
- Representative components may inherit automatically via utilities

## Data Flow
`theme/colors.js` → `scripts/generate-color-css.js` → `styles/generated/colors.css` → imported in `app/globals.css` & Tailwind utilities → components/pages.

## Testing Strategy
- Regenerate CSS and ensure no generator diffs missing.
- Build not required now; rely on static validation + `git diff`.

## Edge Cases
- Legacy color keys (brand/accent/secondary/etc.) must resolve to new palette to prevent runtime breakage.
- Dark mode semantics must use updated neutral/forest/sand shades for contrast.

## Rollout Plan
- Single PR/branch: update sources + generated CSS; class names remain but values swap to new palette. Additional refactors to new Tailwind keys can follow.
