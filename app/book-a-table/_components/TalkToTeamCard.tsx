"use client";
import React from "react";

type Props = {
  telHref: string;
  displayNumber: string;
};

export default function TalkToTeamCard({ telHref, displayNumber }: Props) {
  return (
    <div className="card border border-neutral-100 bg-white shadow-lg h-full">
      <div className="card-body space-y-2">
        <h3 className="h5 text-brand-800 font-semibold">Talk to the Team</h3>
        <p className="text-sm text-neutral-600">Have questions before booking? Give us a quick call.</p>
        <a
          href={telHref}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          📞 {displayNumber}
        </a>
      </div>
    </div>
  );
}
