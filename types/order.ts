export interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
}

export type OrderStatus = 
  | '접수' 
  | '처리중' 
  | '배송중' 
  | '완료'
  | '주문 취소';

export const ORDER_STATUSES: OrderStatus[] = ['접수', '처리중', '배송중', '완료', '주문 취소'];

export interface Order {
  id: string;
  customer: string;
  orderDate: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  terminal: string;
  boxCount: number;
  isCombined: boolean;
  notes?: string;
}
