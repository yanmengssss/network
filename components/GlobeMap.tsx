
import React, { useEffect, useRef, useState } from 'react';

// Use global echarts from script tags as defined in index.html
declare const echarts: any;

const GlobeMap: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);
  const [is3D, setIs3D] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);

  const EARTH_TEXTURE_URL = 'https://cdn.yanmengsss.xyz/earth2.jpg';
  const WORLD_MAP_URL = 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json';
  const CHINA_COORDS = [116.4074, 39.9042];

  const destinationPoints = [
    { name: 'NEW YORK', coords: [-74.006, 40.7128] },
    { name: 'ROTTERDAM', coords: [4.4792, 51.9225] },
    { name: 'SINGAPORE', coords: [103.8198, 1.3521] },
    { name: 'TOKYO', coords: [139.6917, 35.6895] },
    { name: 'SYDNEY', coords: [151.2093, -33.8688] },
    { name: 'LOS ANGELES', coords: [-118.2437, 34.0522] },
    { name: 'DUBAI', coords: [55.2708, 25.2048] },
    { name: 'CAPE TOWN', coords: [18.4241, -33.9249] },
    { name: 'RIO DE JANEIRO', coords: [-43.1729, -22.9068] },
    { name: 'LONDON', coords: [-0.1278, 51.5074] },
  ];

  const getRoutes = () => {
    return destinationPoints.map(dest => ({
      coords: [CHINA_COORDS, dest.coords],
      value: Math.random() * 100
    }));
  };

  const getPorts = () => {
    const ports = destinationPoints.map(dest => ({
      name: dest.name,
      value: is3D ? [...dest.coords, 0] : dest.coords
    }));
    ports.push({ name: 'HUB: CHINA', value: is3D ? [...CHINA_COORDS, 0] : CHINA_COORDS });
    return ports;
  };

  useEffect(() => {
    // Load World Map for 2D View
    fetch(WORLD_MAP_URL)
      .then(res => res.json())
      .then(geoJson => {
        echarts.registerMap('world', geoJson);
        setMapLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!chartRef.current || typeof echarts === 'undefined' || (!is3D && !mapLoaded)) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    const chart = chartInstance.current;

    const routesData = getRoutes();
    const portsData = getPorts();

    const option3D = {
      backgroundColor: 'transparent',
      globe: {
        baseTexture: EARTH_TEXTURE_URL,
        heightTexture: EARTH_TEXTURE_URL,
        shading: 'realistic',
        realisticMaterial: { roughness: 0.9, metalness: 0.1 },
        atmosphere: {
          show: true,
          offset: 0,
          glowPower: 20,
          innerGlowPower: 5,
          color: 'rgba(0, 200, 255, 0.1)'
        },
        light: {
          main: { intensity: 2.0, shadow: false, alpha: 40, beta: -30 },
          ambient: { intensity: 0.6 }
        },
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 5,
          distance: 215,
          alpha: 30,
          beta: 160,
          damping: 0.8
        },
        postEffect: {
          enable: true,
          bloom: { enable: true, intensity: 0.4 }
        }
      },
      series: [
        {
          name: 'Shipping Routes',
          type: 'lines3D',
          coordinateSystem: 'globe',
          effect: {
            show: true,
            constantSpeed: 45,
            trailWidth: 4,
            trailLength: 0.4,
            trailColor: '#ffaa00',
            trailOpacity: 1
          },
          lineStyle: { width: 1, color: '#f59e0b', opacity: 0.05, curveness: 0.2 },
          blendMode: 'lighter',
          data: routesData
        },
        {
          name: 'Global Hubs',
          type: 'scatter3D',
          coordinateSystem: 'globe',
          symbol: 'pin',
          symbolSize: 15,
          itemStyle: { color: '#f59e0b', opacity: 1, shadowBlur: 15, shadowColor: '#f59e0b' },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            textStyle: { fontSize: 10, fontFamily: 'Orbitron', color: '#00f0ff', backgroundColor: 'rgba(2, 6, 23, 0.8)', padding: [2, 5], borderRadius: 2 }
          },
          data: portsData
        }
      ]
    };

    const option2D = {
      backgroundColor: 'transparent',
      geo: {
        map: 'world',
        roam: true,
        zoom: 1.2,
        label: { show: false },
        itemStyle: {
          areaColor: '#050b14',
          borderColor: '#00aaff',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 170, 255, 0.5)'
        },
        emphasis: {
          itemStyle: { areaColor: '#0a1a2f', borderColor: '#00f0ff' },
          label: { show: false }
        }
      },
      series: [
        {
          name: 'Shipping Routes',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 1,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.4,
            color: '#ffaa00',
            symbolSize: 3
          },
          lineStyle: {
            color: '#f59e0b',
            width: 1,
            opacity: 0.1,
            curveness: 0.2
          },
          data: routesData
        },
        {
          name: 'Global Hubs',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { brushType: 'stroke', scale: 4, color: '#f59e0b' },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            fontSize: 9,
            fontFamily: 'Orbitron',
            color: '#00f0ff'
          },
          symbolSize: 6,
          itemStyle: { color: '#f59e0b', shadowBlur: 10, shadowColor: '#f59e0b' },
          data: portsData
        }
      ]
    };

    chart.setOption(is3D ? option3D : option2D, true);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [is3D, mapLoaded]);

  return (
    <div className="w-full h-full relative flex items-center justify-center group bg-slate-950/20">
      <div ref={chartRef} className="w-full h-full" />
      
      {/* View Toggle Button */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={() => setIs3D(!is3D)}
          className="px-4 py-1.5 border border-cyan-500/40 bg-slate-900/80 hover:bg-cyan-500/20 text-cyan-400 font-orbitron text-[10px] tracking-[0.2em] uppercase transition-all backdrop-blur-sm group/btn flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {is3D ? 'Switch to 2D View' : 'Switch to 3D View'}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-400" />
        </button>
      </div>

      {/* HUD Info Overlays */}
      <div className="absolute top-8 left-8 flex flex-col gap-2 border-l-2 border-cyan-500/50 pl-4 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,240,255,1)]" />
          <span className="text-[12px] font-orbitron text-cyan-100 tracking-[0.2em] uppercase font-black">
            Projection: {is3D ? 'Spherical' : 'Mercator'}
          </span>
        </div>
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
          {is3D ? 'Plasma Shield: Nominal' : 'Geospatial Grid: Active'}
        </span>
      </div>

      <div className="absolute bottom-10 right-10 pointer-events-none text-right">
        <div className="text-[9px] font-orbitron text-slate-400 uppercase tracking-[0.3em] font-medium leading-relaxed">
          {is3D ? (
            <>Halo Style: Rim Light (Sharp)<br/>Tone: Tech Cyan<br/>Density: Optimized</>
          ) : (
            <>Map Style: Cyber Vector<br/>Borders: Neon Cyan<br/>Routes: Effect Scatter</>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobeMap;
