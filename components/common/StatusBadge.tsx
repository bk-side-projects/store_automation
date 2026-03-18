'use client';

import { OrderStatus } from '@/types/order';

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles: { [key in OrderStatus]: string } = {
    '접수': 'bg-blue-100 text-blue-700',
    '처리중': 'bg-orange-100 text-orange-700',
    '배송중': 'bg-purple-100 text-purple-700',
    '완료': 'bg-green-100 text-green-700',
    '주문 취소': 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap ${statusStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}
