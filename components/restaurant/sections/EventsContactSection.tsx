'use client';

import { getContactInfo } from '@/lib/restaurantData';

interface EventsContactSectionProps {
  title: string;
  description: string;
  phone?: string;
  className?: string;
}

/**
 * EventsContactSection Component
 * 
 * Displays private events booking section with contact information and use cases.
 * Extracted from Events page for better modularity and reusability.
 * 
 * Features:
 * - Call-to-action button with phone link
 * - Grid layout for use cases examples
 * - Framer Motion animations
 * - Responsive design
 * - Semantic HTML structure
 * - Design system styling
 */
export default function EventsContactSection({
  title,
  description,
  phone,
  className = ''
}: EventsContactSectionProps) {
  if (!title) {
    return null;
  }

  const contact = getContactInfo();
  const phoneDisplay = phone || contact.phone.display;
  const phoneHref = phone ? `tel:${phone.replace(/\s/g, '')}` : contact.phone.tel;

  const useCases = [
    'Birthday / anniversary',
    'Society socials', 
    'Project / team wrap-up',
    'Family celebrations',
    'Seasonal gatherings',
    'Visitor meet-ups'
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      <div className="text-center">
        <span className="text-6xl mb-4 block" aria-hidden="true">
          🎉
        </span>
        
        <h2 className="text-2xl font-display font-bold text-brand-700 mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-brand-600 mb-6">{description}</p>
        )}
        
        {/* Use Cases Grid */}
        <div className="bg-neutral-100 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-brand-700 mb-3">
            Events? We host all kinds of private events, including:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-600">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-center px-2 py-1 rounded">
                <span className="mr-2 text-accent">•</span>
                {useCase}
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Button */}
        <a
          href={phoneHref}
          className="inline-block bg-accent text-white font-bold py-4 px-8 rounded-lg text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
          aria-label={`Call restaurant to enquire about private events at ${phoneDisplay}`}
        >
          📞 Enquire / Book: {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
