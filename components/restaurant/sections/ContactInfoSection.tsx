'use client';

/**
 * Props interfaces for ContactInfoSection component
 */
interface PhoneInfo {
  title: string;
  description: string;
  number: string;
  href?: string;
}

interface LocationInfo {
  title: string;
  description: string;
  address: string;
}

interface EmailInfo {
  address: string;
  label?: string;
}

interface ContactInfoSectionProps {
  phone: PhoneInfo;
  location: LocationInfo;
  email: EmailInfo;
  className?: string;
}

/**
 * ContactInfoSection Component
 * 
 * Displays phone, address, and email contact information for the restaurant.
 * Extracted from Contact page for better modularity and reusability.
 * 
 * Features:
 * - Responsive card layout with icons
 * - Clickable phone number and email links
 * - Accessible link labels and focus management
 * - Framer Motion stagger animations
 * - Design system styling with proper contrast
 * - Address parsing for multi-line display
 */
export default function ContactInfoSection({
  phone,
  location,
  email,
  className = ''
}: ContactInfoSectionProps) {
  if (!phone || !location || !email) {
    return null;
  }

  // No motion: remove animation variants

  // Parse address into lines for better display
  const commaSeparatedLines = location.address
    .split(',')
    .map((line) => line.trim())
    .filter(Boolean);
  const addressLines = commaSeparatedLines.length > 0 ? commaSeparatedLines.flatMap((line) => {
    const postcodeMatch = line.match(/([A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2})$/i);
    if (postcodeMatch && line !== postcodeMatch[0]) {
      const streetOrCity = line.slice(0, line.length - postcodeMatch[0].length).trim();
      return streetOrCity ? [streetOrCity, postcodeMatch[0]] : [postcodeMatch[0]];
    }
    return [line];
  }) : [location.address];
  const phoneHref = phone.href || `tel:${phone.number.replace(/\s/g, '')}`;

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Phone */}
      <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl" aria-hidden="true">📞</span>
          <div>
            <h2 className="text-xl font-display font-bold text-brand-700">
              {phone.title}
            </h2>
            <p className="text-neutral-600">
              {phone.description}
            </p>
          </div>
        </div>
              <p>
                <strong>Phone:</strong>
                <a href={phoneHref} className="inline-block bg-brand-600 text-neutral-50 font-semibold py-1 px-3 rounded ml-2">
                  {phone.number}
                </a>
              </p>
      </div>

      {/* Address */}
      <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-4xl" aria-hidden="true">📍</span>
          <div>
            <h2 className="text-xl font-display font-bold text-brand-700 mb-2">
              {location.title}
            </h2>
            <address className="text-neutral-600 not-italic">
              {addressLines.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </address>
          </div>
        </div>
        <p className="text-sm text-neutral-500">
          {location.description}
        </p>
      </div>

      {/* Email */}
      <div className="bg-neutral-50 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl" aria-hidden="true">📧</span>
          <div>
            <h2 className="text-xl font-display font-bold text-brand-700">
              Email
            </h2>
            <p className="text-neutral-600">
              Send us a message
            </p>
          </div>
        </div>
              <a
                href={`mailto:${email.address}`}
                className="inline-block bg-brand-600 text-neutral-50 font-semibold py-2 px-4 rounded focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/60"
                aria-label={`Email restaurant at ${email.address}`}
              >
                {email.label ?? email.address}
              </a>
      </div>
    </div>
  );
}
