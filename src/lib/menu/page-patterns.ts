import type { Menu } from '@/src/lib/data/schemas';
import type { QuickLinkItem } from '@/components/restaurant/sections/QuickLinksSection';

export interface MenuStats {
  totalSections: number;
  totalItems: number;
  vegetarianItems: number;
  veganItems: number;
  glutenFreeItems: number;
  spicyItems: number;
  priceRange: {
    min?: number;
    max?: number;
    currency?: string;
  };
}

export interface MenuHeroHighlight {
  label: string;
  value: string;
  description?: string;
}

export interface MenuFeaturedItem {
  id: string;
  name: string;
  sectionName: string;
  description?: string;
  priceLabel?: string;
  highlightTag?: string;
  dietaryBadges: string[];
}

export interface MenuPresetFilters {
  searchTerm?: string;
  dietary?: {
    vegetarian?: boolean;
    vegan?: boolean;
    glutenFree?: boolean;
    spicy?: boolean;
  };
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export interface MenuExplorePreset {
  id: string;
  label: string;
  description: string;
  badge?: string;
  filters: MenuPresetFilters;
}

export interface BuildMenuPageDataOptions {
  sections?: Menu['sections'];
  allergenNotice?: string;
  bookingUrl?: string;
  telHref?: string;
  orderUrl?: string;
  menuInformationHref?: string;
  contactDisplayPhone?: string;
}

export interface MenuPageData {
  stats: MenuStats;
  heroHighlights: MenuHeroHighlight[];
  dietaryHighlights: string[];
  quickLinks: QuickLinkItem[];
  featuredItems: MenuFeaturedItem[];
  explorePresets: MenuExplorePreset[];
}

export function buildMenuPageData(options: BuildMenuPageDataOptions = {}): MenuPageData {
  const sections = options.sections || [];
  const stats = buildMenuStats(sections);

  return {
    stats,
    heroHighlights: buildHeroHighlights(stats),
    dietaryHighlights: buildDietaryHighlights(stats, options.allergenNotice),
    quickLinks: buildMenuQuickLinks({
      bookingUrl: options.bookingUrl,
      telHref: options.telHref,
      orderUrl: options.orderUrl,
      menuInformationHref: options.menuInformationHref,
      contactDisplayPhone: options.contactDisplayPhone,
    }),
    featuredItems: buildMenuFeaturedItems(sections),
    explorePresets: buildMenuExplorePresets(stats),
  };
}

export function buildMenuStats(sections: Menu['sections'] = []): MenuStats {
  const stats: MenuStats = {
    totalSections: sections.length,
    totalItems: 0,
    vegetarianItems: 0,
    veganItems: 0,
    glutenFreeItems: 0,
    spicyItems: 0,
    priceRange: {},
  };

  for (const section of sections) {
    const items = section?.items || [];
    for (const item of items) {
      if (!item) continue;
      stats.totalItems += 1;

      if (item.dietary?.vegetarian) {
        stats.vegetarianItems += 1;
      }
      if (item.dietary?.vegan) {
        stats.veganItems += 1;
      }
      if (item.dietary?.glutenFree) {
        stats.glutenFreeItems += 1;
      }
      if (item.dietary?.spicy) {
        stats.spicyItems += 1;
      }

      if (item.price && typeof item.price.amount === 'number') {
        stats.priceRange.currency = stats.priceRange.currency || item.price.currency || 'GBP';
        if (typeof stats.priceRange.min !== 'number' || item.price.amount < stats.priceRange.min) {
          stats.priceRange.min = item.price.amount;
        }
        if (typeof stats.priceRange.max !== 'number' || item.price.amount > stats.priceRange.max) {
          stats.priceRange.max = item.price.amount;
        }
      }
    }
  }

  return stats;
}

export function buildHeroHighlights(stats: MenuStats): MenuHeroHighlight[] {
  const highlights: MenuHeroHighlight[] = [];

  if (stats.totalItems > 0) {
    highlights.push({
      label: 'Dishes',
      value: `${stats.totalItems}`,
      description: `${stats.totalSections || 0} menu sections`,
    });
  }

  if (stats.vegetarianItems > 0 && stats.totalItems > 0) {
    const percentage = Math.round((stats.vegetarianItems / stats.totalItems) * 100);
    highlights.push({
      label: 'Vegetarian-friendly',
      value: `${percentage}%`,
      description: `${stats.vegetarianItems}+ plates`,
    });
  }

  if (stats.glutenFreeItems > 0 && stats.totalItems > 0) {
    const percentage = Math.round((stats.glutenFreeItems / stats.totalItems) * 100);
    highlights.push({
      label: 'Gluten-free ready',
      value: `${percentage}%`,
      description: `${stats.glutenFreeItems}+ dishes marked`,
    });
  }

  if (
    typeof stats.priceRange.min === 'number' &&
    typeof stats.priceRange.max === 'number' &&
    stats.priceRange.currency
  ) {
    highlights.push({
      label: 'Price guide',
      value: formatPriceRange(stats.priceRange.min, stats.priceRange.max, stats.priceRange.currency),
      description: 'Avg mains & grills',
    });
  }

  return highlights;
}

export function buildDietaryHighlights(stats: MenuStats, allergenNotice?: string): string[] {
  const highlights: string[] = [];

  if (stats.veganItems > 0) {
    highlights.push(`${stats.veganItems}+ vegan dishes marked on the menu`);
  }

  if (stats.glutenFreeItems > 0) {
    highlights.push(`${stats.glutenFreeItems}+ gluten-free friendly plates`);
  }

  if (stats.spicyItems > 0) {
    highlights.push('Spice levels labelled so you can pick your heat');
  }

  if (stats.vegetarianItems > 0) {
    highlights.push('Vegetarian options available in every section');
  }

  if (allergenNotice) {
    highlights.push(allergenNotice);
  }

  return highlights.length ? Array.from(new Set(highlights)) : ['Call us for tailored allergen guidance.'];
}

export function buildMenuQuickLinks(options: {
  bookingUrl?: string;
  telHref?: string;
  orderUrl?: string;
  menuInformationHref?: string;
  contactDisplayPhone?: string;
}): QuickLinkItem[] {
  const links: QuickLinkItem[] = [];

  if (options.bookingUrl) {
    links.push({
      title: 'Reserve a table',
      description: 'Use our online booking portal for cabins, booths, or snug tables.',
      link: options.bookingUrl,
      linkText: 'Book now',
      eyebrow: 'Book ahead',
      ctaText: 'Open booking',
      accent: 'brand',
      icon: 'calendar',
    });
  }

  if (options.telHref) {
    links.push({
      title: 'Call for takeaway',
      description: options.contactDisplayPhone
        ? `Ring ${options.contactDisplayPhone} and order direct from the kitchen.`
        : 'Speak with the kitchen to place takeaway orders or ask for recommendations.',
      link: options.telHref,
      linkText: 'Call us',
      eyebrow: 'Hotline',
      ctaText: 'Dial now',
      accent: 'accent',
      icon: 'phone',
    });
  }

  if (options.menuInformationHref) {
		links.push({
			title: 'Dietary & allergen log',
			description: "Natasha's Law log and allergen guide updated daily for every dish.",
      link: options.menuInformationHref,
      linkText: 'View details',
      eyebrow: 'Food safety',
      ctaText: 'Browse guide',
      accent: 'amber',
      icon: 'menu',
    });
  }

  if (options.orderUrl) {
    links.push({
      title: 'Order delivery or collection',
      description: 'Skip the queue and have Nepalese favourites ready when you arrive.',
      link: options.orderUrl,
      linkText: 'Order online',
      eyebrow: 'Delivery',
      ctaText: 'Start order',
      accent: 'emerald',
      icon: 'takeaway',
    });
  }

  return links;
}

export function buildMenuFeaturedItems(sections: Menu['sections'] = [], limit = 3): MenuFeaturedItem[] {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  });

  const items = sections.flatMap((section) => {
    return (section.items || []).map((item) => {
      const badge = item.tags?.find((tag) => ['signature', 'chef', 'popular', 'special'].includes(tag.toLowerCase()));
      return {
        id: item.id || `${section.id}-${item.name}`,
        name: item.name,
        sectionName: section.name,
        description: item.description,
        priceLabel: item.price ? formatter.format(item.price.amount) : undefined,
        highlightTag: badge,
        dietaryBadges: Object.entries(item.dietary || {})
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key),
        priority: badge ? 2 : 0,
      };
    });
  });

  const sorted = items
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if (b.priceLabel && !a.priceLabel) return 1;
      if (a.priceLabel && !b.priceLabel) return -1;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);

  return sorted.map(({ priority, ...rest }) => rest);
}

export function buildMenuExplorePresets(stats: MenuStats): MenuExplorePreset[] {
  const presets: MenuExplorePreset[] = [];

  if (stats.vegetarianItems > 0) {
    presets.push({
      id: 'vegetarian',
      label: 'Vegetarian plates',
      description: `${stats.vegetarianItems}+ dishes marked veggie`,
      badge: 'Dietary',
      filters: { dietary: { vegetarian: true } },
    });
  }

  if (stats.veganItems > 0) {
    presets.push({
      id: 'vegan',
      label: 'Vegan picks',
      description: `${stats.veganItems}+ dairy-free favourites`,
      filters: { dietary: { vegan: true } },
    });
  }

  if (stats.glutenFreeItems > 0) {
    presets.push({
      id: 'glutenFree',
      label: 'Gluten-free care',
      description: `${stats.glutenFreeItems}+ plates flagged GF`,
      filters: { dietary: { glutenFree: true } },
    });
  }

  if (stats.spicyItems > 0) {
    presets.push({
      id: 'spicy',
      label: 'Fiery specials',
      description: `${stats.spicyItems}+ bold, spicy bites`,
      filters: { dietary: { spicy: true } },
    });
  }

  if (typeof stats.priceRange.min === 'number' && typeof stats.priceRange.max === 'number') {
    const midpoint = stats.priceRange.min + ((stats.priceRange.max - stats.priceRange.min) / 2);
    presets.push({
      id: 'budget',
      label: 'Under £' + Math.round(midpoint),
      description: 'Budget-friendly choices within minutes',
      badge: 'Value',
      filters: { priceRange: { max: Math.round(midpoint) } },
    });
  }

  if (!presets.length && stats.totalSections > 0) {
    presets.push({
      id: 'all',
      label: 'Show everything',
      description: 'Browse the full menu without filters',
      filters: {},
    });
  }

  return presets.slice(0, 5);
}

function formatPriceRange(min: number, max: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  if (min === max) {
    return formatter.format(min);
  }

  return `${formatter.format(min)}–${formatter.format(max)}`;
}
