import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ExperienceWindow: React.FC = () => {
  const { experiences } = usePortfolio();

  return (
    <div className="space-y-6">
      <div className="pb-1 border-b border-black/5">
        <p className="text-xs text-neutral-500">
          Industry internships, research, and freelance design work
        </p>
      </div>

      <div className="relative pl-6 space-y-7 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline dot */}
            <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-emerald-400 group-hover:border-emerald-600 transition-colors shadow-xs" />

            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="text-[13.5px] font-semibold text-neutral-900 tracking-tight">
                  {exp.role}
                </h3>
                <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                  {exp.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">{exp.company}</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-500">{exp.location}</span>
              </div>

              <p className="text-[12px] text-neutral-600 leading-relaxed pt-1">
                {exp.description}
              </p>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-1 pt-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
