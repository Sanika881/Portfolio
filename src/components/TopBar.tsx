import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { WindowId } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface TopBarProps {
  onOpenWindow: (id: WindowId) => void;
  activeWindowId: WindowId | null;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenWindow, activeWindowId }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const { isAdmin, logout } = usePortfolio();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-7 z-50 bg-white/75 backdrop-blur-md border-b border-white/40 px-3.5 flex items-center justify-between text-[13px] font-medium text-neutral-800 tracking-tight select-none shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      {/* Left Menu Items */}
      <div className="flex items-center gap-4">
        {/* Apple Logo with System Menu */}
        <div className="relative">
          <button
            onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
            className="flex items-center justify-center text-neutral-800 hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
            title="Apple Menu"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 170 170"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.85-11.89-14.42-6-9.33-10.74-20.08-14.23-32.25-3.48-12.18-5.23-23.77-5.23-34.8 0-14.86 3.73-26.69 11.19-35.48 7.46-8.79 16.9-13.25 28.32-13.38 5.76 0 11.66 1.48 17.7 4.45 6.04 2.97 10.02 4.49 11.94 4.56 1.68 0 5.86-1.57 12.54-4.7 6.69-3.14 12.65-4.56 17.9-4.28 13.84.79 24.37 5.79 31.59 15.01-12.27 7.42-18.3 17.47-18.1 30.15.2 9.94 4.08 18.25 11.65 24.93 7.57 6.68 16.59 10.45 27.05 11.31-2.28 6.94-4.89 13.51-7.84 19.7zm-29.08-112.55c0-7.39 2.7-14.25 8.1-20.58 5.4-6.33 12.01-10.07 19.83-11.23.23 1.25.35 2.45.35 3.6 0 7.27-2.83 14.18-8.5 20.73-5.66 6.55-12.26 10.36-19.78 11.42z" />
            </svg>
          </button>

          {activeMenu === 'apple' && (
            <div 
              className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-neutral-200/80 py-1.5 z-50 text-neutral-800 text-xs"
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button 
                onClick={() => { onOpenWindow('about'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
              >
                <span>About This Mac</span>
                <span className="text-[10px] text-neutral-400">Bio</span>
              </button>

              <button 
                onClick={() => { onOpenWindow('admin'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between font-normal cursor-pointer"
              >
                <span>System Settings...</span>
                <span className="text-[10px] text-neutral-400 font-mono">⌘,</span>
              </button>

              <button 
                onClick={() => { onOpenWindow('admin'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between font-normal cursor-pointer"
              >
                <span>Change Wallpaper...</span>
                <span className="text-[10px] text-neutral-400">Desktop</span>
              </button>

              <div className="my-1 border-t border-neutral-100" />
              
              <button 
                onClick={() => { onOpenWindow('techstack'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
              >
                <span>Tech Stack &amp; Tools</span>
                <span className="text-[10px] text-neutral-400">⌘T</span>
              </button>
              <button 
                onClick={() => { onOpenWindow('projects'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
              >
                <span>Browse Projects</span>
                <span className="text-[10px] text-neutral-400">⌘P</span>
              </button>
              <button 
                onClick={() => { onOpenWindow('contact'); setActiveMenu(null); }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
              >
                <span>Get in Touch</span>
                <span className="text-[10px] text-neutral-400">⌘M</span>
              </button>

              {isAdmin && (
                <>
                  <div className="my-1 border-t border-neutral-100" />
                  <button 
                    onClick={() => { logout(); setActiveMenu(null); }}
                    className="w-full text-left px-3.5 py-1.5 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lock Settings</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Finder Title */}
        <span className="font-semibold text-neutral-900 cursor-default">
          {activeWindowId ? activeWindowId.charAt(0).toUpperCase() + activeWindowId.slice(1) : 'Finder'}
        </span>

        {/* Menu Items */}
        <nav className="hidden sm:flex items-center gap-3.5 text-neutral-700">
          <button 
            onClick={() => onOpenWindow('projects')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            File
          </button>
          <button 
            onClick={() => onOpenWindow('techstack')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            Edit
          </button>
          <button 
            onClick={() => onOpenWindow('interests')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            View
          </button>
          <button 
            onClick={() => onOpenWindow('experience')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            Go
          </button>
          <button 
            onClick={() => onOpenWindow('education')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            Window
          </button>
          <button 
            onClick={() => onOpenWindow('contact')}
            className="hover:text-neutral-950 transition-colors focus:outline-none cursor-pointer"
          >
            Help
          </button>
        </nav>
      </div>

      {/* Center Spacer */}
      <div className="flex-1" />

      {/* Right Status Items */}
      <div className="flex items-center gap-3 text-neutral-700">
        {/* Status indicator */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-600 bg-neutral-200/50 px-2 py-0.5 rounded-full" title="Currently open for opportunities & collaborations">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] hidden md:inline">Open to roles</span>
        </div>

        {/* Wi-Fi */}
        <div className="flex items-center text-neutral-700 hover:text-neutral-950 transition-colors cursor-default" title="Network Connected: Wi-Fi">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        {/* Battery */}
        <div className="flex items-center gap-1 text-neutral-700 cursor-default" title="Battery: 100% · Power Adapter">
          <Battery className="w-4 h-4" />
          <span className="text-[11px] hidden lg:inline font-mono">100%</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 pl-1 border-l border-neutral-300/60 cursor-default">
          <span className="hidden sm:inline text-[12px] text-neutral-600 font-normal">
            {dateStr}
          </span>
          <span className="text-[12px] font-semibold tabular-nums text-neutral-900">
            {timeStr}
          </span>
        </div>
      </div>
    </header>
  );
};
