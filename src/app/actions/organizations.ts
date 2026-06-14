'use server';

import { revalidatePath } from 'next/cache';
import { createOrganization as dcCreateOrganization, updateUserOrganization } from '@/lib/db';

export async function createOrganization(name: string) {
  try {
    await dcCreateOrganization({ name });
    revalidatePath('/admin/organizations');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function linkUserToOrganization(userId: string, organizationId: string) {
  try {
    await updateUserOrganization({
      id: userId,
      organizationId
    });
    revalidatePath('/admin/organizations');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
