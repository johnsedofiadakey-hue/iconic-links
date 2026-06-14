import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Seed script disabled for Firebase Data Connect. Please use Firebase emulator or dataconnect mutations directly.' },
    { status: 400 }
  );
}
