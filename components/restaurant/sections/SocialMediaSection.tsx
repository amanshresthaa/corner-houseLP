
'use client';

import { getSocialMedia } from '@/lib/restaurantData';

interface SocialMediaSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * SocialMediaSection Component
 * 
 * Displays social media links with proper icons and accessibility.
 * Extracted from Contact page for better modularity and reusability.
 * 
 * Features:
 * - Single Facebook link with SVG icon
 * - External link security attributes
 * - Hover and focus animations
 * - Screen reader accessible labels
 * - Centered layout design
 * - Design system color scheme
 */
export default function SocialMediaSection({
  title = "Follow Us",
  description = "Stay updated with our latest news and special offers",
  className = ''
}: SocialMediaSectionProps) {
  const social = getSocialMedia();
  const facebook = social.facebook?.url ?? 'https://www.facebook.com/people/The-White-Horse/61572172781807/';
  const facebookLabel = social.facebook?.handle ?? social.facebook?.label ?? 'Facebook';

  return (
    <div className={`bg-neutral-50 p-6 rounded-xl shadow-lg text-center ${className}`}>
      <h2 className="text-xl font-display font-bold text-brand-700 mb-4">
        {title}
      </h2>
      
      {description && (
        <p className="text-neutral-600 mb-4">{description}</p>
      )}
      
      <div className="flex justify-center">
        {/* Facebook Link */}
        <a
          href={facebook}
          className="text-brand-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/60 rounded-full p-1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${facebookLabel}`}
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
