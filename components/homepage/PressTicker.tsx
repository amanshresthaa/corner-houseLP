"use client";

import Link from '@/lib/debugLink';

export interface PressTickerItem {
  title: string;
  summary?: string;
  ctaText?: string;
  href?: string;
}

interface HomepagePressTickerProps {
  label?: string;
  items: PressTickerItem[];
}

const LABEL_DEFAULT = 'In the press';
const isInternalLink = (href: string) => href.startsWith('/') && !href.startsWith('//');
const isValidHref = (href?: string) => Boolean(href && href.trim() && href.trim() !== '#');

export default function HomepagePressTicker({ label, items }: HomepagePressTickerProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, 2);

  return (
    <section className="bg-gradient-to-br from-brand-50 via-white to-brand-50 py-12 text-brand-900 sm:py-16" aria-labelledby="press-strip-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span
            id="press-strip-heading"
            className="inline-flex items-center gap-2 self-start rounded-full border border-brand-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-600"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent drop-shadow" />
            {label || LABEL_DEFAULT}
          </span>
          <p className="text-sm text-brand-600 md:max-w-xs md:text-right">
            Highlighting {visibleItems.length} recent features from our favourite publications.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="card h-full border border-brand-100 bg-white/90 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body flex h-full flex-col gap-4">
                <h3 className="card-title text-2xl text-brand-900">
                  {item.title}
                </h3>
                {item.summary ? (
                  <p className="text-sm leading-relaxed text-brand-700">
                    {item.summary}
                  </p>
                ) : null}
                {isValidHref(item.href) ? (
                  <div className="mt-auto pt-2">
                    {isInternalLink(item.href!.trim()) ? (
                      <Link
                        href={item.href!.trim()}
                        className="btn btn-sm btn-outline border-brand-200 text-brand-900 transition-colors hover:border-brand-400 hover:bg-white"
                      >
                        {item.ctaText || 'Read more'}
                      </Link>
                    ) : (
                      <a
                        href={item.href!.trim()}
                        className="btn btn-sm btn-outline border-brand-200 text-brand-900 transition-colors hover:border-brand-400 hover:bg-white"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.ctaText || 'Read more'}
                      </a>
                    )}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
