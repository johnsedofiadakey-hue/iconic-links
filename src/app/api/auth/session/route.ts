import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    
    // Verify the ID token and create a session cookie
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Create session cookie (valid for 5 days)
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    
    // Synchronize user in Prisma
    const identifier = decodedToken.email || decodedToken.phone_number;
    
    if (!identifier) {
      throw new Error('Token does not contain email or phone number');
    }

    let user;
    if (decodedToken.email) {
      user = await prisma.user.findUnique({ where: { email: decodedToken.email } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: decodedToken.email,
            role: 'MANAGER', // Or superadmin based on your logic, default Manager for staff
            staffProfile: { create: {} }
          }
        });
      }
    } else if (decodedToken.phone_number) {
      user = await prisma.user.findUnique({ where: { phone: decodedToken.phone_number } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            phone: decodedToken.phone_number,
            role: 'CUSTOMER',
            customerProfile: { create: {} }
          }
        });
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
