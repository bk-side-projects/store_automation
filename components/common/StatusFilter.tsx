'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { OrderStatus, ORDER_STATUSES } from '@/types/order';
import clsx from 'clsx';

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentStatus = searchParams.get('status');

  const handleFilter = (status: OrderStatus | 'All') => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // 필터 변경 시 첫 페이지로 이동

    if (status && status !== 'All') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const statuses: (OrderStatus | 'All')[] = ['All', ...ORDER_STATUSES];

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {statuses.map((status) => {
        const isActive = (currentStatus === null && status === 'All') || currentStatus === status;
        return (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={clsx(
              'px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap',
              {
                'bg-blue-600 text-white shadow-md': isActive,
                'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200': !isActive,
              }
            )}
          >
            {status === 'All' ? '전체' : status}
          </button>
        );
      })}
    </div>
  );
}
