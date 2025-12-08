'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Menu } from '@/src/lib/data/schemas';
import MenuSearchFilter from '@/components/menu/MenuSearchFilter';
import MenuSections from '@/components/menu/MenuSections';

type Props = {
  sections: Menu['sections'];
  defaultSelected?: string | null;
  preloadedData?: boolean; // Indicates data is pre-optimized server-side
  tone?: 'light' | 'dark';
};

function normalizeId(input?: string | number | null) {
  return ((input || '') as string).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * MenuInteractive component with search, filtering, and optimized performance
 * Now supports server-side preloaded data for faster initial rendering
 * Maintains backward compatibility with existing functionality
 * Enhanced with improved sticky navigation for all responsive devices
 */
type DietaryRecord = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  spicy: boolean;
};

type FilterSnapshot = {
  searchTerm: string;
  dietary: DietaryRecord;
};

type FilterMeta = {
  summary?: string;
  filters?: {
    searchTerm: string;
    dietary: DietaryRecord;
    priceRange?: {
      min: number;
      max: number;
    };
  };
};

export default function MenuInteractive({ sections, defaultSelected, preloadedData = false, tone = 'light' }: Props) {
  const [selected, setSelected] = useState<string | null>(defaultSelected ?? null);
  const [isHydrated, setIsHydrated] = useState(preloadedData);
  const [filteredSections, setFilteredSections] = useState<Menu['sections']>(sections);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSummary, setFilterSummary] = useState<string>('');
  const [filterSnapshot, setFilterSnapshot] = useState<FilterSnapshot>({
    searchTerm: '',
    dietary: { vegetarian: false, vegan: false, glutenFree: false, spicy: false },
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const isDark = tone === 'dark';

  // Debounce hash changes to prevent rapid state updates - maintaining existing pattern
  const debouncedHashChange = useCallback(() => {
    const newHash = window.location.hash ? window.location.hash.replace('#', '') : null;
    if (newHash !== selected) {
      setSelected(newHash);
    }
  }, [selected]);

  // Optimized hydration effect for preloaded data
  useEffect(() => {
    const hash = typeof window !== 'undefined' && window.location.hash
      ? window.location.hash.replace('#', '')
      : null;

    const target = hash || defaultSelected || null;

    setIsHydrated(true);

    if (target !== selected) {
      setSelected(target);
      if (typeof window !== 'undefined' && target) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${target}`);
      }
    }
  }, [sections, preloadedData, defaultSelected, selected]);

  // Hash change listener - maintains existing pattern
  useEffect(() => {
    if (!isHydrated) return;
    
    let timeoutId: NodeJS.Timeout;
    
    function onHashChange() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(debouncedHashChange, 50);
    }

    window.addEventListener('hashchange', onHashChange);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [isHydrated, debouncedHashChange]);

  // Handle section changes - maintains existing pattern
  const handleSectionChange = useCallback((newId: string | null) => {
    if (newId === selected) return;
    setSelected(newId);
    if (typeof window !== 'undefined') {
      if (newId) {
        const safeNewId = String(newId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        window.history.replaceState(null, '', window.location.pathname + window.location.search + `#${safeNewId}`);

        // Smoothly scroll the relevant section into view while honoring reduced-motion preferences.
        window.requestAnimationFrame(() => {
          const target = document.getElementById(safeNewId);
          if (target) {
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
          }
        });
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  }, [selected]);

  // Handle filter changes from search component
  const handleFilterChange = useCallback((newFilteredSections: Menu['sections'], newSearchTerm: string, meta?: FilterMeta) => {
    setFilteredSections(newFilteredSections);
    setSearchTerm(newSearchTerm);
    if (meta?.summary !== undefined) setFilterSummary(meta.summary);
    if (meta?.filters) {
      setFilterSnapshot({
        searchTerm: meta.filters.searchTerm,
        dietary: { ...meta.filters.dietary },
      });
    } else if (newSearchTerm !== filterSnapshot.searchTerm) {
      setFilterSnapshot((prev) => ({ ...prev, searchTerm: newSearchTerm }));
    }
    
    // If searching/filtering, clear section selection to show all results
    if (newSearchTerm || newFilteredSections.length !== sections.length) {
      if (selected) {
        handleSectionChange(null);
      }
    }
  }, [sections.length, selected, handleSectionChange, filterSnapshot.searchTerm]);

  const sendPresetEvent = useCallback((detail: { reset?: boolean; filters?: Partial<{ searchTerm: string; dietary: Partial<DietaryRecord>; priceRange: { min?: number; max?: number } }> }) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('menu:preset', { detail }));
  }, []);

  const handleQuickSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    sendPresetEvent({ filters: { searchTerm: event.target.value } });
  }, [sendPresetEvent]);

  const toggleQuickDietary = useCallback((key: keyof FilterSnapshot['dietary']) => {
    const current = filterSnapshot.dietary[key];
    sendPresetEvent({ filters: { dietary: { [key]: !current } } });
  }, [filterSnapshot.dietary, sendPresetEvent]);

  const resetFilters = useCallback(() => {
    sendPresetEvent({ reset: true });
  }, [sendPresetEvent]);

	return (
		<div className="space-y-6">
			<div className={`rounded-[2rem] border ${isDark ? 'border-white/15 bg-brand-950/40' : 'border-brand-100/80 bg-white/95'} p-4 shadow-sm sm:p-6`}>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<label htmlFor="menu-quick-search" className={`text-xs font-semibold uppercase tracking-[0.35em] ${isDark ? 'text-neutral-200' : 'text-brand-500'}`}>
						Search & filters
					</label>
					<button
						type="button"
						onClick={() => {
							setShowAdvancedFilters(false);
							resetFilters();
						}}
						className="rounded-full px-3 py-1 text-xs font-semibold text-accent-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200"
					>
						Reset
					</button>
				</div>
				<input
					id="menu-quick-search"
					type="search"
					value={filterSnapshot.searchTerm}
					onChange={handleQuickSearchChange}
					placeholder="Search dishes or ingredients"
					className={`mt-3 w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 ${
						isDark
							? 'border-white/20 bg-brand-950 text-white placeholder:text-white/50 focus:ring-white/30'
							: 'border-brand-200 bg-brand-50 text-brand-900 placeholder:text-brand-400 focus:ring-brand-400'
					}`}
				/>
				<div className="mt-3 flex flex-wrap gap-2">
					{(['vegetarian', 'vegan', 'glutenFree', 'spicy'] as const).map((key) => (
						<button
							key={key}
							type="button"
							onClick={() => toggleQuickDietary(key)}
							className={`rounded-full px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
								filterSnapshot.dietary[key]
									? isDark
										? 'bg-white text-brand-900 focus-visible:ring-white/40'
										: 'bg-brand-900 text-white focus-visible:ring-brand-200'
									: isDark
										? 'border border-white/30 text-white focus-visible:ring-white/30'
										: 'border border-brand-200 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-200'
							}`}
							aria-pressed={filterSnapshot.dietary[key]}
						>
							{key === 'glutenFree' ? 'Gluten-free' : key.charAt(0).toUpperCase() + key.slice(1)}
						</button>
					))}
				</div>
				<button
					type="button"
					onClick={() => setShowAdvancedFilters((prev) => !prev)}
					className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${isDark ? 'text-neutral-100' : 'text-brand-700'} underline-offset-4 hover:underline`}
				>
					{showAdvancedFilters ? 'Hide advanced filters' : 'Advanced filters'}
					<span aria-hidden>↧</span>
				</button>
				{showAdvancedFilters ? (
					<div className="pt-4">
						<MenuSearchFilter
							sections={sections}
							onFilterChange={handleFilterChange}
							className="w-full"
							tone={tone}
						/>
					</div>
				) : null}
			</div>

			<div className="overflow-x-auto pb-2">
				<nav className="flex gap-2 whitespace-nowrap pr-2" aria-label="Menu categories">
          {sections.map((section) => {
            const idSeed = normalizeId(section?.id || section?.name);
            const isActive = selected === idSeed;
            const sectionItemCount = filteredSections.find((s) => normalizeId(s?.id || s?.name) === idSeed)?.items.length || section.items.length;
            return (
              <button
                key={section.id || section.name}
                type="button"
                onClick={() => handleSectionChange(isActive ? null : idSeed)}
						className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isActive
                    ? isDark
									? 'border-white/80 bg-white/10 text-white'
									: 'border-brand-900 bg-brand-900 text-white focus-visible:ring-brand-200'
								: 'border-brand-100 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-200'
                }`}
                aria-pressed={isActive}
              >
                {section.name}
                <span className="ml-2 text-xs opacity-70">{sectionItemCount}</span>
              </button>
            );
          })}
        </nav>
      </div>



			<MenuSections sections={filteredSections} selectedId={selected} searchTerm={searchTerm} tone={tone} />

			<div className={`rounded-[2rem] border ${isDark ? 'border-white/10 bg-brand-950/40 text-white/80' : 'border-brand-100 bg-brand-50/80 text-brand-700'} p-4 text-sm text-center`}>
				{filteredSections.reduce((total, section) => total + section.items.length, 0)} dishes
				{filterSummary ? ` • ${filterSummary}` : searchTerm ? ` • “${searchTerm}”` : ' • Showing all'}
			</div>
    </div>
  );
}
