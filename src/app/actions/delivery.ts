'use server';

import { revalidatePath } from 'next/cache';
import { createDeliverySchema } from '@/lib/validations';
import { DELIVERY_STATUS, ORDER_STATUS } from '@/lib/constants';
import { createDelivery as dcCreateDelivery, updateDelivery as dcUpdateDelivery, updateOrderStatus, getDelivery } from '@/lib/db';

export async function createDelivery(orderId: string, address: string) {
  try {
    const validatedData = createDeliverySchema.parse({ orderId, address });
    const deliveryResult = await dcCreateDelivery({
      orderId: validatedData.orderId,
      address: validatedData.address,
      status: DELIVERY_STATUS.PENDING
    });

    await updateOrderStatus({
      id: validatedData.orderId,
      status: ORDER_STATUS.OUT_FOR_DELIVERY
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/delivery');
    revalidatePath(`/admin/orders/${validatedData.orderId}`);
    return { success: true, delivery: { id: deliveryResult.data.delivery_insert.id, orderId: validatedData.orderId, address: validatedData.address, status: DELIVERY_STATUS.PENDING } };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function assignDriver(deliveryId: string, driverId: string) {
  try {
    await dcUpdateDelivery({
      id: deliveryId,
      driverId,
      status: DELIVERY_STATUS.DISPATCHED
    });
    revalidatePath('/admin/delivery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markDelivered(deliveryId: string) {
  try {
    await dcUpdateDelivery({
      id: deliveryId,
      status: DELIVERY_STATUS.DELIVERED
    });

    const deliveryResult = await getDelivery({ id: deliveryId });
    const orderId = deliveryResult.data.delivery?.orderId;
    if (orderId) {
      await updateOrderStatus({
        id: orderId,
        status: ORDER_STATUS.COMPLETED
      });
    }

    revalidatePath('/admin/delivery');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
