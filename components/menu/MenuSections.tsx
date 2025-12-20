'use client';

import { useCallback } from 'react';
import type { Menu } from '@/src/lib/data/schemas';

type Props = {
  sections: Menu['sections'];
  selectedId?: string | null;
  className?: string;
  tone?: 'light' | 'dark';
};

/**
 * MenuSections component with card layout and improved accessibility
 * Maintains performance optimizations from the original while adding new features
 * Follows scroll-performance-conflict-resolution from memory
 */
export default function MenuSections({
  sections,
  selectedId,
  className = '',
  tone = 'light'
}: Props) {
  const isDark = tone === 'dark';



  const formatPrice = useCallback((item: Menu['sections'][0]['items'][0]) => {
    if (!item?.price) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: item.price.currency || 'GBP',
      maximumFractionDigits: 0,
    }).format(item.price.amount);
  }, []);

  // Filter sections based on selectedId (from URL hash / nav selection).
  // Normalize first so hashes like '#Mixed_Grills' still match.
  const normalizedSelectedId = selectedId
    ? String(selectedId).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : null;

  const matchingSections = normalizedSelectedId
    ? sections.filter((section) => {
      const sectionId = ((section.id || section.name || '') as string)
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');
      return sectionId === normalizedSelectedId;
    })
    : sections; // Show all sections when selectedId is null/undefined

  // If the selectedId doesn't correspond to any real menu section (e.g. legacy '#drinks'),
  // fall back to rendering the full menu instead of an empty state.
  const displaySections =
    normalizedSelectedId && matchingSections.length === 0 ? sections : matchingSections;

  // Early return if no sections to display
  if (!displaySections || displaySections.length === 0) {
    return (
      <div className={`py-16 text-center ${isDark ? 'text-neutral-100' : ''}`}>
        <div className="max-w-md mx-auto">
          <svg
            className={`mx-auto h-12 w-12 ${isDark ? 'text-neutral-400' : 'text-neutral-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className={`mt-4 text-lg font-medium ${isDark ? 'text-neutral-50' : 'text-neutral-900'}`}>
            No menu items found
          </h3>
          <p className={`mt-2 text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-500'}`}>
            No menu items are currently available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {displaySections.map((section, index) => {
        const sectionId = ((section.id || section.name || '') as string)
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');

        // Skip sections with no items
        if (!section.items || section.items.length === 0) {
          return null;
        }

        const isLast = index === displaySections.length - 1;

        return (
          <section
            key={sectionId}
            id={sectionId}
            className={`py-8 ${!isLast ? 'border-b border-dashed border-brand-100/50' : ''} ${isDark ? 'text-neutral-100 border-white/10' : ''}`}
            aria-labelledby={`section-${sectionId}-title`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-6">
              <div>
                <h2
                  id={`section-${sectionId}-title`}
                  className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-brand-800'}`}
                >
                  {section.name}
                </h2>
                {section.description && (
                  <p className={`text-sm sm:text-base mt-1 ${isDark ? 'text-white/80' : 'text-brand-600'}`}>
                    {section.description}
                  </p>
                )}
              </div>
              <div className={`text-xs uppercase tracking-[0.3em] shrink-0 ${isDark ? 'text-white/60' : 'text-brand-500'}`}>
                {section.items.length} item{section.items.length !== 1 ? 's' : ''}
              </div>
            </div>

            <ul
              className={`divide-y ${isDark ? 'divide-white/10' : 'divide-brand-100/40'}`}
              role="list"
              aria-label={`${section.name} menu items`}
            >
              {section.items.map((item) => {
                const priceLabel = formatPrice(item);
                const dietary = item.dietary || {};
                const badges: string[] = [];
                if (dietary.vegetarian) badges.push('Vegetarian');
                if (dietary.vegan) badges.push('Vegan');
                if (dietary.glutenFree) badges.push('Gluten-free');
                if (dietary.spicy) badges.push('Spicy');

                return (
                  <li key={item.id || item.name} className="py-4 first:pt-0 last:pb-0" role="listitem">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1 space-y-1">
                        <h3 className={`text-base sm:text-lg font-display font-semibold leading-tight ${isDark ? 'text-white' : 'text-brand-900'}`}>
                          {item.name}
                        </h3>
                        {item.description && (
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-brand-600'}`}>
                            {item.description}
                          </p>
                        )}
                        {badges.length ? (
                          <div className="flex flex-wrap gap-2 pt-1 text-[0.65rem] font-medium uppercase tracking-wider">
                            {badges.map((badge) => (
                              <span
                                key={badge}
                                className={`rounded px-1.5 py-0.5 ${isDark ? 'bg-white/10 text-white/80' : 'bg-brand-50 text-brand-700'}`}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="shrink-0 sm:text-right pt-1 sm:pt-0">
                        {priceLabel ? (
                          <span className={`text-base font-semibold ${isDark ? 'text-white' : 'text-brand-900'}`}>
                            {priceLabel}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
