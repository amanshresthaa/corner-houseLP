# Implementation Plan: Delivery Minimum Messaging

## Objective

Ensure all delivery-facing messaging mentions the £20 minimum order requirement alongside existing promo details.

## Success Criteria

- [x] Messaging clearly states delivery minimum of £20
- [x] Copy matches site tone and style
- [x] No layout regressions introduced

## Architecture

### Components / Pages

- `app/takeaway/page.tsx` hero promo copy
- `config/marketing.json` promo body consumed across homepage/other surfaces
- `config/content/components/faq.json` delivery FAQ answer
- `components/restaurant/NavbarParts.tsx` `Order Takeaway` CTA aria-label and microcopy

### State Management

_N/A_

### Data Flow / APIs

_N/A_

## UI/UX Considerations

- Keep messaging concise to avoid wrapping issues in hero promo and nav blueprint tag.
- Use en dash or separators consistent with existing style (middle dot `·`).
- Maintain accessible wording; ensure aria-label remains clear with new info.

## Implementation Steps

1. Update takeaway hero promo line to include £20 delivery minimum.
2. Revise marketing promo copy to include minimum order note.
3. Amend FAQ delivery answer to mention £20 minimum alongside pricing info.
4. Adjust navigation CTA aria-label and corner note text to mention £20 minimum without overcrowding.
5. Review for other references; ensure formatting is consistent and run lint/tests if applicable.

## Edge Cases

- Promo copy must remain legible on small screens; check wrapping.
- Nav blueprint microcopy must not overflow or become unreadable at xs breakpoint.
- Ensure JSON encoding properly escapes the pound symbol.

## Testing Strategy

- Visual inspection of takeaway page, homepage promo card, nav CTA, and FAQ.
- Run existing tests if any touched files require it (lint/unit as needed).
- Manual QA via Chrome DevTools per project requirement.

## Rollout Plan

- No feature flag required; changes go live with next deployment once validated.
