'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createOrganization(name: string) {
  try {
    await prisma.organization.create({ data: { name } });
    revalidatePath('/admin/organizations');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function linkUserToOrganization(userId: string, organizationId: string) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { organizationId }
    });
    revalidatePath('/admin/organizations');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
