# Research: Color System Implementation

## Objective

Implement single source of truth for colors, align accessibility mappings, and establish enforcement per roadmap.

## Existing Artifacts & Constraints

- `theme/colors.js` currently exports `base` palettes (brand, accent, secondary, etc.) and `themes` (light/dark) with semantic keys (`background`, `surface`, `text`, etc.), but it does **not** enumerate the extended semantic tokens that live in CSS (`--color-surface-*`, `--color-text-*`, `--color-state-*`, overlays, gradients). JS-only semantic keys (e.g., `primaryAccent`, `textMuted`) never make it into CSS, while CSS-only tokens are absent from JS.
- New generator script will unify data: plan is to emit `styles/generated/colors.css` from `theme/colors.js` via `scripts/generate-color-css.js` (`npm run colors:generate`).
- Manifest & metadata now sourced from theme tokens (`app/manifest.ts`, `app/layout.tsx`), eliminating divergent hex literals.
- `app/globals.css` contains 175 `--color-*` definitions. Using the diff script:
  - 63 CSS tokens missing from `theme/colors.js` (surface variants, text tiers, state scales, border aliases).
  - 10 JS-defined tokens missing in CSS (accent-950 scale, semantic keys like `--color-background`, `--color-primaryAccent`, and `--color-textMuted`).
- Accessibility styles (`styles/accessibility.css`) define their own `--accessibility-*` colors (focus, error, success, warning, info) with hardcoded hex/literal RGB values, not tied to central tokens. High-contrast mode flips to custom values as well.
  - Extracted set shows ~30 custom properties (e.g., `#005fcc`, `#dc3545`, `#28a745`, `#ffc107`, `#17a2b8`) plus coarse dark-mode overrides—evidence that accessibility palette needs to be centralized or aliased.
- Design system references undefined families (`--color-brass-*`, `--color-chakra-*`, `--color-masala-*`) which appear in design docs but have no definitions in globals (confirmed by `rg` and token diff).
- Critical UI files rely on literals: `components/optimization/CLSIntegration.tsx` (#f0f0f0, #e0e0e0), `lib/criticalLoadingCSS.ts` (#f8f9fa), `tailwind.config.js` gradient (rgba saffron/stout mix), PWA manifest/meta colors (#FEF7ED, #D4941E, #f9fafb, #0f172a).
- Lint/test setup lacks automated guardrails against new literals; `scripts/precise-color-analysis.js` and `scripts/migrate-colors.js` focus on Tailwind token usage, not raw color values.

## Multiple Perspectives / Assumption Checks

1. **Single Source of Truth Feasibility**
   - Optimistic: extend `theme/colors.js` to include semantic/state/accessibility tokens and auto-generate CSS, removing drift.
   - Skeptical: CSS file includes nuanced tweaks (comments, hand-tuned values like `--color-surface-subtle:#fdfbf8`) that may not map cleanly to scale values. Need generator hooks for custom overrides.
   - Validation: 63-token mismatch proves manual sync is unsustainable; generator must allow custom/resolved values (maybe computed from base but still override-able).

2. **Accessibility Mapping**
   - Perspective A: map `--accessibility-*` to existing state tokens (success/error/warning/info) and high-contrast variants to neutrals/inverse tokens.
   - Perspective B: product may require specialized palette (e.g., `#ffff00` focus outline) that conflicts with brand tokens; generator should support dedicated accessibility dictionary but keep it centralized.
   - Action: gather contrast requirements, possibly from `styles/accessibility.css` comments or design documentation; plan to run contrast checks when aliasing.

3. **Legacy Token Families**
   - Option 1: implement `brass`, `chakra`, `masala` palettes in `base` (pull values from `design-system/docs/COLORS.md`).
   - Option 2: deprecate them and update design-system assets to rely on existing `accent`, `secondary`, etc. Need cross-team agreement to avoid breaking DS.
   - Evidence: `design-system/css/button.css` uses them extensively in dark mode; absence leads to fallback `var()` (likely empty). Implementation must address quickly to avoid DS regressions.

4. **Generator Integration**
   - Need to decide lifecycle: run manually via npm script, as prebuild step, or part of lint/test. Must avoid developer editing generated CSS directly.
   - Uncertainty: Are there other stylesheets (e.g., `libs`, `design-system/css`) that assume manual editing? Maybe create `styles/generated/colors.css` and import into `globals.css` to preserve manual segments.

## Open Questions / Risks

- How to preserve non-color sections inside `app/globals.css` (layout, typography). Generation should target only color block, not entire file, or restructure file into generated imports to avoid clobbering other rules.
- Accessibility tokens: Do we need separate light/dark values, or can they track semantics with adjustments? Must ensure WCAG ratio (≥4.5:1 for text; 3:1 for UI components) after aliasing.
- Should gradient tokens (e.g., `--grad-saffron-brand`) live in generator output? Need to confirm usage (`tailwind.config.js`, `criticalCSS.ts`).
- Build pipeline: Where to store generator script (e.g., `scripts/generate-colors.js`). Must ensure Node environment, align with instructions (ASCII, etc.).

## Preliminary Data Points (from audit re-run 20251029-1834)

- Total `--color-*` tokens in CSS: 175; tokens out of sync with JS: 73 combined (63 CSS-only, 10 JS-only).
- `styles/accessibility.css` includes at least 24 hardcoded hex/RGB values for focus/high-contrast states.
- `design-system/tokens/button-tokens.json` uses white hex (#ffffff) 11 times and undefined token families (see lines 31–84).
- `tailwind.config.js` gradient: `linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82)` (113). Will need token replacements or dynamic generation.

## Immediate Next Actions for Planning

- Document desired semantic token hierarchy (surface/text/border/state/accessibility).
- Define generator scope (only tokens vs entire CSS snippet).
- Outline contrast validation approach (possible tooling: `polished` contrast function, `wcag-contrast` npm, or custom script).
- Coordinate decisions around legacy token families before coding.

## Questions for Stakeholders

- Are `--accessibility-*` colors fixed by branding/accessibility team? If so, can they map to semantic tokens or require separate category?
- Should generation output replace entire `app/globals.css` or feed into dedicated generated file imported there?
- For design system tokens, should we maintain additional palettes or update components to use existing semantic tokens?
