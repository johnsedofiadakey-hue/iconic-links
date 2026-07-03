import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOrder, setQuotePrice } from '@/app/actions/orders';

// Mock the dependencies
vi.mock('@/lib/firebase/admin', () => ({
  adminAuth: {
    verifySessionCookie: vi.fn(),
  },
}));

vi.mock('@/lib/db', () => ({
  getUserByIdentifier: vi.fn(),
  createOrder: vi.fn(),
  createOrderItem: vi.fn(),
  updateOrderStatus: vi.fn(),
  updateOrderItemPrice: vi.fn(),
  setOrderQuote: vi.fn(),
  getOrderWithDetails: vi.fn(),
  logAudit: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name) => ({
      value: name === 'session' ? 'test-session' : undefined,
    })),
  })),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('createOrder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create order with valid data', async () => {
    const { adminAuth } = await import('@/lib/firebase/admin');
    const { getUserByIdentifier, createOrder: dcCreateOrder, createOrderItem } = await import('@/lib/db');

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue({
      email: 'test@example.com',
      phone_number: undefined,
    } as any);

    vi.mocked(getUserByIdentifier).mockResolvedValue({
      data: {
        users: [{ id: 'user-123', email: 'test@example.com', role: 'CUSTOMER' }],
      },
    } as any);

    vi.mocked(dcCreateOrder).mockResolvedValue({
      data: {
        order_insert: { id: 'order-123' },
      },
    } as any);

    vi.mocked(createOrderItem).mockResolvedValue({
      data: { orderItem_insert: { id: 'item-123' } },
    } as any);

    const result = await createOrder({
      serviceId: 'service-123',
      quantity: 5,
      specs: { size: 'A4', color: 'black' },
      isInstant: true,
      basePrice: 50,
    });

    expect(result.success).toBe(true);
    expect(result.order?.id).toBe('order-123');
    expect(result.order?.totalAmount).toBe(250); // 50 * 5
  });

  it('should reject if quantity is zero', async () => {
    const result = await createOrder({
      serviceId: 'service-123',
      quantity: 0,
      specs: {},
      isInstant: true,
      basePrice: 50,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should reject if quantity is negative', async () => {
    const result = await createOrder({
      serviceId: 'service-123',
      quantity: -5,
      specs: {},
      isInstant: true,
      basePrice: 50,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('should use AWAITING_QUOTATION status for quote pricing', async () => {
    const { adminAuth } = await import('@/lib/firebase/admin');
    const { getUserByIdentifier, createOrder: dcCreateOrder } = await import('@/lib/db');

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue({
      email: 'test@example.com',
    } as any);

    vi.mocked(getUserByIdentifier).mockResolvedValue({
      data: {
        users: [{ id: 'user-123', email: 'test@example.com' }],
      },
    } as any);

    vi.mocked(dcCreateOrder).mockResolvedValue({
      data: { order_insert: { id: 'order-123' } },
    } as any);

    const result = await createOrder({
      serviceId: 'service-123',
      quantity: 5,
      specs: {},
      isInstant: false, // Quote pricing
      basePrice: null,
    });

    expect(result.success).toBe(true);
    expect(result.order?.status).toBe('AWAITING_QUOTATION');
  });

  it('should reject if serviceId is empty', async () => {
    const result = await createOrder({
      serviceId: '',
      quantity: 5,
      specs: {},
      isInstant: true,
      basePrice: 50,
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

});

describe('setQuotePrice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should compute total server-side and move order to AWAITING_PAYMENT', async () => {
    const { adminAuth } = await import('@/lib/firebase/admin');
    const { getUserByIdentifier, getOrderWithDetails, updateOrderItemPrice, setOrderQuote } = await import('@/lib/db');

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue({
      email: 'staff@example.com',
    } as any);

    vi.mocked(getUserByIdentifier).mockResolvedValue({
      data: { users: [{ id: 'staff-1', role: 'MANAGER' }] },
    } as any);

    vi.mocked(getOrderWithDetails).mockResolvedValue({
      data: {
        order: {
          status: 'AWAITING_QUOTATION',
          orderItems_on_order: [
            { id: 'item-1', quantity: 3 },
            { id: 'item-2', quantity: 2 },
          ],
        },
      },
    } as any);

    vi.mocked(updateOrderItemPrice).mockResolvedValue({} as any);
    vi.mocked(setOrderQuote).mockResolvedValue({} as any);

    const result = await setQuotePrice({
      orderId: 'order-123',
      items: [
        { orderItemId: 'item-1', price: 10 },
        { orderItemId: 'item-2', price: 25 },
      ],
    });

    expect(result.success).toBe(true);
    expect(result.totalAmount).toBe(80); // (10*3) + (25*2)
    expect(setOrderQuote).toHaveBeenCalledWith({
      id: 'order-123',
      totalAmount: 80,
      status: 'AWAITING_PAYMENT',
    });
  });

  it('should reject if staff role lacks QUOTES permission', async () => {
    const { adminAuth } = await import('@/lib/firebase/admin');
    const { getUserByIdentifier } = await import('@/lib/db');

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue({
      email: 'worker@example.com',
    } as any);

    vi.mocked(getUserByIdentifier).mockResolvedValue({
      data: { users: [{ id: 'worker-1', role: 'PRODUCTION_WORKER' }] },
    } as any);

    const result = await setQuotePrice({
      orderId: 'order-123',
      items: [{ orderItemId: 'item-1', price: 10 }],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('permission');
  });

  it('should reject if order is not awaiting quotation', async () => {
    const { adminAuth } = await import('@/lib/firebase/admin');
    const { getUserByIdentifier, getOrderWithDetails } = await import('@/lib/db');

    vi.mocked(adminAuth.verifySessionCookie).mockResolvedValue({
      email: 'staff@example.com',
    } as any);

    vi.mocked(getUserByIdentifier).mockResolvedValue({
      data: { users: [{ id: 'staff-1', role: 'MANAGER' }] },
    } as any);

    vi.mocked(getOrderWithDetails).mockResolvedValue({
      data: { order: { status: 'PREFLIGHT', orderItems_on_order: [] } },
    } as any);

    const result = await setQuotePrice({
      orderId: 'order-123',
      items: [{ orderItemId: 'item-1', price: 10 }],
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('not awaiting quotation');
  });

  it('should reject a price of zero or negative via validation', async () => {
    const result = await setQuotePrice({
      orderId: 'order-123',
      items: [{ orderItemId: 'item-1', price: 0 }],
    });

    expect(result.success).toBe(false);
  });
});
