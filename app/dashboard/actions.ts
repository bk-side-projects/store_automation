'use server';

import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { revalidatePath } from 'next/cache';
import { Order, OrderStatus } from '@/types/order';

// Firestore에 새로운 주문을 추가하는 서버 액션
export async function addOrder(formData: FormData) {
  try {
    const newOrderData: Omit<Order, 'id'> = {
      customer: '새로운 고객',
      orderDate: new Date().toISOString(),
      items: [{ name: '고등어', quantity: 10, unit: 'kg' }],
      totalPrice: 120000,
      status: '접수',
      terminal: '인천공항',
      boxCount: 2,
      isCombined: false,
    };

    const docRef = await addDoc(collection(db, 'orders'), newOrderData);
    console.log('새로운 주문이 추가되었습니다. Document ID: ', docRef.id);
    revalidatePath('/dashboard');

  } catch (error) {
    console.error('주문 추가 중 오류 발생:', error);
  }
}

// Firestore에서 주문 상태를 업데이트하는 서버 액션
export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: status
    });

    console.log(`주문(ID: ${orderId}) 상태가 ${status}(으)로 업데이트되었습니다.`);
    revalidatePath('/dashboard');
    return { success: true, message: '주문 상태가 성공적으로 업데이트되었습니다.' };

  } catch (error) {
    console.error('주문 상태 업데이트 중 오류 발생:', error);
    return { success: false, message: '주문 상태 업데이트에 실패했습니다.' };
  }
}

// Firestore에서 주문을 삭제하는 서버 액션
export async function deleteOrder(orderId: string) {
  try {
    await deleteDoc(doc(db, 'orders', orderId));

    console.log(`주문(ID: ${orderId})이 삭제되었습니다.`);
    revalidatePath('/dashboard');
    return { success: true, message: '주문이 성공적으로 삭제되었습니다.' };

  } catch (error) {
    console.error('주문 삭제 중 오류 발생:', error);
    return { success: false, message: '주문 삭제에 실패했습니다.' };
  }
}
