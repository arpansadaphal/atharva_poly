export const industryOptions = [
  { value: 'automotive', label: 'Automotive' },
  { value: 'packaging', label: 'Packaging & FMCG' },
  { value: 'consumer-goods', label: 'Consumer Goods' },
  { value: 'industrial', label: 'Industrial Manufacturing' },
  { value: 'other', label: 'Other' },
]

export const experienceOptions = [
  { value: '0-2', label: 'Less than 2 years' },
  { value: '2-5', label: '2–5 years' },
  { value: '5-10', label: '5–10 years' },
  { value: '10+', label: 'More than 10 years' },
]

// ⚠ All values below require client confirmation before launch
export const businessInfo = {
  manufacturingAddress: {
    line1: 'MIDC Ranjangaon',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    googleMapsUrl: 'https://maps.google.com/?q=MIDC+Ranjangaon+Pune',
  },
  commercialAddress: {
    line1: 'World Trade Center, Kharadi',
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    googleMapsUrl: 'https://maps.google.com/?q=World+Trade+Center+Kharadi+Pune',
  },
  phone: '⚠ Client validation required',
  email: '⚠ Client validation required',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  workingHours: '⚠ Client validation required',
  founded: '2007',
  exportMarkets: 4,
}

export const contactFAQ = [
  {
    question: 'How quickly does your team respond to enquiries?',
    answer: '⚠ Client validation required. Remove placeholder before launch.',
  },
  {
    question: 'What information do you need to provide a quotation?',
    answer:
      'To prepare an accurate quotation, it helps to know the material grade or application requirements, approximate quantity, delivery location, and any technical specifications. Our team will follow up if we need further details.',
  },
  {
    question: 'Can you provide material samples?',
    answer: '⚠ Validate sample supply policy with client before publishing.',
  },
  {
    question: 'Do you supply to international buyers?',
    answer:
      'Yes. We currently supply to clients in India and four international export markets. Contact us to discuss your export requirement.',
  },
  {
    question: 'What is the minimum order quantity?',
    answer: '⚠ Client validation required.',
  },
  {
    question: 'Can you assist with material selection for my application?',
    answer:
      'Yes — material selection guidance is part of what we offer. Share your application requirements and our technical team will recommend appropriate grades.',
  },
  {
    question: 'What file formats do you accept for technical specifications?',
    answer:
      'PDF, Word documents (DOC/DOCX), and standard engineering drawing formats. Email specifications directly to our technical team if you prefer.',
  },
]