# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> Contact form >> shows invalid email and phone errors
- Location: e2e/contact.spec.ts:73:7

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for locator('input[name="phone"]')

```

# Test source

```ts
  1   | import { test, expect, Page } from '@playwright/test';
  2   | import AxeBuilder from '@axe-core/playwright';
  3   | 
  4   | // Mock API to prevent actual email sending and to control success response.
  5   | async function mockContactApi(page: Page, referenceId = 'ATH-260816-ABCDE') {
  6   |   await page.route('**/api/contact', async (route) => {
  7   |     await route.fulfill({
  8   |       status: 200,
  9   |       contentType: 'application/json',
  10  |       body: JSON.stringify({ success: true, referenceId }),
  11  |     });
  12  |   });
  13  | }
  14  | 
  15  | 
  16  | test.describe('Contact form', () => {
  17  |   test('renders and hides WhatsApp button when unconfigured', async ({ page }) => {
  18  |   await page.goto('/contact');
  19  | 
  20  |   // Floating WhatsApp button is hidden when number is unset
  21  |   await expect(page.getByRole('link', { name: 'Chat with us on WhatsApp' })).toHaveCount(0);
  22  | });
  23  | 
  24  |   test('switches to General Enquiry and submits successfully', async ({ page }) => {
  25  |     await mockContactApi(page);
  26  |     await page.goto('/contact');
  27  | 
  28  |     // Click the General Enquiry tab. Tabs may be buttons or links.
  29  |     const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
  30  |     await generalTab.click();
  31  | 
  32  |     // Wait for subject field to appear (indicates the tab switched)
  33  |     const subjectInput = page.locator('input[name="subject"], textarea[name="subject"]');
  34  |     await expect(subjectInput).toBeVisible();
  35  | 
  36  |     // Fill core fields
  37  |     await page.locator('input[name="name"]').fill('Test User');
  38  |     await page.locator('input[name="company"]').fill('Acme Corp');
  39  |     await page.locator('input[name="email"]').fill('test@acme.com');
  40  |     // await page.locator('input[name="phone"]').fill('+1 555 123 4567');
  41  |     const phoneInput = page.getByLabel(/phone/i);
  42  | await phoneInput.click();
  43  | await phoneInput.pressSequentially('+15551234567');
  44  | 
  45  |     // Fill general fields
  46  |     await subjectInput.fill('Need more information');
  47  |     await page.locator('textarea[name="message"]').fill('Please send me your product catalogue and pricing details.');
  48  | 
  49  |     // Submit
  50  |     const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
  51  |     await submitButton.click();
  52  | 
  53  |     // Success message
  54  |     await expect(page.getByText(/enquiry received|thank you|success/i)).toBeVisible({ timeout: 10_000 });
  55  |     await expect(page.getByText(/ath-260816-abcde/i)).toBeVisible();
  56  |   });
  57  | 
  58  |   test('shows inline validation errors when required fields are missing', async ({ page }) => {
  59  |     await page.goto('/contact');
  60  | 
  61  |     // Switch to General tab to have a known set of required fields
  62  |     const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
  63  |     await generalTab.click();
  64  | 
  65  |     // Submit without filling anything
  66  |     const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
  67  |     await submitButton.click();
  68  | 
  69  |     // Expect at least one validation message
  70  |     await expect(page.locator('[role="alert"], .text-red-600, .text-red-500').first()).toBeVisible();
  71  |   });
  72  | 
  73  |   test('shows invalid email and phone errors', async ({ page }) => {
  74  |     await page.goto('/contact');
  75  | 
  76  |     const generalTab = page.locator('button, a').filter({ hasText: /general enquiry/i }).first();
  77  |     await generalTab.click();
  78  | 
  79  |     // Fill required fields but with invalid email/phone
  80  |     await page.locator('input[name="name"]').fill('Test User');
  81  |     await page.locator('input[name="company"]').fill('Acme Corp');
  82  |     await page.locator('input[name="email"]').fill('not-an-email');
> 83  |     await page.locator('input[name="phone"]').fill('abc');
      |                                               ^ Error: locator.fill: Test ended.
  84  |     await page.locator('input[name="subject"], textarea[name="subject"]').fill('Hello');
  85  |     await page.locator('textarea[name="message"]').fill('This message is long enough to pass validation.');
  86  | 
  87  |     const submitButton = page.locator('button[type="submit"], button').filter({ hasText: /send enquiry|submit|send message/i }).first();
  88  |     await submitButton.click();
  89  | 
  90  |     // Expect error messages for email and phone
  91  |     await expect(page.getByText(/valid email/i)).toBeVisible();
  92  |     await expect(page.getByText(/valid phone/i)).toBeVisible();
  93  |   });
  94  | 
  95  |   test('Request Quote tab shows product and industry fields', async ({ page }) => {
  96  |     await page.goto('/contact');
  97  | 
  98  |     const quoteTab = page.locator('button, a').filter({ hasText: /request quote/i }).first();
  99  |     await quoteTab.click();
  100 | 
  101 |     await expect(page.locator('input[name="industry"], select[name="industry"]')).toBeVisible();
  102 |     await expect(page.locator('input[name="productInterest"], textarea[name="productInterest"]')).toBeVisible();
  103 |   });
  104 | 
  105 |   test('has no critical accessibility violations', async ({ page }) => {
  106 |     await page.goto('/contact');
  107 |     const results = await new AxeBuilder({ page })
  108 |       .exclude('footer') // ignore footer contrast for now if not yet fixed
  109 |       .analyze();
  110 |     expect(results.violations.filter(v => v.impact === 'critical')).toEqual([]);
  111 |   });
  112 | });
```