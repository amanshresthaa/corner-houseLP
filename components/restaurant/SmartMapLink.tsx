'use client';

import React, { useEffect, useState } from 'react';
import { getAddress, getRestaurantIdentity, getMapLinks } from '@/lib/restaurantData';

interface SmartMapLinkProps {
    className?: string;
    label?: string;
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

/**
 * A smart CTA that opens Apple Maps on Apple devices and Google Maps on others.
 */
export default function SmartMapLink({
    className = '',
    label = 'Get directions',
    children,
    variant = 'primary',
    size = 'md',
}: SmartMapLinkProps) {
    const [deviceType, setDeviceType] = useState<'apple' | 'other' | null>(null);

    const address = getAddress();
    const identity = getRestaurantIdentity();
    const mapLinks = getMapLinks();

    const lat = address.coordinates.lat.toString();
    const lng = address.coordinates.lng.toString();

    const googleHref = mapLinks.google;
    const appleHref = mapLinks.apple;
    const appleNative = `maps://?daddr=${lat},${lng}&dirflg=d`;

    useEffect(() => {
        const ua = navigator.userAgent;
        const isApple = /iPhone|iPad|iPod|Macintosh/i.test(ua);
        setDeviceType(isApple ? 'apple' : 'other');
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        if (deviceType === 'apple') {
            e.preventDefault();
            try {
                // Try native Apple Maps first
                window.location.href = appleNative;
                // Fallback to web version after delay if it didn't open
                setTimeout(() => {
                    window.open(appleHref, '_blank', 'noopener');
                }, 2000);
            } catch (err) {
                window.open(appleHref, '_blank', 'noopener');
            }
        }
        // For 'other' or if JS failed, default <a> behavior with target="_blank" will handle googleHref (default href)

        // Analytics tracking
        if ((window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: "map_directions_click",
                action: "smart_directions_click",
                platform: deviceType || 'unknown',
                href: deviceType === 'apple' ? appleHref : googleHref
            });
        }
    };

    const finalHref = deviceType === 'apple' ? appleHref : googleHref;
    const finalLabel = children || (
        <>
            {label} {variant !== 'ghost' && <span className="ml-1">↗</span>}
        </>
    );

    // Styling logic based on variant/size to match the project's design system
    const sizeClasses = {
        sm: 'btn-sm py-1 px-4 text-xs',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    const variantClasses = {
        primary: 'bg-brand-900 text-white hover:bg-brand-800 border-none',
        secondary: 'bg-white text-brand-900 hover:bg-white/90 border-none',
        outline: 'btn-outline border-brand-200 text-brand-900 hover:bg-brand-50 hover:text-brand-900 hover:border-brand-300',
        ghost: 'bg-transparent text-white hover:bg-white/10 border-white/40',
    };

    const baseClasses = 'btn rounded-full transition-all duration-200 font-medium inline-flex items-center justify-center';
    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

    return (
        <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClasses}
            onClick={handleClick}
            aria-label={`${label} (opens in ${deviceType === 'apple' ? 'Apple' : 'Google'} Maps)`}
            style={{ touchAction: 'manipulation' }}
        >
            {finalLabel}
        </a>
    );
}
