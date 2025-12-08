# Implementation Checklist

## Build
- [x] Recreate `/about` hero, story, and CTA bands using homepage design tokens.
- [x] Source copy from `config/content/pages/about.json` plus `getContactInfo()` instead of hardcoded strings.
- [x] Extract shared helpers/sections into `app/about/_components/sections.tsx` for reuse and testing.

## Testing
- [x] Add RTL suite (`tests/components/about/AboutPageSections.test.tsx`) covering hero, experience grid, visit CTA, and helper transforms.
- [x] Run targeted Jest suite (`npm run test -- AboutPageSections.test.tsx`).
- [ ] Chrome DevTools MCP manual QA & `npm run lint` clean pass (blocked by existing repo lint errors and lack of DevTools access in this environment).

## Follow-ups / Notes
- Document lint blockers so reviewers understand failures stem from pre-existing files (`app/menu-information/page.tsx`, `components/restaurant/AutoMarquee.tsx`, etc.).
- Manual QA requires Chrome DevTools MCP session + magic-link auth; awaiting guidance/access to execute.
