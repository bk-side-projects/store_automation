'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  data: { name: string; sales: number }[];
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/80 backdrop-blur-sm text-white p-4 rounded-xl shadow-lg border border-slate-700">
        <p className="font-bold text-lg">{`${label}월`}</p>
        <p className="text-sky-400 text-base">{`매출: ₩${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full min-h-[400px]">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">월별 매출 분석</h3>
        <ResponsiveContainer width="100%" height="90%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748b' }} 
                  axisLine={{ stroke: '#cbd5e1' }} 
                  tickLine={false}
                  dy={10}
                  tickFormatter={(value) => `${value}월`}
                />
                <YAxis 
                  tick={{ fill: '#64748b' }} 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `₩${Number(value) / 1000000}M`}
                />
                <Tooltip 
                  cursor={{ stroke: '#0ea5e9', strokeWidth: 2, strokeDasharray: '5 5' }}
                  content={<CustomTooltip />}
                />
                <Legend 
                    wrapperStyle={{ paddingTop: '20px' }} 
                    formatter={(value) => <span className="text-slate-600 font-semibold">{value}</span>}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  name="월 매출"
                  stroke="#0ea5e9" 
                  strokeWidth={4} 
                  dot={false}
                  activeDot={{ 
                    r: 8, 
                    stroke: '#fff', 
                    strokeWidth: 2, 
                    fill: '#0ea5e9'
                  }}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
