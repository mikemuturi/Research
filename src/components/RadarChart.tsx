import React from 'react';

interface RadarChartProps {
  data: {
    dimension: string;
    score: number;
  }[];
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ data, className = '' }) => {
  // Simple radar chart implementation using SVG
  const size = 300;
  const center = size / 2;
  const maxRadius = center - 40;
  const levels = 5;

  // Calculate points for each dimension
  const angleStep = (2 * Math.PI) / data.length;
  
  const getPoint = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const radius = (value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  const getLabelPoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const radius = maxRadius + 20;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  // Create path for the data polygon
  const dataPoints = data.map((item, index) => getPoint(index, item.score));
  const pathData = dataPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <div className={`w-full h-80 flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {Array.from({ length: levels }, (_, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={(maxRadius / levels) * (i + 1)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Grid lines */}
        {data.map((_, index) => {
          const point = getPoint(index, 100);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <path
          d={pathData}
          fill="#3b82f6"
          fillOpacity="0.1"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="2"
          />
        ))}
        
        {/* Labels */}
        {data.map((item, index) => {
          const labelPoint = getLabelPoint(index);
          return (
            <text
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-600"
              style={{ fontSize: '12px' }}
            >
              {item.dimension}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;