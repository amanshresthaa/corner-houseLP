"use client";

import { Fragment } from 'react';
import HomepagePressTicker from '@/components/homepage/PressTicker';
import HomepageAboutSection from '@/components/homepage/HomepageAboutSection';
import HomepageSignatureDishes from '@/components/homepage/HomepageSignatureDishes';
import HomepageReviewHighlights from '@/components/homepage/HomepageReviewHighlights';
import QuickLinksSection from '@/components/restaurant/sections/QuickLinksSection';
import CallToActionSection from '@/components/restaurant/sections/CallToActionSection';
import type { HomeSectionKey, NormalizedHomeSections } from '@/src/lib/homepage/sections';

type SectionRenderer = (data: any) => JSX.Element | null;

const sectionRenderers: Record<HomeSectionKey, SectionRenderer> = {
  pressTicker: (data) => <HomepagePressTicker {...data} />,
  about: (data) => <HomepageAboutSection content={data} />,
  signatureDishes: (data) => (
    <HomepageSignatureDishes title={data.title} subtitle={data.subtitle} hero={data.hero} items={data.items} />
  ),
  reviews: (data) => (
    <HomepageReviewHighlights
      title={data.title}
      subtitle={data.subtitle}
      hero={data.hero}
      stats={data.stats}
      spotlights={data.spotlights}
      items={data.items}
    />
  ),
  quickLinks: (data) => (
    <QuickLinksSection
      links={data.items}
      eyebrow={data.eyebrow}
      title={data.title}
      description={data.description}
    />
  ),
  closingCta: (data) => (
    <CallToActionSection
      eyebrow={data.eyebrow}
      badge={data.badge}
      headline={data.headline}
      description={data.description}
      features={data.features}
      contact={data.contact}
      image={data.image}
      buttons={data.buttons}
      theme="dark"
    />
  ),
};

interface HomeSectionsRendererProps {
  sections: NormalizedHomeSections;
  order: HomeSectionKey[];
}

export default function HomeSectionsRenderer({ sections, order }: HomeSectionsRendererProps) {
  return (
    <>
      {order.map((key) => {
        const renderer = sectionRenderers[key];
        const data = sections[key as keyof NormalizedHomeSections];
        if (!renderer || !data) {
          return null;
        }
        return <Fragment key={key}>{renderer(data)}</Fragment>;
      })}
    </>
  );
}
