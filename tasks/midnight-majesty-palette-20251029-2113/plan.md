# Implementation Plan: Midnight Majesty Palette Rollout

## Objective
Adopt the "Midnight Majesty" palette from `Everythingyouneed/palettes.ts` as the master color system across tokens, Tailwind utilities, and documentation.

## Success Criteria
- [ ] `theme/colors.js` exports Midnight scales, semantic tokens, and theme aliases consistent with the provided palette.
- [ ] Tailwind color extensions continue to resolve to valid CSS variables with updated anchors (navy/gold/pink).
- [ ] Legacy color utility names (`brand-*`, `crimson-*`, `indiagreen-*`, etc.) retain usable mappings without unexpected visual regressions.
- [ ] `design-system/docs/COLORS.md` communicates the Midnight Majesty palette and compatibility mapping.
- [ ] Regenerated CSS variables reflect the new hues and manual QA confirms UI renders correctly in light & dark modes.

## Architecture & Data Flow
- `palette.midnight` defines three families plus theme swatches; translate these into `base` scales (`primary`, `accent`, `secondary`).
- Introduce/derive `neutral` scale from lighter primary steps to support surfaces, keeping consistent 50-950 steps.
- For legacy families:
  - Map `brand` to primary (navy) to keep class names operational.
  - Map `crimson` to secondary (rhododendron) to maintain pink/red semantics.
  - Reassign `marigold` to accent (gold) and ensure `indiagreen`/`cardamom` reuse existing green scale (either preserved from previous palette or derive complementary teal if needed). To minimize disruption, keep vegetarian-tag greens by retaining prior `forest` scale if required.
  - Document these relationships in docs.
- Update gradients/shadows to blend Midnight Navy with Golden Hour / Rhododendron for brand alignment.

## Implementation Steps
1. Build Midnight Majesty constants in `theme/colors.js` (base families, status scales, semantics, themes, overlays, gradients, shadows).
2. Ensure `colorFamilies` includes necessary legacy aliases to satisfy generator & Tailwind usage.
3. Update Tailwind color map comments and anchors; add any new alias families (e.g., `gold`, `midnight`, `rose` if needed).
4. Rewrite `design-system/docs/COLORS.md` with Midnight Majesty story, scales, and compatibility table.
5. Run `npm run colors:generate` to refresh CSS variables.
6. Manual QA with Chrome DevTools (desktop + mobile, light/dark) and capture findings in `verification.md`.

## Edge Cases & Open Questions
- Keep vegetarian/green utilities? Maintain existing green scale (rename to `evergreen`?) but flag in docs as supplementary.
- Validate contrast for primary text/background combos (navy on light backgrounds, gold on dark etc.). Use palette-provided theme swatches as guidance.
- Confirm no manual inline palette remains in `app/globals.css` beyond generated imports.

## Testing Strategy
- Visual spot check via DevTools (light/dark, mobile/desktop).
- Use console outputs to ensure no new errors appear; existing Next warnings expected.
- Future follow-up: automated accessibility/performance checks (out of scope for this color-only update).
