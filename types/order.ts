export interface OrderItem {
  name: string; // 상품명
  quantity: number;    // 수량
  unit: string; // 단위 (kg, 관 등)
}

export type OrderStatus = 
  | '접수' 
  | '준비중' 
  | '출고' 
  | '완료'
  | '주문 취소';

export interface Order {
  id: string;                    // 주문 고유 ID
  customer: string;          // 주문자명
  orderDate: string;                // 주문일 (YYYY-MM-DD HH:MM:SS)
  items: OrderItem[];            // 주문 상품 목록
  totalPrice: number;            // 총 주문 금액
  status: OrderStatus;           // 주문 상태
  terminal: string;           // 터미널
  boxCount: number;
  isCombined: boolean;
  notes?: string;                 // 특이사항 (선택)
}
