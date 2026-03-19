import { collection, query, where, orderBy, limit, startAfter, getDocs,getCountFromServer, QueryConstraint, DocumentData, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client'; // 클라이언트 SDK용 db 인스턴스를 가져옵니다.
import { Order, OrderStatus } from '@/types/order';

const ITEMS_PER_PAGE = 10;

// 쿼리 제약 조건 생성 헬퍼 (클라이언트 SDK에 맞게 수정)
function createQueryConstraints(searchQuery?: string, status?: OrderStatus | 'All' | ''): QueryConstraint[] {
    const constraints: QueryConstraint[] = [];
    if (status && status !== 'All') {
        constraints.push(where('status', '==', status));
    }
    if (searchQuery) {
        constraints.push(orderBy('customer'));
        constraints.push(where('customer', '>=', searchQuery));
        constraints.push(where('customer', '<=', searchQuery + '\uf8ff'));
    } else {
        constraints.push(orderBy('orderDate', 'desc'));
    }
    return constraints;
}

// 총 페이지 수 계산 (클라이언트 SDK 사용)
export async function getOrdersTotalPages({ searchQuery = '', status = '' }: { searchQuery?: string; status?: OrderStatus | 'All' | '' }): Promise<number> {
    const ordersCollection = collection(db, 'orders');
    const constraints = createQueryConstraints(searchQuery, status);
    const q = query(ordersCollection, ...constraints);
    const snapshot = await getCountFromServer(q);
    const totalCount = snapshot.data().count;
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
}

// 특정 페이지의 주문 데이터 가져오기 (클라이언트 SDK 사용)
export async function getOrders({ searchQuery = '', status = '', currentPage = 1 }: { searchQuery?: string; status?: OrderStatus | 'All' | '' ; currentPage?: number }): Promise<Order[]> {
    const ordersCollection = collection(db, 'orders');
    const constraints = createQueryConstraints(searchQuery, status);

    if (currentPage > 1) {
        const previousPageLimit = (currentPage - 1) * ITEMS_PER_PAGE;
        const previousDocsQuery = query(ordersCollection, ...constraints, limit(previousPageLimit));
        const previousDocsSnapshot = await getDocs(previousDocsQuery);
        const lastVisible = previousDocsSnapshot.docs[previousDocsSnapshot.docs.length - 1];
        if (lastVisible) {
            constraints.push(startAfter(lastVisible));
        }
    }

    constraints.push(limit(ITEMS_PER_PAGE));
    const finalQuery = query(ordersCollection, ...constraints);

    const querySnapshot = await getDocs(finalQuery);
    return querySnapshot.docs.map(doc => {
        const data = doc.data() as DocumentData;
        // Firestore Timestamp를 JavaScript Date 객체로 변환
        if (data.orderDate && data.orderDate instanceof Timestamp) {
            data.orderDate = data.orderDate.toDate();
        }
        return { id: doc.id, ...data } as Order;
    });
}


// 모든 주문 데이터를 가져오는 내부 함수 (클라이언트 SDK 사용)
async function _fetchAllOrders(): Promise<Order[]> {
  const ordersCollection = collection(db, 'orders');
  const q = query(ordersCollection, orderBy('orderDate', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    // Firestore Timestamp를 JavaScript Date 객체로 변환하고, 항상 유효한 Date 객체인지 확인
    if (data.orderDate) {
        if (data.orderDate instanceof Timestamp) {
            data.orderDate = data.orderDate.toDate();
        } else {
            // 이미 문자열 등으로 변환된 경우를 대비하여 Date 객체로 다시 생성
            data.orderDate = new Date(data.orderDate);
        }
    }
    return { id: doc.id, ...data } as Order;
  });
}

// 대시보드 요약 지표 가져오기
export async function getSummaryMetrics() {
  const allOrders = await _fetchAllOrders();
  const validOrders = allOrders.filter(o => o.status !== '주문 취소');
  const totalRevenue = validOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = validOrders.length;
  const totalCustomers = new Set(validOrders.map(o => o.customer)).size;
  return { totalRevenue, totalOrders, totalCustomers };
}

// 최근 5개 주문 가져오기
export async function getRecentOrders(): Promise<Order[]> {
  const ordersCollection = collection(db, 'orders');
  const q = query(ordersCollection, orderBy('orderDate', 'desc'), limit(5));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    if (data.orderDate) {
        if (data.orderDate instanceof Timestamp) {
            data.orderDate = data.orderDate.toDate();
        } else {
            data.orderDate = new Date(data.orderDate);
        }
    }
    return { id: doc.id, ...data } as Order;
  });
}

// 월별 매출 데이터 가져오기
export async function getSalesData() {
    const allOrders = await _fetchAllOrders();
    const validOrders = allOrders.filter(o => o.status !== '주문 취소');
    const salesByMonth: { [key: string]: number } = {};
  
    validOrders.forEach(order => {
      // 런타임 시점에도 안전하도록 new Date()로 한번 더 감싸줍니다.
      const orderDate = new Date(order.orderDate);
      const month = orderDate.toLocaleString('ko-KR', { month: 'long' });
      salesByMonth[month] = (salesByMonth[month] || 0) + order.totalPrice;
    });
  
    const salesData = Object.entries(salesByMonth).map(([name, sales]) => ({ name, sales }));
    const monthOrder = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    salesData.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
  
    return salesData;
}
