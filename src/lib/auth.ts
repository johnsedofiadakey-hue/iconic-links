import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { redirect } from 'next/navigation';
import { ROLES } from '@/lib/rbac';
import { getUserByIdentifier } from '@/lib/db';

type AuthUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  role: string;
};

/**
 * Require a valid session cookie and return the authenticated user.
 * Redirects to the given path if not authenticated.
 */
export async function requireAuth(redirectTo = '/login'): Promise<AuthUser> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) redirect(redirectTo);

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const identifier = decodedClaims.email || decodedClaims.phone_number;

    if (!identifier) redirect(redirectTo);

    const userResult = await getUserByIdentifier({ identifier });
    const users = userResult.data.users;

    if (!users || users.length === 0) redirect(redirectTo);

    return users[0] as AuthUser;
  } catch {
    redirect(redirectTo);
  }
}

/**
 * Require an authenticated staff user with one of the allowed roles.
 * Redirects to admin login if not authenticated, or admin dashboard if not authorized.
 */
export async function requireAdminAuth(
  allowedRoles?: string[]
): Promise<AuthUser> {
  const user = await requireAuth('/admin/login');

  const staffRoles = [
    ROLES.SUPER_ADMIN,
    ROLES.MANAGER,
    ROLES.CUSTOMER_SERVICE,
    ROLES.PRODUCTION_WORKER,
    ROLES.QC_OFFICER,
    ROLES.DELIVERY_DRIVER,
  ];

  if (!staffRoles.includes(user.role as any)) {
    redirect('/admin/login');
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    redirect('/admin/dashboard');
  }

  return user;
}
