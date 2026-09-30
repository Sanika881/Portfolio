import React, { useState, useRef } from 'react';
import { 
  KeyRound, 
  User, 
  FolderKanban, 
  Layers, 
  Briefcase, 
  GraduationCap, 
  Move, 
  ShieldCheck, 
  LogOut, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw,
  Download,
  Upload,
  Image as ImageIcon,
  Edit2,
  X
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SystemSettingsIcon } from '../MacIcons';
import { Project, ExperienceItem, TechItem, EducationItem } from '../../types';

export const AdminWindow: React.FC = () => {
  const {
    personalInfo,
    updatePersonalInfo,
    projects,
    addProject,
    updateProject,
    deleteProject,
    techStack,
    addTechItem,
    updateTechItem,
    deleteTechItem,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    education,
    addEducation,
    updateEducation,
    deleteEducation,
    isAdmin,
    login,
    logout,
    changeAdminPassword,
    widgetMoveMode,
    setWidgetMoveMode,
    resetWidgetPositions,
    resetAllToDefaults,
    wallpaperUrl,
    setWallpaperUrl,
    wallpapersList,
  } = usePortfolio();

  // Auth State
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'wallpaper' | 'projects' | 'tech' | 'experience' | 'education' | 'layout' | 'security'>('profile');

  // Wallpaper custom URL input
  const [customWallpaperInput, setCustomWallpaperInput] = useState('');

  // Change Password State
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Editing Forms State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingTech, setEditingTech] = useState<TechItem | null>(null);
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);

  // Success Feedback Toast
  const [savedFeedback, setSavedFeedback] = useState(false);

  // File Input Refs for Profile Picture, Landscape Card & Wallpaper
  const avatarFileRef = useRef<HTMLInputElement>(null);
  const photoCardFileRef = useRef<HTMLInputElement>(null);
  const wallpaperFileRef = useRef<HTMLInputElement>(null);

  const triggerSaveNotification = () => {
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2200);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(inputPassword);
    if (!success) {
      setLoginError('Incorrect password. Please try again.');
    } else {
      setLoginError('');
      setInputPassword('');
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setPasswordSuccess('Password must be at least 4 characters');
      return;
    }
    changeAdminPassword(newPassword);
    setPasswordSuccess('Password updated successfully!');
    setNewPassword('');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  // Avatar file upload handler (converts to base64 DataURL for offline persistence)
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updatePersonalInfo({ avatarUrl: result });
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  // Photo Card file upload handler
  const handlePhotoCardFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updatePersonalInfo({ photoCardUrl: result });
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  // Wallpaper file upload handler (converts local file to base64 DataURL for offline persistence)
  const handleWallpaperFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setWallpaperUrl(result);
        triggerSaveNotification();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleExportData = () => {
    const backup = {
      personalInfo,
      projects,
      techStack,
      experiences,
      education,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sanika-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN: Clean macOS Style (NO PASSWORD HINT DISPLAYED)
  // -------------------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center max-w-sm mx-auto select-none">
        <div className="mb-4">
          <SystemSettingsIcon size={64} />
        </div>

        <h2 className="text-lg font-semibold text-neutral-900 tracking-tight">
          System Settings
        </h2>
        <p className="text-xs text-neutral-500 mb-6">
          Enter password to unlock preferences
        </p>

        <form onSubmit={handleLoginSubmit} className="w-full space-y-3">
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              autoFocus
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-neutral-800 shadow-xs"
            />
            <KeyRound className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5" />
          </div>

          {loginError && (
            <p className="text-[11px] text-rose-500 font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer mt-2"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED macOS SYSTEM SETTINGS
  // -------------------------------------------------------------
  return (
    <div className="flex flex-col md:flex-row gap-5 min-h-[500px]">
      {/* Left Sidebar */}
      <div className="w-full md:w-52 shrink-0 border-b md:border-b-0 md:border-r border-black/5 pr-0 md:pr-4 flex flex-col justify-between">
        <div className="space-y-1">
          {/* User Profile Badge */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/70 border border-black/5 mb-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0 border border-white shadow-xs">
              <img
                src={personalInfo.avatarUrl || '/src/assets/images/sanika_portrait_1790777718236.jpg'}
                alt="Admin Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {personalInfo.name}
              </p>
              <span className="text-[10px] text-emerald-600 font-medium">● Settings Unlocked</span>
            </div>
          </div>

          {/* Navigation Items */}
          <button
            onClick={() => { setActiveTab('profile'); setEditingProject(null); setEditingTech(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Photo</span>
          </button>

          <button
            onClick={() => { setActiveTab('wallpaper'); setEditingProject(null); setEditingTech(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'wallpaper' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Wallpaper</span>
          </button>

          <button
            onClick={() => { setActiveTab('projects'); setEditingTech(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'projects' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('tech'); setEditingProject(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'tech' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tech Stack ({techStack.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('experience'); setEditingProject(null); setEditingTech(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'experience' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('education'); setEditingProject(null); setEditingTech(null); setEditingExp(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'education' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education ({education.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('layout'); setEditingProject(null); setEditingTech(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'layout' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>Desktop Widgets</span>
          </button>

          <button
            onClick={() => { setActiveTab('security'); setEditingProject(null); setEditingTech(null); setEditingExp(null); setEditingEdu(null); }}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
              activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-neutral-700 hover:bg-black/5'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Password</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-black/5 space-y-1.5 mt-4">
          <button
            onClick={handleExportData}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg text-xs font-medium hover:bg-black/5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset all information and widget layout back to original defaults?')) {
                resetAllToDefaults();
                triggerSaveNotification();
              }
            }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-rose-600 hover:text-rose-700 rounded-lg text-xs font-medium hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg text-xs font-medium hover:bg-black/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Settings</span>
          </button>
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 overflow-y-auto max-h-[72vh] pr-1">
        {/* Saved Feedback Notification */}
        {savedFeedback && (
          <div className="mb-3 px-3 py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Saved automatically to your portfolio!</span>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: PROFILE & PHOTO EDITING                            */}
        {/* ========================================================= */}
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <div className="pb-2 border-b border-black/5">
              <h3 className="text-sm font-semibold text-neutral-900">Profile &amp; Appearance</h3>
              <p className="text-xs text-neutral-500">Update your portrait picture, bio, and personal details</p>
            </div>

            {/* Profile Picture Card */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-800">Profile Picture</h4>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-neutral-200 border-2 border-white shadow-md shrink-0">
                  <img
                    src={personalInfo.avatarUrl || '/src/assets/images/sanika_portrait_1790777718236.jpg'}
                    alt="Current Portrait"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1 w-full text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="file"
                      ref={avatarFileRef}
                      onChange={handleAvatarFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarFileRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updatePersonalInfo({ avatarUrl: '/src/assets/images/sanika_portrait_1790777718236.jpg' });
                        triggerSaveNotification();
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                    >
                      Reset Default Portrait
                    </button>
                  </div>

                  <div>
                    <label className="text-[10.5px] text-neutral-500 block mb-0.5">Or paste Image URL:</label>
                    <input
                      type="text"
                      placeholder="https://example.com/my-photo.jpg"
                      value={personalInfo.avatarUrl || ''}
                      onChange={(e) => {
                        updatePersonalInfo({ avatarUrl: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full text-xs px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Landscape Card Photo */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
              <h4 className="text-xs font-semibold text-neutral-800">Desktop Quote Card Photo</h4>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 shadow-xs shrink-0">
                  <img
                    src={personalInfo.photoCardUrl || '/src/assets/images/personal_landscape_1790777706186.jpg'}
                    alt="Current Landscape"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1 w-full text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="file"
                      ref={photoCardFileRef}
                      onChange={handlePhotoCardFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => photoCardFileRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-900 text-white font-medium transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Change Landscape Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updatePersonalInfo({ photoCardUrl: '/src/assets/images/personal_landscape_1790777706186.jpg' });
                        triggerSaveNotification();
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                    >
                      Reset Default
                    </button>
                  </div>

                  <div>
                    <label className="text-[10.5px] text-neutral-500 block mb-0.5">Or paste Landscape Image URL:</label>
                    <input
                      type="text"
                      placeholder="https://example.com/landscape.jpg"
                      value={personalInfo.photoCardUrl || ''}
                      onChange={(e) => {
                        updatePersonalInfo({ photoCardUrl: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full text-xs px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* General Text Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => {
                    updatePersonalInfo({ name: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Display First Name</label>
                <input
                  type="text"
                  value={personalInfo.shortName}
                  onChange={(e) => {
                    updatePersonalInfo({ shortName: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) => {
                    updatePersonalInfo({ title: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Tagline</label>
                <input
                  type="text"
                  value={personalInfo.tagline}
                  onChange={(e) => {
                    updatePersonalInfo({ tagline: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Email</label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => {
                    updatePersonalInfo({ email: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Location</label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) => {
                    updatePersonalInfo({ location: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Phone</label>
                <input
                  type="text"
                  value={personalInfo.phone}
                  onChange={(e) => {
                    updatePersonalInfo({ phone: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Quote</label>
                <input
                  type="text"
                  value={personalInfo.quote}
                  onChange={(e) => {
                    updatePersonalInfo({ quote: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">Intro Card Short Bio</label>
                <textarea
                  rows={2}
                  value={personalInfo.shortBio}
                  onChange={(e) => {
                    updatePersonalInfo({ shortBio: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs p-2.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">About Window Detailed Bio</label>
                <textarea
                  rows={4}
                  value={personalInfo.detailedBio}
                  onChange={(e) => {
                    updatePersonalInfo({ detailedBio: e.target.value });
                    triggerSaveNotification();
                  }}
                  className="w-full text-xs p-2.5 rounded-lg bg-white border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: WALLPAPER MANAGEMENT                               */}
        {/* ========================================================= */}
        {activeTab === 'wallpaper' && (
          <div className="space-y-5">
            <div className="pb-2 border-b border-black/5">
              <h3 className="text-sm font-semibold text-neutral-900">Desktop Wallpaper</h3>
              <p className="text-xs text-neutral-500">Choose from curated macOS aesthetics, upload an image from your device, or enter any web URL</p>
            </div>

            {/* Current Active Wallpaper Preview */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-neutral-800">Current Desktop Wallpaper</h4>
                <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active on Desktop
                </span>
              </div>

              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-neutral-300 shadow-sm bg-neutral-900 group">
                <img
                  src={wallpaperUrl}
                  alt="Current Wallpaper"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <p className="text-xs text-white/90 font-medium truncate">
                    {wallpapersList.find(w => w.url === wallpaperUrl)?.name || 'Custom Wallpaper'}
                  </p>
                </div>
              </div>
            </div>

            {/* Curated Presets Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-neutral-800">macOS &amp; Coastal Presets</h4>
                <span className="text-[11px] text-neutral-400">Click any to apply instantly</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {wallpapersList.map((wp) => {
                  const isCurrent = wallpaperUrl === wp.url;
                  return (
                    <div
                      key={wp.id}
                      onClick={() => {
                        setWallpaperUrl(wp.url);
                        triggerSaveNotification();
                      }}
                      className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 shadow-xs hover:shadow-md ${
                        isCurrent
                          ? 'border-blue-600 ring-2 ring-blue-500/30'
                          : 'border-transparent hover:border-blue-300'
                      }`}
                    >
                      <div className="w-full h-28 bg-neutral-900 overflow-hidden relative">
                        <img
                          src={wp.thumbnail}
                          alt={wp.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        />
                        {isCurrent && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-2.5">
                          <p className="text-xs font-semibold text-white drop-shadow-sm leading-tight">
                            {wp.name}
                          </p>
                          <span className="text-[10px] text-white/80 font-mono">
                            {wp.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Upload & Custom URL */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-4">
              <h4 className="text-xs font-semibold text-neutral-800">Custom Wallpaper</h4>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="file"
                  ref={wallpaperFileRef}
                  onChange={handleWallpaperFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => wallpaperFileRef.current?.click()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Computer</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWallpaperUrl('https://images.pexels.com/photos/21302488/pexels-photo-21302488.jpeg?auto=compress&cs=tinysrgb&w=2560');
                    triggerSaveNotification();
                  }}
                  className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors cursor-pointer"
                >
                  Reset Default (Pexels Beach &amp; Mountains)
                </button>
              </div>

              <div className="pt-2 border-t border-neutral-100">
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">
                  Or paste direct image URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="https://images.pexels.com/... or https://images.unsplash.com/..."
                    value={customWallpaperInput}
                    onChange={(e) => setCustomWallpaperInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-1.5 rounded-lg bg-neutral-50 border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-neutral-800"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customWallpaperInput.trim()) {
                        setWallpaperUrl(customWallpaperInput.trim());
                        triggerSaveNotification();
                        setCustomWallpaperInput('');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROJECTS MANAGEMENT (Add / Edit / Delete)          */}
        {/* ========================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/5">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Manage Projects</h3>
                <p className="text-xs text-neutral-500">Add, edit, or remove portfolio case studies</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newProj: Project = {
                    id: `proj-${Date.now()}`,
                    title: 'New Project Title',
                    subtitle: 'Category · Technology Stack',
                    category: 'Web Apps',
                    description: 'Short single-line description for cards.',
                    fullDescription: 'Comprehensive case study details, architecture, and results.',
                    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
                    status: 'Active',
                    statusColor: '#34D399',
                    date: '2026',
                    highlights: ['Feature 1', 'Feature 2'],
                  };
                  addProject(newProj);
                  setEditingProject(newProj);
                  triggerSaveNotification();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Editing Form */}
            {editingProject && (
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-blue-900">Editing: {editingProject.title}</h4>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="p-1 text-blue-700 hover:text-blue-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-600 block">Title</label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => {
                        const updated = { ...editingProject, title: e.target.value };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => {
                        const updated = { ...editingProject, category: e.target.value as any };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    >
                      <option value="AI/ML">AI/ML</option>
                      <option value="Web Apps">Web Apps</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block">Subtitle</label>
                    <input
                      type="text"
                      value={editingProject.subtitle}
                      onChange={(e) => {
                        const updated = { ...editingProject, subtitle: e.target.value };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingProject.description}
                      onChange={(e) => {
                        const updated = { ...editingProject, description: e.target.value };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={editingProject.technologies.join(', ')}
                      onChange={(e) => {
                        const updated = { 
                          ...editingProject, 
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block">Status Metric / Accuracy (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 94% Accuracy"
                      value={editingProject.metrics || ''}
                      onChange={(e) => {
                        const updated = { ...editingProject, metrics: e.target.value };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block">Year / Date</label>
                    <input
                      type="text"
                      value={editingProject.date}
                      onChange={(e) => {
                        const updated = { ...editingProject, date: e.target.value };
                        setEditingProject(updated);
                        updateProject(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => { setEditingProject(null); triggerSaveNotification(); }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Done Editing
                  </button>
                </div>
              </div>
            )}

            {/* Project Cards List */}
            <div className="space-y-2">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: proj.statusColor }} />
                      <p className="text-xs font-semibold text-neutral-900 truncate">{proj.title}</p>
                      <span className="text-[10px] text-neutral-400 font-mono">{proj.category}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">{proj.description}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingProject(proj)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete project "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          triggerSaveNotification();
                        }
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: TECH STACK / SKILLS (Add / Edit / Delete)          */}
        {/* ========================================================= */}
        {activeTab === 'tech' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/5">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Tech Stack &amp; Skills</h3>
                <p className="text-xs text-neutral-500">Edit technologies, descriptors, categories, and documentation links</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newSkill: TechItem = {
                    id: `tech-${Date.now()}`,
                    name: 'New Technology',
                    category: 'development',
                    descriptor: 'Technology purpose',
                    iconName: 'Code',
                    link: 'https://github.com',
                  };
                  addTechItem(newSkill);
                  setEditingTech(newSkill);
                  triggerSaveNotification();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            {/* Dedicated Skill Edit Form with comfortable full-width inputs */}
            {editingTech && (
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-purple-900">Editing Skill: {editingTech.name}</h4>
                  <button
                    type="button"
                    onClick={() => setEditingTech(null)}
                    className="p-1 text-purple-700 hover:text-purple-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Technology Name</label>
                    <input
                      type="text"
                      value={editingTech.name}
                      onChange={(e) => {
                        const updated = { ...editingTech, name: e.target.value };
                        setEditingTech(updated);
                        const idx = techStack.findIndex(t => (t.id && t.id === editingTech.id) || t.name === editingTech.name);
                        if (idx !== -1) updateTechItem(idx, updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Category Group</label>
                    <select
                      value={editingTech.category}
                      onChange={(e) => {
                        const updated = { ...editingTech, category: e.target.value as any };
                        setEditingTech(updated);
                        const idx = techStack.findIndex(t => (t.id && t.id === editingTech.id) || t.name === editingTech.name);
                        if (idx !== -1) updateTechItem(idx, updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    >
                      <option value="development">Development</option>
                      <option value="backend">Backend &amp; Data</option>
                      <option value="design">Design</option>
                      <option value="tools">Tools</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Short Descriptor</label>
                    <input
                      type="text"
                      placeholder="e.g. UI development, Typed JavaScript, Interface design"
                      value={editingTech.descriptor}
                      onChange={(e) => {
                        const updated = { ...editingTech, descriptor: e.target.value };
                        setEditingTech(updated);
                        const idx = techStack.findIndex(t => (t.id && t.id === editingTech.id) || t.name === editingTech.name);
                        if (idx !== -1) updateTechItem(idx, updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Documentation / Website Link</label>
                    <input
                      type="text"
                      placeholder="https://react.dev"
                      value={editingTech.link || ''}
                      onChange={(e) => {
                        const updated = { ...editingTech, link: e.target.value };
                        setEditingTech(updated);
                        const idx = techStack.findIndex(t => (t.id && t.id === editingTech.id) || t.name === editingTech.name);
                        if (idx !== -1) updateTechItem(idx, updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => { setEditingTech(null); triggerSaveNotification(); }}
                    className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Done Editing Skill
                  </button>
                </div>
              </div>
            )}

            {/* List of Skills */}
            <div className="space-y-1.5">
              {techStack.map((tech, idx) => (
                <div
                  key={tech.id || `${tech.name}-${idx}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 transition-colors text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900">{tech.name}</span>
                      <span className="text-[10px] text-neutral-400 capitalize">({tech.category})</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">{tech.descriptor}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingTech(tech)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      title="Edit skill"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteTechItem(tech.id || tech.name);
                        triggerSaveNotification();
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EXPERIENCE (Add / Edit / Delete)                    */}
        {/* ========================================================= */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/5">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Experience Timeline</h3>
                <p className="text-xs text-neutral-500">Add, edit, or remove internships, roles, and achievements</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newExp: ExperienceItem = {
                    id: `exp-${Date.now()}`,
                    role: 'Software Developer Intern',
                    company: 'Company Name',
                    location: 'City, State / Remote',
                    type: 'Internship',
                    period: '2026 – Present',
                    description: 'Key responsibilities and summary of contributions.',
                    achievements: ['Delivered core feature', 'Improved metrics'],
                    skills: ['Python', 'React', 'Data Analysis']
                  };
                  addExperience(newExp);
                  setEditingExp(newExp);
                  triggerSaveNotification();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            {/* Experience Edit Form */}
            {editingExp && (
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-emerald-900">Editing: {editingExp.role} at {editingExp.company}</h4>
                  <button
                    type="button"
                    onClick={() => setEditingExp(null)}
                    className="p-1 text-emerald-700 hover:text-emerald-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Role Title</label>
                    <input
                      type="text"
                      value={editingExp.role}
                      onChange={(e) => {
                        const updated = { ...editingExp, role: e.target.value };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Company / Organization</label>
                    <input
                      type="text"
                      value={editingExp.company}
                      onChange={(e) => {
                        const updated = { ...editingExp, company: e.target.value };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Period (e.g. May 2025 – Jul 2025)</label>
                    <input
                      type="text"
                      value={editingExp.period}
                      onChange={(e) => {
                        const updated = { ...editingExp, period: e.target.value };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Location</label>
                    <input
                      type="text"
                      value={editingExp.location}
                      onChange={(e) => {
                        const updated = { ...editingExp, location: e.target.value };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Overview Description</label>
                    <textarea
                      rows={2}
                      value={editingExp.description}
                      onChange={(e) => {
                        const updated = { ...editingExp, description: e.target.value };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Skills Used (comma separated)</label>
                    <input
                      type="text"
                      value={editingExp.skills.join(', ')}
                      onChange={(e) => {
                        const updated = { 
                          ...editingExp, 
                          skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        };
                        setEditingExp(updated);
                        updateExperience(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => { setEditingExp(null); triggerSaveNotification(); }}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Done Editing Experience
                  </button>
                </div>
              </div>
            )}

            {/* List of Experiences */}
            <div className="space-y-2">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-neutral-900 truncate">{exp.role}</p>
                      <span className="text-[10px] text-neutral-400 font-mono">· {exp.company}</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">{exp.period} — {exp.location}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingExp(exp)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      title="Edit experience"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete experience "${exp.role}"?`)) {
                          deleteExperience(exp.id);
                          triggerSaveNotification();
                        }
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: EDUCATION (Add / Edit / Delete)                    */}
        {/* ========================================================= */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-black/5">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Education Details</h3>
                <p className="text-xs text-neutral-500">Add, edit, or delete degrees, universities, and coursework</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newEdu: EducationItem = {
                    id: `edu-${Date.now()}`,
                    degree: 'Degree Title (e.g. B.Tech / BCA)',
                    field: 'Specialization / Minor',
                    institution: 'University / College Name',
                    location: 'City, Country',
                    period: '2024 – 2028',
                    highlights: ['Academic achievement', 'Relevant extracurriculars'],
                    coursework: ['Data Structures', 'Database Systems', 'Algorithms'],
                  };
                  addEducation(newEdu);
                  setEditingEdu(newEdu);
                  triggerSaveNotification();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Education</span>
              </button>
            </div>

            {/* Education Edit Form */}
            {editingEdu && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-amber-900">Editing Education</h4>
                  <button
                    type="button"
                    onClick={() => setEditingEdu(null)}
                    className="p-1 text-amber-700 hover:text-amber-900 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Degree Title</label>
                    <input
                      type="text"
                      value={editingEdu.degree}
                      onChange={(e) => {
                        const updated = { ...editingEdu, degree: e.target.value };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Field / Minor</label>
                    <input
                      type="text"
                      value={editingEdu.field}
                      onChange={(e) => {
                        const updated = { ...editingEdu, field: e.target.value };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Institution / University</label>
                    <input
                      type="text"
                      value={editingEdu.institution}
                      onChange={(e) => {
                        const updated = { ...editingEdu, institution: e.target.value };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Period (e.g. Aug 2023 – May 2026)</label>
                    <input
                      type="text"
                      value={editingEdu.period}
                      onChange={(e) => {
                        const updated = { ...editingEdu, period: e.target.value };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Location</label>
                    <input
                      type="text"
                      value={editingEdu.location}
                      onChange={(e) => {
                        const updated = { ...editingEdu, location: e.target.value };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-neutral-600 block mb-0.5">Coursework (comma separated)</label>
                    <textarea
                      rows={2}
                      value={editingEdu.coursework.join(', ')}
                      onChange={(e) => {
                        const updated = { 
                          ...editingEdu, 
                          coursework: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                        };
                        setEditingEdu(updated);
                        updateEducation(updated);
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-neutral-300"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => { setEditingEdu(null); triggerSaveNotification(); }}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Done Editing Education
                  </button>
                </div>
              </div>
            )}

            {/* List of Education Records */}
            <div className="space-y-2">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 transition-colors"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-neutral-900 truncate">{edu.degree}</p>
                      <span className="text-[10px] text-neutral-400 font-mono">({edu.field})</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">{edu.institution} — {edu.period}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingEdu(edu)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      title="Edit education"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete education record "${edu.degree}"?`)) {
                          deleteEducation(edu.id);
                          triggerSaveNotification();
                        }
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                      title="Delete education"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DESKTOP WIDGET SPATIAL LAYOUT                     */}
        {/* ========================================================= */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-black/5">
              <h3 className="text-sm font-semibold text-neutral-900">Desktop Widget Layout</h3>
              <p className="text-xs text-neutral-500">
                Unlock desktop cards to drag and reposition them anywhere on screen
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-blue-950">
                    Widget Draggable Mode: {widgetMoveMode ? 'Active (Unlocked)' : 'Locked'}
                  </h4>
                  <p className="text-[11px] text-blue-800">
                    When active, click and drag any desktop widget to reposition it. Positions automatically persist.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWidgetMoveMode(!widgetMoveMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    widgetMoveMode
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {widgetMoveMode ? 'Lock Positions' : 'Unlock & Move Widgets'}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  resetWidgetPositions();
                  triggerSaveNotification();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                <span>Reset All Widgets to Default Layout</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: PASSWORD & SECURITY                                */}
        {/* ========================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <div className="pb-2 border-b border-black/5">
              <h3 className="text-sm font-semibold text-neutral-900">Security &amp; Password</h3>
              <p className="text-xs text-neutral-500">Change your private administrator password</p>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-3 max-w-sm">
              <div>
                <label className="text-[11px] font-medium text-neutral-600 block mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-white border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {passwordSuccess && (
                <p className="text-xs font-medium text-emerald-600">{passwordSuccess}</p>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-xs"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
