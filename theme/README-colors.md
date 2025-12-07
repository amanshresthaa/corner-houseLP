Color system and usage

Purpose

This file documents the centralized color token system for the project. It provides the single source of truth for colors (in `theme/colors.js`) and guidance for usage, theming, and accessibility.

Files

- `theme/colors.js` — Exports palette scales (`base`), semantic tokens (`semantic`), accessibility tokens (`accessibility`), and helper utilities.
- `styles/generated/colors.css` — Auto-generated CSS variables (run `npm run colors:generate` to refresh).
- `scripts/generate-color-css.js` — Build script that emits the generated CSS (use `npm run colors:check` in CI).

Principles

- Semantic naming: use tokens by purpose (e.g. `--color-primary`, `--color-text`, `--color-bg`) rather than raw hex.
- Single source of truth: update `theme/colors.js` to change brand colors across the app.
- Theming: `themes.light` and `themes.dark` provide ready-made palettes.
- Palette anchors (2025-12-07):
  - Forest (brand/primary) `#1B4332`
  - Sand (accent/CTA & warning) `#D4A574`
  - Ocean (info/links) `#2C5F8D`
  - Mint (success) `#52A67D`
  - Clay (error) `#B85C3E`
  - Warm neutral spine anchored at `#6B7280`

Quick usage

- In JS/TS components (server or client):

  ```js
  const { themes, semantic } = require('@/theme/colors');
  const COLORS = themes.light.colors; // or themes.dark

  // Example: metadata or inline styles
  <meta name="msapplication-TileColor" content={COLORS.primary} />
  ```

- CSS variables are emitted via `npm run colors:generate`. Do not edit `styles/generated/colors.css` manually; update `theme/colors.js` instead.
- For runtime injection, `cssVariablesForTheme('light')` still returns a string of `--color-*` declarations (helpful for SSR style tags or scoped themes).

Accessibility

- Tokens have been chosen to favour contrast. When changing brand colors, verify WCAG contrast (4.5:1 for normal text) using tools like https://webaim.org/resources/contrastchecker/ or Lighthouse.
- Prefer `primary` on dark text only when contrast is acceptable; otherwise use `primaryAccent` (darker or lighter variant) as appropriate.

Next steps / Refactor plan

1. Run `npm run colors:generate` whenever palette data changes (CI should call `npm run colors:check`).
2. Replace remaining hardcoded literals in components and docs by referencing generated tokens.
3. Wire build/test automation so `prebuild` regenerates palette (`npm run colors:generate` already configured).
4. Introduce automated lint rule (optional): custom ESLint rule banning hex literals in code/style files.

Contact

If you need additional token variants (e.g., hover/active shades), update `theme/colors.js` with new semantic names and prefer using them in components.
