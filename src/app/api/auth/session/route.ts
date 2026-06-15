import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { rateLimiter, RATE_LIMITS } from '@/lib/ratelimit';
import { logger } from '@/lib/logger';
import { getUserByIdentifier, createUser, createStaffProfile, createCustomerProfile } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 attempts per 15 minutes per IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (rateLimiter.isLimited(ip, RATE_LIMITS.AUTH.limit, RATE_LIMITS.AUTH.windowMs)) {
      logger.warn('Auth rate limit exceeded', { ip });
      return NextResponse.json({ error: 'Too many login attempts. Please try again later.' }, { status: 429 });
    }

    const { idToken } = await request.json();
    
    // Verify the ID token and create a session cookie
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Create session cookie (valid for 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    // Synchronize user in Database
    const identifier = decodedToken.email || decodedToken.phone_number;
    
    if (!identifier) {
      throw new Error('Token does not contain email or phone number');
    }

    const userResult = await getUserByIdentifier({ identifier });
    const users = userResult.data.users;

    if (!users || users.length === 0) {
      if (decodedToken.email) {
        // Check if there's any super admin
        const { listUsersByRole } = await import('@/lib/db');
        const adminResult = await listUsersByRole({ role: 'SUPER_ADMIN' });
        const hasSuperAdmin = adminResult.data.users.length > 0;
        const assignedRole = hasSuperAdmin ? 'CUSTOMER' : 'SUPER_ADMIN';

        const newUserResult = await createUser({
          email: decodedToken.email,
          role: assignedRole,
        });
        const newUserId = newUserResult.data.user_insert.id;
        
        if (assignedRole === 'SUPER_ADMIN') {
          await createStaffProfile({ userId: newUserId });
        } else {
          await createCustomerProfile({ userId: newUserId });
        }
      } else if (decodedToken.phone_number) {
        const newUserResult = await createUser({
          phone: decodedToken.phone_number,
          role: 'CUSTOMER',
        });
        const newUserId = newUserResult.data.user_insert.id;
        await createCustomerProfile({ userId: newUserId });
      }
    }

    const cookieStore = await cookies();
    cookieStore.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Session creation error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return NextResponse.json({ status: 'success' }, { status: 200 });
}
