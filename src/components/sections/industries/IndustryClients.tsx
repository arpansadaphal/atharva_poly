import { SectionHeader } from '@/components/ui/SectionHeader'
import ClientLogo from '@/components/ui/industries/ClientLogo'
import type { Industry } from '@/types/industries'

export default function IndustryClients({ industry }: { industry: Industry }) {
  if (!industry.clients || industry.clients.length === 0) return null

  return (
    <section className="bg-slate-50 section-padding" aria-label="Trusted clients">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader
          eyebrow="TRUSTED BY"
          headline="Leading Brands Rely on Our Parts"
          theme="light"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {industry.clients.map((client) => (
            <ClientLogo key={client.name} name={client.name} logoPath={client.logoPath} />
          ))}
        </div>
      </div>
    </section>
  )
}