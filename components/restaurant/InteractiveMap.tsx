'use client';

import { useState } from 'react';
import { getAddress, getRestaurantIdentity } from '@/lib/restaurantData';

interface InteractiveMapProps {
  className?: string;
  height?: string;
  title?: string;
}

export default function InteractiveMap({ 
  className = "h-[600px] bg-neutral-50 rounded-xl shadow-lg overflow-hidden",
  height = "100%",
  title = "The White Horse Waterbeach Location"
}: InteractiveMapProps) {
  const [isHovered, setIsHovered] = useState(false);

  const address = getAddress();
  const identity = getRestaurantIdentity();

  const lat = address.coordinates.lat.toString();
  const lng = address.coordinates.lng.toString();

  const googleHref = address.map.google ?? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  const appleHref = address.map.apple ?? `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  const appleNative = `maps://?daddr=${lat},${lng}&dirflg=d`;
  const embedSrc = address.map.embed ?? `https://www.google.com/maps/embed/v1/place?key=&q=${lat},${lng}`;

  const handleMapClick = () => {
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

  return (
    <div className={className}>
      <div 
        className="relative h-full cursor-pointer group"
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
        aria-label={`Click to get directions to ${identity.displayName}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMapClick();
          }
        }}
      >
        {/* Google Maps Embed */}
        <iframe
          src={embedSrc}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
          className="pointer-events-none"
        />

        {/* Overlay (no transition) */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Direction Indicator (static) */}
        <div className="absolute top-4 right-4 bg-brand-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
          <span className="text-lg">🧭</span>
          <span>Get Directions</span>
        </div>

        {/* Center Pin Indicator (static) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl drop-shadow-lg">
          📍
        </div>

        {/* Click Hint (always visible, no motion) */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-sm text-neutral-700 font-medium">
          Click for directions to {identity.displayName}
        </div>

        {/* Focus Ring */}
        <div className="absolute inset-0 rounded-xl ring-0 group-focus-visible:ring-4 group-focus-visible:ring-brand-700/40" />
      </div>
    </div>
  );
}
