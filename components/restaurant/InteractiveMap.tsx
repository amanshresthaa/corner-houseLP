'use client';

import { useEffect, useRef, useState } from 'react';
import { getAddress, getRestaurantIdentity, getMapLinks } from '@/lib/restaurantData';

interface InteractiveMapProps {
  className?: string;
  height?: string;
  title?: string;
  directionLabel?: string;
  hintLabel?: string;
}

export default function InteractiveMap({ 
  className = "h-[600px] bg-neutral-50 rounded-xl shadow-lg overflow-hidden",
  height = "100%",
  title,
  directionLabel = 'Get Directions',
  hintLabel = 'Click for directions'
}: InteractiveMapProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [autoLoadAllowed, setAutoLoadAllowed] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const address = getAddress();
  const identity = getRestaurantIdentity();
  const mapLinks = getMapLinks();

  const lat = address.coordinates.lat.toString();
  const lng = address.coordinates.lng.toString();

  const googleHref = mapLinks.google;
  const appleHref = mapLinks.apple;
  const appleNative = `maps://?daddr=${lat},${lng}&dirflg=d`;
  // Prefer a fixed-place embed (address label). Fallback to coordinates.
  const searchQuery = encodeURIComponent(`${identity.displayName}, ${address.street}, ${address.area}, ${address.city} ${address.postcode}`);
  const embedSrc = mapLinks.embed || `https://www.google.com/maps?&q=${searchQuery}&z=15&output=embed`;

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const connection = (navigator as any).connection;
    const saveData = Boolean(connection?.saveData);
    const effectiveType = connection?.effectiveType || '4g';
    const slowConnection = ['slow-2g', '2g'].includes(effectiveType);
    setAutoLoadAllowed(!saveData && !slowConnection);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          if (autoLoadAllowed) {
            setShouldLoad(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoLoadAllowed]);

  const handleMapClick = () => {
    if (!shouldLoad) {
      setShouldLoad(true);
      return;
    }
    const isiOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    if (isiOS) {
      try {
        // Try native Apple Maps first
        window.location.href = appleNative;
        // Fallback to web version after delay
        setTimeout(() => window.open(appleHref, '_blank', 'noopener'), 1200);
      } catch (err) {
        window.open(appleHref, '_blank', 'noopener');
      }
    } else {
      // Open Google Maps for non-iOS devices
      window.open(googleHref, '_blank', 'noopener');
    }

    // Analytics tracking
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push({ 
        event: "map_directions_click", 
        action: "directions_click",
        href: isiOS ? appleHref : googleHref
      });
    }
  };

  const mapTitle = title || `${identity.displayName} Location`;
  const mapAriaLabel = shouldLoad
    ? `Click to get directions to ${identity.displayName}`
    : `Load map preview for ${identity.displayName}`;
  const hintText = shouldLoad
    ? `${hintLabel} to ${identity.displayName}`
    : `Tap to load map for ${identity.displayName}`;

  return (
    <div className={className} ref={containerRef}>
      <div 
        className="relative h-full cursor-pointer group"
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
        aria-label={mapAriaLabel}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMapClick();
          }
        }}
      >
        {/* Google Maps Embed (deferred until in-view or user click) */}
        {shouldLoad ? (
          <iframe
            src={embedSrc}
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={mapTitle}
            className="pointer-events-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-50 text-brand-700">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-3xl">🗺️</div>
              <p className="text-sm font-semibold">Load map preview</p>
              <p className="text-xs text-brand-600">Tap to load the interactive map</p>
            </div>
          </div>
        )}

        {/* Overlay (no transition) */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Direction Indicator (static) */}
        <div className="absolute top-4 right-4 bg-brand-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
          <span className="text-lg">🧭</span>
          <span>{directionLabel}</span>
        </div>

        {/* Center Pin Indicator (static) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl drop-shadow-lg">
          📍
        </div>

        {/* Click Hint (always visible, no motion) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm text-neutral-700 font-medium">
          {hintText}
        </div>

        {/* Focus Ring */}
        <div className="absolute inset-0 rounded-xl ring-0 group-focus-visible:ring-4 group-focus-visible:ring-brand-700/40" />
      </div>
    </div>
  );
}
