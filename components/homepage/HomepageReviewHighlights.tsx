"use client";

export interface ReviewHighlight {
  quote: string;
  source?: string;
  platform?: string;
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

  const visibleItems = items.slice(0, 3);

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
      </div>
    </section>
  );
}
