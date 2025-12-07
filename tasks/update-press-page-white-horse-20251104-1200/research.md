# Research: Update Press Page Content

## Objective
Replace the content at `/press` with essential information about The White Horse, Waterbeach extracted from `Everythingyouneed/The White Horse , Waterbeach.md`. Avoid unrelated/extraneous items.

## Existing Patterns
- Press page at `app/press/page.tsx` uses:
  - Hero section, Food Hygiene card, a `PressFeatureBanner`, "Media Highlights" cards list, and a "Press Kit & Quick Facts" panel.
  - Contact data via helpers from `lib/restaurantData.ts` (identity, address, contact).
  - SEO via `getSEOTags` and `renderSchemaTags`.
  - DaisyUI classes and motion wrappers.
- Content model supports press-like grid items but current items reference external publications (Evening Standard, Cambs Edition, etc.).

## Source Content (Markdown)
`Everythingyouneed/The White Horse , Waterbeach.md` key sections:
- I. Hero & Positioning: Community-centric, dual identity (pub + Nepalese restaurant), relaxed & modern, family and dog-friendly, live sports.
- II. Quick Facts: Verified/reconciled essentials including:
  - Property Name: The White Horse
  - Location: 231 Newmarket Road, Cambridge CB5 8JE
  - Phone (Verified): +44 1223 921122
  - Email (Verified): cornerhouse@lapeninns.com
  - Website: https://whitehorsepub.co/
  - Ownership: Lapen Inns
  - Bar hours and Restaurant times
  - Cuisine: Nepalese; British pub classics
  - Key amenities: Live sports (Sky & TNT), large garden, outdoor seating, dog-friendly (bar area), family-friendly, pool table, takeaway, wheelchair access
  - Regular cask ales: Greene King IPA, Timothy Taylor Landlord

## Technical Constraints
- Keep DaisyUI and existing layout patterns; avoid new dependencies (no markdown renderer introduced).
- Prefer using `lib/restaurantData.ts` helpers where values already match the Markdown (phone/email/hours). Note: repo address is "231 Newmarket Road"; Markdown lists "231 Newmarket Road".

## Open Questions
- Whether to globally change address spelling to "Greenside"? Out of scope; show Markdown value in press facts only.
- Include Food Hygiene rating? Not present in the provided Markdown; exclude to meet "no unnecessary information".

## Recommendations
- Remove external press articles, review banners, and hygiene card.
- Retain the hero + press kit sections, rewriting copy with concise brand boilerplate from Markdown.
- Populate Quick Facts from Markdown (address shown as "231 Newmarket Road...") while keeping contact data wired to centralized helpers.
