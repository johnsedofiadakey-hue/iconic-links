'use server';

import { revalidatePath } from 'next/cache';
import { addInventoryItemSchema, logConsumptionSchema } from '@/lib/validations';
import { createInventoryItem, logMaterialConsumption, getInventoryItem, updateInventoryQuantity } from '@/lib/db';

export async function addInventoryItem(name: string, unitType: string, initialQuantity: number) {
  try {
    const validatedData = addInventoryItemSchema.parse({ name, unitType, initialQuantity });
    await createInventoryItem({
      name: validatedData.name,
      unitType: validatedData.unitType,
      quantity: validatedData.initialQuantity
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

    // In Data Connect we do not have an atomic decrement via auto-generated mutations yet, so we read, calculate, and write.
    const inventoryResult = await getInventoryItem({ id: validatedData.inventoryItemId });
    const currentItem = inventoryResult.data.inventoryItem;
    if (!currentItem) {
      throw new Error('Inventory item not found');
    }

    const totalDeduction = validatedData.quantityUsed + validatedData.wastage;
    const newQuantity = currentItem.quantity - totalDeduction;

    // Log the consumption
    await logMaterialConsumption({
      inventoryItemId: validatedData.inventoryItemId,
      orderId: validatedData.orderId,
      quantityUsed: validatedData.quantityUsed,
      wastage: validatedData.wastage,
    });

    // Update the inventory
    await updateInventoryQuantity({
      id: validatedData.inventoryItemId,
      quantity: newQuantity
    });

    revalidatePath(`/worker/job/${validatedData.orderId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
