import { Order } from '@/types/order';
import StatusBadge from '@/components/common/StatusBadge';
import { MoreVertical } from 'lucide-react';

const CustomerAvatar = ({ name }: { name: string }) => (
    <div className="flex items-center">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-500 font-bold mr-3">
            {name[0]}
        </div>
        <span className="font-semibold text-gray-800 whitespace-nowrap">{name}</span>
    </div>
);

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">최근 주문</h3>
        <button className="text-sm font-semibold text-blue-600 hover:underline">전체 보기</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4">
                  <CustomerAvatar name={order.customer} />
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="font-bold text-gray-800">₩{order.totalPrice.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-right">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
