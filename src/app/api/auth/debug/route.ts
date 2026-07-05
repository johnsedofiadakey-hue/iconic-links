import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { getUserByIdentifier } from '@/lib/db';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'No session cookie found in request' }, { status: 400 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, false);
    const identifier = decodedClaims.email || decodedClaims.phone_number;

    let userDetails = null;
    if (identifier) {
      const userResult = await getUserByIdentifier({ identifier });
      userDetails = userResult.data.users;
    }

    return NextResponse.json({
      success: true,
      decodedClaims,
      identifier,
      userDetails,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      stack: error.stack,
    }, { status: 500 });
  }
}
