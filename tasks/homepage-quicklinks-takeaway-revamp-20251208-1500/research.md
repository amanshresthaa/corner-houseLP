# Research: Quick Links / Takeaway Revamp

## Existing Patterns
- `components/restaurant/sections/QuickLinksSection.tsx` renders a dark (brand-900) grid of cards pulled from `config/content/pages/home.json -> quickLinks`. Layout is three cards with DaisyUI-style cards, Framer Motion animations, and simple text + arrow link.
- `components/restaurant/sections/CallToActionSection.tsx` is used for the “Visit {{brand}}” closing CTA/takeaway block; currently light background card with “Exclusive” pill and emoji in headline. Data originates from `home.json -> cta` (headline, description, buttons array with variant).
- Normalization for both sections handled in `src/lib/homepage/sections.ts` (quickLinks returns `QuickLinkItem[]`, closingCta returns `ClosingCtaSection`). Tests exist in `tests/data/homepage/sections.test.ts` verifying quick links filtering and CTA button variant fallback.

## References
- New homepage sections now lean into editorial layouts (About hero, Signature dishes) with layered gradients/glass cards. Quick Links + CTA should follow similar rhythm but maintain alternating light/dark backgrounds.
- DaisyUI components for `steps`, `timeline`, `stats`, and `cards` can represent multi-step experiences (e.g., “Book / Visit / Order”).
- Restaurant-specific components (e.g., `components/restaurant/sections/AboutWelcomeSection`) show how to combine imagery + overlays.

## Constraints
- Must stay data-driven via `home.json`. Ideally extend quickLinks data to allow icons/eyebrow/chip and CTA data to include badges, supporting text, maybe background image.
- Keep Framer Motion usage accessible; respect `prefers-reduced-motion`.
- CTA Buttons should continue using variants defined in `CallToActionSection` or update component to support richer layouts without breaking existing usage elsewhere.
- Maintain mobile-first layout: quick links stack, CTA hero still readable.

## Findings
- Quick Links currently only supports title/desc/link/linkText; to create a “revamped section”, consider grouping into “plan your visit” pipeline with small stats or highlight iconography (maybe adding `eyebrow`, `icon`, or `pill`).
- Closing CTA could become a split hero featuring takeaway cards (e.g., dine-in vs takeaway) with imagery, contact info, contact buttons. Might require new component or enhancements to existing CTA component (add `features`, `image`, `eyebrow`).

## Open Questions
- Do we introduce imagery in quick links (icons, thumbnails) requiring new assets? Potential approach: use tailwind gradient circles with icons (no external asset).
- Should closing CTA support both dine-in and takeaway CTAs simultaneously (two button rows) or include schedule info? Need to decide fields to add in JSON (maybe `supporting` array).
