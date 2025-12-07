# Implementation Checklist

## Code
- [x] Centralize schema phone/email on `getContactInfo()`
- [x] Update fallbacks in `lib/restaurantData.ts`
- [x] Update `config/restaurant.json` + `config.ts` Mailgun
- [x] Refactor SlideshowFallback support mailto

## Content & Tests
- [x] Replace all Gmail/whitehorsepub.co/dev/staging emails
- [x] Replace all local-number and legacy numbers
- [x] Normalize tel: to `tel:+441223921122`
- [x] Update placeholders in content and BookingForm
- [x] Update tests to use canonical email/phone

## Verification
- [x] Repo scan: only canonical email present
- [x] Repo scan: only canonical phone present
- [ ] Manual UI QA with DevTools (pending build/run)
