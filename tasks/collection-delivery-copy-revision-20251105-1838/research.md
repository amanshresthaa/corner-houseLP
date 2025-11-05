# Research: Collection & Delivery Copy Revision

## Existing References (to update)

- Navigation: `config/content.json: header.links[label="Order Takeaway"]`
- Home page:
  - `config/content/pages/home.json: quickLinks["Menus & Takeaway"]`
  - `config/content/pages/home.json: hero.description` mentions takeaway nights
  - `config/content/pages/home.json: sections.features.items` mentions takeaway Fridays
  - `config/content/pages/home.json: sections.cta.description` mentions takeaway collections
- Menu page CTA: `config/content/pages/menu.json: hero.cta.order`
- Contact page:
  - `config/content/pages/contact.json: contactInfo.phone.description`
  - `config/content/pages/contact.json: features.items["Friday Nepalese takeaway"]`
- Events page: `config/content/pages/events.json: regularEvents["Takeaway Friday"]`
- About page: `config/content/pages/about.json: description` mentions takeaway
- Restaurant hours/notes: `config/restaurant.json: hours.display.friday`, `hours.notes[]`
- Global UI labels: `config/content/core/ui.json: buttons.orderTakeaway`
- Global content:
  - `config/content.json: global.ui.buttons.orderTakeaway`, `callTakeaway`, and SEO keyword `takeaway Cambridge`
  - `config/content.json: global.navigation.header.links[label="Order Takeaway"]`
  - `config/content.json: pages.takeawayMenu.seo` and usage of `/takeaway`
- Takeaway page:
  - `app/takeaway/page.tsx`: headings, badges, structured data, CTA buttons

## Reusable Patterns

- Content-first: copy sourced from `config/content/...` JSON where possible
- Page-level overrides for UI (e.g., dual CTAs in `/takeaway` page)

## Constraints

- Copy-only change (no fee logic). Dual CTAs should link to the same URL.
- Keep route `/takeaway` as-is; reword copy to “Collection & Delivery”.
- Add promo copy: “10% off Collection” and “Free delivery up to 3 miles, then £2/mile”.

## Open Questions (answered)

- CTAs: Use “Order for Collection” and “Order for Delivery”; both link to same URL ✓
- Scope: Replace “Takeaway” copy site-wide; add visible promos ✓

## Recommendations

- Centralize CTA labels in `config/content/core/ui.json` (add `orderCollection`, `orderDelivery`).
- Update `/takeaway` page to display two buttons with the same `orderHref`.
- Update relevant content JSON to reflect “Collection & Delivery”.

