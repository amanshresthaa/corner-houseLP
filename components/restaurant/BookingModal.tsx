'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/hooks/useContent';
import { accessibility } from '@/lib/motion/accessibility';
import { variants } from '@/lib/motion/variants';
import BookingForm, { BookingFormData } from './BookingForm';
import { getContactInfo } from '@/lib/restaurantData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { data: content } = useContent();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contact = getContactInfo();
  const phoneDisplay = contact.phone.display;
  const phoneHref = contact.phone.tel;

  const formMessages = content?.forms?.messages;
  const uiLabels = content?.global?.ui?.labels;
  const buttons = content?.global?.ui?.buttons;

  useEffect(() => {
    const el = containerRef.current as HTMLDivElement | null;
    if (isOpen && el) {
      accessibility.focusManagement.trapFocus(el);
    }
    return () => {
      if (el) accessibility.focusManagement.restoreFocus(el);
    };
  }, [isOpen]);

  const handleFormComplete = (
    _data: BookingFormData,
    helpers: { reset: () => void; showSuccess: () => void },
  ) => {
    const successMessage =
      formMessages?.success || 'Thank you! We will call you within 1 hour to confirm your booking.';
    alert(successMessage);
    helpers.reset();
    onClose();
  };

  const renderCallPanel = () => (
    <div className="rounded-lg bg-brand-50 p-4">
      <div className="mb-2 flex items-center gap-3">
        <span className="text-2xl" aria-hidden>
          📞
        </span>
        <span className="font-medium text-brand-800">
          {uiLabels?.preferToCall || 'Prefer to call?'}
        </span>
      </div>
      <p className="mb-2 text-sm text-brand-600">
        {uiLabels?.callDirectly || 'Call us directly for immediate booking confirmation'}
      </p>
      <a
        href={phoneHref}
        className="font-semibold text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
        aria-label={`Call the restaurant on ${phoneDisplay}`}
      >
        {phoneDisplay}
      </a>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Booking modal"
          data-testid="booking-modal"
          ref={containerRef}
        >
          {/* Backdrop */}
          <motion.div
            variants={variants.fadeIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 bg-stout-900/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={variants.scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-neutral-50 shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <h2
                  id="booking-modal-title"
                  className="text-2xl font-display font-bold text-brand-800"
                >
                  {buttons?.bookOnline || 'Book a Table'}
                </h2>
                <button
                  onClick={onClose}
                  className="touch-target rounded-full text-neutral-500 transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                  aria-label="Close booking modal"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-brand-600">
                Reserve your table at Old Crown. We&apos;ll call you within 1 hour to confirm.
              </p>
            </div>

            {/* Form */}
            <div className="p-6">
              <BookingForm onComplete={handleFormComplete} renderFooter={renderCallPanel} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
