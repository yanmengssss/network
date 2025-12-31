
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import GlobeMap from './components/GlobeMap';
import MetricCard from './components/MetricCard';
import ShipList from './components/ShipList';
import CargoRatioChart from './components/CargoRatioChart';
import ShippingEfficiencyChart from './components/ShippingEfficiencyChart';
import ThroughputTrendChart from './components/ThroughputTrendChart';
import ImageGenPanel from './components/ImageGenPanel';
import { ShipData } from './types';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

const MOCK_SHIPS: ShipData[] = [
  { id: '1', name: 'EVER GIVEN', origin: 'Rotterdam', eta: '10:30', status: 'In Transit', cargo: 'Containers' },
  { id: '2', name: 'MAERSK ALABAMA', origin: 'Singapore', eta: '14:20', status: 'Docking', cargo: 'Electronics' },
  { id: '3', name: 'COSCO SHIPPING', origin: 'Shanghai', eta: '16:45', status: 'In Transit', cargo: 'Machinery' },
  { id: '4', name: 'GLOVIS SUN', origin: 'Busan', eta: '19:10', status: 'In Transit', cargo: 'Automotive' },
  { id: '5', name: 'HMM COPENHAGEN', origin: 'Hamburg', eta: '22:00', status: 'Departed', cargo: 'Chemicals' },
  { id: '6', name: 'ONE TRADITION', origin: 'Tokyo', eta: '01:15', status: 'In Transit', cargo: 'Retail' },
];

const App: React.FC = () => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const scaleW = ww / DESIGN_WIDTH;
      const scaleH = wh / DESIGN_HEIGHT;
      setScale(Math.min(scaleW, scaleH));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#020617] overflow-hidden">
      <div 
        ref={containerRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out'
        }}
        className="relative bg-slate-950 flex flex-col p-6 text-slate-100"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0)_0%,_rgba(2,6,23,1)_100%)] pointer-events-none z-0" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#00f0ff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

        <Header />

        <main className="flex-1 grid grid-cols-12 gap-6 mt-16 z-10">
          {/* Left Column (25%) */}
          <section className="col-span-3 flex flex-col gap-6">
            <MetricCard 
              label="TOTAL ANNUAL SHIPS" 
              value="12,482" 
              trend="up" 
              change="+5.2%"
              icon="ships"
            />
            <DashboardCard title="INCOMING SHIP DATA" className="flex-1">
              <ShipList ships={MOCK_SHIPS} />
            </DashboardCard>
            <DashboardCard title="AI PORT VISUALIZER (GEN)" height="320px">
              <ImageGenPanel />
            </DashboardCard>
          </section>

          {/* Center Column (50%) */}
          <section className="col-span-6 flex flex-col">
            <div className="flex-1 relative">
              <GlobeMap />
            </div>
          </section>

          {/* Right Column (25%) */}
          <section className="col-span-3 flex flex-col gap-6">
            <DashboardCard title="CARGO TYPE RATIO" height="300px">
              <CargoRatioChart />
            </DashboardCard>
            <DashboardCard title="SHIPPING EFFICIENCY" height="300px">
              <ShippingEfficiencyChart />
            </DashboardCard>
            <DashboardCard title="ANNUAL THROUGHPUT TREND" height="300px">
              <ThroughputTrendChart />
            </DashboardCard>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
