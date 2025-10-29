# Implementation Plan: Color System Implementation

## Objective

Deliver week-1 immediate steps toward centralized color system and set groundwork for subsequent refactors.

## Success Criteria

- [ ] `theme/colors.js` models full palette (scales + semantic aliases + accessibility/high-contrast tokens) with no drift versus CSS variables.
- [ ] Automated generator produces the color-variable block consumed by `app/globals.css`; manual edits are confined outside the generated region.
- [ ] Accessibility palette maps to semantic tokens (or dedicated dictionary) with documented WCAG validation evidence.
- [ ] Product/build tooling updated (`package.json` script, docs) and verification scripts assert parity to prevent regression.

## High-Level Approach

### Architecture & Ownership

- **Source of Truth**: `theme/colors.js` expanded to include:
  - `base` families (existing).
  - `semantic` alias object (surface/text/border/state).
  - `accessibility` dictionary (focus/high-contrast).
  - Possibly `legacy` families (brass/chakra/masala) or explicit deprecation flags.
- **Generation Layer**: New Node script `scripts/generate-color-css.js` (name TBD) that:
  - Reads `theme/colors.js`.
  - Serializes CSS custom properties into a dedicated output (e.g., `styles/generated/colors.css` or injected block).
  - Emits gradients/overlays and dark-mode overrides.
  - Supports metadata (comments, timestamps) and warns if manual edits detected.
- **Consumption**: `app/globals.css` refactored to import or include generated output (via `@import` or `@layer`). Non-color rules remain hand-authored.
- **Verification**: Another script/test ensures one-to-one parity and fails CI if divergence occurs.

### Component Breakdown

1. **Palette Refactor**
   - Add semantic/accessibility objects to `theme/colors.js`.
   - Provide helper functions for retrieving color families, semantic tokens, gradients.
   - Export typed interface for generator/test usage.

2. **Generator Script**
   - Accept CLI options (e.g., `--check` vs `--write`) for CI.
   - Produce deterministic ordering (alphabetical or defined order).
   - Write to `styles/generated/colors.css` (new file) and ensure `.gitignore`/Prettier unaffected.
   - Optionally embed guard comment in `app/globals.css` referencing generated file.

3. **Accessibility Mapping**
   - Decide alias strategy (map to semantics or dedicated tokens).
   - Include contrast validation step, likely via small `wcag` helper or manual ratio calculations logged during generation.

4. **Integration**
   - Update `app/globals.css` to import generated CSS and remove duplicated hardcoded values.
   - Adjust `tailwind.config.js` if necessary to consume new semantic map.
   - Add npm scripts: `colors:generate` (write) and `colors:check` (verify).

5. **Documentation & Tooling**
   - Update `theme/README-colors.md` (and/or new doc) explaining new flow.
   - Note in `AGENTS.md` (if required) about generator usage.

### Data Flow

```
theme/colors.js  -->  scripts/generate-color-css.js  -->  styles/generated/colors.css
                                                      \->  validation (parity check)
colors.css  -->  imported by app/globals.css and referenced by Tailwind config/DS
```

### Testing & Verification Strategy

- Unit-like test inside generator script (`--check`) to compare tokens vs expected list.
- Run `npm run lint` + relevant tests after refactor.
- For accessibility mapping, compute contrast ratios (e.g., using `wcag-contrast` or computed function) and capture results in verification doc.
- Manual QA via Chrome DevTools focusing on theme changes (light/dark surfaces, focus states).

### Edge Cases & Risk Mitigation

- Generated file tidy: ensure ESLint/stylelint ignore or configure to allow build artifacts.
- Avoid overwriting manual CSS: restructure `app/globals.css` to separate generated import region from custom rules.
- Provide fallback for legacy token families: either add to `base` or assert no usage before removal.
- Consider TypeScript consumers: if other scripts import `theme/colors.js`, maintain backward compatibility (exports should not break).

### Rollout Steps

1. **Palette Schema Update**
   - Define semantic dictionaries (`surface`, `text`, `border`, `state`, `status`, `overlay`, `gradient`, `legacy` if retained).
   - Export typed map + helper for generator/consumers.
2. **Generator MVP**
   - Create script with CLI to `--write` CSS (default path `styles/generated/colors.css`) and `--check` (non-zero exit if drift).
   - Write metadata comment (e.g., `/* AUTO-GENERATED */`) and ensure stable ordering.
3. **Integrate Into Globals**
   - Refactor `app/globals.css` to import generated file (`@import` or `@layer base { @import ... }`) or embed via placeholder comment replaced by generator.
   - Remove legacy color definitions from manual file.
4. **Accessibility Alignment**
   - Move `--accessibility-*` definitions into generator (with ability to override for high-contrast variant) or alias them to semantic tokens; update CSS accordingly.
   - Run contrast validation script and capture results.
5. **Design System Compatibility**
   - Either extend palette with `brass/chakra/masala` scales or refactor DS usage; ensure generator outputs whichever approach chosen.
   - Update DS tokens JSON to reference new tokens.
6. **Tooling & Docs**
   - Add `npm run colors:generate` + `colors:check`.
   - Update `theme/README-colors.md` (and potentially `AGENTS.md`) with new workflow.
7. **Verification**
   - Run `npm run colors:generate && npm run colors:check`.
   - Execute lint/tests.
   - Perform DevTools pass focusing on theming/accessibility states.
### Proposed Token Taxonomy

- **Base families (unchanged)**: `brand`, `accent`, `secondary`, `crimson`, `indiagreen`, `marigold`, `stout`, `cardamom`, `neutral`, `state` (success/warning/error/info).
- **Semantic aliases (new)**:
  - `surface`: `base`, `subtle`, `muted`, `emphasis`, `inverse`.
  - `text`: `primary`, `secondary`, `tertiary`, `inverse`, `brand`, `accent`, `heritage`, `error`.
  - `border`: `subtle`, `default`, `emphasis`, `brand`, `heritage`, `error`.
  - `overlay`: `10`, `20`, `40`, `60` (from existing rgb tokens).
  - `gradient`: `saffronBrand`, `heritage`.
- **Theme semantics**: ensure light/dark themes supply semantic alias defaults (e.g., `background`, `surface`, `text`, `textMuted`).
- **Accessibility dictionary**:
  - `focus` (default/light/dark), `bgPrimary`, `bgSecondary`, `textPrimary`, `textSecondary`, `borderPrimary`, `error`, `success`, `warning`, `info`.
  - High-contrast overrides keyed by mode (e.g., `accessibility.highContrast.focus` = `#ffff00`).
- **Legacy support** (decision point):
  - Optionally add `brass`, `chakra`, `masala` palettes with 50–900 scales using design-system docs.
  - If deprecated, provide mapping table to replacement semantic tokens and schedule removal.
