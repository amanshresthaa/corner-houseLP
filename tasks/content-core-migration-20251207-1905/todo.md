# Implementation Checklist

## Content Updates
- [x] Update `config/content/core/global.json` with Corner House identity, nav/footer, keywords, branding, and CTA links.
- [x] Refresh `config/content/core/accessibility.json` alt texts and descriptions to Corner House imagery.
- [x] Review `config/content/core/ui.json` for venue-specific wording; adjust CTAs if needed for Corner House booking/delivery.
- [x] Confirm `config/content/core/forms.json` remains accurate and venue-neutral.
- [x] Update `config/content/manifest.json` metadata (description/lastUpdated) to reflect Corner House migration without changing module structure.

## Validation
- [x] Ensure all modified JSON files are valid and lint-free (no trailing commas/typos).
- [ ] Spot-check key UI strings in app (if time) or via quick parse.

## Documentation
- [x] Note assumptions (booking URL, delivery CTA emphasis) in task notes.
- [ ] Prepare verification steps for DevTools QA if UI check needed.

### Assumptions Logged
- Online booking link set to `https://thecornerhousepub.co/book-a-table/` based on current website; replace if a dedicated widget/link is provided later.
- Delivery available via third-party apps (UberEats/Deliveroo/Just Eat) so delivery CTA kept; call-and-collect still supported via `takeaway` link.
- Social links use discoverable handles (`facebook` search URL, Instagram @cornerhousepub) until verified official URLs are supplied.
