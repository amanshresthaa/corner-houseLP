# Research: Centralize online delivery slug

## Existing Patterns
- Global navigation data comes from `config/content.json` (e.g., `global.navigation.header.links`) and `public/data/nav.json`. Both currently hard-code the full Touchtakeaway URL, so every consumer inherits the external link directly.
- CTA components (e.g., `components/slideshow/SlideCTAButton.tsx`) detect takeaway links by checking whether the href contains `touchtakeaway.net`, then override the emoji/label and force a new-tab `target`.
- `components/restaurant/NavbarParts.tsx` uses the same domain detection to style the "Order Online" button and choose between `<a>` (for external) vs `<Link>` (for internal), ensuring the takeaway CTA opens in a new tab with promo copy.
- The new `/online-delivery` redirect already exists inside `next.config.js`, so we can expose a friendly internal path that forwards to the Touchtakeaway store.

## Constraints / Considerations
- Requirement: the full `https://whitehorsecb25.touchtakeaway.net/store/2` URL must only appear inside `next.config.js` (redirect). All other references need to rely on `/online-delivery` (or other indirection) to keep marketing assets stable.
- Updating content sources to `/online-delivery` means all UI components will now see a relative path, so any logic that depended on detecting the external domain must be updated to look for the slug instead, while still opening in a new tab and preserving custom labels.
- Ensure there are no regressions on the `/takeaway` page—its CTA currently uses `orderHref` from content. After swapping to the slug it should continue opening in a new tab (since the component forces `target="_blank"`).

## Recommendations
1. Replace every content reference to the Touchtakeaway URL (`config/content.json`, `public/data/nav.json`, etc.) with `/online-delivery`.
2. Introduce a shared constant (e.g., `const ONLINE_DELIVERY_PATH = '/online-delivery';`) inside UI components that need special handling (slide CTA, navbar) so they can detect the slug without mentioning the external URL.
3. Treat `ONLINE_DELIVERY_PATH` as “external-like”: continue to open in a new tab and apply the same blueprint styling + aria labels.
4. After updates, run `rg 'touchtakeaway'` to ensure no runtime code mentions the provider, and re-run manual QA in Chrome DevTools to confirm header/nav CTAs still open the remote store via redirect.
