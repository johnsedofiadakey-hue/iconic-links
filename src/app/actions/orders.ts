'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { adminAuth } from '@/lib/firebase/admin';
import { createOrderSchema, setQuoteSchema } from '@/lib/validations';
import { ORDER_STATUS } from '@/lib/constants';
import { hasPermission } from '@/lib/rbac';
import {
  getUserByIdentifier,
  createOrder as dcCreateOrder,
  createOrderItem,
  updateOrderStatus,
  updateOrderItemPrice,
  setOrderQuote,
  getOrderWithDetails,
  logAudit,
} from '@/lib/db';

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

    const userResult = await getUserByIdentifier({ identifier });
    const users = userResult.data.users;
    
    if (!users || users.length === 0) {
      return { success: false, error: 'User not found in database' };
    }

    const user = users[0];

    const orderNumber = `ICN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalAmount = validatedData.isInstant ? (validatedData.basePrice || 0) * validatedData.quantity : 0;
    const initialStatus = validatedData.isInstant ? ORDER_STATUS.AWAITING_PAYMENT : ORDER_STATUS.AWAITING_QUOTATION;

    // Create the order
    const orderResult = await dcCreateOrder({
      userId: user.id,
      orderNumber,
      totalAmount
    });
    
    const orderId = orderResult.data.order_insert.id;

    // CreateOrder always inserts with the schema default status (AWAITING_PAYMENT).
    // Quote-required orders must be explicitly moved to AWAITING_QUOTATION.
    if (!validatedData.isInstant) {
      await updateOrderStatus({ id: orderId, status: ORDER_STATUS.AWAITING_QUOTATION });
    }

    // Create the order item
    await createOrderItem({
      orderId: orderId,
      serviceId: validatedData.serviceId,
      quantity: validatedData.quantity,
      price: validatedData.isInstant ? (validatedData.basePrice || 0) : 0,
      specs: validatedData.specs
    });

    await logAudit({
      action: 'ORDER_CREATED',
      userId: user.id,
      orderId: orderId,
      newValue: { orderNumber, totalAmount, status: initialStatus }
    });

    return { success: true, order: { id: orderId, orderNumber, status: initialStatus, totalAmount } };
  } catch (error: any) {
    console.error('Create order error', error);
    return { success: false, error: error.message };
  }
}

export async function setQuotePrice(data: {
  orderId: string;
  items: { orderItemId: string; price: number }[];
}) {
  try {
    const validated = setQuoteSchema.parse(data);

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

    const userResult = await getUserByIdentifier({ identifier });
    const staffUser = userResult.data.users?.[0];

    if (!staffUser) {
      return { success: false, error: 'User not found in database' };
    }

    if (!hasPermission(staffUser.role, 'QUOTES')) {
      return { success: false, error: 'You do not have permission to quote orders.' };
    }

    const orderResult = await getOrderWithDetails({ id: validated.orderId });
    const order = orderResult.data.order;

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    if (order.status !== ORDER_STATUS.AWAITING_QUOTATION) {
      return { success: false, error: 'Order is not awaiting quotation.' };
    }

    const itemMap = new Map(order.orderItems_on_order.map((i: any) => [i.id, i]));

    let totalAmount = 0;
    for (const { orderItemId, price } of validated.items) {
      const item = itemMap.get(orderItemId) as { quantity: number } | undefined;
      if (!item) {
        return { success: false, error: 'Invalid order item.' };
      }
      totalAmount += price * item.quantity;
    }

    await Promise.all(
      validated.items.map(({ orderItemId, price }) => updateOrderItemPrice({ id: orderItemId, price }))
    );

    await setOrderQuote({
      id: validated.orderId,
      totalAmount,
      status: ORDER_STATUS.AWAITING_PAYMENT,
    });

    await logAudit({
      action: 'ORDER_QUOTED',
      userId: staffUser.id,
      orderId: validated.orderId,
      newValue: { totalAmount, status: ORDER_STATUS.AWAITING_PAYMENT, items: validated.items },
    });

    revalidatePath(`/admin/orders/${validated.orderId}`);
    revalidatePath('/dashboard');

    return { success: true, totalAmount };
  } catch (error: any) {
    console.error('Set quote price error', error);
    return { success: false, error: error.message };
  }
}
