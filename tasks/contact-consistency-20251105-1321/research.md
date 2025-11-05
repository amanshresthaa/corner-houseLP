# Research: Contact Consistency

## Existing Patterns
- `lib/restaurantData.ts` exposes `getContactInfo()` and central fallback constants used across SEO/schema.
- `libs/seo.tsx` already consumes `getContactInfo()` for `telephone` and `email` JSON-LD.
- `libs/schema.ts` had hardcoded fallbacks for phone/email that bypassed centralized contact.
- Multiple content JSON/MD files and tests contained phone/email literals (Gmail, local-number variants, old legacy numbers).

## External Resources
- N/A (internal consistency task).

## Technical Constraints
- Next.js app with content JSON driving UI labels/CTAs; these embed tel:/mailto: values.
- Tests include placeholder/example emails; requirement states only one email allowed repo‑wide.

## Recommendations
- Centralize code paths on `getContactInfo()`; remove hardcoded fallbacks.
- Normalize fallback contact in `lib/restaurantData.ts` to the single phone/email.
- Bulk replace content/test literals to the canonical values:
  - Phone: `+44 1223 375578` (display and tel sanitized to `tel:+441223375578`).
  - Email: `whitehorse@lapeninns.com`.
