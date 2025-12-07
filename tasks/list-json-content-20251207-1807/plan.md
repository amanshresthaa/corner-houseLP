# Implementation Plan: List content JSON sources

## Objective
Provide a complete, categorized list of JSON files that supply website/app content (copy, navigation, menu data, marketing/restaurant info, banners) in this repo, noting how each is used.

## Success Criteria
- [ ] Every JSON file that feeds user-facing content is identified with its path and role.
- [ ] Groups reflect the architecture (central content, modular modules, env overrides, public client data, menu, marketing/restaurant, banners).
- [ ] Call out any auxiliary/unreferenced content JSON separately.

## Approach
- Use repo knowledge and `manifest.json` to map modular content files.
- Cross-reference `src/lib/data/loader.ts`, `hooks/useParsedData.ts`, and component imports to confirm actual usage paths.
- Summarize in plain text (no code changes needed).

## Implementation Steps
1. Confirm central content + env overrides (`config/content.json`, `data/<env>/content.json`).
2. List modular content files from `config/content/manifest.json` plus environment override files under `config/content/environments/**`.
3. Add marketing/restaurant/config content JSON used by loaders.
4. Capture menu category JSON under `/menu` and banner spec JSON under `config/banners`.
5. Capture public client data JSON under `public/data` and any other content JSON referenced by components/tests.
6. Note any auxiliary JSON that appears content-like but is currently unused.
