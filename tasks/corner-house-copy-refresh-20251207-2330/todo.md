# Implementation Checklist

## Audit & Planning
- [x] Run `rg "White Horse"` and classify occurrences by component/content/test/doc category
- [x] Note contexts requiring bespoke copy (hero, testimonials, menus, metadata, mocks)

## Content Updates
- [ ] Rewrite hero/about/homepage sections using Corner House identity (heritage, Nepalese kitchen, sports hub)
- [ ] Replace testimonial/review copy with summaries grounded in provided docs
- [ ] Update component alt texts, aria labels, CTAs, and metadata referencing White Horse
- [ ] Refresh config/content JSON entries or structured data still mentioning White Horse
- [ ] Update mocks/tests/fixtures to align with new Corner House naming and descriptions

## Verification
- [ ] Re-run `rg "White Horse"` to confirm runtime/tests free of legacy references (excluding archival docs if intentional)
- [ ] Run `npm run lint` (capture existing unrelated failures) and note any new issues
- [ ] Document verification summary + DevTools status per AGENTS guidelines
