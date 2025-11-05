# Research: Delivery Minimum Messaging

## Initial Requirements

- Surface the information that delivery orders require a minimum spend of £20.
- Ensure the messaging is visible in relevant user-facing content (e.g., delivery information, ordering sections).

## Success Criteria

- The site clearly communicates the £20 delivery minimum in the appropriate section(s).
- Copy aligns with existing tone/style guidelines.
- No regressions to layout or functionality.
- Tests (if any) continue to pass.

## Existing Patterns

- Delivery-related messaging currently highlights promos like "10% off Collection" and "Free delivery up to 3 miles, then £2/mile" across config JSON (e.g., `config/marketing.json`, `config/content/components/faq.json`).
- The takeaway landing page (`app/takeaway/page.tsx`) surfaces promos within a `<p>` element in the hero section.
- Navigation CTA `Order Takeaway` in `components/restaurant/NavbarParts.tsx` exposes promo info in `aria-label` and corner note microcopy.
- Schema data for the takeaway page is generated inline and may need to reflect pricing constraints if updated copy references them.

## External Resources

_N/A_

## Technical Constraints

- Next.js 13+ app directory with server components; copy updates require editing TypeScript/JSON.
- DaisyUI/tailwind styling is used; we should preserve existing utility classes and structure.
- Marketing content may be consumed by multiple sections; ensure updates remain concise to avoid layout shifts.

## Recommendations

- Update hero promo copy on the takeaway page to append the £20 delivery minimum alongside existing promos.
- Revise shared marketing content (`config/marketing.json`) and FAQ answers so the £20 minimum is communicated consistently.
- Adjust navigation aria-label/microcopy to mention the £20 minimum without overcrowding; keep emojis minimal to avoid screen reader verbosity.
- Verify there are no other delivery-related snippets (site metadata, SEO, structured data) that need the same messaging.

## Open Questions

- Investigate whether SEO descriptions/structured data should reference the £20 minimum in a follow-up task (not addressed here).
