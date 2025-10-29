// Enhanced SEO Sitemap Generator - Restaurant-specific sitemap optimization
import { MetadataRoute } from 'next';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntryConfig {
  path: string;
  lastModified?: Date;
  changeFrequency?: ChangeFrequency;
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.oldcrowngirton.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  const lastWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);

  const createEntry = ({
    path,
    lastModified = currentDate,
    changeFrequency = 'monthly',
    priority = 0.5,
    alternates,
  }: SitemapEntryConfig) => ({
    url: `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`,
    lastModified,
    changeFrequency,
    priority,
    alternates,
  });

  const corePages = [
    createEntry({ path: '/', priority: 1, changeFrequency: 'weekly' }),
    createEntry({ path: '/menu', priority: 0.9, changeFrequency: 'daily' }),
    createEntry({ path: '/about', priority: 0.8, changeFrequency: 'monthly', lastModified: lastMonth }),
    createEntry({ path: '/contact', priority: 0.8, changeFrequency: 'monthly', lastModified: lastMonth }),
    createEntry({ path: '/book-a-table', priority: 0.78, changeFrequency: 'weekly', lastModified: lastWeek }),
    createEntry({ path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2024-01-01') }),
    createEntry({ path: '/tos', priority: 0.3, changeFrequency: 'yearly', lastModified: new Date('2024-01-01') }),
  ];

  const eventPages = [
    createEntry({ path: '/events', priority: 0.82, changeFrequency: 'weekly', lastModified: lastWeek }),
    createEntry({
      path: '/events/curry-and-carols',
      priority: 0.88,
      changeFrequency: 'weekly',
      lastModified: currentDate,
    }),
  ];

  const groupedEntries = [...corePages, ...eventPages];

  // Deduplicate by URL while preserving highest priority entry
  const dedupedEntries = Array.from(
    groupedEntries
      .reduce((acc, entry) => {
        const existing = acc.get(entry.url);
        if (!existing || (entry.priority ?? 0) > (existing.priority ?? 0)) {
          acc.set(entry.url, entry);
        }
        return acc;
      }, new Map<string, ReturnType<typeof createEntry>>())
      .values()
  );

  return dedupedEntries.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}
