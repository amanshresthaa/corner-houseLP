import { useMemo } from 'react';
import { getContactInfo } from '@/lib/restaurantData';
import { useContent } from '@/hooks/data/useContent';

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
  const { data } = useContent();

  return useMemo(() => {
    const contact = getContactInfo();
    const menu: any = data?.pages?.menu;
    if (!menu?.hero) return null;

    const centralized: MenuContent = {
      meta: {
        title: menu.hero?.title ?? 'Menu — Nepalese & Pub Classics',
        description: menu.sections?.description ?? 'Our Nepalese kitchen is led by the Gautam family.'
      },
      hero: {
        title: menu.hero?.title ?? 'Menu — Nepalese & Pub Classics',
        subtitle: menu.hero?.subtitle ?? 'Curated menu — quick to scan. Book or order online.',
        buttons: {
          bookOnline: {
            label: (menu.hero?.cta?.book as string) || 'Book Online',
            url: '/book-a-table',
            target: '_self',
            style: 'primary'
          },
          orderTakeaway: {
            label: (menu.hero?.cta?.order as string) || `Call ${contact.phone.display}`,
            url: contact.phone.tel,
            style: 'secondary'
          }
        }
      },
      interactive: {
        search: {
          placeholder: 'Search menu items...',
          toggleLabel: 'Search & Filter',
          hideLabel: 'Hide Search',
          clearLabel: 'Clear All',
          activeLabel: 'Active'
        },
        navigation: {
          allSectionsLabel: 'All',
          menuCategoriesLabel: 'Menu categories',
          noItemsMessage: 'No items in this section match current filters'
        },
        results: {
          showingPrefix: 'Showing',
          itemsSuffix: 'items',
          matchingText: 'matching',
          withFiltersText: 'with applied filters'
        }
      },
      ui: {
        loading: {
          message: 'Loading menu...',
          error: 'Failed to load menu content'
        }
      }
    };

    // Apply URL validation to protect anchors
    return validateMenuContent(centralized);
  }, [data]);
}
