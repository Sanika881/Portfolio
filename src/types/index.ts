export type WindowId = 
  | 'projects' 
  | 'experience' 
  | 'education' 
  | 'interests' 
  | 'techstack' 
  | 'about' 
  | 'contact'
  | 'projectDetail'
  | 'admin';

export interface WindowState {
  id: WindowId;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

export interface TechItem {
  id?: string;
  name: string;
  category: 'development' | 'backend' | 'design' | 'tools';
  descriptor: string;
  iconName: string;
  link?: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI/ML' | 'Web Apps' | 'Data Analytics' | 'Design';
  description: string;
  fullDescription: string;
  technologies: string[];
  status: 'Completed' | 'In Progress' | 'Active';
  statusColor: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  metrics?: string;
  date: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
  coursework: string[];
}

export interface InterestItem {
  title: string;
  description: string;
  tag: string;
  iconName: string;
  accentColor: string;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}
