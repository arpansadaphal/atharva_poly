import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('rate-limit', () => {
  beforeEach(() => {
    vi.resetModules(); // clear in-memory store
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('allows up to max requests within window', async () => {
    vi.stubEnv('CONTACT_RATE_LIMIT_MAX', '3');
    vi.stubEnv('CONTACT_RATE_LIMIT_WINDOW_MS', '10000');

    const { checkRateLimit } = await import('./rate-limit');

    const first = checkRateLimit('1.2.3.4');
    expect(first.allowed).toBe(true);
    expect(first.retryAfterSeconds).toBeUndefined();

    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);

    const fourth = checkRateLimit('1.2.3.4');
    expect(fourth.allowed).toBe(false);
    expect(fourth.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('resets after window expires', async () => {
    vi.useFakeTimers();
    vi.stubEnv('CONTACT_RATE_LIMIT_MAX', '2');
    vi.stubEnv('CONTACT_RATE_LIMIT_WINDOW_MS', '1000');

    const { checkRateLimit } = await import('./rate-limit');

    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);
    expect(checkRateLimit('1.2.3.4').allowed).toBe(false);

    // Advance fake time past the window
    vi.advanceTimersByTime(1100);
    expect(checkRateLimit('1.2.3.4').allowed).toBe(true);

    vi.useRealTimers();
  });

  it('extracts client IP from headers', async () => {
    const { getClientIp } = await import('./rate-limit');

    const headers = new Headers({
      'x-forwarded-for': '203.0.113.7, 10.0.0.1',
    });
    expect(getClientIp(headers)).toBe('203.0.113.7');

    const headers2 = new Headers({
      'x-real-ip': '198.51.100.23',
    });
    expect(getClientIp(headers2)).toBe('198.51.100.23');

    const headers3 = new Headers();
    expect(getClientIp(headers3)).toBe('unknown');
  });
});