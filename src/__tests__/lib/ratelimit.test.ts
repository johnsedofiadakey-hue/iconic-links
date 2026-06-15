import { describe, it, expect, beforeEach } from 'vitest';
import { rateLimiter, RATE_LIMITS } from '@/lib/ratelimit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset rate limiter before each test
    rateLimiter.reset('test-ip');
    rateLimiter.reset('user-123');
  });

  describe('isLimited', () => {
    it('should allow requests within limit', () => {
      const identifier = 'test-ip';
      const limit = 5;

      for (let i = 0; i < limit; i++) {
        expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
      }
    });

    it('should reject requests exceeding limit', () => {
      const identifier = 'test-ip';
      const limit = 3;

      // First 3 requests should be allowed
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);

      // 4th request should be rejected
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(true);
    });

    it('should track separate identifiers independently', () => {
      const limit = 2;

      expect(rateLimiter.isLimited('ip-1', limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited('ip-1', limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited('ip-1', limit, 60000)).toBe(true);

      // ip-2 should have its own counter
      expect(rateLimiter.isLimited('ip-2', limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited('ip-2', limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited('ip-2', limit, 60000)).toBe(true);
    });

    it('should use default limit of 10', () => {
      const identifier = 'test-ip';

      // Should allow 10 requests with default limit
      for (let i = 0; i < 10; i++) {
        expect(rateLimiter.isLimited(identifier)).toBe(false);
      }

      // 11th should be limited
      expect(rateLimiter.isLimited(identifier)).toBe(true);
    });

    it('should use default window of 60 seconds', () => {
      const identifier = 'test-ip';
      const limit = 5;
      const defaultWindow = 60 * 1000;

      // Fill up the limit
      for (let i = 0; i < limit; i++) {
        rateLimiter.isLimited(identifier, limit, defaultWindow);
      }

      // Next request should be limited
      expect(rateLimiter.isLimited(identifier, limit, defaultWindow)).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset identifier counter', () => {
      const identifier = 'test-ip';
      const limit = 2;

      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(true);

      // Reset
      rateLimiter.reset(identifier);

      // Should be able to use again
      expect(rateLimiter.isLimited(identifier, limit, 60000)).toBe(false);
    });
  });

  describe('RATE_LIMITS presets', () => {
    it('should have AUTH preset with 5 attempts per 15 minutes', () => {
      expect(RATE_LIMITS.AUTH.limit).toBe(5);
      expect(RATE_LIMITS.AUTH.windowMs).toBe(15 * 60 * 1000);
    });

    it('should have PAYMENT preset with 10 requests per minute', () => {
      expect(RATE_LIMITS.PAYMENT.limit).toBe(10);
      expect(RATE_LIMITS.PAYMENT.windowMs).toBe(60 * 1000);
    });

    it('should have API preset with 100 requests per minute', () => {
      expect(RATE_LIMITS.API.limit).toBe(100);
      expect(RATE_LIMITS.API.windowMs).toBe(60 * 1000);
    });
  });

  describe('Auth rate limiting scenario', () => {
    it('should allow 5 login attempts then block', () => {
      const ip = '192.168.1.1';
      const { limit, windowMs } = RATE_LIMITS.AUTH;

      // Allow 5 attempts
      for (let i = 0; i < limit; i++) {
        expect(rateLimiter.isLimited(ip, limit, windowMs)).toBe(false);
      }

      // Block 6th attempt
      expect(rateLimiter.isLimited(ip, limit, windowMs)).toBe(true);
    });
  });
});
