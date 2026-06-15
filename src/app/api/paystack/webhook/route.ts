import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { logger } from '@/lib/logger';
import { getPaymentByReference, updatePaymentStatus, updateOrderStatus, logAudit } from '@/lib/db';

export async function POST(request: Request) {
  let body: string = '';
  try {
    body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

    if (hash !== signature) {
      logger.warn('Invalid webhook signature', { signature, hash });
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

        // Validate amount matches
        const expectedAmountCents = Math.round(payment.amount * 100);
        if (data.amount !== expectedAmountCents) {
          logger.error('Payment amount mismatch - possible fraud attempt', undefined, {
            reference,
            expected: expectedAmountCents,
            received: data.amount
          });
          return NextResponse.json({ error: 'Amount validation failed' }, { status: 400 });
        }

        // Update payment record
        await updatePaymentStatus({
          id: payment.id,
          status: 'SUCCESS',
          paystackRef: String(data.id)
        });

        // Log audit trail
        await logAudit({
          action: 'PAYMENT_SUCCESS',
          userId: payment.order?.userId || 'unknown',
          orderId: payment.orderId,
          newValue: { status: 'SUCCESS', paystackRef: data.id },
          notes: `Payment received via Paystack (${reference})`
        });

        // Update order status if full payment is received (simplification for MVP)
        if (payment.order?.status === 'AWAITING_PAYMENT') {
          await updateOrderStatus({
            id: payment.orderId,
            status: 'PREFLIGHT' // Valid enum value
          });

          logger.info('Order moved to PREFLIGHT after payment', {
            orderId: payment.orderId,
            reference
          });
        }
      } else {
        logger.warn('Payment reference not found in webhook', { reference });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Webhook processing failed', error instanceof Error ? error : new Error(String(error)), {
      body: body.substring(0, 200)
    });
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
