# Implementation Plan: Color Palette Revamp

## Objective
Revamp the centralized color system to use the White Horse palette (Himalayan Snow, Royal Crimson, Sapphire Blue, Himalayan Clay, Temple Gold, Mountain Forest, Stone Grey) while keeping status colors and theme infrastructure intact.

## Success Criteria
- [ ] `theme/colors.js` exposes new palette families, semantic tokens, and light/dark theme values that match the provided specification.
- [ ] `tailwind.config.js` references updated family names without breaking the CSS variable bindings.
- [ ] `design-system/docs/COLORS.md` documents the new palette for designers.
- [ ] `styles/generated/colors.css` regenerated with the new variables.
- [ ] No TypeScript or lint errors introduced by the refactor.

## Architecture
- Maintain existing module structure in `theme/colors.js`: `base`, `statusScales`, `semantic`, `themes`, `colorFamilies`, etc.
- Replace old family keys (`brand`, `accent`, `stout`, etc.) with the new ones. Preserve success/warning/error/info scales.
- Adjust gradients/shadows to meaningful combinations from the new palette or simplify if obsolete.

## Component Breakdown
- `theme/colors.js`: redefine palettes, semantics, themes, gradients, shadows, and exported lists.
- `tailwind.config.js`: update extended color map to align with new `base` keys.
- `design-system/docs/COLORS.md`: rewrite core sections to reflect new family names and shades.
- `styles/generated/colors.css`: regenerate via script (no manual edits).

## Data Flow
- Palette definitions (`base`) feed `colorFamilies`, which inform the generator script to emit CSS variables used by Tailwind utilities.
- `themes.light/dark.colors` map to semantic CSS variables consumed by runtime components.

## API Contracts
- Not applicable (internal configuration only). Ensure exported module shape remains unchanged to avoid breaking imports.

## UI/UX Considerations
- Palette must support both dining (light) and pub (dark) experiences via `themes`. Ensure text contrast uses appropriate shade pairings.
- Maintain hover/active variations (e.g. `primaryHover`) aligned with given theme spec.

## Testing Strategy
- Regenerate color CSS and inspect diff for expected values.
- Optionally run `npm run colors:check` or lint if time permits (fast feedback).
- Spot check key components (e.g. by searching for `var(--color-primary)` usage) to ensure tokens still exist.

## Edge Cases
- Any leftover references to old family names could break (e.g. `var(--color-brand-500)`). Search for previous names after update and verify replacements.
- Ensure gradients/shadows referencing old keys are updated or removed to prevent undefined CSS variables.

## Rollout Plan
- Single-step deployment once colors regenerate. No feature flag expected. Coordinate with design for acceptance after verification.
