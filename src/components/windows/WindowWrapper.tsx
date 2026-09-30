import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { WindowId } from '../../types';
import { playVacuumSound } from '../../utils/vacuumSound';

interface WindowWrapperProps {
  id: WindowId;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosing?: boolean;
  zIndex: number;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  children: React.ReactNode;
  defaultWidth?: string;
  defaultHeight?: string;
  defaultPosition?: { x: number; y: number };
}

export const WindowWrapper: React.FC<WindowWrapperProps> = ({
  id,
  title,
  subtitle,
  isOpen,
  isMinimized,
  isMaximized,
  isClosing = false,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  defaultWidth = 'max-w-2xl',
  defaultHeight = 'max-h-[82vh]',
  defaultPosition = { x: 0, y: 0 },
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelfClosing, setIsSelfClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(true);

  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 0,
    posY: 0,
  });

  // Handle opening animation: unsets class after 280ms so transforms stay clean
  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
      const timer = setTimeout(() => setIsOpening(false), 290);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle external close request (e.g. Esc key or dock toggle)
  useEffect(() => {
    if (isClosing && !isSelfClosing) {
      setIsSelfClosing(true);
      playVacuumSound();
      const timer = setTimeout(() => {
        setIsSelfClosing(false);
      }, 320);
      return () => clearTimeout(timer);
    }
  }, [isClosing]);

  // Click handler for Red Close Button
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelfClosing) return;
    setIsSelfClosing(true);
    playVacuumSound();

    setTimeout(() => {
      setIsSelfClosing(false);
      onClose(id);
    }, 320);
  };

  // Click handler for Yellow Minimize Button
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelfClosing) return;
    setIsSelfClosing(true);
    playVacuumSound();

    setTimeout(() => {
      setIsSelfClosing(false);
      onMinimize(id);
    }, 320);
  };

  const isClosingNow = isSelfClosing || isClosing;

  // Keep mounted during vacuum closing animation, unmount once closed
  if (!isOpen && !isClosingNow) return null;
  if (isMinimized && !isClosingNow) return null;

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isClosingNow) return;
    if ((e.target as HTMLElement).closest('button')) return;

    onFocus(id);
    setIsDragging(true);
    e.preventDefault();

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch Drag Handlers (for trackpads/touch screens)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized || isClosingNow) return;
    if ((e.target as HTMLElement).closest('button')) return;

    onFocus(id);
    setIsDragging(true);
    const touch = e.touches[0];

    dragStartRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const t = moveEvent.touches[0];
      const dx = t.clientX - dragStartRef.current.startX;
      const dy = t.clientY - dragStartRef.current.startY;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      onClick={() => onFocus(id)}
      style={{
        zIndex,
        position: 'fixed',
        left: isMaximized ? '8px' : '50%',
        right: isMaximized ? '8px' : 'auto',
        top: isMaximized ? '36px' : '4.5rem',
        bottom: isMaximized ? '64px' : 'auto',
        transform: isMaximized
          ? 'none'
          : `translate3d(calc(-50% + ${position.x}px), ${position.y}px, 0)`,
        width: isMaximized ? 'auto' : undefined,
      }}
      className={`select-none ${isMaximized ? '' : `${defaultWidth} w-[94vw] sm:w-full`}`}
    >
      {/* 
        Inner Card:
        Executes the macOS vacuum suck animation directly down into the bottom dock bar!
      */}
      <div
        className={`flex flex-col bg-white/85 backdrop-blur-2xl rounded-2xl border border-white/80 shadow-[0_22px_55px_rgba(0,0,0,0.16)] overflow-hidden transition-shadow duration-150 ${
          isMaximized ? 'h-full' : defaultHeight
        } ${isDragging ? 'shadow-[0_28px_70px_rgba(0,0,0,0.25)] ring-1 ring-black/10' : ''} ${
          isClosingNow
            ? 'mac-vacuum-closing'
            : isOpening
            ? 'mac-window-opening'
            : ''
        }`}
      >
        {/* Window Title Bar (Draggable handle) */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="h-10 px-4 flex items-center justify-between border-b border-black/5 bg-white/50 cursor-grab active:cursor-grabbing select-none shrink-0"
        >
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 group/lights">
            {/* Close Button with Vacuum Suck Effect into dock */}
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-transparent hover:text-neutral-800 transition-colors focus:outline-none cursor-pointer"
              title="Close window (Vacuum into dock)"
            >
              <X className="w-2 h-2 group-hover/lights:text-neutral-900 stroke-[3]" />
            </button>

            {/* Minimize Button with Vacuum Suck Effect into dock */}
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-transparent hover:text-neutral-800 transition-colors focus:outline-none cursor-pointer"
              title="Minimize window into dock"
            >
              <Minus className="w-2 h-2 group-hover/lights:text-neutral-900 stroke-[3]" />
            </button>

            {/* Maximize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(id);
              }}
              className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-transparent hover:text-neutral-800 transition-colors focus:outline-none cursor-pointer"
              title="Toggle full size"
            >
              <Square className="w-1.5 h-1.5 group-hover/lights:text-neutral-900 stroke-[3]" />
            </button>
          </div>

          {/* Window Title & Subtitle */}
          <div className="flex items-center gap-2 text-center pointer-events-none">
            <span className="text-[12.5px] font-semibold text-neutral-800 tracking-tight">
              {title}
            </span>
            {subtitle && (
              <span className="hidden sm:inline text-[11px] text-neutral-400 font-normal">
                — {subtitle}
              </span>
            )}
          </div>

          {/* Balance spacer */}
          <div className="w-12 flex justify-end">
            <span className="text-[10px] text-neutral-300 font-mono tracking-wider opacity-60 hidden sm:inline">
              macOS
            </span>
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 text-neutral-800 select-text">
          {children}
        </div>
      </div>
    </div>
  );
};
