"use client";

import Link from 'next/link';
import { getReviewLinks } from '@/lib/restaurantData';

export interface ReviewHighlight {
  quote: string;
  source?: string;
  platform?: string;
  rating?: number;
  date?: string;
  accent?: string;
  featured?: boolean;
}

export interface ReviewHero {
  eyebrow?: string;
  title?: string;
  description?: string;
  badge?: {
    label: string;
    value?: string;
  };
  cta?: {
    text: string;
    href: string;
  };
}

export interface ReviewStat {
  value: string;
  label: string;
  description?: string;
}

export interface ReviewSpotlight {
  title: string;
  copy?: string;
  accent?: string;
}

interface HomepageReviewHighlightsProps {
  title?: string;
  subtitle?: string;
  hero?: ReviewHero;
  stats?: ReviewStat[];
  spotlights?: ReviewSpotlight[];
  items: ReviewHighlight[];
}

const accentGradient: Record<string, string> = {
  accent: 'from-accent/30 via-rose-500/20 to-brand-900/40',
  brand: 'from-brand-500/30 via-brand-400/20 to-brand-900/40',
  emerald: 'from-emerald-400/30 via-emerald-500/20 to-brand-900/40',
  amber: 'from-amber-400/30 via-amber-500/20 to-brand-900/40',
  lilac: 'from-fuchsia-400/30 via-purple-500/20 to-brand-900/40',
  default: 'from-brand-500/25 via-brand-700/30 to-brand-900/40',
};

const accentBorder: Record<string, string> = {
  accent: 'border-accent/40',
  brand: 'border-brand-400/40',
  emerald: 'border-emerald-400/40',
  amber: 'border-amber-400/40',
  lilac: 'border-purple-400/40',
  default: 'border-white/15',
};

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');
const isExternalHttp = (href: string) => /^https?:\/\//i.test(href);
const isValidHref = (href?: string) => Boolean(href && href.trim() && href.trim() !== '#');

const renderStars = (rating?: number) => {
  if (!rating || rating <= 0) {
    return null;
  }
  const count = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-1 text-amber-300">
      {Array.from({ length: count }).map((_, idx) => (
        <span key={`star-${idx}`} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
};

const PlatformLink = ({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: 'accent' | 'brand';
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-3 rounded-full border-2 px-5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
      tone === 'accent'
        ? 'border-accent text-accent hover:bg-accent hover:text-white focus-visible:ring-accent focus-visible:ring-offset-brand-900'
        : 'border-white/40 text-white hover:bg-white/10 focus-visible:ring-white/60 focus-visible:ring-offset-brand-900'
    }`}
  >
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold tracking-[0.2em] ${
        tone === 'accent' ? 'bg-accent/10 text-accent' : 'bg-white/10 text-white'
      }`}
    >
      {tone === 'accent' ? 'T' : 'G'}
    </span>
    {label}
  </a>
);

const ReviewCard = ({ review }: { review: ReviewHighlight }) => (
  <figure
    className={`flex h-full flex-col justify-between rounded-3xl border bg-white p-5 text-brand-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${
      accentBorder[review.accent ?? ''] || accentBorder.default
    }`}
  >
    <blockquote className="text-base leading-relaxed text-brand-700">
      “{review.quote}”
    </blockquote>
    <figcaption className="mt-5 space-y-1 text-sm text-brand-500">
      <div className="flex flex-wrap items-center gap-2">
        {review.platform ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">
            {review.platform}
          </span>
        ) : null}
        {review.rating ? (
          <span className="text-xs font-semibold text-amber-500">{review.rating.toFixed(1)}★</span>
        ) : null}
      </div>
      {review.source ? <p>{review.source}</p> : null}
      {review.date ? <p className="text-xs uppercase tracking-[0.3em] text-brand-400">{review.date}</p> : null}
    </figcaption>
  </figure>
);

export default function HomepageReviewHighlights({
  title,
  subtitle,
  hero,
  stats,
  spotlights,
  items,
}: HomepageReviewHighlightsProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const reviewLinks = getReviewLinks();
  const tripadvisorUrl = reviewLinks.tripadvisor;
  const googleUrl = reviewLinks.google;

  const eyebrow = hero?.eyebrow || 'Guest highlights';
  const heading = hero?.title || title || 'Guest Highlights';
  const heroDescription = hero?.description || subtitle;
  const heroCta = hero?.cta;
  const heroBadge = hero?.badge;
  const heroCtaHref = heroCta?.href?.trim();
  const shouldRenderHeroCta = Boolean(heroCta?.text && isValidHref(heroCtaHref));
  const platformLinks = [
    { href: tripadvisorUrl, label: 'Tripadvisor', tone: 'accent' as const },
    { href: googleUrl, label: 'Google Reviews', tone: 'brand' as const },
  ].filter((link) => isValidHref(link.href));

  const featuredReview = items.find((review) => review.featured) || items[0];
  const supportingReviews = items.filter((review) => review !== featuredReview).slice(0, 6);

  return (
    <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-12 text-white sm:py-16" aria-labelledby="reviews-highlight-heading">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">
              {eyebrow}
            </span>
            <div className="space-y-3">
              <h2 id="reviews-highlight-heading" className="text-3xl font-display font-bold leading-tight text-white sm:text-4xl">
                {heading}
              </h2>
              {heroDescription ? <p className="text-lg text-white/80">{heroDescription}</p> : null}
            </div>
            <div className="flex flex-wrap gap-3">
              {shouldRenderHeroCta ? (
                isInternal(heroCtaHref!) ? (
                  <Link href={heroCtaHref!} className="btn btn-accent btn-sm rounded-full border-none text-sm font-semibold">
                    {heroCta!.text}
                  </Link>
                ) : (
                  <a
                    href={heroCtaHref!}
                    className="btn btn-accent btn-sm rounded-full border-none text-sm font-semibold"
                    {...(isExternalHttp(heroCtaHref!)
                      ? { target: '_blank' as const, rel: 'noopener noreferrer' as const }
                      : {})}
                  >
                    {heroCta!.text}
                  </a>
                )
              ) : null}
              {platformLinks.map((link) => (
                <PlatformLink key={link.label} href={link.href!.trim()} label={link.label} tone={link.tone} />
              ))}
            </div>
            {heroBadge?.label ? (
              <div className="flex items-center gap-3 rounded-3xl border border-white/25 bg-white/10 px-5 py-3">
                <span className="text-3xl font-display font-bold text-white">{heroBadge.value}</span>
                <span className="text-sm uppercase tracking-[0.2em] text-white/70">{heroBadge.label}</span>
              </div>
            ) : null}
          </div>

          <div>
            <article className="relative h-full rounded-4xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  {featuredReview.platform ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                      {featuredReview.platform}
                    </span>
                  ) : null}
                  {featuredReview.rating ? (
                    <span className="text-base font-semibold text-amber-300">{featuredReview.rating.toFixed(1)}★</span>
                  ) : null}
                </div>
                {featuredReview.date ? (
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">{featuredReview.date}</span>
                ) : null}
              </div>
              <blockquote className="mt-6 text-lg font-semibold leading-relaxed text-white">
                “{featuredReview.quote}”
              </blockquote>
              <figcaption className="mt-6 space-y-1 text-sm text-white/70">
                {featuredReview.source ? <p>{featuredReview.source}</p> : null}
                {renderStars(featuredReview.rating)}
              </figcaption>
            </article>
          </div>
        </div>

        {stats && stats.length ? (
          <div className="mt-12 grid gap-4 rounded-4xl border border-white/20 bg-white/10 p-6 text-center text-white sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={`review-stat-${idx}`} className="space-y-2">
                <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                {stat.description ? <p className="text-xs text-white/60">{stat.description}</p> : null}
              </div>
            ))}
          </div>
        ) : null}

        {spotlights && spotlights.length ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {spotlights.map((spotlight, idx) => (
              <article
                key={`spotlight-${spotlight.title}-${idx}`}
                className={`rounded-3xl border bg-gradient-to-br p-6 text-white shadow-xl ${
                  accentGradient[spotlight.accent ?? ''] || accentGradient.default
                } ${accentBorder[spotlight.accent ?? ''] || accentBorder.default}`}
              >
                <h3 className="font-display text-xl font-semibold text-white">{spotlight.title}</h3>
                {spotlight.copy ? <p className="mt-3 text-sm text-white/80">{spotlight.copy}</p> : null}
              </article>
            ))}
          </div>
        ) : null}

        {supportingReviews.length ? (
          <div className="mt-12">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
              <span>More guest voices</span>
              <span>Swipe to explore</span>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 lg:hidden" aria-label="Guest review carousel">
              {supportingReviews.map((review, idx) => (
                <div key={`mobile-review-${idx}`} className="w-72 flex-none">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            <div className="mt-6 hidden gap-6 lg:grid lg:grid-cols-3">
              {supportingReviews.map((review, idx) => (
                <ReviewCard key={`desktop-review-${idx}`} review={review} />
              ))}
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
