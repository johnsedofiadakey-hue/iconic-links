'use server';

import { revalidatePath } from 'next/cache';
import { updateOrderStatus as dcUpdateOrderStatus, logAudit } from '@/lib/db';

export async function updateOrderStatus(orderId: string, newStatus: string, userId: string) {
  try {
    await dcUpdateOrderStatus({
      id: orderId,
      status: newStatus
    });

    await logAudit({
      action: 'ORDER_STATUS_UPDATED',
      userId: userId,
      orderId: orderId,
      newValue: { status: newStatus }
    });

    revalidatePath(`/worker/job/${orderId}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
