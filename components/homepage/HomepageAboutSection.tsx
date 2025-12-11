"use client";

import Image from 'next/image';
import Link from '@/lib/debugLink';
import { BRAND } from '@/src/lib/constants/brand';

export interface HomepageAboutContent {
  title?: string;
  tagline?: string;
  description?: string[];
  features?: string[];
  image?: {
    src?: string;
    alt?: string;
  };
  stats?: Array<{
    value?: string;
    label?: string;
    description?: string;
  }>;
  ctaLinks?: Array<{
    text?: string;
    href?: string;
  }>;
  milestones?: Array<{
    year?: string;
    title?: string;
    copy?: string;
  }>;
  gallery?: Array<{
    src?: string;
    alt?: string;
    label?: string;
  }>;
}

interface HomepageAboutSectionProps {
  content: HomepageAboutContent;
}

export default function HomepageAboutSection({ content }: HomepageAboutSectionProps) {
  const {
    title = 'Welcome',
    tagline,
    description = [],
    features = [],
    image,
    stats = [],
    ctaLinks = [],
    milestones = [],
    gallery = [],
  } = content;

  const safeStats = stats
    .filter((stat) => stat?.value && stat?.label)
    .map((stat) => ({
      value: stat!.value!,
      label: stat!.label!,
      description: stat?.description,
    }));

  const safeCtas = ctaLinks
    .filter((cta) => cta?.text && cta?.href)
    .map((cta) => ({ text: cta!.text!, href: cta!.href! }));

  const featureCards = features.filter(Boolean);
  const safeMilestones = milestones
    .filter((milestone) => milestone?.year && (milestone?.title || milestone?.copy))
    .map((milestone) => ({
      year: milestone!.year!,
      title: milestone?.title,
      copy: milestone?.copy,
    }));
  const galleryItems = gallery
    .filter((item) => item?.src)
    .map((item) => ({
      src: item!.src!,
      alt: item?.alt || '',
      label: item?.label,
    }));

  const primaryImageSrc = image?.src?.trim();
  const uniqueGalleryItems = primaryImageSrc
    ? galleryItems.filter((item) => item.src !== primaryImageSrc)
    : galleryItems;

  const overlayStat = safeStats.find((stat) => /review/i.test(stat.label));

  const isInternalLink = (href: string) => href.startsWith('/') && !href.startsWith('//');
  return (
    <section className="relative py-12 sm:py-20" aria-labelledby="about-corner-house">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/80 via-white to-white" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 overflow-hidden rounded-4xl border border-brand-100/80 bg-white/95 p-6 shadow-2xl shadow-brand-900/5 backdrop-blur sm:p-8 md:p-9">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div className="space-y-5">
              <div className="space-y-4">
                <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-600">
                  Our story
                </p>
                <div>
                  <h2 id="about-corner-house" className="text-4xl font-display font-bold text-stout-700 sm:text-5xl">
                    {title}
                  </h2>
                  {tagline ? (
                    <p className="mt-3 text-lg font-semibold text-accent">
                      {tagline}
                    </p>
                  ) : null}
                </div>
                <div className="prose prose-brand max-w-none text-brand-700">
                  {description.map((paragraph, idx) => (
                    <p key={`about-paragraph-${idx}`}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {safeStats.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {safeStats.map((stat, idx) => (
                    <div
                      key={`about-stat-${stat.label}-${idx}`}
                      className="rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-center shadow-inner"
                    >
                      <p className="text-3xl font-display font-bold text-stout-700">{stat.value}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">{stat.label}</p>
                      {stat.description ? (
                        <p className="text-sm text-brand-500">{stat.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {safeCtas.length ? (
                <div className="flex flex-wrap gap-3">
                  {safeCtas.map((cta, idx) => {
                    const href = cta.href;
                    const props = {
                      className:
                        'btn btn-sm rounded-full border-brand-200 bg-white text-brand-800 hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300',
                      'aria-label': cta.text,
                    } as const;
                    return isInternalLink(href) ? (
                      <Link key={`about-cta-${idx}`} href={href} {...props}>
                        {cta.text}
                      </Link>
                    ) : (
                      <a key={`about-cta-${idx}`} href={href} {...props}>
                        {cta.text}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 translate-y-4 rounded-3xl bg-gradient-to-tr from-brand-200/50 via-transparent to-transparent blur-2xl" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-brand-900/5 shadow-2xl">
                  {image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt || `Art-deco exterior of ${BRAND.fullName} on Newmarket Road`}
                      width={900}
                      height={720}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      priority
                    />
                  ) : (
                    <div className="flex h-80 items-center justify-center bg-brand-50 text-brand-300 sm:h-[28rem]">
                      <span>No imagery supplied</span>
                    </div>
                  )}
                  {overlayStat ? (
                    <div className="absolute bottom-4 left-4 rounded-2xl border border-white/40 bg-white/90 px-4 py-3 text-sm font-semibold text-brand-800 shadow-lg">
                      {overlayStat.value} {overlayStat.label}
                    </div>
                  ) : null}
                </div>
              </div>

              {uniqueGalleryItems.length ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {uniqueGalleryItems.slice(0, 2).map((item, idx) => (
                    <figure
                      key={`about-gallery-${idx}`}
                      className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-lg"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.src}
                          alt={item.alt || 'Gallery moment'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                      {item.label ? (
                        <figcaption className="p-3 text-sm font-semibold text-brand-700">
                          {item.label}
                        </figcaption>
                      ) : null}
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {safeMilestones.length ? (
            <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">Timeline</p>
                  <h3 className="text-2xl font-display font-bold text-stout-700">Corner House moments</h3>
                </div>
              </div>
              <div className="mt-6 flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory" aria-label="Corner House timeline">
                {safeMilestones.map((milestone, idx) => (
                  <div
                    key={`about-milestone-${milestone.year}-${idx}`}
                    className="min-w-[14rem] snap-start rounded-2xl border border-brand-100 bg-white p-4 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
                      {milestone.year}
                    </p>
                    {milestone.title ? (
                      <p className="mt-2 text-base font-semibold text-stout-700">{milestone.title}</p>
                    ) : null}
                    {milestone.copy ? (
                      <p className="mt-1 text-sm text-brand-600">{milestone.copy}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {featureCards.length ? (
              <div className="rounded-3xl border border-brand-100/80 bg-brand-50/60 p-5">
                <h3 className="text-base font-semibold uppercase tracking-[0.35em] text-brand-600">
                  House highlights
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {featureCards.map((item, idx) => (
                    <li
                      key={`about-feature-${idx}`}
                      className="flex items-start gap-3 rounded-2xl bg-white/95 p-3 text-sm font-medium text-brand-700 shadow-sm"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1 inline-flex h-2.5 w-2.5 flex-none items-center justify-center rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              ) : null}

            {uniqueGalleryItems.length > 2 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {uniqueGalleryItems.slice(2, 6).map((item, idx) => (
                  <figure
                    key={`about-gallery-secondary-${idx}`}
                    className="group overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-lg"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.src}
                        alt={item.alt || 'Gallery moment'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 45vw"
                      />
                    </div>
                    {item.label ? (
                      <figcaption className="p-3 text-sm font-semibold text-brand-700">
                        {item.label}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
