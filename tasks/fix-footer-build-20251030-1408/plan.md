# Implementation Plan: Restaurant Footer Build Fix

## Objective
Restore the Next.js production build by repairing the JSX tree in `components/restaurant/Footer.tsx` while preserving intended restaurant footer layout, data bindings, and accessibility affordances.

## Success Criteria
- [ ] `pnpm run build` completes without JSX parsing errors.
- [ ] Footer renders expected sections (info, quick links, hours, social, legal) using data from `getContentSmart()`.
- [ ] Layout remains responsive across mobile/desktop breakpoints with no visual regressions for Allergen notice or social links.

## Architecture & Scope
- **Component**: `components/restaurant/Footer.tsx` only; ensure hierarchy follows container → grid → supplemental sections pattern used elsewhere.
- **State/Data**: Continue fetching `identity`, `contact`, `social`, and `content.global.navigation.footer` using existing helpers.
- **Rendering Flow**: Keep single return block producing semantic `<footer>` tag with inner containers; ensure Allergen notice stays within container before social/legal row.

## Implementation Steps
1. Remove duplicate `<div className="border-t ...">` and restructure wrappers so each open tag closes correctly.
2. Position `<AllergenNotice compact />` inside container with appropriate spacing (likely before social/legal row) to maintain visual order.
3. Double-check mapped sections/social links to ensure keys and separators render without syntax issues.
4. Format/clean up indentation to improve readability, ensuring DaisyUI/Tailwind classes remain unchanged.

## UI / UX Considerations
- Confirm Allergen notice alignment matches intention (likely full-width informational block between grid and social row).
- Maintain adequate spacing (`mt/pt` utilities) and responsive flex behaviour for social/legal row.
- Ensure anchor elements retain `aria-label` / `sr-only` text for accessibility.

## Testing Strategy
- Lint targeted file via `pnpm exec eslint components/restaurant/Footer.tsx`.
- Run `pnpm run build` to confirm fix.
- Manual QA via Chrome DevTools MCP (per project requirement) after implementation to visually validate footer on key pages.

## Edge Cases
- Missing social URLs: keep existing `?? '#'` fallback and labels.
- Ensure multiple legal links render with separators without trailing pipe.

## Rollout Plan
- No feature flag; change affects restaurant-themed pages consuming this footer (`app/events`, potentially others).
- After verification, prepare for merge with note to run automated tests/CI.
