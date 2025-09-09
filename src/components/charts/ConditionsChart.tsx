import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ConditionsData {
  parameter: string;
  value: number;
  unit: string;
  status: string;
}

interface ConditionsChartProps {
  data: ConditionsData[];
  title: string;
}

const ConditionsChart: React.FC<ConditionsChartProps> = ({ data, title }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal': return '#82ca9d';
      case 'moderate': return '#ffc658';
      case 'high': return '#ff7300';
      case 'low': return '#8884d8';
      case 'calm': return '#00ff00';
      default: return '#8884d8';
    }
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="parameter" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{data.parameter}</p>
                    <p>Value: {data.value} {data.unit}</p>
                    <p>Status: <span style={{ color: getStatusColor(data.status) }}>{data.status}</span></p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConditionsChart;
