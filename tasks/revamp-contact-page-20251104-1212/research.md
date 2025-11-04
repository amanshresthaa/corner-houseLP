# Research: Revamp Contact Page Layout

## Current Implementation
- File: `app/contact/page.tsx`
- Sections:
  - Gradient hero with title/subtitle from `config/content/pages/contact.json`.
  - Main grid: left `ContactInfoSection` (phone/location/email), right column with `RestaurantHoursCard`, `ContactFeaturesSection`, and `SocialMediaSection`.
  - Separate full-width "Find Us" section with `InteractiveMap`.
- Data sources: `getContentSmart()` + `lib/restaurantData` helpers.
- Styling: DaisyUI/Tailwind classes; accessible headings and sections.

## Opportunities
- Add mobile-friendly Quick Actions (Call, Email, Directions) near the top.
- Consolidate layout into consistent grid, reducing scroll and grouping related info.
- Ensure spacing and focus-visible styles meet UX standards.
- Keep components modular; avoid rewriting shared sections.

## Constraints
- Avoid breaking tests; keep `ContactInfoSection` API intact.
- Use existing map and hours components.
- Keep motion wrappers minimal and respect reduced motion.

## References
- `components/restaurant/InteractiveMap.tsx` provides direction links via `address.map`.
- `ContactFeaturesSection` already renders feature bullets with icons.

## Proposed Changes
- Insert a "Quick Actions" row (buttons: Call, Email, Directions) below hero.
- Tweak main layout spacing; keep two-column grid but tighten vertical rhythm.
- Keep the map section; slightly refine container styling for cohesion.
