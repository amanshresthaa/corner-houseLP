# Implementation Checklist

## Content Updates
- [x] Update `config/content/pages/home.json` hero, features, quick links, CTA, reviews context, and SEO schema to Corner House Cambridge.
- [x] Update `config/content/pages/about.json` SEO, hero, story intro, timeline, and CTA/contact block.
- [x] Update `config/content/pages/contact.json` SEO, contact info, address, features to reflect Corner House.
- [x] Update `config/content/pages/events.json` SEO, hero, regular events to Corner House matchdays/quiz/cabins.

## Validation
- [x] Run `python3 -m json.tool` on each modified page JSON.

## Documentation
- [x] Note any assumptions (domain, social/booking links) in task docs.
- [ ] Prepare verification steps for DevTools QA (post-content swap).

### Assumptions Logged
- Canonical domain set to `https://thecornerhousepub.co/` (aligns with booking link used in core content); replace if a different official domain is provided.
- Social/press links point to `/press` until confirmed external URLs are supplied.
- Quiz night/live music cadence set generically (“weekly”, “monthly pop-ups”) pending confirmed schedule.
