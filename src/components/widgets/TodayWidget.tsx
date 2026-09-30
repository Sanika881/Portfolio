import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const TodayWidget: React.FC = () => {
  const { tasks, toggleTask, addTask } = usePortfolio();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    addTask(newTaskText.trim());
    setNewTaskText('');
    setIsAdding(false);
  };

  return (
    <div className="desktop-glass rounded-2xl p-4 w-72 sm:w-80 shadow-sm transition-all duration-200 hover:shadow-md select-none">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-neutral-800 tracking-tight">
            Today
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            {tasks.filter(t => t.completed).length}/{tasks.length}
          </span>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md transition-colors cursor-pointer"
          title="Add quick task"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="w-full flex items-center gap-2.5 text-left group focus:outline-none transition-opacity cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                task.completed
                  ? 'bg-neutral-800 border-neutral-800 text-white'
                  : 'border-neutral-300 group-hover:border-neutral-500 bg-white/40'
              }`}
            >
              {task.completed && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span
              className={`text-[12px] tracking-tight leading-snug transition-colors line-clamp-1 ${
                task.completed
                  ? 'line-through text-neutral-400'
                  : 'text-neutral-700 group-hover:text-neutral-950'
              }`}
            >
              {task.text}
            </span>
          </button>
        ))}

        {isAdding && (
          <form onSubmit={handleAddTask} className="mt-2 pt-1 flex gap-1">
            <input
              type="text"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              placeholder="New intention..."
              autoFocus
              className="text-xs bg-white/70 border border-neutral-300/80 rounded-lg px-2 py-1 flex-1 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
            <button
              type="submit"
              className="px-2 py-1 text-[11px] font-medium bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 cursor-pointer"
            >
              Add
            </button>
          </form>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-[11px] text-neutral-500 italic">
        <span>small steps</span>
        <span>big progress</span>
      </div>
    </div>
  );
};
