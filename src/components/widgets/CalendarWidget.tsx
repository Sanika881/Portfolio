import React, { useState, useEffect } from 'react';

export const CalendarWidget: React.FC = () => {
  const [dateInfo, setDateInfo] = useState({
    dayName: 'Sun',
    dayNumber: '28',
    monthName: 'September'
  });

  useEffect(() => {
    const now = new Date();
    setDateInfo({
      dayName: now.toLocaleDateString([], { weekday: 'short' }),
      dayNumber: now.toLocaleDateString([], { day: 'numeric' }),
      monthName: now.toLocaleDateString([], { month: 'long' })
    });
  }, []);

  return (
    <div className="relative desktop-glass rounded-2xl p-4 w-40 sm:w-44 shadow-sm select-none overflow-hidden group transition-all duration-200 hover:shadow-md">
      {/* Subtle hand-drawn aesthetic line art in top-right corner */}
      <svg
        className="absolute top-2 right-2 w-9 h-9 text-neutral-300 pointer-events-none group-hover:text-neutral-400 transition-colors"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50 Z" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <path d="M 85 20 L 78 28 M 80 18 L 88 26" />
      </svg>

      <div className="flex flex-col">
        <span className="text-[12px] font-medium tracking-wide text-rose-500/90 uppercase">
          {dateInfo.dayName}
        </span>
        <span className="text-4xl sm:text-5xl font-extralight tracking-tighter text-neutral-900 leading-none my-1">
          {dateInfo.dayNumber}
        </span>
        <span className="text-[11px] font-medium text-neutral-500 tracking-tight">
          {dateInfo.monthName}
        </span>
      </div>
    </div>
  );
};
