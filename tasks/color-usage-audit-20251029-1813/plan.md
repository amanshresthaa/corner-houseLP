# Implementation Plan: Color Usage Audit

## Objective

Establish a comprehensive understanding of color usage and propose centralization and naming improvements.

## Success Criteria

- [ ] Exhaustive inventory of hardcoded colors (hex, rgb/rgba, hsl/hsla, named keywords) with file:line references
- [ ] Clear map of color definition sources (`theme/colors.js`, CSS variables, Tailwind `extend.colors`, design-system docs) noting overlaps, gaps, and ownership
- [ ] Evaluation of naming conventions (semantic vs descriptive) with evidence-backed guidance
- [ ] Actionable migration/cleanup strategy covering refactors, tooling, verification, and risks

## Architecture & Approach

### Data Sources & Cross-Checks

- **Primary artifacts**: `app/globals.css`, `theme/colors.js`, `tailwind.config.js`, `design-system/**`, `components/**`, `app/**`, `styles/**`, `Everythingyouneed/**`, markdown/docs.
- **Toolchain diversity** (per ultra-check requirement):
  1. `rg` regex sweeps with targeted patterns for hex (`#[0-9a-fA-F]{3,8}`), rgb/hsl, and named colors.
  2. Node/JS helper leveraging `scripts/precise-color-analysis.js` (extended or referenced) to validate token usage vs defs.
  3. `grep`/`sed` sanity checks to confirm `rg` outputs (especially for edge cases like `#fff` without trailing semicolons).
  4. Optional `awk` or small Node snippet to diff `theme/colors.js` and CSS variable declarations for inconsistencies.
  5. Manual spot-audit of representative files to guard against false positives/negatives.

### Workflow Breakdown

1. **Catalog Central Definitions**
   - Extract token lists from `theme/colors.js`, `app/globals.css`, and Tailwind config.
   - Compare sets to identify missing scales, mismatched naming, or duplicate literals.
2. **Scan for Hardcoded Literals**
   - Use layered searches: `rg` for hex (#rrggbb/#rgb, uppercase variations), `rg` for `rgb(` / `rgba(` / `hsl(`, `rg` for CSS named colors by curated word list (e.g., `\bred\b`, `\bwhite\b`).
   - Run alternative commands (`grep -R`, custom Node matchers) to cross-validate counts.
   - Capture file paths + context into structured notes (CSV-like table in final report).
3. **Assess Naming Conventions**
   - Review CSS variable names and Tailwind token mapping for semantic clarity.
   - Check design-system tokens for drift (`--color-brass-*`, `--color-chakra-*`) and verify if they map to actual definitions.
   - Evaluate inline class usage (e.g., `text-brand-500`) for semantic coverage vs descriptive fallback.
4. **Synthesize Findings & Recommendations**
   - Determine existing centralization coverage vs gaps.
   - Recommend consolidation steps (e.g., unify `app/globals.css` with `theme/colors.js`, convert gradients to tokens).
   - Propose naming schema (semantic tiers, scales) and migration plan (script updates, lint rules).

### Data Flow & Outputs

- Raw scan outputs → temporary notes → curated summary tables (per color format) → final report (includes source references, recommended actions).
- Differences between token sources captured as diff matrices.
- Document findings into `todo.md` checkpoints, final summary for user, and populate `verification.md` with executed validations.

### Testing & Validation Strategy

- Cross-run `rg` and `grep` to confirm consistent match counts; highlight discrepancies and resolve.
- Spot-check handful of files manually to ensure regex matches context (e.g., ensure `#` in `#1` anchors not mis-counted).
- If extending scripts, dry-run them and compare outputs with manual search results.
- Use simple math checks (e.g., counts per format, totals) to ensure dataset coherence.

### Edge Cases & Pitfalls

- Colors embedded in strings for third-party libs or JSON require careful escaping.
- Comments or docs might include sample hex codes; decide whether to flag or categorize separately.
- Danger of missing uppercase hex or shorthand forms; ensure regex covers both.
- Inline `style={{ color: someVar }}` might refer to variables—avoid false positives by capturing context.
- Some tokens might resolve via `color-mix` or other derived values; note but treat separately.

### Rollout & Stakeholder Touchpoints

- Deliver audit + recommendations before code refactors.
- Suggest follow-up tasks: implement ESLint style rule, integrate with existing scripts, schedule design approval for naming schema.
