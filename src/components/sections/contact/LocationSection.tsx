import { SectionHeader } from '@/components/ui/SectionHeader'
import LocationCard from '@/components/ui/contact/LocationCard'
import { businessInfo } from '@/lib/contact-data'

export default function LocationSection() {
  return (
    <section className="bg-slate-50 section-padding">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeader eyebrow="OUR LOCATIONS" headline="Where to Find Us" theme="light" />
        {/* mt-12 creates the same spacing between header and grid as all other card sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <LocationCard
            type="manufacturing"
            name={businessInfo.manufacturingAddress.line1}
            addressLines={[
              `${businessInfo.manufacturingAddress.line2}, ${businessInfo.manufacturingAddress.city}`,
              `${businessInfo.manufacturingAddress.state}, ${businessInfo.manufacturingAddress.country}`,
              `${businessInfo.manufacturingAddress.zipCode}`,
            ]}
            mapsUrl={businessInfo.manufacturingAddress.googleMapsUrl}
          />
          <LocationCard
            type="office"
            name={businessInfo.commercialAddress.line1}
            addressLines={[
              `${businessInfo.commercialAddress.line1}, ${businessInfo.commercialAddress.city}`,
              `${businessInfo.commercialAddress.state}, ${businessInfo.commercialAddress.country}`,
            ]}
            mapsUrl={businessInfo.commercialAddress.googleMapsUrl}
          />
        </div>
      </div>
    </section>
  )
}