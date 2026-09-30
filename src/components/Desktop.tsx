import React, { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { DesktopFolder } from './DesktopFolder';
import { Dock } from './Dock';
import { WeatherWidget } from './widgets/WeatherWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { TodayWidget } from './widgets/TodayWidget';
import { IntroWidget } from './widgets/IntroWidget';
import { FeaturedProjectsWidget } from './widgets/FeaturedProjectsWidget';
import { PersonalCardWidget } from './widgets/PersonalCardWidget';
import { DraggableWidget } from './widgets/DraggableWidget';

import { WindowWrapper } from './windows/WindowWrapper';
import { TechStackWindow } from './windows/TechStackWindow';
import { ProjectsWindow } from './windows/ProjectsWindow';
import { ProjectDetailModal } from './windows/ProjectDetailModal';
import { ExperienceWindow } from './windows/ExperienceWindow';
import { EducationWindow } from './windows/EducationWindow';
import { InterestsWindow } from './windows/InterestsWindow';
import { AboutWindow } from './windows/AboutWindow';
import { ContactWindow } from './windows/ContactWindow';
import { AdminWindow } from './windows/AdminWindow';

import { DESKTOP_FOLDERS } from '../data/portfolioData';
import { WindowId, WindowState, Project } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { Move, Check, RotateCcw } from 'lucide-react';

export const Desktop: React.FC = () => {
  const { 
    projects, 
    isAdmin, 
    widgetMoveMode, 
    setWidgetMoveMode, 
    resetWidgetPositions,
    wallpaperUrl,
  } = usePortfolio();

  // Desktop context menu for quick Wallpaper changing
  const [desktopContextMenu, setDesktopContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Stacking z-index tracker
  const [topZ, setTopZ] = useState(10);
  const [selectedFolderId, setSelectedFolderId] = useState<WindowId | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Window states
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    techstack: {
      id: 'techstack',
      title: 'Tech Stack',
      subtitle: 'tools I use to build, design & experiment',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 30, y: 20 },
    },
    projects: {
      id: 'projects',
      title: 'Projects',
      subtitle: 'applied machine learning, full-stack tools & interfaces',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: -20, y: 15 },
    },
    projectDetail: {
      id: 'projectDetail',
      title: 'Project Details',
      subtitle: '',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 2,
      position: { x: 0, y: 10 },
    },
    experience: {
      id: 'experience',
      title: 'Experience',
      subtitle: 'roles, internships & engineering contributions',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 20, y: 30 },
    },
    education: {
      id: 'education',
      title: 'Education',
      subtitle: 'degree, honors & coursework',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: -30, y: 25 },
    },
    interests: {
      id: 'interests',
      title: 'Interests',
      subtitle: 'curiosities, design thinking & creative pursuits',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 10, y: 35 },
    },
    about: {
      id: 'about',
      title: 'About Me',
      subtitle: 'student builder & designer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: -10, y: 20 },
    },
    contact: {
      id: 'contact',
      title: "Let's connect",
      subtitle: 'open for roles & collaborations',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      position: { x: 40, y: 30 },
    },
    admin: {
      id: 'admin',
      title: 'System Settings',
      subtitle: 'Portfolio Admin & Layout Controls',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: 0, y: 15 },
    },
  });

  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);

  // Track closing animation state for vacuum / suck effect
  const [closingWindows, setClosingWindows] = useState<Record<WindowId, boolean>>({
    techstack: false,
    projects: false,
    projectDetail: false,
    experience: false,
    education: false,
    interests: false,
    about: false,
    contact: false,
    admin: false,
  });

  const bringToFront = (id: WindowId) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => ({
        ...w,
        [id]: { ...w[id], zIndex: nextZ },
      }));
      return nextZ;
    });
    setActiveWindowId(id);
  };

  const openWindow = (id: WindowId) => {
    setTopZ((prev) => {
      const nextZ = prev + 1;
      setWindows((w) => ({
        ...w,
        [id]: {
          ...w[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      }));
      return nextZ;
    });
    setActiveWindowId(id);
    setSelectedFolderId(null);
  };

  const closeWindow = (id: WindowId) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isOpen: false },
    }));
    setClosingWindows((prev) => ({ ...prev, [id]: false }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMinimized: true },
    }));
    setClosingWindows((prev) => ({ ...prev, [id]: false }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const handleEscapeClose = (id: WindowId) => {
    setClosingWindows((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      closeWindow(id);
    }, 320);
  };

  const toggleMaximize = (id: WindowId) => {
    setWindows((w) => ({
      ...w,
      [id]: { ...w[id], isMaximized: !w[id].isMaximized },
    }));
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    openWindow('projectDetail');
  };

  // Keyboard shortcut support: Esc closes active window with vacuum effect, ⌘, opens System Settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeWindowId) {
          handleEscapeClose(activeWindowId);
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        openWindow('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId]);

  const openWindowIds = (Object.keys(windows) as WindowId[]).filter(
    (id) => windows[id].isOpen && !windows[id].isMinimized
  );

  return (
    <div
      onClick={() => {
        setSelectedFolderId(null);
        setDesktopContextMenu(null);
      }}
      onContextMenu={(e) => {
        // Trigger desktop context menu if clicking desktop background
        if ((e.target as HTMLElement).closest('button, a, input, textarea, .mac-window-opening, .mac-vacuum-closing')) return;
        e.preventDefault();
        setDesktopContextMenu({ x: e.clientX, y: e.clientY });
      }}
      className="relative w-screen h-screen overflow-hidden select-none bg-neutral-900"
    >
      {/* 
        Full Viewport Real Photographic Wallpaper:
        Defaults to requested Pexels beach & mountains photo; customizable in System Settings
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${wallpaperUrl}')`,
        }}
      />

      {/* Subtle translucent atmospheric scrim for maximum readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none" />

      {/* macOS Desktop Context Menu */}
      {desktopContextMenu && (
        <div
          style={{ top: desktopContextMenu.y, left: desktopContextMenu.x }}
          className="fixed z-50 w-52 bg-white/95 backdrop-blur-xl border border-neutral-200/80 shadow-2xl rounded-xl py-1 text-xs text-neutral-800 animate-in fade-in zoom-in-95 duration-100 select-none"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              openWindow('admin');
              setDesktopContextMenu(null);
            }}
            className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Change Wallpaper...</span>
            <span className="text-[10px] opacity-60">Settings</span>
          </button>
          <div className="my-1 border-t border-neutral-200/60" />
          <button
            onClick={() => {
              resetWidgetPositions();
              setDesktopContextMenu(null);
            }}
            className="w-full text-left px-3.5 py-1.5 hover:bg-neutral-100 text-neutral-600 flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>Reset Desktop Layout</span>
          </button>
        </div>
      )}

      {/* Top macOS-style system menu bar */}
      <TopBar onOpenWindow={openWindow} activeWindowId={activeWindowId} />

      {/* Admin Floating Banner when Widget Move Mode is Active */}
      {isAdmin && widgetMoveMode && (
        <div className="fixed top-9 inset-x-0 mx-auto w-fit z-35 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 text-white shadow-xl backdrop-blur-md border border-white/20 text-xs">
          <Move className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
          <span className="font-medium">Widget Move Mode Active: Drag any card to reposition</span>
          <button
            onClick={() => setWidgetMoveMode(false)}
            className="ml-2 px-2.5 py-0.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3 h-3" />
            <span>Done</span>
          </button>
          <button
            onClick={resetWidgetPositions}
            className="p-1 text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
            title="Reset positions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* DESKTOP WORKSPACE (1440px desktop baseline with fluid scaling) */}
      {/* ============================================================ */}
      <main className="relative w-full h-full pt-10 pb-20 px-4 sm:px-8 overflow-y-auto lg:overflow-hidden flex flex-col justify-between">
        
        {/* Top & Middle desktop area */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* LEFT COLUMN: Widgets & Intro (Col 1 to 7) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Top row: Weather & Date widgets */}
            <div className="flex items-center gap-3.5 flex-wrap">
              <DraggableWidget id="weather">
                <WeatherWidget />
              </DraggableWidget>

              <DraggableWidget id="calendar">
                <CalendarWidget />
              </DraggableWidget>
            </div>

            {/* Middle row: Today Widget & Intro Widget */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Today Tasks */}
              <DraggableWidget id="today">
                <TodayWidget />
              </DraggableWidget>

              {/* Central Personal Intro Card */}
              <DraggableWidget id="intro">
                <IntroWidget
                  onOpenProjects={() => openWindow('projects')}
                  onOpenAbout={() => openWindow('about')}
                />
              </DraggableWidget>
            </div>

            {/* Lower row: Personal Photo Card & Featured Projects */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mt-1">
              <DraggableWidget id="photo">
                <PersonalCardWidget />
              </DraggableWidget>

              <DraggableWidget id="featuredProjects">
                <FeaturedProjectsWidget
                  projects={projects}
                  onOpenProjects={() => openWindow('projects')}
                  onSelectProject={handleSelectProject}
                />
              </DraggableWidget>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Folders (Col 8 to 12) */}
          <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-end justify-start sm:justify-end gap-3 sm:gap-4 flex-wrap mt-3 lg:mt-0">
            <DraggableWidget id="folders" className="flex lg:flex-col items-center lg:items-end gap-3 sm:gap-4 flex-wrap">
              {DESKTOP_FOLDERS.map((folder) => (
                <DesktopFolder
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  color={folder.color}
                  badge={folder.badge}
                  isSelected={selectedFolderId === folder.id}
                  onSelect={(id) => setSelectedFolderId(id)}
                  onOpen={openWindow}
                />
              ))}

              {/* Subtle human touch: delicate hand-drawn SVG arrow */}
              <div className="hidden lg:flex items-center gap-2 pr-4 pt-3 text-neutral-600/70 select-none pointer-events-none">
                <svg className="w-6 h-6 text-neutral-500/60" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M 10 35 C 20 20, 30 15, 42 12" strokeLinecap="round" />
                  <path d="M 36 8 L 43 12 L 39 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[11px] font-normal text-neutral-600/80 italic">
                  double-click to explore
                </span>
              </div>
            </DraggableWidget>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* FLOATING DESKTOP WINDOWS (Window system)                      */}
      {/* ============================================================ */}

      {/* 1. TECH STACK WINDOW */}
      <WindowWrapper
        id="techstack"
        title="Tech Stack"
        subtitle="tools I use to build, design & experiment"
        isOpen={windows.techstack.isOpen}
        isMinimized={windows.techstack.isMinimized}
        isMaximized={windows.techstack.isMaximized}
        isClosing={closingWindows.techstack}
        zIndex={windows.techstack.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-2xl"
      >
        <TechStackWindow />
      </WindowWrapper>

      {/* 2. PROJECTS WINDOW */}
      <WindowWrapper
        id="projects"
        title="Projects"
        subtitle="applied machine learning, full-stack tools & interfaces"
        isOpen={windows.projects.isOpen}
        isMinimized={windows.projects.isMinimized}
        isMaximized={windows.projects.isMaximized}
        isClosing={closingWindows.projects}
        zIndex={windows.projects.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-3xl"
      >
        <ProjectsWindow onSelectProject={handleSelectProject} />
      </WindowWrapper>

      {/* 3. PROJECT DETAIL MODAL / WINDOW */}
      <WindowWrapper
        id="projectDetail"
        title={selectedProject ? selectedProject.title : 'Project Details'}
        subtitle={selectedProject ? selectedProject.category : ''}
        isOpen={windows.projectDetail.isOpen}
        isMinimized={windows.projectDetail.isMinimized}
        isMaximized={windows.projectDetail.isMaximized}
        isClosing={closingWindows.projectDetail}
        zIndex={windows.projectDetail.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-xl"
      >
        <ProjectDetailModal
          project={selectedProject}
          onBack={() => closeWindow('projectDetail')}
        />
      </WindowWrapper>

      {/* 4. EXPERIENCE WINDOW */}
      <WindowWrapper
        id="experience"
        title="Experience"
        subtitle="roles, internships & engineering contributions"
        isOpen={windows.experience.isOpen}
        isMinimized={windows.experience.isMinimized}
        isMaximized={windows.experience.isMaximized}
        isClosing={closingWindows.experience}
        zIndex={windows.experience.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-2xl"
      >
        <ExperienceWindow />
      </WindowWrapper>

      {/* 5. EDUCATION WINDOW */}
      <WindowWrapper
        id="education"
        title="Education"
        subtitle="degree, honors & coursework"
        isOpen={windows.education.isOpen}
        isMinimized={windows.education.isMinimized}
        isMaximized={windows.education.isMaximized}
        isClosing={closingWindows.education}
        zIndex={windows.education.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-xl"
      >
        <EducationWindow />
      </WindowWrapper>

      {/* 6. INTERESTS WINDOW */}
      <WindowWrapper
        id="interests"
        title="Interests"
        subtitle="curiosities, design thinking & creative pursuits"
        isOpen={windows.interests.isOpen}
        isMinimized={windows.interests.isMinimized}
        isMaximized={windows.interests.isMaximized}
        isClosing={closingWindows.interests}
        zIndex={windows.interests.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-2xl"
      >
        <InterestsWindow />
      </WindowWrapper>

      {/* 7. ABOUT ME WINDOW */}
      <WindowWrapper
        id="about"
        title="About Me"
        subtitle="student builder & designer"
        isOpen={windows.about.isOpen}
        isMinimized={windows.about.isMinimized}
        isMaximized={windows.about.isMaximized}
        isClosing={closingWindows.about}
        zIndex={windows.about.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-xl"
      >
        <AboutWindow onOpenWindow={openWindow} />
      </WindowWrapper>

      {/* 8. CONTACT WINDOW */}
      <WindowWrapper
        id="contact"
        title="Let's connect"
        subtitle="open for roles & collaborations"
        isOpen={windows.contact.isOpen}
        isMinimized={windows.contact.isMinimized}
        isMaximized={windows.contact.isMaximized}
        isClosing={closingWindows.contact}
        zIndex={windows.contact.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-md"
      >
        <ContactWindow />
      </WindowWrapper>

      {/* 9. ADMIN PANEL (SYSTEM SETTINGS) */}
      <WindowWrapper
        id="admin"
        title="System Settings"
        subtitle="Portfolio Admin &amp; Widget Customization"
        isOpen={windows.admin.isOpen}
        isMinimized={windows.admin.isMinimized}
        isMaximized={windows.admin.isMaximized}
        isClosing={closingWindows.admin}
        zIndex={windows.admin.zIndex}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={toggleMaximize}
        onFocus={bringToFront}
        defaultWidth="max-w-3xl"
        defaultHeight="max-h-[85vh]"
      >
        <AdminWindow />
      </WindowWrapper>

      {/* ============================================================ */}
      {/* BOTTOM MACOS APPLICATION DOCK                                */}
      {/* ============================================================ */}
      <Dock onOpenWindow={openWindow} openWindows={openWindowIds} />
    </div>
  );
};
