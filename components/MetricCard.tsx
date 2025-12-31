
import React from 'react';

interface Props {
  label: string;
  value: string;
  trend: 'up' | 'down';
  change: string;
  icon?: string;
}

const MetricCard: React.FC<Props> = ({ label, value, trend, change }) => {
  return (
    <div className="relative p-6 border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-slate-900/60 overflow-hidden group">
      <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-widest text-slate-400 mb-1">{label}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black font-orbitron text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
            {value}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className={`text-sm font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend === 'up' ? '▲' : '▼'} {change}
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">vs prev year</span>
        </div>
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-5">
         <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,21V15H14V21H19V11H22L12,2L2,11H5V21H10Z" />
         </svg>
      </div>
    </div>
  );
};

export default MetricCard;
