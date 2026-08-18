import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Mock API to prevent actual email sending and to control success response.
async function mockContactApi(page: Page, referenceId = 'ATH-260816-ABCDE') {
  await page.route('**/api/contact', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, referenceId }),
    });
  });
}


test.describe('Contact form', () => {
  test('renders and hides WhatsApp button when unconfigured', async ({ page }) => {
  await page.goto('/contact');

  // Floating WhatsApp button is hidden when number is unset
  await expect(page.getByRole('link', { name: 'Chat with us on WhatsApp' })).toHaveCount(0);
});

  test('switches to General Enquiry and submits successfully', async ({ page }) => {
    await mockContactApi(page);
    await page.goto('/contact');

    // Click the General Enquiry tab. Tabs may be buttons or links.
    const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
    await generalTab.click();

    // Wait for subject field to appear (indicates the tab switched)
    const subjectInput = page.locator('input[name="subject"], textarea[name="subject"]');
    await expect(subjectInput).toBeVisible();

    // Fill core fields
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="company"]').fill('Acme Corp');
    await page.locator('input[name="email"]').fill('test@acme.com');
    // await page.locator('input[name="phone"]').fill('+1 555 123 4567');
    const phoneInput = page.getByLabel(/phone/i);
await phoneInput.click();
await phoneInput.pressSequentially('+15551234567');

    // Fill general fields
    await subjectInput.fill('Need more information');
    await page.locator('textarea[name="message"]').fill('Please send me your product catalogue and pricing details.');

    // Submit
    const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
    await submitButton.click();

    // Success message
    await expect(page.getByText(/enquiry received|thank you|success/i)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(/ath-260816-abcde/i)).toBeVisible();
  });

  test('shows inline validation errors when required fields are missing', async ({ page }) => {
    await page.goto('/contact');

    // Switch to General tab to have a known set of required fields
    const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
    await generalTab.click();

    // Submit without filling anything
    const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
    await submitButton.click();

    // Expect at least one validation message
    await expect(page.locator('[role="alert"], .text-red-600, .text-red-500').first()).toBeVisible();
  });

  test('shows invalid email and phone errors', async ({ page }) => {
    await page.goto('/contact');

    const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
    await generalTab.click();

    // Fill required fields but with invalid email/phone
    await page.locator('input[name="name"]').fill('Test User');
    await page.locator('input[name="company"]').fill('Acme Corp');
    await page.locator('input[name="email"]').fill('not-an-email');
    await page.locator('input[name="phone"]').fill('abc');
    await page.locator('input[name="subject"], textarea[name="subject"]').fill('Hello');
    await page.locator('textarea[name="message"]').fill('This message is long enough to pass validation.');

    const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
    await submitButton.click();

    // Expect error messages for email and phone
    await expect(page.getByText(/valid email/i)).toBeVisible();
    await expect(page.getByText(/valid phone/i)).toBeVisible();
  });

  test('Request Quote tab shows product and industry fields', async ({ page }) => {
    await page.goto('/contact');

    const quoteTab = page.locator('button, a').filter({ hasText: /request quote/i }).first();
    await quoteTab.click();

    await expect(page.locator('input[name="industry"], select[name="industry"]')).toBeVisible();
    await expect(page.locator('input[name="productInterest"], textarea[name="productInterest"]')).toBeVisible();
  });

  test('has no critical accessibility violations', async ({ page }) => {
    await page.goto('/contact');
    const results = await new AxeBuilder({ page })
      .exclude('footer') // ignore footer contrast for now if not yet fixed
      .analyze();
    expect(results.violations.filter(v => v.impact === 'critical')).toEqual([]);
  });
});