import { BRAND } from '@/src/lib/constants/brand';

export type TimelineEntry = {
  period?: string;
  title?: string;
  description?: string;
};

export type HeroStat = {
  label: string;
  value: string;
  description?: string;
};

const PARAGRAPH_FALLBACK = [
  `Built in the 1930s, ${BRAND.shortName} has always been the neighbourhood’s corner pub — now blending art-deco charm with Nepalese soul.`,
  'In late 2024 the Lapen Inns team relaunched the house with a full Nepalese kitchen, HD sports, and heated cabins so the community could keep celebrating together.',
];

export function splitParagraphs(copy?: string): string[] {
  if (!copy) {
    return PARAGRAPH_FALLBACK;
  }
  return copy
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function buildHeroStats(timeline: TimelineEntry[]): HeroStat[] {
  const first = timeline[0];
  const award = timeline.find((entry) => /camra|award|choice/i.test(entry.title ?? '') || /2020/.test(entry.period ?? ''));
  const latest = timeline[timeline.length - 1];

  return [
    {
      label: 'Since',
      value: first?.period ?? '1930s',
      description: first?.title ?? 'Art-deco corner pub opens',
    },
    {
      label: 'Recognition',
      value: award?.title ?? 'CAMRA award',
      description: award?.description ?? 'Most Improved City Pub 2020',
    },
    {
      label: 'Today',
      value: latest?.period ?? '2025',
      description: latest?.title ?? 'Nepalese kitchen & heated cabins',
    },
  ];
}
