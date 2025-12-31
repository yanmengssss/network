
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ShippingEfficiencyChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const options = {
      backgroundColor: 'transparent',
      grid: { top: '15%', left: '10%', right: '5%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#00f0ff' },
          lineStyle: { width: 3, shadowBlur: 10, shadowColor: 'rgba(0, 240, 255, 0.5)' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 240, 255, 0.3)' },
              { offset: 1, color: 'rgba(0, 240, 255, 0)' }
            ])
          }
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

export default ShippingEfficiencyChart;
