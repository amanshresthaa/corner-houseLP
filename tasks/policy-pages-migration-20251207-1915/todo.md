# Implementation Checklist

## Content Updates
- [x] Update `config/content/pages/privacy.json` with Corner House identity/contact details.
- [x] Update `config/content/pages/tos.json` SEO fields to Corner House Cambridge.
- [x] Populate `config/content/pages/offline.json` with branded offline copy and CTA.
- [x] Populate `config/content/pages/notFound.json` with 404 copy and CTA.
- [x] Update `config/content/pages/signin.json` branding and placeholder email.
- [x] Review `config/content/pages/dashboard.json` subtitle for alignment.

## Validation
- [x] Run `python3 -m json.tool` on all modified files.

## Documentation
- [x] Record assumptions (domain, contact email) in task notes.
- [ ] Prepare verification steps for DevTools QA.

### Assumptions Logged
- Domain assumed `https://thecornerhousepub.co/` for ToS/SEO; update if canonical differs.
- Primary contact email set to `cornerhouse@lapeninns.com` for privacy rights and sign-in placeholder; management address `cornerhouse@lapeninns.com` not added to policy to keep a single contact point.
