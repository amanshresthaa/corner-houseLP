import OpeningHoursDebug from '@/components/debug/OpeningHoursDebug';
import dynamic from 'next/dynamic';

const RestaurantHoursCard = dynamic(() => import('@/components/restaurant/RestaurantHoursCard'), { ssr: false });

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Opening Hours Test</h1>
        <OpeningHoursDebug />
        <div className="max-w-xl mx-auto">
          <RestaurantHoursCard variant="light" />
        </div>
      </div>
    </div>
  );
}
