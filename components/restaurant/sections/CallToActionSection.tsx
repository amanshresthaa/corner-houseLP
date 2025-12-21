'use client';

import Link from '@/lib/debugLink';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUpRight,
  CalendarDays,
  MenuSquare,
  PhoneCall,
  ScrollText,
  UtensilsCrossed,
} from 'lucide-react';

export interface CTAButton {
  text: string;
  href: string;
  variant: 'accent' | 'brand' | 'crimson';
  external?: boolean;
  key?: string;
}

export interface CTABadge {
  label: string;
  value?: string;
}

export interface CTAContact {
  label?: string;
  value?: string;
  detail?: string;
}

export interface CTAImage {
  src: string;
  alt?: string;
}

export interface CallToActionSectionProps {
  eyebrow?: string;
  badge?: CTABadge;
  headline: string;
  description: string;
  features?: string[];
  contact?: CTAContact;
  image?: CTAImage;
  buttons: CTAButton[];
  className?: string;
  noBackground?: boolean;
  theme?: 'light' | 'dark';
}

const buttonIconMap: Record<string, LucideIcon> = {
  bookOnline: CalendarDays,
  book: CalendarDays,
  menu: ScrollText,
  takeaway: UtensilsCrossed,
  order: UtensilsCrossed,
  call: PhoneCall,
  hotline: PhoneCall,
  events: MenuSquare,
};

const deriveButtonIcon = (button: CTAButton): LucideIcon => {
  if (button.key && buttonIconMap[button.key]) {
    return buttonIconMap[button.key];
  }
  const text = (button.text || '').toLowerCase();
  const match = Object.entries(buttonIconMap).find(([keyword]) => text.includes(keyword));
  if (match) {
    return match[1];
  }
  return ArrowUpRight;
};

const deriveFeatureIcon = (feature: string): string => {
  const text = feature.toLowerCase();
  if (text.includes('delivery') || text.includes('deliver')) {
    return '🚚';
  }
  if (text.includes('cabin') || text.includes('heated')) {
    return '🔥';
  }
  if (text.includes('minutes') || text.includes('ready')) {
    return '⏱️';
  }
  if (text.includes('menu') || text.includes('roast') || text.includes('momo')) {
    return '🥟';
  }
  return '✦';
};

const formatTelHref = (value?: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  const digits = value.replace(/[^+\d]/g, '');
  return digits ? `tel:${digits}` : undefined;
};

const normalizeHref = (href?: string) => (href ?? '').trim();
const isValidHref = (href?: string) => {
  const trimmed = normalizeHref(href);
  return Boolean(trimmed) && trimmed !== '#';
};

export default function CallToActionSection({
  eyebrow,
  badge,
  headline,
  description,
  features,
  contact,
  image,
  buttons,
  className = '',
  noBackground = false,
  theme = 'light',
}: CallToActionSectionProps) {
  const normalizedButtons = (buttons || [])
    .map((button) => ({
      ...button,
      href: normalizeHref(button.href),
    }))
    .filter((button) => isValidHref(button.href));

  const dedupedButtons = (() => {
    const seen = new Set<string>();
    return normalizedButtons.filter((button) => {
      const key = button.href.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  })();

  if (!headline || dedupedButtons.length === 0) {
    return null;
  }

  const pill = eyebrow || 'Takeaway ready';
  const featureList = (features || []).filter((item) => Boolean(item && item.trim()));
  const hasContact = Boolean(contact?.value || contact?.detail);
  const telHref = formatTelHref(contact?.value);

  const getButtonClasses = (variant: CTAButton['variant']): string => {
    const baseClasses =
      'btn btn-lg rounded-full px-6 font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5';

    switch (variant) {
      case 'brand':
        return `${baseClasses} border border-brand-900/40 bg-brand-900 text-white shadow-xl focus-visible:ring-brand-200`;
      case 'crimson':
        return `${baseClasses} border border-crimson-100 bg-white text-crimson-700 shadow-lg focus-visible:ring-crimson-200`;
      case 'accent':
      default:
        return `${baseClasses} border border-brand-100 bg-white text-brand-800 shadow-lg focus-visible:ring-brand-200`;
    }
  };

  const renderButton = (button: CTAButton, index: number) => {
    const href = button.href.trim();
    const isInternalLink = typeof href === 'string' && href.startsWith('/') && !button.external;
    const opensNewTab = Boolean(button.external || (typeof href === 'string' && href.startsWith('http')));
    const ariaLabel = opensNewTab ? `${button.text} (opens in new tab)` : button.text;
    const Icon = deriveButtonIcon(button);
    const commonProps = {
      className: getButtonClasses(button.variant),
      'aria-label': ariaLabel,
      ...(opensNewTab
        ? {
            target: '_blank' as const,
            rel: 'noopener noreferrer' as const,
          }
        : {}),
    };

    const content = (
      <>
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{button.text}</span>
        {opensNewTab ? (
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        ) : null}
      </>
    );

    if (isInternalLink) {
      return (
        <div key={button.key || button.text || index}>
          <Link href={href} {...commonProps}>
            {content}
          </Link>
        </div>
      );
    }

    return (
      <div key={button.key || button.text || index}>
        <a href={href} {...commonProps}>
          {content}
        </a>
      </div>
    );
  };

  const isDark = theme === 'dark';
  const sectionTone = noBackground
    ? ''
    : isDark
      ? 'bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white'
      : 'bg-gradient-to-b from-brand-50 via-white to-brand-100 text-brand-900';

  const cardClasses = isDark
    ? 'relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/5 p-6 text-white shadow-2xl sm:p-8'
    : 'relative overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white/95 p-6 shadow-2xl sm:p-8';

  const haloTop = isDark
    ? 'absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]'
    : 'absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(246,232,213,0.6),_transparent_55%)]';

  const haloBottom = isDark
    ? 'absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(88,133,255,0.15),_transparent_60%)]'
    : 'absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(201,255,241,0.4),_transparent_60%)]';

  const eyebrowClasses = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-white/80'
    : 'inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1 text-brand-700';

  const badgeClasses = isDark
    ? 'inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-white/80'
    : 'inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1 text-brand-600';

  const headlineClasses = isDark
    ? 'text-3xl font-display font-bold text-white sm:text-4xl lg:text-5xl'
    : 'text-3xl font-display font-bold text-stout-900 sm:text-4xl lg:text-5xl';

  const descriptionClasses = isDark ? 'text-lg leading-relaxed text-white/80' : 'text-lg leading-relaxed text-brand-700';

  const featureListClasses = isDark ? 'grid gap-3 text-left text-white sm:grid-cols-2' : 'grid gap-3 text-left text-brand-800 sm:grid-cols-2';

  const featureCardClasses = isDark
    ? 'flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3'
    : 'flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-3';

  const secondaryPanelClasses = isDark
    ? 'relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-white shadow-xl'
    : 'relative overflow-hidden rounded-[1.75rem] border border-brand-100 bg-gradient-to-br from-brand-100 via-white to-brand-50 p-5 shadow-xl';

  const heroFallbackClasses = isDark
    ? 'flex h-64 w-full items-center justify-center rounded-3xl bg-white/10 text-white/60'
    : 'flex h-64 w-full items-center justify-center rounded-3xl bg-brand-100 text-brand-500';

  const hotlineCardClasses = isDark
    ? 'mt-5 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-white shadow-lg'
    : 'mt-5 rounded-2xl border border-brand-100 bg-white/95 px-5 py-4 text-brand-700 shadow-lg';

  const hotlineLabelClasses = isDark
    ? 'text-xs uppercase tracking-[0.4em] text-white/60'
    : 'text-xs uppercase tracking-[0.4em] text-brand-500';

  const hotlineValueClasses = isDark
    ? 'text-2xl font-display font-semibold text-white'
    : 'text-2xl font-display font-semibold text-stout-900';

  const hotlineDetailClasses = isDark ? 'text-sm text-white/70' : 'text-sm text-brand-600';

  const hotlineLinkClasses = isDark
    ? 'mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-accent hover:underline'
    : 'mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-800 underline-offset-4 hover:underline';

  return (
    <section className={`${sectionTone} py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className={cardClasses}>
          <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
            <div className={haloTop} />
            <div className={haloBottom} />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className={`flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] ${isDark ? 'text-white/70' : 'text-brand-700'} lg:justify-start`}>
                <span className={eyebrowClasses}>
                  {pill}
                </span>
                {badge?.label ? (
                  <span className={badgeClasses}>
                    {badge.value ? (
                      <span className={`font-display text-base ${isDark ? 'text-white' : 'text-stout-800'}`}>
                        {badge.value}
                      </span>
                    ) : null}
                    <span>{badge.label}</span>
                  </span>
                ) : null}
              </div>

              <div className="space-y-3">
                <h2 className={headlineClasses}>{headline}</h2>
                <p className={descriptionClasses}>{description}</p>
              </div>

              {featureList.length ? (
                <ul data-testid="cta-highlight-grid" className={featureListClasses}>
                  {featureList.map((feature, idx) => (
                    <li
                      key={`cta-feature-${idx}`}
                      className={featureCardClasses}
                    >
                      <span className="text-xl" aria-hidden="true">
                        {deriveFeatureIcon(feature)}
                      </span>
                      <span className="text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start" data-testid="cta-buttons">
                {dedupedButtons.map(renderButton)}
              </div>
            </div>

            <div className="relative">
              <div className={secondaryPanelClasses}>
                {image?.src ? (
                  <div
                    data-testid="cta-hero-image"
                    className="relative h-64 w-full overflow-hidden rounded-3xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt || headline}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" aria-hidden="true" />
                  </div>
                ) : (
                  <div
                    data-testid="cta-hero-image"
                    className={heroFallbackClasses}
                    aria-hidden="true"
                  >
                    <span className="text-5xl">🥡</span>
                  </div>
                )}

                {hasContact ? (
                  <div
                    data-testid="cta-hotline-card"
                    className={hotlineCardClasses}
                  >
                    <div className="flex flex-col gap-1">
                      <p className={hotlineLabelClasses}>{contact?.label || 'Hotline'}</p>
                      {contact?.value ? (
                        <p className={hotlineValueClasses}>{contact.value}</p>
                      ) : null}
                      {contact?.detail ? <p className={hotlineDetailClasses}>{contact.detail}</p> : null}
                    </div>
                    {telHref ? (
                      <a
                        href={telHref}
                        className={hotlineLinkClasses}
                      >
                        <PhoneCall className="h-4 w-4" aria-hidden="true" />
                        Tap to call
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
