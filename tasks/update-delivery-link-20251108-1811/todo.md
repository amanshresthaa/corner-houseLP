# Implementation Checklist

## Content Updates
- [x] Update `config/content.json` nav entry for "Order Online" to `/store/2`.
- [x] Update `config/content.json` `global.links.takeaway` and `takeawayUrl` instances.
- [x] Update `public/data/nav.json` order link.

## Validation
- [x] Run `rg` to ensure no remaining `/menu` references for the takeaway domain.
- [ ] Spot-check TypeScript build/lint if necessary _(blocked: `npm run lint` already fails in unrelated files; see task notes)_.

## QA Prep
- [x] Document verification steps and findings in `verification.md` (after manual QA via DevTools when applicable).
