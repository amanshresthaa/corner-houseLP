# Implementation Plan: Content Modularization

## Objective
Consolidate page content into the modular `config/content/**` system, remove duplicated app-local JSON/TS content, and have client hooks consume centralized content via `useContent`.

## Success Criteria
- [ ] Not-found content lives in `config/content/pages/notFound.json` and is read via `useContent`.
- [ ] Menu content reads from centralized content only; no local JSON fallback.
- [ ] Dead local content file for home sections removed.
- [ ] App builds without schema validation errors.

## Architecture
- Central store: `config/content.json` + `config/content/**` manifest/modules.
- Client data: `hooks/data/useContent` (modular when `NEXT_PUBLIC_USE_MODULAR_CONTENT=true`, else `/api/content`).

## Components/Files
- Update: `config/content/pages/notFound.json` (merge full UI copy).
- Refactor: `app/not-found/_content/useNotFoundContent.ts` to use `useContent`.
- Refactor: `app/menu/_content/useMenuContent.ts` to use `useContent` and defaults.
- Remove: `app/not-found/_content/not-found-content.json` and `app/menu/_content/menu-content.json`.
- Remove: `app/_content/home-sections.ts` (unused).

## Data Flow
Client hooks fetch `/api/content` or modular composition; selectors pull `pages.notFound`, `pages.menu`, and `global.ui`.

## Testing Strategy
- Type-check and build locally.
- Manual QA: verify not-found and menu render without errors.

## Edge Cases
- Missing fields in centralized content → provide sane defaults in hooks.

## Rollout
- Behind environment flag naturally; no production toggles required.
