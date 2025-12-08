# Research: Contact page streamline

## Existing Structure
- File: `app/contact/page.tsx` uses `RestaurantLayout`, `FadeIn`, dynamic imports for `ContactInfoSection`, `RestaurantHoursCard`, `ContactFeaturesSection`, `SocialMediaSection`, `InteractiveMap`.
- Hero includes quick CTAs (call, email, directions) and uses gradient background.
- Main content: two-column grid (contact info + hours/features/social), then map section.
- SEO handled with `generateMetadata` via content, and reduce-motion CSS already present.

## Observations
- Page is already concise; however quick actions duplicated (hero buttons + contact info repeated). We can simplify by combining hero + essentials in one grid and trimming duplicative cards (features/social?) if redundant for “contact” intent.
- `ContactFeaturesSection` and `SocialMediaSection` add length; may be optional. Request wants removal of redundant sections.
- Quick actions rely on `CONTACT` data (phone/email/address) with placeholders like `{{brand.supportEmail}}` resolved at runtime.

## Constraints
- Must keep accessibility: headings, focus-visible, touch targets; keep reduce-motion snippet.
- Keep map and hours for utility; re-use existing components (`RestaurantHoursCard`, `InteractiveMap`).
- Keep SEO metadata generation intact.

## Recommended Direction
- Hero: headline + short copy + 3 CTA buttons (call/email/directions) with badges.
- Main grid: left card with contact methods & hours; right card with map and travel tips.
- Remove `ContactFeaturesSection` and `SocialMediaSection` to reduce clutter, unless essential.
- Use DaisyUI cards; align with book-a-table simplification.
