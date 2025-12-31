
import React from 'react';

export const COLORS = {
  primary: '#00f0ff',
  secondary: '#f59e0b',
  bg: '#020617',
  panel: 'rgba(15, 23, 42, 0.7)',
  accent: '#10b981'
};

export const TechHeaderSVG = () => (
  <svg viewBox="0 0 1920 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-[100px] -z-10">
    <path d="M0 0H1920V60L1600 80H320L0 60V0Z" fill="url(#header_grad)" fillOpacity="0.2" />
    <path d="M0 60L320 80H1600L1920 60" stroke="#00f0ff" strokeWidth="2" strokeOpacity="0.5" />
    <path d="M800 80L850 95H1070L1120 80" stroke="#00f0ff" strokeWidth="2" />
    <defs>
      <linearGradient id="header_grad" x1="960" y1="0" x2="960" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00f0ff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
