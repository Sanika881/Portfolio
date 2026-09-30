import React, { useState } from 'react';
import { Sun, CloudSun, MapPin } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState<'Mumbai' | 'Bengaluru'>('Mumbai');

  return (
    <div 
      onClick={() => setCity(c => c === 'Mumbai' ? 'Bengaluru' : 'Mumbai')}
      className="desktop-glass rounded-2xl p-4 w-44 sm:w-48 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer select-none group"
      title="Click to toggle between Mumbai & Bengaluru"
    >
      <div className="flex items-center justify-between text-neutral-600 mb-1.5">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          <span className="text-[12px] font-medium tracking-tight text-neutral-700">
            {city}
          </span>
        </div>
        <CloudSun className="w-4 h-4 text-amber-500/90" />
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-3xl font-light tracking-tight text-neutral-900 font-sans">
          {city === 'Mumbai' ? '28°' : '24°'}
        </span>
        <span className="text-[11px] font-medium text-neutral-500">
          Mostly Sunny
        </span>
      </div>

      <div className="mt-2 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
        <span>H: {city === 'Mumbai' ? '32°' : '29°'}</span>
        <span>L: {city === 'Mumbai' ? '24°' : '19°'}</span>
        <span className="text-[9px] text-neutral-400 opacity-60">tap to switch</span>
      </div>
    </div>
  );
};
