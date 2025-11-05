# Research: Add Online Link to Takeaway Menu Page

## Existing Page
- Path: `app/takeaway-menu/page.tsx`
- Buttons: Download Menu (PDF/JPG), Call to Order (tel:)
- Copy suggests calling to order.

## Centralized Link & Labels
- Online link: `global.links.takeaway` in `config/content.json`
- UI labels: `global.ui.buttons.orderTakeaway`, `global.ui.buttons.callToBook`

## Approach
- Make the page component async and fetch content via `getContentSmart()`.
- Read `links.takeaway` and conditionally render an "Order Takeaway" button opening in a new tab.
- Tweak paragraph to prefer online ordering (keep it short with emoji).
- Remove the `/takeaway` page since `/takeaway-menu` will host the CTA.
