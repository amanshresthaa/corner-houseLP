"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import NotificationToaster from '@/components/ui/Notifications';
import { Tooltip } from "react-tooltip";
import config from "@/config";
import dynamic from 'next/dynamic';
import PageTransition from '@/components/PageTransition';
import { MotionConfigProvider } from '@/lib/motion/accessibility';
import { MotionFeatures } from '@/lib/motion/performance';

const StickyCallButtonDynamic = dynamic(() => import('./StickyCallButton'), {
  ssr: false,
  loading: () => null
});

const BookingModal = dynamic(() => import('./restaurant/BookingModal'), {
  ssr: false,
  loading: () => null
});

const BookingModalPortal = ({ disabled = false }: { disabled?: boolean }) => {
  const [open, setOpen] = React.useState(false);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);

    const handler = () => {
      setOpen(true);
    };

    window.addEventListener("open-booking-modal", handler);


    try {
      document.documentElement.setAttribute('data-booking-portal-mounted', '1');
    } catch (e) { /* ignore */ }

    try {
      const q = (window as any).__bookingModalQueue;
      if (Array.isArray(q) && q.length > 0) {
        setOpen(true);
        (window as any).__bookingModalQueue = [];
      }
    } catch (e) { /* ignore */ }

    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

  React.useEffect(() => {
    if (open) {
      window.dispatchEvent(new CustomEvent("booking-modal-open"));
    } else {
      window.dispatchEvent(new CustomEvent("booking-modal-close"));
    }
  }, [open]);

  if (!isHydrated) {
    return <div data-booking-portal-mounted="0"></div>;
  }

  if (disabled) return null;
  return (
    <div data-booking-portal-mounted={open ? "1" : "0"}>
      <BookingModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

// Client layout with all wrappers
const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() || '';
  const isNoMotion = (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/signin')
  );
  return (
    <>
      {/* Progress bar at the top when navigating */}
      {!isNoMotion && <NextTopLoader color={config.colors.main} showSpinner={false} />}

      {/* LazyMotion + MotionConfig + Page transitions */}
      <MotionFeatures>
        <MotionConfigProvider reducedMotion="user">
          <PageTransition disableMotion={isNoMotion} routeKey={pathname}>
            {children}
          </PageTransition>
        </MotionConfigProvider>
      </MotionFeatures>

      {/* Notification toaster */}
      <NotificationToaster />

      {/* Tooltips */}
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />

      {/* Floating FAB */}
      {!isNoMotion && <StickyCallButtonDynamic />}
      <BookingModalPortal disabled={isNoMotion} />
    </>
  );
};

export default ClientLayout;
