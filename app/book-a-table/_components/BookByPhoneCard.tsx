"use client";
import React from "react";

type Props = {
  telHref: string;
  displayNumber: string;
  email: string;
};

export default function BookByPhoneCard({ telHref, displayNumber, email }: Props) {
  return (
    <div className="card h-full border border-neutral-100 bg-white shadow-xl shadow-brand-900/10">
      <div className="card-body h-full flex flex-col space-y-6">
        <div>
          <h2 className="text-2xl font-display font-semibold text-brand-800">Book by Phone</h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            We’re currently taking reservations by phone. Call us and we’ll confirm your booking straight away during opening hours.
          </p>
        </div>

        <a
          href={telHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label={`Call ${displayNumber} to book a table`}
          style={{ touchAction: 'manipulation' }}
        >
          📞 Call {displayNumber}
        </a>

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
