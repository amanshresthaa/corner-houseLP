# Research: Components (Testimonials & FAQ) Migration

## Existing Data
- `components/testimonials.json`: Generic placeholder (Sarah Johnson, Mike Thompson) tied to White Horse/Waterbeach; minimal items.
- `components/faq.json`: White Horse-oriented answers (phone +44 1223 921122, free parking, children until 9pm) and online order reference.

## Corner House Facts to Use
- Phone/WhatsApp: +44 1223 921122 (main for bookings/takeaway) — CornerHouse1.
- Booking: Call or email cornerhouse@lapeninns.com; online booking page exists (book-a-table). Cabins can be reserved; recommended to book for big matches and groups.
- Hours: Kitchen Mon–Fri 12–15 & 17–22; Sat 12–22; Sun 12–21. Bar Mon–Thu/Sun 12–22; Fri–Sat 12–23.
- Parking: Small on-site car park (~10 spaces), limited; overflow at Cambridge Retail Park paid parking nearby — CornerHouse1.
- Takeaway/Delivery: Call & collect; available on Uber Eats, Deliveroo, Just Eat — CornerHouse1.
- Accessibility: Wheelchair ramp at rear, accessible WC; family- and dog-friendly — CornerHouse1.
- Events: Matchday hub with HD screens/projector; quiz nights and occasional live music/open mic — CornerHouse1/2.
- Ratings/Reviews to cite in testimonials:
  - Tony B. (TripAdvisor Nov 2025): “Superb Himali Lamb Curry… friendly staff.”
  - Colin S. (TripAdvisor Nov 2025): “Fantastic night… perfect for reunion.”
  - C.V. (TripAdvisor Oct 2025): “Old pub with a twist… great food and service… good beers and Sky Sports.”
  - Frances D. (TripAdvisor Jan 2025): “Family-friendly… handled dietary requests… cozy.”
  - Josh P. (Google Aug 2025): “Second time… same delicious curry… great value.”

## Constraints / Considerations
- Keep schema fields unchanged (title, subtitle, items with question/answer or name/text/rating/location).
- Answers should be concise, mobile-friendly, and match policies (limited parking, collection-first but delivery available via apps, family/dog friendly, accessibility).
- Avoid promising unlimited parking; highlight limited spaces and nearby alternatives.

## Open Questions
- Exact quiz night day not specified; phrase as “weekly quiz (check schedule)”.
- Whether children cutoff time exists; none specified for Corner House, so avoid strict cutoff.

## Proposed Content Direction
- Testimonials: 5 items from CornerHouse reviews, paraphrased and concise; include rating 5 where applicable and location when available.
- FAQ items (suggested): bookings, takeaway/delivery, parking, accessibility, sports screens/reservations for big games, diet/allergens, family/dog friendly, heated cabins booking.
