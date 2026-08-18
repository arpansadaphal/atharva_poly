import { describe, it, expect } from 'vitest';
import { contactSchema } from './contact-schema';

const baseValid = {
  name: 'John Doe',
  company: 'Acme Corp',
  email: 'john@acme.com',
  phone: '+1 555 123 4567',
  honeypot: '',
};

describe('contact validation schema', () => {
  it('accepts valid quote enquiry', () => {
    const data = {
      ...baseValid,
      inquiryType: 'quote',
      industry: 'Packaging',
      productInterest: 'Laminates',
      quantity: '1000',
      application: 'Food packaging',
      requirements: 'Moisture barrier required',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects quote missing required fields', () => {
    const data = {
      ...baseValid,
      inquiryType: 'quote',
      // missing industry, productInterest
      quantity: 'x',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map(i => i.path.join('.'));
      expect(paths).toContain('industry');
      expect(paths).toContain('productInterest');
    }
  });

  it('accepts valid technical enquiry', () => {
    const data = {
      ...baseValid,
      inquiryType: 'technical',
      product: 'Polypropylene',
      problemStatement: 'We need a material that withstands high temperatures and is food-safe.',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects technical with short problem statement', () => {
    const data = {
      ...baseValid,
      inquiryType: 'technical',
      product: 'Polypropylene',
      problemStatement: 'too short',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('accepts valid general enquiry', () => {
    const data = {
      ...baseValid,
      inquiryType: 'general',
      subject: 'Need information',
      message: 'Could you send me your product catalogue?',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects general with short message', () => {
    const data = {
      ...baseValid,
      inquiryType: 'general',
      subject: 'Hi',
      message: 'Short',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('accepts valid career enquiry', () => {
    const data = {
      ...baseValid,
      inquiryType: 'career',
      positionInterest: 'Production Engineer',
      experience: '5+ years',
      coverMessage: 'I have extensive experience in polymer manufacturing and quality control, and I would love to join your team.',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects career with short cover message', () => {
    const data = {
      ...baseValid,
      inquiryType: 'career',
      positionInterest: 'Engineer',
      experience: '2 years',
      coverMessage: 'Too short',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email and phone', () => {
    const data = {
      ...baseValid,
      inquiryType: 'general',
      email: 'not-an-email',
      phone: 'abc',
      subject: 'Hello',
      message: 'This is a valid message length.',
    };
    const result = contactSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

 it('accepts missing optional fields (e.g. quantity, application, requirements)', () => {
  const data = {
    ...baseValid, // includes name, company, email, phone, honeypot
    inquiryType: 'quote',
    industry: 'Packaging',
    productInterest: 'Laminates',
    // quantity, application, requirements intentionally omitted
  };
  const result = contactSchema.safeParse(data);
  expect(result.success).toBe(true);
});
});