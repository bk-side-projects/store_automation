import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
}

export default function StatCard({ title, value, icon: Icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
      <div className="bg-blue-100 p-4 rounded-full">
        <Icon className="h-7 w-7 text-blue-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <div className="text-xs text-gray-500 mt-1">
          <span className={`font-semibold ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
          <span> vs. previous day</span>
        </div>
      </div>
    </div>
  );
}
