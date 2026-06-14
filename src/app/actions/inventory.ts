'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { addInventoryItemSchema, logConsumptionSchema } from '@/lib/validations';

export async function addInventoryItem(name: string, unitType: string, initialQuantity: number) {
  try {
    const validatedData = addInventoryItemSchema.parse({ name, unitType, initialQuantity });
    await prisma.inventoryItem.create({
      data: {
        name: validatedData.name,
        unitType: validatedData.unitType,
        quantity: validatedData.initialQuantity
      }
    });
    revalidatePath('/admin/inventory');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logConsumption(orderId: string, inventoryItemId: string, quantityUsed: number, wastage: number, workerId: string) {
  try {
    const validatedData = logConsumptionSchema.parse({ orderId, inventoryItemId, quantityUsed, wastage, workerId });

    // Start a transaction: Record consumption and deduct stock
    await prisma.$transaction(async (tx) => {
      await tx.materialConsumption.create({
        data: {
          inventoryItemId: validatedData.inventoryItemId,
          orderId: validatedData.orderId,
          quantityUsed: validatedData.quantityUsed,
          wastage: validatedData.wastage,
          workerId: validatedData.workerId
        }
      });

      const totalDeduction = validatedData.quantityUsed + validatedData.wastage;

      await tx.inventoryItem.update({
        where: { id: validatedData.inventoryItemId },
        data: { quantity: { decrement: totalDeduction } }
      });
    });

    revalidatePath(`/worker/job/${validatedData.orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
