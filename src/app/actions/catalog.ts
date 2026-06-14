'use server';

import { revalidatePath } from 'next/cache';
import { listCategories, createCategory as dcCreateCategory, createService as dcCreateService } from '@/lib/db';

export async function getCategories() {
  const result = await listCategories();
  return result.data.categories;
}

export async function createCategory(formData: FormData) {
  const name = formData.get('name') as string;
  if (!name) return { success: false, error: 'Name is required' };

  try {
    await dcCreateCategory({ name });
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
    await dcCreateService({
      categoryId,
      name,
      pricingType,
      basePrice: basePriceStr ? parseFloat(basePriceStr) : null,
    });
    revalidatePath('/admin/services');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create service' };
  }
}
