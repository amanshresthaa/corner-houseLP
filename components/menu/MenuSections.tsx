'use client';

import { useCallback } from 'react';
import type { Menu } from '@/src/lib/data/schemas';

type Props = {
  sections: Menu['sections'];
  selectedId?: string | null;
  searchTerm?: string;
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
  searchTerm = '',
  className = '',
  tone = 'light'
}: Props) {
  const isDark = tone === 'dark';

  const highlightText = useCallback((text?: string) => {
    if (!text) return '';
    if (!searchTerm) return text;
    const safeTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <mark key={`${part}-${index}`} className="bg-accent-200 text-accent-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      )
    );
  }, [searchTerm]);

  const formatPrice = useCallback((item: Menu['sections'][0]['items'][0]) => {
    if (!item?.price) return '';
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: item.price.currency || 'GBP',
      maximumFractionDigits: 0,
    }).format(item.price.amount);
  }, []);

  // Filter sections based on selectedId
  const displaySections = selectedId 
    ? sections.filter(section => {
        const sectionId = ((section.id || section.name || '') as string)
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');
        return sectionId === selectedId;
      })
    : sections; // Show all sections when selectedId is null/undefined

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
            {searchTerm 
              ? `No items match your search for "${searchTerm}"`
              : 'No menu items are currently available'
            }
          </p>
        </div>
      </div>
    );
  }

	return (
		<div className={className}>
			{displaySections.map((section) => {
        const sectionId = ((section.id || section.name || '') as string)
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-');

        // Skip sections with no items
        if (!section.items || section.items.length === 0) {
          return null;
        }

				return (
					<section
						key={sectionId}
						id={sectionId}
						className={`py-10 sm:py-16 ${isDark ? 'text-neutral-100' : ''}`}
						aria-labelledby={`section-${sectionId}-title`}
					>
						<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
							<div className={`rounded-[2.5rem] border ${isDark ? 'border-white/15 bg-white/5 backdrop-blur' : 'border-brand-100 bg-white/95'} p-6 shadow-lg sm:p-8`}>
								<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<h2
											id={`section-${sectionId}-title`}
											className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-brand-800'}`}
										>
											{section.name}
										</h2>
										{section.description && (
											<p className={`text-sm sm:text-base ${isDark ? 'text-white/80' : 'text-brand-600'}`}>
												{section.description}
											</p>
										)}
									</div>
									<div className={`text-xs uppercase tracking-[0.3em] ${isDark ? 'text-white/60' : 'text-brand-500'}`}>
										{section.items.length} item{section.items.length !== 1 ? 's' : ''}
									</div>
								</div>

								<div
									className={`rounded-[2rem] border ${isDark ? 'border-white/10 bg-white/5' : 'border-brand-50 bg-white'} max-h-none overflow-visible px-3 py-2 pr-3 sm:px-4 lg:max-h-[32rem] lg:overflow-y-auto`}
									data-testid={`section-list-${sectionId}`}
									role="region"
									aria-labelledby={`section-${sectionId}-title`}
									tabIndex={0}
								>
									<ul
										className={`divide-y ${isDark ? 'divide-white/10' : 'divide-brand-100/70'}`}
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
										<li key={item.id || item.name} className="py-5" role="listitem">
											<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
												<div className="min-w-0 flex-1 space-y-2">
													<h3 className={`text-lg font-display font-semibold leading-tight ${isDark ? 'text-white' : 'text-brand-900'}`}>
                              {highlightText(item.name)}
                            </h3>
                            {item.description && (
                              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-brand-600'}`}>
                                {highlightText(item.description)}
                              </p>
                            )}
													{badges.length ? (
														<div className="flex flex-wrap gap-2 text-[0.7rem] font-medium">
															{badges.map((badge) => (
																<span
																	key={badge}
																	className={`rounded-full border px-2.5 py-1 ${isDark ? 'border-white/20 text-white/80' : 'border-brand-200 text-brand-700'}`}
																>
																	{badge}
																</span>
															))}
														</div>
													) : null}
                          </div>

												<div className="shrink-0 text-right">
                            {priceLabel ? (
                              <span className={`text-base font-semibold ${isDark ? 'text-white' : 'text-brand-900'}`}>
                                {priceLabel}
                              </span>
                            ) : null}
                            <div className={`text-xs ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>{section.name}</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
							</div>
						</div>
          </section>
        );
      })}
    </div>
  );
}
