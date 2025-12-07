import { composeContentFromModules } from '@/src/lib/content/composer';
import { ContentSchema } from '@/src/lib/data/schemas';

describe('content composer', () => {
  it('composes modules into ContentSchema-compliant object (dev)', async () => {
    const composed = await composeContentFromModules('dev');
    const parsed = ContentSchema.parse(composed);
    expect(parsed.global.site.name.length).toBeGreaterThan(0);
    expect(parsed.pages.home.hero.title.length).toBeGreaterThan(0);
  });
});
