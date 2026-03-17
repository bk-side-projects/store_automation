import { Order } from '@/types';
import { MoreVertical } from 'lucide-react';

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const baseClasses = "px-3 py-1.5 rounded-full text-xs font-bold tracking-wider";
  const statusInfo = {
    Pending: { text: "대기중", classes: "bg-yellow-100 text-yellow-800 border border-yellow-200" },
    Processing: { text: "처리중", classes: "bg-blue-100 text-blue-800 border border-blue-200" },
    Shipped: { text: "배송됨", classes: "bg-purple-100 text-purple-800 border border-purple-200" },
    Delivered: { text: "완료됨", classes: "bg-green-100 text-green-800 border border-green-200" },
  };
  
  const { text, classes } = statusInfo[status];

  return (
    <span className={`${baseClasses} ${classes}`}>
      {text}
    </span>
  );
};

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">최근 주문</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">주문 ID</th>
              <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">고객명</th>
              <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">금액</th>
              <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-slate-500 uppercase tracking-wider">상태</th>
              <th scope="col" className="px-5 py-4 text-right text-sm font-bold text-slate-500 uppercase tracking-wider">옵션</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-5 py-5 whitespace-nowrap text-sm font-semibold text-slate-700">#{order.id.substring(0, 8)}...</td>
                <td className="px-5 py-5 whitespace-nowrap text-sm text-slate-600 font-medium">{order.customerName}</td>
                <td className="px-5 py-5 whitespace-nowrap text-sm text-slate-800 font-bold">₩{order.amount.toLocaleString()}</td>
                <td className="px-5 py-5 whitespace-nowrap text-sm">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-5 py-5 whitespace-nowrap text-sm text-right">
                    <button className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
                        <MoreVertical size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
