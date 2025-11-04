import { useMemo } from 'react';
import { useContent } from '@/hooks/data/useContent';

interface NotFoundContent {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    title: string;
    subtitle: string;
    description: string;
    suggestionsTitle: string;
    suggestions: string[];
    buttons: {
      home: string;
      menu: string;
      support: string;
    };
  };
  messaging: {
    errorCode: string;
    technicalDescription: string;
  };
}

export function useNotFoundContent(): NotFoundContent | null {
  const { data } = useContent();

  return useMemo(() => {
    const nf: any = data?.pages?.notFound;
    if (nf && (nf.ui || nf.meta || nf.messaging)) {
      return {
        meta: {
          title: nf.meta?.title || 'Page Not Found - 404',
          description: nf.meta?.description || "404 error page",
        },
        ui: {
          title: nf.ui?.title || nf.title || 'Page Not Found',
          subtitle: nf.ui?.subtitle || nf.subtitle || 'Oops! This page seems to have wandered off',
          description: nf.ui?.description || 'The page you\'re looking for doesn\'t exist.',
          suggestionsTitle: nf.ui?.suggestionsTitle || 'What you can try:',
          suggestions: nf.ui?.suggestions || [
            'Check the URL for typos',
            'Use the navigation menu',
            'Visit our homepage',
            'Contact us for help',
          ],
          buttons: {
            home: nf.ui?.buttons?.home || nf.buttons?.home || 'Go Home',
            menu: nf.ui?.buttons?.menu || 'View Menu',
            support: nf.ui?.buttons?.support || nf.buttons?.support || 'Get Help',
          },
        },
        messaging: {
          errorCode: nf.messaging?.errorCode || '404',
          technicalDescription: nf.messaging?.technicalDescription || 'The requested resource could not be found.',
        },
      } as NotFoundContent;
    }
    return null;
  }, [data]);
}
