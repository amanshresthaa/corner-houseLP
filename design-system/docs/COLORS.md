# Design-First Palette – Color Documentation

## 🎨 Overview
The palette now centers on a warmer, AAA-focused system: **Forest** (brand), **Sand** (accent/CTA & warning), **Ocean** (info/links), **Mint** (success), **Clay** (error), and **Warm Neutral** (text/surfaces). All tokens originate from `theme/colors.js` and are emitted to CSS variables via `npm run colors:generate`. Tailwind utilities reference these variables directly (e.g. `bg-forest-600`, `text-sand-500`), while legacy utilities (`brand-*`, `accent-*`, etc.) are aliased to the new values for compatibility.

## 🌈 Core Palette Families

### Forest — Brand / Primary
```
--color-forest-50:  #F0F7F4
--color-forest-100: #E0EFE9
--color-forest-200: #C2DFD3
--color-forest-300: #9DD4BC
--color-forest-400: #70BFA0
--color-forest-500: #1B4332  /* Primary anchor */
--color-forest-600: #143528
--color-forest-700: #0F281F
--color-forest-800: #0B1C16
--color-forest-900: #08140F
--color-forest-950: #051208
```
Use for navigation, hero areas, and primary buttons.

### Sand — Accent / CTA / Warning
```
--color-sand-50:  #FDF9F3
--color-sand-100: #F9F2E6
--color-sand-200: #F7EBDA
--color-sand-300: #EDD5B4
--color-sand-400: #E2BD8E
--color-sand-500: #D4A574  /* CTA anchor */
--color-sand-600: #B8884F
--color-sand-700: #8E6839
--color-sand-800: #6B4E2A
--color-sand-900: #5C4426
--color-sand-950: #3E2A18
```
Primary CTA color; also used for warnings.

### Ocean — Info / Links / Trust
```
--color-ocean-50:  #F0F6FA
--color-ocean-100: #E1EDF5
--color-ocean-200: #D6E6F2
--color-ocean-300: #B8D4E8
--color-ocean-400: #9EC3DE
--color-ocean-500: #2C5F8D  /* Info anchor */
--color-ocean-600: #1F4768
--color-ocean-700: #1A3A55
--color-ocean-800: #163044
--color-ocean-900: #112534
--color-ocean-950: #0A1821
```
Use for info callouts, links, and trust indicators.

### Mint — Success
```
--color-mint-50:  #F1F9F5
--color-mint-100: #E2F4EB
--color-mint-200: #D4EFE0
--color-mint-300: #B7E4CD
--color-mint-400: #A1D9B9
--color-mint-500: #52A67D  /* Success anchor */
--color-mint-600: #3B8860
--color-mint-700: #2F6B4C
--color-mint-800: #2A6244
--color-mint-900: #1C422D
--color-mint-950: #0D2318
```
Success states and positive feedback.

### Clay — Error / Destructive
```
--color-clay-50:  #FBF4F2
--color-clay-100: #F7E9E5
--color-clay-200: #F4DDD4
--color-clay-300: #E8BFB0
--color-clay-400: #E5B5A3
--color-clay-500: #B85C3E  /* Error anchor */
--color-clay-600: #93432B
--color-clay-700: #7A3622
--color-clay-800: #6D2F1E
--color-clay-900: #472015
--color-clay-950: #2F1510
```
Use for errors, destructive actions, and critical warnings.

### Warm Neutral — Text / Surfaces
```
--color-neutral-50:  #FAFAF9
--color-neutral-100: #F5F5F4
--color-neutral-200: #E7E5E4
--color-neutral-300: #D6D3D1
--color-neutral-400: #A8A29E
--color-neutral-500: #6B7280
--color-neutral-600: #57534E
--color-neutral-700: #44403C
--color-neutral-800: #292524
--color-neutral-900: #1C1917
--color-neutral-950: #18181B
```
Primary text/surface system for both light and dark modes.

## 🔁 Legacy Aliases (still available, mapped to new values)
- `brand-*` → forest
- `accent-*` → sand
- `secondary-*`, `crimson-*`, `rose-*` → clay
- `gold-*`, `marigold-*` → sand
- `indiagreen-*`, `cardamom-*` → mint
- `stout-*` → warm neutral

## 🧭 Semantic Tokens
- Light mode: `--color-primary` (forest-500), `--color-secondary` (sand-500), `--color-accent` (sand-500), `--color-info` (ocean-500), `--color-success` (mint-500), `--color-warning` (sand-500), `--color-error` (clay-500).
- Dark mode: equivalents shift to lighter shades for contrast; surfaces use neutral-950/900 and text uses neutral-50/300.

## 🔌 Usage
- JS/TS: `const { themes } = require('@/theme/colors'); const COLORS = themes.light.colors;`
- CSS vars: import `styles/generated/colors.css` (auto-generated). Do not edit manually; run `npm run colors:generate` after changes to `theme/colors.js`.
- Tailwind: use new keys (`bg-forest-500`, `text-sand-600`, `bg-ocean-500`) or legacy aliases; both point to the new palette.

## ✅ Accessibility
Colors selected for WCAG-friendly contrast; verify context-specific pairings with WebAIM/APCA for critical UI.
