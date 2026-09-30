import React, { useState } from 'react';
import { 
  Code, 
  Palette, 
  FileCode, 
  Code2, 
  Atom, 
  Globe, 
  Server, 
  Cpu, 
  Database, 
  Flame, 
  Layers, 
  Terminal, 
  Binary, 
  TableProperties, 
  PenTool, 
  Sparkles, 
  GitBranch, 
  Github, 
  Laptop, 
  Send, 
  Cloud,
  ExternalLink
} from 'lucide-react';
import { TechItem } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';

// Map icon names to Lucide icons
const renderTechIcon = (iconName: string) => {
  const iconProps = { className: "w-3.5 h-3.5 text-neutral-600 shrink-0" };
  switch (iconName) {
    case 'Code': return <Code {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    case 'FileCode': return <FileCode {...iconProps} />;
    case 'Code2': return <Code2 {...iconProps} />;
    case 'Atom': return <Atom {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Flame': return <Flame {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'Binary': return <Binary {...iconProps} />;
    case 'TableProperties': return <TableProperties {...iconProps} />;
    case 'PenTool': return <PenTool {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'GitBranch': return <GitBranch {...iconProps} />;
    case 'Github': return <Github {...iconProps} />;
    case 'Laptop': return <Laptop {...iconProps} />;
    case 'Send': return <Send {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    default: return <Code {...iconProps} />;
  }
};

export const TechStackWindow: React.FC = () => {
  const { techStack } = usePortfolio();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const developmentItems = techStack.filter(i => i.category === 'development');
  const backendItems = techStack.filter(i => i.category === 'backend');
  const designItems = techStack.filter(i => i.category === 'design');
  const toolItems = techStack.filter(i => i.category === 'tools');

  const renderGroup = (title: string, items: TechItem[], badgeBg: string) => (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
        <h3 className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          {title}
        </h3>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono text-neutral-600 ${badgeBg}`}>
          {items.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((tech) => {
          const isHovered = activeItem === tech.name;
          return (
            <a
              key={tech.name}
              href={tech.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveItem(tech.name)}
              onMouseLeave={() => setActiveItem(null)}
              className={`group flex items-center justify-between p-2 rounded-xl border border-transparent transition-all duration-200 cursor-pointer ${
                isHovered
                  ? 'bg-white shadow-xs border-black/5 -translate-y-0.5'
                  : 'hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-neutral-100/90 flex items-center justify-center border border-black/5 group-hover:bg-neutral-200/70 transition-colors">
                  {renderTechIcon(tech.iconName)}
                </div>
                <span className="text-[12.5px] font-medium text-neutral-800 tracking-tight">
                  {tech.name}
                </span>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <span className="text-[11px] text-neutral-500 font-normal transition-colors group-hover:text-neutral-700">
                  {tech.descriptor}
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Subtitle / Header */}
      <div>
        <p className="text-xs text-neutral-500">
          tools I use to build, design &amp; experiment
        </p>
      </div>

      {/* 2-Column Grid on desktop, 1-column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Development */}
        {renderGroup('Development', developmentItems, 'bg-purple-50')}

        {/* Backend & Data */}
        {renderGroup('Backend & Data', backendItems, 'bg-emerald-50')}

        {/* Design */}
        {renderGroup('Design', designItems, 'bg-pink-50')}

        {/* Tools */}
        {renderGroup('Tools', toolItems, 'bg-amber-50')}
      </div>

      {/* Personality touch at bottom */}
      <div className="pt-4 border-t border-black/5 flex items-center justify-center text-center">
        <p className="text-[11.5px] text-neutral-400 italic font-normal tracking-tight">
          “always learning, always building.”
        </p>
      </div>
    </div>
  );
};
