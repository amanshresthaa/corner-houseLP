import { useState, useEffect } from 'react';
import { getContactInfo } from '@/lib/restaurantData';

// Simple URL validation function
function validateHref(url: string, context?: string): string {
  if (!url) return '';
  // Basic validation - allow relative paths, absolute URLs, tel: links, etc.
  if (url.startsWith('/') || url.startsWith('http') || url.startsWith('tel:') || url.startsWith('mailto:')) {
    return url;
  }
  console.warn(`Invalid URL in ${context}: ${url}`);
  return '';
}

interface MenuContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buttons: {
      bookOnline: {
        label: string;
        url: string;
        target: string;
        style: string;
      };
      orderTakeaway: {
        label: string;
        url: string;
        style: string;
      };
    };
  };
  interactive: {
    search: {
      placeholder: string;
      toggleLabel: string;
      hideLabel: string;
      clearLabel: string;
      activeLabel: string;
    };
    navigation: {
      allSectionsLabel: string;
      menuCategoriesLabel: string;
      noItemsMessage: string;
    };
    results: {
      showingPrefix: string;
      itemsSuffix: string;
      matchingText: string;
      withFiltersText: string;
    };
  };
  ui: {
    loading: {
      message: string;
      error: string;
    };
  };
}

// Validate and sanitize menu content URLs
function validateMenuContent(content: any): MenuContent {
  if (!content) throw new Error('No menu content provided');
  
  // Validate button URLs if they exist
  if (content.hero?.buttons) {
    if (content.hero.buttons.bookOnline?.url) {
      content.hero.buttons.bookOnline.url = validateHref(
        content.hero.buttons.bookOnline.url, 
        'menu bookOnline button'
      ) as string;
    }
    if (content.hero.buttons.orderTakeaway?.url) {
      content.hero.buttons.orderTakeaway.url = validateHref(
        content.hero.buttons.orderTakeaway.url, 
        'menu orderTakeaway button'
      ) as string;
    }
  }
  
  return content as MenuContent;
}

export function useMenuContent(): MenuContent | null {
  const [content, setContent] = useState<MenuContent | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        // Prefer centralized content.json when available
        let baseContent: any = null;
        try {
          const { default: centralized } = await import('@/config/content.json');
          const menu = (centralized as any)?.pages?.menu;
          if (menu?.hero) {
            const contact = getContactInfo();
            baseContent = {
              meta: { title: menu.hero.title, description: menu.sections?.description },
              hero: {
                title: menu.hero.title,
                subtitle: menu.hero.subtitle,
                buttons: {
                  bookOnline: {
                    label: menu.hero?.cta?.book || 'Book Online',
                    url: '/book-a-table',
                    target: '_self',
                    style: 'primary'
                  },
                  orderTakeaway: {
                    label: menu.hero?.cta?.order || `Call ${contact.phone.display}`,
                    url: contact.phone.tel,
                    style: 'secondary'
                  }
                }
              }
            };
          }
        } catch {}

        // Load local fallback and merge hero/buttons if centralized exists
        const { default: fallbackContent } = await import('./menu-content.json');
        const validatedFallback = validateMenuContent(fallbackContent);
        const contact = getContactInfo();
        const merged = baseContent ? { ...validatedFallback, ...baseContent } : validatedFallback;

        // Ensure CTA buttons use canonical contact details
        if (merged.hero?.buttons?.orderTakeaway) {
          merged.hero.buttons.orderTakeaway.url = contact.phone.tel;
          const existingLabel = merged.hero.buttons.orderTakeaway.label;
          merged.hero.buttons.orderTakeaway.label = existingLabel
            ? existingLabel.replace(/01223277217/g, contact.phone.display)
            : `Call ${contact.phone.display}`;
        }
        setContent(validateMenuContent(merged));
      } catch (error) {
        console.error('Menu content loading error:', error);
        setContent(null);
      }
    }

    loadContent();
  }, []);

  return content;
}
