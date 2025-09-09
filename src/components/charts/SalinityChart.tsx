import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets } from 'lucide-react';

interface SalinityChartProps {
  data: Array<{
    depth?: number;
    date?: string;
    salinity: number;
  }>;
  title?: string;
  className?: string;
}

const SalinityChart: React.FC<SalinityChartProps> = ({ 
  data, 
  title = "Salinity Profile", 
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-lg border p-3 ${className}`}>
      <div className="flex items-center mb-2">
        <Droplets className="h-4 w-4 text-blue-500 mr-2" />
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      </div>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={data[0]?.depth !== undefined ? 'depth' : 'date'} 
              fontSize={10}
              tick={{ fill: '#666' }}
            />
            <YAxis 
              fontSize={10}
              tick={{ fill: '#666' }}
              label={{ value: 'PSU', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} PSU`, 'Salinity']}
              labelStyle={{ color: '#333' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="salinity" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalinityChart;
