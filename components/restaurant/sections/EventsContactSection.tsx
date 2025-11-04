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
    <div className={`card bg-white rounded-xl shadow-md border border-brand-100 p-8 ${className}`}>
      <div className="text-center">
        <span className="text-6xl mb-4 block" aria-hidden="true">
          🎉
        </span>
        
        <h2 className="text-2xl font-display font-bold text-brand-800 mb-4">
          {title}
        </h2>
        
        {description && (
          <p className="text-brand-700 mb-6">{description}</p>
        )}
        
        {/* Use Cases Grid */}
        <div className="bg-neutral-50 rounded-lg p-6 mb-6 border border-brand-100">
          <h3 className="font-bold text-brand-800 mb-3">
            Events? We host all kinds of private events, including:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-700">
            {useCases.map((useCase, index) => (
              <span key={index} className="badge badge-outline justify-start">
                {useCase}
              </span>
            ))}
          </div>
        </div>
        
        {/* Contact Button */}
        <a
          href={phoneHref}
          className="btn btn-primary text-base"
          aria-label={`Call restaurant to enquire about private events at ${phoneDisplay}`}
        >
          📞 Enquire / Book: {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
