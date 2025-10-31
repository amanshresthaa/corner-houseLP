# Research: Menu Visit Section Redesign

## Existing Patterns

- `app/menu/page.tsx:236-310` currently renders a merged “Plan your visit” block using a dark `bg-brand-800` wrapper that embeds `RestaurantHoursCard` alongside `MenuCTASection`. This introduces duplicate CTAs (`Book Online`, `Order Takeaway`) because both the inline buttons and `MenuCTASection` expose the same actions.
- `RestaurantHoursCard` (`components/restaurant/RestaurantHoursCard.tsx`) supports `variant="light"` which applies `bg-neutral-50 border-brand-100/40 text-brand-700`. We can leverage this to keep the hours card readable on a light section.
- Decorative pills (e.g., `inline-flex ... rounded-full border border-accent-200/30`) appear in other sections (`app/menu/page.tsx:249`) and can be reused with light-friendly colors.
- Primary CTA buttons elsewhere on the page use `bg-brand-600 hover:bg-brand-700 focus-visible:ring-brand-500/80 focus-visible:ring-offset-white` (top hero) establishing consistent styling for key actions on light backgrounds.

## External Resources
- DaisyUI & Tailwind utilities already configured in project (`tailwind.config.js`) provide brand color tokens (`brand-50`, `brand-600`) suitable for light surfaces.
- Accessibility guidance from WAI-ARIA APG suggests exposing address/phone through semantic `<address>` or proper link affordances instead of duplicate buttons.

## Technical Constraints
- Page uses React Server Components; modifications must remain serializable (no client hooks in new markup unless we import client components).
- `RestaurantHoursCard` is dynamically imported with `ssr: true`; reusing it is fine but avoid wrapping in conflicting containers.
- Links rely on `@/lib/debugLink` (Next.js Link). Maintain that import when adding or removing CTA links.
- Section sits inside a `FadeIn` animation; maintain the wrapper to keep motion consistent.

## Observations / Issues
- Duplicate CTAs (same action repeated) dilute focus and violate requirement.
- Dark background conflicts with desired alternating light-dark-light cadence now that the dietary section is dark.
- `MenuCTASection` gradient card dominates space and repeats hero messaging; likely unnecessary in the visit section once redesigned.

## Recommendations
- Rebuild the “Plan your visit / hours” section using a light wrapper (`bg-brand-50` or `bg-white`) with high-contrast text.
- Retain `RestaurantHoursCard` (variant `"light"`) on one side for live hours while the other column presents concise visit info (address, takeaway instructions, accessibility notes).
- Provide a CTA cluster (“Book now”, “Call now”, “Get directions”) styled consistently with DaisyUI/Tailwind button patterns while ensuring each action is unique.
- Reframe heading copy to “Restaurant & Bar Opening Time” to match the refreshed narrative and highlight key information.
- Use list items or icon bullets to organize visit details for clarity and maintain DaisyUI/Tailwind styling for consistency.
