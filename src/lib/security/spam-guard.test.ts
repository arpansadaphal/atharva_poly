import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('spam-guard', () => {
  beforeEach(() => {
    vi.resetModules(); // clear caches
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('detects honeypot field filled', async () => {
    const { isHoneypotTripped } = await import('./spam-guard');
    expect(isHoneypotTripped('bot-filled')).toBe(true);
    expect(isHoneypotTripped('  ')).toBe(false);
    expect(isHoneypotTripped('')).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it('detects suspicious timing', async () => {
    const { isSubmittedTooFast } = await import('./spam-guard');

    vi.useFakeTimers();
    const now = Date.now();
    vi.setSystemTime(now);

    expect(isSubmittedTooFast(now - 500)).toBe(true); // < 1200 ms
    expect(isSubmittedTooFast(now - 1500)).toBe(false);
    expect(isSubmittedTooFast(now - 0)).toBe(true);
    expect(isSubmittedTooFast(undefined)).toBe(false);
    expect(isSubmittedTooFast('abc')).toBe(false);
  });

  it('detects duplicate by idempotency key', async () => {
    const { checkAndRecordDuplicate } = await import('./spam-guard');

    const content = { inquiryType: 'general', name: 'John', email: 'john@x.com', message: 'Hello' };
    const first = checkAndRecordDuplicate('key-123', content, 'REF-1');
    expect(first.isDuplicate).toBe(false);

    const second = checkAndRecordDuplicate('key-123', content, 'REF-2');
    expect(second.isDuplicate).toBe(true);
    expect(second.existingReferenceId).toBe('REF-1');
  });

  it('detects duplicate by content hash within window', async () => {
    const { checkAndRecordDuplicate } = await import('./spam-guard');

    const content = { inquiryType: 'general', name: 'John', email: 'john@x.com', message: 'Hello world' };
    const first = checkAndRecordDuplicate('key-A', content, 'REF-A');
    expect(first.isDuplicate).toBe(false);

    // Different idempotency key, same content
    const second = checkAndRecordDuplicate('key-B', content, 'REF-B');
    expect(second.isDuplicate).toBe(true);
    expect(second.existingReferenceId).toBe('REF-A');
  });

  it('extracts message-like field from body', async () => {
    const { extractMessageLikeField } = await import('./spam-guard');
    expect(extractMessageLikeField({ message: 'hello' })).toBe('hello');
    expect(extractMessageLikeField({ problemStatement: 'problem' })).toBe('problem');
    expect(extractMessageLikeField({ requirements: 'req' })).toBe('req');
    expect(extractMessageLikeField({ productInterest: 'product' })).toBe('product');
    expect(extractMessageLikeField({ other: 'x' })).toBe('');
  });
});