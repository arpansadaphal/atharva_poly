import { describe, it, expect, vi, afterEach } from 'vitest';
import { buildWhatsAppURL, isWhatsAppConfigured } from './whatsapp';

describe('whatsapp', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('sanitizes number and builds URL with custom message', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '+1 (555) 123-4567');
    const url = buildWhatsAppURL({ customMessage: 'Hello team' });
    expect(url).toBe('https://wa.me/15551234567?text=Hello%20team');
  });

  it('builds URL from product and industry', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '919876543210');
    const url = buildWhatsAppURL({ product: 'Laminates', industry: 'Packaging' });
    expect(url).toBe(
      'https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Laminates%20for%20Packaging%20applications.'
    );
  });

  it('falls back to generic composer when number missing', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '');
    const url = buildWhatsAppURL({ customMessage: 'Hi' });
    expect(url).toBe('https://wa.me/?text=Hi');
  });

  it('correctly reports whether WhatsApp is configured', () => {
    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '+1 (555) 123-4567');
    expect(isWhatsAppConfigured()).toBe(true);

    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '123'); // too short
    expect(isWhatsAppConfigured()).toBe(false);

    vi.stubEnv('NEXT_PUBLIC_WHATSAPP_NUMBER', '');
    expect(isWhatsAppConfigured()).toBe(false);
  });
});