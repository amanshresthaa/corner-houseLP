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

export default function HomepagePressTicker({ label, items }: HomepagePressTickerProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, 2);

  return (
    <section className="bg-brand-900 py-14 text-neutral-50 sm:py-16" aria-labelledby="press-strip-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span
            id="press-strip-heading"
            className="inline-flex items-center gap-2 self-start rounded-full border border-accent-200/40 bg-brand-800/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-200 drop-shadow" />
            {label || LABEL_DEFAULT}
          </span>
          <p className="text-sm text-neutral-200 md:max-w-xs md:text-right">
            Highlighting {visibleItems.length} recent features from our favourite publications.
          </p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-8">
          {visibleItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="card h-full border border-white/10 bg-gradient-to-br from-brand-800/70 via-brand-800/60 to-brand-700/60 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="card-body flex h-full flex-col gap-4">
                <h3 className="card-title text-2xl text-neutral-50">
                  {item.title}
                </h3>
                {item.summary ? (
                  <p className="text-sm leading-relaxed text-neutral-100/90">
                    {item.summary}
                  </p>
                ) : null}
                {item.href ? (
                  <div className="mt-auto pt-2">
                    <Link
                      href={item.href}
                      className="btn btn-sm btn-outline text-neutral-50 transition-colors hover:bg-neutral-50 hover:text-brand-800"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.ctaText || 'Read more'}
                    </Link>
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
