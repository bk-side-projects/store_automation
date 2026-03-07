import React from 'react';
import { Order } from "@/types/order";

interface PurchaseSummaryProps {
  orders: Order[];
}

interface PurchaseListItem {
  productName: string;
  totalQuantity: number;
  units: Set<string>; // 동일 상품 다른 단위 처리 (예: kg, 마리)
  details: { customerName: string; quantity: number; unit: string }[];
}

export default function PurchaseSummary({ orders }: PurchaseSummaryProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-gray-800 border-gray-700 p-6 rounded-lg shadow-inner text-center">
        <p className="text-gray-400">현재 접수된 주문이 없습니다.</p>
      </div>
    );
  }

  // "주문 취소" 상태가 아닌 주문들만 필터링
  const activeOrders = orders.filter(order => order.status !== '주문 취소');

  const purchaseList = activeOrders.reduce<Record<string, PurchaseListItem>>((acc, order) => {
    order.items.forEach(item => {
      if (!acc[item.name]) {
        acc[item.name] = {
          productName: item.name,
          totalQuantity: 0,
          units: new Set<string>(),
          details: [],
        };
      }
      acc[item.name].totalQuantity += item.quantity;
      acc[item.name].units.add(item.unit);
      acc[item.name].details.push({ 
        customerName: order.customer,
        quantity: item.quantity,
        unit: item.unit
      });
    });
    return acc;
  }, {});

  const purchaseListArray = Object.values(purchaseList);

  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg space-y-4">
        <h3 className="text-lg font-bold text-cyan-400 border-b border-gray-600 pb-2">총 필요 수량</h3>
        {purchaseListArray.length > 0 ? (
            <ul className="space-y-3">
            {purchaseListArray.map(item => (
                <li key={item.productName} className="bg-gray-700 p-3 rounded-md">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-lg">{item.productName}</span>
                    <div className="text-right">
                        <span className="font-bold text-cyan-300 text-xl">{item.totalQuantity}</span>
                        <span className="text-sm text-gray-400 ml-1">{Array.from(item.units).join(', ')}</span>
                    </div>
                </div>
                {/* 세부 주문 내역 (펼치기/접기 기능으로 개선 가능) */}
                {/* <ul className="text-xs text-gray-400 mt-2 pl-2 border-l border-gray-600">
                    {item.details.map((d, i) => (
                        <li key={i}>{d.customerName}: {d.quantity}{d.unit}</li>
                    ))}
                </ul> */}
                </li>
            ))}
            </ul>
        ) : (
             <p className="text-gray-400 text-center py-4">모든 주문이 취소되었거나, 상품이 없습니다.</p>
        )}
    </div>
  );
}
