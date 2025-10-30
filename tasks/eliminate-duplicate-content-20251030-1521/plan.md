# Implementation Plan: Zero Duplicate Restaurant Contact Details

## Objective
Replace all hard-coded restaurant identity/contact/address/map literals in runtime code with references to the canonical helpers in `lib/restaurantData.ts`, eliminating duplicate sources of truth while preserving existing UI copy and behaviour.

## Success Criteria
- [ ] No production component or page contains literal phone numbers, booking emails, or full address strings; all resolve through `getContactInfo()`/`getRestaurantIdentity()`/`getSocialMedia()` or derived helpers.
- [ ] All map, tel, and mailto links derive from the shared data structure.
- [ ] `pnpm run build` passes without new type/lint errors.
- [ ] Manual QA spot-check confirms key pages render the expected data.

## Architecture & Touchpoints
- **Helpers**: Optionally expose convenience constants (e.g. `getPrimaryEmail()` or exported `PRIMARY_EMAIL`) from `lib/restaurantData.ts` to simplify client-side imports.
- **Server Pages**: Update CTA-heavy pages (`app/wakes-menu/page.tsx`, `app/curry-and-carols-menu/page.tsx`, `app/events/curry-and-carols/page.tsx`, `app/press/page.tsx`, `app/contact/page.tsx`, `app/privacy-policy/page.tsx`, `app/tos/page.tsx`, etc.) to load contact data at the top and use it for all occurrences.
- **Client Utilities**: Adjust `usePrivacyContent`/`useTOSContent` fallback payloads to ingest canonical email/phone values.
- **Shared Components**: Ensure CTA components (`StickyCallButton`, `TakeawayBanner`, `SocialMediaSection`, etc.) reference the helpers and remove inline literal fallbacks.

## Implementation Steps
1. **Helper Enhancements** (if needed)
   - Provide simple exported getters or constants from `restaurantData` for phone/email/address strings to simplify reuse in client-side code.

2. **Refactor Server Components**
   - Iterate through high-value pages (Wakes, Curry & Carols, Privacy Policy, TOS, Press, Events) replacing literal contact/address values.
   - Ensure accessibility labels and structured data continue to render meaningful text after substitution.

3. **Update Client Hooks / Components**
   - Modify `usePrivacyContent` and `useTOSContent` to consume canonical contact details for fallbacks.
   - Review CTA components for any lingering literals (e.g., `mailto:` or `tel:` strings) and swap them for data-driven values.

4. **Validation**
   - Run ESLint on touched files.
   - `pnpm run build` to ensure type safety.
   - Manual QA via DevTools on at least two marketing/legal pages to verify updated data renders correctly.

## Edge Cases & Testing
- Handle missing optional fields gracefully (`contact.email.bookings` may be null). Default to `contact.email.primary` rather than a literal.
- Ensure JSON-based content (privacy/TOS) still loads successfully after we inject dynamic values.
- Watch for jest/MSW fixtures that expect literal strings; adjust assertions or document if they fail.

## Rollout
- Single PR once verified locally. Document the now-centralized usage in task logs for future contributors.
