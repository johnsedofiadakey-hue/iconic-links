'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
  return await prisma.category.findMany({
    include: { services: true }
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return { success: false, error: 'Name is required' };

  try {
    await prisma.category.create({
      data: { name }
    });
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create category' };
  }
}

export async function createService(formData: FormData) {
  const name = formData.get('name') as string;
  const categoryId = formData.get('categoryId') as string;
  const pricingType = formData.get('pricingType') as 'INSTANT' | 'QUOTE_REQUIRED';
  const basePriceStr = formData.get('basePrice') as string;

  if (!name || !categoryId || !pricingType) return { success: false, error: 'Missing required fields' };

  try {
    await prisma.service.create({
      data: {
        name,
        categoryId,
        pricingType,
        basePrice: basePriceStr ? parseFloat(basePriceStr) : null,
      }
    });
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create service' };
  }
}
