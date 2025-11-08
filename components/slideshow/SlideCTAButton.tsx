"use client";

import React from "react";
import EmojiIcon from "@/components/common/EmojiIcon";
import Link from '@/lib/debugLink';
import content from '@/config/content.json';
import { isOnlineDeliveryHref } from '@/utils/onlineDelivery';

type SlideCTAButtonProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
  variant: "book" | "menu" | "takeaway" | "call-takeaway" | "call-booking" | "learn-more";
};

const buttonVariants = {
  book: {
    emoji: "🍽️",
    text: content.global?.ui?.buttons?.bookOnline || "Book Online",
    ariaLabel: "Book a table online"
  },
  menu: {
    emoji: "📖",
    text: content.global?.ui?.buttons?.viewMenu || "View Menu",
    ariaLabel: "View the menu"
  },
  takeaway: {
    emoji: "🥡",
    text: content.global?.ui?.buttons?.orderTakeaway || "Order Online",
    ariaLabel: "Order online"
  },
  "call-takeaway": {
    emoji: "📞", 
    text: content.global?.ui?.buttons?.callTakeaway || content.global?.ui?.buttons?.callNow || "Call to Order",
    ariaLabel: "Call to place an order"
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
  const isOnlineDelivery = isOnlineDeliveryHref(hrefStr);

  // Override label for online delivery links to be explicit
  const effective = ((): { emoji: string; text: string; ariaLabel: string } => {
    if (variant === 'menu' && isOnlineDelivery) {
      return { 
        emoji: '🥡', 
        text: content.global?.ui?.buttons?.orderTakeaway || 'Order Online', 
        ariaLabel: 'Order online' 
      };
    }
    return baseConfig;
  })();

  const finalAriaLabel = ariaLabel || effective.ariaLabel;
  
  const buttonContent = (
    <>
      <EmojiIcon emoji={effective.emoji} className="mr-2" />
      {effective.text}
    </>
  );
  
  if (href) {
    const renderAsAnchor = isHttpHref || isTelHref || isOnlineDelivery;
    const shouldOpenNewTab = isHttpHref || isOnlineDelivery;
    
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
