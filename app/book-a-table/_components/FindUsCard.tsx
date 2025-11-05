"use client";
import React from "react";
import Link from "@/lib/debugLink";
import InteractiveMap from "@/components/restaurant/InteractiveMap";

type Props = {
  addressLine: string;
  mapHref: string;
};

export default function FindUsCard({ addressLine, mapHref }: Props) {
  return (
    <div className="card border border-neutral-100 bg-white shadow-lg h-full">
      <div className="card-body space-y-2">
        <h3 className="h5 text-brand-800 font-semibold">Find Us</h3>
        <p className="text-sm text-neutral-600">{addressLine}</p>
        <div className="mt-2">
          <InteractiveMap
            className="h-56 rounded-lg overflow-hidden border border-neutral-200"
            height="100%"
            title="Map to The White Horse Waterbeach"
            directionLabel="Get Directions"
            hintLabel="Click for directions"
          />
        </div>
        <Link
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          View directions on Google Maps ↗
        </Link>
      </div>
    </div>
  );
}
