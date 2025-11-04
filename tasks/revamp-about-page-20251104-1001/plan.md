# Implementation Plan: Revamp About Page

## Objective

Revamp `/about` with authoritative White Horse content and the blueprint’s section structure while reusing established components and DaisyUI styling.

## Success Criteria

- Clear two-column overview with features (mobile-first, accessible)
- Engaging, scannable history timeline
- Quick Links to Menu, Events, Contact
- Closing CTA band with primary actions
- Lighthouse/DevTools checks: no console errors, focus-visible, reduced motion respected

## Architecture

### Components

- `HomepageAboutSection` for the two-column “Welcome/Why Guests Visit”.
- `StoryTimelineSection` for history timeline.
- `QuickLinksSection` for 3-up quick links.
- `AboutCTASection` and/or `CallToActionSection` for closing CTA.

### State & Data

- Source content from `getContentSmart()`.
- Map overview content from `content.pages.home.sections.about` (features + image) and About content from `content.pages.about`.

### Routing & SEO

- Keep canonical `/about` and existing SEO metadata.

## Implementation Steps

1. Update `config/content.json` `pages.about` text (hero subtitle, intro) using dossier phrasing.
2. Enhance `app/about/page.tsx`:
   - Import `HomepageAboutSection`, `QuickLinksSection`, `CallToActionSection` via dynamic imports.
   - Insert overview section after hero.
   - Keep timeline; add quick links and closing CTA band.
3. Verify responsive/keyboard/focus behavior; ensure reduced motion respected.

## Edge Cases

- Missing overview content: defensive checks return null.
- Reduced motion: motion wrappers already support it.

## Testing Strategy

- Manual QA with Chrome DevTools (MCP): console, a11y, performance, device emulation.
- Quick click-through of links and keyboard navigation.

## Rollout

- No feature flag; content-driven and component reuse. Validate locally at `http://localhost:3001/about`.

