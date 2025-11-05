# Research: Press Page Articles

## Existing Patterns
- Next.js app with `app/press/page.tsx` renders a Press Kit but no articles.
- Content source via `getContentSmart()` wired to `config/content.json` and page-level JSON files.
- Press items exist in `config/content.json` under `pages.home.sections.pressTicker.items` (Ely Standard and Cambridge News), each with `title`, `summary`, and `href`.
- SEO for Press lives at `pages.press.seo` in `config/content.json` and is already used by `generateMetadata()`.

## External Resources
- Ely Standard article: https://www.elystandard.co.uk/news/24942044.white-horse-waterbeach-reopens-nepalese-restaurant/
- Cambridge News article: https://www.cambridge-news.co.uk/whats-on/food-drink-news/cambridgeshire-village-pub-reopens-new-30923154

## Technical Constraints
- Keep to existing component/layout patterns (`RestaurantLayout`, motion wrappers, Link helper).
- Accessibility and keyboard navigation must meet AGENTS.md requirements.
- Prefer DaisyUI/Tailwind patterns already in the codebase.

## Recommendations
- Render a new "Media Coverage" section on the Press page.
- Read press items from the existing `pressTicker.items` content to avoid duplicating data.
- Display: source badge, headline (derived by splitting title on ':'), summary, and an external link with proper `rel`/`target`.
- Use semantic elements: section+heading, article per item, and cite.
