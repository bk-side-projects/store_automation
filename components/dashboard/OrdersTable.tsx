'use client';

import { Order } from '@/types/order';
import StatusSelector from '@/components/dashboard/StatusSelector';
import OrderActions from '@/components/dashboard/OrderActions';

const CustomerAvatar = ({ name }: { name: string }) => (
    <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold mr-3">
            {name[0]}
        </div>
        <span className="font-semibold text-gray-800 whitespace-nowrap">{name}</span>
    </div>
);

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">고객</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">총액</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">주문일</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">상태</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">더보기</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <CustomerAvatar name={order.customer} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">₩{order.totalPrice.toLocaleString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.orderDate).toLocaleDateString('ko-KR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusSelector orderId={order.id} currentStatus={order.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <OrderActions orderId={order.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
