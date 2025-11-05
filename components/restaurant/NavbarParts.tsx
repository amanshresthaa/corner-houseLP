"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import Link from '@/lib/debugLink';
import { useParsedData } from '@/hooks/useParsedData';
import { useContent } from '@/hooks/useContent';
import { NavDataSchema, NavDataParsed } from '@/lib/schemas';
import { sanitizeHref, createHrefKey, isValidHref, logHrefIssue } from '@/utils/href';
import type { HrefType } from '@/utils/href';

export interface SanitizedNavLink {
  key: string;
  href: HrefType;
  label: string;
  isSeasonal: boolean;
}

interface NavContentResult {
  links: SanitizedNavLink[];
  error: Error | null;
  errorLabel: string;
  contactLabel: string;
  navLabel: string;
  menuButtonOpenLabel: string;
  menuButtonCloseLabel: string;
  logoAlt: string;
}

export function useNavContent(): NavContentResult {
  const { data, error } = useParsedData<NavDataParsed>('nav.json', NavDataSchema);
  const { data: content } = useContent();

  const navLinksRaw =
    data?.links ||
    content?.global?.navigation?.header?.links ||
    [];

  const sanitizedLinks = useMemo<SanitizedNavLink[]>(() => {
    return navLinksRaw.reduce<SanitizedNavLink[]>((acc, link, index) => {
      if (!isValidHref(link.href)) {
        logHrefIssue('Invalid href detected in navbar link', link.href, 'Navbar.useNavContent');
        return acc;
      }

      const sanitizedHref = sanitizeHref(link.href);
      if (sanitizedHref === '/' || sanitizedHref === '/contact') {
        return acc;
      }

      acc.push({
        key: createHrefKey(link.href, index),
        href: sanitizedHref,
        label: link.label,
        isSeasonal: sanitizedHref === '/christmas-menu',
      });
      return acc;
    }, []);
  }, [navLinksRaw]);

  const uiLabels = content?.global?.ui?.labels;
  const ariaLabels = content?.global?.accessibility?.ariaLabels;
  const contactLabel = content?.global?.ui?.buttons?.contact || 'Contact';
  const navLabel = ariaLabels?.mainNavigation || 'Main navigation';
  const menuButtonOpenLabel =
    ariaLabels?.menuButton ||
    ariaLabels?.openMenu ||
    'Open navigation menu';
  const menuButtonCloseLabel =
    ariaLabels?.closeMenu ||
    ariaLabels?.closeDialog ||
    'Close navigation menu';
  const logoAlt =
    content?.global?.accessibility?.altTexts?.logo ||
    'The White Horse Waterbeach Logo';

  return {
    links: sanitizedLinks,
    error,
    errorLabel: uiLabels?.error || 'Nav failed',
    contactLabel,
    navLabel,
    menuButtonOpenLabel,
    menuButtonCloseLabel,
    logoAlt,
  };
}

export function NavbarLogo({ altText }: { altText: string }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2 py-1 text-brand-700"
    >
      <Image
        src="/images/brand/whitehorse-logo.png"
        alt={altText}
        width={60}
        height={45}
        className="h-8 w-auto"
        priority
      />
      <span className="text-lg font-semibold text-brand-700">
        WHITE HORSE
      </span>
    </Link>
  );
}

export function NavLinks({
  links,
  error,
  errorLabel,
  orientation = 'horizontal',
  onNavigate,
}: {
  links: SanitizedNavLink[];
  error: Error | null;
  errorLabel: string;
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
}) {
  const isVertical = orientation === 'vertical';
  const listClass = isVertical
    ? 'menu menu-vertical gap-2 px-0'
    : 'menu menu-horizontal gap-1 px-0';

  const defaultLinkClass = isVertical
    ? 'btn btn-ghost justify-start w-full text-left font-medium text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
    : 'btn btn-ghost font-semibold text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  const seasonalLinkClass = isVertical
    ? 'btn justify-start w-full text-left items-center gap-2 border-none bg-brand-50 text-brand-700 shadow-sm transition hover:bg-brand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white'
    : 'btn btn-ghost items-center gap-2 font-semibold text-brand-700 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  return (
    <div
      className={isVertical ? 'flex flex-col gap-3' : 'flex items-center gap-3'}
      data-orientation={orientation}
    >
      {error && (
        <span className="badge badge-error badge-sm">
          {errorLabel}
        </span>
      )}
      <ul className={listClass}>
        {links.map((link) => {
          const isOrderTakeaway =
            /order\s*(takeaway|online)/i.test(link.label) ||
            (typeof link.href === 'string' && /touchtakeaway\./i.test(link.href));

          const hrefStr = typeof link.href === 'string' ? link.href : undefined;
          const isExternal = !!hrefStr && /^https?:\/\//i.test(hrefStr);

          return (
            <li key={link.key}>
              {isOrderTakeaway ? (
                isExternal ? (
                  <a
                    href={hrefStr}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className={
                      isVertical
                        ? 'btn blueprint-btn justify-start w-full relative text-white font-semibold'
                        : 'btn blueprint-btn relative text-white font-semibold'
                    }
                    aria-label={`${link.label} – delivery available (free up to 3 miles), 10% off collection`}
                  >
                    <span aria-hidden className="blueprint-corners" />
                    <span className="relative z-[1]">{link.label}</span>
                    <span aria-hidden className="blueprint-corner-note hidden xs:block">🏷️ 10% off · 🛵 delivery (≤3mi free)</span>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={
                      isVertical
                        ? 'btn blueprint-btn justify-start w-full relative text-white font-semibold'
                        : 'btn blueprint-btn relative text-white font-semibold'
                    }
                    aria-label={`${link.label} – delivery available (free up to 3 miles), 10% off collection`}
                  >
                    <span aria-hidden className="blueprint-corners" />
                    <span className="relative z-[1]">{link.label}</span>
                    <span aria-hidden className="blueprint-corner-note hidden xs:block">🏷️ 10% off · 🛵 delivery (≤3mi free)</span>
                  </Link>
                )
              ) : (
                isExternal ? (
                  <a
                    href={hrefStr}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onNavigate}
                    className={link.isSeasonal ? seasonalLinkClass : defaultLinkClass}
                  >
                    {link.isSeasonal ? (
                      <>
                        <span aria-hidden="true" className="text-lg leading-none">🎄</span>
                        <span className="font-semibold">{link.label}</span>
                      </>
                    ) : (
                      link.label
                    )}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className={link.isSeasonal ? seasonalLinkClass : defaultLinkClass}
                  >
                    {link.isSeasonal ? (
                      <>
                        <span aria-hidden="true" className="text-lg leading-none">🎄</span>
                        <span className="font-semibold">{link.label}</span>
                      </>
                    ) : (
                      link.label
                    )}
                  </Link>
                )
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ContactCTA({
  label,
  onClick,
  fullWidth = false,
}: {
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  const baseClasses =
    'btn border-none bg-brand-700 text-neutral-50 hover:bg-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  return (
    <Link
      href="/contact"
      onClick={onClick}
      className={fullWidth ? `${baseClasses} btn-block` : baseClasses}
    >
      {label}
    </Link>
  );
}
