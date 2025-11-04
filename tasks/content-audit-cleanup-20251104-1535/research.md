# Research: Centralized Content Audit

## Objective
Audit centralized page-local content and remove redundant/unused entries (e.g., blog), consolidating duplicates left after modularization.

## Findings

- Central content file: `config/content.json` still contains:
  - `pages.blog` (SEO only) — no `/app/blog` route exists and not used by SSR.
  - `pages.offline`, `pages.notFound` — now served from modular content; SSR does not need these.
  - `pages.privacyPolicy` (SEO only) — used by SSR in `app/privacy-policy/page.tsx`.
- Modular manifest: `config/content/manifest.json` lists unused modules:
  - `modules.legal` → `legal/terms.json`, `legal/privacy.json` (duplicated with `config/content.json.legal` and modular `pages/tos.json`, `pages/privacy.json`). No code references the `legal/*` module.
  - `pages/signin.json`, `pages/dashboard.json` — no routes exist; not used in code.
- Sitemap excludes `"/blog", "/blog/*"` even though no blog routes exist.
- Schema (`src/lib/data/schemas.ts`):
  - Requires `pages.offline` and `pages.notFound` (z.record).
  - Accepts `pages.tos` via `TOSLooseSchema` (SEO only) but does not accept `pages.privacyPolicy` SEO-only. SSR reads `pages.privacyPolicy.seo`.

## Recommendations

- Remove `pages.blog` from `config/content.json`.
- Minimize `pages.offline` and `pages.notFound` to empty objects `{}` to satisfy schema while avoiding duplication.
- Keep `pages.privacyPolicy` (SEO-only) and add a `PrivacyLooseSchema` to tolerate it in schema.
- Drop unused `legal` module from manifest and delete `config/content/legal/*.json` (unreferenced duplicates).
- Remove `pages.signin.json` and `pages.dashboard.json` from manifest.
- Optionally trim blog paths from sitemap excludes to reduce noise.

## Impact
- No page routes depend on removed content; SSR SEO remains intact for Privacy/TOS.
- Modular hooks already supply offline/notFound/menu content.
- Tests reference components content (testimonials/faq/menuHighlights) — unchanged.

## Open Questions
- Do we want to remove blog-related code (APIs/hooks/components) later? Out of scope for this audit; proposed follow-up.

