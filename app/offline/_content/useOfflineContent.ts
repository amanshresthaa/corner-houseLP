import { useMemo } from 'react';
import { useContent } from '@/hooks/data/useContent';

interface OfflineContent {
  meta: {
    title: string;
    description: string;
  };
  ui: {
    title: string;
    description: string;
    connectionStatus: {
      offline: string;
      connecting: string;
      online: string;
    };
    buttons: {
      home: string;
      tryAgain: string;
      goBack: string;
    };
  };
  features: {
    title: string;
    availableFeatures: string[];
  };
  messaging: {
    statusMessages: {
      offline: string;
      reconnecting: string;
      online: string;
    };
  };
}

export function useOfflineContent(): OfflineContent | null {
  const { data } = useContent();
  return useMemo(() => {
    const page: any = data?.pages?.offline;
    if (!page) return null;
    return {
      meta: {
        title: page.meta?.title || "You're Offline",
        description: page.meta?.description || 'Offline functionality page'
      },
      ui: {
        title: page.ui?.title || page.title || "You're Offline",
        description: page.ui?.description || page.description || 'It looks like you\'ve lost your internet connection.',
        connectionStatus: {
          offline: page.ui?.connectionStatus?.offline || 'Offline',
          connecting: page.ui?.connectionStatus?.connecting || 'Reconnecting...',
          online: page.ui?.connectionStatus?.online || 'Connected',
        },
        buttons: {
          home: page.ui?.buttons?.home || 'Go Home',
          tryAgain: page.ui?.buttons?.tryAgain || 'Try Again',
          goBack: page.ui?.buttons?.goBack || 'Go Back',
        },
      },
      features: {
        title: page.features?.title || 'Available Offline:',
        availableFeatures: page.features?.availableFeatures || page.features?.items || [],
      },
      messaging: {
        statusMessages: {
          offline: page.messaging?.statusMessages?.offline || 'You are currently offline',
          reconnecting: page.messaging?.statusMessages?.reconnecting || 'Attempting to reconnect...',
          online: page.messaging?.statusMessages?.online || 'Connection restored',
        },
      },
    } as OfflineContent;
  }, [data]);
}
