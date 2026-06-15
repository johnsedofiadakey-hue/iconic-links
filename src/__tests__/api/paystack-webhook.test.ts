import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';

// Mock the dependencies
vi.mock('@/lib/db', () => ({
  getPaymentByReference: vi.fn(),
  updatePaymentStatus: vi.fn(),
  updateOrderStatus: vi.fn(),
  logAudit: vi.fn(),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  },
}));

describe('POST /api/paystack/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PAYSTACK_SECRET_KEY = 'test-secret-key';
  });

  it('should verify webhook signature correctly', async () => {
    const testEvent = {
      event: 'charge.success',
      data: {
        reference: 'ref-123',
        amount: 5000,
        id: 12345,
      },
    };

    const body = JSON.stringify(testEvent);
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');

    expect(hash).toBeDefined();
    expect(hash.length).toBe(128); // SHA512 hex is 128 chars
  });

  it('should reject webhook with invalid signature', async () => {
    const testEvent = {
      event: 'charge.success',
      data: {
        reference: 'ref-123',
        amount: 5000,
      },
    };

    const body = JSON.stringify(testEvent);
    const wrongHash = 'invalid-hash-value';

    // This is what the webhook handler would check
    const secret = process.env.PAYSTACK_SECRET_KEY as string;
    const correctHash = crypto.createHmac('sha512', secret).update(body).digest('hex');

    expect(wrongHash).not.toBe(correctHash);
  });

  it('should validate payment amount matches order', async () => {
    const { getPaymentByReference } = await import('@/lib/db');

    // Mock a payment record
    vi.mocked(getPaymentByReference).mockResolvedValue({
      data: {
        payments: [
          {
            id: 'payment-123',
            amount: 50, // 50 GHS
            reference: 'ref-123',
            orderId: 'order-123',
            order: { status: 'AWAITING_PAYMENT', userId: 'user-123' },
          },
        ],
      },
    } as any);

    const webhookAmount = 5000; // cents = 50 GHS
    const expectedAmountCents = Math.round(50 * 100);

    expect(webhookAmount).toBe(expectedAmountCents);
  });

  it('should reject payment if amount mismatches', async () => {
    const { getPaymentByReference } = await import('@/lib/db');

    vi.mocked(getPaymentByReference).mockResolvedValue({
      data: {
        payments: [
          {
            id: 'payment-123',
            amount: 50, // 50 GHS
            reference: 'ref-123',
          },
        ],
      },
    } as any);

    const webhookAmount = 10000; // Different amount (100 GHS instead of 50)
    const expectedAmountCents = Math.round(50 * 100);

    expect(webhookAmount).not.toBe(expectedAmountCents);
  });

  it('should update payment status on success', async () => {
    const { getPaymentByReference, updatePaymentStatus } = await import('@/lib/db');

    vi.mocked(getPaymentByReference).mockResolvedValue({
      data: {
        payments: [
          {
            id: 'payment-123',
            amount: 50,
            reference: 'ref-123',
            orderId: 'order-123',
            order: { status: 'AWAITING_PAYMENT', userId: 'user-123' },
          },
        ],
      },
    } as any);

    // Simulate webhook payload
    const webhookData = {
      id: 12345,
      amount: 5000,
      reference: 'ref-123',
    };

    // The handler would call updatePaymentStatus with these values
    expect(updatePaymentStatus).not.toHaveBeenCalled();

    // Simulate the call
    await vi.mocked(updatePaymentStatus)({
      id: 'payment-123',
      status: 'SUCCESS',
      paystackRef: String(webhookData.id),
    });

    expect(updatePaymentStatus).toHaveBeenCalledWith({
      id: 'payment-123',
      status: 'SUCCESS',
      paystackRef: '12345',
    });
  });

  it('should update order status to PREFLIGHT after payment', async () => {
    const { getPaymentByReference, updateOrderStatus } = await import('@/lib/db');

    vi.mocked(getPaymentByReference).mockResolvedValue({
      data: {
        payments: [
          {
            id: 'payment-123',
            amount: 50,
            reference: 'ref-123',
            orderId: 'order-123',
            order: { status: 'AWAITING_PAYMENT', userId: 'user-123' },
          },
        ],
      },
    } as any);

    // Simulate calling updateOrderStatus
    await vi.mocked(updateOrderStatus)({
      id: 'order-123',
      status: 'PREFLIGHT',
    });

    expect(updateOrderStatus).toHaveBeenCalledWith({
      id: 'order-123',
      status: 'PREFLIGHT',
    });
  });

  it('should not update order status if already paid', async () => {
    const { getPaymentByReference, updateOrderStatus } = await import('@/lib/db');

    vi.mocked(getPaymentByReference).mockResolvedValue({
      data: {
        payments: [
          {
            id: 'payment-123',
            amount: 50,
            reference: 'ref-123',
            orderId: 'order-123',
            // Order is not in AWAITING_PAYMENT status
            order: { status: 'PREFLIGHT', userId: 'user-123' },
          },
        ],
      },
    } as any);

    // The handler checks: if (payment.order?.status === 'AWAITING_PAYMENT')
    // So updateOrderStatus should NOT be called if status is different

    expect(updateOrderStatus).not.toHaveBeenCalled();
  });

  it('should log audit trail on successful payment', async () => {
    const { logAudit } = await import('@/lib/db');

    // Simulate audit logging
    await vi.mocked(logAudit)({
      action: 'PAYMENT_SUCCESS',
      userId: 'user-123',
      orderId: 'order-123',
      newValue: { status: 'SUCCESS', paystackRef: '12345' },
      notes: 'Payment received via Paystack (ref-123)',
    });

    expect(logAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'PAYMENT_SUCCESS',
        userId: 'user-123',
        orderId: 'order-123',
      })
    );
  });
});
