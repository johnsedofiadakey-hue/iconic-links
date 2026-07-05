'use server';

import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { updateUserRole as dbUpdateUserRole } from '@/lib/dataconnect';
import { hasPermission } from '@/lib/rbac';
import { getUserByIdentifier } from '@/lib/db';

async function requireSuperAdmin() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  if (!sessionCookie) throw new Error('Unauthorized');

  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
  const identifier = decodedClaims.email || decodedClaims.phone_number;
  if (!identifier) throw new Error('Unauthorized');

  const userResult = await getUserByIdentifier({ identifier });
  const adminUser = userResult.data.users[0];

  if (!adminUser || !hasPermission(adminUser.role, 'ORGANIZATIONS')) {
    throw new Error('Unauthorized: Requires super admin access');
  }

  return adminUser;
}

export async function updateUserRoleAction(userId: string, newRole: string) {
  try {
    await requireSuperAdmin();
    
    await dbUpdateUserRole({ id: userId, role: newRole });
    
    revalidatePath('/admin/staff');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating user role:', error);
    return { success: false, error: error.message || 'Failed to update user role' };
  }
}
