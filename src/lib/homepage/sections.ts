import type { HomepageAboutContent } from '@/components/homepage/HomepageAboutSection';
import type { SignatureDish } from '@/components/homepage/HomepageSignatureDishes';
import type {
  ReviewHighlight,
  ReviewHero,
  ReviewSpotlight,
  ReviewStat,
} from '@/components/homepage/HomepageReviewHighlights';
import type { PressTickerItem } from '@/components/homepage/PressTicker';
import type { QuickLinkItem } from '@/components/restaurant/sections/QuickLinksSection';
import type { CTAButton } from '@/components/restaurant/sections/CallToActionSection';

export type HomeSectionKey =
  | 'pressTicker'
  | 'about'
  | 'signatureDishes'
  | 'reviews'
  | 'quickLinks'
  | 'closingCta';

export interface PressTickerSection {
  label?: string;
  items: PressTickerItem[];
}
export interface ClosingCtaSection {
  headline: string;
  description: string;
  buttons: CTAButton[];
}

export interface SignatureHero {
  eyebrow?: string;
  title?: string;
  description?: string;
  quote?: string;
  quoteBy?: string;
  cta?: {
    text: string;
    href: string;
  };
}

export interface SignatureDishExtended extends SignatureDish {
  tags?: string[];
  spiceLevel?: string;
  price?: string;
  featured?: boolean;
  callout?: string;
}

export interface NormalizedHomeSections {
  pressTicker?: PressTickerSection | null;
  about?: HomepageAboutContent | null;
  signatureDishes?: {
    title?: string;
    subtitle?: string;
    hero?: SignatureHero;
    items: SignatureDishExtended[];
  } | null;
  reviews?: {
    title?: string;
    subtitle?: string;
    hero?: ReviewHero;
    stats?: ReviewStat[];
    spotlights?: ReviewSpotlight[];
    items: ReviewHighlight[];
  } | null;
  quickLinks?: QuickLinkItem[] | null;
  closingCta?: ClosingCtaSection | null;
}

export const HOME_SECTION_ORDER: HomeSectionKey[] = [
  'pressTicker',
  'about',
  'signatureDishes',
  'reviews',
  'quickLinks',
  'closingCta',
];

type RawSections = Record<string, unknown> | undefined | null;

const isString = (value: unknown): value is string => typeof value === 'string';

const allowedCtaVariants: Array<CTAButton['variant']> = ['accent', 'brand', 'crimson'];

const coerceStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string' && Boolean(item.trim()))
    .map((item) => item.trim());
};

const normalizePressTicker = (raw: unknown): PressTickerSection | null => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const obj = raw as Record<string, unknown>;
  const items: Array<PressTickerItem | null> = Array.isArray(obj.items)
    ? obj.items
        .map((item) => {
          if (!item || typeof item !== 'object') {
            return null;
          }
          const title = (item as any).title;
          if (!isString(title) || !title.trim()) {
            return null;
          }
          const summary = isString((item as any).summary) ? (item as any).summary.trim() : undefined;
          const ctaText = isString((item as any).ctaText) ? (item as any).ctaText.trim() : undefined;
          const href = isString((item as any).href) ? (item as any).href.trim() : undefined;
          const entry: PressTickerItem = {
            title: title.trim(),
          };
          if (summary) entry.summary = summary;
          if (ctaText) entry.ctaText = ctaText;
          if (href) entry.href = href;
          return entry;
        })
        .filter((item): item is PressTickerItem => Boolean(item))
    : [];

  if (!items.length) {
    return null;
  }

  const label = isString(obj.label) ? obj.label.trim() : undefined;
  return {
    label,
    items,
  } satisfies PressTickerSection;
};

const normalizeAbout = (raw: unknown): HomepageAboutContent | null => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const obj = raw as Record<string, unknown>;
  const title = isString(obj.title) ? obj.title : undefined;
  const tagline = isString(obj.tagline) ? obj.tagline : undefined;
  const description = coerceStringArray(obj.description);
  const features = coerceStringArray(obj.features);
  type AboutStat = { value: string; label: string; description?: string };
  const stats: AboutStat[] = Array.isArray(obj.stats)
    ? ((obj.stats
        .map((stat) => {
          if (!stat || typeof stat !== 'object') {
            return null;
          }
          const value = (stat as any).value;
          const label = (stat as any).label;
          if (!isString(value) || !value.trim() || !isString(label) || !label.trim()) {
            return null;
          }
          const description = isString((stat as any).description) ? (stat as any).description : undefined;
          return {
            value: value.trim(),
            label: label.trim(),
            description,
          };
        })
        .filter(Boolean)) as AboutStat[])
    : [];
  type AboutCta = { text: string; href: string };
  const ctaLinks: AboutCta[] = Array.isArray(obj.ctaLinks)
    ? ((obj.ctaLinks
        .map((cta) => {
          if (!cta || typeof cta !== 'object') {
            return null;
          }
          const text = (cta as any).text;
          const href = (cta as any).href;
          if (!isString(text) || !text.trim() || !isString(href) || !href.trim()) {
            return null;
          }
          return {
            text: text.trim(),
            href: href.trim(),
          };
        })
        .filter(Boolean)) as AboutCta[])
    : [];
  type AboutMilestone = { year: string; title?: string; copy?: string };
  const milestones = Array.isArray(obj.milestones)
    ? ((obj.milestones
        .map((milestone) => {
          if (!milestone || typeof milestone !== 'object') {
            return null;
          }
          const year = (milestone as any).year;
          const title = (milestone as any).title;
          const copy = (milestone as any).copy;
          if (!isString(year) || !year.trim()) {
            return null;
          }
          if (!isString(title) && !isString(copy)) {
            return null;
          }
          return {
            year: year.trim(),
            title: isString(title) ? title : undefined,
            copy: isString(copy) ? copy : undefined,
          };
        })
        .filter(Boolean)) as AboutMilestone[])
    : [];
  type AboutGallery = { src: string; alt?: string; label?: string };
  const gallery = Array.isArray(obj.gallery)
    ? ((obj.gallery
        .map((item) => {
          if (!item || typeof item !== 'object') {
            return null;
          }
          const src = (item as any).src;
          if (!isString(src) || !src.trim()) {
            return null;
          }
          const alt = isString((item as any).alt) ? (item as any).alt : undefined;
          const label = isString((item as any).label) ? (item as any).label : undefined;
          return {
            src: src.trim(),
            alt,
            label,
          };
        })
        .filter(Boolean)) as AboutGallery[])
    : [];
  const image = obj.image && typeof obj.image === 'object'
    ? {
        src: isString((obj.image as any).src) ? (obj.image as any).src : undefined,
        alt: isString((obj.image as any).alt) ? (obj.image as any).alt : undefined,
      }
    : undefined;

  if (!title && !description.length && !features.length && !image?.src) {
    return null;
  }

  return {
    title,
    tagline,
    description,
    features,
    image,
    stats,
    ctaLinks,
    milestones,
    gallery,
  };
};

const normalizeSignatureDishes = (raw: unknown): NormalizedHomeSections['signatureDishes'] => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const obj = raw as Record<string, unknown>;

  const hero = obj.hero && typeof obj.hero === 'object'
    ? {
        eyebrow: isString((obj.hero as any).eyebrow) ? (obj.hero as any).eyebrow : undefined,
        title: isString((obj.hero as any).title) ? (obj.hero as any).title : undefined,
        description: isString((obj.hero as any).description) ? (obj.hero as any).description : undefined,
        quote: isString((obj.hero as any).quote) ? (obj.hero as any).quote : undefined,
        quoteBy: isString((obj.hero as any).quoteBy) ? (obj.hero as any).quoteBy : undefined,
        cta:
          (obj.hero as any).cta && typeof (obj.hero as any).cta === 'object'
            ? (() => {
                const text = (obj.hero as any).cta.text;
                const href = (obj.hero as any).cta.href;
                if (isString(text) && text.trim() && isString(href) && href.trim()) {
                  return { text: text.trim(), href: href.trim() };
                }
                return undefined;
              })()
            : undefined,
      }
    : undefined;

  const coerceTags = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
      return [];
    }
    return value
      .map((tag) => (isString(tag) ? tag.trim() : ''))
      .filter((tag) => Boolean(tag));
  };

  const items: Array<SignatureDishExtended | null> = Array.isArray(obj.items)
    ? obj.items
        .map((item) => {
          if (!item || typeof item !== 'object') {
            return null;
          }
          const name = (item as any).name;
          if (!isString(name) || !name.trim()) {
            return null;
          }
          const description = isString((item as any).description) ? (item as any).description : undefined;
          const image = isString((item as any).image) ? (item as any).image : undefined;
          const tags = coerceTags((item as any).tags);
          const spiceLevel = isString((item as any).spiceLevel) ? (item as any).spiceLevel : undefined;
          const price = isString((item as any).price) ? (item as any).price : undefined;
          const callout = isString((item as any).callout) ? (item as any).callout : undefined;
          const featuredRaw = (item as any).featured;
          const dish: SignatureDishExtended = {
            name: name.trim(),
          };
          if (description) dish.description = description;
          if (image) dish.image = image;
          if (tags.length) dish.tags = tags;
          if (spiceLevel) dish.spiceLevel = spiceLevel;
          if (price) dish.price = price;
          if (callout) dish.callout = callout;
          if (typeof featuredRaw === 'boolean') {
            dish.featured = featuredRaw;
          }
          return dish;
        })
        .filter((item): item is SignatureDishExtended => Boolean(item))
    : [];

  if (!items.length) {
    return null;
  }

  const title = isString(obj.title) ? obj.title : undefined;
  const subtitle = isString(obj.subtitle) ? obj.subtitle : undefined;

  return {
    title,
    subtitle,
    hero,
    items,
  };
};

const normalizeReviews = (raw: unknown): NormalizedHomeSections['reviews'] => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const obj = raw as Record<string, unknown>;

  const hero: ReviewHero | undefined = obj.hero && typeof obj.hero === 'object'
    ? {
        eyebrow: isString((obj.hero as any).eyebrow) ? (obj.hero as any).eyebrow : undefined,
        title: isString((obj.hero as any).title) ? (obj.hero as any).title : undefined,
        description: isString((obj.hero as any).description) ? (obj.hero as any).description : undefined,
        cta:
          (obj.hero as any).cta && typeof (obj.hero as any).cta === 'object'
            ? (() => {
                const text = (obj.hero as any).cta.text;
                const href = (obj.hero as any).cta.href;
                if (isString(text) && text.trim() && isString(href) && href.trim()) {
                  return { text: text.trim(), href: href.trim() };
                }
                return undefined;
              })()
            : undefined,
        badge:
          (obj.hero as any).badge && typeof (obj.hero as any).badge === 'object'
            ? (() => {
                const label = (obj.hero as any).badge.label;
                const value = (obj.hero as any).badge.value;
                if (!isString(label) || !label.trim()) {
                  return undefined;
                }
                return {
                  label: label.trim(),
                  value: isString(value) ? value : undefined,
                };
              })()
            : undefined,
      }
    : undefined;

  const statsEntries: ReviewStat[] = Array.isArray(obj.stats)
    ? ((obj.stats
        .map((stat) => {
          if (!stat || typeof stat !== 'object') {
            return null;
          }
          const value = (stat as any).value;
          const label = (stat as any).label;
          if (!isString(value) || !value.trim() || !isString(label) || !label.trim()) {
            return null;
          }
          const description = isString((stat as any).description) ? (stat as any).description : undefined;
          return {
            value: value.trim(),
            label: label.trim(),
            description,
          } satisfies ReviewStat;
        })
        .filter(Boolean)) as ReviewStat[])
    : [];
  const stats = statsEntries.length ? statsEntries : undefined;

  const spotlightsEntries: ReviewSpotlight[] = Array.isArray(obj.spotlights)
    ? ((obj.spotlights
        .map((spotlight) => {
          if (!spotlight || typeof spotlight !== 'object') {
            return null;
          }
          const title = (spotlight as any).title;
          if (!isString(title) || !title.trim()) {
            return null;
          }
          const copy = isString((spotlight as any).copy) ? (spotlight as any).copy : undefined;
          const accent = isString((spotlight as any).accent) ? (spotlight as any).accent : undefined;
          const entry: ReviewSpotlight = {
            title: title.trim(),
          };
          if (copy) entry.copy = copy;
          if (accent) entry.accent = accent;
          return entry;
        })
        .filter(Boolean)) as ReviewSpotlight[])
    : [];
  const spotlights = spotlightsEntries.length ? spotlightsEntries : undefined;

  const items: Array<ReviewHighlight | null> = Array.isArray(obj.items)
    ? obj.items
        .map((item) => {
          if (!item || typeof item !== 'object') {
            return null;
          }
          const quote = (item as any).quote;
          if (!isString(quote) || !quote.trim()) {
            return null;
          }
          const source = isString((item as any).source) ? (item as any).source : undefined;
          const platform = isString((item as any).platform) ? (item as any).platform : undefined;
          const ratingRaw = (item as any).rating;
          const date = isString((item as any).date) ? (item as any).date : undefined;
          const accent = isString((item as any).accent) ? (item as any).accent : undefined;
          const featuredRaw = (item as any).featured;
          const rating = typeof ratingRaw === 'number' ? ratingRaw : undefined;
          const entry: ReviewHighlight = {
            quote: quote.trim(),
          };
          if (source) entry.source = source;
          if (platform) entry.platform = platform;
          if (typeof rating === 'number') entry.rating = rating;
          if (date) entry.date = date;
          if (accent) entry.accent = accent;
          if (typeof featuredRaw === 'boolean') {
            entry.featured = featuredRaw;
          }
          return entry;
        })
        .filter((item): item is ReviewHighlight => Boolean(item))
    : [];

  if (!items.length) {
    return null;
  }

  const title = isString(obj.title) ? obj.title : undefined;
  const subtitle = isString(obj.subtitle) ? obj.subtitle : undefined;

  return {
    title,
    subtitle,
    hero,
    stats,
    spotlights,
    items,
  };
};

const normalizeQuickLinks = (raw: unknown): QuickLinkItem[] | null => {
  if (!Array.isArray(raw)) {
    return null;
  }

  const items: Array<QuickLinkItem | null> = raw
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      const title = (item as any).title;
      const description = (item as any).description;
      const link = (item as any).link;
      const linkText = (item as any).linkText;
      if (![title, description, link, linkText].every((value) => isString(value) && Boolean(value.trim()))) {
        return null;
      }
      return {
        title: (title as string).trim(),
        description: (description as string).trim(),
        link: (link as string).trim(),
        linkText: (linkText as string).trim(),
      } as QuickLinkItem;
    })
    .filter((item): item is QuickLinkItem => Boolean(item));

  return items.length ? items : null;
};

const normalizeClosingCta = (raw: unknown): ClosingCtaSection | null => {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const obj = raw as Record<string, unknown>;
  if (!isString(obj.headline) || !obj.headline.trim()) {
    return null;
  }

  const buttons: Array<CTAButton | null> = Array.isArray(obj.buttons)
    ? obj.buttons
        .map((button) => {
          if (!button || typeof button !== 'object') {
            return null;
          }
          const text = (button as any).text;
          const href = (button as any).href;
          if (!isString(text) || !text.trim() || !isString(href) || !href.trim()) {
            return null;
          }
          const variant = (button as any).variant as CTAButton['variant'];
          const resolvedVariant: CTAButton['variant'] = allowedCtaVariants.includes(variant)
            ? variant
            : 'accent';
          const entry: CTAButton = {
            text: text.trim(),
            href: href.trim(),
            variant: resolvedVariant,
          };
          if ((button as any).external !== undefined) {
            entry.external = Boolean((button as any).external);
          }
          if (isString((button as any).key)) {
            entry.key = (button as any).key;
          }
          return entry;
        })
        .filter((button): button is CTAButton => Boolean(button))
    : [];

  if (!buttons.length) {
    return null;
  }

  const description = isString(obj.description) ? obj.description : '';

  return {
    headline: obj.headline.trim(),
    description,
    buttons,
  };
};

export interface HomeSectionsPayload {
  sections: NormalizedHomeSections;
  order: HomeSectionKey[];
}

export function buildHomeSections(rawSections: RawSections): HomeSectionsPayload {
  const source = (rawSections && typeof rawSections === 'object' ? rawSections : {}) as Record<string, unknown>;

  const normalized: NormalizedHomeSections = {
    pressTicker: normalizePressTicker(source.pressTicker),
    about: normalizeAbout(source.about),
    signatureDishes: normalizeSignatureDishes(source.signatureDishes),
    reviews: normalizeReviews(source.reviews),
    quickLinks: normalizeQuickLinks(source.quickLinks),
    closingCta: normalizeClosingCta(source.cta),
  };

  const order = HOME_SECTION_ORDER.filter((key) => {
    const value = normalized[key as keyof NormalizedHomeSections];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  });

  return {
    sections: normalized,
    order,
  };
}
