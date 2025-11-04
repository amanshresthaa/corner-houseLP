# Implementation Checklist

## Setup
- [x] Create task folder and docs

## Core Cleanup
- [x] Remove `pages.blog` from `config/content.json`
- [x] Minimize `pages.offline` and `pages.notFound` to `{}`
- [x] Add `PrivacyLooseSchema` and accept `pages.privacyPolicy`
- [x] Remove `legal` module and delete `config/content/legal/*.json`
- [x] Remove `pages/signin.json` and `pages/dashboard.json` from manifest
- [x] Optional: remove blog excludes from `next-sitemap.config.js`

## Validation
- [x] Run `npm run content:validate`

## Notes/Deviations
- Keep SSR privacy/TOS SEO intact.
