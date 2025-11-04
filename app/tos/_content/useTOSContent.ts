import { useMemo } from 'react';
import { getContactInfo, getRestaurantIdentity } from '@/lib/restaurantData';
import { useContent } from '@/hooks/data/useContent';

const FALLBACK_CONTACT = getContactInfo();
const FALLBACK_EMAIL = FALLBACK_CONTACT.email.primary;
const FALLBACK_BUSINESS_NAME = getRestaurantIdentity().displayName;

interface TOSContent {
  meta: {
    effectiveDate: string;
    title: string;
    contactEmail: string;
    businessName: string;
  };
  introduction: string;
  policies: {
    cancellation: string;
    deposit: string;
  };
  sections: {
    [key: string]: {
      title: string;
      content?: string;
      items?: string[];
    };
  };
}

export function useTOSContent(): TOSContent | null {
  const { data } = useContent();
  return useMemo(() => {
    const page: any = (data as any)?.pages?.tos;
    if (!page) return null;
    const processed = processContent(page);
    // Fill meta defaults with canonical contact
    processed.meta.contactEmail = processed.meta.contactEmail || FALLBACK_EMAIL;
    processed.meta.businessName = processed.meta.businessName || FALLBACK_BUSINESS_NAME;
    return processed;
  }, [data]);
}

// Process content by substituting template variables
function processContent(rawContent: any): TOSContent {
  const processed = JSON.parse(JSON.stringify(rawContent));
  
  // Template substitutions
  const substitutions = {
    '{{cancellation_policy}}': processed.policies.cancellation,
    '{{deposit_policy}}': processed.policies.deposit,
    '{{contact_email}}': processed.meta.contactEmail,
    '{{business_name}}': processed.meta.businessName
  };
  
  // Apply substitutions to all section content
  Object.keys(processed.sections).forEach(sectionKey => {
    const section = processed.sections[sectionKey];
    if (section.content) {
      Object.entries(substitutions).forEach(([template, value]) => {
        section.content = section.content.replace(new RegExp(template, 'g'), value);
      });
    }
  });
  
  return processed;
}
