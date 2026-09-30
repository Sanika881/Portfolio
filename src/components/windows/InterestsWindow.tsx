import React from 'react';
import { INTERESTS } from '../../data/portfolioData';
import { 
  Layout, 
  Camera, 
  Headphones, 
  Compass, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';

const renderInterestIcon = (name: string) => {
  const props = { className: "w-4 h-4 text-neutral-800" };
  switch (name) {
    case 'Layout': return <Layout {...props} />;
    case 'Camera': return <Camera {...props} />;
    case 'Headphones': return <Headphones {...props} />;
    case 'Compass': return <Compass {...props} />;
    case 'BookOpen': return <BookOpen {...props} />;
    case 'Sparkles': return <Sparkles {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export const InterestsWindow: React.FC = () => {
  return (
    <div className="space-y-5">
      <div className="pb-1 border-b border-black/5">
        <p className="text-xs text-neutral-500">
          Personal curiosities, visual studies &amp; creative habits
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {INTERESTS.map((item) => (
          <div
            key={item.title}
            className="p-4 rounded-2xl bg-white/60 hover:bg-white border border-black/5 transition-all duration-200 space-y-2 group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform"
                style={{ backgroundColor: item.accentColor }}
              >
                {renderInterestIcon(item.iconName)}
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">
                {item.tag}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
              {item.title}
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
