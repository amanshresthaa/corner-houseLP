# Implementation Plan: Update Delivery/Takeaway Link

## Objective
Ensure every "Order Online"/delivery CTA directs users to `https://whitehorsecb25.touchtakeaway.net/store/2` by updating the centralized content sources.

## Success Criteria
- [ ] No remaining references to the old `/menu` path in active config files.
- [ ] Nav and CTA buttons across pages resolve to the new `/store/2` URL.
- [ ] Automated or manual checks confirm site builds cleanly (at minimum, TypeScript linting via `next lint` or targeted checks if needed).

## Architecture
### Content Sources
- `config/content.json`: primary CMS-like file for nav and global links; updating here feeds Next.js pages and components.
- `public/data/nav.json`: static navigation fallback that should mirror the same destination.

### Data Flow
1. Pages/components import structured content (e.g., `app/menu/page.tsx`, `components/restaurant/NavbarParts.tsx`) through helper loaders.
2. `global.links.takeaway` flows into CTAs, meta tags, and structured data; nav arrays generate header/footer menus.
3. Updating the JSON values propagates through next build without further code changes.

## Component Breakdown
- Update nav entry object under `config/content.json.nav.links` for "Order Online".
- Update `global.links.takeaway` and any `takeawayUrl` fields referencing the old string.
- Update `public/data/nav.json` entry labeled "Order Online".

## UI/UX Considerations
- Link text remains unchanged; only destination updates, so there is no visual impact.
- Ensure new link continues to open externally (handled automatically by existing logic detecting `touchtakeaway.net`).

## Testing Strategy
- Run `rg "whitehorsecb25.touchtakeaway.net/menu"` after edits to confirm removal.
- Optionally run targeted unit tests or lint if time permits (change is config-only, so smoke testing may suffice).
- Manual verification later via Chrome DevTools once deployed/local preview is available per verification phase requirements.

## Edge Cases
- Cached content/components referencing old data; ensure every known config occurrence updates to prevent inconsistent CTAs.
- Validate JSON remains well-formed (commas/trailing braces) to avoid build failures.

## Rollout Plan
- Modify JSON files.
- Re-run content search to ensure consistency.
- Commit once validated (outside scope of this plan but recommended).
