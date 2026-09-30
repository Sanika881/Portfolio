import React from 'react';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { WindowId } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';

interface AboutWindowProps {
  onOpenWindow: (id: WindowId) => void;
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ onOpenWindow }) => {
  const { personalInfo } = usePortfolio();

  return (
    <div className="space-y-6">
      {/* Top Profile Card */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-neutral-100/70 border border-black/5">
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-white shadow-sm bg-neutral-200">
          <img
            src={personalInfo.avatarUrl || '/src/assets/images/sanika_portrait_1790777718236.jpg'}
            alt={personalInfo.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
              {personalInfo.name}
            </h2>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Active student builder" />
          </div>
          <p className="text-xs font-medium text-neutral-600">
            {personalInfo.title}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] text-neutral-500 pt-0.5">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </div>

      {/* Bio text */}
      <div className="space-y-3 text-[13px] text-neutral-700 leading-relaxed font-normal whitespace-pre-line">
        <p>{personalInfo.detailedBio}</p>
      </div>

      {/* Quick links buttons */}
      <div className="pt-3 border-t border-black/5 flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => onOpenWindow('techstack')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 text-xs font-medium text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          <span>View Tech Stack</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
        </button>

        <button
          onClick={() => onOpenWindow('experience')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 text-xs font-medium text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          <span>View Experience</span>
          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
        </button>

        <button
          onClick={() => onOpenWindow('contact')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition-colors cursor-pointer ml-auto"
        >
          <Mail className="w-3 h-3" />
          <span>Say Hello</span>
        </button>
      </div>
    </div>
  );
};
