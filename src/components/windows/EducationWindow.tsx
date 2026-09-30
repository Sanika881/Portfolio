import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GraduationCap } from 'lucide-react';

export const EducationWindow: React.FC = () => {
  const { education } = usePortfolio();

  return (
    <div className="space-y-6">
      <div className="pb-1 border-b border-black/5">
        <p className="text-xs text-neutral-500">
          Academic foundation in Computer Applications &amp; Data Science
        </p>
      </div>

      <div className="space-y-6">
        {education.map((edu, eduIdx) => (
          <div key={edu.id || eduIdx} className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    {edu.period}
                  </span>
                  <h3 className="text-base font-semibold text-neutral-900 tracking-tight pt-1">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-medium text-amber-800">
                    {edu.field}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-white/80 border border-amber-200 flex items-center justify-center shrink-0 text-amber-700">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-neutral-600">
                {edu.institution} — {edu.location}
              </p>
            </div>

            {/* Relevant Coursework */}
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
                  Selected Coursework
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {edu.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/60 border border-black/5 text-xs text-neutral-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-black/5">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-500">
                  Academic Highlights
                </h4>
                <div className="space-y-1.5">
                  {edu.highlights.map((highlight, idx) => (
                    <p key={idx} className="text-xs text-neutral-600 leading-relaxed">
                      • {highlight}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
