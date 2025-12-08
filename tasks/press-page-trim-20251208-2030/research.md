# Research: Press Page Trim

## Current Structure (app/press/page.tsx)
- **Hero section**: dark gradient hero with breadcrumb, eyebrow chip, headline, CTA buttons, and badge grid (awards/hygiene highlights).
- **Credibility cards**: light gradient band with four white cards summarizing awards, hygiene rating, broadcast amenities, and media support contact.
- **Media coverage**: dark gradient grid rendering pressTicker items with glass cards and fallback message.
- **Media resources**: light band containing resource list, quote block, and inline Food Hygiene card.
- **Press kit/contact**: dark glass section with quick facts bullet list plus contact card/CTA pair.

## Requirement Interpretation
- User requested "remove the redundant materials... only keep required materials". Interpreting "required" as the core hero intro plus press kit/contact essentials (facts + media desk CTAs). Supplemental credibility, media coverage, and resource bands become redundant.

## Considerations
- Removing sections should preserve accessible structure (hero + single press kit section) and ensure schema tags remain unaffected.
- Need to keep constants used by remaining content; unused data (HERO_BADGES, CREDIBILITY_CARDS, etc.) should be dropped to avoid dead code.
