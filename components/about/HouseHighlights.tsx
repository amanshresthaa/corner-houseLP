interface HouseHighlightsProps {
  items?: string[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export default function HouseHighlights({
  items = [],
  eyebrow = 'House highlights',
  title = 'What guests notice first',
  description = 'A few reasons Cambridge keeps coming back — from momo steamers to heated cabins.',
  className,
}: HouseHighlightsProps) {
  if (!items.length) return null;

  const sectionClassName = [
    'bg-gradient-to-b from-brand-50 via-white to-brand-100 py-14 sm:py-16',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClassName} aria-labelledby="house-highlights">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-brand-100 bg-white/95 p-6 shadow-2xl sm:p-9">
          <div className="space-y-4 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-500">{eyebrow}</p>
            <div>
              <h2 id="house-highlights" className="text-3xl font-display font-bold text-stout-800 sm:text-4xl">
                {title}
              </h2>
              {description ? (
                <p className="mt-2 text-brand-600">{description}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <article
                key={`highlight-${idx}`}
                className="rounded-3xl border border-brand-100 bg-brand-50/70 p-4 text-left shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
                  <p className="text-sm font-semibold text-brand-800">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
