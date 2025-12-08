"use client";

import Navbar from '@/components/restaurant/Navbar';
import ClientFooter from '@/components/ClientFooter';
import Showcase from '@/components/slideshow/Showcase';
import TakeawayBanner from '@/components/restaurant/TakeawayBanner';
import LocationSection from '@/components/restaurant/LocationSection';
import type { Slide } from '@/components/slideshow/types';
import HomeSectionsRenderer from '@/components/homepage/HomeSectionsRenderer';
import type { HomeSectionKey, NormalizedHomeSections } from '@/src/lib/homepage/sections';

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
}

export default function ClientHomeContent({ sections, sectionOrder, slideshow, ariaLabels, links }: ClientHomeContentProps) {
  const primarySections = sectionOrder.filter((key) => key !== 'closingCta');
  const closingSections = sectionOrder.filter((key) => key === 'closingCta');

  return (
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

        <HomeSectionsRenderer sections={sections} order={primarySections} />

        <TakeawayBanner />
        <LocationSection />

        <HomeSectionsRenderer sections={sections} order={closingSections} />
      </main>
      <ClientFooter />
    </div>
  );
}
