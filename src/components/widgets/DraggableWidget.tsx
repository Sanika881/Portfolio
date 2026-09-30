import React, { useRef, useState } from 'react';
import { Move } from 'lucide-react';
import { WidgetId, WidgetPosition, usePortfolio } from '../../context/PortfolioContext';

interface DraggableWidgetProps {
  id: WidgetId;
  children: React.ReactNode;
  className?: string;
}

export const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  id,
  children,
  className = '',
}) => {
  const { widgetPositions, updateWidgetPosition, isAdmin, widgetMoveMode } = usePortfolio();
  const currentPos = widgetPositions[id] || { x: 0, y: 0 };

  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number }>({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
  });

  const canMove = isAdmin && widgetMoveMode;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canMove) return;
    // Don't drag if clicking an input, button, or link
    const target = e.target as HTMLElement;
    if (target.closest('button, input, textarea, a') && !target.closest('.widget-drag-handle')) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;
      updateWidgetPosition(id, {
        x: dragRef.current.initialX + dx,
        y: dragRef.current.initialY + dy,
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

  return (
    <div
      style={{
        transform: `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
      }}
      className={`relative ${className} ${
        canMove
          ? 'cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-blue-400/50 rounded-2xl group/drag'
          : ''
      } ${isDragging ? 'z-30 shadow-2xl scale-[1.01]' : ''}`}
      onMouseDown={canMove ? handleMouseDown : undefined}
    >
      {/* Admin indicator tag / drag handle */}
      {canMove && (
        <div className="widget-drag-handle absolute -top-3 left-3 bg-neutral-900/90 text-white text-[9.5px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md opacity-70 group-hover/drag:opacity-100 transition-opacity z-20 pointer-events-auto">
          <Move className="w-2.5 h-2.5" />
          <span>Move Widget</span>
        </div>
      )}

      {children}
    </div>
  );
};
