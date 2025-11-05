# Implementation Plan: Unified Typography Scale

## Objective
Unify font sizing with a fluid, semantic scale and remove outliers.

## Success Criteria
- [ ] Headings render consistently across pages
- [ ] No arbitrary `text-[...]` remains in key components
- [ ] Body text min 16px on mobile

## Architecture
- Tailwind `theme.extend.fontSize` tokens (fluid-*).
- CSS utilities for .h1–.h6, .lead, .meta.

## Implementation Steps
1. Add tokens in `tailwind.config.js`.
2. Add utility classes in `app/globals.css`.
3. Replace outliers in a scoped set of files.
4. QA in Chrome DevTools across breakpoints.

## Edge Cases
- Decorative jumbo text needs a hero size alias.

## Testing
- Manual QA with DevTools + accessibility sizing checks.
