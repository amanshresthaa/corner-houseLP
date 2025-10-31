"use client";

import Image from 'next/image';

export interface SignatureDish {
  name: string;
  description?: string;
  image?: string;
}

interface HomepageSignatureDishesProps {
  title?: string;
  subtitle?: string;
  items: SignatureDish[];
}

export default function HomepageSignatureDishes({ title, subtitle, items }: HomepageSignatureDishesProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const visibleItems = items.slice(0, 3);

  return (
    <section className="bg-brand-900 py-12 text-neutral-50 sm:py-14" aria-labelledby="signature-dishes-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">
            Chef&apos;s picks
          </span>
          <h2 id="signature-dishes-heading" className="text-3xl font-display font-bold text-white md:text-4xl">
            {title || 'Signature Dishes'}
          </h2>
          {subtitle ? (
            <p className="max-w-2xl text-lg text-neutral-200">{subtitle}</p>
          ) : null}
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:mt-10">
          {visibleItems.map((dish, idx) => (
            <article
              key={`${dish.name}-${idx}`}
              className="card group h-full overflow-hidden border border-white/10 bg-white/5 text-neutral-50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {dish.image ? (
                <figure className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </figure>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-white/10 text-neutral-300">
                  <span>No image provided</span>
                </div>
              )}
              <div className="card-body flex h-full flex-col gap-4">
                <span className="inline-flex items-center gap-1 self-start rounded-full border border-accent-200/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent-100">
                  #{idx + 1}
                </span>
                <h3 className="card-title text-2xl text-white">{dish.name}</h3>
                {dish.description ? (
                  <p className="text-sm leading-relaxed text-neutral-200">
                    {dish.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
