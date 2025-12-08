# Research: Press Page Revamp

## Existing Patterns & Data Sources
- `app/press/page.tsx` currently renders a dark hero, a light "Media Coverage" grid (sourced from `home.sections.pressTicker.items`), a dark press kit/quick facts band, and a light Food Hygiene card. Layout already wraps the whole experience with `RestaurantLayout` and `FadeIn` wrappers.
- Press metadata flows through `getContentSmart()` and `generateMetadata()` by reading `pages.press.seo` in `config/content.json`; coverage items piggyback on the homepage `pressTicker` contract (title/summary/href + derived source/domain helpers).
- Contact, address, and postal schema data stay centralized in `lib/restaurantData`, while `BRAND` tokens (domain, names) power hero copy and CTA labels.
- DaisyUI + Tailwind utility combos drive the card shells (rounded-2xl light cards, gradient backgrounds, focus-visible outlines) and already align with other marketing pages.

## Design System References
- `docs/homepage-design-system.md` defines the alternating rhythm (light ↔ dark stack, `max-w-6xl px-4 sm:px-6 lg:px-8`, `py-12/16`) and typography tokens (uppercase eyebrow chips, `font-display` headings) we must mirror to keep `/press` visually consistent with `/home`, `/about`, `/events`, and `/book-a-table`.
- Press/credibility components reuse badge chips, light outline cards (`border-brand-100 bg-white/95 shadow-xl`) for highlights, and dark glass cards (`bg-white/5 border-white/15`) for gradient bands—these should inform the new press hero, credibility stats rail, and CTA shells.
- Buttons follow DaisyUI `btn` tokens with white-outline variants on dark gradients and brand-outline variants on light backgrounds; hover states adjust opacity rather than flipping colors.

## Technical Constraints & Requirements
- Must obey `AGENTS.md` workflow: create plan/todo/verification docs, keep manual Chrome DevTools QA notes, and maintain dark/light alternation, semantic HTML, and accessibility (focus-visible, aria-labels, keyboard nav, touch-action: manipulation on tap targets).
- Data should stay DRY by reading from `getContentSmart()` or centralized helpers (no hard-coded duplicates of press facts already derived from `getRestaurantIdentity`, `getContactInfo`, etc.).
- Performance/accessibility: respect `prefers-reduced-motion` (already handled via inline style), avoid CLS by sticking to fixed container widths, and keep CTA groups accessible with `aria-labels` + `aria-live` friendly copy where needed.
- Verify via Jest (at minimum `npm run test -- app/press?` but likely `npm run test -- app` or targeted component tests) plus manual DevTools run at multiple breakpoints per AGENT rules.

## Opportunities & Recommendations
- Introduce a richer hero band (dark gradient) that matches the homepage CTA contract: eyebrow chip, display heading, concise supporting copy, primary/secondary CTAs (call/contact) and highlight badges summarizing awards/hygiene/travelers’ choice.
- Follow with a light "Credibility Highlights" card deck: modular cards for Awards, Ratings, Food Hygiene, Amenities, etc., using the light card blueprint from the design system.
- Expand the media coverage list into a dark glass carousel/grid (to maintain alternation) and layer domain/source badges + Link buttons styled like QuickLinks for improved visual hierarchy.
- Add a light "Media Resources" section (download pack CTA, quote block, asset list) and keep the existing press kit/contact form as a dark counterpart with brand CTA buttons + dashed card for assets.
- Close with a dark-to-light CTA pair (e.g., "Plan a feature" + "Visit us"), ensuring the Food Hygiene block either nests inside the card grid or becomes a single white card to preserve the rhythm.
