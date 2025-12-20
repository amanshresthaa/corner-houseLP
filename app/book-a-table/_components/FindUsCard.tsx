"use client";
import React from "react";
import Link from "@/lib/debugLink";
import InteractiveMap from "@/components/restaurant/InteractiveMap";
import { BRAND } from '@/src/lib/constants/brand';
import SmartMapLink from "@/components/restaurant/SmartMapLink";

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
            title={`Map to ${BRAND.fullName}`}
            directionLabel="Get Directions"
            hintLabel="Click for directions"
          />
        </div>
        <SmartMapLink
          variant="ghost"
          className="!p-0 !h-auto text-brand-700 underline underline-offset-4 hover:text-brand-800"
        >
          View directions
        </SmartMapLink>
      </div>
    </div>
  );
}
