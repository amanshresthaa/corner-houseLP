import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BRAND } from '@/src/lib/constants/brand';

const THIRD_PARTY_BOOKING_URL = 'https://www.nabatable.com/restaurants/the-corner-house-pub-cambridge/book';

export const metadata: Metadata = {
  title: `Book a Table | ${BRAND.fullName}`,
  description: `Reserve your table at ${BRAND.fullName}. You’ll be redirected to our booking partner to confirm instantly.`,
  alternates: {
    canonical: `https://${BRAND.domain}/book-a-table`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookATableRedirectPage() {
  redirect(THIRD_PARTY_BOOKING_URL);
}
