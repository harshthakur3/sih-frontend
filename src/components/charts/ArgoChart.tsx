import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ArgoFloatData {
  floatId: string;
  latitude: number;
  longitude: number;
  depth: number;
  temperature: number;
  salinity: number;
  pressure: number;
}

interface ArgoChartProps {
  data: ArgoFloatData[];
  title: string;
}

const ArgoChart: React.FC<ArgoChartProps> = ({ data, title }) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="depth" 
            name="Depth"
            unit="m"
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <YAxis 
            type="number" 
            dataKey="temperature" 
            name="Temperature"
            unit="°C"
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-semibold">{data.floatId}</p>
                    <p>Depth: {data.depth}m</p>
                    <p>Temperature: {data.temperature}°C</p>
                    <p>Salinity: {data.salinity} PSU</p>
                    <p>Pressure: {data.pressure} dbar</p>
                    <p>Location: {data.latitude.toFixed(2)}°N, {data.longitude.toFixed(2)}°W</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter dataKey="temperature" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArgoChart;
