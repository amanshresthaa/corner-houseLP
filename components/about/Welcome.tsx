'use client';

import Image from 'next/image';

interface WelcomeProps {
  heading: string;
  tagline?: string;
  paragraphs?: string[];
  features?: string[];
  image?: { src?: string; alt?: string };
}

export default function Welcome({ heading, tagline, paragraphs = [], features = [], image }: WelcomeProps) {
  return (
    <section className="py-14 sm:py-16" aria-labelledby="about-welcome">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-100/70 bg-white shadow-xl">
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="badge badge-accent badge-outline badge-lg text-xs font-semibold uppercase tracking-[0.3em]">About</span>
              <h2 id="about-welcome" className="mt-3 text-3xl sm:text-4xl font-display font-bold text-stout-700">
                {heading}
              </h2>
              {tagline ? (
                <p className="mt-2 text-base sm:text-lg font-semibold text-accent-700">{tagline}</p>
              ) : null}
              {paragraphs.length > 0 ? (
                <div className="prose prose-brand mt-5 max-w-none text-brand-800">
                  {paragraphs.map((p, i) => (
                    <p key={`p-${i}`}>{p}</p>
                  ))}
                </div>
              ) : null}

              {features.length > 0 ? (
                <div className="mt-6 rounded-2xl bg-brand-50/80 p-5 ring-1 ring-brand-100">
                  <h3 className="text-lg font-display font-semibold text-brand-900">Why Guests Visit</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {features.map((f, i) => (
                      <li key={`f-${i}`} className="flex items-start gap-3 rounded-xl bg-white p-3 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
                        <span aria-hidden className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-5">
              {image?.src ? (
                <div className="group relative h-80 overflow-hidden rounded-3xl ring-4 ring-brand-100/60 shadow-2xl sm:h-[28rem]">
                  <Image
                    src={image.src}
                    alt={image.alt || 'The White Horse Waterbeach'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <div className="flex h-80 items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-brand-50 text-brand-300 shadow-inner sm:h-[28rem]">
                  <span>No imagery supplied</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

