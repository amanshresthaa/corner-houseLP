# Content JSON Sources (Authoritative & Fetchable)

This document lists every JSON file that is fetched or composed for runtime content, grouped by responsibility. It reflects the current modular pipeline (manifest-driven, env-aware) and notes how each file is consumed. Use this as the source-of-truth index when adding or auditing content.

## Core (always loaded)
- **config/content/core/global.json** — Site identity, branding, primary navigation (header/footer), global links, SEO keywords.
- **config/content/core/ui.json** — UI labels, buttons, messages, placeholders used across pages/components.
- **config/content/core/accessibility.json** — ARIA labels, alt texts, accessibility descriptions.
- **config/content/core/forms.json** — Form labels, validation rules, and user-facing form messages.
- **config/content/manifest.json** — Module map, load strategy, cache durations, mount paths, and env override locations.

## Pages (lazy-loaded per route)
- **config/content/pages/home.json** — Homepage hero, features, quick links, CTA section, optional SEO.
- **config/content/pages/about.json** — About hero, story/timeline, CTA/contact block.
- **config/content/pages/contact.json** — Contact hero, contact info, hours, optional feature list.
- **config/content/pages/events.json** — Events hero, regular events list, contact CTA, optional SEO events.
- **config/content/pages/menu.json** — Menu hero (book/order CTAs), page copy, allergen notice.
- **config/content/pages/privacy.json** — Structured privacy policy content.
- **config/content/pages/tos.json** — Terms of service content.
- **config/content/pages/offline.json** — Offline page strings.
- **config/content/pages/notFound.json** — 404 page strings.
- **config/content/pages/signin.json** — Sign-in page copy.
- **config/content/pages/dashboard.json** — Dashboard placeholder copy.

## Components (lazy-loaded when rendered)
- **config/content/components/slideshow.json** — Slideshow settings and slides (images, alt, copy, badges, CTAs).
- **config/content/components/testimonials.json** — Testimonials title/subtitle/items.
- **config/content/components/faq.json** — FAQ title/subtitle/items.
- **config/content/components/menuHighlights.json** — Menu highlight data for featured menu components.

## API Content (conditional/admin)
- **config/content/api/messages.json** — System/API user-facing messages.
- **config/content/api/errors.json** — Structured API error strings grouped by domain (menu/restaurant/marketing/config/auth/payment/etc.).

## Legal (lazy)
- **config/content/legal/terms.json** — Legal terms metadata (title, effective date, contact).
- **config/content/legal/privacy.json** — Legal privacy metadata.

## Environment Overrides (module-scoped)
Overrides are named by module ID and applied on top of base modules for each environment.
- **config/content/environments/dev/overrides/core/ui.json** — Dev-only UI/debug messages.
- **config/content/environments/staging/overrides/core/global.json** — Staging site name/description.
- **config/content/environments/staging/overrides/core/ui.json** — Staging warning message.
- **config/content/environments/prod/overrides/core/global.json** — Prod-specific site description.

Legacy env overrides still merged after modular composition (for parity until removed):
- **data/dev/content.json**, **data/staging/content.json**, **data/prod/content.json** — Deep-merged overrides for their respective env chains.

## Generated Artifacts (do not hand-edit)
- **config/content.json** — Generated monolith from modules for backward compatibility; built via `npm run content:build`.
- **config/content.min.json** — Minified build for optimized delivery; built via `npm run content:build:min`.

## Other runtime content feeds
- **menu/*.json** — Menu category data (starters, mixed_grills, speciality, authentic_dishes, naans, fries, rice, pub_grub, pub_classics, salads, sides, kids_menu, desserts, all); ingested by menu loader.
- **config/marketing.json** — Marketing fallback content (promos/cta copy).
- **config/restaurant.json** — Restaurant metadata (contact, hours, description).

## Legacy public JSON (no longer fetched directly; mapped via modular content)
- **public/data/nav.json**
- **public/data/home.json**
- **public/data/marketing.json**
- **public/data/footer.json**

> Status: these remain in the repo but `useParsedData` now derives nav/footer/marketing/home from modular content, so they are no longer fetched at runtime. Safe to delete once tests/rollout confirm no residual consumers.

## Fetch & API behavior summary
- `/api/content` serves composed content; supports `?fields=a,b.c` to return only requested sections. ETags/Last-Modified computed on filtered payload. Prefers `config/content.json` (generated) which is sourced from modules.
- `/api/content/modules/:moduleId` serves individual modules (mountPath applied) per manifest; env overrides applied via module-id JSON in `config/content/environments/*/overrides/`.
- Client hooks (`useContent`, `useModularContent`, `useParsedData`) now read from the modular composition; no `.md` or non-JSON sources are fetched.

## Maintenance tips
- Update modules under `config/content/**`; run `npm run content:build:min` to regenerate artifacts.
- Keep manifest in sync with added/removed module files; `__tests__/content/manifest-files.server.test.ts` will fail if a manifest file is missing or non-JSON.
- Remove `public/data/*.json` after confirming no tests or legacy code depend on them.
