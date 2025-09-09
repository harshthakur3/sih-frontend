import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrendsData {
  month: string;
  temperature: number;
  salinity: number;
  pressure: number;
}

interface TrendsChartProps {
  data: TrendsData[];
  title: string;
}

const TrendsChart: React.FC<TrendsChartProps> = ({ data, title }) => {
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            dataKey="month" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{label}</p>
                    {payload.map((entry, index) => (
                      <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value} {entry.name === 'temperature' ? '°C' : entry.name === 'salinity' ? 'PSU' : 'hPa'}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="temperature" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="Temperature (°C)"
            dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="salinity" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="Salinity (PSU)"
            dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="pressure" 
            stroke="#ffc658" 
            strokeWidth={2}
            name="Pressure (hPa)"
            dot={{ fill: '#ffc658', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
