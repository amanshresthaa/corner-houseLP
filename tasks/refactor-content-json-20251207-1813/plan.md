# Implementation Plan: Refactor & modularize content JSON

## Objective
Move site content to a modular, manifest-driven source of truth while keeping legacy consumers working. Make `config/content/**` the canonical modules, generate/serve a composed `content.json`, and align manifest & APIs with per-module IDs (e.g., `core/global`, `pages/home`).

## Success criteria
- [ ] Manifest lists per-module entries matching filesystem (core/*, pages/*, components/*, api/*, forms).
- [ ] Module API `/api/content/modules/[moduleId]` can load each module and apply env overrides.
- [ ] A server-side composer builds a validated `ContentSchema` object from modules + env overrides; `useContent`/legacy imports continue to work.
- [ ] Env overrides follow module-id filenames and are honored in both modular and composed outputs.
- [ ] Add tests covering manifest integrity, composition, and schema validation.

## Architecture decisions
- Source of truth: JSON modules under `config/content/**` + env override layers under `config/content/environments/<env>/overrides/` named by module id (e.g., `pages/home.json`).
- Composition: deep-merge with env taking precedence; arrays concat (per manifest default). Validate final result with `ContentSchema`.
- Backward compatibility: generate `config/content.json` during build/start (or provide an npm script) from modules; loader uses composed data instead of hand-kept monolith.
- API alignment: update manifest to per-module entries; adjust module API if needed to support subpath IDs.

## Work plan
1. **Inventory & map modules**: enumerate files under `config/content/**` and map them to intended module IDs; identify missing files (e.g., `pages/signin.json` absent) and duplicates with monolith.
2. **Manifest rewrite**: produce per-module entries (core/ui/accessibility/forms, pages/*, components/*, api/messages/errors). Add env rules for overrides and exclusions. Ensure priorities/cache durations sensible.
3. **Composer implementation**:
   - Add a server utility (e.g., `src/lib/content/composer.ts`) to read manifest modules, load JSON, apply env overrides, deep-merge in priority order, and validate with `ContentSchema`.
   - Expose a script (`npm run build-content` or a ts-node script) to output `config/content.json` (or `.cache/content.json`) for legacy use; also used by `/api/content`.
4. **Wire loaders/APIs**:
   - Update `src/lib/data/loader.ts#getContentSmart` to call composer instead of direct `config/content.json` when env flag `USE_MODULAR_CONTENT` (default on) to avoid breaking; fallback to monolith if composer fails.
   - Ensure `/api/content/modules/*` and `/api/content/manifest` use updated manifest; apply validation/caching.
5. **Env overrides**: create/rename override files to match module IDs (e.g., move `config/content/environments/prod/overrides/performance.json` to targeted modules or split content accordingly).
6. **Tests**: add unit tests for composer (manifest parse, module load, env override precedence, ContentSchema validation) and a regression test to ensure legacy `getContentData` returns same shape.
7. **Migration of monolith**: regenerate `config/content.json` from modules and remove manual edits in monolith to prevent drift (could add a note/header comment about generated file).

## Risks / mitigations
- **Schema drift**: Validate composed output; add tests to catch missing fields.
- **Runtime perf**: Cache composed result per env; reuse existing cache manager.
- **Consumer drift**: Keep `config/content.json` generated until all imports are refactored.
