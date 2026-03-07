import React from 'react';
import { OrderCard } from '@/components/orders/OrderCard';
import { Order } from '@/types/order';

// --- 임시 데이터 --- //

// 1. 상품별 현재 재고 데이터
const mockInventory: Record<string, number> = {
  활전복: 5,
  해삼: 10,
  멍게: 20,
  가리비: 15,
  키조개: 0, // 재고 없음
  소라: 10,
};

// 2. 터미널별 버스 출발 시간 (HH:MM 형식)
const terminalDepartureTimes: Record<string, string> = {
  남부터미널: '09:30',
  동서울터미널: '11:00',
  센트럴시티: '10:00',
};

// 3. 주문 데이터
const mockOrders: Order[] = [
  {
    id: '1',
    orderDate: new Date().toISOString(),
    totalPrice: 150000,
    status: '준비중',
    terminal: '남부터미널',
    customer: '강남수산',
    items: [
      { name: '활전복', quantity: 10, unit: 'kg' }, // 재고 부족
      { name: '해삼', quantity: 5, unit: 'kg' }, // 재고 있음
    ],
    boxCount: 2,
    isCombined: false,
    notes: '전복 큰 놈으로',
  },
  {
    id: '2',
    orderDate: new Date().toISOString(),
    totalPrice: 200000,
    status: '접수',
    terminal: '동서울터미널',
    customer: '싱싱수산',
    items: [{ name: '멍게', quantity: 15, unit: 'kg' }], // 재고 있음
    boxCount: 1,
    isCombined: true,
    notes: '합포장',
  },
  {
    id: '3',
    orderDate: new Date().toISOString(),
    totalPrice: 320000,
    status: '준비중',
    terminal: '센트럴시티',
    customer: '우리수산',
    items: [
      { name: '가리비', quantity: 20, unit: 'kg' }, // 재고 부족
      { name: '키조개', quantity: 10, unit: '관' }, // 재고 없음
    ],
    boxCount: 3,
    isCombined: false,
    notes: '가리비 껍질 제거',
  },
  {
    id: '4',
    orderDate: new Date().toISOString(),
    totalPrice: 80000,
    status: '접수',
    terminal: '남부터미널', // 출발 시간 가장 빠름
    customer: '대박수산',
    items: [{ name: '소라', quantity: 10, unit: 'kg' }], // 재고 있음
    boxCount: 1,
    isCombined: false,
    notes: '',
  },
];

// --- 로직: 주문을 버스 출발 시간에 따라 정렬 --- //
const getSortedOrders = (orders: Order[]) => {
  return orders.sort((a, b) => {
    const timeA = terminalDepartureTimes[a.terminal];
    const timeB = terminalDepartureTimes[b.terminal];
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
    return 0;
  });
};

export default function Home() {
  const sortedOrders = getSortedOrders(mockOrders);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">포장 우선순위</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} inventory={mockInventory} />
        ))}
      </div>
    </main>
  );
}
