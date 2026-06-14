'use server';

import { revalidatePath } from 'next/cache';
import { getOrderProofs, createProof as dcCreateProof, updateProof as dcUpdateProof, updateOrderStatus, getProof } from '@/lib/db';

export async function uploadProof(orderId: string, fileUrl: string) {
  try {
    const orderResult = await getOrderProofs({ id: orderId });
    const order = orderResult.data.order;
    if (!order) throw new Error('Order not found');

    const nextVersion = (order.proofs_on_order?.length || 0) + 1;

    await dcCreateProof({
      orderId,
      fileUrl,
      version: nextVersion,
      status: 'PENDING'
    });

    await updateOrderStatus({
      id: orderId,
      status: 'AWAITING_APPROVAL'
    });

    revalidatePath('/admin/dashboard');
    revalidatePath(`/dashboard`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function approveProof(proofId: string, userId: string) {
  try {
    await dcUpdateProof({
      id: proofId,
      status: 'APPROVED',
      approvedBy: userId
    });

    const proofResult = await getProof({ id: proofId });
    const orderId = proofResult.data.proof?.orderId;
    
    if (orderId) {
      await updateOrderStatus({
        id: orderId,
        status: 'PRINTING' // Moves to printing after approval
      });
    }

    revalidatePath('/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectProof(proofId: string, comments: string) {
  try {
    await dcUpdateProof({
      id: proofId,
      status: 'REJECTED',
      comments
    });

    const proofResult = await getProof({ id: proofId });
    const orderId = proofResult.data.proof?.orderId;

    if (orderId) {
      await updateOrderStatus({
        id: orderId,
        status: 'DESIGN_IN_PROGRESS' // Send back to design
      });
    }

    revalidatePath('/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
