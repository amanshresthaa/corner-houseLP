'use client';

import Link from '@/lib/debugLink';
import { motion, useReducedMotion } from 'framer-motion';
import { sanitizeHref } from '@/utils/href';

export interface QuickLinkItem {
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  eyebrow?: string;
  ctaText?: string;
  accent?: string;
  icon?: string;
}

interface QuickLinksSectionProps {
  links: QuickLinkItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

const iconMap: Record<string, string> = {
  calendar: '📅',
  phone: '☎️',
  takeaway: '🥡',
  menu: '🍽️',
  ticket: '🎟️',
  event: '🎉',
  default: '✦',
};

const accentBackground: Record<string, string> = {
  accent: 'from-accent/30 via-rose-500/20 to-brand-900/60',
  emerald: 'from-emerald-400/30 via-emerald-500/20 to-brand-900/60',
  amber: 'from-amber-400/30 via-amber-500/20 to-brand-900/60',
  lilac: 'from-purple-400/30 via-fuchsia-500/20 to-brand-900/60',
  brand: 'from-brand-500/30 via-brand-400/25 to-brand-900/60',
  default: 'from-brand-400/30 via-brand-500/25 to-brand-900/60',
};

const accentBorder: Record<string, string> = {
  accent: 'border-accent/40',
  emerald: 'border-emerald-300/40',
  amber: 'border-amber-300/40',
  lilac: 'border-purple-300/40',
  brand: 'border-brand-300/40',
  default: 'border-white/15',
};

const getIconSymbol = (icon?: string) => iconMap[icon ?? ''] || iconMap.default;

export default function QuickLinksSection({ links, eyebrow, title, description, className = '' }: QuickLinksSectionProps) {
  if (!links || links.length === 0) {
    return null;
  }

  const heading = title || 'Plan your visit';
  const eyebrowLabel = eyebrow || 'Quick links';
  const summary = description || 'Book cabins, browse menus, or plan a quiz night straight from these shortcuts';
  const prefersReduced = useReducedMotion();

  const card = (link: QuickLinkItem, index: number) => {
    if (!link.title || !link.description || !link.link || !link.linkText) {
      return null;
    }

    const accentKey = link.accent ?? 'default';
    const ctaLabel = link.ctaText || link.linkText;

    return (
      <motion.article
        key={`${link.title}-${index}`}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/5 p-5 text-white shadow-xl backdrop-blur ${
          accentBorder[accentKey] || accentBorder.default
        }`}
        initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
            accentBackground[accentKey] || accentBackground.default
          } opacity-70`}
          aria-hidden="true"
        />
        <div className="relative flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/40 bg-white/10 text-xl">
              {getIconSymbol(link.icon)}
            </span>
            <div>
              {link.eyebrow ? (
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-white/70">{link.eyebrow}</p>
              ) : null}
              <h3 className="font-display text-xl font-semibold text-white">{link.title}</h3>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/80">{link.description}</p>
          <div className="mt-auto pt-4">
            <Link
              href={sanitizeHref(link.link)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label={`${link.title}: ${ctaLabel}`}
            >
              {ctaLabel}
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  };

  const cards = links.map(card).filter(Boolean) as JSX.Element[];

  return (
    <section className={`relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-12 text-white sm:py-16 ${className}`} aria-labelledby="homepage-quick-links-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-100">
            {eyebrowLabel}
          </span>
          <h2 id="homepage-quick-links-heading" className="text-3xl font-display font-bold sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-white/80">{summary}</p>
        </div>

        <div className="mt-8 hidden gap-6 lg:grid lg:grid-cols-3">
          {cards}
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 lg:hidden" aria-label="Quick links carousel">
          {cards.map((node, idx) => (
            <div key={`quick-link-mobile-${idx}`} className="min-w-[16rem] flex-1">
              {node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
