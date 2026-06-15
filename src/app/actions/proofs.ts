'use server';

import { revalidatePath } from 'next/cache';
import { getOrderProofs, createProof as dcCreateProof, updateProof as dcUpdateProof, updateOrderStatus, getProof, logAudit } from '@/lib/db';

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

    await logAudit({
      action: 'PROOF_UPLOADED',
      userId: 'SYSTEM', // Or pass the staff userId if available
      orderId: orderId,
      newValue: { status: 'AWAITING_APPROVAL', proofUrl: fileUrl },
      notes: `Proof v${nextVersion} uploaded`
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

      await logAudit({
        action: 'PROOF_APPROVED',
        userId: userId,
        orderId: orderId,
        newValue: { status: 'PRINTING', proofId: proofId }
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

      await logAudit({
        action: 'PROOF_REJECTED',
        userId: 'CUSTOMER', // Typically customer rejects, though we should pass actual userId
        orderId: orderId,
        newValue: { status: 'DESIGN_IN_PROGRESS', proofId: proofId },
        notes: `Rejected with comments: ${comments}`
      });
    }

    revalidatePath('/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
