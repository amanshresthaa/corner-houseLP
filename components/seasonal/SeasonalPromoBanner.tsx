"use client";

import EmojiIcon from '@/components/common/EmojiIcon';
import Link from '@/lib/debugLink';
import seasonalPromoBanner from '@/config/banners/seasonalPromoBanner.json';
import { memo } from 'react';

interface SeasonalPromoBannerProps {
  className?: string;
}

type BannerSpec = typeof seasonalPromoBanner;

const SeasonalPromoBannerComponent = ({ className = '' }: SeasonalPromoBannerProps) => {
  const { meta, dataset, surface, layout, badge, icon, copy, cta } = seasonalPromoBanner as BannerSpec;

  const isLive = !meta?.status || meta.status === 'live';
  const hasCta = Boolean(cta?.href && cta?.label);
  const hasMessage = Boolean(copy?.message);

  if (!isLive || !hasCta || !hasMessage) {
    return null;
  }

  const datasetAttributes = dataset
    ? Object.entries(dataset).reduce<Record<string, string>>((acc, [key, value]) => {
        if (value === undefined || value === null || value === false) return acc;
        acc[`data-${key}`] = value === true ? 'true' : String(value);
        return acc;
      }, {})
    : {};

  const surfaceClasses = [
    'w-full',
    Array.isArray(surface?.classes) ? surface.classes.join(' ') : surface?.classes ?? '',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const regionLabelParts = [
    badge?.text ? `Seasonal promotion: ${badge.text}` : 'Seasonal promotion',
    copy?.message,
  ].filter(Boolean);
  const regionLabel = regionLabelParts.join(' – ');

  return (
    <aside
      role="region"
      aria-label={regionLabel}
      data-banner-id={meta?.id}
      data-season={meta?.season}
      data-last-updated={meta?.lastUpdated}
      {...datasetAttributes}
      className={surfaceClasses || undefined}
    >
      <div className={layout?.container} data-testid="seasonal-promo-banner">
        {badge?.text ? (
          <span className={badge.classes}>
            {badge.srLabel ? <span className="sr-only">{badge.srLabel}</span> : null}
            <span aria-hidden="true">{badge.text}</span>
          </span>
        ) : null}

        <div className={layout?.primaryGroup}>
          {icon?.emoji ? (
            <EmojiIcon emoji={icon.emoji} size="lg" label={icon.srLabel} />
          ) : null}
          <p className={layout?.messageText}>{copy.message}</p>
        </div>

        <Link
          href={cta.href}
          className={layout?.ctaGroup}
          aria-label={cta.ariaLabel || cta.label}
          data-analytics-id={cta.analyticsId}
        >
          <span className={layout?.ctaLabel}>{cta.label}</span>
          <svg
            aria-hidden="true"
            viewBox={layout?.ctaIcon?.viewBox || '0 0 24 24'}
            className="h-5 w-5 stroke-current"
            fill="none"
            strokeWidth={layout?.ctaIcon?.strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={layout?.ctaIcon?.path || 'M5 12h14'} />
          </svg>
        </Link>
      </div>
    </aside>
  );
};

const SeasonalPromoBanner = memo(SeasonalPromoBannerComponent);

SeasonalPromoBanner.displayName = 'SeasonalPromoBanner';

export default SeasonalPromoBanner;
