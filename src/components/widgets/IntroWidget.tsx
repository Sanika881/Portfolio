import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface IntroWidgetProps {
  onOpenProjects: () => void;
  onOpenAbout: () => void;
}

export const IntroWidget: React.FC<IntroWidgetProps> = ({ onOpenProjects, onOpenAbout }) => {
  const { personalInfo } = usePortfolio();

  return (
    <div className="relative desktop-glass rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-sm transition-all duration-200 hover:shadow-md select-none group">
      {/* Subtle hand-drawn sparkle graphic */}
      <div className="absolute top-5 right-5 text-neutral-300 pointer-events-none group-hover:text-neutral-400 transition-colors">
        <Sparkles className="w-5 h-5 stroke-[1.5]" />
      </div>

      <div className="space-y-1">
        <span className="text-xs sm:text-sm font-medium text-neutral-500 tracking-tight">
          Hi, I'm
        </span>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 leading-tight">
          {personalInfo.shortName || personalInfo.name.split(' ')[0]}
        </h1>
        <p className="text-[12px] sm:text-[13px] font-medium text-neutral-600 tracking-tight pt-1">
          {personalInfo.tagline}
        </p>
      </div>

      <div className="my-4 pt-1">
        <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed max-w-xs font-normal whitespace-pre-line">
          {personalInfo.shortBio}
        </p>
      </div>

      <div className="pt-2 flex items-center gap-3">
        <button
          onClick={onOpenProjects}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-medium tracking-tight shadow-xs hover:bg-neutral-800 hover:translate-x-0.5 transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          <span>View my work</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onOpenAbout}
          className="px-3.5 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-950 rounded-xl hover:bg-black/5 transition-colors cursor-pointer"
        >
          About me
        </button>
      </div>
    </div>
  );
};
