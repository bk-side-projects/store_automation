import { Order } from '@/types';

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold";
  const statusClasses = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
