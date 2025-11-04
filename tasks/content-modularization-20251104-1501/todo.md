# Implementation Checklist

## Setup
- [x] Create task folder with docs

## Consolidation
- [x] Merge not-found content into `config/content/pages/notFound.json`
- [x] Refactor not-found hook to use centralized content
- [x] Refactor menu hook to use centralized content
- [x] Enable modular content by default (NEXT_PUBLIC_USE_MODULAR_CONTENT)
- [x] Add `pages/tos.json` and `pages/privacy.json` to manifest
- [x] Update `pages/offline.json` to full structure

## Cleanup
- [x] Remove local `app/not-found/_content/not-found-content.json`
- [x] Remove local `app/menu/_content/menu-content.json`
- [x] Remove unused `app/_content/home-sections.ts`
- [x] Remove `app/offline/_content/offline-content.json`
- [x] Remove `app/tos/_content/tos-content.json`
- [x] Remove `app/privacy-policy/_content/privacy-content.json`

## Verification
- [ ] Manual QA: not-found page
- [ ] Manual QA: menu page
- [ ] Manual QA: offline page
- [ ] Manual QA: TOS & Privacy pages
