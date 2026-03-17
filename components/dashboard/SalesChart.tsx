'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  data: { name: string; sales: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-80">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Analytics</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
                <YAxis tick={{ fill: '#6B7280' }} />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                    }}
                />
                <Legend wrapperStyle={{ color: '#4B5563' }} />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
}
