# Research: Unified Typography Scale

## Existing Patterns
- Global fluid sizes set in `app/globals.css` for body and h1–h6 using clamp.
- Components frequently override with Tailwind `text-*` and arbitrary `text-[...]`.
- DaisyUI present; not currently driving typography scale.

## External Resources
- Tailwind custom fontSize tokens
- Fluid type with clamp patterns
- DaisyUI typography/prose patterns

## Technical Constraints
- Next.js + Tailwind; existing global CSS must remain.
- Minimize churn: scoped sweep, not full redesign.

## Recommendations
- Introduce semantic tokens (Tailwind fontSize) mapped to global fluid scale.
- Add utility aliases (.h1–.h6, .lead, .eyebrow, .meta).
- Replace outliers: arbitrary pixel/clamp sizes and extreme `text-7xl/9xl`.

