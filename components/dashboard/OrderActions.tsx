'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { deleteOrder } from '@/app/dashboard/actions';
import { toast } from 'sonner';

export default function OrderActions({ orderId }: { orderId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지를 위한 useEffect
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const handleDelete = () => {
        if (confirm('정말로 이 주문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            startTransition(async () => {
                const result = await deleteOrder(orderId);
                if (result.success) {
                    toast.success(result.message);
                    setIsOpen(false);
                } else {
                    toast.error(result.message);
                }
            });
        }
    };

    // 수정 기능은 추후 구현을 위해 placeholder로 둡니다.
    const handleEdit = () => {
        toast.info('주문 수정 기능은 현재 준비 중입니다.');
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical size={20} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-10 border">
                    <button 
                        onClick={handleEdit}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-t-lg"
                    >
                        <Edit size={16} className="mr-2" />
                        수정
                    </button>
                    <button 
                        onClick={handleDelete}
                        disabled={isPending}
                        className={`flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800 rounded-b-lg ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <Trash2 size={16} className="mr-2" />
                        {isPending ? '삭제 중...' : '삭제'}
                    </button>
                </div>
            )}
        </div>
    );
}
