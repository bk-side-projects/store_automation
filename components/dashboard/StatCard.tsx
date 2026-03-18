import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  bgColor: string;
  iconColor: string;
}

export default function StatCard({ title, value, icon: Icon, change, bgColor, iconColor }: StatCardProps) {
  return (
    <div className={`relative p-6 rounded-2xl overflow-hidden ${bgColor}`}>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20">
        <Icon className="w-full h-full text-white" />
      </div>
      <div className="relative">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <div className="flex items-center text-sm mt-3">
          <span className={`py-1 px-2.5 rounded-full text-xs font-semibold bg-white/20 text-white`}>
            {change}
          </span>
        </div>
      </div>
    </div>
  );
}
