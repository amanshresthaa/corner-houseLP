'use client';

import React from 'react';
import Link from '@/lib/debugLink';
import { useMenuContent } from '../_content/useMenuContent';

type HeroButtons = {
  bookOnline: { label: string; url: string; target: string; style?: string };
  orderTakeaway: { label: string; url: string; style?: string };
};

export interface MenuHeroHighlight {
  label: string;
  value: string;
  description?: string;
}

export interface MenuHeroProps {
  hero?: {
    title: string;
    subtitle: string;
    buttons: HeroButtons;
  } | null;
  eyebrow?: string;
  highlights?: MenuHeroHighlight[];
}

export default function MenuHero({ hero: heroFromProps, eyebrow, highlights }: MenuHeroProps) {
  // Prefer server-provided hero props to avoid client fetch delay
  const content = useMenuContent();
  const hero = heroFromProps ?? content?.hero ?? null;
  const eyebrowLabel = eyebrow || 'Menu & takeaway';
  const heroHighlights = (highlights || []).filter((item) => item && item.value);

  if (!hero) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-100 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
            <div className="mx-auto h-4 w-32 animate-pulse rounded-full bg-brand-200/70" />
            <div className="h-10 animate-pulse rounded-full bg-brand-100" />
            <div className="mx-auto flex w-full max-w-xs gap-3">
              <div className="h-10 flex-1 animate-pulse rounded-full bg-brand-200/60" />
              <div className="h-10 flex-1 animate-pulse rounded-full bg-brand-200/60" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(28,45,68,0.65),_transparent_65%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            {eyebrowLabel}
          </span>
          <h1 className="mt-6 text-4xl font-display font-bold leading-tight text-white sm:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3" data-testid="menu-hero-cta-group">
            {(() => {
              const bookUrl = hero.buttons.bookOnline.url;
              const isExternal = hero.buttons.bookOnline.target === '_blank' || bookUrl.startsWith('http');
              const ariaLabel = isExternal ? `${hero.buttons.bookOnline.label} (opens in new tab)` : hero.buttons.bookOnline.label;
              const buttonClasses = 'btn btn-lg rounded-full border-none bg-white text-brand-900 shadow-xl transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/90';

              if (isExternal) {
                return (
                  <a
                    href={bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                    aria-label={ariaLabel}
                    style={{ touchAction: 'manipulation' }}
                  >
                    {hero.buttons.bookOnline.label}
                    <span aria-hidden className="ml-1 text-xs">↗</span>
                  </a>
                );
              }

              return (
                <Link href={bookUrl} className={buttonClasses} aria-label={ariaLabel}>
                  {hero.buttons.bookOnline.label}
                </Link>
              );
            })()}

            <a
              href={hero.buttons.orderTakeaway.url}
              className="btn btn-lg rounded-full border border-white/40 bg-transparent text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              {hero.buttons.orderTakeaway.label}
            </a>
          </div>
        </div>

        {heroHighlights.length ? (
          <dl
            data-testid="menu-hero-highlight-grid"
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {heroHighlights.map((highlight) => (
              <div
                key={`${highlight.label}-${highlight.value}`}
                className="rounded-3xl border border-white/15 bg-white/5 p-6 text-left shadow-lg"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">{highlight.label}</dt>
                <dd className="mt-3 text-3xl font-display font-semibold text-white">
                  {highlight.value}
                </dd>
                {highlight.description ? (
                  <p className="mt-2 text-sm text-white/70">{highlight.description}</p>
                ) : null}
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
