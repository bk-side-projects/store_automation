export const dynamic = 'force-dynamic';

import { getOrders, getOrdersTotalPages } from '@/lib/data';
import OrdersTable from '@/components/dashboard/OrdersTable';
import Search from '@/components/common/Search';
import StatusFilter from '@/components/common/StatusFilter';
import Pagination from '@/components/common/Pagination';
import { addOrder } from '@/app/dashboard/actions';
import { PlusCircle } from 'lucide-react';
import { OrderStatus } from '@/types/order';

export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams?: { 
    query?: string;
    status?: OrderStatus | 'All';
    page?: string;
  }; 
}) {
  const searchQuery = searchParams?.query || '';
  const status = searchParams?.status || 'All';
  const currentPage = Number(searchParams?.page) || 1;

  const [orders, totalPages] = await Promise.all([
    getOrders({ searchQuery, status, currentPage }),
    getOrdersTotalPages({ searchQuery, status })
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">전체 주문</h1>
        <p className="text-gray-500 mt-1">모든 주문 내역을 관리합니다.</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="w-full max-w-md">
          <Search placeholder="고객 이름으로 검색..." />
        </div>
        <form action={addOrder}>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
          >
            <PlusCircle size={20} />
            새 주문 추가
          </button>
        </form>
      </div>

      <div className="mb-4">
        <StatusFilter />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <OrdersTable orders={orders} />
      </div>

      <div className="mt-8">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
