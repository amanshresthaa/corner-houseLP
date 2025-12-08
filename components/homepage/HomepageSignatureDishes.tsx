"use client";

import Image from 'next/image';
import Link from '@/lib/debugLink';

export interface SignatureDish {
  name: string;
  description?: string;
  image?: string;
  tags?: string[];
  spiceLevel?: string;
  price?: string;
  featured?: boolean;
  callout?: string;
}

interface SignatureHero {
  eyebrow?: string;
  title?: string;
  description?: string;
  quote?: string;
  quoteBy?: string;
  cta?: {
    text: string;
    href: string;
  };
}

interface HomepageSignatureDishesProps {
  title?: string;
  subtitle?: string;
  hero?: SignatureHero;
  items: SignatureDish[];
}

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

export default function HomepageSignatureDishes({ title, subtitle, hero, items }: HomepageSignatureDishesProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  const validItems = items.filter((d) => Boolean(d?.name));
  const featuredDish = validItems.find((dish) => dish.featured);
  const supportingDishes = featuredDish
    ? validItems.filter((dish) => dish !== featuredDish)
    : validItems;

  const highlightTags = Array.from(
    new Set(
      validItems
        .flatMap((dish) => dish.tags ?? [])
        .filter((tag): tag is string => Boolean(tag))
    )
  ).slice(0, 6);

  const heading = hero?.title || title || 'Signature Dishes';
  const eyebrow = hero?.eyebrow || 'Signature Nepalese dishes';
  const heroDescription = hero?.description || subtitle;
  const heroCta = hero?.cta;

  const renderTags = (tags?: string[]) => {
    if (!tags || !tags.length) {
      return null;
    }
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="badge badge-outline border-white/30 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const FeaturedCard = () => {
    if (!featuredDish) return null;
    return (
      <article className="relative overflow-hidden rounded-4xl border border-white/20 bg-white/5 text-white shadow-2xl backdrop-blur-sm">
        {featuredDish.image ? (
          <div className="relative h-80 w-full sm:h-[28rem]">
            <Image
              src={featuredDish.image}
              alt={featuredDish.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        ) : (
          <div className="h-80 bg-white/10 sm:h-[28rem]" aria-hidden />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {featuredDish.callout ? (
            <span className="badge badge-accent badge-sm mb-3 uppercase tracking-[0.3em] text-xs">
              {featuredDish.callout}
            </span>
          ) : null}
          <h3 className="text-3xl font-display font-bold text-white drop-shadow">
            {featuredDish.name}
          </h3>
          {featuredDish.description ? (
            <p className="mt-2 text-sm text-neutral-200">
              {featuredDish.description}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-neutral-100">
            {featuredDish.spiceLevel ? (
              <span className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
                {featuredDish.spiceLevel}
              </span>
            ) : null}
            {featuredDish.price ? (
              <span className="text-lg font-display font-semibold">{featuredDish.price}</span>
            ) : null}
          </div>
          <div className="mt-4">
            {renderTags(featuredDish.tags)}
          </div>
        </div>
      </article>
    );
  };

  const DishCard = ({ dish }: { dish: SignatureDish }) => (
    <article className="group overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-4 text-white shadow-lg backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40">
      <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white/5">
        {dish.image ? (
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 1280px) 45vw, 25vw"
          />
        ) : null}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-display font-semibold text-white">{dish.name}</h3>
        {dish.description ? (
          <p className="text-sm text-neutral-200">{dish.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-100">
          {dish.spiceLevel ? (
            <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
              {dish.spiceLevel}
            </span>
          ) : null}
          {dish.price ? (
            <span className="text-base font-display font-semibold">{dish.price}</span>
          ) : null}
        </div>
        {renderTags(dish.tags)}
      </div>
    </article>
  );

  return (
    <section className="relative bg-gradient-to-br from-brand-900 via-brand-950 to-black py-14 text-neutral-50 sm:py-20" aria-labelledby="signature-dishes-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_50%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">
              {eyebrow}
            </span>
            <div className="space-y-3">
              <h2 id="signature-dishes-heading" className="text-4xl font-display font-bold text-white sm:text-5xl">
                {heading}
              </h2>
              {heroDescription ? (
                <p className="text-lg text-neutral-200">{heroDescription}</p>
              ) : null}
            </div>
            {heroCta ? (
              isInternal(heroCta.href) ? (
                <Link
                  href={heroCta.href}
                  className="btn btn-accent btn-sm rounded-full border-none text-sm font-semibold"
                >
                  {heroCta.text}
                </Link>
              ) : (
                <a
                  href={heroCta.href}
                  className="btn btn-accent btn-sm rounded-full border-none text-sm font-semibold"
                >
                  {heroCta.text}
                </a>
              )
            ) : null}

            {hero?.quote ? (
              <figure className="rounded-3xl border border-white/15 bg-white/5 p-5 text-sm text-neutral-200">
                <blockquote className="text-base italic text-white">“{hero.quote}”</blockquote>
                {hero.quoteBy ? (
                  <figcaption className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-300">
                    {hero.quoteBy}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            {highlightTags.length ? (
              <div className="flex flex-wrap gap-2">
                {highlightTags.map((tag) => (
                  <span key={tag} className="badge badge-outline border-white/40 text-xs uppercase tracking-[0.2em] text-neutral-100">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <FeaturedCard />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between text-sm text-neutral-300">
            <p className="uppercase tracking-[0.3em]">Chef's gallery</p>
            {subtitle ? <span>{subtitle}</span> : null}
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 lg:hidden" aria-label="Signature dishes carousel">
            {supportingDishes.map((dish) => (
              <div key={`mobile-dish-${dish.name}`} className="w-72 flex-none">
                <DishCard dish={dish} />
              </div>
            ))}
          </div>

          <div className="hidden gap-6 lg:grid lg:grid-cols-3">
            {supportingDishes.map((dish) => (
              <DishCard key={`desktop-dish-${dish.name}`} dish={dish} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
