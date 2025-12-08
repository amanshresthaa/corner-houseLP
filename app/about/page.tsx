/* eslint-disable react/no-unescaped-entities */
import RestaurantLayout from "@/components/restaurant/Layout";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import { getContentSmart } from '@/src/lib/data/server-loader';
import { SchemaInjector } from "@/components/seo/RestaurantSchema";
import contentConfig from '@/config/content.json';
import siteConfig from '@/config';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';
import Hero from '@/components/about/Hero';
import StorySection from '@/components/about/StorySection';
import Timeline from '@/components/about/Timeline';
import HouseHighlights from '@/components/about/HouseHighlights';
import GallerySection from '@/components/about/GallerySection';
import CallToActionSection from '@/components/restaurant/sections/CallToActionSection';
import {
  buildHeroStats,
  splitParagraphs,
  type TimelineEntry,
} from './_components/sections';

export async function generateMetadata() {
  const content = await getContentSmart();
  const seo = (content.pages as any)?.about?.seo || {};
  return getSEOTags({
    title: seo.title,
    description: seo.description,
    canonicalUrlRelative: seo.canonicalUrlRelative || '/about',
    openGraph: seo.openGraph,
  });
}

const HERO_IMAGE = {
  src: '/images/white-horse/exterior/white-horse-pub-exterior-frontage-bright-sky-landscape.jpeg',
  alt: `${BRAND.fullName} exterior on Newmarket Road`,
};

const STORY_FEATURES = [
  'Heated garden cabins, HD projectors, and wall-to-wall matchday screens.',
  'Tripadvisor Travelers’ Choice 2025 and a 5★ food hygiene rating.',
  'Hand-folded momos, Himali lamb, and comforting pub classics from Nepali chefs.',
  'Award-winning real ale program with cocktails and no/low options at the bar.',
];

const STORY_PILLARS = [
  {
    title: 'Cambridge hospitality',
    description: 'Neighbourhood pub energy with family seating, dog-friendly nooks, and Sky/TNT on all matchdays.',
  },
  {
    title: 'Nepalese kitchen',
    description: 'Chef-led momo steamers, charcoal grilled Himali lamb, and vegan plates from midday to late.',
  },
  {
    title: 'Art-deco heritage',
    description: 'Restored glass block facade, rich timber, and brushed brass lighting anchored in the 1930s build.',
  },
  {
    title: 'Seasonal garden',
    description: 'Heated cabins, projector-ready pergola, and planters shaped around summer DJs and winter gatherings.',
  },
];

const STORY_NOTE = {
  eyebrow: 'Neighbourhood promise',
  title: 'Cambridge’s corner living room',
  copy: 'We keep a mix of bookable cabins and walk-in tables, pour cask ales from local partners, and greet every guest like we already know their order.',
  footer: '— Team Corner House',
};

const GALLERY_SHOTS = [
  {
    src: '/images/white-horse/interior/dining-room-main-tv-and-tables-portrait.jpeg',
    alt: `Matchday-ready dining room inside ${BRAND.fullName}`,
    label: 'Matchday dining room',
  },
  {
    src: '/images/white-horse/garden/patio-terrace-wicker-chairs-and-parasols-portrait.jpeg',
    alt: `${BRAND.fullName} garden cabins and terrace seating`,
    label: 'Garden cabins',
  },
  {
    src: '/images/white-horse/dishes/steamed-momo-with-spicy-sauce-portrait.jpeg',
    alt: 'Hand-folded momo and chutney',
    label: 'Hand-folded momo',
  },
  {
    src: '/images/white-horse/interior/bar-counter-cozy-lighting-taps-and-shelves-landscape.jpeg',
    alt: 'Art-deco bar counter with illuminated taps',
    label: 'Art-deco bar',
  },
];

export default async function AboutPage() {
  const content = await getContentSmart();
  const aboutContent = (content.pages as any)?.about ?? {};
  const story = aboutContent.story ?? {};
  const heroCopy = aboutContent.hero ?? {};
  const ctaBlock = aboutContent.cta ?? {};
  const contact = getContactInfo();

  const bookingUrl = contact.bookingUrl ?? '/book-a-table';
  const bookingExternal = bookingUrl.startsWith('http');
  const bookLabel = contentConfig.global?.ui?.buttons?.bookOnline || 'Book Online';
  const bookingAria = bookingExternal ? `${bookLabel} (opens in new tab)` : bookLabel;
  const callLabel = contentConfig.global?.ui?.buttons?.callNow || 'Call Us';
  const callButtonCopy = `${callLabel} ${contact.phone.display}`.trim();

  const timelineEntries: TimelineEntry[] = Array.isArray(story.timeline) ? story.timeline : [];
  const heroStats = buildHeroStats(timelineEntries);
  const timelineItems = timelineEntries
    .filter((entry) => entry?.period && entry?.title && entry?.description)
    .map((entry) => ({
      period: entry.period!,
      title: entry.title!,
      description: entry.description!,
    }));

  const storyParagraphs = splitParagraphs(story.introduction);
  const rawCommitments = Array.isArray(story.pillars)
    ? story.pillars
    : Array.isArray(story.commitments)
      ? story.commitments
      : [];
  const storyCommitments = rawCommitments
    .map((item: any) => ({
      title: item?.title ?? item?.label ?? '',
      description: item?.description ?? item?.copy ?? '',
    }))
    .filter((item) => item.title && item.description);

  const derivedStoryNote = story?.note && (story.note.title || story.note.copy)
    ? {
        eyebrow: story.note.eyebrow ?? story.note.badge,
        title: story.note.title ?? 'Corner House promise',
        copy: story.note.copy ?? story.note.body ?? '',
        footer: story.note.footer ?? story.note.cite,
      }
    : null;
  const storyNote = derivedStoryNote && derivedStoryNote.copy ? derivedStoryNote : STORY_NOTE;

  const ctaButtons = [
    {
      text: bookLabel,
      href: bookingUrl,
      variant: 'accent' as const,
      external: bookingExternal,
      key: 'bookOnline',
    },
    {
      text: callButtonCopy,
      href: contact.phone.tel,
      variant: 'brand' as const,
      key: 'call',
    },
    {
      text: 'Browse the menu',
      href: '/menu',
      variant: 'crimson' as const,
      key: 'menu',
    },
  ];

  return (
    <RestaurantLayout>
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}html:focus-within{scroll-behavior:auto!important}}`,
        }}
      />
      {renderSchemaTags()}
      <SchemaInjector
        type="breadcrumb"
        data={(() => {
          const base = (process.env.NEXT_PUBLIC_SITE_URL || `https://${siteConfig.domainName}/`).replace(/\/$/, '/');
          return [
            { name: "Home", url: `${base}` },
            { name: "About", url: `${base}about` },
          ];
        })()}
        page="about"
      />

      <main id="main">
        <Hero
          title={heroCopy.title ?? `About ${BRAND.shortName}`}
          subtitle={heroCopy.subtitle ?? 'Cambridge’s art-deco pub with Nepalese soul on Newmarket Road.'}
        />
        <StorySection
          eyebrow={story.eyebrow ?? 'Our story'}
          title={story.title ?? `The story of ${BRAND.shortName}`}
          subtitle={heroCopy.subtitle ?? heroCopy.title}
          paragraphs={storyParagraphs}
          commitments={storyCommitments.length ? storyCommitments : STORY_PILLARS}
          note={storyNote}
        />
        <GallerySection images={GALLERY_SHOTS} eyebrow="Inside the house" title="Gallery" description="A peek at the relaunch – from heated cabins + HD screens to momo steam and late-night neon." />
        <HouseHighlights items={STORY_FEATURES} title="House highlights" description="Guest-favourite touches pulled from the relaunch" />
        <Timeline items={timelineItems} stats={heroStats} />
        <CallToActionSection
          eyebrow="Visit"
          badge={{ label: 'Newmarket Road', value: 'CB5 8JE' }}
          headline={ctaBlock.title ?? `Visit ${BRAND.shortName}`}
          description={ctaBlock.description ?? 'Book a table, heated cabin, or join us for momo and matchdays.'}
          features={[
            'Heated cabins & HD projector screens',
            'Family-friendly Nepalese kitchen',
            'Real ales, cocktails, and no/low options',
            'Sky, TNT & Prime sports every week',
          ]}
          contact={{
            label: 'Hotline',
            value: contact.phone.display,
            detail: ctaBlock.contact?.hours,
          }}
          image={{ src: HERO_IMAGE.src, alt: HERO_IMAGE.alt }}
          buttons={ctaButtons}
          theme="light"
        />
      </main>
    </RestaurantLayout>
  );
}
