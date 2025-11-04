# Research: Content Modularization

## Existing Patterns
- Central content: `config/content.json` merged with env overrides in `data/<env>/content.json` via `src/lib/data/loader.ts:91`.
- Modular content: `config/content/**` with manifest `config/content/manifest.json` and API under `/api/content/*`.
- Client hook `hooks/data/useContent.ts` supports modular (`NEXT_PUBLIC_USE_MODULAR_CONTENT=true`) or legacy API `/api/content`.
- Home page already reads centralized content with `getContentSmart()`: `app/page.tsx:16`.
- Menu page uses hybrid: local `app/menu/_content/menu-content.json` + centralized `@/config/content.json` merge in `app/menu/_content/useMenuContent.ts`.
- Not-found page uses local JSON only: `app/not-found/_content/not-found-content.json` via `useNotFoundContent.ts`.
- Dead content in TS: `app/_content/home-sections.ts` (no references).

## External Resources
- DaisyUI present; content schemas in `src/lib/data/schemas.ts` define allowed structure (e.g., `pages.menu` strict; `pages.notFound` is flexible).

## Technical Constraints
- `ContentSchema` validates `config/content.json`. Extra fields under `pages.menu` would fail parsing; `pages.notFound` is a permissive record.
- Client hooks should avoid static bundling of large JSON where possible; prefer `/api/content` via `useContent`.

## Recommendations
- Move not-found content into `config/content/pages/notFound.json` (safe due to flexible schema) and refactor hook to use `useContent` (no local JSON).
- Refactor menu content hook to use `useContent` and derive button/labels from centralized content + sane defaults; remove local JSON.
- Remove dead file `app/_content/home-sections.ts` to eliminate confusion.
