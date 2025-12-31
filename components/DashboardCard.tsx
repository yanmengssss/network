
import React from 'react';

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

const DashboardCard: React.FC<Props> = ({ title, children, className = '', height = 'auto' }) => {
  return (
    <div 
      className={`relative border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-10" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-10" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-10" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-10" />

      {/* Content */}
      <div className="p-4 h-full flex flex-col">
        {title && (
          <div className="flex items-center gap-3 mb-4 border-b border-cyan-500/10 pb-2">
            <div className="w-1 h-4 bg-cyan-500" />
            <h3 className="text-sm font-bold font-orbitron tracking-widest text-cyan-300 uppercase">{title}</h3>
            <div className="flex-1" />
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
              <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
            </div>
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
