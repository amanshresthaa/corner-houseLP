'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Menu } from '@/src/lib/data/schemas';
import MenuSections from './MenuSections';

type Props = {
  sections: Menu['sections'];
  defaultSelected?: string | null;
  preloadedData?: boolean; // Indicates data is pre-optimized server-side
};

function normalizeId(input?: string | number | null) {
  return ((input || '') as string).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

/**
 * MenuInteractive component with search, filtering, and optimized performance
 * Now supports server-side preloaded data for faster initial rendering
 * Maintains backward compatibility with existing functionality
 */
export default function MenuInteractive({ sections, defaultSelected, preloadedData = false }: Props) {
  const [selected, setSelected] = useState<string | null>(defaultSelected || null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHydrated, setIsHydrated] = useState(preloadedData); // Start hydrated if data is preloaded
  const contentRef = useRef<HTMLDivElement>(null);

  // Debounce hash changes to prevent rapid state updates - maintaining existing pattern
  const debouncedHashChange = useCallback(() => {
    if (isAnimating) return;
    const newHash = window.location.hash ? window.location.hash.replace('#', '') : null;
    if (newHash !== selected) {
      setSelected(newHash);
    }
  }, [selected, isAnimating]);

  // Optimized hydration effect for preloaded data
  useEffect(() => {
    if (preloadedData) {
      // Data is already optimized server-side, skip client-side processing
      setIsHydrated(true);

      // Use defaultSelected if provided, or current hash
      const currentHash = typeof window !== 'undefined' && window.location.hash
        ? window.location.hash.replace('#', '')
        : null;

      const targetSelected = currentHash || defaultSelected;

      if (targetSelected && targetSelected !== selected) {
        setSelected(targetSelected);
        if (typeof window !== 'undefined' && !currentHash) {
          const safeTarget = String(targetSelected).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          history.replaceState(null, '', window.location.pathname + window.location.search + `#${safeTarget}`);
        }
      }
      return;
    }

    // Legacy hydration logic for non-preloaded data
    setIsHydrated(true);

    // Initialize selected state from URL hash or default
    const currentHash = window.location.hash ? window.location.hash.replace('#', '') : null;

    if (currentHash) {
      setSelected(currentHash);
    } else {
      // Use existing default selection logic
      const normalize = (s: any) => ((s?.id || s?.name) || '').toString().toLowerCase();
      const starterSection = (sections || []).find((s) => normalize(s).includes('starter'));
      const defaultIdFromMenu = defaultSelected
        ? defaultSelected.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : starterSection
          ? ((starterSection.id || starterSection.name) || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')
          : ((sections && sections[0]) ? (((sections[0].id || sections[0].name) || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')) : null);

      if (defaultIdFromMenu) {
        setSelected(defaultIdFromMenu);
        const safeDefaultId = String(defaultIdFromMenu).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        history.replaceState(null, '', window.location.pathname + window.location.search + `#${safeDefaultId}`);
      }
    }
  }, [sections, defaultSelected, preloadedData, selected]);

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
    if (isAnimating || newId === selected) return;

    setIsAnimating(true);
    setSelected(newId);

    // Update URL
    if (typeof window !== 'undefined') {
      if (newId) {
        const safeNewId = String(newId).toLowerCase().replace(/[^a-z0-9]+/g, '-');
        window.history.replaceState(null, '', window.location.pathname + window.location.search + `#${safeNewId}`);
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [selected, isAnimating]);

  return (
    <div className="scroll-manual">
      {/* Enhanced Navigation Bar */}
      <section className="py-3 bg-neutral/30 sticky top-0 z-30 backdrop-blur-sm sticky-optimized">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Navigation */}
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <nav className="flex gap-3 whitespace-nowrap items-center" aria-label="Menu categories">
              {/* All sections button */}
              <div className="flex-shrink-0 sticky left-0 z-40 pr-2 bg-neutral/30 backdrop-blur-sm">
                <button
                  key="all"
                  type="button"
                  onClick={() => handleSectionChange(null)}
                  disabled={isAnimating}
                  className={`inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${selected === null ? 'bg-accent text-white' : 'bg-neutral-50 text-brand-700 hover:bg-accent hover:text-white'
                    } ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
                  aria-pressed={selected === null}
                >
                  All ({sections.reduce((total, section) => total + section.items.length, 0)})
                </button>
              </div>

              {/* Section buttons */}
              {sections.map((section) => {
                const idSeed = normalizeId(section?.id || section?.name);
                const isActive = selected === idSeed;
                const sectionItemCount = section.items.length;

                return (
                  <button
                    key={section.id || section.name}
                    type="button"
                    onClick={() => handleSectionChange(isActive ? null : idSeed)}
                    disabled={isAnimating}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                      ? 'bg-accent text-white'
                      : 'bg-neutral-50 text-brand-700 hover:bg-accent hover:text-white'
                      } ${isAnimating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    aria-pressed={isActive}
                  >
                    <span>{section.name}</span>
                    <span className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full">
                      {sectionItemCount}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="relative min-h-[400px]" ref={contentRef}>
        <div
          className={`transition-all duration-300 ease-out scroll-optimized ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
            }`}
          style={{
            position: 'relative',
            willChange: isAnimating ? 'opacity, transform' : 'auto',
          }}
        >
          <div className="py-8">
            <MenuSections
              sections={sections}
              selectedId={selected}
            />
          </div>
        </div>
      </div>
    </div>
  );
}