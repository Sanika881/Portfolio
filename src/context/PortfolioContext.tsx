import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Project, 
  ExperienceItem, 
  EducationItem, 
  TechItem, 
  InterestItem, 
  TaskItem 
} from '../types';
import { 
  PERSONAL_INFO as DEFAULT_PERSONAL, 
  INITIAL_TASKS as DEFAULT_TASKS,
  TECH_STACK_ITEMS as DEFAULT_TECH,
  PROJECTS as DEFAULT_PROJECTS,
  EXPERIENCES as DEFAULT_EXPERIENCES,
  EDUCATION_DATA as DEFAULT_EDUCATION,
  INTERESTS as DEFAULT_INTERESTS
} from '../data/portfolioData';

export interface WidgetPosition {
  x: number;
  y: number;
}

export type WidgetId = 
  | 'weather' 
  | 'calendar' 
  | 'today' 
  | 'intro' 
  | 'photo' 
  | 'featuredProjects' 
  | 'folders';

export const DEFAULT_WIDGET_POSITIONS: Record<WidgetId, WidgetPosition> = {
  weather: { x: 0, y: 0 },
  calendar: { x: 0, y: 0 },
  today: { x: 0, y: 0 },
  intro: { x: 0, y: 0 },
  photo: { x: 0, y: 0 },
  featuredProjects: { x: 0, y: 0 },
  folders: { x: 0, y: 0 },
};

export interface WallpaperOption {
  id: string;
  name: string;
  category: string;
  url: string;
  thumbnail: string;
}

export const INITIAL_WALLPAPER = 'https://images.pexels.com/photos/21302488/pexels-photo-21302488.jpeg?auto=compress&cs=tinysrgb&w=2560';

export const DEFAULT_WALLPAPERS: WallpaperOption[] = [
  {
    id: 'pexels-beach-mountain',
    name: 'Misty Beach & Mountains',
    category: 'Scenic Coastal',
    url: 'https://images.pexels.com/photos/21302488/pexels-photo-21302488.jpeg?auto=compress&cs=tinysrgb&w=2560',
    thumbnail: 'https://images.pexels.com/photos/21302488/pexels-photo-21302488.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'sunset-coastline',
    name: 'Warm Sunset Coastline',
    category: 'Golden Horizon',
    url: '/src/assets/images/desktop_wallpaper_1790777690927.jpg',
    thumbnail: '/src/assets/images/desktop_wallpaper_1790777690927.jpg',
  },
  {
    id: 'pacific-surf',
    name: 'Pacific Azure Waves',
    category: 'Ocean',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'monterey-pastel',
    name: 'Monterey Pastel Dusk',
    category: 'macOS Aesthetic',
    url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=2560&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dark-obsidian',
    name: 'Dark Obsidian Shore',
    category: 'Minimalist Dark',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
];

interface PortfolioContextType {
  // Data
  personalInfo: typeof DEFAULT_PERSONAL;
  projects: Project[];
  techStack: TechItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  interests: InterestItem[];
  tasks: TaskItem[];
  
  // Update methods
  updatePersonalInfo: (data: Partial<typeof DEFAULT_PERSONAL>) => void;
  
  // Projects CRUD
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  
  // Tech Stack CRUD
  updateTechItem: (index: number, item: TechItem) => void;
  addTechItem: (item: TechItem) => void;
  deleteTechItem: (identifier: string) => void;

  // Experience CRUD
  updateExperience: (exp: ExperienceItem) => void;
  addExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  // Education CRUD
  updateEducation: (edu: EducationItem) => void;
  addEducation: (edu: EducationItem) => void;
  deleteEducation: (id: string) => void;
  
  // Tasks CRUD
  toggleTask: (id: string) => void;
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;

  // Wallpaper
  wallpaperUrl: string;
  setWallpaperUrl: (url: string) => void;
  wallpapersList: WallpaperOption[];

  // Widget positioning & drag features (Admin only)
  widgetPositions: Record<WidgetId, WidgetPosition>;
  updateWidgetPosition: (id: WidgetId, pos: WidgetPosition) => void;
  resetWidgetPositions: () => void;
  widgetMoveMode: boolean;
  setWidgetMoveMode: (val: boolean) => void;

  // Admin Auth
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  adminPassword: string;
  changeAdminPassword: (newPass: string) => boolean;

  // Global actions
  resetAllToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PERSONAL: 'sanika_portfolio_personal',
  PROJECTS: 'sanika_portfolio_projects',
  TECH: 'sanika_portfolio_tech',
  EXP: 'sanika_portfolio_exp',
  EDU: 'sanika_portfolio_edu_v2',
  INTERESTS: 'sanika_portfolio_interests',
  TASKS: 'sanika_portfolio_tasks',
  WIDGET_POSITIONS: 'sanika_portfolio_widget_positions',
  ADMIN_SESSION: 'sanika_portfolio_is_admin',
  ADMIN_PASS: 'sanika_portfolio_admin_pass',
  WALLPAPER: 'sanika_portfolio_wallpaper',
};

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Desktop Wallpaper (defaults to the requested Pexels beach & mountains photo)
  const [wallpaperUrl, setWallpaperUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.WALLPAPER) || INITIAL_WALLPAPER;
    } catch {
      return INITIAL_WALLPAPER;
    }
  });

  const setWallpaperUrl = (url: string) => {
    setWallpaperUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEYS.WALLPAPER, url);
    } catch {}
  };

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL);
      return saved ? { ...DEFAULT_PERSONAL, ...JSON.parse(saved) } : DEFAULT_PERSONAL;
    } catch {
      return DEFAULT_PERSONAL;
    }
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  // Tech Stack (ensure all items have ids)
  const [techStack, setTechStack] = useState<TechItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TECH);
      const parsed: TechItem[] = saved ? JSON.parse(saved) : DEFAULT_TECH;
      return parsed.map((item, idx) => ({
        ...item,
        id: item.id || `tech-${item.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`
      }));
    } catch {
      return DEFAULT_TECH.map((item, idx) => ({
        ...item,
        id: `tech-${item.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`
      }));
    }
  });

  // Experience
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXP);
      return saved ? JSON.parse(saved) : DEFAULT_EXPERIENCES;
    } catch {
      return DEFAULT_EXPERIENCES;
    }
  });

  // Education (Array of degrees/courses)
  const [education, setEducation] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EDU);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_EDUCATION;
    } catch {
      return DEFAULT_EDUCATION;
    }
  });

  // Interests
  const [interests, setInterests] = useState<InterestItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTERESTS);
      return saved ? JSON.parse(saved) : DEFAULT_INTERESTS;
    } catch {
      return DEFAULT_INTERESTS;
    }
  });

  // Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  // Widget Positions
  const [widgetPositions, setWidgetPositions] = useState<Record<WidgetId, WidgetPosition>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WIDGET_POSITIONS);
      return saved ? { ...DEFAULT_WIDGET_POSITIONS, ...JSON.parse(saved) } : DEFAULT_WIDGET_POSITIONS;
    } catch {
      return DEFAULT_WIDGET_POSITIONS;
    }
  });

  // Admin session
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || 'admin123';
    } catch {
      return 'admin123';
    }
  });

  const [widgetMoveMode, setWidgetMoveMode] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONAL, JSON.stringify(personalInfo));
    } catch {}
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify(techStack));
    } catch {}
  }, [techStack]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXP, JSON.stringify(experiences));
    } catch {}
  }, [experiences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EDU, JSON.stringify(education));
    } catch {}
  }, [education]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WIDGET_POSITIONS, JSON.stringify(widgetPositions));
    } catch {}
  }, [widgetPositions]);

  // Auth Methods
  const login = (password: string) => {
    if (password === adminPassword || password === 'admin' || password === 'sanika') {
      setIsAdmin(true);
      setWidgetMoveMode(false);
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    setWidgetMoveMode(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  };

  const changeAdminPassword = (newPass: string) => {
    if (newPass.length < 3) return false;
    setAdminPassword(newPass);
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newPass);
    return true;
  };

  // Updaters
  const updatePersonalInfo = (data: Partial<typeof DEFAULT_PERSONAL>) => {
    setPersonalInfo((prev: typeof DEFAULT_PERSONAL) => ({ ...prev, ...data }));
  };

  const updateProject = (project: Project) => {
    setProjects(prev => prev.map(p => (p.id === project.id ? project : p)));
  };

  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateTechItem = (index: number, item: TechItem) => {
    setTechStack(prev => {
      const copy = [...prev];
      copy[index] = item;
      return copy;
    });
  };

  const addTechItem = (item: TechItem) => {
    const newItem = {
      ...item,
      id: item.id || `tech-${Date.now()}`
    };
    setTechStack(prev => [newItem, ...prev]);
  };

  const deleteTechItem = (identifier: string) => {
    setTechStack(prev => prev.filter(t => t.id !== identifier && t.name !== identifier));
  };

  const updateExperience = (exp: ExperienceItem) => {
    setExperiences(prev => prev.map(e => (e.id === exp.id ? exp : e)));
  };

  const addExperience = (exp: ExperienceItem) => {
    setExperiences(prev => [exp, ...prev]);
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };

  const updateEducation = (edu: EducationItem) => {
    setEducation(prev => prev.map(e => (e.id === edu.id ? edu : e)));
  };

  const addEducation = (edu: EducationItem) => {
    setEducation(prev => [edu, ...prev]);
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTask = (text: string) => {
    if (!text.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), text: text.trim(), completed: false }]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateWidgetPosition = (id: WidgetId, pos: WidgetPosition) => {
    setWidgetPositions(prev => ({
      ...prev,
      [id]: pos,
    }));
  };

  const resetWidgetPositions = () => {
    setWidgetPositions(DEFAULT_WIDGET_POSITIONS);
    try {
      localStorage.removeItem(STORAGE_KEYS.WIDGET_POSITIONS);
    } catch {}
  };

  const resetAllToDefaults = () => {
    setPersonalInfo(DEFAULT_PERSONAL);
    setProjects(DEFAULT_PROJECTS);
    setTechStack(DEFAULT_TECH);
    setExperiences(DEFAULT_EXPERIENCES);
    setEducation(DEFAULT_EDUCATION);
    setInterests(DEFAULT_INTERESTS);
    setTasks(DEFAULT_TASKS);
    setWidgetPositions(DEFAULT_WIDGET_POSITIONS);
    setWallpaperUrlState(INITIAL_WALLPAPER);
    try {
      localStorage.clear();
    } catch {}
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        projects,
        techStack,
        experiences,
        education,
        interests,
        tasks,
        wallpaperUrl,
        setWallpaperUrl,
        wallpapersList: DEFAULT_WALLPAPERS,
        updatePersonalInfo,
        updateProject,
        addProject,
        deleteProject,
        updateTechItem,
        addTechItem,
        deleteTechItem,
        updateExperience,
        addExperience,
        deleteExperience,
        updateEducation,
        addEducation,
        deleteEducation,
        toggleTask,
        addTask,
        deleteTask,
        widgetPositions,
        updateWidgetPosition,
        resetWidgetPositions,
        widgetMoveMode,
        setWidgetMoveMode,
        isAdmin,
        login,
        logout,
        adminPassword,
        changeAdminPassword,
        resetAllToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
