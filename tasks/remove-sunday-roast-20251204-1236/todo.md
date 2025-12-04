# Implementation Checklist

## Content Updates
- [x] Remove roast mentions from `config/content.json` (home/about/menu hero/subtitles) and `config/content/pages/home.json` quick links/hero.
- [x] Update `config/content/pages/events.json` and `config/marketing.json` to replace the Sunday roast promo/event.
- [x] Clean `config/content/core/global.json` keywords and `config/restaurant.json` description/display hours.
- [x] Update fallback/override text in `config.ts` and `src/lib/content/environment.ts`.

## Env & Data Parity
- [x] Mirror testimonial copy changes in `data/staging/content.json` and `data/prod/content.json`.
- [x] Adjust `lib/restaurantData.ts` Sunday display text.

## Components & Assets
- [x] Refresh copy in `app/book-a-table/page.tsx` and `components/restaurant/TestimonialsSection.tsx`.
- [x] Replace roast items in `components/optimization/CLSOptimizedComponents.tsx` and prune roast entries from `src/lib/images.ts`.
- [x] Update test mocks in `test-utils/mocks/handlers.ts`.

## Validation & QA
- [x] Run `npm run content:validate`.
- [x] Manual QA via Chrome DevTools MCP on home/menu/events/booking pages.
