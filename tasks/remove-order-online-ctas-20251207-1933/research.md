# Research: Remove order-online CTAs

## Initial requirements (from request)
- Remove the “Order Online” item from the navigation bar.
- Remove any CTA (button/link/banner/slide/etc.) that invites users to order online across the whole repo.

## Success criteria draft
- Header/mobile nav renders with no “Order Online” link.
- No buttons/links/labels on any page point to `/online-delivery`, `/takeaway`, or other online-order URLs, nor show “Order Online/Takeaway” text.
- Seasonal/marketing banners and slides no longer promote online ordering.
- Tests updated to reflect the removed CTAs; no failing Jest/Playwright snapshots due to missing links.
- Content/config files no longer surface online-order URLs or labels; UI still offers booking/menu/call options without broken layouts.

## Existing patterns & locations
- **Navigation data**: `public/data/nav.json` and `config/content.json` (`global.navigation.header.links`) include `{ href: "/online-delivery", label: "Order Online" }`. `components/restaurant/NavbarParts.tsx` consumes these via `useNavContent`, and applies special styling for takeaway links using `isOnlineDeliveryHref` from `utils/onlineDelivery.ts`.
- **Global links & labels**: `config/content.json` and `config/content/core/global.json` set `links.takeaway: "/online-delivery"`; UI strings include `buttons.orderTakeaway` / `orderDelivery` etc. Minified copy in `config/content.min.json`; marketing buttons in `public/data/marketing.json` include `orderTakeaway` text.
- **Slideshow**: Data in `config/content/components/slideshow.json` and `config/content.json` provides `ctas.takeawayUrl` for multiple slides. Components `components/slideshow/DaisyUISlideshow.tsx` (CTA sequence includes `takeaway` variant) and `SlideCTAButton.tsx` label takeaway buttons as “Order Online”. Fallback `links.takeaway` is passed from `ClientHomeContent` → `Showcase`.
- **Seasonal promo banner**: `config/banners/seasonalPromoBanner.json` (and test fixture `__tests__/components/seasonalPromoBanner.json`) exposes a CTA `href: "/online-delivery"`, label “Order for delivery or collection”. Tests in `__tests__/components/SeasonalPromoBanner.test.tsx` assert this.
- **Dedicated ordering page**: `app/takeaway/page.tsx` is a hero/CTA for online ordering (schema points to `links.takeaway`).
- **Other page CTAs**:
  - `app/about/page.tsx` has hero CTA to `/takeaway` and “What we do” card “Order Online”.
  - `app/menu/page.tsx` hero renders “Order Online” / `/takeaway` CTA plus menu CTA list includes `text: 'Order Online', href: '/takeaway'`.
  - `app/menu/_content/useMenuContent.ts` keeps `orderTakeaway` button metadata (defaults to phone if no link).
- **Redirect**: `next.config.js` defines permanent redirect `/online-delivery → https://whitehorsecb25.touchtakeaway.net/store/2`.
- **Utilities**: `utils/onlineDelivery.ts` detects `/online-delivery` to force new-tab behavior in nav/slideshow buttons.
- **Sitemap/robots**: `next-sitemap.config.js` and `app/robots.ts` list `/takeaway` route.

## Technical constraints / conventions
- DaisyUI + Tailwind components; prefer extending existing components rather than new bespoke ones.
- Mobile-first, accessibility, focus-visible requirements; maintain keyboard nav in nav/sliders/banners.
- Manual QA with Chrome DevTools MCP is mandatory in verification phase.

## Open questions / assumptions
- Should the `/takeaway` page be removed entirely or repurposed (e.g., to call-only) to avoid online-order CTAs? (Assuming removal/neutralization is acceptable.)
- Keep `/online-delivery` redirect for backward compatibility even if no UI links point to it? (Lean toward removing to avoid hidden CTA.)

## Recommended approach (preliminary)
- Centralize removal in content first: strip takeaway link/labels from `config/content*.json`, slideshow data, nav JSON, marketing/banner JSON, and global `links.takeaway`.
- Update components to drop `takeaway` CTA paths/variants (e.g., adjust slideshow CTA sequence, remove `isOnlineDelivery` special cases, simplify nav styling).
- Remove or neutralize `/takeaway` page and related CTA entries in pages (about/menu) to avoid dangling references.
- Update tests/fixtures to new non-ordering expectations.
- Re-run lint/tests; perform DevTools QA ensuring nav/banner/slideshow/menu/about no longer show online-order CTAs.
