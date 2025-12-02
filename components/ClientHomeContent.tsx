"use client";

import Navbar from '@/components/restaurant/Navbar';
import ClientFooter from '@/components/ClientFooter';
import Showcase from '@/components/slideshow/Showcase';
import QuickLinksSection from '@/components/restaurant/sections/QuickLinksSection';
import TakeawayBanner from '@/components/restaurant/TakeawayBanner';
import LocationSection from '@/components/restaurant/LocationSection';
import CallToActionSection from '@/components/restaurant/sections/CallToActionSection';
import type { Slide } from '@/components/slideshow/types';
import HomepagePressTicker, { PressTickerItem } from '@/components/homepage/PressTicker';
import HomepageAboutSection, { HomepageAboutContent } from '@/components/homepage/HomepageAboutSection';
import HomepageSignatureDishes, { SignatureDish } from '@/components/homepage/HomepageSignatureDishes';
import HomepageReviewHighlights, { ReviewHighlight } from '@/components/homepage/HomepageReviewHighlights';

export interface HomeSections {
  pressTicker?: {
    label?: string;
    items: PressTickerItem[];
  } | null;
  about?: HomepageAboutContent | null;
  signatureDishes?: {
    title?: string;
    subtitle?: string;
    items: SignatureDish[];
  } | null;
  reviews?: {
    title?: string;
    subtitle?: string;
    items: ReviewHighlight[];
  } | null;
  quickLinks?: Array<{
    title?: string;
    description?: string;
    link?: string;
    linkText?: string;
  }> | null;
  closingCta?: {
    headline?: string;
    description?: string;
    buttons?: Array<{
      text?: string;
      href?: string;
      variant?: string;
      external?: boolean;
      key?: string;
    }>;
  } | null;
}

interface ClientHomeContentProps {
  sections: HomeSections;
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

const hasItems = <T,>(items?: T[] | null): items is T[] => Array.isArray(items) && items.length > 0;

export default function ClientHomeContent({ sections, slideshow, ariaLabels, links }: ClientHomeContentProps) {
  const quickLinks = hasItems(sections.quickLinks) ? sections.quickLinks : [];
  const pressTicker = sections.pressTicker && hasItems(sections.pressTicker.items)
    ? sections.pressTicker
    : null;
  const about = sections.about ?? null;
  const signatureDishes = sections.signatureDishes && hasItems(sections.signatureDishes.items)
    ? sections.signatureDishes
    : null;
  const reviews = sections.reviews && hasItems(sections.reviews.items)
    ? sections.reviews
    : null;
  const rawClosingCta = sections.closingCta?.headline && Array.isArray(sections.closingCta.buttons)
    ? {
        headline: sections.closingCta.headline,
        description: sections.closingCta.description ?? '',
        buttons: sections.closingCta.buttons
          ?.filter((btn): btn is { text: string; href: string; variant?: string; external?: boolean; key?: string } =>
            Boolean(btn?.text) && Boolean(btn?.href)
          )
          .map((btn) => {
            const variant = btn.variant;
            const allowedVariants: Array<'accent' | 'brand' | 'crimson'> = ['accent', 'brand', 'crimson'];
            const resolvedVariant = allowedVariants.includes(variant as any)
              ? (variant as 'accent' | 'brand' | 'crimson')
              : 'accent';
            return {
              text: btn.text!,
              href: btn.href!,
              variant: resolvedVariant,
              external: btn.external ?? false,
              key: btn.key,
            };
          }) ?? []
      }
    : null;

  const closingCta = rawClosingCta && rawClosingCta.buttons.length > 0 ? rawClosingCta : null;

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
            takeawayUrl={links?.takeaway}
            bookOnlineUrl={links?.bookOnline}
          />
        </section>

        {pressTicker ? (
          <HomepagePressTicker label={pressTicker.label} items={pressTicker.items} />
        ) : null}

        {about ? (
          <HomepageAboutSection content={about} />
        ) : null}

        {signatureDishes ? (
          <HomepageSignatureDishes
            title={signatureDishes.title}
            subtitle={signatureDishes.subtitle}
            items={signatureDishes.items}
          />
        ) : null}

        {reviews ? (
          <HomepageReviewHighlights
            title={reviews.title}
            subtitle={reviews.subtitle}
            items={reviews.items}
          />
        ) : null}

        {quickLinks.length ? (
          <QuickLinksSection links={quickLinks} />
        ) : null}

        <TakeawayBanner />
        <LocationSection />

        {closingCta && closingCta.buttons.length ? (
          <CallToActionSection
            headline={closingCta.headline}
            description={closingCta.description}
            buttons={closingCta.buttons}
            className="pt-6 pb-8 sm:pt-8 sm:pb-10"
          />
        ) : null}
      </main>
      <ClientFooter />
    </div>
  );
}
