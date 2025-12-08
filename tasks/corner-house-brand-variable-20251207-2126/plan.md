# Implementation Plan: Brand Variable for Corner House

## Objective
Create a single source of truth for the venue name (“Corner House”) and update core configuration/metadata consumers to pull from that variable instead of hardcoded “White Horse” strings. This ensures future naming changes are centralized and prevents legacy branding from leaking into the UI, SEO, or tests.

## Architecture & Approach
1. **Brand Constants Module**
   - Add `src/lib/constants/brand.ts` exporting structured data:
     ```ts
     export const BRAND = {
       shortName: 'The Corner House',
       fullName: 'The Corner House Cambridge',
       teamName: 'The Corner House Team',
       slug: 'corner-house',
       domain: 'thecornerhousepub.co'
     };
     ```
   - Re-export helper aliases (e.g., `BRAND_NAME`, `BRAND_FULL_NAME`) for terse imports.

2. **Config & Environment Updates**
   - Update `config.ts` to import `BRAND` and use it for `appName`, descriptions, mailgun sender names, and domain data.
   - Replace hardcoded names inside `config/config.json` and `data/{dev,staging,prod}/config.json` with the new Corner House values (still literal JSON). These files remain the persisted representation but now mirror the constant content; future overrides can rely on `BRAND` when read programmatically.
   - Update schema defaults in `src/lib/data/schemas.ts` and environment helper entries in `src/lib/content/environment.ts` to derive from `BRAND`.

3. **App Shell / Metadata Consumers**
   - Import the brand constant in `app/layout.tsx`, `app/manifest.ts`, `public/sw.js`, `next-sitemap.config.js`, and `app/api/blog/content/route.ts` to remove White Horse literals in SEO metadata, manifest text, and sitemap hostnames.
   - Update shared components that surface the brand globally (Navbar logo alt text in `components/restaurant/NavbarParts.tsx`, Schema generator, etc.) to use `BRAND` exports.

4. **Tests & Utility Modules**
   - Update `test-utils/mocks/handlers.ts`, `types/blog.ts`, and representative Jest tests to import/use the same constant so assertions remain aligned.
   - Where modules build copy involving “The White Horse Waterbeach” (e.g., `components/restaurant/TestimonialsSection.tsx` or `src/lib/images.ts`), inject `BRAND.fullName` or derived strings instead of inline hardcoded text. (Future content rewrites can adjust the rest of the sentence, but the brand token will already be centralized.)

5. **Safety & Validation**
   - Because the variable is now the single source, running content loaders or tests after the change should surface any remaining White Horse references (search for the substring as a regression check).
   - Lint/tests: run `npm run lint` (acknowledge pre-existing failures) and note that brand-focused modules compile.

## Implementation Steps
1. Create `src/lib/constants/brand.ts` with the structure above plus helper exports.
2. Update `config.ts` to import `BRAND` and replace string literals; adjust mailgun/email senders accordingly.
3. Edit JSON configs (`config/config.json`, `data/*/config.json`) to set `metadata.appName` to “The Corner House Cambridge” and `domainName` to `thecornerhousepub.co`/`localhost` as appropriate.
4. Replace hardcoded strings in core app-shell files (layout, manifest, service worker, sitemap, blog API) with references to the new brand constants.
5. Update shared UI utilities/tests enumerated above to consume `BRAND`.
6. Run lint/tests, document any inherited failures, and summarize outstanding “White Horse” occurrences (e.g., archival docs) if they remain intentionally untouched.
