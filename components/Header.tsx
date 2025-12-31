
import React, { useState, useEffect } from 'react';
import { TechHeaderSVG } from '../constants';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full h-[100px] flex items-center justify-between px-12 z-20">
      <TechHeaderSVG />
      
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 text-cyan-400">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-bold tracking-widest">SYSTEM ONLINE</span>
        </div>
        <div className="text-xs text-slate-500 font-medium">WEATHER: 24°C / HUMIDITY: 65%</div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-black font-orbitron tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyan-600 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          国际港口业务数据大屏
        </h1>
        <div className="text-xs tracking-[0.5em] text-cyan-500/80 mt-1 font-bold">INTERNATIONAL PORT BUSINESS DATA HUB</div>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-2xl font-orbitron font-bold text-cyan-400">
          {time.toLocaleTimeString([], { hour12: false })}
        </div>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
    </header>
  );
};

export default Header;
