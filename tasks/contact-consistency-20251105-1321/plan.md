# Implementation Plan: Contact Consistency

## Objective
Ensure only one phone and one email exist across repo and centralize usage in code.

## Success Criteria
- No other phone numbers present in repo except `+44 1223 921122` and `tel:+441223921122`.
- No other email present except `cornerhouse@lapeninns.com`.
- Code paths derive contact from a single source (no hardcoded fallbacks).

## Architecture
- Source of truth: `config/restaurant.json` -> `lib/restaurantData.ts` -> `getContactInfo()`.
- Schema/SEO helpers consume `getContactInfo()` only.

## Implementation Steps
1. Update fallbacks in `lib/restaurantData.ts` (phone display, all emails, enquiryUrl).
2. Remove hardcoded fallbacks in `libs/schema.ts` for telephone/email.
3. Update config (`config/restaurant.json`, `config.ts` Mailgun).
4. Refactor components using hardcoded mailto/tel (e.g., SlideshowFallback).
5. Replace content JSON/MD literals and tests to canonical values.
6. Verify via repo scan and minimal UI smoke.

## Edge Cases
- Content placeholders and test fixtures: replaced to meet "only one email" requirement.
- tel: formatting normalized to `tel:+441223921122`.

## Testing
- Grep scan for emails/phones.
- Build and spot-check pages rendering contact info.
