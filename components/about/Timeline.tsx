'use client';

interface TimelineItem { period: string; title: string; description: string }
interface TimelineProps { items: TimelineItem[]; intro?: string }

export default function Timeline({ items = [], intro }: TimelineProps) {
  if (!items.length) return null;
  return (
    <section className="py-14 sm:py-16" aria-labelledby="about-timeline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {intro ? <p className="text-brand-700 mb-6 max-w-3xl">{intro}</p> : null}
        <h2 id="about-timeline" className="text-2xl font-display font-bold text-stout-700 mb-4">Our Story</h2>
        <div className="relative pl-5">
          <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-brand-200" />
          <ol className="space-y-6">
            {items.map((it, i) => (
              <li key={i} className="relative">
                <div className="absolute left-0 top-1 h-3 w-3 -translate-x-1 rounded-full bg-brand-600" />
                <div className="ml-6">
                  <h3 className="text-lg font-semibold text-brand-900">
                    <span className="text-accent-600 mr-1">{it.period}:</span>
                    {it.title}
                  </h3>
                  <p className="text-brand-700 mt-1">{it.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

