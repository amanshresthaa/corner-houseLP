"use client";
import React from "react";

type Props = {
  telHref: string;
  displayNumber: string;
  email: string;
  bookingUrl?: string;
};

export default function BookByPhoneCard({ telHref, displayNumber, email, bookingUrl }: Props) {
  return (
    <div className="card h-full border border-neutral-100 bg-white shadow-xl shadow-brand-900/10">
      <div className="card-body h-full flex flex-col space-y-6">
        <div>
          <h2 className="h3 text-brand-800 font-semibold">Book online or by phone</h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Reserve instantly online or call us and we’ll confirm your booking straight away during opening hours.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {bookingUrl && (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-4 py-3 text-base font-semibold text-neutral-900 transition-colors hover:bg-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Book online via Nabatable (opens in new tab)"
              style={{ touchAction: 'manipulation' }}
            >
              🗓️ Book online
              <span aria-hidden className="text-xs">↗</span>
            </a>
          )}

          <a
            href={telHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label={`Call ${displayNumber} to book a table`}
            style={{ touchAction: 'manipulation' }}
          >
            📞 Call {displayNumber}
          </a>
        </div>

        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600 mt-auto">
          <p>
            Need to amend or cancel? Email{' '}
            <a href={`mailto:${email}`} className="font-semibold text-brand-700 underline-offset-2 hover:underline">
              {email}
            </a>{' '}or call{' '}
            <a href={telHref} className="font-semibold text-brand-700 underline-offset-2 hover:underline">
              {displayNumber}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
