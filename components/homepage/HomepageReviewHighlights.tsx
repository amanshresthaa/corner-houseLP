"use client";

import Link from 'next/link';
import { getReviewLinks } from '@/lib/restaurantData';

export interface ReviewHighlight {
  quote: string;
  source?: string;
  platform?: string;
  rating?: number;
}

interface HomepageReviewHighlightsProps {
  title?: string;
  subtitle?: string;
  items: ReviewHighlight[];
}

export default function HomepageReviewHighlights({ title, subtitle, items }: HomepageReviewHighlightsProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, 6);

  const reviewLinks = getReviewLinks();
  const tripadvisorUrl = reviewLinks.tripadvisor || '#';
  const googleUrl = reviewLinks.google || '#';

  return (
    <section className="bg-neutral-100 py-12 text-brand-800 sm:py-14" aria-labelledby="reviews-highlight-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Guest highlights
          </span>
          <h2 id="reviews-highlight-heading" className="text-3xl font-display font-bold text-stout-700 md:text-4xl">
            {title || 'Guest Highlights'}
          </h2>
          {subtitle ? (
            <p className="max-w-2xl text-lg text-brand-600">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:mt-10">
          {visibleItems.map((item, idx) => (
            <figure
              key={`${item.platform || 'review'}-${idx}`}
              className="flex h-full flex-col justify-between rounded-3xl border border-brand-100 bg-white p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <blockquote className="relative text-lg font-semibold leading-relaxed text-brand-800">
                <span
                  aria-hidden="true"
                  className="absolute -top-6 left-0 text-5xl font-serif text-accent/70"
                >
                  &ldquo;
                </span>
                <span className="block pl-6">
                  {item.quote}
                </span>
              </blockquote>
              <figcaption className="mt-7 space-y-1 text-sm text-brand-600">
                {item.platform ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-accent">
                    {item.platform}
                  </span>
                ) : null}
                {item.source ? (
                  <span className="block text-brand-500">{item.source}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Review Platform Links */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-semibold text-brand-700">Read more reviews on:</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-accent bg-white px-6 py-3 font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Tripadvisor
            </Link>
            <Link
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-600 bg-white px-6 py-3 font-semibold text-brand-600 transition-all duration-200 hover:bg-brand-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Reviews
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
