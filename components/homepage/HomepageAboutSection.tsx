"use client";

import Image from 'next/image';

export interface HomepageAboutContent {
  title?: string;
  tagline?: string;
  description?: string[];
  features?: string[];
  image?: {
    src?: string;
    alt?: string;
  };
}

interface HomepageAboutSectionProps {
  content: HomepageAboutContent;
}

export default function HomepageAboutSection({ content }: HomepageAboutSectionProps) {
  const {
    title = 'Welcome',
    tagline,
    description = [],
    features = [],
    image,
  } = content;

  return (
    <section className="relative py-16 sm:py-20" aria-labelledby="about-white-horse">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white via-brand-50/70 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-brand-100 bg-white/90 shadow-xl backdrop-blur-sm">
          <div className="grid gap-10 p-6 md:gap-12 md:p-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="badge badge-outline badge-accent badge-lg text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                About us
              </span>
              <h2 id="about-white-horse" className="mt-4 text-4xl font-display font-bold text-stout-700 sm:text-5xl">
                {title}
              </h2>
              {tagline ? (
                <p className="mt-3 text-lg font-semibold text-accent">
                  {tagline}
                </p>
              ) : null}

              <div className="prose prose-brand mt-6 max-w-none text-brand-700">
                {description.map((paragraph, idx) => (
                  <p key={`about-paragraph-${idx}`}>{paragraph}</p>
                ))}
              </div>

              {features.length > 0 ? (
                <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/80 p-5 shadow-inner sm:mt-8">
                  <h3 className="text-xl font-display font-semibold text-brand-900">
                    House highlights
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {features.map((item, idx) => (
                      <li
                        key={`about-feature-${idx}`}
                        className="flex items-start gap-3 rounded-xl bg-white/80 p-3 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100/70"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 inline-flex h-2.5 w-2.5 flex-none items-center justify-center rounded-full bg-accent"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="relative lg:col-span-5">
              {image?.src ? (
                <div className="group relative h-80 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-brand-100/60 sm:h-[28rem]">
                  <Image
                    src={image.src}
                    alt={image.alt || 'Exterior of The White Horse Waterbeach'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
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
