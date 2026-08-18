# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> Contact form >> switches to General Enquiry and submits successfully
- Location: e2e/contact.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/enquiry received|thank you|success/i)
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText(/enquiry received|thank you|success/i)

```

```yaml
- banner:
  - link "Atharva Polymers — Return to homepage":
    - /url: /
    - img "Atharva Polymers Symbol"
    - text: Atharva POLYMERS PVT LTD
  - navigation "Primary navigation":
    - link "Industries":
      - /url: /industries
    - link "Manufacturing":
      - /url: /manufacturing
    - link "Capabilities":
      - /url: /capabilties
    - link "About":
      - /url: /about
    - link "Contact":
      - /url: /contact
    - link "Products":
      - /url: /products
      - text: Products
      - img
  - link "Contact us on WhatsApp":
    - /url: https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20polymer%20products%20and%20manufacturing%20capabilities.
  - link "Request Quote":
    - /url: /contact
- main:
  - paragraph: QUICK CONTACT
  - link "Chat with Atharva Polymers on WhatsApp":
    - /url: https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20polymer%20products%20and%20manufacturing%20capabilities.
    - img
    - paragraph: Chat on WhatsApp
    - paragraph: For fastest response
  - separator
  - img
  - text: +91 9011534516
  - img
  - text: shantanu.dhanu@atharvapolymers.com
  - separator
  - paragraph: OFFICE HOURS
  - paragraph: 9:00 AM – 6:00 PM IST, Monday to Saturday
  - separator
  - paragraph: MANUFACTURING FACILITY
  - paragraph: MIDC Ranjangaon, Pune Maharashtra, India
  - separator
  - paragraph: COMMERCIAL OFFICE
  - paragraph: World Trade Center, Kharadi, Pune Maharashtra, India
  - tablist "Inquiry type":
    - tab "Request Quote"
    - tab "Technical Enquiry"
    - tab "General Enquiry" [selected]
    - tab "Career Enquiry"
  - text: Name *
  - textbox "Name *":
    - /placeholder: Your full name
    - text: Test User
  - text: Company *
  - textbox "Company *":
    - /placeholder: Your company name
    - text: Acme Corp
  - text: Email *
  - textbox "Email *":
    - /placeholder: you@company.com
    - text: test@acme.com
  - text: Phone *
  - combobox "Phone number country":
    - option "International"
    - option "Afghanistan"
    - option "Åland Islands"
    - option "Albania"
    - option "Algeria"
    - option "American Samoa"
    - option "Andorra"
    - option "Angola"
    - option "Anguilla"
    - option "Antigua and Barbuda"
    - option "Argentina"
    - option "Armenia"
    - option "Aruba"
    - option "Ascension Island"
    - option "Australia"
    - option "Austria"
    - option "Azerbaijan"
    - option "Bahamas"
    - option "Bahrain"
    - option "Bangladesh"
    - option "Barbados"
    - option "Belarus"
    - option "Belgium"
    - option "Belize"
    - option "Benin"
    - option "Bermuda"
    - option "Bhutan"
    - option "Bolivia"
    - option "Bonaire, Sint Eustatius and Saba"
    - option "Bosnia and Herzegovina"
    - option "Botswana"
    - option "Brazil"
    - option "British Indian Ocean Territory"
    - option "Brunei Darussalam"
    - option "Bulgaria"
    - option "Burkina Faso"
    - option "Burundi"
    - option "Cambodia"
    - option "Cameroon"
    - option "Canada"
    - option "Cape Verde"
    - option "Cayman Islands"
    - option "Central African Republic"
    - option "Chad"
    - option "Chile"
    - option "China"
    - option "Christmas Island"
    - option "Cocos (Keeling) Islands"
    - option "Colombia"
    - option "Comoros"
    - option "Congo"
    - option "Congo, Democratic Republic of the"
    - option "Cook Islands"
    - option "Costa Rica"
    - option "Cote d'Ivoire"
    - option "Croatia"
    - option "Cuba"
    - option "Curaçao"
    - option "Cyprus"
    - option "Czech Republic"
    - option "Denmark"
    - option "Djibouti"
    - option "Dominica"
    - option "Dominican Republic"
    - option "Ecuador"
    - option "Egypt"
    - option "El Salvador"
    - option "Equatorial Guinea"
    - option "Eritrea"
    - option "Estonia"
    - option "Ethiopia"
    - option "Falkland Islands"
    - option "Faroe Islands"
    - option "Federated States of Micronesia"
    - option "Fiji"
    - option "Finland"
    - option "France"
    - option "French Guiana"
    - option "French Polynesia"
    - option "Gabon"
    - option "Gambia"
    - option "Georgia"
    - option "Germany"
    - option "Ghana"
    - option "Gibraltar"
    - option "Greece"
    - option "Greenland"
    - option "Grenada"
    - option "Guadeloupe"
    - option "Guam"
    - option "Guatemala"
    - option "Guernsey"
    - option "Guinea"
    - option "Guinea-Bissau"
    - option "Guyana"
    - option "Haiti"
    - option "Holy See (Vatican City State)"
    - option "Honduras"
    - option "Hong Kong"
    - option "Hungary"
    - option "Iceland"
    - option "India" [selected]
    - option "Indonesia"
    - option "Iran"
    - option "Iraq"
    - option "Ireland"
    - option "Isle of Man"
    - option "Israel"
    - option "Italy"
    - option "Jamaica"
    - option "Japan"
    - option "Jersey"
    - option "Jordan"
    - option "Kazakhstan"
    - option "Kenya"
    - option "Kiribati"
    - option "Kosovo"
    - option "Kuwait"
    - option "Kyrgyzstan"
    - option "Laos"
    - option "Latvia"
    - option "Lebanon"
    - option "Lesotho"
    - option "Liberia"
    - option "Libya"
    - option "Liechtenstein"
    - option "Lithuania"
    - option "Luxembourg"
    - option "Macao"
    - option "Madagascar"
    - option "Malawi"
    - option "Malaysia"
    - option "Maldives"
    - option "Mali"
    - option "Malta"
    - option "Marshall Islands"
    - option "Martinique"
    - option "Mauritania"
    - option "Mauritius"
    - option "Mayotte"
    - option "Mexico"
    - option "Moldova"
    - option "Monaco"
    - option "Mongolia"
    - option "Montenegro"
    - option "Montserrat"
    - option "Morocco"
    - option "Mozambique"
    - option "Myanmar"
    - option "Namibia"
    - option "Nauru"
    - option "Nepal"
    - option "Netherlands"
    - option "New Caledonia"
    - option "New Zealand"
    - option "Nicaragua"
    - option "Niger"
    - option "Nigeria"
    - option "Niue"
    - option "Norfolk Island"
    - option "North Korea"
    - option "North Macedonia"
    - option "Northern Mariana Islands"
    - option "Norway"
    - option "Oman"
    - option "Pakistan"
    - option "Palau"
    - option "Palestine"
    - option "Panama"
    - option "Papua New Guinea"
    - option "Paraguay"
    - option "Peru"
    - option "Philippines"
    - option "Poland"
    - option "Portugal"
    - option "Puerto Rico"
    - option "Qatar"
    - option "Reunion"
    - option "Romania"
    - option "Russia"
    - option "Rwanda"
    - option "Saint Barthélemy"
    - option "Saint Helena"
    - option "Saint Kitts and Nevis"
    - option "Saint Lucia"
    - option "Saint Martin (French Part)"
    - option "Saint Pierre and Miquelon"
    - option "Saint Vincent and the Grenadines"
    - option "Samoa"
    - option "San Marino"
    - option "Sao Tome and Principe"
    - option "Saudi Arabia"
    - option "Senegal"
    - option "Serbia"
    - option "Seychelles"
    - option "Sierra Leone"
    - option "Singapore"
    - option "Sint Maarten"
    - option "Slovakia"
    - option "Slovenia"
    - option "Solomon Islands"
    - option "Somalia"
    - option "South Africa"
    - option "South Korea"
    - option "South Sudan"
    - option "Spain"
    - option "Sri Lanka"
    - option "Sudan"
    - option "Suriname"
    - option "Svalbard and Jan Mayen"
    - option "Swaziland"
    - option "Sweden"
    - option "Switzerland"
    - option "Syria"
    - option "Taiwan"
    - option "Tajikistan"
    - option "Tanzania"
    - option "Thailand"
    - option "Timor-Leste"
    - option "Togo"
    - option "Tokelau"
    - option "Tonga"
    - option "Trinidad and Tobago"
    - option "Tristan da Cunha"
    - option "Tunisia"
    - option "Turkey"
    - option "Turkmenistan"
    - option "Turks and Caicos Islands"
    - option "Tuvalu"
    - option "Uganda"
    - option "Ukraine"
    - option "United Arab Emirates"
    - option "United Kingdom"
    - option "United States"
    - option "Uruguay"
    - option "Uzbekistan"
    - option "Vanuatu"
    - option "Venezuela"
    - option "Vietnam"
    - option "Virgin Islands, British"
    - option "Virgin Islands, U.S."
    - option "Wallis and Futuna"
    - option "Western Sahara"
    - option "Yemen"
    - option "Zambia"
    - option "Zimbabwe"
  - textbox "+91 98765 43210": "+91"
  - alert: Required
  - text: Subject *
  - textbox "Subject *":
    - /placeholder: What is this about?
    - text: Need more information
  - text: Message *
  - textbox "Message *":
    - /placeholder: Your message...
    - text: Please send me your product catalogue and pricing details.
  - button "Send Message"
  - paragraph: Your information is used only to respond to your enquiry. We do not share it with third parties.
  - paragraph: OUR LOCATIONS
  - heading "Where to Find Us" [level=2]
  - paragraph: MANUFACTURING FACILITY
  - heading "MIDC Ranjangaon" [level=3]
  - text: Gat No. 596, Dhokh Sanghvi, Tal. Shirur, Pune Maharashtra, India 412026
  - link "Get directions to MIDC Ranjangaon — opens in Google Maps":
    - /url: https://maps.app.goo.gl/a8WygP8xiao1NF7w5
    - img
    - text: Get Directions →
  - paragraph: COMMERCIAL OFFICE
  - heading "World Trade Center, Kharadi" [level=3]
  - text: World Trade Center, Kharadi, Pune Maharashtra, India
  - link "Get directions to World Trade Center, Kharadi — opens in Google Maps":
    - /url: https://maps.google.com/?q=World+Trade+Center+Kharadi+Pune
    - img
    - text: Get Directions →
  - text: FREQUENTLY ASKED
  - heading "Common Questions" [level=2]
  - button "How quickly does your team respond to enquiries?":
    - text: How quickly does your team respond to enquiries?
    - img
  - region:
    - paragraph: One working day
  - button "What information do you need to provide a quotation?":
    - text: What information do you need to provide a quotation?
    - img
  - region:
    - paragraph: To prepare an accurate quotation, it helps to know the material grade or application requirements, approximate quantity, delivery location, and any technical specifications. Our team will follow up if we need further details.
  - button "Do you supply to international buyers?":
    - text: Do you supply to international buyers?
    - img
  - region:
    - paragraph: Yes. We currently supply to clients in India and four international export markets. Contact us to discuss your export requirement.
  - button "Can you assist with material selection for my application?":
    - text: Can you assist with material selection for my application?
    - img
  - region:
    - paragraph: Yes — material selection guidance is part of what we offer. Share your application requirements and our technical team will recommend appropriate grades.
  - button "What file formats do you accept for technical specifications?":
    - text: What file formats do you accept for technical specifications?
    - img
  - region:
    - paragraph: PDF, Word documents (DOC/DOCX), and standard engineering drawing formats. Email specifications directly to our technical team if you prefer.
- contentinfo "Site footer":
  - heading "Atharva Polymers" [level=3]
  - paragraph: Precision Polymer Manufacturing Built on Experience
  - text: MIDC Ranjangaon, Pune, Maharashtra, India
  - link "+91 9011534516":
    - /url: tel:+91 9011534516
  - link "shantanu.dhanu@atharvapolymers.com":
    - /url: mailto:shantanu.dhanu@atharvapolymers.com
  - link "Chat on WhatsApp":
    - /url: https://wa.me/?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20polymer%20products%20and%20manufacturing%20capabilities.
  - heading "Quick Links" [level=3]
  - list:
    - listitem:
      - link "Home":
        - /url: /
    - listitem:
      - link "Solutions":
        - /url: /solutions
    - listitem:
      - link "Products":
        - /url: /products
    - listitem:
      - link "Industries":
        - /url: /industries
    - listitem:
      - link "Manufacturing & Quality":
        - /url: /manufacturing
    - listitem:
      - link "Capabilities":
        - /url: /capabilties
    - listitem:
      - link "Services & Capabilities":
        - /url: /services
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Contact":
        - /url: /contact
  - heading "Industries" [level=3]
  - list:
    - listitem:
      - link "Automotive":
        - /url: /industries/automotive
    - listitem:
      - link "Furniture":
        - /url: /industries/furniture
    - listitem:
      - link "Appliances":
        - /url: /industries/appliances
    - listitem:
      - link "Industrial & FMCG":
        - /url: /industries/others
  - heading "Company" [level=3]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Gallery":
        - /url: /gallery
    - listitem:
      - link "Careers":
        - /url: /careers
    - listitem:
      - link "Insights":
        - /url: /insights
  - paragraph: © 2026 Atharva Polymers Pvt Ltd. All rights reserved.
  - link "Privacy Policy":
    - /url: /privacy
  - link "Terms of Use":
    - /url: /terms
- alert
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
> 54  |     await expect(page.getByText(/enquiry received|thank you|success/i)).toBeVisible({ timeout: 10_000 });
      |                                                                         ^ Error: expect(locator).toBeVisible() failed
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
  83  |     await page.locator('input[name="phone"]').fill('abc');
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