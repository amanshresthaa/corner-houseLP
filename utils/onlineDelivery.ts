const ONLINE_DELIVERY_PATH = '/online-delivery';

function stripTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

function extractPath(href: string): string {
  const value = href.startsWith('http')
    ? (() => {
        try {
          const url = new URL(href);
          return url.pathname || '/';
        } catch {
          return href;
        }
      })()
    : href;

  const [pathPart] = value.split(/[?#]/);
  return stripTrailingSlash(pathPart || '/');
}

export function isOnlineDeliveryHref(href?: string | null): boolean {
  if (typeof href !== 'string' || !href.trim()) {
    return false;
  }
  return extractPath(href) === ONLINE_DELIVERY_PATH;
}

export { ONLINE_DELIVERY_PATH };
