# Implementation Checklist

## Content Updates
- [x] Update `config/content/components/testimonials.json` with Corner House reviews.
- [x] Update `config/content/components/faq.json` with Corner House-specific Q&A.

## Validation
- [x] Run `python3 -m json.tool` on both files.

## Documentation
- [x] Record assumptions (delivery availability wording, quiz night schedule) in task notes.
- [ ] Prepare verification steps for DevTools QA.

### Assumptions Logged
- Delivery apps (Uber Eats, Deliveroo, Just Eat) availability may vary by time/radius; phrased as “when available”.
- Quiz night cadence not specified; set to weekly with “check schedule”.
