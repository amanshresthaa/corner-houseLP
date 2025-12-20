'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Menu } from '@/src/lib/data/schemas';
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
 * MenuInteractive component with optimized performance
 * Now supports server-side preloaded data for faster initial rendering
 * Maintains backward compatibility with existing functionality
 * Enhanced with improved sticky navigation for all responsive devices
 */

export default function MenuInteractive({ sections, defaultSelected, preloadedData = false, tone = 'light' }: Props) {
  const [selected, setSelected] = useState<string | null>(defaultSelected ?? null);
  const [isHydrated, setIsHydrated] = useState(preloadedData);
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

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto pb-2">
        <nav className="flex gap-2 whitespace-nowrap pr-2" aria-label="Menu categories">
          {sections.map((section) => {
            const idSeed = normalizeId(section?.id || section?.name);
            const isActive = selected === idSeed;
            const sectionItemCount = section.items.length;
            return (
              <button
                key={section.id || section.name}
                type="button"
                onClick={() => handleSectionChange(isActive ? null : idSeed)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isActive
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

      <div className="max-h-[60vh] lg:max-h-[600px] overflow-y-auto pr-2 overscroll-contain">
        <MenuSections sections={sections} selectedId={selected} tone={tone} />
      </div>

      <div className={`mt-8 border-t pt-6 text-sm text-center ${isDark ? 'border-white/10 text-white/60' : 'border-brand-100/50 text-brand-600'}`}>
        {sections.reduce((total, section) => total + section.items.length, 0)} dishes
      </div>
    </div>
  );
}
