"use client";

import React from "react";
import EmojiIcon from "@/components/common/EmojiIcon";
import Link from '@/lib/debugLink';
import content from '@/config/content.json';

type SlideCTAButtonProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  variant: "book" | "menu" | "call-takeaway" | "call-booking" | "learn-more";
};

const buttonVariants = {
  book: {
    emoji: "📞",
    text: content.global?.ui?.buttons?.callToBook || "Book by Phone",
    ariaLabel: "Call us to book a table"
  },
  menu: {
    emoji: "📖",
    text: content.global?.ui?.buttons?.viewMenu || "View Menu",
    ariaLabel: "View the menu"
  },
  "call-takeaway": {
    emoji: "📞",
    text: content.global?.ui?.buttons?.callTakeaway || content.global?.ui?.buttons?.callNow || "Call Us",
    ariaLabel: "Call us"
  },
  "call-booking": {
    emoji: "📞",
    text: content.global?.ui?.buttons?.callToBook || content.global?.ui?.buttons?.callNow || "Call to Book",
    ariaLabel: "Call to make a booking"
  },
  "learn-more": {
    emoji: "ℹ️",
    text: content.global?.ui?.buttons?.showMore || "Learn More",
    ariaLabel: "Learn more about this experience"
  }
};

/**
 * Standardized CTA button for slideshow with consistent emoji handling
 */
export function SlideCTAButton({
  href,
  onClick,
  className = "",
  variant,
  ariaLabel
}: SlideCTAButtonProps) {
  const baseConfig = buttonVariants[variant];
  const hrefStr = typeof href === 'string' ? href : undefined;
  const isHttpHref = Boolean(hrefStr && hrefStr.startsWith('http'));
  const isTelHref = Boolean(hrefStr && hrefStr.startsWith('tel:'));
  const effective = baseConfig;

  const finalAriaLabel = ariaLabel || effective.ariaLabel;

  const buttonContent = (
    <>
      <EmojiIcon emoji={effective.emoji} className="mr-2" />
      {effective.text}
    </>
  );

  if (href) {
    const renderAsAnchor = isHttpHref || isTelHref;
    const shouldOpenNewTab = isHttpHref;

    if (renderAsAnchor) {
      return (
        <a
          href={href}
          className={className}
          aria-label={finalAriaLabel}
          onClick={onClick}
          target={shouldOpenNewTab ? "_blank" : undefined}
          rel={shouldOpenNewTab ? "noopener noreferrer" : undefined}
        >
          {buttonContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={className}
        aria-label={finalAriaLabel}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      className={className}
      aria-label={finalAriaLabel}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
}

export default SlideCTAButton;
