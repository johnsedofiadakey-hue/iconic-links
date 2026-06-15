import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOrder } from '@/app/actions/orders';

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
  logAudit: vi.fn(),
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name) => ({
      value: name === 'session' ? 'test-session' : undefined,
    })),
  })),
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
