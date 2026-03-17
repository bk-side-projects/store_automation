import { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export default function StatCard({ title, value, icon: Icon, change, changeType, description }: StatCardProps) {
  const isIncrease = changeType === 'increase';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-2">
          <p className="text-base font-semibold text-slate-500">{title}</p>
          <p className="text-4xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${isIncrease ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`h-7 w-7 ${isIncrease ? 'text-green-600' : 'text-red-600'}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <div className={`flex items-center gap-1 font-semibold ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
          {isIncrease ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}</span>
        </div>
        <span className="text-slate-500">{description}</span>
      </div>
    </div>
  );
}
