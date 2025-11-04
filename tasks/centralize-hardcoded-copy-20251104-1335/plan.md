# Implementation Plan: Centralize Hardcoded Copy

## Objective
Move hardcoded user-facing strings into `config/content.json` and update pages/API to consume centralized content.

## Success Criteria
- All previously hardcoded SEO metadata sourced from content.
- UI labels and loading messages sourced from content.
- API user-facing messages sourced from content.

## Architecture
- Extend `config/content.json` with:
  - `global.ui.buttons.emailUs`
  - `pages.menu.seo` and `pages.menu.messages.loading`
  - `pages.contact.seo`
  - `global.ui.messages.checkoutDisabled`, `global.ui.messages.billingDisabled`
- Replace static `metadata` exports with `generateMetadata()` using `getContentSmart()`.
- Replace literal labels with content-driven values.
- For dynamic import loading placeholders, import JSON at build time.

## Component Breakdown
- Update: `app/menu/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx`, `app/offline/page.tsx`.
- Update API: `app/api/stripe/create-checkout/route.ts`, `app/api/stripe/create-portal/route.ts`.
- Content: modify `config/content.json`.

## Data Flow
Pages call `getContentSmart()` server-side to read page/global content and pass UI strings to components. API routes import content JSON for message strings.

## Testing Strategy
- Build compiles without TS/ESLint errors.
- Smoke run locally and verify labels/metadata appear from content.
- Manual QA with Chrome DevTools after starting dev server.

## Edge Cases
- Missing content keys: ensure safe fallbacks to nearby content keys (e.g., `global.ui.labels.loading`).

## Rollout
- Single PR with content and code changes.

