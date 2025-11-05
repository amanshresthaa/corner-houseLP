# Implementation Plan: Collection & Delivery Copy

## Objective

Replace “Takeaway” with “Collection & Delivery” across user-facing copy. Add dual CTAs “Order for Collection” and “Order for Delivery” that link to the same URL. Surface promo copy: “10% off Collection” and “Free delivery up to 3 miles, then £2/mile”.

## Success Criteria

- [ ] No visible “Takeaway” wording remains where generic ordering is referenced
- [ ] Header nav uses inclusive wording (e.g., Order Collection & Delivery)
- [ ] `/takeaway` page shows two buttons with identical href
- [ ] Promo copy present on ordering page/areas

## Architecture

- Content-driven via `config/content/**/*.json`
- Minimal page-level tweak in `app/takeaway/page.tsx` to render both CTAs

## Implementation Steps

1. Add UI labels `orderCollection` and `orderDelivery` in `config/content/core/ui.json`
2. Update global nav label to “Order Collection & Delivery” (keep same link)
3. Update content pages (home, menu, contact, events, about) to replace “Takeaway” copy
4. Update `config/restaurant.json` notes/hour strings
5. Update `/takeaway` page copy, headings, and structured data; render two identical-href CTAs
6. Add short promo note on the page hero or details section
7. Verify in browser (QA checklist)

## Edge Cases

- Keep historical or context-specific mentions where needed (but none required here)
- Ensure aria-labels and headings reflect new wording

## Testing Strategy

- Manual QA with Chrome DevTools: header nav, home quick link, menu CTA, contact features, events list, `/takeaway` page CTAs and promo text

