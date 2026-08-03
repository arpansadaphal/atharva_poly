# Atharva Polymers — Codebase Structure Map

> Generated for handoff to another AI / developer.
> Stack: Next.js 16.2.7 (App Router, Turbopack) · React 19.2.4 · TypeScript 5 · Tailwind CSS 4 · Framer Motion 11 · Lucide React · react-globe.gl (three.js)

---

## 1. Project Root

```
Atharva-polymers/
├── package.json              # Dependencies + scripts (dev, build, start, lint)
├── tsconfig.json             # TS config — path alias "@//*" → "src/*"
├── next.config.ts            # Next.js config
├── next-env.d.ts
├── tailwind.config.ts        # Tailwind v4 config (CSS-based, minimal JS config)
├── postcss.config.mjs        # PostCSS w/ @tailwindcss/postcss
├── eslint.config.mjs         # ESLint flat config (eslint-config-next)
├── .gitignore
└── README.md
```

**NPM Scripts:**
- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — ESLint

**Key Dependencies:**
- `next@16.2.7`, `react@19.2.4`, `react-dom@19.2.4`
- `framer-motion@^11` — animation library
- `lucide-react@^0.400.0` — icons
- `react-globe.gl@^2.38.0` + `three@^0.185.1` — 3D globe (InternationalReach)
- `react-hook-form@^7.52.0` + `@hookform/resolvers@^3.6.0` + `zod@^3.23.0` — contact form
- `resend@^3.3.0` — email API
- `clsx@^2.1.0` + `tailwind-merge@^2.6.1` — class utilities

---

## 2. App Router — Pages & Layouts

```
src/app/
├── layout.tsx                # Root layout — Inter font, Navbar, Footer, WhatsAppButton
├── globals.css               # Global styles, Tailwind directives, custom CSS
├── page.tsx                  # Homepage (/) — Server Component
├── about/
│   └── page.tsx              # About page (/about) — Server Component
└── api/
    └── route.ts              # Contact form POST endpoint (Resend email)
```

### `src/app/layout.tsx`
- Loads **Inter** font (weights 200, 300, 400, 500, 600) via `next/font/google`, injects as `--font-inter`.
- Wraps all pages with `<Navbar />`, `{children}`, `<Footer />`, `<WhatsAppButton />`.
- Site-wide metadata: title template "%s | Atharva Polymers", default description, OpenGraph, Twitter cards, robots.
- `metadataBase` from `NEXT_PUBLIC_SITE_URL` env (defaults to https://www.atharvapolymers.com).

### `src/app/page.tsx` (Homepage)
Section order: Hero → CompanyIntroduction → ImpactMetrics → WhyAtharva → ProductCategories → IndustriesServed → ManufacturingQuality → CertificationsTrust → ContactCTA.

### `src/app/about/page.tsx` (About)
Section order: PageOpener → DirectorsNote → CompanyJourney → EngineeringPhilosophy → InsideTheFactory → LeadershipSection → InternationalReach (dynamic, ssr:false via wrapper) → CertificationsTrust (compact) → AboutFinalCTA.
- Imports from `@/components/sections/about` barrel.
- `InternationalReach` is dynamically imported through `InternationalReachWrapper` to avoid SSR issues with react-globe.gl (`window is not defined`).

### `src/app/api/route.ts`
- POST handler for contact form submission.
- Uses Resend to send email.
- ⚠ Pre-existing warning: unused `buildEmailHtml` function.

---

## 3. Components — Sections (Homepage)

```
src/components/sections/
├── index.ts                  # Barrel export (homepage sections)
├── Navbar.tsx                # (275 lines) Fixed nav, transparent over hero, solid on scroll, mobile menu
├── Footer.tsx                # (250 lines) Multi-column footer, nav links, contact info
├── Hero.tsx                  # (290 lines) Full-screen hero, split layout, hero sequence animation
├── CompanyIntroduction.tsx   # (252 lines) Two-column intro section
├── ImpactMetrics.tsx         # (122 lines) Count-up metrics, useCountUp hook
├── WhyAtharva.tsx            # (107 lines) Differentiators grid
├── ProductCategories.tsx    # (187 lines) Product preview cards, hover top-border draw
├── IndustriesServed.tsx      # (106 lines) 2×2 industry grid w/ borders
├── ManufacturingQuality.tsx  # (176 lines) Dark section, divider draw, photography
├── CertificationsTrust.tsx   # (418 lines) Cert badges, LightboxModal, optional `compact` prop
├── ContactCTA.tsx            # (92 lines) Dark CTA, Request Quote + WhatsApp buttons
└── WhatsAppButton.tsx        # (120 lines) Floating WhatsApp button, all pages
```

### Key section details:

**`Navbar.tsx`** — Client component ('use client'). Fixed positioning, scroll listener toggles transparent→solid. Mobile menu with AnimatePresence. Uses `navbarReveal`, `mobileMenuReveal`, `mobileNavItem` animation variants.

**`Hero.tsx`** — Uses `heroTransitions` timed sequence (specMark → eyebrow → 3 headline lines → description → CTAs → trust badges → photography). `heroPhotoReveal` for image. Split-column layout.

**`ProductCategories.tsx`** — Hover-triggered 3px blue top-border that draws left→right (linear, not eased). Card shell: `rounded-xl`, `border border-slate-200`, hover translate-y-1 + shadow.

**`CertificationsTrust.tsx`** — Accepts optional `compact` prop (added for About page). Smaller cert cards (max-w-[280px]), centered header when compact. Uses `LightboxModal` for cert PDF preview. ⚠ Pre-existing warning: unused `ExternalLink`.

**`IndustriesServed.tsx`** — 2×2 grid with 1px `border-slate-200` dividers. Cell hover: bg-slate-50→bg-white, shadow overlay. Uses Lucide icons (Car, Package, ShoppingBag, Factory).

---

## 4. Components — Sections (About Page)

```
src/components/sections/about/
├── index.ts                  # Barrel export for all about sections
├── PageOpener.tsx            # (130 lines) Dark hero (bg-slate-900 + NoiseOverlay), "2007—2026" numeral
├── DirectorsNote.tsx         # (159 lines) Founder's note, editorial spread
├── CompanyJourney.tsx       # (123 lines) Pinned scroll timeline, useScroll/useTransform, JourneyBeat type
├── EngineeringPhilosophy.tsx # (77 lines) Principles grid
├── InsideTheFactory.tsx     # (165 lines) Factory photography, uses public/assets/factory/ + machinery/
├── LeadershipSection.tsx    # (268 lines) Founder spread + team card horizontal scroll synced to page scroll
├── InternationalReach.tsx  # (97 lines) react-globe.gl 3D globe, markers for Pune/USA/Mexico (client-only)
├── InternationalReachWrapper.tsx # (11 lines) Dynamic import wrapper w/ ssr:false
└── AboutFinalCTA.tsx        # (144 lines) Final dark CTA section
```

### Key about section details:

**`LeadershipSection.tsx`** — `FounderSpread` (large founder card) + `TeamScrollArea` (horizontal scroll of team cards). Scroll position synced to page scroll via manual rAF + scroll listener. 4 cards visible at a glance on desktop. Card width: `w-[240px] lg:w-[260px]`. Uses `ChevronLeft`/`ChevronRight` from lucide for nav buttons.

**`InternationalReach.tsx`** — `'use client'`. Imports `Globe` from `react-globe.gl` (default import, cast to `any` as `AnyGlobe` to bypass prop type issues). `globeRef` typed as `useRef<any>(null)`. Markers: Pune [73.8567, 18.5204], USA [-95.7129, 37.0902], Mexico [-102.5528, 23.6345]. Globe image from unpkg CDN. ESLint suppressions for `any` types.

**`InternationalReachWrapper.tsx`** — Necessary因为 `next/dynamic` with `ssr:false` not allowed in Server Components. Wrapper is a Client Component that dynamically imports InternationalReach.

**`CompanyJourney.tsx`** — Uses `useScroll` (target: sectionRef, offset: start start → end end) + `useTransform` to map scrollYProgress → beatIndex (0 to beats.length-1). Triangular opacity function: `Math.max(0, 1 - Math.abs(i - beatIndex.get()))`. Progress hairline + moving dot. Uses `JourneyBeat` type from `@/types`.

---

## 5. Components — UI (Reusable)

```
src/components/ui/
├── index.ts                  # Barrel export
├── Button.tsx                # (117 lines) Variants: primary, secondary, outline, whatsapp; sizes: sm, md, lg
├── SectionHeader.tsx         # (224 lines) Eyebrow + headline + description, spec mark, theme support
├── FadeOnScroll.tsx          # (116 lines) Generic scroll-triggered fade wrapper
├── NoiseOverlay.tsx          # (39 lines) SVG noise texture overlay for dark sections
├── PhotoPlaceholder.tsx      # (81 lines) Placeholder for missing images
├── LightboxModal.tsx         # (120 lines) Modal for cert PDF/sheet preview, AnimatePresence
```

### Key UI component details:

**`Button.tsx`** — Props: `variant`, `size`, `href`, `external`, `onClick`, `type`, `disabled`, `aria-label`. Renders `<a>` if `href` provided, else `<button>`. Primary: `bg-blue-600 text-white`. Outline: `border border-slate-300`. WhatsApp: `bg-[#25D366] text-white`.

**`SectionHeader.tsx`** — Props from `SectionHeaderProps` type: `eyebrow`, `headline`, `description`, `align` (left/center), `theme` (light/dark), `headingLevel` (h1/h2). Spec mark (2px blue vertical line) draws before eyebrow.

**`NoiseOverlay.tsx`** — Renders inline SVG noise pattern, `aria-hidden="true"`, `opacity-[0.03]`, `mix-blend-overlay`. Used on dark sections (Hero, PageOpener, ManufacturingQuality, ContactCTA, PageHero).

---

## 6. Hooks

```
src/hooks/
└── useCountUp.ts             # Count-up animation hook for ImpactMetrics
```

---

## 7. Lib — Data, Animations, Utils

```
src/lib/
├── data.ts                   # (586 lines) All homepage data: navItems, metrics, products, industries, certs, etc.
├── animations.ts            # (300 lines) All Framer Motion variants + easing
├── utils.ts                  # cn() — clsx + tailwind-merge
└── whatsapp.ts              # buildWhatsAppURL helper — wa.me link w/ pre-filled message
```

### `src/lib/animations.ts` — Exports:

- **Easing:** `ease = [0.22, 1, 0.36, 1]` (triangular, premium feel)
- **Reveals:** `fadeUp`, `fadeUpSmall`, `fadeIn`
- **Stagger:** `staggerContainer` (staggerChildren 0.08, delayChildren 0.35), `staggerItem`, `staggerItemFast`
- **Signature devices:** `specMark` (scaleY 0→1, 250ms, origin-top), `eyebrowReveal` (follows specMark, 300ms delay)
- **Photography:** `photoReveal` (scale 1.03→1, 800ms), `heroPhotoReveal` (1.04→1, 1.2s)
- **Divider:** `dividerDraw` (scaleY, 400ms, 200ms delay)
- **Hero sequence:** `heroTransitions` — full timed object (specMark, eyebrow, headline1-3, description, ctaPrimary/Secondary, trust1-4, photography)
- **Navbar:** `navbarReveal`, `mobileMenuReveal`, `mobileNavItem`
- **Page transitions:** `pageEnter`
- **Editorial/About:** `journeyBeat`, `ruleDraw` (horizontal hairline scaleX), `editorialPhoto` (1.04→1, 1.0s)

### `src/lib/data.ts` — Contains:

Homepage data: `navItems`, `metrics` (ImpactMetrics), `products` (ProductCategories preview), `industries`, `certifications` (with `localPdfPath`, `optimizedWebPPath`), `differentiators`, `exportMarkets`, `contactInfo`, `address`.

About page data (`aboutPage` object): `meta`, `directorsNote`, `journeyBeats` (6 beats), `principles` (4), `leadership` (5 members incl. founder), `factoryCaptions` (6), `aboutStats` (4).

### `src/lib/whatsapp.ts`

```typescript
buildWhatsAppURL(product?, industry?) → `https://wa.me/${number}?text=${encodedMessage}`
```
Uses `NEXT_PUBLIC_WHATSAPP_NUMBER` env var.

---

## 8. Types

```
src/types/
└── index.ts                  # (260 lines) All TypeScript interfaces
```

### Exports:

- **Navigation:** `NavItem`
- **Company:** `Metric`, `Address`, `ContactInfo`
- **Products:** `Product` (id, slug, category, name, description, applications, tags, image, specifications), `ProductSpecification`
- **Industries:** `Industry` (id, slug, name, description, applications, icon, relatedProductIds)
- **Certifications:** `Certification` (short, full, id, certNumber, validUntil, issuerUrl, localPdfPath, optimizedWebPathPath)
- **Case Studies:** `CaseStudy`
- **Differentiators:** `Differentiator` (icon, title, description)
- **Export Markets:** `ExportMarket` (name, countryCode, isPrimary, svgX, svgY)
- **Careers:** `JobListing`
- **Insights:** `Insight`
- **Gallery:** `GalleryCategory`, `GalleryImage`
- **Component Props:** `SectionHeaderProps`, `ButtonVariant`, `ButtonSize`, `ButtonProps`, `FooterColumn`
- **About Page:** `JourneyBeat` (year, yearLabel, headline, body, imageSrc, imageAlt, principle), `Principle` (number, title, body), `Leader` (role, name, bio, imageSrc, imageAlt, span), `AboutStat`, `FactoryCaption`

⚠ Note: The existing `Product` type in `src/types/index.ts` is simpler than the one specified in the Products Page Implementation Guide. The guide specifies a richer `Product` interface (with `keyProperties`, `technicalSpecs`, `downloads`, `faq`, etc.) to be added in `src/types/products.ts` (new file).

---

## 9. Public Assets

```
public/
├── images/
│   └── certs/                # Optimized WebP cert images (4 files)
└── assets/
    ├── factory/              # (4 files) Factory photos — .jpeg, used in InsideTheFactory
    ├── machinery/           # (5 files) Machine photos — .webp/.jpg, used in InsideTheFactory
    ├── polymer/             # (3 files) Polymer/beads photos
    ├── team/                # (5 files) Team photos — leadership.jpg, 1658747856497.jpeg, images.jpeg, 1778938994361.jpeg, 00India-Women-Jobs-gmfz-articleLarge.webp
    ├── logos/               # (1 file) Logo image
    ├── pdfs/                # (4 PDFs) Cert PDFs: IATF, ISO, EMS, OHSMS
    ├── products/            # (empty) — for product card images
    ├── gallery/             # (empty) — reserved
    ├── hero/                # (empty) — reserved
    ├── icons/               # (empty) — reserved
    ├── industries/          # (empty) — reserved
    └── patterns/            # (empty) — reserved
```

### Certification Files:

| Cert | PDF (public/assets/pdfs/) | WebP (public/images/certs/) |
|---|---|---|
| IATF 16949 | `IATF_Certificate-Atharva_Polymers-2024.pdf` | `IATF_Certificate-Atharva_Polymers-2024.webp` |
| ISO 9001 | `ISO_Certificate-Atharva_Polymers-2024.pdf` | `ISO_Certificate-Atharva Polymers-2024.webp` ⚠ space in filename |
| ISO 14001 (EMS) | `EMS_Certificate-2025.pdf` | `EMS_Certificate_2025.webp` |
| ISO 45001 (OHSMS) | `OHSMS_Certificate-2025.pdf` | `OHSMS_Certificate-2025.webp` |

---

## 10. Path Aliases (tsconfig.json)

```
"@/*" → "src/*"
```

All imports use `@/components/...`, `@/lib/...`, `@/types/...`, `@/hooks/...`.

---

## 11. Design System Tokens (Locked)

### Colors (Tailwind classes)
- **Dark Primary:** `slate-900` (hero, CTA, certs)
- **Dark Secondary:** `slate-800` (cert section bg on detail)
- **Light Primary:** `white` (grids, overview, downloads)
- **Light Secondary:** `slate-50` (specs, applications, FAQ, inquiry)
- **Brand Accent:** `blue-600` (≤10% visual area — spec marks, CTAs, badges, filters, links)
- **Borders:** `slate-200`
- **Body text (light bg):** `slate-600`
- **Supporting text:** `slate-500`
- **Eyebrow labels (dark bg):** `slate-400`
- **WhatsApp green:** `#25D366` (inquiry CTA only)

### Typography (Inter)
- Hero H1: `font-[300]` (Light), 56px desktop / 36px mobile
- Section H2: `font-normal text-4xl` (Regular, 40px)
- Card title H3: `font-semibold text-lg` (18-20px)
- Eyebrow: `font-semibold text-[11px] uppercase tracking-[0.1em]`
- Body: `font-normal text-[16px] leading-7`
- Spec values: `font-semibold text-[14px]`
- Spec labels: `font-normal text-[14px] text-slate-500`

### Spacing
- Section padding: `py-[120px] md:py-24 lg:py-[120px]` (master plan specifies `section-padding` utility)
- Container: `max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12`
  - Exception: InsideTheFactory uses `max-w-[1440px]`
- Card gap: `gap-6` (mobile) → `gap-8` (desktop)
- Card radius: `rounded-xl` (12px)
- Cert card radius: **0px — never rounded**

### Signature Devices
1. **Spec Mark** — 2px vertical `bg-blue-600` line, scaleY 0→1, origin-top, 250ms (draws before eyebrow)
2. **Photo Reveal** — scale 1.03→1, opacity 0→1, 800ms

### Motion Easing
`ease = [0.22, 1, 0.36, 1]` — triangular curve, premium feel. Used for ALL structural animations.

---

## 12. Patterns & Conventions

### Component organization
- Sections live in `src/components/sections/` (homepage) or `src/components/sections/about/` (about page)
- UI components in `src/components/ui/`
- Barrel exports via `index.ts` in each directory
- `'use client'` directive at top of client components (scroll listeners, state, animations)

### Animation usage
- Import variants from `@/lib/animations`: `ease`, `fadeUp`, `staggerContainer`, `staggerItem`, `specMark`, `eyebrowReveal`, `photoReveal`, etc.
- Scroll-triggered: `useInView` from framer-motion with `{ once: true, margin: '-80px 0px' }`
- Mount-triggered: `initial="hidden" animate="visible"`
- Stagger: parent uses `staggerContainer`, children use `staggerItem`

### Class merging
Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) for conditional classes.

### ⚠ Known technical debt
- `useMotionValueEvent` from framer-motion v11 has a memory leak (no cleanup in `useInsertionEffect`) — AVOID using it. Use `useTransform` or manual rAF listeners instead.
- `src/app/api/route.ts`: unused `buildEmailHtml` (pre-existing warning)
- `src/components/ui/LightboxModal.tsx`: unused `ExternalLink` import (pre-existing warning)
- ISO cert WebP filename has a space: `ISO_Certificate-Atharva Polymers-2024.webp`

---

## 13. Environment Variables

Required env vars (in `.env.local`):
- `NEXT_PUBLIC_SITE_URL` — site base URL (e.g. https://www.atharvapolymers.com)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp number for `buildWhatsAppURL`
- Resend API key (for `src/app/api/route.ts` email sending)

---

## 14. Lint & Build

- **Lint command:** `npm run lint` — currently 0 errors, 2 pre-existing warnings (buildEmailHtml, ExternalLink)
- **Build command:** `npm run build` — succeeds, `/` and `/about` prerendered as static, `/api` dynamic server-rendered
- **TypeScript:** strict mode, `next build` runs type check

---

## 15. What Exists vs. What's Specified (Not Yet Built)

### Exists & production-ready:
- Homepage (`/`) with 9 sections
- About page (`/about`) with 9 sections
- All homepage sections, all about page sections
- InternationalReach with react-globe.gl globe
- Contact form API endpoint

### Specified but NOT yet built (per Products Page Implementation Guide v1.0):
- `/products` — Products overview page
- `/products/[slug]` — Product detail page
- `src/types/products.ts` — richer Product interface (keyProperties, technicalSpecs, downloads, faq, relatedProductSlugs, images object)
- `src/lib/products-data.ts` — product data + helpers (getProductBySlug, getProductsByCategory, etc.)
- `src/components/ProductCard.tsx` — enhanced reusable card (default/compact variants)
- `src/components/sections/PageHero.tsx` — reusable compact interior hero
- `src/components/ui/FilterTabs.tsx`
- `src/components/ui/SpecificationTable.tsx`
- `src/components/ui/FAQAccordion.tsx`
- `src/components/ui/DownloadItem.tsx`
- `src/components/ui/BreadcrumbNav.tsx`
- `src/components/ui/KeyPropertiesPanel.tsx`
- `src/components/ui/InquiryBanner.tsx`
- `src/components/sections/products/ProductGrid.tsx`
- `src/components/sections/products/IndustryApplicationMap.tsx`
- `src/components/sections/products/ProductDetailHeader.tsx`
- `src/components/sections/products/ProductOverview.tsx`
- `src/components/sections/products/ProductSpecifications.tsx`
- `src/components/sections/products/ProductApplications.tsx`
- `src/components/sections/products/ProductDownloads.tsx`
- `src/components/sections/products/ProductFAQ.tsx`
- `src/components/sections/products/RelatedProducts.tsx`
- `src/components/sections/products/ProductInquiryCTA.tsx`
- `/contact` page with searchParams pre-fill (product, inquiry)
- Product photography assets in `public/assets/products/[slug]/`

### Existing components reusable for Products page:
- `Navbar`, `Footer`, `WhatsAppButton` — as-is
- `NoiseOverlay` — for PageHero, ProductInquiryCTA
- `SectionHeader` — for all section headers
- `Button` — for CTAs
- `ContactCTA` — reused on `/products` overview
- `CertificationsTrust` — reused on detail page (may need `certifications` prop added for filtering by product)

---

*End of codebase structure map*
