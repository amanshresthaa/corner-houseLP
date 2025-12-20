'use client';

import { useOpeningHours } from '@/hooks/data/useOpeningHours';
import { getContactInfo } from '@/lib/restaurantData';

const STATIC_CONTACT = getContactInfo();

export default function SimpleFooterHours() {
  const { hours, isLoading, error } = useOpeningHours();

  if (isLoading) {
    return (
      <div className="text-sm text-neutral-100">
        <p className="font-medium">Hours</p>
        <p>Loading…</p>
      </div>
    );
  }

  if (error || !hours) {
    return (
      <div className="text-sm text-neutral-100">
        <p className="font-medium">Hours</p>
        <p>Call for current hours</p>
        <p>{STATIC_CONTACT.phone.display}</p>
      </div>
    );
  }

  const kitchenToday = hours.kitchen.find((day) => day.isToday)?.hours ?? 'Closed';
  const barToday = hours.bar.find((day) => day.isToday)?.hours ?? 'Closed';
  const isOpen = hours.currentStatus?.isOpen ?? false;

  return (
    <div className="text-sm space-y-1">
      <div>
        <p className="font-medium text-white">Kitchen</p>
        <p className="text-neutral-200">{kitchenToday}</p>
      </div>
      <div className="mt-2">
        <p className="font-medium text-white">Bar</p>
        <p className="text-neutral-200">{barToday}</p>
      </div>
      {isOpen && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
            Open Now
          </span>
        </div>
      )}
    </div>
  );
}
