# Research: Eliminate Duplicate Restaurant Details

## Existing Data Sources
- `lib/restaurantData.ts` already normalizes identity, contact, address, hours, social links, booking URLs, etc. Consumers like the restaurant footer and booking page call `getRestaurantIdentity()`, `getContactInfo()`, and `getSocialMedia()` for authoritative data.
- `config/restaurant.json` and `config/content.json` are the underlying JSON sources used by the smart loaders (`getContentSmart`, `getMarketingSmart`, etc.). These give us the canonical copy of user-facing copy blocks and nav/footer metadata.
- Site-wide metadata helpers (`libs/seo.tsx`, `components/seo/RestaurantSchema.tsx`) now import from `restaurantData`, so structured data references already point at the canonical content.

## Duplicate Usage Hot Spots
Using ripgrep on key fields (phone, email, address, postcode, booking URLs) shows several hard-coded instances outside the shared helpers:

- **Legal/Content Pages**: `app/privacy-policy/page.tsx`, `app/tos/page.tsx`, and `app/wakes-menu/page.tsx` embed `oldcrown@lapeninns.com` directly in JSX. Their supporting hooks (`usePrivacyContent`, `useTOSContent`) also default to the same literal when fallbacks trigger.
- **Marketing Landing Pages**: `app/curry-and-carols-menu/page.tsx`, `app/wakes-menu/page.tsx`, `app/events/curry-and-carols/page.tsx`, and `app/press/page.tsx` sprinkle phone/email/address strings in CTA buttons and contact cards.
- **Navigation + CTA Components**: components such as `components/restaurant/TakeawayBanner.tsx`, `components/restaurant/LocationSection.tsx`, `components/StickyCallButton.tsx`, and `components/menu/MenuHero.tsx` recently migrated to the helpers for phones but still have inline mailto/tel fallback strings in certain branches (e.g., `mailto:oldcrown@lapeninns.com`).
- **Content Hooks**: `app/privacy-policy/_content/usePrivacyContent.ts` and `app/tos/_content/useTOSContent.ts` ship JSON-driven copy but bake fallback literals into the JS. Those fallbacks should defer to `restaurantData` so even error states stay current.
- **Tests & Fixtures**: Several MSW handlers and Jest tests hard-code restaurant identifiers. These can remain (they assert rendered content) but we should be aware that updates will require syncing expected strings.

## Constraints / Considerations
- Many pages are **Server Components**, so we can call synchronous helpers from `lib/restaurantData.ts` without extra async code. For Client Components we need to ensure bundling remains tree-shakeable; importing the helper is acceptable because it reads static JSON and exports plain JS objects.
- `getContactInfo()` / `getRestaurantIdentity()` return cloned objects; mutating them per page is safe. We should avoid re-fetching via async `getContentSmart()` unless we truly need nav-configured text (to keep SSR fast).
- Some CTAs require fallback copy when a field is missing (e.g., optional booking email). Our refactor should respect optional chaining, providing graceful defaults (empty string or `'#'`) instead of reintroducing hard-coded strings.
- Loading hooks (Privacy/TOS) run on the client. Importing from `restaurantData` pulls ~600 lines of normalised data into that bundle. We may consider passing the canonical email/phone via exported constants to avoid heavier bundling.

## Recommended Approach
1. **Utility Exports**: Add small helper exports in `lib/restaurantData.ts` (e.g., `export const PRIMARY_EMAIL = restaurantData.contact.email.primary;`) or re-use `getContactInfo()` directly to keep CTAs simple.
2. **Page Updates**: For each page containing phone/email/address strings, import `getContactInfo()`/`getRestaurantIdentity()` and replace literals with the canonical data (including `href` values such as `mailto:contact.email.primary`).
3. **Content Hooks**: Update fallback branches in `usePrivacyContent` and `useTOSContent` to read from the shared helpers so even offline fallbacks stay in sync.
4. **Structured Data / Buttons**: Ensure every CTA uses the canonical values, preserving existing aria labels and semantics.
5. **Regression Checks**: After refactors, run `pnpm run build` and targeted lint checks. Re-run the existing manual QA for a sample of updated pages.

## Open Questions / Assumptions
- **Scope**: Treat “zero duplication” as eliminating hard-coded contact/address identity details (phone, email, physical address, booking URLs, map links). Marketing copy that intentionally repeats brand wording (blog posts, hero text) is considered acceptable duplication.
- **Optional fields**: Some CTAs reference `contact.email.bookings`. Confirm fallback should become `contact.email.primary` rather than a hard-coded value when bookings email is missing.

This sets the stage for a plan that touches each of the identified pages/components, ensuring every reference resolves to a single source of truth.
