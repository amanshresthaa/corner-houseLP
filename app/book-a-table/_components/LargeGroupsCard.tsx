"use client";
import React from "react";
import Link from "@/lib/debugLink";

type Props = {
  href: string;
};

export default function LargeGroupsCard({ href }: Props) {
  return (
    <div className="card border border-neutral-100 bg-white shadow-lg h-full">
      <div className="card-body space-y-3">
        <h3 className="text-lg font-semibold text-brand-800">Contact the Team</h3>
        <p className="text-sm text-neutral-600">
          Questions about a booking, accessibility, allergies, or special requests? Get in touch and we’ll help plan your visit.
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          Contact Page →
        </Link>
      </div>
    </div>
  );
}
