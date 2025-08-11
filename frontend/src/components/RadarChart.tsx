'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: {
    dimension: string;
    score: number;
  }[];
  className?: string;
}

const CustomRadarChart: React.FC<RadarChartProps> = ({ data, className = '' }) => {
  // Transform data for recharts
  const chartData = data.map(item => ({
    dimension: item.dimension.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    score: Math.round(item.score),
  }));

  return (
    <div className={`w-full h-80 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fontSize: 12, fill: '#374151' }}
            className="text-xs"
          />
          <PolarRadiusAxis 
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: '#6B7280' }}
          />
          <Radar
            name="Readiness Score"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomRadarChart;