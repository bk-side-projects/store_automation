'use server'

import { revalidatePath } from 'next/cache'
import { collection, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client'; // 클라이언트 SDK 인스턴스 사용
import { Order } from '@/types/order';

// 주문 추가
export async function addOrder(newOrder: Omit<Order, 'id' | 'orderDate'>) {
  try {
    const ordersCollection = collection(db, 'orders');
    await addDoc(ordersCollection, {
      ...newOrder,
      orderDate: serverTimestamp() // 서버 타임스탬프 사용
    });

    // 데이터 변경 후 대시보드와 주문 목록 페이지 캐시를 초기화합니다.
    revalidatePath('/')
    revalidatePath('/orders')

    return { success: true, message: '주문이 성공적으로 추가되었습니다.' };

  } catch (error) {
    console.error("Error adding order: ", error);
    return { success: false, message: '주문 추가 중 오류가 발생했습니다.' };
  }
}

// 주문 삭제
export async function deleteOrder(orderId: string) {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    await deleteDoc(orderDoc);

    revalidatePath('/')
    revalidatePath('/orders')

    return { success: true, message: '주문이 성공적으로 삭제되었습니다.' };

  } catch (error) {
    console.error("Error deleting order: ", error);
    return { success: false, message: '주문 삭제 중 오류가 발생했습니다.' };
  }
}
