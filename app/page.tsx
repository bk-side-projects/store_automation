export const dynamic = 'force-dynamic';

import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import RecentOrdersTable from '@/components/dashboard/RecentOrdersTable';
import { getSummaryMetrics, getRecentOrders, getSalesData } from '@/lib/data';
import { DollarSign, ShoppingCart, Users } from 'lucide-react';

export default async function DashboardPage() {
  // Fetch data in parallel
  const [summary, recentOrders, salesData] = await Promise.all([
    getSummaryMetrics(),
    getRecentOrders(),
    getSalesData(),
  ]);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">종합 대시보드</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="총 매출"
          value={`₩${(summary.totalRevenue / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          change="+12.5%"
          bgColor="bg-gradient-to-br from-blue-500 to-blue-700"
          iconColor="text-blue-200"
        />
        <StatCard 
          title="총 주문 수"
          value={summary.totalOrders.toLocaleString()}
          icon={ShoppingCart} 
          change="+8.2%" 
          bgColor="bg-gradient-to-br from-orange-400 to-orange-600"
          iconColor="text-orange-100"
        />
        <StatCard 
          title="총 고객 수"
          value={summary.totalCustomers.toLocaleString()}
          icon={Users} 
          change="-1.2%" 
          bgColor="bg-gradient-to-br from-green-500 to-green-700"
          iconColor="text-green-200"
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
