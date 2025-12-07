# Implementation Checklist

## Content & Config
- [x] Remove order-online nav/link and takeaway link from `public/data/nav.json`, `config/content.json`, `config/content.min.json`, `config/content/core/global.json`.
- [x] Remove order-related UI labels/links (orderTakeaway/orderDelivery, links.takeaway) from core/global/marketing content (`config/content/core/ui.json`, `public/data/marketing.json`, `config/marketing.json`).
- [x] Strip slideshow `takeawayUrl` and order copy from `config/content/components/slideshow.json` (and synced slice in `config/content.json`).
- [x] Update seasonal promo/banner JSON + fixture to non-order messaging/link.

## Components
- [x] Simplify navbar link rendering (remove online-delivery special-case).
- [x] Update slideshow CTA logic (remove takeaway variant, prefer book/menu/call) and tidy SlideCTAButton types.
- [x] Remove unused online-delivery helper/redirect if no longer referenced.

## Pages
- [x] Update `app/about/page.tsx` to remove order-online CTAs.
- [x] Update `app/menu/page.tsx` hero/CTA list to avoid order-online labels/links.
- [x] Rework `app/takeaway/page.tsx` to remove online-order CTA (or retire route) and align copy.
- [x] Adjust sitemap/robots if `/takeaway`/`/online-delivery` paths are removed.

## Tests & Verification
- [x] Update `__tests__/components/SeasonalPromoBanner.test.tsx` (and fixture) to new copy/link; run targeted Jest.
- [ ] Manual QA with Chrome DevTools MCP: home (nav, slideshow, banner), about, menu, takeaway (if kept) to confirm no “Order Online” CTAs.
