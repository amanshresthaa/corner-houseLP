# Implementation Plan: Content Audit Cleanup

## Objective
Remove unused blog content, consolidate duplicates, and keep SSR SEO intact for legal pages.

## Success Criteria
- [ ] `pages.blog` removed from `config/content.json`
- [ ] `pages.offline`/`pages.notFound` reduced to `{}` in `config/content.json`
- [ ] Schema accepts `pages.privacyPolicy` SEO-only
- [ ] Manifest drops unused `legal` module and `pages/signin.json`, `pages/dashboard.json`
- [ ] Content validation passes

## Steps
1. Update `config/content.json` (remove blog; minimize offline/notFound)
2. Update `src/lib/data/schemas.ts` (add PrivacyLooseSchema, accept privacyPolicy)
3. Update `config/content/manifest.json` (remove legal module & signin/dashboard entries)
4. Delete `config/content/legal/*.json`
5. Optional: Clean `/blog` in `next-sitemap.config.js`
6. Run `npm run content:validate`

## Rollback
Revert changes via git.

