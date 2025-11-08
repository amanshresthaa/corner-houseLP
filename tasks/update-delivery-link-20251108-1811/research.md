# Research: Update Delivery Link

## Existing Patterns
- `config/content.json` centralizes global navigation. Before this change, the primary "Order Online" nav item and `global.links.takeaway` both referenced `https://whitehorsecb25.touchtakeaway.net/menu` (see `config/content.json:51` and `config/content.json:192`).
- Content sections (hero slides, showcase data) provide optional `takeawayUrl` overrides, which likewise pointed at the same `menu` URL (e.g. `config/content.json:968`, `:1029`, `:1049`).
- Static navigation JSON under `public/data/nav.json` duplicates the same URL for the "Order Online" label, likely used for static builds or fallbacks.
- Components such as `app/takeaway/page.tsx` and `app/menu/page.tsx` read the `links.takeaway` value to wire CTA buttons and structured data, so updating the central link should automatically propagate.
- `components/slideshow/SlideCTAButton.tsx` detects Touchtakeaway links by domain for labeling and target behavior; the new `/store/2` path still matches the `touchtakeaway.net` domain and therefore needs no behavioral change.

## External Resources
- None required; change is internal configuration.

## Technical Constraints
- Maintain existing JSON schema (no new keys) so that content loaders remain compatible.
- Ensure every instance referencing the old URL updates in lockstep to avoid mixed destinations between nav menus, CTAs, and slides.

## Open Questions
- Should historical documentation under `tasks/...` be updated? (Assumption: no—only functional assets need changing.)

## Recommendations
- Update the canonical source(s) of the takeaway/delivery link in `config/content.json` (`global.links.takeaway`, nav entry, and slide-specific `takeawayUrl` values).
- Mirror the change in `public/data/nav.json` so both navigation data sources stay aligned.
- No component-level code changes appear necessary because matching remains domain-based.
