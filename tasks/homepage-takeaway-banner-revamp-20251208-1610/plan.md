# Implementation Plan: Takeaway Banner Revamp

## Objective
Transform the simple Takeaway banner into a richer promo block that showcases hotline ordering, menu links, and takeaway perks with a modern layout that matches the refreshed homepage.

## Architecture
- **TakeawayBanner.tsx**
  - Maintain `getContactInfo()` data usage; derive tel link via helper.
  - Layout: gradient background with grid splitting copy/hero image on large screens, stacking on mobile.
  - Left column: eyebrow pill, bold headline referencing `BRAND.nickname`, supporting text, CTA button group (Call, View menu, Order online). Add highlight stats or steps (ready time, coverage, partners) using DaisyUI badges.
  - Right column: hero image (use existing dish asset) framed with gradient + floating badge showing prep time or hotline hours.
  - Add `data-testid` hooks for tests (e.g., `takeaway-banner-cta`, `takeaway-highlight-grid`).
  - Use lucide icons for CTAs/highlights.

## Styling Guidelines
- Use DaisyUI `btn` and `badge` classes layered with brand colors for consistency with other sections.
- Provide accessible focus states and aria labels (e.g., for external partner link if added).
- Ensure text contrast against gradient background.

## Testing
- Create `tests/components/restaurant/TakeawayBanner.test.tsx` (or similar) to verify:
  - Headline renders with brand nickname.
  - Phone CTA uses sanitized `tel:` link and shows correct text.
  - Additional CTAs (menu/order) have expected hrefs.
  - Highlight chips count matches configured array.
  - Hero image container renders (even if fallback).

## Verification
- After implementation, run targeted Jest test plus `npm run test -- --selectProjects=client --testPathPattern=TakeawayBanner`.
- Manual QA later via DevTools MCP covering responsiveness and interactions.
