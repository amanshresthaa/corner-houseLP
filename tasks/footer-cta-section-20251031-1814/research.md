# Research: Menu Page CTA Section

## Initial Requirements
- Insert a new section between the existing Menu CTA ("Need Dietary Information?") and the global footer on the `/menu` page.
- Provide three clear calls-to-action: book a table, place an order, and view the takeaway menu.
- Use a light background with dark typography for the new section.
- Reuse styling and structural patterns established on the home page.

## Success Criteria
- Section renders on the menu page between the dietary information block and the footer without layout regressions.
- Includes three accessible CTA buttons/links that navigate to the correct destinations.
- Visual design aligns with existing home page CTA styling (light background, dark text, rounded card treatment).
- Section remains responsive and accessible (keyboard focus, semantics) across breakpoints.

## Existing Patterns
- `components/restaurant/sections/CallToActionSection.tsx` implements a reusable CTA panel with rounded card, accent badge, and responsive button layout used on the home page.
- `components/ClientHomeContent.tsx` demonstrates how the CTA section is orchestrated on the landing page by passing preconfigured buttons.
- Buttons leverage `Link` from `@/lib/debugLink` for consistent routing and external handling.
- Menu page (`app/menu/page.tsx`) already wraps content inside `RestaurantLayout`, placing the footer after the child content. Inserting a section near the end of the child tree places it directly above the footer.

## External Resources
- No external documentation needed; existing component implementations provide necessary patterns.

## Technical Constraints
- Maintain Next.js server component boundaries; current `MenuPage` is an async server component, and `CallToActionSection` is a client component (`'use client'`). Importing it directly will require wrapping within `<FadeIn>` or using dynamic import with `ssr: false`? Need to validate usage—other server components likely use it already.
- Ensure new section's styling keeps contrast accessible against light background.
- Preserve current animation wrappers (`FadeIn`) for consistency.

## Open Questions
- None identified; button destinations assumed to be existing routes (`/book-a-table`, `/order`, `/takeaway-menu`). Will confirm exact URLs during planning.

## Recommendations
- Reuse `CallToActionSection` for consistent styling; configure with appropriate headline, description, and button props.
- Wrap new CTA section in `FadeIn` to match page animation rhythm.
- Ensure the section is inserted after the existing `<FadeIn>` containing the dietary info block so visual order matches requirement.
- Verify button variants align with design palette (likely `brand`, `accent`, `crimson`) to differentiate actions while maintaining style.
