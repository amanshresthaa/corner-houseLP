# Research: Centralize Hardcoded Copy

## Existing Patterns
- Global, page, and component copy is primarily in `config/content.json` with env overrides in `data/<env>/content.json`.
- Pages commonly load content via `getContentSmart()` from `src/lib/data/server-loader.ts`.
- Some pages export static `metadata` objects with hardcoded strings.
- UI fallbacks (e.g., button labels, loading strings) appear inline in pages.
- API routes return user-facing error messages directly as string literals.

## Files with Hardcoded Copy
- `app/menu/page.tsx` – metadata; fallback labels; loading placeholder.
- `app/contact/page.tsx` – metadata strings; CTA button labels ("Email Us", "Directions").
- `app/not-found.tsx`, `app/offline/page.tsx` – metadata strings.
- `app/api/stripe/create-checkout/route.ts`, `app/api/stripe/create-portal/route.ts` – API error messages.

## Relevant Content Structure
- Global labels/messages: `config/content.json:global.ui.buttons`, `global.ui.labels`, `global.ui.messages`.
- Page sections: `config/content.json:pages.menu`, `pages.contact`, `pages.offline`, `pages.notFound`.

## Constraints & Recommendations
- For dynamic import loading placeholders, prefer using content-config values to avoid literals.
- Metadata should be sourced via `generateMetadata()` functions pulling from content.
- Add any missing keys (e.g., `global.ui.buttons.emailUs`, `pages.menu.messages.loading`, per-page `seo`) to `content.json`.
- Keep fallbacks minimal and content-driven.

## Open Questions
- Should domain fallback values in `lib/restaurantData.ts` be centralized? (Out of scope for now; they are data fallbacks rather than UI copy.)

## Recommendation
- Add SEO and message keys to `config/content.json`.
- Refactor pages to use `generateMetadata()` and content-driven labels.
- Refactor API routes to read messages from `content.json`.

