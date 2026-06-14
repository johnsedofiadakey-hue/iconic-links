'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function uploadProof(orderId: string, fileUrl: string) {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { proofs: true } });
    if (!order) throw new Error('Order not found');

    const nextVersion = order.proofs.length + 1;

    await prisma.proof.create({
      data: {
        orderId,
        fileUrl,
        version: nextVersion,
        status: 'PENDING'
      }
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'AWAITING_APPROVAL' }
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
    const proof = await prisma.proof.update({
      where: { id: proofId },
      data: { status: 'APPROVED', approvedBy: userId }
    });

    await prisma.order.update({
      where: { id: proof.orderId },
      data: { status: 'PRINTING' } // Moves to printing after approval
    });

    revalidatePath('/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function rejectProof(proofId: string, comments: string) {
  try {
    const proof = await prisma.proof.update({
      where: { id: proofId },
      data: { status: 'REJECTED', comments }
    });

    await prisma.order.update({
      where: { id: proof.orderId },
      data: { status: 'DESIGN_IN_PROGRESS' } // Send back to design
    });

    revalidatePath('/dashboard');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
