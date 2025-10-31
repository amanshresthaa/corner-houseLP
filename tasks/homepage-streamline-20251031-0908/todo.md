# Implementation Checklist

## Setup

- [x] Update `config/content.json` with simplified homepage sections using approved copy & imagery
- [x] Review for any environment-specific overrides that need alignment (none expected but confirm)

## Core Functionality

- [x] Refactor `app/page.tsx` to build and pass streamlined `homeContent` payload
- [x] Rewrite `components/ClientHomeContent.tsx` to render blueprint sections only
- [x] Create/homepage section components (press ticker, about, signature dishes, reviews) with DaisyUI patterns
- [x] Remove or adapt `app/_components/AboutSection.tsx` and related hooks
- [x] Ensure `TakeawayBanner`/`LocationSection` copy aligns with source documents
- [x] Organize White Horse imagery under `public/images/white-horse/` and update references (`src/lib/images.ts`, `config/content.json`)
- [ ] Audit all page copy (blog, legal, etc.) to ensure it matches the Waterbeach dossiers

## UI/UX

- [x] Validate responsive layouts for new sections (mobile-first spacing, stacking)
- [x] Confirm alt text/ARIA labels use verified data

## Testing

- [x] Run `npm run lint` *(fails due to pre-existing lint violations outside touched files)*
- [ ] Execute targeted tests if available (e.g., component/unit suites)
- [x] Conduct manual QA via Chrome DevTools MCP (record findings in verification)

## Questions/Blockers

- Awaiting confirmation only if press ticker/review inclusion should be changed; proceeding with both per blueprint.
