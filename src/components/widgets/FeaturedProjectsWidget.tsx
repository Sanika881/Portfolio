import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';

interface FeaturedProjectsWidgetProps {
  projects: Project[];
  onOpenProjects: () => void;
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjectsWidget: React.FC<FeaturedProjectsWidgetProps> = ({
  projects,
  onOpenProjects,
  onSelectProject,
}) => {
  // Show 3 featured projects
  const featured = projects.slice(0, 3);

  return (
    <div className="desktop-glass rounded-2xl p-4 sm:p-5 w-72 sm:w-80 shadow-sm transition-all duration-200 hover:shadow-md select-none group">
      <button
        onClick={onOpenProjects}
        className="w-full flex items-center justify-between text-neutral-800 hover:text-neutral-950 mb-3 group/header focus:outline-none cursor-pointer"
      >
        <span className="text-[13px] font-semibold tracking-tight">
          Featured Projects
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover/header:text-neutral-900 group-hover/header:translate-x-0.5 group-hover/header:-translate-y-0.5 transition-all" />
      </button>

      <div className="space-y-2">
        {featured.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="flex items-center justify-between p-2 rounded-xl bg-white/40 hover:bg-white/80 border border-transparent hover:border-white/70 transition-all cursor-pointer group/item"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span
                className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                style={{ backgroundColor: project.statusColor }}
              />
              <div className="truncate">
                <p className="text-[12px] font-medium text-neutral-800 truncate group-hover/item:text-neutral-950">
                  {project.title}
                </p>
                <p className="text-[10px] text-neutral-500 truncate">
                  {project.category} · {project.technologies.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono shrink-0 pl-2">
              {project.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
