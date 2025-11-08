# Implementation Checklist

## Content Updates
- [x] Replace Touchtakeaway URL with `/online-delivery` in `config/content.json` (nav links + global.links + collection cards).
- [x] Update `public/data/nav.json` to use `/online-delivery`.

## Component Logic
- [x] Introduce an `ONLINE_DELIVERY_PATH` helper inside `SlideCTAButton` and use it for label overrides + external-target behavior.
- [x] Update `NavbarParts` takeaway detection/open-in-new-tab logic to rely on the slug instead of the external domain.

## Validation
- [x] Run `rg 'whitehorsecb25.touchtakeaway.net/store/2' --glob '!tasks/**'` to confirm only `next.config.js` still references the external URL.
- [x] Run `rg 'touchtakeaway' --glob '!tasks/**'` to ensure runtime code no longer names the provider.
- [x] Manual QA with Chrome DevTools: header CTA + slideshow CTA still open the external ordering portal via redirect with no console errors.
- [x] `curl -I http://localhost:3002/online-delivery` (dev server) returns 308 to the external store.

## Questions/Assumptions
- Assume it’s acceptable for `/online-delivery` to remain an internal route that opens in a new tab (same UX as before).
- Assume no other components rely on the external domain name once slug detection is in place; if regressions appear, broaden slug constant usage.
