import React, { useState } from 'react';
import { WindowId } from '../types';
import { 
  FinderIcon, 
  SystemSettingsIcon, 
  SafariIcon, 
  NotesIcon, 
  TerminalIcon, 
  MailIcon, 
  PhotosIcon, 
  ProjectsMacIcon, 
  GithubMacIcon, 
  LinkedinMacIcon 
} from './MacIcons';
import { usePortfolio } from '../context/PortfolioContext';

interface DockItem {
  id: WindowId | 'github' | 'linkedin';
  label: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  url?: string;
}

interface DockProps {
  onOpenWindow: (id: WindowId) => void;
  openWindows: WindowId[];
}

export const Dock: React.FC<DockProps> = ({ onOpenWindow, openWindows }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isAdmin } = usePortfolio();

  const dockItems: DockItem[] = [
    {
      id: 'about',
      label: 'Finder (About Me)',
      icon: <FinderIcon size={44} />,
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: <ProjectsMacIcon size={44} />,
    },
    {
      id: 'techstack',
      label: 'Tech Stack (Terminal)',
      icon: <TerminalIcon size={44} />,
    },
    {
      id: 'experience',
      label: 'Experience (Notes)',
      icon: <NotesIcon size={44} />,
    },
    {
      id: 'education',
      label: 'Education (Safari)',
      icon: <SafariIcon size={44} />,
    },
    {
      id: 'interests',
      label: 'Interests (Photos)',
      icon: <PhotosIcon size={44} />,
    },
    {
      id: 'contact',
      label: 'Contact (Mail)',
      icon: <MailIcon size={44} />,
    },
    {
      id: 'admin',
      label: 'System Settings',
      icon: <SystemSettingsIcon size={44} />,
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: <GithubMacIcon size={44} />,
      isExternal: true,
      url: 'https://github.com',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: <LinkedinMacIcon size={44} />,
      isExternal: true,
      url: 'https://linkedin.com',
    },
  ];

  const handleClick = (item: DockItem) => {
    if (item.isExternal && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      onOpenWindow(item.id as WindowId);
    }
  };

  return (
    <nav aria-label="Desktop application dock" className="fixed bottom-2.5 inset-x-0 flex justify-center z-40 px-2 pointer-events-none">
      <div className="pointer-events-auto flex items-end gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl bg-white/55 backdrop-blur-2xl border border-white/60 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
        {dockItems.map((item) => {
          const isOpen = !item.isExternal && openWindows.includes(item.id as WindowId);
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-neutral-900/90 text-white text-[11px] font-medium tracking-tight whitespace-nowrap shadow-md pointer-events-none backdrop-blur-xs animate-in fade-in zoom-in-95 duration-150 z-50">
                  {item.label}
                </div>
              )}

              {/* App Icon Button */}
              <button
                onClick={() => handleClick(item)}
                aria-label={`Open ${item.label}`}
                className={`relative flex items-center justify-center transition-all duration-200 ease-out focus:outline-none cursor-pointer ${
                  isHovered ? '-translate-y-2.5 scale-115' : 'hover:-translate-y-1'
                }`}
              >
                {item.icon}
              </button>

              {/* Open Window Dot Indicator */}
              <div className="h-1 flex items-center justify-center mt-1">
                {isOpen && (
                  <span className="w-1 h-1 rounded-full bg-neutral-800 shadow-xs" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
