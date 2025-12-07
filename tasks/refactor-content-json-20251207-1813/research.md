# Research: Refactor & modularize content JSON

## Current state
- **Monolith still primary:** `config/content.json` is the source of truth; server loader `src/lib/data/loader.ts#getContentSmart` only reads `config/content.json` + env overrides in `data/<env>/content.json` (deep merge) → no use of `config/content/**` modules.
- **Modular files exist but unused:** `config/content/core/*.json`, `pages/*.json`, `components/*.json`, `api/*.json`, `environments/**` etc. contain overlapping/older content. Not merged anywhere in runtime.
- **Manifest mismatch:** `config/content/manifest.json` defines modules as high-level buckets (`core`, `pages`, `components`, `forms`, `api`) with `files` arrays listing many JSON files. The modular hook (`hooks/data/useModularContent.ts`) and modules API expect module IDs like `pages/home`, `core/global`, matching `docs/MODULAR-CONTENT-USAGE.md`—current manifest structure won’t satisfy those calls.
- **Module API behavior:** `/api/content/modules/[moduleId]` reads manifest.modules[moduleId], merges its `files`, then applies env overrides by looking for `<overridePath>/<moduleId>.json` (e.g., `environments/prod/overrides/pages/home.json`). Current env override files (`dev/debug.json`, `staging/overrides/testing.json`, `prod/overrides/performance.json`) do not follow this pattern, so overrides are never applied.
- **Manifest endpoint:** `/api/content/manifest` returns the manifest and can inject additional/excluded modules per env, but the manifest itself isn’t aligned to per-module entries.
- **Client modular hook:** `useModularContent` builds module IDs from manifest and callers (examples use `pages/home`), composes them via manifest.composition. Today composition will fail to load intended modules because IDs don’t exist in manifest.
- **Public JSON & legacy hooks:** Client components (`Hero`, `NavbarParts`, `Footer`, `StickyCallButton`) read `public/data/*.json` through `useParsedData`, not modular content. Navbar & global copy also exist in `config/content.json`, so duplication persists.

## Constraints / schemas
- Content still validated by `ContentSchema` (`src/lib/data/schemas.ts`) when using monolith loader. Any new composed content must satisfy this schema for backward compatibility (useContent).
- Module API doesn’t perform schema validation; would need to validate composed result before returning or rely on upstream.
- Menu data remains modular but separate (`/menu/*.json` transformed by loader) — not directly impacted.

## Opportunities / targets
- Align manifest & filesystem to per-module entries (`core/global`, `core/ui`, `core/accessibility`, `core/forms`, `pages/home`, etc.) so `useModularContent` and `/api/content/modules/*` can function.
- Split `config/content.json` into the modular files (or generate modules from it) while keeping a composed monolith for legacy loader compatibility until consumers migrate.
- Implement a server-side composer that builds `config/content.json` (or runtime composition) from `config/content/**` + env overrides, so there is a single source of truth (modules) and a generated monolith.
- Add validation (ContentSchema) to the composed result before serving.

## Open questions / assumptions
- Assume backwards compatibility required: existing imports of `@/config/content.json` and `useContent` should keep working.
- Env override strategy: prefer per-module override files matching module IDs (e.g., `config/content/environments/prod/overrides/pages/home.json`).
- Output format: likely retain `config/content.json` (generated) for legacy while enabling modular endpoints/hooks.
