import React from 'react';
import { ExternalLink, Github, CheckCircle, ArrowLeft } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onBack: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onBack,
}) => {
  if (!project) return null;

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors focus:outline-none cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to all projects</span>
      </button>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shadow-xs"
            style={{ backgroundColor: project.statusColor }}
          />
          <span className="text-xs font-medium text-neutral-500">
            {project.category} · {project.date}
          </span>
          {project.metrics && (
            <span className="text-[11px] text-emerald-600 font-mono font-medium ml-auto">
              {project.metrics}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight">
          {project.title}
        </h2>
        <p className="text-xs text-neutral-500">
          {project.subtitle}
        </p>
      </div>

      {/* Overview */}
      <div className="p-3.5 rounded-xl bg-neutral-50/80 border border-black/5 text-[13px] text-neutral-700 leading-relaxed">
        {project.fullDescription}
      </div>

      {/* Highlights */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-neutral-700 tracking-tight">
          Key Highlights & Implementation:
        </h4>
        <div className="space-y-1.5">
          {project.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Used */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-neutral-700 tracking-tight">
          Technologies:
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs text-neutral-700 bg-white border border-neutral-200/80 px-2.5 py-1 rounded-lg shadow-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-black/5 flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-neutral-900 text-white rounded-xl text-xs font-medium hover:bg-neutral-800 transition-colors shadow-xs"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-neutral-800 border border-neutral-200/80 rounded-xl text-xs font-medium hover:bg-neutral-50 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </div>
  );
};
