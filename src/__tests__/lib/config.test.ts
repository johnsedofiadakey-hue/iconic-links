import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { validateEnv, config } from '@/lib/config';

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Save original env
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original env
    process.env = originalEnv;
  });

  describe('validateEnv', () => {
    it('should not throw when all required env vars are set', () => {
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test.appspot.com';
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456';
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:123:web:456';
      process.env.PAYSTACK_SECRET_KEY = 'sk_test_123';

      expect(() => validateEnv()).not.toThrow();
    });

    it('should throw when FIREBASE_API_KEY is missing', () => {
      delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = 'test.appspot.com';
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = '123456';
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID = '1:123:web:456';
      process.env.PAYSTACK_SECRET_KEY = 'sk_test_123';

      expect(() => validateEnv()).toThrow('NEXT_PUBLIC_FIREBASE_API_KEY');
    });

    it('should throw when multiple env vars are missing', () => {
      delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      delete process.env.PAYSTACK_SECRET_KEY;

      expect(() => validateEnv()).toThrow('Missing required environment variables');
    });

    it('should provide helpful error message', () => {
      delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

      expect(() => validateEnv()).toThrow(/Missing required environment variables/);
    });
  });

  describe('config object', () => {
    it('should expose firebase configuration', () => {
      expect(config.firebase).toBeDefined();
      expect(config.firebase).toHaveProperty('apiKey');
      expect(config.firebase).toHaveProperty('authDomain');
      expect(config.firebase).toHaveProperty('projectId');
      expect(config.firebase).toHaveProperty('storageBucket');
    });

    it('should expose paystack configuration', () => {
      expect(config.paystack).toBeDefined();
      expect(config.paystack).toHaveProperty('secretKey');
    });

    it('should expose environment flags', () => {
      expect(config).toHaveProperty('isDev');
      expect(config).toHaveProperty('isProd');
      expect(typeof config.isDev).toBe('boolean');
      expect(typeof config.isProd).toBe('boolean');
    });
  });
});
