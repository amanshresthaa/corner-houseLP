# Implementation Plan: Policy & Utility Pages Migration

## Objective
Rebrand legal, offline/404, and auth-related page content from The White Horse to The Corner House Cambridge while preserving structure and compatibility.

## Success Criteria
- [ ] Privacy policy references Corner House name, address, phone, contact email, and Cambridge context; retains legal clarity.
- [ ] Terms of Service SEO metadata updated to Corner House branding and domain.
- [ ] Offline and 404 pages provide clear, branded messaging with helpful CTAs.
- [ ] Sign-in copy references Corner House and correct email placeholder.
- [ ] Dashboard text stays appropriate and venue-neutral.
- [ ] All modified JSON validates and keeps required keys.

## Steps
1) Update privacy.json content fields (meta, whoWeAre, rights contact, contact section) with Corner House details.
2) Update tos.json SEO strings (title/description/keywords/openGraph URL) to Corner House Cambridge.
3) Populate offline.json and notFound.json with concise titles/descriptions/CTAs (Home, Try again / Go back).
4) Update signin.json title/subtitle/email placeholder to Corner House branding.
5) Keep dashboard minimal; adjust subtitle slightly if desired.
6) Run `python3 -m json.tool` on all edited files.

## Edge Cases
- Ensure no White Horse references remain.
- Keep UK GDPR wording intact; do not over-promise data practices.
- Avoid adding routes not present (stick to `/` and `/menu`).

## Testing
- JSON validation per file.
- Later manual UI check via DevTools when pages are rendered.
