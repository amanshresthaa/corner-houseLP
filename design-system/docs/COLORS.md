# White Horse Heritage Palette

## 🎨 Overview

The **White Horse Restaurant & Pub** color system reimagines the interface around Nepalese heritage. The palette balances bright alpine neutrals, bold Royal Crimson, deep Sapphire Blue, grounding Himalayan Clay, celebratory Temple Gold, fresh Mountain Forest greens, and reliable Stone Grey neutrals.

All tokens originate from `theme/colors.js` and are emitted to CSS variables by `npm run colors:generate`. Tailwind utilities reference these variables directly (e.g. `bg-brand-600`, `text-crimson-700`).

## 🌈 Palette Families

### Primary — *Himalayan Snow*
```css
--color-primary-50: #FFFFFF;
--color-primary-100: #FAFAFA;
--color-primary-200: #F5F5F5;
--color-primary-300: #EEEEEE;
--color-primary-400: #E0E0E0;
--color-primary-500: #D4D4D4;
--color-primary-600: #BDBDBD;
--color-primary-700: #9E9E9E;
--color-primary-800: #757575;
--color-primary-900: #616161;
--color-primary-950: #4A4A4A;
```
Use for spacious backgrounds, elevated surfaces, and gentle dividers.

### Accent — *Royal Crimson*
```css
--color-accent-50: #FEF2F2;
--color-accent-100: #FEE2E2;
--color-accent-200: #FECACA;
--color-accent-300: #FCA5A5;
--color-accent-400: #F87171;
--color-accent-500: #DC143C; /* 🎯 Primary CTA */
--color-accent-600: #C41E3A;
--color-accent-700: #991B1B;
--color-accent-800: #7F1D1D;
--color-accent-900: #5F1416;
--color-accent-950: #3B0B0D;
```
Apply to call-to-action buttons, hero headlines, and key highlights.

### Secondary — *Sapphire Blue*
```css
--color-secondary-50: #EFF6FF;
--color-secondary-100: #DBEAFE;
--color-secondary-200: #BFDBFE;
--color-secondary-300: #93C5FD;
--color-secondary-400: #60A5FA;
--color-secondary-500: #003893;
--color-secondary-600: #002D72;
--color-secondary-700: #002561;
--color-secondary-800: #001E4F;
--color-secondary-900: #001840;
--color-secondary-950: #00112D;
```
Ideal for navigation, interactive states, and informational accents.

### Earth — *Himalayan Clay*
```css
--color-earth-50: #FDF8F7;
--color-earth-100: #F9EFEC;
--color-earth-200: #F1DDD8;
--color-earth-300: #E5C3B9;
--color-earth-400: #D49D8C;
--color-earth-500: #B8735A;
--color-earth-600: #9C5D47;
--color-earth-700: #7D4A39;
--color-earth-800: #5F3A2D;
--color-earth-900: #4A2E23;
--color-earth-950: #352019;
```
Reserve for warm backgrounds, textured sections, and supporting gradients.

### Gold — *Temple Gold*
```css
--color-gold-50: #FFFDF7;
--color-gold-100: #FEF9E7;
--color-gold-200: #FDF2C8;
--color-gold-300: #FCE7A1;
--color-gold-400: #F9D669;
--color-gold-500: #D4AF37;
--color-gold-600: #B8941F;
--color-gold-700: #8C7315;
--color-gold-800: #6B5A11;
--color-gold-900: #4F420C;
--color-gold-950: #362D08;
```
Use for premium badges, pricing highlights, and festive callouts.

### Forest — *Mountain Forest*
```css
--color-forest-50: #F0FDF4;
--color-forest-100: #DCFCE7;
--color-forest-200: #BBF7D0;
--color-forest-300: #86EFAC;
--color-forest-400: #4ADE80;
--color-forest-500: #2C5F2D;
--color-forest-600: #234D24;
--color-forest-700: #1A3D1B;
--color-forest-800: #143016;
--color-forest-900: #0F2411;
--color-forest-950: #09190C;
```
Perfect for wellness cues, launch states, and success feedback.

### Neutral — *Stone Grey*
```css
--color-neutral-50: #F9FAFB;
--color-neutral-100: #F3F4F6;
--color-neutral-200: #E5E7EB;
--color-neutral-300: #D1D5DB;
--color-neutral-400: #9CA3AF;
--color-neutral-500: #6B7280;
--color-neutral-600: #4B5563;
--color-neutral-700: #374151;
--color-neutral-800: #1F2937;
--color-neutral-900: #111827;
--color-neutral-950: #0B1120;
```
Use for typography, dividers, subdued backgrounds, and dark mode surfaces.

## 💾 Legacy Token Compatibility

Legacy families map to the new palette:

| Legacy Family | New Source |
|---------------|------------|
| `brand-*`     | Royal Crimson scale (`--color-brand-*` mirrors `accent`) |
| `crimson-*`   | Royal Crimson scale |
| `indiagreen-*`| Mountain Forest scale |
| `marigold-*`  | Temple Gold scale |
| `stout-*`     | Himalayan Clay scale |
| `cardamom-*`  | Mountain Forest scale |

This ensures existing utility classes (`bg-brand-50`, `text-marigold-600`, etc.) render with the updated palette.

## 🧭 Semantic Tokens

Light Mode (`semantic.light`):
- Surfaces: `base` → `--color-primary-50`, `muted` → `--color-primary-200`.
- Text: primary → `--color-neutral-800`, brand accents → `--color-crimson-700`.
- Borders: subtle → `--color-neutral-200`, brand → `--color-crimson-400`.
- Aliases: `--color-primary` = `--color-crimson-500`, `--color-accent` = `--color-gold-500`.

Dark Mode (`semantic.dark`):
- Surfaces draw from Stone Grey deep tones.
- Text/alias tokens lighten the Royal Crimson, Temple Gold, and Sapphire Blue families for contrast.

Use semantic tokens (`var(--color-surface-base)`, `var(--color-text-primary)`) whenever possible; fall back to explicit palette steps for bespoke visuals.

## ✅ Status Scales

Feedback colors reuse palette families:
- Success → Mountain Forest
- Warning → Temple Gold
- Info → Sapphire Blue
- Error → Royal Crimson

Utilities like `bg-success-500` and semantic aliases (`--color-success`) pick from these scales.

## 🛠️ Usage Patterns

- **Restaurant menu & signage**: `bg-primary-50`, `text-crimson-700`, `border-gold-300`.
- **Pub ambience**: `bg-earth-800`, `text-primary-50`, `accent-gold-500` highlights.
- **Website CTAs**: `bg-crimson-600 hover:bg-crimson-700`, `focus-visible:ring-gold-400`.
- **Branding**: combine `brand` (Royal Crimson), `secondary` (Sapphire Blue), and `gold` accent. Use `primary-50` for the White Horse icon.

## 🔁 Generation Workflow

1. Update `theme/colors.js` (single source of truth).
2. Run `npm run colors:generate` to refresh `styles/generated/colors.css`.
3. Tailwind immediately picks up new variables via `var(--color-... )` bindings.
4. Verify with DevTools color palette, contrast checks, and theme toggles.

## 🧪 Contrast & Accessibility

- Aim for WCAG AA (4.5:1) for body text; rely on `semantic.text` tokens to stay compliant.
- Buttons should combine `bg-crimson-600` with `text-primary-50` and `focus-visible:ring-secondary-300`.
- Provide non-color cues (icons, bold text) for state changes.

## 📌 Quick Reference

- Primary CTA: `bg-crimson-600`, hover `bg-crimson-700`.
- Secondary CTA: `bg-secondary-500`, hover `bg-secondary-600`.
- Premium highlight: `border-gold-400`, `text-gold-600`.
- Success badge: `bg-forest-100 text-forest-700`.
- Neutral card: `bg-primary-50 border-neutral-200 text-neutral-800`.

## 🧭 Maintenance Checklist

- [ ] Update docs when palette shifts.
- [ ] Run `npm run colors:generate` after edits.
- [ ] Re-run contrast audits in light & dark themes.
- [ ] Coordinate design reviews for major hue changes.
