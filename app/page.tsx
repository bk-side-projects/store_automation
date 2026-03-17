import StatCard from '../components/dashboard/StatCard';
import SalesChart from '../components/dashboard/SalesChart';
import RecentOrdersTable from '../components/dashboard/RecentOrdersTable';
import { getSummaryMetrics, getRecentOrders, getSalesData } from '../lib/data';
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
      <h2 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Revenue" 
          value={`$${(summary.totalRevenue / 1000).toFixed(1)}k`} 
          icon={DollarSign} 
          change="+12.5%" 
          changeType="increase" 
        />
        <StatCard 
          title="Total Orders" 
          value={summary.totalOrders.toString()} 
          icon={ShoppingCart} 
          change="+8.2%" 
          changeType="increase" 
        />
        <StatCard 
          title="Total Customers" 
          value={summary.totalCustomers.toString()} 
          icon={Users} 
          change="-1.2%" 
          changeType="decrease" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart (spanning 2 columns) */}
        <div className="lg:col-span-2">
          <SalesChart data={salesData} />
        </div>

        {/* Recent Orders (spanning 1 column) */}
        <div className="lg:col-span-1">
           <RecentOrdersTable orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}
