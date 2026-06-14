'use server';

import { revalidatePath } from 'next/cache';
import { updateOrderStatus as dcUpdateOrderStatus } from '@/lib/db';

export async function updateOrderStatus(orderId: string, newStatus: string, userId: string) {
  try {
    await dcUpdateOrderStatus({
      id: orderId,
      status: newStatus
    });

    revalidatePath(`/worker/job/${orderId}`);
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
