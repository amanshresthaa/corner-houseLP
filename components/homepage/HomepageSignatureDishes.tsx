"use client";

import Image from 'next/image';

export interface SignatureDish {
  name: string;
  description?: string;
  image?: string;
}

interface HomepageSignatureDishesProps {
  title?: string;
  subtitle?: string; // accepted but not rendered (dish names only requirement)
  items: SignatureDish[];
}

export default function HomepageSignatureDishes({ title, subtitle, items }: HomepageSignatureDishesProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  // Use only items with a valid name; show all provided (no random names)
  const validItems = items.filter((d) => Boolean(d?.name));

  return (
    <section className="bg-brand-900 py-12 text-neutral-50 sm:py-14" aria-labelledby="signature-dishes-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 id="signature-dishes-heading" className="text-3xl font-display font-bold text-white md:text-4xl">
            {title || 'Signature Dishes'}
          </h2>
          {/* Subtitle intentionally not rendered to keep focus on dish names only */}
        </div>

        {/* Mobile-first: scrolling carousel using DaisyUI */}
        <div className="mt-8 md:hidden">
          <div className="carousel carousel-center w-full space-x-4 rounded-box">
            {validItems.map((dish, idx) => (
              <div className="carousel-item w-72" key={`${dish.name}-${idx}`}>
                <article className="card image-full w-72 shadow-xl">
                  {dish.image ? (
                    <figure className="relative w-full h-44">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, 320px"
                      />
                    </figure>
                  ) : (
                    <div className="relative h-44 w-full bg-white/10" aria-hidden />
                  )}
                  <div className="card-body p-4 justify-end">
                    <h3 className="card-title text-lg font-bold text-white m-0">{dish.name}</h3>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: clean grid layout */}
        <div className="mt-10 hidden grid-cols-2 gap-6 sm:grid xl:grid-cols-3">
          {validItems.map((dish, idx) => (
            <article
              key={`${dish.name}-${idx}`}
              className="card image-full group overflow-hidden border border-white/10 bg-white/5 text-neutral-50 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {dish.image ? (
                <figure className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1280px) 45vw, 30vw"
                  />
                </figure>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-white/10 text-neutral-300" aria-hidden />
              )}
              <div className="card-body flex items-end p-4">
                <h3 className="card-title m-0 text-2xl text-white drop-shadow">{dish.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
