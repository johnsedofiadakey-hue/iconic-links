import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getPaymentByReference, updatePaymentStatus, updateOrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;

      // Find payment record
      const paymentResult = await getPaymentByReference({ reference });
      const payments = paymentResult.data.payments;
      
      if (payments.length > 0) {
        const payment = payments[0];

        // Update payment record
        await updatePaymentStatus({
          id: payment.id,
          status: 'SUCCESS',
          paystackRef: String(data.id)
        });

        // Update order status if full payment is received (simplification for MVP)
        if (payment.order?.status === 'AWAITING_PAYMENT') {
          await updateOrderStatus({
            id: payment.orderId,
            status: 'PREFLIGHT' // Valid enum value
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
