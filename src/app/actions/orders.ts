'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/admin';
import { createOrderSchema } from '@/lib/validations';
import { ORDER_STATUS } from '@/lib/constants';

export async function createOrder(data: {
  serviceId: string;
  quantity: number;
  specs: any;
  isInstant: boolean;
  basePrice: number | null;
}) {
  try {
    const validatedData = createOrderSchema.parse(data);
    
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return { success: false, error: 'Unauthorized. Please log in.' };
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const identifier = decodedClaims.email || decodedClaims.phone_number;

    if (!identifier) {
      return { success: false, error: 'Invalid session' };
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier }
        ]
      }
    });

    if (!user) {
      return { success: false, error: 'User not found in database' };
    }

    const orderNumber = `ICN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalAmount = validatedData.isInstant ? (validatedData.basePrice || 0) * validatedData.quantity : 0;
    const initialStatus = validatedData.isInstant ? ORDER_STATUS.AWAITING_PAYMENT : ORDER_STATUS.AWAITING_QUOTATION;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: user.id,
        status: initialStatus,
        totalAmount,
        items: {
          create: {
            serviceId: validatedData.serviceId,
            quantity: validatedData.quantity,
            price: validatedData.isInstant ? (validatedData.basePrice || 0) : 0,
            specs: validatedData.specs,
          }
        }
      }
    });

    return { success: true, order };
  } catch (error: any) {
    console.error('Create order error', error);
    return { success: false, error: error.message };
  }
}
