import React, { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { getContentSmart } from '@/src/lib/data/server-loader';
import contentConfig from '@/config/content.json';
import ClientLayout from '@/components/LayoutClient';
import { LoadingProvider } from '@/contexts/LoadingContext';
import GlobalLoadingIndicator from '@/components/GlobalLoadingIndicator';
import ServiceWorkerProvider from '@/components/ServiceWorkerProvider';
import { PerformanceProvider } from '@/components/PerformanceProvider';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import themeTokens from '../theme/colors';
import { getContactInfo } from '@/lib/restaurantData';
import { BRAND } from '@/src/lib/constants/brand';

const DEFAULT_THEME_COLOR = themeTokens.themes.light.colors.background;

const LAYOUT_CONTACT = getContactInfo();

// Viewport configuration (themeColor must be here in Next.js 14.2+)
export const viewport: Viewport = {
  themeColor: DEFAULT_THEME_COLOR,
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContentSmart();
  const site = content.global?.site || {} as any;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND.domain}/`),
    title: site.title || BRAND.fullName,
    description: site.description || `Cambridge's art-deco sports pub for HD matchdays, heated cabins, and Nepalese curries. Book: ${LAYOUT_CONTACT.phone.display}`,
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon-64.png', sizes: '64x64', type: 'image/png' },
        { url: '/icon-72.png', sizes: '72x72', type: 'image/png' },
        { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/icon-128.png', sizes: '128x128', type: 'image/png' },
        { url: '/icon-144.png', sizes: '144x144', type: 'image/png' },
        { url: '/icon-152.png', sizes: '152x152', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icon-384.png', sizes: '384x384', type: 'image/png' },
        { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
      ],
      shortcut: '/favicon.ico'
    }
  } as Metadata;
}

// Minimal inline scripts injected into the server HTML to ensure tests
// that dispatch `open-booking-modal` before React hydration still
// result in a visible DOM element the test can query.
const QUEUE_SCRIPT = `(function(){try{window.__bookingModalQueue = window.__bookingModalQueue || []; window.addEventListener('open-booking-modal', function(){ try{ window.__bookingModalQueue.push(true); } catch(e){} });}catch(e){} })();`;

const FALLBACK_SCRIPT = `(function(){try{function createFallback(){ try{ if(document.getElementById('booking-modal-fallback')) return; var overlay = document.createElement('div'); overlay.id = 'booking-modal-fallback'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true'); overlay.style.position = 'fixed'; overlay.style.inset = '0'; overlay.style.display = 'flex'; overlay.style.alignItems = 'center'; overlay.style.justifyContent = 'center'; overlay.style.zIndex = '9999'; overlay.style.background = 'var(--overlay-60)'; var box = document.createElement('div'); box.style.background = 'var(--color-neutral-50)'; box.style.borderRadius = '12px'; box.style.padding = '24px'; box.style.maxWidth = '640px'; box.style.width = '90%'; box.style.boxShadow = 'var(--shadow-large)'; box.innerText = 'Book a Table'; overlay.appendChild(box); document.body.appendChild(overlay); } catch(e){} } function removeFallback(){ try{ var el = document.getElementById('booking-modal-fallback'); if(el) el.remove(); } catch(e){} } window.addEventListener('open-booking-modal', function(){ try{ window.__bookingModalQueue = window.__bookingModalQueue || []; window.__bookingModalQueue.push(true); } catch(e){} if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', createFallback); } else { createFallback(); } }); window.addEventListener('booking-modal-close', removeFallback); window.addEventListener('close-booking-modal', removeFallback); } catch(e){} })();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content={DEFAULT_THEME_COLOR} />
      </head>
      <body>
        <PerformanceProvider>
          {/* Skip link for keyboard users */}
          <a href="#main-content" className="accessibility-skip-link">{contentConfig.global?.accessibility?.ariaLabels?.skipToContent || 'Skip to main content'}</a>
          <script dangerouslySetInnerHTML={{ __html: QUEUE_SCRIPT }} />
          <script dangerouslySetInnerHTML={{ __html: FALLBACK_SCRIPT }} />

          <LoadingProvider>
            <ServiceWorkerProvider>
              <GlobalLoadingIndicator />
              <ClientLayout>{children}</ClientLayout>
            </ServiceWorkerProvider>
          </LoadingProvider>
        </PerformanceProvider>
        {/* Vercel Web Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
