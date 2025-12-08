# Implementation Checklist

## Setup
- [ ] Review latest CTA content + normalization to confirm no additional schema changes needed.

## Build
- [ ] Rebuild `CallToActionSection.tsx` layout (hero wrapper, left/right columns, highlight chips, hotline card, image frame, button group) using DaisyUI/Tailwind patterns.
- [ ] Enhance CTA buttons with variant-specific DaisyUI classes + optional icons derived from button keys/text.
- [ ] Add helper utilities/data-testids inside CTA component for testing.
- [ ] Refresh CTA copy/content in `config/content/pages/home.json` to align with new storytelling (features text, button labels, contact info, imagery path if needed).

## Tests & Validation
- [ ] Update `tests/components/restaurant/sections/CallToActionSection.test.tsx` to reflect new DOM, highlights, hotline card, and button behavior.
- [ ] Re-run relevant Jest suites + `npm run content:validate`.

## Verification
- [ ] Manual QA via Chrome DevTools MCP (mobile/tablet/desktop) once implementation passes tests.
