'use client';

import React from 'react';
import { useMenuContent } from '../_content/useMenuContent';

type HeroButtons = {
  bookOnline: { label: string; url: string; target: string; style?: string };
  orderTakeaway: { label: string; url: string; style?: string };
};

export interface MenuHeroProps {
  hero?: {
    title: string;
    subtitle: string;
    buttons: HeroButtons;
  } | null;
}

export default function MenuHero({ hero: heroFromProps }: MenuHeroProps) {
  // Prefer server-provided hero props to avoid client fetch delay
  const content = useMenuContent();
  const hero = heroFromProps ?? content?.hero ?? null;

  if (!hero) {
    return (
      <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <div className="h-12 bg-white/20 rounded w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-1/2 mx-auto mb-8 animate-pulse"></div>
            <div className="flex justify-center gap-4">
              <div className="h-12 w-32 bg-white/20 rounded-lg animate-pulse"></div>
              <div className="h-12 w-36 bg-white/20 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white py-10 md:py-16">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="h2 text-white mb-3 leading-tight">{hero.title}</h1>
        <p className="text-base md:text-lg text-brand-100 mb-6 max-w-2xl mx-auto leading-relaxed">{hero.subtitle}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {(() => {
            const isExternal = hero.buttons.bookOnline.target === '_blank' || hero.buttons.bookOnline.url.startsWith('http');
            const ariaLabel = isExternal ? `${hero.buttons.bookOnline.label} (opens in new tab)` : hero.buttons.bookOnline.label;
            return (
          <a
            href={hero.buttons.bookOnline.url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="bg-white hover:bg-neutral-50 text-brand-800 border-2 border-brand-200 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
            aria-label={ariaLabel}
            style={{ touchAction: 'manipulation' }}
          >
            {hero.buttons.bookOnline.label}
            {isExternal && <span aria-hidden className="ml-1 text-xs">↗</span>}
          </a>
            );
          })()}
          <a
            href={hero.buttons.orderTakeaway.url}
            className="bg-brand-900 hover:bg-brand-950 text-white border-2 border-white/20 font-bold py-3 px-6 rounded-lg text-sm transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            {hero.buttons.orderTakeaway.label}
          </a>
        </div>
      </div>
    </section>
  );
}
