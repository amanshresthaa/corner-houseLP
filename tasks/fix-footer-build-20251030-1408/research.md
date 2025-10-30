# Research: Restaurant Footer Build Fix

## Initial Requirements
- Restore `pnpm run build` by addressing the JSX syntax error in `components/restaurant/Footer.tsx`.
- Preserve intended restaurant footer content, including sections, contact info, social links, and Allergen notice.
- Stay aligned with existing styling approach (Tailwind + DaisyUI) and content fetched from `getContentSmart()`.

## Existing Patterns
- `components/Footer.tsx` implements a data-driven footer using DaisyUI/Tailwind classes and balanced layout structure. Provides reference for layout divisions and loading/error safeguards.
- `components/simple/SimpleFooterHours.tsx` supplies the reusable hours sub-component already used in the restaurant footer.
- `config/content.json` defines `global.navigation.footer` structure (sections, social media, copyright) that the restaurant footer consumes.
- Tests such as `tests/api/routes.test.ts` assert the presence of `content.global.navigation.footer.sections`, signalling established data contract we should respect.

## Technical Constraints & Considerations
- File is a Server Component (`async function Footer()`); must keep JSX tree valid and ensure any client components (e.g., `EmojiIcon`) remain properly encapsulated.
- Need to ensure semantic HTML structure and ARIA labelling remain intact for accessibility. Social links use inline SVGs; keep accessible naming.
- Maintain mobile-first responsive grid (`grid-cols-1 md:grid-cols-4`) and DaisyUI/Tailwind utility classes already applied.

## Findings
- `pnpm exec eslint components/restaurant/Footer.tsx` reports `Parsing error: JSX element 'div' has no corresponding closing tag` (line 17). Source shows duplicated `<div className="border-t ...">` opening tags with only one matching closing tag, causing the unmatched JSX tree.
- After the grid section, `<AllergenNotice compact />` sits outside any wrapper because of the duplicated div insertion, contributing to structural confusion.
- No evidence of helper utilities addressing this section elsewhere, so fix must localize to this component.

## Recommendations
- Normalize JSX hierarchy: ensure each `<div>` opening has corresponding closing tag, remove accidental duplicate wrapper, and position `<AllergenNotice>` inside the container with proper spacing.
- While adjusting structure, confirm mapping over footer sections/social links still aligns with data contract and ensure keys/aria-labels remain intact.
- After structural fix, rerun lint/build to validate resolution; plan to add verification steps for layout integrity via DevTools per project workflow.
