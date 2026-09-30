import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const PersonalCardWidget: React.FC = () => {
  const { personalInfo } = usePortfolio();

  return (
    <div className="desktop-glass rounded-2xl p-2.5 flex items-center gap-3 w-64 sm:w-72 shadow-sm transition-all duration-200 hover:shadow-md select-none group">
      {/* Photograph container */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 border border-white/60 shadow-xs relative bg-neutral-100">
        <img
          src={personalInfo.photoCardUrl || '/src/assets/images/personal_landscape_1790777706186.jpg'}
          alt="Peaceful coastal landscape with natural sunlight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Gentle personal note */}
      <div className="flex flex-col justify-center pr-1">
        <p className="text-[13px] font-normal text-neutral-700 leading-snug tracking-tight">
          “{personalInfo.quote || 'Better things ahead.'}”
        </p>
        <span className="text-[10px] text-neutral-400 mt-1 font-mono">
          {personalInfo.location ? personalInfo.location.split(',')[0] : 'Mumbai'} · 2026
        </span>
      </div>
    </div>
  );
};
