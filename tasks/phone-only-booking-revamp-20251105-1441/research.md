# Research: Phone-only Booking Revamp

## Existing Page
- `app/book-a-table/page.tsx` contained an "Online Booking Request" card using `<BookingForm />`.
- Page hero copy referenced submitting a form.
- Schema included a ReserveAction implying online reservation.

## Constraints
- Switch to calls-only booking.
- Keep accessibility and visual consistency (brand gradient hero, card layout).

## Decisions
- Remove `<BookingForm />` and replace with a primary "Book by Phone" card + CTA.
- Update hero copy to instruct calling.
- Adjust tips to remove "form" references.
- Remove ReserveAction in schema; set `acceptsReservations` to "Telephone".
