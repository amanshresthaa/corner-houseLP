# Implementation Plan: Online delivery slug unification

## Objective
Ensure every in-app CTA references `/online-delivery` instead of the raw Touchtakeaway URL, leaving `next.config.js` as the single place that knows the external destination.

## Success Criteria
- [ ] All JSON/content sources use `/online-delivery` for takeaway/order links.
- [ ] UI components that previously detected `touchtakeaway.net` now use the slug constant and still open in a new tab with the correct copy.
- [ ] `rg 'touchtakeaway'` (outside of task docs and `next.config.js`) returns no matches.
- [ ] Manual QA confirms header and slideshow CTAs continue to reach the external ordering portal via redirect.

## Architecture / Approach
1. **Content normalization**: Update `config/content.json` and `public/data/nav.json` to point to `/online-delivery`. These feed most UIs, so downstream components automatically adopt the slug.
2. **UI detection updates**:
   - `SlideCTAButton`: add a reusable `ONLINE_DELIVERY_PATH` constant, treat that path as a takeaway link (label override + new-tab behavior) even though it is not `http`.
   - `NavbarParts`: use the same constant to mark “Order Online” as the takeaway CTA, ensure the blueprint button opens in a new tab, and drop the regex that looked for the external domain.
3. Keep `next.config.js` redirect unchanged (already present) but re-run `rg` afterwards to confirm it’s the only place storing the full URL.

## Data Flow + Edge Cases
- Clicking `/online-delivery` should still navigate immediately because Next serves a 308 redirect to the Touchtakeaway store; query params should be preserved automatically.
- Need to ensure `Link` vs `<a>` logic doesn’t break keyboard focus or SSR when using an internal path that opens in a new tab. We'll keep using `<Link>` but explicitly set `target`/`rel` when the slug is detected.
- Consider future seasonal nav entries: detection should rely on slug + label regex so we don’t regress when copy changes.

## Testing / Verification
- Run `rg 'whitehorsecb25.touchtakeaway.net/store/2'` and `rg 'touchtakeaway' --glob '!tasks/**'` to confirm the external reference only exists inside `next.config.js` (and historical task notes).
- Start `npm run dev`, load `/online-delivery`, `/` (navbar), and slideshow CTAs with Chrome DevTools MCP to ensure redirects still fire and no console errors appear.
- Use `curl -I http://localhost:3000/online-delivery` (or whichever dev port) to confirm the route still returns a 308 to the external store.
