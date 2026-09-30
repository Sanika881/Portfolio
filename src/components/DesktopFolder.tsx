import React from 'react';
import { WindowId } from '../types';
import { MacFolderIcon } from './MacIcons';

interface DesktopFolderProps {
  id: WindowId;
  name: string;
  color: string;
  badge?: string;
  isSelected: boolean;
  onSelect: (id: WindowId) => void;
  onOpen: (id: WindowId) => void;
}

export const DesktopFolder: React.FC<DesktopFolderProps> = ({
  id,
  name,
  color,
  badge,
  isSelected,
  onSelect,
  onOpen,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      onOpen(id);
    } else {
      onSelect(id);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen(id);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-all duration-150 select-none w-22 sm:w-24 text-center ${
        isSelected
          ? 'bg-neutral-900/10 backdrop-blur-sm ring-1 ring-neutral-400/40'
          : 'hover:bg-white/20'
      }`}
    >
      {/* Real macOS-style folder shape with authentic geometry */}
      <div className="relative mb-1.5 transition-transform duration-150 group-hover:scale-[1.05]">
        <MacFolderIcon color={color} size={58} />
      </div>

      {/* Folder Name */}
      <span
        className={`text-[12px] font-medium tracking-tight px-1.5 py-0.5 rounded leading-tight transition-colors line-clamp-1 ${
          isSelected
            ? 'bg-blue-600 text-white font-semibold shadow-xs'
            : 'text-neutral-800 bg-white/40 backdrop-blur-xs group-hover:bg-white/70 shadow-xs'
        }`}
      >
        {name}
      </span>
      {badge && (
        <span className="text-[10px] text-neutral-600 mt-0.5 font-normal">
          {badge}
        </span>
      )}
    </div>
  );
};

