# Research: Color Palette Revamp

## Existing Patterns
- `theme/colors.js` is the single source of truth for palette scales, semantic tokens, and light/dark themes. `base` holds raw color families, `semantic` maps surfaces/text/borders, and `themes` feeds top-level aliases like `--color-primary`.
- `colorFamilies` array in `theme/colors.js` drives the generator script `scripts/generate-color-css.js`, which writes `styles/generated/colors.css`. Tailwind consumes those CSS variables via `var(--color-*)` references.
- `tailwind.config.js` extends colors using the generated CSS variables, so aligning family names (e.g. `brand`, `accent`, `neutral`) is mandatory for utility classes to continue to work.
- Existing docs in `design-system/docs/COLORS.md` mirror the palette definitions and need to stay in sync with any updates.
- Previous tasks already created color audit assets under `tasks/color-usage-audit-*`, implying the app still expects centralized token names rather than scattered hex codes.

## External Resources
- User supplied a new palette and theme spec (Himalayan Snow, Royal Crimson, Sapphire Blue, Himalayan Clay, Temple Gold, Mountain Forest, Stone Grey) including light/dark semantic roles.
- WCAG contrast guidance remains applicable (per `theme/README-colors.md`). No additional external docs required.

## Technical Constraints
- Generator script relies on `colorFamilies` matching keys present in `base`, so renaming families requires updating this list and any dependent docs.
- CSS variable naming must remain consistent with Tailwind utilities; if families change (e.g. `brand` → `primary`), matching updates in Tailwind config are required.
- Need to keep status scales (`success`, `warning`, `error`, `info`) available because downstream components likely reference them.
- After palette edits we must run `npm run colors:generate` (and optionally `colors:check`) to refresh `styles/generated/colors.css`.
- Documentation (`design-system/docs/COLORS.md`) likely referenced by design team; must reflect new naming to prevent confusion.

## Recommendations
- Replace `base` color families with the provided palette: introduce `primary`, `accent`, `secondary`, `earth`, `gold`, `forest`, `neutral`, plus keep status scales.
- Update `colorFamilies` list, gradients, shadows, and semantic theme mappings to use new tokens while preserving structure expected by generator and Tailwind config.
- Refresh light/dark `themes` values per user specification (background/surface/text/primary/etc.). Ensure hover variants and text-muted values derive from supplied palette shades.
- Regenerate CSS variables via `npm run colors:generate` and review diff in `styles/generated/colors.css` for consistency.
- Update documentation in `design-system/docs/COLORS.md` to describe the new palette families and usage guidance so that design/dev references stay accurate.
