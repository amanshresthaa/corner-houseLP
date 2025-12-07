# Research: Policy, Utility, and Auth Pages Migration

## Existing Content
- `pages/privacy.json`: Full privacy policy for The White Horse Waterbeach with effective date 10 Aug 2025, contact `cornerhouse@lapeninns.com`, references Waterbeach location, Plausible analytics, rights, retention, etc.
- `pages/tos.json`: SEO block only for White Horse terms; no body content stored here (likely rendered elsewhere or inherited).
- `pages/offline.json`, `pages/notFound.json`: Currently empty objects.
- `pages/signin.json`: White Horse branding and placeholder email `cornerhouse@lapeninns.com`.
- `pages/dashboard.json`: Generic title/subtitle, venue-agnostic.

## Corner House Facts to Apply
- Name: The Corner House Cambridge (Newmarket Road).
- Contact email: cornerhouse@lapeninns.com (primary), cornerhouse@lapeninns.com (events/management).
- Phone: +44 1223 921122.
- Address: 231 Newmarket Road, Cambridge CB5 8JE.
- Domain assumed: https://thecornerhousepub.co/.
- Same analytics stance (Plausible) can remain.

## Constraints / Considerations
- Maintain structure/keys expected by loaders/tests; do not remove sections.
- Update policy text to reflect Corner House identity and contact while keeping legal accuracy.
- offline/notFound should be populated with concise copy consistent with brand voice.
- Sign-in copy should reference Corner House and use the correct email placeholder.
- Dashboard can stay minimal but align subtitle if desired; keep generic safe.

## Open Questions
- Whether a detailed ToS body is defined elsewhere; current file only holds SEO. We will rebrand SEO fields and leave structure intact.
- Any custom offline/404 design language? None provided; use clear, helpful copy and CTA to home/menu.

## Recommendations
- Privacy: replace venue name/contact/email, add address/phone in Who We Are, keep retention/rights; set contact email to cornerhouse@lapeninns.com; adjust intro to mention Cambridge location.
- ToS: rebrand SEO fields to Corner House Cambridge; keep canonical URL relative.
- Offline/404: add title, message, and CTA buttons (Home, Try Again/Get Online) consistent with UI labels.
- Sign-in: rename title, update placeholder to Corner House email, keep buttons/messages.
- Dashboard: optionally adjust subtitle to “Welcome back” but keep simple.
