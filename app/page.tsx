import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import { getSummaryMetrics, getRecentOrders, getSalesData } from '@/lib/data';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default async function DashboardPage() {
  // Fetch data in parallel
  const [summary, recentOrders, salesData] = await Promise.all([
    getSummaryMetrics(),
    getRecentOrders(),
    getSalesData(),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">대시보드</h1>
        {/* You can add a date range picker or other controls here */}
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="총 매출"
          value={`₩${(summary.totalRevenue / 1000000).toFixed(1)}M`} 
          icon={DollarSign} 
          change="+12.5%"
          changeType="increase"
          description="지난 달 대비"
        />
        <StatCard 
          title="총 주문 수"
          value={summary.totalOrders.toLocaleString()}
          icon={ShoppingCart} 
          change="+8.2%" 
          changeType="increase" 
          description="지난 달 대비"
        />
        <StatCard 
          title="총 고객 수"
          value={summary.totalCustomers.toLocaleString()}
          icon={Users} 
          change="-1.2%" 
          changeType="decrease" 
          description="지난 달 대비"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sales Chart (spanning 3 columns) */}
        <div className="lg:col-span-3">
          <SalesChart data={salesData} />
        </div>

        {/* Recent Orders (spanning 2 columns) */}
        <div className="lg:col-span-2">
           <RecentOrdersTable orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}
