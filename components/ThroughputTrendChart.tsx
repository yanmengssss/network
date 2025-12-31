
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ThroughputTrendChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const options = {
      backgroundColor: 'transparent',
      grid: { top: '15%', left: '10%', right: '5%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['2019', '2020', '2021', '2022', '2023', '2024'],
        axisLine: { lineStyle: { color: '#1e293b' } },
        axisLabel: { color: '#64748b' }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#1e293b', type: 'dashed' } },
        axisLabel: { color: '#64748b' }
      },
      series: [
        {
          name: 'Throughput',
          type: 'bar',
          barWidth: '40%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#f59e0b' },
              { offset: 1, color: '#78350f' }
            ]),
            borderRadius: [4, 4, 0, 0]
          },
          data: [450, 480, 520, 490, 560, 610]
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

export default ThroughputTrendChart;
