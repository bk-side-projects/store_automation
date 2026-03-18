'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SalesChartProps {
  data: { name: string; sales: number }[];
}

// Custom Tooltip for Chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">{`${label}월`}</p>
        <p className="text-base font-bold text-blue-600">{`₩${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">월별 매출</h3>
      <div style={{ width: '100%', height: '350px' }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}월`}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₩${Number(value) / 1000000}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
