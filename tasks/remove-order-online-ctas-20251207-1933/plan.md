# Implementation Plan: Remove online-order CTAs

## Objective
Eliminate the “Order Online” navigation item and all online-order CTAs (buttons, slides, banners, links) across the site while keeping booking/menu/call paths intact and layouts stable.

## Success Criteria
- Header + mobile nav no longer show an “Order Online” link.
- No buttons/links anywhere point to `/online-delivery`, `/takeaway`, or external ordering portals; no “Order Online/Takeaway” labels remain.
- Home slideshow, seasonal banner, about/menu pages, marketing content, and tests reflect the removal without layout regressions or broken ARIA.
- Build/tests pass; manual QA confirms UI works with booking/menu/call CTAs only.

## Architecture / Scope
- Content sources drive most CTAs: `config/content*.json`, `config/content/components/slideshow.json`, `public/data/nav.json`, `config/banners/seasonalPromoBanner.json`, `config/marketing.json`, `public/data/marketing.json`.
- Components to adjust so they don’t expect takeaway links: `NavbarParts`, slideshow (`DaisyUISlideshow`, `SlideCTAButton`, types), `Showcase`, `SeasonalPromoBanner`, page components (`app/about`, `app/menu`, `app/takeaway`).
- Remove redirect/helper that exists solely for online ordering (`/online-delivery` in `next.config.js`, `utils/onlineDelivery.ts`) if unused after cleanup.

## Component Breakdown
1. **Navigation**: Remove order link from nav data and strip online-delivery special styling logic.
2. **Slideshow**: Drop `takeaway` variant + fallback; use book/menu/call CTAs only and prune `takeawayUrl` data.
3. **Banners/Marketing**: Reword seasonal promo + marketing data to non-order messaging; update fixtures/tests accordingly.
4. **Pages**:
   - `about`: remove “Order Online” CTA and card.
   - `menu`: remove takeaway CTA(s) and labels; ensure hero still has sensible CTAs (book + call/menu).
   - `takeaway`: replace or remove online-order content; if kept, make it an info/call section without online links.
5. **Config/Globals**: Remove `links.takeaway` and order-specific UI labels from global/core/marketing content (both pretty and minified copies).
6. **Redirect/Utility**: Remove `/online-delivery` redirect and `utils/onlineDelivery` if no longer referenced.
7. **Tests**: Update SeasonalPromoBanner test (and any others) to new copy/links; run targeted tests.

## Data Flow Notes
- `ClientHomeContent` passes `links.takeaway` to slideshow; after removing, slideshow must handle `undefined` gracefully.
- `useNavContent` reads `nav.json` then `content.global.navigation.header.links`; removing the order link there removes it everywhere.

## UI/UX Considerations
- Keep two CTA buttons where design expects them (slideshow, menu hero) by falling back to booking/menu/call instead of order.
- Preserve DaisyUI styling and focus-visible outlines; ensure external links keep `target/rel` where needed.
- Update copy to avoid “order online/takeaway/delivery” phrasing; prefer booking or visit messaging.

## Testing Strategy
- Targeted Jest: `__tests__/components/SeasonalPromoBanner.test.tsx` (after update).
- Manual QA (DevTools MCP mandatory): Home (nav, slideshow, banner), About, Menu, any leftover CTA surfaces; verify no “Order Online” text or links.

## Edge Cases
- Ensure removing `links.takeaway` doesn’t break null checks; default CTAs should still render book/menu/call.
- Remove or rewire `/takeaway` route references in sitemap/robots to avoid dead links if page removed.
- Avoid leaving `Order Online` in structured data or schema.

## Rollout Plan
- Content + component updates → adjust tests → run targeted tests → manual QA with DevTools.
