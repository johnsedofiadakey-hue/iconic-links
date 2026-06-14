'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createDeliverySchema } from '@/lib/validations';
import { DELIVERY_STATUS, ORDER_STATUS } from '@/lib/constants';

export async function createDelivery(orderId: string, address: string) {
  try {
    const validatedData = createDeliverySchema.parse({ orderId, address });
    const delivery = await prisma.delivery.create({
      data: {
        orderId: validatedData.orderId,
        address: validatedData.address,
        status: DELIVERY_STATUS.PENDING
      }
    });

    await prisma.order.update({
      where: { id: validatedData.orderId },
      data: { status: ORDER_STATUS.OUT_FOR_DELIVERY }
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/delivery');
    revalidatePath(`/admin/orders/${validatedData.orderId}`);
    return { success: true, delivery };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function assignDriver(deliveryId: string, driverId: string) {
  try {
    await prisma.delivery.update({
      where: { id: deliveryId },
      data: { driverId, status: DELIVERY_STATUS.DISPATCHED }
    });
    revalidatePath('/admin/delivery');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markDelivered(deliveryId: string) {
  try {
    const delivery = await prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: DELIVERY_STATUS.DELIVERED }
    });

    await prisma.order.update({
      where: { id: delivery.orderId },
      data: { status: ORDER_STATUS.COMPLETED }
    });

    revalidatePath('/admin/delivery');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
