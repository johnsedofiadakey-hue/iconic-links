import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOrder, createPayment } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { orderId, email, amount } = await request.json();

    const orderResult = await getOrder({ id: orderId });
    const order = orderResult.data.order;
    if (!order || order.status !== 'AWAITING_PAYMENT') {
      return NextResponse.json({ error: 'Invalid order or order is not awaiting payment' }, { status: 400 });
    }

    // Amount in Paystack is in kobo (multiply by 100)
    const amountInKobo = Math.round(amount * 100);
    const reference = crypto.randomBytes(8).toString('hex');

    // Create payment record in DB
    await createPayment({
      orderId: order.id,
      amount: amount,
      reference: reference
    });

    // Initialize Paystack transaction
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`, // Redirect back to customer dashboard
        metadata: {
          orderId: order.id
        }
      }),
    });

    const data = await paystackRes.json();

    if (!data.status) {
      throw new Error(data.message);
    }

    return NextResponse.json({ authorizationUrl: data.data.authorization_url });
  } catch (error: any) {
    console.error('Paystack Initialization Error:', error);
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 });
  }
}
