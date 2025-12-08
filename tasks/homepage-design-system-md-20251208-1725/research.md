# Research: Homepage Design System Snapshot

## Existing Patterns

- Homepage sections are rendered via `HomeSectionsRenderer` with alternating light/dark palettes (PressTicker → QuickLinks → SignatureDishes → ReviewHighlights → About → CallToAction → TakeawayBanner → Location).
- Shared layout primitives: `max-w-6xl` container, `px-4 sm:px-6 lg:px-8` padding, and consistent `py-12–16` section spacing.
- DaisyUI buttons (`btn`, `btn-outline`, rounded-full) and Lucide icons are reused for CTAs.
- Gradients/glassmorphism appear via Tailwind utilities (e.g., `bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950`, `bg-white/5`, `backdrop-blur`).
- Cards follow rounded-3xl/4xl radii with borders at brand/accent color tokens.

## Technical Constraints

- Document should live in repo (Markdown) for cross-team sharing; no runtime impact.
- Capture tokens already present in Tailwind config rather than inventing new ones.
- Avoid duplicating images/assets; reference existing components.

## Recommendations

- Summarize global layout rules, typography, spacing, color rhythm, card patterns, CTA styles, and supporting utility rules.
- Structure doc so other pages can copy/paste patterns quickly (global rules + per-section blueprint).
