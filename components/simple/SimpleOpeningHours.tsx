'use client';

import { useOpeningHours } from '@/hooks/data/useOpeningHours';

export default function SimpleOpeningHours() {
  const { hours, isLoading, error } = useOpeningHours();

  if (isLoading) return <span className="italic">Loading hours...</span>;
  if (error || !hours) return <span className="italic">Call for hours</span>;

  const kitchenToday = hours.kitchen.find((day) => day.isToday)?.hours ?? 'Closed';
  const barToday = hours.bar.find((day) => day.isToday)?.hours ?? 'Closed';

  return (
    <span className="italic">
      Kitchen: {kitchenToday} | Bar: {barToday}
    </span>
  );
}
