# Implementation Checklist

## Setup
- [x] Create task workspace and document research/plan

## Design & Development
- [x] Restructure `/app/book-a-table/page.tsx` with alternating dark/light sections
- [x] Wrap existing cards (hours, booking, find us, large groups) inside new white shells and add new dark glass cards
- [x] Add CTA data + highlight chips with proper DaisyUI button tokens and aria labels

## Documentation
- [ ] Update `docs/homepage-design-system.md` with the /book-a-table rhythm entry _(on hold per user request to avoid doc changes)_

## Quality
- [ ] Run targeted Jest/lint suite for book-a-table assets
- [ ] Perform Chrome DevTools MCP verification and record findings in `verification.md`
