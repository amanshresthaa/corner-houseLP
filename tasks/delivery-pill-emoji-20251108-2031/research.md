# Research: Delivery Pill Emoji Alignment

## Initial Requirements & Success Criteria
- Move the delivery van emoji so it sits directly beside the "Delivery Service" pill instead of wrapping onto the next line on narrow viewports.
- Preserve the rest of the seasonal promo banner copy, CTA, and responsive behavior.
- Maintain accessibility semantics (badge text still announced once; emoji should remain decorative/labelled appropriately).

## Existing Patterns
- `components/seasonal/SeasonalPromoBanner.tsx` renders the banner using metadata from `config/banners/seasonalPromoBanner.json`. Structure today is: badge (pill) rendered first, then a `layout.primaryGroup` flex container that includes the emoji (`EmojiIcon`) and promo copy.
- `layout.container` in the JSON applies `flex flex-col ... md:flex-row`, which forces the badge and emoji/message stack vertically on small screens even though the badge is visually a pill.
- `EmojiIcon` (`components/common/EmojiIcon.tsx`) already wraps emoji output with accessible markup. It can be safely placed inside other inline-flex containers.

## External Resources
- N/A (no third-party docs needed; behavior controlled entirely via local component + JSON classes).

## Technical Constraints & Considerations
- Project instructions prioritize DaisyUI components: the badge already leverages DaisyUI’s `badge` class, so changes should extend that markup rather than replace it.
- Any layout adjustment should remain mobile-first and continue to respect the `layout` tokens in the JSON so non-technical collaborators can tweak styling later.
- We should avoid duplicating `EmojiIcon` rendering (badge + message) unless we also make the JSON expressive enough to configure placement.

## Recommendations
- Introduce a small wrapper in `SeasonalPromoBanner` that groups the badge and emoji in the same inline-flex row (e.g., `flex items-center gap-2`).
- Continue rendering the promo copy beneath/in the primary group to keep typography intact.
- Keep the emoji decorative (current config omits `srLabel`), so moving it next to the pill will not impact screen readers.
- Update styles via JSON or component-level utility classes so editors can still adjust spacing without code changes.
