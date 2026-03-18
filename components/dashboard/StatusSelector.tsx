'use client';

import { useState, useTransition } from 'react';
import { OrderStatus, ORDER_STATUSES } from '@/types/order';
import { updateOrderStatus } from '@/app/dashboard/actions';
import { toast } from 'sonner'; // sonner 라이브러리를 사용하여 토스트 메시지를 표시합니다.

// 상태에 따른 배경색과 텍스트 색상을 반환하는 헬퍼 함수
const getStatusColors = (status: OrderStatus) => {
    switch (status) {
        case '완료': return 'bg-green-100 text-green-800';
        case '배송중': return 'bg-blue-100 text-blue-800';
        case '처리중': return 'bg-yellow-100 text-yellow-800';
        case '접수': return 'bg-gray-100 text-gray-800';
        case '주문 취소': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function StatusSelector({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
    const [isPending, startTransition] = useTransition();

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as OrderStatus;

        startTransition(async () => {
            const result = await updateOrderStatus(orderId, newStatus);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        });
    };

    const selectClasses = `
        pl-3 pr-8 py-1.5 rounded-full text-sm font-semibold 
        appearance-none border-none cursor-pointer transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
        ${getStatusColors(currentStatus)}
        ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    return (
        <div className="relative">
            <select
                value={currentStatus}
                onChange={handleStatusChange}
                disabled={isPending}
                className={selectClasses}
            >
                {ORDER_STATUSES.map(status => (
                    <option key={status} value={status}>{status}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    );
}
