'use client';

import React, { useState, useEffect } from 'react';
import { useOpeningHours } from '@/hooks/data/useOpeningHours';
import { getContactInfo } from '@/lib/restaurantData';

const STATIC_CONTACT = getContactInfo();

// Utility function to get current day hours
const getCurrentDayHours = (hoursData: Array<{ day: string; hours: string; isToday: boolean }>) => {
  const today = hoursData.find(day => day.isToday);
  return today?.hours || 'Closed';
};

// Utility function to get current day open status
const getCurrentDayOpenStatus = (hoursData: Array<{ day: string; hours: string; isToday: boolean; isOpen?: boolean }>) => {
  const today = hoursData.find(day => day.isToday);
  return today?.isOpen || false;
};

// Reusable Hours Section Component
interface HoursSectionProps {
  title: string;
  hoursData: Array<{ day: string; hours: string; isToday: boolean; isOpen?: boolean }>;
  isOpen: boolean;
  darkMode: boolean;
}

const HoursSection: React.FC<HoursSectionProps> = ({ title, hoursData, isOpen, darkMode }) => {
  const [showAllDays, setShowAllDays] = useState(true);
  const todayHours = getCurrentDayHours(hoursData);
  const headingClass = darkMode ? 'text-white' : 'text-brand-700';
  const statusTextClass = isOpen
    ? darkMode ? 'text-green-300' : 'text-green-600'
    : darkMode ? 'text-red-300' : 'text-red-600';
  const todayParagraphClass = darkMode ? 'text-neutral-100' : 'text-foreground';
  const todayStrongClass = darkMode ? 'text-white' : 'text-brand-800';
  const buttonClass = darkMode
    ? 'text-accent-100 hover:text-accent-50 hover:underline text-sm transition-colors duration-200'
    : 'text-brand-600 hover:text-brand-700 hover:underline text-sm transition-colors duration-200';
  const allHoursBaseClass = darkMode ? 'text-neutral-200' : 'text-foreground';
  const allHoursTodayClass = darkMode
    ? 'font-semibold text-accent-100'
    : 'font-medium text-brand-600';

  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const orderedHours = dayOrder.map(day => 
    hoursData.find(h => h.day === day) || { day, hours: 'Closed', isToday: false }
  );

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className={`font-semibold ${headingClass}`}>{title}</h4>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm ${statusTextClass}`}>
            {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      
      <div className={`${todayParagraphClass}`}>
        <p className="mb-2">
          <strong className={todayStrongClass}>Today:</strong> {todayHours}
        </p>
        
        <button
          onClick={() => setShowAllDays(!showAllDays)}
          className={buttonClass}
        >
          {showAllDays ? 'Show less' : 'Show all hours'}
        </button>
        
        {showAllDays && (
          <div className="mt-3 space-y-1 text-sm">
            {orderedHours.map((dayHours) => (
              <div 
                key={dayHours.day} 
                className={`flex justify-between py-1 ${dayHours.isToday ? allHoursTodayClass : allHoursBaseClass}`}
              >
                <span>{dayHours.day}</span>
                <span>{dayHours.hours}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Restaurant Hours Card Component
interface RestaurantHoursCardProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const RestaurantHoursCard: React.FC<RestaurantHoursCardProps> = ({ variant = 'light', className = '' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { hours, isLoading, error } = useOpeningHours();
  const isDark = variant === 'dark';
  const containerClasses = [
    'rounded-xl',
    'shadow-lg',
    'p-6',
    'transition-colors',
    isDark ? 'bg-white/5 border border-white/15 text-neutral-100' : 'bg-neutral-50 border border-brand-100/40 text-brand-700',
    className,
  ].join(' ').trim();
  const headerClasses = `text-xl font-display font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-brand-700'}`;
  const descriptionClass = isDark ? 'text-neutral-100' : 'text-foreground';
  const linkClass = isDark
    ? 'text-accent-100 hover:text-accent-50 transition-colors duration-200'
    : 'text-brand-600 hover:text-brand-700 transition-colors duration-200';

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`${containerClasses} animate-pulse`}>
        <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !hours) {
    return (
      <div className={containerClasses}>
        <h3 className={headerClasses}>
          <span className={isDark ? 'text-accent-100' : 'text-accent'}>🕒</span>
          Restaurant & Bar Opening Time
        </h3>
        <p className={descriptionClass}>Please call us for current hours</p>
        <a
          href={STATIC_CONTACT.phone.tel}
          className={`${linkClass} hover:underline`}
          aria-label={`Call ${STATIC_CONTACT.phone.display}`}
        >
          {STATIC_CONTACT.phone.display}
        </a>
      </div>
    );
  }
  
  const barOpen = getCurrentDayOpenStatus(hours.bar);
  const kitchenOpen = getCurrentDayOpenStatus(hours.kitchen);
  
  return (
    <div className={containerClasses}>
      <h3 className={headerClasses}>
        <span className={isDark ? 'text-accent-100' : 'text-accent'}>🕒</span>
        Restaurant & Bar Opening Time
      </h3>
      
      <div className="space-y-6">
        <HoursSection 
          title="Bar Hours" 
          hoursData={hours.bar}
          isOpen={barOpen}
          darkMode={isDark}
        />
        
        <HoursSection 
          title="Kitchen Hours" 
          hoursData={hours.kitchen}
          isOpen={kitchenOpen}
          darkMode={isDark}
        />
      </div>
    </div>
  );
};

export default RestaurantHoursCard;
