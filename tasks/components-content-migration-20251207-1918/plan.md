# Implementation Plan: Testimonials & FAQ Migration

## Objective
Replace White Horse placeholder testimonials and FAQ with Corner House Cambridge-specific reviews and Q&A while preserving schema structure.

## Success Criteria
- [ ] testimonials.json contains Corner House title/subtitle and 5 real, concise guest quotes with ratings/locations.
- [ ] faq.json answers reflect Corner House phone, parking (limited), takeaway/delivery options, accessibility, family/dog friendliness, matchday/quiz nights, and booking guidance.
- [ ] JSON validates against existing schema.

## Steps
1) Draft new testimonials items from CornerHouse1 reviews (Tony B., Colin S., C.V., Frances D., Josh P.).
2) Rewrite FAQ questions/answers to Corner House specifics (booking/online, parking, delivery, accessibility, sports bookings, allergens, family/dog, cabins).
3) Validate both files with `python3 -m json.tool`.

## Edge Cases
- Keep answers concise for small-screen readability.
- Avoid overpromising parking; mention limited spaces and nearby retail park.
- Mention delivery partners without guaranteeing availability windows.

## Testing
- JSON syntax validation.
- Later manual UI spot-check after deploy.
