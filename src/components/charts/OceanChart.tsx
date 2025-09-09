import React from 'react';
import TemperatureChart from './TemperatureChart';
import SalinityChart from './SalinityChart';
import WindChart from './WindChart';
import PressureChart from './PressureChart';
import ArgoChart from './ArgoChart';
import TrendsChart from './TrendsChart';
import ConditionsChart from './ConditionsChart';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Globe } from 'lucide-react';

interface OceanChartProps {
  type: 'temperature' | 'salinity' | 'pressure' | 'wind' | 'argo' | 'trends' | 'conditions' | 'pie' | 'comprehensive';
  data: any[];
  title?: string;
  className?: string;
  xKey?: string;
  yKey?: string;
  unit?: string;
}

const OceanChart: React.FC<OceanChartProps> = ({ 
  type, 
  data, 
  title, 
  className = "",
  xKey = 'depth',
  yKey = 'value',
  unit
}) => {
  if (type === 'temperature') {
    return <TemperatureChart data={data} title={title} className={className} />;
  }

  if (type === 'salinity') {
    return <SalinityChart data={data} title={title} className={className} />;
  }

  if (type === 'pressure') {
    return <PressureChart data={data} title={title} className={className} />;
  }

  if (type === 'wind') {
    return <WindChart data={data} title={title} className={className} />;
  }

  if (type === 'argo') {
    return <ArgoChart data={data} title={title} />;
  }

  if (type === 'trends') {
    return <TrendsChart data={data} title={title} />;
  }

  if (type === 'conditions') {
    return <ConditionsChart data={data} title={title} />;
  }

  if (type === 'pie') {
    return (
      <div className={`bg-white rounded-lg border p-3 ${className}`}>
        <div className="flex items-center mb-2">
          <Globe className="h-4 w-4 text-indigo-500 mr-2" />
          <h4 className="text-sm font-medium text-gray-700">{title || 'Data Distribution'}</h4>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value}`, name]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'comprehensive') {
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((chartData, index) => (
          <OceanChart
            key={index}
            type={chartData.type}
            data={chartData.data}
            title={chartData.title}
            className=""
          />
        ))}
      </div>
    );
  }

  return null;
};

export default OceanChart;
