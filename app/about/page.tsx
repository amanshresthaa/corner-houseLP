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
  src: '/assets-slideshow/corner-house-exterior-dusk-hero.webp',
  alt: `${BRAND.fullName} exterior on Newmarket Road at dusk`,
};

const STORY_FEATURES = [
  '2-minute walk from Premier Inn & Travelodge; 10 minutes to Abbey Stadium.',
  'Heated garden cabins, HD projector, and wall-to-wall matchday screens (home & away fans welcome).',
  'Hand-folded momo, Chicken Rum Rum, Himali lamb, and pub classics from Nepali chefs.',
  'Tripadvisor Travelers’ Choice 2025, 5★ hygiene, and CAMRA “Most Improved City Pub” recognition.',
  'Free Wi-Fi, accessible ramp + WC, and family/dog-friendly seating.',
];

const STORY_PILLARS = [
  {
    title: 'Cambridge hospitality',
    description: 'Neighbourhood pub energy with family seating, dog-friendly nooks, and Sky/TNT/Prime on all matchdays.',
  },
  {
    title: 'Nepalese + pub favourites',
    description: 'Chef-led momo, Himali lamb, goat curry, plus burgers, roasts, and chips for the classics crowd.',
  },
  {
    title: 'Hotel-doorstep easy',
    description: '2-minute walk from Premier Inn/Travelodge with quick service for matchdays and late check-ins.',
  },
  {
    title: 'Heated garden',
    description: 'Bookable heated cabins, covered projector, and all-weather garden seating year-round.',
  },
];

const STORY_NOTE = {
  eyebrow: 'Neighbourhood promise',
  title: 'Cambridge’s corner living room',
  copy: 'We keep a mix of bookable cabins and walk-in tables, pour cask ales from local partners, and greet every guest like we already know their order.',
  footer: '— Team Corner House',
};

type CommitmentLike = {
  title?: string;
  label?: string;
  description?: string;
  copy?: string;
};

const GALLERY_SHOTS = [
  {
    src: '/assets-slideshow/corner-house-building.webp',
    alt: `${BRAND.fullName} 1930s exterior on Newmarket Road`,
    label: 'Art-deco exterior',
  },
  {
    src: '/assets-slideshow/corner-house-bar-view-landscape.webp',
    alt: `${BRAND.fullName} bar with real ales and HD screens`,
    label: 'Bar & HD screens',
  },
  {
    src: '/assets-slideshow/corner-house-outdoor-rear.webp',
    alt: `${BRAND.fullName} garden terrace with covered seating`,
    label: 'Garden terrace seating',
  },
  {
    src: '/assets-dishes/steamed-momo-with-spicy-sauce-portrait.png',
    alt: 'Hand-folded momo with tomato-sesame achar',
    label: 'Handmade momo',
  },
  {
    src: '/assets-slideshow/corner-house-dining-angle.webp',
    alt: `${BRAND.fullName} dining room with cosy snugs and screens`,
    label: 'Dining room snugs',
  },
  {
    src: '/assets-slideshow/corner-house-lounge-friends.webp',
    alt: `${BRAND.fullName} lounge seating with friends enjoying drinks`,
    label: 'Lounge with friends',
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
  const rawCommitments: CommitmentLike[] = Array.isArray(story.pillars)
    ? story.pillars
    : Array.isArray(story.commitments)
      ? story.commitments
      : [];
  const storyCommitments = rawCommitments
    .map((item: CommitmentLike) => ({
      title: item?.title ?? item?.label ?? '',
      description: item?.description ?? item?.copy ?? '',
    }))
    .filter((item: CommitmentLike) => item.title && item.description);

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
