'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleArrowClick = (direction: 'left' | 'right') => {
    const newPage = direction === 'left' ? currentPage - 1 : currentPage + 1;
    if (newPage >= 1 && newPage <= totalPages) {
        replace(createPageURL(newPage));
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
        <button 
            onClick={() => handleArrowClick('left')}
            disabled={currentPage <= 1}
            className={clsx('p-2 rounded-full transition-colors', {
                'hover:bg-gray-200': currentPage > 1,
                'text-gray-300 cursor-not-allowed': currentPage <= 1
            })}
        >
            <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-1">
            {allPages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => replace(createPageURL(page))}
                    className={clsx('px-4 py-2 rounded-full text-sm font-medium transition-colors', {
                        'bg-blue-600 text-white shadow-md': page === currentPage,
                        'bg-white text-gray-600 hover:bg-gray-100': page !== currentPage
                    })}
                >
                    {page}
                </button>
            ))}
        </div>

        <button 
            onClick={() => handleArrowClick('right')}
            disabled={currentPage >= totalPages}
            className={clsx('p-2 rounded-full transition-colors', {
                'hover:bg-gray-200': currentPage < totalPages,
                'text-gray-300 cursor-not-allowed': currentPage >= totalPages
            })}
        >
            <ChevronRight className="h-5 w-5" />
        </button>
    </div>
  );
}
