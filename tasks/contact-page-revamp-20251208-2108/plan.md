# Implementation Plan: Contact Page Revamp

## Objective

Deliver a fully overhauled `/contact` experience that mirrors the homepage rhythm (alternating light/dark bands, glass cards, DaisyUI buttons) while keeping all existing data sources, CTAs, and SEO intact. The page should feel as premium as the new /events, /about, and /book-a-table stacks.

## Success Criteria

- [ ] Hero uses dark gradient, eyebrow chip, highlight chips, and CTA trio (call/email/directions) respecting DaisyUI focus styles.
- [ ] Alternate dark/light sections that encapsulate: contact essentials cards, concierge & hosting assurances, hours/social/features band, and a closing map CTA.
- [ ] All content is populated from `getContentSmart()` and `lib/restaurantData` helpers (no hardcoded phone/emails) and remains hydration-safe.
- [ ] Page passes manual Chrome DevTools QA (mobile/tablet/desktop) with zero accessibility regressions.

## Architecture

- Keep `ContactPage` as an async server component using `RestaurantLayout`, `getContentSmart`, SEO metadata, and dynamic imports for section components.
- Introduce internal helper arrays (e.g., highlight stats, support cards) derived from canonical `CONTACT`, `ADDRESS_LINE`, and `contactContent` fields.
- Compose the UI with semantic `<section>` blocks: `HeroDark`, `ContactEssentialsLight`, `ConciergeDark`, `PlanningLight`, `MapDark`. Each section shares `max-w-6xl px-4 sm:px-6 lg:px-8` containers and `py-12/16` spacing per design doc.
- Wrap existing components (`ContactInfoSection`, `RestaurantHoursCard`, `ContactFeaturesSection`, `SocialMediaSection`, `InteractiveMap`) with new shells rather than rewriting them.

## Implementation Steps

1. **Data prep**: Extract `contactContent` sub-sections (hero, contactInfo, concierge/support copy if available, hours, features) and derive CTA metadata (`call`, `email`, `directions`, map links, concierge email, response time stats).
2. **Hero rebuild**: Craft a new dark gradient hero with eyebrow chip, `font-display` heading, descriptive copy, highlight chips (response time, concierge, location), and CTA trio using DaisyUI `btn` classes and accessible labels.
3. **Contact essentials band (light)**: Build a `grid` of white outline cards summarizing phone, email, visit us, and bespoke requests. Reuse `ContactInfoSection` logic where practical or inline card data, ensuring cards include icons, descriptive copy, and CTA links.
4. **Concierge/support band (dark)**: Introduce glass cards detailing booking assurances, events/private hire, same-day support, plus embed `RestaurantHoursCard` w/ matching shell to maintain theme.
5. **Planning/details band (light)**: Showcase `ContactFeaturesSection` and `SocialMediaSection` inside white shells along with trust badges/testimonial snippet if copy available.
6. **Map + CTA band (dark)**: Reframe `InteractiveMap` within a dark gradient, pair with call-to-action buttons (Call, Google Maps, Apple Maps) and accessible copy.
7. **Styling polish**: Ensure consistent spacing, focus-visible rings, `touch-action: manipulation` on button groups, `aria-live` where needed, and update any classnames to align with design tokens.
8. **Tests & verification**: Run relevant unit tests (contact sections) if they exist + `npm run test` subset if lightweight; perform Chrome DevTools manual QA on /contact.

## Edge Cases

- Handle missing `contactContent` fields gracefully (fallback copy strings, guard arrays before mapping).
- Ensure map links exist before rendering external CTAs; if absent, hide the button to avoid dead links.
- Responsiveness: mobile view should stack cards vertically with adequate spacing and ensure CTAs remain touch-friendly (≥44px height).

## Testing

- Unit/regression: `npm run test ContactInfoSection` (or general `npm run test` if required) to ensure refactors don’t break snapshots.
- Manual QA on `/contact` via Chrome DevTools MCP: console, accessibility, Lighthouse, responsive breakpoints.

## Rollout

- No flags; deploy once QA passes. Ensure SEO metadata continues to rely on content-driven strings so there’s no change to canonical tags.
