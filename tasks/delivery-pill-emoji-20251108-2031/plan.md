# Implementation Plan: Delivery Pill Emoji Alignment

## Objective
Ensure the seasonal delivery promo banner keeps the 🚚 emoji visually adjacent to the "Delivery Service" pill (badge) on all breakpoints while preserving the existing message + CTA structure and accessibility.

## Success Criteria
- Emoji renders directly beside the pill in the same inline row on mobile and desktop widths.
- Banner copy, CTA link, and dataset/meta attributes remain unchanged.
- Component stays configurable via the JSON schema (non-engineers can continue adjusting spacing/classes).
- Unit tests for the banner continue to pass.

## Architecture Decisions
### Components
- `components/seasonal/SeasonalPromoBanner.tsx`
  - Introduce a `badgeGroup` wrapper that groups the badge pill and emoji inside a shared flex row.
  - Only render the group when either the badge text or icon exists, keeping guards consistent.
  - Continue to use `EmojiIcon` for accessible emoji rendering.

### Configuration
- `config/banners/seasonalPromoBanner.json`
  - Add `layout.badgeGroup` utility classes (e.g., `inline-flex items-center gap-2 text-brand-900`) so content editors can tweak spacing without touching JSX.
  - No other copy/meta fields change; we simply point the component to the new layout slot.

## Data Flow & State
- Seasonal promo JSON is imported once and destructured. The new `layout.badgeGroup` value will be read along with other layout tokens.
- Rendering order becomes: badge+emoji cluster ➜ message text ➜ CTA link.

## UI/UX Considerations
- The pill should remain visually prominent; wrapping emoji + badge inside an inline-flex row prevents undesired wraps.
- Maintain existing typography for the copy and CTA so the screenshot difference is limited to the emoji alignment.
- Ensure spacing still looks balanced on both small and large viewports (gap utility handles this).

## Edge Cases
- If future banners omit either the badge or emoji, the remaining element should still align without extra whitespace.
- Guard against double-rendering the emoji (remove it from the message group once moved next to the badge).
- Respect `sr-only` text for badges with `srLabel` so the announcement order stays logical.

## Testing Strategy
- Run `npm test -- SeasonalPromoBanner` (or the targeted Jest file) to ensure existing assertions still pass.
- Manual UI verification via dev server + Chrome DevTools per project requirements.
- Visual smoke check for mobile/desktop breakpoints to confirm emoji never wraps beneath the pill.
