import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';

interface ProjectsWindowProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  onSelectProject,
}) => {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Web Apps' | 'Data Analytics'>('All');

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="space-y-5">
      {/* Interactive Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-black/5">
        <div className="flex items-center gap-1 p-1 bg-neutral-100/80 rounded-xl">
          {(['All', 'AI/ML', 'Web Apps', 'Data Analytics'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-150 cursor-pointer ${
                filter === cat
                  ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-neutral-400 font-mono">
          {filteredProjects.length} projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group flex flex-col justify-between p-4 rounded-2xl bg-white/50 hover:bg-white border border-black/5 hover:border-black/10 transition-all duration-200 cursor-pointer hover:shadow-sm hover:-translate-y-0.5"
          >
            <div>
              {/* Header with status dot & date */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: project.statusColor }}
                  />
                  <span className="text-[11px] font-medium text-neutral-500">
                    {project.category}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {project.date}
                </span>
              </div>

              {/* Title & subtitle */}
              <h3 className="text-[14px] font-semibold text-neutral-900 tracking-tight group-hover:text-neutral-950">
                {project.title}
              </h3>
              <p className="text-[11px] text-neutral-500 mb-2">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-[12px] text-neutral-600 leading-relaxed line-clamp-2 mb-3">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10.5px] text-neutral-600 bg-neutral-100/80 px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] text-neutral-400 self-center">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Action row */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-neutral-700 group-hover:text-neutral-950">
                <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  View case details <ArrowRight className="w-3 h-3" />
                </span>
                {project.metrics && (
                  <span className="text-[10.5px] text-emerald-600 font-mono font-medium">
                    {project.metrics}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
