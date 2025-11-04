import { useMemo } from 'react';
import { getContactInfo } from '@/lib/restaurantData';
import { useContent } from '@/hooks/data/useContent';

const FALLBACK_EMAIL = getContactInfo().email.primary;

interface PrivacyContent {
  meta: {
    effectiveDate: string;
    title: string;
    contactEmail: string;
  };
  introduction: string;
  sections: {
    [key: string]: {
      title: string;
      content?: string;
      items?: string[] | Array<{ term: string; description: string }>;
      intro?: string;
    };
  };
}

export function usePrivacyContent(): PrivacyContent | null {
  const { data } = useContent();
  return useMemo(() => {
    const page: any = (data as any)?.pages?.privacy;
    if (!page) return null;
    const meta = page.meta || {};
    return {
      meta: {
        effectiveDate: meta.effectiveDate || '10 August 2025',
        title: meta.title || 'Privacy Policy',
        contactEmail: meta.contactEmail || FALLBACK_EMAIL,
      },
      introduction: page.introduction || '',
      sections: page.sections || {},
    } as PrivacyContent;
  }, [data]);
}
