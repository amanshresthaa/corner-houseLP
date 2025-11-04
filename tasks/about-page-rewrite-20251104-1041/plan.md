# Implementation Plan: About Page Rewrite

## Objective

Replace `/about` content with an authoritative brand and operations page based on the provided dossier. Communicate positioning, dual identity (pub + Nepalese restaurant), quick facts, story, culinary highlights, team, events, accessibility, press, reviews, neighbourhood guide, and imagery guidance.

## Success Criteria

- [ ] Old content fully replaced with new structure and copy
- [ ] Clear headings, semantic sections, mobile-first layout
- [ ] Quick Facts include address, phone, email, hours, amenities
- [ ] SEO metadata updated; schema scripts present
- [ ] All links and images resolve; no console errors

## Architecture

- Page: `app/about/page.tsx` using existing `RestaurantLayout`
- SEO: `getSEOTags`, `renderSchemaTags`, `SchemaInjector`
- UI: DaisyUI cards/badges; Tailwind utilities; `next/image`
- Content blocks: separate functional components per section

## Component Breakdown

- `<Hero />` – Positioning headline and subcopy
- `<DualIdentity />` – “Two pubs” fusion proposition
- `<Values />` – Core values grid
- `<QuickFacts />` – Responsive facts cards with tel/mailto
- `<StoryTimeline />` – Key dates and narrative
- `<Culinary />` – Nepalese signatures, pub classics, takeaway
- `<Team />` – Lapen Inns leadership and on-site team note
- `<EventsHire />` – Regular events and private hire options
- `<Accessibility />` – Known features + info gaps
- `<PressReviews />` – Relaunch coverage and social proof
- `<Neighbourhood />` – Local highlights (Denny Abbey, Waterbeach Lake, Milton Country Park)
- `<ImageryNote />` – Visual identity recommendations
- `<Cta />` – Booking CTA

## Data Flow

- Static copy per dossier rendered server-side; links to internal routes (`/menu`, `/events`, `/contact`, `/book-a-table`).
- External links use `rel="noopener"` and open in same tab unless specified.

## Testing Strategy

- Manual QA with Chrome DevTools MCP: console, responsive checks, a11y basics
- Verify all image paths exist; verify tel/mailto links
- Lighthouse quick pass for semantics

## Edge Cases

- Reduced-motion preference
- Long content scrolling – ensure clear sectioning and anchors
- Small screens – ensure card stacking and readable text sizes

## Rollout

- Straight replacement; no feature flag. Monitor console and logs after deploy.
