
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const CargoRatioChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const options = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      legend: {
        bottom: '0%',
        left: 'center',
        textStyle: { color: '#94a3b8', fontSize: 10 },
        icon: 'circle'
      },
      series: [
        {
          name: 'Cargo Type',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#0f172a',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold',
              color: '#00f0ff'
            }
          },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Containers', itemStyle: { color: '#00f0ff' } },
            { value: 735, name: 'Liquid Bulk', itemStyle: { color: '#38bdf8' } },
            { value: 580, name: 'Dry Bulk', itemStyle: { color: '#7dd3fc' } },
            { value: 484, name: 'Ro-Ro', itemStyle: { color: '#0ea5e9' } },
            { value: 300, name: 'Others', itemStyle: { color: '#1e293b' } }
          ]
        }
      ]
    };

    chart.setOption(options);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full h-full" />;
};

export default CargoRatioChart;
