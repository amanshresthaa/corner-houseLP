"use client";

import { useMemo } from 'react';
import { SWRConfig } from 'swr';
import Navbar from '@/components/restaurant/Navbar';
import ClientFooter from '@/components/ClientFooter';
import Showcase from '@/components/slideshow/Showcase';
import TakeawayBanner from '@/components/restaurant/TakeawayBanner';
import LazyLocationSection from '@/components/optimized/LazyLocationSection';
import type { Slide } from '@/components/slideshow/types';
import HomeSectionsRenderer from '@/components/homepage/HomeSectionsRenderer';
import type { HomeSectionKey, NormalizedHomeSections } from '@/src/lib/homepage/sections';
import type { Content, Restaurant } from '@/src/lib/data/schemas';

interface ClientHomeContentProps {
  sections: NormalizedHomeSections;
  sectionOrder: HomeSectionKey[];
  slideshow?: {
    slides: Slide[];
    settings?: {
      autoplay?: boolean;
      intervalMs?: number;
      sessionSize?: number;
      regionLabel?: string;
      sectionLabel?: string;
    };
  } | null;
  ariaLabels?: Record<string, string>;
  links?: Record<string, string>;
  initialContent?: Content | null;
  initialRestaurant?: Restaurant | null;
}

export default function ClientHomeContent({
  sections,
  sectionOrder,
  slideshow,
  ariaLabels,
  links,
  initialContent,
  initialRestaurant,
}: ClientHomeContentProps) {
  const fallback = useMemo(() => {
    const entries: Record<string, unknown> = {};
    if (initialContent) {
      entries['/api/content'] = initialContent;
    }
    if (initialRestaurant) {
      entries['/api/restaurant'] = initialRestaurant;
    }
    return entries;
  }, [initialContent, initialRestaurant]);

  return (
    <SWRConfig value={{ fallback }}>
      <div className="min-h-screen bg-neutral-50 text-brand-700">
        <Navbar />
        <main
          id="main-content"
          style={{ paddingTop: 'var(--navbar-stack-offset, 0px)' }}
        >
          <section aria-label={ariaLabels?.showcaseSection ?? slideshow?.settings?.sectionLabel ?? 'Restaurant showcase'}>
            <Showcase
              slides={slideshow?.slides ?? []}
              settings={slideshow?.settings}
              regionLabel={ariaLabels?.slideshowRegion ?? slideshow?.settings?.regionLabel}
              sectionLabel={ariaLabels?.showcaseSection ?? slideshow?.settings?.sectionLabel}
              bookOnlineUrl={links?.bookOnline}
            />
          </section>

          <HomeSectionsRenderer sections={sections} order={sectionOrder} />

          <TakeawayBanner />
          <LazyLocationSection />
        </main>
        <ClientFooter />
      </div>
    </SWRConfig>
  );
}
