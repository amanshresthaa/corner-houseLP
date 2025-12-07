'use client';

import React, { useMemo, useState } from 'react';
import { useContent } from '@/hooks/useContent';
import Button from './Button';
import { getContactInfo } from '@/lib/restaurantData';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}

interface BookingFormProps {
  onComplete?: (
    data: BookingFormData,
    helpers: { reset: () => void; showSuccess: () => void }
  ) => void;
  showInlineSuccess?: boolean;
  submitLabel?: string;
  className?: string;
  /**
   * Optional custom footer renderer (e.g., call-to-book panel).
   */
  renderFooter?: () => React.ReactNode;
}

const DEFAULT_FORM_STATE: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  message: '',
};

export default function BookingForm({
  onComplete,
  showInlineSuccess = false,
  submitLabel,
  className = '',
  renderFooter,
}: BookingFormProps) {
  const { data: content } = useContent();
  const formLabels = content?.forms?.labels || {};
  const formMessages = content?.forms?.messages || {};
  const uiLabels = content?.global?.ui?.labels || {};
  const buttons = content?.global?.ui?.buttons || {};

  const [formData, setFormData] = useState<BookingFormData>({ ...DEFAULT_FORM_STATE });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const contact = useMemo(() => getContactInfo(), []);

  const successMessage =
    formMessages?.success || 'Thank you! We will call you within 1 hour to confirm your booking.';
  const submitText = submitLabel || buttons?.submit || 'Request Booking';

  const timeOptions = useMemo(
    () => [
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
    ],
    [],
  );

  const guestOptions = useMemo(() => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setHasSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...DEFAULT_FORM_STATE });
  };

  const showSuccess = () => {
    setHasSubmitted(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...formData };

    if (onComplete) {
      onComplete(payload, { reset: resetForm, showSuccess });
    } else {
      resetForm();
      if (showInlineSuccess) {
        showSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {showInlineSuccess && hasSubmitted && (
        <div
          className="rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm text-brand-800"
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-brand-700">
            {formLabels?.name || 'Full Name'} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            inputMode="text"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
            placeholder={formLabels?.name || 'Your name'}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-brand-700">
            {formLabels?.phone || 'Phone Number'} *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
            placeholder={contact.phone.display}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-brand-700">
          {formLabels?.email || 'Email Address'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
          placeholder={formLabels?.email || 'cornerhouse@lapeninns.com'}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-brand-700">
            {formLabels?.date || 'Date'} *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
          />
        </div>

        <div>
          <label htmlFor="time" className="mb-1 block text-sm font-medium text-brand-700">
            {formLabels?.time || 'Time'} *
          </label>
          <select
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
          >
            <option value="">{uiLabels?.selectTime || 'Select time'}</option>
            {timeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="guests" className="mb-1 block text-sm font-medium text-brand-700">
            {formLabels?.partySize || 'Guests'} *
          </label>
          <select
            id="guests"
            name="guests"
            required
            value={formData.guests}
            onChange={handleChange}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
          >
            {guestOptions.map((size) => (
              <option key={size} value={size}>
                {size}{' '}
                {size === '1'
                  ? uiLabels?.guest || 'guest'
                  : uiLabels?.guests || 'guests'}
              </option>
            ))}
            <option value="10+">{uiLabels?.guestsPlus || '10+ guests'}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-brand-700">
          {formLabels?.specialRequests || 'Special Requests'}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 transition-colors focus:border-transparent focus:ring-2 focus:ring-accent/50"
          placeholder={
            uiLabels?.specialRequestsPlaceholder ||
            'Let us know about allergies, accessibility needs, or celebrations.'
          }
        />
      </div>

      <div className="space-y-2">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          {submitText}
        </Button>
        <p className="text-center text-xs text-neutral-500">
          * {uiLabels?.requiredFields || 'Required fields'}.{' '}
          {uiLabels?.confirmationMessage || "We'll call you within 1 hour to confirm availability."}
        </p>
      </div>

      {renderFooter?.()}
    </form>
  );
}
