# Research: Home Page Layout Refresh

## Initial Requirements

- Revamp the home page with light layout refinements across all sections.
- Preserve existing content hierarchy and data pipes; no destructive changes.
- Do not modify the slideshow (Showcase component) or the navbar.

## Success Criteria

- Updated layout styles applied to each home page section apart from the slideshow and navbar.
- Visual adjustments keep content intact and mobile-first responsive.
- Accessibility and DaisyUI usage remain compliant with project standards.

## Existing Patterns

- `app/page.tsx` delegates rendering to `ClientHomeContent`, a client component orchestrating sections in order.
- Sections live under `components/homepage` and `components/restaurant/...`; each already wraps its own `section` with Tailwind + DaisyUI classes (`card`, `btn`, etc.).
- Layout containers consistently use `max-w-6xl`/`max-w-7xl` with `px-4 sm:px-6 lg:px-8`, indicating the preferred responsive gutter pattern.
- Cards and CTA buttons lean on DaisyUI utilities combined with custom color tokens (`brand-*`, `accent-*`, etc.).
- Animations leverage Framer Motion variants (`QuickLinksSection`) while other sections rely on static Tailwind transitions.

## External Resources

- Tailwind/DaisyUI utility patterns already in codebase—no additional external docs required at this stage.

## Technical Constraints

- Next.js App Router with hybrid server/client components; sections we touch are client components, so browser-only APIs are acceptable.
- Must preserve current props contracts because CMS-driven content flows through `sections` object.
- Keep Showcase (`components/slideshow/Showcase`) and `Navbar` untouched per request.
- Design tokens defined via Tailwind config; stick to existing palette names (`brand`, `accent`, `stout`, etc.).

## Observations & Opportunities

- **Press ticker**: two-column grid; cards feel flat—opportunity to add horizontal rhythm and tag styling.
- **About section**: simple two-column layout; can introduce subtle background layers, portrait framing, and vertical rhythm adjustments.
- **Signature dishes**: symmetrical cards; could introduce staggered layout, badge, or image aspect enhancements for visual interest.
- **Review highlights**: static grid with uniform cards; room for typographic hierarchy, quote iconography, and responsive stacking improvements.
- **Quick links**: already animated; spacing and border treatments could be refined for cohesion with other cards.
- **Takeaway banner**: centered stack; can emphasize CTA row spacing and supporting badges alignment.
- **Location section**: two-column grid; opportunity to add timeline-style separators and consistent card spacing.
- **Call-to-action**: gradient block; can tighten padding, add accent top badge, and ensure buttons wrap elegantly on small screens.

## Open Questions

- Degree of aggressiveness for "little layout tweak"—assume subtle enhancements (spacing, shadows, background patterns) without restructuring content order.
- No explicit new assets specified; assume we rely on existing text/image data.

## Recommendations

- Apply consistent section padding (`py-20`/`pt-24` mobile-first) to harmonize vertical rhythm.
- Introduce decorative yet accessible elements (subtle gradients, dividers) using existing color tokens.
- Reuse DaisyUI structures where possible (`badge`, `btn`, `card`) to maintain design vocabulary.
- Ensure all tweaks preserve current semantic structure and responsive breakpoints, adding wrapper classes rather than DOM changes where feasible.

