/**
 * Simple in-memory rate limiting for API endpoints
 * Tracks requests by IP address and returns true if rate limit is exceeded
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Cleanup expired entries every 5 minutes
    if (typeof window === 'undefined') {
      this.cleanupInterval = setInterval(() => {
        this.cleanup();
      }, 5 * 60 * 1000);
    }
  }

  /**
   * Check if request exceeds rate limit
   * Returns true if limit is exceeded, false if request is allowed
   */
  isLimited(
    identifier: string,
    limit: number = 10,
    windowMs: number = 60 * 1000 // 1 minute default
  ): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);

    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      this.store.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return false;
    }

    // Check if limit exceeded
    if (entry.count >= limit) {
      return true;
    }

    // Increment counter
    entry.count++;
    return false;
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string) {
    this.store.delete(identifier);
  }

  /**
   * Cleanup expired entries
   */
  private cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.store.delete(key));
  }

  /**
   * Destroy cleanup interval
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Preset limits for common scenarios
 */
export const RATE_LIMITS = {
  AUTH: {
    limit: 5,
    windowMs: 15 * 60 * 1000, // 5 attempts per 15 minutes
  },
  PAYMENT: {
    limit: 10,
    windowMs: 60 * 1000, // 10 requests per minute
  },
  API: {
    limit: 100,
    windowMs: 60 * 1000, // 100 requests per minute
  },
} as const;
