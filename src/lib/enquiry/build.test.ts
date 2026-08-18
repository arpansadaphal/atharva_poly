import { describe, it, expect } from 'vitest';
import { generateReferenceId, buildEnquiry } from './build';
import type { Enquiry } from './types';

describe('enquiry builder', () => {
  it('generates reference ID in ATH-YYMMDD-XXXXX format', () => {
    const fixedDate = new Date('2026-08-16T12:00:00Z');
    const id = generateReferenceId(fixedDate);
    expect(id).toMatch(/^ATH-260816-[A-Z0-9]{5}$/);
  });

  it('builds a complete enquiry record with separated contact/details', () => {
    const submission = {
      inquiryType: 'quote',
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 555 123 4567',
      honeypot: '', // should be excluded
      industry: 'Packaging',
      productInterest: 'Laminates',
      quantity: '10k units',
      application: 'Food packaging',
      requirements: 'High moisture barrier',
    };

    const enquiry: Enquiry = buildEnquiry({
      submission,
      page: '/contact',
      referrer: 'https://google.com',
      prefill: { industry: 'Packaging' },
      ip: '203.0.113.99',
      userAgent: 'Test UA',
    });

    expect(enquiry.id).toBeDefined();
    expect(enquiry.referenceId).toMatch(/^ATH-/);
    expect(enquiry.receivedAt).toBeDefined();
    expect(enquiry.inquiryType).toBe('quote');
    expect(enquiry.contact).toEqual({
      name: 'John Doe',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 555 123 4567',
    });
    expect(enquiry.details).toEqual({
      industry: 'Packaging',
      productInterest: 'Laminates',
      quantity: '10k units',
      application: 'Food packaging',
      requirements: 'High moisture barrier',
    });
    expect(enquiry.source).toEqual({
      page: '/contact',
      referrer: 'https://google.com',
      prefill: { industry: 'Packaging' },
    });
    expect(enquiry.meta).toEqual({ ip: '203.0.113.99', userAgent: 'Test UA' });
    expect(enquiry.status).toBe('new');
  });

  it('ignores empty, undefined, and honeypot fields in details', () => {
    const submission = {
      inquiryType: 'general',
      name: 'Jane Smith',
      company: 'XYZ',
      email: 'jane@xyz.com',
      phone: '',
      honeypot: 'should-not-appear',
      subject: 'Hello',
      message: 'I need info',
      emptyField: '',
    };

    const enquiry = buildEnquiry({
      submission,
      page: '/contact',
      referrer: '',
      prefill: {},
      ip: '1.1.1.1',
      userAgent: 'UA',
    });

    expect(enquiry.details).toHaveProperty('subject', 'Hello');
    expect(enquiry.details).toHaveProperty('message', 'I need info');
    expect(enquiry.details).not.toHaveProperty('honeypot');
    expect(enquiry.details).not.toHaveProperty('emptyField');
    expect(enquiry.details).not.toHaveProperty('phone'); // core field removed
  });
});