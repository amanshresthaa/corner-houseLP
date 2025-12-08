export const revalidate = 300;

import { renderSchemaTags } from '@/libs/seo';
import { getContentSmart } from '@/src/lib/data/server-loader';
import dynamic from 'next/dynamic';
import type { Slide } from '@/components/slideshow/types';
import { buildHomeSections } from '@/src/lib/homepage/sections';

const ClientHomeContent = dynamic(() => import('@/components/ClientHomeContent'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-neutral-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="h-8 w-32 animate-pulse rounded bg-neutral-200"></div>
          <div className="hidden space-x-6 md:flex">
            <div className="h-6 w-16 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-6 w-16 animate-pulse rounded bg-neutral-200"></div>
            <div className="h-6 w-16 animate-pulse rounded bg-neutral-200"></div>
          </div>
          <div className="h-8 w-24 animate-pulse rounded bg-neutral-200"></div>
        </div>
      </div>
      <main className="pt-16">
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-96 animate-pulse rounded bg-neutral-300"></div>
            <div className="mx-auto h-6 w-64 animate-pulse rounded bg-neutral-300"></div>
          </div>
        </div>
      </main>
    </div>
  )
});

export default async function Page() {
  const content = await getContentSmart();

  const homeContent = content.pages.home;
  const { sections, order: sectionOrder } = buildHomeSections(homeContent.sections);

  const rawSlideshow = content.components?.slideshow;
  const slideshowContent = rawSlideshow
    ? {
        slides: Array.isArray(rawSlideshow.slides) ? (rawSlideshow.slides as Slide[]) : [],
        settings: rawSlideshow.settings ?? {}
      }
    : null;

  const ariaLabels = content.global?.accessibility?.ariaLabels ?? {};
  const links = (content.global as any)?.links ?? {};
  const schemaEntries = Array.isArray(homeContent.seo?.schemas) ? homeContent.seo?.schemas : [];

  return (
    <>
      {schemaEntries.length > 0 ? renderSchemaTags(schemaEntries) : null}
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}html:focus-within{scroll-behavior:auto!important}}`
        }}
      />
      <ClientHomeContent
        sections={sections}
        sectionOrder={sectionOrder}
        slideshow={slideshowContent}
        ariaLabels={ariaLabels}
        links={links}
      />
    </>
  );
}
