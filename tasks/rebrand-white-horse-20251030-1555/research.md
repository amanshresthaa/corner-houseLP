# Research: Rebrand To The White Horse

## Existing Patterns
- Brand, contact, and address data flow from `config/restaurant.json`, normalized via `lib/restaurantData.ts`, then consumed across pages/components (`Layout`, `Footer`, booking cards, structured data helpers).
- Image paths and alt text are centralized in `src/lib/images.ts`; tests assert specific alt copy (e.g., `MenuItemCard` uses `The White Horse Waterbeach`).
- App-wide metadata and email branding rely on `config.ts`, `src/lib/content/environment.ts`, and `public/sw.js` comment headers.
- Content pages (blog, events, legal, offline/not-found) embed venue name/location strings directly; several tests in `__tests__` and `tests/` assert the The White Horse copy.
- Previous task `eliminate-duplicate-content-20251030-1521` consolidated runtime address/contact helpers (`getPostalAddressSchema`, `getFormattedAddress`) inside `lib/restaurantData`.

## External Resources
- Source of truth for new identity: `Everythingyouneed/whitehorseinformation.md` (covers name, contact methods, address, hours, amenities, press, copy angles, reviews).
- Supplemental assets/documents listed in `Everythingyouneed` (images directory, color palette, page blueprints) already reference White Horse styling.

## Technical Constraints
- Must preserve schema expected by `RestaurantSchema` and its consumers (tests rely on default data when config parsing fails).
- Hours table in doc separates brunch/lunch/dinner blocks; need to map to existing `DetailedHours` structure (`kitchen`, `bar`, `display`, optional notes).
- Site uses DaisyUI/Tailwind; no global find/replace without checking components using markup like `The White Horse Waterbeach` (e.g., alt text with location context) to avoid regressions.
- Many snapshots/unit tests assert exact strings; updates require aligning fixtures to new copy to keep CI passing.
- `approval_policy` is `never` → cannot request elevated commands; must work entirely within local capabilities.

## Recommendations
- Replace all config/normalizer fallbacks first (`config/restaurant.json`, `lib/restaurantData` constants, `config.ts`, `src/lib/data/schemas.ts`) using data from `whitehorseinformation.md` to ensure downstream consumers get new values.
- Update shared helpers (`getPostalAddressSchema`, alt text, image descriptions) to Waterbeach/White Horse context.
- Audit `public/images` for The White Horse-specific assets; if no White Horse replacements exist yet, keep filenames but adjust alt copy while queuing asset rename separately.
- Perform targeted content updates page-by-page (events, blog intros, legal footers) ensuring narratives align with White Horse story; leverage sections in doc for authentic copy.
- Synchronize automated tests and mock data to new branding to avoid brittle failures.
- After implementation, run `pnpm run build` to confirm Next.js compiles with the updated data model.
