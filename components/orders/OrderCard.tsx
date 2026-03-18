import React from 'react';
import { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderCardProps {
  order: Order;
  inventory: Record<string, number>; // 재고 데이터 prop 추가
}

// 주문 상태에 따른 뱃지 스타일 반환
const getStatusBadgeVariant = (status: Order['status']) => {
  switch (status) {
    case '접수':
      return 'default';
    case '처리중':
      return 'secondary';
    case '배송중':
      return 'destructive';
    case '완료':
      return 'outline';
    case '주문 취소':
      return 'destructive';
    default:
      return 'default';
  }
};

export const OrderCard = ({ order, inventory }: OrderCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{order.customer}</span>
          <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
        </CardTitle>
        <p className="text-sm text-gray-500">{order.terminal}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h4 className="font-semibold">상품 내역</h4>
          <ul className="list-none text-sm space-y-1">
            {order.items.map((item, index) => {
              const stock = inventory[item.name] || 0;
              const hasStock = stock >= item.quantity;
              const stockStatus = stock === 0 ? '재고 없음' : `재고 부족 (${stock}/${item.quantity})`;

              return (
                <li key={index} className={`flex justify-between items-center ${!hasStock ? 'text-gray-400' : ''}`}>
                  <span>
                    {item.name} - {item.quantity}
                    {item.unit}
                  </span>
                  {!hasStock && (
                    <Badge variant="destructive" className="text-xs">
                      {stockStatus}
                    </Badge>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <span>박스: {order.boxCount}개</span>
            {order.isCombined && <Badge variant="secondary">합포장</Badge>}
          </div>
          {order.notes && (
            <p className="text-red-500 font-semibold">* {order.notes}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
