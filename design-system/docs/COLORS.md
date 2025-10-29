# Midnight Majesty Design System – Color Documentation

## 🎨 Overview

The **Midnight Majesty** palette defines the primary visual language for White Horse Restaurant & Pub: deep Midnight Navy foundations, radiant Golden Hour highlights, and vibrant Rhododendron flourishes. All color tokens originate from `theme/colors.js` and are emitted to CSS variables via `npm run colors:generate`. Tailwind utilities reference these variables directly (e.g. `bg-brand-600`, `text-accent-400`).

## 🌈 Core Palette Families

### Primary — *Midnight Navy*
```css
--color-primary-50: #F0F4F8;
--color-primary-100: #D9E2EC;
--color-primary-200: #BCCCDC;
--color-primary-300: #9FB3C8;
--color-primary-400: #829AB1;
--color-primary-500: #1E3A5F; /* 🎯 Primary CTA */
--color-primary-600: #102A43;
--color-primary-700: #0C2133;
--color-primary-800: #091A28;
--color-primary-900: #061420;
--color-primary-950: #040D18;
```
Use for hero backgrounds, navigational chrome, and premium call-to-action buttons.

### Accent — *Golden Hour*
```css
--color-accent-50: #FFFBEB;
--color-accent-100: #FEF3C7;
--color-accent-200: #FDE68A;
--color-accent-300: #FCD34D;
--color-accent-400: #FBBF24;
--color-accent-500: #F59E0B; /* 🎯 Golden highlight */
--color-accent-600: #D97706;
--color-accent-700: #B45309;
--color-accent-800: #92400E;
--color-accent-900: #78350F;
--color-accent-950: #4E2208;
```
Apply to premium CTAs, pricing highlights, and hospitality-focused accents.

### Secondary — *Rhododendron Bloom*
```css
--color-secondary-50: #FDF2F8;
--color-secondary-100: #FCE7F3;
--color-secondary-200: #FBCFE8;
--color-secondary-300: #F9A8D4;
--color-secondary-400: #F472B6;
--color-secondary-500: #DB2777; /* 🎯 Signature flourish */
--color-secondary-600: #BE185D;
--color-secondary-700: #9D174D;
--color-secondary-800: #831843;
--color-secondary-900: #6B1A3A;
--color-secondary-950: #4F102F;
```
Perfect for celebratory moments, special offers, and contrast against the navy foundation.

### Neutrals — *Twilight Mist*
```css
--color-neutral-50: #F7FAFC;
--color-neutral-100: #EDF2F7;
--color-neutral-200: #E2E8F0;
--color-neutral-300: #CBD5E1;
--color-neutral-400: #94A3B8;
--color-neutral-500: #64748B;
--color-neutral-600: #475569;
--color-neutral-700: #334155;
--color-neutral-800: #1E293B;
--color-neutral-900: #0F172A;
--color-neutral-950: #0A1120;
```
Use for surfaces, typography, and layout structure in both dining (light) and pub (dark) contexts.

### Deep Surface — *Obsidian Slate*
```css
--color-stout-50: #F5F7FA;
--color-stout-100: #E4E7EB;
--color-stout-200: #CBD2D9;
--color-stout-300: #9AA5B1;
--color-stout-400: #7B8794;
--color-stout-500: #616E7C;
--color-stout-600: #52606D;
--color-stout-700: #3E4C59;
--color-stout-800: #323F4B;
--color-stout-900: #1F2933;
--color-stout-950: #111827;
```
Provides the structural dark neutrals used for cards, drawers, and pub-mode surfaces.

### Supporting Greens — *Evergreen & Cardamom*
Vegetarian tags and wellness cues retain a dedicated green system.
```css
--color-indiagreen-500: #12B76A; /* Evergreen anchor */
--color-cardamom-500: #5CA660;  /* Herbal accent */
```
Use these only for dietary indicators, success states, or sustainability messaging.

## 💾 Legacy Token Compatibility

| Legacy Utility | Maps To |
|----------------|---------|
| `brand-*`      | Midnight Navy (`--color-brand-*` → `primary` scale) |
| `accent-*`     | Golden Hour scale |
| `secondary-*`  | Rhododendron scale |
| `crimson-*`    | Rhododendron scale (preserves "red" class names) |
| `marigold-*`   | Golden Hour scale |
| `stout-*`      | Obsidian Slate dark neutrals |
| `indiagreen-*` | Evergreen scale (dietary cues) |
| `cardamom-*`   | Herbal cardamom scale (soft green support) |
| `rose-*`       | Rhododendron scale (explicit rose alias) |

These aliases keep existing Tailwind utilities working while the brand shifts to Midnight Majesty hues.

## 🧭 Semantic Tokens

- **Light mode** surfaces pull from `Twilight Mist` with accents from Navy, Gold, and Rhododendron.
- **Dark mode** surfaces lean on deep Midnight Navy tones with lighter neutrals for typography.
- `--color-primary` → `--color-primary-500`
- `--color-secondary` → `--color-accent-500`
- `--color-accent` → `--color-secondary-500`

Use semantic tokens (`var(--color-surface-base)`, `var(--color-text-primary)`) for most UI components to maintain theme safety.

## ✅ Status Scales

- `success-*` → Evergreen
- `warning-*` → Golden Hour
- `info-*` → Midnight Navy
- `error-*` → Rhododendron

UI feedback (alerts, badges, toasts) should rely on these scales or the semantic equivalents (`--color-success`, `--color-warning`, etc.).

## 🛠️ Usage Patterns

- **Upscale dining CTA**: `bg-brand-600 hover:bg-brand-700 text-neutral-50`
- **Premium promo card**: `bg-accent-50 border-accent-200 text-brand-700`
- **Cocktail highlight**: `bg-secondary-500 text-neutral-50 hover:bg-secondary-600`
- **Vegetarian badge**: `bg-indiagreen-100 text-indiagreen-700`

## 🔁 Generation Workflow

1. Update `theme/colors.js` when palette values change.
2. Run `npm run colors:generate` to refresh `styles/generated/colors.css`.
3. Tailwind consumes the regenerated CSS variables automatically; purge cache if developing.
4. Use Chrome DevTools to verify contrast in light & dark modes after every palette change.

## ♿ Accessibility Notes

- Midnight Navy + neutral 50 meets AA contrast for body text (≥ 4.5:1).
- Golden Hour on navy requires medium-weight typography (≥ 16px / 600 weight) to maintain contrast; otherwise prefer white on navy.
- Rhododendron on dark surfaces is best paired with white text or used as outline/overlays.
- Preserve non-color cues (icons, weight, underlines) for status communication.

## 📌 Quick Reference

- Primary CTA: `bg-brand-600 hover:bg-brand-700 text-neutral-50`
- Secondary CTA: `bg-accent-500 hover:bg-accent-600 text-neutral-50`
- Premium outline: `border-accent-400 text-accent-600`
- Info chip: `bg-info-100 text-info-700`
- Success badge: `bg-indiagreen-100 text-indiagreen-700`

## 🧭 Maintenance Checklist

- [ ] Run `npm run colors:generate` after editing token values.
- [ ] Sync this document with any palette updates.
- [ ] Perform light + dark QA (desktop/mobile) before release.
- [ ] Review contrast with automated tooling (Lighthouse, axe) regularly.
