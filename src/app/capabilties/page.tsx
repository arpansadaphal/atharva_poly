// app/capabilities/page.tsx

import PageHero from '@/components/sections/services/PageHero'
import BreadcrumbNav from '@/components/ui/BreadcrumbNav'
import { SectionHeader } from '@/components/ui/service/SectionHeader'
import { Metadata } from 'next'
import CapabilityPillarSection from '@/components/sections/capabilities/CapabilityPillarSection'
import CapabilityPillarsNav from '@/components/sections/capabilities/CapabilityPillarsNav'

export const metadata: Metadata = {
  title: 'Capabilities | Atharva Polymers, Pune',
  description:
    'Engineering, mold design, injection moulding, secondary operations, assembly, and quality systems from Atharva Polymers. IATF 16949 certified.',
  openGraph: {
    title: 'Capabilities | Atharva Polymers',
    description:
      'Comprehensive product development, mould design, injection moulding, secondary operations, assembly, and quality systems — all under one roof.',
    url: 'https://www.atharvapolymers.com/capabilities',
  },
  alternates: { canonical: 'https://www.atharvapolymers.com/capabilities' },
}

export default function CapabilitiesPage() {
  // ----- Define image sets (using your folder structure) -----
  const engineeringImages = [
    { src: '/assets/capabilities/engineering/2.jpg', alt: 'Engineering team collaborating' },
    { src: '/assets/capabilities/engineering/design.jpg', alt: 'CAD modelling' },
    { src: '/assets/capabilities/engineering/dfm-2.jpg', alt: 'Prototyping' },
    { src: '/assets/capabilities/engineering/engg-dfm.jpg', alt: 'Prototyping' },
    { src: '/assets/capabilities/engineering/material.jpg', alt: 'Prototyping' },
    { src: '/assets/capabilities/engineering/mold.jpg', alt: 'Prototyping' },
  ]

  const moldImages = [
    { src: '/assets/capabilities/mold-design/m2.jpg', alt: 'Mold design CAD' },
    { src: '/assets/capabilities/mold-design/M3.jpg', alt: 'Mold manufacturing' },
    { src: '/assets/capabilities/mold-design/mold2.jpg', alt: 'High-cavitation mold' },
    { src: '/assets/capabilities/mold-design/mold4.jpg', alt: 'High-cavitation mold' },
    { src: '/assets/capabilities/mold-design/mold5.jpg', alt: 'High-cavitation mold' },
    { src: '/assets/capabilities/mold-design/mold6.jpg', alt: 'High-cavitation mold' },
  ]

  const injectionImages = [
    { src: '/assets/capabilities/injection-moulding/in3.jpg', alt: 'Injection moulding machines' },
    { src: '/assets/capabilities/injection-moulding/in4.jpg', alt: 'Large tonnage press' },
    { src: '/assets/capabilities/injection-moulding/in6.jpg', alt: 'Cleanroom moulding' },
    { src: '/assets/capabilities/injection-moulding/in7.jpg', alt: 'Cleanroom moulding' },
    { src: '/assets/capabilities/injection-moulding/p1.jpg', alt: 'Cleanroom moulding' },
    { src: '/assets/capabilities/injection-moulding/p2.jpg', alt: 'Cleanroom moulding' },
    { src: '/assets/capabilities/injection-moulding/p3.jpg', alt: 'Cleanroom moulding' },
  ]

  const secondaryImages = [
    { src: '/assets/capabilities/secondary-operations/s1.jpg', alt: 'Ultrasonic welding' },
    { src: '/assets/capabilities/secondary-operations/s2-1.jpg', alt: 'Laser etching' },
    { src: '/assets/capabilities/secondary-operations/s3.jpg', alt: 'Pad printing' },
    { src: '/assets/capabilities/secondary-operations/s5-1.jpg', alt: 'Pad printing' },
    { src: '/assets/capabilities/secondary-operations/s5.jpg', alt: 'Pad printing' },
    { src: '/assets/capabilities/secondary-operations/s6.jpg', alt: 'Pad printing' },
  ]

  const assemblyImages = [
    { src: '/assets/capabilities/assembly/as1.jpg', alt: 'Assembly line' },
    { src: '/assets/capabilities/assembly/as2.jpg', alt: 'Furniture assembly' },
    { src: '/assets/capabilities/assembly/as5.jpg', alt: 'Furniture assembly' },
    { src: '/assets/capabilities/assembly/as6.jpg', alt: 'Furniture assembly' },
    { src: '/assets/capabilities/assembly/ass1.jpg', alt: 'Furniture assembly' },
    { src: '/assets/capabilities/assembly/ass3.jpg', alt: 'Furniture assembly' },
  ]

  const qualityImages = [
    { src: '/assets/capabilities/quality-systems/q1.jpg', alt: 'Quality inspection' },
    { src: '/assets/capabilities/quality-systems/qs1.jpg', alt: 'Certified lab' },
    { src: '/assets/capabilities/quality-systems/qs3.jpg', alt: 'Certified lab' },
    { src: '/assets/capabilities/quality-systems/qs4.jpg', alt: 'Certified lab' },
    { src: '/assets/capabilities/quality-systems/qs5.jpg', alt: 'Certified lab' },
    { src: '/assets/capabilities/quality-systems/qs6.jpg', alt: 'Certified lab' },
    { src: '/assets/capabilities/quality-systems/qs8.jpg', alt: 'Certified lab' },
  ]

  return (
    <>
      <PageHero
        eyebrow="CAPABILITIES"
        headline="Precision Engineering from Concept to Production"
        description="Comprehensive product development, mould design, injection moulding, secondary operations, assembly, and quality systems — all under one roof at our MIDC Ranjangaon facility."
      />

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 -mt-6 relative z-20 hidden sm:block">
        <BreadcrumbNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Capabilities' },
          ]}
          className="bg-white/90 backdrop-blur-sm rounded-lg py-2 px-4 inline-block"
        />
      </div>

      {/* S2 – Navigation Cards */}
      <section className="bg-white py-[60px] md:py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader
            eyebrow="WHAT WE OFFER"
            headline="Integrated Capabilities, One Partner"
            theme="light"
          />
          <div className="mt-8 md:mt-12">
            <CapabilityPillarsNav />
          </div>
        </div>
      </section>

      {/* S3 – Engineering (text left / image right) */}
      <CapabilityPillarSection
        id="engineering"
        align="text-left"
        title="Engineering"
        description="In our New Product Development (NPD) initiatives, we rely on proven tools such as APQP, PFMEA, and PPAP. These methodologies ensure each product is developed with a focus on risk mitigation, process capability, and customer satisfaction from the outset."
        accordionItems={[
          {
            title: 'Early Collaboration with Clients',
            content:
              'Our engineering team engages at the concept stage to align material selection, tooling strategy, and production planning with your product requirements — reducing downstream risk and accelerating time-to-market.',
          },
          {
            title: 'Design for Manufacturability (DFM)',
            content:
              'We analyse part geometry, wall thickness, draft angles, and gate locations to optimise your design for efficient, repeatable production before tooling begins.',
          },
          {
            title: 'Mold Flow Analysis',
            content:
              'Using advanced simulation software, we predict fill patterns, weld lines, air traps, and warpage — enabling proactive optimisation of gating, cooling, and ejection systems.',
          },
          {
            title: 'Material Selection',
            content:
              'Our technical team recommends the optimal polymer grade based on mechanical, thermal, chemical, and regulatory requirements for your specific application.',
          },
          {
            title: 'Prototyping',
            content:
              'Rapid prototyping capabilities allow us to produce functional samples for client evaluation, ensuring design validation before committing to full production tooling.',
          },
        ]}
        images={engineeringImages}
        background="slate-50"
      />

      {/* S4 – Mold Design (image left / text right) */}
      <CapabilityPillarSection
        id="mold-design"
        align="image-left"
        title="Mold Design & Manufacturing"
        description="At Atharva, we deliver comprehensive mold engineering solutions spanning the full spectrum — from conceptual design to final consignment. With over a decade of specialised experience, we bring unmatched technical depth and manufacturing precision."
        extraDescription="Our expertise covers automotive, medical, furniture, electrical, and engineering plastics. Using Siemens NX, CATIA, SolidWorks, and AutoDesk Moldflow, we simulate injection parameters and optimise gating, cooling, and ejection before cutting steel."
        accordionItems={[
          {
            title: 'CAD/CAM Design & Simulation',
            content:
              'Our engineers utilise Siemens NX, CATIA, SolidWorks, and AutoDesk Moldflow for detailed 3D modeling, simulation, and toolpath generation — ensuring precision before manufacturing begins.',
          },
          {
            title: 'High-Cavitation Molds (Up to 72 Cavities)',
            content:
              'We manufacture high-cavitation tooling including hot runner systems, multi-action tools, and high-speed molds built for longevity, repeatability, and maximum output with minimal maintenance.',
          },
          {
            title: 'Full Lifecycle Support & ECN Integration',
            content:
              'We provide complete lifecycle support including Engineering Change Notice (ECN) integration, ensuring flexibility and scalability throughout your product\'s development and production journey.',
          },
          {
            title: 'Rapid Mold Development',
            content:
              'Driven by lean manufacturing practices and precision tooling, Atharva is recognised for industry-leading mold development timelines without compromising quality or durability.',
          },
        ]}
        images={moldImages}
        background="white"
      />

      {/* S5 – Injection Moulding (text left / image right) */}
      <CapabilityPillarSection
        id="injection-moulding"
        align="text-left"
        title="Plastic Injection Moulding"
        description="We deliver precision-engineered injection moulding solutions designed to support complex product architectures, high-volume demands, and stringent industry requirements — positioning us as a strategic partner for OEMs and Tier 1 suppliers globally."
        accordionItems={[
          {
            title: 'High-Capacity Infrastructure',
            content:
              'Our MIDC Ranjangaon facility operates 35 injection moulding machines with round-the-clock production capability, ensuring we meet the most demanding volume requirements.',
          },
          {
            title: 'Wide Tonnage Range (Up to 1000 Ton)',
            content:
              'From 100T to 1,000T clamping force, our press range accommodates everything from small precision components to large structural parts — all with consistent quality.',
          },
          {
            title: 'Cleanroom Moulding (ISO Class Compliant)',
            content:
              'Dedicated cleanroom moulding environments meet ISO class standards for medical, pharmaceutical, and other contamination-sensitive applications.',
          },
          {
            title: 'Specialized Moulding Technologies',
            content:
              'Our technology portfolio includes gas-assisted moulding, over-moulding, insert moulding, and multi-shot processes — enabling complex part consolidation and enhanced functionality.',
          },
          {
            title: 'Metal-to-Plastic Conversion Expertise',
            content:
              'We specialise in converting metal components to engineered plastics, reducing weight, cost, and corrosion while maintaining or improving structural performance.',
          },
          {
            title: 'State-of-the-Art Equipment Portfolio',
            content:
              'Our machine park features modern, servo-driven injection moulding machines with closed-loop process control for exceptional repeatability and energy efficiency.',
          },
          {
            title: 'GMP-Compliant Manufacturing Systems',
            content:
              'Good Manufacturing Practice (GMP) protocols govern our production environment, material handling, documentation, and personnel training — ensuring compliance with the most rigorous industry standards.',
          },
        ]}
        images={injectionImages}
        background="slate-50"
      />

      {/* S6 – Secondary Operations (image left / text right) */}
      <CapabilityPillarSection
        id="secondary-operations"
        align="image-left"
        title="Secondary Operations"
        description="We offer a comprehensive range of secondary operations designed to enhance product functionality, aesthetics, and precision. Our advanced capabilities allow us to meet diverse customer requirements with high efficiency and consistent quality."
        accordionItems={[
          {
            title: 'Ultrasonic Welding',
            content:
              'High-frequency ultrasonic vibration creates clean, strong, and precise bonds between thermoplastic parts without adhesives, fasteners, or solvents — ideal for high-speed production.',
          },
          {
            title: 'Hot Plate Welding',
            content:
              'Controlled thermal welding for large or complex parts where joint integrity and hermetic sealing are critical — commonly used for automotive fluid reservoirs and industrial containers.',
          },
          {
            title: 'Vibration Welding',
            content:
              'Linear friction welding technology for joining large, irregularly shaped parts with high-strength requirements — suitable for a wide range of thermoplastic materials.',
          },
          {
            title: 'Machining of Plastics',
            content:
              'Precision CNC machining of plastic components for tight-tolerance features, post-mould finishing, and low-volume production runs where tooling investment is not required.',
          },
          {
            title: 'Laser Etching',
            content:
              'Permanent, high-contrast marking for part identification, branding, traceability codes, and decorative finishes — compatible with a wide range of polymer substrates.',
          },
          {
            title: 'Hot Foiling',
            content:
              'Metallic and pigmented foil transfer for premium decorative effects on plastic surfaces — delivering high-end aesthetics for consumer-facing products.',
          },
          {
            title: 'Screen Printing',
            content:
              'Versatile printing method for bold, durable graphics on flat and gently curved plastic surfaces — suitable for both small and large production batches.',
          },
          {
            title: 'Tampo Printing (Pad Printing)',
            content:
              'Precision pad printing for fine detail, multi-colour decoration on complex 3D surfaces — ideal for logos, dial markings, and small-format graphics on irregular geometries.',
          },
        ]}
        images={secondaryImages}
        background="white"
      />

      {/* S7 – Assembly (text left / image right) */}
      <CapabilityPillarSection
        id="assembly"
        align="text-left"
        title="Assembly"
        description="Our assembly line is a smart integration of low-cost automation and high-speed assembly machines, ensuring flexibility and precision while keeping costs optimised. We specialise in delivering assembly solutions that cater to diverse product segments."
        accordionItems={[
          {
            title: 'Wad assembly (induction and foam)',
            content:
              'Assembly of bottle caps using automated induction sealing liner and foam WAD insertion machines, with precision placement and quality checks to ensure consistent sealing performance and product reliability.',
          },
          {
            title: 'Furniture Parts Assembly',
            content:
              'Complete sub-assembly and final assembly of furniture components including structural frames, brackets, connectors, and modular systems for domestic and export markets.',
          },
          {
            title: 'Arm Assembly for Chairs',
            content:
              'Precision assembly of chair arm mechanisms with integrated adjustability features — combining moulded components with metal inserts and fasteners in a streamlined workflow.',
          },
          {
            title: 'Headrest Cushion Assembly',
            content:
              'Assembly of ergonomic headrest cushions combining foam padding, fabric covering, and precision-moulded structural cores — delivered as ready-to-install units.',
          },
          {
            title: 'Seat Assembly with Foam',
            content:
              'Full seat unit assembly integrating moulded shells, foam cushions, upholstery, and mounting hardware — tested for durability and comfort compliance.',
          },
          {
            title: 'High-Volume Small Parts Assembly',
            content:
              'Automated and semi-automated assembly lines for high-volume small parts — delivering consistent quality at competitive cycle times for cost-sensitive applications.',
          },
        ]}
        images={assemblyImages}
        background="slate-50"
      />

      {/* S8 – Quality Systems (image left / text right) */}
      <CapabilityPillarSection
        id="quality-systems"
        align="image-left"
        title="Quality Systems & Assurance"
        description="At Atharva, quality is not just a benchmark — it's a commitment deeply rooted in every aspect of our operations. Our focus on zero defects and first-time-right execution is supported by robust systems and structured methodologies."
        accordionItems={[
          {
            title: 'Quality Assurance',
            content:
              'Comprehensive quality management systems operating under IATF 16949 and ISO 9001 certifications. Every batch is inspected, documented, and traceable from raw material receipt through in-process control to final shipment — with full technical data sheet provision.',
          },
          {
            title: 'Process Improvement',
            content:
              'Continuous improvement methodologies including structured root cause analysis, statistical process control (SPC), and corrective action systems drive ongoing refinement of our manufacturing processes — reducing variation and eliminating waste.',
          },
          {
            title: 'Value Enhancement',
            content:
              'Beyond compliance, we actively seek opportunities to enhance product value through material optimisation, cycle time reduction, weight savings, and design refinements — delivering measurable cost and performance benefits to our clients.',
          },
        ]}
        images={qualityImages}
        background="white"
      >
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.1em]">
            CERTIFIED UNDER
          </p>
          <p className="text-[15px] font-medium text-slate-700 mt-2">
            IATF 16949 · ISO 9001 · ISO 14001 · ISO 45001
          </p>
        </div>
      </CapabilityPillarSection>

      {/* S9 – CTA */}
      <section className="bg-slate-900 py-[60px] md:py-[120px] relative">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-[2px] h-6 bg-blue-600 inline-block" />
            <span className="font-semibold text-[11px] uppercase tracking-[0.1em] text-slate-400">
              WORK WITH US
            </span>
          </div>
          <h2 className="font-[300] text-[32px] lg:text-[44px] text-white">
            Ready to discuss your next project?
          </h2>
          <p className="text-[17px] text-slate-400 max-w-[560px] mx-auto mt-4">
            Whether you need engineering support, a custom mold, high-volume production, or a
            long-term manufacturing partner — the conversation starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/contact?inquiry"
              className="inline-flex items-center justify-center h-14 px-8 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-[15px]"
            >
              Start a Project
            </a>
            <a
              href="https://wa.me/919XXXXXXXXX"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center h-14 px-8 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-[15px]"
              style={{ backgroundColor: '#25D366' }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}