# Implementation Plan: Menu Page Service CTA Block

## Objective
Introduce a light-themed CTA block between the dietary information section and the footer on the `/menu` page so guests can quickly book a table, order food, or view the takeaway menu.

## Success Criteria
- [ ] Section renders immediately above the footer while keeping the existing dietary info block intact.
- [ ] CTA headline, supportive copy, and three actions (Book a Table, Order Online, View Takeaway Menu) display with correct destinations.
- [ ] Styling mirrors the home page Call To Action treatment (light background, dark typography, rounded card) and remains responsive.
- [ ] Buttons are keyboard accessible and announce accurate labels.

## Architecture
### Components
- Reuse `CallToActionSection` (`components/restaurant/sections/CallToActionSection.tsx`) to maintain design parity.
- Wrap CTA in existing `FadeIn` animation wrapper for consistent entrance motion.

### State Management
- No new state; static server-rendered props configured inline within `app/menu/page.tsx`.

### Data Flow
- `MenuPage` constructs CTA copy/button configuration server-side and passes to client component.

### API Contracts
- No external API changes; leverages existing Next.js routing links.

## UI/UX Considerations
- Headline should match tone of home page CTA (celebratory, friendly) while unique to menu context.
- Ensure button order prioritizes booking, with secondary options following.
- Maintain sufficient contrast for text and focus outlines on light background.

## Testing Strategy
- Unit: N/A for static render, but ensure lint/build passes.
- Manual: Verify section placement, link destinations, focus order.
- Accessibility: Confirm `CallToActionSection` retains focus styles.

## Edge Cases
- Content fallback if any button URL missing (component already guards). We'll supply all three.
- Ensure no hydration mismatch by using literal strings (no client-only values).

## Rollout Plan
- Standard deploy via existing CI/CD once merged; no feature flag or config updates required.
